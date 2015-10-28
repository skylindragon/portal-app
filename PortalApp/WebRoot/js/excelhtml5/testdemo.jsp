<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'testdemo.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<%@ include file="/common/js.jsp" %>
   	<%@ include file="/common/css.jsp" %>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<script type="text/javascript">
	$(function(){
		setwh();
	//	drowtable();
		$("#myCanvas").exceljs();
	});
	function setwh(){
		var width = $("#main").width()-20;
		var height = $("#main").height()-20;
		$("#myCanvas").attr({"width":width+"px","height":height+"px"});
	}
	function drowtable(){
		var c=document.getElementById("myCanvas");
		var cxt=c.getContext("2d");
		cxt.strokeStyle = "#D0D7E5";
		cxt.lineWidth = 1;
		//cxt.moveTo(10,10);
		cxt.lineTo(150.5,50.5);
		cxt.lineTo(10.5,50.5);
		cxt.stroke();
	}
	
	</script>
  </head>
  
  <body>
	  <div id="main" style="position: absolute; bottom: 0px; right: 0px; left: 13px; top: 10px;">
	    <canvas id="myCanvas" width="1330" height="200" style="border: 1px solid #808080; position: absolute;">
		Your browser does not support the canvas element.
		</canvas>
	  </div>
  </body>
</html>
