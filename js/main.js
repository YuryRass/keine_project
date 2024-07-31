jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};


var mainNav = document.querySelector('.header');

window.onscroll = function() {
    windowScroll();
};

function windowScroll() {
mainNav.classList.toggle("header-scroll", mainNav.scrollTop > 50 || document.documentElement.scrollTop > 50);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
 
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



jQuery(document).ready(function($){
	//move nav element position according to window width
	moveNavigation();
	$(window).on('resize', function(){
		(!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
	});

	//mobile version - open/close navigation
	$('.cd-nav-trigger').on('click', function(event){
		event.preventDefault();
		if($('header').hasClass('nav-is-visible')) $('.moves-out').removeClass('moves-out');
		
		$('header').toggleClass('nav-is-visible');
		$('.cd-main-nav').toggleClass('nav-is-visible');
		$('.cd-main-content').toggleClass('nav-is-visible');
	});

	//mobile version - go back to main navigation
	$('.go-back').on('click', function(event){
		event.preventDefault();
		$('.cd-main-nav').removeClass('moves-out');
	});

	//open sub-navigation
	$('.cd-subnav-trigger').on('click', function(event){
		event.preventDefault();
		$('.cd-main-nav').toggleClass('moves-out');
	});

	function moveNavigation(){
		var navigation = $('.cd-main-nav-wrapper');
  		var screenSize = checkWindowWidth();
        if ( screenSize ) {
        	//desktop screen - insert navigation inside header element
			navigation.detach();
			navigation.insertBefore('.cd-nav-trigger');
		} else {
			//mobile screen - insert navigation after .cd-main-content element
			navigation.detach();
			navigation.insertAfter('.cd-main-content');
		}
	}

	function checkWindowWidth() {
		var mq = window.getComputedStyle(document.querySelector('header'), '::before').getPropertyValue('content').replace(/"/g, '');
		return ( mq == 'mobile' ) ? false : true;
	}
});

$(document).ready(function () {


	function galleriesInit() {
        $('.modal-gallery').each(function(i, el) {
          lightGallery(el, {
            selector: '.modal-gallery__control:not(.swiper-slide-duplicate)',
            addClass: 'modal-gallery-def',
            thumbnail: true,
            flipHorizontal: false,
            flipVertical: false,
            videoMaxWidth: '1140px',
          });
        });
    
        $('.modal-gallery-video').each(function(i, el) {
          lightGallery(el, {
            selector: '.modal-gallery__control:not(.swiper-slide-duplicate)',
            addClass: 'modal-gallery-def',
            thumbnail: false,
            zoom: false,
            rotateLeft: false,
            rotateRight: false,
            flipHorizontal: false,
            flipVertical: false,
            videoMaxWidth: '1140px',
          });
        });      
      }
      
      galleriesInit();


      function closeDropAndShowEl() {
        closeDropdown();
        clearCitySeacrh();
        closeSearches();
        closeModal();
        closeStickySocial();
      }

      function closeModal() {
        let modal = $('.md-modal.js-show');
        if (modal.length) {
          toggleModal(false, modal);
          modal.removeClass('js-show');
          modal.addClass('js-animating');
          modal.on('transitionend', function (e) {
            if ($(e.originalEvent.target).hasClass('md-modal-dialog')) {
              modal.off('transitionend');
              $(document).trigger('go_modalHidden', modal);
              modal.removeClass('js-animating');
            }
          });
        }
      }

      function closeDropAndShowEl() {
        closeDropdown();
        closeModal();
      }
    
      function closeDropdown() {
        $('.dropdown').removeClass('js-drop-show js-drop-inner-show');
        $('.js-drop-toggle').removeClass('js-active');
      }
    
      function closeModal() {
        let modal = $('.md-modal.js-show');
        if (modal.length) {
          toggleModal(false, modal);
          modal.removeClass('js-show');
        }
      }
    
      function scrollbarWidth() {
        let documentWidth = parseInt(document.documentElement.clientWidth);
        let windowsWidth = parseInt(window.innerWidth);
        let scrollbarWidth = windowsWidth - documentWidth;
        return scrollbarWidth;
      }
    
      function toggleModal(bool, modal) {
    
    
        let body = $('body');
        let scrollLine = $('<div class="line-instead-scroll"></div>');
        let fixedElems = $('.js-fixed-elem');
        let widthScroll = scrollbarWidth();
        if (bool) {
          body.append(scrollLine);
          body.css({
            'overflow': 'hidden',
            'margin-right': widthScroll
          });
          fixedElems.css({
            'margin-right': widthScroll
          });
        } else {
           body.css({
            'overflow': '',
            'margin-right': ''
           });
           fixedElems.css({
            'margin-right': ''
           });
           if ($('.line-instead-scroll').length) $('.line-instead-scroll').remove();
        }
      }
    
      $(document).click(function(event) {
        if (!$(event.target).closest('.js-drop-show').length) {
            closeDropdown();
        }
      });
    
      $(document).on('click', function (event) {
        if (!$(event.target).closest('.md-modal-dialog').length) {
          closeModal();
        }
      });
    
      (function () {
        
         $('[data-modal-toggle]').on('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          let id = $(this).data('modal-toggle');
          let modal = $(id);
    
          if (modal.hasClass('js-show') && $(this).parents(id).length) {
            closeDropAndShowEl();
            return;
          }
    
          closeDropAndShowEl();
          
          if (!modal.hasClass('js-show')) {
            modal.addClass('js-show');
            toggleModal(true, modal);
          }
        });
         $('.close-button.js-close').on('click', function(e) {
          e.preventDefault();
          closeModal();
        });
    
      }());

      (function () {

        if ($('[type="tel"]').length) {
    
          $.fn.setCursorPosition = function(pos) {
            if ($(this).get(0).setSelectionRange) {
              $(this).get(0).setSelectionRange(pos, pos);
            } else if ($(this).get(0).createTextRange) {
              var range = $(this).get(0).createTextRange();
              range.collapse(true);
              range.moveEnd('character', pos);
              range.moveStart('character', pos);
              range.select();
            }
          };
    
          $('[type="tel"]').click(function(){
            let phone = $(this);
            let phoneVal = phone.val();
            let edgeRightPos = phoneVal.indexOf('_');
            let numbers = phoneVal.match(/\d/g, '!');
            if (!numbers) return;
            let numbersLength = numbers.length;
            if ($(this).get(0).selectionStart !== $(this).get(0).selectionEnd && numbersLength == 11) return;
            if ($(this).get(0).selectionStart < 4) {
              if (numbersLength < 2) {
                $(this).setCursorPosition(4);
              } else {
                $(this).setCursorPosition(edgeRightPos);
              }
            } else if (edgeRightPos !== -1 && $(this).get(0).selectionStart > edgeRightPos) {
              $(this).setCursorPosition(edgeRightPos);  
            }
          }).mask('+7 (999) 999-99-99',{autoclear: false});
          $('[type="tel"]').on('keydown', function (e) {
            setTimeout(() => {
              
            
            let key = e.key;
            let phone = $(this);
            let phoneVal = phone.val();
            let edgeRightPos = phoneVal.indexOf('_');
            let numbers = phoneVal.match(/\d/g, '!');
            if (!numbers) return;
            let numbersLength = numbers.length;
            if (key == "ArrowRight" || key == "ArrowLeft") {
              if ($(this).get(0).selectionStart < 4) {
                if (numbersLength < 2) {
                  $(this).setCursorPosition(4);
                } else {
                  $(this).setCursorPosition(edgeRightPos);
                }
              } else if (edgeRightPos !== -1 && $(this).get(0).selectionStart > edgeRightPos) {
                $(this).setCursorPosition(edgeRightPos);  
              }
            } else if (key == "ArrowUp" || key == "ArrowDown") {
              $(this).setCursorPosition(edgeRightPos);
            }
            }, 0);
          });
          $('[type="tel"]').on('paste', function (e) {
            let pastedData = e.originalEvent.clipboardData.getData('text');
            let numbers = pastedData.replace(/\D/g, '');
            let reg = /^[78]/;
            
            if (numbers.length >= 11 && reg.test(numbers)) {
              $(this).val(numbers.slice(1));
            }
          });
    
        }
    
      }());



});