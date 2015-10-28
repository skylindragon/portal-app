$.extend($,{
	copy:function(obj){//对象复制
		return $.parseJSON($.toJSON(obj));
	}
});