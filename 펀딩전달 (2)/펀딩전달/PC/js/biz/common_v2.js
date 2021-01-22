jQuery(function($) {
	$(document).ready(function() {
		initBizTopNavigation();
	});
});

$(document).ready(function(){
	subFn();
});

//GNB 장바구니 카운드 갱신
function initBizTopNavigation() {
    $.ajax({
        type: 'GET'
        ,url: '/ht/order/ajaxGetCartCount'
        ,dataType: 'json'
        ,success: function(data) {
        	if(data.cartCount > 0){
        		$('.bizCartCount').html( price_format(data.cartCount) );
        	}
        }
        ,error: function(data) {
            // ignore
        }
    });
}

function bodyScroll(){//body scroll
	var header = $('#header')
	var subHeader = $('.header_wrap')
	var gnb = $('#gnb')
	var gnbFn = $('.gnb_wrap')
	var spd = 0.5;
	var eft = Power3.easeOut;
	var gnbFnTop = gnbFn.offset().top

	$(window).on('scroll touchmove', function(){//window scrollto
		scrollBarTo();
	})

	function scrollBarTo(){
		if ($(window).scrollTop() > gnbFnTop) {
			header.addClass('fixed');
			TweenLite.to(gnb.css('position','fixed'),1,{ease:Power4.easeOut})
		} else{
			header.removeClass('fixed');
			TweenLite.to(gnb.css('position','relative'),1,{ease:Power4.easeOut})
		}
	}
	/*
	subTop.on('click', function(){//top button
		$('html,body').stop(true,false).animate({
			scrollTop:0
		},1000,'easeInOutQuint')
		return false;
	})
	*/
}

function gnb(){//gnb
	var spd = 0.5,
		eft = Power4.easeOut;

    $('#gnb .btn_category').on('mouseenter', function(){
        $('#gnb .category_cont').addClass('gnb_open');
	    $(this).addClass('active');
	})

    $('#gnb .category_cont > ul > li').on('mouseenter', function(){
        $('#gnb .category_cont').addClass('on');
	})

    $('#gnb .category_wrap').on('mouseleave', function(){
        $('#gnb .category_cont').removeClass('gnb_open');
        $('#gnb .category_cont').removeClass('on');
		$('#gnb .btn_category').removeClass('active');
	})

    $('#gnb .category_cont').on('mouseleave', function(){
        $(this).removeClass('gnb_open');
        $(this).removeClass('on');
		$('#gnb .category_wrap ul li').removeClass('active');
	})

    $('#gnb .category_cont ul li').on('mouseenter', function(){
        $(this).addClass('active').siblings().removeClass('active');
	})

	$('#gnb .category_wrap .dp2 ul li').on('mouseleave', function(){
        $(this).removeClass('active');
	})

	$('#gnb .category_wrap .dp3 ul li').on('mouseleave', function(){
        $(this).removeClass('active');
	})

	/* top 배너 버튼 */
	$('.top_banner .btn_close').on('click', function(){
        setCookieMobile( "todayCookie", "done" , 1);
		TweenLite.to($('.top_banner'),spd,{ease:eft,height:0});
    });

}

