addReady(function(){
	var oDiv = document.getElementById('block');

	var row = 4;
	var col = 7;
	var w = oDiv.offsetWidth/col;
	var h = oDiv.offsetHeight/row;

	for(var r = 0; r < row; r++){
		for(var c = 0; c < col; c++){
			var oSpan = document.createElement('span');
			//top left background-position
			var top = r*h;
			var left = c*w;
			oSpan.style.top = r*h +'px';
			oSpan.style.left = c*w +'px';
			oSpan.style.backgroundPosition = '-'+c*w+'px -'+ r*h +'px'
			//添加id
			oSpan.r = r;
			oSpan.c = c;
			oDiv.appendChild(oSpan);
		}
	}

	var oBtn = document.getElementsByTagName('input')[0];
	var aSpan = oDiv.children;
	
	var count = 0;
	var timer = null;
	var flag = false;


	playBlock();
	function playBlock(){
		if(flag) return;
		flag = true;
		var n = 0;
		count++;
		for(var i=0; i < aSpan.length; i++){
			(function(index){
				setTimeout(function(){
					aSpan[index].style.opacity = 0;
					aSpan[index].style.backgroundImage = 'url(../img/demo/nuture'+ count%3 +'.jpg)';
					move(aSpan[index],{opacity:1},{complete: function(){
						if(aSpan[index].r == row - 1 && aSpan[index].c == col - 1){
							flag = false;
							oDiv.style.backgroundImage = 'url(../img/demo/nuture'+ count%3 +'.jpg)';
							setTimeout(function(){
								playBlock();
							},3000);
						}
					}});
				},80*(aSpan[index].r + aSpan[index].c));	
			})(i);
		}
	};
});