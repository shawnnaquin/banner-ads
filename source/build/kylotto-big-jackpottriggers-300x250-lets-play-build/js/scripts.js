/*global XMLHttpRequest */

/*
 * microAjax
 * Created 2015-2016 Caleb Ely
 * <http://CodeTri.net>
 *
 * Licensed under The MIT License
 * <http://opensource.org/licenses/MIT/>
 */


/**
 * Perform a simple async AJAX request.
 * @param {Object} options.<[method=GET], url, data,
 *                                        [success=function], [warning=function], [error=function]>
 *                 method: GET or POST.
 *                 url: The URL to contact.
 *                 data: the content to send to the page.
 *                 success: Code to run on request success.
 *                 warning: Code to run on request warning.
 *                 error: Code to run on request error.
 */
function microAjax(options) {
  "use strict";

  // Default to GET
  if (!options.method) {
    options.method = "GET";
  }

  // Default empty functions for the callbacks
  function noop() {}
  if (!options.success) {
    options.success = noop;
  }
  if (!options.warning) {
    options.warning = noop;
  }
  if (!options.error) {
    options.error = noop;
  }

  var request = new XMLHttpRequest();
  request.open(options.method, options.url, true);
  request.send(options.data);

  request.onload = function() {
    // Success!
    if (request.readyState === 4 && request.status === 200) {
      options.success(request.responseText);

      // We reached our target destination, but it returned an error
    } else {
      options.warning();
    }
  };

  // There was a connection error of some sort
  request.onerror = options.error;
}
var showClass = 'switched';
var effectClass = 'js-switch';
var frameStarts = [5500];
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
			// PBNum = KYObj.channel.item[0].description;
			MMNum = KYObj.channel.item[1].description;
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

var adDiv;

function initEB() {
    if (!EB.isInitialized()) {
        EB.addEventListener(EBG.EventName.EB_INITIALIZED, startAd);
    } else {
        startAd();
    }
}

function startAd() {
    adDiv = document.getElementById("ad");
    addEventListeners();
    initAnimation();
}

function addEventListeners() {
    document.getElementById("ad").addEventListener("click", clickthrough);
}

function clickthrough() {
    EB.clickthrough();
}

window.addEventListener("load", initEB);