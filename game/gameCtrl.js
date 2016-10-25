app.controller('gameCtrl', ['$scope', '$timeout', '$interval', '$uibModal', 'VARIABLE_PROPERTIES', 'INSTRUCTIONS',
	function($scope, $timeout, $interval, $uibModal, VARIABLE_PROPERTIES, INSTRUCTIONS) {
		'use strict';
		// list of cats available to select from - image names from /lib/assets/cats
		$scope.catLists = ['blackCat.png', 'blueCat.png', 'brownCat.png', 'greyCat.png', 'whiteCat.png', 'yellowCat.png'];
		$scope.variableProperties = _.cloneDeep(VARIABLE_PROPERTIES);
		$scope.gameInstructions = _.cloneDeep(INSTRUCTIONS);
		$scope.messages = [];

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
			answerRegex = [
				/^console.log\(.*\);$/,
				/^alert\(.*\);$/,
				/^window.alert\(.*\);$/
			],
			instructionLength = $scope.gameInstructions.length,
			stopTimer, showerCycle, pauseInterval, response, currentModal;

		function _setCatProperty (property, value) {
			delete property.message;
			$scope.cat[property.name] = {
				value: value,
				text: property.text
			};
		}

		function _isGameOver () {
			// check game over
			if ($scope.cat.happiness.value === 0) {
				$interval.cancel(stopTimer);
				$scope.gameSetting.lost = true;
			}
		}

		function _openModal (resType) {
			$scope.modal = {
				questions: []
			};
			currentModal = $uibModal.open({
				templateUrl: 'game/game-modal.html',
				backdrop: 'static',
				scope: $scope
			});
			response = resType;
			pauseInterval = true;
		}

		$scope.closeModal = function () {
			pauseInterval = false;
			currentModal.dismiss('cancel');
		};

		function countDown () {
			if ($scope.gameSetting.page !== 2 || pauseInterval) {
				return;
			}

			if (!_.isEmpty($scope.messages)) {
				$scope.messages.shift();
			}  // remove message

			if ($scope.timer === 0) {
				$scope.timer = 10;
				$scope.cat.happiness.value--;
				$scope.cat.coins.value += 2;
				$scope.messages.push('happiness--');
				$scope.messages.push('coins += 2');
				_isGameOver();
				// check shower cycle
				if (showerCycle !== 0) {
					showerCycle--;
				} else {
					$scope.showerCat(true);
				}
				if ($scope.gameSetting.petCycle > 0) {
					$scope.gameSetting.petCycle--;
				}
			} else {
				$scope.timer--;
			}
		}

		/**
		 * initial start function
		 * resets all dynamic variables
		 */
		$scope.reset = function () {
			$scope.cat = {
				inventory: {
					food: 1,
					toy: 1
				}
			};  // properties of selected cat
			$scope.variableDefinitions = {};
			$scope.timer = 10;
			$scope.gameSetting = {
				page: 0,
				petCycle: 0
			};
			showerCycle = 5;
		};

		/**
		 * true if all inputs are valid (no message field in property)
		 */
		$scope.noMessages = function () {
			var isValid = true;
			_.some($scope.variableProperties, function (property) {
				if (property.message) {
					isValid = false;
					return;
				}
			});
			return isValid;
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
			if (_.isNull(userInput.match(regex))) {
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
					if (inputValue > property.max || inputValue < property.min) {
						property.message = 'Value of ' + property.name + ' must be between ' + property.min + ' and ' + property.max;
						return;
					}
					_setCatProperty(property, inputValue);
					return;
				} else if (typeof inputValue === property.type) {
					_setCatProperty(property, inputValue);
					return;
				}

				property.message = 'Value of ' + property.name + ' must be a ' + property.type;
			} catch (e) {
				property.message = 'Invalid input.';  // this should never happen after the syntax check above. but just in case
			}
		};

		/**
		 * triggers help/game instructions & stop timer
		 */
		$scope.getHelp = function () {
			$scope.gameSetting.help = true;
			pauseInterval = true;
			$scope.gameSetting.helpStep = 0;
		};
		$scope.nextHelpHint = function () {
			$scope.gameSetting.helpStep++;
			if ($scope.gameSetting.helpStep === instructionLength) {
				$scope.closeHelp();
			}
		};
		/**
		 * closes game instructions & start timer
		 */
		$scope.closeHelp = function () {
			if (!stopTimer) {
				stopTimer = $interval(countDown, 1000);
			}
			$scope.gameSetting.help = false;
			pauseInterval = false;
		};


		function _populateQuestions (left, right, ops, name) {
			var answers = [], key = ops === '+' ? 'increased' : 'reduced';
			if (right === 1) {
				answers.push(left + ops + ops + ';');
			}
			answers.push(left + ' ' + ops + '= ' + right + ';');
			answers.push(left + ' = ' + left + ' ' + ops + ' ' + right + ';');

			$scope.modal.questions.push({
				q: '<code>' + left + '</code> is ' + key + ' by <code>' + right + '</code>',
				name: name,
				answers: answers
			});
		}

		/**
		 * interactions
		 */
		$scope.talk = function () {
			_openModal('talkToPet');
			$scope.modal.questions = [{
				q: 'What would you like to say to your pet? Use either <code>console.log</code> or <code>alert</code>',
				name: 'talk'
			}];
		};
		$scope.showerCat = function (bypass) {
			if (!bypass) {
				_openModal('showerCat');
				_populateQuestions('happiness', $scope.cat.shower.value, '-', 'shower');
			}
		};
		$scope.petCat = function () {
			_openModal('petCat');
			_populateQuestions('happiness', $scope.cat.pet.value, '+', 'pet');
		};
		$scope.addInventory = function (type) {
			_openModal('addInventory');
			_populateQuestions('coins', $scope.cat[type].value, '-', 'coin');
			_populateQuestions(type, 1, '+', type);
			$scope.modal.type = type;
		};
		$scope.useInventory = function (action, type) {
			_openModal('useInventory');
			_populateQuestions('happiness', $scope.cat[action].value, '+', action);
			_populateQuestions(type, 1, '-', type);
			$scope.modal.type = type;
			$scope.modal.action = action;
		};

		$scope.confirmAnswer = function () {
			$scope.gameSetting.verifyAnswer = '';
			var incorrect = [];
			_.forEach($scope.modal.questions, function (question, idx) {
				if (_.has(question, 'answers')) {  // exact match
					if (question.answers.indexOf(question.a) === -1) {
						incorrect.push(idx + 1);
					}
				} else {  // regex
					var hasMatch = false;
					_.some(answerRegex, function (ans) {
						if (!_.isNull(question.a.match(ans))) {
							hasMatch = true;
							return;  // break out of _.some loop
						}
					});
					if (!hasMatch) {
						incorrect.push(1);
					}
				}
			});

			if (_.isEmpty(incorrect)) {
				if (response !== 'talkToPet') {
					$scope.closeModal(true);
				}
				var type, action;
				$scope.messages.push('');

				switch (response) {
					case 'useInventory':
						type = $scope.modal.type;
						action = $scope.modal.action;
						$scope.cat.inventory[type]--;
						$scope.cat.happiness.value += $scope.cat[action].value;
						$scope.messages.push(type + '--');
						$scope.messages.push('happiness += ' + $scope.cat[action].value);
						break;
					case 'addInventory':
						type = $scope.modal.type;
						if ($scope.cat.coins.value < $scope.cat[type].value) {
							$scope.messages.push('Not enough money :(');
							return;
						}

						$scope.cat.inventory[type]++;
						$scope.cat.coins.value -= $scope.cat[type].value;
						$scope.messages.push(type + '++');
						$scope.messages.push('coins -= ' + $scope.cat[type].value);
						break;
					case 'petCat':
						$scope.cat.happiness.value += $scope.cat.pet.value;
						$scope.gameSetting.petCycle = 5;
						$scope.messages.push('happiness += ' + $scope.cat.pet.value);
						break;
					case 'showerCat':
						$scope.cat.happiness.value -= $scope.cat.shower.value;
						$scope.messages.push('happiness -= ' + $scope.cat.shower.value);
						showerCycle = 5;
						_isGameOver();
						break;
					case 'talkToPet':
						try {
							window.eval($scope.modal.questions[0].a);  // jshint ignore:line
							$scope.closeModal(true);
							if ($scope.modal.questions[0].a.indexOf('console.log') === 0) {
								var msg = /\((.*)\)/;
								$scope.messages.push(msg.exec($scope.modal.questions[0].a)[1]);
							}
						} catch (e) {
							console.log(e);
							$scope.gameSetting.verifyAnswer = 'Verify your syntax';
						}
				}

			} else {
				$scope.gameSetting.verifyAnswer = 'Verify your answer for #' + incorrect.join(',');
			}
		};

		$scope.reset();
	}
]);