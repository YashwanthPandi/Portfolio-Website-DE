/**
* Schedule Link Redirect
* Attempts to use an embedded booking flow when available, and falls back to a
* safe email-based booking flow instead of failing silently.
*/

function openSchedulePopup() {
 const popupButton = document.getElementById('open-popup-button');

 if (popupButton) {
   popupButton.click();
   return;
 }

 if (window.neetoCal && typeof window.neetoCal.embed === 'function') {
   window.neetoCal.embed();
   return;
 }

 window.location.href = 'mailto:pandiyashwanth@gmail.com?subject=Schedule%20a%20call';
}

document.addEventListener('DOMContentLoaded', function () {
 if (window.location.pathname.includes('/schedule')) {
   setTimeout(openSchedulePopup, 300);
 }

 const scheduleLinks = document.querySelectorAll('a[href*="/schedule"]');

 scheduleLinks.forEach(function (link) {
   link.addEventListener('click', function (e) {
     e.preventDefault();
     e.stopPropagation();
     openSchedulePopup();
   });
 });
});
