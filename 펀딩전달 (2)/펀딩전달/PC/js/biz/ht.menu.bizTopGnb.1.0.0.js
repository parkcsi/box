/**
 * GNB 관련 JS
 * 작성일: 2019-11-07 14:05
 * 버전: 1.0.0
 */
$(document).ready(function() {
		
	$('.dp1').mouseenter(function() {
		
		var param = "ctgrId=" + $(this).attr('value');
		
		// 1. 카테고리 호출 여부 체크
		if($(this).hasClass('c_call') === false){
			// 2. 카테고리를 호출하지 않았을 경우 카테고리를 호출함
			
			var _this = $(this);
			var _cateId = $(this).attr('value');
			
			$.ajax({
		        type: "POST"
		        ,url: "/menu/biz/gift/lnb"
		        ,data: param
		        ,dataType: "json"
		        ,success : function(data){
		            
		        	if("0003" == _cateId){			// [CD/LP] 카테고리 생성
		        		makeCdCategory(_this, data);
		        	}else if("000401" == _cateId){	// [DVD/BLU-RAY] 카테고리 생성
		        		makeDvdtmpCategory(_this, data, _cateId);
		        	}else{							// [문구/기프트] 카테고리 생성
		        		makeGiftCategory(_this, data, _cateId);	
		        	}		        	
		        	gnb();
		        }
		        ,error: function(data) {
		            alert('<fmt:message key="error.common.system"/>');
		        }
		    });				   
		}
		
		// 카테고리 레이어 배너 이미지 호출
		$.ajax({
	        type: "POST"
	        ,url: "/menu/biz/gift/gnbLbnrImg"
	        ,data: param
	        ,dataType: "json"
	        ,success : function(data){
	        	
	        	if(data.gnbLbrnImg != null){
	        		$("#gnbLbrnImgDiv").empty();
		        	
		        	var strHtml = "";
		        	strHtml += '<a href="' + data.gnbLbrnImg.bnrLinkUrl + '"><img src="http://image.kyobobook.co.kr/newimages/giftshop_new/work/' + data.gnbLbrnImg.imageUrlPc + '" alt="' + data.gnbLbrnImg.imageAlt + '"></a>';
		        	$("#gnbLbrnImgDiv").append(strHtml);	
		        	
	        	}else{
	        		$("#gnbLbrnImgDiv").empty();
	        	}	            	        		       
	        }
	        ,error: function(data) {
	            alert('<fmt:message key="error.common.system"/>');
	        }
	    });
		
	});
});

function makeGiftCategory(_this, data, _cateId){	
	if (data) {
		var c_list = data.lnbCategoryList;
    	var strHtml = "";
    	strHtml += '<div class="dp2">';
    	strHtml += '<ul>';
    	strHtml += '<li>';
    	strHtml += '<a href="/ht/biz/gift/giftCategoryMain?ctgrId=' + _cateId + '" class="all">전체보기</a>';
    	strHtml += '</li>';
    	
    	// 2Detpth 카테고리 생성
    	for(var i=0; i<c_list.length; i++){		            		
    		// 14개 넘어가면 더보기 항목 생성 
    		if(i<13){
    			strHtml += '<li>';
        		strHtml += '<a href="/ht/biz/gift/giftCategoryMain?ctgrId=' + c_list[i].cateId + '" class="all">' + c_list[i].cateName + '</a>';
        		
        		if (c_list[i] && c_list[i].childCategoryList) {
        			var childList = c_list[i].childCategoryList;
        			strHtml += '<div class="dp3">';
        			strHtml += '<ul>';
        			strHtml += '<li>';
        			strHtml += '<a href="/ht/biz/gift/giftCategoryMain?ctgrId=' + c_list[i].cateId + '" class="all">전체보기</a>';
        			strHtml += '</li>';
        			
        			// 3Detpth 카테고리 생성
            		for(var j=0; j<childList.length; j++){
            			// 14개 넘어가면 더보기 항목 생성
            			if(j<13){
	            			strHtml += '<li>';
	            			strHtml += '<a href="/ht/biz/gift/giftCategoryMain?ctgrId=' + childList[j].cateId + '" class="all">' + childList[j].cateName + '</a>';
	            			strHtml += '<li>';
            			}else{
            				strHtml += '<li>';
	            			strHtml += '<a href="/ht/biz/gift/giftCategoryMain?ctgrId=' + c_list[i].cateId + '" class="all">더보기</a>';
	            			strHtml += '</li>';
	            			break;
            			}	
            		}
            		strHtml += '</ul>';
            		strHtml += '</div>';
        		}     				            	
        		strHtml += '</li>';
    		}else{
    			strHtml += '<li>';
    			strHtml += '<a href="/ht/biz/gift/giftCategoryMain?ctgrId=' + _cateId + '" class="all">더보기</a>';
    			strHtml += '</li>';
    			break;
    		}
    		
    	}
    	strHtml += '</ul>';
    	strHtml += '</div>';
    	
		_this.after(strHtml);			
		_this.addClass('c_call');	// 카테고리 호출했을 경우 class 추가		              
    }
}

