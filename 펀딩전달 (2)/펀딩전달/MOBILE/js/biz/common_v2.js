$(document).ready(function(){
    subFn();//sub
})

function sideMenu(){//side menu

//    var left = $(".service_banner .swiper-wrapper").offset().left;
//	 var gnbSwiper = new Swiper('#sidemenu_wrapper > .swiper-container', {//gnb scroll
//          direction: 'vertical',
//          slidesPerView: 'auto',
//          mousewheelControl: true,
//          freeMode: true
//	 });

//    var gnbBannerSwiper = new Swiper('#gnb .banner .swiper-container', {//gnb banner
//		autoplayDisableOnInteraction: false, //터치후에 멈춤방지
//        pagination: '.swiper-pagination',
//        speed: 1000,
//        loop: true,
//        autoplay: 4000,
//        onTouchEnd : function (swiper){
//            if(swiper.swipeDirection != undefined){
//            	$("#gnb .banner .swiper-container .swiper-pagination-bullet").removeClass("swiper-pagination-bullet-active");
//            	$("#gnb .banner .swiper-container .swiper-pagination-bullet").eq((swiper.snapIndex-1)).addClass("swiper-pagination-bullet-active");
//            }
//        }
//	});

//    var gnbBannerSwiper02 = new Swiper('#gnb .service_banner .swiper-container', {//gnb banner
//        slidesPerView: 'auto',
//        spaceBetween: 10,
//        speed: 1000,
//        slidesPerView: 1.27,
//        onSlideChangeStart  : function (swiper){

            //
            // if (left == 50) {
            //     $(".service_banner .tit h5").text("아지트");
            // } else {
            //     $(".tit h5").text("이럴 때,");
            // }

            // if($(".service_banner .swiper-slide.first").hasClass('swiper-slide-active')){
            //     $(".service_banner .tit h5").text("아지트");
            // }else{
            //     $(".tit h5").text("이럴 때,");
            // }
//        }
//	});

    // gnbBannerSwiper02.init();
    // gnbBannerSwiper02.snapGrid[gnbBannerSwiper02.snapGrid.length - 1] = gnbBannerSwiper02.slidesGrid[gnbBannerSwiper02.slidesGrid.length - 1];

	$(document).on("click","#app_bar .btn_category", function() {
        $('body').addClass('fixed').on('touchmove', function(e){e.preventDefault();return false;});
        TweenLite.to($('#header .dim'),0.7,{ease:Power4.easeOut,opacity:0.8});
        TweenLite.to($('#sidemenu_wrapper'),0.7,{ease:Power4.easeOut,left:0});
    })

    $(document).on("click",".btn_sidemenu_close", function() {
		gnbClose();
    })

    function gnbClose(){
        $('body').removeClass('fixed').off('touchmove');
        $('.btn_sidemenu_close').removeClass('open');
        TweenLite.to($('#sidemenu_wrapper'),0.7,{ease:Power4.easeOut,left:'100%'})
        TweenLite.to($('#header .dim'),0.7,{ease:Power4.easeOut,opacity:0,onComplete:function(){
            $('#header .dim').remove();
            $('#gnb .dp2').css('height','0')
            $('#gnb .dp1').removeClass('active')
        }})
    }
}

function topMenu(){//top menu
	$(window).on('scroll', function () {
	   var scT = $(this).scrollTop();
	   if (scT > 200) {
		   TweenLite.to($('.main #header'),0.5,{ease:Power4.easeOut,top:'-120px'})
		   $('.main #header,.life_wrapper .life_filter').addClass('active');
		   $('.img_today').addClass('none');
	   } else {
		   TweenLite.to($('.main #header'),0.5,{ease:Power4.easeOut,top:'0'})
		   $('.main #header,.life_wrapper .life_filter').removeClass('active');
		   $('.img_today').removeClass('none');
	   }
   })
}

function footerFn(){//footer
	$('#footer .btn_cont').on('click', function(){
		if($("#footer .txt").hasClass('on')){
 		   $("#footer .txt").removeClass('on');
 		   $("#footer .inner .btn_cont").removeClass('open');
	   	}else{
 		   $("#footer .txt").addClass('on');
           $("#footer .inner .btn_cont").addClass('open');
	   	}
    })
}

