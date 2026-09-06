---
layout: single
title: Contact
permalink: /contact/
author_profile: false
---

{% assign contact = site.data.contact %}

<div class="contact-card">
  <p class="contact-intro">{{ contact.intro }}</p>

  <form id="contact-form" class="contact-form">
    <div class="form-group">
      <label for="contact-name">Name</label>
      <input id="contact-name" name="name" type="text" placeholder="Your full name" required>
    </div>

    <div class="form-group">
      <label for="contact-email">Email</label>
      <input id="contact-email" name="email" type="email" placeholder="your.email@example.com" required>
    </div>

    <div class="form-group">
      <label for="contact-subject">Subject</label>
      <input id="contact-subject" name="subject" type="text" placeholder="Project inquiry, question, etc." required>
    </div>

    <div class="form-group">
      <label for="contact-message">Message</label>
      <textarea id="contact-message" name="message" rows="5" placeholder="Write your message here..." required></textarea>
    </div>

    <div class="form-actions">
      <button type="submit" class="contact-submit-btn" id="contact-submit-btn">
        <span>Send Message</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      </button>

      <button type="button" class="contact-copy-btn" id="contact-copy-btn" title="Copy message text">
        Copy Formatted Message
      </button>
    </div>
  </form>

  <div id="contact-status" class="contact-status" style="display: none;"></div>

  <div class="contact-direct">
    <span>Or reach out directly:</span>
    <a href="mailto:{{ contact.email }}" class="contact-email-link">{{ contact.email }}</a>
  </div>
</div>

<!-- EmailJS Library Script -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

<script>
  (function () {
    // Optional EmailJS Credentials (replace with your keys if using EmailJS)
    // emailjs.init("YOUR_PUBLIC_KEY");
    var EMAILJS_SERVICE_ID = ""; // e.g. "service_xxx"
    var EMAILJS_TEMPLATE_ID = ""; // e.g. "template_xxx"

    var form = document.getElementById('contact-form');
    var statusDiv = document.getElementById('contact-status');
    var copyBtn = document.getElementById('contact-copy-btn');
    var submitBtn = document.getElementById('contact-submit-btn');

    if (!form) return;

    function buildFormattedBody(name, email, subject, message) {
      return "Hi Yashwanth,\n\n" +
             "You received a new message from your portfolio contact form:\n\n" +
             "----------------------------------------\n" +
             "Name: " + name + "\n" +
             "Email: " + email + "\n" +
             "Subject: " + subject + "\n" +
             "----------------------------------------\n\n" +
             "Message:\n" + message + "\n";
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('contact-name').value.trim();
      var email = document.getElementById('contact-email').value.trim();
      var subject = document.getElementById('contact-subject').value.trim();
      var message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !subject || !message) return;

      var recipient = "{{ contact.email }}";

      // If EmailJS keys are set up, send silently via EmailJS library
      if (typeof emailjs !== 'undefined' && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
          to_email: recipient
        }).then(function () {
          statusDiv.className = 'contact-status success';
          statusDiv.innerText = '✓ Message sent successfully! Thank you for reaching out.';
          statusDiv.style.display = 'block';
          form.reset();
        }, function (err) {
          console.error('EmailJS error:', err);
          // Fallback to direct client mailto
          sendViaMailto(recipient, name, email, subject, message);
        }).finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Send Message</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
        });
      } else {
        // Direct zero-3rd-party browser JS Mail Client send
        sendViaMailto(recipient, name, email, subject, message);
      }
    });

    function sendViaMailto(recipient, name, email, subject, message) {
      var emailSubject = encodeURIComponent("[" + subject + "] Inquiry from " + name);
      var bodyText = buildFormattedBody(name, email, subject, message);
      var emailBody = encodeURIComponent(bodyText);

      var mailtoUrl = "mailto:" + recipient + "?subject=" + emailSubject + "&body=" + emailBody;

      // Launch email client directly from browser JS
      window.location.href = mailtoUrl;

      statusDiv.className = 'contact-status success';
      statusDiv.innerHTML = '✓ Opening your email client to send the message...<br>' +
        '<small>If your email app did not open automatically, <a href="' + mailtoUrl + '">click here to send</a> or click "Copy Formatted Message" below.</small>';
      statusDiv.style.display = 'block';
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var name = document.getElementById('contact-name').value.trim() || 'Visitor';
        var email = document.getElementById('contact-email').value.trim() || 'Not specified';
        var subject = document.getElementById('contact-subject').value.trim() || 'General Inquiry';
        var message = document.getElementById('contact-message').value.trim() || '';

        var bodyText = buildFormattedBody(name, email, subject, message);

        navigator.clipboard.writeText(bodyText).then(function () {
          var origText = copyBtn.innerText;
          copyBtn.innerText = '✓ Copied to Clipboard!';
          setTimeout(function () {
            copyBtn.innerText = origText;
          }, 2500);
        }).catch(function (err) {
          console.error('Clipboard copy error:', err);
        });
      });
    }
  })();
