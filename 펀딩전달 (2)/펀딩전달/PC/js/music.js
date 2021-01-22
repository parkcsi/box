/*****************************************
	뮤직샵 전용 스크립트 모음
*****************************************/
// 음반상세 새창으로 보기 처리
function viewRecordWin(sellPrdtBcode, ctgrId){
	window.open("/ht/record/detail/" + sellPrdtBcode, "", "");
}

/**
 * 일반 음반 상품에 대한 장바구니 담기 처리 - 각인옵션은 사용안함. 일반옵션은 처리함.
 * 	옵션정보는 | 값으 기준으로 구분해서 여러개의 정보를 전달함.
 * 	optnPrdtYn 값은 true|false로 처리함.
 */
function addRecordCart(sellPrdtBcode, prdtCount, optnNameList, optnValueList){
	var prdtCount = prdtCount || $("input[name=" + sellPrdtBcode + "_prdt_count]").val() || 1;	// 수량을 입력하지 않은 경우 해당 항목의 폼이름을 고정시켜서 사용함.
	var optnNameList = optnNameList || "";
	var optnValueList = optnValueList || "";
	var optnPrdtYn = optnNameList.length > 0 ? true : false;
	
	$.ajax({
        async : true, 
        url : "/ht/order/addCart",
        dataType : "json", 
        type : "post", 
        data : {
			sellPrdtBcode : sellPrdtBcode, 
			prdtCount : prdtCount, 
			optnPrdtYn : optnPrdtYn, 
			optnNameList : optnNameList, 
			optnValueList : optnValueList 
		}, 
        success : function(result, textStatus, XMLHttpRequest){
            if(result.errorMessages.length == 0){
                //alert("장바구니에 선택하신 상품이 담겼습니다.");
                
                // 상단 장바구니 카운트 변경
                initTopNavigation();
                
                if(confirm("장바구니에 선택하신 상품이 담겼습니다.\n장바구니로 이동하시겠습니까?")) location.href="/ht/order/cart";
            }else{
            	alert(result.errorMessages[0]);
            	
            	if(result.errorMessages[0].substring(0, 4) == "연령제한"){
            		goToLogin();
            	}
            	
            	if(result.errorMessages[0].substring(0, 4) == "본인인증"){
            		goToCert();
            	}
            }
        }, 
        error: function(request, textStatus, errorThrown){
        	alert("장바구니 등록시 장애가 발생하였습니다.");	// request.status + " => " + request.statusText
        }
    });	
}


/**
 * 복수개의 상품을 장바구니에 담기
 * 	폼구성요소의 이름을 고정시켜서 사용함.
 * @return
 */
function addRecordsCart(target){
	var sellPrdtBcodes = [];
	var sellPrdtCounts = [];
	$("input[name=" + target + "]:checked").each(function(idx){
		sellPrdtBcodes.push(this.value);
		sellPrdtCounts.push($("input[name=" + this.value + "_prdt_count]").val() || 1);
	});

	if(sellPrdtBcodes.length == 0){ alert("장바구니에 담을 상품을 선택해 주십시오"); return; }

	
	$.ajax({
        async : true, 
        url : "/ht/order/addCartForProductList",
        dataType : "json", 
        type : "post", 
        data : {
			sellPrdtBcodes : sellPrdtBcodes.join(","), 
			prdtCounts : sellPrdtCounts.join(","), 
			optnPrdtYn : false 
		}, 
        success : function(result, textStatus, XMLHttpRequest){
            if(result.errorMessages.length == 0){
                //alert("장바구니에 선택하신 상품이 담겼습니다.");
                
                // 상단 장바구니 카운트 변경
                initTopNavigation();
                if(confirm("장바구니에 선택하신 상품이 담겼습니다.\n장바구니로 이동하시겠습니까?")) location.href="/ht/order/cart";
            }else{
            	alert(result.errorMessages[0]);
            	
            	if(result.errorMessages[0].substring(0, 4) == "연령제한"){
            		goToLogin();
            	}
            	
            	if(result.errorMessages[0].substring(0, 4) == "본인인증"){
            		goToCert();
            	}
            }
        }, 
        error: function(request, textStatus, errorThrown){
        	alert("장바구니 담기에서 장애가 발생했습니다.");
        	//alert(request.status + " => " + request.statusText);
        }
    });
}




