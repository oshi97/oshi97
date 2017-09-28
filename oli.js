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
				//Scroll Magic
				var controller = new ScrollMagic.Controller();

				for(var i = 1; i<8; i++){
					console.log('#home-scene-'+i)
					var scene = new ScrollMagic.Scene({
						triggerElement: '#home-scene-'+i,
						offset: 50,
						duration: 1000,
						triggerHook: 0,
						reverse: true
					})
					.setPin('#home-scene-'+i)
					.addTo(controller);
				}

			}
		})
		.when(baseUrl + "ramblings", {
			templateUrl: baseUrl + 'views/ramblings/ramblings.html',
			controllerAs: 'ctrl',
			controller: function($rootScope){
				var ctrl= this;
				$rootScope.pageTitle = ' - I\'m Crazy!';

				var controller = new ScrollMagic.Controller();

				var scene1 = new ScrollMagic.Scene({
					triggerElement: "#pinned-trigger1",
					duration: $(window).height() - 100, 
					triggerHook: 0, 
					reverse: true 
				})
				.setPin("#pinned-element1") 
				.addTo(controller);


				var scene2 = new ScrollMagic.Scene({
					triggerElement: "#pinned-trigger2",
					duration: 1500
				}).setPin("#pinned-element2")
				.addTo(controller);
			}
		})
		.otherwise({ 
			redirectTo : baseUrl
		});
	});
}(window.angular))
