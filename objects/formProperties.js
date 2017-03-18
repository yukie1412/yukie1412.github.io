app.constant('FORM_PROPERTIES', [
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
		name: 'age',
		text: 'age',
		formName: 'ageInput',
		type: 'integer',
		description: 'How old is your pet?'
	},
	{
		name: 'weight',
		text: 'weight',
		formName: 'weightInput',
		type: 'double',
		description: 'How much does your pet weigh?'
	},
	{
		name: 'characteristic',
		text: 'characteristic',
		formName: 'characteristicInput',
		type: 'array',
		description: 'What are the characteristics of your pet?'
	},
	{
		name: 'pet',
		text: 'pet object',
		formName: 'petInput',
		type: 'object',
		description: 'Create a pet object with properties of "name", "gender", "age", "weight", & "characteristic".'
	}
]);