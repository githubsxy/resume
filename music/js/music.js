'use strict'
$(document).ready(function(){
	//建立曲库,存储ID值
	let database = [
		{ id: 'song1', name: '童话镇', src: 'music/陈一发儿 - 童话镇.mp3', icon: 'img/1.jpg', bigimg: 'img/ban1.jpg', author: '陈一发儿', zhuanji: '童话镇' },
		{ id: 'song2', name: '刚好遇见你', src: 'music/李玉刚 - 刚好遇见你.mp3', icon: 'img/2.jpg', bigimg: 'img/ban2.jpg', author: '李玉刚', zhuanji: '刚好遇见你' },
		{ id: 'song3', name: '演员', src: 'music/薛之谦 - 演员.mp3', icon: 'img/3.jpg', bigimg: 'img/ban3.jpg', author: '薛之谦', zhuanji: '演员' },
		{ id: 'song4', name: '成都', src: 'music/赵雷 - 成都.mp3', icon: 'img/4.jpg', bigimg: 'img/ban4.jpg', author: '赵雷 ', zhuanji: '成都' },
		{ id: 'song5', name: '深夜书店', src: 'music/许嵩,洛天依 - 深夜书店.mp3', icon: 'img/5.jpg', bigimg: 'img/ban5.jpg', author: '许嵩,洛天依', zhuanji: '深夜书店' },
	]

	//添加曲库到页面中
	let　 list = $('.mess'); //获取存放列表的盒子ul
	//遍历曲库
	database.forEach((obj, index) => {
		let li = $('<li></li>'); //创建li
		li[0].id = obj.id; //给每一行添加id
		//给每个li添加内容,对应曲库
		li[0].innerHTML = `
			<span class="iconfont"></span>
			<span>${obj.name}</span>
			<span>${obj.author}</span>
			<span>${obj.zhuanji}</span>
			<span class="iconfont icon-shanchu" id='del'></span>
		`;
		list.append(li[0]);
		//给第一个添加默认值,样式
		if(index == 0) {
			li.addClass('active');
		}
	})
	//点击菜单按钮,播放列表消失或显示
	let menu = $('.menu span');
	let box = $('.list');
	menu.click(function() {
		box.toggleClass('on'); //toggle有删除,无添加
	})

	//加载?????有问题
	let audio = $('audio')[0];
	let load = $('.progress >.tiao > .jindu >.load')[0];
	audio.oncanplay = function() {
		load.style.width = '100%';
	}
	//播放事件
	let play = $('.play > span'); //获取播放按钮
	let current = 0; //存放当前播放的下标
	//点击播放按钮事件
	play.click(function() {
		//判断当前是否是暂停状态
		if(audio.paused) {
			audio.play();
			play.removeClass('icon-bofang1');
			play.addClass('icon-bofang');
			list.children().eq(current).children().eq(0).addClass('icon-yinle');
		} else {
			audio.pause();
			play.removeClass('icon-bofang');
			play.addClass('icon-bofang1');
			list.children().eq(current).children().eq(0).removeClass('icon-yinle');
		}
	})

	//进度条变化
	let circle = $('.progress .circle')[0];
	let played = $('.progress .played')[0];
	let jindu = $('.progress .jindu')[0];
	audio.ontimeupdate = function() {
		let nowtime = getTime(audio.currentTime);//获取当前时间
		let totaltime = getTime(audio.duration);//获取总时间
		let time = $('.time')[0];
		time.children[0].innerHTML = nowtime;
		time.children[2].innerHTML = totaltime;
		circle.style.left = audio.currentTime / audio.duration * jindu.offsetWidth - 10 + 'px';
		played.style.width = audio.currentTime / audio.duration * jindu.offsetWidth + 'px';
	}

	//格式化时间
	function getTime(time) {
		let m = Math.trunc(time / 60) >= 10 ? Math.trunc(time / 60) : '0' + Math.trunc(time / 60);
		let s = Math.trunc(time) % 60 >= 10 ? Math.trunc(time) % 60 : '0' + Math.trunc(time) % 60;
		return m + ':' + s;
	}

	//点击进度条,从 点击位置开始播放
	//	audio.oncanplaythrough=function(){
	jindu.onclick = function(e) {
		audio.currentTime = e.offsetX / jindu.offsetWidth * audio.duration;
		audio.play();
	}
	//	}

	//点击音量按钮设置音量   静音
	let vicon = $('.volume .icon >span');
	let nowv = 1; //默认音量为1
	vicon.click ( function() {
		if(audio.volume) {
			nowv = audio.volume;
			audio.volume = 0;
			$(this).removeClass('icon-yinliang');
			$(this).addClass('icon-jingyin1'); //静音
		} else {
			audio.volume = nowv;
			$(this).removeClass('icon-jingyin1');
			$(this).addClass('icon-yinliang'); //静音
		}
	})

	//音量进度条
	let volcircle = $('.volume .circle')[0];
	let volplayed = $('.volume .played')[0];
	let voljindu = $('.volume .jindu')[0];
	audio.onvolumechange = function() {
		let currentvol = audio.volume;
		volplayed.style.width = currentvol / 1 * voljindu.offsetWidth + 'px';
		volcircle.style.left = currentvol / 1 * voljindu.offsetWidth - 10 + 'px';
	}
	//点击进度条,音量改变
	voljindu.onclick = function(e) {
		audio.volume = e.offsetX / voljindu.offsetWidth * 1;
	}

	//列 表双击事件,双击播放
	let listli = $('.mess li');
	listli.each((index,val) =>{
		$(val).dblclick(function(){
			list.children().eq(current).removeClass('active');//去除样式
			$(val).addClass('active');//点击的那个添加样式
			let num = database.findIndex((obj) => {
				return obj.id == this.id;
			})
			$('#box')[0].style.backgroundImage = `url(${database[num].bigimg})`; //更换大背景图
			$('.author span')[0].innerHTML = database[num].author; //更换作者名
			$('.author span')[2].innerHTML = database[num].name; //更换歌名
			$('.icon')[0].style.backgroundImage = `url(${database[num].icon})`; //更换小图
			audio.src = database[num].src;
			play.removeClass('icon-bofang1');
			play.addClass('icon-bofang');
			list.children().eq(current).children().eq(0).removeClass('icon-yinle');
			this.children[0].classList.add('icon-yinle');
			audio.play();
			current = num;
		})
		
		$('span:nth-child(5)',$(val)).click(function(e) {
			e.stopPropagation();
			if(this.parentNode.className=='active') {
				return;
			}
			let id = this.parentNode.id;
			database.forEach((val, index, arr) => {
				if(val.id == id) {
					arr.splice(index, 1);
					if(index < current) {
							current--;
					}
				}
			})
			list[0].removeChild(this.parentNode);
		})
	})

	//列表的双击事件,事件委派
//		$('.mess').dblclick(function(e){
//			let num;
//			let obj=e.target;
//			if(obj.nodeName=='SPAN' && obj.id!='del'){
//				let id=obj.parentNode.id;
//				num=database.findIndex((obj)=>{
//					return obj.id==id;
//				})
//				current=num;
//				if(current>=database.length){
//					current=0;
//				}
//				if(current<0){
//					current=database.length-1;
//				}
//				current=num;
//				$('#box')[0].style.backgroundImage=`url(${database[num].bigimg})`;//更换大背景图
//				$('.author span')[0].innerHTML=database[num].author;//更换作者名
//				$('.author span')[2].innerHTML=database[num].name;//更换歌名
//				$('.icon')[0].style.backgroundImage=`url(${database[num].icon})`;//更换小图
//				audio.src=database[num].src;
//				//时间会有NaN?????
//				audio.play();
//				play.removeClass('icon-bofang1');
//				play.addClass('icon-bofang');
//				//去除默认的播放样式
//				//去除默认的播放样式
//				list.children().removeClass('active');
//				list.children().children().removeClass('icon-yinle');
//				//给双击的那行添加样式,播放状态
//				obj.parentNode.classList.add('active');
//				obj.parentNode.children[0].classList.add('icon-yinle');
//				}
//			//点击删除按钮删除列表                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
//			else if(obj.id=='del'){
//				let id=obj.parentNode.id;
//				num=database.findIndex((obj)=>{
//					return obj.id==id;
//				})
//				if(num==current){
//					return;
//				}
//				let li=obj.parentNode;
//				list[0].removeChild(li);
//				database.splice(num,1);
//				//更 新current,防止删除了自己
//				if(current>num){
//					current--;
//				}
//			}		
//		})

	//点击上一首,下一首换歌
	let previous = $('.previous > span');
	let next = $('.next > span');
	next.click(function() {
		current++;
		if(current >= database.length) {
			current = 0;
		}
		$('#box')[0].style.backgroundImage = `url(${database[current].bigimg})`; //更换大背景图
		$('.author span')[0].innerHTML = database[current].author; //更换作者名
		$('.author span')[2].innerHTML = database[current].name; //更换歌名
		$('.icon')[0].style.backgroundImage = `url(${database[current].icon})`; //更换小图
		audio.src = database[current].src;
		//时间会有NaN?????
		audio.play();
		play.removeClass('icon-bofang1');
		play.addClass('icon-bofang');
		//去除默认的播放样式
		list.children().removeClass('active');
		list.children().children().removeClass('icon-yinle');
		//给双击的那行添加样式,播放状态
		list.children().eq(current).addClass('active');
		list.children().eq(current).children().eq(0).addClass('icon-yinle');
	})

	previous.click ( function() {
		current--;
		if(current < 0) {
			current = database.length - 1;
		}
		$('#box')[0].style.backgroundImage = `url(${database[current].bigimg})`; //更换大背景图
		$('.author span')[0].innerHTML = database[current].author; //更换作者名
		$('.author span')[2].innerHTML = database[current].name; //更换歌名
		$('.icon')[0].style.backgroundImage = `url(${database[current].icon})`; //更换小图
		audio.src = database[current].src;
		//时间会有NaN?????
		audio.play();
		play.removeClass('icon-bofang1');
		play.addClass('icon-bofang');
		//去除默认的播放样式
		list.children().removeClass('active');
		list.children().children().removeClass('icon-yinle');
		//给双击的那行添加样式,播放状态
		list.children().eq(current).addClass('active');
		list.children().eq(current).children().eq(0).addClass('icon-yinle');
	})

	//播完一首自动播放下一首
	audio.onended = function() {
		next.click();
	}

})