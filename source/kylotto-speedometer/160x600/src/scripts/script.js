var adDiv;

function initEB() {
    if (!EB.isInitialized()) {
        EB.addEventListener(EBG.EventName.EB_INITIALIZED, addEventListeners);
    } else {
        addEventListeners();
    }
}

function addEventListeners() {

    $(document).on('click', '#banner', function(){
        EB.clickthrough();
    });

    initAnimation();

}

window.addEventListener("load", initEB);