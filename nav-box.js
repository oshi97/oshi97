var currLink = $('#current-link-box');
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
function createBox() {
	var width,left,height;
	$(".main-nav-item").each(function() {
		if(window.location.href.split('/')[3]===this.href.split('/')[3]){
			width = parseInt($(this).css('width'))+6;
			left = $(this).offset().left-3;
		}
	});
	//toString() not necessary but clearer this way
	currLink.css('width', width.toString()+"px");
	currLink.css('height',"54px");
	currLink.css('left', left);
	currLink.css('border','solid black');
}
$(window).on('load', createBox);
$(window).on('resize',function(){
	clearTimeout($.data(this, 'resizeTimer'));
	$.data(this, 'resizeTimer', setTimeout(function() {
		moveBox();
	}, 200));
});