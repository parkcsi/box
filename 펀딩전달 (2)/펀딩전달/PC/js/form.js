/*****************************************************************************************
	FORM 관련 스크립트 모음
		- jquery 플러그인 형식으로 구성함
*****************************************************************************************/


$.formLib = {
	defaults : {
		debug : false
	}, 		
		
	// 폼의 데이터를 오브젝트 형식으로 구성해서 반환함.
	formData : function(options){
		options = $.extend(true, {}, $.formLib.defaults, options);
		
		var target = this;
		var data = {};
		
		target.find("input").each(function(idx){
			switch($(this).attr("type")){
				case "text" :
				case "hidden" :
				case "password" :
					data[$(this).attr("name")] = $(this).val();
					break;
				case "radio" :
					data[$(this).attr("name")] = ($("input[name=" + this.name + "]:checked").size() > 0) ? $("input[name=" + this.name + "]:checked").val() : "";
					break;
				case "checkbox" :
					var arr = [];
					$(this).each(function(idxTmp){
						if($(this).attr("checked")){ arr.push($(this).val()); }
					});
					data[$(this).attr("name")] = arr.join(",");
					break;
			}
		});

		
		target.find("select").each(function(idx){
			var arr = [];
			$(this).find("option").each(function(idxTmp){
				if($(this).attr("selected")){ arr.push($(this).val()); }
			});
			data[$(this).attr("name")] = arr.join(",");
		});		

		
		target.find("textarea").each(function(idx){
			data[$(this).attr("name")] = $(this).val();
		});		
		
		
		
		if(options.debug){
			var s = "";
			for(var k in data){ s += k + " => " + data[k] + "\n\n"; }
			$("<textarea style='width:100%; height:200px;'>" + s + "</textarea>").appendTo($("body"));
		}
		
		
		
		return data;
	} 
	


};



(function($) {
	$.fn.formData = $.formLib.formData;
})(jQuery);