// 전역 변수 선언.
var ttplayer = null;
var tt_state = 0;
var playListLoaded = false;

//flash 파일 경로
var strFlash_Path = "/images/musicPlayer/";

function Check_IE()
{
	var isIE = 0;
	var IE = navigator.appVersion;
    if(IE.indexOf("MSIE") != -1)
    {
   		isIE = 1;
    }
	else
	{
		alert('[음악 듣기 서비스]는 인터넷익스플로러 에서만 지원되며, \r\n파이어폭스/구글크롬/사파리 등에서는 지원이 되지 않습니다. \r\n\r\n- 파이어폭스는 부가기능의 [IE Tab]을 통해 이용이 가능합니다. ');		
	}
	
	return isIE;
}

function checkWindows()
{
	if( Check_IE() == 1)
	{
		try
		{
			OpenUrl = opener.location.href;
			
			init_play_code();
		}
		catch(E)
		{
			//alert(E);
			this.location.href='about:blank';
		}
	}else{
		this.close();	//익스플로러가 아닐땐 플레이어창을 닫는다.
	}
	
	this.focus();
}

function init_play_code()
{
	var CodeString;
	
	if(-1 != navigator.userAgent.indexOf("MSIE"))
	{
		CodeString = '<object id=\"ttplayer\" name=\"ttplayer\" type=\"application/x-oleobject\" height=\"0\" standby=\"Loading Microsoft Windows Media Player components...\" width=\"0\" classid=\"CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6\">';
		CodeString += '	<param NAME=\"autoStart\" VALUE=\"true\">';
		CodeString += '	<param NAME=\"volume\" VALUE=\"50\">';		
		CodeString += '</object>';
	}
	else
	{
		CodeString = '<EMBED id=\"ttplayer\" type=\"application/x-ms-wmp\" width=\"0\" height=\"0\" autostart=\"true\" volum=\"50\" />';
		//CodeString = '<object id=\"ttplayer\" type=\"application/x-ms-wmp\" height=\"0\" width=\"0\" >';
		//CodeString += '	<param NAME=\"autoStart\" VALUE=\"true\">';
		//CodeString += '	<param NAME=\"volume\" VALUE=\"50\">';
		//CodeString += '</object>';

	}         

	document.write(CodeString);
	ttplayer = document.ttplayer;
	setTimeout('tt_playstatus();',1000);
}	

function tt_play()
{
	if(ttplayer.controls.isAvailable("play"))
		ttplayer.controls.play();
}

function tt_pause()
{
	if(ttplayer.controls.isAvailable("pause"))
		ttplayer.controls.pause();
}

function tt_stop()
{
	if(ttplayer.controls.isAvailable("stop"))
		ttplayer.controls.stop();
}


function tt_next()
{
	var bNext = false;
	
	if(ttplayer.controls.isAvailable("next"))
	{
	    var playlistItems = ttplayer.currentPlaylist.count; 
	    
	    for (i=0; i<playlistItems; i++)
	    { 
	    	if(ttplayer.currentMedia.sourceURL == ttplayer.currentPlaylist.item(i).sourceURL)
	    	{
	    		if( playlistItems > i)
	    		{
	    			if(playlistItems >= (i+2))
	    			{
	    				bNext = true;
						plistFrm.changeItem((i+2), 0);
						break;	
					}
				}
	    	} 
		}
		if(bNext == true)
		{
			ttplayer.controls.next();
		}
	}
}

function tt_prev()
{
	if(ttplayer.controls.isAvailable("previous"))
	{
	    var playlistItems = ttplayer.currentPlaylist.count; 
	    
	    for (i=0; i<playlistItems; i++)
	    { 
	    	if(ttplayer.currentMedia.sourceURL == ttplayer.currentPlaylist.item(i).sourceURL)
	    	{
	    		if( i > 0)
					plistFrm.changeItem(i, 0);
				break;	
	    	} 
		}  	
		ttplayer.controls.previous();
	}
}

function tt_vol(val)
{
	ttplayer.settings.volume = val;
}

function tt_vol_up(val)
{
	var org = ttplayer.settings.volume;
	
	if( (org + val) >= 100)
		ttplayer.settings.volume = 100;
	else
		ttplayer.settings.volume = (org+val);
}

function tt_vol_down(val)
{
	var org = ttplayer.settings.volume;
	
	if( (org - val) <= 0)
		ttplayer.settings.volume = 0;
	else
		ttplayer.settings.volume = (org-val);
}

function tt_mute(parm)
{
	if(parm == "on")
		ttplayer.settings.mute = true;
	else if(parm == "off")
		ttplayer.settings.mute = false;
}

function tt_select(index)
{
	var no = index - 1;
	var playlistItems = ttplayer.currentPlaylist.count; 
	if (playlistItems > 0)
	{ 

		ttplayer.controls.stop(); 
		try
		{
			ttplayer.controls.currentItem=ttplayer.currentPlaylist.item(no); 
		}
		catch(E)
		{
		}
		ttplayer.controls.play(); 		
	} 
}
function tt_playlist()
{
	var CurMedia = ttplayer.controls.currentItem;

  	var title = document.getElementById('track_name');
  	var curtime = document.getElementById('track_time');
  	var track = document.getElementById('track_no');
  	
	try
	{
		var temp = CurMedia.name;
		var items = temp.split('||');

		if(items.length == 2)
		{
			var tmp = items[0].split('/');
			
			if(tmp.length == 2)
			{
				track.innerHTML = tmp[1]+'. ';
			}
			else
			{
				track.innerHTML = '&nbsp;';
			}

			if(items[1].length > 42)
			{
				title.innerHTML = items[1].substring(0,42) + '....';
			}
			else
		  	{
		  		title.innerHTML = items[1];
		  	}

		}
		else  	
		{
	  		title.innerHTML = '';
		}
  	}
  	catch(E)
  	{
  		alert(E);
  	}

  	try{
  		var TotTime =  CurMedia.durationString;
	}
	catch(E)
	{
		var TotTime = '';
	}
  	
  	curtime.innerHTML = TotTime+' / 00:00';
  	
  	
    var playlistItems = ttplayer.currentPlaylist.count; 
    
    for (i=0; i<playlistItems; i++)
    { 
    	if(ttplayer.currentMedia.sourceURL == ttplayer.currentPlaylist.item(i).sourceURL)
    	{
			if(ttplayer.playState == 3)
			{
				plistFrm.changeItem((i+1), 0);
			}
			break;	
    	} 
	}  	
}

function tt_pos(oldPosition, newPosition)
{
	var ctl_bar = document.getElementById('ctl_bar');
	
	var track  = document.getElementById('track_no');
	
	track.innerHTML = '[o:'+oldPosition+' /n:'+newPosition+' ]';
}

function tt_playstatus()
{
	var curtime = document.getElementById('track_time');

	try{
		var TotTime = ttplayer.controls.currentItem.durationString;
	}
	catch(E)
	{
		var TotTime = '';
	}
	
	try{
		var CurTime = ttplayer.controls.currentPositionString;
	}
	catch(E)
	{
		var CurTime = '00:00';
	}

	ctl_bar();

	var new_state = ttplayer.playState;
	switch(new_state)
	{
		case 1:	// stop
		case 2:	// paused
			if(tt_state != new_state)
			{
				change_ctl_status('stop');
			}
			curtime.innerHTML = TotTime+' / '+CurTime;
			tt_state != new_state;
			break;
		case 3:	// playing
			if(tt_state != new_state)
			{
				change_ctl_status('run');
			}
			curtime.innerHTML = TotTime+' / '+CurTime;
			tt_state != new_state;
			break;
		case 6:
		case 7:
			if(tt_state != new_state)
			{
				change_ctl_status('wait');
			}
			tt_state != new_state;
			break;
		case 4:	
		case 5:
		case 8:
		case 9:
		case 10:
		case 0:
		default:
			change_ctl_status('stop');
			tt_state != new_state;
			break;
	}
	setTimeout('tt_playstatus();',1000);
	
	if(TotTime != '')
	{	
	    var playlistItems = ttplayer.currentPlaylist.count; 
	    
	    for (i=0; i<playlistItems; i++)
	    { 
	    	if(ttplayer.controls.currentItem.sourceURL == ttplayer.currentPlaylist.item(i).sourceURL)
	    	{
				try
				{
		  			var times = plistFrm.document.getElementById('times_'+(i+1));
		  			if(times.innerHTML != ttplayer.controls.currentItem.durationString)
		  				times.innerHTML = ttplayer.controls.currentItem.durationString;

				}
				catch(E)
				{
					//alert(E);
				}
			
				break;	
	    	} 
		}  	
	}
}

