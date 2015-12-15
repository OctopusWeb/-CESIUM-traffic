$(function(){
	
	var goNumLi=$("#goNum ul li");
	var backNumLi=$("#backNum ul li");
	var busGoLi=$("#busGo ul li");
	var busBackLi=$("#busBack ul li"); 
	
	intEvent("03");
	
	function intEvent(point_url){//初始化事件
		busAnimate();
		randomNum();
		busInfo(point_url);
		goNumLi.click(function(){
			var goNum=goNumLi.index($(this));
			var selected=$(this);
			busEvent(selected,goNum,busGoLi);
		})
		
		backNumLi.click(function(){
			var backNum=backNumLi.index($(this));
			var selected=$(this);
			busEvent(selected,backNum,busBackLi);
		})
	}
	
	function randomNum(){//随机生成车辆车牌号
		for (var i=0;i<12;i++) {
			var letter1 = String.fromCharCode(65+Math.ceil(Math.random()*14));
			var num = Math.ceil(Math.random()*1000);
			num<=100?num*10:num=num;
			letter1=="O"?letter1="A":letter1=letter1;
			letter1=="I"?letter1="A":letter1=letter1;
			var str = "京A·"+letter1+num;
			$("#busNum ul li p").eq(i).html(str);
		}
	}
	
	function busEvent(selected,goNum,GoLi){//公交车点击出现信息事件
		
		$("#busNum li").find("img").attr("src","img/busBtn.jpg");
		$("#busNum li").find("p").css({"color":"#fff"});
		selected.find("img").attr("src","img/busBtn1.jpg");
		selected.find("p").css({"color":"#0073ff"});
		
		GoLi.eq(goNum).find("p").eq(0).html(selected.find("p").html());
		GoLi.find("#carInfo").css({"display":"none"})
		GoLi.eq(goNum).find("#carInfo").css({"display":"block"})
	}
	
	function busInfo(point_url){//获取公交车站点信息
		point_url = "data/point"+point_url+".txt";
		$.getJSON(point_url,function(data){
			var pointNum = data.length;
			var startStop = data[0].name;
			var endStop = data[pointNum-1].name;
			var busName = data[0].id;
			
			$("#busInfo").find("h3").html(busName);
			$("#busInfo").find("h4").eq(0).html(startStop);
			$("#busInfo").find("h4").eq(1).html(endStop);
			busChange(pointNum-1);
			for (var i=0;i<pointNum;i++) {
				pointName(i,data[i].name)
			}
		})
	}
	function pointName(num,name){
		$("#BusBackName li").eq(num).find("p").html(name);
	}
	
	function busAnimate(){//公交车自动移动动画
		var trap=0;
		setInterval(function(){
			trap--;
			if(busGoLi.parent("ul").position().left==-1850){
				trap=-50;
				busGoLi.css({left:0});
				busBackLi.css({right:0});
			}
			for(var i=0;i<6;i++){
				if (busGoLi.parent("ul").position().left==-300*(i+1)+250) {
					busGoLi.eq(i).css({left:1800});
					busGoLi.eq(i).find("#carInfo").hide();
					busBackLi.eq(i).css({right:1800});
					busBackLi.eq(i).find("#carInfo").hide();
				}		
			}
			busGoLi.parent("ul").css({left:trap});
			busBackLi.parent("ul").css({right:trap});
		},100)	
	}
	
	function busChange(num){//设置公交站css样式（margin）
		addPoint(num);
		function addPoint(num){
			for(var i=0;i<num;i++){
				$("#busLine ul li:first").after($("#busLine ul li:first").clone(true));
				$("#BusBackName li:first").after($("#BusBackName li:first").clone(true));
			}
			locationPoint(num);
		}
		function locationPoint(num){
			var poinWid = 40*num;
			var pointMar = (1800-poinWid)/num;
			$("#busLine ul li,#BusBackName li").css({"margin-left":pointMar});
			$("#busLine ul li:first,#BusBackName li:first").css({"margin-left":"50px"});
		}
	}
})
