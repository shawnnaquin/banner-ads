  //requestAnimationFrame polyfill | Milos Djakonovic ( @Miloshio ) | MIT | https://github.com/milosdjakonovic/requestAnimationFrame-polyfill

  /**
   * 
   * How many times should polyfill call
   * update callback? By canon, it should
   * be 60 times per second, so that ideal
   * framerate 60fps could be reached.
   *
   * However, even native implementations
   * of requestAnimationFrame often cannot
   * do 60fps, but, unlike any polyfill,
   * they can synchronise achievable fps
   * rate with screen refresh rate.
   *
   * So, leave this value 1000/60 unless
   * you target specific browser on spec
   * ific device that is going to work 
   * better with custom value. I think
   * that this is the longest comment I've
   * written on single variable so far.
  **/ 
  var FRAME_RATE_INTERVAL = 1000/60,

  /**
   * All queued callbacks in given cycle.
  **/ 
  allCallbacks = [],
  
  executeAllScheduled = false,
  
  shouldCheckCancelRaf = false,
  
  /**
   * Callbacks queued for cancellation.
  **/ 
  callbacksForCancellation = [],
  
  /**
   * Should callback be cancelled?
   * @param cb - callback
  **/ 
  isToBeCancelled = function(cb){
    for(var i=0;i<callbacksForCancellation.length;i++){
      if(callbacksForCancellation[i] === cb ){
        callbacksForCancellation.splice(i,1);
        return true;
      }
    }
  },
  
  
  
  /**
   * 
   * Executes all (surprise) callbacks in
   * and removes them from callback queue.
   *
  **/
  executeAll = function(){
    executeAllScheduled = false;
    var _allCallbacks = allCallbacks;
    allCallbacks = [];
    for(var i=0;i<_allCallbacks.length;i++){
      if(shouldCheckCancelRaf===true){
        if (isToBeCancelled(_allCallbacks[i])){
          shouldCheckCancelRaf = false;
          return;
        }
      }
      _allCallbacks[i].apply(w, [ new Date().getTime() ] );
    }
  },
  
  /**
   *
   * requestAnimationFrame polyfill
   * @param callback - callback to be queued & executed | executed
   * @return callback
   * 
  **/ 
  raf = function(callback){
    allCallbacks.push(callback);
    if(executeAllScheduled===false){
      w.setTimeout(executeAll, FRAME_RATE_INTERVAL);
      executeAllScheduled = true;
    }
    return callback;
  },

  /**
   *
   * Cancels raf.
  **/ 
  cancelRaf = function(callback){
    callbacksForCancellation.push(callback);
    shouldCheckCancelRaf = true;
  },


  //https://gist.github.com/paulirish/1579671
  vendors = ['ms', 'moz', 'webkit', 'o'];

    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
        || w[vendors[x]+'CancelRequestAnimationFrame'];
    }

  if (!window.requestAnimationFrame) window.requestAnimationFrame = raf;
  if (!window.cancelAnimationFrame)  window.cancelAnimationFrame  = cancelRaf;  

  // querySelector Polyfill
  if (!document.querySelectorAll) {
    document.body.className += ' red';
    document.querySelectorAll = function (selectors) {
      var style = document.createElement('style'), elements = [], element;
      document.documentElement.firstChild.appendChild(style);
      document._qsa = [];

      style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
      window.scrollBy(0, 0);
      style.parentNode.removeChild(style);

      while (document._qsa.length) {
        element = document._qsa.shift();
        element.style.removeAttribute('x-qsa');
        elements.push(element);
      }
      document._qsa = null;
      return elements;
    };
  }

  if (!document.querySelector) {
    document.querySelector = function (selectors) {
      var elements = document.querySelectorAll(selectors);
      return (elements.length) ? elements[0] : null;
    };
  }