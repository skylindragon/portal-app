$(function(){
	setIframeHeight();
	$(window).resize(function(e){
		setIframeHeight();
	});
});
//设置iframe高度
function setIframeHeight(){
	var _height = $(".main").height()-$(".top").height()-$(".bottom").height();
	$(".iframetab").css("height",_height);
}