var cycleCount = 0;
var maxCycles = 3;

var layerArray = ['layer-one','layer-two','layer-three','layer-four'];
var secondFrameStart = 2300;
var timeOnFrame = 2500;
var timeouts;

// t: current time, b: begInnIng value, c: change In value, d: duration
// function easeInOutCubic(t, b, c, d) {
// 	if ((t/=d/2) < 1) return c/2*t*t + b;
// 	return -c/2 * ((--t)*(t-2) - 1) + b;
// }

function initAnimation() {
	reset();
}

function reset() {

	document.querySelector('.js-back').style.transition = 'none';

	document.querySelector('.js-banner').classList.add('first-frame');
	document.querySelector('.js-back').classList.remove('grow');
	document.querySelector('.js-ball').classList.remove('animate');
	// document.querySelector('.js-blur').classList.remove('unblur');
	cycleCount++;
	timeouts = [];
	setTimeout( function() {
		runAd();
	},1);
}

function runAd() {

	document.querySelector('.js-back').style.transition = '';

	document.querySelector('.js-back').classList.add('grow');
	document.querySelector('.js-ball').classList.add('animate');
	// document.querySelector('.js-blur').classList.add('unblur');

	timeouts.push( setTimeout( function() {
		hideShow(0,1);
	}, secondFrameStart) );

	timeouts.push( setTimeout( function() {
		hideShow(1,2);
	}, secondFrameStart+(timeOnFrame*1.16666) ) );

	timeouts.push( setTimeout( function() {
		hideShow(2,3);
	}, secondFrameStart+(timeOnFrame*2.16666) ) );

	timeouts.push( setTimeout( function() {
	    if ( cycleCount < maxCycles ) {
			hideShow(3,0);
			reset();
		}
	}, secondFrameStart+(timeOnFrame*3.16666) ) );

}

function hideShow(cur,next) {
	document.querySelector('.js-'+layerArray[cur]).style.opacity = 0;
	document.querySelector('.js-'+layerArray[next]).style.opacity = 1;
	if ( cur === 0 ) {
		document.querySelector('.js-banner').classList.remove('first-frame');
	}
}

