// Timestamp to formatDate
function _formatDate(s, format){
    var d = new Date(s);
    if(format == null){
        return d.getFullYear() + "-" + lpad((d.getMonth() + 1), 2, '0') + "-"+ lpad(d.getDate(), 2, '0')
        + " " + lpad(d.getHours(), 2, '0') + ":" + lpad(d.getMinutes(), 2, '0') + ":" + lpad(d.getSeconds(), 2, '0');
    } else if(format == "yyyy.MM.dd"){
        return d.getFullYear() + "." + lpad((d.getMonth() + 1), 2, '0') + "."+ lpad(d.getDate(), 2, '0');
    } else if(format == "yyyy-MM-dd"){
        return d.getFullYear() + "-" + lpad((d.getMonth() + 1), 2, '0') + "-"+ lpad(d.getDate(), 2, '0');
    }
}

// String to formatDate
function _formatDateByString(s, format){
	var year = s.substr(0, 4);
    var month = s.substr(4, 2);
    var day = s.substr(6, 2);
    var d = new Date(year, month-1, day);
	
	if(format == null){
		return d.getFullYear() + "-" + lpad((d.getMonth() + 1), 2, '0') + "-"+ lpad(d.getDate(), 2, '0')
		+ " " + lpad(d.getHours(), 2, '0') + ":" + lpad(d.getMinutes(), 2, '0') + ":" + lpad(d.getSeconds(), 2, '0');
	} else if(format == "yyyy.MM.dd"){
		return d.getFullYear() + "." + lpad((d.getMonth() + 1), 2, '0') + "."+ lpad(d.getDate(), 2, '0');
	} else if(format == "yyyy-MM-dd"){
		return d.getFullYear() + "-" + lpad((d.getMonth() + 1), 2, '0') + "-"+ lpad(d.getDate(), 2, '0');
	}
}

/**
 * 할인율 계산
 * @param sellPrice
 * @param dscntPrice
 * @param round
 */
function _calDscntRate(sellPrice, dscntPrice, round){
    var rate = 0;
    rate = (sellPrice - dscntPrice)/sellPrice*100;
    if(round)    rate = Math.round(rate * 10 * round)/(10 *round);
    else         rate = Math.round(rate);
    return rate;
}

/**
 * 숫자 텍스트 포멧
 * @param val
 * @returns
 */
function _fmtNumber(val){
    if(val == null)    return '-';
    
    val = $.trim(val+"");
    if(val == '')      return val;
    if(isNaN(val))     return val;
    
    var rv = "", idx = 0;
    for(var i = val.length-1 ; i >= 0 ; i--){
        rv = ((idx != 0 && idx%3 == 0) ? val.substring(i, i+1) + "," : val.substring(i, i+1)) + rv;
        idx++;
    }
    
    return rv;
}

/**
 * 공란여부체크
 * @param text
 * @param action
 * @param hndl
 */
function _isEmpty(text){
    return (text == undefined || text == null || text == "");
}

/**
 * 엘리먼트에 이벤트 추가
 * @param obj
 * @param action
 * @param hndl
 */
function _addEvent(obj, action, hndl){
    if(obj && action && hndl){
        if(obj.addEventListener)    obj.addEventListener(action, hndl);
        else                        obj.attachEvent("on"+action, hndl);
    }
}

/**
 * 페이지 생성
 * @param pageHolder
 * @param hndl
 * @returns
 */
function _getPager(pageHolder, hndl){
    var obj = document.createElement("div");
    obj.classList.add("paging");
    
    if(pageHolder && pageHolder.totalPages > 0){
        // first
        var anchorF = document.createElement("a");
        anchorF.href = "#1";
        anchorF.classList.add("first");
        anchorF.appendChild(document.createTextNode("처음"));
        _addEvent(anchorF, "click", hndl(1));
        obj.appendChild(anchorF);
        
        // prev
        var page = pageHolder.currentPage;
        var pageSize = pageHolder.pageSize;
        
        var startPage = parseInt(Math.ceil(parseFloat(page) / parseFloat(pageSize) - 1)) * pageSize + 1;
        if(startPage > 1){
            var anchorP = document.createElement("a");
            anchorP.href = "#" + (startPage - pageHolder.pageSize);
            anchorP.classList.add("prev02");
            anchorP.appendChild(document.createTextNode("이전"));
            _addEvent(anchorP, "click", hndl(startPage - pageHolder.pageSize));
            obj.appendChild(anchorP);
        }
        
        var i = startPage;
        var ul = document.createElement("ul");
        for(; i < startPage + pageHolder.pageSize && i <= pageHolder.totalPages; i++){
            var li = document.createElement("li");
            var anchorNum = document.createElement("a");
            anchorNum.href = "#" + i;
            anchorNum.appendChild(document.createTextNode(i));
            
            if(i == page){
                li.classList.add("active");
                _addEvent(anchorNum, "click", function (e){ e.preventDefault(); });
            }else {
                anchorNum.setAttribute("title", i + "페이지로 이동");
                _addEvent(anchorNum, "click", hndl(i));
            }
            
            li.appendChild(anchorNum);
            ul.appendChild(li);
        }
        obj.appendChild(ul);
        
        if(i <= pageHolder.totalPages){
            var anchorN = document.createElement("a");
            anchorN.href = "#" + i;
            anchorN.classList.add("next02");
            anchorN.appendChild(document.createTextNode("다음"));
            _addEvent(anchorN, "click", hndl(i));
            obj.appendChild(anchorN);
        }
        
    }
    
    return obj;
}

