'use strict';

var parallax_demo = parallax_demo || {};

(function () {

	var utils = {};

	utils.getLinearRand = function () {
		return Math.random();
	};

	utils.getSqrtRand = function () {
		return Math.sqrt(Math.random());
	};

	utils.getSquareRand = function () {
		return Math.pow(Math.random(), 2);
	};

	parallax_demo.utils = utils;

})();
