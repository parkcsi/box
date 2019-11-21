$(function(){

	function header(){
		// header 호버
		$("#header").bind("mouseover", function(){
			$(this).addClass("header_on");
		}).bind("mouseleave", function(){
			$(this).removeClass("header_on");
			$(".gnb_row_depth").hide();
		});

		// gnb 1뎁스 호버
		var gnb_menu = $(".gnb_menu > li");
		var gnb_menuA = $(".gnb_menu > li > a");

		gnb_menu.bind("mouseenter", function(){
			$(this).find("> a").addClass("d1_h")
			$(this).siblings().find("> a").removeClass("d1_h");

			$(this).find(".gnb_row_depth").stop().show();
			$(this).siblings().find(".gnb_row_depth").stop().hide();
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



	};
	header();

	

});

//Layer Content
function layerContShow(thisClass){
    $('.'+thisClass).show();
}
function layerContHide(thisClass){
    $('.'+thisClass).hide();
}
