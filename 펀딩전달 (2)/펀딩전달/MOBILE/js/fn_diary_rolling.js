var map = new Array();
function setOverRolling(cls, timespeed){
    $(cls).find(".target").find(".targetPg").hover(function(){
        var preTarget = $(cls).find(".on");
        var curTarget = $(this).parents(".target");
        blurView(preTarget, false);
        focusView(curTarget, false);
    });
    $(cls).find(".target").find(".targetPg").focus(function(){
        var preTarget = $(cls).find(".on");
        var curTarget = $(this).parents(".target");
        blurView(preTarget, false);
        focusView(curTarget, false);
    });
    
    $(cls).hover(function(){$(this).addClass("stopRolling");},function(){$(this).removeClass("stopRolling");});
    
    // play and stop, next, prev
    var ctrl = $(cls).find(".controller");
    if(ctrl.length == 1){
        ctrl.find(".pre").click(function(){prevView(cls);});
        ctrl.find(".next").click(function(){nextView(cls);});
        ctrl.find(".stop").toggle(function(){$(this).addClass("pause");stopRolling(cls, timespeed);}, function(){$(this).removeClass("pause");startRolling(cls, timespeed);});
    }
    
    // rolling
    startRolling(cls, timespeed);
}

function blurView(target, fadeYn){
    var pgImg = target.find(".targetPgImg");
    var imgOnOff = target.find(".targetImgOnOff");
    var view = target.find(".targetView");
    if(pgImg.length != 0)       pgImg.attr("src", (pgImg.attr("src")).replace("_on", "_off"));
    if(imgOnOff.length != 0)    imgOnOff.attr("src", imgOnOff.attr("off"));
    if(view.length != 0){
        if(fadeYn)      view.fadeOut();
        else            view.hide();
    }
    
    target.removeClass("on");
}

function focusView(target, fadeYn){
    var pgImg = target.find(".targetPgImg");
    var imgOnOff = target.find(".targetImgOnOff");
    var view = target.find(".targetView");
    
    if(pgImg.length != 0)       pgImg.attr("src", (pgImg.attr("src")).replace("_off", "_on"));
    if(imgOnOff.length != 0)    imgOnOff.attr("src", imgOnOff.attr("on"));
    if(view.length != 0){
        if(fadeYn)      view.fadeIn();
        else            view.show();
    }
    
    target.addClass("on");
}

function nextView(cls){
    var length = $(cls).find(".target").length;
    var curIdx = $(cls).find(".target").index($(cls).find(".on"));
    if(length > curIdx+1)    curIdx++;
    else                     curIdx = 0;
    
    blurView($(cls).find(".on"), true);
    focusView($(cls).find(".target").eq(curIdx), true);
}

function prevView(cls){
    var length = $(cls).find(".target").length;
    var curIdx = $(cls).find(".target").index($(cls).find(".on"));
    if(0 < curIdx)    curIdx--;
    else              curIdx = length-1;
    
    blurView($(cls).find(".on"), true);
    focusView($(cls).find(".target").eq(curIdx), true);
}

function rollingView(cls){
    if(!$(cls).hasClass("stopRolling")){
        nextView(cls);
    }
}

function startRolling(cls, timespeed){
    if(timespeed != undefined && timespeed > 0 && map[cls] == null){
        map[cls] = setInterval("rollingView('"+cls+"')", timespeed);
    }
}

function stopRolling(cls){
    if(map[cls] != null){
        clearInterval(map[cls]);
        map[cls] = null;
    }
}