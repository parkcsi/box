jQuery(function($) {
	
	/* board toggle */
	$("table.list tbody tr td a").
		click(function() {
			$($(this).attr("href")).find("td").toggle();
			return false;
		});
});
