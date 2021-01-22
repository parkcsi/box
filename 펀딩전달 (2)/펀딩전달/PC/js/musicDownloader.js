/*****************************************
	다운로더 관련 스크립트 모음
*****************************************/
var musicDownloader = {
	downloaderWin : null, 							// 플레이어 팝업
	downListAareClass : "downListArea",						// 플레이어 목록을 구성하는 클래스명
	url : {
		downList : "/ht/track/getDownTrkList",
		reSelect : "/ht/track/reSelect"
		
		
	}, 

	
	// 플레이어 관련 기능들...
	downloader : {
		downloadList : [],								// 플레이 목록
		oldDownloadList : [] ,
		
		// 플레이어 설정 - 팝업창에서 호출됨.
		setDownloader : function(win){
			opener.musicDownloader.downloaderWin = win;
		},
		
		
		// 타이머
		setDownloaderWait : function(){
			try{
				musicDownloader.downloader.setDownloader(window);
			}catch(e){
				setTimeout("musicDownloader.downloader.setDownloaderWait()", 500);
			}
		},
		
		// 플레이어 타이머 시작
		setDownloaderStart : function(){
			setTimeout("musicDownloader.downloader.setDownloaderWait()", 500);
		}, 


		// 플레이 목록 설정
		setDownloadList : function(list){
			musicDownloader.downloader.downloadList = list;
		}, 
		
		// 플레이어 인터페이스 구성 - 최초 한번만 호출할 것! => 전체 새로 고침으로 처리됨.
		createDownloadList : function(){
			var html = [];
			for(var i=0 ; i < musicDownloader.downloader.downloadList.length ; i++){
				html.push(musicDownloader.downloader.getDownloadListItemHtml(musicDownloader.downloader.downloadList[i], i));
			}
			$("." + musicDownloader.downListAareClass).html(html.join(""));
			
			musicDownloader.downloader.getDownloadCnt(musicDownloader.downloader.downloadList.length);
		}, 
		
		createDownload : function(){
			var html = [];
			for(var i=0 ; i < musicDownloader.downloader.downloadList.length ; i++){
				html.push(musicDownloader.downloader.getDownloadHtml(musicDownloader.downloader.downloadList[i], i));
			}
			$("." + musicDownloader.downListAareClass).html(html.join(""));
		}, 
		
		// 1개 플레이 아이템의 HTML 레이아웃을 반환함. => 나중에 HTML 적용 요망
		getDownloadHtml : function(item, idx){
			// 기존 : item.trkName+" "+item.artiName+"_"+item.albumTitle;
			// 변경 : item.trkNo+"."+item.trkName;
			var sFileName = item.trkName;

			var html = [];
			//html.push("<div>");
			html.push("<tr>");
			html.push("<td>"+(idx+1)+"</td>");
			html.push("<td class='popleft'>"+sFileName+".mp3</td>");
			html.push("<td>"+musicDownloader.downloader.genSelect(item,idx)+"</td>");
			html.push("<td class='left'><span id='state"+idx+"'>"+getFileStatus(idx)+"</span></td>");
			html.push("<td><button type='button' onclick='musicDownloader.downloader.removeItem("+idx+",1)'><img src='http://image.kyobobook.co.kr/newimages/giftshop_new/common/images/order/btn_delete.gif' alt='삭제' /></button></td>");
			html.push("<input type='hidden' name='trkId' value='" + item.trkId + "' />");
			html.push("<input type='hidden' id='buyStatus"+idx+"' name='buyStatus"+idx+"' value='"+musicDownloader.downloader.getPayStatus(item.buyStatus)+"' />");
			html.push("<input type='hidden' id='sCID"+idx+"' name='sCID"+idx+"' value='"+item.trkId+"'/>");
			html.push("<input type='hidden' id='spb"+idx+"' name='spb"+idx+"' value='"+item.sellPrdtBcode+"'/>");
			html.push("<input type='hidden' id='sFileName"+idx+"' name='sFileName"+idx+"' value=\""+sFileName+".mp3\"/>");
			html.push("</tr>");
			//html.push("</div>");
			return html.join("");
		}, 
		
		// 1개 플레이 아이템의 HTML 레이아웃을 반환함. => 나중에 HTML 적용 요망
		getDownloadListItemHtml : function(item, idx){
			var html = [];
			//html.push("<div>");
			html.push("<tr>");
			html.push("<td>"+(idx+1)+"</td>");
			html.push("<td class='left'>"+item.trkName+" / "+item.artiName+"</td>");
			html.push("<td class='left'>"+musicDownloader.downloader.getPayStatusName(item.buyStatus)+"</td>");
			html.push("<td><button type='button' onclick='musicDownloader.downloader.removeItem("+idx+",2)'><img src='http://image.kyobobook.co.kr/newimages/giftshop_new/common/images/order/btn_delete.gif' alt='삭제' /></button></td>");
			html.push("<input type='hidden' name='trkId' value='" + item.trkId + "'/>");
			html.push("<input type='hidden' name='buyStatus' value='"+musicDownloader.downloader.getPayStatus(item.buyStatus)+"'/>");
			html.push("</tr>");
			//html.push("</div>");
			return html.join("");
		}, 
		
		// 플레이 아이템 추가 처리 - 데이터 및 UI 모두 적용 처리함.
		
		addDownloadList : function(list){
			var list = JSON.parse(list);
			for(var i=0 ; i < list.length ; i++){
				// 트랙중복다운 방지
				var recntTrkId1 = [];
				var flag1 = 0;
				recntTrkId1 = musicDownloader.downloader.getRecentTrkIdList();
				for(s=0; s<recntTrkId1.length; s++){
					if(recntTrkId1[s] == list[i].trkId){
						flag1++;
					}
				}
				if(flag1 == 0){
					musicDownloader.downloader.downloadList.push(list[i]);
					if(musicDownloader.downloader.downloadList.length > 0){
						var html = musicDownloader.downloader.getDownloadListItemHtml(list[i], musicDownloader.downloader.downloadList.length - 1);
						$("." + musicDownloader.downListAareClass).append(html);
					}
				}
			}
			musicDownloader.downloader.getDownloadCnt(musicDownloader.downloader.downloadList.length);
		}, 
		
		// 플레이 아이템 추가 처리  - DB
		 addDownloadListToDb: function(list){
			var trkId = [];
			var list = JSON.parse(list);
			for(var i=0 ; i < list.length ; i++){
				trkId.push(list[i].trkId);
			}
			$.ajax({
		        async : false, 
		        url : "/ht/track/getDownTrk",
		        dataType : "json", 
		        type : "post", 
		        data : {
		        	trkId : trkId.join(",") 
		        }, 
		        success : function(result, textStatus, XMLHttpRequest){
		        	musicDownloader.downloader.addDownloadList(result.listJSON);
		         
		        }, 
		        error: function(request, textStatus, errorThrown){
		            alert(request.status + " => " + request.statusText);
		        }
		    });
		},
		// 전체선택, 해제 처리
		checkAll : function(chk){
			$("input[name=chkTrack]").attr("checked", chk.checked);
		}, 
		

		// 선택한 항목을 다운로드, 매니져 목록에서 삭제한다.
		removeItem : function(idx, g){
			// 선택값 체크
			var chkIdx = [];
			 chkIdx.push(idx*1);
			 
			// 값 재구성
			var newList = [];
			var oldList = [];

			for(var i=0 ; i < musicDownloader.downloader.downloadList.length ; i++){
				if($.inArray(i, chkIdx) < 0){
					if(g==1){
						oldList.push($('span#state'+i).html());
					} 
					newList.push(musicDownloader.downloader.downloadList[i]);
				}
			}
			if(g==1){
				musicDownloader.downloader.oldDownloadList = oldList;
			}
			musicDownloader.downloader.downloadList = newList;

			// 인터페이스 재구성
			if(g==1){
				musicDownloader.downloader.createDownload();
				var s = parseInt($("input[name=stdFile").val()) - 1;
				setStandFile(s);
				setMaxDownLen();
			}else if(g==2){
				// 삭제 곡의 구매상태가 남은곡 사용이면 보유남은곡 갯수 회복.
				var bs = $("input[name=buyStatus]").get(idx).value;
				var rmc = $("input[name=rmcMinus]").val(); 
				if(bs == "1"){
					$("strong#remainMusicCnt").html(parseInt(rmc) + 1);
				}
				musicDownloader.downloader.createDownloadList();
			}
			
		}, 

		// 체크박스에 선택된 트랙 아이디를 배열로 반환함.
		getCheckTrackIds : function(){
			var list = musicDownloader.downloader.downloadList;
			var trkIds = [];
			
			$("input[name=chkTrack]:checked").each(function(idx){
				trkIds.push(list[this.value].trkId);
			});
			
			return tr
			kIds;
		},
		// 보유한 남은곡 차감.
		getPayStatus : function(item){
			var rmc = $("strong#remainMusicCnt").html();
			var rtnstr="";
			if(item == "0"){
				rtnstr = "0";
			}else{
				if(rmc>0){
					rtnstr = "1";
					rmc = rmc -1;
					$("strong#remainMusicCnt").html(rmc);
				}else{
					rtnstr = "2";
				}
			}
			return rtnstr;
		},
		// 구매상태
		getPayStatusName : function(item){
			var rmcM = $("strong#remainMusicCnt").html(); 
			var rtnstrM="";
			if(item == "0"){
				rtnstrM = "구매한곡";
			}else{
				if(rmcM>0){
				rtnstrM = "남은곡사용";
				}else{
					rtnstrM = "600원";
				}
			}
			return rtnstrM;
		},
		// 다운로드할곡,구매할곡,남은곡사용수, 결재금액
		getDownloadCnt : function(idx){
			$('strong#downloadCnt').html(idx);
			var c = 0;
			var r = 0;
			var m = 0;
			var mc = 0;
			for(i=0; i<idx;i++){
				var bs = $("input[name=buyStatus]").get(i).value;
		    	if(bs != "0"){
		            c++;    
		            if(bs == "1"){
		                r++;
		            }else if(bs == "2"){
		                mc++;
		                m = parseInt(m)+600;
		            }
		        } 
			}

			$('strong#buyMusic').html(c);
			$("input[name=remainMusicUseCnt]").val(r);
			$("input[name=payForMusicSum]").val(m);
			$("input[name=payForMusicCnt]").val(mc);
			$("strong#remainMusicCnt").html(parseInt($("input[name=rmcMinus]").val()) - r);
		},
		// 현재 추가된 다운로드 리스트
		getRecentTrkIdList :function(){
			var trkIdList = [];
			var trkIdCnt = $("input[name=trkId]").length;
			for(i=0; i<trkIdCnt; i++){
				trkIdList[i]= $("input[name=trkId]").get(i).value;
			}
			return trkIdList;
		},
		// 다운로드 매니져에서 음질 선택박스
		genSelect : function(item,idx){
			var svcHtml = [];
			svcHtml.push("<select name='bitrate"+idx+"' id='bitrate"+idx+"'>");
			if(item.svc128Yn == 'Y'){
				svcHtml.push("<option value='"+item.svc128k+"'>"+item.svc128k+"bps</option>");
			}
			if(item.svc192Yn == 'Y'){
				svcHtml.push("<option value='"+item.svc192k+"' selected >"+item.svc192k+"bps</option>");
			}
			if(item.svc320Yn == 'Y'){
				svcHtml.push("<option value='"+item.svc320k+"'>"+item.svc320k+"bps</option>");
			}
			svcHtml.push("</select>");
			
			return svcHtml.join("");
		}

	}, 
	
	// 바닥페이지 공통 기능들...
	base : {
		form : null, 			// 플레이어 전송용 폼
		
		// 플레이어 활성화
		openDownloader : function(){
			// 일단 중복창을 막는다.
			if(musicDownloader.downloaderWin != null && !musicDownloader.downloaderWin.closed){
				alert("다운로드 결제 창이 활성화 되어 있습니다.");
				return;
			}
		
			// 함수 호출 처리
			if(musicDownloader.downloaderWin != null && !musicDownloader.downloaderWin.closed){
				// 목록 구성 데이터 처리
				var list = [];
				
				// 1곡 플레이 처리
				if(typeof(arguments[0]) == "number"){
					var trkId = arguments[0];
					list.push(musicDownloader.base.getDownloadItemData(trkId));
				}
				
				// 선택곡 플레이 처리
				if(typeof(arguments[0]) == "string"){
					var target = arguments[0];
					var html = [];
					
					$("input[name=" + target + "]:checked").each(function(idx){
						var trkId = this.value;
						list.push(musicDownloader.base.getDownloadItemData(trkId));
					});
					if(list.length == 0){ alert("음원을 선택해 주십시오."); return; }
				}	
				
				if(typeof(arguments[0])=="object"){
					var target = arguments[0];
					for(i=0; i<target.length; i++){
						var trkId = target[i];
						list.push(musicDownloader.base.getDownloadItemData(trkId));
					}
				}
				
				if(list.length > 0){
					try{
						musicDownloader.downloaderWin.musicDownloader.downloader.addDownloadListToDb(JSON.stringify(list));
						musicDownloader.downloaderWin.focus();
					}catch(e){
						
						list = [];
						musicDownloader.downloaderWin = null;
						musicDownloader.base.createForm();
						
						// 1곡 플레이 처리
						if(typeof(arguments[0]) == "number"){
							var trkId = arguments[0];
							var html = [];
							html.push(musicDownloader.base.getDownloadItemFormHtml(trkId));
							musicDownloader.base.form.html(html.join(""));
						}
						
						// 선택곡 플레이 처리
						if(typeof(arguments[0]) == "string"){
							var target = arguments[0];
							var html = [];
							$("input[name=" + target + "]:checked").each(function(idx){
								var trkId = this.value;
								html.push(musicDownloader.base.getDownloadItemFormHtml(trkId));
							});
							if(html.length == 0){ alert("음원을 선택해 주십시오."); return; }
							musicDownloader.base.form.html(html.join(""));
							// end
						}				
						// 플레이어에서 체크된 음원 다운로드시 
						if(typeof(arguments[0])=="object"){
							var target = arguments[0];
							var html = [];
							for(i=0; i<target.length; i++){
								var trkId = target[i];
								html.push(musicDownloader.base.getDownloadItemFormHtml(trkId));
							}
							musicDownloader.base.form.html(html.join(""));
						}
						musicDownloader.downloaderWin = window.open("", "musicDownloaderWin", 'width=700,height=643');
						musicDownloader.base.form.attr("action", musicDownloader.url.reSelect);
						musicDownloader.base.form.attr("target", "musicDownloaderWin");
						musicDownloader.base.form.attr("method", "post");
						musicDownloader.base.form.submit();
						musicDownloader.downloaderWin.focus();
					}
				}
			}else{	// 전송
				musicDownloader.downloaderWin = null;
				musicDownloader.base.createForm();
				
				// 1곡 플레이 처리
				if(typeof(arguments[0]) == "number"){
					var trkId = arguments[0];
					musicDownloader.base.form.html(musicDownloader.base.getDownloadItemFormHtml(trkId));
					
				}
				
				// 선택곡 플레이 처리
				if(typeof(arguments[0]) == "string"){
					var target = arguments[0];
					var html = [];
								
					$("input[name=" + target + "]:checked").each(function(idx){
						var trkId = this.value;
						html.push(musicDownloader.base.getDownloadItemFormHtml(trkId));
					});
					if(html.length == 0){ alert("음원을 선택해 주십시오."); return; }
					
					musicDownloader.base.form.html(html.join(""));
				}				
				
				if(typeof(arguments[0])=="object"){
					var target = arguments[0];
					var html = [];
					for(i=0; i<target.length; i++){
						var trkId = target[i];
						html.push(musicDownloader.base.getDownloadItemFormHtml(trkId));
					}
					musicDownloader.base.form.html(html.join(""));
				}
				
				musicDownloader.downloaderWin = window.open("", "musicDownloaderWin", 'width=700,height=643');
				musicDownloader.base.form.attr("action", musicDownloader.url.downList);
				musicDownloader.base.form.attr("target", "musicDownloaderWin");
				musicDownloader.base.form.attr("method", "post");
				musicDownloader.base.form.submit();
			}
		}, 
		
		// 데이터 전송에 필요한 트랙 데이터 구조를 반환함.
		getDownloadItemData : function(trkId){
			var d = {
				trkId : trkId
			};
			return d;
		},  
		
		
		// 폼 전송에 필요한 HTML 문자열을 구성해서 반환함.
		getDownloadItemFormHtml : function(trkId){
			var html = [];
			html.push("<textarea name='trkId' style='display:none;'>"+trkId+"</textarea>");
			return html.join("");
		}, 
		
		
		// 플레이어 정보 전송용 폼 인터페이스 생성
		createForm : function(){
			if($("form[name=musicDownloaderForm]").size() == 0){
				var html = [];
				html.push("<form name='musicDownloaderForm'>");
				html.push("</form>");
				$("body").append(html.join(""));
				musicDownloader.base.form = $("form[name=musicDownloaderForm]");
			}

			musicDownloader.base.form.html("");
		}		
	}
	
};



