var layerArray = ['layer-one','layer-two','layer-three'];
var secondFrameStart = 2300;
var timeOnFrame = 3000;
var startDeg = -90;  
var degRange = 180;
var guageFrame = 0;
var tickArray = [];
var rgbRedValue = 255;
var timeouts;

// t: current time, b: begInnIng value, c: change In value, d: duration
function easeInOutCubic(t, b, c, d) {
	if ((t/=d/2) < 1) return c/2*t*t + b;
	return -c/2 * ((--t)*(t-2) - 1) + b;
}

function initAnimation() {
	reset();
}

function spawnColor(iter){
    this.goFrames = 0;
    this.color = rgbRedValue;
    this.iteration = iter;
    this.fillColor = function(){
		if ( this.goFrames <= 20 ) {
			document.querySelector('.js-guage-svg > path:nth-child('+String(this.iteration)+')').style.fill = 'rgb('+rgbRedValue+','+this.color+','+this.color+')';
			this.color = this.color - (rgbRedValue / 20);
			this.goFrames = this.goFrames + 1;
		    this.reqAnim = requestAnimationFrame( this.fillColor.bind(this) );
		} else {
			this.goFrames = 0;
			this.color = rgbRedValue;
			cancelAnimationFrame(this.reqAnim);
		}
	};
}

function engageGuage() {
	var totalFrames = 100;
	var currChild = 0;
	var reqGuage;
	if ( guageFrame <= totalFrames ) {
		var deg = startDeg+easeInOutCubic(guageFrame, 0, degRange, totalFrames );
		var iteration = Math.ceil( easeInOutCubic(guageFrame, 0, document.querySelectorAll('.js-guage-svg > path').length+1, totalFrames ) );
		document.querySelector('.js-needle').style.transform = 'rotateZ('+deg+'deg)';
		if ( currChild != iteration ) {
			tickArray[iteration] = new spawnColor(iteration);
			tickArray[iteration].fillColor();
			currChild = iteration;
		}
		guageFrame++;
		reqGuage = requestAnimationFrame(engageGuage);
	} else {
		guageFrame = 0;
		cancelAnimationFrame(reqGuage);
	}
}

function reset() {
	Array.prototype.forEach.call(document.querySelectorAll('.js-guage-svg > path'), function(el, i){
		el.style.fill = '';
	});
	document.querySelector('.js-needle').style.transform = 'rotateZ('+startDeg+'deg)';
	document.querySelector('.js-banner').classList.add('first-frame');
	timeouts = [];
	tickArray = [];
	runAd();
}

function runAd() {

	engageGuage();

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

