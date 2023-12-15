jQuery( document ).ready(function( $ ) {


	"use strict";


    
        $(function() {
            $( "#tabs" ).tabs();
        });


        // Page loading animation

        $("#preloader").animate({
            'opacity': '0'
        }, 600, function(){
            setTimeout(function(){
                $("#preloader").css("visibility", "hidden").fadeOut();
            }, 300);
        });       

        $(window).scroll(function() {
          var scroll = $(window).scrollTop();
          var box = $('.header-text').height();
          var header = $('header').height();

          if (scroll >= box - header) {
            $("header").addClass("background-header");
          } else {
            $("header").removeClass("background-header");
          }
        });
	


        if ($('.owl-highlights').length) {
            $('.owl-highlights').owlCarousel({
                loop: true,
                nav: true,
                dots: true,
                items: 1,
                margin: 30,
                autoplay: false,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    460: {
                        items: 1,
                        margin: 0
                    },
                    576: {
                        items: 2,
                        margin: 20
                    },
                    992: {
                        items: 3,
                        margin: 20
                    }
                }
            });
        }

          if ($('.owl-partners').length) {
            $('.owl-partners').owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                items: 1,
                margin: 70,
                   animateIn: "fadeIn",
                   animateOut: "fadeOut",
                 slideTransition: "linear",
                autoplay: true,
                smartSpeed: 6000,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 3,
                        margin: 0
                    },
                    460: {
                        items: 3,
                        margin: 0
                    },
                    500: {
                        items: 4,
                        margin: 20
                    },
                    700: {
                        items: 5,
                        margin: 30
                    },
                    920: {
                        items: 6,
                        margin: 30
                    }
                }
            });
        }


        $(".Modern-Slider").slick({
          autoplay: true,
          autoplaySpeed: 4000,
          loop: true,
          speed: 1600,
          animateIn: "fadeIn",
          animateOut: "fadeOut",
          slidesToShow: 1,
          pauseOnHover: false,
          dots: false,
          cssEase: "linear",
          fade: true,
          draggable: false,
          prevArrow: false,
          nextArrow: false,
        });

        function visible(partial) {
            var $t = partial,
                $w = jQuery(window),
                viewTop = $w.scrollTop(),
                viewBottom = viewTop + $w.height(),
                _top = $t.offset().top,
                _bottom = _top + $t.height(),
                compareTop = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom;

            return ((compareBottom <= viewBottom) && (compareTop >= viewTop) && $t.is(':visible'));

        }

        $(window).scroll(function(){

          if(visible($('.count-digit')))
            {
              if($('.count-digit').hasClass('counter-loaded')) return;
              $('.count-digit').addClass('counter-loaded');
              
        $('.count-digit').each(function () {
          var $this = $(this);
          jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
            duration: 3000,
            easing: 'swing',
            step: function () {
              $this.text(Math.ceil(this.Counter));
            }
          });
        });
        }
    })
 
});


/**
 * Single Page Nav Plugin
 * Copyright (c) 2014 Chris Wojcik <cpw1485@gmail.com>
 * Dual licensed under MIT and GPL.
 * @author Chris Wojcik
 * @version 1.2.1
 */
"function" != typeof Object.create &&
  (Object.create = function (a) {
    function b() {}
    return (b.prototype = a), new b();
  }),
  (function (a, b, c, d) {
    "use strict";
    var e = {
      init: function (c, d) {
        (this.options = a.extend({}, a.fn.singlePageNav.defaults, c)),
          (this.container = d),
          (this.$container = a(d)),
          (this.$links = this.$container.find("a")),
          "" !== this.options.filter &&
            (this.$links = this.$links.filter(this.options.filter)),
          (this.$window = a(b)),
          (this.$htmlbody = a("html, body")),
          this.$links.on(
            "click.singlePageNav",
            a.proxy(this.handleClick, this)
          ),
          (this.didScroll = !1),
          this.checkPosition(),
          this.setTimer();
      },
      handleClick: function (b) {
        var c = this,
          d = b.currentTarget,
          e = a(d.hash);
        b.preventDefault(),
          e.length &&
            (c.clearTimer(),
            "function" == typeof c.options.beforeStart &&
              c.options.beforeStart(),
            c.setActiveLink(d.hash),
            c.scrollTo(e, function () {
              c.options.updateHash &&
                history.pushState &&
                history.pushState(null, null, d.hash),
                c.setTimer(),
                "function" == typeof c.options.onComplete &&
                  c.options.onComplete();
            }));
      },
      scrollTo: function (a, b) {
        var c = this,
          d = c.getCoords(a).top,
          e = !1;
        c.$htmlbody.stop().animate(
          { scrollTop: d },
          {
            duration: c.options.speed,
            easing: c.options.easing,
            complete: function () {
              "function" != typeof b || e || b(), (e = !0);
            },
          }
        );
      },
      setTimer: function () {
        var a = this;
        a.$window.on("scroll.singlePageNav", function () {
          a.didScroll = !0;
        }),
          (a.timer = setInterval(function () {
            a.didScroll && ((a.didScroll = !1), a.checkPosition());
          }, 250));
      },
      clearTimer: function () {
        clearInterval(this.timer),
          this.$window.off("scroll.singlePageNav"),
          (this.didScroll = !1);
      },
      checkPosition: function () {
        var a = this.$window.scrollTop(),
          b = this.getCurrentSection(a);
        null !== b && this.setActiveLink(b);
      },
      getCoords: function (a) {
        return { top: Math.round(a.offset().top) - this.options.offset };
      },
      setActiveLink: function (a) {
        var b = this.$container.find("a[href$='" + a + "']");
        b.hasClass(this.options.currentClass) ||
          (this.$links.removeClass(this.options.currentClass),
          b.addClass(this.options.currentClass));
      },
      getCurrentSection: function (d) {
        var e, f, g, h;
        for (e = 0; e < this.$links.length; e++)
          (f = this.$links[e].hash),
            a(f).length &&
              ((g = this.getCoords(a(f))),
              d >= g.top - this.options.threshold && (h = f));
        var i = a(c).height() - a(b).height();
        if (d == i) {
          var j = this.$links.length;
          j > 0 && (h = this.$links[j - 1].hash);
        }
        return h || (0 === this.$links.length ? null : this.$links[0].hash);
      },
    };
    (a.fn.singlePageNav = function (a) {
      return this.each(function () {
        var b = Object.create(e);
        b.init(a, this);
      });
    }),
      (a.fn.singlePageNav.defaults = {
        offset: 0,
        threshold: 120,
        speed: 400,
        currentClass: "current",
        easing: "swing",
        updateHash: !1,
        filter: "",
        onComplete: !1,
        beforeStart: !1,
      });
  })(jQuery, window, document);