function _getNewPager(pageHolder, hndl){
    var obj = document.createElement("div");
    obj.classList.add("pagination_v2");
    
    if(pageHolder && pageHolder.totalPages > 0){
        // first
        var anchorF = document.createElement("a");
        anchorF.href = "#1";
        anchorF.classList.add("arr");
        anchorF.classList.add("prev");
        anchorF.classList.add("first");
        _addEvent(anchorF, "click", hndl(1));
        obj.appendChild(anchorF);
        
        // prev
        var page = pageHolder.currentPage;
        var pageSize = pageHolder.pageSize;
        
        var startPage = parseInt(Math.ceil(parseFloat(page) / parseFloat(pageSize) - 1)) * pageSize + 1;
        /*if(startPage > 1){
            var anchorP = document.createElement("a");
            anchorP.href = "#" + (startPage - pageHolder.pageSize);
            anchorP.classList.add("prev");
            anchorP.appendChild(document.createTextNode("이전"));
            _addEvent(anchorP, "click", hndl(startPage - pageHolder.pageSize));
            obj.appendChild(anchorP);
        }*/
        
        var i = startPage;
        for(; i < startPage + pageHolder.pageSize && i <= pageHolder.totalPages; i++){
            var anchorNum = document.createElement("a");
            anchorNum.href = "#" + i;
            anchorNum.appendChild(document.createTextNode(i));
            
            if(i == page){
                anchorNum.classList.add("active");
                _addEvent(anchorNum, "click", function (e){ e.preventDefault(); });
            }else {
                anchorNum.setAttribute("title", i + "페이지로 이동");
                _addEvent(anchorNum, "click", hndl(i));
            }
            
            obj.appendChild(anchorNum);
        }
        
        if(i <= pageHolder.totalPages){
            var anchorN = document.createElement("a");
            anchorN.href = "#" + i;
            anchorN.classList.add("arr");
            anchorN.classList.add("next");
            _addEvent(anchorN, "click", hndl(i));
            obj.appendChild(anchorN);
        }
        
    }
    
    return obj;
}

/**
 * 이미지경로
 * @param url
 * @param type
 * @param size
 * @returns {String}
 */
function _imgUrl(url, type, size){
    var common = "http://image.kyobobook.co.kr/newimages/giftshop_new/work/";
    var product = "http://image.kyobobook.co.kr/newimages/giftshop_new/goods/"+size+"/";
    var brand = "http://image.kyobobook.co.kr/newimages/giftshop_new/work/brand/";
    var noimage = "http://image.kyobobook.co.kr/newimages/giftshop_new/common/images/no_image2.gif";
    if(url){
        if(type){
            if(type == "product")    return product + url;
            else if(type == "brand") return brand + url;
            else                     return common + url;
        }else{
            return common + url;
        }
    }else{
        return noimage;
    }
}

/**
 * 음반경로
 * @param url
 * @param type
 * @param size
 * @returns {String}
 */
function _imgRecordUrl(rcrdCd, sellPrdtGbn, size, adultYn, ssl){
    var path;
    
    if(ssl && ssl == "Y")    path = "https://simage.kyobobook.co.kr/newimages/";
    else                     path = "http://image.kyobobook.co.kr/newimages/";
    if(!rcrdCd)              path += "giftshop_new/common/images/no_image2.gif";
    else if(adultYn == "Y"){
        if(sellPrdtGbn == "D")    path += "/giftshop_new/common/images/dvd/img_19product.jpg";
        else                      path += "/giftshop_new/common/images/music/img_19product.jpg";
    }
    
    else{
        path += "music/";
        if(!size)    path += "midi";
        else         path += size;
        path += "/" + rcrdCd.substring(1, 5).split("").reverse().join("") + "/" + rcrdCd + ".jpg";
    }
    
    return path;
}


/**
 * 하위 노드 전체 삭제
 * @param obj
 */
function _removeChild(obj){
    if(obj){
        while(obj.firstChild){
            obj.removeChild(obj.firstChild);
        }
    }
}

/**
 * 현재 노드 삭제
 * @param obj
 */
function _removeElement(obj){
    if(obj){
        obj.parentElement.removeChild(obj);
    }
}

/**
 * 엘리먼트 내 텍스트 추가
 * @param obj
 * @param text
 */
function _appendText(obj, text){
    if(obj)    obj.appendChild(document.createTextNode(text));
}

/**
 * 엘리먼트 텍스트 변경
 * @param obj
 * @param text
 */
