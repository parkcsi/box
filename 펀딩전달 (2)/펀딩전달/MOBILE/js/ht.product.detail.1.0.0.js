var $product;

// 장바구니
var $cart = {
    sellPrdtBcode:""
  , orderMakeCont:null
  , cvsl:null
  , tmpInseq:0     // 장바구에 담기위한 임시 일련번호
  , prdtCnt:{
        value:1
      , update:function(prdtCnt){
          var maxCnt = 99;
          var laveCount = $product.laveCount;
          if($product.saleStat != "Y")    maxCnt = $product.saleStat;
          
          if(isNaN(prdtCnt))            return "숫자만 입력가능합니다.";
          else if(prdtCnt < 1)          return "최소 1개 이상 구매 가능합니다.";
          else if(prdtCnt > laveCount)  return "본 상품의 현재 주문 가능한 수량은 " + laveCount + "개 입니다.";
          // else if(prdtCnt > maxCnt)     return "본 상품의 현재 주문 가능한 수량은 " + maxCnt + "개 입니다.";
          
          $cart.prdtCnt.value = prdtCnt;
      }
    , increase:function(){
          return $cart.prdtCnt.update($cart.prdtCnt.value + 1);
      }
    , decrease:function(){
          return $cart.prdtCnt.update($cart.prdtCnt.value - 1);
      }
   }
 , option:{
         list:[]
       , get:function(data){
            for(var i = 0; i < $cart.option.list.length; i++){
                var option = $cart.option.list[i];
                if(option.optnKey == data.optnKey){
                    return option;
                }
            }
        }
      , insert:function(data){
            if(!$cart.option.get(data)){
                $cart.tmpInseq++;
                data["tmpInseq"] = $cart.tmpInseq;
                $cart.option.list.push(data);
            }
        }
      , remove:function(data){
            var arr = [];
            var target = $cart.option.get(data);
            var list = $cart.option.list;
            for(var i = 0; i < list.length;i ++){
                var option = list[i];
                if(option != target){
                    arr.push(option);
                }
            }
            $cart.option.list = arr;
        }
      , update:function(data, prdtCnt){
            var option = $cart.option.get(data);
            if(option){
                var maxCnt = 99;
                var laveCount = option.laveCount;
                if(option.saleStat != "Y")    maxCnt = option.saleStat;
                
                if(isNaN(prdtCnt))            return "숫자만 입력가능합니다.";
                else if(prdtCnt < 1)          return "최소 1개 이상 구매 가능합니다.";
                else if(prdtCnt > laveCount)  return "본 상품의 현재 주문 가능한 수량은 " + laveCount + "개 입니다.";
                // else if(prdtCnt > maxCnt)     return "본 상품의 현재 주문 가능한 수량은 " + maxCnt + "개 입니다.";
                
                option.prdtCnt = prdtCnt;
            }else{
                return "선택된 옵션이 없습니다.";
            }
        }
      , increase:function(data){
            var option = $cart.option.get(data);
            return $cart.option.update(data, (option.prdtCnt + 1));
        }
      , decrease:function(data){
            var option = $cart.option.get(data);
            return $cart.option.update(data, (option.prdtCnt - 1));
        }
    }
  , summary:function(){
        var result = { prdtCnt:0, prdtAmt:0 };
        if($product.isOption || $product.isSpec){
            var list = $cart.option.list;
            if(list){
               for(var i = 0; i < list.length; i ++){
                   var option = list[i];
                   result.prdtCnt += parseInt(option.prdtCnt);
                   result.prdtAmt += (parseInt(option.snglPrdtPrce) * parseInt(option.prdtCnt));
               }
            }
        }else{
            result.prdtCnt += parseInt($cart.prdtCnt.value);
            result.prdtAmt += (parseInt($product.lastCpnPrice) * parseInt($cart.prdtCnt.value));
        }
        return result;
    }
    // 저장 처리를 위한 데이터 생성
  , getCartParam:function(){
       var params = [];
       
       if($product.isOption){
           // CASE01:이중옵션 상품인 경우
           var list = $cart.option.list;
           for(var i = 0; i < list.length; i ++){
               var option = list[i];
               var data = {
                       prdtCount:option.prdtCnt
                       , sellPrdtBcode:$cart.sellPrdtBcode
                       , orderMakeYn:$product.orderMakeYn
                       , orderMakeCont:$cart.orderMakeCont
                       , optnPrdtYn:true
                       , optnNameList:option.optnNames
                       , optnValueList:option.optnValues
                       , prdtName:option.optnTxt
                   };
               if($cart.cvsl){
                   data["cvslPrdtYn"] = true;
                   data["cvslCont"] = $cart.cvsl.cvslCont;
                   data["cvslBcode"] = $cart.cvsl.cvslBcode;
                   data["cvslFont"] = $cart.cvsl.cvslFont;
               }
               params.push(data);
           }
       }else if($product.isSpec){
           // CASE02:일반 옵션 상품인 경우
           var list = $cart.option.list;
           for(var i = 0; i < list.length; i ++){
               var option = list[i];
               var data = {
                       prdtCount:option.prdtCnt
                       , sellPrdtBcode:option.sellPrdtBcode
                       , orderMakeYn:$product.orderMakeYn
                       , orderMakeCont:$cart.orderMakeCont
                       , prdtName:option.optnTxt
                   };
               if($cart.cvsl){
                   data["cvslPrdtYn"] = true;
                   data["cvslCont"] = $cart.cvsl.cvslCont;
                   data["cvslBcode"] = $cart.cvsl.cvslBcode;
                   data["cvslFont"] = $cart.cvsl.cvslFont;
               }
               params.push(data);
           }
       }else{
           // CASE03:일반 상품인 경우
           var data = {
                   prdtCount:$cart.prdtCnt.value
                   , sellPrdtBcode:$cart.sellPrdtBcode
                   , orderMakeYn:$product.orderMakeYn
                   , orderMakeCont:$cart.orderMakeCont
                   , prdtName:$product.prdtName
               };
           if($cart.cvsl){
               data["cvslPrdtYn"] = true;
               data["cvslCont"] = $cart.cvsl.cvslCont;
               data["cvslBcode"] = $cart.cvsl.cvslBcode;
               data["cvslFont"] = $cart.cvsl.cvslFont;
           }
           params.push(data);
       }
       return params;
    }
};

