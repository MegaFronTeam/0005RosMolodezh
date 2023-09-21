"use strict";

const $ = jQuery;


function eventHandler() {

	JSCCommon.init()


	function whenResize() {
		JSCCommon.setFixedNav();
	}

	window.addEventListener('scroll', () => {
		JSCCommon.setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});

	const swiper4 = new Swiper('.sBanners__slider--js', { // если не используешь методы swiper  - можно обращаться без нее к Swiper
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});

	function inputFile(){
		if (document.querySelector('.upload-field__input-wrap')){
			let uploadField = document.querySelectorAll('.upload-field__input-wrap');
			for (let i=0;i<uploadField.length;i++){
				let inputFile = uploadField[i].querySelector('.input-upload');
				inputFile.addEventListener('change',() => uploadField[i].querySelector('.upload-field__file-name').innerHTML = inputFile.files[0].name);
			}
		}
	}
	inputFile();
	
	$("select").each(function(){
		let floatLabel;
		let placeholderName = this.getAttribute('placeholder');
		let floatDiv = '<div class="float-select"><span class="name">' + placeholderName + '</span></div>';
		let customSelect = $(this).selectize({
			onInitialize: function() {
				let targetSelect = this.$control[0];
				let floatSelect = targetSelect.querySelector('.float-select')
				if (!floatSelect) {
					targetSelect.insertAdjacentHTML("afterend", floatDiv);
					floatLabel = placeholderName;
				}
			},
			// onChange: function() {
			// 	let targetSelect = this.$control[0];
			// 	let floatSelect = targetSelect.querySelector('.float-select')
			// 	if (!floatSelect) {
			// 		$(targetSelect).append('<div class="float-select"><span class="name">' + floatLabel + '</span></div>');
			// 	}
			// }
		});
	});

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }