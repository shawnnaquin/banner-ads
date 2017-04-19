function initAnimation() {
    animateWandTop();
    animateTop();
}

/* bottom
----------------------------------------------------------------------------------------------------------------------*/

function animateWandBottom() {
    $('.js-wand')
        .animate({
            'right':'-160px',
            'top':'310px',
        }, 1000, function(){
            $('.js-wand')
                .animate({
                    'right':'160px',
                    'top':'500px',
                    'opacity':'0'
                }), 300;
            done();
        });
}

function animateBottom() {

    $('.dirty-bottom')
        .delay(600)
        .animate({
            'opacity':'0'
        }, 300);

    $('.clean > h1')
        .delay(600)
        .animate({
            'opacity':'1',
        }, 400);
}

/* middle
----------------------------------------------------------------------------------------------------------------------*/

function animateWandMiddle() {

    hideHeader();

    $('.js-wand')
        .animate({
            'right':'160px',
            'top':'150px',
        }, 1000, function(){
            $('.js-wand').animate({
                'right':'160px',
                'top':'310px',
            }, 300);
            animateWandBottom();
            animateBottom();
        });
}

function animateMiddle() {
    $('.dirty-middle')
        .delay(800)
        .animate({
            'opacity':'0'
        }, 300);
}

/* top
----------------------------------------------------------------------------------------------------------------------*/

function animateWandTop() {

    $('.js-wand')
        .delay(2500)
        .animate({
            'right':'-160px',
            'top':'0px',
        }, 1000, function(){
            $('.js-wand').animate({
                // 'right':'-225px',
                'top':'150px',
            }, 300);
            animateWandMiddle();
            animateMiddle();
        });
}

function animateTop() {
    $('.dirty > h1')
        .delay(1500)
        .animate({
            'opacity':'1',
        }, 500 );

    $('.dirty-top')
        .delay(3000)
        .animate({
            'opacity':'0'
        }, 300);
}

/* extras
----------------------------------------------------------------------------------------------------------------------*/

function hideHeader() {

    $('.dirty > h1')
        .animate({
            'opacity':'0',
        }, 500);
}

function done() {
    showReset();
}

/* reset
----------------------------------------------------------------------------------------------------------------------*/
function showReset() {
    $('.js-reset')
        .css({'pointer-events':'auto'})
        .delay(1000)
        .animate({
            'opacity':'1',
        }, 1000);
}

function hideReset() {
    $('.js-reset')
        .css({'pointer-events':''})
        .animate({
            'opacity':'0',
        }, 300);
}

$(document).on('click', '.js-reset', function(){

    $('.clean > h1').css({'opacity':''});

    $('.dirty-top, .dirty-bottom, .dirty-middle')
        .animate({'opacity':'1'}, 300);

    $('.js-wand')
        .css({'top':'', 'right':'', 'opacity':''});

    hideReset();
    initAnimation();

});
