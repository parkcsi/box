/*****************************************
	플레이어 관련 스크립트 모음
*****************************************/

var musicPlayer = {
	playerWin : null, 							// 플레이어 팝업
	playerWinHot : null, 							// 핫트랙스플레이어 팝업
	playListAareClass : "playListArea",						// 플레이어 목록을 구성하는 클래스명
	
	url : {
		update : "/ht/track/aodPlay/update", 
		player : "/ht/track/aodPlay/player",
		playerHot : "/ht/track/aodPlay/playerHot"
	}, 

	
	// 플레이어 관련 기능들...
	player : {
		playList : [],								// 플레이 목록
		
		// 플레이어 설정 - 팝업창에서 호출됨.
		setPlayer : function(win){
			opener.musicPlayer.playerWin = win;
		},
		
		
		// 타이머
		setPlayerWait : function(){
			try{
				musicPlayer.player.setPlayer(window);
			}catch(e){
				setTimeout("musicPlayer.player.setPlayerWait()", 500);
			}
		},
		
		// 플레이어 타이머 시작
		setPlayerStart : function(){
			setTimeout("musicPlayer.player.setPlayerWait()", 500);
		}, 


		// 플레이 목록 설정
		setPlayList : function(list){
			musicPlayer.player.playList = list;
		}, 
		
		// 플레이어 인터페이스 구성 - 최초 한번만 호출할 것! => 전체 새로 고침으로 처리됨.
		createPlayList : function(){
			var html = [];
			for(var i=0 ; i < musicPlayer.player.playList.length ; i++){
				html.push(musicPlayer.player.getPlayListItemHtml(musicPlayer.player.playList[i], i));
			}
			$("." + musicPlayer.playListAareClass).html(html.join(""));
		}, 


		// 1개 플레이 아이템의 HTML 레이아웃을 반환함. => 나중에 HTML 적용 요망
		getPlayListItemHtml : function(item, idx){
			var html = [];
			html.push("<li id='listLi' class='ui-draggable'>");
			html.push("<input type='hidden' name='trkId' value='" + item.trkId + "' />");
			html.push("<input type='hidden' name='trkName' value='" + item.trkName + "' />");
			html.push("<input type='hidden' name='artiName' value='" + item.artiName + "' />");
			html.push("<div class='btns'>");
			html.push("<div><span name='spanCheckBox' class='checkbox' onClick='musicPlayer.player.check("+idx+");' ><input type='checkbox' name='chkTrack' value='"+idx+"'/></span></div>");
			html.push("<input type='hidden' name='chkTrkId_"+idx+"' value='"+item.trkId+"'/>");
			html.push("<a id='btnPlay' title='듣기' href=javascript:play("+idx+",'c') onMouseOver=musicPlayer.player.chgImg("+idx+",'playone','b_playOver.gif') onMouseOut=musicPlayer.player.chgImg("+idx+",'playone','b_playOff.gif') >");
			html.push("<img alt='듣기' id='playone' src='http://image.kyobobook.co.kr/newimages/giftshop_new/common/images/player/b_playOff.gif'></a>");
			html.push(" <a title='담기' href=javascript:addMyListTrack("+item.trkId+")  onMouseOver=musicPlayer.player.chgImg("+idx+",'myPut','b_likeOver.gif') onMouseOut=musicPlayer.player.chgImg("+idx+",'myPut','b_likeOff.gif') >");
			html.push("<img alt='담기' id='myPut' src='http://image.kyobobook.co.kr/newimages/giftshop_new/common/images/player/b_likeOff.gif'></a>");
			html.push("</div>");
			html.push("<div class='info'>");
			html.push("<p><a id='btnPlay' title='"+item.trkName+"' class='title' href=javascript:play("+idx+",'c')>"+item.trkName+"</a></p>");
			html.push("<span style='text-overflow:ellipsis; white-space:nowrap; overflow:hidden;'><a title='"+item.artiName+"' class='artist' href='#'>"+item.artiName+"</a> / <a title='"+item.albumTitle+"' class='albumtitle' href='#'>"+item.albumTitle+"</a></span>");
			html.push("</div>");
			html.push("<div class='icos'></div>");
			html.push("<div class='action'>");
			html.push("<a id='view' href='javascript:viewLyrics("+item.trkId+")'><img src='http://image.kyobobook.co.kr/newimages/giftshop_new/common/images/sound/btn_viewlyrics.png' class='iepngfix' alt='가사' /></a>&nbsp;&nbsp;&nbsp;");
			html.push("<a id='down' href='javascript:window.opener.trkDown("+item.trkId+")'><img src='http://image.kyobobook.co.kr/newimages/giftshop_new/common/images/sound/btn_down.png' class='iepngfix' alt='다운' /></a>");
			html.push("</div>");
			html.push("</li>");
			
			return html.join("");
		}, 
		
		// 플레이 아이템 추가 처리 - 데이터 및 UI 모두 적용 처리함.
		addPlayList : function(list){
			var list = JSON.parse(list);
			
			for(var i=0 ; i < list.length ; i++){
				musicPlayer.player.playList.push(list[i]);
				
				var html = musicPlayer.player.getPlayListItemHtml(list[i], musicPlayer.player.playList.length - 1);
				$("." + musicPlayer.playListAareClass).append(html);
			}
		}, 
		
		// 플레이 아이템 추가 처리  - DB
		addPlayListToDb: function(list){
			var trkId = [];
			var list = JSON.parse(list);
			for(var i=0 ; i < list.length ; i++){
				trkId.push(list[i].trkId);
			}
			$.ajax({
		        async : false, 
		        url : "/ht/track/getPlayTrk",
		        dataType : "json", 
		        type : "post", 
		        data : {
		        	trkId : trkId.join(",") 
		        }, 
		        success : function(result, textStatus, XMLHttpRequest){
		        	musicPlayer.player.addPlayList(result.listJSON);
		         
		        }, 
		        error: function(request, textStatus, errorThrown){
		            
		        }
		    });
		},
		
		// 전체선택, 해제 처리
		checkAll : function(chk){
			
			if($("input[name=allChk]").is(':checked')){
				$("input[name=allChk]").attr("checked", "");
				$("span[name=spanAllChk]").attr("class","checkbox");
				$("input[name=chkTrack]").each(
						function(){
							
							$("span[name=spanCheckBox]").attr("class","checkbox");
							$(this).attr("checked", "");
						}
				);
			}else{
				
				$("input[name=allChk]").attr("checked", "checked");
				$("span[name=spanAllChk]").attr("class","checkbox checked");
				$("input[name=chkTrack]").each(
						function(){
							$("span[name=spanCheckBox]").attr("class","checkbox checked");
							$(this).attr("checked", "checked");
						}
				);
			}
		}, 
		// 개별선택, 해제 처리
		check : function(idx){
			if($("input[name=chkTrack]").eq(idx).is(':checked')){

				$("span[name=spanCheckBox]").eq(idx).attr("class","checkbox");
				$("input[name=chkTrack]").eq(idx).attr("checked","");

			}else{

				$("span[name=spanCheckBox]").eq(idx).attr("class","checkbox checked");
				$("input[name=chkTrack]").eq(idx).attr("checked","checked");
			}
		}, 

		// 선택한 항목을 플레이 목록에서 삭제한다.
		removePlayList : function(){
			if($("input[name=chkTrack]:checked").size() == 0){ alert("삭제할 항목을 선택해 주십시오."); return; }

			// 선택값 체크
			var chkIdx = [];
			$("input[name=chkTrack]:checked").each(function(idx){ 
				chkIdx.push(this.value*1); 
			});
			
			// 값 재구성
			var newList = [];
			for(var i=0 ; i < musicPlayer.player.playList.length ; i++){
				if($.inArray(i, chkIdx) < 0){
					newList.push(musicPlayer.player.playList[i]);
				}
			}
			musicPlayer.player.playList = newList;

			// 인터페이스 재구성
			musicPlayer.player.createPlayList();
		}, 

		// 체크박스에 선택된 트랙 아이디를 배열로 반환함.
		getCheckTrackIds : function(){
			var list = musicPlayer.player.playList;
			var trkIds = [];
			
			$("input[name=chkTrack]:checked").each(function(idx){
				trkIds.push(list[this.value].trkId);
			});
			
			return trkIds;
		},
		
		chgImg : function(idx,imgId,imgNm){
			
			var url = "http://image.kyobobook.co.kr/newimages/giftshop_new/common/images/player/"+imgNm;
			$("img#"+imgId).eq(idx).attr("src",url);
		}
		
		
	}, 
	
	// 바닥페이지 공통 기능들...
	base : {
		form : null, 			// 플레이어 전송용 폼
		
		// 플레이어 활성화
		openPlayer : function(){
			// 함수 호출 처리
			if(musicPlayer.playerWin != null && !musicPlayer.playerWin.closed){
				// 목록 구성 데이터 처리
				var list = [];
				
				// 1곡 플레이 처리
				if(typeof(arguments[0]) == "number"){
					var trkId = arguments[0];
					list.push(musicPlayer.base.getPlayItemData(trkId));
				}
				
				// 선택곡 플레이 처리
				if(typeof(arguments[0]) == "string"){
					var target = arguments[0];
					var html = [];
					
					$("input[name=" + target + "]:checked").each(function(idx){
						var trkId = this.value;
						list.push(musicPlayer.base.getPlayItemData(trkId));
					});
					if(list.length == 0){ alert("음원을 선택해 주십시오."); return; }
				}				
				
				musicPlayer.playerWin.musicPlayer.player.addPlayListToDb(JSON.stringify(list));
				musicPlayer.playerWin.focus();
			}else{	// 전송
				musicPlayer.playerWin = null;
				musicPlayer.base.createForm();
				
				// 1곡 플레이 처리
				if(typeof(arguments[0]) == "number"){
					var trkId = arguments[0];
					musicPlayer.base.form.html(musicPlayer.base.getPlayItemFormHtml(trkId));
				}
				
				// 선택곡 플레이 처리
				if(typeof(arguments[0]) == "string"){
					var target = arguments[0];
					var html = [];
					
					$("input[name=" + target + "]:checked").each(function(idx){
						var trkId = this.value;
						html.push(musicPlayer.base.getPlayItemFormHtml(trkId));
					});
					if(html.length == 0){ alert("음원을 선택해 주십시오."); return; }

					musicPlayer.base.form.html(html.join(""));
				}	

				musicPlayer.playerWin = window.open("", "musicPlayerWin", 'width=430,height=658');
				musicPlayer.base.form.attr("action", musicPlayer.url.update);
				musicPlayer.base.form.attr("target", "musicPlayerWin");
				musicPlayer.base.form.attr("method", "post");
				musicPlayer.base.form.submit();
			}
		}, 

		// 데이터 전송에 필요한 트랙 데이터 구조를 반환함.
		getPlayItemData : function(trkId){
			var d = {
				trkId : trkId
				/*
				trkId : $("input[name=trkId_" + trkId + "]").val(),
				trkName : $("input[name=trkName_" + trkId + "]").val(), 
				artiName : $("input[name=artiName_" + trkId + "]").val(), 
				albumTitle : $("input[name=albumTitle_" + trkId + "]").val() 
				*/
			};
			return d;
		},  
		
		
		// 폼 전송에 필요한 HTML 문자열을 구성해서 반환함.
		getPlayItemFormHtml : function(trkId){
			var html = [];
			html.push("<textarea name='trkId' style='display:none;'>" + trkId + " </textarea>");
			/*
			html.push("<textarea name='trkId'>" + $("input[name=trkId_" + trkId + "]").val() + " </textarea>");
			html.push("<textarea name='trkName'>" + $("input[name=trkName_" + trkId + "]").val() + " </textarea>");
			html.push("<textarea name='artiName'>" + $("input[name=artiName_" + trkId + "]").val() + " </textarea>");
			html.push("<textarea name='albumTitle'>" + $("input[name=albumTitle_" + trkId + "]").val() + " </textarea>");
			*/
			return html.join("");
		}, 
		
		
		// 플레이어 정보 전송용 폼 인터페이스 생성
		createForm : function(){
			if($("form[name=musicPlayerForm]").size() == 0){
				var html = [];
				html.push("<form name='musicPlayerForm'>");
				html.push("</form>");
				$("body").append(html.join(""));
				musicPlayer.base.form = $("form[name=musicPlayerForm]");
			}

			musicPlayer.base.form.html("");
		},
				
		// 핫트랙스플레이어 활성화
		openPlayerHot : function(){
			//if(!serviceCheck()){
				// 기본 폼 구성
				musicPlayer.base.createFormHot();
				musicPlayer.base.form.attr("action", musicPlayer.url.playerHot);
				musicPlayer.base.form.attr("target", "musicPlayerWinHot");
				musicPlayer.base.form.attr("method", "post");
				
				
				
				// 폼 데이터 구성
				if(arguments.length == 1){
					var name = arguments[0];
					if($("input[name=" + name + "]:checked").size() == 0){ alert("항목을 선택해 주십시오."); return; }
					else{
						var html = [];
						
						$("input[name=" + name + "]:checked").each(function(idx){
							var arr = $(this).val().split(",");
							html.push(musicPlayer.base.getPlayItemFormHtmlHot(arr[0], arr[1], arr[2]));
						});
						musicPlayer.base.form.html(html.join(""));
					}
				}
				
				if(arguments.length == 3){
					var musicCd = arguments[0];
					var cdNo = arguments[1];
					var trackNo = arguments[2];
					musicPlayer.base.form.html(musicPlayer.base.getPlayItemFormHtmlHot(musicCd, cdNo, trackNo));
				}
				
				
				// 함수 호출 처리
				if(musicPlayer.playerWinHot != null && !musicPlayer.playerWinHot.closed){
					musicPlayer.base.form.submit();
					musicPlayer.playerWinHot.focus();
				}else{	// 전송
					musicPlayer.playerWinHot = null;
					musicPlayer.playerWinHot = window.open("", "musicPlayerWinHot", 'width=702,height=388');
					musicPlayer.base.form.submit();
				}
			//}
		}, 
		
		// 플레이어 정보 전송용 폼 인터페이스 생성
		createFormHot : function(){
			if($("form[name=musicPlayerFormHot]").size() == 0){
				var html = [];
				html.push("<form name='musicPlayerFormHot'>");
				html.push("</form>");
				$("body").append(html.join(""));
				musicPlayer.base.form = $("form[name=musicPlayerFormHot]");
			}

			musicPlayer.base.form.html("");
		},
		
		// 데이터 전송에 필요한 트랙 데이터 구조를 반환함.
		getPlayItemDataHot : function(musicCd, cdNo, trackNo){
			var d = {
				musicCd : musicCd,
				cdNo : cdNo,
				trackNo : trackNo
			};
			return d;
		},
		
		// 폼 전송에 필요한 HTML 문자열을 구성해서 반환함.
		getPlayItemFormHtmlHot : function(musicCd, cdNo, trackNo){
			var html = [];
			var display = "none";
			html.push("<textarea name='musicCd' style='display:" + display + ";'>" + musicCd + " </textarea>");
			html.push("<textarea name='cdNo' style='display:" + display + ";'>" + cdNo + " </textarea>");
			html.push("<textarea name='trackNo' style='display:" + display + ";'>" + trackNo + " </textarea>");

			return html.join("");
		}
	}
	
};


