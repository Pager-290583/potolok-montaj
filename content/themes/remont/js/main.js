var is_loading = true;

jQuery(function($) {
	
	// Fix fixed bg's jump
	/MSIE [6-8]|Mac/i.test(navigator.userAgent)||$("header, article, footer").each(function(){if("fixed"==$(this).css("backgroundAttachment")){var i=$(this),a=/WebKit/i.test(navigator.userAgent)?9:8;i.addClass("froid-fixed-bg").data({bgX:i.css("backgroundPosition").slice(0,i.css("backgroundPosition").indexOf(" ")),bgY:i.css("backgroundPosition").slice(i.css("backgroundPosition").indexOf(" ")),margin:a})}}),$(window).bind("SIModals.modalsOpen",function(){$(".froid-fixed-bg").each(function(){var i=$(this);i.css("backgroundPosition","calc("+i.data("bgX")+" - "+i.data("margin")+"px) "+i.data("bgY"))})}),$(window).bind("SIModals.modalsClose",function(){$(".froid-fixed-bg").each(function(){var i=$(this);i.css("backgroundPosition",i.data("bgX")+" "+i.data("bgY"))})});

	// Mobile full-width && disable animation
	if(is_mobile()) {
		
		// Fix mobile fixed bg's
		$("header, article, footer").each(function(){if ("fixed" == $(this).css("backgroundAttachment")) $(this).css('backgroundAttachment', 'scroll');});

		// Remove animation
		$('.cre-animate').css({'transform': 'none', '-webkit-transform': 'none', '-moz-transform': 'none', '-ms-transform': 'none', '-o-transform': 'none', 'transition': 'none', '-webkit-transition': 'none', 'opacity' : 1}).removeClass('.cre-animate');
		
	}
	
	if (is_OSX()) {
		$('html, body').addClass('osx');
	}
	
	if (!!navigator.userAgent.match(/Trident./)) {
		$("html").addClass("ie");
	}
	
	if (!!navigator.userAgent.toLowerCase().match(/firefox./)) {
		$("html").addClass("ff");
	}
	
	// Init all plugins and scripts
	$.fn.SIInit = function() {
	
		// Modal photos
		$('[data-fancybox]').fancybox({
			loop : true,
			protect: true,
			transitionEffect : 'circular',
			transitionDuration : 500,
			thumbs : {
				autoStart   : true,
				hideOnClose : false,
			},
			lang : 'ru',
			i18n : {
				'ru' : {
					CLOSE       : 'Закрыть',
					NEXT        : 'Следующая',
					PREV        : 'Предыдущая',
					ERROR       : 'Возникла ошибка при загрузке. <br/> Попробуйте позже.',
					PLAY_START  : 'Начать слайдшоу',
					PLAY_STOP   : 'Отсановить слайдшоу',
					FULL_SCREEN : 'На весь экран',
					THUMBS      : 'Показать/Скрыть миниатюры'
				},
			},
			buttons : ['close']
			
		});
		
		// Forms
		$('.send-form').SIForms({
			'validateFields': { 
				'client_name' 		: 'Укажите Ваше имя',
				'client_phone' 		: 'Укажите Ваш телефон',
				'client_mail' 		: 'Укажите Ваш e-mail'
			},
			'maskedFields' : {
				'.client-phone' : {
					mask: '+7 (999) 999-99-99',
					placeholder: '_'
				},
			}
			
		});
	
	};
	
	$.fn.SIInit();

	// Styler
	$('input[type=radio]').styler();

	// Jump links
	$('.si-jump').SIJump();
	
	// Page messages
	SIPageMessages.init();

	// Equal
	$('.equal-height').matchHeight();

	// Nav
		
		// Open/Close
		$('.sandwich-link').click(function() {
			
			$('.sandwich-link').toggleClass('active');
			$('.mobile-nav-wrapper').toggleClass('active');
			$('html').toggleClass('si-lock2');
			
			return false;
		
		});
	
	// Tabs
		
		// Click
		$('.tab-item').on('click', function(e) {
			
			if (!$(this).hasClass('active')) {
				
				var $parent = $(this).parents('.tabs-wrapper');
				var index = $(this).index();
				var $content = $parent.next();
				
				$parent.find('.tab-item').removeClass('active');
				$(this).addClass('active');
				
				if ($content.height() > 200)
					$content.css('height', $content.height());
				
				$content.find('.tab-content').fadeOut(500);
				
				setTimeout(function() {
					
					$content.find('.tab-content').eq(index).fadeIn(500);
					
					setTimeout(function() {
						$content.css('height', 'auto');
					}, 500);
					
				}, 500);
				
			}
				
			e.preventDefault();
		
		});
		
		// Select first
		$('.tabs').each(function() {
		
			$(this).find('.tab-item').first().click();
		
		});
		
		// Mobile click
		$('.tabs-wrapper').bindFirst('click', function() {
			
			$(this).toggleClass('active');
			
		});
		
	// Sliders
		
		$(window).on('load', function() {
			setTimeout(function() {
				is_loading = false;
			}, 500);
		})
		
		// Single slider
		$('.single-slider').addClass('owl-carousel').owlCarousel({loop:true,items:1,margin:20,nav:true,dots:false,
			onChange : function(e){
				
				// Mobile scroll to content
				if (!is_loading && $(window).width() < 768) {
				
					$('html, body').stop().animate({scrollTop : $(e.currentTarget).offset().top - 100}, 400);
				
				}
				
				
			},});

	// FAQ
		
		// Click
		$('.faq-title').click(function() {
		
			if ($(this).hasClass('active')) return false;
			
			var $parent = $(this).parent();
			var $text = $parent.find('.faq-text');
			
			$('.faq-title').removeClass('active');
			$(this).addClass('active');
			
			$('.faq-text').slideUp(400);
			$text.slideDown(400);
			
			return false;
			
		});
		
		// Expand first
		$('.faq-title').first().click();
		
	// Nav
	if ($('#top').length > 0) {
		
		var nav_height = $('#top').outerHeight();

		$(window).on('load scroll resize', function() {

			var current_scroll = $(document).scrollTop();
		
			if (current_scroll > 0) {
				$('#top').addClass('fixed');
			}else{
				$('#top').removeClass('fixed');
			}
		
		});

	}
	
	// Modals
	SIModals.init();
		
		// Phone modal
		SIModals.attachModal({
			linkClass	: '.open-phone-modal', 
			modalClass	: '.phone-modal', 
			params		: [
				{
					'data'		: 'extra',
					'target'	: '.send-extra',
				}
			],
		});
		
		// Calc modal
		SIModals.attachModal({
			linkClass	: '.open-calc-modal', 
			modalClass	: '.calc-modal', 
			params		: [
				{
					'data'		: 'extra',
					'target'	: '.send-extra',
				}
			],
		});
					
		// Consult modal
		SIModals.attachModal({
			linkClass	: '.open-consult-modal', 
			modalClass	: '.consult-modal', 
			params		: [
				{
					'data'		: 'extra',
					'target'	: '.send-extra',
				}
			],
		});
								
		// List modal
		SIModals.attachModal({
			linkClass	: '.open-list-modal', 
			modalClass	: '.list-modal', 
			params		: [
				{
					'data'		: 'extra',
					'target'	: '.send-extra',
				}
			],
		});
			
			
			// Qiz
			
				// Variant click
				$('.big-modal-step-variant').click(function() {
					
					console.log(1);
					
					var $val = $(this).find('.big-modal-step-variant-text').text();
					var $parent = $(this).parents('.big-modal-step');
					
					$parent.find('.big-modal-step-variant').removeClass('active');
					$(this).addClass('active');
					
					$parent.find('.big-modal-step-input').val($val);
					
					return false;
				
				});
			
				// Autoheight
				$('.big-modal-step-variant-text').matchHeight();
				
				// Steps
				
					// Next step
					$('.big-modal-button.next').click(function() {
						
						var $step = $('.big-modal-step:visible');
						var $next_step = $('.big-modal-step:visible').next();
						var index = $step.index();
						var count = $('.big-modal-step').length;

						// Variants
						if ($step.find('.big-modal-step-variant').length > 0) {
						
							if ($step.find('.big-modal-step-variant.active').length == 0) {
								
								SIPageMessages.show('Выберите вариант для продолжения');
								
								return false;
							
							}
						
						}
												
						// Input
						if ($step.find('.input.in-modal').length > 0) {
						
							if ($step.find('.input.in-modal').val() == '') {
								
								SIPageMessages.show('Введите значение для продолжения');
								
								return false;
							
							}
						
						}
						
						// Next step
						if ($next_step.length > 0) {
						
							$step.slideUp(400);
							$next_step.slideDown(400);
						
						// Finish
						}else{
						
							$('.big-form').css('min-height', $('.big-form').height());
							
							$('.big-form-steps').fadeOut(400);
							
							setTimeout(function() {
								
								$('.big-steps-final').fadeIn(400);
								
								setTimeout(function() {
									$('.big-form').css('min-height', '0');
								}, 410);
								
							}, 410);
						
						}
						
						// Show/hide prev button
						var $prev_step = $('.big-modal-step:visible').prev();
						if ($prev_step.length > 0) {
							
							$('.big-modal-button.prev').removeClass('disabled');
							
						}else{
							
							$('.big-modal-button.prev').addClass('disabled');
							
						}
						
						// Move bar
						var percentage = 100 / count * ($next_step.index() + 1);
						$('.big-modal-progress-bar').css('width', percentage + '%');
							$('.big-modal-progress-bar .current-step').text(index + 2);
						
						$('.si-modals-wrapper').stop().animate({scrollTop : 0}, 300);
						
						return false;
						
					});
			
				
					// Prev step
					$('.big-modal-button.prev').click(function() {
						
						var $step = $('.big-modal-step:visible');
						var $prev_step = $('.big-modal-step:visible').prev();
						var index = $step.index();
						var count = $('.big-modal-step').length;

						$step.slideUp(400);
						$prev_step.slideDown(400);

						// Move bar
						var percentage = 100 / count * ($prev_step.index() + 1);
						$('.big-modal-progress-bar').css('width', percentage + '%');
							$('.big-modal-progress-bar .current-step').text(index);
						
						if ($(window).width() < 480) {
							
							$('.si-modals-wrapper').stop().animate({scrollTop : 0}, 300);
							
						}
							
						return false;
						
					});
			
		// Modal controls
		SIModals.attachClose('.si-close');
		
});