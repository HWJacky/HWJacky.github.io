addReady(function(){
	var oBox = document.getElementById('clock');
	var aLi = oBox.getElementsByTagName('li');
	var aDiv = oBox.getElementsByTagName('div');

	var str = '';
	var oldStr = '';
	var bZore = '';

	//一开始就加载；
	createClock();
	setInterval(createClock,1000);

	function createClock(){
		var oDate = new Date();
		var h = oDate.getHours();
		var m = oDate.getMinutes();
		var s = oDate.getSeconds();
		if(str) oldStr = str;
		str = toDub(h) + toDub(m) + toDub(s);

		// 当位置要发生变化时，才移动一次。
		for(var i = 0; i < str.length; i++){
			if(str.charAt(i) != oldStr.charAt(i)){
				if(str.charAt(i) == 0){
					//个位移动到10位置的0，十位移动到6位置的0;
					var num = 0;
					if(i%2 == 0){
						num = 6;
					}else{
						num = 10;
					}
					move(aDiv[i],{ 'top' : - num*35},{duration: 300});
				}else{
					//当要移动到1之前，先将aDiv[i]的位置归0;
					if(str.charAt(i) == 1){
						aDiv[i].style.top = 0;
					}
					move(aDiv[i],{ 'top' : - str.charAt(i)*35},{duration: 300});
				}
			}
		}
	}

	function toDub(n){
		return n < 10 ? '0'+ n : '' + n;
	}
});