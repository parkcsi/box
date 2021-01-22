var imageServer = "http://image.kyobobook.co.kr/newimages/giftshop_new/work/";
$(document).ready(function(){
    if($("[name='userTmplHtml']").val().indexOf("##template##") > -1){
        initTemplate();
    }else{
        $("#userTemplate").html($("[name='userTmplHtml']").val());
    }
});

function initTemplate(){
    var tmplType = $("[name='userTmplHtml']").val().split('##type##')[1];
    // _mkTypeE();
    if(tmplType == 'A')         _mkTypeA();
    else if(tmplType == 'B')    _mkTypeB();
    else if(tmplType == 'C')    _mkTypeC();
    else if(tmplType == 'D')    _mkTypeD();
    else if(tmplType == 'E')    _mkTypeE();
}

function _mkTypeA(){
    var tmplType = $("[name='userTmplHtml']").val().split('##type##')[1];
    var mainImg = $("[name='userTmplHtml']").val().split('##mainImg##')[1];
    var mainMap = $("[name='userTmplHtml']").val().split('##mainMap##')[1];
    var footImg = $("[name='userTmplHtml']").val().split('##footImg##')[1];
    var footMap = $("[name='userTmplHtml']").val().split('##footMap##')[1];
    var source = '';
    var foot = '';
    
    source += '<div style="text-align:center; width:100%; margin:0; height :auto;">';
    if(!isEmpty(mainImg))    source += '<p><img src="'+getImgUrl(mainImg)+'" useMap="#mainImg" class="detail-img"/>';
    if(!isEmpty(mainMap))    source += mainMap+'</p>';
    else source +='</p>';
    
    var movie = $("[name='userTmplHtml']").val().split('##movie##')[1];
    var movieBg = $("[name='userTmplHtml']").val().split('##movieBg##')[1];
    if(isEmpty(movieBg)){
        source += '<p>'+movie+'</p>';
    }else{
        source += '<p style="background:url(\'http://image.kyobobook.co.kr/newimages/giftshop_new/work/'+movieBg+'\') no-repeat;background-size:100% auto;padding:0;margin:0;">'+movie+'</p>';
    }
    if(!isEmpty(mainMap))    source += '<map name="mainMap">'+mainMap+'</map>';
    
    if(!isEmpty(footImg)){
        source += '<p><img src="'+getImgUrl(footImg)+'" useMap="#footMap"/>';
        if(!isEmpty(footMap))    source += '<map name="footMap">'+footMap+'</map></p>';
        else source += '</p>';
        source += '</div>';
        $("#header_userTemplate").html(source);
    }
    
    iframe = $("#header_userTemplate").find("iframe");
    iframe.attr("width", "100%");
    iframe.removeAttr("height");
}

function _mkTypeB(){
    var tmplType = $("[name='userTmplHtml']").val().split('##type##')[1];
    var mainImg = $("[name='userTmplHtml']").val().split('##mainImg##')[1];
    var mainMap = $("[name='userTmplHtml']").val().split('##mainMap##')[1];
    var footImg = $("[name='userTmplHtml']").val().split('##footImg##')[1];
    var footMap = $("[name='userTmplHtml']").val().split('##footMap##')[1];
    var source = '';
    var foot = '';
    
    source += '<div style="text-align:center; width:100%; margin:0; height :auto;">';
    if(!isEmpty(mainImg))    source += '<p><img src="'+getImgUrl(mainImg)+'" useMap="#mainImg" class="detail-img"/>';
    if(!isEmpty(mainMap))    source += mainMap+'</p>';
    else source +='</p>';
    
    var bnrImg = new Array();
    var bnrLnk = new Array();
    for(var i=0; i<8; i++){
        bnrLnk[i] = $("[name='userTmplHtml']").val().split('##bnrLnk'+i+'##')[1];
        bnrImg[i] = $("[name='userTmplHtml']").val().split('##bnrImg'+i+'##')[1];
    }
    var wrap = '';
    wrap += "<li class ='swiper-slide'>";wrap += '<a href="'+bnrLnk[0]+'" class=\'full\'><p class="pic_full"><img src="'+getImgUrl(bnrImg[0])+'"/></p></a>';wrap += '</li>';
    
    for(var i=1; i<8; i++){
        if(!isEmpty(bnrImg[i])){
            wrap += "<li class ='swiper-slide'>";wrap += '<a href="'+bnrLnk[i]+'" class=\'full\'><p class="pic_full"><img src="'+getImgUrl(bnrImg[i])+'"/></p></a>';wrap += '</li>';
        }
    }
    wrap += '</div>';
    
    $(".visual > .swiper-container > .swiper-wrapper").html(wrap);
    source += '</div>';
    source += '</div>';
    $("#header_userTemplate").html(source);
    
    if(!isEmpty(footImg)){
        foot += '<p><img src="'+getImgUrl(footImg)+'" useMap="#footMap" class="detail-img"/>';
        if(!isEmpty(footMap))    foot += footMap+'</p>';
        else foot +='</p>';
        $("#footer_userTemplate").html(foot);
    }
}

