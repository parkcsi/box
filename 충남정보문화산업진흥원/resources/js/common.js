$(function(){
	/*gnb 오픈*/
	$(".gnb_wrap > .gnb_depth1 > li").on("mouseenter focusin", function(){
		$(".gnb_wrap").addClass("on");
		$(this).addClass("on").siblings("li").removeClass("on");
		$(".gnb_depth2").clearQueue().slideDown();
		$(".gnb_wrap > .gnb_bg").clearQueue().slideDown();
	});
	$(".gnb_wrap > .gnb_depth1").on("mouseleave", function(){
		$(".gnb_wrap").removeClass("on");
		$(this).find("li").removeClass("on");
		$(".gnb_depth2").clearQueue().hide();
		$(".gnb_wrap > .gnb_bg").clearQueue().hide();
	});
	$(document).focusin(function(e){
		// gnb 포커스
		var el01 = $(".gnb_wrap > .gnb_depth1");
		if(el01.parents("#gnb").has(e.target).length === 0){
			$(".gnb_wrap").removeClass("on");
			$(".gnb_wrap > .gnb_depth1 > li").removeClass("on");
			$(".gnb_depth2").clearQueue().hide();
			$(".gnb_wrap > .gnb_bg").clearQueue().hide();
		}
	});
	/*//gnb 오픈*/

	/*검색영역*/
	$(".search_wrap .search_btn").click(function(){
		$(this).parents(".search_wrap").addClass("on")
	});
	$(".search_close").click(function(){
		$(this).parents(".search_wrap").removeClass("on")
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
			dots:true
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
					breakpoint: 550,
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
	$(".all_menu_btn a").click(function(){
		if($(window).width() >= 1244){
			if($(this).parents("#wrap").hasClass("all_menu")){
				$(this).parents("#wrap").removeClass("all_menu");
				$("html, body").css({"overflow":"auto", "height":"auto"});
			}else{
				$(this).parents("#wrap").addClass("all_menu");
				$("html, body").css({"overflow":"hidden", "height":"100%"});
				var all_menu_line = $(".all_menu_depth1 > li");
				var line_h = [];
				for(var i = 0; i < all_menu_line.length; i++){
					line_h.push(all_menu_line.eq(i).height());
				};
				for(var j = 0; j < line_h.length; j++){
					all_menu_line.eq(j).height(Math.max.apply(null, line_h));
				};
			}
		}else{
			$(".m_gnb_wrap").show();
			dim_open()
		}
	});
	$(".m_gnb_close").click(function(){
		$(".m_gnb_wrap").hide();
		dim_close()
	})
	/*//전체메뉴*/


	/*모바일 전체메뉴*/
	$(".m_gnb_wrap > .gnb_depth1 > li > a").click(function(){
		if(!$(this).closest("li").hasClass("m_menu")){
			if($(this).closest("li").hasClass("on")){
				// $(this).closest("li").removeClass("on");
			}else{
				$(this).closest("li").addClass("on").siblings("li").removeClass("on");
			}
		}
	});
	$(".m_gnb_wrap .gnb_depth2 > ul > li > a").click(function(){
		if($(this).closest("li").hasClass("on")){
			$(this).closest("li").removeClass("on").find(".gnb_depth3").clearQueue().slideUp();
		}else{
			$(this).closest("li").siblings("li").removeClass("on").find(".gnb_depth3").clearQueue().slideUp();
			$(this).closest("li").addClass("on").find(".gnb_depth3").clearQueue().slideDown();
		}
	});
	/*//모바일 전체메뉴*/

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

		if($(window).width() >= 1244){
			$(".search_wrap").removeAttr("style");
			$(".m_gnb_close").click();
		} else if($(window).width() <= 1243){
			$("#wrap").removeClass("all_menu");
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