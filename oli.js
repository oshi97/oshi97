(function(angular){
	'use strict' //ECMA5 strict mode
	var baseUrl = '/';
	var oli = angular.module('Oli',['ngRoute']);
	oli.config(function($routeProvider, $locationProvider, $httpProvider){

		$locationProvider.html5Mode(true);

		$routeProvider
		.when(baseUrl, {
			templateUrl: 'views/homepage/homepage.html',
			controllerAs: 'ctrl',
			controller: function($rootScope, $log){
				$rootScope.pageTitle = ' - Home'
			}
		})
		.when(baseUrl + "about", {
			templateUrl: baseUrl + 'views/about/about.html',
			controllerAs: 'ctrl',
			controller: function($rootScope, $log){
				var ctrl = this;
				$rootScope.pageTitle = ' - About';
				ctrl.imageDirectory = "/views/about/images"
				ctrl.scenes = {
					1: ["hearthstone.png","gwent.png","witcher3.jpg","overwatch.png",
					"melee.jpg"],
					2: ["liszt.jpg","beethoven.jpg","rachmaninoff.jpg","langlang.jpg"],
					3: ["crew1.jpg","crew2.jpg","crew3.jpg","ginobili.jpg"],
					4: ["aol.png","yahoo.png","oath.png","angularjs.png","angular2.png",
						"jenkins.png","git.png","bitbucket.png","confluence.png","jira.png"],
					5: ["unity.png","webdev.png","aws.png","aws-ec2.png","godaddy.png","aws-route53.png"],
					6: ["uva.png","tjhsst.jpeg"]
				};
			}
		})
		.when(baseUrl + "mebot", {
			templateUrl: baseUrl + 'views/mebot/mebot.html',
			controllerAs: 'ctrl',
			controller: function($rootScope){
				var ctrl= this;
				$rootScope.pageTitle = ' - I\'m Crazy!';

			}
		})
		.when(baseUrl + "blog", {
			templateUrl: baseUrl + 'views/blog/blog.html',
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
		var musicVolume = 1.0
		$rootScope.isPlaying = false;
		var homeMusic = new Howl({
			src: ['/music/Newbie Melody (Old Music).mp3'],
			volume: musicVolume,
			loop: true,
			html5: true,
			autoplay: $rootScope.isPlaying,
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
