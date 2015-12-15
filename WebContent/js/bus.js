$(function(){
	
	var goNumLi=$("#goNum ul li");
	var backNumLi=$("#backNum ul li");
	var busGoLi=$("#busGo ul li");
	var busBackLi=$("#busBack ul li");
	
	intEvent();
	
	function intEvent(){
		busAnimate();
		goNumLi.click(function(){
			var goNum=goNumLi.index($(this));
			var selected=$(this);
			NumEvent(selected,goNum,busGoLi);
		})
		
		backNumLi.click(function(){
			var backNum=backNumLi.index($(this));
			var selected=$(this);
			NumEvent(selected,backNum,busBackLi);
		})
	}
	
	function NumEvent(selected,goNum,GoLi){
		
		$("#busNum li").find("img").attr("src","img/busBtn.jpg");
		$("#busNum li").find("p").css({"color":"#fff"});
		selected.find("img").attr("src","img/busBtn1.jpg");
		selected.find("p").css({"color":"#0073ff"});
		
		GoLi.find("#carInfo").css({"display":"none"})
		GoLi.eq(goNum).find("#carInfo").css({"display":"block"})
	}
	
	function busAnimate(){
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
})
