app.constant('INSTRUCTIONS', [
	{
		style: 'top: 0; left: 70px;',
		rules: [
			"This is the help button. It'll walk through all the game rules.",
			"You may press the 'x' on the top-right-corner to stop it anytime.",
			"Press the 'Next' button to proceed to the next rule."
		]
	},
	{
		style: 'top: 50px; left: 40%;',
		rules: [
			"This is a countdown timer.",
			"<code>happiness--</code> everytime it becomes 0.",
			"<code>coins += 2</code> everytime it becomes 0."
		]
	},
	{
		style: 'top: 80px; right: 150px;',
		rules: [
			"This is your pet's current happiness level.",
			"You will lose when happiness level becomes 0."
		]
	},
	{
		style: 'top: 80px; right: 10px;',
		rules: [
			"This is your money.",
			"You'll need it to buy inventories for your pet."
		]
	},
	{
		style: 'top: 180px; left: 120px;',
		rules: [
			"This is your Inventory: Food & Toy",
			"To start-off, you are given 1 food & 1 toy for free!",
			"Click on the item to add to your inventory."
		]
	},
	// {
	// 	style: 'top: 360px; left: 80px;',
	// 	rules: [
	// 		"This is the shop.",
	// 		"You can buy food & toy here.",
	// 		"Make sure you have enough money."
	// 	]
	// },
	{
		style: 'top: 250px; right: 90px;',
		rules: [
			"These are the actions you can do with your pet.",
			"It will change the happiness of your pet.",
			"Cilck on the item to interact with your pet.",
			"Shower is automatically done every 5 cycles.",
			"You can only pet your cat once every 5 cycles."
		]
	},
	{
		style: 'top: 250px; left: 30%;',
		rules: [
			"Your pet is already at the playground.",
			"Click 'Next' to start the game!",
			"Remember actions only take effect when you correctly answered the question!"
		]
	}
]);