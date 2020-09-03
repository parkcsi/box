$(function(){
	/*gnb 오픈*/
	$(".gnb_wrap > .gnb_depth1 > li").on("mouseenter", function(){
		$(".header_inner").addClass("on");
		$(".gnb_depth2").clearQueue().slideDown();
		$(".gnb_wrap > .gnb_bg").clearQueue().slideDown();
	});
	$(".gnb_wrap > .gnb_depth1").on("mouseleave", function(){
		$(".header_inner").removeClass("on");
		$(".gnb_depth2").clearQueue().hide();
		$(".gnb_wrap > .gnb_bg").clearQueue().hide();
	});
	/*//gnb 오픈*/

	/*전체메뉴*/
	$(".all_menu_btn a").click(function(){
		$(".all_menu_wrap").show();
		dim_open();
	});
	$(".all_menu_close").click(function(){
		$(".all_menu_wrap").hide();
		dim_close();
	})
	/*//전체메뉴*/

	/*메인 슬라이드*/
	if($('.main_banner').length){
		var main_bnr = $(".main_banner_list");
		main_bnr.on('init afterChange', function(event, slick, currentSlide, nextSlide){
			if(event.type === 'init'){
				$('.main_banner_control .num').text(' | ').append('<span>' + slick.slideCount + '</span>');
				$('.main_banner_control .num').prepend('<strong>1</strong>')
			} else if(event.type === 'afterChange'){
				$('.main_banner_control .num strong').text(currentSlide + 1);
			}
		});
		main_bnr.slick({
			infinite: true,
			accessibility: true,
			slidesToScroll: 1,
			slidesToShow: 1,
			autoplay: true,
			autoplaySpeed:5000,
			draggable: false,
			arrows: false
		});
		$('.main_banner_btn .stop, .main_banner_btn .start').click(function(){
			bnr_stop(main_bnr, $(this));
		});
		$('.main_banner_btn .prev').click(function(){
			main_bnr.slick('slickPrev');
		})
		$('.main_banner_btn .next').click(function(){
			main_bnr.slick('slickNext');
		})
	}
	/*//메인 슬라이드*/

	/*하단 공지 슬라이드*/
	if($('.notice_slide').length){
		var notice_slide_bnr = $(".notice_slide");
		notice_slide_bnr.slick({
			infinite: true,
			slidesToShow: 1,
			autoplay: true,
			vertical: true,
			draggable: false,
		});
	}
	/*//하단 공지 슬라이드*/

	/*교육과정안내*/
	if($('.tab_slide').length){
		var tab_slide_bnr = $(".tab_slide.type01");
		var tab_slide_bnr2 = $(".tab_slide.type02, .tab_slide.type03");
		tab_slide_bnr.on('init afterChange', function(event, slick, currentSlide, nextSlide){
			$(".on .tab_slide .slick-dots li").css("width", (100 / $(".on .tab_slide .slick-dots li").length)+"%");
		});
		tab_slide_bnr2.on('init afterChange', function(event, slick, currentSlide, nextSlide){
			$(".on .tab_slide .slick-dots li").css("width", (100 / $(".on .tab_slide .slick-dots li").length)+"%");
		});
		tab_slide_bnr.slick({
			infinite: true,
			slidesToShow: 1,
			autoplay: true,
			draggable: false,
			dots:true,
			adaptiveHeight: true,
			responsive: [
				{
					breakpoint: 650,
					settings: {
						infinite: true,
						slidesToShow: 1,
						autoplay: true,
						draggable: false,
						arrows: false,
						dots:true,
						adaptiveHeight: true
					}
				}
			]
		});
		tab_slide_bnr2.slick({
			infinite: true,
			slidesToScroll: 1,
			slidesToShow: 2,
			autoplay: true,
			draggable: false,
			dots:true,
			responsive: [
				{
					breakpoint: 650,
					settings: {
						infinite: true,
						slidesToScroll: 1,
						slidesToShow: 1,
						autoplay: true,
						draggable: false,
						arrows: false,
						dots:true,
					}
				}
			]
		});
		$('.guide_tab_list > li > a').on('click', function(){
			$(this).closest('li').addClass('on').siblings('li').removeClass('on');
			$('.guide_tab_wrap > div').eq($(this).closest('li').index()).addClass('on').siblings().removeClass('on');
			tab_slide_bnr.slick('unslick');
			tab_slide_bnr.slick({
				infinite: true,
				slidesToShow: 1,
				autoplay: true,
				draggable: false,
				dots:true
			});
			tab_slide_bnr2.slick('unslick');
			tab_slide_bnr2.slick({
				infinite: true,
				slidesToScroll: 1,
				slidesToShow: 2,
				autoplay: true,
				draggable: false,
				dots:true,
				responsive: [
					{
						breakpoint: 650,
						settings: {
							infinite: true,
							slidesToScroll: 1,
							slidesToShow: 1,
							autoplay: true,
							draggable: false,
							arrows: false,
							dots:true,
						}
					}
				]
			});
		});
	}
	/*//교육과정안내*/

	/*센터소식 달력*/
	if($('.calendar_list').length){
		var calendar_slide_bnr = $(".calendar_list");
		calendar_slide_bnr.slick({
			infinite: false,
			slidesToShow: 1,
			fade: true,
			arrows: true,
			speed: 0,
			draggable: false
		});
	}
	$(".calendar_table tbody tr td a").click(function(){
		$(this).addClass("on").parent().siblings().find("a").removeClass("on").parents("tr").siblings().find("a").removeClass("on");
	})
	/*//센터소식 달력*/

	/*탑버튼*/
	$(".top_btn").click(function(){
		$('html, body').animate({
			scrollTop : 0
		}, 400);
	})
	/*//탑버튼*/

	/*푸터 셀렉트*/
	$(document).on("click", ".link_sel > a", function(){
		if($(this).parent().hasClass("on")){
			$(this).parent().removeClass("on");
		}else{
			$(this).parent().addClass("on");
		};
	});
	/*//푸터 셀렉트*/

	/*셀렉트 형식 팝업 다른 영역 클릭 시 닫기*/
	$(document).mouseup(function(e){
		var el01 = $(".custom_sel_list").parent();
		var el02 = $(".link_sel_list").parent();

		if(el01.has(e.target).length === 0){
			el01.removeClass("on");
		}
		if(el02.has(e.target).length === 0){
			el02.removeClass("on");
		}
	});
	/*//셀렉트 형식 팝업 다른 영역 클릭 시 닫기*/

	/*모바일 전체메뉴*/
	$(document).on("click", ".m_type .all_menu_depth1 > li > a", function(){
		if($(this).closest("li").hasClass("on")){
			$(this).closest("li").removeClass("on").find(".all_menu_depth2").slideUp();
		}else{
			$(this).siblings(".all_menu_depth2").slideDown().closest("li").addClass("on").siblings("li").removeClass("on").find(".all_menu_depth2").slideUp();
		}
	});
	$(document).on("click", ".m_type .all_menu_depth2 > li > a", function(){
		console.log("zz");
		if($(this).closest("li").hasClass("on")){
			$(this).closest("li").removeClass("on").find(".all_menu_depth3").slideUp();
		}else{
			$(this).siblings(".all_menu_depth3").slideDown().closest("li").addClass("on").siblings("li").removeClass("on").find(".all_menu_depth3").slideUp();
		}
	});
	/*//모바일 전체메뉴*/

	$(window).resize(function(){

		if($(window).width() >= 1280){
			$("#wrap").removeClass("m_type");
			$(".all_menu_depth2").removeAttr("style");
			$(".all_menu_depth3").removeAttr("style");
		} else if($(window).width() <= 1279){
			$("#wrap").addClass("m_type");
			$("html, body").css({"overflow":"", "height":""});
		}

	});
	$(window).resize();

	$(window).scroll(function(){
		if($(window).scrollTop() > 0){
			$(".m_type #header").addClass("header_fix");
		}else{
			$(".m_type #header").removeClass("header_fix");
		}
	});
	$(window).scroll();

});
function dim_open(){
	$(".dim").show();
	$("html, body").css({"overflow":"hidden", "height":"100%"});
}
function dim_close(){
	$(".dim").hide();
	$("html, body").css({"overflow":"", "height":""});
}

