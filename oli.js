(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

var trackOutboundLink = function(url) {
   ga('send', 'event', 'outbound', 'click', url, {
     'transport': 'beacon',
     'hitCallback': function(){document.location = url;}
   });
}

ga('create','UA-93236516-3', 'auto');
ga('send', 'pageview');

function sendGAPageChange(url) {
	ga('set', 'page', url);
	ga('send', 'pageview');
}

(function(angular){
	'use strict' //ECMA5 strict mode
	var baseUrl = '/';

	String.prototype.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}

	var oli = angular.module('Oli',['ngRoute']);
	oli.config(function($routeProvider, $locationProvider, $httpProvider){

		$locationProvider.html5Mode(true);

		$routeProvider
		.when(baseUrl, {
			templateUrl: 'views/homepage/homepage.html',
			controllerAs: 'ctrl',
			controller: function($rootScope, $log){
				sendGAPageChange(baseUrl);

				var ctrl = this;
				$rootScope.pageTitle = ' - Home';
				ctrl.pageClass = "appear";
			}
		})
		.when(baseUrl + "about", {
			templateUrl: baseUrl + 'views/about/about.html',
			controllerAs: 'ctrl',
			controller: function($rootScope, $log){
				sendGAPageChange(baseUrl + "about");

				var ctrl = this;
				$rootScope.pageTitle = ' - About';
				ctrl.pageClass = "appear";
				// ctrl.imageDirectory = "/views/about/images"
			}
		})
		.when(baseUrl + "projects", {
			templateUrl: baseUrl + 'views/projects/projects.html',
			controllerAs: 'ctrl',
			controller: function($rootScope){
				sendGAPageChange(baseUrl + "projects");

				var ctrl= this;
				$rootScope.pageTitle = ' - Projects';
				ctrl.pageClass = "appear";

			}
		})
		.when(baseUrl + "blog", {
			templateUrl: baseUrl + 'views/blog/blog.html',
			controllerAs: 'ctrl',
			controller: function($rootScope){
				sendGAPageChange(baseUrl + "blog");

				var ctrl= this;
				$rootScope.pageTitle = ' - I\'m Crazy!';
				ctrl.pageClass = "appear";

			}
		})
		.when(baseUrl + "about/:what", {
			templateUrl: function(url){
				sendGAPageChange(baseUrl + 'views/about/' + url.what + "/" + url.what + '.html');
				return baseUrl + 'views/about/' + url.what + "/" + url.what + '.html';
			},
			controllerAs: 'ctrl',
			controller: function($rootScope, $routeParams){
				var ctrl=this;
				$rootScope.pageTitle = ' - ' + $routeParams.what.capitalize();
				ctrl.pageClass = "appear";
			}
		})
		.when(baseUrl + "projects/:which", {
			templateUrl: function(url){
				sendGAPageChange(baseUrl + 'views/projects/' + url.which + "/" + url.which + '.html');
				return baseUrl + 'views/projects/' + url.which + "/" + url.which + '.html';
			},
			controllerAs: 'ctrl',
			controller: function($rootScope, $routeParams){
				var ctrl=this;
				$rootScope.pageTitle = ' - ' + $routeParams.which;
				ctrl.pageClass = "appear";
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
		var loadedHowler = false;
		var homeMusic;

		$rootScope.toggleMusic = function(){
			if(!loadedHowler){
				$rootScope.isPlaying = true;
				$.getScript("/dependencies/howlerjs/howler.core.min.js", function(){
					loadedHowler = true;
					homeMusic = new Howl({
						src: ['/music/Newbie Melody (Old Music).mp3'],
						volume: musicVolume,
						loop: true,
						html5: true,
						autoplay: true
					});
				});
				return;
			}
			if($rootScope.isPlaying){
				// homeMusic.once('fade', homeMusic.pause());
				// the above should work but cuts off nastily, probably some bug
				$rootScope.isPlaying = false
				homeMusic.fade(musicVolume,0.0,0.4);
				window.setTimeout(function(){homeMusic.pause();},300);

			}
			else {
				$rootScope.isPlaying = true;
				homeMusic.once('fade', homeMusic.play());
				homeMusic.fade(0.0,musicVolume,0.4);
				// homeMusic.play();
			}
		}

		function moveBox(event, next, current) {
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
		}

		var currLink = $('#current-link-box');
		$rootScope.$on("$routeChangeSuccess", moveBox);

	});
}(window.angular))
