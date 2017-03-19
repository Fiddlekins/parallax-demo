'use strict';

var parallax_demo = parallax_demo || {};

(function () {

	var Background = function (canvas) {
		this._canvas = canvas;
		this._fillStyle = 'black';
	};

	Background.prototype.update = function (timeDelta) {
	};

	Background.prototype.draw = function (ctx) {
		ctx.fillStyle = this._fillStyle;
		ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
	};

	parallax_demo.Background = Background;

})();
