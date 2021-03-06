$(function(){

// 로그인_닫기 버튼으로 ID clear
    var $ipt = $('#chkId'),
        $clearIpt = $('.search');
    $ipt.keyup(function(){
      $(".search").toggle(Boolean($(this).val()));
    });
    $clearIpt.toggle(Boolean($ipt.val()));
    $clearIpt.click(function(){
      $("#chkId").val('').focus();
      $(this).hide();
    });
// 로그인_닫기 버튼으로 PW clear
    var $ipt = $('#chkPw'),
        $clearIpt = $('.searchClear');
    $ipt.keyup(function(){
      $(".searchClear").toggle(Boolean($(this).val()));
    });
    $clearIpt.toggle(Boolean($ipt.val()));
    $clearIpt.click(function(){
      $("#chkPw").val('').focus();
      $(this).hide();
    });
});

function recordSlide(){// 메인 음반 슬라이드
    // 음반 슬라이드 a영역 높이
    // function recordHeight() {
    //     var recordImg = $('.record_wrap .swiper-container.bnr-container .pagination_wrap').outerHeight();
    //     $('.record_wrap .swiper-container.bnr-container .swiper-slide a').css({height: recordImg});
    // }
    // setInterval(recordHeight,0);
    // recordHeight();
    var bnrSwiper = new Swiper('.swiper-container.bnr-container', {//음반배너
	  autoplayDisableOnInteraction: false,//터치후에 멈춤방지
      slidesPerView: 1,
      loop: true,//무한루프
      spaceBetween: 0,
      speed: 1000,
      draggable: true,
      autoplay: 4000,
      pagination: '.swiper-pagination',
      paginationType: 'fraction',
      paginationClickable: true,
      onTransitionEnd : function (swiper){
    	  var flagCd = $(".swiper-container.bnr-container .swiper-slide-active .flag").val();
    	  if (flagCd == "E") {
    		$(".swiper-container .pagination_wrap .bnr_type p.type_ad").attr("style","display:none;");
    		$(".swiper-container .pagination_wrap .bnr_type p.type_en").attr("style","display:block;");
		} else if(flagCd == "A"){
			$(".swiper-container .pagination_wrap .bnr_type p.type_ad").attr("style","display:block;");
			$(".swiper-container .pagination_wrap .bnr_type p.type_en").attr("style","display:none;");
		} else {
			$(".swiper-container .pagination_wrap .bnr_type p.type_ad").attr("style","display:none;");
    		$(".swiper-container .pagination_wrap .bnr_type p.type_en").attr("style","display:none;");
		}
      }
      // onFirstInit: function(swiper) {
      //     setTimeout(function() {
      //         recordHeight( swiper );
      //     }, 0);
      // }
    });

    var bookingSwiper = new Swiper('.swiper-container.album-container', {//예약음반
      slidesPerView: 2,
      slidesPerColumn: 2,
      spaceBetween: 10,
      speed: 1000,
      freeMode: true,
      scrollbar: '.swiper-scrollbar',
      breakpoints:{
        600: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        }
      }
    });

    var recentSwiper = new Swiper('.swiper-container.recent-container', {//최근발매
      slidesPerView: 2,
      spaceBetween: 10,
      speed: 1000,
      freeMode: true,
      scrollbar: '.swiper-scrollbar',
      breakpoints:{
        600: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        }
      }
    });

    var magSwiper = new Swiper('.swiper-container.mag-container', {//뮤직매거진
      slidesPerView: 2.3,
      spaceBetween: 8,
      speed: 1000,
      freeMode: true,
      scrollbar: '.swiper-scrollbar',
      breakpoints:{
        600: {
          slidesPerView: 2.3,
        },
        768: {
          slidesPerView: 3.3,
        },
        1024: {
          slidesPerView: 4.3,
        }
      }
    });
    var culSwiper = new Swiper('.swiper-container.culture-container', {//컬처이벤트
      slidesPerView: 1.65,
      spaceBetween: 8,
      speed: 1000,
      freeMode: true,
      scrollbar: '.swiper-scrollbar',
      breakpoints:{
        600: {
          slidesPerView: 1.65,
        },
        768: {
          slidesPerView: 2.65,
        },
        1024: {
          slidesPerView: 3.65,
        }
      }
    });
    var tapSwiper = new Swiper('.swiper-container.tapgol-container', {//탑골공원
		slidesPerView: 1.1,
		speed: 500,
		scrollbar: '.swiper-scrollbar',
		draggable: true,
		onTransitionEnd : function (swiper){
            if(!swiper.isEnd){
            	setTimeout(function(){
                	$(".tapgol_wrap .bg_wrap img").attr('src',$(".tapgol_wrap .swiper-slide-active .tapgol_a a:first i img").attr('src'));
                }, 600);
            }else{
            	setTimeout(function(){
                	$(".tapgol_wrap .bg_wrap img").attr('src',$(".tapgol_wrap .swiper-slide-next .tapgol_a a:first i img").attr('src'));
                }, 600);
            }
        }
    });
}

