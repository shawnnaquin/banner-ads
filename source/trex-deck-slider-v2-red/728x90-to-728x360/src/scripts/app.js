/* setup
------------------------------------------------------------------------------------------------------------------*/
function initAnimation() {

	var images = ['havana-gold', 'island-mist', 'spiced-rum'],

		dots = ['js-one', 'js-two', 'js-three'],

		dotsEnd = dots.length - 1,

		$active	= document.querySelectorAll('.active')[0],
		$main	= document.querySelectorAll('.js-main-content')[0],
		$play	= document.querySelectorAll('.js-play')[0],
		$click	= document.querySelectorAll('.js-click'),
		$dot	= document.querySelectorAll('.js-dot'),

		count,
		current, 
		next,
		previous,
		setAutoPlay,
		direction;

	/* events
	------------------------------------------------------------------------------------------------------------------*/
	Array.prototype.forEach.call($click, function(el, i){
		el.addEventListener('click', slide);
	});

	Array.prototype.forEach.call($dot, function(el, i){
		el.addEventListener('click', dotClick);
	});

	$play.addEventListener('click', startAutoPlay);

	startAutoPlay();

	/* Methods
	------------------------------------------------------------------------------------------------------------------*/

	function startAutoPlay() {
		autoPlay();
		setAutoPlay = setInterval(autoPlay, 3000);
	}

	function autoPlay() {

		// hide play button
		$play.classList.remove('show');

		for( count = 0; count < dots.length; count++) {
			// loop through dots determine next based on active class and direction
			if ( $active.classList.contains( dots[count] ) ) {

				if ( count < dotsEnd) {
					next = count+1;
					previous = count;
				} else {
					next = 0;
					previous = dotsEnd;
				}

				current = dots[count]; // 'js-one'
				
				$main.classList.remove('show-'+images[previous]);
				$main.classList.add('show-'+images[next]);

				$active.classList.remove('active');
				$active = document.querySelectorAll( '.'+dots[next] )[0];
				$active.classList.add('active');
				return;
			}
		}
	}

	function stopAutoPlay() {
		clearInterval(setAutoPlay);
		$play.classList.add('show');
	}

	function dotClick() {

		stopAutoPlay();

		for( var i = 0; i < dots.length; i++) {
			$main.classList.remove('show-'+images[i]);
			if ( this.classList.contains(dots[i]) ) {
				$main.classList.add('show-'+images[i]);
				$active.classList.remove('active');
				$active = document.querySelectorAll( '.'+dots[i] )[0];
				$active.classList.add('active');
			}
		}

	}

	function slide() {

		stopAutoPlay();

		direction = this.classList.contains('js-left') ? 'left' : 'right';

		for( count = 0; count < dots.length; count++) {
			// loop through dots determine next based on active class and direction

			if ( $active.classList.contains( dots[count] ) ) {

				if ( direction == 'right' &&  count < dotsEnd) {
					next = count+1;
					previous = count;
				} else if ( direction == 'right' && count >= dotsEnd ) {
					next = 0;
					previous = dotsEnd;
				} else if ( direction == 'left' && count > 0 ) {
					next = count-1;
					previous = count;
				} else if ( direction == 'left' && count <= 0) {
					next = dotsEnd;
					previous = 0;
				}

				current = dots[count]; // 'js-one'
				// console.log(next, current, count);
				
				$main.classList.remove('show-'+images[previous]);
				$main.classList.add('show-'+images[next]);

				$active.classList.remove('active');
				$active = document.querySelectorAll( '.'+dots[next] )[0];
				$active.classList.add('active');

				return;
			}

		} /* end for */

	} /* end slide() */

}