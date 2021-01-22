// 체크함수:문자열 바이트수
function Byte_Length(lvStr){
    var resultSize = 0;
    if (lvStr == null) return 0;
    for(var i=0; i<lvStr.length; i++){
        var c = escape(lvStr.charAt(i));
        if(c.length == 1) resultSize ++;
        else if(c.indexOf("%u") != -1) resultSize += 2;
        else if(c.indexOf("%") != -1) resultSize += c.length/3;
    }
    return resultSize;
}

// 체크함수:글자수
function checkLength(chkObj, printObj, maxLength){
    var str = new String($(chkObj).val());
    var _byte = 0;
    if(str.length != 0){
        for(var i = 0; i < str.length; i++){
            if(escape(str.charAt(i)).length > 4)    _byte += 2;
            else                                    _byte++;
            
            if(_byte > maxLength){
                alert('제한 글자 수를 초과하였습니다');
                $(chkObj).val(str.substr(0, i-1));
                
                if(escape(str.charAt(i)).length > 4)    _byte -= 2;
                else                                    _byte--;
                
                break;
           }
        }
    }
    $(printObj).html(Byte_Length($(chkObj).val()));
}

//체크함수:공란체크
function __chkSpace(str) {
    if(str && str.indexOf(" ") >= 0){
        return true;
    } else {
        return false;
    }
}

// 체크함수:특수 문자가 있나 없나
function __chkSpecial(str) {
    var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    if(special_pattern.test(str) == true){
        return true;
    } else {
        return false;
    }
}

function cutoff(price) {
    return Math.round(price / 10) * 10;
}

function upperNumber(price) {
    return Math.ceil(price / 10) * 10;
}

function discountNoCutPrice(price, rate) {
    var discountRate = Math.floor(rate * 10.0) / 10.0;
    var minusPrice = Math.round(price * (discountRate / 100));
    return price - minusPrice;
}

function formatDate(s, format){
    var d = new Date(s);
    if(format == null){
        return d.getFullYear() + "-" + lpad((d.getMonth() + 1), 2, '0') + "-"+ lpad(d.getDate(), 2, '0')
        + " " + lpad(d.getHours(), 2, '0') + ":" + lpad(d.getMinutes(), 2, '0') + ":" + lpad(d.getSeconds(), 2, '0');
    } else if(format == "yyyy.MM.dd"){
        return d.getFullYear() + "." + lpad((d.getMonth() + 1), 2, '0') + "."+ lpad(d.getDate(), 2, '0');
    } else if(format == "yyyy-MM-dd"){
        return d.getFullYear() + "-" + lpad((d.getMonth() + 1), 2, '0') + "-"+ lpad(d.getDate(), 2, '0');
    } else if(format == "yyyyMMdd"){
        return d.getFullYear() + lpad((d.getMonth() + 1), 2, '0') + lpad(d.getDate(), 2, '0');
    }
}

function formatDate_toString(s, format){
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
    } else if(format == "yyyyMMdd"){
        return d.getFullYear() + lpad((d.getMonth() + 1), 2, '0') + lpad(d.getDate(), 2, '0');
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

function formatNumber(val){
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

function productImageUrl(imgUrl, size){
    if(imgUrl == null || imgUrl == ""){
        return 'http://image.kyobobook.co.kr/newimages/giftshop_new/common/images/no_image2.gif';
    }else{
        return 'http://image.kyobobook.co.kr/newimages/giftshop_new/goods/' + size + '/' + imgUrl;
    }
}

function lpad(str, len, df){
    if (df == null)    df = "";
    var ret = str;
    for(var i = str/10 + 1; i < len; i++){
        ret = df + ret;
    }
    return ret;
} 

//쿠키 생성
function setCookie(cName, cValue, cDay){
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
}

// 쿠키 가져오기
function getCookie(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
        start += cName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
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
 * 접근기록
 */
function _history(){
    var obj = document.getElementById("gnbMenuBox");
    if(obj){
        var anchors = obj.getElementsByTagName("a");
        var handler = function(e){
            var href = this.href;
            var title = this.innerText;
            if(href.indexOf("#") != 0){
                var history = getCookie("__history");
                if(history && history != "")    history = JSON.parse(history);
                else                            history = {history:[]};
                
                // 최대 10개까지만
                if(history.history.length == 0 || history.history[0].href != href){
                    if(history.history.length > 9)    history.history.pop();
                    
                    var dt = new Date();
                    history.history.unshift({title:title, href:href, time:dt.getHours()+":"+dt.getMinutes()});    // unshift:앞에넣기/shift:앞에빼기/push:뒤에넣기/pop:뒤에빼기
                    setCookie("__history", JSON.stringify(history), 1);
                }
            }
        };
        
        for(var i = 0; i < anchors.length; i++){
            _addEvent(anchors[i], "click", handler);
        }
    }
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
 * script 파일 로드
 * @param value
 * @param text
 * @param clsName
 * @param selected
 */
function _loadScript(src, onload){
    var slidejs = document.createElement('script');
    slidejs.type = 'text/javascript';
    slidejs.async = true;
    slidejs.src = src;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(slidejs, s);
    
    if(onload){
        _addEvent(slidejs, "load", onload);
    }
}

/**
 * 엑셀다운로드
 * @param id
 */
function _downloadExcel(title, html) {
    var data_type = 'data:application/vnd.ms-excel;charset=utf-8';
    var table_html = encodeURIComponent(html);
  
    var a = document.createElement('a');
    a.href = data_type + ',%EF%BB%BF' + table_html;
    a.download = title + '.xls';
    a.click();
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

function _alert(msg){
    var obj = _createSimpleElement("div", null, "ly_layer");
}

// 버전별 미지원 기능 추가
kh_element = {
    classList:{
        contains:function(obj, className){
            if(obj.classList)    return obj.classList.contains(className);
            else{
                if(obj.getAttribute("class")){
                    var classList = obj.getAttribute("class").split(" ");
                    for(var i = 0; i <  classList.length; i ++){
                        if(classList[i] == className)    return true;
                    }
                }
                return false;
            }
        }
      , add:function(obj, className){
            if(obj.classList){    obj.classList.add(className); }
            else if(!kh_element.classList.contains(obj, className)){
                var str = "";
                if(obj.getAttribute("class")){
                    var classList = obj.getAttribute("class").split(" ");
                    for(var i = 0; i <  classList.length; i ++){
                        if(str != "")    str += " ";
                        str += classList[i];
                    }
                }
                
                if(str != "")    str += " ";
                str += className;
                obj.setAttribute("class", str);
            }
        }
      , remove:function(obj, className){
            if(obj.classList){    obj.classList.remove(className); }
            else if(kh_element.classList.contains(obj, className)){
                if(obj.getAttribute("class")){
                    var classList = obj.getAttribute("class").split(" ");
                    var str = "";
                    for(var i = 0; i <  classList.length; i ++){
                        if(classList[i] != className){
                            if(str != "")    str += " ";
                            str += classList[i];
                        }
                    }
                    if(str != "")    obj.setAttribute("class", str);
                    else             obj.removeAttribute("class");
                }
          }
      }
    }
};

function SHA256(s){
    
    var chrsz   = 8;
    var hexcase = 0;
  
    function safe_add (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }
  
    function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
    function R (X, n) { return ( X >>> n ); }
    function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
    function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
    function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
    function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
    function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
    function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
  
    function core_sha256 (m, l) {
         
        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1,
            0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
            0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786,
            0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
            0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147,
            0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
            0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B,
            0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
            0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A,
            0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
            0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);

        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);

        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;
  
        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;
  
        for ( var i = 0; i<m.length; i+=16 ) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];
  
            for ( var j = 0; j<64; j++) {
                if (j < 16) W[j] = m[j + i];
                else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
  
                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));
  
                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }
  
            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
    }
  
    function str2binb (str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for(var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
        }
        return bin;
    }
  
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
  
        for (var n = 0; n < string.length; n++) {
  
            var c = string.charCodeAt(n);
  
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
  
        }
  
        return utftext;
    }
  
    function binb2hex (binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
            hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
        }
        return str;
    }
  
    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
  
}