$(window).load(function() {
	var _recoUserId = getCookie('UserCookieKey');
	var _rbSendSyncLogs = function() {
		eglc.op('setVar','cuid','e15e978e-3623-4892-bf0a-485b9f8196ee');
		eglc.op('setVar','itemId','${ext.sellPrdtBcode}');
		eglc.op('track','add_to_cart');
		// if you want to send user log with userId inserted
		eglc.op('setVar','userId',SHA256(_recoUserId));
		eglc.op('track', 'user');
	};
});
/* 주문하기, 장바구니 Script 내역 Start ------------------------- */
function cartAdd() {

//    if (memloginYn()) {
		// 장바구니담기
		$('form[name="sForm"]').attr("action", "/m/order/addCartForOption");
		
		// 주문시 상품 체크 ----- 작업해야 함 
		var checkMsg = checkProduct();
		if (checkMsg != "OK") {alert(checkMsg);return;}
		
		// 장바구니 처리시 필요한 값 처리
		// 상품 수량
		// 각인정보
		// 주문제작
		
		// 상품수량
	    var productCount = $('input[name="prdtCnt"]').val();
		if (productCount < 1) {
			alert("주문수량이 없습니다.");
			return;
		}
	    
	    if (!isOption && !isSpec) {
	        $('form[name="sForm"]').html($('div#formBaseHtml').html());
	        sendOrder();
	    } else if (isOption) {
	        if ($("#cartList .ord_price").length < 1) {
	            alert('옵션을 선택하세요.');
	            $('select.options:first').focus();
	        }else{
	            $('form[name="sForm"]').html(makeOptnData());
	            sendOrder();
	        }
	    } else if (isSpec) {
	        if ($("#cartList .ord_price").length < 1) {
	            alert('옵션을 선택하세요.');
	            $('select.options:first').focus();
	        } else {
	            $('form[name="sForm"]').html(makeOptnData());
	            sendOrder();
	        }
	    } else {
	        alert("주문할 수 없는상품입니다");
	    }
//    } else {
//    	needLogin();
//    }
}

function onClickBuyNow() {
	
//    if (memloginYn()) {
		// 장바구니담기
		$('form[name="sForm"]').attr("action", "/m/order/quickOrderForOption");
		
		// 주문시 상품 체크 ----- 작업해야 함 
		var checkMsg = checkProduct();
		if (checkMsg != "OK") {alert(checkMsg);return;}
		
		// 장바구니 처리시 필요한 값 처리
		// 상품 수량
		// 각인정보
		// 주문제작
		
		// 상품수량
	    var productCount = $('input[name="prdtCnt"]').val();
		if (productCount < 1) {
			alert("주문수량이 없습니다.");
			return;
		}
	    
	    if (!isOption && !isSpec) {
	        $('form[name="sForm"]').html($('div#formBaseHtml').html());
	        sendOrder();
	    } else if (isOption) {
	        if ($("#cartList .ord_price").length < 1) {
	            alert('옵션을 선택하세요.');
	            $('select.options:first').focus();
	        }else{
	            $('form[name="sForm"]').html(makeOptnData());
	            sendOrder();
	        }
	    } else if (isSpec) {
	        if ($("#cartList .ord_price").length < 1) {
	            alert('옵션을 선택하세요.');
	            $('select.options:first').focus();
	        } else {
	            $('form[name="sForm"]').html(makeOptnData());
	            sendOrder();
	        }
	    } else {
	        alert("주문할 수 없는상품입니다");
	    }
//    } else {
//    	needLogin();
//    }
}

function onClickBuyNowGroup() {
	// 장바구니담기
	$('form[name="sForm"]').attr("action", "/m/order/quickOrderForOption");
	
	// 주문시 상품 체크 ----- 작업해야 함 
	var checkMsg = checkProduct();
	if (checkMsg != "OK") {alert(checkMsg);return;}
	
	// 장바구니 처리시 필요한 값 처리
	// 상품 수량
	// 각인정보
	// 주문제작
	
	// 상품수량
    var productCount = $('input[name="prdtCnt"]').val();
	if (productCount < 1) {
		alert("주문수량이 없습니다.");
		return;
	}
    
    if (!isOption && !isSpec) {
        $('form[name="sForm"]').html($('div#formBaseHtml').html());
        sendOrder();
    } else if (isOption) {
        if ($("#cartList .ord_price").length < 1) {
            alert('옵션을 선택하세요.');
            $('select.options:first').focus();
        }else{
            $('form[name="sForm"]').html(makeOptnData());
            sendOrder();
        }
    } else if (isSpec) {
        if ($("#cartList .ord_price").length < 1) {
            alert('옵션을 선택하세요.');
            $('select.options:first').focus();
        } else {
            $('form[name="sForm"]').html(makeOptnData() + "<input type='hidden' value='Y' name='groupSellYn'>");
            
            sendOrder();
        }
    } else {
        alert("주문할 수 없는상품입니다");
    }
}


function checkProduct() {
	var chkMsg = "";
	chkMsg = "OK";
	return chkMsg; // 주문상품 체크사항 정상 OK , 그외 오류메세지
}

