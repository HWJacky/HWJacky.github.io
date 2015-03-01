addReady(function(){
	//翻页
	(function(){

		/*----------- M层 -------------*/
		//展示页
		var	summaryPage = '<p>我是Summary</p>';
		//内容页
		var skillPage = '<p>我是Skill</p>';
		//作品页
		var opusPage = '<p>我是Opus</p>';
		//联系页
		var contactPage = '<p>我是Contact</p>';


		/*----------- v层 -------------*/


		//获取section分页
		var oMain = document.getElementById('main');
		var aSec = oMain.getElementsByTagName('section');
		var oBody = document.getElementsByTagName('body')[0];

		//获取视窗高度
		var clientHeight =  document.documentElement.clientHeight;
		var clientWidth = document.documentElement.clientWidth;

		//设置section、section盒子高度
		for(var i = 0; i < aSec.length; i++){
			aSec[i].style.height = clientHeight + 'px';
		}
		oMain.style.height = clientHeight + 'px';
		oMain.style.width = clientWidth + 'px';
		oBody.style.height = clientHeight + 'px';
		oBody.style.width = clientWidth + 'px';


		/*----------- C层 -------------*/



		//添加数据
		var oSummary = document.getElementById('summary');
		var oSkill = document.getElementById('skill');
		var oOpus = document.getElementById('opus');
		var oContact = document.getElementById('contact');

		function addData(hash){
			switch(hash){
				case '#summary' :
					oSummary.children[0].innerHTML = summaryPage;
					break;
				case '#skill' :
					oSkill.children[0].innerHTML = skillPage;
					break;
				case '#opus' :
					oOpus.children[0].innerHTML = opusPage;
					break;
				case '#contact' :
					oContact.children[0].innerHTML = contactPage;
					break;
			}
		}

		function removeData(hash){
			switch(hash){
				case '#summary' :
					oSummary.children[0].innerHTML = '';
					break;
				case '#skill' :
					oSkill.children[0].innerHTML = '';
					break;
				case '#opus' :
					oOpus.children[0].innerHTML = '';
					break;
				case '#contact' :
					oContact.children[0].innerHTML = '';
					break;
			}

		}

		// 第n+1页
		var n = 0;
		// 翻页完成才能有下一个
		var bComplete = true;
		// 判断上下翻 解决莫名其妙的翻页直接跳转BUG
		var bUp = true;

		//页面对应锚点
		function anchor(n){
			switch(n){
				case 0:
					return '#summary';
				break;
				case 1:
					return '#skill';
				break;
				case 2:
					return '#opus';
				break;
				case 3:
					return '#contact';
				break;
			}
		}
		// 锚点对应页面 
		function reAnchor(hash){
			switch(hash){
				case '#summary' :
					return 0;
				break;
				case '#skill':
					return 1;
				break;
				case '#opus':
					return 2;
				break;
				case '#contact':
					return 3;
				break;
			}
		}

		var oScroll = document.getElementById('scrollbar');
		var aScrollBtn = oScroll.getElementsByTagName('a');
		//刷新页面不变
		if(window.location.hash){
			changePage(reAnchor(window.location.hash));
		}else{
			addData('#summary');
		}


		//控制翻页(4)

		//1.点击标题翻页
		var oNav = document.getElementById('nav');
		var aNavBtn = oNav.children;

		for(var i =0; i < aNavBtn.length; i++){
			aNavBtn[i].index = i;
			addEvent(aNavBtn[i],'click',function(ev){
				var oEvent = ev || event;
				if(bComplete){
					bComplete = false;

					n = this.index;
					//翻页
					changePage(n);
				}
				oEvent.preventDefault();
				return false;
			});
		}

		//2.点击右侧按钮翻页
		for(var i = 0; i < aScrollBtn.length; i++){
			aScrollBtn[i].index = i;
			addEvent(aScrollBtn[i],'click',function(ev){
				var oEvent = ev || event;
				if(bComplete){
					bComplete = false;

					n = this.index;
					//翻页
					changePage(n);
				}
				oEvent.preventDefault();
				return false;
			});
		}



		//3.滚轮翻页
		addWheel(document,function(bDown){
			if(bComplete){
				bComplete = false;

				if(bDown){
					if(n < 3){
						n = n + 1;
					}
				}else{
					if(n > 0){
						n = n -1;
					}
				}

				//翻页
				changePage(n);
			}
		});
		
		//4.上下键翻页
		addEvent(document,'keydown',function(ev){
			var oEvent = ev || event;
			if(bComplete){
				bComplete = false;
				if(oEvent.keyCode == 40){
					if(n < 3){
						n = n + 1;
						bUp = false;
					}
				}else if(oEvent.keyCode == 38){
					if(n > 0){
						n = n -1;
						bUp = true;
					}
				}
				//翻页
				changePage(n);
			}
			oEvent.preventDefault && oEvent.preventDefault();
			return false;
		});

		//翻页效果
		function changePage(n){
			//改变按钮效果
			for(var i = 0; i < aScrollBtn.length; i++){
				aScrollBtn[i].children[0].className = '';
			}
			aScrollBtn[n].children[0].className = 'on';

			var anchorValue = anchor(n);
			if(bUp){
				//种锚点
				window.location.hash = anchorValue;
			}
			removeData(anchorValue);
			//改变top值，翻页
			move(oMain,{top: - n * clientHeight},{easing: Tween.Circ.easeIn,duration: 1000,complete: function(){
				bComplete = true;
				//更新数据
				addData(anchorValue);
				if(!bUp){
					//种锚点
					window.location.hash = anchorValue;
				}
			}});
		}
	})();


});
