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
			if($slides.hasClass('slick-active')){
				$slides.next().addClass('next-slide');
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
		
		slick.$slides.removeClass('next-slide'); // 다음 슬라이드 클래스명 삭제
		$('.slick-cloned.next-slide').removeClass('next-slide'); // 복제 슬라이드 클래스명 삭제
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

	$(window).resize(function(){
		mainSlide();
		header();
	}).resize();

});

//Layer Content
function layerContShow(thisClass){
    $("."+thisClass).show();
}
function layerContHide(thisClass){
    $("."+thisClass).hide();
}
