(function($){
	$.fn.leftMenu = function(options){
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options == 'string') {
			var fn = this[0][options];
			if($.isFunction(fn)){
				return fn.apply(this, otherArgs);
			}else{
				throw ("leftMenu - No such method: " + options);
			}
		}
		return this.each(function() {
			var opts = {};
			var dom = this;  // 保存组件对象
			var defaults = {
					idFiled:"",//id字段
					captioinField:"",//名称字段
					parentField:"",//父节点字段
					root:"#ROOT",//父集结点
					iconField:"",//图标字段
					iconUrl:"",//图片存放路径
					isshowone:false,//标记是否只显示一个
					onClick:null//点击回调方法
			};
			opts = $.extend(defaults,options);
			var menuList = "";
			this.init = function(){
				menuList = $("<div id='MenuDom' />");
				$(dom).append(menuList);
			};
			this.create = function(para){
				menuList.empty();
				var menurows = para.rows;
				$.each(menurows,function(a,b){
					if(b[opts.parentField]===opts.root){
						var imgsrc = "";
						(b[opts.iconField]!=="")?imgsrc = opts.iconUrl+"/"+b[opts.iconField]:imgsrc = opts.iconUrl+"/"+"one.png";
						var menudiv = $("<div class='menudiv' id='"+b[opts.idFiled]+"'>"+
										"<img src='"+imgsrc+"' style='' class='menuimg'></img>"+
										"<span class='menuspan' title='"+b[opts.captioinField]+"'>"+b[opts.captioinField]+"</span>"+
										"<img src='"+opts.iconUrl+"/"+"close.png' style='' class='menuimgfoot'></img>"+
										"</div>");
						var divul = $("<div class='divul' />");
						menuList.append(menudiv).append(divul);
						$.each(menurows,function(c,d){
							var chilrenimgsrc = "";
							(d[opts.iconField]!=="")?chilrenimgsrc = opts.iconUrl+"/"+d[opts.iconField]:chilrenimgsrc = opts.iconUrl+"/"+"two.png";
							if(d[opts.parentField]===b[opts.idFiled]){
								var divli = $("<div id='"+d[opts.idFiled]+"' parentid='"+d[opts.parentField]+"' class='childmenu'>" +
											  "<img src='"+chilrenimgsrc+"' style='' class='childmenuimg'></img>"+
											  "<span title='"+d[opts.captioinField]+"' class='childspan'>"+d[opts.captioinField]+"</span>" +
											  "</div>");
								divul.append(divli);
								divli.data("menudata",d);
								divli.click(function(){
									if($.isFunction(opts.onClick)){
										var data = $(this).data("menudata");
										opts.onClick.call(this,data);
									}
								});
							}
						});
					}
				});
				dom.bindmenuclick();
			};
			this.bindmenuclick = function(){
				var pdiv = menuList.find(".menudiv");
				pdiv.bind("click",function(){
					if(opts.isshowone===true){
						var menulistdiv = menuList.find(".childshow");
						if($(this).next("div").is(":visible")){
							$(this).next("div").removeClass("childshow");
							$(this).find(".menuimgfoot").attr("src",opts.iconUrl+"/close.png");
						}else{
							$(this).next("div").addClass("childshow");
							$(this).find(".menuimgfoot").attr("src",opts.iconUrl+"/open.png");
						}
						menulistdiv.removeClass("childshow");
					}else{
						if($(this).next("div").is(":visible")){
							$(this).next("div").removeClass("childshow");
							$(this).find(".menuimgfoot").attr("src",opts.iconUrl+"/close.png");
						}else{
							$(this).next("div").addClass("childshow");
							$(this).find(".menuimgfoot").attr("src",opts.iconUrl+"/open.png");
						}
					}
				});
			};
			this.init();
		});
	};
})(jQuery);