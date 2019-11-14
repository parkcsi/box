$(function(){

	$(window).resize(function(){
		//gnb 호버
		if($(window).width() >= 768){
			$(".gnb_wrap .gnb_list > li").hover(function(){
				$(this).addClass("on");
				$(".gnb_depth2_wrap").addClass("on").find(".depth2_inner h2 .tit0"+$(this).index()).addClass("on").siblings().removeClass("on");
			}, function(){
				$(this).removeClass("on");
				$(".gnb_depth2_wrap").removeClass("on");
			});
			$(".gnb_depth2_wrap .depth2_inner > ul > li").hover(function(){
				$(".gnb_wrap .gnb_list > li").eq($(this).index()).addClass("on");
				$(".gnb_depth2_wrap").addClass("on").find(".depth2_inner h2 .tit0"+$(this).index()).addClass("on").siblings().removeClass("on");
			}, function(){
				$(".gnb_wrap .gnb_list > li").eq($(this).index()).removeClass("on");
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

	/* 191114 : 추가 */
	// top버튼
	$(window).scroll(function(){
		if($(".m_gnb_toggle").is(':visible')){
			if($(window).scrollTop() > 80){
				$(".floating_btn").fadeIn(200);
			}else{
				$(".floating_btn").fadeOut(200);
			}
		}else{
			if($(window).scrollTop() > 0){
				$(".floating_btn").fadeIn(200);
			}else{
				$(".floating_btn").fadeOut(200);
			}
		}
	});
	$(window).scroll();

	if($(window).width() <= 1023){
		$(".path_inner").find(".depth3 a").click(function(){
			if($(this).parent().hasClass("on")){
				$(this).parent().removeClass("on");
			}else{
				$(this).parent().addClass("on");
			}
		})

	}
	/* //191114 : 추가 */

	// 모바일 gnb 토글
	$(".m_gnb_toggle a").click(function(){
		if($(this).parents(".header_inner").hasClass("m_type")){
			$(this).parents(".header_inner").removeClass("m_type");
		}else{
			$(this).parent().addClass("m_type");
			$(this).parents(".header_inner").addClass("m_type");
		};
	})

	// 모바일 gnb 하위메뉴 토글
	$(".depth2_tit > a").click(function(){
		if($(this).parents("li").hasClass("on")){
			$(this).parents("li").removeClass("on").find(">ul").stop().slideUp();
		}else{
			$(this).parents("li").addClass("on").find(">ul").stop().slideDown().parents("li").siblings().removeClass("on").find(">ul").stop().slideUp();
		};
	});

	// 메인 슬라이더
	if($(".main_top_cont").length){
		var main_visual = new Swiper ('.main_top_cont.swiper-container', {
			direction: 'horizontal',
			loop: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
		});
	};

	// 메인 배너존 슬라이더
	if($(".info_bnr_zone").length){
		var bzone_visual = new Swiper ('.info_bnr_zone.swiper-container', {
			direction: 'horizontal',
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				type: 'fraction',
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
		});

		$(document).on("click", ".info_bnr_zone .auto_btn a", function(){
			if($(this).hasClass("stop")){
				bzone_visual.autoplay.stop();
				$(this).removeClass("stop").addClass("start").text("시작");
			}else{
				bzone_visual.autoplay.start();
				$(this).removeClass("start").addClass("stop").text("정지");
			}
		});
	};

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