$(document).ready(function(){
	if(opener){		// 팝업인경우
		
		
		
	}else{			// 바닥페이지인 경우
		// 바닥페이지의 URL이 변경되는 경우에 대한 처리
		$(window).unload(function(event){
			try{
				if(musicPlayer.playerWin != null && !musicPlayer.playerWin.closed && musicPlayer.playerWin.musicPlayer){
					musicPlayer.playerWin.musicPlayer.player.setPlayerStart();
					musicPlayer = null;
				}
			}catch(e){
				alert(e.toString());		// 나중에 삭제 할 것!
			}
		});
	}
});

function trackUseHist(trkId){
	//histFlag = 'Y';
	$.ajax({
        async : false, 
        url : "/ht/track/createTrackUseHist",
        dataType : "json", 
        type : "post", 
        data : {
            trkId : trkId ,
            gubun : "play"
        }, 
        success : function(result, textStatus, XMLHttpRequest){
        	histFlag = 'Y';
        }, 
        error: function(request, textStatus, errorThrown){
        	histFlag = 'N';
        }
    });
}

// 플레이어 팝업에서 다운로드.
function trkDown(trkId){
	
	if(typeof(trkId) == "number"){
		musicDownloader.base.openDownloader(trkId);
	}else if(typeof(trkId) == "object"){
		musicDownloader.base.openDownloader(trkId);
	}
	
}

