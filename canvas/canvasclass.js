'use strict'
class Canvas{
	constructor(context){
		this.context=context;//画笔
		this.lineWidth=3;//线宽
		this.strokeColor='black';//轮廓颜色
		this.fillColor='balck';//填充颜色
		this.colorArr=['black','white'];//渐变颜色
		this.way='fill';//绘画方式
		this.n=3;//边数
		this.radialR=30;//圆角矩形半径
		this.delWidth=10;//擦除半径
	}
	//线
	paintLine(x,y,x1,y1){
		this.context.beginPath();
		this.context.moveTo(x,y);
		this.context.lineTo(x1,y1);
		this.context.closePath();
		this.context.lineWidth=this.lineWidth;
		this.context.strokeStyle=this.strokeColor;
		this.context.stroke();
	}
	//矩形
	paintRect(x,y,x1,y1){
		this.context.beginPath();
		if(this.way=='fill'){
			this.context.fillStyle=this.fillColor;
			this.context.fillRect(x,y,x1-x,y1-y);
		}else{
			this.context.lineWidth=this.lineWidth;
			this.context.strokeStyle=this.strokeColor;
			this.context.strokeRect(x,y,x1-x,y1-y);
		}
		this.context.closePath();
	}
	//渐变矩形
	paintLinearRect(x,y,x1,y1){
		this.context.beginPath();
		let linear=this.context.createLinearGradient(x,y,x1,y1);
		linear.addColorStop(0,this.colorArr[0]);
		linear.addColorStop(1,this.colorArr[1]);
		this.context.fillStyle=linear;
		this.context.fillRect(x,y,x1-x,y1-y);
		this.context.closePath();
	}
	
	//圆
	paintCircle(x,y,x1,y1){
		this.context.beginPath();
		let r=Math.sqrt(Math.pow(x1-x,2)+Math.pow(y1-y,2));
		this.context.arc(x,y,r,0,Math.PI*2);
		this.context.closePath();
		if(this.way=='fill'){
			this.context.fillStyle=this.fillColor;
			this.context.fill();
		}else{
			this.context.lineWidth=this.lineWidth;
			this.context.strokeStyle=this.strokeColor;
			this.context.stroke();
		}
	}
	//渐变圆
	paintRadialCircle(x,y,x1,y1){
		this.context.beginPath();
		let r=Math.sqrt(Math.pow(x1-x,2)+Math.pow(y1-y,2));
		let radial=this.context.createRadialGradient(x,y,0,x,y,r);
		radial.addColorStop(0,this.colorArr[0]);
		radial.addColorStop(1,this.colorArr[1]);
		this.context.fillStyle=radial;
		this.context.arc(x,y,r,0,Math.PI*2);
		this.context.closePath();
		this.context.fill();
	}
	//正多边形
	paintPoly(x,y,x1,y1){
		let ran=360/this.n;
		let r=Math.sqrt(Math.pow(x1-x,2)+Math.pow(y1-y,2));
		this.context.beginPath();
		for(let i=0;i<this.n;i++){
			this.context.lineTo(x+Math.sin((i*ran+45)*Math.PI/180)*r,y+Math.cos((i*ran+45)*Math.PI/180)*r);
		}
		this.context.closePath();
		if(this.way=='fill'){
			this.context.fillStyle=this.fillColor;
			this.context.fill();
		}else{
			this.context.lineWidth=this.lineWidth;
			this.context.strokeStyle=this.strokeColor;
			this.context.stroke();
		}
	}
	//圆角矩形
	paintRadialRect(x,y,x1,y1){
		this.context.beginPath();
		this.context.moveTo(x+this.radialR,y);
		this.context.arcTo(x1,y,x1,y+this.radialR,this.radialR);
		this.context.arcTo(x1,y1,x1-this.radialR,y1,this.radialR);
		this.context.arcTo(x,y1,x,y1-this.radialR,this.radialR);
		this.context.arcTo(x,y,x+this.radialR,y,this.radialR);
		this.context.closePath();
		if(this.way=='fill'){
			this.context.fillStyle=this.fillColor;
			this.context.fill();
		}else{
			this.context.lineWidth=this.lineWidth;
			this.context.strokeStyle=this.strokeColor;
			this.context.stroke();
		}
	}
	//擦除
	Clear(x1,y1){
		this.context.clearRect(x1-this.delWidth/2,y1-this.delWidth/2,this.delWidth,this.delWidth);
	}
	
}