//타입C형
function _mkTypeC(){
    var template = $("[name='userTmplHtml']").val();
    var json = chkVal(template.split("##json##")[1]);
    var data = JSON.parse(json);
    
    var obj = document.getElementById("header_userTemplate");
    _removeChild(obj);
    
    if(data){
        var div = _createSimpleElement("div", null, "e_typeC");
        // TYPE01
        if(data.type01){
            var _val = data.type01;
            var type01 = _createSimpleElement("div", null, "e_type01", {style:"background:url('http://image.kyobobook.co.kr/newimages/giftshop_new/work/" + _val[0].value + "') center center no-repeat #e1e6e9;background-size:auto 100%;"});
            type01.appendChild(_createSimpleElement("span", _val[1].value, "txt1"));
            type01.appendChild(_createSimpleElement("span", _val[2].value, "txt2"));
            div.appendChild(type01);
        }
        // TYPE02
        if(data.type02){
            var _val = data.type02;
            var type02 = _createSimpleElement("div", null, "e_type02", {style:"background-color:" + _val[0].value });
            type02.appendChild(_createSimpleElement("span", null, "line1"));
            type02.appendChild(_createSimpleElement("span", _val[1].value, "txt1"));
            type02.appendChild(_createSimpleElement("span", _val[2].value, "txt2"));
            div.appendChild(type02);
        }
        // TYPE03
        if(data.type03){
            var _val = data.type03;
            var type03 = _createSimpleElement("div", null, "e_type03", {style:"background:url('http://image.kyobobook.co.kr/newimages/giftshop_new/work/" + _val[0].value + "') center center no-repeat #424345;background-size:auto 100%;" });
            var over03 = _createSimpleElement("div", null, "over1");
            // TIT
            over03.appendChild(_createSimpleElement("span", _val[1].value, "tit1"));
            
            // 01
            var span01 = _createSimpleElement("span", null, "stit1");
            span01.appendChild(_createSimpleElement("em", "01"));
            _appendText(span01, _val[2].value);
            over03.appendChild(span01);
            over03.appendChild(_createSimpleElement("span", _val[3].value, "txt1"));
            
            // 02
            var span02 = _createSimpleElement("span", null, "stit2");
            span02.appendChild(_createSimpleElement("em", "02"));
            _appendText(span02, _val[4].value);
            over03.appendChild(span02);
            over03.appendChild(_createSimpleElement("span", _val[5].value, "txt2"));
            
            // 03
            var span03 = _createSimpleElement("span", null, "stit3");
            span03.appendChild(_createSimpleElement("em", "03"));
            _appendText(span03, _val[6].value);
            over03.appendChild(span03);
            over03.appendChild(_createSimpleElement("span", _val[7].value, "txt3"));
            
            type03.appendChild(over03);
            div.appendChild(type03);
        }
        // TYPE04
        if(data.type04){
            var _val = data.type04;
            var type04 = _createSimpleElement("div", null, "e_type04");
            type04.appendChild(_createSimpleElement("div", null, "sbg", {style:"background-color:" + _val[0].value }));
            
            type04.appendChild(_createSimpleImg(null, "http://image.kyobobook.co.kr/newimages/giftshop_new/work/" + _val[1].value, "img1"));
            
            type04.appendChild(_createSimpleElement("span", _val[4].value, "txt1"));
            type04.appendChild(_createSimpleElement("span", _val[5].value, "txt2"));
            
            type04.appendChild(_createSimpleImg(null, "http://image.kyobobook.co.kr/newimages/giftshop_new/work/" + _val[2].value, "img2"));
            type04.appendChild(_createSimpleImg(null, "http://image.kyobobook.co.kr/newimages/giftshop_new/work/" + _val[3].value, "img3"));
            
            div.appendChild(type04);
        }
        // TYPE05
        if(data.type05){
            var _val = data.type05;
            var type05 = _createSimpleElement("div", null, "e_type05", {style:"background:url('http://image.kyobobook.co.kr/newimages/giftshop_new/work/" + _val[0].value + "') center center no-repeat #e2e6e9;background-size:auto 100%;" });
            var over05 = _createSimpleElement("div", null, "over1");
            over05.appendChild(_createSimpleElement("span", null, "line1"));
            over05.appendChild(_createSimpleElement("span", _val[1].value, "txt1"));
            over05.appendChild(_createSimpleElement("span", _val[2].value, "txt2"));
            over05.appendChild(_createSimpleElement("span", _val[3].value, "txt3"));
            type05.appendChild(over05);
            div.appendChild(type05);
        }
        obj.appendChild(div);
    }
}