function pdTabFn(){//sub tab
	var header = $('#header')
	var tabFn = $('.product_tab')
	var tabFnTop = tabFn.offset().top

	$(window).on('scroll touchmove', function(){//window scrollto
		tabTo();
	})

	function tabTo(){
		if ($(window).scrollTop() > tabFnTop) {
			tabFn.addClass('fixed');
			TweenLite.to(tabFn.css('position','fixed'),0.5,{ease:Power4.easeOut})
			TweenLite.to(header.css('position','relative'),0.5,{ease:Power4.easeOut})
		} else{
			tabFn.removeClass('fixed');
			TweenLite.to(tabFn.css('position','relative'),0.5,{ease:Power4.easeOut})
			TweenLite.to(header.css('position','fixed'),0.5,{ease:Power4.easeOut})
		}
	}
}

function mainSwipeFn(){//main swipe
	/*
	var topMenuSwiper = new Swiper('#header .top_menu .swiper-container', {
		 slidesPerView: 'auto',
		 touchRatio: 0.5,
		 slidesOffsetBefore: 30,
	});
	*/
	var mainBannerSwiper00 = new Swiper('.content_new.main #content > .swiper-container', {
		slidesPerView: 'auto',
		autoHeight: true,
		onSlideChangeStart: function(){
			//topMenuSwiper.slideTo(mainBannerSwiper00.activeIndex);
			$('.top_menu ul li').eq(mainBannerSwiper00.activeIndex).addClass('active').siblings().removeClass('active');
        }
    });
}

function mainFn(){//main
	var obj = {};

	var mainBannerSwiper01 = new Swiper('.main_wrapper .cont01 .swiper-container', {
		autoplayDisableOnInteraction: false, //터치후에 멈춤방지
	    loop: true, //무한루프
	    autoplay: 4000,
		slidesPerView: 'auto',
		speed: 1000,
		pagination: '.swiper-pagination',
		paginationType: 'fraction'
	});
	obj["mainBannerSwiper01"] = mainBannerSwiper01;

	var mainBannerSwiper02 = new Swiper('.main_wrapper .cont07 .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 8,
		speed: 1000,
		freeMode: true
	});
	obj["mainBannerSwiper02"] = mainBannerSwiper02; 

	var mainBannerSwiper03 = new Swiper('.main_wrapper .cont09 .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 30,
		speed: 1000,
		freeMode: true,
		freeModeMomentumBounce: false
	});
	obj["mainBannerSwiper03"] = mainBannerSwiper03;

	var mainBannerSwiper04 = new Swiper('.main_wrapper .dot_banner .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 8,
		speed: 1000,
		freeMode: true,
		freeModeMomentumBounce: false
	});
	obj["mainBannerSwiper04"] = mainBannerSwiper04;

	return obj;
}

function subFn(){
	/* 이벤트 전체보기 레이어 */
	$('.content_new .pagination_wrap .paging_link, .content_new .pagination_wrap .btn_plus, .sticker-page .layer-slide .swiper-pagination').off().on('click', function(){//sidemenu open
		layerBannerOpen();
	});
	$('.content_new .pagination_wrap .paging_link_r, .content_new .pagination_wrap .btn_plus_r').off().on('click', function(){//sidemenu open
		layerBanner2Open();
	});

	function layerBannerOpen(){
		$('body').addClass('fixed').on('touchmove', function(e){e.preventDefault();return false;});
		$('#wrap').append('<div class="search_dim"></div>');
		TweenLite.to($('#wrap .search_dim'),0.7,{ease:Power4.easeOut,opacity:0.8})
		TweenLite.to($('#layer_banner'),0.7,{ease:Power4.easeOut,left:0,onComplete:function(){
			// layerBannerSwiper.onResize();
		}})
	}
	function layerBanner2Open(){
		$('body').addClass('fixed').on('touchmove', function(e){e.preventDefault();return false;});
		$('#wrap').append('<div class="search_dim"></div>');
		TweenLite.to($('#wrap .search_dim'),0.7,{ease:Power4.easeOut,opacity:0.8})
		TweenLite.to($('#layer_banner_r'),0.7,{ease:Power4.easeOut,left:0,onComplete:function(){
			// layerBanner2Swiper.onResize();
		}})
	}

	// var layerBannerSwiper = new Swiper('#layer_banner .layer_wrap > .swiper-container', {//search scroll
	// 	 direction: 'vertical',
	// 	 slidesPerView: 'auto',
	// 	 mousewheelControl: true,
	// 	 freeMode: true
	// });
	// var layerBanner2Swiper = new Swiper('#layer_banner2 .layer_wrap > .swiper-container', {//search scroll
	// 	 direction: 'vertical',
	// 	 slidesPerView: 'auto',
	// 	 mousewheelControl: true,
	// 	 freeMode: true
	// });

	$('#layer_banner .btn_close').off().on('click', function(){//search close
		$('body').removeClass('fixed').off('touchmove');
		TweenLite.to($('#layer_banner'),0.7,{ease:Power4.easeOut,left:'100%'})
		TweenLite.to($('#wrap .search_dim'),0.7,{ease:Power4.easeOut,opacity:0,onComplete:function(){
			$('#wrap .search_dim').remove();
		}})
	});
	$('#layer_banner_r .btn_close').off().on('click', function(){//search close
		$('body').removeClass('fixed').off('touchmove');
		TweenLite.to($('#layer_banner_r'),0.7,{ease:Power4.easeOut,left:'100%'})
		TweenLite.to($('#wrap .search_dim'),0.7,{ease:Power4.easeOut,opacity:0,onComplete:function(){
			$('#wrap .search_dim').remove();
		}})
	});
}

