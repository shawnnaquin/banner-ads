var waterHolder = document.getElementById('water-holder');
var shade = document.getElementById('shade');

var width = 300;
var height = 600;
var finger = [
    [0.5, 1.0, 0.5],
    [1.0, 1.0, 1.0],
    [0.5, 1.0, 0.5]
];

var waterCanvas = {};
var waterModel = new WaterModel(width, height, {
    resolution:2.0,
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
            backgroundImageUrl:"images/300x600-dirty.jpg",
            lightRefraction:9.0,
            lightReflection:0.1,
            maxFps:20,
            showStats:false
        });

    cycle();
}

function cycle() {
    shade.classList.remove('hide');
    waterHolder.classList.remove('hide');
    var rain = setInterval(function(){
        waterModel.touchWater(Math.random() * width, Math.random() * height, 1.5, finger);
    }, 15);

    setTimeout(function() {
        shade.classList.add('slow-fade');
        shade.classList.add('hide');
        clearInterval(rain);
    }, 2000);

    setTimeout(function() {
        waterHolder.classList.add('hide');
    }, 3000);

    setTimeout(function() {
        shade.classList.remove('slow-fade');
        cycle();
    }, 15000);

}

window.onload = init;