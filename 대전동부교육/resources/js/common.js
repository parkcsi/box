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

    /* 메인 슬라이드 */
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
    /* //메인 슬라이드 */

    /* 배너존 슬라이드 */
    if($('.banner_zone').length){
        var zone_bnr = $(".banner_zone_list");
        zone_bnr.on('init afterChange', function(event, slick, currentSlide, nextSlide){
        	if(event.type === 'init'){
	        	$('.banner_zone_control .num').text(' / '+slick.slideCount);
	        	$('.banner_zone_control .num').prepend('<strong>1</strong>')
        	} else if(event.type === 'afterChange'){
        		$('.banner_zone_control .num strong').text(currentSlide + 1);
        	}
        });
        zone_bnr.slick({
            infinite: true,
            accessibility: true,
            slidesToScroll: 1,
            variableWidth: true,
            autoplay: true,
            draggable: false,
            prevArrow: $('.banner_zone_wrap .banner_zone_control .prev'),
    		nextArrow: $('.banner_zone_wrap .banner_zone_control .next')
        });
        $('.banner_zone_control .stop').click(function(){
            bnr_stop(zone_bnr, $(this));
        });
    }
    /* //배너존 슬라이드 */

    /* 검색어 키워드 슬라이드 */
    if($('.keyword_wrap').length){
        var key_bnr = $(".keyword_list");
        key_bnr.slick({
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
            bnr_stop(key_bnr, $(this));
        });
    }
    /* //검색어 키워드 슬라이드 */


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