function categoryFn(){//category
	$('.category_wrap .btn_all').on('click', function(){ // 전체보기버튼
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			$(this).children('span').text("전체보기");
		}else{
			$(this).addClass('on');
			$(this).children('span').text("접어두기");
		}
	});
	/*$('.category_wrap .btn_like').on('click', function(){ //좋아요 버튼
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		}else{
			$(this).addClass('active');
		}
	});*/

	var locationIdx = $('.category_wrap .location_nav_wrap .swiper-slide.active').index();
	var categoryNavSwiper = new Swiper('.category_wrap .location_nav_wrap .swiper-container', {
   		 slidesPerView: 'auto',
		 initialSlide : locationIdx,
   		 freeMode: true
    });

	var categorySwiper = new Swiper('.category_wrap .category_banner .swiper-container', {
		slidesPerView: 'auto',
		speed: 1500,
		loop: true,
		autoplay: 3000,
		pagination: '.swiper-pagination',
		paginationType: 'fraction'
	});

	var categorySwiper02 = new Swiper('.category_wrap .pd_unit .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 24,
		freeMode: true,
		slidesOffsetBefore: 30,
		scrollbar: '.swiper-scrollbar',
		draggable: true
	});

	/*$('.resize_select').change(function(){//resize Select
		var text = $(this).find('option:selected').text();
		var $aux = $('<select/>').append($('<option/>').text(text));
		$(this).after($aux);
		$(this).width($aux.width()+10);
		$aux.remove();
	}).change();*/
}

function eventFn(){//event
	var locationIdx = $('.event_list .category_nav_wrap .swiper-slide.active').index();
	var eventNavSwiper = new Swiper('.event_list .category_nav_wrap .swiper-container', {
   		 slidesPerView: 'auto',
		 initialSlide : locationIdx,
		 slidesOffsetBefore: 40,
   		 freeMode: true
    });

	$('.resize_select').change(function(){//resize Select
		var text = $(this).find('option:selected').text();
		var $aux = $('<select/>').append($('<option/>').text(text));
		$(this).after($aux);
		$(this).width($aux.width()+10);
		$aux.remove();
	}).change();
}