//타입D형
function _mkTypeD(){
    
    var template = $("[name='userTmplHtml']").val();
    var json = chkVal(template.split("##json##")[1]);
    var data = JSON.parse(json);
    /*
    var data = [
       [  {type:"img", name:"type01bg", text:"배경이미지", value:"1459/1536123298078_img01_1920x810.png", hint:"1920 x 810"}
        , {type:"link", name:"type01link", text:"이동경로", value:"#"}
        , {type:"text", name:"type01txt01", text:"텍스트01", value:"일이삼사오육\r\n일이삼사오육칠팔구"}
        , {type:"text", name:"type01txt02", text:"텍스트02", value:"일이삼사오육칠팔구십일이삼사오육칠팔"}
        , {type:"text", name:"type01txt03", text:"텍스트03", value:"~4%"}
       ]
     , [  {type:"img", name:"type01bg", text:"배경이미지", value:"1459/1536123298078_img01_1920x810.png", hint:"1920 x 810"}
        , {type:"link", name:"type01link", text:"이동경로", value:"#"}
        , {type:"text", name:"type01txt01", text:"텍스트01", value:"일이삼사오육\r\n일이삼사오육칠팔구"}
        , {type:"text", name:"type01txt02", text:"텍스트02", value:"일이삼사오육칠팔구십일이삼사오육칠팔"}
        , {type:"text", name:"type01txt03", text:"텍스트03", value:"~4%"}
       ]
     , [  {type:"img", name:"type01bg", text:"배경이미지", value:"1459/1536123298078_img01_1920x810.png", hint:"1920 x 810"}
        , {type:"link", name:"type01link", text:"이동경로", value:"#"}
        , {type:"text", name:"type01txt01", text:"텍스트01", value:"일이삼사오육\r\n일이삼사오육칠팔구"}
        , {type:"text", name:"type01txt02", text:"텍스트02", value:"일이삼사오육칠팔구십일이삼사오육칠팔"}
        , {type:"text", name:"type01txt03", text:"텍스트03", value:"~4%"}
       ]
     , [  {type:"img", name:"type01bg", text:"배경이미지", value:"1459/1536123298078_img01_1920x810.png", hint:"1920 x 810"}
        , {type:"link", name:"type01link", text:"이동경로", value:"#"}
        , {type:"text", name:"type01txt01", text:"텍스트01", value:"일이삼사오육\r\n일이삼사오육칠팔구"}
        , {type:"text", name:"type01txt02", text:"텍스트02", value:"일이삼사오육칠팔구십일이삼사오육칠팔"}
        , {type:"text", name:"type01txt03", text:"텍스트03", value:"~4%"}
       ]
     , [  {type:"img", name:"type01bg", text:"배경이미지", value:"1459/1536123298078_img01_1920x810.png", hint:"1920 x 810"}
        , {type:"link", name:"type01link", text:"이동경로", value:"#"}
        , {type:"text", name:"type01txt01", text:"텍스트01", value:"일이삼사오육\r\n일이삼사오육칠팔구"}
        , {type:"text", name:"type01txt02", text:"텍스트02", value:"일이삼사오육칠팔구십일이삼사오육칠팔"}
        , {type:"text", name:"type01txt03", text:"텍스트03", value:"~4%"}
       ]
    ];
    */
    var obj = document.getElementById("header_userTemplate");
    _removeChild(obj);
    
    if(data){
        var div = _createSimpleElement("div", null, "e_typeD swipe-main2");
        var slide_box = _createSimpleElement("div", null, "slide_box swiper-container");
        div.appendChild(slide_box);
        var slide_view = _createSimpleElement("ul", null, "slide_view swiper-wrapper");
        slide_box.appendChild(slide_view);
        var slide_navi_box = _createSimpleElement("ul", null, "slide_navi_box pagination");
        div.appendChild(slide_navi_box);
        
        var cnt = 0;
        for(var i = 0; i <  data.length; i++){
           var _val = data[i];
           if(!_isEmpty(_val[0].value)){
               cnt++;
               
               var slide_cont = _createSimpleElement("li", null, "slide_cont swiper-slide", {style:"background:url('http://image.kyobobook.co.kr/newimages/giftshop_new/work/" + _val[0].value + "') center top no-repeat;"});
               var cont = _createSimpleAnchor(_val[1].value, null, "cont");
               cont.appendChild(_createSimpleElement("em", _val[4].value));
               cont.appendChild(_createSimpleElement("strong", _val[2].value));
               cont.appendChild(_createSimpleElement("span", _val[3].value));
               slide_cont.appendChild(cont);
               slide_view.appendChild(slide_cont);
               
               var slide_navi = _createSimpleAnchor("javascript://", cnt, "slide_navi");
               if(cnt == 1)    slide_navi.classList.add("active");
               slide_navi_box.appendChild(slide_navi);
           }
        }
        obj.appendChild(div);
        
        if(cnt > 1){
            var welcomeSwiper = new Swiper('.swipe-main2 .swiper-container',{
                pagination: '.swipe-main2 ul.pagination',
                loop:true,
                grabCursor: true,
                paginationClickable: true,
                autoplay: 3000,
                autoplayDisableOnInteraction: false
            });
        }else{
            slide_navi_box.style.display = "none";
        }
    }
}

