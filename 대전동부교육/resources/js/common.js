$(function(){
	// 모바일 버전일 경우
	if($(".mo_gnb_btn").is(':visible')){
		// 모바일 gnb 토글
		$(document).on("click", ".mo_gnb_btn a", function(){
			if($(this).parent().hasClass("on")){
				$(this).parent().removeClass("on");
				$(this).parents(".header_inner").removeClass("on");
			}else{
				$(this).parent().addClass("on");
				$(this).parents(".header_inner").addClass("on");
				if($(".search_wrap").hasClass("on")){
					$(".search_wrap").removeClass("on");
					$(".mo_search_btn").removeClass("on");
				}
			};
		});

		// 모바일 search 토글
		$(document).on("click", ".mo_search_btn a", function(){
			if($(".search_wrap").hasClass("on")){
				$(this).parent().removeClass("on");
				$(".search_wrap").removeClass("on");
			}else{
				$(this).parent().addClass("on");
				$(".search_wrap").addClass("on");
				if($(".header_inner").hasClass("on")){
					$(".header_inner").removeClass("on");
					$(".mo_gnb_btn").removeClass("on");
				}
			};
		});
		// gnb 모바일 버튼 토글
		$(document).on("click", ".gnb_list > li > a", function(){
			$(this).parent().addClass("on").siblings().removeClass("on");
		});
		// 나의도서관 열기
		$(document).on("click", ".my_menu .my_menu_btn", function(){
			$(".gnb_list .gnb_my_menu > a").click();
		});
	}else{
		// 나의도서관 열기
		$(document).on("click", ".my_menu .my_menu_btn", function(){
			if(!$(".my_menu").hasClass("on")){$(".my_menu").addClass("on");}
		});
		// 나의도서관 닫기
		$(document).on("click", ".my_menu .my_menu_box .my_menu_close", function(){
			$(".my_menu").removeClass("on");
		});
		// 나의도서관 2뎁스
		$(document).on("click", ".my_menu_list .depth_row > a", function(){
			if($(this).parent().hasClass("on")){
				$(this).parent().removeClass("on");
				$(this).siblings(".depth2").stop().slideUp(200);
			}else{
				$(this).parent().addClass("on");
				$(this).siblings(".depth2").stop().slideDown(200);
			};
		})
		// gnb slide
		$(document).on("mouseenter", ".gnb_list > li", function(){
			$(this).addClass("on").find(".gnb_depth2").stop().slideDown(200);
		});
		$(document).on("mouseleave", ".gnb_list > li", function(){
			$(this).removeClass("on").find(".gnb_depth2").stop().slideUp(200);
		});
	}
	


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

	// top버튼
	$(document).on("click", ".top_btn", function(){
		$('html, body').animate({
            scrollTop : 0
        }, 400);
	});


	// 모바일 gnb 2depth 닫기
	$(document).on("click", ".gnb_close_btn a", function(){
		$(this).parents(".gnb_wrap").find(".gnb_list > li").removeClass("on");
	});

	// 모바일 lnb 토글
	$(document).on("click", ".lnb_on_menu", function(){
		if($(this).parent().hasClass("on")){
			$(this).parent().removeClass("on");
		}else{
			$(this).parent().addClass("on");
		};
	});

	// PC lnb 3뎁스 토글
	if($(window).width() >= 1351){
		$(document).on("click", ".lnb_list > ul > li > a", function(){
			if($(this).parent().hasClass("on")){
				$(this).parent().removeClass("on");
				$(this).siblings("ul").slideUp(200);
			}else{
				$(this).parent().addClass("on").siblings("li").removeClass("on");
				$(this).siblings("ul").slideDown(200);
			};
		});
	};

	// 셀렉트 형식 팝업 다른 영역 클릭 시 닫기
	$(document).mouseup(function(e){
		var el01 = $(".lnb_on_menu").parent();
		var el02 = $(".link_sel_list").parent();
		var el03 = $(".search_select .select_txt").parent();

		if(el01.has(e.target).length === 0){
			el01.removeClass("on");
		}
		if(el02.has(e.target).length === 0){
			el02.removeClass("on");
		}
		if(el03.has(e.target).length === 0){
			el03.removeClass("on");
		}
	});

	// top버튼
	$(window).scroll(function(){
		if($(".mo_gnb_btn").is(':visible')){
			if($(window).scrollTop() > 80){
				$(".top_btn").css("display", "block");
			}else{
				$(".top_btn").css("display", "none");
			}
		}else{
			if($(window).scrollTop() > 0){
				$(".top_btn").css("display", "block");
			}else{
				$(".top_btn").css("display", "none");
			}
		}
	});
	
	if($(".main_top_bnr").length){
		var main_visual = new Swiper ('.main_top_bnr.swiper-container', {
			direction: 'horizontal',
			effect: 'fade',
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
	};

	if($(".best_inner").length){
		var best_bnr = new Swiper ('.best_inner.swiper-container', {
			direction: 'horizontal',
			loop: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	};

	if($(".box_bnr").length){
		var pop_bnr = new Swiper ('.box_bnr.swiper-container', {
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
		
		$(document).on("click", ".box_bnr .auto_btn a", function(){
			if($(this).hasClass("stop")){
				pop_bnr.autoplay.stop();
				$(this).removeClass("stop").addClass("start").text("시작");
			}else{
				pop_bnr.autoplay.start();
				$(this).removeClass("start").addClass("stop").text("정지");
			}
		})
	};

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
				1350: {
					slidesPerView: 3,
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


	if($(".search_ico_bnr").length){
		var search_bnr_mo = new Swiper ('.search_ico_bnr.mo_type.swiper-container', {
			direction: 'horizontal',
			slidesPerView: 3,
			loop: true,
			spaceBetween: 0,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});

		var search_bnr_r = new Swiper ('.search_ico_bnr.bnr_right.swiper-container', {
			direction: 'horizontal',
			slidesPerView: 2,
			spaceBetween: 10,
			breakpoints:{
				1350: {
					slidesPerView: 1,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					}
				}
			}
		});

		var search_bnr_l = new Swiper ('.search_ico_bnr.bnr_left.swiper-container', {
			direction: 'horizontal',
			slidesPerView: 3,
			spaceBetween: 10,
			breakpoints:{
				1350: {
					slidesPerView: 1,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					}
				}
			}
		});
	};

	if($(".fast_list").length){
		var fast_bnr = new Swiper ('.fast_list.swiper-container', {
			slidesPerView: 5,
			breakpoints:{
				640: {
					direction: 'horizontal',
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					loop: true,
					slidesPerView: 1,
				}
			}
		});
	};

	$(window).resize(function(){
		if($(".pop_bnr_list").length){
			if($(window).width() >= 640){
				var el_h = $(".pop_bnr_list li a img").height();
				$(".cont_line_middle").height(el_h);
			}else{
				$(".cont_line_middle").height("auto")
			}
		}
	});
	$(window).resize();

});
//Layer Content
function layerContShow(thisClass){
    $('.'+thisClass).show();
}
function layerContHide(thisClass){
    $('.'+thisClass).hide();
}
