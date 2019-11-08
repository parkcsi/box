$(function(){
	//gnb 호버
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

	// 배너존 슬라이더
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

});
//Layer Content
function layerContShow(thisClass){
    $('.'+thisClass).show();
}
function layerContHide(thisClass){
    $('.'+thisClass).hide();
}
