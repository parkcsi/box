/******************************************************************************
	작성자 : 김기석
	작성일 : 2011.05.03
	기능 : 유효성 체크 기능 라이브러리 제공
	참고사항 :
		경고메세지는 자동구성으로 처리하지만 사용자 attribute를 해당 클래스명과 동일하게 설정할 수도 있음.
			=> <input type="text" class="required" name="ordNm" title="주문자명" required="주문자 이름은 필수입니다." />
******************************************************************************/
$.validateFormLib = {
	// 폼 유효성 체크 기본값들...
	validateFormDefaults : {
		msgType : "alert",				// 메세지 형식 [dialog|alert] 
		messages : {}, 					// 사용자 정의 메세지들...name을 기반으로 한다.
		chkMsg : {
			"required" : "[{0}] 항목은 필수 항목입니다.",			// title attribute로 대체함.
			"onlynum" : "[{0}] 항목은 숫자만 입력이 가능합니다."		// title attribute로 대체함.
		}
	}, 

	
	// 해당 폼의 유효성을 체크함. - 1개 폼에 대해서 처리함.
	validateForm : function(options){
		var defaults = {
			form : $(this).get(0)
		};
		options = $.extend(true, defaults, $.validateFormLib.validateFormDefaults, options);
		if(options.form == null){ $.validateFormLib.alert("유효성 체크를 할 입력폼이 유효하지 않습니다."); return false; }
		var f = $(options.form);
		
		// 유효성 체크 처리
		var isValidate = true;
		options.chkResult = {};
		f.data("validate_options", options);
		f.find("input,select,textarea").each(function(idx){
			if(!$.validateFormLib.validateElement(f, this)){ isValidate = false; }
		});
		

		// 유효성 체크 결과 노출
		if(!isValidate){ $.validateFormLib.showMsg(f); }
		
		return isValidate;
	}, 


	// 해당 폼 구성 요소의 유효성 검사
	validateElement : function(target, e){
		var options = target.data("validate_options");
		var chkResult = options.chkResult;
		var rv = true;
		var isValidateElement = false;

		// 유효성 체크
		if($(e).hasClass("required")){
			if(!chkResult[e.name]){ chkResult[e.name] = {}; }
			chkResult[e.name]["required"] = "";
			isValidateElement = true;

			if(!$.validateFormLib.checkRequired(e)){
				chkResult[e.name]["required"] = $.validateFormLib.getMsg(options, "required", e);
				options.chkResult = chkResult;
				target.data("validate_options", options);
				rv = false;
			}
		}
		
		if($(e).hasClass("onlynum")){
			if(!chkResult[e.name]){ chkResult[e.name] = {}; }
			chkResult[e.name]["onlynum"] = "";
			isValidateElement = true;

			if(!$.validateFormLib.checkOnlyNum(e)){
				chkResult[e.name]["onlynum"] = $.validateFormLib.getMsg(options, "onlynum", e);
				options.chkResult = chkResult;
				target.data("validate_options", options);
				rv = false;
			}
		}		
		
		
		
		
		// 이벤트 핸들 추가
		if(options.msgType == "dialog"){
			if(isValidateElement && $(e).data("validateElementEvent") == null){
				$(e).data("validate_target", target);
				$(e).data("validate_options", options);
	
				switch(e.tagName.toLowerCase()){
					case "input" :
						$(e).blur(function(event){
							$.validateFormLib.validateElement($(this).data("validate_target"), this);
							$.validateFormLib.showMsg($(this).data("validate_target"));
						});
						break;
				}
	
				$(e).data("validateElementEvent", true);
			}
		}

		return rv;
	}, 
	
	
	// 필수 입력값 체크
	checkRequired : function(obj){
		var val = "";

		switch(obj.tagName.toLowerCase()){
			case "input" : 
				switch(obj.type.toLowerCase()){
					case "text" : val = obj.value; break;
					case "radio" :
						val = $("input[name=" + obj.name + "]:checked").val();
						break;
				}
				break;
			case "select" :
				val = obj.value;
				break;
			default : return true;
		}
		return !($.trim(val) == "");
	}, 
	
	
	// 숫자 입력 값 체크
	checkOnlyNum : function(obj){
		var val = "";

		switch(obj.tagName.toLowerCase()){
			case "input" : 
				switch(obj.type.toLowerCase()){
					case "text" : val = $.trim(obj.value); break; 
				}
				break;
			default : return true;
		}
		
		if(val == ""){ return true; }
		else{
			return !isNaN(val);
		}
	}, 
	
	
	
	// 메세지 노출
	showMsg : function(target){
		var options = target.data("validate_options");
		switch(options.msgType){
			case "dialog" : $.validateFormLib.showMsgDialog(target); break;
			case "alert" : $.validateFormLib.showMsgAlert(target); break;
		}
	}, 
	
	
	// 메세지 노출 - alert
	showMsgAlert : function(target){
		var options = target.data("validate_options");
		var chkResult = options.chkResult;

		for(var name in chkResult){
			for(var key in chkResult[name]){
				if(chkResult[name][key] != ""){
					alert(chkResult[name][key]);
					try{
						$("input[name=" + name + "]").get(0).focus();
					}catch(e){}
					return;
				}
			}
		}
	}, 
	
	
	// 메세지 노출 - 다이얼로그
	showMsgDialog : function(target){
		var options = target.data("validate_options");
		var chkResult = options.chkResult;

		var html = [];
		for(var name in chkResult){
			for(var key in chkResult[name]){
				if(chkResult[name][key] != ""){
					html.push("<div class='validate_result_item' style='cursor:pointer;' id='result_" + name + "_" + key + "'>" + chkResult[name][key] + "</div>");
				}
			}
		}

		// 보여줄 메세지가 존재하는 경우
		if(html.length > 0){
			// 내용구성
			if($(".validateFormLibResult").size() == 0){
				$("<div class='validateFormLibResult'><div class='validateFormLibResultMsg' style='text-align:left;'></div></div>").appendTo("body");
				$(".validateFormLibResult").dialog({
					autoOpen : false, 
					title : "필수입력값 체크", 
					position : ["right", "top"]
				});				
			}
			$(".validateFormLibResultMsg").html(html.join(""));			
			

			
			// 클릭 이벤트 핸들 처리
			$(".validateFormLibResultMsg").find(".validate_result_item").click(function(event){
				var info = this.id.split("_");
				target.find("input[name=" + info[1] + "]").focus();
			});

			// 다이얼로그 보이기
			if($(".validateFormLibResult").dialog("isOpen") != true){
				$(".validateFormLibResult").dialog("open");
			}
		}else{
			$(".validateFormLibResult").dialog('close');
		}
	}, 

	
	// 메세지 반환
	getMsg : function(options, key, obj){
		var messages = options.messages;
		var msg = options.chkMsg[key];
		var title = $(obj).attr("title") == "" ? obj.name : $(obj).attr("title");

		switch(key){
			case "required" :
			case "onlynum" : 
				if(messages[obj.name]){
					msg = messages[obj.name];
				}else{
					msg = typeof($(obj).attr(key)) == "string" ? $(obj).attr(key) : msg.replace(/\{0\}/gi, title);
				}
				break;
		}

		return msg;
	}, 
	
	
	// alert 메세지 처리
	alert : function(msg, title){
		if($(".validateFormLibAlert").size() == 0){
			$("<div class='validateFormLibAlert'><div style='text-align:center;'>" + msg + "</div></div>").appendTo("body");
		}

		$(".validateFormLibAlert").dialog({
			modal : true, 
			title : typeof(title) == "string" ? title : "알림"
		});
	}
};


(function($) {
	$.fn.validateForm = $.validateFormLib.validateForm;
})(jQuery);