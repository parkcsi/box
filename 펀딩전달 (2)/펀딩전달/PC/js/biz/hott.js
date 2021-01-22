function loginFn() {
    var z=0;

    $('.login').on({//로그인 클릭 이벤트
        click:	function(){
            if($('#chkId').val()=='' || $('#chkPw').val()==''){

                if($('#chkId').val()==''){
                    $('#chkId').css({outline:'1px solid #ff6a5b'});
                }
                else{
                    $('#chkId').css({outline:'0'});
                }
                if($('#chkPw').val()==''){
                    $('#chkPw').css({outline:'1px solid #ff6a5b'});
                }
                else{
                    $('#chkPw').css({outline:'0'});
                }
                if(z==0){
                    $(this).parent().children('.inp_pw').append("<p style='color:#ff6a5b;font-size:1em;text-align:left;margin-top:7px;line-height:1.5em;'>현재 입력하신 아이디가 등록되어 있지 않거나 아이디 또는 비밀번호를 잘못 입력하셨습니다.</p>");
                    $(this).parent().children('.inp_login').next('.opt_login').css({marginTop:2});
                    z=1;
                }
                return false;
            }
        }
    });
    var t=0;

    $('.invoice').on({//주문조회 클릭 이벤트
        click:	function(){
            if($('#chkId').val()=='' || $('#chkPw').val()==''){
                if($('#chkId').val()==''){
                    $('#chkId').css({outline:'1px solid #ff6a5b'});
                }
                else{
                    $('#chkId').css({outline:'0'});
                }
                if($('#chkPw').val()==''){
                    $('#chkPw').css({outline:'1px solid #ff6a5b'});
                }
                else{
                    $('#chkPw').css({outline:'0'});
                }
                if(t==0){
                    $(this).parent().children('.inp_pw').append("<p style='color:#ff6a5b;font-size:12px;text-align:left;margin-top:7px;line-height:18px;'>해당 주문번호로 주문된 상품을 찾을 수 없습니다.</p>");
                    $(this).parent().children('.inp_pw').next('.txt_inquiry').css({marginTop:20});
                    t=1;
                }
                return false;
            }
        }
    });
// ID clear (로그인 화면)
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
// PW clear (로그인 화면)
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
}
function skyScraper() {//스카이스크래퍼

    var header = $('#header')
	var curtain = $('.top_banner')
	var skyFn = $('#skyscraper')
	var spd = 0.5;
	var eft = Power3.easeOut;
	var skyFnTop = skyFn.offset().top;

    if ($(window).scrollTop() > skyFnTop - 113) {
      skyFn.addClass('addFix');
      TweenLite.to(skyFn.css('position','fixed'),1,{ease:Power4.easeOut})
  }

	$(window).on('scroll touchmove', function(){
		skyScroll();
	})

	function skyScroll(){
		if ($(window).scrollTop() > skyFnTop - 113) {
			/*console.log(">>>>"+$(window).scrollTop()+" : "+($(window).scrollTop() > skyFnTop - 113)+" : "+ (skyFnTop - 113)+" : "+ skyFn.offset().top+" : ");*/
			skyFn.addClass('addFix');
			TweenLite.to(skyFn.css('position','fixed'),1,{ease:Power4.easeOut})
		} else{
			/*console.log(">>>>"+$(window).scrollTop()+" : "+($(window).scrollTop() > skyFnTop - 113)+" : "+ (skyFnTop - 113)+" : "+ skyFn.offset().top+" : ");*/
			skyFn.removeClass('addFix');
			TweenLite.to(skyFn.css('position','absolute'),1,{ease:Power4.easeOut})
		}
	}
	var top,footTop,maxY,yHeight;

		$(window).load(function(){
			top = $('#skyscraper').offset().top - parseFloat($('#skyscraper').css('marginTop').replace(/auto/, 0));
			footTop = $('#footer').offset().top - parseFloat($('#footer').css('marginTop').replace(/auto/, 0));
			maxY = footTop - $('#skyscraper').outerHeight();
			yHeight = (maxY - top);
			/*console.log(($('#footer').offset().top - parseFloat($('#footer').css('marginTop').replace(/auto/, 0))) - $('#skyscraper').outerHeight() - ($('#skyscraper').offset().top - parseFloat($('#skyscraper').css('marginTop').replace(/auto/, 0))));
			console.log((maxY - top)+" = "+($('#footer').offset().top - parseFloat($('#footer').css('marginTop').replace(/auto/, 0)))+ " - " +$('#skyscraper').outerHeight() + " - " + ($('#skyscraper').offset().top - parseFloat($('#skyscraper').css('marginTop').replace(/auto/, 0))));
			console.log($('#skyscraper').offset().top + " - " + parseFloat($('#skyscraper').css('marginTop').replace(/auto/, 0)));*/
		});

       $(window).scroll(function(evt) {
           var y = $(this).scrollTop() + 150;
           /*console.log(footTop+" =? "+($('#footer').offset().top - parseFloat($('#footer').css('marginTop').replace(/auto/, 0))));
    	   console.log(footTop - $('#skyscraper').outerHeight());
    	   console.log(y+">>>"+(y < maxY)+"<<<"+maxY);
    	   console.log(y+">>>"+(y > top)+"<<<"+top);
           console.log(yHeight);*/
           if (y > top) {
               if (y < maxY) {
                   $('.quick_menu').addClass('fixed').removeAttr('style');
               } else {
                   $('.quick_menu').removeClass('fixed').css({
                       position: 'absolute',
                       top: yHeight + 'px'
                   });
                   TweenLite.to($('.history_inner'),0.6,{ease:Power4.easeOut,right:-518});
                   setTimeout(function() {
                       $('.history_inner').css('display','none');
                       $('.lastest_prd').css('display','none');
                    }, 500);
               }
           } else {
               $('.quick_menu').removeClass('fixed');
           }
       });
}

