'use strict';

var parallax_demo = parallax_demo || {};

(function () {

	var START_OFFSET_RIGHT = 100;
	var MAX_WIDTH = 50;
	var MAX_HEIGHT = 40;

	var Pebble = function (canvas, horizonY, scrollSpeed) {
		this._canvas = canvas;
		this._scrollSpeed = scrollSpeed;
		this._horizonY = horizonY;

		this._x = 0;
		this._y = 0;
		this._width = 0;
		this._height = 0;
		this._fillStyle = '';

		this._reset();
		this._x = Math.random() * (this._canvas.width + START_OFFSET_RIGHT);
	};

	Pebble.prototype.update = function (timeDelta) {
		this._x -= timeDelta * this._scrollSpeed * this._y / this._canvas.height;
		if (this._x + this._width < 0) {
			this._reset();
		}
	};

	Pebble.prototype.draw = function (ctx) {
		ctx.fillStyle = this._fillStyle;
		ctx.fillRect(this._x, this._y, this._width, this._height);
	};

	Pebble.prototype._reset = function () {
		var yRand = this._getSquareRand();
		var widthRand = this._getSqrtRand();
		var heightRand = this._getSqrtRand();
		var lightnessRand = this._getSqrtRand();
		this._x = this._canvas.width + START_OFFSET_RIGHT;
		this._y = this._horizonY + (yRand * ( this._canvas.height - this._horizonY));
		var sqrtYRand = Math.sqrt(yRand);
		this._width = widthRand * MAX_WIDTH * sqrtYRand;
		this._height = heightRand * MAX_HEIGHT * sqrtYRand;
		this._fillStyle = 'hsl(50,0%,' + Math.floor(90 * (1 - lightnessRand * yRand)) + '%)';
	};

	Pebble.prototype._getLinearRand = function () {
		return Math.random();
	};

	Pebble.prototype._getSqrtRand = function () {
		return Math.sqrt(Math.random());
	};

	Pebble.prototype._getSquareRand = function () {
		return Math.pow(Math.random(), 2);
	};

	parallax_demo.Pebble = Pebble;

})();