// default설정.
function defaultValue(){
	 // default 값 정의
    suffleYn = 'N';
    loopYn = 'Y';
    oneLoopYn = 'N';
    // suffle 순서생성.
    mediaLen = ($("input[name=trkId]").length)-1;
    suffleAryMake();
    currentIdx = 0;
    play(currentIdx);
}

//음원 플레이어
function play(p,gubun)
{
    
    var intP;
    var id;
    // suffle 재생체크
    if(suffleYn == 'N'){
        intP = parseInt(p);
    }else if(suffleYn == 'Y' && gubun =='n'){
        // 미리생성해둔 suffle순서 적용.
        intP = parseInt(suffleAry[p]);
    }else if(suffleYn == 'Y' && gubun =='c'){
    	intP = parseInt(p);
    }
    
    if(Player.playstate != 2) {
        id = parseInt($("input[name=trkId]").get(intP).value); 

        switch(id%4) {
            case 1 :
                Player.ServerAdd='fds1bgm.rsrs.co.kr';
                break;
            case 2 :
                Player.ServerAdd='fds2bgm.rsrs.co.kr';
                break;
            case 3 :
                Player.ServerAdd='fds3bgm.rsrs.co.kr';
                break;
            case 0 :
                Player.ServerAdd='fds4bgm.rsrs.co.kr';
                break;
        }
    
        Player.MediaID=id;
        cTrk = id;
    }

    if(sessChk() == false){
    	listenYn = false;
    	omYn = 'Y';
    	alertView();
    }else{
    	listenYn = true;
    	omYn = 'N';
    	messageYn = 'N';
    	alertView();
    }
    Player.controls.play();
    currentIdx = p;
    applyTitleHilight(intP);
    playTimeDuration();
    musicProgress();
    histFlag = 'N';
    trackUseHistoty();
    runTimeCheck();
    $('a#play').hide();
    $('a#pause').show();
}


