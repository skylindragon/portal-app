<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>光大国际</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
   	<%@ include file="/common/js.jsp" %>
   	<%@ include file="/common/css.jsp" %>
	<link rel="stylesheet" type="text/css" href="${ctx }/login/css/login.css">
	<script type="text/javascript" src="${ctx }/login/js/login.js"></script>
	<style type="text/css">
	</style>
	<script type="text/javascript">
	</script>
  </head>
  
  <body>
    <div id="main">
    	<div id="maindiv">
    		<div id="mainlogin">
    			<div id="mainhead">
    				<%-- <img src="${ctx }/images/logo2.png" width="72px" height="63px" style="margin-left: 36px; margin-top: 0px;"> --%>
    				<!-- <div class="mlogint mlogintext"><span>光大国际</span></div> -->
    				<div class="mlogint mlogintext1"><span>光大环保能源（寿光）有限公司</span></div>
    			</div>
    			<div id="ts" style="display:none">用户名或者密码错误</div>
    			<div id="mainmiddle">
    			<form action="loginAction.do?method=dologin" name="login" method="post" enctype="multipart/form-data">
    				<div class="un uname">
    					<div class="ico-uid"></div>
    					<input id="username" class="uinput" type="text" placeholder="请输入用户名" name="username">
    				</div>
    				<div class="un upassword">
    					<div class="ico-uid-password"></div>
    					<input id="password" class="uinput" type="password" placeholder="请输入密码" name="password">
    				</div>
    				<div class="dltools">
    					<div id="autologin">
    						<input type="checkbox"></input><span style="position: absolute; width: 300px; top: 1px;">下次自动登录</span>
    					</div>
    					<div id="passzc">
    						<a id="getpassword" href="javascript:void(0)">忘记密码</a>
    						<a id="zhuce" href="javascript:void(0)">注册账号</a>
    					</div>
    				</div>
    				<div class="ubutton">
    					<input id="loginbtn" type="button" class="subbutton" value="登 录">
    				</div>
    			</form>
    			</div>
    		</div>
    	</div>
    	<div id="footer">         Copyright ? 2014-2015 www.xxxx.com 版权所有
    	</div>
    </div>
  </body>
</html>
