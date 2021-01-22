var _eventStamp = function(eventId){
    _loadEventStamp();
    
    function _loadEventStamp(){
        var obj = document.getElementById("divStamp");
        _removeChild(obj);
        $.ajax({
             async:false
            ,type: "GET"
            ,url: "/ht/hot/getEventStamp"
            ,data: {eventId:eventId}
            ,dataType: 'json'
            ,success: function(data) {
                if(data){
                    if(data.stamp){ 
                        var stamp = data.stamp;
                        
                        var box_stamp = _createSimpleElement("div", null, "box_stamp");
                        obj.appendChild(box_stamp);
                        
                        var stamp_card = _createSimpleElement("div", null, "stamp_card", {style:"background:url('" + _imgUrl(stamp.imgUrlOff) + "');"});
                        box_stamp.appendChild(stamp_card);
                        
                        var gainCnt = stamp.gainCnt;
                        if(gainCnt > stamp.maxStampCnt)    gainCnt = stamp.maxStampCnt;
                        var stamp_in = _createSimpleElement("div", null, "stamp_in", {style:"background:url('" + _imgUrl(stamp.imgUrlOn) + "');width:calc(100% * " + gainCnt + " / " + stamp.maxStampCnt + ");"});
                        stamp_card.appendChild(stamp_in);
                        
                        var stamp_gift = _createSimpleElement("div", null, "stamp_gift");
                        box_stamp.appendChild(stamp_gift);
                        
                        if(data.list){
                            var list = data.list;
                            var hndlClick = function(giftInseq){ return function(e){ e.preventDefault();_applyStamp(giftInseq); }; };
                            for (var i = 0; i  < list.length; i++){
                                if(list[i].applyYn == "Y"){
                                    var btnImg = _createSimpleElement("img");
                                    btnImg.src = _imgUrl(list[i].imgUrlOn);
                                    btnImg.alt = list[i].giftName;
                                    stamp_gift.appendChild(btnImg);
                                }else{
                                    var anchor = _createSimpleAnchor("#", null, "ic_click", list[i].giftName, hndlClick(list[i].giftInseq));
                                    var btnImg = _createSimpleElement("img");
                                    btnImg.src = _imgUrl(list[i].imgUrlOff);
                                    btnImg.alt = list[i].giftName;
                                    anchor.appendChild(btnImg);
                                    stamp_gift.appendChild(anchor);
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    function _applyStamp(giftInseq){
        $.ajax({
            async:false
           ,type: "POST"
           ,url: "/ht/hot/submitEventStamp"
           ,data: {eventId:eventId,giftInseq:giftInseq}
           ,dataType: 'json'
           ,success: function(data) {
               if(data){
                   alert(data.alert);
                   _loadEventStamp();
               }
           }
       });
    }
};
