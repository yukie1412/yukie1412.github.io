app.constant('CONTENT_ROUTE', [
	{
		name: 'main',
		title: 'Girls Who Code',
		url: '/',
		views: {
			'@': {
				templateUrl: 'home.html'
			}
		}
	},
	{
		name: 'variables',
		url: '/variables',
		children: [
			{
				name: 'summary',
				url: '/summary',
				views: {
					'@': {
						templateUrl: 'variables/summary.html',
						controller: 'varSummaryCtrl'
					}
				}
			},
			{
				name: 'types',
				url: '/types',
				views: {
					'@': {
						templateUrl: 'variables/variable-types.html',
						controller: 'varTypeCtrl'
					}
				}
			}
		]
	},
	{
		name: 'operations',
		url: '/operations',
		children: [
			{
				name: 'summary',
				url: '/summary',
				views: {
					'@': {
						templateUrl: 'operations/summary.html',
						controller: 'opSummaryCtrl'
					}
				}
			},
			{
				name: 'symbols',
				url: '/symbol',
				views: {
					'@': {
						templateUrl: 'operations/symbols.html',
						controller: 'opSymbolCtrl'
					}
				}
			},
			{
				name: 'try',
				url: '/try',
				views: {
					'@': {
						templateUrl: 'operations/try.html',
						controller: 'opTryCtrl'
					}
				}
			}
		]
	},
	{
		name: 'game',
		url: '/game',
		views: {
			'@': {
				templateUrl: 'game/main-interface.html',
				controller: 'gameCtrl'
			}
		}
	}
]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'CONTENT_ROUTE',
	function (stateProvider, urlRouterProvider, locationProvider, CONTENT_ROUTE) {
		'use strict';

		function _childPath (pathObj, parent) {
			_.forEach(pathObj, function (path) {
				var stateName = parent + '.' + path.name;
				stateProvider.state(stateName, path);
				if (_.has(path, 'children')) {
					_childPath(path.children, stateName);
				}
			});
		}

		_.forEach(CONTENT_ROUTE, function (route) {
			stateProvider.state(route, route.name);
			_childPath(route.children, route.name);
		});

		urlRouterProvider.otherwise('404');    // 404 for all non-defined path pages
		locationProvider.html5Mode(true);      // removes /#/ from URL for browsers with HTML5 support
	}
]);