// 배너 정지버튼
function bnr_stop(bnr, btn){
	if (btn.text() === '정지') {
		bnr.slick('slickPause');
		btn.text('시작');
		btn.addClass('start');
		btn.removeClass('stop');
	} else {
		bnr.slick('slickPlay');
		btn.text('정지');
		btn.addClass('stop');
		btn.removeClass('start');
	};
};

var zoomSize = 1;
var zoomRate = 0.2;

// 화면크기 +
function zoomIn() {
	zoomSize += zoomRate;
	
	if ( zoomSize > 2) {
		alert('더 이상 확대할 수 없습니다.');
	} else {
		zoom();
	}
}
// 화면크기 -
function zoomOut() {
	zoomSize -= zoomRate;
	
	if ( zoomSize < 0.5) {
		alert('더 이상 축소할 수 없습니다.');
	} else {
		zoom();
	}
}
// 화면크기 원래대로
function zoomReset() {
	zoomSize = 1;
	zoom();
}
// 화면크기 조절 이벤트
function zoom() {
	document.body.style.transform = 'scale('+zoomSize+')';
	document.body.style.transformOrigin='50% 0 0';
}

//Layer Content
function layerContShow(thisClass){
	$('.'+thisClass).show();
}
function layerContHide(thisClass){
	$('.'+thisClass).hide();
}