/* top 배너 오늘 하루 안보기 */
function setCookieMobile ( name, value, expiredays ) {
    var todayDate = new Date();
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function getCookieMobile () {
    var cookiedata = document.cookie;
    if ( cookiedata.indexOf("todayCookier=done") < 0 ){
         $(".content_new .top_banner").show();
    }
    else {
        $(".content_new .top_banner").hide();
    }
}
getCookieMobile();
/*// top 배너 오늘 하루 안보기 */

function nav(){
	var locationNav = $('.location_wrap .location_nav_wrap');

	locationNav.find('a').on('focus mouseenter', function(event) {
		$(this).addClass('active');
	});

	locationNav.on('blur mouseleave', function(event) {
		$(this).find('a').removeClass('active');
	});
}

function categoryFn(){//category
	$('.category_wrap .tag_list ul li').on('click', function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		}else{
			$(this).addClass('active');
		}
	});

	$('.category_banner').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
	    var i = (currentSlide ? currentSlide : 0) + 1;
	    $('.category_banner_wrap .custom_paging').html('<strong>'+ i + '</strong>'+ slick.slideCount);
	});

	var categorySwiper = $('.category_banner').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		speed: 1000,
		centerMode: true,
		arrows: true,
		infinite: true,
		centerPadding: '485px',
		variableWidth: true,
		variableHeight: true,
		dots: false,
		swipe: false,
	});

	var categorySwiper02 = $('.category_wrap .pd_unit01 .category_slide ul').bxSlider({
		auto: false,
		pause: 3000,
		speed: 1000,
		hideControlOnEnd: true,
		minSlides: 4,
		maxSlides: 4,
        slideWidth: 215,
		slideMargin: 30,
		infiniteLoop: false,
		touchEnabled: false,
		pager: true,
		pagerType: 'short',
		pagerShortSeparator: '',
	});

	var categorySwiper03 = $('.category_wrap .pd_unit02 .category_slide ul').bxSlider({
		auto: false,
		pause: 3000,
		speed: 1000,
		hideControlOnEnd: true,
		minSlides: 4,
		maxSlides: 4,
        slideWidth: 215,
		slideMargin: 30,
		infiniteLoop: false,
		touchEnabled: false,
		pager: true,
		pagerType: 'short',
		pagerShortSeparator: '',
	});

	var categorySwiper04 = $('.category_wrap .pd_unit03 .category_slide ul').bxSlider({
		auto: false,
		pause: 3000,
		speed: 1000,
		hideControlOnEnd: true,
		minSlides: 3,
		maxSlides: 3,
        slideWidth: 310,
		slideMargin: 10,
		infiniteLoop: false,
		touchEnabled: false,
		pager: true,
		pagerType: 'short',
		pagerShortSeparator: '',
	});

	var categorySwiper05 = $('.category_wrap .pd_unit04 .category_slide ul').bxSlider({
		auto: false,
		pause: 3000,
		speed: 1000,
		hideControlOnEnd: true,
		minSlides: 4,
		maxSlides: 4,
        slideWidth: 215,
		slideMargin: 30,
		infiniteLoop: false,
		touchEnabled: false,
		pager: true,
		pagerType: 'short',
		pagerShortSeparator: '',
	});

}

function eventFn(){//event
	var eventSlider01 = $('.new_event .event_top .cont .event_top_slider ul').bxSlider({
		auto : false,
		hideControlOnEnd: true,
		pause : 3000,
		speed : 1000,
		infiniteLoop : false,
		touchEnabled: false,
	    pager: true,
		pagerType: 'short',
		pagerShortSeparator: '',
		onSliderLoad: function(currentIndex){
			$('.event_top_slider ul').children().eq(currentIndex).addClass('active-slide');
		},
		onSlideBefore: function($slideElement){
			$('.event_top_slider ul').children().removeClass('active-slide');
			$slideElement.addClass('active-slide');
		}
	});

	var eventSlider02 = $('.new_event .event_top .cont.one .event_top_slider ul').bxSlider({
		auto : false,
		hideControlOnEnd: true,
		minSlides: 2,
		pause : 3000,
		speed : 1000,
		infiniteLoop : false,
		touchEnabled: false,
	    pager: true,
		pagerType: 'short',
		pagerShortSeparator: '',
	});
}

