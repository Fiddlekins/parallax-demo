'use strict';

var parallax_demo = parallax_demo || {};

(function () {

	var utils = parallax_demo.utils;

	var START_OFFSET_RIGHT = 100;
	var MIN_WIDTH = 10;
	var MAX_WIDTH = 30;
	var MIN_HEIGHT = 200;
	var MAX_HEIGHT = 500;
	var X_RANGE = 0;
	var Y_RANGE = 30;
	var MIN_HUE = 100;
	var MAX_HUE = 160;
	var LEAF_COUNT = 5;

	var Leaf = function (canvas, horizonY, scrollSpeed) {
		this._canvas = canvas;
		this._scrollSpeed = scrollSpeed;
		this._horizonY = horizonY;

		this._x = 0;
		this._y = 0;
		this._width = 0;
		this._height = 0;
		this._skew = 0;
	};

	Leaf.prototype.update = function (timeDelta) {
		this._x -= timeDelta * this._scrollSpeed.v * this._y / this._canvas.height;
	};

	Leaf.prototype.draw = function (ctx) {
		ctx.save();
		var halfWidth = this._width / 2;
		ctx.fillStyle = this._fillStyle;
		ctx.beginPath();
		ctx.moveTo(this._x - halfWidth, this._y);
		ctx.lineTo(this._x + halfWidth, this._y);
		ctx.lineTo(this._x + this._skew, this._y - this._height);
		ctx.fill();
		ctx.restore();
	};

	Leaf.prototype.reset = function (x, y, yRand) {
		this._x = x + utils.getLinearRand() * X_RANGE * yRand;
		this._y = y + utils.getLinearRand() * Y_RANGE * yRand;
		this._width = yRand * ( MIN_WIDTH + utils.getLinearRand() * (MAX_WIDTH - MIN_WIDTH));
		this._height = yRand * (MIN_HEIGHT + utils.getLinearRand() * (MAX_HEIGHT - MIN_HEIGHT));
		this._skew = (utils.getLinearRand() - 0.5) * 10 * MAX_WIDTH * yRand;
		var h = MIN_HUE + utils.getLinearRand() * (MAX_HUE - MIN_HUE);
		var s = 30 + 70 * utils.getSquareRand();
		var l = Math.floor(70 * (1 - utils.getLinearRand()));
		this._fillStyle = 'hsl(' + h + ',' + s + '%,' + l + '%)';
	};

	Leaf.prototype.isVisible = function () {
		var halfWidth = this._width / 2;
		return !(this._x + halfWidth < 0 && this._x + this._skew < 0);
	};

	var Tree = function (canvas, horizonY, scrollSpeed) {
		this._canvas = canvas;
		this._scrollSpeed = scrollSpeed;
		this._horizonY = horizonY;

		this._x = 0;
		this._y = 0;
		this._leaves = [];
		for (var total = LEAF_COUNT; total--;) {
			this._leaves.push(new Leaf(canvas, horizonY, scrollSpeed));
		}

		this._initialPlacement = true;

		this._reset();
	};

	Tree.prototype.update = function (timeDelta) {
		var isVisible = false;
		for (var i = 0; i < this._leaves.length; i++) {
			this._leaves[i].update(timeDelta);
			isVisible = isVisible || this._leaves[i].isVisible();
		}
		if (!isVisible) {
			this._reset();
		}
	};

	Tree.prototype.draw = function (ctx) {
		for (var i = 0; i < this._leaves.length; i++) {
			this._leaves[i].draw(ctx);
		}
	};

	Tree.prototype._reset = function () {
		var yRand = utils.getLinearRand();
		this._x = this._initialPlacement ? utils.getLinearRand() * this._canvas.width : this._canvas.width + START_OFFSET_RIGHT;
		this._y = this._horizonY + (yRand * ( this._canvas.height - this._horizonY));
		for (var i = 0; i < this._leaves.length; i++) {
			this._leaves[i].reset(this._x, this._y, yRand);
		}
		this._leaves.sort(function (a, b) {
			return a._y - b._y;
		});
		this._initialPlacement = false;
	};

	parallax_demo.Tree = Tree;

})();

