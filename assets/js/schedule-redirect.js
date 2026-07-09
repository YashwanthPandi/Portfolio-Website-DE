/**
 * Schedule Link Redirect
 * Intercepts all links containing "/schedule" and opens the NeetoCal popup instead
 * Also detects direct navigation to /schedule URLs and opens the popup
 */

function waitForNeetoCal(callback, attempts = 0) {
  if (window.neetoCal && window.neetoCal.embed) {
    callback();
  } else if (attempts < 20) {
    // Wait up to 2 seconds for NeetoCal to load
    setTimeout(() => waitForNeetoCal(callback, attempts + 1), 100);
  } else {
    console.warn('NeetoCal did not load in time');
    // Fallback: try clicking the button anyway
    const popupButton = document.getElementById('open-popup-button');
    if (popupButton) {
      popupButton.click();
    }
  }
}

function openSchedulePopup() {
  waitForNeetoCal(() => {
    const popupButton = document.getElementById('open-popup-button');
    if (popupButton) {
      popupButton.click();
    } else {
      console.warn('Schedule popup button not found');
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Check if current page URL contains /schedule - open popup
  if (window.location.pathname.includes('/schedule')) {
    console.log('Schedule URL detected, opening popup...');
    
    // Wait a moment for page to fully render, then open popup
    setTimeout(() => {
      openSchedulePopup();
    }, 300);
  }
  
  // Find all links that contain "/schedule" in their href
  const scheduleLinks = document.querySelectorAll('a[href*="/schedule"]');
  
  scheduleLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Trigger the NeetoCal popup
      openSchedulePopup();
    });
  });
});
