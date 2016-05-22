function palette(cobj,canvas,copy){
	this.o=cobj;
	this.canvas=canvas;
	this.copy=copy;
	this.width=canvas.width;
	this.height=canvas.height;
	this.lineWidth=1;
	this.strokeStyle='#000';
	this.fillStyle='#000';
	this.style='stroke';// fill|| stroke
	this.type='pencil';
	this.history=[];
	this.polyNum=6;
	this.jiaoNum=5;
	this.draw();
}
palette.prototype.reset=function(){
	this.o.fillStyle=this.fillStyle;
	this.o.strokeStyle=this.strokeStyle;
	this.o.lineWidth=this.lineWidth;
}
palette.prototype.draw=function(){
	var that=this;
	this.copy.onmousedown=function(e){
		var dx=e.offsetX;
		var dy=e.offsetY;
		that.reset();
		that.copy.onmousemove=function(e){
			var mx=e.offsetX;
			var my=e.offsetY;
			that.o.clearRect(0,0,that.width,that.height);
			if(that.history.length>0){
				that.o.putImageData(that.history[that.history.length-1],0,0,0,0,that.width,that.height);
			}
			that[that.type](dx,dy,mx,my);
		}
		document.onmouseup=function(){
			that.copy.onmousemove=null;
			document.onmouseup=null;
			that.history.push(that.o.getImageData(0,0,that.width,that.height));
		}
	}
}
//画线
palette.prototype.line=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.lineTo(x1,y1)
	this.o.lineTo(x2,y2)
	this.o.stroke();
	this.o.closePath();
}
//画正方形
palette.prototype.rect=function(x1,y1,x2,y2){
	var W=x2-x1;
	var H=y2-y1;
	this.o.beginPath();
	this.o.rect(x1+.5,y1+.5,W,H);		
	this.o.closePath();	
	this.o[this.style]();
}
//画圆
palette.prototype.arc=function(x1,y1,x2,y2){
	var r=this._r(x1,y1,x2,y2);
	this.o.beginPath();
	this.o.arc(x1,y1,r,0,2*Math.PI,false);		
	this.o.closePath();	
	this.o[this.style]();
}
//画六边形
palette.prototype.poly=function(x1,y1,x2,y2){
	var r=this._r(x1,y1,x2,y2);
	var len=this.polyNum;
	var ag=360/len;
	this.o.beginPath();
	for(var i=0;i<len;i++){
		this.o.lineTo(x1+Math.cos(i*ag*Math.PI/180)*r,y1+Math.sin(i*ag*Math.PI/180)*r);
	}
	this.o.closePath();	
	this.o[this.style]();
}
//五角形
palette.prototype.jiao=function(x1,y1,x2,y2){
	var r=this._r(x1,y1,x2,y2);
	var r2=r/2.6;
	var len=this.jiaoNum*2;
	var ag=360/len;
	this.o.beginPath();
	for(var i=0;i<len;i++){
		if(i%2==0){
			this.o.lineTo(x1+Math.cos(i*ag*Math.PI/180)*r,y1+Math.sin(i*ag*Math.PI/180)*r);
		}else{
			this.o.lineTo(x1+Math.cos(i*ag*Math.PI/180)*r2,y1+Math.sin(i*ag*Math.PI/180)*r2);
		}		
	}
	this.o.closePath();	
	this.o[this.style]();
}
//用笔画
palette.prototype.pencil=function(){
	var that=this;
	this.copy.onmousedown=function(e){
		var dx=e.offsetX;
		var dy=e.offsetY;
		that.o.beginPath();
		that.reset();
		that.copy.onmousemove=function(e){
			var mx=e.offsetX;
			var my=e.offsetY;
			that.o.clearRect(0,0,that.width,that.height);
			if(that.history.length>0){
				that.o.putImageData(that.history[that.history.length-1],0,0,0,0,that.width,that.height);
			}
			that.o.lineTo(mx,my);
			that.o.stroke();
		}
		document.onmouseup=function(){
			that.copy.onmousemove=null;
			document.onmouseup=null;
			that.history.push(that.o.getImageData(0,0,that.width,that.height));
			that.o.closePath();	
		}
	}
}

palette.prototype._r=function(x1,y1,x2,y2){
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}