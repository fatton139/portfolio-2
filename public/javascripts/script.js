// Generated by CoffeeScript 1.12.7
(function() {
  $(document).ready(function() {
    'use strict';
    var after, before, i, imagesTotal, load, loaded, mainNav, navActive, navToggle, prepAnimationItem, secNav, segment, setAside;
    if (document.location.pathname.split('/').pop().slice(0, -1) === 'item') {
      prepAnimationItem();
    }
    imagesTotal = $('img').length;
    segment = 100 / imagesTotal;
    loaded = 0;
    before = 0;
    after = 0;
    $(document).imagesLoaded().progress(function(instance, image) {
      var animateText;
      animateText = function(from, to) {
        $({
          current: from
        }).animate({
          current: to
        }, {
          duration: segment / 0.35 * 10,
          step: function() {
            $('.progress-text p').text(this.current.toFixed(2));
          }
        });
      };
      if (image.isLoaded) {
        before = loaded;
        loaded += segment;
        after = loaded;
        animateText(before, after);
        $('#loading .progress-bar').css('width', loaded + '%');
      } else {
        $('.failed').append('<p>Fail to load: ' + image.img.src + '</p>');
      }
    }).done(function() {
      load();
    });
    $(window).resize(function() {
      setAside();
    });
    $('#display img').hover((function() {
      $(this).next('aside').css('opacity', '1');
      $(this).css({
        'transform': 'scale(1.01)',
        'filter': 'blur(2px)'
      });
    }), function() {
      $(this).next('aside').css('opacity', '');
      $(this).css({
        'transform': '',
        'filter': ''
      });
    });
    $('nav a').click(function(event) {
      var pageHash, pageHref, redirect;
      redirect = function() {
        $('body').fadeOut(750, function() {
          if (pageHash !== '') {
            window.location = '/' + pageHash;
          } else {
            window.location = pageHref;
          }
        });
      };
      event.preventDefault();
      pageHash = this.hash;
      pageHref = this.href;
      if (pageHash.charAt(0) === '#') {
        if (window.location.pathname === '/') {
          $('html, body').animate({
            scrollTop: $(pageHash).offset().top
          }, 800, function() {
            window.location.hash = pageHash;
          });
        } else {
          pageHash = this.hash;
          redirect();
        }
      } else {
        pageHref = this.href;
        redirect();
      }
    });
    mainNav = $('.nav-main ul li');
    secNav = $('.nav-secondary ul li span');
    i = 0;
    while (i < mainNav.length) {
      $(mainNav[i]).attr('target', '#nav-span' + i);
      $(secNav[i]).attr('id', 'nav-span' + i);
      i++;
    }
    $('.nav-main ul li').hover((function() {
      var target;
      target = $($(this).attr('target'));
      target.parent().css({
        'background-color': '#dadad2'
      });
      target.css('color', '#333333');
    }), function() {
      var target;
      target = $($(this).attr('target'));
      target.parent().css({
        'background-color': ''
      });
      target.css('color', '');
    });
    navActive = void 0;
    $('.nav-menu, .nav-close').click(function() {
      navToggle();
    });
    $('.img-loading').hide();
    $('.slide img').click(function() {
      var main;
      main = $('#main-img');
      main.attr('src', $(this).attr('src'));
      $('.img-loading').show();
      main.css('opacity', 0);
      main.imagesLoaded().done(function() {
        main.css('opacity', 1);
        $('.img-loading').hide();
      });
    });
    return;
    prepAnimationItem = function() {};
    $('.item-container').css({
      'padding-top': '50px',
      'opacity': 0
    });
    return;
    navToggle = function() {
      if (!navActive) {
        $('.nav-main, .nav-secondary').css('left', '0px');
        $('.nav-menu').css({
          left: '-80px',
          opacity: '0',
          cursor: 'default'
        });
      } else {
        $('.nav-main, .nav-secondary').css('left', '');
        $('.nav-menu').css({
          left: '',
          opacity: '',
          cursor: ''
        });
      }
      navActive = !navActive;
    };
    setAside = function() {
      var displayImg, img;
      displayImg = $('#display img');
      i = 0;
      while (i < displayImg.length) {
        img = $(displayImg[i]);
        img.next('aside').css('height', img.height());
        img.next('aside').css('width', img.width());
        i++;
      }
    };
    return load = function() {
      $('body').css('overflow-y', 'auto');
      $('#loading').css({
        'opacity': 0,
        'pointer-events': 'none'
      });
      setTimeout((function() {
        $('#loading').remove();
      }), 500);
      $.getScript('../javascripts/animations.js', function() {
        if (document.location.pathname === '/') {
          indexanimate();
        } else if (document.location.pathname === '/Works') {
          galleryanimate();
        } else if (document.location.pathname.split('/').pop().slice(0, -1) === 'item') {
          itemanimate();
          galleryanimate();
        }
      });
      setAside();
      setSlide();
    };
  });

}).call(this);
