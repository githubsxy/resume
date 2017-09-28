'use strict'
$(document).ready(function(){
	let newcanvas;//新建画布
	let context;//绘画功能
	let current='line';//默认画线
	let newobj;//实例化对象
	let arr=[];
	//新建画布
	let newbtn=$('.fun > div:first-child > div[type=new]');
	newbtn.click(function(){
		let cans=$('canvas');//获取全部画布
		//新建时判断是否有画布，新建前是否保存
		if(cans.length){
			let result=window.confirm('确定保存吗');
			if(result){
				let data=cans.get(0).toDataURL('image/png');//将canvas保存为图片格式
				location.href=data.replace('data:image/png','data:stream/octet');//直接下载
			}
			document.body.removeChild(cans.get(0));//从页面中删除
		}
		arr=[];
		newcanvas=$('<canvas width=1020 height=650></canvas>').appendTo(document.body).get(0);//新建画布
		// newcanvas.style.border='2px solid #000';
		context=newcanvas.getContext('2d');//启动绘画功能，画笔
		newobj=new Canvas(context);//实例化对象
		//给画布添加鼠标事件
		newcanvas.onmousedown=function(e){
			e.preventDefault();//阻止默认动作
			let ox=e.offsetX;
			let oy=e.offsetY;
			newcanvas.onmousemove=function(e){
				let ox1=e.offsetX;
				let oy1=e.offsetY;
				if(current!='del'){
					//清除开始每次移动画的，只要最后一步抬起那个
					context.clearRect(0,0,newcanvas.width,newcanvas.height);
					//把数组中最后的状态重绘，然后开始新的绘画
					if(arr.length>0){
						context.putImageData(arr[arr.length-1],0,0);
					}
					switch(current){
						case 'line':newobj.paintLine(ox,oy,ox1,oy1);break;
						case 'rect':newobj.paintRect(ox,oy,ox1,oy1);break;
						case 'linearRect':newobj.paintLinearRect(ox,oy,ox1,oy1);break;
						case 'circle':newobj.paintCircle(ox,oy,ox1,oy1);break;
						case 'radialCircle':newobj.paintRadialCircle(ox,oy,ox1,oy1);break;
						case 'poly':newobj.paintPoly(ox,oy,ox1,oy1);break;
						case 'radialRect':newobj.paintRadialRect(ox,oy,ox1,oy1);break;
					}
				}else{
					newobj.Clear(ox1,oy1);//清除
				}
			}
			newcanvas.onmouseup=function(){
				arr.push(context.getImageData(0,0,newcanvas.width,newcanvas.height));
				newcanvas.onmousemove=null;
			}
		}
		//填充方式
		let ways=$('.fun >div:nth-child(3) > div[type]');
		ways.each(function(index,val){
			$(val).click(function(){
				ways.removeClass('active');
				$(this).addClass('active');
				newobj.way=val.getAttribute('type');
			})
		})
		//填充颜色
		let colors=$('.fun >div:nth-child(4) > input[type]');//获取
		colors.each(function(index,val){
			$(val).change(function(){
				if(index==0){
					newobj.fillColor=$(val)[0].value;
				}else{
					newobj.strokeColor=$(val)[0].value;
				}
			})
		})
		//渐变颜色
		let chacolor=$('.fun >div:nth-child(5) > input[type]');//获取
		chacolor.each(function(index,val){
			$(val).change(function(){
				newobj.colorArr[index]=$(val)[0].value;
			})
		})
		
		
		//其它
		let inputs=$('.fun >div:last-child > input[type]');
		inputs.each(function(index,val){
			$(val).change(function(){
				let aa=$(val)[0].getAttribute('aa');
				newobj[aa]=parseInt($(val)[0].value)
			})
		})
	})
	//保存
	let save=$('.fun > div:first-child > div[type=save]');
	save.click(function(){
		let cans=$('canvas');//获取全部画布
		if(cans.length){
			let result=window.confirm('确定保存吗');
			if(result){
				let data=cans.get(0).toDataURL('image/png');
				location.href=data.replace('data:image/png','data:stream/octet');
			}
			document.body.removeChild(cans.get(0));
		}
		arr=[];
	})
	//返回
	let ret=$('.fun > div:first-child > div[type=return]');
	ret.click(function(){
		if(context){
			arr.pop();//删除数组中最后一个
			if(arr.length<1){
				alert('不能再返回了');
				context.clearRect(0,0, newcanvas.width,newcanvas.height);
			}else{
				context.putImageData(arr[arr.length-1],0,0);
			}
		}
	})
	//绘画
	let paints=$('.fun >div:nth-child(2) > div[type]');
	paints.each(function(index,val){
		$(val).click(function(){
			paints.removeClass('active');
			$(this).addClass('active');
			current=val.getAttribute('type');
		})
	})
})
