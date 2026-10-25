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

    // Language Menu
    const langToggle = document.getElementById("langToggle");
    const langFlag = document.getElementById("langFlag");

    const langItems = document.querySelectorAll(
        "#navbarCollapseLang .dropdown-item[data-lang]"
    );

    const languages = {
        es: {
            label: "ES",
            flag: "https://flagcdn.com/w20/es.png",
            alt: "Español"
        },
        en: {
            label: "EN",
            flag: "https://flagcdn.com/w20/us.png",
            alt: "English"
        }
    };

    let currentLang = "es";

    function updateLanguageSelector(lang) {
        const selected = languages[lang];

        if (!selected) return;

        currentLang = lang;
        langToggle.textContent = selected.label;
        langFlag.src = selected.flag;
        langFlag.alt = selected.alt;

        document.documentElement.lang = lang;
    }

    langItems.forEach(item => {
        item.addEventListener("click", event => {
            event.preventDefault();

            updateLanguageSelector(item.dataset.lang);
        });
    });

    /* Video Popup Start */
    const YTPlayerOverlay = document.querySelector('.youtube-player-overlay');
    const YTPlay = document.querySelectorAll('.play-btn');
    const vidClose = YTPlayerOverlay?.querySelector('.close-btn');

    // Gallery exclusive elements
    const video = document.querySelector('#myVideo');
    const videoSource = document.querySelector('#videoSource');

    // Youtube exclusive elements
    const youtubeFrame = YTPlayerOverlay?.querySelector('iframe');

    // Open video
    YTPlay.forEach(play => {
        play.addEventListener('click', () => {

            // if local video reproductor exists
            if (video && videoSource) {
                videoSource.src = play.dataset.video;
                video.load();
                video.play().catch(error => {
                    console.warn('No se pudo reproducir el vídeo:', error);
                });
            }

            // show overlay
            YTPlayerOverlay?.classList.add('active');
            document.body.classList.add('video-playing');
            document.body.style.overflow = 'hidden';
        });
    });

    // close reproductor
    vidClose?.addEventListener('click', () => {
        YTPlayerOverlay.classList.remove('active');
        document.body.classList.remove('video-playing');

        // stop local videos
        if (video) {
            video.pause();
            video.currentTime = 0;
            videoSource.src = '';
            video.load();
        }

        // stop youtube upon closing
        if (youtubeFrame) {
            const currentSrc = youtubeFrame.src;
            youtubeFrame.src = currentSrc;
        }

        document.body.style.overflow = '';
    });
    /* Video Popup End */

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

