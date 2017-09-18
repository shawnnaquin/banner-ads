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
    goToFirstFrame();

    setTimeout(playVideo, 3000);

    setTimeout(cycle, 12000);
}

window.onload = init;