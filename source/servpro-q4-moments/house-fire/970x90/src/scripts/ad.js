var cycleCount = 0;
var maxCycles = 3;

var fixed = document.getElementById('fixed');
var van = document.getElementById('van');
var final = document.getElementById('final');

function init(){
    cycle();
}

function cycle() {
    // console.log('starting cycle');
    cycleCount++;

    setTimeout(function() {
        van.classList.add('drive1');
    }, 2000);

    setTimeout(function() {
        fixed.classList.add('fade-in');
        van.classList.add('drive2');
    }, 5000);

    setTimeout(function() {
        van.classList.remove('drive1');
        van.classList.remove('drive2');
        final.classList.add('fade-in');
    }, 8000);

    setTimeout(function() {
        if ( cycleCount < maxCycles ) {
            fixed.classList.remove('fade-in');
            final.classList.remove('fade-in');
            cycle();
        }
    }, 11000);
}

window.onload = init;