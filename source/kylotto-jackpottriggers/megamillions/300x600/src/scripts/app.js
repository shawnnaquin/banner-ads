var layerArray = ['layer-one','layer-two','layer-three'];
var secondFrameStart = 2300;
var timeOnFrame = 3000;
var timeouts;

// t: current time, b: begInnIng value, c: change In value, d: duration
// function easeInOutCubic(t, b, c, d) {
// 	if ((t/=d/2) < 1) return c/2*t*t + b;
// 	return -c/2 * ((--t)*(t-2) - 1) + b;
// }

function initAnimation() {
	// reset();
}

function reset() {
	timeouts = [];
	runAd();
}

function runAd() {

	timeouts.push( setTimeout( function() {
		hideShow(0,1);
	}, secondFrameStart) );

	timeouts.push( setTimeout( function() {
		hideShow(1,2);
	}, secondFrameStart+(timeOnFrame*1.16666) ) );

	// timeouts.push( setTimeout( function() {
	// 	hideShow(2,0);
	// 	reset();
	// }, secondFrameStart+(timeOnFrame*2.16666) ) );

}

function hideShow(cur,next) {
	document.querySelector('.js-'+layerArray[cur]).style.opacity = 0;
	document.querySelector('.js-'+layerArray[next]).style.opacity = 1;
	if ( cur === 0 ) {
		document.querySelector('.js-banner').classList.remove('first-frame');
	}
}

