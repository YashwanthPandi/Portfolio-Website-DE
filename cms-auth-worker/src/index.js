const JSON_HEADERS = { "content-type": "application/json; charset=UTF-8" };

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function html(content, status = 200) {
  return new Response(content, {
    status,
    headers: { "content-type": "text/html; charset=UTF-8" },
  });
}

function b64urlEncode(input) {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(input) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  const binary = atob(normalized + pad);
  const bytes = Uint8Array.from(binary, ch => ch.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function getCookieValue(cookieHeader, key) {
  if (!cookieHeader) return null;
  const cookie = cookieHeader
    .split(";")
    .map(part => part.trim())
    .find(part => part.startsWith(`${key}=`));
  return cookie ? decodeURIComponent(cookie.slice(key.length + 1)) : null;
}

function buildMessagePage({ provider, type, payload }) {
  const safeProvider = JSON.stringify(provider);
  const safePayload = JSON.stringify(payload);
  const safeType = JSON.stringify(type);

  return `<!doctype html>
<html>
  <body>
    <script>
      (function () {
        var provider = ${safeProvider};
        var payload = ${safePayload};
        var type = ${safeType};
        var openerWindow = window.opener;
        if (!openerWindow) {
          document.body.innerText = "Authentication complete. You can close this window.";
          return;
        }

        function sendResult(origin) {
          var message = "authorization:" + provider + ":" + type + ":" + JSON.stringify(payload);
          openerWindow.postMessage(message, origin);
          window.close();
        }

        window.addEventListener("message", function (event) {
          if (event.data === "authorizing:" + provider) {
            sendResult(event.origin);
          }
        });

        openerWindow.postMessage("authorizing:" + provider, "*");
        setTimeout(function () {
          sendResult("*");
        }, 3000);
      })();
    </script>
  </body>
</html>`;
}

async function exchangeCodeForToken({ code, redirectUri, env }) {
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "user-agent": "decap-cms-auth-worker",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: redirectUri,
    }),
  });

  const payload = await response.json();
  if (!response.ok || payload.error || !payload.access_token) {
    const message = payload.error_description || payload.error || "GitHub token exchange failed";
    throw new Error(message);
  }

  return payload.access_token;
}

function buildAuthorizeUrl({ requestUrl, scope, state, env }) {
  const redirectUri = new URL("/callback", requestUrl).toString();
  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", scope || "repo");
  url.searchParams.set("state", state);
  return url;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return json({ ok: true, service: "decap-cms-auth-worker" });
    }

    if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
      return json(
        {
          error:
            "Missing Worker secrets. Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET before using /auth.",
        },
        500
      );
    }

    if (url.pathname === "/auth") {
      const provider = url.searchParams.get("provider") || "github";
      if (provider !== "github") {
        return json({ error: "Only GitHub provider is supported." }, 400);
      }

      const statePayload = {
        provider,
        site_id: url.searchParams.get("site_id") || "",
        scope: url.searchParams.get("scope") || "repo",
        nonce: crypto.randomUUID(),
      };
      const state = b64urlEncode(JSON.stringify(statePayload));
      const authorizeUrl = buildAuthorizeUrl({
        requestUrl: request.url,
        scope: statePayload.scope,
        state,
        env,
      });

      const headers = new Headers();
      headers.set("location", authorizeUrl.toString());
      headers.append(
        "set-cookie",
        `decap_oauth_state=${encodeURIComponent(statePayload.nonce)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
      );
      return new Response(null, { status: 302, headers });
    }

    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      const encodedState = url.searchParams.get("state");
      const providerError = url.searchParams.get("error");

      if (!encodedState) {
        return html(
          buildMessagePage({
            provider: "github",
            type: "error",
            payload: { message: "Missing state in callback." },
          }),
          400
        );
      }

      let statePayload;
      try {
        statePayload = JSON.parse(b64urlDecode(encodedState));
      } catch {
        return html(
          buildMessagePage({
            provider: "github",
            type: "error",
            payload: { message: "Invalid callback state." },
          }),
          400
        );
      }

      const cookieNonce = getCookieValue(request.headers.get("cookie"), "decap_oauth_state");
      if (!cookieNonce || cookieNonce !== statePayload.nonce) {
        return html(
          buildMessagePage({
            provider: statePayload.provider || "github",
            type: "error",
            payload: { message: "State mismatch. Please retry login." },
          }),
          403
        );
      }

      if (providerError || !code) {
        return html(
          buildMessagePage({
            provider: statePayload.provider || "github",
            type: "error",
            payload: { message: providerError || "Missing authorization code." },
          }),
          400
        );
      }

      try {
        const token = await exchangeCodeForToken({
          code,
          redirectUri: new URL("/callback", request.url).toString(),
          env,
        });

        const headers = new Headers();
        headers.append(
          "set-cookie",
          "decap_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"
        );

        return new Response(
          buildMessagePage({
            provider: statePayload.provider || "github",
            type: "success",
            payload: { token, provider: "github" },
          }),
          { status: 200, headers: { ...Object.fromEntries(headers.entries()), "content-type": "text/html; charset=UTF-8" } }
        );
      } catch (error) {
        return html(
          buildMessagePage({
            provider: statePayload.provider || "github",
            type: "error",
            payload: { message: error.message || "Authentication failed." },
          }),
          502
        );
      }
    }

    return json(
      {
        service: "decap-cms-auth-worker",
        endpoints: ["/auth", "/callback", "/health"],
      },
      404
    );
  },
};
