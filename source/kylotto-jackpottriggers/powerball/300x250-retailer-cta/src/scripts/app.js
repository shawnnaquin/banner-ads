var showClass = 'show';
var layerArray = ['layer-one','layer-two','layer-three'];
var frameStarts = [2800, 5800];
var timeouts;
var KYObj, PBNum, MMNum;

function initAnimation() {
	getAjax();
	reset();
}

function getAjax() {
	microAjax({
		url: "https://accelerator.buntingroup.com/kylotto",
		method: "GET",
		success: function(data) {
			KYObj = JSON.parse(data);
			PBNum = KYObj.channel.item[0].description;
			// MMNum = KYObj.channel.item[1].description;
			document.querySelector('.js-amount-number').innerHTML = PBNum;
		},
		warning: function(error) {
			console.log('warnining!', error);
		},
		error: function(error) {
			console.log('error!', error);
		}
	});
}

function reset() {
	timeouts = [];
	runAd();
}

function runAd() {

	hideShow(2,0);

	timeouts.push( setTimeout( function() {
		hideShow(0,1);
	}, frameStarts[0] ));

	timeouts.push( setTimeout( function() {
		hideShow(1,2);
	}, frameStarts[1] ));

}

function hideShow(cur,next) {

	var layerOne = ['.js-lady', '.js-bubble', '.js-text'];
	var layerTwo = ['.js-layer2-star','.js-the','.js-layer2-powerball','.js-jackpotishere'];
	var layerThree = ['.js-info','.js-layer3-star'];
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