//전체/1분 미리듣기 여부 -- 전체 듣기 권리가 없는 사용자이고 1분 이상 들었으면 재생 중지 or 다음곡 재생
function runTimeCheck() {
    if(Player.playstate == 3) {
        if( (isLogin == false || listenYn == false) && Player.controls.currentPosition >= 60){ 
        	omYn = "Y";
            Player.controls.stop();
      }
    }
    // 전체곡수 체크
    var newMediaLen = ($("input[name=trkId]").length)-1;
    if(mediaLen != newMediaLen){
        //전체곡수 틀려지면 suffle 순서 재생성.
        suffleAryMake();
    }
    mediaLen = newMediaLen;
    // 전체곡수 표시
    $("span#allPlayCount").html(parseInt(mediaLen)+1);
    setTimeout("runTimeCheck()",500);
}

// 곡명 아티스트명 표시및 플레이곡 하이라이트 표시
function applyTitleHilight(param){
	var intP = parseInt(param);
	$('span#trkNameView').html(cutString($("input#[name=trkName]").get(intP).value));
    $('span#artiNameView').html("/ "+cutString($("input#[name=artiName]").get(intP).value));
    
    for(i=0; i<=mediaLen; i++) {
    	$("li#listLi").eq(i).attr("class","ui-draggable");
    }
    $("li#listLi").eq(intP).attr("class","ui-draggable nowPlaying");
}