//타입D형
function _mkTypeE(){
    
    var template = $("[name='userTmplHtml']").val();
    var json = chkVal(template.split("##json##")[1]);
    var data = JSON.parse(json);
    /*
    var data = [
     [  {type:"link", name:"type01link", text:"이동경로", value:"#"}
      , {type:"text", name:"type01txt01", text:"텍스트01", value:"most"}
      , {type:"text", name:"type01txt02", text:"텍스트02", value:"작지만 확실한 행복"}
      , {type:"text", name:"type01txt03", text:"텍스트03", value:"#일이삼사오육칠팔구 #일이삼사오육칠팔구"}
      , {type:"text", name:"type01txt03", text:"텍스트04", value:"~10"}
     ]
     , [  {type:"img", name:"type01bg", text:"배경이미지", value:"1459/1536123298078_img01_1920x810.png", hint:"1920 x 810"} ]
     , [  {type:"img", name:"type01bg", text:"배경이미지", value:"1459/1536123298078_img01_1920x810.png", hint:"1920 x 810"} ]
     , [  {type:"img", name:"type01bg", text:"배경이미지", value:"1459/1536123298078_img01_1920x810.png", hint:"1920 x 810"} ]
    ];
    */
    var obj = document.getElementById("header_userTemplate");
    _removeChild(obj);
    
    if(data){
        var div = _createSimpleElement("div", null, "e_typeE swipe-main2");
        var slide_box = _createSimpleElement("div", null, "slide_box swiper-container");
        div.appendChild(slide_box);
        var slide_view = _createSimpleElement("ul", null, "slide_view swiper-wrapper");
        slide_box.appendChild(slide_view);
        var slide_navi_box = _createSimpleElement("ul", null, "slide_navi_box pagination");
        div.appendChild(slide_navi_box);
        
        var _val = data[0];
        var cont = _createSimpleAnchor(_val[0].value, null, "cont");
        cont.appendChild(_createSimpleElement("p", _val[1].value, "stit"));
        cont.appendChild(_createSimpleElement("p", _val[2].value, "tit"));
        cont.appendChild(_createSimpleElement("p", _val[3].value, "keywords"));
        var rate = _createSimpleElement("p", _val[4].value, "rate");
        // rate.appendChild(_createSimpleElement("em", "%"));
        cont.appendChild(rate);
        slide_box.appendChild(cont);
        
        var cnt = 0;
        for(var i = 1; i <  data.length; i++){
           _val = data[i];
           if(!_isEmpty(_val[0].value)){
               cnt++;
               
               slide_view.appendChild(_createSimpleElement("li", null, "slide_cont swiper-slide", {style:"background:url('http://image.kyobobook.co.kr/newimages/giftshop_new/work/" + _val[0].value + "') left center no-repeat;"}));
           
           var slide_navi = _createSimpleAnchor("javascript://", cnt, "slide_navi");
           if(cnt == 1)    slide_navi.classList.add("active");
               slide_navi_box.appendChild(slide_navi);
           }
        }
        obj.appendChild(div);
        
        var welcomeSwiper = new Swiper('.swipe-main2 .swiper-container',{
            pagination: '.swipe-main2 ul.pagination',
            loop:true,
            grabCursor: true,
            paginationClickable: true,
            autoplay: 2000,
            autoplayDisableOnInteraction: false
        });
    }
}

function chkVal(value){
    if (value == null || value == undefined){
        return "";
    }else{
        return value;
    }
}
function getImgUrl(imgUrl){
    if(imgUrl != ""){
        return imageServer + imgUrl;
    }else{
        return "http://image.kyobobook.co.kr/newimages/giftshop_new/common/images/no_image2.gif";
    }
}