/**
 * 기본 상품 정보 로딩
 */
function _init(sellPrdtBcode){
    $.ajax({
        url:"/m/gift/product?sellPrdtBcode=" + sellPrdtBcode
      , type:"POST"
      , dataType:"json"
      , success:function(data){
            if(data && data.detail){
                $product = data.detail;
                
                if($product.sellPrdtGbn == "G"){
                    if($product.mngrPrdtBcode){
                        _initOptionV2($product.mngrPrdtBcode);
                    }else{
                        _initOption($product.sellPrdtBcode);
                    }
                }else if($product.sellPrdtGbn == "P"){
                    $product["isSpec"] = true;
                    _initSpecs($product.sellPrdtBcode);
                }
                
                // 주문제작문구 세팅
                _initOrderMakeCont();
                
                // 기초 장바구니 정보 세팅
                $cart.sellPrdtBcode = $product.sellPrdtBcode;
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

//================================================================== 이중옵션 ==================================================================// 
/**
 * 다중 옵션 정보 로드
 */
function _initOption(sellPrdtBcode){
    $.ajax({
        url:"/m/gift/option?sellPrdtBcode=" + sellPrdtBcode
      , type:"POST"
      , dataType:"json"
      , success:function(data){
            if(data && data.list && data.list.length > 0){
                $product["isOption"] = true;
                $product["options"] = data.list;
                
                var obj = document.getElementById("listOption");
                _removeChild(obj);
                
                var list = data.list;
                for(var i = 0;i < list.length; i ++){
                    var option = list[i];
                    
                    var select = _createSimpleElement("select", null, "select select_black options");
                    if(i > 0)    select.classList.add("mgt5");
                    select.name = "options";
                    select.title = option.optnName;
                    select.id = option.optnName;
                    var hndl = function(){ checkOption(); };
                    _addEvent(select, "change", function(){ _checkOption(); });
                    
                    select.appendChild(_createSimpleOption("", option.optnName + "을(를) 선택하세요."));
                    
                    var descs = option.optnDesc.split("|");
                    for(var j = 0; j < descs.length; j++){
                        var desc = descs[j];
                        select.appendChild(_createSimpleOption(desc, desc));
                    }
                    
                    obj.appendChild(select);
                }
                obj.style.display = "block";
                
                obj2 = document.getElementById("ord" + $product.sellPrdtBcode);
                if(obj2)    obj2.style.display = "none";
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

/**
 * 다중 옵션 선택 handler
 */
function _checkOption(){
    var options = document.getElementsByName("options");
    var snglPrdtPrce = $product.lastCpnPrice;
    var prdtCnt = $cart.prdtCnt.value;
    var optnNames;
    var optnValues;
    var optnTxt;
    for (var j = 0; j < options.length; j++){
        var option = options[j];
        if(option.value && option.value != ""){
            if(optnNames)   optnNames += "|";
            else            optnNames = "";
            optnNames += option.title;
            
            if(optnValues)  optnValues += "|";
            else            optnValues = "";
            optnValues += option.value;
            
            if(optnTxt)     optnTxt += "\n";
            else            optnTxt = "";
            optnTxt += option.title + ":" + option.value;
        }else{
            // console.log(option.title + "을(를) 선택하세요");
            return false;
        }
    }
    
    var optnKey = optnNames+'x'+optnValues;    // 옵션은 키가 없으므로
    var saleStat = $product.saleStat;
    var laveCount = $product.laveCount;
    var data = {  optnKey:optnKey
                , optnTxt:optnTxt
                , optnNames:optnNames
                , optnValues:optnValues
                , snglPrdtPrce:snglPrdtPrce
                , prdtCnt:prdtCnt
                , saleStat:saleStat
                , laveCount:laveCount
               };
    
    $cart.option.insert(data);

    $('select[name=options]').val("");
    
    _loadCart();
}
//================================================================== #이중옵션 ==================================================================// 
//================================================================== 이중옵션v2 ==================================================================// 
/**
 * 다중 옵션 정보 로드
 */
function _initOptionV2(mngrPrdtBcode){
    var option = {};
    $.ajax({
        url:"/m/gift/2.0/option?mngrPrdtBcode=" + mngrPrdtBcode
      , type:"POST"
      , dataType:"json"
      , success:function(data){
            if(data && data.list && data.list.length > 0){
                $product.isOption = true;
                $product.options = data.list;
                $product.optionGbn = (data.list[0].optnGbn3)?3:(data.list[0].optnGbn2)?2:(data.list[0].optnGbn1)?1:0;
                
                var obj = document.getElementById("listOption");
                _removeChild(obj);
                
                var hndlChng = function(step){
                    return function(){
                        if(this.options[this.selectedIndex].classList.contains("disabled")){
                            alert("해당 상품은 품절상품입니다.");
                            this.value = "";
                            return;
                        }
                        if($product.optionGbn > step){
                            // 상위뎁스가 바뀌면 하위뎁스 재설정
                            var nextStep = step+1;
                            _loadOptionGbn(step+1, this.value);
                            for(var i = nextStep+1; i < $product.optionGbn; i++){
                                _loadOptionGbn(i+1, "");
                            }
                        }
                        _checkOptionV2();
                    };
                };
                
                var list = data.list;
                for(var i = 0; i < $product.optionGbn; i++){
                    var step = i + 1;
                    
                    var select = _createSimpleElement("select", null, "select select_black options");
                    if(i > 0)    select.classList.add("mgt5");
                    select.name = "options";
                    select.title = "분류" + step;
                    select.id = "selOption" + step;
                    
                    _addEvent(select, "change", hndlChng(step));
                    
                    select.appendChild(_createSimpleOption("", "분류"+step+"을(를) 선택하세요."));
                    
                    obj.appendChild(select);
                }
                
                _loadOptionGbn(1, "");
                obj.style.display = "block";
                
                obj2 = document.getElementById("ord" + $product.sellPrdtBcode);
                if(obj2)    obj2.style.display = "none";
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

// 뎁스별 구분목록 반환
function _loadOptionGbn(step, prntName){
    var id = "selOption" + step;
    var obj = document.getElementById(id);
    _removeChild(obj);
    
    obj.appendChild(_createSimpleOption("", "분류"+step+"을(를) 선택하세요."));
    
    var options = {};
    var list = $product.options;
    for(var i = 0; i < list.length; i++){
        var option = list[i];
        if(step < 2 || option["optnGbn"+(step-1)] == prntName){
            var key = option["optnGbn" + step];
            if(option["optnGbn"+(step+1)] && option["optnGbn"+(step+1)] != ""){
                // CASE01:다음 뎁스가 있는 경우
                if(!options[key]){
                    obj.appendChild(_createSimpleOption(key, key));
                    options[key] = "Y";
                }
            }else{
                // CASE02:다음 뎁스가 없는 경우
                if(!options[key]){
                    if(option.dispYn != "N"){
                        obj.appendChild(_createSimpleOption(key, key));
                    }else{
                        var optn = _createSimpleOption(key, key + "(품절)", "disabled");
                        optn.style.color = "#bfbfbf";
                        obj.appendChild(optn);
                    }
                    options[key] = "Y";
                }
            }
        }
    }
}

/**
 * 다중 옵션 선택 handler
 */
function _checkOptionV2(){
    var options = document.getElementsByName("options");
    var snglPrdtPrce = $product.lastCpnPrice;
    var prdtCnt = $cart.prdtCnt.value;
    var optnNames;
    var optnValues;
    var optnTxt;
    for (var j = 0; j < options.length; j++){
        var option = options[j];
        if(option.value && option.value != ""){
            if(optnNames)   optnNames += "|";
            else            optnNames = "";
            optnNames += option.title;
            
            if(optnValues)  optnValues += "|";
            else            optnValues = "";
            optnValues += option.value;
            
            if(optnTxt)     optnTxt += "\n";
            else            optnTxt = "";
            optnTxt += option.title + ":" + option.value;
        }else{
            // console.log(option.title + "을(를) 선택하세요");
            return false;
        }
    }
    
    var optnKey = optnNames+'x'+optnValues;    // 옵션은 키가 없으므로
    var saleStat = $product.saleStat;
    var laveCount = $product.laveCount;
    var data = {  optnKey:optnKey
                , optnTxt:optnTxt
                , optnNames:optnNames
                , optnValues:optnValues
                , snglPrdtPrce:snglPrdtPrce
                , prdtCnt:prdtCnt
                , saleStat:saleStat
                , laveCount:laveCount
               };
    
    $cart.option.insert(data);
    
    _loadCart();
}
//================================================================== #이중옵션v2 ==================================================================// 
//================================================================== 대표사양 ==================================================================// 
/**
 * 옵션 정보 로드
 */
function _initSpecs(sellPrdtBcode){
    $.ajax({
        url:"/m/gift/specs?primeSellPrdtBcode=" + sellPrdtBcode
      , type:"POST"
      , dataType:"json"
      , success:function(data){
            if(data && data.list){
                $product["specProducts"] = data.list;
                
                var obj = document.getElementById("listOption");
                _removeChild(obj);
                
                var select = _createSimpleElement("select", null, "select select_black options");
                select.name = "specPrdtBcode";
                select.title = "옵션선택";
                select.id = "specGroup";
                
                if($product.specGroupName && $product.specGroupName != ""){
                    select.appendChild(_createSimpleOption("", $product.specGroupName + "을(를) 선택하세요."));
                } else{
                    select.appendChild(_createSimpleOption("", "옵션을(를) 선택하세요."));
                }
                
                var hndl = function(){ _checkSpecs(); };
                _addEvent(select, "change", hndl);
                
                var list = data.list;
                for(var i = 0;i < list.length; i ++){
                    var spec = list[i];
                    
                    var specName = spec.specName;
                    if(spec.prmtCode != 'C0302' || spec.prdtStatCode != 'C0312')    specName += " (품절)";
                    if(spec.lastCpnPrice < $product.lastCpnPrice)    specName += ", " + (spec.lastCpnPrice - $product.lastCpnPrice);
                    if(spec.lastCpnPrice > $product.lastCpnPrice)    specName += ", +" + (spec.lastCpnPrice - $product.lastCpnPrice);
                    if(spec.limitCount < 99999)                      specName += ", 한정:" + spec.laveCount;
                    
                    var option = _createSimpleOption(spec.sellPrdtBcode, specName);
                    if(spec.prmtCode != 'C0302' || spec.prdtStatCode != 'C0312'){
                        option.classList.add("disabled");
                        option.style.color = "#bfbfbf";
                    }
                    
                    select.appendChild(option);
                    obj.appendChild(select);
                }
                obj.style.display = "block";
                
                obj2 = document.getElementById("ord" + $product.sellPrdtBcode);
                if(obj2)    obj2.style.display = "none";
            }
      }
      ,error: function(request, status, error) {
          alert('서비스 수행도중 오류가 발생하였습니다. 잠시후 다시 이용해주세요.\n(※ 지속적으로 오류가 나는 경우 고객센터에 문의바랍니다.)');
          // alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
      }
    });
}

/**
 * 해당 사양 상품 정보 반환
 * @param sellPrdtBcode
 * @returns
 */
function _specProduct(sellPrdtBcode){
    if($product && $product.specProducts){
        var list = $product.specProducts;
        for(var i = 0; i < list.length; i++){
            var product = list[i];
            if(product.sellPrdtBcode == sellPrdtBcode)    return product;
        }
    }
    _loadCart();
}

/**
 * 옵션 선택 handler
 */
function _checkSpecs(){
    var options = document.getElementsByName("specPrdtBcode");
    var sellPrdtBcode = "";
    var prdtCnt = $cart.prdtCnt.value;
    for (var j = 0; j < options.length; j++){
        var option = options[j];
        if(option.options[option.selectedIndex].classList.contains("disabled")){
            alert("해당 상품은 품절상품입니다.");
            option.value = "";
            return false;
        }else{
            sellPrdtBcode = option.value;
            var spec = _specProduct(sellPrdtBcode);
            if(spec){
                
                var optnKey = spec.sellPrdtBcode;
                var optnTxt = "";
                if($product.specGroupName)    optnTxt += $product.specGroupName;
                else                          optnTxt += "옵션";
                optnTxt += " : " + spec.specName;
                
                var snglPrdtPrce = spec.lastCpnPrice;
                var saleStat = spec.saleStat;
                var laveCount = spec.laveCount;
                var data = {  optnKey:optnKey
                            , optnTxt:optnTxt
                            , sellPrdtBcode:sellPrdtBcode
                            , snglPrdtPrce:snglPrdtPrce
                            , prdtCnt:prdtCnt
                            , saleStat:saleStat
                            , laveCount:laveCount
                           };
                
                $cart.option.insert(data);
            }
        }
    }
    
    _loadCart();
}
//================================================================== #대표사양 ==================================================================// 
/**
 * 옵션/사양 장바구니 로드
 */
function _loadCart(){
    var obj = document.getElementById("cartList");
    _removeChild(obj);
    
    var list = $cart.option.list;
    if(list){
        for(var i = 0; i < list.length;  i++){
            var option = list[i];
            
            var div = _createSimpleElement("div", null, "ord_price");
            div.id = "ord" + option.tmpInseq;
            obj.appendChild(div);
            
            // 선택 옵션/사양명
            div.appendChild(_createSimpleElement("p", option.optnTxt, "name", {style:"white-space:pre-line;"}));
            
            // 수량 입력 부분
            var count = _createSimpleElement("div", null, "count");
            div.appendChild(count);
            
            var hndlPrdtCnt = function(option){
                return function(){
                    var rtnMsg = $cart.option.update(option, this.value);
                    if(rtnMsg)    alert(rtnMsg);
                    
                    option = $cart.option.get(option);
                    document.getElementById("prdtCnt" + option.tmpInseq).value = option.prdtCnt;
                    _setText(document.getElementById("prdtAmt" + option.tmpInseq), price_format(option.snglPrdtPrce * option.prdtCnt));
                    _calcTotalAmt();
                };
            };
            var prdtCnt = _createSimpleInput("number", "prdtCnt", option.prdtCnt, "prdtCnt", "수량입력");
            prdtCnt.id = "prdtCnt" + option.tmpInseq;
            prdtCnt.setAttribute("style", "width: 100%;height: 30px;border: 1px solid #e5e5e5;text-align: center;font-size: 16px;color: #424242;");
            _addEvent(prdtCnt, "change", hndlPrdtCnt(option));
            count.appendChild(prdtCnt);
            var hndlCnt = function(option, cnt){
                return function(e){
                    e.preventDefault();
                    
                    var rtnMsg;
                    if(cnt > 0)         rtnMsg = $cart.option.increase(option);
                    else if(cnt < 0)    rtnMsg = $cart.option.decrease(option);
                    
                    if(rtnMsg)    alert(rtnMsg);
                    
                    option = $cart.option.get(option);
                    document.getElementById("prdtCnt" + option.tmpInseq).value = option.prdtCnt;
                    _setText(document.getElementById("prdtAmt" + option.tmpInseq), price_format(option.snglPrdtPrce * option.prdtCnt) + " 원");
                    _calcTotalAmt();
                };
            };
            
            var btnDown = _createSimpleElement("button", "감소", "down");
            btnDown.type = "button";
            _addEvent(btnDown, "click", hndlCnt(option, -1));
            count.appendChild(btnDown);
            var btnUp = _createSimpleElement("button", "증가", "up");
            btnUp.type = "button";
            _addEvent(btnUp, "click", hndlCnt(option, 1));
            count.appendChild(btnUp);
            
            var amount = _createSimpleElement("span", price_format(option.snglPrdtPrce * option.prdtCnt) + " 원", "amount");
            amount.id = "prdtAmt" + option.tmpInseq;
            div.appendChild(amount);
            
            var hndlDel = function(option){
                return function(e){
                    e.preventDefault();
                    $cart.option.remove(option);
                    _removeElement(document.getElementById("ord" + option.tmpInseq));
                    _calcTotalAmt();
                };
            };
            var btnDel = _createSimpleAnchor("#", null, "btn_del", option.optnTxt+" 선택해제", hndlDel(option));
            var btnDelImg = _createSimpleElement("img", null, null, {style:"height:22px"});
            btnDelImg.src = "/images/content/btn_delete.png";
            btnDel.appendChild(btnDelImg);
            div.appendChild(btnDel);
        }
        
        _calcTotalAmt();
    }
}

/**
 * 옵션/사양 가격 정보 합산
 */
function _calcTotalAmt(){
    var obj = document.getElementById("cartSum");
    var summary = $cart.summary();
    
    _setText(obj, price_format(summary.prdtAmt) + " 원");
}

//================================================================== 주문제작문구 ==================================================================//
function _initOrderMakeCont(){
    var obj = document.getElementById("divOrderMakeCont");
    if(obj){
        _removeChild(obj);
        
        if ($product.orderMakeYn){
            var textarea = _createSimpleElement("textarea", null, null, {name:"orderMakeText", placeholder:"문구를 입력하세요."});
            
            var hndlKeyup = function(){ checkOrderMakeCont(this); };
            _addEvent(textarea, "keyup", hndlKeyup);
            
            obj.appendChild(textarea);
            
            obj.style.display = "block";
        }else{
            obj.style.display = "none";
        }
    }
}
//================================================================== #주문제작문구 ==================================================================//
