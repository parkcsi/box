function gnb_open_complete(){

}

function gnb_close_complete(){

}

$(function(){

});

/* page move */
function targetPageMove(target,dir){
    if ( target.find('.btn_move_circle a').size() == 1 ) return false;
    var obj1, obj2;
    var area_width = target.parent().width();
    //var area_height = target.find('.slide_page').parent().height();
    var dis = target.width(); // $(window).width();
    var idx = target.find('.btn_move_circle a.on').index();
    obj1 = target.find('.slide_page').eq(idx);
    if(dir == 'next'){
        if(target.find('.btn_move_circle a.on').next().size()){
            obj2 = target.find('.slide_page').eq(idx).next();
            target.find('.btn_move_circle a.on').next().addClass('on').siblings().removeClass('on');
        }else{
            obj2 = target.find('.slide_page').first();
            target.find('.btn_move_circle a').first().addClass('on').siblings().removeClass('on');
        }
    }else if(dir == 'prev'){
        if(target.find('.btn_move_circle a.on').prev().size()){
            obj2 = target.find('.slide_page').eq(idx).prev();
            target.find('.btn_move_circle a.on').prev().addClass('on').siblings().removeClass('on');
        }else{
            obj2 = target.find('.slide_page').last();
            target.find('.btn_move_circle a').last().addClass('on').siblings().removeClass('on');
        }
        dis = -dis;
    }else{
        obj2 = target.find('.slide_page').eq(dir);
        target.find('.btn_move_circle a').eq(dir).addClass('on').siblings().removeClass('on');
        if(idx == dir) return false;
        if(idx > dir) dis = -dis;
    }

    obj2.find('img').each(function(){
        if( $(this).attr('data-original') && $(this).attr('src') != $(this).attr('data-original') ){
            $(this).attr('src', $(this).attr('data-original') );
        }
    });
/*  var img_array = obj2.find('img');
    if( img_array.first().attr('src') != img_array.first().attr('data-original') ){
        for(i=0;i< img_array.size() ;i++){
            img_array.eq(i).attr('src', img_array.eq(i).attr('data-original') );
        }
    } */

    target.find('.slide_page').parent().height(obj1.parent().height()).width(dis);
    if(target.find('.slide_page:visible').size() > 1){
        target.find('.slide_page').hide();
        obj1.show();
        obj2.show();
    }
    obj1.stop().css({width:area_width,'margin-left':0,position:'absolute',top:0}).animate({left:-dis},400,function(){
        $(this).hide().css({width:'auto',margin:0,position:'static',top:0,left:0});
        target.find('.slide_page').parent().height('auto').width('auto');
    });
    obj2.stop().css({width:area_width,'margin-left':dis,position:'static',top:0,left:0}).show().animate({'margin-left':0},400,function(){
        $(this).css({width:'auto'});
    });
}