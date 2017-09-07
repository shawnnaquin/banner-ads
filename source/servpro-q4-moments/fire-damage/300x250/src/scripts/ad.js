var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;
//
//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {
//
//         // Pick a remaining element...
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//
//         // And swap it with the current element.
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }
//
//     return array;
// }

function compare(a, b) {
    return b.split(',').reduce(function(a,b) {return parseInt(a) + parseInt(b);}) - a.split(',').reduce(function(a,b) {return parseInt(a) + parseInt(b);});
};

function BurnerImage() {
    this.x = 0;
    this.y = 0;
    this.image = new Image();
    this.image.src = 'images/frame1.jpg';
}

BurnerImage.prototype.draw = function(context) {
    context.drawImage(this.image, this.x, this.y);
};

function BurnShape() {
    this.count = 200;
    this.beenhere = [];

    var x = canvas.width;
    var y;
    while(x > 0) {
        y = canvas.height;
        while(y > 0) {
            this.beenhere.push(x + ',' + y);
            y--;
        }
        x--;
    }
    this.beenhere.sort(compare);

    console.log(this.beenhere);
}

BurnShape.prototype.draw = function(context) {
    var coords;
    for(var i = 0; i < this.count; i++) {
        if(this.beenhere.length === 0) return;
        coords = this.beenhere.pop().split(',');
        context.globalCompositeOperation = "destination-out";
        // context.globalCompositeOperation = "overlay";
        context.fillRect(coords[0], coords[1], 1, 1);
        // context.fillStyle = "red";
        context.fill();
    }
};

var image = new BurnerImage();
var burnShape = new BurnShape();
var imageData = null;


function drawFrame() {
    window.requestAnimationFrame(drawFrame);
    if(!imageData) {
        image.draw(context);
    } else {
        context.putImageData(imageData, 0, 0);
    }
    burnShape.draw(context);

    imageData = context.getImageData(0, 0, canvas.width, canvas.height);
}

function init(){
    drawFrame();
}

window.onload = init;