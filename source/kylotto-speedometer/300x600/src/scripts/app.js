var layerArray = ['layer-one','layer-two','layer-three'];
var fadeDuration = 500;
var startAt = 2300;
var timeOnFrame = 3000;
var timeouts;

function initAnimation() {
	reset();
}

function reset() {
	document.querySelector('#banner').classList.add('first-frame');
	document.querySelector('.js-guage-svg').classList.add('run-guage');
	document.querySelector('.js-needle').classList.add('run-speed');
	clearTimeouts();
	runAd();
}

function clearTimeouts() {
	timeouts = [];
}

function runAd() {

	timeouts.push( setTimeout( function() {
		hideShow(0,1);
	}, startAt) );

	timeouts.push( setTimeout( function() {
		hideShow(1,2);
	}, startAt+(timeOnFrame*1.16666) ) );

	// 	timeouts.push( setTimeout( function() {
	// 		hideShow(2,0);
	// 		reset();
	// 	}, startAt+(timeOnFrame*2.16666) ) );

}

function hideShow(cur,next) {

	document.querySelector('.js-'+layerArray[cur]).style.opacity = 0;
	document.querySelector('.js-'+layerArray[next]).style.opacity = 1;

	if ( cur === 0 ) {
		document.querySelector('#banner').classList.remove('first-frame');
		setTimeout(function(){
			document.querySelector('.js-needle').classList.remove('run-speed');
			document.querySelector('.js-guage-svg').classList.remove('run-guage');
		}, fadeDuration);
	}

}


