console.log('scroll magic homepage start!');
var controller = new ScrollMagic.Controller();
for(var i = 1; i<8; i++){
	console.log('#home-scene-'+i)
	var scene = new ScrollMagic.Scene({
		offset: 100,
		duration: 400,
		triggerElement: '#home-scene-'+i
	})
	.setPin('#home-scene-'+i)
	.addTo();
}

// console.log('#home-scene-1')
// var scene = new ScrollMagic.Scene({
// 	offset: 100,
// 	duration: 400,
// 	triggerElement: '#home-scene-1'
// })
// .setPin('#home-scene-1')
// .addTo();

// console.log('#home-scene-2')
// var scene = new ScrollMagic.Scene({
// 	offset: 100,
// 	duration: 400,
// 	triggerElement: '#home-scene-2'
// })
// .setPin('#home-scene-2')
// .addTo();
