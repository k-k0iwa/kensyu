$(function() {
	'use strict';

	//アコーディオン
	var $toggleItem = $('.js-accordion').find('.accordion-wrap');
	var $target;
	
	$toggleItem.click(function() {
		$target = $(this).find('.contents');
		$target.slideToggle();

		if($(this).hasClass('is-open')) {
			$(this).removeClass('is-open');
		} else {
			$(this).addClass('is-open');
		}

		return false;
	});
	
	//モーダルウィンドウ
	var $modal = $('.area-modal-contents-wrap');
	var $modalInner = $modal.find('.area-modal-contents-inner');
	var $closeBtn;

	$modalInner.prepend('<button class="btn-close"></button>');
	$closeBtn = $modalInner.find('.btn-close');

	$('.js-modal').click(function () {
		$modal.addClass('is-active');
		$modal.fadeIn();
	});

	$closeBtn.click(function () {
		$modal.removeClass('is-active');
		$modal.fadeOut();
	});

	//スライダー・オート
	var $autoItem = $('#js-slider-auto').find('li');
	var autoItemLength = $autoItem.length;
	var autoCount = 0;
	var $itemTarget;
	var loopEnd = autoItemLength;
	//var point; 
	var loop = setInterval(function () {
		autoCount ++;
		$itemTarget = $autoItem.eq(autoCount - 1); //0からにしたいので-1

		if (autoCount === loopEnd) {
			$itemTarget.removeClass('is-active');
			$autoItem.eq(0).addClass('is-active'); //最後までいったら最初に戻る
			clearInterval(loop);
		} else {
			$itemTarget.removeClass('is-active');
			$itemTarget.next().addClass('is-active'); //次の要素にクラスを付ける
		}
	}, 1500);

	//スライダー・ライトボタン
	var $liteItemGroup = $('#js-slider-btn');
	var $liteItem = $liteItemGroup.find('li');
	var $liteActiveIndex = $('.is-active').index($liteItem);
	var liteItemLength = $liteItem.length;

	var $liteDotsGroup;
	var $liteDots;
	var i;
	var liteClickIndex = 0;

	$liteItemGroup.after('<ul class="slider-dots"></ul>'); //ドットインジケーターの親作成
	$liteDotsGroup = $('.slider-dots');

	for (i = 0; i < liteItemLength; i++) { //ドットインジケーターを作成
		$liteDotsGroup.append('<li></li>');
		$liteDots = $liteDotsGroup.find('li');
		$liteDots.eq(i).attr('id', 'dots-' + (i + 1));
		$liteDots.eq(0).attr('class', 'dots-active');
		$liteDots.eq(i).append('<button type="button">' + (i + 1) + '</button>');
	}

	$liteDots = $liteDotsGroup.find('li');

	$liteDots.click(function () {
		//ドットインジケーターの切替
		$liteDots.removeClass('dots-active');
		$(this).addClass('dots-active');

		//画像の切替
		$liteItem.removeClass('is-active');
		liteClickIndex = $liteDots.index($(this)); //ドットインジケーターのインデックス番号を取得
		$liteItem.eq(liteClickIndex).addClass('is-active');
	});

	//スライダー・サムネイル
	var $thumSliderGroup = $('#js-slider-thum');
	var $thumSlider = $thumSliderGroup.find('li');
	var $thumItem = $('#js-thum').find('li');
	var thumClickIndex = 0;

	$thumItem.click(function () {
		//サムネイルの切替
		$thumItem.removeClass('thum-active');
		$(this).addClass('thum-active');

		//画像の切替
		$thumSlider.removeClass('is-active');
		thumClickIndex = $thumItem.index($(this));
		$thumSlider.eq(thumClickIndex).addClass('is-active');
	});

	//タブ
	var $tabGroup = $('.js-tab-group');
	var $tabGroupItem = $tabGroup.find('li > a');
	var tabItemIndex;
	var $tabContents = $('.js-tab-contents').find('.tab-item');

	$tabGroupItem.click(function () {
		tabItemIndex = $(this).parent().index();

		$tabGroupItem.removeClass('is-current');
		$(this).addClass('is-current');

		$tabContents.removeClass('is-active');
		$tabContents.eq(tabItemIndex).addClass('is-active');

		return false;
	});

	//スムーススクロール
	var href;
	var $target;
	var position;

	$('[href^="#"].scroll').click(function (){
		href = $(this).attr('href');
		$target = $(href === '#top' ? 'html' : href);
		position = $target.offset().top;

		$('html, body').animate({
			'scrollTop':position
		}, 'slow');

		return false;
	});
});

//メガメニュー / ハンバーガーメニュー
var pcWidth;
var $pcTarget = $('.list-nav').find('li');

//画面幅に応じて処理を切り替える
$(window).on('load resize', function () {
	pcWidth = window.matchMedia('(min-width:767px)').matches;

	if(pcWidth) {
		$pcTarget.hover(
			function() {
				$(this).find('.nav-inner-menu').addClass('is-active');
			},
			function() {
				$(this).find('.nav-inner-menu').removeClass('is-active');	
			}
		);
	} else {
		$('.js-btn-close').on('click', function () {
			$('#js-nav').toggleClass('is-close');
		});

		$pcTarget.off('mouseenter mouseleave');
	}
});
