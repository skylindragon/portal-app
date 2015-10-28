$(function(){
	// 为文本框添加键盘事件，当用户按下回车键时，触发登录事件
	 document.onkeydown=function(event){
         var e = event || window.event || arguments.callee.caller.arguments[0];
         if(e && e.keyCode==13){ // enter 键
        	 $("#loginbtn").click();
         }
     }; 
     var username = $.cookie("username");
     if(username!==""&&username!=null){
    	 $("#username").val(username);
     }
     $("#checkCode").val("");
     //登录
     loginsystem();
     //验证验证码是否正确
     //checkyzm();
});
//登录
function loginsystem(){
	$("#loginbtn").click(function(){
		var username = $("#username").val();
		var password = $("#password").val();
		//var checkCode = $("#checkCode").val();
		var boo = true;
		/*if(checkCode===""){
			$("#checkCode").css("border","1px solid red");
			$("#ts").css("display","block");
			$("#ts").text("验证码不能为空");
			return;
		}
		if(checkCode.length===4){
			var senddata = 	{"yzm":checkCode};
			$.ajax({
				"url":"getYzmAction.do?method=checkyzm",
				data : {jsondata:$.toJSON(senddata)},
				dataType:"json",
				type:"GET",
				async : false,
				success:function(data){
					if(data.code==="-1"){
						$("#checkCode").css("border","1px solid red");
						$("#ts").css("display","block");
						$("#ts").text("验证码错误");
						reloadimg();
						boo = false;
					}
				}
			});
		}else{
			$("#checkCode").css("border","1px solid red");
			$("#ts").css("display","block");
			$("#ts").text("验证码位数不足");
			boo = false;
		}
		if(boo === false){
			return;
		}*/
		$.cookie("username",username);
		var sendMsg={"UserName":username,"UserPass":password,"DataSource":"portal_app"};
		$.ajax({
				"url":"login.do",
				data : {sendMsg:$.toJSON(sendMsg)},
				dataType:"json",
				type:"POST",
				success:function(data){
				if(data.RET_CODE=="0"){
					window.top.location = sys_ctx+"/main/main.jsp";
				}else{
					tipAlert("提示",data.RET_MSG,"确定",0);
				}
				}
		});
	});
}
//获取验证码
function reloadimg(){
	$("#CreateCheckCode").attr("src","getYzmAction.do?method=getyzm&nocache="+new Date().getTime());
}
//验证验证码是否正确
function checkyzm(){
	$("#checkCode").bind("keyup",function(){
		var yzm = $("#checkCode").val();
		if(yzm.length===4){
			var senddata = 	{"yzm":yzm};
			$.ajax({
				"url":"getYzmAction.do?method=checkyzm",
				data : {jsondata:$.toJSON(senddata)},
				dataType:"json",
				type:"GET",
				success:function(data){
					if(data.code!=="-1"){
						$("#cw").css("display","none");
						$("#zq").css("display","inline-block");
						$("#checkCode").css("border","1px solid #ABADB3");
						$("#ts").css("display","none");
					}else{
						$("#zq").css("display","none");
						$("#cw").css("display","inline-block");
					}
				}
			});
		}else{
			$("#zq").css("display","none");
			$("#cw").css("display","none");
		}
	})
}