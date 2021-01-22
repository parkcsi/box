$(function(){

// 로그인_닫기 버튼으로 ID clear
    var $ipt = $('#chkId'),
        $clearIpt = $('.search');
    $ipt.keyup(function(){
      $(".search").toggle(Boolean($(this).val()));
    });
    $clearIpt.toggle(Boolean($ipt.val()));
    $clearIpt.click(function(){
      $("#chkId").val('').focus();
      $(this).hide();
    });
// 로그인_닫기 버튼으로 PW clear
    var $ipt = $('#chkPw'),
        $clearIpt = $('.searchClear');
    $ipt.keyup(function(){
      $(".searchClear").toggle(Boolean($(this).val()));
    });
    $clearIpt.toggle(Boolean($ipt.val()));
    $clearIpt.click(function(){
      $("#chkPw").val('').focus();
      $(this).hide();
    });



});
