var cycleCount = 0;
var maxCycles = 3;

var video = document.getElementById('video');
var image = document.getElementById('frame-one');

function init(){
    cycle();
}

function playVideo(){
    video.play();
}

function goToFirstFrame() {
    video.currentTime = 0;
}

function cycle(){

	cycleCount++;

    goToFirstFrame();

    setTimeout(playVideo, 3000);

    setTimeout(function() {
    	if ( cycleCount < maxCycles ) {
    		cycle();
    	}
    }, 12000);
}

window.onload = init;