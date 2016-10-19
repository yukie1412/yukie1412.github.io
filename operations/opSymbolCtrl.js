app.controller('opSymbolCtrl', ['$scope',
	function($scope) {
		'use strict';

		var opIdx = '', a, b, res;
		$scope.operations = ['+', '-', '*', '/', '%'];

		function _limitDecimalPlace (num) {
			if (Math.floor(num) !== num) {
				var sigfic = num.toString().split('.')[1].length;
				if (sigfic > 5) {
					num = Number(num).toFixed(5);
				}
			}
			return num;
		}

		// this function is ignored by jshint to prevent harmful warnings
		function _evaluate (op) {
			return eval(a + op + b); // jshint ignore:line
		}

		/**
		 * generates a new queation each time:
		 *   get 2 random numbers (a, b) & an operator (from $scope.operations)
		 *   calculate the result, and display the equation with the operator removed
		 *   ie: a = 3, b = 4, op = +
		 *       equation: 3 ___ 4 = 7
		 */
		$scope.reset = function () {
			a = Math.ceil(Math.random() * 50);  // first number of equation
			b = Math.ceil(Math.random() * 50);  // second number of equation
			opIdx = Math.floor(Math.random() * $scope.operations.length);
			// next line (eval) is ignored by jshint to prevent harmful warnings
			res = _evaluate($scope.operations[opIdx]);
			res = _limitDecimalPlace(res);
			var equation = a + ' ___ ' + b + ' = ' + res;

			$scope.variable = {
				value: equation,
				message: 0,
				symbol: ''
			};
		};

		/**
		 * checks user selection with the original answer ($scope.operations[opIdx])
		 */
		$scope.verifyAnswer = function () {
			delete $scope.variable.message;
			$scope.variable.result = $scope.operations[opIdx] === $scope.variable.symbol;
			if ($scope.variable.result) {
				// complete the equation
				$scope.variable.value = $scope.variable.value.replace('___', $scope.variable.symbol);
				return;
			}

			// certain case of % & -
			// ie: 20 __ 8 = 12
			var purposedAnswer = _evaluate($scope.variable.symbol); // jshint ignore:line
			if (purposedAnswer === res) {
				$scope.variable.message = 'Correct! But there is another answer. Can you spot it?';
			}
		};

		$scope.reset();
	}
]);