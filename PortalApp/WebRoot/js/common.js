$(function(){
});
function addtabiframe(pic,name,url){
	$("#tabs").tabIframe("addtab",{"pic":pic,"name":name,"url":url});
}
$.extend($,{
	copy:function(obj){//对象复制
		return $.parseJSON($.toJSON(obj));
	}
});