function topTitle(){//header title
    $(".bg_goods #header").addClass('goods_head');
    $(".bg_goods #header .inner h2").addClass('tit_goods');
	$(window).on('scroll', function () {
	   var scT = $(this).scrollTop();
	   if (scT > 203) {
           $(".bg_goods #header").removeClass('goods_head');
           $(".bg_goods #header .inner h2").removeClass('tit_goods');
	   }
       else {
           $(".bg_goods #header").addClass('goods_head');
           $(".bg_goods #header .inner h2").addClass('tit_goods');
	   }
   })
   //
   // var topMenuSwiper = new Swiper('#header .top_menu .swiper-container', {
	// 	   slidesPerView: 'auto',
	// 	   freeMode: true
   // });
   // topMenuSwiper.slideTo($('#header .top_menu').find('swiper-slide.active').index(), 0);
}


function brandTit() {//brandshop top arrow
    $('.topTit_brand .tit_arr a').on('click', function(){
        if($(this).parent('.tit_arr').hasClass('click')){
            $('.topTit_brand .tit_text p').removeClass('click');
            $('.topTit_brand .tit_arr').removeClass('click');
        }else{
            $('.topTit_brand .tit_text p').addClass('click');
            $('.topTit_brand .tit_arr').addClass('click');
        }
    });
}
//브랜드샵
function brandLike() {
    $('.tit_like .btn_like').on('click', function(){ //브랜드 상단 좋아요
        if($(this).hasClass('on')){
            $(this).removeClass('on');
        }else{
            $(this).addClass('on');
        }
    });
}
//오늘혜택
function benefitFn() {//benefit
    $('.btn_comment').on('click', function () {
        $('.desc_comment').toggleClass('open');
        $('.box_comment').toggleClass('open');
    });

    var swiper = new Swiper('.benefit_wrap .swiper-container', {
      slidesPerView: 1.1,
      loop: false,
      spaceBetween: 10,
      pagination: '.swiper-pagination',
      paginationClickable: true
    });

    if($('.benefit_wrap .swiper-slide').length < 2){
        $('.benefit_wrap .swiper-pagination').css({display:'none'});
        $('.benefit_wrap .swiper-area').css({paddingTop:0});
    }

    $(".btn_check> input").change(function(){
 	  if($(this).is(":checked")){
 	   $(this).parent().addClass("set_on");
 	  }
 	  else {
 	   $(this).parent().removeClass("set_on");
 	  }
 	});

    /* 오늘혜택, 상단 팁 버튼 */
    var spd = 0.5,
        eft = Power4.easeOut;
    $('.curtain_zone .btn_close').on('click', function(){
        TweenLite.to($('.curtain_zone'),spd,{ease:eft,height:0});
        $(this).siblings().add(this).hide(0.5);
    });
}

function benefitOpenClose() {
	//benefit open close
    // var benSwiper = new Swiper('#benefit_wrapper > .swiper-container', {
    //      direction: 'vertical',
    //      slidesPerView: 'auto',
    //      mousewheelControl: true,
    //      freeMode: true
    // });

	$(window).on('scroll', function () {
	   var scT = $(this).scrollTop();
	   if (scT > 0) {
		   $('.img_today').fadeOut(0);
	   } else {
		   $('.img_today').fadeIn(0);
	   }
   })

    $('#app_bar .btn_today, .close-my').on('click', function(){
        if($(".close-my, .btn_today").hasClass("active") === true){
        	//benefit open
            $("body").bind('touchmove', function(e){e.preventDefault()});
            $('body').removeClass('fixed').off('touchmove');
            $(this).removeClass('active');
            $('.btn_today').removeClass('active');
            TweenLite.to($('#benefit_wrapper'),0.7,{ease:Power4.easeOut,top:'120%'})
            TweenLite.to($('#header .dim'),0.7,{ease:Power4.easeOut,opacity:0,onComplete:function(){
                $('#header .dim').remove();
            }})
        }else{
        	//benefit close
            $('body').unbind('touchmove');
            $('.close-my').addClass('active');
            $(this).addClass('active');
            $(this).children('span').hide(0);
            $('#header').append('<div class="dim"></div>');
            $('body').addClass('fixed').on('touchmove', function(e){e.preventDefault();return false;});
            TweenLite.to($('#header .dim'),0.7,{ease:Power4.easeOut,opacity:0.8});
            TweenLite.to($('#benefit_wrapper'),0.7,{ease:Power4.easeOut,top:0,onComplete:function(){
            }});
        }
    });
}

