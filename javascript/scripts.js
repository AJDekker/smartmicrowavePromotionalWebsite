$(document).ready(function() {

   // SCROLLIFY MENU CLICK TO AND SCROLL

    $('nav li a').click(function(e) {
        var first = $('nav li.active').length === 0;
        $('nav li').removeClass('active');
        $(this).parent().addClass('active');
        $.scrollify.move($('nav li').index($(this).parent()) + 1);
        updateMenu(first);
        e.preventDefault();
        $('.nav nav.mobile').fadeOut();
        $('.mobile-icon .nav-icon').toggleClass('open');
    });

    // READ MORE BUTTON PRESS SCROLL DOWN 1 PAGE

    $('.main a.button').click(function(e) {
        $.scrollify.move(1);
        updateMenu(true);
        e.preventDefault();
    });


    $("#slogan").click(function(){
        $.scrollify.move(0);
        updateMenu(true);
    });

    // SCROLLIFY PLUGIN CODE

    $.scrollify({
        section : ".page",
        interstitialSection : "",
        easing: "easeOutExpo",
        scrollSpeed: 800,
        offset : 0,
        scrollbars: true,
        standardScrollElements: "",
        setHeights: true,
        overflowScroll: true,
        scrollOverflow: true,
        updateHash: false,
        touchScroll:false,
        before:function() {
            var first = $('nav li.active').length === 0;
            $('nav ul li').removeClass('active');
            if($.scrollify.currentIndex() > 0) {
                $('nav ul li:nth-child('+$.scrollify.currentIndex()+')').addClass('active');
            }
            updateMenu(first);
            if($.scrollify.currentIndex() !== 0 && !$('section.nav').hasClass('fixed')) {
                $('section.nav').addClass('fixed');
            }
            if($.scrollify.currentIndex() === 0 && $('section.nav').hasClass('fixed')) {
                setTimeout(function() {
                    $('section.nav').removeClass('fixed');
                }, 600);
            }
        },
        after:function() {},
        afterResize:function() {},
        afterRender:function() {}
    });

    setTimeout(function() {
        if($.scrollify.currentIndex() !== 0 && !$('section.nav').hasClass('fixed')) {
            $('section.nav').addClass('fixed');
        }
    }, 250);

    // WINDOW RESIZE FUNCTION ADDS OR REMOVE CLASS BASED ON WIDTH OF WINDOW

    $(window).resize(function() {
        if($(window).width() <= 991) {
            $(".nav nav").addClass("mobile");
        }else {
            $(".nav nav").removeClass("mobile");
        }
    });

    // MOBILE MENU TOGGLE FUNCTION

    if($(window).width() <= 991) {
        $(".nav nav").addClass("mobile");
    }else {
        $(".nav nav").removeClass("mobile");
    }


    $('.mobile-icon .nav-icon').click(function(){
        $('.mobile-icon .nav-icon').toggleClass('open');
        if($(this).hasClass('open')) {
            $('.nav nav.mobile').fadeIn();
        }
        else {
            $('.nav nav.mobile').fadeOut();
        }
    });

});

// DRAW LINE UNDER MENU ITEMS

function updateMenu(first) {
    var active = false;
    $('nav li').each(function() {
        if ($(this).hasClass('active')) {
            active = true;
            var $el = $(this).find('a');
            var width = $el.width();
            var left = 0;
            left = $el.offset().left - $('nav').offset().left;
            if(first) {
                $('nav span').css({left:left + (width / 2) + 'px', width: '0px'});
                setTimeout(function() {
                    $('nav span').css({left:left + 10 + 'px',width:width + 40+'px'});
                }, 250);
            }
            else {
                $('nav span').css({width: $el.width() + 40 + 'px', left: left + 10 + 'px'});
            }

        }
    });
    if(!active) {
        var left = $('nav span').offset().left - $('nav').offset().left;
        var width = $('nav span').width();
        $('nav span').css({left: left + (width / 2) + 'px',width:'0px'});
    }
}


