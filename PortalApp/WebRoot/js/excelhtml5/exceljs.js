(function($){
	$.fn.exceljs = function(options){
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options == 'string') {
			var fn = this[0][options];
			if($.isFunction(fn)){
				return fn.apply(this, otherArgs);
			}else{
				throw ("exceljs - No such method: " + options);
			}
		}
		return this.each(function() {
			var opts = {};
			var dom = this;  // 保存组件对象
			var context = this.getContext("2d");//2d绘图
			var defaults = {
				offset:0.5,//画线的偏移量，防止出现毛边
				xcols:26,//列数
				yrows:20,//行数
				strokeStyle:"#D0D7E5",//颜色
				lineWidth:1,//线条宽度
				interwidth:60,//左右间隔宽度
				interheight:22,//上线间隔高度
			};
			opts = $.extend(defaults,options);
			/*
			 * 初始化
			 */
			this.init = function(){
				dom.create();  
			};
			/* 
			 *创建 
			 */
			this.create = function(){
				context.strokeStyle = opts.strokeStyle;
				context.lineWidth = opts.lineWidth;
				//画横线
				for(var i=0;i<=opts.yrows;i++){
					var yaxis = (i*opts.interheight)+opts.offset;//y轴坐标
					var xaxis = (opts.xcols*opts.interwidth)+opts.offset;//x轴坐标
					context.moveTo(0,yaxis);
					context.lineTo(xaxis,yaxis);
					context.stroke();
				}
				//画竖线
				for(var i=0;i<=opts.xcols;i++){
					var yaxis = (opts.yrows*opts.interheight)+opts.offset;//y轴坐标
					var xaxis = (i*opts.interwidth)+opts.offset;//x轴坐标
					context.moveTo(xaxis,0);
					context.lineTo(xaxis,yaxis);
					context.stroke();
				}
			}
			//初始化坐标位置
			this.translate = function(para){
				var width = $(dom).attr("width");
				$(dom).attr("width",width);
				var x=0;
				var y=0;
				if(para!=null){
					x = para.x;
					y = para.y;
				}
				context.translate(x,y);
				//dom.create();
			}
			this.move = function(para){
				var isupdown = "1";//1代表上下移动，0代表左右移动
				
				context.translate(x,y);
				dom.create();
			}
			this.init();
		});
	}
})(jQuery);