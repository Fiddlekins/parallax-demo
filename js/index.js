'use strict';

var parallax_demo = parallax_demo || {};

(function () {
	var Pebble = parallax_demo.Pebble;

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var HORIZON_Y = canvas.height * 0.7;
	var SCROLL_SPEED = 1/5;
	var PEBBLE_COUNT = 2000;

	var background = new parallax_demo.Background(canvas);

	var pebbles = [];
	for (var total = PEBBLE_COUNT; total--;) {
		pebbles.push(new Pebble(canvas, HORIZON_Y, SCROLL_SPEED));
	}

	var lastTimestamp = Date.now();
	var refresh = function () {
		var currentTimestamp = Date.now();
		var timeDelta = currentTimestamp - lastTimestamp;
		lastTimestamp = currentTimestamp;
		update(timeDelta);
		draw(ctx);
		window.requestAnimationFrame(refresh);
	};

	var timeElapsed = 0;
	var update = function (timeDelta) {
		timeElapsed += timeDelta;
		background.update(timeDelta);
		pebbles.forEach(function (pebble) {
			pebble.update(timeDelta);
		});
	};

	var draw = function (ctx) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		background.draw(ctx);
		pebbles.forEach(function (pebble) {
			pebble.draw(ctx);
		});
	};

	var start = function () {
		refresh();
	};

	start();
})();
