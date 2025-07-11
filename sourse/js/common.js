'use strict';

const $ = jQuery;

function eventHandler() {
  JSCCommon.init();

  function whenResize() {
    JSCCommon.setFixedNav();
  }

  window.addEventListener(
    'scroll',
    () => {
      JSCCommon.setFixedNav();
    },
    { passive: true },
  );
  window.addEventListener(
    'resize',
    () => {
      whenResize();
    },
    { passive: true },
  );

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
  };

  new Swiper('.breadcrumb-slider--js', {
    slidesPerView: 'auto',
    freeMode: true,
    watchOverflow: true,
  });

  const swiper4 = new Swiper('.sBanners__slider--js', {
    // если не используешь методы swiper  - можно обращаться без нее к Swiper
    // slidesPerView: 5,
    ...defaultSl,
    slidesPerView: 'auto',
    freeMode: true,
    loopFillGroupWithBlank: true,
    touchRatio: 0.2,
    slideToClickedSlide: true,
    freeModeMomentum: true,
  });

  function inputFile() {
    if (document.querySelector('.upload-field__input-wrap ')) {
      let uploadField = document.querySelectorAll('.upload-field__input-wrap');
      for (let i = 0; i < uploadField.length; i++) {
        let inputFile = uploadField[i].querySelector('.input-upload');
        if (inputFile) {
          inputFile.addEventListener(
            'change',
            () =>
              (uploadField[i].querySelector('.upload-field__file-name').innerHTML =
                inputFile.files[0].name),
          );
        }
      }
    }
  }
  inputFile();

  $('.form-wrap__input-wrap').each(function () {
    let self = $(this);
    let floatLabel;
    // let placeholderName = $(this)[0].querySelector("select").getAttribute('data-placeholder');
    // let floatDiv = '<div class="float-select"><span class="name">' + placeholderName + '</span></div>';
    const tags = self.find('select').data('tags');
    let select = self.find('select').select2({
      dropdownParent: self,
      language: 'ru',
    });

    select.one('select2:open', function (e) {
      // console.log(self.find("select")[0].dataset);

      $('input.select2-search__field').prop(
        'placeholder',
        tags === true ? 'Поиск или введите свой вариант ответа' : ' Поиск',
      );
    });
    // console.log(select2);
  });

  // $(".floating-select").each(function(){
  // 	let self= this;
  // 	let customSelect;
  // 	let floatLabel;
  // 	let classSelectize = 'selectize-'+ (Math.round(Math.random() * 1000));
  // 	let targetSelect;
  // 	let placeholderName = this.getAttribute('placeholder');
  // 	let floatDiv = '<div class="float-select"><span class="name">' + placeholderName + '</span></div>';

  // 	customSelect = $(this).selectize({
  // 		persist: false,
  // 		closeAfterSelect: true,
  // 		copyClassesToDropdown: false,
  // 		searchConjunction: 'or',
  // 		delimiter: " ",
  // 		onInitialize() {
  // 			targetSelect = this.$control[0];
  // 			targetSelect.classList.add(classSelectize)
  // 			let floatSelect = targetSelect.querySelector('.float-select');
  // 			// console.log(targetSelect);

  // 			if (!floatSelect) {
  // 				targetSelect.insertAdjacentHTML("afterend", floatDiv);
  // 				floatLabel = placeholderName;
  // 			}
  // 		},
  // 	});
  // 	self.parentNode.addEventListener("click", function() {
  // 		let otherSelect = $(`.selectize-control .selectize-input.focus:not(.${classSelectize})`);
  // 		otherSelect.removeClass('dropdown-active  focus input-active')
  // 			.parent().find(".selectize-dropdown").hide();
  // 		// console.log(this);
  // 	})
  // });

  // 	const filterBtns = document.querySelectorAll('.filter__btn--js');
  // 	const filterDropdowns = document.querySelectorAll('.filter__dropdown');
  // 	filterBtns.forEach(btn => {
  // 		btn.addEventListener('click', (e) => {
  // 				let dropDown = btn.nextElementSibling;
  // 				dropDown.classList.toggle('active');
  // 				dropDown.forEach(el => {
  // 					if (el !== e.currentTarget.closest('.filter__item').querySelector('.filter__dropdown')) {
  // 						el.classList.remove('active');
  // 					}

  // 				})
  // 		});
  // 	 document.addEventListener('click', (e) => {
  // 		if (!(e.target.closest('.filter__dropdown')) && (!e.target.classList.contains('filter__btn'))) {
  // 			filterDropdowns.forEach(el => {
  // 				el.classList.remove('active');
  // 			})
  // 		}
  // 	})
  //  });

  //
  // let showBtns = document.querySelectorAll(".show-btn-js");
  // showBtns.forEach((btn) => {
  //   btn.addEventListener("click", function (event) {
  //     let hidden = btn.closest(".hidden-wrap-js").querySelector(".hidden-js");

  //     hidden.classList.toggle("visually-hidden");
  //     btn.classList.toggle("hidden");
  //     // JSCCommon.cropText();
  //     if (btn.classList.contains("btn-isActive-virtual")) {
  //       btn.classList.remove("btn-isActive-virtual");
  //     }
  //   });
  // });
  let headers = document.querySelectorAll('.sFormInner__item-header');
  headers.forEach((header) => {
    header.addEventListener('click', function (event) {
      let hiddenWrap = header.closest('.hidden-wrap-js');
      let hidden = hiddenWrap.querySelector('.hidden-js');
      let btn = hiddenWrap.querySelector('.show-btn-js');

      hidden.classList.toggle('visually-hidden');
      btn.classList.toggle('hidden');
      // JSCCommon.cropText();
      if (btn.classList.contains('btn-isActive-virtual')) {
        btn.classList.remove('btn-isActive-virtual');
      }
    });
  });

  const hideBtn = document.querySelector('.sFormInner__hide-all');
  if (hideBtn) {
    hideBtn.addEventListener('click', () => {
      const allVisual = document.querySelectorAll('.sFormInner__hidden.hidden-js');
      allVisual.forEach((el) => el.classList.add('visually-hidden'));

      const allBtns = document.querySelectorAll('.show-btn-js');
      allBtns.forEach((el) => el.classList.add('hidden'));
    });
  }
  // $(".btn-show-all-js").on("click", function () {
  //   let selfToggle = $(this);

  //   if (!selfToggle.hasClass("active")) {
  //     $(".show-btn-js.hidden")
  //       .trigger("click")
  //       .addClass("btn-isActive-virtual");
  //     selfToggle.addClass("active");
  //   } else {
  //     $(".show-btn-js.btn-isActive-virtual")
  //       .trigger("click")
  //       .removeClass("btn-isActive-virtual");
  //   }

  //   selfToggle.toggleClass("active");
  // });

  $('.btn-show-all-js').click(function () {
    let selfToggle = $(this);
    let showButtons = $('.show-btn-js');
    let hiddenButtons = showButtons.filter('.hidden');
    let activeButtons = showButtons.filter('.btn-isActive-virtual');

    if (selfToggle.hasClass('active')) {
      activeButtons.trigger('click').removeClass('btn-isActive-virtual');
    } else if (hiddenButtons.length > 0) {
      hiddenButtons.trigger('click');
      showButtons.addClass('btn-isActive-virtual');
    } else {
      showButtons.trigger('click');
      selfToggle.addClass('active');
    }

    selfToggle.toggleClass('active');
  });

  //Показывает и скрывает комментарии

  let showCommentBtns = document.querySelectorAll('.comment-btn-js');
  let hideCommentBtns = document.querySelectorAll('.hide-comment-js');
  showCommentBtns.forEach((btn) => {
    btn.addEventListener('click', function (event) {
      event.preventDefault();
      let comment = btn.nextElementSibling;
      comment.classList.remove('visually-hidden');
      btn.classList.add('visually-hidden');
    });
  });
  hideCommentBtns.forEach((btn) => {
    btn.addEventListener('click', function (event) {
      event.preventDefault();
      let comment = btn.closest('.comment-body-js');
      comment.classList.add('visually-hidden');
      let showBtn = comment.previousElementSibling;
      showBtn.classList.remove('visually-hidden');
    });
  });
  // /Показывает и скрывает комментарии

  function dropDown(btn, dropdown) {
    let buttons = document.querySelectorAll('.' + btn);
    let dropdowns = document.querySelectorAll('.' + dropdown);
    let openedDropdown;
    buttons.forEach((btn) => {
      btn.addEventListener('click', function (event) {
        let dropDown = btn.nextElementSibling;
        if (dropDown.classList.contains('visually-hidden')) {
          document.querySelectorAll('.dropdown').forEach((dd) => {
            if (dd !== event.target) {
              dd.classList.add('visually-hidden');
            }
          });
          dropDown.classList.remove('visually-hidden');
          event._isOpen = true;
        } else if (!dropDown.classList.contains('visually-hidden')) {
          dropDown.classList.add('visually-hidden');
        }
      });
    });
    document.addEventListener('click', function (event) {
      dropdowns.forEach((el) => {
        if (!el.classList.contains('visually-hidden')) {
          openedDropdown = el;
        }
      });
      if (event.composedPath().includes(openedDropdown)) return;
      if (!event._isOpen) {
        dropdowns.forEach((dd) => {
          dd.classList.add('visually-hidden');
        });
      }
    });
  }
  dropDown('sStaff__btn', 'sStaff__dropdown');
  dropDown('filter__btn--js', 'filter__dropdown');
  dropDown('sEventTable__more-btn', 'sEventTable__dropdown');

  //  $('.crop-text--js ').readmore({
  // 	 moreLink: '<a href="#">Показать весь текст</a>',
  // 	 lessLink: '<a href="#">Скрыть</a>',
  // 	 collapsedHeight: 60,
  //  });
}
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
