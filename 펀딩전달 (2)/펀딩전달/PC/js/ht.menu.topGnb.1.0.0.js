/**
 * GNB 관련 JS
 * 작성일: 2018-09-28 14:05
 * 버전: 1.0.0
 */
// GBN검색 조건
var cond_gnb_srch = {
    emptyYn:true
  , searchMenu:"GIFT"
};

window.onload = function(){
    // 포커스시
    var frm = document.gnbSearchForm;
    if (frm != undefined) {
    	_addEvent(frm.searchTerm, "focus", function(){
    		if(!cond_gnb_srch.emptyYn)    document.gnbSearchForm.searchTerm.select();
    		else                          document.gnbSearchForm.searchTerm.value = "";
    	});
    	
    	// 키입력시
    	_addEvent(frm.searchTerm, "keyup", function(e){
    		cond_gnb_srch.emptyYn = (document.gnbSearchForm.searchTerm.value == "");
    		if (e.which == 13) {
    			gnbSrchFrm();
    		}
    	});
    	
    	// 포커스를 잃은 경우
    	_addEvent(frm.searchTerm, "blur", function(){
    		if(cond_gnb_srch.emptyYn)    document.gnbSearchForm.searchTerm.value = frm.exTxt.value;
    	});
    	
    	/*if(location.href.indexOf("record") > 0)    setGnbSrchMenu("RECORD");*/
	}
};

// GNB 검색
function gnbSrchFrm(){
    var frm = document.gnbSearchForm;
    if(frm){
        if(cond_gnb_srch.emptyYn){
            if(_isEmpty(frm.exLink.value)){
                alert("검색어를 입력해주세요");
                return false;
            }else{
                location.href = frm.exLink.value;
                return false;
            }
        }
        frm.searchTerm.value = frm.searchTerm.value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        if(_isEmpty(frm.searchTerm.value)){
        	alert("검색어를 입력해주세요");
        	return false;
        }
        for(var key in cond_gnb_srch) {
            if(frm[key]){
                frm[key].value = cond_gnb_srch[key];
            }
        }
        
        frm.submit();
    }
}

// 추천검색 클릭시
function clickGnbSrchChoice(url){
    this.style.display = "none";
    var searchTerm = document.gnbSearchForm.searchTerm;
    searchTerm.focus();
    searchTerm.select();
}

// 검색 메뉴 클릭시 이벤트
function clickGnbSrchMenu(menu){
    var div = document.getElementById("gnbSearchMenu");
    if(div){
        if(kh_element.classList.contains(div, "active")){
            setGnbSrchMenu(menu);
            kh_element.classList.remove(div, "active");
        }else{
        	kh_element.classList.add(div, "active");
        }
    }
}

// 검색 메뉴 세팅
function setGnbSrchMenu(menu) {
	alert(menu)
    cond_gnb_srch.searchMenu = menu;
    
    var div = document.getElementById("gnbSearchMenu");
    if(div){
        if(menu == "RECORD")    kh_element.classList.add(div, "chk02");
        else                    kh_element.classList.remove(div, "chk02");
    }
}