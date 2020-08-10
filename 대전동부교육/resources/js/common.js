$(function(){
	/*gnb 오픈*/
	$(".gnb_depth1 > li > a").on("mouseenter focusin", function(){
		$(this).parent("li").addClass("on").find(".gnb_depth2").clearQueue().slideDown().parent("li").siblings("li").removeClass("on").find(".gnb_depth2").clearQueue().hide();
	});
	$(".gnb_depth1").on("mouseleave", function(){
		$(".gnb_depth1 > li").removeClass("on").find(".gnb_depth2").clearQueue().hide();
	});
	/*//gnb 오픈*/

	/*전체메뉴*/
	$(".all_menu_btn").click(function(){
		if($(".search_btn").hasClass("close")){
			$(".search_btn a").click();
		}
		$(".all_menu_wrap").show();
		$(".all_menu_close").focus();
		dim_open();
	});
	$(".all_menu_close").click(function(){
		$(".all_menu_wrap").hide();
		$(".all_menu_btn a").focus();
		dim_close();
	});
	/*//전체메뉴*/

	$(document).focusin(function(e){
		// gnb 포커스
		var el01 = $(".gnb_depth1");
		if(el01.parents("#gnb").has(e.target).length === 0){
			el01.find("li").removeClass("on").find(".gnb_depth2").hide();
		}
		// 전체메뉴 포커스
		var el02 = $(".all_menu_wrap");
		if(el02.has(e.target).length === 0){
			$(".all_menu_close").focus();
		}
	});

	/*gnb 2뎁스 높이*/
	$(".gnb_depth1 > li > a").on("mouseenter focusin", function(){
		var depth2_li = $(this).parent().find(".gnb_depth2 > ul > li");
		var li_h1 = [];
		var li_h2 = [];
		for(var i = 0; i < depth2_li.length; i++){
			if(i <= 4){
				li_h1.push(depth2_li.eq(i).height());
			} else {
				li_h2.push(depth2_li.eq(i).height());
			}
		};
		for(var j = 0; j < li_h1.length; j++){
			depth2_li.eq(j).height(Math.max.apply(null, li_h1));
		};
		for(var k = 0; k < li_h2.length; k++){
			depth2_li.eq(k+5).height(Math.max.apply(null, li_h2));
		};
	});
	/*//gnb 2뎁스 높이*/

	/*검색어 키워드 슬라이드*/
	if($('.keyword_wrap').length){
		var keyword_bnr = $(".keyword_list");
		keyword_bnr.slick({
			infinite: false,
			slidesToScroll: 5,
			variableWidth: true,
			slidesToShow: 5,
			rows: 1,
			autoplay: true,
			draggable: false,
			prevArrow: $('.keyword_wrap .keyword_list_control .prev'),
			nextArrow: $('.keyword_wrap .keyword_list_control .next')
		});
		$('.keyword_list_control .stop').click(function(){
			bnr_stop(keyword_bnr, $(this));
		});
	}
	/*//검색어 키워드 슬라이드*/

	/*메인 슬라이드*/
	if($('.main_banner').length){
		var main_bnr = $(".main_banner_list");
		main_bnr.on('init reInit', function(){
			var main_controler = '<div class="main_banner_btn">' +
				'<button type="button" class="prev">이전</button>' +
				'<button type="button" class="stop">정지</button>' +
				'<button type="button" class="next">다음</button>' +
			'</div>';
			$('.main_banner_list .slick-dots').wrap('<div class="main_banner_control"><div class="main_banner_dot"></div></div>');
			$('.main_banner_dot').append(main_controler);
		});
		main_bnr.slick({
			infinite: true,
			accessibility: true,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed:5000,
			draggable: false,
			arrows: false,
			dots:true
		});
		$('.main_banner_btn .stop').click(function(){
			bnr_stop(main_bnr, $(this));
		});
		$('.main_banner_btn .prev, .m_main_arrow .prev').click(function(){
			main_bnr.slick('slickPrev');
		})
		$('.main_banner_btn .next, .m_main_arrow .next').click(function(){
			main_bnr.slick('slickNext');
		})
	}
	/*//메인 슬라이드*/

	/*배너존 슬라이드*/
	if($('.banner_zone').length){
		var banner_zone_bnr = $(".banner_zone_list");
		banner_zone_bnr.on('init afterChange', function(event, slick, currentSlide, nextSlide){
			if(event.type === 'init'){
				$('.banner_zone_control .num').text(' / '+slick.slideCount);
				$('.banner_zone_control .num').prepend('<strong>1</strong>')
			} else if(event.type === 'afterChange'){
				$('.banner_zone_control .num strong').text(currentSlide + 1);
			}
		});
		banner_zone_bnr.slick({
			infinite: true,
			accessibility: true,
			slidesToScroll: 1,
			autoplay: true,
			draggable: false,
			prevArrow: $('.banner_zone_wrap .banner_zone_control .prev'),
			nextArrow: $('.banner_zone_wrap .banner_zone_control .next')
		});
		$('.banner_zone_control .stop').click(function(){
			bnr_stop(banner_zone_bnr, $(this));
		});
	}
	/*//배너존 슬라이드*/

	/*링크그룹 슬라이드*/
	if($('.link_group').length){
		var link_group_bnr = $(".link_group_list");
		link_group_bnr.slick({
			infinite: true,
			slidesToShow: 6,
			slidesToScroll: 1,
			draggable: false,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						infinite: true,
						slidesToShow: 1,
						rows: 2,
						slidesPerRow :3,
						slidesToScroll: 1,
						draggable: false,
					}
				},
				{
					breakpoint: 850,
					settings: {
						infinite: true,
						slidesToShow: 1,
						rows: 2,
						slidesPerRow :2,
						slidesToScroll: 1,
						draggable: false,
					}
				},
				{
					breakpoint: 650,
					settings: {
						infinite: true,
						slidesToShow: 3,
						slidesToScroll: 1,
						draggable: false,
					}
				}
			]
		});
	}
	/*//링크그룹 슬라이드*/

	/*맞춤서비스 슬라이드*/
	if($('.custom_service').length){
		var custom_bnr = $(".custom_service_list");
		custom_bnr.slick({
			rows: 2,
			slidesPerRow :3,
			draggable: false,
			responsive: [
				{
					breakpoint: 480,
					settings: {
						rows: 1,
						slidesPerRow :3,
						draggable: false,
					}
				}
			]
		});
	}
	$(document).on('click', '.custom_service_tab h4 a',function(){
		$(this).closest('li').addClass('on').siblings('li').removeClass('on');
		custom_bnr.slick('unslick');
		custom_bnr.slick({
			rows: 2,
			slidesPerRow :3,
			draggable: false,
			responsive: [
				{
					breakpoint: 480,
					settings: {
						rows: 1,
						slidesPerRow :3,
						draggable: false,
					}
				}
			]
		});
	});
	/*//맞춤서비스 슬라이드*/

	/*배너모음 슬라이드*/
	if($('.link_list_wrap').length){
		var link_list_bnr = $(".link_list");
		link_list_bnr.slick({
			infinite: true,
			accessibility: true,
			slidesToScroll: 1,
			slidesToShow: 5,
			// variableWidth: true,
			autoplay: true,
			draggable: false,
			prevArrow: $('.link_list_inner .control_box .prev'),
			nextArrow: $('.link_list_inner .control_box .next'),
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 4,
						infinite: true,
						accessibility: true,
						slidesToScroll: 1,
						autoplay: true,
						draggable: false,
						prevArrow: $('.link_list_inner .control_box .prev'),
						nextArrow: $('.link_list_inner .control_box .next'),
					}
				},
				{
					breakpoint: 1000,
					settings: {
						slidesToShow: 3,
						infinite: true,
						accessibility: true,
						slidesToScroll: 1,
						autoplay: true,
						draggable: false,
						prevArrow: $('.link_list_inner .control_box .prev'),
						nextArrow: $('.link_list_inner .control_box .next'),
					}
				},
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 2,
						infinite: true,
						accessibility: true,
						slidesToScroll: 1,
						autoplay: true,
						draggable: false,
						prevArrow: $('.link_list_inner .control_box .prev'),
						nextArrow: $('.link_list_inner .control_box .next'),
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
						infinite: true,
						accessibility: true,
						slidesToScroll: 1,
						autoplay: true,
						draggable: false,
						prevArrow: $('.link_list_inner .control_box .prev'),
						nextArrow: $('.link_list_inner .control_box .next'),
					}
				}
			]
		});
		$('.control_box .stop').click(function(){
			bnr_stop(link_list_bnr, $(this));
		});
	}
	/*//배너모음 슬라이드*/

	/*공지사항 탭*/
	$('.notice_list > li > h3 > a').on('click', function(){
		$(this).closest('li').addClass('on').siblings('li').removeClass('on');
	});
	/*//공지사항 탭*/

	/*온라인설문지 선택*/
	$(document).on("click", ".custom_sel > a", function(){
		if($(this).parent().hasClass("on")){
			$(this).parent().removeClass("on");
		}else{
			$(this).parent().addClass("on");
		};
	});
	$(document).on("click", ".custom_sel_list li a", function(){
		$(".custom_sel > a").text($(this).text());
		$(".custom_sel").removeClass("on");
	});
	/*//온라인설문지 선택*/

	/*푸터 셀렉트*/
	$(document).on("click", ".link_sel > li > a", function(){
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

	/*모바일 검색영역*/
	$(".search_btn a").click(function(){
		if($(this).parent().hasClass("close")){
			$(this).parent().removeClass("close");
			$(".search_wrap").hide();
			$("#header").css("z-index", "102");
			dim_close()
		} else{
			$(this).parent().addClass("close");
			$(".search_wrap").show();
			$("#header").css("z-index", "104");
			dim_open()
		}
	});
	/*//모바일 검색영역*/

	/*모바일 전체메뉴*/
	$(".all_menu_depth1 > li > a").click(function(){
		if($(this).closest("li").hasClass("on")){
			$(this).closest("li").removeClass("on").find(".all_menu_depth2").clearQueue().slideUp();
		}else{
			$(".all_menu_list .all_menu_depth1 > li").removeClass("on").find(".all_menu_depth2").clearQueue().slideUp();
			$(this).closest("li").addClass("on").find(".all_menu_depth2").clearQueue().slideDown();
		}
	});
	$(".all_menu_depth2 > ul > li > a").click(function(){
		if($(this).closest("li").hasClass("on")){
			$(this).closest("li").removeClass("on").find(".all_menu_depth3").clearQueue().slideUp();
		}else{
			$(this).closest("li").siblings("li").removeClass("on").find(".all_menu_depth3").clearQueue().slideUp();
			$(this).closest("li").addClass("on").find(".all_menu_depth3").clearQueue().slideDown();
		}
	});
	/*//모바일 전체메뉴*/

	$(window).resize(function(){

		if($(window).width() >= 1200){
			$(".search_wrap").removeAttr("style");
			$(".search_btn.close a").click();
			$(".all_menu_wrap").removeClass("m_all_menu").find("li").removeClass("on");
			$(".all_menu_depth2, .all_menu_depth3").removeAttr("style");
		} else if($(window).width() <= 1199){
			$(".all_menu_wrap").addClass("m_all_menu");
		}

	});
	$(window).resize();

});
function dim_open(){
	$(".dim").show();
	$("html, body").css({"overflow":"hidden", "height":"100%"});
}
function dim_close(){
	$(".dim").hide();
	$("html, body").css({"overflow":"auto", "height":"auto"});
}

// 배너 정지버튼
function bnr_stop(bnr, btn){
	if (btn.text() === '정지') {
		bnr.slick('slickPause');
		btn.text('시작');
	} else {
		bnr.slick('slickPlay');
		btn.text('정지');
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
