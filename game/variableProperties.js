app.constant('VARIABLE_PROPERTIES', [
	{
		name: 'petName',
		text: 'name',
		formName: 'nameInput',
		type: 'string',
		description: 'Name of your pet'
	},
	{
		name: 'isFemale',
		text: 'gender',
		formName: 'genderInput',
		type: 'boolean',
		description: 'Is your cat a girl or a boy?'
	},
	{
		name: 'happiness',
		text: 'initial happiness',
		formName: 'happinessInput',
		type: 'integer',
		description: 'Initial happiness level of your pet. Must be an integer between 20 and 50.',
		max: 50,
		min: 20
	},
	{
		name: 'eat',
		text: 'food reward',
		formName: 'eatInput',
		type: 'integer',
		description: 'Amount of happiness your pet gains after eating. Must be an integer between 1 and 5.',
		min: 1,
		max: 5
	},
	{
		name: 'play',
		text: 'play reward',
		formName: 'playInput',
		type: 'integer',
		description: 'Amount of happiness your pet gains after playing. Must be an integer between 1 and 5.',
		min: 1,
		max: 5
	},
	{
		name: 'pet',
		text: 'pet reward',
		formName: 'petInput',
		type: 'integer',
		description: 'Amount of happiness your pet gains after being petted. Must be an integer between 1 and 3.',
		min: 1,
		max: 3
	},
	{
		name: 'shower',
		text: 'shower penalty',
		formName: 'showerInput',
		type: 'integer',
		description: 'Amount of happiness your pet loses after a shower. Must be an integer between 3 and 8.',
		min: 3,
		max: 8
	},
	{
		name: 'coins',
		text: 'money',
		formName: 'coinsInput',
		type: 'double',
		description: 'Amount of money you have to start the game. Must be a double between 20 and 50.',
		max: 50,
		min: 20
	},
	{
		name: 'food',
		text: 'food cost',
		formName: 'foodInput',
		type: 'number',
		restriction: 'double',
		description: 'Cost to feed your pet. Must be a double between 3 and 8.',
		min: 3,
		max: 8
	},
	{
		name: 'toy',
		text: 'toy cost',
		formName: 'toyInput',
		type: 'double',
		description: 'Cost to play with your pet. Must be a double between 3 and 8.',
		min: 3,
		max: 8
	}
]);