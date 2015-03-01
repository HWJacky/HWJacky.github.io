addReady(function(){
	//left = R + R * sinA; top = R - R * cosA;
	// var oDiv = document.getElementsByTagName('div')[0];
	// var oSpan = document.getElementsByTagName('span')[0];

	// var R = oDiv.offsetWidth/2;
	// var A = 0;

	// setInterval(function(){
	// 	A += 0.1 / Math.PI;
	// 	oSpan.style.left = R + R * Math.sin(A) +'px';
	// 	oSpan.style.top = R - R * Math.cos(A) +'px';
	// },30);

	var oPlanet = document.getElementById('planet');
	var aPlanet = getByClass(oPlanet,'planet');

	for(var i = 0; i < aPlanet.length; i++){
		var R = (i+1)*60;
		aPlanet[i].style.width = R + 'px';
		aPlanet[i].style.height = R + 'px';
		aPlanet[i].style.marginTop = - R/2 + 'px';
		aPlanet[i].style.marginLeft = - R/2 + 'px';

		var oSpan = aPlanet[i].getElementsByTagName('span')[0];
		var spead = [1,3,4,8,15,24,34,68];
		oSpan.s = spead[i];
		rotate(oSpan,R);
	}


	//行星旋转
	function rotate(obj,R){
		(function(){
			var A = 0;
			setInterval(function(){
				A +=  0.6/obj.s  / Math.PI;
				obj.style.left = R/2 + R/2 * Math.sin(A) +'px';
				obj.style.top = R/2 - R/2 * Math.cos(A) +'px';
			},30);
		})();
	}

});
