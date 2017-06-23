var showClass = 'show';
var layerArray = ['layer-one','layer-two','layer-three'];
var secondFrameStart = 2300;
var timeOnFrame = 3000;
var timeouts;

function initAnimation() {
	// getAjax();
	reset();
}

// function getAjax() {
// 	microAjax({
// 		url: "https://www.kylottery.com/apps/rss/nextjackpots.rss",
// 		method: "GET",
// 		success: function(data) {
// 			console.log(data);
// 		},
// 		warning: function(error) {
// 			console.log('warnining!');
// 		},
// 		error: function(error) {
// 			console.log('error!');
// 		}
// 	});
// }

function reset() {
	timeouts = [];
	runAd();
}

function runAd() {

	hideShow(2,0);

	timeouts.push( setTimeout( function() {
		hideShow(0,1);
	}, secondFrameStart) );

	timeouts.push( setTimeout( function() {
		hideShow(1,2);
	}, secondFrameStart+(timeOnFrame*1.16666) ) );

}

function hideShow(cur,next) {

	var layerOne = ['.js-lady', '.js-bubble', '.js-text'];
	var layerTwo = ['.js-layer2-star','.js-the', '.js-powerball','.js-jackpotishere'];
	var layerThree = ['.js-info'];
	var layerArrays = [layerOne, layerTwo, layerThree];

	// animate layer
	document.querySelector('.js-'+layerArray[cur]).classList.remove(showClass);
	document.querySelector('.js-'+layerArray[next]).classList.add(showClass);

	// animnate layer items
	layerArrays.forEach(function(el,i){
		el.forEach(function(il) {
			if ( i !== next ) {
				document.querySelector(il).classList.remove(showClass);
			} else {
				document.querySelector(il).classList.add(showClass);
			}
		});
	});

}