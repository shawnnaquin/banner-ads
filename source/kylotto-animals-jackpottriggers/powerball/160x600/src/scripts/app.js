var showClass = 'switched';
var effectClass = 'js-switch';
var frameStarts = [2000];
var timeouts;
var KYObj, PBNum, MMNum;

function initAnimation() {
	getAjax();
	reset();
}

function lpad(value, padding) {
    var zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
}

function lpad(value, padding) {
    // var zeroes = new Array(padding+1).join("0");
    // return (zeroes + value).slice(-padding);
    return value;
}

function getAjax() {
	microAjax({
		url: "https://accelerator.buntingroup.com/kylotto",
		method: "GET",
		success: function(data) {
			KYObj = JSON.parse(data);
			// PBNum = KYObj.channel.item[0].description;
			MMNum = lpad( KYObj.channel.item[0].description, 3);
			document.querySelector('.js-number').innerHTML = MMNum;
		},
		warning: function(error) {
			console.log('warnining!', error);
		},
		error: function(error) {
			console.log('error!', error);
		}
	});
}

function doIt(add) {

	Array.prototype.forEach.call( document.querySelectorAll('.'+effectClass), function($div) {

		if ( add ) {
			$div.classList.add(showClass);
		} else {
			$div.classList.remove(showClass);
		}

	});

}

function reset() {
	doIt(false);
	timeouts = [];
	runAd();
}

function runAd() {

	var fn = function() {
		doIt(true);
	};

	timeouts.push( setTimeout( fn, frameStarts[0] ) );
}
