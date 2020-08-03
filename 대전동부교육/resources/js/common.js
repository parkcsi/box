$(function(){

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
            if ($(this).text() === '정지') {
                key_bnr.slick('slickPause');
                $(this).text('시작');
            } else {
                key_bnr.slick('slickPlay');
                $(this).text('정지');
            };
        });
    }
    /* //검색어 키워드 슬라이드 */

	$(window).resize(function(){

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
