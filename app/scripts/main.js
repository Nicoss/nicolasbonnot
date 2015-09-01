var divToEnlarge;
var divToReduce;
var divToReduceFromMenu;
var positionToReduce;
var positionToEnlarge;
var positionClicked
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [37, 38, 39, 40];

var scrollValueBeforeOpening;
var isAnimating = false;

var projectOpened = false;

var menuIsOpened = false;

var isMobile = false;

var pswpElement;
var gallery;
var items;
var imageSelected;

$(document).ready(function() {

	pswpElement = document.querySelectorAll('.pswp')[0]

	// device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

	if(isMobile) {
		adaptMobile();
	}

	initCSS();

	$('.projet-cover').on('click', function() {
		if(!isAnimating) {
			isAnimating = true;
			disable_scroll();
			divToEnlarge = $(this).parent('.projet');
			if(!divToEnlarge.hasClass('projet-active')) {		// open the section
				openSection(divToEnlarge);
				projectOpened = true;
			}
			else {		// close the section
				closeAllSections();
				projectOpened = false;
			}
		}
	});

	$('.link-projet').on('click', function() {
		if(!isAnimating) {
			positionClicked = $(this).data('position');
			$('.projet').each(function() {
				if($(this).data('position') == positionClicked) {
					divToReduceFromMenu = divToEnlarge;
					divToEnlarge = $(this);
				}
			});
			if(!divToEnlarge.hasClass('projet-active')) {		// open the section
				isAnimating = true;
				openSectionFromMenu(divToEnlarge, divToReduceFromMenu);
			}
		}
	});

	$('.menu-opener').on('click', function() {
		if(!menuIsOpened) {	
			menuIsOpened = true;
			$('.menu-closer').css({
				'display': 'block'
			});
			$('.left-menu').css({
				'width': '100%'
			});
			$('.list-projets').css({
				'width': 0
			});
			$('.projet-titre').each(function() {
				$(this).css({
					'width': 0
				})
			});
			initCSS();
		}
	});

	$('.menu-closer').on('click', function() {
		if(menuIsOpened) {
			menuIsOpened = false;
			$('.menu-closer').css({
				'display': 'none'
			});
			$('.left-menu').css({
				'width': 0
			});
			$('.list-projets').css({
				'width': '100%'
			});
			$('.projet-titre').css({
				'width': $(window).width()
			});
		}
	});

	$('.image-container').on('click', function() {
		imageSelected = $(this);
		indexStart = parseInt(imageSelected.data('index'));
		console.log(indexStart);
		items = [
		    {
		        src: 'images/background-echo.jpg',
		        w: 1593,
		        h: 1032
		    },
		    {
		        src: 'images/background-joconde.jpg',
		        w: 1593,
		        h: 1032
		    },
		    {
		        src: 'images/background-kodama.jpg',
		        w: 1593,
		        h: 1032
		    },
		    {
		        src: 'images/background-mourn.jpg',
		        w: 1593,
		        h: 1032
		    },
		    {
		        src: 'images/background-pixel.jpg',
		        w: 1593,
		        h: 1032
		    },
		    {
		        src: 'images/background-psd.jpg',
		        w: 1593,
		        h: 1032
		    },
		    {
		        src: 'images/background-simon.jpg',
		        w: 1593,
		        h: 1032
		    },
		    {
		        src: 'images/background-yist.jpg',
		        w: 1593,
		        h: 1032
		    }
		];
		var options = {
		    index: indexStart-1,
		    showHideOpacity: true,
		    showAnimationDuration: 800,
		    fullscreenEl: false,
			shareEl: false,
			closeOnScroll: false,
			getThumbBoundsFn: function(index) {
				return {x:imageSelected.offset().left, y:imageSelected.offset().top, w:150};
			}
		};
		// change items_mourn
		gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();
	});

});

$(window).resize(function() {
	initCSS();
});

function initCSS() {
	$('.container-menu').css({
		'margin-top': ($(window).height() - $('.container-menu').height())/2
	});
	if($(window).width() * 0.3 < 300) {
		if(!menuIsOpened) {
			$('.left-menu').css({
				'width': 0
			});
			$('.list-projets').css({
				'width': '100%'
			});
			$('.projet-titre').css({
				'width': $(window).width()
			});
		}
	}
	else {
		menuIsOpened = false;
		$('.left-menu').css({
			'width': '30%'
		});
		$('.list-projets').css({
			'width': '70%'
		});
		$('.projet-titre').each(function() {
			$(this).css({
				'width': $(window).width() - $(window).width()*0.3
			})
		});
	}
}

function adaptMobile() {
	if($(window).width() * 0.3 < 300) {
		$('.left-menu ul li span').css({
			'font-size': '20px',
			'padding': '3px'
		});
		$('.menu-titre').css({
			'font-size': '30px',
			'height': '35px'
		});
		$('.projet-titre').css({
			'font-size': '35px',
		});
	}
	$('.projet-cover .black-layer').css({
	  'background-color': '#0f0f0f',
	  'opacity': 0.7
	});
	$('.projet-cover .projet-titre').css({
  		'top': '125px',
		'opacity': 0.8
	});
}

