$('.no-js').removeClass('no-js').addClass('js');

svg4everybody();

var template_path = $('html').data('path');

// Cookie-Hinweis.
function cookiebar_open() {
  if (document.cookie.indexOf('cookiebar_closed=true') >= 0) {
    return false;
  }
  return true;
}

if (cookiebar_open()) {
  $('.cookies').show();
}

$('#cookie_info').click(function() {
  $('.cookies').hide();
  set_cookie('cookiebar_closed', 'true', 365);
});

$('#cookie_close').click(function(e) {
  e.preventDefault();
  $('.cookies').hide();
  set_cookie('cookiebar_closed', 'true', 365);
});

function set_cookie(name, value, days) {
  var date, expires;
  date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  expires = " expires=" + date.toGMTString();
  document.cookie = name + "=" + value + "; path=/;" + expires;
}

/* Google Fonts laden */
WebFontConfig = {
  google: {
    families: ['Roboto']
  }
};
(function() {
  var wf = document.createElement('script');
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();

// Menü ein-/ausblenden.
$('.toggle').each(function() {

  var toggle_for = $('#' + $(this).data('for'));

  toggle_for.hide();

  $(this).click(function(e) {
    $(this).toggleClass('active');
    toggle_for.slideToggle();
  });
});


// Untermenü
$('.sub').children('a').click(function(e) {
  e.preventDefault();

  var parentel = $(this).parent();

  if (parentel.hasClass('open')) {
    parentel.removeClass('open').children('ul').slideUp('fast');
  } else {

    var open = $('.open');

    if (open.length > 0) {
      $('.open').removeClass('open').children('ul').slideUp('fast', function() {
        parentel.addClass('open').children('ul').slideDown('fast');
      });
    } else {
      parentel.addClass('open').children('ul').slideDown('fast');
    }

  }
});

$(document).click(function(e) {
  var menu = $('.sub.open');
  if ($(window).width() >= 768 && !menu.is(e.target) && menu.has(e.target).length === 0) {
    $('.sub.open').removeClass('open').children('ul').slideUp('fast');
  }
});

$(document).ready(function() {

  // Browser-Erkennung.
  cookie_add_class('PPTERM', 'terminal');
  cookie_add_class('PPTERM-BA-01', 'pforte-ba');

  // Slick.
  $('.terminal .main').slick({
    infinite: false,
    speed: 300,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
  });

  if ($('html').hasClass('terminal')) {
    var slick_nav = '<div class=\"btn-wrap\"><button class=\"btn btn-up\"><svg role=\"img\" class=\"symbol\" aria-hidden=\"true\" focusable=\"false\"><use xlink:href=\"' + template_path + '/img/icons.svg#arrowup\"></use></svg><span>zurück</span></button><button class=\"btn btn-down\"><svg role=\"img\" class=\"symbol\" aria-hidden=\"true\" focusable=\"false\"><use xlink:href=\"' + template_path + '/img/icons.svg#arrowdown\"></use></svg><span>weiter</span></button></div>';
    $('.main').append(slick_nav);

    var numSlides = $('.slick-track').children().length;
    $('.btn-up').hide();
    if (1 >= numSlides) {
      $('.btn-down').hide();
    }
    // On after slide change
    $('.main').on('afterChange', function(slick, currentSlide) {
      // Get the current slide
      var currentSlide = $('.main').slick('slickCurrentSlide') + 1;

      if (currentSlide === numSlides || 1 === numSlides) {
        $('.btn-down').hide();
      } else {
        $('.btn-down').show();
      }
      if (currentSlide === 1) {
        $('.btn-up').hide();
      } else {
        $('.btn-up').show();
      }
    });

    $('.btn-down').click(function() {
      $('.main').slick('slickNext');
    });
    $('.btn-up').click(function() {
      $('.main').slick('slickPrev');
    });
  }

  // Essensplan Höhe
  if ($(window).innerWidth() > 1440) {
    td_height();
  }

});

function cookie_add_class(value, $class) {
  var terminal_id = " ";
  var name = "terminal_id=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      terminal_id = c.substring(name.length, c.length);
    }
  }
  if ((terminal_id.length > 0) && (terminal_id.indexOf(value) >= 0)) {
    set_cookie('terminal_id', terminal_id, 31);
    $('html').addClass($class);
  }
  return false;
}

function useragent_add_class(useragent, $class) {
  var ua_string = navigator.userAgent;
  if (ua_string.indexOf(useragent) > 0) {
    $('html').addClass($class);
  }
}

function td_height() {
  $(function() {
    $('#week-plan tr').each(function() {
      $(this).find('td a').removeAttr('style');
      var h1 = $(this).height();
      $(this).find('td a').css({
        'height': h1 + 'px'
      });
    });
  });
}


//Table a full cell
$(window).bind("resize", function() {
  if ($(window).innerWidth() > 1440) {
    td_height();
  }
});

$('#week-plan a').click(function(e) {
  e.preventDefault();
  var detail = $(this).data('detail');
  $('#' + detail).show();
  if ($('html').hasClass('terminal')) {
    $('.slick-list').css('overflow', 'visible');
    $('.breadcrumb').css('display', 'none');
  }

});

$('.close').each(function() {
  $(this).click(function(e) {
    $(this).parent().hide();
    $('.terminal .breadcrumb').css('display', 'block');
    $('.terminal .slick-list').css('overflow', 'hidden!important');
  });
});