function searchFn(){//search
	$( "#header .main_wrap input" ).focus(function() {
		searchOpen();
		$(".s_input").focus();
	});

	/* search */
	$('#header .sub_wrap .btn_search').on('click', function(){//sidemenu open
		searchOpen();
		$(".s_input").focus();
	});


	var searchMenuSwiper = new Swiper('#search_menu > .swiper-container', {//search scroll
		 direction: 'vertical',
		 slidesPerView: 'auto',
		 mousewheelControl: true,
		 freeMode: true
	});
	function searchOpen(){
		$('body').addClass('fixed').on('touchmove', function(e){e.preventDefault();return false;});
		$('#wrap').append('<div class="search_dim"></div>');
		TweenLite.to($('#wrap .search_dim'),0.7,{ease:Power4.easeOut,opacity:0.8})
		TweenLite.to($('#search_menu'),0.7,{ease:Power4.easeOut,left:0,onComplete:function(){
			searchMenuSwiper.onResize();
		}});
	}

	$('#search_menu .btn_back').on('click', function(){//search close
		$('body').removeClass('fixed').off('touchmove');
		TweenLite.to($('#search_menu'),0.7,{ease:Power4.easeOut,left:'100%'})
		TweenLite.to($('#wrap .search_dim'),0.7,{ease:Power4.easeOut,opacity:0,onComplete:function(){
			$('#wrap .search_dim').remove();
		}})
	})

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

	var searchSwiper = new Swiper('.search_list .swiper-container', {
		slidesPerView: 'auto',
		centeredSlides: true,
		speed: 1000,
		spaceBetween: 30,
		pagination: '.swiper-pagination'
	});

	var searchTagSwiper = new Swiper('.search_view .top_tag .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		slidesOffsetBefore: 30,
		freeMode: true
    });

	var searchSwiper03 = new Swiper('.search_view .cont02 .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 20,
		slidesOffsetBefore: 30,
		freeMode: true,
		scrollbar: '.swiper-scrollbar',
		pagination: '.swiper-pagination',
		paginationType: 'fraction',
		draggable: true
	});

	/* 상세조건
	var searchDetailSwiper = new Swiper('#search_detail .swiper-container', {
         direction: 'vertical',
         slidesPerView: 'auto',
         mousewheelControl: true,
         freeMode: true
	});*/

    $('.content_new .btn_search_detail').on('click', function(){//sidemenu open
        $('body').addClass('fixed').on('touchmove', function(e){e.preventDefault();return false;});
        $('#wrap').append('<div class="search_dim"></div>');
        TweenLite.to($('#wrap .search_dim'),0.7,{ease:Power4.easeOut,opacity:0.3})
        TweenLite.to($('#search_detail'),0.7,{ease:Power4.easeOut,left:'80px'})

		$('#wrap .search_dim').on('click',function(e){
	        $('body').removeClass('fixed').off('touchmove');
	        TweenLite.to($('#search_detail'),0.7,{ease:Power4.easeOut,left:'100%'})
	        TweenLite.to($('#wrap .search_dim'),0.3,{ease:Power4.easeOut,opacity:0,onComplete:function(){
	            $('#wrap .search_dim').remove();
	        }})
		})
    })
}

(function($){
    var searchUI = {
      	click : function (target, speed) {
      	  var _self = this,
      		  $target = $(target);
      	  _self.speed = speed || 300;

      	  function findChildren(obj) {
      		return obj.find('> div').length > 0;
      	  }

      	  $target.on('click','a', function(e){
      		  e.stopPropagation();
      		  var $this = $(this),
      			  $depthTarget = $this.next(),
      			  $siblings = $this.parent().siblings();

      		$this.parent('li').find('ul li').removeClass('active');
      		$siblings.removeClass('active');
      		$siblings.find('.dp2, .dp3').slideUp(250);

      		if($depthTarget.css('display') == 'none') {
      		  _self.activeOn($this);
      		  $depthTarget.slideDown(_self.speed);
      		} else {
      		  $depthTarget.slideUp(_self.speed);
      		  _self.activeOff($this);
      		}

      	  })

      	},
      	activeOff : function($target) {
      	  $target.parent().removeClass('active');
      	},
      	activeOn : function($target) {
      	  $target.parent().addClass('active');
      	}
    };
  	  // Call lnbUI
    $(function(){
  	     searchUI.click('#search_detail .cont li', 300)
    });
}(jQuery));

