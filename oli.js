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
				ctrl.imageDirectory = "/images"
				//Scroll Magic
				var controller = new ScrollMagic.Controller();

				// var tween = TweenMax.to('#animation', 0.5, {
				// 	backgroundColor: 'rgb(255, 39, 46)',
				// 	scale: 7,
				// 	rotation: 360
				// });

				for(var i = 1; i<8; i++){
					var scene = new ScrollMagic.Scene({
						triggerElement: '#home-scene-'+i,
						offset: 330,
						duration: 3000,
						// triggerHook: 0,
						reverse: true	
					})
					.setPin('#home-scene-'+i)
					// .setTween(tween)
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

	oli.run(function($rootScope, $log){
		//This would be better as a component, but that will come later
		var musicVolume = 0.25;
		$rootScope.isPlaying = true;
		var homeMusic = new Howl({
			src: ['/music/Newbie Melody (Old Music).mp3'],
			volume: musicVolume,
			loop: true,
			html5: true,
			autoplay: true,
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