/**
 * 일반 음반 상품에 대한 바로구매 담기 처리 - 각인옵션은 사용안함. 일반옵션은 처리함.
 * 	옵션정보는 | 값으 기준으로 구분해서 여러개의 정보를 전달함.
 * 	optnPrdtYn 값은 true|false로 처리함.
 */
function addRecordBuy(sellPrdtBcode, prdtCount, optnNameList, optnValueList){
	var prdtCount = prdtCount || $("input[name=" + sellPrdtBcode + "_prdt_count]").val() || 1;	// 수량을 입력하지 않은 경우 해당 항목의 폼이름을 고정시켜서 사용함.
	var optnNameList = optnNameList || "";
	var optnValueList = optnValueList || "";
	var optnPrdtYn = optnNameList.length > 0 ? true : false;
	
	$.ajax({
        async : true, 
        url : "/ht/order/quickOrder",
        dataType : "json", 
        type : "post", 
        data : {
			sellPrdtBcode : sellPrdtBcode, 
			prdtCount : prdtCount, 
			optnPrdtYn : optnPrdtYn, 
			optnNameList : optnNameList, 
			optnValueList : optnValueList 
		}, 
        success : function(result, textStatus, XMLHttpRequest){
            if(result.errorMessages.length == 0){
            	location.href = "/ht/order/orderGiftChoose";
            }else{
            	alert(result.errorMessages[0]);
            	
            	if(result.errorMessages[0].substring(0, 4) == "연령제한"){
            		goToLogin();
            	}
            	
            	if(result.errorMessages[0].substring(0, 4) == "본인인증"){
            		goToCert();
            	}
            }
        }, 
        error: function(request, textStatus, errorThrown){
/** 오류 **/
        }
    });	
}

/* 음반 공동구매용 바로구매 */
function addSpeRecordBuy(sellPrdtBcode, prdtCount, optnNameList, optnValueList){
	var prdtCount = prdtCount || $("input[name=" + sellPrdtBcode + "_prdt_count]").val() || 1;	// 수량을 입력하지 않은 경우 해당 항목의 폼이름을 고정시켜서 사용함.
	var optnNameList = optnNameList || "";
	var optnValueList = optnValueList || "";
	var optnPrdtYn = optnNameList.length > 0 ? true : false;
	
	$.ajax({
        async : true, 
        url : "/ht/order/quickOrder",
        dataType : "json", 
        type : "post", 
        data : {
			sellPrdtBcode : sellPrdtBcode, 
			prdtCount : prdtCount, 
			optnPrdtYn : optnPrdtYn, 
			optnNameList : optnNameList, 
			optnValueList : optnValueList,
			groupSellYn : "Y"
		}, 
        success : function(result, textStatus, XMLHttpRequest){
            if(result.errorMessages.length == 0){
            	location.href = "/ht/order/orderGiftChoose";
            }else{
            	alert(result.errorMessages[0]);
            	
            	if(result.errorMessages[0].substring(0, 4) == "연령제한"){
            		goToLogin();
            	}
            	
            	if(result.errorMessages[0].substring(0, 4) == "본인인증"){
            		goToCert();
            	}
            }
        }, 
        error: function(request, textStatus, errorThrown){
/** 오류 **/
        }
    });	
}


/**
 * 해당 음반을 마이리스트에 등록함 - 음반기준
 * @return
 */
function addMyListRecord(rcrdCd){
	if(isLogin){
		window.open("/ht/mypage/myListRecordForm?rcrdCdList=" + rcrdCd, "", "width=460, height=540");
	}else{
		alert("로그인후 이용이 가능합니다.");
		goToLogin();
	}
}


/**
 * 체크박스를 선택한 항목들을 마이리스트에 등록함.
 * @param target
 * @return
 */
function addMyListRecords(target){
	if(isLogin){
		var rcrdCdList = [];
		$("input[name=" + target + "]:checked").each(function(idx){
			rcrdCdList.push($("input[name=chkRecord_" + this.value + "]").val());
		});
		if(rcrdCdList.length == 0){ alert("마이리스트에 담을 음반을 선택해 주십시오"); return; }
		
		
		addMyListRecord(rcrdCdList.join(","));
	}else{
		alert("로그인후 이용이 가능합니다.");
		goToLogin();
	}
}




