var waterHolder = document.getElementById('water-holder');
var shade = document.getElementById('shade');

var width = 970;
var height = 250;
var finger = [
    [0.5, 1.0, 0.5],
    [1.0, 1.0, 1.0],
    [0.5, 1.0, 0.5]
];

var waterCanvas = {};
var waterModel = new WaterModel(width, height, {
    resolution:1.0,
    interpolate:false,
    damping:0.985,
    clipping:5,
    evolveThreshold:0.05,
    maxFps:30,
    showStats:false
});

function init(){
    waterCanvas = new WaterCanvas(width, height,
        "water-holder", waterModel, {
            backgroundImageUrl:"images/frame1.jpg",
            lightRefraction:9.0,
            lightReflection:0.1,
            maxFps:20,
            showStats:false
        });

    cycle();
}

function cycle() {
    waterHolder.classList.remove('hide');
    var mover = 0;
    var moverInc = (width * 0.9)/266.667;

    var rain = setInterval(function(){
        waterModel.touchWater(mover + Math.random() * width/10, Math.random() * height, 1.5, finger);
        mover += moverInc;
    }, 15);
    var rain2 = setInterval(function(){
        waterModel.touchWater(Math.random() * width, Math.random() * height, 1.5, finger);
    }, 45);

    setTimeout(function() {
        shade.classList.add('hide');
    }, 0);

    setTimeout(function() {
        clearInterval(rain);
        clearInterval(rain2);
    }, 4000);

    setTimeout(function() {
        shade.classList.remove('hide');
        waterHolder.classList.add('hide');
    }, 7000);

    // setTimeout(function() {
    //     cycle();
    // }, 15000);

}

window.onload = init;