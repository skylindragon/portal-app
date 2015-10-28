$(function(){
	//顶部淡入淡出功能
	fideinout();
	//设置数据
	setData();
	//公告通知
	GGTZ.queryGgtz();
	//滚动荣誉展示
	scrollRyzs();
});
//设置数据
function setData(){
	var gsjjstr = "光大环保能源（寿光）有限公司做为光大国际的全资子公司，是光大国际在山东投资建设的第二个垃圾焚烧发电项目，项目采用BOT投资模式，占地60000平方米" +
			"项目总投资人民币3.39亿元人民币，日处理垃圾600吨/天，年发电量8000万度，年可节约标准煤4.34万吨，年节约填埋土地40亩，年减排COD2700吨";
	$("#gsjj").text(gsjjstr);
}
//公告通知
var GGTZ = {};
GGTZ = {
	//查询公告通知
	queryGgtz:function(){
		var objarray = [
		           {"F_GGNR":"内部系统上线通知","F_GGSJ":"20150912"},
		           {"F_GGNR":"内部系统上线通知","F_GGSJ":"20150913"},
		           {"F_GGNR":"内部系统上线通知","F_GGSJ":"20150914"},
		           {"F_GGNR":"内部系统上线通知","F_GGSJ":"20150914"},
		           {"F_GGNR":"内部系统上线通知","F_GGSJ":"20150914"},
		           {"F_GGNR":"内部系统上线通知","F_GGSJ":"20150914"},
		           {"F_GGNR":"内部系统上线通知","F_GGSJ":"20150914"},
		           {"F_GGNR":"内部系统上线通知","F_GGSJ":"20150914"},
		           {"F_GGNR":"内部系统上线通知","F_GGSJ":"20150915"}
				  ]; 
		GGTZ.setGgtz(objarray);
	},
	//设置公告通知
	setGgtz:function(objarray){
		var doms = $("#xzgg");
		doms.find(".ggnrA").remove();
		var domdiv = "<div class='ggnrA'></div>";
		doms.append($(domdiv));
		$.each(objarray,function(a,b){
			var time = b['F_GGSJ'];
			time = time.substr(0,4)+"-"+time.substr(4,2)+"-"+time.substr(6,2);
			var str = "";
			str += "<div class='ggnrmx'>";
			str += "	<div class='ggnrmxA'>";
			str += "		<span class='ggnrmxB' title='"+b['F_GGNR']+"'>- "+b['F_GGNR']+"</span>";
			str += "	</div>";
			str += "	<div class='ggnrmxC'>";
			str += "		<span class='ggnrmxD' title='"+time+"'>["+time+"]</span>";
			str += "	</div>";
			str += "</div>";
			$(".ggnrA").append($(str));
		}); 
	},	
};
//顶部淡入淡出功能
function fideinout(){
	var dom = $(".nodes");
	var bdom = $("#images");
	var allnodes = dom.find(".nodesA");
	$.each(allnodes,function(a,b){
		$(b).bind("click",function(){
			dom.find(".nodeshover").removeClass("nodeshover");
			$(b).addClass("nodeshover");
			bdom.find(".imgdivshow").animate({opacity:0.1},300);
			var index = $(b).attr("index");
			setTimeout(function(){
				bdom.find(".imgdivshow").css("display","none").removeClass("imgdivshow");
				bdom.find("#img"+index).addClass("imgdivshow");
				bdom.find("#img"+index).css("display","block");
				bdom.find(".imgdivshow").animate({opacity:1},800);
			},302);
		});
	});
	var interval = null;
	function setIntervalFunc(){
		interval = setInterval(function(){
			if(dom.find(".nodeshover").next().length>0){
				dom.find(".nodeshover").next().trigger("click");
			}else{
				dom.find(".nodesA").eq(0).trigger("click");
			}
		},3000);
	}
	function clearIntervalFunc(){
		clearInterval(interval);
	}
	setIntervalFunc();
	bdom.hover(function(){
		clearIntervalFunc();
	},function(){
		setIntervalFunc();
	});
}
//滚动荣誉展示
function scrollRyzs(){
	var handId;//计时器id
	function ZouMa() {
        this.maxLength = 3; //最低显示数           
        this.Timer = 600;//计时器间隔时间
        this.Ul = $(".msg_m_nrlist0");

        var self = this;
        this.Start = function () {
            if (self.Ul.children().length < this.maxLength) {
                self.Ul.append(self.Ul.children().clone());
            }
            handId = setInterval(self.Play, self.Timer);
        };
        this.Play = function () {
            var img = self.Ul.children().eq(0);
            var left = img.children().eq(0).width();
            img.animate({ "marginLeft": (-1 * left) + "px" }, 600, function () {
                //appendTo函数是实现走马灯一直不间断播放的秘诀。
                //目前网上看到的很多走马灯，走到最后一张的时候，会立马闪回第一张，而不是继续从后往前推进，即是没有明白该函数的作用的原因
                $(this).css("margin-left", "auto").appendTo(self.Ul);
            });
        };
    }
	new ZouMa().Start();
	function clearIntervalFunc(){
		clearInterval(handId);
	}
	$(".msg_m_nrlist0").hover(function(){
		clearIntervalFunc();
	},function(){
		new ZouMa().Start();
	});
}