//음원 플레이시간표시 및 진행 바 표시
function playTimeDuration() {
    var curTime = Player.controls.currentPositionString;
    var durInt;
    if(isLogin && listenYn){
    	durInt = parseInt(Player.currentMedia.duration);
    }else{
    	if(parseInt(Player.currentMedia.duration) > 60){
    		durInt = 60;
    	}else{
    		durInt = parseInt(Player.currentMedia.duration);
    	}
    }
    var curInt = parseInt(Player.controls.currentPosition);
    var mok = addTowTime(parseInt((durInt-curInt)/60));
    var namerge = addTowTime(parseInt((durInt-curInt)%60));
    $('span#curTime').html(curTime);
    $('span#minusCurTime').html("- "+mok+":"+namerge);
    
    setTimeout("playTimeDuration()",500);
}
// 곡 진행상태바 
function musicProgress(){
	var durInt;
	if(isLogin && listenYn){
    	durInt = Player.currentMedia.duration;
    }else{
    	if(parseInt(Player.currentMedia.duration) > 60){
    		durInt = 60;
    	}else{
    		durInt = Player.currentMedia.duration;
    	}
    }
	var curInt = parseInt(Player.controls.currentPosition);
	if(curInt > 0 && (durInt*1) > 0){
		var n = Math.ceil((curInt * 100) * 1 / (durInt*1));
	}else {
		n=0;
	}
	$('span#progress').css("width",n + "%"); 
	setTimeout("musicProgress()",3000);
}
// 차감 시간에 '0' 붙이기
function addTowTime(n){
	var r;
	n = new String(n);
	if(n.length == 1){
		   r = "0"+n;	
	}else{
		r = n;
	}
	return r;
}

