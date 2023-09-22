"use strict";

const selectize = require("@selectize/selectize");

// const { active } = require("browser-sync");

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
	
	$(".floating-select").each(function(){
		let self= $(this);
		let floatLabel;
		let placeholderName = this.getAttribute('placeholder');
		let floatDiv = '<div class="float-select"><span class="name">' + placeholderName + '</span></div>';
		let customSelect = $(this).selectize({
			persist: false,
			closeAfterSelect: true,
			onInitialize() {
				let targetSelect = this.$control[0];
				let floatSelect = targetSelect.querySelector('.float-select')
				if (!floatSelect) {
					targetSelect.insertAdjacentHTML("afterend", floatDiv);
					floatLabel = placeholderName;
				}
			},
			onDropdownOpen() {
				$(".floating-select .selectize-input").removeClass('dropdown-active, focus, input-active')
				// selectize.close()
			}
		});
	});

	const filterBtns = document.querySelectorAll('.filter__btn--js');
	const filterDropdowns = document.querySelectorAll('.filter__dropdown');
	filterBtns.forEach(btn => {
		btn.addEventListener('click', (e) => {
				e.currentTarget.closest('.filter__item').querySelector('.filter__dropdown').classList.toggle('active');
				filterDropdowns.forEach(el => {
					if (el !== e.currentTarget.closest('.filter__item').querySelector('.filter__dropdown')) {
						el.classList.remove('active');
					}
					
				})
		});
	 document.addEventListener('click', (e) => {
		if (!(e.target.closest('.filter__dropdown')) && (!e.target.classList.contains('filter__btn'))) {
			filterDropdowns.forEach(el => {
				el.classList.remove('active');
			})
		}
	})
 });

 function dropDown(btn,dropdown,wrap) {
	let buttons = document.querySelectorAll('.' + btn);
	let dropdowns = document.querySelectorAll('.' + dropdown);
	buttons.forEach(btn => {
		btn.addEventListener('click',(e) => {
			// console.log(e.currentTarget);
			e.currentTarget.closest('.' + wrap).querySelector('.' + dropdown).classList.toggle('visually-hidden');
			dropdowns.forEach(el => {
				if (el !== e.currentTarget.closest('.' + wrap).querySelector('.dropdown')) {
					el.classList.add('visually-hidden');
				}
			})
	})
	});
	document.addEventListener('click', (e) => {
		if (!(e.target.closest('.' + dropdown)) && (!e.target.classList.contains(btn)) && (!e.target.classList.contains('icon'))) {
			dropdowns.forEach(el => {
				el.classList.add('visually-hidden');
			})
		}
	})
 }
 dropDown('sStaff__btn','sStaff__dropdown','sStaff__dropdown-wrap');

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