function tt_playstatus_e()
{
	var curtime = document.getElementById('track_time');

	try{
		var TotTime = ttplayer.controls.currentItem.durationString;
	}
	catch(E)
	{
		var TotTime = '';
	}
	
	try{
		var CurTime = ttplayer.controls.currentPositionString;
	}
	catch(E)
	{
		var CurTime = '00:00';
	}

	var new_state = ttplayer.playState;
	switch(new_state)
	{
		case 1:	// stop
		case 2:	// paused
			if(tt_state != new_state)
			{
				change_ctl_status('stop');
			}
			curtime.innerHTML = TotTime+' / '+CurTime;
			tt_state != new_state;
			break;
		case 3:	// playing
			if(tt_state != new_state)
			{
				change_ctl_status('run');
			}
			curtime.innerHTML = TotTime+' / '+CurTime;
			tt_state != new_state;
			break;
		case 6:
		case 7:
			if(tt_state != new_state)
			{
				change_ctl_status('wait');
			}
			tt_state != new_state;
			break;
		case 4:	
		case 5:
		case 8:
		case 9:
		case 10:
		case 0:
		default:
			change_ctl_status('stop');
			tt_state != new_state;
			break;
	}
}

function tt_barCtl() {                                                                                 
	var x_position;                                                                              
	var y_position;                                                                              
	var curr_pos;                                                                                
                                                                                               
	x_position = window.event.clientX;                                                           
	y_position = window.event.clientY;   
	
	try
	{		      
		if (ttplayer.PlayState == 3 || ttplayer.PlayState == 6) {                                
			if (x_position > 205 && y_position > 55 && x_position < 680 && y_position < 70) {         
				curr_pos = (ttplayer.currentMedia.Duration * (x_position -205)) / 485;		         
				ttplayer.controls.currentPosition = curr_pos;                                      
			}                                                                                        
		}                                                                                            
	}
	catch(E)
	{
	}		
} 

function change_ctl_status(doing)
{
	var flash = document.getElementById('ctl_st');	
	
	if(doing == "run")
	{
		flash.movie = strFlash_Path+'cd_play.swf';
	}
	else if(doing == "stop")
	{
		flash.movie = strFlash_Path+'cd_stop.swf';
	}
	else if(doing == "wait")
	{
		flash.movie = strFlash_Path+'cd_buffer.swf';
	}
}

function ctl_bar()
{
	var ctl_bar = document.getElementById('ctl_bar');
	var pos = 0;

	try
	{
		var tot_pos = ttplayer.controls.currentItem.duration;
		var	cur_pos = ttplayer.controls.currentPosition;

		if(cur_pos != 0)		
			pos = 465 * ( cur_pos / tot_pos);

	}
	catch(E)
	{
	}
	ctl_bar.width = pos;
}

function getPlaylistName(choice)
{
	ttplayer.url = "/ht/track/aodPlay/playListHot?"+choice;
	
    return false;
}

function showPlaylist()
{
	plistFrm.location.href = '/pages/front/aodPlay/aodPlayHot/playerHotPlaylist.jsp';
	playListLoaded = true;
}

function wait_close()
{
	var wait_layer = document.getElementById('wait_layer');	
	
	wait_layer.style.display = 'none';
}

function flash_insert(id, url, width, height){
    document.write('<object id='+id+' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="' + width + '" height="' + height + '" VIEWASTEXT>');
    document.write('<param name="movie" value="' + url + '">');
    document.write('<param name="quality" value="high">');
	document.write('<param name="menu" value="false">');
    document.write('<param name="wmode" value="transparent">');
    document.write('<embed id="+id+" src="' + url + '" quality="high" wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + width + '" height="' + height + '"></embed>');
    document.write('</object>');
}