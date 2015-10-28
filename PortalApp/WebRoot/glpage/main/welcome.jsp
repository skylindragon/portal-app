<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<%@ include file="/common/js.jsp" %>
<%@ include file="/common/css.jsp" %>
<link rel="stylesheet" type="text/css" href="welcome.css">
<script type="text/javascript">
$(function(){
	var rows = [];
	var obj = {"ID":"0001","CAPTION":"个人小站","URL":"http://www.baidu.com","ORDER":"0"};
	rows.push(obj);
	var obj = {"ID":"0002","CAPTION":"个人小站","URL":"http://www.baidu.com","ORDER":"1"};
	rows.push(obj);
	var obj = {"ID":"0003","CAPTION":"个人小站","URL":"http://www.baidu.com","ORDER":"2"};
	rows.push(obj);
	var obj = {"ID":"0004","CAPTION":"个人小站","URL":"http://www.baidu.com","ORDER":"3"};
	rows.push(obj);
	var obj = {"ID":"0005","CAPTION":"个人小站","URL":"http://www.baidu.com","ORDER":"4"};
	rows.push(obj);
	var obj = {"ID":"0006","CAPTION":"个人小站","URL":"http://www.baidu.com","ORDER":"5"};
	rows.push(obj);
	var obj = {"ID":"0007","CAPTION":"个人小站","URL":"http://www.baidu.com","ORDER":"6"};
	rows.push(obj);
	var obj = {"ID":"0008","CAPTION":"个人小站","URL":"http://www.baidu.com","ORDER":"7"};
	rows.push(obj);
	var obj = {"ID":"0009","CAPTION":"个人小站","URL":"http://www.baidu.com","ORDER":"8"};
	rows.push(obj);
	var obj = {"ID":"0010","CAPTION":"个人小站","URL":"http://www.baidu.com","ORDER":"9"};
	rows.push(obj);
	var obj = {"ID":"0011","CAPTION":"个人小站","URL":"http://www.baidu.com","ORDER":"10"};
	rows.push(obj);
	var obj = {"ID":"0012","CAPTION":"个人小站","URL":"http://www.baidu.com","ORDER":"11"};
	rows.push(obj);
	var obj = {"ID":"0013","CAPTION":"个人小站","URL":"http://www.baidu.com","ORDER":"12"};
	rows.push(obj);
	var obj = {"ID":"0014","CAPTION":"个人小站","URL":"http://www.baidu.com","ORDER":"13"};
	rows.push(obj);
	var obj = {"ID":"0015","CAPTION":"个人小站","URL":"http://www.baidu.com","ORDER":"14"};
	rows.push(obj);
	var obj = {"ID":"0016","CAPTION":"个人小站","URL":"http://www.baidu.com","ORDER":"15"};
	rows.push(obj);
	$("#navigation").navigation({
		rows : rows,
		ID:"ID",
		CAPTION:"CAPTION",
		URL:"URL",
		ORDER:"ORDER"
	});
});
</script>
</head>
<body>
	<div id="navigation"></div>
</body>
</html>