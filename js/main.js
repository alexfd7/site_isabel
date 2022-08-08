$(document).ready(function() {
    "use strict";
    var window_width = $(window).width(),
        window_height = window.innerHeight,
        header_height = $(".default-header").height(),
        header_height_static = $(".site-header.static").outerHeight(),
        fitscreen = window_height - header_height;
    $(".fullscreen").css("height", window_height)
    $(".fitscreen").css("height", fitscreen);
    new WOW().init();
    $(window).on("scroll", function() {
        if ($(this).scrollTop() > 100) {
            $('#header1').addClass('header-scrolled1');
            $('#back-top').addClass('back-top-animation');
        } else {
            $('#header1').removeClass('header-scrolled1');
            $('#back-top').removeClass('back-top-animation');
        }
    });

    $(window).on('load', function() {
        $(".preloader-area").delay(200).fadeOut(500);
    })


    $('.nav-menu').superfish({
        animation: {
            opacity: 'show'
        },
        speed: 400
    });
    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('#nav-menu-container').clone().prop({
            id: 'mobile-nav'
        });
        $mobile_nav.find('> ul').attr({
            'class': '',
            'id': ''
        });
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="lnr lnr-menu"></i></button>');
        $('body').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="lnr lnr-chevron-down"></i>');
        $(document).on('click', '.menu-has-children i', function(e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle();
            $(this).toggleClass("lnr-chevron-up lnr-chevron-down");
        });
        $(document).on('click', '#mobile-nav-toggle', function(e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
            $('#mobile-body-overly').toggle();
        });
        $(document).click(function(e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
                    $('#mobile-body-overly').fadeOut();
                }
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }
    $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                var top_space = 0;
                if ($('#header').length) {
                    top_space = $('#header').outerHeight();
                    if (!$('#header').hasClass('header-fixed')) {
                        top_space = top_space;
                    }
                }
                $('html, body').animate({
                    scrollTop: target.offset().top - top_space
                }, 1500, 'easeInOutExpo');
                if ($(this).parents('.nav-menu').length) {
                    $('.nav-menu .menu-active').removeClass('menu-active');
                    $(this).closest('li').addClass('menu-active');
                }
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('lnr-times lnr-bars');
                    $('#mobile-body-overly').fadeOut();
                }
                return false;
            }
        }
    });
    $(document).ready(function() {
        $('html, body').hide();
        if (window.location.hash) {
            setTimeout(function() {
                $('html, body').scrollTop(0).show();
                $('html, body').animate({
                    scrollTop: $(window.location.hash).offset().top - 108
                }, 1000)
            }, 0);
        } else {
            $('html, body').show();
        }
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });
    if ($('.active-brand-carusel').length) {
        $('.active-brand-carusel').owlCarousel({
            items: 5,
            loop: true,
            autoplayHoverPause: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 3,
                },
                991: {
                    items: 4,
                },
                1024: {
                    items: 5,
                }
            }
        });
    }
    if ($('.testi_slider').length) {
        $('.testi_slider').owlCarousel({
            loop: true,
            margin: 30,
            items: 1,
            nav: true,
            autoplay: 2500,
            smartSpeed: 1500,
            dots: true,
            responsiveClass: true,
            navText: ["<i class='lnr lnr-arrow-left'></i>", "<i class='lnr lnr-arrow-right'></i>"]
        })
    }

   

    $("#mobile-nav a").on("click", function() {        
        $('body').toggleClass('mobile-nav-active');
        $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
        $('#mobile-body-overly').toggle();
    });

    $.scrollIt();


    $('#send_btn').on('click', function (e) {        
        if (!e.isDefaultPrevented()) {

            var nome_input = $("#nome").val();                                  
            var telefone_input = $("#telefone").val();
            var mensagem_input = $("#mensagem").val();          
            var email_input = $("#email").val();          
            var url = "contact.php";


            const formData = new FormData();

            formData.append("nome",nome_input);
            formData.append("telefone",telefone_input);
            formData.append("email",email_input);
            formData.append("mensagem",mensagem_input);
            

            if(!nome_input || !telefone_input || !mensagem_input || !email_input ){

                alert('Preencha os campos obrigatórios!');

            }else{

              $.ajax({
                  type: "POST",
                  url: url,
                  data: formData,
                  processData: false,
                  contentType: false,                  
                  success: function (data)
                  {                      
                      var messageAlert = 'alert-' + data.type;
                      var messageText = data.message;

                      var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                      if (messageAlert && messageText) {
                          $('#form_contato').find('.messages').html(alertBox);
                          $('#form_contato')[0].reset();
                      }
                      
                  }
              });             

            }            


            return false;
        }
    });         
});