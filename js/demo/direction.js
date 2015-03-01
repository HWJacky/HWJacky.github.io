window.onload = window.resize = function (){
	var aLi = document.getElementsByTagName('li');
	var aSpan = document.getElementsByTagName('span');

	var data = [
		{
			img: '../img/demo/hotwind.jpg',
			word: '<span>热风</span>'
		},
		{
			img: '../img/demo/ayi.jpg',
			word: '<span>阿姨帮</span>'
		},
		{
			img: '../img/demo/light.jpg',
			word: '<span>兰亭集势</span>'
		},
		{
			img: '../img/demo/zhitu.jpg',
			word: '<span>智图科技</span>'
		}
	];

	for(var i = 0; i < aLi.length; i++){
		enterShow(aLi[i]);
		addDate(aLi[i],data[i]);
	}

};

function addDate(obj,data){
	var oP = obj.getElementsByTagName('p')[0];
	obj.style.background = 'url('+ data.img +') ' ;
	obj.style.backgroundSize = 'cover';

	oP.innerHTML = data.word;
}

function enterShow(obj){
	var oP = obj.getElementsByTagName('p')[0];

	function getDirection(obj,oEvent){
		var y = obj.offsetTop + obj.offsetHeight/2 - oEvent.clientY;
		var x = obj.offsetLeft + obj.offsetWidth/2 - oEvent.clientX;
		//通过角度判断进入方向
		return Math.round((Math.atan2(y,x)*180/Math.PI + 180)/90)%4;
	}

	obj.onmouseenter = function (ev){
		var oEvent = ev || event;
			var n = getDirection(obj,oEvent);
		switch(n){
			case 0: //右
				oP.style.top = 0;
				oP.style.left = '200px';
				break;
			case 1: //下
				oP.style.top = '200px';
				oP.style.left = 0;
				break;
			case 2: //左
				oP.style.top = 0;
				oP.style.left = '-200px';
				break;
			case 3: //上
				oP.style.top = '-200px';
				oP.style.left = 0;
				break;
		}
		move(oP,{top: 0,left: 0},{duration: 300});
	};

	obj.onmouseleave = function (ev){
		var oEvent = ev || event;
		var n = getDirection(obj,oEvent);
		switch(n){
			case 0: //右
				move(oP,{top: 0,left: 200},{duration: 300});
				break;
			case 1: //下
				move(oP,{top: 200,left: 0},{duration: 300});
				break;
			case 2: //左
				move(oP,{top: 0,left: -200},{duration: 300});
				break;
			case 3: //上
				move(oP,{top: -200,left: 0},{duration: 300});
				break;
		}
	};

}