/**
 * 해당 DVD 을 마이리스트에 등록함
 * @return
 */
function addMyListDvd(rcrdCd){
	if(isLogin){
		window.open("/ht/mypage/myListDvdForm?rcrdCdList=" + rcrdCd, "", "width=460, height=540");
	}else{
		alert("로그인후 이용이 가능합니다.");
		goToLogin();
	}
}


/**
 * 체크박스를 선택한 항목들을 마이리스트에 등록함.
 * @param target
 * @return
 */
function addMyListDvds(target){
	if(isLogin){
		var rcrdCdList = [];
		$("input[name=" + target + "]:checked").each(function(idx){
			rcrdCdList.push($("input[name=chkRecord_" + this.value + "]").val());
		});
		if(rcrdCdList.length == 0){ alert("마이리스트에 담을 DVD를 선택해 주십시오"); return; }
		
		
		addMyListDvd(rcrdCdList.join(","));
	}else{
		alert("로그인후 이용이 가능합니다.");
		goToLogin();
	}
}


/**
 * 해당 음원을 마이리스트에 등록함. - 앨범 아이디 기준
 * @param abmId
 * @return
 */
function addMyListTrackForAlbumId(abmId){
	if(typeof(isLogin) == "string"){ isLogin = isLogin == "true" ? true : false; }

	if(isLogin){
		window.open("/ht/mypage/myListTrackForAlbumForm?abmId=" + abmId, "", "width=480, height=605, scrollbars=yes");
	}else{
		alert("로그인후 이용이 가능합니다.");
		goToLogin();
	}
}




/**
 * 해당 음원을 마이리스트에 등록함
 * @return
 */
function addMyListTrack(trkId){
	if(typeof(isLogin) == "string"){ isLogin = isLogin == "true" ? true : false; }

	if(isLogin){
		window.open("/ht/mypage/myListTrackForm?trkIdList=" + trkId, "", "width=480, height=605, scrollbars=yes");
	}else{
		alert("로그인후 이용이 가능합니다.");
		goToLogin();
	}
}

/**
 * 해당 음원을 마이리스트에 등록함 - 쿠키 기반
 * @return
 */
function addMyListTrackC(trkId){
	if(!isEmpty($.cookie('UserCookieKey'))){
		window.open("/ht/mypage/myListTrackForm?trkIdList=" + trkId, "", "width=480, height=605, scrollbars=yes");
	}else{
		alert("로그인후 이용이 가능합니다.");
		goToLogin();
	}
}



/**
 * 체크박스를 선택한 항목들을 마이리스트에 등록함.
 * @param target
 * @return
 */
function addMyListTracks(target){
	if(typeof(isLogin) == "string"){ isLogin = isLogin == "true" ? true : false; }
	
	if(isLogin){
		var trkIdList = [];
		$("input[name=" + target + "]:checked").each(function(idx){
			trkIdList.push($(this).val());
		});
		if(trkIdList.length == 0){ alert("마이리스트에 담을 음악을 선택해 주십시오"); return; }

		addMyListTrack(trkIdList.join(","));
	}else{
		alert("로그인후 이용이 가능합니다.");
		goToLogin();
	}
}

/**
 * 플레이어에서 체크박스를 선택한 항목들을 마이리스트에 등록함.
 * @param target
 * @return
 */
function addMyListTracksForPlayer(target){
	if(isLogin){
		var trkIdList = [];
		$("input[name=" + target + "]:checked").each(function(idx){

			var idxT = $(this).val();
			trkIdList.push($("input[name=chkTrkId_"+idxT+"]").val());
		});
		if(trkIdList.length == 0){ alert("마이리스트에 담을 음악을 선택해 주십시오"); return; }

		addMyListTrack(trkIdList.join(","));
	}else{
		alert("로그인후 이용이 가능합니다.");
		goToLogin();
	}
}



/**
 * 해당 아티스트를 마이리스트에 등록함
 * @return
 */