function searchFn(){//search
	$('.search_top .input_wrap input').on('input change', function() {
		var $this = $(this);
		var visible = Boolean($this.val());
		$('.search_top .input_clear').toggleClass('hidden', !visible);
	}).trigger('propertychange');

	$('.search_top .input_wrap').each(function(){
		if($(this).find("input[type='text']").attr('value')){
			$(this).find(".search_top .input_clear").removeClass('hidden');
		}
	});

	$(".search_top .input_clear").on('click', function() {
		$(this).siblings('input[type=\'text\']').val('').trigger('change').focus();
		$(this).toggleClass('hidden', true);
	});

	$(".search_wrapper .btn_filter").on('click', function() {
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$(this).parents('.search_filter').removeClass('active');
			$(this).parents('.search_filter').removeClass('on_select');
		}else{
			$(this).addClass('active');
			$(this).parents('.search_filter').addClass('active');
		}
	});

	$(".search_filter .btn_dp2").on('click', function() {
        var h = 0,
            spd = 400,
            eft = 'easeOutCubic'

        $(this).next('.search_dp3').find('ul').map(function() {
            h += $(this).innerHeight()
        });

        if($(this).hasClass('on')){
            $(this).removeClass('on').next('.search_dp3').stop(true,false).animate({
                'height':'0px'
            },spd,eft);
        }else{
            $(this).parents('li').siblings('li').find('.btn_dp2').removeClass('on').next('.search_dp3').stop(true,false).animate({
                'height':'0px'
            },spd,eft);
            $(this).addClass('on').next('.search_dp3').stop(true,false).animate({
                'height':h+'px'
            },spd,eft);
        }
        return false;
    });

	var searchSwiper = $('.search_wrapper .cont01 .search_slide ul').bxSlider({
		auto: false,
		pause: 3000,
		speed: 1000,
		hideControlOnEnd: true,
		minSlides: 3,
		maxSlides: 3,
        slideWidth: 310,
		slideMargin: 10,
		infiniteLoop: false,
		touchEnabled: false,
		pager: true,
		pagerType: 'short',
		pagerShortSeparator: '',
	});

	var searchSwiper02 = $('.search_wrapper .cont02 .category_slide ul').bxSlider({
		auto: false,
		pause: 3000,
		speed: 1000,
		hideControlOnEnd: true,
		minSlides: 4,
		maxSlides: 4,
        slideWidth: 215,
		slideMargin: 30,
		infiniteLoop: false,
		touchEnabled: false,
		pager: true,
		pagerType: 'short',
		pagerShortSeparator: '',
	});

	var searchSwiper02 = $('.search_wrapper .pd_unit.best .category_slide ul').bxSlider({
		auto: false,
		pause: 3000,
		speed: 1000,
		hideControlOnEnd: true,
		minSlides: 4,
		maxSlides: 4,
        slideWidth: 215,
		slideMargin: 30,
		infiniteLoop: false,
		touchEnabled: false,
		pager: true,
		pagerType: 'short',
		pagerShortSeparator: '',
	});
}

function subFn(){
	/*
	$('.content_new .btn_like').on('click', function(){//좋아요 버튼
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		}else{
			$(this).addClass('active');
		}
	});
	*/

	$('.resize_select').change(function(){//resize Select
		var text = $(this).find('option:selected').text();
		var $aux = $('<select/>').append($('<option/>').text(text));
		$(this).after($aux);
		$(this).width($aux.width()+20);
		$aux.remove();
	}).change();
}

function mainFn(){
   var obj = {};

   var mainSlider01 = $('.main_wrapper .main_top_slider ul').bxSlider({
      auto : true,
      autoHover: true,
      //autoControls: true,
      //stopAutoOnClick: true,
      hideControlOnEnd: true,
      maxSlides: 1,
      pause : 3000,
      speed : 1000,
      infiniteLoop : true,
      touchEnabled: false,
       pager: true,
      pagerType: 'short',
      pagerShortSeparator: '',
      onSliderLoad: function (currentIndex){
          $(document).on("click", ".main_wrapper .main_top_slider .bx-controls-direction a", function(){
        	  mainSlider01.stopAuto();
        	  mainSlider01.startAuto();
          });
       }
   });
/*
   $('.main_wrapper .cont06 .btn_more').on('click', function(){
      if($(this).hasClass('on')){
         $(this).removeClass('on');
         $(this).children('span').text("더보기");
      }else{
         $(this).addClass('on');
         $(this).children('span').text("접기");
      }
   });
*/
   $('.main_wrapper .cont04 .slide_banner').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
      var i = (currentSlide ? currentSlide : 0) + 1;
      $('.cont04 .custom_paging').html('<strong>'+ i + '</strong>'+ slick.slideCount);
   });

   $('.main_wrapper .cont04 .slide_banner').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 1000,
      centerMode: true,
      arrows: true,
      infinite: true,
      variableWidth: true,
      variableHeight: true,
      dots: false,
   });

   var mainCont05Slider = $('.main_wrapper .cont05 .slide_banner ul').bxSlider({
      auto: false,
      pause: 3000,
      speed: 1000,
      hideControlOnEnd: true,
      minSlides: 4,
      maxSlides: 4,
        slideWidth: 230,
      slideMargin: 10,
      infiniteLoop: false,
      touchEnabled: false,
      pager: true,
      pagerType: 'short',
      pagerShortSeparator: '',
   });
   obj["mainCont05Slider"] = mainCont05Slider;

   $('.main_wrapper .cont07 .slide_banner').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
      var i = (currentSlide ? currentSlide : 0) + 1;
      $('.cont07 .event_banner_wrap .custom_paging').html('<strong>'+ i + '</strong>'+ slick.slideCount);
   });

   $('.main_wrapper .cont07 .slide_banner').slick({
	  autoplay : true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 1000,
      centerMode: true,
      arrows: true,
      infinite: true,
      centerPadding: '485px',
      variableWidth: true,
      variableHeight: true,
      dots: false,
   });

   $('.main_wrapper .cont08 .slide_banner ul').bxSlider({
      auto : false,
      hideControlOnEnd: true,
      minSlides: 2,
      maxSlides: 2,
      pause : 3000,
      speed : 1000,
        slideWidth: 455,
      slideMargin: 40,
      infiniteLoop : true,
      touchEnabled: false,
       pager: true,
      pagerType: 'short',
      pagerShortSeparator: '',
   });

   var mainCont09Slider = $('.main_wrapper .cont09 .slide_banner ul').bxSlider({
      mode : 'vertical',
      hideControlOnEnd: true,
      auto : true,
      controls: false,
      pause : 3000,
      speed : 1000,
      infiniteLoop : false,
      touchEnabled: false,
      pager: true,
      onSliderLoad: function (currentIndex){
         $(document).on("click", ".main_wrapper .cont09 .bx-pager-item a", function(){
               mainCont09Slider.stopAuto();
               mainCont09Slider.startAuto();
         });
      }
   });

