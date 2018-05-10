// JavaScript Document
//HTML5 Ad Template JS from DoubleClick by Google

var buttons = {
    exitBtn: {
      $: '',
      id: 'HTML5_Background_Clickthrough'
    },
};

dcrmInit = function(){
    buttons.exitBtn.$ = document.querySelector('.js-button');
    addListeners();
    initAnimation();
}

addListeners = function (){
    buttons.exitBtn.$.addEventListener('click', onExitHandler, false);
}

onExitHandler = function(e){
    Enabler.exit( buttons.exitBtn.id );
    Enabler.counter( buttons.exitBtn.id );
    e.stopPropagation();
}

window.onload = function() {
  if (Enabler.isInitialized()) {
    dcrmInit();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, dcrmInit);
  }
}