$(document).ready(function(){
	
	if(opener){		// 팝업인경우
		
	}else{			// 바닥페이지인 경우
		// 바닥페이지의 URL이 변경되는 경우에 대한 처리
		$(window).unload(function(event){
			try{
				if(musicDownloader.downloaderWin != null && !musicDownloader.downloaderWin.closed && musicDownloader.downloaderWin.musicDownloader){
					musicDownloader.downloaderWin.musicDownloader.downloader.setDownloaderStart();
					musicDownloader = null;
					
				}
			}catch(e){
				alert(e.toString());		// 나중에 삭제 할 것!
			}
		});
	}
});

function trackUseHist(trkId){
	$.ajax({
        async : false, 
        url : "/ht/track/createTrackUseHist",
        dataType : "json", 
        type : "post", 
        data : {
            trkId : trkId,
            gubun : "down"
        }, 
        success : function(result){

        }, 
        error: function(request){

        }
    });
}

// track 당 3pc체크
function chkDown(sCid){
	var macAddr = Downloader.GetDeviceKey();
	var ret = "";
	
	$.ajax({
        async : false, 
        url : "/ht/track/searchTrackPc",
        dataType : "json", 
        type : "post", 
        data : {
            trkId : sCid,
            key : macAddr
        }, 
        success : function(result){
        	ret = result.ret;
        }, 
        error: function(request){
        		
        }
    });
	
	return ret;
}

