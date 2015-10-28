$(function(){
	querymenulistdata();//请求菜单数据
	creattabiframe();//创建tab页
	$("#searchtext").bind("result",function(e,para){
		addtabiframe("blank.png",para.f_mc,sys_ctx+"/"+para.f_url);
		$("#searchtext").val("");
	});
});
//请求菜单数据
function querymenulistdata(){
	$.ajax({
		"url":sys_ctx+"/getMenuAction.do?method=getMenulist",
		dataType:"json",
		type:"post",
		success:function(data){
			creatleftmenu(data);//创建菜单
			autocomplete($.copy(data.childrenmenu));
		}
	});
}
//创建菜单
function creatleftmenu(data){
	var menu = data.menu;
	var childrenmenu = data.childrenmenu;
	var allmenus = $.copy(menu);
	$.each(childrenmenu,function(k,v){
		allmenus.push(v);
	});
	$("#leftmenu").leftMenu({
		idFiled:"f_bh",//id字段
		captioinField:"f_mc",//名称字段
		parentField:"f_parentid",//父节点字段
		iconField:"f_img",//图标字段
		root:"#ROOT",
		isshowone:false,
		iconUrl:sys_ctx+"/js/myjs/leftmenu/images/",//图片存放路径
		onClick:function(data){
			var f_mc = data.f_mc;
			var f_url = data.f_url;
			addtabiframe("blank.png",f_mc,sys_ctx+"/"+f_url);
		}
	});
	$("#leftmenu").leftMenu("create",{"rows":allmenus});
}
//自动查询
function autocomplete(itemmenu){
	var stockInfoJson = itemmenu;
	$("#searchtext").autocomplete(stockInfoJson, {
		minChars: 1,
		matchCase:false,//不区分大小写
		autoFill: false,
		max: 10,
		formatItem: function(row, i, max,term) {
			var v = $("#searchtext").val();		
			return  row.f_mc;
			if(row.F_pinyin.indexOf(v) == 0 || row.F_char.indexOf(v)==0){
				return  row.f_mc;
			}
			if(row.F_pinyin.indexOf(v) !== -1 || row.F_char.indexOf(v)!==-1){
				return  row.f_mc;
			}
			else{
				return false;
			}
		},
		formatMatch: function(row, i, max) {
			return row.f_mc;
		},
		formatResult: function(row) {
			return row.f_mc;
		},
		reasultSearch:function(row,v)//本场数据自定义查询语法 注意这是我自己新加的事件
		{
			//自定义在code或spell中匹配
			if(row.data.F_pinyin.indexOf(v) == 0 || row.data.F_char.indexOf(v) == 0){
				return row;
			}
			if(row.data.F_pinyin.indexOf(v) !== -1 || row.data.F_char.indexOf(v) !== -1){
				return row;
			}
			else{
				return false;			
			}
		}
	});
}
//创建tab页
function creattabiframe(){
	$("#tabs").tabIframe({
		defaultname		:	"欢迎页面",
		defaultpic		:	"blank.png",
		defaultid		:	"welcome",
		defaulturl		:	sys_ctx+"/glpage/main/welcome.jsp",
		picurl			:	sys_ctx+"/images/tabsicon/",//图标存放路径
		closepic		:	"close.png",//关闭按钮图标
		isallclose		:	true,//是否显示关闭按钮
	});
}