function historyOpenClose() {//history open close
    // var histSwiper = new Swiper('#history_wrapper > .swiper-container', {
    //      direction: 'vertical',
    //      slidesPerView: 'auto',
    //      mousewheelControl: true,
    //      freeMode: true
    // });

    $('#sidemenu_wrapper .side_history, #app_bar .btn_history').on('click', function(){
        $('body').addClass('fixed').on('touchmove', function(e){e.preventDefault();return false;});
        $('#header').append('<div class="dim"></div>').css({zIndex:98});
        // gnbClose();
        TweenLite.to($('#header .dim'),0.7,{ease:Power4.easeOut,opacity:0.7});
        TweenLite.to($('#history_wrapper'),0.7,{ease:Power4.easeOut,left:0,onComplete:function(){
            // histSwiper.onResize();
        }})
    });
    $('.btn_close').on('click', function(){//history close
        gnbClose();
        TweenLite.to($('#header .dim'),0.7,{ease:Power4.easeOut,opacity:0,onComplete:function(){
            $('#header .dim').remove();
        }})
        TweenLite.to($('#history_wrapper'),0.7,{ease:Power4.easeOut,left:'100%'})
    });
    function gnbClose(){
        $('body').removeClass('fixed').off('touchmove');
        TweenLite.to($('#sidemenu_wrapper'),0.7,{ease:Power4.easeOut,left:'100%'})
        TweenLite.to($('#header .dim'),0.7,{ease:Power4.easeOut,opacity:0,onComplete:function(){
            $('#header .dim').remove();
            $('#gnb .dp2').css('height','0')
            $('#gnb .dp1').removeClass('active')
        }})
    }

}

function historyDelete() {//history delete
    $('.chk_delete, .btn_erase').on("click", function () {
        $(this).parent('li').toggleClass('chk_on');
    });

    $('.btn_brandLike').on("click", function () {
        $(this).siblings('span').toggleClass('on');
        $(this).toggleClass('on');
    });

    $(".pagination a").on("click",function(){
        $('.swiper-wrapper').css("transform", "translate3d(0px, 0px, 0px)")
     });
}

function lifeLike() {//life
    $('.btn_life').on("click", function () {
        $(this).prev('span').toggleClass('on');
        if($(this).prev('span').hasClass('on')){
            var d = new Date();
            var url = "../../images/biz/sub/heart_on.gif?a="+d.getTime();
            $(this).prev('span').css({"background":""});
            $(this).prev('span').css({background:"url("+url+") 50% 0% no-repeat",backgroundSize: 32});
        }else{
            var d = new Date();
            var url = "../../images/biz/sub/heart_off.gif?a="+d.getTime();
            $(this).prev('span').css({"background":""});
            $(this).prev('span').css({background:"url("+url+") 50% 0% no-repeat",backgroundSize: 32});
        }
    });

    $('.btn_sympathy').on("click", function(){
        $(this).toggleClass('active');
    });

    var lifeSwiper = new Swiper('.swiper-container.life-container', {//컬처이벤트
      slidesPerView: 'auto',
      spaceBetween: 4,
      speed: 1000,
      freeMode: true,
    });
}

function setUp() {
    $(".btn_check > input").change(function(){
       if($(this).is(":checked")){
           $(this).parent().addClass("set_on");
       }
       else {
           $(this).parent().removeClass("set_on");
       }
     });
}

function alarmCheck() {
    $('.chk_delete, .btn_alarm').on("click", function () {
        $(this).parent('li').toggleClass('check_on');
    });
}