// 곡명, 아티스트명 15자리 자르기
function cutString(s){
	s = new String(s);
	var rstr;
	if(s.length > 15){
		rstr = s.substr(0,15);
		rstr = rstr + "...";
	}else{
		rstr = s+"";
	}
	return rstr;
}

// 베스트랭킹 history 쌓기 
function trackUseHistoty(){
    var dur = parseInt(Player.currentMedia.duration);
    var cur = parseInt(Player.controls.currentPosition);
    var perCur30 = (dur * 30)/100;
    if( cur > perCur30){
        if(histFlag == 'N'){
            trackUseHist(Player.MediaID);
        }
    }
   
    setTimeout("trackUseHistoty()",1000);
}

// 음원ready 상태처리.
function playproc(str,bool){
	//alert("playstate="+ Player.playstate +"/mediaLen="+mediaLen+"/currentIdx = "+ currentIdx+ "/str="+str);
    // 음원의 마지막index 미도착.
    if((str == 'Ended' || str == 'Stop') && mediaLen > currentIdx){
        //alert("setStateInfoStr 의 currentIdx=" + currentIdx);
        if(oneLoopYn == 'Y'){
            //현재곡반복재생.
            currentIdx = currentIdx;
        }else{
            // 다음곡 재생.
            currentIdx = parseInt(currentIdx)+1;
        }
        play(currentIdx,'n');
        
   // 음원의 마지막 index 도착.
    }else if((str == 'Ended' || str == 'Stop') && mediaLen == currentIdx){
        if(loopYn == 'Y' && oneLoopYn == 'N' && suffleYn == 'N'){
            //전체반복
            currentIdx = 0;
            play(currentIdx,'n');
        } else if(loopYn = 'N' && oneLoopYn == 'Y' && suffleYn == 'N'){
            //현재곡반복
        	play(currentIdx,'n');
        } else if(loopYn = 'N' && oneLoopYn == 'N' && suffleYn == 'N'){
            //반복없고 순차재생.
            Player.controls.stop();
            loopYn = 'N';
        } else if(oneLoopYn == 'N' && suffleYn == 'Y'){
            currentIdx = 0;
            play(currentIdx,'n');
        } else if(oneLoopYn == 'Y' && suffleYn == 'Y'){
        	play(currentIdx,'n');
        }
        
    }
}

