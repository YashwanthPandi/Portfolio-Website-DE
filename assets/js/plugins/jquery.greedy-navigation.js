/*
* Greedy Navigation
*
* http://codepen.io/lukejacksonn/pen/PwmwWV
*
*/

(function () {
  var $nav = $('#site-nav');
  if (!$nav.length) {
    return;
  }

  var $btn = $('#site-nav button');
  if ($btn.length === 0) {
    return;
  }

  var $vlinks = $('#site-nav .visible-links');
  var $vlinks_persist_tail = $vlinks.children("*.persist.tail");
  var $hlinks = $('#site-nav .hidden-links');

  $btn.attr('aria-expanded', 'false');
  $hlinks.attr('aria-hidden', 'true');

  var breaks = [];

  function updateNav() {
    var availableSpace = $btn.hasClass('hidden') ? $nav.width() : $nav.width() - $btn.width() - 30;

    if ($vlinks.width() > availableSpace) {
      while ($vlinks.width() > availableSpace && $vlinks.children("*:not(.persist)").length > 0) {
        breaks.push($vlinks.width());
        $vlinks.children("*:not(.persist)").last().prependTo($hlinks);
        availableSpace = $btn.hasClass("hidden") ? $nav.width() : $nav.width() - $btn.width() - 30;
        $btn.removeClass("hidden");
      }
    } else {
      while (breaks.length > 0 && availableSpace > breaks[breaks.length - 1]) {
        if ($vlinks_persist_tail.children().length > 0) {
          $hlinks.children().first().insertBefore($vlinks_persist_tail);
        } else {
          $hlinks.children().first().appendTo($vlinks);
        }
        breaks.pop();
      }

      if (breaks.length < 1) {
        $btn.addClass('hidden');
        $btn.removeClass('close');
        $hlinks.addClass('hidden');
        $btn.attr('aria-expanded', 'false');
        $hlinks.attr('aria-hidden', 'true');
      }
    }

    $btn.attr("count", breaks.length);

    var mastheadHeight = $('.masthead').height();
    $('body').css('padding-top', mastheadHeight + 'px');
    if ($(".author__urls-wrapper button").is(":visible")) {
      $(".sidebar").css("padding-top", "");
    } else {
      $(".sidebar").css("padding-top", mastheadHeight + "px");
    }
  }

  $(window).on('resize', function () {
    updateNav();
  });

  if (screen && screen.orientation && screen.orientation.addEventListener) {
    screen.orientation.addEventListener("change", function () {
      updateNav();
    });
  }

  $btn.on('click', function () {
    var isOpen = $hlinks.toggleClass('hidden').hasClass('hidden') === false;
    $(this).toggleClass('close');
    $nav.toggleClass('open', isOpen);
    $btn.attr('aria-expanded', isOpen);
    $hlinks.attr('aria-hidden', !isOpen);
  });

  updateNav();
})();