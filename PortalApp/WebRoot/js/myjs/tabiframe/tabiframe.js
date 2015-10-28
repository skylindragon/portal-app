(function($){
	$.fn.tabIframe = function(options){
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options == 'string') {
			var fn = this[0][options];
			if($.isFunction(fn)){
				return fn.apply(this, otherArgs);
			}else{
				throw ("tabIframe - No such method: " + options);
			}
		}
		return this.each(function() {
			var opts = {};
			var dom = this;  // 保存组件对象
			var maxid = 1;
			var defaults = {
					defaultname		:	"欢迎页面",
					defaultpic		:	"blank.png",
					defaultid		:	"welcome",
					defaulturl		:	"/success.jsp",
					picurl			:	"",//图标存放路径
					closepic		:	"close.png",//关闭按钮图标
					isallclose		:	true,//是否显示关闭按钮
					maxindexname	:	"my",
			};
			opts = $.extend(defaults,options);
			this.init = function(){
				dom.create();  // 请求数据
				//$(document).ready(function(){
			    	$(window).resize(function() {
			    		var height = $(dom).height()-$("#tabsul").height()-2;
						$(dom).find(".tabiframeselected").css({"height":height,"top":$("#tabsul").height()+3});
						var lidomwidths = 0;
						$.each($("#tabsul").find(".tablidefault"),function(k,v){
							lidomwidths+=$(v).outerWidth(true);
						});
						var tabsulwidth = $(dom).outerWidth(true)-$(".lr").outerWidth(true);
						if(lidomwidths>tabsulwidth){
							$("#tabsul").css({"width":lidomwidths+"px"});
							$("#tabsul").stop().animate({left:"0px"},300);
							$(".leftright").show();
						}else if(lidomwidths<tabsulwidth){
							$("#tabsul").css({"width":"auto"});
							$("#tabsul").stop().animate({left:"0px"},300);
							$(".leftright").hide();
						}
			    	});
			   // });
			};
			//创建
			this.create = function(){
				$(dom).empty();
				var uldom = $("<ul id='tabsul' />");
				var leftrightdiv = $("<div class='lr'><div class='leftright'>" +
								     "<div id='toleft' title='左翻'></div>" +
								     "<div id='toright' title='右翻'></div>" +
								     "</div></div>");
				$(dom).append(uldom).append(leftrightdiv);
				dom.addtab({"name":opts.defaultname,"pic":opts.defaultpic,"id":opts.defaultid,"url":opts.defaulturl,"isclose":false});
				$("#closetab").live("click",function(){
					dom.deletetab({doms:this});
				});
				$("[class='divtext'],[class='lidivimg']").live("click",function(){
					dom.selecttab({doms:this});
				});
				dom.bindleftright();
			};
			//新增tab
			this.addtab = function(para){
				para = $.extend(para,opts);
				var name = para.name;//tab显示名称
				var pic = para.pic;//图片图标
				var url = para.url;//对应的iframe页面url
				var id = para.id;//tabid
				var urls = $(dom).find(".tabifrmedefaule");
				var boo = true;
				$.each(urls,function(k,v){
					var ifurl = $(v).attr("src");
					if(ifurl.indexOf(url)!==-1){
						var ifid = $(v).attr("id");
						var doms = $("#tabsul").find(".tablidefault[index='"+ifid+"']").find(".divtext");
						dom.selecttab({doms:doms});
						boo = false;
						return false;
					}
				});
				if(boo===false){
					return;
				}
				var isclose = para.isclose;//是否显示关闭按钮
				$(dom).find(".tableliselected").removeClass("tableliselected");
				$(dom).find(".tabiframeselected").removeClass("tabiframeselected");
				var lidom = $("<li class='tablidefault tableliselected' />");
				//创建标志图片
				var lidivimg = $("<div class='lidivimg' />");
				var picture = (pic==null||pic==="")?opts.defaultpic:pic;
				var img = $("<img src='"+opts.picurl+"/"+picture+"' style='width:19px'/>");
				lidivimg.append(img);
				//创建显示标题信息
				var divtext = $("<div class='divtext' title='"+name+"'/>").html(name);
				lidom.append(lidivimg).append(divtext).append(divbtn);
				//创建关闭按钮
				var divbtn = $("<div class='divbtn' />");
				if((isclose==null||isclose===true)&&opts.isallclose===true){
					var closeimg = $("<span id='closetab' style='' />");
					divbtn.append(closeimg);
				}
				lidom.append(divbtn);
				if(id!==""&&id!=null){
					lidom.attr("index",id);
				}else{
					lidom.attr("index",opts.maxindexname+"-"+maxid);
				}
				$("#tabsul").append(lidom);
				var lidomwidths = 0;
				$.each($("#tabsul").find(".tablidefault"),function(k,v){
					lidomwidths+=$(v).outerWidth(true);
				});
				var tabsulwidth = $("#tabsul").outerWidth(true);
				if(lidomwidths>tabsulwidth){
					$("#tabsul").css({"width":lidomwidths+"px"});
					var leftjl = lidomwidths-$(dom).outerWidth(true)+$(".lr").outerWidth(true);
					$("#tabsul").stop().animate({left:"-"+leftjl+"px"},300);
					$(".leftright").show();
				}
				var iframe = $("<iframe src='"+url+"' class='tabifrmedefaule tabiframeselected'/>");
				if(id!==""&&id!=null){
					iframe.attr("id",id);
				}else{
					iframe.attr("id",opts.maxindexname+"-"+maxid);
					maxid++;
				}
				/*var widthli = 0;
				for(var i=0;i<$(".tablidefault").length;i++){
					var liwidth = $(".tablidefault").eq(i).width();
					widthli+=liwidth;
				}
				if(widthli>$("#tabsul").width()){
					$("#tabsul").css("height","");
				}*/
				var height = $(dom).height()-$("#tabsul").height()-2;
				iframe.css({"height":height,"top":$("#tabsul").height()+3});
				$(dom).append(iframe);
			};
			//删除tab
			this.deletetab = function(para){
				//先移除dom，然后选择前边的tab(前提是删除的tab是显示的，如果是隐藏的，则不选中前边的tab)
				var doms = para.doms;//doms是closetab
				var boo = false;//标识删除的tab是否先当前选中的
				var parentli = $(doms).parent().parent();
				if(parentli.hasClass("tableliselected")){
					boo = true;
				}
				var prevli = parentli.prev();
				var tabsulwidth = $("#tabsul").outerWidth(true);
				var prevliwidth = parentli.outerWidth(true);
				var tabswidth = $(dom).outerWidth(true)-$(".lr").outerWidth(true);
				if((tabsulwidth-prevliwidth)>tabswidth){
					$("#tabsul").css({"width":(tabsulwidth-prevliwidth)+"px"});
					var leftjl = parseFloat($("#tabsul").css("left").replace("px",""))+prevliwidth;
					$("#tabsul").stop().animate({left:leftjl+"px"},300);
				}else{
					$("#tabsul").css({"width":"auto"});
					$("#tabsul").stop().animate({left:"0px"},300);
					$(".leftright").hide();
				}
				parentli.remove();
				var index = parentli.attr("index");
				$(dom).find("iframe[id='"+index+"']").remove();
				if(boo===true){
					$(prevli).find("[class='divtext']").trigger("click");
				}else{
					var height = $(dom).height()-$("#tabsul").height()-2;
					$(dom).find(".tabiframeselected").css({"height":height,"top":$("#tabsul").height()+3});
				}
			};
			//选中tab
			this.selecttab = function(para){
				var doms = para.doms;//doms是divtext
				$(dom).find(".tableliselected").removeClass("tableliselected");
				$(dom).find(".tabiframeselected").removeClass("tabiframeselected");
				$(doms).parent().addClass("tableliselected");
				var index = $(doms).parent().attr("index");
				var height = $(dom).height()-$("#tabsul").height()-2;
				$(dom).find("iframe[id='"+index+"']").css({"height":height,"top":$("#tabsul").height()+3}).addClass("tabiframeselected");
				var lidom = $(doms).parent();
				var jlc = lidom.position().left+lidom.parent().position().left;//距离差
				if(jlc<0){//如果再左边
					var leftjl = parseFloat($("#tabsul").css("left").replace("px",""))-jlc;
					$("#tabsul").stop().animate({left:leftjl+"px"},300);
				}else if(jlc+lidom.outerWidth(true)>$(dom).outerWidth(true)-$(".lr").outerWidth(true)){//如果再右边隐藏显示
					var leftjl = jlc+lidom.outerWidth(true)-($(dom).outerWidth(true)-$(".lr").outerWidth(true));
					leftjl = parseFloat($("#tabsul").css("left").replace("px",""))-leftjl;
					$("#tabsul").stop().animate({left:leftjl+"px"},300);
				}
			};
			//关闭所有tab
			this.closealltab = function(){
				$.each($(this).find("#closetab"),function(k,v){
					$(v).trigger("click");
				});
			};
			//刷新
			this.loadtab = function(){
				var dom = this;
				if($(dom).find("iframe.tabiframeselected").length>0){
					var src = $(dom).find("iframe.tabiframeselected").attr("src");
					$(dom).find("iframe.tabiframeselected").attr("src",src);
				}
			};
			//向左向右翻
			this.bindleftright = function(){
				$("#toright").bind("click",function(){
					var lidomwidths = 0;
					$.each($("#tabsul").find(".tablidefault"),function(k,v){
						lidomwidths+=$(v).outerWidth(true);
					});
					var leftjl = -(lidomwidths-$(dom).outerWidth(true)+$(".lr").outerWidth(true));
					var jlleft = parseFloat($("#tabsul").css("left").replace("px",""))-200;
					if(jlleft<=leftjl){
						$("#tabsul").stop().animate({left:leftjl+"px"},300);
					}else{
						$("#tabsul").stop().animate({left:jlleft+"px"},300);
					}
				});
				$("#toleft").bind("click",function(){
					var jlleft = parseFloat($("#tabsul").css("left").replace("px",""))+200;
					if(jlleft>=0){
						$("#tabsul").stop().animate({left:"0px"},300);
					}else{
						$("#tabsul").stop().animate({left:jlleft+"px"},300);
					}
				});
			};
			this.init();
		});
	};
})(jQuery);