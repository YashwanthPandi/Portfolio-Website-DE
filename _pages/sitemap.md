---
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: true
---

{% include base_path %}

<!-- Beautiful Intro Card -->
<div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 mb-12 shadow-sm">
  <h1 class="text-3xl font-extrabold text-gray-900 mb-3">Site Directory</h1>
  <p class="text-gray-700 text-lg mb-6">
    A complete list of all the posts, pages, and collections found on the site.
  </p>
  <div class="inline-flex items-center text-sm font-medium text-blue-700 bg-white px-5 py-2.5 rounded-lg shadow-sm border border-blue-200 transition-all hover:bg-blue-600 hover:text-white group">
    <svg class="w-5 h-5 mr-2 text-blue-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L10.293 10.586V7z" clip-rule="evenodd"></path>
    </svg>
    <a href="{{ base_path }}/sitemap.xml" class="no-underline text-inherit group-hover:text-white">
      For robots: XML version available
    </a>
  </div>
</div>

<!-- Pages Section -->
<div class="mb-14">
  <div class="flex items-center mb-6">
    <div class="bg-indigo-100 p-2.5 rounded-xl mr-4">
      <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    </div>
    <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-indigo-100 pb-2 flex-grow m-0">Pages</h2>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {% for post in site.pages %}
      <div class="bg-white rounded-xl border border-gray-100 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-300">
        {% include archive-single.html %}
      </div>
    {% endfor %}
  </div>
</div>

<!-- Posts Section -->
<div class="mb-14">
  <div class="flex items-center mb-6">
    <div class="bg-emerald-100 p-2.5 rounded-xl mr-4">
      <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14"></path>
      </svg>
    </div>
    <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-emerald-100 pb-2 flex-grow m-0">Posts</h2>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {% for post in site.posts %}
      <div class="bg-white rounded-xl border border-gray-100 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-300">
        {% include archive-single.html %}
      </div>
    {% endfor %}
  </div>
</div>

<!-- Dynamic Collections Section -->
{% for collection in site.collections %}
  {% unless collection.output == false or collection.label == "posts" %}
    <div class="mb-14">
      <div class="flex items-center mb-6">
        <div class="bg-purple-100 p-2.5 rounded-xl mr-4">
          <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
        </div>
        <!-- Capitalize and replace underscores with spaces for prettier labels -->
        <h2 class="text-3xl font-bold text-gray-800 border-b-2 border-purple-100 pb-2 flex-grow m-0 capitalize">
          {{ collection.label | replace: '_', ' ' }}
        </h2>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {% for post in collection.docs %}
          <div class="bg-white rounded-xl border border-gray-100 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-purple-300">
            {% include archive-single.html %}
          </div>
        {% endfor %}
      </div>
    </div>
  {% endunless %}
{% endfor %}