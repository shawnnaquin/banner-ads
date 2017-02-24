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
    useInAppCloseButton();
    addEventListeners();
    initAnimation();
}

function useInAppCloseButton() {
    var sdkData = EB.getSDKData();

    if (sdkData !== null) {
        if (sdkData.SDKType === "MRAID") {
            // set sdk to use custom close button
            EB.setExpandProperties({
                useCustomClose: true
            });
        }
    }
}

function addEventListeners() {

    document.getElementById("banner").addEventListener("mouseover", expand);
    document.getElementById("close-button").addEventListener("click", collapse);
    document.getElementById("explore").addEventListener("click", clickthrough);

    document.getElementById("banner-logo").addEventListener("click", function() { EB.userActionCounter("BannerLogo"); }, false);
    document.getElementById("panel-logo").addEventListener("click", function() { EB.userActionCounter("PanelLogo"); }, false);

    document.getElementById("dot-one").addEventListener("click", function() { EB.userActionCounter("DotOne"); }, false);
    document.getElementById("dot-two").addEventListener("click", function() { EB.userActionCounter("DotTwo"); }, false);
    document.getElementById("dot-three").addEventListener("click", function() { EB.userActionCounter("DotThree"); }, false);
    document.getElementById("slide-left").addEventListener("click", function() { EB.userActionCounter("SlideLeft"); }, false);
    document.getElementById("slide-right").addEventListener("click", function() { EB.userActionCounter("SlideRight"); }, false);
    document.getElementById("play").addEventListener("click", function() { EB.userActionCounter("Autoplay"); }, false);
}

function expand() {
    EB.expand();
    adDiv.classList.remove("collapsed");
    adDiv.classList.add("expanded");
}

function collapse() {
    adDiv.classList.remove("expanded");
    adDiv.classList.add("collapsed");
    EB.collapse();
}

function clickthrough() {
    EB.clickthrough();
}

window.addEventListener("load", initEB);