function skyScraper02() {
    // 스카이스크래퍼
    $('.hover_wrap').fadeOut(0);
    $('.list_history>li.active').on({
        mouseenter:	function(){
            $(this).children('.hover_wrap').fadeIn(50);
        },
        mouseleave:	function(){
            $(this).children('.hover_wrap').fadeOut(50);
        }
    });
    $('.hover_wrap .btn_close').click(
        function(){
            $(this).parent().parent().fadeOut(50);
        }
    );
    $('.btn_goTop').off('click').on({
        click:	function(){
            $('html,body').stop().animate({scrollTop:0},0);
        }
    });

    $(".bnr_wrap").mouseenter(function() {
        $('.btn_large').stop().animate({
            position: 'absolute',
            width:840,
            height:410,
            opacity:1
        }, {
            duration: 300
        });
        $(this).children('.btn_large').css({display:'block'});
    });
    $(".bnr_wrap").mouseleave(function() {
        $('.btn_large').stop().animate({
            position: 'absolute',
            width:112,
            height:112,
            opacity:0
        }, {
            duration: 300
        });
        // $(this).children('.btn_large').css({display:'none'});
    });

    $('.btn_history').on('click',function () {//history open
    	loadHistoryAllTemplate();
        $('.lastest_prd').css('display','block');
        $('.history_inner').css('display','block');
        setTimeout(function() {
            TweenLite.to($('.history_inner'),0.6,{ease:Power4.easeOut,right:3});
         }, 10);
    });
    $('.close_history').on('click',function () {//history close
        TweenLite.to($('.history_inner'),0.6,{ease:Power4.easeOut,right:-518});
         setTimeout(function() {
             $('.history_inner').css('display','none');
             $('.lastest_prd').css('display','none');
          }, 500);
        if ($('.case02').length > 0) {
        	 $('.btn_cancel').click();
		}
    });

    $('.list_kind li a').on('click',function () {
        $(this).parent('li').toggleClass('active');
    });
}
function historyDelete() {//history delete
	$(document).off('click', '.chk_delete, .btn_erase');
    $(document).on("click",".chk_delete, .btn_erase",function() {
    	console.log('???');
    	$(this).parent('li').toggleClass('chk_on');
    });
    $(document).on("click",".btn_brandLike",function() {
    	console.log('???');
        $(this).siblings('span').toggleClass('off');
    });

}
$(function(){
    $('.tit_like .btn_like').on('click', function(){ //브랜드 상단 좋아요
        if($(this).hasClass('on')){
            $(this).removeClass('on');
        }else{
            $(this).addClass('on');
        }
    });
});

