$(function(){
	// 검색 필터 열기
	$(document).on("click", ".search_select .select_txt", function(){
		if($(this).parent().hasClass("on")){
			$(this).parent().removeClass("on");
		}else{
			$(this).parent().addClass("on");
		};
	});

	// 검색 필터 선택
	$(document).on("click", ".select_list li a", function(){
		$(".select_txt").text($(this).text());
		$(this).parent().addClass("sel").siblings().removeClass("sel");
		$(".search_select").removeClass("on");
	});

	// 검색 필터 선택
	$(document).on("click", ".link_sel > a", function(){
		if($(this).parent().hasClass("on")){
			$(this).parent().removeClass("on");
		}else{
			$(this).parent().addClass("on");
		};
	});

	$(window).resize(function(){
		//gnb 호버
		if($(window).width() >= 768){
			$(".gnb_wrap .gnb_list > li, .gnb_depth2_wrap").hover(function(){
				$(this).addClass("on");
				$(".gnb_depth2_wrap").addClass("on");
			}, function(){
				$(this).removeClass("on");
				$(".gnb_depth2_wrap").removeClass("on");
			});
		};

		if($(window).width() <= 767){
			$(".gnb_depth2_wrap.on").removeClass("on");
			$(".gnb_wrap").find(".on").removeClass("on");
			$(".depth2_tit").parent().find(">ul").hide();
		};
		if($(window).width() >= 768){
			$(".header_inner.m_type").removeClass("m_type");
			$(".depth2_tit").parent().find(">ul").show();
		};
	});
	$(window).resize();

	// 메인 슬라이더
	if($(".main_top_bnr").length){
		var main_visual = new Swiper ('.main_top_bnr.swiper-container', {
			direction: 'horizontal',
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
		});
		$(document).on("click", ".main_top_bnr .auto_btn .auto_btn_bg a", function(){
			if($(this).hasClass("stop")){
				main_visual.autoplay.stop();
				$(this).removeClass("stop").addClass("start").text("시작");
			}else{
				main_visual.autoplay.start();
				$(this).removeClass("start").addClass("stop").text("정지");
			}
		});
	};

	// 메인 슬라이더
	if($(".top_list_cont").length){
		var top_list = new Swiper ('.top_list_cont.swiper-container', {
			direction: 'vertical',
			loop: false,
			slidesPerView: 4,
			navigation: {
				prevEl: '.top_list_up',
				nextEl: '.top_list_down',
			},
		});
	};

	$(".local_list li a").click(function(){
		$(".map_btn_wrap > img").attr("src", "../resources/images/content/" + $(this).attr("title") + ".png");
		$(".map_btn_wrap > img").attr("alt", $(this).text());
	});

	// // 모바일 gnb 토글
	// $(".m_gnb_toggle a").click(function(){
	// 	if($(this).parents(".header_inner").hasClass("m_type")){
	// 		$(this).parents(".header_inner").removeClass("m_type");
	// 	}else{
	// 		$(this).parent().addClass("m_type");
	// 		$(this).parents(".header_inner").addClass("m_type");
	// 	};
	// })

	// // 모바일 gnb 하위메뉴 토글
	// $(".depth2_tit > a").click(function(){
	// 	if($(this).parents("li").hasClass("on")){
	// 		$(this).parents("li").removeClass("on").find(">ul").stop().slideUp();
	// 	}else{
	// 		$(this).parents("li").addClass("on").find(">ul").stop().slideDown().parents("li").siblings().removeClass("on").find(">ul").stop().slideUp();
	// 	};
	// });


	// top 버튼
	$(document).on("click", ".floating_btn .top_btn",function(){
		$('html, body').animate({
            scrollTop : 0
        }, 400);
	})

});
//Layer Content
function layerContShow(thisClass){
    $('.'+thisClass).show();
}
function layerContHide(thisClass){
    $('.'+thisClass).hide();
}
