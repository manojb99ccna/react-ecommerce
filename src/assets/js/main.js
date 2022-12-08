(function($) {
    'use strict';


/*
-------------------------------------------
Mobile menu
--------------------------------------------- 
*/
    
$('.mobile-menu nav').meanmenu({
	meanMenuContainer: '.mobile-menu-area',
	meanScreenWidth: "991",
	meanRevealPosition: "right",
});


new WOW().init();

 



/*-------------------------------------------
Sticky Header
--------------------------------------------- */ 
    var win = $(window);
    var sticky_id = $("#sticky-header-with-topbar");
        win.on('scroll',function() {    
        var scroll = win.scrollTop();
        if (scroll < 245) {
        sticky_id.removeClass("scroll-header");
        }else{
            sticky_id.addClass("scroll-header");
        }
    });


/*------------------------------------    
Scroll top
--------------------------------------*/ 
$( '#scrollUp' ).on( 'click', function () {
	$("html, body").animate({ scrollTop: 0 }, "slow");
});

/*------------------------------------    
Search Bar
--------------------------------------*/ 
    
    $( '.search__open' ).on( 'click', function () {
        $( 'body' ).toggleClass( 'search__box__show__hide' );
        return false;
    });

    $( '.search__close__btn .search__close__btn_icon' ).on( 'click', function () {
        $( 'body' ).toggleClass( 'search__box__show__hide' );
        return false;
    });


 /*------------------------------------    
Shopping Cart Area
--------------------------------------*/

    $('.cart__menu').on('click', function(e) {
        e.preventDefault();
        $('.shopping__cart').addClass('shopping__cart__on');
        $('.body__overlay').addClass('is-visible');

    });

    $('.offsetmenu__close__btn').on('click', function(e) {
        e.preventDefault();
        $('.shopping__cart').removeClass('shopping__cart__on');
        $('.body__overlay').removeClass('is-visible');
    });


/*------------------------------------    
Filter Area
--------------------------------------*/

    $('.filter__menu').on('click', function(e) {
        e.preventDefault();
        $('.filter__wrap').addClass('filter__menu__on');
        $('.body__overlay').addClass('is-visible');

    });

    $('.filter__menu__close__btn').on('click', function(e) {
        e.preventDefault();
        $('.filter__wrap').removeClass('filter__menu__on');
        $('.body__overlay').removeClass('is-visible');
    });




/*------------------------------------    
Overlay Close
--------------------------------------*/

$('.body__overlay').on('click', function() {
	$(this).removeClass('is-visible');
	$('.offsetmenu').removeClass('offsetmenu__on');
	$('.shopping__cart').removeClass('shopping__cart__on');
	$('.filter__wrap').removeClass('filter__menu__on');
	$('.user__meta').removeClass('user__meta__on');
	$('.off__canvars__wrap').removeClass('off__canvars__wrap__on');
	$('body').removeClass('off__canvars__open');
	$('.menu__click').show();
});


/*-----------------------------------------------
Slider
-------------------------------------------------*/

    if ($('.slider__activation__wrap').length) {
        $('.slider__activation__wrap').owlCarousel({
        loop: true,
        margin:0,
        nav:true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1000,
        autoplay: false,
        navText: [ '<i class="icon-arrow-left icons"></i>', '<i class="icon-arrow-right icons"></i>' ],
        autoplayTimeout: 10000,
        items:1,
        dots: false,
        lazyLoad: true,
        responsive: {
          0: {
            items: 1,
          },
          767: {
            items: 1,
          },
          991: {
            items: 1,
          }
        }
        });
    }


 
if ($('.featured-products').length) {

	$('.featured-products').owlCarousel({
      loop: true,
      margin:10,
      nav:true,
      autoplay: true,
      autoplayTimeout: 10000,
      items:5,
      dots: false,
      lazyLoad: true,
	  navText: [ '<i class="icon-arrow-left icons"></i>', '<i class="icon-arrow-right icons"></i>' ],
      responsive: {
        0: {
          items: 1,
        },
        767: {
          items: 3,
        },
        991: {
          items: 5,
        }
      }
    });

        
}


/*------------------------------------    
Clear filter
--------------------------------------*/
$( '.filter-opt' ).on( 'click', function () {
	var attr = $(this).attr("attr-title");
	$('.' + attr + '').prop('checked', false);
	 
});

/*------------------------------------    
checkout
--------------------------------------*/
$(document).on('click', '.btn-checkout-login', function () { 
	var LoginFrm = $("#checkoutForm").serialize();
	var url = "ajax/ajax_checkout_login.php";
	$('.btn-checkout-login').html('Wait..');
	$.ajax({
			url: url,
			method: "POST",
			data: {
				LoginFrm: LoginFrm,
			},
			dataType: "text",
			success: function (script_response)
			{   
				var data = $.parseJSON(script_response);  
				if(data['success']=='true'){  
					 $('.loginStep').html(data['content']); 
					 $(".loginMsg").html("");
				}else{ 
					$('.btn-checkout-login').html('Next');
					$(".loginMsg").html('<div class="error">'+data['message']+'</div>'); 
					setTimeout(function(){ $(".loginMsg").html("");  }, 8000); 
				}  
				
			}
		});


});


$(document).on('click', '.btn-checkout-login-2', function () { 
		var LoginFrm = $("#checkoutForm").serialize();
		var url = "ajax/ajax_checkout_login_verify.php";
		 
		$('.btn-login').html('Wait..');
		
		$.ajax({
			url: url,
			method: "POST",
			data: {
				LoginFrm: LoginFrm,
			},
			dataType: "text",
			success: function (script_response)
			{   
				var data = $.parseJSON(script_response);  
				if(data['success']=='true'){  
					 
					 $("#checkoutForm").html(data['content']); 
					 
				}else{ 
					$('.btn-login').html('Next');
					$(".loginMsg").html('<div class="error">'+data['message']+'</div>'); 
					 setTimeout(function(){ $(".loginMsg").html("");  }, 8000); 
				}  
				
			}
		});
});	


$(document).on('click', '.btn-checkout-step-3', function () { 
	var LoginFrm = $("#checkoutForm").serialize();
	var url = "ajax/ajax_checkout_shipping_address.php";
	$('.btn-checkout-step-3').html('Wait..');
	
	$.ajax({
		url: url,
		method: "POST",
		data: {
			LoginFrm: LoginFrm,
		},
		dataType: "text",
		success: function (script_response)
		{   
			var data = $.parseJSON(script_response); 
			if(data['success']=='true'){  
				 $('#checkoutForm').html(data['content']); 
				 $(".loginMsg").html("");
				 
				 $("#checkoutForm").attr('action','/order');
			}else{ 
				$('.btn-checkout-step-3').html('Next');
				$(".loginMsg").html('<div class="error">'+data['message']+'</div>'); 
				setTimeout(function(){ $(".loginMsg").html("");  }, 8000); 
			} 					
			  
			  
			
		}
	});
	
});


/*------------------------------------    
ajax login popup
--------------------------------------*/

$(document).on('click', '.btn-login', function () { 
			var LoginFrm = $("#loginForm").serialize();
			var url = "ajax/ajax_popup_login.php";
			 
			$('.btn-login').html('Wait..');
			
			$.ajax({
				url: url,
				method: "POST",
				data: {
					LoginFrm: LoginFrm,
				},
				dataType: "text",
				success: function (script_response)
				{   
					var data = $.parseJSON(script_response);  
					if(data['success']=='true'){  
						 $('#loginForm').html(data['content']); 
						 $(".loginMsg").html("");
						  
						 
					}else{ 
						$('.btn-login').html('Next');
						$(".loginMsg").html('<div class="error">'+data['message']+'</div>'); 
						setTimeout(function(){ $(".loginMsg").html("");  }, 8000); 
					}  
					
				}
			});
	});



})(jQuery); 