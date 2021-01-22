jQuery(function($) {
	/* 상품 상세 이미지 보기 */
	$("div.product-image ul li a")
		.mouseover(function() {
			$("div.product-image p.photo img").attr("src",$(this).find("img").attr("src"));
			$(this).parent().parent().find("li").attr("class","");
			$(this).parent().attr("class","selected");
		});

});