function tasteFn(){//personal taste
	var max_h=0;
	$(".personal_taste.tase01 .cont03 > ul > li").each(function(){
		var h = parseInt($(this).css("height"));
		if(max_h<h){
			max_h = h;
		}
	});

	$(".personal_taste.tase01 .cont03 > ul > li").each(function(){
		$(this).css({height:max_h});
	});


	var tasteSwiper01 = new Swiper('.personal_taste.taste01 .cont01 .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		speed: 1000,
		freeMode: true,
		slidesOffsetBefore: 30,
		scrollbar: '.swiper-scrollbar',
		draggable: true
	});

	var tasteSwiper02 = new Swiper('.personal_taste.taste01 .cont02 .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 20,
		speed: 1000,
		freeMode: true,
		scrollbar: '.swiper-scrollbar',
		draggable: true,
		pagination: '.swiper-pagination',
		paginationType: 'fraction'
	});

	var tasteSwiper03 = new Swiper('.personal_taste.taste02 .cont02 .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		speed: 0,
		loop: true,
		freeMode: false,
		slidesOffsetBefore: 40,
		draggable: true,
		pagination: '.swiper-pagination',
		paginationType: 'fraction',
		onTransitionEnd : function (swiper){
			if (!$(".swiper-slide-active [name=recentItem]").hasClass("active")) {
	    		$('#relationMore').show();
	    			$('[name=recentItem]').removeClass("active");
	    			$(".swiper-slide-active [name=recentItem]").addClass("active");
	    			$fn.setRecobellRelationList();
			} 
        }
	});

	var tasteSwiper04 = new Swiper('.personal_taste.taste03 .cont01 .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		speed: 1000,
		freeMode: true,
		slidesOffsetBefore: 30,
		scrollbar: '.swiper-scrollbar',
		draggable: true
	});

	var tasteSwiper05 = new Swiper('.personal_taste.taste03 .cont02 .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		speed: 1000,
		freeMode: true,
		slidesOffsetBefore: 20,
		draggable: true
	});

	var tasteSwiper06 = new Swiper('.personal_taste.taste03 .cont03 .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		speed: 1000,
		freeMode: true,
		slidesOffsetBefore: 30,
		scrollbar: '.swiper-scrollbar',
		draggable: true
	});

	var tasteSwiper07 = new Swiper('.personal_taste.taste03 .cont04 .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		speed: 1000,
		freeMode: true,
		slidesOffsetBefore: 30,
		scrollbar: '.swiper-scrollbar',
		draggable: true
	});

	var tasteSwiper08 = new Swiper('.personal_taste.taste03 .cont05 .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		speed: 1000,
		freeMode: true,
		slidesOffsetBefore: 30,
		scrollbar: '.swiper-scrollbar',
		draggable: true
	});

	var tasteSwiper09 = new Swiper('.personal_taste.taste04 .cont02 .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		speed: 1000,
		freeMode: true,
		slidesOffsetBefore: 30,
		scrollbar: '.swiper-scrollbar',
		draggable: true
	});

	var tasteSwiper10 = new Swiper('.personal_taste.taste04 .cont03 .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		speed: 1000,
		freeMode: true,
		slidesOffsetBefore: 30,
		freeModeMomentumBounce: false,
		draggable: true
	});

	$(".personal_taste .cont03 > ul > li").each(function(){
		var h = parseInt($(this).css("height"));
		if(max_h<h){
			max_h = h;
		}
	});

	$(".personal_taste .cont03 > ul > li").each(function(){
		$(this).css({height:max_h});
	});
}

function agitFn(){//agit
	var agitSwiper01 = new Swiper('.agit_wrap .agit02 .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		speed: 1000,
		freeMode: true,
		slidesOffsetBefore: 40,
		pagination: '.swiper-pagination',
		paginationType: 'fraction',
		scrollbar: '.swiper-scrollbar',
		draggable: true
	});

	$(document).on("click",".btn_thum, .btn_agit",function() {
		if($(this).parent('.thum').next('.box_video').hasClass('active')){
			$(this).parent('.thum').removeClass('active');
			$(this).parent('.thum').next('.box_video').removeClass('active');
		}else{
		   $(this).parent('.thum').addClass('active');
		   $(this).parent('.thum').next('.box_video').addClass('active');
		}
	});
	$(document).on("click",".agit_list > a > .desc",function() {
		$(this).parent().prevAll().removeClass('active');
	});
}

function layerPopup(el) {// layer popup
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
        }
    });
    showLayerPopup(el);
}

function topDownFn(){
//    $("body").append("<a href=\"#none\" id=\"btnTop\" class=\"foot_btn btn_top\">위로가기</a>");
//    $("body").append("<a href=\"#none\" id=\"btnDown\" class=\"foot_btn btn_down\">아래로가기</a>");

    /*$(window).on('scroll', function () {
	   var scT = $(this).scrollTop();
	   if (scT > 0) {
		  $("#btnTop,#btnDown").fadeIn("fast");
	   } else {
		  $("#btnTop,#btnDown").fadeOut("slow");
	   }
   })*/

   $('.btn_top').on('click', function(){
       moveTop();
   });

   $('.btn_down').on('click', function(){
       moveBottom();
   });

    // MOVE TO TOP
    function moveTop(){
        moveScroll(0);
    }

    // MOVE TO BOTTOM
    function moveBottom(){
        moveScroll($(document).height());
    }

    function moveScroll(scroll){
        $("html, body").stop(true,true).animate({
            "scrollTop":scroll
        },500);
    }
}
