$(function(){

	function header(){
		// header 호버
		if($(window).width() >= 1300){
			$("#header").bind("mouseover", function(){
				$(this).addClass("header_on");
			}).bind("mouseleave", function(){
				$(this).removeClass("header_on");
				$(".gnb_row_depth").hide();
			});
		}else{
			$("#header").unbind("mouseover");
			$("#header").unbind("mouseleave");
		};

		// 태블릿 버전 gnb 호버
		if($(window).width() >= 768 && $(window).width() <= 1299){
			$(".gnb_menu").bind("mouseover", function(){
				$(this).parents("#header").addClass("header_on");
			}).bind("mouseleave", function(){
				$(this).parents("#header").removeClass("header_on");
				$(".gnb_row_depth").hide();
			});
		}else{
			$(".gnb_menu").unbind("mouseover");
			$(".gnb_menu").unbind("mouseleave");
		};

		// gnb 1뎁스 호버
		var gnb_menu = $(".gnb_menu > li");
		var gnb_menuA = $(".gnb_menu > li > a");

		gnb_menu.bind("mouseenter", function(){
			$(this).find("> a").addClass("d1_h")
			$(this).siblings().find("> a").removeClass("d1_h");
			$(this).find(".gnb_row_depth").stop().show();
			$(this).siblings().find(".gnb_row_depth").stop().hide();
		}).bind("mouseleave", function(){
			$(this).find("> a").removeClass("d1_h");
		});

		// gnb 2,3뎁스 호버
		var d2 = $(".rd_cnt").find(">ul");
		var d3_h = $(".rd_cnt").find(".depth03 > a");

		d2.bind("mouseenter", function(){
			$(this).find(".depth02 > a").addClass("d2_h");
			$(this).siblings().find(".depth02 > a").removeClass("d2_h");
		}).bind("mouseleave", function(){
			$(this).find(".depth02 > a").removeClass("d2_h");
		});

		d3_h.bind("mouseenter", function(){
			$(this).addClass("d3_h").siblings().removeClass("d3_h");
		}).bind("mouseleave", function(){
			$(this).removeClass("d3_h");
		});

		// 전체메뉴 열기
		var am_btn = $(".allmenu > a");
		var am_cnt = $("#allMenu");
		var am_close = $(".am_close");

		am_btn.click(function(){
			am_cnt.fadeIn(300, function(){
				am_cnt.css("overflow-y","scroll");
			});
		});
		am_close.click(function(){
			am_cnt.fadeOut(300, function(){
				am_cnt.css("overflow-y","auto");
			});
		});
	};

	// 메인 슬라이더 기능
	$(".main_slide").on("afterChange init", function(event, slick, currentSlide, nextSlide){
		var slide = $(this).find(".slick-active"),
			slideLi = slide.find(".slide"),
			caption =  $(".slide_txt"),
			captionTitle = caption.find(".txt"),
			captionTitle_H1 = captionTitle.find("p"),
			captionMore = caption.find(".more_btn"),
			slideCaptionMore_A = captionMore.children("a"),
			slideTitle =  slideLi.data("title"),
			slideLink =  slideLi.find(">a").attr("href"),
			ImgColor = slideLi.data("backcolor"),
			ImgColorCode = "#" + ImgColor,
			backColor = $(".main_banner_bg");

		backColor.stop(true).css({"background": ImgColorCode, "opacity": 0}).animate({"opacity": 1}, 300);

		captionTitle.stop().css({"top": "-50%","display":"block", "opacity": 1}).animate({"top": "0","display":"block", "opacity": 1});
		captionMore.stop().delay(200).css({"left": "-50%","display":"block", "opacity": 1}).animate({"left": "0","display":"block", "opacity": 1});

		slideCaptionMore_A.attr("href", slideLink);

		for(var i = 0; i < slick.$slides.length; i++){
			var $slides = $(slick.$slides[i]);
			if($slides.hasClass("slick-active")){
				$slides.next().addClass("next-slide");
				break;
			}
		};

	}).on("beforeChange", function(event, slick, currentSlide, nextSlide){
		var slide = $(this).find(".slick-active"),
			slideLi = slide.find(".slide"),
			caption =  $(".slide_txt"),	
			captionTitle = caption.find(".txt"),
			captionMore = caption.find(".more_btn");

		captionTitle.css({"top": "0","display":"block", "opacity": 1}).animate({"top": "20%","display":"none", "opacity": 0}, 300);
		captionMore.css({"left": "0","display":"block", "opacity": 1}).animate({"left": "20%","display":"none", "opacity": 0}, 300);
		
		slick.$slides.removeClass("next-slide"); // 다음 슬라이드 클래스명 삭제
		$(".slick-cloned.next-slide").removeClass("next-slide"); // 복제 슬라이드 클래스명 삭제
	});

	// 모바일메인 슬라이더 기능
	$(".m_main_slide").on("afterChange init", function(event, slick, currentSlide, nextSlide){
		var slide = $(this).find(".slick-active"),
			slideLi = slide.find(".slide"),
			slideLink =  slideLi.find(">a").attr("href"),
			slideCaptionMore_A = $(".main_bnr_more > a");

		slideCaptionMore_A.attr("href", slideLink);
	});

	// 메인슬라이더 실행
	$(".main_slide").slick({
		infinite : true,
		arrow : true,
		speed : 500,
		autoplay : true,
		autoplaySpeed : 5000,
		centerMode: true,
		slidesToshow:1,
		variableWidth:true,
		dots:true,
		draggable:false,
		focusOnselect: false,
		pauseOnHover:false,
	});
	
	// 메인슬라이더 컨트롤러
	var slickDots = $(".main_banner .slick-dots");
	$(".slide_pause").after(slickDots);

	// - 정지 : 슬라이드 정지 버튼 클릭 시 이벤트
	$(document).on("click", ".main_banner > .main_banner_control > .slide_pause", function(){
		$(this).hide();
		$(".main_slide").slick("slickPause");
		$(".slide_start").css("display","inline-block");
	});
	// - 재생 : 슬라이드 재생 버튼 클릭 시 이벤트
	$(document).on("click", ".main_banner > .main_banner_control > .slide_start", function(){
		$(this).hide();
		$(".main_slide").slick("slickPlay");
		$(".slide_pause").css("display","inline-block");
	});

	// 모바일 메인슬라이더 실행
	$(".m_main_slide").slick({
		infinite : true,
		arrow : false,
		speed : 500,
		autoplay : true,
		autoplaySpeed : 5000,
		centerMode: false,
		slidesToshow:1,
		variableWidth:false,
		touchMove:true,
		dots:true,
		draggable:false,
		focusOnselect: false,
		pauseOnHover:false,
	});

	// 모바일 메인슬라이더 컨트롤러
	var m_slickDots = $(".m_main_banner .slick-dots");
	$(".m_pause").after(m_slickDots);

	// - 정지 : 슬라이드 정지 버튼 클릭 시 이벤트
	$(document).on("click", ".m_main_banner > .m_main_control > .m_pause", function(){
		$(this).hide();
		$(".m_main_slide").slick("slickPause");
		$(".m_start").css("display","inline-block");
	});
	// - 재생 : 슬라이드 재생 버튼 클릭 시 이벤트
	$(document).on("click", ".m_main_banner > .m_main_control > .m_start", function(){
		$(this).hide();
		$(".m_main_slide").slick("slickPlay");
		$(".m_pause").css("display","inline-block");
	});

	// 메인슬라이더 이미지 관련
	function mainSlide(){ 

		var	slide_width = $(window).width() / 1.38;
		var slide_margin = $(window).width() / 9.6;
		
		var backImg = $(".slide_img");
		var backImg_width = slide_width / 1.625;
		var backImg_height = backImg_width / 1.9;

		backImg.each(function(index) {			
			var imgs =  $(this).find("img:first").attr("src"),
				imgLink = "url(" + imgs +")" ;
			
			if (imgs !== undefined && ("" + imgs).length) {
				$(this).css({"background": imgLink ,"background-repeat":"no-repeat","background-size":"cover","background-position":"center"});
			}			
		});	
		
		$(".main_slide .slide").css({"width":slide_width, "height": "100&"});
		$(".main_slide .slick-slide").css({"width": slide_width, "height": "100&" , "margin-right":slide_margin});
		backImg.css({ "width":backImg_width, "height":backImg_height });

	};

	// 공지사항 탭
	$(".main_noti_tab > li > a").click(function(){
		$(this).parent().addClass("on").siblings().removeClass("on")
		$(".main_noti_cont > .main_noti_list").eq($(this).parent().index()).addClass("on").siblings().removeClass("on")
	});

	// 주요사업안내 지역 셀렉트
	$(".work_list_wrap > .local_list > a").click(function(){
		$(this).parent().find(">ul").addClass("on");
	});
	$(".work_list_wrap > .local_list > ul > li > a").click(function(){
		$(this).parents("ul").css("top", - ($(this).parent().index() * $(this).height() + 1)).removeClass("on");
		$(".work_list_wrap > .local_list > a").text($(this).text());
	});

	// 셀렉트 형식 팝업 다른 영역 클릭 시 닫기
	$(document).mouseup(function(e){
		var el01 = $(".local_list > ul");
		var el02 = $(".link_sel > ul");

		if(el01.has(e.target).length === 0){
			el01.removeClass("on");
		}
		if(el02.has(e.target).length === 0){
			el02.parent().removeClass("on");
		}
	});

	// 지역별 강좌 선택
	$(document).on("click", ".map_btn_wrap .local_list li a", function(){
		$(this).parent().addClass("on").siblings().removeClass("on");
		$(".map_btn_wrap > img").attr("src", "../resources/images/content/" + $(this).attr("title") + ".png");
		$(".map_btn_wrap > img").attr("alt", $(this).text());
	});

	if($(".noti_bnr_wrap").length){
		var bzone_visual = new Swiper (".noti_bnr_wrap.swiper-container", {
			direction: "horizontal",
			loop: true,
			pagination: {
				el: ".swiper-pagination",
				type: "fraction",
			},
			navigation: {
				nextEl: ".swiper_button_next",
				prevEl: ".swiper_button_prev",
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
		});

		$(document).on("click", ".noti_bnr_wrap .auto_btn a", function(){
			if($(this).hasClass("stop")){
				bzone_visual.autoplay.stop();
				$(this).removeClass("stop").addClass("start").text("시작");
			}else{
				bzone_visual.autoplay.start();
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
			spaceBetween: 10,
			navigation: {
				nextEl: '.link_list_inner .swiper-button-next',
				prevEl: '.link_list_inner .swiper-button-prev',
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			breakpoints:{
				359: {
					slidesPerView: 1,
				},
				640: {
					slidesPerView: 2,
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

	// 푸터 관련사이트 선택
	$(document).on("click", ".link_sel > a", function(){
		if($(this).parent().hasClass("on")){
			$(this).parent().removeClass("on");
		}else{
			$(this).parent().addClass("on");
		};
	});

	// 걷색영역 열기
	$(".hr_ico_list > .search > a").click(function(){
		$(".search_wrap").addClass("on");
	});

	// 걷색영역 닫기
	$(".search_wrap > .close").click(function(){
		$(".search_wrap").removeClass("on");
	});


	// 모바일 햄버거메뉴 1뎁스
	$(document).on("click", ".am_d1 a", function(){
		$(this).parent().addClass("on").siblings().removeClass("on");
		$(".all_menu_inner > .d1_m").eq($(this).parent().index()).addClass("on").siblings().removeClass("on");
	});
	// 모바일 햄버거메뉴 2뎁스
	$(document).on("click", ".d2_m .down a", function(){
		if($(this).parent().hasClass("on")){
			$(this).parent().removeClass("on").find(".d3_m").slideUp();
		}else{
			$(this).parent().addClass("on").find(".d3_m").slideDown().parent().siblings().removeClass("on").find(".d3_m").slideUp();
		};
	});

	$(window).resize(function(){
		mainSlide();
		header();

		if($(window).width() <= 768){
			// 아이콘리스트 슬라이더
			if($(".ico_menu_wrap").length){
				var top_list = new Swiper ('.ico_menu_wrap.swiper-container', {
					direction: 'vertical',
					loop: false,
					slidesPerView: 1,
					slidesPerColumn: 3,
					pagination: {
						el: ".swiper-pagination",
						type: "fraction",
					},
					navigation: {
						prevEl: '.top_list_up',
						nextEl: '.top_list_down',
					},
				});
			};
		};

		// 191203 : top버튼 스크립트 추가
		if($(window).width() >= 768){
			// top버튼
			$(".floating_btn").hide();
		};

		$(".photo_new_wrap span.img").width($(".photo_new_wrap li").width() - 2);

	}).resize();

	// 191203 : top버튼 스크립트 추가
	// top버튼
	$(window).scroll(function(){
		if($(window).width() <= 768){
			if($(window).scrollTop() > 80){
				$(".floating_btn").fadeIn(200);
			}else{
				$(".floating_btn").fadeOut(200);
			}
		}
	});
	$(window).scroll();

	$(document).on("click", ".floating_btn .top_btn",function(){
		$('html, body').animate({
            scrollTop : 0
        }, 400);
	})

});

function mapSel(e){
	$(".map_btn_wrap > img").attr("src", "../resources/images/content/" + e.attr("title") + ".png");
	$(".map_btn_wrap > img").attr("alt", e.attr("alt"));
	$(".local_list > li").eq(e.index()).addClass("on").siblings().removeClass("on");
};

//Layer Content
function layerContShow(thisClass){
    $("."+thisClass).show();
}
function layerContHide(thisClass){
    $("."+thisClass).hide();
}
