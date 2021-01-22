$(function(){
    $(window).resize();
    
    /* 탭메뉴 */
    $(".tab_cont:not("+$(".tab_btn a.on").attr("href")+")").hide();
    $(".tab_btn li a").click(function(){
        $(".tab_btn li a").removeClass("on");
        $(this).addClass("on");
        $(".tab_cont").hide();
        $($(this).attr("href")).show();
        return false;
    });

    /* 탭메뉴:sub */
    $(".stab_cont:not("+$(".stab_btn a.on").attr("href")+")").hide();
    $(".stab_btn li a").click(function(){
        $(".stab_btn li a").removeClass("on");
        $(this).addClass("on");
        $(".stab_cont").hide();
        $($(this).attr("href")).show();
        return false;
    });
    
    /* 아코디언 */
    $('.accordion > li > a').click(function(){
        if($(this).hasClass("on")){
            $(this).removeClass('on');
        }else{
            $('.accordion > li a').removeClass('on');
            $(this).addClass('on');
        }
    });
    
    $(".select_box").click(function(){
        if($(this).hasClass("active")){
            $(this).removeClass("active");
        }else{
            $(".select_box.active").removeClass("active");
            $(this).addClass("active");
        }
    });
    
    /*var timeCheck01,timeCheck02;
    $(document).ready(function(){
        if(location.href.indexOf('/detail/') < 0 && location.href.indexOf('/setting') < 0 && location.href.indexOf('/order') < 0){
            if(location.href.indexOf('/m/idol/specialDetail') < 0 && location.href.indexOf('/m/idol/newsDetail') < 0 && location.href.indexOf('/m/biz/search/searchMain') < 0){
                $("body")
                .append("<a href=\"javascript:locBack();\" id=\"btnBack\" class=\"foot_btn btn_back\">뒤로가기</a>")
                .append("<a href=\"#\" onclick=\"moveTop();return false;\" id=\"btnTop\" class=\"foot_btn btn_top_v2\">위로가기</a>")
                .append("<a href=\"#\" onclick=\"openSide();return false;\" id=\"btnSidem\" class=\"foot_btn btn_sidem\">사이드메뉴</a>");
                
                $(window).scroll(function(){
                    if($("#btnBack").is(":hidden")){
                        $("#btnBack,#btnTop,#btnSidem").fadeIn("fast");
                        
                        $("#btnBack,#btnTop,#btnSidem").addClass("moved");
                        
                        moveCheck();
                    }
                });
            }else if(location.href.indexOf('/m/idol/specialDetail') >0 || location.href.indexOf('/m/idol/newsDetail') >0){
                $("body")
                .append("<a href=\"javascript:locBack();\" id=\"btnBack\" class=\"foot_btn btn_back\">뒤로가기</a>")
                .append("<a href=\"#\" onclick=\"moveTop();return false;\" id=\"btnTop\" class=\"foot_btn btn_top_v2\">위로가기</a>");
            }
            else{
                $("body")
                .append("<a href=\"javascript:locBack();\" id=\"btnBack\" class=\"foot_btn btn_back\">뒤로가기</a>")
                .append("<a href=\"#\" onclick=\"moveTop();return false;\" id=\"btnTop\" class=\"foot_btn btn_top_v2\">위로가기</a>");
                
                $(window).scroll(function(){
                    if($("#btnBack").is(":hidden")){
                        $("#btnBack,#btnTop,#btnDown,#btnSidem").fadeIn("fast");
                        $("#btnBack,#btnTop,#btnDown,#btnSidem").addClass("moved");
                        
                        moveCheck();
                    }
                });
            }
            
            function moveCheck(){
                clearTimeout(timeCheck01);
                timeCheck01 = setTimeout(function(){
                    if($("#btnBack").hasClass("moved")){
                        $("#btnBack,#btnTop,#btnDown,#btnSidem").removeClass("moved");
                        moveCheck();
                    } else{
                        $("#btnBack,#btnTop,#btnDown,#btnSidem").fadeOut("slow");
                    } 
                }, 2000);
            }
        }
        
        
        var userAgent = navigator.userAgent.toUpperCase();
        if (!location.href.match(/eventId=42347/)){
            if (   userAgent.match(/ANDROID/)
                    && getCookie("LayerAltApp") != "Y"
                    // || userAgent.match(/IPHONE/) || userAgent.match(/IPAD/)
                   ) {
                    if (!userAgent.match(/HOTTRACKSAPP/)){
                        $("#devLayer").show();
                    } else if(window.HybridApp.hasOldVersion != undefined && window.HybridApp.hasOldVersion){
                        $("#devLayer002").show();
                    } else {
                        $("#devLayer002").show();
                    }
                }
        }
        
        moreGnbCheck();
        $("#topMenu").scroll(function(){
            $(this).find(".btn_more").hide();
            moreGnbCheck();
        });
    })
    .unload(function(){
        Fn_initLayer();
    });*/
});

