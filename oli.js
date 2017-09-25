(function(angular){
	'use strict' //ECMA5 strict mode
	var baseUrl = '/';
	var oli = angular.module('Oli',['ngRoute']);
	oli.config(function($routeProvider, $locationProvider, $httpProvider){

		$locationProvider.html5Mode(true);


		$routeProvider
		.when(baseUrl, {
			templateUrl: baseUrl + 'homepage.html',
			controllerAs: 'ctrl',
			controller: function($rootScope){
				var ctrl = this;
				$rootScope.pageTitle = ' - Home';
			}
		})
		.when(baseUrl + "ramblings", {
			templateUrl: baseUrl + 'views/ramblings/ramblings.html',
		})
		.otherwise({ redirectTo : baseUrl});
	});
}(window.angular))
