(function($){
	$.fn.Zcell = function(options){
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options == 'string') {
			var fn = this[0][options];
			if($.isFunction(fn)){
				return fn.apply(this, otherArgs);
			}else{
				throw ("Zcell - No such method: " + options);
			}
		}
		return this.each(function() {
			var opts = {};
			var dom = this;  // 保存组件对象
			var defaults = {
				cellid:"cell",
				rows:50,
				cols:50,
			};
			opts = $.extend(defaults,options);
			this.init = function(){
				dom.creatCell();
			};
			//创建
			this.creatCell = function(){
				var cellheader = "<div id='"+opts.cellid+"-header'></div>";
				var headertable = "<table id='"+opts.cellid+"-header-table'></table>";
				var headertr = "<tr class='"+opts.cellid+"-header-tr'></tr>";
				var headertd = "";
				for(var i=0;i<=parseInt(opts.rows);i++){
					headertd += "<td></td>";
				}
				headertr.append(headertd);
				headertable.append(headertr);
				var cellnum = "<div id='"+opts.cellid+"-num'></div>";
				var celltext = "<div id='"+opts.cellid+"-text'></div>";
			};
			//根据编号生成A-Z
			this.getABC = function(i){
				var times = i/26;
				var index = i%26;
				var strABC = "";
				if(times>0){
					for(i=0;i<times;i++){
						strABC += "A";
					}
				}
				if(index!=0){
					strABC += String.fromCharCode(index+64);
				}
				return strABC;
			};
			this.init();
		});
	};
})(jQuery);