//음원 상태 이벤트처리   
function setStateInfoStr(str, bool){
    //alert("str="+str+"/currentIdx="+currentIdx+"/status="+Player.playstate);
    if((str=='Ready' && bool==false) || (str=='Ended' && bool==false)){
    	if(str == 'Ready' && Player.playstate == '10'){
    		// 과금저장.
    		curT = parseInt(Player.controls.currentPosition);
    		//durT = parseInt(Player.currentMedia.duration); // 여기에서 찍으면 0이됨.
    		savePlayerCharge(spb,cTrk,curT,durT,omYn);
    	}
        // 반복없고 마지막곡 끝날때 플레이버튼이미지활성화.
    	if(str=='Ended' && loopYn=='N' && oneLoopYn == 'N' && currentIdx == mediaLen){
    		 $('a#play').show();
    	     $('a#pause').hide();
    	}
    	
    	// 바로재생시 곡뛰어넘는현상으로 딜레이줌.
    	setTimeout("playproc('"+str+"','"+bool+"')",1000); 
    }else if(str=='Change'&& bool==true){
        // 곡바뀔때 전체음원갯수체크
        mediaLen = ($("input[name=trkId]").length)-1;
    }else if(str =='Playing' && bool==true){
    	// 현재 진행중인 음원의 전체 재생시간 정보 저장
    	curT = parseInt(Player.controls.currentPosition);
    	durT = parseInt(Player.currentMedia.duration);
    }else if(str=='Stop' && bool==false){
        // stop() 함수 사용시 발생 status. 1분듣기시 stop() 함수 사용으로 다음곡1  분듣기 처리.
        if(isLogin == false || listenYn == false){
        	setTimeout("playproc('"+str+"','"+bool+"')",1000); 
        }
        // 반복없고 마지막곡 끝날때 플레이버튼이미지활성화.
        if(loopYn=='N' && oneLoopYn == 'N' && currentIdx == mediaLen){
   		 $('a#play').show();
   	     $('a#pause').hide();
        }
    }
}
// 볼륨..
function setVolumePosition(){
	var vol = $("span#spanVolum").css("width");
	vol = vol.substring(0,vol.length -2);
    Player.Settings.Volume = vol;
}
//음원 반목모드 
function loopMode() {
    if(loopYn == 'Y' && oneLoopYn=='N'){
        loopYn='N';
        oneLoopYn='Y';
        $('a#loop1').hide();
        $('a#loop2').show();
        $('a#loop0').hide();

    }else if(loopYn == 'N' && oneLoopYn=='Y'){
        loopYn='N';
        oneLoopYn = 'N';
        $('a#loop1').hide();
        $('a#loop2').hide();
        $('a#loop0').show();

    }else if(loopYn == 'N' && oneLoopYn=='N'){
        loopYn ='Y';
        oneLoopYn = 'N';
        $('a#loop1').show();
        $('a#loop2').hide();
        $('a#loop0').hide();

    }
}
// 음원 랜덤듣기mode 설정.
function suffleMode(){
    if(suffleYn == 'Y'){
        suffleYn = 'N';
        $('a#suffleN').show();
        $('a#suffleY').hide();
    }else if(suffleYn == 'N'){
        suffleYn ='Y';
        $('a#suffleN').hide();
        $('a#suffleY').show();
    }
}
// 음원suffle만들기
function suffleAryMake(){
    var z=0;
    mediaLen = ($("input[name=trkId]").length)-1;
    if(mediaLen >= 0){
        suffleAry = new Array(mediaLen);
        while(z <= mediaLen){
            var f=0;
            var randNo= Math.floor(Math.random() * (parseInt(mediaLen)+1));
            for(i=0; i<=suffleAry.length;i++){
                  if(suffleAry[i] == randNo){
                      f++;
                  } 
            }
            if(f == 0){
                suffleAry[z] = randNo;
                z++;
            }
            if(z > mediaLen){
                break;
            }
        }
    }
    /* 서플순서 보기 - alert
    var bstr="";
    for(j=0; j<suffleAry.length;j++){
        var astr = suffleAry[j];
        bstr = bstr+","+astr;
    }
    alert("["+bstr+"]");
    */
}

