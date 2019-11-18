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

	// 푸터 관련사이트 선택
	$(document).on("click", ".link_sel > a", function(){
		if($(this).parent().hasClass("on")){
			$(this).parent().removeClass("on");
		}else{
			$(this).parent().addClass("on");
		};
	});


	if($(window).width() >= 768){
		$(".gnb_wrap .gnb_list > li, .gnb_depth2_wrap").hover(function(){
			if(!$(this).hasClass("search")){
				$(this).addClass("on");
				$(".gnb_depth2_wrap").addClass("on");
			}
		}, function(){
			if(!$(this).hasClass("search")){
				$(this).removeClass("on");
				$(".gnb_depth2_wrap").removeClass("on");
			}
		});
	}

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

	// 기관별강좌 슬라이더
	if($(".top_list_cont").length){
		var top_list = new Swiper ('.top_list_cont.swiper-container', {
			direction: 'vertical',
			loop: false,
			slidesPerView: 4,
			slidesPerColumn: 1,
			navigation: {
				prevEl: '.top_list_up',
				nextEl: '.top_list_down',
			},
			breakpoints:{
				1299: {
					slidesPerView: 1,
					slidesPerColumn: 4,
				},
				767: {
					slidesPerColumn: 2,
				}
			}
		});
	};

	// 강좌목록 슬라이더
	if($(".class_list_inner").length){
		var class_list = new Swiper ('.class_list_inner.swiper-container', {
			direction: 'horizontal',
			loop: true,
			slidesPerView: 4,
			navigation: {
				nextEl: '.class_list_btn .swiper-button-next',
				prevEl: '.class_list_btn .swiper-button-prev',
			},
			breakpoints:{
				767: {
					slidesPerView: 2,
				}
			}
		});
	};

	// 공지배너 슬라이더
	if($(".noti_bnr_wrap").length){
		var noti_bnr_list = new Swiper ('.noti_bnr_wrap.swiper-container', {
			direction: 'horizontal',
			loop: true,
			navigation: {
				nextEl: '.noti_bnr_wrap .auto_btn .swiper-button-next',
				prevEl: '.noti_bnr_wrap .auto_btn .swiper-button-prev',
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
		});
		$(document).on("click", ".noti_bnr_wrap .auto_btn a", function(){
			if($(this).hasClass("stop")){
				noti_bnr_list.autoplay.stop();
				$(this).removeClass("stop").addClass("start").text("시작");
			}else{
				noti_bnr_list.autoplay.start();
				$(this).removeClass("start").addClass("stop").text("정지");
			}
		});
	};

	// 관련 사이트 리스트 슬라이드
	if($(".link_list_inner").length){
		var link_bnr = new Swiper ('.link_list_inner .swiper-container', {
			direction: 'horizontal',
			loop: true,
			slidesPerView: 5,
			navigation: {
				nextEl: '.link_list_inner .swiper-button-next',
				prevEl: '.link_list_inner .swiper-button-prev',
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			breakpoints:{
				640: {
					slidesPerView: 1,
				},
				950: {
					slidesPerView: 3,
				},
				1300: {
					slidesPerView: 4,
				}
			}
		});
		
		$(document).on("click", ".link_list_inner .auto_btn a", function(){
			if($(this).hasClass("stop")){
				link_bnr.autoplay.stop();
				$(this).removeClass("stop").addClass("start").text("시작");
			}else{
				link_bnr.autoplay.start();
				$(this).removeClass("start").addClass("stop").text("정지");
			}
		})
	};

	// 지역별 강좌 선택
	$(document).on("click", ".local_list li a", function(){
		$(this).parent().addClass("on").siblings().removeClass("on");
		$(".map_btn_wrap > img").attr("src", "../resources/images/content/" + $(this).attr("title") + ".png");
		$(".map_btn_wrap > img").attr("alt", $(this).text());
	});

	// 셀렉트 형식 팝업 다른 영역 클릭 시 닫기
	$(document).mouseup(function(e){
		var el01 = $(".link_sel_list").parent();
		var el02 = $(".search_select .select_txt").parent();

		if(el01.has(e.target).length === 0){
			el01.removeClass("on");
		}
		if(el02.has(e.target).length === 0){
			el02.removeClass("on");
		}
	});

	// 공지사항 탭
	$(document).on("click", ".noti_tab_list > li > a", function(){
		$(this).parent().addClass("on").siblings().removeClass("on");
		$(".noti_tab_cont > li").eq($(this).parent().index()).addClass("on").siblings().removeClass("on");
	});

	$(window).resize(function(){
		if($(window).width() >= 1300){
			if($(".top_list_cont").length){
				var top_list = new Swiper ('.top_list_cont.swiper-container', {
					direction: 'vertical',
					loop: false,
					slidesPerView: 4,
					slidesPerColumn: 1,
					navigation: {
						prevEl: '.top_list_up',
						nextEl: '.top_list_down',
					},
				});
			};
		}
		if($(window).width() <= 1299 && $(window).width() >= 768){
			if($(".top_list_cont").length){
				var top_list = new Swiper ('.top_list_cont.swiper-container', {
					direction: 'vertical',
					loop: false,
					slidesPerView: 1,
					slidesPerColumn: 4,
					navigation: {
						prevEl: '.top_list_up',
						nextEl: '.top_list_down',
					},
				});
			};
		}
		if($(window).width() >= 768){
			$(".header_inner.m_type").removeClass("m_type");

			$(".gnb_wrap .gnb_list > li, .gnb_depth2_wrap").hover(function(){
				if(!$(this).hasClass("search")){
					$(this).addClass("on");
					$(".gnb_depth2_wrap").addClass("on");
				}
			}, function(){
				if(!$(this).hasClass("search")){
					$(this).removeClass("on");
					$(".gnb_depth2_wrap").removeClass("on");
				}
			});
		}
		if($(window).width() <= 767){
			$(".gnb_depth2_wrap.on").removeClass("on");
			if($(".top_list_cont").length){
				var top_list = new Swiper ('.top_list_cont.swiper-container', {
					direction: 'vertical',
					loop: false,
					slidesPerView: 1,
					slidesPerColumn: 2,
					navigation: {
						prevEl: '.top_list_up',
						nextEl: '.top_list_down',
					},
				});
			};
		}
	});
	$(window).resize();

	// 모바일 gnb 토글
	$(".m_gnb_toggle a").click(function(){
		$(this).parents(".header_inner").addClass("m_type");
	})
	$(".m_gnb_close").click(function(){
		$(this).parents(".header_inner").removeClass("m_type");
	})

	// 모바일 gnb 하위메뉴 토글
	$(".depth2_tit > a").click(function(){
		if($(this).parents("li").hasClass("on")){
			$(this).parents("li").removeClass("on").find(">ul").stop().slideUp();
		}else{
			$(this).parents("li").addClass("on").find(">ul").stop().slideDown().parents("li").siblings().removeClass("on").find(">ul").stop().slideUp();
		};
	});
	$(".row_depth > a").click(function(){
		if($(this).parent().hasClass("on")){
			$(this).parent().removeClass("on").find(">ul").stop().slideUp();
		}else{
			$(this).parent().addClass("on").find(">ul").stop().slideDown().parent().siblings().removeClass("on").find(">ul").stop().slideUp();
		};
	});

});
//Layer Content
function layerContShow(thisClass){
    $('.'+thisClass).show();
}
function layerContHide(thisClass){
    $('.'+thisClass).hide();
}
