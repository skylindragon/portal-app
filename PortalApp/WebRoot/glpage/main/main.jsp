<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>个人小站</title>
<%@ include file="/common/js.jsp" %>
<%@ include file="/common/css.jsp" %>
	
<link rel="stylesheet" type="text/css" href="main.css">
<script type="text/javascript" src="main.js"></script>
</head>
<body>
<div id="main">
	<div id="leftdiv">
		<div id="lefttop">
			<div id="userphoto">
				<img src="${ctx}/images/userimg/user.jpg"></img>
			</div>
			<div id="usermsg">
				<div>
					<span>个人小站</span>
				</div>
				<div id="usernamediv">
					<span>admin</span>
				</div>
				<div>
					<span>2014-06-16 22:14:22</span>
				</div>
			</div>
		</div>
		<div id="lefttools">
			<input id="searchtext" type="text" onkeyup="value=value.replace(/[^a-zA-Z0-9]/g,'')" placeholder="拼音首字母搜索菜单" />
  			<img src="${ctx }/glpage/images/search.png" style=""></img>
		</div>
		<div id="leftmenu">
		</div>
	</div>
	<div id="rightdiv">
		<div id="righttop">
		</div>
		<div id="righttab">
			<div id="tabs"></div>
		</div>
	</div>
</div>
</body>
</html>