/*
   $('.main_wrapper .cont10 .slide_num').prepend(0+'<strong class="current-index"></strong>');

   $('.main_wrapper .cont10 .slide_banner > ul').bxSlider({
      auto : false,
      hideControlOnEnd: true,
      pause : 3000,
      controls: false,
      speed : 1000,
        slideWidth: 510,
      infiniteLoop : false,
      touchEnabled: false,
       pagerCustom: '.main_wrapper .cont10 .slide_banner .pager',
      onSliderLoad: function (currentIndex){
           $('.main_wrapper .cont10 .slide_num .current-index').text(currentIndex + 1);
       },
       onSlideBefore: function ($slideElement, oldIndex, newIndex){
           $('.main_wrapper .cont10 .slide_num .current-index').text(newIndex + 1);
       }
   });
*/
   //$('.main_wrapper .cont10 .slide_num').append(slider.getSlideCount());

   $('.main_wrapper .cont11 .slide_banner > ul').bxSlider({
      auto: false,
        pause: 3000,
        speed: 1000,
        hideControlOnEnd: true,
      moveSlides:1,
        minSlides: 4,
        maxSlides: 4,
        slideWidth: 320,
        slideMargin: 20,
        infiniteLoop: true,
        touchEnabled: false,
      pager: false,
      onSliderLoad: function (currentIndex){
          $('.custom-pager').children("strong").text(currentIndex + 1);
         $('.custom-pager').children("span").text($('.cont11 .slide_banner li:not(.bx-clone)').length);
         },
        onSlideBefore: function ($slideElement, oldIndex, newIndex){
         $('.custom-pager').children("strong").text(newIndex + 1);
           $('.custom-pager').children("span").text($('.cont11 .slide_banner li:not(.bx-clone)').length);
       },
        // pagerType: 'short',
        // pagerShortSeparator: ''
   });

   $('.main_wrapper .cont12 .slide_banner > ul').bxSlider({
      auto : false,
      hideControlOnEnd: true,
      pause : 3000,
      speed : 1000,
      infiniteLoop : false,
      touchEnabled: false,
      pager: true,
      pagerType: 'short',
      pagerShortSeparator: '',
   });

   $('.main_wrapper .cont15 .slide_banner > ul').bxSlider({
      auto : false,
      hideControlOnEnd: true,
      pause : 3000,
      speed : 1000,
      infiniteLoop : false,
      touchEnabled: false,
        slideWidth: 465,
   });

   $('.main_wrapper .cont16 .slide_banner > ul').bxSlider({
      auto : false,
      hideControlOnEnd: true,
      pause : 3000,
      speed : 1000,
      infiniteLoop : true,
      touchEnabled: false,
       pager: true,
      pagerType: 'short',
      pagerShortSeparator: '',
   });

   return obj;
}