//user 당 3pc체크
function chkDownUser(){
	var macAddr = Downloader.GetDeviceKey();
	var ret = "";

	$.ajax({
        async : false, 
        url : "/ht/track/searchUserPc",
        dataType : "json", 
        type : "post", 
        data : {
            key : macAddr
        }, 
        success : function(result){
        	ret = result.ret;
        }, 
        error: function(request){
        		
        }
    });
	
	return ret;
}

function passProc(){
	g_nFileIndex = parseInt(g_nFileIndex) + 1;
	if(g_nFileIndex <= max_g_nFileIndex){
         allDown();
    }else if(g_nFileIndex > max_g_nFileIndex){
    	initSessList();
    	if($("input[name=showfolder]").is(':checked')){
    		showfolder();
    	}
    	if($("input[name=closeWin]").is(':checked')){
    		window.close();
    	}
    }
}

//과금정보 저장
function savePlayerCharge(userNum, sSpb,sBuyStat,sCID){
	var macAddr = Downloader.GetDeviceKey();
	$.ajax({
        async : false, 
        url : "/ht/track/saveDownloadCharge",
        dataType : "json", 
        type : "post", 
        data : {
			userNum : userNum, 
        	trkId : sCID,
        	spb : sSpb,
        	buyStatus : sBuyStat,
        	key : macAddr     	
        }, 
        success : function(result, textStatus, XMLHttpRequest){
        	
        }, 
        error: function(request, textStatus, errorThrown){
            
        }
    });
}

function setMaxDownLen(){
	
	max_g_nFileIndex = $("input[name=trkId]").length - 1;
}

function getFileStatus(idx){

	var rt = musicDownloader.downloader.oldDownloadList[idx];
	if(rt == null){
		rt = "대기";
	}
	return rt;
	
}

function allDownBefore(){
	g_nFileIndex = 0;
	allDown();
}