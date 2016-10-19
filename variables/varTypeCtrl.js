app.controller('varTypeCtrl', ['$scope',
	function($scope) {
		'use strict';

		var variableType = '';
		var strSet = 'abcdefghijklmnopqrstuvwxyz ;:?/.>,<!@#$%^&*()_-=+[]{}'.split('');
		var hints = [
			'Do you see quotes around the variables?',
			'Is it true or false?',
			'Is it a word?',
			'Does it have a decimal point?',
			'Is this a numeric value?'
		];
		var hintsLen = hints.length, strLen = strSet.length;

		$scope.optionKeys = ['integer', 'double', 'string', 'boolean'];

		$scope.verifyAnswer = function () {
			$scope.variable.message = 1;
			$scope.variable.result = variableType === $scope.variable.type;
			return $scope.variable.result;
		};

		$scope.reset = function () {
			$scope.variable = {
				value: _getRandomVariable(),
				message: 0,
				type: ''
			};
		};

		$scope.getHelp = function () {
			var idx = Math.floor(Math.random() * hintsLen);
			return hints[idx];
		};

		function _getBool () {
			var random = Math.floor(Math.random() * 100);
			return random % 2 ? true : false;
		}

		function _getRandomNum (type) {
			var toFix = type === 'integer' ? 0 : Math.floor(Math.random() * 10 + 1),
				num = Math.random() * 100;
			return Number(num).toFixed(toFix);
		}

		function _getRandomVariable () {
			var typeIdx = Math.floor(Math.random() * 3); // 0 - 2
			variableType = $scope.optionKeys[typeIdx];

			if (variableType === 'boolean') {
				return _getBool();
			} else if (variableType === 'integer' || variableType === 'double') {
				return _getRandomNum(variableType);
			} else {
				// string can be numbers, true|false, or random characters, & combination of all
				var idx = Math.floor(Math.random() * strLen + 2), // 2 for boolean & number
					val = '';
				if (idx === strLen) {  // boolean
					val = _getBool();
				} else if (idx > strLen) {  // number
					val = _getRandomNum('double');
				} else {
					val = strSet[idx];
				}
				return '"' + val + '"';
			}
		}

		$scope.reset();
	}
]);