$(function(){
	setIframeHeight();
	$(window).resize(function(e){
		setIframeHeight();
	});
	//退出
	logout();
});
//设置iframe高度
function setIframeHeight(){
	var _height = $(".main").height()-$(".top").height()-$(".bottom").height();
	$(".iframetab").css("height",_height);
}
//退出
function logout(){
	$("#logout").bind("click",function(){
		tipConfirm("提示","确定要退出吗？","确定","取消",function(value){
			if(value){
				var sendMsg={};
				$.ajax({
					"url":sys_ctx+"/logout.do",
					data : {sendMsg:$.toJSON(sendMsg)},
					dataType:"json",
					type:"POST",
					success:function(data){
						if(data.RET_CODE=="0"){
							window.top.location = sys_ctx+"/";
						}else{
							tipAlert("提示",data.RET_MSG,"确定",0);
						}
					}
				});
			}
		});
	});
}