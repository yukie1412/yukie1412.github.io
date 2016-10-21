app.controller('varSummaryCtrl', [ '$scope',
	function(scope) {
		'use strict';

		scope.content = {
			variables: [
				{
					title: 'Name Tag',
					description: 'A name tag is a variable that stores a person\'s name.',
					img: 'lib/assets/nametag.png'
				},
				{
					title: 'Box',
					description: 'A box is a variable that stores a present.',
					img: 'lib/assets/box.jpeg'
				},
				{
					title: 'Lockers',
					description: 'A locker is a variable that stores personal belongings',
					img: 'lib/assets/lockers.jpg'
				}
			],
			types: [
				{
					title: 'String',
					description: 'String is a sequence of characters enclosed by quotation marks <code>"</code>.'
				},
				{
					title: 'Boolean',
					description: 'Boolean is either <code>true</code> (yes) or <code>false</code> (no).'
				},
				{
					title: 'Number',
					description: 'Number is either an <code>integer</code> or a <code>double</code>.<br />An integer is any whole number, i.e.: -1, 0, 1.<br />A double is any number with a decimal point, i.e.: 1.0, 0.9'
				}
			]
		};
	}
]);