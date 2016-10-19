app.controller('opTryCtrl', [ '$scope',
	function(scope) {
		'use strict';

		var variableNames = 'abcdefghijklmnopqrstuvwxyz'.split(''),
			nameArrLength = variableNames.length,
			mathOperators = ['+', '-', '*', '/', '%', '++', '--'],
			mathArrLength = mathOperators.length;

		function _getRandomName (type) {
			var len = type === 'name' ? nameArrLength : mathArrLength;
			var idx = Math.floor(Math.random() * len);
			return type === 'name' ? variableNames[idx] : mathOperators[idx];
		}

		scope.reset = function (form) {
			if (form) {
				form.$setPristine();
			}
			scope.answer = void 0;
			scope.first = {
				name: _getRandomName('name')
			};
			scope.op = {
				name: _getRandomName('operator')
			};

			scope.second = (scope.op.name !== '++' && scope.op.name !== '--') ? { name: _getRandomName('name') } : void 0;
		};

		/**
		 * validates the input of the scope[key]
		 * calls eval()
		 * must be enclosed in try & catch to avoid malicious input
		 */
		scope.validateInput = function (k) {
			if (!_.has(scope[k], 'value')) {
				return true;
			} // basecase

			try {
				var exp = scope[k].value;
				window.eval(exp);  // jshint ignore:line
				var name = scope[k].name;
				if (!_.has(window, name)) {
					scope[k].message = name + ' is undefined';
					return false;  // did not follow instruction
				}
				var input = window[name];
				if (typeof input !== 'number') {
					scope[k].message = name + ' is not a number';
					return false;  // incorrect variable type
				}

				delete scope[k].message;
				scope[k].num = input;
				return true;
			} catch (e) {
				scope[k].message = 'Incorrect JavaScript format';
				return false;  // invalid input
			}
		};

		/**
		 * returns an equation of format: first op second = answer
		 */
		scope.getAnswer = function () {
			var res;
			if (scope.second) {
				res = scope.first.num + ' ' + scope.op.name + ' ' + scope.second.num;
				var ans = window.eval(res);  // jshint ignore:line
				scope.answer = scope.first.name + ' ' + scope.op.name + ' ' + scope.second.name + ' = ' + ans;
			} else {
				res = scope.first.num + scope.op.name;
				window.eval(scope.op.value);  // jshint ignore:line
				scope.answer = scope.first.name + ' becomes ' + window[scope.first.name];
			}
		};

		scope.reset();
	}
]);