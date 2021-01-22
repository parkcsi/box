jQuery(function($) {
	/* product-list */
	$("div.product-list01 > ul > li,div.product-list02 > ul > li,div.best-seller > ul > li")
		.mousemove(function(){
			$(this).find("p.zoom-cart-zzim").show();
		})
		.mouseout(function(){
			$(this).find("p.zoom-cart-zzim").hide();
		});
	/* list line */
	$("div.list-sort div.list-line")
		.mousemove(function() {
			$(this).find("ul").show();
		})
		.mouseout(function() {
			$(this).find("ul").hide();
		});	
	/* list size */
	$("div.list-sort div.list-size")
		.mousemove(function() {
			$(this).find("ul").show();
		})
		.mouseout(function() {
			$(this).find("ul").hide();
		});	
	
	/* category tab */
	var tabContainer = $("div.category-best-ranking");
	tabContainer.find("> ul li a")
		.click(function() {
			$(this).parent().parent().find("a")
				.each(function (i) {
					$($(this).attr("href")).hide();
					$(this).find("img").attr("src",$(this).find("img").attr("src").replace("_on.gif", "_off.gif"));
				});
			$($(this).attr("href")).fadeIn();
			$(this).find("img").attr("src",$(this).find("img").attr("src").replace("_off.gif", "_on.gif"));
			
			return false;
		});
	tabContainer.find("> ul li:eq(0) a").click();
});