function tasteFn(){

	var tasteSwiper01 = $('.personal_taste.taste01 .cont01 .taste_slide ul').bxSlider({
		auto: false,
		pause: 3000,
		speed: 1000,
		hideControlOnEnd: true,
		minSlides: 4,
		maxSlides: 4,
        slideWidth: 230,
		slideMargin: 10,
		infiniteLoop: false,
		touchEnabled: false,
		pager: true,
		pagerType: 'short',
		pagerShortSeparator: '',
	});

	var tasteSwiper02 = $('.personal_taste.taste01 .cont02 .taste_slide02 ul').bxSlider({
		auto : false,
		hideControlOnEnd: true,
		minSlides: 2,
		maxSlides: 2,
		pause : 3000,
		speed : 1000,
        slideWidth: 467,
		slideMargin: 16,
		infiniteLoop : false,
		touchEnabled: false,
	    pager: true,
		pagerType: 'short',
		pagerShortSeparator: '',
	});

	$('.personal_taste.taste02 .cont02 .slide_banner').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
		var i = (currentSlide ? currentSlide : 0) + 1;
		$('.personal_taste.taste02 .cont02 .custom_paging').html('<strong>'+ i + '</strong>'+ slick.slideCount);
	});

	$('.personal_taste.taste02 .cont02 .slide_banner').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 0,
		focusOnSelect: true,
		centerMode: true,
		arrows: true,
		infinite: true,
		variableWidth: true,
		variableHeight: true,
		centerPadding: '0',
		dots: false,
	});

	var tasteSwiper03 = $('.personal_taste.taste03 .cont01 .taste_slide ul').bxSlider({
		auto: false,
		pause: 3000,
		speed: 1000,
		hideControlOnEnd: true,
		minSlides: 4,
		maxSlides: 4,
        slideWidth: 230,
		slideMargin: 10,
		infiniteLoop: false,
		touchEnabled: false,
		pager: true,
		pagerType: 'short',
		pagerShortSeparator: '',
	});

	var tasteSwiper04 = $('.personal_taste.taste03 .cont03 .taste_slide ul').bxSlider({
		auto: false,
		pause: 3000,
		speed: 1000,
		hideControlOnEnd: true,
		minSlides: 4,
		maxSlides: 4,
        slideWidth: 230,
		slideMargin: 10,
		infiniteLoop: false,
		touchEnabled: false,
		pager: true,
		pagerType: 'short',
		pagerShortSeparator: '',
	});

	var tasteSwiper05 = $('.personal_taste.taste03 .cont04 .taste_slide ul').bxSlider({
		auto: false,
		pause: 3000,
		speed: 1000,
		hideControlOnEnd: true,
		minSlides: 4,
		maxSlides: 4,
        slideWidth: 230,
		slideMargin: 10,
		infiniteLoop: false,
		touchEnabled: false,
		pager: true,
		pagerType: 'short',
		pagerShortSeparator: '',
	});

	var tasteSwiper06 = $('.personal_taste.taste03 .cont05 .taste_slide ul').bxSlider({
		auto: false,
		pause: 3000,
		speed: 1000,
		hideControlOnEnd: true,
		minSlides: 4,
		maxSlides: 4,
        slideWidth: 230,
		slideMargin: 10,
		infiniteLoop: false,
		touchEnabled: false,
		pager: true,
		pagerType: 'short',
		pagerShortSeparator: '',
	});

	var tasteSwiper07 = $('.personal_taste.taste04 .cont03 .taste_slide ul').bxSlider({
		auto: false,
		pause: 3000,
		speed: 1000,
		hideControlOnEnd: true,
		minSlides: 4,
		maxSlides: 4,
        slideWidth: 230,
		slideMargin: 10,
		infiniteLoop: false,
		touchEnabled: false,
		pager: true,
		pagerType: 'short',
		pagerShortSeparator: '',
	});

	$('.personal_taste.taste04 .cont04 .keyword_slide').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 1000,
		arrows: true,
		infinite: false,
		centerMode: true,
		vertical: true,
		autoplay: true,
		autoplaySpeed: 3000,
		dots: false,
	});

	var tasteSwiper08 = $('.personal_taste.taste04 .cont04 .taste_slide ul').bxSlider({
		auto: false,
		pause: 3000,
		speed: 1000,
		hideControlOnEnd: true,
		minSlides: 4,
		maxSlides: 4,
        slideWidth: 230,
		slideMargin: 10,
		infiniteLoop: false,
		touchEnabled: false,
		pager: true,
		pagerType: 'short',
		pagerShortSeparator: '',
	});


}