function sendOrder() {
    var productCount = $('input[name="prdtCnt"]').val();
    $('form[name="sForm"] input[name="prdtCount"]').attr('value', productCount);
    
    if (isOrderMake)    $('form[name="sForm"]').append(getOrderMakeText());
    
    if($("select[name=specGroup]").length == 0){
        if(!isSaleYn("${ext.saleStat}")){
            return false;
        }
    }
    
    //alert($('form[name="sForm"]').html());
    $('form[name="sForm"]').ajaxSubmit({
        type: "POST"
        ,url: $('form[name="sForm"]').attr("action")
        ,dataType: "json"
        ,success : function(data){
            if (data) {
                if(!isEmpty(data.cartType)) {
                    if(data.save) {
                        // 바로구매
                        if(data.cartType == "quickOrder")    window.location.href = "https://m.hottracks.co.kr/m/order/orderSheet";
                    } else {
                        var errorMessages = data.result;
                        alert(errorMessages);
                    }
                } else {
                    // 레코벨 장바구니 스크립트
                	//_rbSendSyncLogs();
                	
                	/*if(confirm('장바구니에 담겼습니다. \r\n이동하시겠습니까?')){
                        location.href = "/m/order/cart";
                    }*/
                	
                	if(confirm(data.result + '\n--------------------------\n[장바구니로 이동하시겠습니까?]')){
                        location.href = "/m/order/cart";
                    }
                    
                    $('form[name="sForm"]').empty();
                }
            }
        }
        ,error: function(data) {
            alert("장바구니에 담지 못하였습니다. 다시 한번 부탁드립니다.");
            // alert('<fmt:message key="error.common.system"/>');
        }
    });
}

function makeOptnData(){
    var data = '';
    if (isOrderMake){
    	var orerMakeValue = $('textarea[name="orderMakeText"]').val();
        data+="<input type='hidden' name='optnOrderMakeConts' value='" + orerMakeValue + "'>";
    }
    var trs = $("#cartList").find(".ord_price");
    console.log(trs.length);
    for(var i = 0; i<trs.length; i++){
        var inputs = trs.eq(i).find("input");
        for(var j = 0; j<inputs.length; j++){
            var input = inputs.eq(j);
            data += "<input name='"+input.attr("name")+"' value='"+input.val()+"'/>";
        }
        
        var cvslPrdtYn = $("input[name=cvslPrdtYn]").val();// value="true"/>';
        var cvslBcode = $("input[name=cvslBcode]").val();
        var cvslCont = $("input[name=cvslCont]").val();
        var cvslFont = $("input[name=cvslFont]").val();
        
        if(!isEmpty(cvslPrdtYn)) {
            data += '<input type="hidden" name="optnCvslBcodes" value="' + cvslBcode +'"/>';
            data += '<input type="hidden" name="optnCvslConts" value="' + cvslCont + '"/>';
            data += '<input type="hidden" name="optnCvslFonts" value="' + cvslFont + '"/>';
        }
        
        // 옵션상품별 주문제작 상품체크
        var orerMakeValue = $('textarea[name="orderMakeText"]').val(); 
        if (isOrderMake){
            data+="<input type='hidden' name='optnOrderMakeConts' value='" + orerMakeValue + "'>";
        }
    }
    if(isOption){
        data+="<input type='hidden' name='optnPrdtYn' value='true'>";
    }
    return data;
}

function getOrderMakeText() {
    var orerMakeValue = $('textarea[name="orderMakeText"]').val(); 
    var returnText = '<input type="hidden" value="' + orerMakeValue + '"  name="orderMakeCont">';
    returnText += '<input type="hidden" value="true"  name="orderMakeYn">';
    return returnText;
}

function checkOption(){
}

function isSaleYn(saleStat){
    if(saleStat != "Y" && $("input[name=productCount]").val() > parseInt(saleStat)){
        alert("본 상품의 현재 주문 가능한 수량은  " + saleStat + "개 입니다.");
        return false;
    }
    return true;
}
/* 주문하기, 장바구니 Script 내역 End ------------------------- */

$order = {
   url:{
      cart:"/m/order/actCart"       // 장바구니담기
    , order:"/m/order/actOrder"     // 바로구매
   }
 , order:function(urlType) {
        if ($product.orderMakeYn) {
            if (isEmpty($cart.orderMakeCont)) {
                alert("주문제작 문구는 생략 할 수 없습니다.");
                return;
            }
        }
        
        if (!$product.isOption && !$product.isSpec) {
            $order.action(urlType);
        } else if ($product.isOption || $product.isSpec) {
            if ($cart.option.list < 1) {
                alert('옵션을 선택하세요.');
                $('select.options:first').focus();
            }else{
                $order.action(urlType);
            }
        } else {
            alert("주문할 수 없는상품입니다");
        }
    }
 , action:function(urlType){
    $.ajax({
         url: $order.url[urlType]
       , data: JSON.stringify($cart.getCartParam())
       , type:"POST"
       , headers: {
            "Accept": "application/json"
          , "Content-Type": "application/json"
         }
        ,dataType: "json"
        ,success : function(data){
            if (data) {
                if(!isEmpty(data.cartType)) {
                    if(data.save) {
                        // 바로구매
                        if(data.cartType == "quickOrder")    window.location.href = "https://m.hottracks.co.kr/m/order/orderSheet";
                    } else {
                        var errorMessages = data.result;
                        alert(errorMessages);
                    }
                } else {
                	// 레코벨 장바구니 스크립트
                	//_rbSendSyncLogs();
                	
                    // 장바구니 담기
                    if(confirm(data.result + '\n--------------------------\n[장바구니로 이동하시겠습니까?]')){
                        location.href = "/m/order/cart";
                    }
                    
                    // 각인정보 삭제
                    $cart.cvsl = null;
                    
                    // 상단 장바구니 카운트 변경
                    initTopNavigation();
                    
                    $('form[name="sForm"]').empty();
                }
            }
        }
        ,error: function(request, status, error) {
            // console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            if(request.status != 0){
                alert('서비스 수행도중 오류가 발생하였습니다. 잠시후 다시 이용해주세요.\n(※ 지속적으로 오류가 나는 경우 고객센터에 문의바랍니다.)');
            }
        }
    });
   }
 
};