function makeCdCategory(_this, data){	
	if (data) {
		var c_list = data.lnbCategoryList;
    	var strHtml = "";
    	strHtml += '<div class="dp2">';
    	strHtml += '<ul>';
    	strHtml += '<li>';
    	strHtml += '<a href="/ht/biz/record/recordCategoryMain?ctgrId=0003" class="all">전체보기</a>';
    	strHtml += '</li>';

    	// 2Detpth 카테고리 생성
    	for(var i=0; i<c_list.length; i++){    		
			// 14개 넘어가면 더보기 항목 생성 
			if(i<13){
				strHtml += '<li>';
				if("000303" == c_list[i].cateId){
					strHtml += '<a href="javascript://" onclick="location.href=\'/ht/biz/record/recordCategoryMain?ctgrId=00030300\'">' + c_list[i].cateName + '</a>';	
				}else{        				
					strHtml += '<a href="javascript://" onclick="location.href=\'/ht/biz/record/recordCategoryMain?ctgrId=' + c_list[i].cateId + '\'">' + c_list[i].cateName + '</a>';
				}            		            		
	    		if (c_list[i] && c_list[i].childCategoryList) {
	    			var childList = c_list[i].childCategoryList;
	    			strHtml += '<div class="dp3">';
	    			strHtml += '<ul>';
	    			strHtml += '<li>';
	    			
					if("000303" == c_list[i].cateId){
						strHtml += '<a href="javascript://" onclick="location.href=\'/ht/biz/record/recordCategoryMain?ctgrId=00030300\'">전체보기</a>';	
					}else{        				
						strHtml += '<a href="javascript://" onclick="location.href=\'/ht/biz/record/recordCategoryMain?ctgrId=' + c_list[i].cateId + '\'">전체보기</a>';
					}     

	    			strHtml += '</li>';
	    			
	    			// 3Detpth 카테고리 생성
	        		for(var j=0; j<childList.length; j++){
	        			// 14개 넘어가면 더보기 항목 생성
	        			if(j<13){
	            			strHtml += '<li>';
	            			strHtml += '<a href="javascript://" onclick="location.href=\'/ht/biz/record/recordCategoryMain?ctgrId=' + childList[j].cateId + '\'">' + childList[j].cateName + '</a>';
	            			strHtml += '<li>';
	        			}else{
	        				strHtml += '<li>';
	        				
	        				if("000303" == c_list[i].cateId){
	    						strHtml += '<a href="javascript://" onclick="location.href=\'/ht/biz/record/recordCategoryMain?ctgrId=00030300\'">더보기</a>';	
	    					}else{        				
	    						strHtml += '<a href="javascript://" onclick="location.href=\'/ht/biz/record/recordCategoryMain?ctgrId=' + c_list[i].cateId + '\'">더보기</a>';
	    					}  
	            			
	            			strHtml += '</li>';
	            			break;
	        			}	
	        		}
	        		strHtml += '</ul>';
	        		strHtml += '</div>';
	    		}     				            	
	    		strHtml += '</li>';        		
			}else{
				strHtml += '<li>';
				strHtml += '<a href="/ht/biz/record/recordCategoryMain?ctgrId=0003" class="all">더보기</a>';
				strHtml += '</li>';
				break;
			}    		    		   	
    	} 	    	
    	strHtml += '</ul>';
    	strHtml += '</div>';
    	
		_this.after(strHtml);			
		_this.addClass('c_call');	// 카테고리 호출했을 경우 class 추가		              
    }
}

function makeDvdtmpCategory(_this, data, _cateId){	
	if (data) {
		var c_list = data.lnbCategoryList;
    	var strHtml = "";
    	strHtml += '<div class="dp2">';
    	strHtml += '<ul>';
    	strHtml += '<li>';
    	strHtml += '<a href="/ht/biz/record/dvdCategoryMain?ctgrId=000401" class="all">전체보기</a>';
    	strHtml += '</li>';
    	
    	// 2Detpth 카테고리 생성
    	for(var i=0; i<c_list.length; i++){		            		
    		// 14개 넘어가면 더보기 항목 생성 
    		if(i<13){
    			strHtml += '<li>';
        		strHtml += '<a href="/ht/biz/record/dvdCategoryMain?ctgrId=' + c_list[i].cateId + '" class="all">' + c_list[i].cateName + '</a>';
        		
        		if (c_list[i] && c_list[i].childCategoryList) {
        			var childList = c_list[i].childCategoryList;
        			strHtml += '<div class="dp3">';
        			strHtml += '<ul>';
        			strHtml += '<li>';
        			strHtml += '<a href="/ht/biz/record/dvdCategoryMain?ctgrId=' + c_list[i].cateId + '" class="all">전체보기</a>';
        			strHtml += '</li>';
        			
        			// 3Detpth 카테고리 생성
            		for(var j=0; j<childList.length; j++){
            			// 14개 넘어가면 더보기 항목 생성
            			if(j<13){
	            			strHtml += '<li>';
	            			strHtml += '<a href="/ht/biz/record/dvdCategoryMain?ctgrId=' + childList[j].cateId + '" class="all">' + childList[j].cateName + '</a>';
	            			strHtml += '<li>';
            			}else{
            				strHtml += '<li>';
	            			strHtml += '<a href="/ht/biz/record/dvdCategoryMain?ctgrId=' + c_list[i].cateId + '" class="all">더보기</a>';
	            			strHtml += '</li>';
	            			break;
            			}	
            		}
            		strHtml += '</ul>';
            		strHtml += '</div>';
        		}     				            	
        		strHtml += '</li>';
    		}else{
    			strHtml += '<li>';
    			strHtml += '<a href="/ht/biz/record/dvdCategoryMain?ctgrId=000401" class="all">더보기</a>';
    			strHtml += '</li>';
    			break;
    		}
    		
    	}
    	strHtml += '</ul>';
    	strHtml += '</div>';
    	
		_this.after(strHtml);			
		_this.addClass('c_call');	// 카테고리 호출했을 경우 class 추가		              
    }	                  
}
