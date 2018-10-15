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
	var $play = $('.js-slider-play');
	var loop;

	function changePage() {
		$itemTarget.removeClass('is-active');
		$itemTarget.next().addClass('is-active'); //次の要素にクラスを付ける
	}

	function startLoop() {
		loop = setInterval(function () {
			$itemTarget = $autoItem.eq(autoCount - 1); //0からにしたいので-1

			if (autoCount === loopEnd) {
				autoCount = 0;
				$autoItem.eq(0).addClass('is-active'); //最後までいったら最初に戻る
				changePage();
			} else {
				autoCount ++;
				changePage();
			}
		}, 1500);
	}

	function stopTimer() {
		clearInterval(loop);
	}

	startLoop();

	$play.click(function() {
		if($(this).hasClass('is-active')) {
			stopTimer();
			$(this).removeClass('is-active');
		} else {
			startLoop();
			$(this).addClass('is-active');
		}
	});

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

	//Ajax JSON
	var $result = $('#json-result');
	var $target = $('#json-test');
	var jsonLen;
	var personLen;

	$.ajax({
		type: 'GET',
		url: 'js/test.json',
		dataType: 'json'
	})
	.then(
		function(json) {
			$result.text('以下は成功したら表示されるテキストです。').css('font-size', '26px');

			jsonLen = json.length;

			for(var i = 0; i < jsonLen; i++) {
				$target.append('<p class="txt-division">' + json[i].division + '</p>');

				personLen = json[i].person.length;

				for(var k = 0; k < personLen; k++) {
					$target.append('<p class="txt-person">' + json[i].person[k].name + ':' + json[i].person[k].age + '歳' + '</p>');
				}
			}
		},
		function() {
			$result.text('Ajax失敗！！！').css({
				'color' : 'red',
				'font-size' : '26px'
			});
		}
	);
});

//メガメニュー / ハンバーガーメニュー
var pcWidth;
var $pcTarget = $('.list-nav').find('li');

//画面幅に応じて処理を切り替える
$(window).on('load resize', function () {
	pcWidth = window.matchMedia('(min-width:767px)').matches;

	if(pcWidth || $(this).find('div').hasClass('nav-inner-menu')) {
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