function addMyListArtist(recArtiCd){
	if(isLogin){
		window.open("/ht/mypage/myListArtistForm?recArtiCdList=" + recArtiCd, "", "width=480, height=605, scrollbars=yes");
	}else{
		alert("로그인후 이용이 가능합니다.");
		goToLogin();
	}
}


/**
 * 체크박스를 선택한 항목들을 마이리스트에 등록함.
 * @param target
 * @return
 */
function addMyListArtists(target){
	if(isLogin){
		var recArtiCdList = [];
		$("input[name=" + target + "]:checked").each(function(idx){
			recArtiCdList.push($("input[name=recArtiCd_" + this.value + "]").val());
		});
		if(recArtiCdList.length == 0){ alert("마이리스트에 담을 아티스트를 선택해 주십시오"); return; }

		addMyListArtist(recArtiCdList.join(","));
	}else{
		alert("로그인후 이용이 가능합니다.");
		goToLogin();
	}
}






/**
 * 해당 음반을 재입고 알림 메일 신청 처리함.
 * @param rcrdCd
 * @return
 */
function addRecordStockedInfoRequest(rcrdCd){
	if(isLogin){
		window.open("/ht/mypage/recordStockedInfoRequestForm?rcrdCd=" + rcrdCd, "", "width=600, height=450, scrollbars=yes");
	}else{
		alert("로그인후 이용이 가능합니다.");
		goToLogin();
	}
}

/**
 * 가사보기 팝업 처리
 * @param trkId
 * @return
 */
function viewLyrics(trkId){
	window.open("/ht/track/lyrics/" + trkId, "lyrics", "width=465, height=720, scrollbars=auto");
}



//페이스북 글보내기
function goPostFaceBook(){
	window.open("http://www.facebook.com/sharer.php?u="+ window.location.href+"&t=음반정보","_blank");
}


// 트위터로 글보내기
function goPostTwitter(){
	window.open("https://twitter.com/home?status=" + window.location.href, "_blank");
}

// 미투데이로 글보내기
function goPostMe2day(){
	window.open("http://me2day.net/posts/new?new_post[body]=" + window.location.href,"_blank");
}




// 해당 문자열의 바이트수를 반환함.
function byteCheck(code){
	var code_byte = 0;
	
	for(var inx = 0; inx < code.length; inx++){
		var oneChar = escape(code.charAt(inx));
		if(oneChar.length == 1){
			code_byte ++;
		}else if(oneChar.indexOf("%u") != -1){
			code_byte += 2;
		}else if(oneChar.indexOf("%") != -1){
			code_byte += oneChar.length/3;
		}
	}
	
	return code_byte;
}


function cookie_set(name, value, expireSec_, domain_){
	/*	쿠키를 설정한다.
			- 쿠키의 유효기간은 초단위로 설정한다.
			- 쿠키의 유효기간을 지정하지 않으면 브라우저를 닫을때까지 유지가 된다.
			- 자바에서 설정한 쿠키의 경우 decodeURIComponent를 활용해야 한다. 서버측에서는 utf-8로 설정한 경우
	*/
	// 쿠키에 적용되는 문자열 구성
	var cookie_str = name + "=" + escape(value) + "; path=/;";
	//var cookie_str = name + "=" + value + "; path=/;";


	// domain 설정
	if(typeof(domain_) == "string" || typeof(domain_) == "number"){
		cookie_str += " domain=" + domain_ + ";";
	}


	// expire 설정
	if(typeof(expireSec_) == "string" || typeof(expireSec_) == "number"){
		var todayDate = new Date();
		todayDate.setSeconds(todayDate.getSeconds() + expireSec_);
		cookie_str += " expires=" + todayDate.toGMTString() + ";";
	}

	// 쿠키설정
	document.cookie = cookie_str;
}


function cookie_get(name){
	/*	쿠키의 값을 반환한다.
	*/
	// 해당 이름의 쿠키값의 시작 위치를 찾고 없으면 공백 문자를 리턴한다.
	var pos_s = document.cookie.indexOf(name + "=");
	if(document.cookie.indexOf(name + "=") < 0){	return "";	}


	// 해당 이름의 쿠키의 종료 값의 범위를 찾는다.
	var pos_e = document.cookie.indexOf(";", pos_s);
	if(pos_e < 0){	pos_e = document.cookie.length;		}		// 가장 마지막에 설정된 쿠키의 값


	// 쿠키의 값을 리턴
	return unescape(document.cookie.substring(pos_s + name.length + 1, pos_e));
}