//음원 이전곡다음곡처리
function runPlay(r){
    mediaLen = ($("input[name=trkId]").length)-1;
    if(mediaLen >= 0){
        if(r == "prev"){
            var prevIdx = parseInt(currentIdx) -1;
            if(prevIdx >= 0){
                currentIdx = prevIdx;
                play(currentIdx,'n');
            }else if(prevIdx < 0){
            	if(loopYn=='Y'){
              	  currentIdx = mediaLen;
              	  play(currentIdx,'n');
                }
            }
        }else if(r == "next"){
            var nextIdx = parseInt(currentIdx) +1;
            if(nextIdx > mediaLen){
              if(loopYn=='Y'){
            	  currentIdx = 0;
            	  play(currentIdx,'n');
              }else if(loopYn == 'N'){
            	  play(currentIdx,'n');
              }
              
            }else{
              currentIdx = nextIdx;
              play(currentIdx,'n');
              
            }
        }
    }
}

//선택항목 담기 처리
function playerAddMyListTrack(){
    var trkIds = musicPlayer.player.getCheckTrackIds();

    if(trkIds.length == 0){ 
    	   alert("항목을 선택해 주십시오");
    	   return; 
    }
    addMyListTrack(trkIds.join(","));
}

// 각버튼 활성화 비활성화
function playMusic(){
	Player.controls.play();
	 $('a#pause').show();
	 $('a#play').hide();
}

function pauseMusic(){
	Player.controls.pause();
     $('a#play').show();
     $('a#pause').hide();
}

function hideObj(){
	 $("div[class=layerbox]").hide();
}

function goBuyMusicProduct(){
    if(confirm("음원상품권 구매페이지로 이동하시겠습니까? \n"+
                 "이동 시 현재페이지의 정보는 저장되지 않습니다.")){
        opener.location.href = "/ht/help/buyMusicProduct";
        self.close();
    }
}
//  다운 클릭시
function downloadTrkIds(param){
	var target = [];
    $("input[name=chkTrack]").each(
            function(){
            	if(this.checked){
            		var idx=this.value;
            		target.push($("input[name=trkId]").get(idx).value);
            	}
            }
    );
    if(target.length == 0){ alert("음원을 선택해 주십시오."); return;}
    window.opener.trkDown(target);
    
}

// 과금정보 저장
function savePlayerCharge(spb,trk,cur,dur,omYn){

	if(cur == "" || dur == ""){ return; }
	
	$.ajax({
        async : false, 
        url : "/ht/track/savePlayerCharge",
        dataType : "json", 
        type : "post", 
        data : {
        	trkId : trk,
        	spb : spb,
        	curT : cur,
        	durT : dur,
        	omYn : omYn       	
        }, 
        success : function(result, textStatus, XMLHttpRequest){
        }, 
        error: function(request, textStatus, errorThrown){
        }
    });
}
// 곡 플레이 시 세션체크
function sessChk(){
	var sessChk;
    $.ajax({
        async : false, 
        url : "/ht/track/sessChk",
        dataType : "json", 
        type : "post",
        success : function(result, textStatus, XMLHttpRequest){
        	sessChk = result.continuePlay;
        	isLogin = result.isLogin;
        }, 
        error: function(request, textStatus, errorThrown){
            
        }
    });
    return sessChk;
}