app.controller('objCtrl', [ '$scope', 'FORM_PROPERTIES',
	function ($scope, FORM_PROPERTIES) {
		'use strict';
		$scope.slides = [
			'objects/slides/slide1.html',
			'objects/slides/slide2.html',
			'objects/slides/slide3.html',
			'objects/slides/slide4.html',
			'objects/slides/slide5.html',
			'objects/slides/slide6.html'
		];
		$scope.formProperties = _.cloneDeep(FORM_PROPERTIES);

		/* regex is an regular expression to check the format of user input;
		 * expected format:
		 *   must start with var
		 *   follow by one whitespace
		 *   follow by a series of letters
		 *   follow by one whitespace
		 *   follow by an equal sign
		 *   follow by one whitespace
		 *   follow by a series of letters, numbers, -, .
		 *   must end with ;
		 */
		var regex = /^var [a-zA-Z]+ = [a-zA-Z0-9-\.\"]+;$/,
			objRegex = /^var [a-zA-Z]+ = (\[|\{)[a-zA-Z0-9-\.\", :\n\[\]\{\}]*(\]|\});$/,
			bracketNotation = /\[([^\]]+)]/g;

		function _setPetProperty (property, value) {
			delete property.message;
			$scope.pet[property.name] = {
				value: value,
				text: property.text
			};
		}

		function _getValue (obj, arr, idx) {
			if (_.has(obj, arr[idx])) {
				if (arr.length - 1 === idx) {
					return obj[arr[idx]];
				} else {
					if (_.has(obj[arr[idx]], 'value')) {
						return _getValue(obj[arr[idx]].value, arr, ++idx);
					} else {
						return _getValue(obj[arr[idx]], arr, ++idx);
					}
				}
			}
			return;
		}

		function _sanitizeVal (arr) {
			var replaceStr = ['[', '"', '"', ']'];  // 2 quotes
			return _.map(arr, function (v) {
				_.forEach(replaceStr, function (s) {
					v = v.replace(s, '');
				});
				return v;
			});
		}

		/**
		 * initial start function
		 * resets all dynamic variables
		 */
		$scope.reset = function () {
			$scope.active = $scope.slides.length - 1;
			$scope.pet = {};
			$scope.variableDefinitions = {};
			$scope.output = {
				value: ''
			};
		};

		$scope.getValue = function () {
			var bracketArr = $scope.output.value.match(bracketNotation);
			if (_.has($scope.pet, $scope.output.value)) {
				return $scope.pet[$scope.output.value].value;
			} else if (_.indexOf($scope.output.value, '.') > 0) {
				var arr = $scope.output.value.split('.');
				return _getValue($scope.pet, arr, 0);
			} else if (bracketArr) {
				bracketArr = _sanitizeVal(bracketArr);
				var key = $scope.output.value.split('[');
				if (_.has($scope.pet, key[0])) {
					return _getValue($scope.pet[key[0]].value, bracketArr, 0);
				}
			}
		};

		$scope.verifyInput = function (property, form) {
			/* user left input box without any input
			 * invalid since all fields are required
			 * forcefully setting the input status to $dirty, 
			 * so ng-class will take effect in html
			 */
			if (!$scope.variableDefinitions[property.name]) {
				form[property.formName].$setDirty();
				property.message = 'This field is required.';
				return;
			}

			// validate user input syntax. details see definition of regex
			var userInput = $scope.variableDefinitions[property.name];
			var isObj = property.type === 'array' || property.type === 'object';
			if ((isObj && _.isNull(userInput.match(objRegex))) ||
				(!isObj && _.isNull(userInput.match(regex)))) {
				property.message = 'Check your syntax.';
				return;
			}

			try {
				window.eval(userInput);  // jshint ignore:line

				if (!_.has(window, property.name)) {
					property.message = property.name + ' is undefined';
					return;
				}  // check if expected variable name is defined

				var inputValue = window[property.name];
				// number validation
				if (typeof inputValue === 'number' && (property.type === 'integer' || property.type === 'double')) {
					if (property.type === 'integer' && inputValue !== parseInt(inputValue)) {
						property.message = 'Value of ' + property.name + ' must be an integer';
						return;
					}
					_setPetProperty(property, inputValue);
					return;
				} else if (typeof inputValue === 'object') {
					if (property.type === 'array' && inputValue instanceof Array) {
						_setPetProperty(property, inputValue);
						return;
					} else if (property.type === 'object' && inputValue instanceof Object) {
						_setPetProperty(property, inputValue);
						return;
					}
				} else if (typeof inputValue === property.type) {
					_setPetProperty(property, inputValue);
					return;
				}

				property.message = 'Value of ' + property.name + ' must be a ' + property.type;
			} catch (e) {
				property.message = 'Invalid input.';  // this should never happen after the syntax check above. but just in case
			}
		};

		$scope.reset();
	}
]);