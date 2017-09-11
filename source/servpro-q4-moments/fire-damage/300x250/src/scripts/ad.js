var canvas = document.getElementById('canvas');
var fireCanvas = document.getElementById('fire-canvas');
var context = canvas.getContext('2d');
var fireContext = fireCanvas.getContext('2d');

var image = new BurnerImage();
var burnShape = new BurnShape();
var fireParticles = [];
var imageData = null;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function compare(a, b) {
    return b.split(',').reduce(function(a,b) {return parseInt(a) + parseInt(b);}) - a.split(',').reduce(function(a,b) {return parseInt(a) + parseInt(b);});
}

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
}

BurnShape.prototype.reset = function(context) {
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
    // shuffle(this.beenhere);

    console.log(this.beenhere);
};

BurnShape.prototype.draw = function(context) {
    var coords;
    for(var i = 0; i < this.count; i++) {
        if(this.beenhere.length === 0) return;

        coords = this.beenhere.pop().split(',');
        context.save();
        context.globalCompositeOperation = "destination-out";
        if(i % 5 === 0) {
            fireParticles.push(new FireParticle(parseInt(coords[0]), parseInt(coords[1])));
        }
        context.fillRect(coords[0], coords[1], 1, 1);
        context.fill();
        context.restore();
    }
};

function FireParticle(x, y) {
    // this.x = canvas.width * Math.random();
    this.x = x;
    // this.y = canvas.height;
    this.y = y;
    this.spread = 1;
    this.vy = -1 - Math.random();
    this.vx = (this.spread/2) - (Math.random() * this.spread);
    this.fade = 0.02;
    this.opacity = 1;
    // this.red = 255;
    this.green = Math.floor(Math.random() * 200);
    this.blue = Math.floor(Math.random() * 50);
}

FireParticle.prototype.draw = function(context) {
    context.save();
    // context.globalAlpha = this.opacity;
    // context.globalCompositeOperation = "source-over";
    context.beginPath();
    context.arc(this.x,this.y,1,0,2*Math.PI);
    context.fillStyle = "rgba(255,"+this.green+","+this.blue+","+this.opacity+")";
    context.fill();
    context.restore();

    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= this.fade;
};

FireParticle.prototype.checkForRemoval = function(pos) {
  if(this.opacity <= 0) {
      fireParticles.splice(pos, 1);
  }
};

// var image = new BurnerImage();
// var burnShape = new BurnShape();
// var fireParticles = [];
// var imageData = null;


function drawFrame() {
    window.requestAnimationFrame(drawFrame);
    fireContext.clearRect(0, 0, canvas.width, canvas.height);
    if(burnShape.beenhere.length === 0) {
        console.log('drawing image again');
        context.clearRect(0, 0, canvas.width, canvas.height);
        // setTimeout(function() {
        burnShape.reset();
        image.draw(context);
        // }, 3000);
    } else {
        context.putImageData(imageData, 0, 0);
    }
    burnShape.draw(context);

    var i = fireParticles.length;
    while (i--) {
        fireParticles[i].draw(fireContext);
        fireParticles[i].checkForRemoval(i);
    }

    imageData = context.getImageData(0, 0, canvas.width, canvas.height);
}

function init(){
    drawFrame();
}

window.onload = init;