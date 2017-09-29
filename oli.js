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
			controller: function($rootScope, $log){
				var ctrl = this;
				$rootScope.pageTitle = ' - Home';
				ctrl.imageDirectory = "/images"

			}
		})
		.when(baseUrl + "ramblings", {
			templateUrl: baseUrl + 'views/ramblings/ramblings.html',
			controllerAs: 'ctrl',
			controller: function($rootScope){
				var ctrl= this;
				$rootScope.pageTitle = ' - I\'m Crazy!';

			}
		})
		.otherwise({ 
			redirectTo : baseUrl
		});
	});

	oli.run(function($rootScope, $log){
		//This would be better as a component, but that will come later
		var musicVolume = 0.8;
		$rootScope.isPlaying = false;
		var homeMusic = new Howl({
			src: ['/music/Newbie Melody (Old Music).mp3'],
			volume: musicVolume,
			loop: true,
			html5: true,
			autoplay: false,
		});

		$rootScope.pauseMusic = function(){
			if(homeMusic.playing()){
				// homeMusic.once('fade', homeMusic.pause());
				// the above should work but cuts off nastily, probably some bug
				homeMusic.fade(musicVolume,0.0,0.5);
				window.setTimeout(function(){homeMusic.pause();},300);
				$rootScope.isPlaying = false
			}
		};

		$rootScope.playMusic = function(){
			if(!homeMusic.playing()){
				homeMusic.once('fade', homeMusic.play());
				homeMusic.fade(0.0,musicVolume,0.5);
				// homeMusic.play();
				$rootScope.isPlaying = true;
			}
		};
	});
}(window.angular))
