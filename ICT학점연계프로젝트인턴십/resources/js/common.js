$(function(){

	// 메인관련 슬라이드
	if($("#container.main").length){

		// 메인배너
		var main_visual = new Swiper ('.main_top_bnr.swiper-container', {
			direction: 'horizontal',
			loop: true,
			navigation: {
				nextEl: '.main_top_bnr .swiper-button-next',
				prevEl: '.main_top_bnr .swiper-button-prev',
			},
			pagination: {
				el: '.main_top_bnr .swiper-pagination',
				clickable: true,
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
		});

		// 배너존
		var main_noti = new Swiper ('.noti_bnr_wrap.swiper-container', {
			direction: 'horizontal',
			loop: true,
			navigation: {
				nextEl: '.noti_bnr_control .swiper_button_next',
				prevEl: '.noti_bnr_control .swiper_button_prev',
			},
			pagination: {
				el: ".noti_bnr_control .swiper-pagination",
				type: "fraction",
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
		});
		$(document).on("click", ".noti_bnr_control .auto_btn a", function(){
			if($(this).hasClass("stop")){
				main_noti.autoplay.stop();
				$(this).removeClass("stop").addClass("start").text("시작");
			}else{
				main_noti.autoplay.start();
				$(this).removeClass("start").addClass("stop").text("정지");
			}
		});

		// 연수업체목록배너
		var comp_list = new Swiper ('.main_comp_list.swiper-container', {
			direction: 'horizontal',
			loop: true,
			slidesPerView: 4,
			slidesPerGroup: 4,
			loopAdditionalSlides: 5,
			spaceBetween: 30,
			pagination: {
				el: ".comp_btn_wrap .swiper-pagination",
				type: "fraction",
			},
			navigation: {
				nextEl: '.comp_btn_wrap .swiper_button_next',
				prevEl: '.comp_btn_wrap .swiper_button_prev',
			},
			breakpoints:{
				1239: {
					slidesPerView: 3,
					slidesPerGroup: 3,
					loopAdditionalSlides: 0,
					spaceBetween: 40,
				},
				767: {
					slidesPerView: 1,
					slidesPerGroup: 1,
				}
			}
		});
	};

	// 메인 공지사항 탭
	$(".tab_list li a").on("click", function(){
		$(this).parent().addClass("on").siblings().removeClass("on");
		$(".noti_tab_cont > li").eq($(this).parent().index()).addClass("on").siblings().removeClass("on");
	});

	// 모바일 gnb
	$(".gnb_btn").on("click", function(){
		$(".header_inner .gnb_wrap").show().addClass("m_type");
		$(".header_inner .dim").show();
	});
	$(".m_gnb_nav .gnb_close").on("click", function(){
		$(".header_inner .gnb_wrap").hide().removeClass("m_type");
		$(".header_inner .dim").hide();
	});
	$(document).on("click", ".m_type .depth01 > li > a", function(){
		if($(this).parent().hasClass("on")){
			$(this).parent().removeClass("on").find(".depth02").slideUp();
		}else{
			$(this).parent().addClass("on").find(".depth02").slideDown().parent().siblings().removeClass("on").find(".depth02").slideUp();
		}
	});

	$(".layer_pop .pop_btn a").on("click", function(){
		$(".layer_pop").hide();
	});

	$(window).resize(function(){

		if($(window).width() <= 768){
			$(".gnb_wrap.m_type").removeClass("m_type");
		}
	}).resize();

});

//Layer Content
function layerContShow(thisClass){
    $("."+thisClass).show();
}
function layerContHide(thisClass){
    $("."+thisClass).hide();
}
