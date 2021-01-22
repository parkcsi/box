jQuery(function($) {
	/* navigation */
	var naviList = $("div.gift-navi > ul.main > li");
	naviList
		.mousemove(function() {
			$(this).find("> div.sub").show();
		})
		.mouseout(function() {
			$(this).find("> div.sub").hide();

		});
	
	
	/* side-menu */
	var sideMenu = $("#sidebar > div > ul > li");
	sideMenu
		.mousemove(function() {
			$("#sidebar > div > ul > li").css("z-index","2");
			$(this).css("z-index","3");
			if($(this).find("a > img").attr() != null)
				$(this).find("a > img").attr("src",$(this).find("a > img").attr("src").replace("_off.gif", "_on.gif"));
			if($("#sidebar > div").attr("class") == "product-menu") {
				$(this).find("> ul").show();
			}
		})
		.mouseout(function() {
			$(this).css("z-index","1");
			if($(this).find("a > img").attr() != null)
				$(this).find("a > img").attr("src",$(this).find("a > img").attr("src").replace("_on.gif", "_off.gif"));
			if($("#sidebar > div").attr("class") == "product-menu")
				$(this).find("> ul").hide();
		});

	/* 관련브랜드 보기 */
	$("div.relation-brand-view > span > a")
		.click(function(){
			$("#relation-brand-content").slideToggle(500);
			return false;
		});
	/* 전체 보기 */
	$("div.hottracks-gift > p.category-open > a")
		.click(function() {
			if($("div.hottracks-gift > div.view-all").css("display") == "none"){
				$("div.hottracks-gift > div.view-all").slideDown();
				$(this).find('img').attr('src' , $(this).find('img').attr('src').replace('_open.gif' , '_close.gif'));
			}else{
				$("div.hottracks-gift > div.view-all").slideUp();
				$(this).find('img').attr('src' , $(this).find('img').attr('src').replace('_close.gif' , '_open.gif'));
			}
			return false;
		});
	$("div.hottracks-gift > div.view-all > p.close > a")
		.click(function() {
			$("div.hottracks-gift > div.view-all").slideUp();
			return false;
		});
	/* page location */
	$("div.page-location ul li.sub")
		.mouseover(function() {
			$(this).find("ul").show();
		})
		.mouseout(function() {
			$(this).find("ul").hide();
		});
	/* 기프트 검색 레이어 클릭쉽게 */
	$("div.gift-search")
		.mousemove(function() {
			$(this).css("z-index","4");
		})
		.mouseout(function() {
			$(this).css("z-index","2");
		});

	/* 카테고리 4depth 레이어 */
	$("div.category-menu > ul > li")
		.mousemove(function() {
			$(this).css("z-index","2");
			$(this).find("> ul").show();
		})
		.mouseout(function() {
			$(this).css("z-index","1");
			$(this).find("> ul").hide();
		});
});