function _setText(obj, text){
    if(obj){
        _removeChild(obj);
        _appendText(obj, text);
    }
}

/**
 * 간단한 엘리먼트 생성
 * @param elsName
 * @param text
 * @param clsName
 */
function _createSimpleElement(elsName, text, clsName, attrs){
    var obj = document.createElement(elsName);
    if(text)    _appendText(obj, text);
    if(clsName){
        for (var i = 0; i < clsName.split(" ").length;i ++){
            obj.classList.add(clsName.split(" ")[i]);
        }
    }
    if(attrs){
        for(var key in attrs){
            obj.setAttribute(key, attrs[key]);
        }
    }
    return obj;
}

/**
 * 간단한 INPUT 생성
 * @param type
 * @param name
 * @param value
 * @param clsName
 * @param title
 * @returns
 */
function _createSimpleInput(type, name, value, clsName, title){
    var obj = document.createElement("input");
    obj.type = type;
    obj.name = name;
    obj.value = value;
    if(title)    obj.title = title;
    if(clsName){
        for (var i = 0; i < clsName.split(" ").length;i ++){
            obj.classList.add(clsName.split(" ")[i]);
        }
    }
    return obj;
}

/**
 * 간단한 ANCHOR 생성
 * @param href
 * @param text
 * @param clsName
 * @param title
 * @param clickHndl
 * @returns {___obj1}
 */
function _createSimpleAnchor(href, text, clsName, title, clickHndl){
    var obj = _createSimpleElement("a", text, clsName);
    obj.href = href;
    if(title)      obj.title = title;
    if(clickHndl)  _addEvent(obj, "click", clickHndl);
    return obj;
}

/**
 * 간단한 옵션 항목 추가
 * @param value
 * @param text
 * @param clsName
 * @param selected
 * @returns {___obj0}
 */
function _createSimpleOption(value, text, clsName, selected){
    var obj = _createSimpleElement("option", text, clsName);
    obj.value = value;
    if(selected)    obj.selected = "selected";
    return obj;
}


/**
 * 간단한 IMAGE 생성
 * @param type
 * @param name
 * @param value
 * @param clsName
 * @param title
 * @returns
 */
function _createSimpleImg(name, src, clsName, title, attrs){
    var obj = _createSimpleElement("img", null, clsName, attrs);
    obj.name = name;
    obj.src = src;
    if(title){
        obj.setAttribute("title", title);
        obj.setAttribute("alt", title);
    }
    if(clsName){
        for (var i = 0; i < clsName.split(" ").length;i ++){
            obj.classList.add(clsName.split(" ")[i]);
        }
    }
    obj.setAttribute("onerror", "this.src='http://image.kyobobook.co.kr/newimages/giftshop_new/common/images/no_image2.gif';");
    return obj;
}


/**
 * 페이징 생성
 * @param pageHolder
 * @param hndl
 * @returns
 */
function _getPager(pageHolder, hndl){
    var obj = document.createElement("div");
    obj.classList.add("paging");
    
    if(pageHolder && pageHolder.totalPages > 0){
        // first
        var anchorF = document.createElement("a");
        anchorF.href = "#1";
        anchorF.classList.add("first");
        anchorF.appendChild(document.createTextNode("처음"));
        _addEvent(anchorF, "click", hndl(1));
        obj.appendChild(anchorF);
        
        // prev
        var page = pageHolder.currentPage;
        var pageSize = pageHolder.pageSize;
        
        var startPage = parseInt(Math.ceil(parseFloat(page) / parseFloat(pageSize) - 1)) * pageSize + 1;
        if(startPage > 1){
            var anchorP = document.createElement("a");
            anchorP.href = "#" + (startPage - pageHolder.pageSize);
            anchorP.classList.add("prev");
            anchorP.appendChild(document.createTextNode("이전"));
            _addEvent(anchorP, "click", hndl(startPage - pageHolder.pageSize));
            obj.appendChild(anchorP);
        }
        
        var i = startPage;
        var ul = document.createElement("ul");
        for(; i < startPage + pageHolder.pageSize && i <= pageHolder.totalPages; i++){
            var li = document.createElement("li");
            var anchorNum = document.createElement("a");
            anchorNum.href = "#" + i;
            anchorNum.appendChild(document.createTextNode(i));
            
            if(i == page){
                anchorNum.classList.add("active");
                _addEvent(anchorNum, "click", function (e){ e.preventDefault(); });
            }else {
                anchorNum.setAttribute("title", i + "페이지로 이동");
                _addEvent(anchorNum, "click", hndl(i));
            }
            
            li.appendChild(anchorNum);
            ul.appendChild(li);
        }
        obj.appendChild(ul);
        
        if(i <= pageHolder.totalPages){
            var anchorN = document.createElement("a");
            anchorN.href = "#" + i;
            anchorN.classList.add("next");
            anchorN.appendChild(document.createTextNode("다음"));
            _addEvent(anchorN, "click", hndl(i));
            obj.appendChild(anchorN);
        }
        
    }
    
    return obj;
}