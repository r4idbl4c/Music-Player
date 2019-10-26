$(document).ready(function(){
	var currentSong = $('#myTrack')["0"];
	var playButton = $('#playButton')["0"];
	var muteButton = $('#muteButton')["0"];
	var currentTime = $('#currentTime')["0"];

	var barSize = 200;
	var bar = $('#defaultBar');
	var progressBar = $('#progressBar')["0"];

	function pad(d){
		return (d<10) ? '0'+d.toString() : d.toString();
	}
	//updates the orangebar with current time or to 0:00 when song ended 
	function update(){
		if(!currentSong.ended){
			var playedMinutes = pad(parseInt(currentSong.currentTime/60));
			var playedSeconds = pad(parseInt(currentSong.currentTime%60));
			currentTime.innerHTML = playedMinutes + ':' + playedSeconds;
			var size = parseInt(currentSong.currentTime*barSize/currentSong.duration);
			progressBar.style.width = size + "px";
		}
		else{
			currentTime.innerHTML = "0.00";
			
			//whenever audio ended play buttom replace at end
			playButton.style.backgroundImage = 'url(icon/icons8-play-50.png)';
			playButton.style.backgroundColor ='#FFF';
			$('#rotatingimg').removeClass().addClass('rotation-off');
			progressBar.style.width = "0px";
			window.clearInterval(updateTime);
		}
	}
	

	function playOrPause(){
		console.log('play pause clicked');
		if(!currentSong.paused && !currentSong.ended){
			//console.log($('#backSideBox')["0"].className);
			$('#rotatingimg').removeClass().addClass('rotation-off');
			$('#backSideBox').removeClass().addClass('playbar-box-hide');
			//console.log($('#backSideBox')["0"].className);
			currentSong.pause();
			playButton.style.backgroundImage = 'url(icon/icons8-play-50.png)';
			playButton.style.backgroundColor ='#FFF';
			window.clearInterval(updateTime);
		}
		else{
			//console.log($('#backSideBox')["0"].className);
			$('#rotatingimg').removeClass().addClass('rotation-on');
			$('#backSideBox').removeClass().addClass('playbar-box-rise');
			//console.log($('#backSideBox')["0"].className);
			currentSong.play();
			playButton.style.backgroundImage = 'url(icon/icons8-pause-50.png)';
			playButton.style.backgroundColor ='#fff4f4';
			updateTime = setInterval(update,500); //update time each
		}
	}

	function muteOrUnmute(){
		console.log('mutebutton clicked');
		if(currentSong.muted == true){
			currentSong.muted = false;
			
			muteButton.style.backgroundImage = 'url(icon/icons8-voice-filled-15.png)';
			muteButton.style.backgroundColor ='#FFF';
		}
		else{
			currentSong.muted = true;
			
			muteButton.style.backgroundImage = 'url(icon/icons8-mute-filled-15.png)';
			muteButton.style.backgroundColor ='#fff4f4';
		}
	}

	function forward5Sec(){
		if(!currentSong.paused && currentSong.currentTime < currentSong.duration - 5.00 && !currentSong.ended){
			//console.log(currentSong.currentTime);
			currentSong.currentTime += 5.00;
			//console.log(currentSong.currentTime);
		}
		else{
			console.log('sunley bhai pura sunley 5 sec hi reh gya hey');
		}
	}
	function backward5Sec(){
		if(!currentSong.paused && currentSong.currentTime > 5.00 && !currentSong.ended){
			currentSong.currentTime -= 5.00;
		}
		else{
			console.log('5 sec ruk lo bhai cause 5 sec pichey jata hey')
		}
	}

	$('#myTrack').on('loadedmetadata', function(){
		var minutes = pad(parseInt(currentSong.duration / 60));
		var seconds = pad(parseInt(currentSong.duration % 60));
		$('#fullDuration').html(minutes + ":" + seconds);
	});

	//play button click event
		$('#playButton').on('click', playOrPause);
		$('#muteButton').on('click', muteOrUnmute);
		$('.forward').on('click', forward5Sec);
		$('.backward').on('click', backward5Sec);

});