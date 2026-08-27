---
layout: single
title: Contact
permalink: /contact/
author_profile: false
---
{% assign contact = site.data.contact %}
{% assign form = contact.form %}

{{ contact.intro }}

<form action="{{ https://formsubmit.co/pandiyashwanth@gmail.com}}" method="{{ form.method | default: 'POST' }}" class="contact-form">
  <label for="contact-name">Name</label>
  <input id="contact-name" name="name" type="text" required>

  <label for="contact-email">Email</label>
  <input id="contact-email" name="email" type="email" required>

  <label for="contact-subject">Subject</label>
  <input id="contact-subject" name="subject" type="text" required>

  <label for="contact-message">Message</label>
  <textarea id="contact-message" name="message" rows="6" required></textarea>

  <input type="text" name="_honey" class="visually-hidden" tabindex="-1" autocomplete="off">
  <input type="hidden" name="_subject" value="New message from portfolio contact form">
  <input type="hidden" name="_captcha" value="false">

  <button type="submit">Send message</button>

</form>

{% if form.success_message %}

<p class="contact-help">{{ form.success_message }}</p>
{% endif %}
<p class="contact-help">Prefer email? <a href="mailto:{{ contact.email }}">{{ contact.email }}</a></p>

<style>
  .contact-form {
    display: grid;
    gap: 0.75rem;
    max-width: 640px;
    margin-top: 1rem;
  }

  .contact-form label {
    font-weight: 600;
  }

  .contact-form input,
  .contact-form textarea {
    width: 100%;
    border: 1px solid rgba(120, 130, 150, 0.45);
    border-radius: 8px;
    padding: 0.65rem 0.75rem;
    background: var(--global-bg-color, #fff);
    color: inherit;
  }

  .contact-form button {
    width: fit-content;
    border: none;
    border-radius: 999px;
    padding: 0.65rem 1.15rem;
    background: var(--primary-color, #007bff);
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }

  .contact-help {
    margin-top: 0.85rem;
    opacity: 0.85;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    clip: rect(0 0 0 0);
    overflow: hidden;
    white-space: nowrap;
  }
</style>
