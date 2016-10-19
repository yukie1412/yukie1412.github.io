var app = angular.module('gwcMills', ['ui.router', 'ui.bootstrap']);

app.controller('gwcMain', ['$scope',
	function($scope) {
		'use strict';

		$scope.classModule = '';
	}
]).filter({
    toHTML: ['$sce',
        function ($sce) {
        	'use strict';
        	
            return function (htmlCode) {
                return $sce.trustAsHtml(htmlCode);
            };
        }
    ]
});