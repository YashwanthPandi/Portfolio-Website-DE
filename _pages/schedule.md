---
title: "Schedule a Call"
layout: default
permalink: /schedule
redirect_from:
  - /schedule/
---

<div class="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
  <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
    <p class="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Book a meeting</p>
    <h1 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Let’s talk about your next project.</h1>
    <p class="mt-4 text-base leading-7 text-slate-600">
      I’m available for product, data engineering, and platform consulting conversations.
      Use the button below to start a conversation by email or open the booking flow if one is configured.
    </p>

    <div class="mt-8 flex flex-col gap-4 sm:flex-row">
      <button id="open-popup-button" type="button" class="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700">
        Schedule a call
      </button>
      <a href="mailto:pandiyashwanth@gmail.com?subject=Schedule%20a%20call" class="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
        Email directly
      </a>
    </div>
  </div>
</div>

<script>
  (function () {
    const button = document.getElementById('open-popup-button');
    if (!button) return;

    button.addEventListener('click', function () {
      if (window.neetoCal && window.neetoCal.embed) {
        window.neetoCal.embed();
        return;
      }

      window.location.href = 'mailto:pandiyashwanth@gmail.com?subject=Schedule%20a%20call';
    });
  })();
</script>
