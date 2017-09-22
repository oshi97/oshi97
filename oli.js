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
		.when(baseUrl + "piano", {
			templateUrl: baseUrl + 'views/piano/piano.html',
		})
		.when(baseUrl + "blog",{
			templateUrl: baseUrl + 'views/blog/blog.html',
		})
		.when(baseUrl + "games",{
			templateUrl: baseUrl + 'views/games/games.html',
		});
	})
}(window.angular))