function cardSlider() {// 오늘혜택
    var cardSlider = $('.card_wrap .card_slider ul').bxSlider({
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

function bradnSlider() {// 브랜드샵 이미지 슬라이드
    var brandSlider = $('.brShop_wrap .case3 .brand_slider ul').bxSlider({
        auto: false,
        pause: 3000,
        speed: 1000,
        hideControlOnEnd: true,
        minSlides: 3,
        maxSlides: 3,
        slideWidth: 425,
        slideMargin: 10,
        infiniteLoop: false,
        touchEnabled: false,
        pager: true,
        pagerType: 'short',
        pagerShortSeparator: '',
    });

}
function lifeSlider() {// 이럴때 슬라이드

    var list02 = $('.life_inner .set02 .life_slider ul');
     for(var i = 0;i < $(list02).length;i++){
        var obj = $(list02)[i];
        $(obj).bxSlider({
             auto: false,
             pause: 3000,
             speed: 1000,
             hideControlOnEnd: true,
             moveSlides:1,
             minSlides: 3,
             maxSlides: 3,
             slideWidth: 280,
             slideMargin: 8,
             infiniteLoop: false,
             touchEnabled: false,
             pager: false,
            //  onSliderLoad: function (currentIndex){
            //    $(this).parents('.life_slider').find('.custom-pager').children("strong").text(currentIndex + 1);
            //    $(this).parents('.life_slider').find('.custom-pager').children("span").text($(this).find('li:not(.bx-clone)').length);
            //   },
            //  onSlideBefore: function ($slideElement, oldIndex, newIndex){
            //     $(this).parents('.life_slider').find('.custom-pager').children("strong").text(newIndex + 1);
            //     $(this).parents('.life_slider').find('.custom-pager').children("span").text($(this).find('li:not(.bx-clone)').length);
            // },
         });
     }

    var list = $('.life_inner .set03 .life_slider ul');
     for(var i = 0;i < $(list).length;i++){
        var obj = $(list)[i];
        $(obj).bxSlider({
             auto: false,
             pause: 3000,
             speed: 1000,
             hideControlOnEnd: true,
             moveSlides:1,
             minSlides: 3,
             maxSlides: 3,
             slideWidth: 280,
             slideMargin: 8,
             infiniteLoop: false,
             touchEnabled: false,
             pager: false,
            //  onSliderLoad: function (currentIndex){
            //    $(this).parents('.life_slider').find('.custom-pager').children("strong").text(currentIndex + 1);
            //    $(this).parents('.life_slider').find('.custom-pager').children("span").text($(this).find('li:not(.bx-clone)').length);
            //   },
            //  onSlideBefore: function ($slideElement, oldIndex, newIndex){
            //     $(this).parents('.life_slider').find('.custom-pager').children("strong").text(newIndex + 1);
            //     $(this).parents('.life_slider').find('.custom-pager').children("span").text($(this).find('li:not(.bx-clone)').length);
            // },
         });
     }

}
function lifeLike() {//life
    $('.btn_life').on("click", function () {
        $(this).prev('span').toggleClass('on');
        if($(this).prev('span').hasClass('on')){
            var d = new Date();
            var url = "../../images/biz/sub/heart_on.gif?a="+d.getTime();
            $(this).prev('span').css({"background":""});
            $(this).prev('span').css({background:"url("+url+") 50% 0% no-repeat",backgroundSize: 39});
        }else{
            var d = new Date();
            var url = "../../images/biz/sub/heart_off.gif?a="+d.getTime();
            $(this).prev('span').css({"background":""});
            $(this).prev('span').css({background:"url("+url+") 50% 0% no-repeat",backgroundSize: 39});
        }
    });
}
