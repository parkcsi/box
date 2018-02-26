$(document).ready(function(){
  $(".nav_btn").click(function(){
    if($(this).hasClass("active") == true){
      $(this).removeClass("active").next(".ham_menu").stop(true, true).slideUp(500).parent().css("z-index", "1");;
    } else{
      $(this).addClass("active").next(".ham_menu").stop(true, true).slideDown(500).parent().css("z-index", "2");
      if($(".lang_btn").hasClass("active") == true){
        $(".lang_btn").click();
      }
    }
    return false;
  });
  $(".lang_btn").click(function(){
    if($(this).hasClass("active") == true){
      $(this).removeClass("active").next(".ham_menu").stop(true, true).slideUp(500).parent().css("z-index", "1");;
      $(this).find(".close").slideUp();
      $(this).find(".icon").slideDown();
    } else{
      $(this).addClass("active").next(".ham_menu").stop(true, true).slideDown(500).parent().css("z-index", "2");;
      $(this).find(".close").slideDown();
      $(this).find(".icon").slideUp();
      if($(".nav_btn").hasClass("active") == true){
        $(".nav_btn").click();
      }
    }
    return false;
  });

  var $slider01;
  var $slider02;

  $slider01 = $('.main_visual .bxslider').bxSlider({
    mode : "fade",
    auto : true,
    pager : false,
    pause : 7000,
    speed : 1000,
    touchEnabled : false
  });

  $slider02 = $('.new_wrap .banner_img').bxSlider({
    mode: "vertical",
    auto : true,
    pager : true,
    pause : 7000,
    controls : false,
    touchEnabled : false
  });


  $('.new_wrap .bx-pager-item a').mouseenter(function(){
    var num = $(this).attr("data-slide-index");
    if($(this).hasClass("active") == false){
      $slider02.goToSlide(num);
      $slider02.stopAuto();
        $slider02.startAuto();
      return false;
    }
  });       

  $(".layer1").click(function(){
    layer_open("layer1", "init");
    return false;
  });
  $(".layer2").click(function(){
    layer_open("layer1", "init");
    return false;
  });
  $(".layer3").click(function(){
    layer_open("layer1", "init");
    return false;
  });
  $(".layer4").click(function(){
    layer_open("layer1", "init");
    return false;
  });


  $(window).resize(function(){
    layer_open("layer1", "resize");
  });

  $('.new_wrap .banner_img').parents(".new_inner").height($(this).find(".bx-pager").height()).find(".bx-has-pager").height($(this).find(".bx-pager").height()).css("margin-top", -($(this).find(".bx-pager").height() / 2));
  

  function layer_open(el, eve){
   
    var temp = $('#' + el);
    var bg = temp.next().hasClass('bg');

    if(eve == "init"){
      init();
    } else if(eve == "resize"){
      if($("html, body").hasClass("noscroll") == true){
        resize();
      };
    }

    function init(){
      if(bg){
        $('.layer').fadeIn(700);
        $("html, body").addClass("noscroll");
        detail_close();
      }else{
        temp.fadeIn(700);
        detail_close();
      }

      temp.find('a.cbtn').click(function(e){
        if(bg){
          $('.layer').fadeOut(700);
          $("html, body").removeClass("noscroll");
        }else{
          temp.fadeOut(700);
        }
        e.preventDefault();
      });
      
      $('.layer .bg').click(function(e){
        $('.layer').fadeOut(700);
        $("html, body").removeClass("noscroll");
        e.preventDefault();
      });

      resize();
    };

    function resize(){
      temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
      temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
      $('.layer').width($(window).outerWidth()).height($(window).outerHeight())
    };

   
  }

  $(".layer .pop-layer .work_wrap ul li a").click(function(){
    detail_open();
  });

  $(".bbtn").click(function(){
    detail_close();
  })

  function detail_open(){
    var list = $(".layer .pop-layer .work_wrap > ul");
    var detail = $(".layer .pop-layer .work_wrap > .detail");

    detail.addClass("on").parents(".layer").addClass("min_size").find("bbtn").show();
    list.hide();
    $(".bbtn").show();
  }

  function detail_close(){
    var list = $(".layer .pop-layer .work_wrap > ul");
    var detail = $(".layer .pop-layer .work_wrap > .detail");

    detail.removeClass("on").parents(".layer").removeClass("min_size").find("bbtn").hide();
    list.show();
    $(".bbtn").hide();
  }

  $("#pop_sel").click(function(){
    $(".lang_sel .select_bg > span").text($(this).val());
  })

});

