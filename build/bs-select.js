/*!
 * bs-select
 * author: Bret Little
 * copyright: 2015
 * license: MIT
 * version: 1.0.0
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jquery = __webpack_require__(1);
	var angular = __webpack_require__(2);

	angular.module("bs-select", []);

	__webpack_require__(3);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = $;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = angular;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var angular = __webpack_require__(2);
	var _ = __webpack_require__(4);
	var template = __webpack_require__(5);

	__webpack_require__(6);

	angular.module("bs-select").directive("bsSelect", function ($timeout) {

		return {
			restrict: "E",
			transclude: true,
			scope: {
				collection: "="
			},
			require: "ng-Model",
			template: template,
			link: function link(scope, el, attr, ngModelCtrl) {
				var keyTimeout;
				var searchString = "";

				scope.showDialog = false;
				scope.selectedIndex = null;

				ngModelCtrl.$render = function () {
					var viewValue = ngModelCtrl.$viewValue ? ngModelCtrl.$viewValue.value : "";
					el.find(".bs-select__selected").text(viewValue);
				};

				scope.updateModel = function (item) {
					ngModelCtrl.$setViewValue(item);
					ngModelCtrl.$render();
					scope.closeDialog();
					setTimeout(function () {
						el.find("input").focus();
					});
				};

				scope.focusSelect = function () {
					el.find(".bs-select").addClass("+focus");
				};

				attr.$observe("disabled", function () {
					scope.disabled = _.has(attr, "disabled");
				});

				scope.keyDown = function (e) {
					var key = e.which;
					var item = ngModelCtrl.$viewValue;

					if (key === 13) {
						// enter key

						scope.updateModel(scope.collection[scope.selectedIndex]);
					} else if (key === 38) {
						// up key

						scope.showDialog = true;
						scope.selectedIndex = _.isNull(scope.selectedIndex) ? getItemIndex(item) : scope.selectedIndex - 1;
						positionDialog(scope.collection[scope.selectedIndex]);
					} else if (key === 40) {
						// down key

						scope.showDialog = true;
						scope.selectedIndex = _.isNull(scope.selectedIndex) ? getItemIndex(item) : scope.selectedIndex + 1;
						positionDialog(scope.collection[scope.selectedIndex]);
					} else if (key === 27) {
						// escape key

						scope.closeDialog();
					} else {
						// all other keys

						highlightByText(e.which);
					}
				};

				scope.toggleDialog = function () {
					var item = ngModelCtrl.$viewValue;

					if (scope.showDialog) {
						scope.showDialog = false;
						el.find("input").focus();
					} else {
						scope.selectedIndex = null;
						if (item) {
							positionDialog(item);
						}
						scope.showDialog = true;
						el.find("input").focus();
					}
				};

				scope.onBlur = function (e) {
					el.find(".bs-select").removeClass("+focus");
					scope.closeDialog();
				};

				scope.closeDialog = function (e) {
					scope.showDialog = false;
				};

				function highlightByText(charCode) {
					searchString += String.fromCharCode(charCode);
					var i = getIndexFromString(searchString);

					if (i > -1) {
						scope.selectedIndex = i;
						positionDialog(scope.collection[scope.selectedIndex]);
					}

					keyTimeout = setTimeout(function () {
						searchString = "";
					}, 1000);
				}

				function getItemIndex(item) {
					if (!item) {
						return -1;
					}return _.findIndex(scope.collection, function (iItem) {
						return item.key === iItem.key;
					});
				}

				function getIndexFromString(searchString) {
					searchString = searchString.toLowerCase();
					return _.findIndex(scope.collection, function (iItem) {
						return iItem.value.toLowerCase().indexOf(searchString) === 0;
					});
				}

				function positionDialog(item) {
					var i = getItemIndex(item);

					var distanceFromEnd = scope.collection.length - i;

					if (i > 5 && distanceFromEnd < 6) {
						setTimeout(function () {
							el.find(".bs-select__menu").css({ top: -225 - (5 - distanceFromEnd) * 36 + "px" }).scrollTop(36 * i - 180);
						});
					} else if (i > 5) {
						setTimeout(function () {
							el.find(".bs-select__menu").css({ top: "-200px" }).scrollTop(36 * i - 180);
						});
					} else {
						el.find(".bs-select__menu").css({ top: 36 * i * -1 - 20 + "px" });
					}
				}
			}
		};
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = _;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<input class=\"bs-select__hidden-input\" type=\"text\" ng-focus=\"focusSelect()\" ng-blur=\"onBlur($event)\" ng-keydown=\"keyDown($event)\"/>\n<div class=\"bs-select\" ng-click=\"!disabled && toggleDialog()\" ng-class=\"{'+disabled': disabled}\">\n\t<div class=\"bs-select__selected\">\n\t</div>\n\t<div class=\"bs-select__icon\">\n\t</div>\n</div>\n<ul class=\"bs-select__menu bss-dropdown-menu\" role=\"menu\" ng-show=\"showDialog\">\n\t<li ng-mousedown=\"updateModel(item)\" ng-repeat=\"item in collection\" ng-class=\"{'+selected': (selectedIndex === $index)}\">\n\t\t<a>{{item.value}}</a>\n\t</li>\n</ul>\n";

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/blittle/dev/bs-select/node_modules/css-loader/index.js!/home/blittle/dev/bs-select/node_modules/autoprefixer-loader/index.js!/home/blittle/dev/bs-select/src/select.css", function() {
			var newContent = require("!!/home/blittle/dev/bs-select/node_modules/css-loader/index.js!/home/blittle/dev/bs-select/node_modules/autoprefixer-loader/index.js!/home/blittle/dev/bs-select/src/select.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	exports.push([module.id, "bs-select {\n\tposition: relative;\n}\n\n.bs-select {\n\tborder-radius: 2px;\n\tbox-shadow: 0 1px 4px 0 rgba(0,0,0,.26);\n\tdisplay: inline-block;\n\tpadding: 8px 14px;\n\tmin-width: 180px;\n\tcolor: #AFAFAF;\n\tbackground-color: #fff;\n\tcursor: pointer;\n\twidth: 100%;\n}\n\n.bs-select.\\+disabled {\n\tcursor: not-allowed;\n\tbackground-color: #F9F9F9;\n\topacity: 1;\n\tborder: 1px dashed #CFCFCF;\n}\n\n.bs-select.\\+focus {\n\tbox-shadow: 0 0 0 2px rgba(76,175,80,.3); /* emulate the border */\n}\n\n.bs-select__selected {\n\twidth: calc(100% - 15px);\n\tdisplay: inline-block;\n}\n\n.bs-select__icon {\n\tdisplay: inline-block;\n\tborder-color: #AFAFAF transparent;\n\tborder-style: solid;\n\tborder-width: 6px 6px 0px 6px;\n\theight: 0px;\n\twidth: 0px;\n\tfloat:right;\n\tposition: relative;\n\ttop: 5px;\n}\n\nbs-select .bs-select__menu {\n\tdisplay: block;\n\tmax-height: 400px;\n\toverflow: auto;\n\twidth: 100%;\n\tpositoin: absolute;\n}\n\nbs-select .bs-select__menu li {\n\theight: 36px!important;\n}\n\nbs-select .bs-select__menu li.\\+selected > a {\n\tcolor: #333333;\n\ttext-decoration: none;\n\tbackground-color: #f7f7f7;\n}\n\n.bs-select__hidden-input {\n\topacity: 0;\n\tposition: absolute;\n\tleft: 0;\n\ttop:0;\n\twidth: 0;\n\theight: 0;\n}\n\n", ""]);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ }
/******/ ]);