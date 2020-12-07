$(function(){

	/*gnb 오픈*/
	$(document).on("mouseenter focusin", ".p_type > .gnb_wrap > .gnb_depth1 > li", function(){
		$("#header").addClass("gnb_on");
		$(this).addClass("on").siblings("li").removeClass("on");
		$(".gnb_depth2").clearQueue().slideDown();
		$(".gnb_wrap > .gnb_bg").clearQueue().slideDown();
	});
	$(document).on("mouseleave", ".p_type > .gnb_wrap > .gnb_depth1", function(){
		$("#header").removeClass("gnb_on");
		$(this).find("li").removeClass("on");
		$(".gnb_depth2").clearQueue().hide();
		$(".gnb_wrap > .gnb_bg").clearQueue().hide();
	});
	$(document).focusin(function(e){
		// gnb 포커스
		var el01 = $(".p_type > .gnb_wrap > .gnb_depth1");
		if(el01.parents("#gnb").has(e.target).length === 0){
			$("#header").removeClass("gnb_on");
			$(".p_type > .gnb_wrap > .gnb_depth1 > li").removeClass("on");
			$(".p_type").find(".gnb_depth2").clearQueue().hide();
			$(".gnb_wrap > .gnb_bg").clearQueue().hide();
		}
	});
	/*//gnb 오픈*/

	/*모바일 전체메뉴*/
	$(document).on("click", ".m_type > .gnb_wrap > .gnb_depth1 > li > a", function(){
		$(this).closest("li").addClass("on").siblings("li").removeClass("on");
	});
	/*//모바일 전체메뉴*/

	/*검색영역*/
	$(document).on("click", ".search_wrap .search_btn", function(){
		$(this).parents(".search_wrap").addClass("on");
		if($(window).width() <= 1231){
			$(".header_inner, .search_wrap, .m_gnb_open").css("z-index", "104");
			dim_open();
		}
	});
	$(".search_close").click(function(){
		$(this).parents(".search_wrap").removeClass("on");
		$(".header_inner, .search_wrap, .m_gnb_open").css("z-index", "3");
		dim_close();
	});
	/*//검색영역*/

	/*푸터 셀렉트*/
	$(".link_sel > a").click(function(){
		if($(this).parent().hasClass("on")){
			$(this).parent().removeClass("on");
		}else{
			$(this).parent().addClass("on");
		};
	});
	/*//푸터 셀렉트*/

	$(".favor_group .quick_btn").click(function(){
		if($(this).siblings(".favor_group_list").hasClass("on")){
			$(this).siblings(".favor_group_list").removeClass("on");
		}else{
			$(this).siblings(".favor_group_list").addClass("on");
		}
	});

	/*셀렉트 형식 팝업 다른 영역 클릭 시 닫기*/
	$(document).mouseup(function(e){
		var el01 = $(".link_sel_list").parent();

		if(el01.has(e.target).length === 0){
			el01.removeClass("on");
		}
	});
	/*//셀렉트 형식 팝업 다른 영역 클릭 시 닫기*/

	/*메인 슬라이드*/
	if($('.main_banner_wrap').length){
		var main_bnr = $(".main_banner_for");
		var main_nav_bnr = $(".main_banner_nav");
		main_bnr.on('init beforeChange afterChange', function(event, slick, currentSlide, nextSlide){
			if(event.type === 'init'){
				$('.main_banner_btn .num').text(' / ').append('<span>'+slick.slideCount+'</span>');
				$('.main_banner_btn .num').prepend('<strong>1</strong>')
			} else if(event.type === 'beforeChange'){
				$(".main_banner_txt").css("opacity", "0");
			} else if(event.type === 'afterChange'){
				var txt = $(slick.$slides[currentSlide]).find("dl").clone();
				$('.main_banner_btn .num strong').text(currentSlide + 1);
				$(".main_banner_txt").empty().append(txt).animate({"opacity": 1}, 200);
			}
		});
		main_bnr.slick({
			infinite: true,
			accessibility: true,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed:5000,
			draggable: false,
			arrows: false,
			asNavFor: '.main_banner_nav',
		});
		main_nav_bnr.slick({
			infinite: true,
			accessibility: true,
			slidesToScroll: 1,
			slidesToShow: 4,
			autoplaySpeed:5000,
			draggable: false,
			asNavFor: '.main_banner_for',
			responsive: [
				{
					breakpoint: 950,
					settings: {
						infinite: true,
						accessibility: true,
						slidesToScroll: 1,
						slidesToShow: 3,
						autoplaySpeed:5000,
						draggable: false,
						asNavFor: '.main_banner_for',
					}
				},
				{
					breakpoint: 800,
					settings: {
						infinite: true,
						accessibility: true,
						slidesToScroll: 1,
						slidesToShow: 2,
						autoplaySpeed:5000,
						draggable: false,
						asNavFor: '.main_banner_for',
					}
				}
			]
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

	/*배너존 슬라이드*/
	if($('.banner_zone_list').length){
		var banner_zone_bnr = $(".banner_zone_list");
		banner_zone_bnr.slick({
			infinite: true,
			accessibility: true,
			slidesToScroll: 1,
			slidesToShow: 2,
			autoplay: true,
			draggable: false,
			dots:true,
			responsive: [
				{
					breakpoint: 1232,
					settings: {
						infinite: true,
						accessibility: true,
						slidesToScroll: 1,
						slidesToShow: 1,
						autoplay: true,
						draggable: false,
						dots:true,
						arrows: false,
					}
				}
			]
		});
	}
	/*//배너존 슬라이드*/

	/*하단 외부링크리스트 슬라이드*/
	if($('.link_list_wrap').length){
		var link_list_bnr = $(".link_list");
		link_list_bnr.slick({
			infinite: true,
			accessibility: true,
			slidesToScroll: 1,
			slidesToShow: 6,
			autoplay: true,
			draggable: false,
			prevArrow: $('.link_list_inner .control_box .prev'),
			nextArrow: $('.link_list_inner .control_box .next'),
			responsive: [
				{
					breakpoint: 1232,
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
					breakpoint: 850,
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
				}
			]
		});
		$('.link_list_inner .control_box .stop, .link_list_inner .control_box .start').click(function(){
			bnr_stop(link_list_bnr, $(this));
		});
	}
	/*//하단 외부링크리스트 슬라이드*/

	/*공지사항 탭*/
	$('.notice_box > .list_box > li > a').on('click', function(){
		$(this).closest('li').addClass('on').siblings('li').removeClass('on');
	});
	/*//공지사항 탭*/

	/*탑버튼*/
	$(".top_btn").click(function(){
		$('html, body').animate({
			scrollTop : 0
		}, 400);
	})
	/*//탑버튼*/

	/*전체메뉴*/
	$(".gnb_open_btn").click(function(){
		$(".gnb_wrap").show().find(".gnb_depth2").removeAttr("style");
		$(".gnb_wrap > .gnb_depth1 > li:first-child").addClass("on").siblings("li").removeClass("on");
		$(".search_close").click();
		dim_open();
	});
	$(".m_gnb_close").click(function(){
		$(".gnb_wrap").hide();
		dim_close()
	})
	/*//전체메뉴*/



	/*lnb 오픈*/
	$(".lnb_wrap > .active_menu").click(function(){
		if($(this).siblings(".lnb_list").is(':visible')){
			$(this).siblings(".lnb_list").slideUp();
		}else{
			$(this).siblings(".lnb_list").slideDown();
		}
	})
	/*//lnb 오픈*/

	$(window).resize(function(){

		if($(window).width() >= 1232){
			$(".m_gnb_close").click();
			$(".gnb_wrap").attr("style", "");
			$("#header").addClass("p_type").removeClass("m_type");
			$(".gnb_wrap > .gnb_depth1 > li").removeClass("on")

		} else if($(window).width() <= 1231){
			$("#header").addClass("m_type").removeClass("p_type");
			$(".gnb_depth2").attr("style", "");
			$("html, body").css({"overflow":"auto", "height":"auto"});
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
		btn.addClass('start');
		btn.removeClass('stop');
	} else {
		bnr.slick('slickPlay');
		btn.text('정지');
		btn.addClass('stop');
		btn.removeClass('start');
	};
};

//Layer Content
function layerContShow(thisClass){
	$('.'+thisClass).show();
}
function layerContHide(thisClass){
	$('.'+thisClass).hide();
}