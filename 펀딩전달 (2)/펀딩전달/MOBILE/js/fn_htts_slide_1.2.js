var map = new Array();
var slSpeed = 300;
function slideDiv(slideCls, duration){
    var size = 0;
    if($(slideCls).hasClass("slVertical"))    size = $(slideCls).find(".slView").first().height();
    else                                      size = $(slideCls).find(".slView").first().width();
    
    // init
    $(slideCls).find(".slView").each(function(idx){
        if($(slideCls).hasClass("slVertical"))    $(this).css("top", (size*idx)+"px");
        else                                      $(this).css("left", (size*idx)+"px");
    });
    
    // onfocus
    $(slideCls).find(".slPg").focusin(function(){
        slideView(slideCls, $(this));
    });
    
    // onhover
    $(slideCls).find(".slPg").hover(function(){
        slideView(slideCls, $(this));
    });
    
    // controller
    $(slideCls).find(".controller .next").click(function(){ slideNext(slideCls); });
    $(slideCls).find(".controller .pre").click(function(){ slidePrev(slideCls); });
    $(slideCls).find(".controller .stop").toggle(
        function(){ clearInterval(map[slideCls]);map[slideCls] = null;$(this).addClass("pause"); }
      , function(){ map[slideCls] = setInterval("slideNext('"+slideCls+"')", duration);$(this).removeClass("pause"); }
    );
    
    // timer
    if(duration != undefined && duration > 0){
        map[slideCls] = setInterval("slideAuto('"+slideCls+"')", duration);
        $(slideCls).hover(
            function(){ $(this).addClass("slOver"); }
          , function(){ $(this).removeClass("slOver"); }
        );
    }
}

function slideView(slideCls, element){
    if($(slideCls).find(".slPgImg").length > 0){
        $(slideCls).find(".on .slPgImg").attr("src",$(slideCls).find(".on .slPgImg").attr("src").replace("_on", "_off"));
        element.find(".slPgImg").attr("src", element.find(".slPgImg").attr("src").replace("_off", "_on"));
    }
    $(slideCls).find(".slTarget.on").removeClass("on");
    element.parents(".slTarget").addClass("on");
    
    var size = 0;
    //if($(slideCls).hasClass("slVertical"))    size = $(slideCls).find(".slView:first").height();
    //else                                      size = $(slideCls).find(".slView:first").width();
    
    size = $(".slide_inDiv").width();
    //console.log("size : "+size );
    
    $(slideCls).find(".slView").each(function(idx){
        var onLi = $(slideCls).find(".slTarget").index($(slideCls).find(".slTarget.on"));
        if($(slideCls).hasClass("slVertical"))    $(this).css({top:(size*(idx-onLi))+"px"});
        else{
            
            if($(this).parent().hasClass("on")){
                $(this).show();
                $(this).css({left:(size*(idx-onLi))+"px"});
                $(this).css({border:"1px solid blue", width:size, "display":"inline-block", height:"auto", float : "left", "margin-left" : "1%", "margin-right" : "1%"});
                
            }else{
                $(this).hide();
            }
        }
    });
}

function slideAni(slideCls, element){
    if($(slideCls).find(".slTarget.on .slPgImg").attr("src") != undefined)
        $(slideCls).find(".slTarget.on .slPgImg").attr("src", $(slideCls).find(".slTarget.on .slPgImg").attr("src").replace("_on", "_off"));
    $(slideCls).find(".slTarget.on").removeClass("on");
    
    if(element.find(".slPgImg").attr("src") != undefined)
        element.find(".slPgImg").attr("src", element.find(".slPgImg").attr("src").replace("_off", "_on"));
    element.parents(".slTarget").addClass("on");
    
    var size = 0;
    if($(slideCls).hasClass("slVertical"))    size = $(slideCls).find(".slView").first().height();
    else                                      size = $(slideCls).find(".slView").first().width();
    
    $(slideCls).find(".slView").each(function(idx){
        var onLi = $(slideCls).find(".slTarget").index($(slideCls).find(".slTarget.on"));
        if($(slideCls).hasClass("slVertical")){
            $(this).animate({top:(size*(idx-onLi))+"px"}, slSpeed);
            $(slideCls).find(".ht_tit").css("z-index", 3);
            $(slideCls).find(".slView").css("z-index", 1);
            if($(slideCls).find(".controller").css("z-index") != undefined)    $(slideCls).find(".controller").css("z-index", 3);
        }
        else                                  $(this).animate({left:(size*(idx-onLi))+"px"}, slSpeed);
    });
}

function slideNext(slideCls){
    var length = $(slideCls).find(".slTarget").length;
    var index = $(slideCls).find(".slTarget").index($(slideCls).find(".slTarget.on"));
    
    if(length > index + 1)    slideView(slideCls, $(slideCls).find(".slPg").eq(index+1));
    else                      slideView(slideCls, $(slideCls).find(".slPg").first());
}

function slidePrev(slideCls){
    var index = $(slideCls).find(".slTarget").index($(slideCls).find(".slTarget.on"));
    
    if(0 < index)    slideView(slideCls, $(slideCls).find(".slPg").eq(index-1));
    else             slideView(slideCls, $(slideCls).find(".slPg").last());
}

function slideAuto(slideCls){
    if(!$(slideCls).hasClass("slOver")){
        var length = $(slideCls).find(".slTarget").length;
        var index = $(slideCls).find(".slTarget").index($(slideCls).find(".slTarget.on"));
        
        if(length > index + 1)    slideAni(slideCls, $(slideCls).find(".slPg").eq(index+1));
        else                      slideAni(slideCls, $(slideCls).find(".slPg").first());
    }
}
