addReady(function(){
	var oDiv1 = document.getElementById("small");
	var oDiv2 = document.getElementById("big");
	var oSpan = oDiv1.getElementsByTagName("span")[0];
	var oImg = document.getElementById("image");

	oDiv1.onmousemove = function (ev){
		oSpan.style.display = "block";
		oDiv2.style.display = "block";

		oEvent = ev || event;

		// 	span块随鼠标移动
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
		var iSpanTop = parseInt(oEvent.clientY - getPos(oDiv1).top - oSpan.offsetHeight/2 + scrollTop , 10 );
		var iSpanLeft = parseInt(oEvent.clientX - getPos(oDiv1).left - oSpan.offsetWidth/2 + scrollLeft , 10);

		if(iSpanTop < 0){
			iSpanTop = 0;
		} else if(iSpanTop > oDiv1.offsetHeight - oSpan.offsetHeight){
			iSpanTop = oDiv1.offsetHeight - oSpan.offsetHeight;
		}
		if(iSpanLeft < 0){
			iSpanLeft = 0;
		} else if(iSpanLeft > oDiv1.offsetWidth - oSpan.offsetWidth){
			iSpanLeft = oDiv1.offsetWidth - oSpan.offsetWidth;
		}

		oSpan.style.top = iSpanTop + "px";
		oSpan.style.left = iSpanLeft + "px";

		//鼠标移动，放大图片位置变化
		var iImgLeft = parseInt(- iSpanLeft * (oImg.offsetWidth - oDiv2.offsetWidth) / (oDiv1.offsetWidth - oSpan.offsetWidth),10);
		var iImgTop = parseInt(- iSpanTop * (oImg.offsetHeight - oDiv2.offsetHeight) / (oDiv1.offsetHeight - oSpan.offsetHeight),10);

		oImg.style.marginLeft = iImgLeft + "px";
		oImg.style.marginTop = iImgTop + "px";
	};
	oDiv1.onmouseout = function (){
		oSpan.style.display = "";
		oDiv2.style.display = "";
	};
});
