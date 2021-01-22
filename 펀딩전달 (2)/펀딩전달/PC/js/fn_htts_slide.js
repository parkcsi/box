var map = new Array();
var slSpeed = 300;
function slideDiv(slideCls, duration, prntCls){
    // init
    var size = $(slideCls).css("width").replace("px", "");
    var length = $(slideCls).find(".slide_navi").length;
    $(slideCls).find(".slide_view").css("width", (size*length)+"px");
    
    $(slideCls).find(".slide_navi").mouseover(function(){ slideView(slideCls, $(this)); });
    
    // controller
    $(prntCls).find(".slide_ctrl .next").click(function(){ slideNext(slideCls); });
    $(prntCls).find(".slide_ctrl .prev").click(function(){ slidePrev(slideCls); });
    $(prntCls).find(".slide_ctrl .stop").click(function(){
        if($(this).hasClass("pause")){
            map[slideCls] = setInterval("slideNext('"+slideCls+"')", duration);
            $(this).removeClass("pause");
        }else{
            clearInterval(map[slideCls]);
            map[slideCls] = null;
            $(this).addClass("pause");
        }
    });
    
    // timer
    if(duration != undefined && duration > 0){
        map[slideCls] = setInterval("slideAuto('"+slideCls+"')", duration);
        $(slideCls).hover(
            function(){ $(this).addClass("slide_over"); }
          , function(){ $(this).removeClass("slide_over"); }
        );
    }
}

function slideView(slideCls, element){
    if($(slideCls).find(".slide_navi_img").length > 0){
        $(slideCls).find(".active .slide_navi_img").attr("src",$(slideCls).find(".active .slide_navi_img").attr("src").replace("_on", "_off"));
        element.find(".slide_navi_img").attr("src", element.find(".slide_navi_img").attr("src").replace("_off", "_on"));
    }
    var size = $(slideCls).css("width").replace("px", "");
    
    var idx = $(slideCls).find(".slide_navi").index(element);
    $(slideCls).find(".slide_navi.active").removeClass("active");
    element.addClass("active");
    
    $(slideCls).find(".slide_view").animate({left:size*(idx)*(-1)}, slSpeed);
    $(slideCls).find(".main_slide_img").find(".bnrTitle").removeClass("active");
    $(slideCls).find(".main_slide_img").find(".bnrSubTitle").removeClass("active");
    $(slideCls).find(".main_slide_img").find(".imgAlt").removeClass("active");
    
    $(slideCls).find(".main_slide_img").eq(idx).find(".bnrTitle").addClass("active");
    $(slideCls).find(".main_slide_img").eq(idx).find(".bnrSubTitle").addClass("active");
    $(slideCls).find(".main_slide_img").eq(idx).find(".imgAlt").addClass("active");
}

function slideNext(slideCls){
    var index = $(slideCls).find(".slide_navi").index($(slideCls).find(".slide_navi.active"));
    var length = $(slideCls).find(".slide_navi").length;
    
    if(index + 1 < length)    slideView(slideCls, $(slideCls).find(".slide_navi").eq(index+1));
    else                      slideView(slideCls, $(slideCls).find(".slide_navi").first());
}

function slidePrev(slideCls){
    var index = $(slideCls).find(".slide_navi").index($(slideCls).find(".slide_navi.active"));
    
    if(0 < index)    slideView(slideCls, $(slideCls).find(".slide_navi").eq(index-1));
    else             slideView(slideCls, $(slideCls).find(".slide_navi").last());
}

function slideAuto(slideCls){
    if(!$(slideCls).hasClass("slide_over")){
        slideNext(slideCls);
    }
}

/**
 * 최초에 보니는 페이지를 랜덤으로 잡음
 * @param slideCls
 */
function initRand(slideCls){
    var length = $(slideCls).find(".slide_navi").length;
    var now = new Date();
    var idx = Math.floor(now.getSeconds()%length);
    //console.log(now.getSeconds() +">>>"+idx);
    var element = $(slideCls).find(".slide_navi").eq(idx);
    
    if($(slideCls).find(".slide_navi_img").length > 0){
        $(slideCls).find(".active .slide_navi_img").attr("src",$(slideCls).find(".active .slide_navi_img").attr("src").replace("_on", "_off"));
        element.find(".slide_navi_img").attr("src", element.find(".slide_navi_img").attr("src").replace("_off", "_on"));
    }
    var size = $(slideCls).css("width").replace("px", "");
    
    var idx = $(slideCls).find(".slide_navi").index(element);
    $(slideCls).find(".slide_navi.active").removeClass("active");
    element.addClass("active");
    
    $(slideCls).find(".slide_view").css("left",size*(idx)*(-1));
}
