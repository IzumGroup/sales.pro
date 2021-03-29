jQuery(function($) {
	
	// Fix fixed bg's jump
	/MSIE [6-8]|Mac/i.test(navigator.userAgent)||$("header, article, footer").each(function(){if("fixed"==$(this).css("backgroundAttachment")){var i=$(this),a=/WebKit/i.test(navigator.userAgent)?9:8;i.addClass("froid-fixed-bg").data({bgX:i.css("backgroundPosition").slice(0,i.css("backgroundPosition").indexOf(" ")),bgY:i.css("backgroundPosition").slice(i.css("backgroundPosition").indexOf(" ")),margin:a})}}),$(window).bind("SIModals.modalsOpen",function(){$(".froid-fixed-bg").each(function(){var i=$(this);i.css("backgroundPosition","calc("+i.data("bgX")+" - "+i.data("margin")+"px) "+i.data("bgY"))})}),$(window).bind("SIModals.modalsClose",function(){$(".froid-fixed-bg").each(function(){var i=$(this);i.css("backgroundPosition",i.data("bgX")+" "+i.data("bgY"))})});
	
	// Mobile full-width && disable animation
	if(is_mobile()) {
		
		// Fix mobile fixed bg's
		$("header, article, footer").each(function(){if ("fixed" == $(this).css("backgroundAttachment")) $(this).css('backgroundAttachment', 'scroll');});
		
		$('html, body').css('min-width', '1200px').addClass('mobile');
		$('html').css('width', window.innerWidth + 'px');
		
		$('.cre-animate').css({'transform': 'none', '-webkit-transform': 'none', '-moz-transform': 'none', '-ms-transform': 'none', '-o-transform': 'none', 'transition': 'none', '-webkit-transition': 'none', 'opacity' : 1}).removeClass('.cre-animate');
	
	}
	// Remove animation
		$('.cre-animate').css({'transform': 'none', '-webkit-transform': 'none', '-moz-transform': 'none', '-ms-transform': 'none', '-o-transform': 'none', 'transition': 'none', '-webkit-transition': 'none', 'opacity' : 1}).removeClass('.cre-animate');
	// Init all plugins and scripts
	$.fn.SIInit = function() {
	
		// Modal photos
		$('a[data-rel]').each(function() {$(this).attr('rel', $(this).data('rel'));});
		$('a[rel^=fancybox]').not('.cloned a').fancybox({
			helpers : {
				thumbs : true
			}
		});
		
		// Forms
		$('.send-form').SIForms({
			'validateFields': { 
				'client_name' 		: 'Укажите Ваше имя',
				'client_phone' 		: 'Укажите Ваш телефон',
				'client_mail' 		: 'Укажите Ваш e-mail',
				'client_message'	: 'Укажите Ваше сообщение'
			},
			'sendSuccess': function(res) {
				//$(this).reset();
				/*
				yaCounter.reachGoal('target' + res.id);
				
				ga('send', 'event', res.gcode, res.gcode); break;
				*/
				
			}
			
		});
	
	};
	
	$.fn.SIInit();

	// All sound load
	$.ionSound({sounds: ["bip-1","bip-2","wuf-1","wuf-2","wuf-3","wuf-4"], path: template_url + "sounds/", volume: 0.5});
	
	// Sounds
	$(document).on('mouseenter', '.button, .submit, .phone-line, .what-icon-wrapper, .si-jump', function() {
		$.ionSound.play('wuf-1');
	});
	SIModals.beforeOpen = function() {$.ionSound.play('wuf-4');}
	SIModals.beforeClose = function() {$.ionSound.play('wuf-3');}	
	
	// Styler
	$('input[type=file]').styler();

	// Map
	$('.select-map').maphilight({groupBy:'alt', strokeColor:'c39822'});
		
		// Area
		$('area').click(function() {
		
			var area = $(this).prop('alt');
			
			$('.select-items-tab').slideUp(500);
			
			setTimeout(function() {
				
				$('.select-items-tab.tab-' + area).slideDown(500);
				
			}, 510);
			
			return false;
		
		})
		
		
	// Show more
	$('.show-more-items span').text($('.extra-items .select-item').size());
	$('.show-more-items').click(function() {
		$(this).hide();
		$('.extra-items').slideDown(500);
		return false;
	});
	
	// Jump links
	$('.si-jump').SIJump();

	
	// Modals
	SIModals.init();
		
		// Init modals
		SIModals.attachModal('.open-phone-modal', '.phone-modal', {'.send-extra' : 'extra'});
		SIModals.attachModal('.open-consult-modal', '.consult-modal', {'.send-extra' : 'extra'});
			SIModals.attachModal('.open-si-success-modal', '.si-success-modal');
			SIModals.attachModal('.open-tamash-about-modal', '.tamash-about-modal');
			SIModals.attachModal('.open-tamash-prog-modal', '.tamash-prog-modal');
			SIModals.attachModal('.open-mikhail-about-modal', '.mikhail-about-modal');
			SIModals.attachModal('.open-mikhail-prog-modal', '.mikhail-prog-modal');
			SIModals.attachModal('.open-otdel-prog-modal', '.otdel-prog-modal');
			SIModals.attachModal('.open-belfort-prog-modal', '.belfort-prog-modal');
			SIModals.attachModal('.open-si-success-modal', '.si-success-modal');
		SIModals.attachModal('.open-belfort-about-modal', '.belfort-about-modal', false, 
			function(){
				$('.more-modal-inner').empty();
				$('.more-modal-inner').load(template_url + 'load.php?adress_id=' + $(this).data('id'), 
					function(){
						$.fn.SIInit();
						setTimeout(function() {
						
								// Photos
								$('.more-modal-slider').owlCarousel({loop:true,items:1,margin:5,nav:false,dots:true,
									onChange : function(){
										$.ionSound.play('wuf-4');
									}
								});
						
						
						}, 100);
					}
				);
			}
		);
		//accordion
    $('.question-item:first').addClass('active').find('.answer').css('display', 'block');
    $('.question-item').each(function () {
        var item = $(this);
        var question = item.find('.question');
        var answer = item.find('.answer');
        answer.slideUp();
        if (item.hasClass('active')) {
            $(this).find('.answer').slideDown();
        }
        question.click(function () {
            if (question.parents('.question-item').hasClass('active')) {
                answer.slideUp();
                item.removeClass('active');
            }
            else {
                item.parents('.questions-block').find('.question-item').find('.answer').slideUp();
                answer.slideDown();
                item.parents('.questions-block').find('.question-item').removeClass('active');
                item.addClass('active');
            }
        });
    });

	
		
		// Modal controls
		SIModals.attachClose('.si-close');
		
});