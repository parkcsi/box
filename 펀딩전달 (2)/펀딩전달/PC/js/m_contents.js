;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/
$(function(){if($.browser.name=='msie'){$('body').addClass($.browser.className);}else{$('body').addClass($.browser.name);}});

/* footer tab */
$(function(){
    $('.foot_tab li a.tab_tit').bind('click',function(){
        var taget_link = $(this).attr('href');
        if($(taget_link).is(':hidden')){
            $('.footer_board .tab_cont').hide();
            $('.foot_tab li a.tab_tit').parent().removeClass('on');
            $(this).parent().addClass('on');
            $(taget_link).show();
        }       
        return false;
    });
});
/* tab */
(function ($) {

    $.fn.fnTab = function (options) {
        return this.each(function () {
            var that = $(this);
            var opts = $.extend({}, $.fn.fnTab.option, options || {});
            options = options || {};
             if($.browser.name == "msie"){
                    $.each(that.find(opts.selector), function (idx, value){
                           var hash = $(value).attr('href').split("#")[1];
                           $(value).attr('href', '#'+hash);
                    });
             }
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

$(document).ready(function(){

    /* img roll */
    $(".roll_img").hover(function(){ 
    $(this).attr("src", $(this).attr("hover")); 
    }, function(){ 
    $(this).attr("src", $(this).attr("default")); 
    }); 

    $('.theme_tab li a').mouseenter(function(){
        var taget_link = $(this).attr('href');
        if($(taget_link).is(':hidden')){
            $(this).parents('.pannel').find('.prod').hide();
            $(taget_link).show();
        }
        return false;
    });
    
    $('.theme_tab li a').focus(function(){
        var taget_link = $(this).attr('href');
        if($(taget_link).is(':hidden')){
            $(this).parents('.pannel').find('.prod').hide();
            $(taget_link).show();
        }
        return false;
    });
    
    $('.theme_tab li a').click(function(){
        var taget_link = $(this).attr('href');
        if($(taget_link).is(':hidden')){
            $(this).parents('.pannel').find('.prod').hide();
            $(taget_link).show();
        }
        return false;
    });

    $('.tab_wrap .tab_btn  a').mouseenter(function(){
        var taget_link = $(this).attr('href');
        if($(taget_link).is(':hidden')){
            $(this).parents('.tab_wrap').find('.tab_pannels .pannel').hide();
            $(taget_link).show();
            $(this).parents('.tab_wrap').find('.tab_btn li a').removeClass('on');
            $(this).addClass('on');
        }
        return false;
    });

    $('.tab_wrap .tab_btn  a').focus(function(){
        var taget_link = $(this).attr('href');
        if($(taget_link).is(':hidden')){
            $(this).parents('.tab_wrap').find('.tab_pannels .pannel').hide();
            $(taget_link).show();
            $(this).parents('.tab_wrap').find('.tab_btn li a').removeClass('on');
            $(this).addClass('on');
        }
        return false;
    });

    $('.tab_wrap .tab_btn  a').click(function(){
        var taget_link = $(this).attr('href');
        if($(taget_link).is(':hidden')){
            $(this).parents('.tab_wrap').find('.tab_pannels .pannel').hide();
            $(taget_link).show();
            $(this).parents('.tab_wrap').find('.tab_btn li a').removeClass('on');
            $(this).addClass('on');
        }
        return false;
    });

    $('.tab_wrap .tab_btn_clk  a').click(function(e){
        e.preventDefault();
        var taget_link = $(this).attr('href');
        if($(taget_link).is(':hidden')){
            $(this).parents('.tab_wrap').find('.tab_pannels .pannel').hide();
            $(taget_link).show();
            $(this).parents('.tab_wrap').find('.tab_btn_clk li a').removeClass('on');
            $(this).addClass('on');
        }
        return false;
    });

    $('.tab_wrap02 .tab_btn li a').mouseenter(function(){
        var taget_link = $(this).attr('href');
        if($(taget_link).is(':hidden')){
            $(this).parents('.tab_wrap02').find('.tab_pannels').hide();
            $(taget_link).show();
            $(this).parents('.tab_wrap02').find('.tab_btn li a').removeClass('on');
            $(this).addClass('on');
        }
        return false;
    });

    $('.tab_wrap02 .tab_btn li a').focus(function(){
        var taget_link = $(this).attr('href');
        if($(taget_link).is(':hidden')){
            $(this).parents('.tab_wrap02').find('.tab_pannels').hide();
            $(taget_link).show();
            $(this).parents('.tab_wrap02').find('.tab_btn li a').removeClass('on');
            $(this).addClass('on');
        }
        return false;
    });

    $('.tab_wrap02 .tab_btn li a').click(function(){
        var taget_link = $(this).attr('href');
        if($(taget_link).is(':hidden')){
            $(this).parents('.tab_wrap02').find('.tab_pannels').hide();
            $(taget_link).show();
            $(this).parents('.tab_wrap02').find('.tab_btn li a').removeClass('on');
            $(this).addClass('on');
        }
        return false;
    });

    $('.brand_wrap .bw_tab  a').mouseenter(function(){
        var taget_link = $(this).attr('href');
        if($(taget_link).is(':hidden')){
            $(this).parents('.brand_wrap').find('.bw_pannels').hide();
            $(taget_link).show();
            $(this).parents('.brand_wrap').find('.bw_tab li a').removeClass('on');
            $(this).addClass('on');
        }
        return false;
    });

    $('.brand_wrap .bw_tab  a').focus(function(){
        var taget_link = $(this).attr('href');
        if($(taget_link).is(':hidden')){
            $(this).parents('.brand_wrap').find('.bw_pannels').hide();
            $(taget_link).show();
            $(this).parents('.brand_wrap').find('.bw_tab li a').removeClass('on');
            $(this).addClass('on');
        }
        return false;
    });

    $('.brand_wrap .bw_tab  a').click(function(){
        var taget_link = $(this).attr('href');
        if($(taget_link).is(':hidden')){
            $(this).parents('.brand_wrap').find('.bw_pannels').hide(); 
            $(taget_link).show();
            $(this).parents('.brand_wrap').find('.bw_tab li a').removeClass('on');
            $(this).addClass('on');
        }
        return false;
    });

    $('.tab_btn02 li a').click(function(){
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
    });

    $('.tooltip').click(function(){
        var taget_link = $(this).attr('href');
        
            $(taget_link).toggle();
    
        return false;
    });

    $('.layer_pop_wrap .cls_btn').click(function(){
        $(this).parents('.layer_pop_wrap').hide();
    });


    $('.theme_shop li, .theme_pannels .pannel ul li, .review_pannels .pannel ul li').mouseenter(function(){
        $(this).find('.hide_box').fadeIn(100);
    });

    $('.theme_shop li, .theme_pannels .pannel ul li, .review_pannels .pannel ul li').focus(function(){
        $(this).find('.hide_box').fadeIn(100);
    });

    $('.theme_shop li, .theme_pannels .pannel ul li, .review_pannels .pannel ul li').click(function(){
        $(this).find('.hide_box').fadeIn(100);
    });

    $('.theme_shop li, .theme_pannels .pannel ul li, .review_pannels .pannel ul li').mouseleave(function(){
        $(this).find('.hide_box').fadeOut(0);
    });

    $('.theme_shop li, .theme_pannels .pannel ul li, .review_pannels .pannel ul li').focusout(function(){
        $(this).find('.hide_box').fadeOut(0);
    });



    $('.hide_box').hide();
    $('.hide_box').mouseenter(function(){
        var cTop = $(this).find('span').height() / 2;
        $(this).find('span').css({'margin-top': - cTop + 'px'});
    });
    $('.hide_box').focus(function(){
        var cTop = $(this).find('span').height() / 2;
        $(this).find('span').css({'margin-top': - cTop + 'px'});
    });
    $('.hide_box').click(function(){
        var cTop = $(this).find('span').height() / 2;
        $(this).find('span').css({'margin-top': - cTop + 'px'});
    });


    $('.office_design .cate ul li a').mouseenter(function(){
        if(($(this).next('ul')).is(':hidden')){
            $('.office_design .cate ul li').removeClass('on');
        $(this).parent('li').addClass('on');
        } 
    });
    $('.office_design .cate ul li a').focus(function(){
        if(($(this).next('ul')).is(':hidden')){
            $('.office_design .cate ul li').removeClass('on');
        $(this).parent('li').addClass('on');
        } 
    });
    $('.office_design .cate ul li a').click(function(){
        if(($(this).next('ul')).is(':hidden')){
            $('.office_design .cate ul li').removeClass('on');
        $(this).parent('li').addClass('on');
        } 
    });
    $('.office_design .cate').mouseleave(function(){
        $(this).find('li').removeClass('on');
    });
    $('.office_design .cate').focusout(function(){
        $(this).find('li').removeClass('on');
    });
    
    $('.office_design02 .cate ul li a').mouseenter(function(){
        if(($(this).next('ul')).is(':hidden')){
            $('.office_design02 .cate ul li').removeClass('on');
        $(this).parent('li').addClass('on');
        } 
    });
    $('.office_design02 .cate ul li a').click(function(){
        if(($(this).next('ul')).is(':hidden')){
            $('.office_design02 .cate ul li').removeClass('on');
        $(this).parent('li').addClass('on');
        } 
    });
    
    $('.office_design02 .cate').mouseleave(function(){
        $(this).find('li').removeClass('on');
    });
    
    $('.record_cd .cate02 ul li a').focus(function(){
        if(($(this).next('ul')).is(':hidden')){
        $('.record_cd .cate02 ul li ul').hide();
        $(this).next().show();
        } 
        return false;
    });
    $('.record_cd .cate02 ul li a').click(function(){
        if(($(this).next('ul')).is(':hidden')){
        $('.record_cd .cate02 ul li ul').hide();
        $(this).next().show();
        } 
        return false;
    });

    $('a.tab').mouseenter(function(){
        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');
    });

    $('a.tab').focus(function(){
        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');
    });

    $('a.tab').click(function(){
        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');
    });

    $('.record_carousel li a').mouseenter(function(){
        var taget_link = $(this).attr('href');
        if($(taget_link).is(':hidden')){
            $(this).parents('.item').find('.pannel').hide();
            $(taget_link).show();
        }
        return false;
    });

    $('.record_carousel li a').focus(function(){
        var taget_link = $(this).attr('href');
        if($(taget_link).is(':hidden')){
            $(this).parents('.item').find('.pannel').hide();
            $(taget_link).show();
        }
        return false;
    });

    $('.record_carousel li a').click(function(){
        var taget_link = $(this).attr('href');
        if($(taget_link).is(':hidden')){
            $(this).parents('.item').find('.pannel').hide();
            $(taget_link).show();
        }
        return false;
    });

    $('.tab_dvd li  a').mouseenter(function(){
        var taget_link = $(this).attr('href');
        if($(taget_link).is(':hidden')){
            $(this).parents('.clasic_val').find('.c_pannel').hide();
            $(taget_link).show();
            $(this).parents('.c_tab_wrap').find('.tab_dvd li a').removeClass('on');
            $(this).addClass('on');
        }
        return false;
    });

    $('.tab_dvd li  a').focus(function(){
        var taget_link = $(this).attr('href');
        if($(taget_link).is(':hidden')){
            $(this).parents('.clasic_val').find('.c_pannel').hide();
            $(taget_link).show();
            $(this).parents('.c_tab_wrap').find('.tab_dvd li a').removeClass('on');
            $(this).addClass('on');
        }
        return false;
    });

    $('.tab_dvd li  a').click(function(){
        var taget_link = $(this).attr('href');
        if($(taget_link).is(':hidden')){
            $(this).parents('.clasic_val').find('.c_pannel').hide();
            $(taget_link).show();
            $(this).parents('.c_tab_wrap').find('.tab_dvd li a').removeClass('on');
            $(this).addClass('on');
        }
        return false;
    });

    $('#gnb .depth01 a').mouseenter(function(){
        var taget_link = $(this).attr('href');
            var taget_link = $(this).attr('href');
            if($(taget_link).is(':hidden')){
                $('#gnb .depth02').hide();
                $(taget_link).show();
                $('#gnb .depth01 a').removeClass('on');
                $(this).addClass('on');
                $('#gnb').mouseleave(function(){
                    $('#gnb .depth02').hide();
                    $('#gnb .depth01 a').removeClass('on');
                });
                $('#gnb').focusout(function(){
                    $('#gnb .depth02').hide();
                    $('#gnb .depth01 a').removeClass('on');
                });
            }
            return false;
    });

    $('#gnb .depth01 a').focus(function(){
        var taget_link = $(this).attr('href');
            var taget_link = $(this).attr('href');
            if($(taget_link).is(':hidden')){
                $('#gnb .depth02').hide();
                $(taget_link).show();
                $('#gnb .depth01 a').removeClass('on');
                $(this).addClass('on');
                $('#gnb').mouseleave(function(){
                    $('#gnb .depth02').hide();
                    $('#gnb .depth01 a').removeClass('on');
                });
                $('#gnb').focusout(function(){
                    $('#gnb .depth02').hide();
                    $('#gnb .depth01 a').removeClass('on');
                });
            }
            return false;
    });

    $('#gnb .depth01 a').click(function(){
        var taget_link = $(this).attr('href');
            var taget_link = $(this).attr('href');
            if($(taget_link).is(':hidden')){
                $('#gnb .depth02').hide();
                $(taget_link).show();
                $('#gnb .depth01 a').removeClass('on');
                $(this).addClass('on');
                $('#gnb').mouseleave(function(){
                    $('#gnb .depth02').hide();
                    $('#gnb .depth01 a').removeClass('on');
                });
                $('#gnb').focusout(function(){
                    $('#gnb .depth02').hide();
                    $('#gnb .depth01 a').removeClass('on');
                });
            }
            return false;
    });

    $('.all_view_cate a.open_cate').mouseenter(function(){
        var taget_link = $(this).attr('href');
            var taget_link = $(this).attr('href');
            if($(taget_link).is(':hidden')){
                $(taget_link).show();
                $(this).find('span').html('전체 카테고리 보기 -');
                $('.all_view_cate').mouseleave(function(){
                    $('.list_cate').hide();
                    $('.all_view_cate a.open_cate').find('span').html('전체 카테고리 보기 +');
                });
                $('.all_view_cate').focusout(function(){
                    $('.list_cate').hide();
                    $('.all_view_cate a.open_cate').find('span').html('전체 카테고리 보기 +');
                });
            }
            return false;
    });

    $('.all_view_cate a.open_cate').focus(function(){
        var taget_link = $(this).attr('href');
            var taget_link = $(this).attr('href');
            if($(taget_link).is(':hidden')){
                $(taget_link).show();
                $(this).find('span').html('전체 카테고리 보기 -');
                $('.all_view_cate').mouseleave(function(){
                    $('.list_cate').hide();
                    $('.all_view_cate a.open_cate').find('span').html('전체 카테고리 보기 +');
                });
                $('.all_view_cate').focusout(function(){
                    $('.list_cate').hide();
                    $('.all_view_cate a.open_cate').find('span').html('전체 카테고리 보기 +');
                });
            }
            return false;
    });

    $('.all_view_cate a.open_cate').click(function(){
        var taget_link = $(this).attr('href');
            var taget_link = $(this).attr('href');
            if($(taget_link).is(':hidden')){
                $(taget_link).show();
                $(this).find('span').html('전체 카테고리 보기 -');
                $('.all_view_cate').mouseleave(function(){
                    $('.list_cate').hide();
                    $('.all_view_cate a.open_cate').find('span').html('전체 카테고리 보기 +');
                });
                $('.all_view_cate').focusout(function(){
                    $('.list_cate').hide();
                    $('.all_view_cate a.open_cate').find('span').html('전체 카테고리 보기 +');
                });
            }
            return false;
    });
    
    $('.go_select a.fm_open').click(function(){
        $(this).toggleClass('on');
        $(this).next().toggle();
        return false;
    });
    
    $('.go_select a.fm_open').focus(function(){
        $(this).toggleClass('on');
        $(this).next().toggle();
        return false;
    });
    
    $(".controller .prev").click(function(e){
        e.preventDefault();
        var parent = $(this).parents(".control_area");
        var em = parent.find(".control_item.active");
        em.removeClass("active");
        if(parent.find(".control_item").index(em) == 0){
            parent.find(".control_item:last").addClass("active");
        }else{
            em.prev().addClass("active");
        }
    });
    
    $(".controller .next").click(function(e){
        e.preventDefault();
        var parent = $(this).parents(".control_area");
        var em = parent.find(".control_item.active");
        em.removeClass("active");
        if(parent.find(".control_item").index(em) == parent.find(".control_item").length-1){
            parent.find(".control_item:first").addClass("active");
        }else{
            em.next().addClass("active");
        }
    });
});