</script>

<style>
  .contact-card {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 680px;
    padding: 2rem;
    border-radius: 1.25rem;
    background: rgba(15, 23, 42, 0.45);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(148, 163, 184, 0.2);
    box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.35);
    margin-top: 1rem;
  }

  html[data-theme="light"] .contact-card,
  html:not(.dark):not([data-theme="dark"]) .contact-card {
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(15, 23, 42, 0.12);
    box-shadow: 0 16px 36px -10px rgba(15, 23, 42, 0.08);
  }

  .contact-intro {
    margin: 0;
    font-size: 1.05rem;
    line-height: 1.6;
    opacity: 0.9;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .form-group label {
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    border: 1px solid rgba(148, 163, 184, 0.35);
    border-radius: 0.75rem;
    padding: 0.75rem 1rem;
    background: rgba(15, 23, 42, 0.3);
    color: inherit;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  html[data-theme="light"] .form-group input,
  html[data-theme="light"] .form-group textarea,
  html:not(.dark):not([data-theme="dark"]) .form-group input,
  html:not(.dark):not([data-theme="dark"]) .form-group textarea {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(148, 163, 184, 0.4);
  }

  .form-group input:focus,
  .form-group textarea:focus {
    border-color: #38bdf8;
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
  }

  .form-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 0.5rem;
  }

  .contact-submit-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: none;
    border-radius: 9999px;
    padding: 0.75rem 1.6rem;
    background: #1DB954;
    color: #ffffff;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(29, 185, 84, 0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .contact-submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(29, 185, 84, 0.4);
  }

  .contact-copy-btn {
    border: 1px solid rgba(148, 163, 184, 0.35);
    border-radius: 9999px;
    padding: 0.75rem 1.4rem;
    background: transparent;
    color: inherit;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .contact-copy-btn:hover {
    background: rgba(148, 163, 184, 0.15);
    border-color: rgba(148, 163, 184, 0.5);
  }

  .contact-status {
    padding: 1rem 1.25rem;
    border-radius: 0.75rem;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .contact-status.success {
    background: rgba(34, 197, 94, 0.15);
    border: 1px solid rgba(34, 197, 94, 0.4);
    color: #4ade80;
  }

  html[data-theme="light"] .contact-status.success,
  html:not(.dark):not([data-theme="dark"]) .contact-status.success {
    background: rgba(34, 197, 94, 0.12);
    color: #15803d;
  }

  .contact-direct {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(148, 163, 184, 0.2);
    flex-wrap: wrap;
  }

  .contact-email-link {
    font-weight: 700;
    color: #38bdf8;
    text-decoration: none;
  }

  .contact-email-link:hover {
    text-decoration: underline;
  }

  @media (max-width: 640px) {
    .contact-card {
      padding: 1.25rem;
    }

    .form-actions {
      flex-direction: column;
      align-items: stretch;
    }

    .contact-submit-btn,
    .contact-copy-btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>

