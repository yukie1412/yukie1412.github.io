app.controller('opSummaryCtrl', [ '$scope',
	function(scope) {
		'use strict';
		scope.content = {
			basics: [
				{
					sign: '<span class="font-lg">+</span>',
					description: 'Same as the plus sign in math, it sums the two numbers: <code>var x = 4 + 2;</code> x is 6.<br />' +
					'You may also use it for strings, which joins them together: <code>var y = "a" + "b";</code> y is "ab".'
				},
				{
					sign: '<span class="font-lg">-</span>',
					description: 'Same as the minus sign in math, resultant is the difference between the two numbers: <code>var x = 4 - 2;</code> x is 2.'
				},
				{
					sign: '<span class="font-lg">*</span>',
					description: 'Same as the multiply sign in math, resultant is the product between the two numbers: <code>var x = 4 * 2;</code> x is 8.'
				},
				{
					sign: '<span class="font-lg">/</span>',
					description: 'Same as the divide sign in math, resultant is the quotient between the two numbers: <code>var x = 4 / 2;</code> x is 2.<br />' +
					'Please note: for JavaScript, <code>var x = 3 / 2;</code> will give you <code>1.5</code>, while for some other languages, it\'ll be <code>1</code>.'
				},
				{
					sign: '<span class="font-lg">%</span>',
					description: 'This is the modulo symbol, resultant is the remainder of a / b: <code>var x = 7 % 3;</code> x is 1, since 7 - 6 = 1, where 6 = 3 * 2.'
				}
			],
			one: [
				{
					sign: '<span class="font-lg">++</span>',
					description: 'immediate <em>before</em> or <em>after</em> a variable: <code>++x</code> or <code>x++</code>.<br />' +
					'The final result is <strong>one more</strong> than before. <br />' +
					'For example, if <code>var x = 1;</code>, then with <code>x++</code>, x will become 2 (one more than before).'
				},
				{
					sign: '<span class="font-lg">--</span>',
					description: 'immediate <em>before</em> or <em>after</em> a variable: <code>--x</code> or <code>x--</code>.<br />' +
					'The final result is <strong>one less</strong> than before. <br />' +
					'For example, if <code>var x = 1;</code>, then with <code>x--</code>, x will become 0 (one less than before).'
				}
			],
			equation: [
				{
					sign: '<span class="font-lg">+=</span>',
					description: 'add right-hand-side value to self. For example: <code> x += y;</code> is the same as <code>x + y</code>.<br />' +
					'So <code>x += 1;</code> is the same as <code>x++</code>, which is increment x by 1.'
				},
				{
					sign: '<span class="font-lg">-=</span>',
					description: 'subtract right-hand-side value from self. For example: <code> x -= y;</code> is the same as <code>x - y</code>.<br />' +
					'So <code>x -= 1;</code> is the same as <code>x--</code>, which is decrement x by 1.'
				},
				{
					sign: '<span class="font-lg">*=</span>',
					description: 'multiply right-hand-side value to self. For example: <code> x *= y;</code> is the same as <code>x * y</code>.'
				},
				{
					sign: '<span class="font-lg">/=</span>',
					description: 'divide right-hand-side value to self. For example: <code> x /= y;</code> is the same as <code>x / y</code>.'
				}
			]
		};
	}
]);