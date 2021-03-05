/**
* Template Name: Empresas Maggi v.1.0
* Template URL: github.com/LeandroGazoli
* Author: Leandro Gazoli
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
   const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
   const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
   const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
   let navbarlinks = select('#navbar .scrollto', true)
   const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
      if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
   const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 10
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
   let selectHeader = select('#header')
   if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
   let backtotop = select('.back-to-top')
   if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
   on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
   on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
   on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
   window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Clients Slider
   */
   new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
   window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        aos_init();
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
   const portfolioLightbox = GLightbox({
    selector: '.portfokio-lightbox'
  });

  /**
   * Portfolio details slider
   */
   new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
   new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Animation on scroll
   */
   function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

}) ();

jQuery(function ($) {
  'use strict';
  
  $(document).ready(function () {

    // banner-carousel
    function bannerCarouselOne() {
      $('.banner-carousel.banner-carousel-1').slick({
        slidesToShow: 1,
        lazyLoad: 'ondemand',
        slidesToScroll: 1,
        autoplay: true,
        dots: true,
        speed: 600,
        arrows: true,
        prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>'
      });
      $('.banner-carousel.banner-carousel-1').slickAnimation();
    }
    bannerCarouselOne();


    // banner Carousel Two
    function bannerCarouselTwo() {
      $('.banner-carousel.banner-carousel-2').slick({
        fade: true,
        slidesToShow: 1,
        lazyLoad: 'ondemand',
        slidesToScroll: 1,
        autoplay: true,
        dots: false,
        speed: 600,
        arrows: true,
        prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>'
      });
    }
    bannerCarouselTwo();


    // pageSlider
    function pageSlider() {
      $('.page-slider').slick({
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        dots: false,
        speed: 600,
        arrows: true,
        prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>'
      });
    }
    pageSlider();


    // Shuffle js filter and masonry
    function projectShuffle() {
      if ($('.shuffle-wrapper').length !== 0) {
        var Shuffle = window.Shuffle;
        var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
          itemSelector: '.shuffle-item',
          sizer: '.shuffle-sizer',
          buffer: 1
        });
        $('input[name="shuffle-filter"]').on('change', function (evt) {
          var input = evt.currentTarget;
          if (input.checked) {
            myShuffle.filter(input.value);
          }
        });
        $('.shuffle-btn-group label').on('click', function () {
          $('.shuffle-btn-group label').removeClass('active');
          $(this).addClass('active');
        });
      }
    }
    projectShuffle();


    // testimonial carousel
    function testimonialCarousel() {
      $('.testimonial-slide').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        speed: 600,
        arrows: false
      });
    }
    testimonialCarousel();


    // team carousel
    function teamCarousel() {
      $('.team-slide').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 2,
        arrows: true,
        prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>',
        responsive: [{
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 481,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        ]
      });
    }
    teamCarousel();




  });


});

  // copyright get full year
  document.getElementById("year").innerHTML = new Date().getFullYear();

  // Logos automaticos svg
  let svg = '<a href="/" class="logo"><figure><svg xmlns="http://www.w3.org/2000/svg" id="Camada_2" viewBox="0 0 298.9 96.9"><style type="text/css">.st0{fill:#FFFFFF;}</style><g><polygon class="st0" points="18.9 62 15.5 55.8 15.5 87.1 16.6 95.3 3.5 95.3 3.5 41.3 2 29.2 12.7 29.2 41.9 69.4 68.5 29.2 77.5 29.2 77.5 87.1 78.7 95.3 64 95.3 64 55.8 61 62 40.7 89.4 "/><path class="st0" d="M141.8 83.5l-21.3-54.4 -8.9 2L84.8 95.3h12.5l6.2-14.8h23.1l5.9 14.8h15.1L141.8 83.5zM106.8 70.7l7.5-18.5 1-3.8 0.9 3.7 7.2 18.5H106.8z"/><path class="st0" d="M199.2 46.2c-5.8-5.4-12.1-7.6-18.3-7.6 -11.8 0-20.7 11.2-20.7 24 0 14.9 10.8 23.4 21.6 23.4 5.5 0 10.7-1.2 10.7-1.2V71.2l-1.9-8.2h15l0.1 28.1c0 0-12.2 4.2-25.9 4.2 -17.2 0-33.8-10.7-33.8-31.8 0-20.2 15.1-34.4 34.6-34.4 9.4 0 17.2 2.5 23.9 7.9L199.2 46.2z"/><path class="st0" d="M266.2 46.2c-5.8-5.4-12.1-7.6-18.3-7.6 -11.8 0-20.7 11.2-20.7 24 0 14.9 10.7 23.4 21.6 23.4 5.5 0 10.7-1.2 10.7-1.2V71.2l-1.9-8.2h15l0.1 28.1c0 0-12.2 4.2-25.9 4.2 -17.2 0-33.8-10.7-33.8-31.8 0-20.2 15.1-34.4 34.6-34.4 9.4 0 17.2 2.5 23.9 7.9L266.2 46.2z"/><polygon class="st0" points="295.8 85.7 296.9 95.3 282.2 95.3 282.2 40.2 280.7 29 295.8 29 "/></g><g><path class="st0" d="M154.6 20.9V4.1h9.9v3h-6.3v3.4h6.3v3h-6.3v4.2h6.3v3H154.6z"/><path class="st0" d="M166.6 20.9l2.6-16.8h3.8l3.2 9.9c0.1 0.2 0.1 0.5 0.2 0.9 0.1 0.4 0.2 0.9 0.2 1.4 0.1-0.5 0.1-1 0.2-1.4 0.1-0.4 0.1-0.7 0.2-0.9l3.3-9.8h3.7l2.6 16.8h-3.4l-1.2-10.1c-0.1-0.7-0.2-1.3-0.2-1.7 0-0.4 0-0.7 0-1.1 0-0.2 0-0.3 0-0.4 0-0.1 0-0.2 0-0.2 -0.1 0.7-0.2 1.2-0.3 1.7 -0.1 0.5-0.2 0.8-0.3 1.1l-3.5 10.7h-2L172 10.2c0-0.1-0.1-0.4-0.2-0.8 -0.1-0.4-0.2-1.1-0.4-2v0.5c0 0.8-0.1 1.7-0.2 2.9l0 0L170 20.9H166.6z"/><path class="st0" d="M188.8 20.9V4.1h4.1c2.2 0 3.8 0.4 4.9 1.3 1 0.8 1.6 2.1 1.6 3.9 0 1.6-0.5 2.9-1.6 3.8 -1.1 0.9-2.5 1.4-4.4 1.4h-1v6.4H188.8zM192.4 11.7h0.5c1 0 1.7-0.2 2.1-0.6 0.4-0.4 0.7-1.1 0.7-1.9 0-0.8-0.2-1.4-0.7-1.8s-1.2-0.6-2.1-0.6h-0.5V11.7z"/><path class="st0" d="M214 20.9h-4.1l-4.4-7.8v7.8h-3.6V4.1h5.1c2 0 3.6 0.4 4.6 1.2 1 0.8 1.5 2 1.5 3.6 0 1.2-0.3 2.1-1 3 -0.7 0.8-1.6 1.3-2.7 1.4L214 20.9zM205.5 11.3h0.5c1.5 0 2.4-0.2 2.9-0.5 0.5-0.3 0.7-0.9 0.7-1.7 0-0.8-0.2-1.4-0.7-1.8 -0.5-0.3-1.4-0.5-2.8-0.5h-0.5V11.3z"/><path class="st0" d="M216.1 20.9V4.1h9.9v3h-6.3v3.4h6.3v3h-6.3v4.2h6.3v3H216.1z"/><path class="st0" d="M228.4 18.8l2-2.3c0.3 0.6 0.7 1.1 1.2 1.5 0.6 0.4 1.2 0.5 1.9 0.5 0.8 0 1.5-0.2 2-0.6 0.5-0.4 0.7-0.9 0.7-1.6 0-0.8-0.8-1.6-2.4-2.4 -0.5-0.3-0.9-0.5-1.2-0.6 -1.5-0.8-2.5-1.5-3-2.2 -0.6-0.7-0.8-1.6-0.8-2.6 0-1.4 0.5-2.5 1.6-3.4 1.1-0.9 2.5-1.3 4.3-1.3 1 0 1.9 0.2 2.6 0.5 0.7 0.4 1.4 0.9 2 1.7L237 8c-0.3-0.5-0.6-0.9-1-1.1 -0.4-0.2-0.9-0.4-1.5-0.4 -0.7 0-1.3 0.2-1.7 0.5 -0.4 0.4-0.7 0.8-0.7 1.4 0 0.9 0.9 1.7 2.6 2.4 0.3 0.1 0.6 0.3 0.8 0.3 1.4 0.6 2.5 1.4 3.2 2.2s1 1.7 1 2.8c0 1.6-0.5 2.8-1.6 3.8 -1.1 0.9-2.5 1.4-4.3 1.4 -1.3 0-2.4-0.2-3.3-0.7C229.5 20.2 228.8 19.6 228.4 18.8z"/><path class="st0" d="M240.6 20.9L247 4.1h4.1l6.5 16.8h-4.1l-1.4-3.6h-6.5l-1.2 3.6H240.6zM251.3 14.5l-1.9-5.4c-0.1-0.2-0.1-0.4-0.2-0.8 -0.1-0.4-0.2-0.9-0.3-1.4 -0.1 0.5-0.2 1-0.3 1.5 -0.1 0.4-0.2 0.7-0.2 0.9l-1.8 5.3H251.3z"/><path class="st0" d="M258.2 18.8l2-2.3c0.3 0.6 0.7 1.1 1.2 1.5 0.6 0.4 1.2 0.5 1.9 0.5 0.8 0 1.5-0.2 2-0.6 0.5-0.4 0.7-0.9 0.7-1.6 0-0.8-0.8-1.6-2.4-2.4 -0.5-0.3-0.9-0.5-1.2-0.6 -1.5-0.8-2.5-1.5-3-2.2 -0.6-0.7-0.8-1.6-0.8-2.6 0-1.4 0.5-2.5 1.6-3.4 1.1-0.9 2.5-1.3 4.3-1.3 1 0 1.9 0.2 2.6 0.5 0.7 0.4 1.4 0.9 2 1.7l-2.1 2c-0.3-0.5-0.6-0.9-1-1.1 -0.4-0.2-0.9-0.4-1.5-0.4 -0.7 0-1.3 0.2-1.7 0.5 -0.4 0.4-0.7 0.8-0.7 1.4 0 0.9 0.9 1.7 2.6 2.4 0.3 0.1 0.6 0.3 0.8 0.3 1.4 0.6 2.5 1.4 3.2 2.2 0.7 0.8 1 1.7 1 2.8 0 1.6-0.5 2.8-1.6 3.8 -1.1 0.9-2.5 1.4-4.3 1.4 -1.3 0-2.4-0.2-3.3-0.7C259.4 20.2 258.7 19.6 258.2 18.8z"/></g></svg> </figure></a>';
  let div = document.createElement('div');
  div.innerHTML = svg;
  document.getElementById('menu_logo').appendChild(div);


  if(window.screen.availWidth<1000){
    let svg1 = '<div id="about2" class="about2 section-bg"><div><div class="pt-lg-0 content d-flex justify-content-start centralizejs"><ul class="d-flex"><li class="align-items-center"><div class="m-2 mb-0 ms-0 text-uppercase fw-bold"><h3 style="color: #a4b4c0;">TRABALHE CONOSCO</h3><ul class="list-arrow"><li class="mb-2" style="justify-content: center;"><a href="/" class="text-uppercase" style="color: #a4b4c0;">POLITICA DE PRIVACIDADE</a></li><li class="mb-2" style="justify-content: center;"><a href="/" class="text-uppercase" style="color: #a4b4c0;">TERMOS E CONSIÇÕES</a></li><li class="mb-2" style="justify-content: center;"><a href="/" class="text-uppercase" style="color: #a4b4c0;">LOCALIZAÇÃO DAS CONCESSIONÁRIAS</a></li><li class="mb-2" style="justify-content: center;"><a href="/" class="text-uppercase" style="color: #a4b4c0;">NEW</a></li></ul></div></li></ul></div></div></div>';
    let div1 = document.createElement('div');
    div1.innerHTML = svg1;
    document.getElementById('MobileInfo').appendChild(div1);
  }

  



   /**
   * Modifica slide Mobile/Desktop
   */
   if(window.screen.availWidth<780){
    $('.menuMobile').addClass('none').removeClass('menuMobile');
  }

  if(window.screen.availWidth>781){
    $('.logotopo').addClass('none').removeClass('logotopo');
  }

  if(window.screen.availWidth<781){
    $('.mobileDesktop').addClass('none').removeClass('mobileDesktop', 'banner-carousel-item');
  }

  if(window.screen.availWidth>781){
    $('.mobileSlide').addClass('none').removeClass('mobileSlide', 'banner-carousel-item');
  }

  if(window.innerWidth>1600){
    $('.x').addClass('ajusteimg');
  }

  if(window.innerWidth>1000){
    $('.esconder-social-desktop').addClass('d-none').removeClass('esconder-social-desktop');
  }
  // if(window.innerWidth<1900){
  //   $('.remove-container').addClass('container-1').removeClass('container');
  // }

  if(window.innerWidth>1900){
    $('.bateria').addClass('justify-content-space-around').removeClass('justify-content-around');
  }
  if(window.innerWidth<1900){
    $('.bateria').addClass('justify-content-around').removeClass('justify-content-space-around');
  }
  if(window.innerWidth>2000){
    $('.bateria').addClass('justify-content-around').removeClass('justify-content-space-around');
  }

  if(window.innerWidth<1000) {
    $('.ocultar-mobile').addClass('d-none');
  }

  if(window.innerWidth<1000) {
    $('.col-12-mobile').addClass('col-10').removeClass('col-4');
  }

  if(window.innerWidth<1000) {
    $('.centralizejs').addClass('justify-content-center').removeClass('justify-content-start');
  }