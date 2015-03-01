(function (){
	var added=false;
	
	window.calender=function (oInp){
		// 变span.innerHTML
		var oDiv=document.createElement('div');
		oDiv.className='calender';
		oDiv.innerHTML='<a href="javascript:;" class="prev">←</a> \
			<span class="now">xxxx</span> \
			<a href="javascript:;" class="next">→</a> \
			<ol> \
				<li>一</li> \
				<li>二</li> \
				<li>三</li> \
				<li>四</li> \
				<li>五</li> \
				<li class="week">六</li> \
				<li class="week">日</li> \
			</ol> \
			<ul></ul>';
		
		oInp.parentNode.appendChild(oDiv);
		
		
		var oSpan=oDiv.getElementsByTagName('span')[0];
		var oUl=oDiv.getElementsByTagName('ul')[0];
		var now=0;
		
		createCalener();
		
		// 下个月
		var oNext=oDiv.getElementsByTagName('a')[1];
		oNext.onclick=function (){
			now++;
			createCalener();
		};
		var oPrev=oDiv.getElementsByTagName('a')[0];
		oPrev.onclick=function (){
			now--;
			createCalener();
		};
		
		function createCalener(){
			// 清空ul
			oUl.innerHTML='';
			
			// span
			var oDate=new Date();
			oDate.setMonth(oDate.getMonth()+now, 1);
			oSpan.innerHTML=oDate.getFullYear()+'年'+(oDate.getMonth()+1)+'月';
			
			// 创建空的li
			var oDate=new Date();
			oDate.setMonth(oDate.getMonth()+now, 1);
			oDate.setDate(1);
			var n=oDate.getDay(); // 0 -> 周日
			if (n==0){
				n=7;
			}
			
			for (var i=0; i<n-1; i++){
				var oLi=document.createElement('li');
				
				oUl.appendChild(oLi);
			}
			
			// 创建日期li now=0
			var oDate=new Date();
			oDate.setMonth(oDate.getMonth()+now+1, 1);
			oDate.setDate(0);
			var nTotal=oDate.getDate();
			for (var i=0; i<nTotal; i++){
				var oLi=document.createElement('li');
				oLi.innerHTML=i+1;
				
				oUl.appendChild(oLi);
			}
			
			// 加class
			if (now == 0){
				var oDate=new Date();
				var nToday=oDate.getDate();
				for (var i=0; i<oUl.children.length; i++)
				{
					if (oUl.children[i].innerHTML == nToday)
					{
						oUl.children[i].innerHTML='今天';
						oUl.children[i].className='today';
					}
					else if (oUl.children[i].innerHTML < nToday)
					{
						oUl.children[i].className='past';
					}
				}
			}
			if (now < 0){
				for (var i=0; i<oUl.children.length; i++)
				{
					oUl.children[i].className='past';
				}
			}
			
			// 加事件
			if (now >= 0){
				for (var i=0; i<oUl.children.length; i++)
				{
					if (oUl.children[i].className != 'past'){
						oUl.children[i].onclick=function (){
							var day=null;
							
							if (this.className=='today')
							{
								day=new Date().getDate();
							}
							else
							{
								day=this.innerHTML;
							}
							
							oInp.value=oSpan.innerHTML+day+'日';
							
							oDiv.style.display='none';
						};
					}
					
				}
			}
			oInp.parentNode.onmouseout = function (){
				document.onclick = function (){
					oDiv.style.display='none';
				};
			};
			oInp.parentNode.onmouseover = function (){
				document.onclick = null;
			};
		}
		
		// 调用
		oInp.onfocus=function (){
			oDiv.style.display='block';
			oDiv.style.left=oInp.offsetLeft+'px';
			oDiv.style.top=oInp.offsetTop+oInp.offsetHeight+'px';
		};

		
		// 插入css
		if ( ! added){
			added=true;
			
			var oLink=document.createElement('link');
			oLink.rel='stylesheet';
			oLink.href='../css/demo/calender.css';
			var oHead=document.getElementsByTagName('head')[0];
			oHead.appendChild(oLink);
		}	
	};
})();


