(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Hero Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'fadeOut',
        items: 1,
        margin: 0,
        stagePadding: 0,
        autoplay: false,
        smartSpeed: 500,
        dots: true,
        loop: false,
        nav : true,
        mouseDrag: false,
        touchDrag: false,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });


    // attractions carousel
    $(".workattr-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        autoplayTimeout: 16000,
        center: false,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-right"></i>',
            '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        autoplay: false,
        smartSpeed: 1000,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        mouseDrag: false,
        touchDrag: false,
        dots: true,
        loop: true,
        nav: false
    });

    // Youtube Video Popup
    const YTPlayerOverlay = document.querySelector('.youtube-player-overlay');
    const YTPlay = document.querySelector('.pulsating-play-btn');

    YTPlay.addEventListener('click', () => {
        YTPlayerOverlay.classList.add('active');
        YTPlay.style.opacity = '0';
        document.body.style.overflow = 'hidden';
    });

    YTPlayerOverlay.addEventListener('click', () => {
        YTPlayerOverlay.classList.remove('active');
        YTPlay.style.opacity = '1';
        document.body.style.overflow = 'visible';
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    /* Uncomment this if animations are disabled due Windows Performance settings

    // Smooth scroll for internal links w/ hash (for, #nosotros)
    $('a[href*="#"]').on('click', function (e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000, 'easeInOutExpo');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
     */


})(jQuery);