// 열려 있는 메뉴 레이어 초기화
function Fn_initLayer(){
    $("#cate-menu").css({left:"-100%"});
    $("#gnb-search").css({left:"-100%"});
    $("#ly_recent").css({top:"100%"}).css("z-index", "990");
    $(".detail_input").removeClass("active");
    $("#wrap").css({position:"initial"});
}

// 레이어 오픈 전 기본작업
function Fn_initLayer4Open(){
    Fn_initLayer();
    $("#wrap").css({position:"fixed"});
}

function openGnbMenu() {
    Fn_initLayer4Open();
    $("#cate-menu").animate({left:"0"}, 500);
}

function closeGnbMenu(){
    $("#cate-menu").animate({left:"-100%"}, 500, Fn_initLayer);
};

function openGnbSearch() {
    if($("form[name=searchedForm]").length > 1){
        gnbSrchFrm();
    }else{
        Fn_initLayer4Open(); 
        $("#gnb-search").animate({left:"0"}, 500);
    }
}

function closeGnbSearch(){
    $("#gnb-search").animate({left:"-100%"}, 500, Fn_initLayer);
};

function openRecent(){
    if($("#ly_recent").text() != ""){
        closeRecent();
    }else{
        Fn_initLayer4Open();
        $("#ly_recent").load("/m/hot/recent", function(){ $(this).animate({top:$("#header").height()}, function(){ $(this).css("z-index", "999"); }); });
    }
}

function closeRecent(){
    $("#ly_recent").css("z-index", "990").animate({top:"100%"}, function(){ $(this).empty();Fn_initLayer(); });
}

/**
 * 좋아요 결과 레이어
 * @param gbn
 */
function showLikeComplete(gbn){
    var div = document.createElement("div");
    var img = document.createElement("img");
    div.setAttribute("id", "likeLayer");
    if(gbn == "A"){           // 상품좋아요 등록
        img.setAttribute("src", "http://image.kyobobook.co.kr/newimages/giftshop_new/common/images/mobile/common/addWish.png");
    } else if(gbn == "D"){     // 상품좋아요 취소
        img.setAttribute("src", "http://image.kyobobook.co.kr/newimages/giftshop_new/common/images/mobile/common/removeWish.png");
    } else if(gbn == "B"){     // 브랜드좋아요 등록
        img.setAttribute("src", "http://image.kyobobook.co.kr/newimages/giftshop_new/common/images/mobile/common/addWishBrand.png");
    } else if(gbn == "E"){     // 브랜드좋아요 등록
        img.setAttribute("src", "http://image.kyobobook.co.kr/newimages/giftshop_new/common/images/mobile/common/removeWishBrand.png");
    }
    div.appendChild(img);
    document.body.appendChild(div);
    setTimeout(function(){ document.body.removeChild(div); }, 1000);
}

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

(function ($) {

    $.fn.fnTab = function (options) {
        return this.each(function () {
            var that = $(this);
            var opts = $.extend({}, $.fn.fnTab.option, options || {});
            options = options || {};

            that.find(opts.selector).click(function () {
                var elm = $(this);
                if (!elm.siblings().length) {
                    elm.addClass(opts.activeClass).parent().siblings().find(opts.selector).removeClass(opts.activeClass);
                    $('.' + opts.contentClass).hide(opts.speed);
                    $(elm.attr('href')).show(opts.speed);
                    $(elm.parent().siblings().find(opts.selector).attr('href')).hide(opts.speed);
                } else {
                    elm.addClass(opts.activeClass).siblings().removeClass(opts.activeClass);
                    $('.' + opts.contentClass).hide(opts.speed);
                    $(elm.attr('href')).show(opts.speed);
                }
                if (opts.callback) {
                    opts.callback();
                } 
                return false;
            });
            var bIdx = 1;
            if (opts.roof == true) {
                that.find(opts.selector).eq(opts.defaultCont - 1).trigger('click');
                setInterval(function () {
                    bIdx = bIdx - 1 ;
                    if (bIdx == 0) {
                        bIdx = $('.' + opts.contentClass).length;
                    }
                    that.find(opts.selector).eq(opts.defaultCont - bIdx).trigger('click');
                }, opts.roofTime);
            } else {
                that.find(opts.selector).eq(opts.defaultCont - 1).trigger('click');
            }
        });
    };
    $.fn.fnTab.option = {
        defaultCont: 1, //기본 보여지는 콘텐츠
        activeClass: 'on', //활성화클래스
        selector: 'a', //선택자
        speed: 0, //콘텐츠보여지는 속도
        contentClass: 'tab_cont', //콘텐츠 공통클래스
        callback: false, 
        roof: false,
        roofTime: 3000
    };

})(jQuery);