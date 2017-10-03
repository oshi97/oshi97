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
				// ctrl.imageDirectory = "/views/about/images"
			}
		})
		.when(baseUrl + "projects", {
			templateUrl: baseUrl + 'views/projects/projects.html',
			controllerAs: 'ctrl',
			controller: function($rootScope){
				var ctrl= this;
				$rootScope.pageTitle = ' - Projects';

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
		.when(baseUrl + "about/:what", {
			templateUrl: function(url){
				return baseUrl + 'views/about/' + url.what + "/" + url.what + '.html';
			},
			controllerAs: 'ctrl',
			controller: function($rootScope, $location){
				var ctrl=this;
				$rootScope.pageTitle = ' - About';
			}
		})
		.when(baseUrl + "projects/:which", {
			templateUrl: function(url){
				return baseUrl + 'views/projects/' + url.which + "/" + url.which + '.html';
			},
			controllerAs: 'ctrl',
			controller: function($rootScope){
				var ctrl=this;
				$rootScope.pageTitle = ' - Projects';
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
		var currLink = $('#current-link-box');
		$rootScope.$on("$routeChangeSuccess", function(event, next, current) {
			var dist,width;
			$(".main-nav-item").each(function(){
				if(window.location.href === this.href){
					dist = $(this).offset().left - currLink.offset().left - 3;
					width = parseInt($(this).css('width'))+6;
				}
			});
			if(!dist){
				return;
			}
			currLink.css('left',"+="+dist.toString());
			currLink.css('width',width.toString()+"px");
		});

	});
}(window.angular))
