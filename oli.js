(function(angular){
	'use strict' //ECMA5 strict mode
	var baseUrl = '/';
	var oli = angular.module('Oli',['ngRoute']);
	oli.config(function($routeProvider, $locationProvider, $httpProvider){

		$locationProvider.html5Mode(true);


		$routeProvider.when(baseUrl, {
			templateUrl: baseUrl + 'components/homepage.html',
			controllerAs: 'ctrl',
			controller: function($rootScope){
				var ctrl = this;
				$rootScope.pageTitle = ' - Home';
			}
		});
	})
}(window.angular))