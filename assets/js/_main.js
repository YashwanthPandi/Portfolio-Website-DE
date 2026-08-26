/* ==========================================================================
   Various functions that we want to use within the template
   ========================================================================== */

// Determine the expected state of the theme toggle, which can be "dark", "light", or
// "system". Default is "system".
let determineThemeSetting = () => {
  try {
    let themeSetting = localStorage.getItem("theme");
    return (themeSetting != "dark" && themeSetting != "light" && themeSetting != "system") ? "system" : themeSetting;
  } catch (e) {
    return "system";
  }
};

// Determine the computed theme, which can be "dark" or "light". If the theme setting is
// "system", the computed theme is determined based on the user's system preference.
let determineComputedTheme = () => {
  let themeSetting = determineThemeSetting();
  if (themeSetting != "system") {
    return themeSetting;
  }

  const mediaQuery = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
  return (mediaQuery && mediaQuery.matches) ? "dark" : "light";
};

const browserPref = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const updateThemeIcon = (theme) => {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;

  if (theme === 'dark') {
    icon.innerHTML = '<path d="M21 12.79A9 9 0 0 1 11.21 3a9 9 0 1 0 9.79 9.79Z"/>';
  } else {
    icon.innerHTML = '<path d="M12 3.5a.75.75 0 0 1 .75.75v1.2a.75.75 0 0 1-1.5 0V4.25A.75.75 0 0 1 12 3.5ZM5.64 5.64a.75.75 0 0 1 1.06 0l.85.85a.75.75 0 1 1-1.06 1.06l-.85-.85a.75.75 0 0 1 0-1.06Zm12.7 0a.75.75 0 0 1 0 1.06l-.85.85a.75.75 0 0 1-1.06-1.06l.85-.85a.75.75 0 0 1 1.06 0ZM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5Zm-7.5 4.75a.75.75 0 0 1 .75-.75h1.2a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Zm15.75 0a.75.75 0 0 1 .75-.75h1.2a.75.75 0 0 1 0 1.5h-1.2a.75.75 0 0 1-.75-.75Zm-12.7 5.72a.75.75 0 0 1 1.06 0l.85.85a.75.75 0 1 1-1.06 1.06l-.85-.85a.75.75 0 0 1 0-1.06Zm12.7 0a.75.75 0 0 1 0 1.06l-.85.85a.75.75 0 1 1-1.06-1.06l.85-.85a.75.75 0 0 1 1.06 0ZM12 16.5a.75.75 0 0 1 .75.75v1.2a.75.75 0 0 1-1.5 0v-1.2A.75.75 0 0 1 12 16.5Z"/>';
  }
};

// Set the theme on page load or when explicitly called
let setTheme = (theme) => {
  const html = document.documentElement;
  const resolvedTheme = theme || determineThemeSetting() || browserPref;
  const normalizedTheme = (resolvedTheme === 'dark' || resolvedTheme === 'light') ? resolvedTheme : browserPref;

  html.setAttribute('data-theme', normalizedTheme);
  html.classList.toggle('dark', normalizedTheme === 'dark');
  html.style.colorScheme = normalizedTheme;

  if (normalizedTheme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }

  updateThemeIcon(normalizedTheme);
};

// Toggle the theme manually
var toggleTheme = () => {
  const currentTheme = determineComputedTheme();
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  try {
    localStorage.setItem("theme", newTheme);
  } catch (e) {}

  setTheme(newTheme);
};

/* ==========================================================================
   Plotly integration script so that Markdown codeblocks will be rendered
   ========================================================================== */

// Read the Plotly data from the code block, hide it, and render the chart as new node. This allows for the 
// JSON data to be retrieve when the theme is switched. The listener should only be added if the data is 
// actually present on the page.
import { plotlyDarkLayout, plotlyLightLayout } from './theme.js';
let plotlyElements = document.querySelectorAll("pre>code.language-plotly");
if (plotlyElements.length > 0) {
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
      plotlyElements.forEach((elem) => {
        // Parse the Plotly JSON data and hide it
        var jsonData = JSON.parse(elem.textContent);
        elem.parentElement.classList.add("hidden");

        // Add the Plotly node
        let chartElement = document.createElement("div");
        elem.parentElement.after(chartElement);

        // Set the theme for the plot and render it
        const theme = (determineComputedTheme() === "dark") ? plotlyDarkLayout : plotlyLightLayout;
        if (jsonData.layout) {
          jsonData.layout.template = (jsonData.layout.template) ? { ...theme, ...jsonData.layout.template } : theme;
        } else {
          jsonData.layout = { template: theme };
        }
        Plotly.react(chartElement, jsonData.data, jsonData.layout);
      });
    }
  });
}

/* ==========================================================================
   Actions that should occur when the page has been fully loaded
   ========================================================================== */

$(document).ready(function () {
  // SCSS SETTINGS - These should be the same as the settings in the relevant files 
  const scssLarge = 925;          // pixels, from /_sass/_themes.scss
  const scssMastheadHeight = 70;  // pixels, from the current theme (e.g., /_sass/theme/_default.scss)

  // If the user hasn't chosen a theme, follow the OS preference
  setTheme();
  window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener("change", (e) => {
          if (!localStorage.getItem("theme")) {
            setTheme(e.matches ? "dark" : "light");
          }
        });

  // Enable the theme toggle
  $('#theme-toggle').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  });

  // Enable the sticky footer
  var bumpIt = function () {
    $("body").css("padding-bottom", "0");
    $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
  }
  $(window).resize(function () {
    didResize = true;
  });
  setInterval(function () {
    if (didResize) {
      didResize = false;
      bumpIt();
    }}, 250);
  var didResize = false;
  bumpIt();

  // FitVids init
  fitvids();

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function () {
    $(".author__urls").fadeToggle("fast", function () { });
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // Restore the follow menu if toggled on a window resize
  jQuery(window).on('resize', function () {
    if ($('.author__urls.social-icons').css('display') == 'none' && $(window).width() >= scssLarge) {
      $(".author__urls").css('display', 'block')
    }
  });

  // Init smooth scroll, this needs to be slightly more than then fixed masthead height
  $("a").smoothScroll({
    offset: -scssMastheadHeight,
    preventDefault: false,
  });

});
