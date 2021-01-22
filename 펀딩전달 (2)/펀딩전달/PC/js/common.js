$(function(){
    /* 검색카테고리 */
    var search_list = $('.search > .search_cate');
    $('.search .search_arrow').click(function(){
        search_list.toggle();
    });
    search_list.find('li a').click(function(){
        search_list.hide();
    });
    
    /* gnb */
    $("#gnb ul li").hover(
        function(){ $(this).addClass("on"); }
      , function(){ $(this).removeClass("on"); }
    );
    $("#gnb ul li a").focusin(function(){
        $("#gnb ul li.on").removeClass("on");
        $(this).parents("li").addClass("on");
    });
    
    $(document).focusin(function(){
        if($(document.activeElement).closest("#gnb").length == 0){
            $("#gnb ul li.on").removeClass("on");
        }
    });
});