// 음반의 큰 이미지가 없는 경우 작은 이미지로 대체 처리하는 함수. ImageTag에서 적용함.
function checkRecordImage(img, path){
	$(img).data("errorCnt", $(img).data("errorCnt") + 1 || 1); 

    if($(img).data("errorCnt") <= 1){
        img.src = path;
        
        if($(img).hasClass("recordDetailPhoto") && $(img).css("width") == "400px"){
            $(img).css("width", "200px");
            $(img).css("height", "200px");
            $(img).css("padding-top", "100px");
            $(img).css("padding-left", "100px");
        }
        
        if($(img).hasClass("recordDetailPhoto") && $(img).css("width") == "264px"){
            $(img).css("width", "148px");
            $(img).css("height", "224px");
            $(img).css("padding-top", "66px");
            $(img).css("padding-left", "55px");
        }
    }else{
        img.src = "/images/no_image.gif";
    }
}

// 로그인 페이지로 이동 처리
function goToLogin(){
	var isPopup = $("input[name=isMusicPlayer]").length;
	
	if(isPopup == 0){
		location.href = loginUrl;
	}
}

//본인인증 페이지로 이동 처리
function goToCert(){
	var isPopup = $("input[name=isMusicPlayer]").length;
	
	if(isPopup == 0){
		location.href = certUrl;
	}
}

//로그인 페이지로 이동 처리
function goToLoginPopup(){
	location.href = loginUrl;
}

// 상세 검색 연결 처리
function goSearchDtl(searchTerm, searchMenu, menuGroup){
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "/ht/search/searchMain");
    document.body.appendChild(form);
    
    form.appendChild(getInputTag(searchMenu, searchTerm));
    form.appendChild(getInputTag("searchMenu", menuGroup));
    form.appendChild(getInputTag("menuGroup", menuGroup));
    form.appendChild(getInputTag("detailSearch", "Y"));
     
    form.submit();
    document.body.removeChild(form);;
}

function goSearchCtgr(searchTerm, searchMenu, subMenu, menuGroup, ctgrId){
    //if(!serviceCheck()){
        // location.href = "/ht/search/searchMain?searchTerm=" + encodeURI(searchTerm) + "&searchMenu=" + searchMenu + "&subMenu=" + subMenu + "&menuGroup=" + menuGroup + "&categoryGroup=" + ctgrId;
        var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", "/ht/search/searchMain");
        document.body.appendChild(form);
        
        form.appendChild(getInputTag("searchTerm", searchTerm));
        form.appendChild(getInputTag("searchMenu", searchMenu));
        form.appendChild(getInputTag("subMenu", subMenu));
        form.appendChild(getInputTag("menuGroup", menuGroup));
        form.appendChild(getInputTag("ctgrId", ctgrId));
         
        form.submit();
    //}
}

function getInputTag(name, value){
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", name);
    input.setAttribute("value", value);
    
    return input;
}


function musicPlayForAlbum(abmId){
	if($("#hiddenPlayerArea").size() == 0){
		$("body").append("<div id='hiddenPlayerArea'></div>");
	}
	$('div#hiddenPlayerArea').load('/ht/track/openPlayer?abmId='+abmId);
}

function musicDownloadForAlbum(abmId){
	if(isLogin){
		if($("#hiddenDownloaderArea").size() == 0){
			$("body").append("<div id='hiddenDownloaderArea'></div>");
		}
		$('div#hiddenDownloaderArea').load('/ht/track/openDownloader?abmId='+abmId);
	}else{
		alert("로그인후 이용이 가능합니다.");
		goToLogin();
	}	
}



$(document).ready(function(){
	// 숫자만 입력을 허용함.
	$(".onlynum").keyup(function(event){
		var v = this.value;
		var arr = [];
		
		for(var i=0 ; i < v.length ; i++){
			if(!isNaN(v.substring(i, i+1))){ arr.push(v.substring(i, i+1)); }
		}
		this.value = arr.join("");
	});
});






