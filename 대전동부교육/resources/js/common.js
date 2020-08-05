$(function(){
	/*gnb 2뎁스 높이*/
    $(".gnb_wrap .gnb_depth1 > li").mouseenter(function(){
        var depth2_li = $(this).find(".gnb_depth2 > ul > li");
        var li_h1 = [];
        var li_h2 = [];
        for(var i = 0; i < depth2_li.length; i++){
            if(i <= 4){
                li_h1.push(depth2_li.eq(i).height());
            } else {
                li_h2.push(depth2_li.eq(i).height());
            }
        };
        for(var j = 0; j < li_h1.length; j++){
            depth2_li.eq(j).height(Math.max.apply(null, li_h1));
        };
        for(var k = 5; k < li_h1.length; k++){
            depth2_li.eq(k).height(Math.max.apply(null, li_h2));
        };
    });
	/*//gnb 2뎁스 높이*/

    /*검색어 키워드 슬라이드*/
    if($('.keyword_wrap').length){
        var keyword_bnr = $(".keyword_list");
        keyword_bnr.slick({
            infinite: true,
            accessibility: true,
            slidesToScroll: 1,
            variableWidth: true,
            autoplay: true,
            draggable: false,
            prevArrow: $('.keyword_wrap .keyword_list_control .prev'),
            nextArrow: $('.keyword_wrap .keyword_list_control .next')
        });
        $('.keyword_list_control .stop').click(function(){
            bnr_stop(keyword_bnr, $(this));
        });
    }
    /*//검색어 키워드 슬라이드*/

    /*메인 슬라이드*/
    if($('.main_banner').length){
        var main_bnr = $(".main_banner_list");
        main_bnr.on('init reInit', function(){
            var main_controler = '<div class="main_banner_btn">' +
	            '<button type="button" class="prev">이전</button>' +
	            '<button type="button" class="stop">정지</button>' +
	            '<button type="button" class="next">다음</button>' +
	        '</div>';
        	$('.main_banner_list .slick-dots').wrap('<div class="main_banner_control"><div class="main_banner_dot"></div></div>');
        	$('.main_banner_dot').append(main_controler);
        });
        main_bnr.slick({
            infinite: true,
            accessibility: true,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed:5000,
            draggable: false,
            arrows: false,
    		dots:true
    	});
        $('.main_banner_btn .stop').click(function(){
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
    if($('.banner_zone').length){
        var banner_zone_bnr = $(".banner_zone_list");
        banner_zone_bnr.on('init afterChange', function(event, slick, currentSlide, nextSlide){
        	if(event.type === 'init'){
	        	$('.banner_zone_control .num').text(' / '+slick.slideCount);
	        	$('.banner_zone_control .num').prepend('<strong>1</strong>')
        	} else if(event.type === 'afterChange'){
        		$('.banner_zone_control .num strong').text(currentSlide + 1);
        	}
        });
        banner_zone_bnr.slick({
            infinite: true,
            accessibility: true,
            slidesToScroll: 1,
            autoplay: true,
            draggable: false,
            prevArrow: $('.banner_zone_wrap .banner_zone_control .prev'),
    		nextArrow: $('.banner_zone_wrap .banner_zone_control .next')
        });
        $('.banner_zone_control .stop').click(function(){
            bnr_stop(banner_zone_bnr, $(this));
        });
    }
    /*//배너존 슬라이드*/

    /*링크그룹 슬라이드*/
    if($('.link_group').length){
        var link_group_bnr = $(".link_group_list");
        link_group_bnr.slick({
            infinite: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            draggable: false
        });
    }
    /*//링크그룹 슬라이드*/

    /*맞춤서비스 슬라이드*/
    if($('.custom_service').length){
        var custom_bnr = $(".custom_service_list");
        custom_bnr.slick({
            rows: 2,
            slidesPerRow :3,
            draggable: false
        });
    }
    $(document).on('click', '.custom_service_tab h4 a',function(){
        $(this).closest('li').addClass('on').siblings('li').removeClass('on');
        custom_bnr.slick('unslick');
        custom_bnr.slick({
            rows: 2,
            slidesPerRow :3,
            draggable: false
        });
    });
    /*//맞춤서비스 슬라이드*/

    /*배너모음 슬라이드*/
    if($('.link_list_wrap').length){
        var link_list_bnr = $(".link_list");
        link_list_bnr.slick({
            infinite: true,
            accessibility: true,
            slidesToScroll: 1,
            variableWidth: true,
            autoplay: true,
            draggable: false,
            prevArrow: $('.link_list_inner .control_box .prev'),
            nextArrow: $('.link_list_inner .control_box .next')
        });
        $('.control_box .stop').click(function(){
            bnr_stop(link_list_bnr, $(this));
        });
    }
    /*//배너모음 슬라이드*/

    /*공지사항 탭*/
    $('.notice_list > li > h3 > a').on('click', function(){
        $(this).closest('li').addClass('on').siblings('li').removeClass('on');
    });
    /*//공지사항 탭*/

	/*온라인설문지 선택*/
	$(document).on("click", ".custom_sel > a", function(){
		if($(this).parent().hasClass("on")){
			$(this).parent().removeClass("on");
		}else{
			$(this).parent().addClass("on");
		};
	});
	$(document).on("click", ".custom_sel_list li a", function(){
		$(".custom_sel > a").text($(this).text());
		$(".custom_sel").removeClass("on");
	});
	/*//온라인설문지 선택*/

	/*셀렉트 형식 팝업 다른 영역 클릭 시 닫기*/
	$(document).mouseup(function(e){
		var el01 = $(".custom_sel_list").parent();
		var el02 = $(".search_select .select_txt").parent();

		if(el01.has(e.target).length === 0){
			el01.removeClass("on");
		}
		if(el02.has(e.target).length === 0){
			el02.removeClass("on");
		}
	});
	/*//셀렉트 형식 팝업 다른 영역 클릭 시 닫기*/


	$(window).resize(function(){

	});
	$(window).resize();

});
// 배너 정지버튼
function bnr_stop(bnr, btn){
	if (btn.text() === '정지') {
        bnr.slick('slickPause');
        btn.text('시작');
    } else {
        bnr.slick('slickPlay');
        btn.text('정지');
    };
};

var zoomSize = 1;
var zoomRate = 0.2;

// 화면크기 +
function zoomIn() {
    zoomSize += zoomRate;
    
    if ( zoomSize > 2) {
		alert('더 이상 확대할 수 없습니다.');
	} else {
		zoom();
	}
}
// 화면크기 -
function zoomOut() {
    zoomSize -= zoomRate;
    
    if ( zoomSize < 0.5) {
		alert('더 이상 축소할 수 없습니다.');
	} else {
		zoom();
	}
}
// 화면크기 원래대로
function zoomReset() {
    zoomSize = 1;
	zoom();
}
// 화면크기 조절 이벤트
function zoom() {
    document.body.style.transform = 'scale('+zoomSize+')';
    document.body.style.transformOrigin='50% 0 0';
}

//Layer Content
function layerContShow(thisClass){
    $('.'+thisClass).show();
}
function layerContHide(thisClass){
    $('.'+thisClass).hide();
}