function agitFn(){
	var agitSlider01 = $('.agit .cont03 .agit_slide ul').bxSlider({
		auto : false,
		hideControlOnEnd: true,
		pause : 3000,
		speed : 1000,
		infiniteLoop : false,
		touchEnabled: false,
	    pager: true,
		pagerType: 'short',
		pagerShortSeparator: '',
	});
}

function layerPopup(el) {// layer popup
	/* 유튜브 */
	function playerVars(src,option){
		var def = {
			'autoplay' : 0,
			'control' : 1,
			'loop' : 0,
			'rel' : 0,
			'modestbranding' : 0,
		};
		if(option) $.extend(def,option);
		var s = '';
		$.each(def,function(p,v){
			s = s+p+'='+v+'&';
		});

		return src = src+'?'+s.replace(/&$/gi,'');
	}

	function setSrc($id,option){
		var src = 'https://www.youtube.com/embed/1CnX9JKtvks';
		//var src = 'https://www.youtube.com/embed/'+ $id.data('id'); 개발 시 변경
		$('.video_yt').attr('src',playerVars(src,option));
	}

	/* 레이어팝업 */
    var winH = window.innerHeight;
    var body = $('body');
    var popup = $('.layer_popup');
    var popup_close = $('.layer_close');

    function showLayerPopup(el) {
        var $el = $(el),
            $inner = $el.find('.inner_layer');
        // console.log(winH);

        body.css('overflow', 'hidden').bind('touchmove', function (e) {
            e.preventDefault()
        });
        $el.show();
        popup.append("<div id='dim'></div>");

        if ($inner.outerHeight() < winH) {
            $inner.css('margin-top', '-' + $inner.outerHeight() / 2 + 'px');
        } else {
            $inner.css('top', '0px');
            body.unbind('touchmove');
            $('body').css('position', 'fixed');
        }

        $(window).resize(function () {
            winH = window.innerHeight;
            if ($inner.outerHeight() < winH) {
                $inner.removeAttr('style');
                $inner.css('margin-top', '-' + $inner.outerHeight() / 2 + 'px');
            } else {
                $inner.removeAttr('style');
                $inner.css('top', '0px');
                body.unbind('touchmove');
                $('body').css('position', 'fixed')
            }
        });

		setSrc($(this)); //유튜브
    }

    popup_close.on({
        click: function (e) {
            e.preventDefault();
            var $popup = $(this).closest(popup);

            $popup.hide();
            $popup.find('.inner_layer').css('margin-top', '0');
            $('body').removeAttr('style');
            body.unbind('touchmove');
            popup.find("#dim").remove();

			$('.video_yt').attr('src','');
        }
    });

    showLayerPopup(el);
}


function test(){
	/* 보고용 추후삭제 */
	$('.main_wrapper .cont06 .btn_more').on('click', function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			$(this).children('span').text("더보기");
			$('.main_wrapper .cont06 .more_cont').hide(); //보고용 추후삭제
		}else{
			$(this).addClass('on');
			$(this).children('span').text("접기");
			$('.main_wrapper .cont06 .more_cont').show(); //보고용 추후삭제
		}
	});

	$('.main_wrapper .cont15 .tab ul li').on('click', function(){
		if($(this).hasClass('active')){
			$(this).siblings().removeClass('active');
			$('.category_cont_wrap .type01').show();
			$('.category_cont_wrap .type02').hide();
		}else{
			$(this).addClass('active');
			$(this).siblings('li').removeClass('active');
			$('.category_cont_wrap .type01').hide();
			$('.category_cont_wrap .type02').show();
		}
	});
}
