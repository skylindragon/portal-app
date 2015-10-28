(function($){
	$.fn.navigation = function(options){
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options == 'string') {
			var fn = this[0][options];
			if($.isFunction(fn)){
				return fn.apply(this, otherArgs);
			}else{
				throw ("navigation - No such method: " + options);
			}
		}
		return this.each(function() {
			var opts = {};
			var dom = this;  // 保存组件对象
			var defaults = {
					rows : [],
					ID:"ID",
					CAPTION:"CAPTION",
					URL:"URL",
					ORDER:"ORDER"
			};
			opts = $.extend(defaults,options);
			var navidiv = "";
			var xArray = [];
			var yArray = [];
			var noorderarray = [];
			this.init = function(){
				navidiv = $("<div id='navg' />");
				$(dom).append(navidiv);
				dom.setData(opts.rows);
				dom.windowresize();
				dom.binddragable();
			};
			this.setData = function(rows){
				$.each(rows,function(k,v){
					var order = v[opts.ORDER]||k;
					var cdiv = $("<div id='"+v[opts.ID]+"' class='dragdiv' draggable='true' drag-url='"+v[opts.URL]+"' drag-order='"+order+"'>" +
								"<div class='dragcaption'><span>"+v[opts.CAPTION]+"</span></div>" +
								"</div>");
					navidiv.append(cdiv);
				});
				dom.setposition();
			};
			this.setposition = function(){
				xArray = [];
				yArray = [];
				var width = $(".dragdiv").outerWidth(true);
				var height = $(".dragdiv").outerHeight(true);
				var allwidth = navidiv.outerWidth(true);
				var n = parseInt(allwidth/width);
				var m=-1;
				for(var i=0;i<opts.rows.length;i++){
					if(i%n===0){
						m++;
					}
					navidiv.find("[drag-order='"+i+"']").stop().animate({left:width*(i%n)+"px",top:height*m+"px"},150);
					var left = width*(i%n);
					if($.inArray(left,xArray)===-1){
						xArray.push(left);
					}
					var top = height*m;
					if($.inArray(top,yArray)===-1){
						yArray.push(top);
					}
				}
				console.info(xArray);
				console.info(yArray);
			};
			this.windowresize = function(){
				$(window).resize(function() {
					dom.setposition();
				});
			};
			this.binddragable = function(){
				var dragdiv = $(".dragdiv");
				var width = $(".dragdiv").outerWidth(true);
				var height = $(".dragdiv").outerHeight(true);
				$.each(dragdiv,function(k,drag){
					drag = $(drag);
					var startx = 0;
					var starty = 0;
					var _x = 0;
					var _y = 0;
					var newx = 0;
					var newy = 0;
					var boo = true;
					drag.mousedown(function(e){  
						$(this).css({"cursor":"move","z-index":"1"});//改变鼠标指针的形状  
						startx = drag.css("left").replace("px","");
						starty = drag.css("top").replace("px","");
						var offset = drag.position();//DIV在页面的位置  
						var x = e.pageX - offset.left;//获得鼠标指针离DIV元素左边界的距离  
						var y = e.pageY - offset.top;//获得鼠标指针离DIV元素上边界的距离  
						$(document).bind("mousemove",function(ev){//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件  
							drag.stop();//加上这个之后  
							_x = (ev.pageX - x);//获得X轴方向移动的值  
							_y = (ev.pageY - y);//获得Y轴方向移动的值  
							drag.animate({left:_x+"px",top:_y+"px"},0); 
							/*if((_x-startx<-(width/2)||_y-starty<-(height/2))&&boo===true){//改变移动方向，重置移动元素数组
								noorderarray = [];
								boo = false;
							}
							if((_x-startx>=(width/2)||_y-starty>=(height/2))&&boo===false){
								noorderarray = [];
								boo = true;
							}*/
							var obj = dom.getOrder({x:_x,y:_y});
							var order = obj.n;
							console.info(order);
							newx = obj.left;
							newy = obj.top;
							if($.inArray(drag.attr("drag-order"),noorderarray)===-1){
								noorderarray.push(drag.attr("drag-order"));
							}
							dom.setNewPositon({"order":order,"noorder":drag.attr("drag-order"),"noorderarray":noorderarray});
						});  
					});  
					drag.mouseup(function() {  
						drag.css({"cursor":"pointer","z-index":"0"});  
						$(document).unbind("mousemove"); 
						noorderarray = [];
						var obj = dom.getOrder({x:_x,y:_y});
						var order = obj.n;
						if(order===0){
							drag.stop().animate({left:newx+"px",top:newy+"px"},300).attr("drag-order",order);
						}else{
							if(order>opts.rows.length-1&&opts.rows.length>1){
								order = opts.rows.length-1;
								var forder = opts.rows.length-2;
								var lleft = parseInt(navidiv.find("[drag-order='"+forder+"']").css("left").replace("px",""));
								var ltop = parseInt(navidiv.find("[drag-order='"+forder+"']").css("top").replace("px",""));
								var allwidth = navidiv.outerWidth(true);
								var n = parseInt(allwidth/$(".dragdiv").outerWidth(true));
								if(lleft+$(".dragdiv").outerWidth(true)>$(".dragdiv").outerWidth(true)*n){
									newx = 0;
									newy = ltop+$(".dragdiv").outerHeight(true);
								}else{
									newx = lleft+$(".dragdiv").outerWidth(true);
									newy = ltop;
								}
								drag.stop().animate({left:newx+"px",top:newy+"px"},300).attr("drag-order",order);
							}else{
								drag.stop().animate({left:newx+"px",top:newy+"px"},300).attr("drag-order",order);
							}
							$.each(opts.rows.length,function(a,b){
								if(b[opts.ID]===drag.attr("id")){
									b[opts.ORDER] = order;
									return false;
								}
							});
						}
						dom.setposition();
					});
				});
			};
			this.getOrder = function(para){
				var dragdivwidth = $(".dragdiv").outerWidth(true);
				var dragdivheight = $(".dragdiv").outerHeight(true);
				var _x = 0;
				var _y = 0;
				if(para.x>0){
					_x = para.x+dragdivwidth;
				}
				if(para.y>0){
					_y = para.y+dragdivheight;
				}
				var rx = 0;
				var cy = 0;
				var left = 0;
				var top = 0;
				for(var i=0;i<xArray.length;i++){
					if(i!==0&&i!==xArray.length-1&&((_x>xArray[i]+dragdivwidth/2&&_x<xArray[i+1]+dragdivwidth/2)||(_x-dragdivwidth<=xArray[i]+dragdivwidth/2&&_x-dragdivwidth>=xArray[i-1]+dragdivwidth/2))){
						rx = i;
						left = xArray[i];
						break;
					}
					if((i===xArray.length-1&&_x>xArray[i]+dragdivwidth/2)||(i===0&&_x-dragdivwidth<=xArray[i]+dragdivwidth/2)){
						rx = i;
						left = xArray[i];
						break;
					}
				}
				for(var i=0;i<yArray.length;i++){
					if(i!==0&&i!==yArray.length-1&&((_y>yArray[i]+dragdivheight/2&&_y<yArray[i+1]+dragdivheight/2)||(_y-dragdivheight<=yArray[i]+dragdivheight/2&&_y-dragdivheight>=yArray[i-1]+dragdivheight/2))){
						cy = i;
						top = yArray[i];
						break;
					}
					if((i===yArray.length-1&&_y>yArray[i]+dragdivheight/2)||(i===0&&_y-dragdivheight<=yArray[i]+dragdivheight/2)){
						cy = i;
						top = yArray[i];
						break;
					}
				}
				var allwidth = navidiv.outerWidth(true);
				var n = parseInt(allwidth/dragdivwidth);
				var obj = {};
				obj.n = parseInt(n*cy+rx);
				obj.left = left;
				obj.top = top;
				return obj;
			};
			this.setNewPositon = function(para){
				var order = parseInt(para.order);
				var noorder = parseInt(para.noorder);
				if(order===noorder){
					return;
				}
				var dragdivwidth = $(".dragdiv").outerWidth(true);
				var dragdivheight = $(".dragdiv").outerHeight(true);
				var allwidth = navidiv.outerWidth(true);
				var n = parseInt(allwidth/dragdivwidth);
				allwidth = n*dragdivwidth;
				var alldoms = navidiv.find(".dragdiv[drag-order!='"+noorder+"']");
				navidiv.find(".dragdiv[drag-order='"+noorder+"']").attr("drag-order",order);
				$.each(alldoms,function(k,v){
					if(parseInt($(v).attr("drag-order"))<=order&&parseInt($(v).attr("drag-order"))>noorder&&$.inArray($(v).attr("drag-order"),noorderarray)===-1){
						var left = parseInt($(v).css("left").replace("px",""));
						var top = parseInt($(v).css("top").replace("px",""));
						if(left-dragdivwidth>=0){
							$(v).stop().animate({left:left-dragdivwidth+"px",top:top+"px"},300);
						}else{
							$(v).stop().animate({left:(n-1)*dragdivwidth+"px",top:top-dragdivheight+"px"},300);
						}
						noorderarray.push($(v).attr("drag-order"));
						console.info(noorderarray);
						$(v).attr("drag-order",parseInt($(v).attr("drag-order"))-1);
						$.each(opts.rows.length,function(a,b){
							if(b[opts.ID]===$(v).attr("id")){
								b[opts.ORDER] = parseInt($(v).attr("drag-order"))-1;
								return false;
							}
						});
					}
					if(parseInt($(v).attr("drag-order"))>=order&&parseInt($(v).attr("drag-order"))<noorder&&$.inArray($(v).attr("drag-order"),noorderarray)===-1){
						var left = parseInt($(v).css("left").replace("px",""));
						var top = parseInt($(v).css("top").replace("px",""));
						if(left+dragdivwidth>=allwidth){
							$(v).stop().animate({left:"0px",top:top+dragdivheight+"px"},300);
						}else{
							$(v).stop().animate({left:left+dragdivwidth+"px",top:top+"px"},300);
						}
						noorderarray.push($(v).attr("drag-order"));
						console.info("============");
						console.info(noorderarray);
						$(v).attr("drag-order",parseInt($(v).attr("drag-order"))+1);
						//console.info($(v).attr("drag-order"));
						$.each(opts.rows.length,function(a,b){
							if(b[opts.ID]===$(v).attr("id")){
								b[opts.ORDER] = parseInt($(v).attr("drag-order"))+1;
								return false;
							}
						});
					}
				});
				if($.inArray(noorder+"",noorderarray)!==-1){
					noorderarray.splice($.inArray(noorder+"",noorderarray),1);
				}
				if($.inArray(order+"",noorderarray)===-1){
					noorderarray.push(order+"");
				}
			};
			this.init();
		});
	};
})(jQuery);