function openSection(div) {
	div.addClass('projet-active');
	$('.projet-cover').css({
		'cursor': 'url(../images/close.png) 0 0, pointer !important'
	})
	positionToEnlarge = div.data('position');
	scrollValueBeforeOpening = $(window).scrollTop();
	$('.projet-cover').each(function() {
		divToReduce = $(this).parent('.projet');
		positionToReduce = divToReduce.data('position');
		if(!divToReduce.is(div) && positionToReduce < positionToEnlarge) {
			TweenLite.to(divToReduce, 0.6, {height: 0, ease: Power2.easeInOut});
		}
		else {
			TweenLite.to(divToReduce, 0, {height: 0, ease: Power2.easeInOut, delay: 0.6});
		}
	});

	setTimeout(function() {
		div.children('.projet-cover').children('.projet-titre').css({
			'position': 'fixed',
			'top': 125,
		});
		$('.projet-active').on('mouseenter', function() {
			div.children('.projet-cover').children('.projet-titre').css({
				'top': 125
			})
		});
		$('.projet-active').on('mouseleave', function() {
			div.children('.projet-cover').children('.projet-titre').css({
				'top': 115
			})
		});
		TweenLite.to(div.children('.projet-cover').children('.projet-arrow'), 0.6, {opacity: 0.8, ease: Power2.easeInOut});
	}, 600);

	TweenLite.to(div, 0.6, {height: $(window).height(), ease: Power2.easeInOut});
	TweenLite.to(window, 0.6, {scrollTo:{y:0}, ease:Power2.easeInOut, onComplete: enable_scroll});

	$('.projet-content').each(function() {
		if($(this).data('position') == positionToEnlarge) {
			$(this).css({
				'display': 'inline-block'
			})
		}
	});
}

function openSectionFromMenu(divUp, divDown) {
	positionToEnlarge = divUp.data('position');
	$('.projet').each(function() {
		$(this).removeClass('projet-active');
	});
	$('.projet-titre').css({
		'position': '',
		'top': '',
		'left': ''
	});
	if(menuIsOpened) {
		menuIsOpened = false;
		$('.menu-closer').css({
			'display': 'none'
		});
		$('.left-menu').css({
			'width': 0
		});
		$('.list-projets').css({
			'width': '100%'
		});
		$('.projet-titre').css({
			'width': $(window).width()
		});
	}
	divUp.addClass('projet-active');
	disable_scroll();
	if(projectOpened) {
		if(isMobile) {
			$('.projet-cover .projet-titre').css({
				'top': '115px',
				'opacity': 0
			});
		}
		if(isMobile) {
			divDown.children('.projet-cover').children('.projet-titre').css({
				'opacity': 0
			});
		}
		$('.projet-active').on('mouseenter', function() {
			divUp.children('.projet-cover').children('.projet-titre').css({
				'top': 125
			})
		});
		$('.projet-active').on('mouseleave', function() {
			divUp.children('.projet-cover').children('.projet-titre').css({
				'top': 115
			})
		});
		TweenLite.to(window, 0.6, {scrollTo:{y:0}, ease:Power2.easeInOut});
		TweenLite.to(divDown.children('.projet-cover').children('.projet-arrow'), 0.6, {opacity: 0, ease: Power2.easeInOut});
		setTimeout(function() {
			divUp.children('.projet-cover').children('.projet-titre').css({
				'position': 'fixed',
				'top': 115,
			});
			TweenLite.to(divUp, 0.6, {height:$(window).height(), ease: Power2.easeInOut});
			TweenLite.to(divDown, 0.6, {height:0, ease: Power2.easeInOut, onComplete: enable_scroll});
			hideContent();
			$('.projet-content').each(function() {
				if($(this).data('position') == positionToEnlarge) {
					$(this).css({
						'display': 'inline-block'
					})
				}
			});
			if(isMobile) {
				divUp.children('.projet-cover').children('.projet-titre').css({
					'opacity': 0.7
				});
			}
			TweenLite.to(divUp.children('.projet-cover').children('.projet-arrow'), 0.6, {opacity: 0.8, ease: Power2.easeInOut});
		}, 600);
		/*closeAllSections();
		projectOpened = false;*/
	}
	else {
		openSection(divUp);
		projectOpened = true;
	}
}

function closeAllSections() {
	$('.projet').each(function() {
		$(this).removeClass('projet-active');
	});

	setTimeout(hideContent, 700);

	TweenLite.to(window, 0.6, {scrollTo:{y:0}, ease:Power2.easeInOut});

	setTimeout(function() {
		$('.projet-titre').css({
			'position': '',
			'top': '',
			'left': ''
		});
		if(isMobile) {
			$('.projet-cover .projet-titre').css({
		  		'top': '125px',
				'opacity': 0.8
			});
		}
	}, 600);

	$('.projet-cover').each(function() {
		divToReduce = $(this).parent('.projet');
		TweenLite.to(divToReduce, 0.6, {height: 300, ease: Power2.easeInOut, onComplete: enable_scroll, delay: 0.6});
		TweenLite.to(divToReduce.children('.projet-cover').children('.projet-arrow'), 0.6, {opacity: 0, ease: Power2.easeInOut});
	});
	TweenLite.to(window, 0.6, {scrollTo:{y:scrollValueBeforeOpening}, ease: Power2.easeInOut, delay: 0.6});
}

function hideContent() {
	$('.projet-content').each(function() {
		$(this).css({
			'display': 'none'
		})
	});
}

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
	e.preventDefault();
	e.returnValue = false;  
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
	if (window.addEventListener) {
		window.addEventListener('DOMMouseScroll', wheel, false);
	}
	window.onmousewheel = document.onmousewheel = wheel;
	document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
	isAnimating = false;  
}
