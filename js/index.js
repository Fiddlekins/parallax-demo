'use strict';

var parallax_demo = parallax_demo || {};

(function () {
	var Background = parallax_demo.Background;
	var Pebble = parallax_demo.Pebble;
	var Tree = parallax_demo.Tree;

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var HORIZON_Y = canvas.height * 0.7;
	var SCROLL_SPEED = { v: 1 / 2 };
	var PEBBLE_COUNT = 2000;
	var TREE_COUNT = 15;

	var background = new Background(canvas);
	var pebbles = [];
	for (var totalPebbles = PEBBLE_COUNT; totalPebbles--;) {
		pebbles.push(new Pebble(canvas, HORIZON_Y, SCROLL_SPEED));
	}
	var trees = [];
	for (var totalTrees = TREE_COUNT; totalTrees--;) {
		trees.push(new Tree(canvas, HORIZON_Y, SCROLL_SPEED));
	}
	var entities = pebbles.concat(trees);

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
		trees.forEach(function (tree) {
			tree.update(timeDelta);
		});
	};

	var draw = function (ctx) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		background.draw(ctx);
		entities.sort(function (a, b) {
			return a._y - b._y;
		});
		entities.forEach(function (entity) {
			entity.draw(ctx);
		});
	};

	window.onfocus = function () {
		lastTimestamp = Date.now();
	};

	canvas.addEventListener('pointermove', function (e) {
		SCROLL_SPEED.v = 2 * e.clientY / canvas.height;
	});

	var start = function () {
		refresh();
	};

	start();
})();
