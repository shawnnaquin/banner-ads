// JavaScript Document
//HTML5 Ad Template JS from DoubleClick by Google

var buttons = {
    link: 'http://google.com',
    exitBtn: {
      $: '',
      id: 'HTML5_Background_Clickthrough'
    },
    otherBtn: {
      $: '',
      id: 'HTML5_OtherBtn_Clickthrough'
    }
};

dcrmInit = function(){
    buttons.exitBtn.$ = document.querySelector('.js-banner');
    buttons.otherBtn.$ = document.querySelector('.js-button');
    addListeners();
    initAnimation();
}

addListeners = function (){
    buttons.exitBtn.$.addEventListener('click', onExitHandler, false);
    buttons.otherBtn.$.addEventListener('click', altExitHandler, false);
}

onExitHandler = function(e){
    Enabler.exit( buttons.exitBtn.id, buttons.link );
    Enabler.counter( buttons.exitBtn.id );
}

altExitHandler = function(e) {
    Enabler.exitOverride( buttons.otherBtn.id, buttons.link );
    Enabler.counter( buttons.otherBtn.id );
    e.stopPropagation();
}

window.onload = function() {
  if (Enabler.isInitialized()) {
    dcrmInit();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, dcrmInit);
  }
}