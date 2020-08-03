$(function(){

    $(".keyword_list").slick({
        infinite: true,
        accessibility: true,
        slidesToScroll: 1,
        variableWidth: true,
        autoplay: true,
        draggable: false,
        prevArrow: $('.keyword_wrap .keyword_list_control .prev'),
		nextArrow: $('.keyword_wrap .keyword_list_control .next')
    });

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
