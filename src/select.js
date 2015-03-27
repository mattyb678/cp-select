var angular = require('angular');
var _ = require('lodash');
var template = require('./select.html');

require('./select.css');

angular.module('bs-select')
	.directive('bsSelect', function($timeout) {

		return {
			restrict: "E",
			transclude: true,
			scope: {
				collection: '='
			},
			require: "ng-Model",
			template: template,
			link: function(scope, el, attr, ngModelCtrl) {
				var keyTimeout;
				var searchString = "";

				scope.showDialog = false;
				scope.selectedIndex = null;

				ngModelCtrl.$render = function() {
					var viewValue = ngModelCtrl.$viewValue ? ngModelCtrl.$viewValue.value : "";
					el.find('.bs-select__selected').text(viewValue);
				}

				scope.updateModel = function(item) {
					ngModelCtrl.$setViewValue(item);
					ngModelCtrl.$render();
					scope.closeDialog();
					setTimeout(function() {
						el.find('input').focus();
					})
				}

				scope.focusSelect = function() {
					el.find('.bs-select').addClass('+focus');
				}

				attr.$observe('disabled', function() {
					scope.disabled = _.has(attr, 'disabled');
				});

				scope.keyDown = function(e) {
					e.preventDefault();

					var key = e.which;
					var item = ngModelCtrl.$viewValue;

					if(key === 13) {				// enter key

						scope.updateModel(scope.collection[scope.selectedIndex]);

					} else if(key === 38) { // up key

						scope.showDialog = true;
						scope.selectedIndex = _.isNull(scope.selectedIndex) ? getItemIndex(item) : scope.selectedIndex - 1;
						positionDialog(scope.collection[scope.selectedIndex]);

					} else if(key === 40) { // down key

						scope.showDialog = true;
						scope.selectedIndex = _.isNull(scope.selectedIndex) ? getItemIndex(item) : scope.selectedIndex + 1;
						positionDialog(scope.collection[scope.selectedIndex]);

					} else if(key === 27) { // escape key

						scope.closeDialog();

					} else {								// all other keys

						highlightByText(e.which);

					}
				}

				scope.toggleDialog = function() {
					var item = ngModelCtrl.$viewValue;

					if(scope.showDialog) {
						scope.showDialog = false;
						el.find('input').focus();
					} else {
						scope.selectedIndex = null;
						if(item) {
							positionDialog(item);
						}
						scope.showDialog = true;
						el.find('input').focus();
					}
				}

				scope.onBlur = function(e) {
					el.find('.bs-select').removeClass('+focus');
					scope.closeDialog();
				}

				scope.closeDialog = function(e) {
					scope.showDialog = false;
				}

				function highlightByText(charCode) {
						searchString += String.fromCharCode(charCode);
						var i = getIndexFromString(searchString);

						if(i > -1) {
							scope.selectedIndex = i;
							if(scope.showDialog) {
								positionDialog(scope.collection[scope.selectedIndex]);
							} else {
								scope.updateModel(scope.collection[scope.selectedIndex]);
							}
						}

						keyTimeout = setTimeout(function() {
							searchString = "";
						}, 1000);
				}

				function getItemIndex(item) {
					if(!item) return -1;
					return _.findIndex(scope.collection, (iItem) => {
						return item.key === iItem.key;
					});
				}

				function getIndexFromString(searchString) {
					searchString = searchString.toLowerCase();
					return _.findIndex(scope.collection, (iItem) => {
						return iItem.value.toLowerCase().indexOf(searchString) === 0;
					});
				}

				function positionDialog(item) {
					var i = getItemIndex(item);

					var distanceFromEnd = scope.collection.length - i;

					if (i > 5 && distanceFromEnd < 6) {
						scope.dialogStyle = {
							top: -222 - (5 - distanceFromEnd) * 36 + "px"
						};
						setTimeout(function () {
							el.find(".bs-select__menu").scrollTop(36 * i - 180);
						});
					} else if (i > 5) {
						scope.dialogStyle = {
							top: "-198px"
						};
						setTimeout(function () {
							el.find(".bs-select__menu").scrollTop(36 * i - 180);
						});
					} else {
						scope.dialogStyle = {
							top: 2 + (36 * i * -1 - 20) + "px"
						};
					}
				}
			}
		}
	});
