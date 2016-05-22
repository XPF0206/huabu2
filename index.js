$(function(){
	var can,cobj,palt;
	var $copy=$(".copy");
	$(".tianjia").click(function(){
		var w=1038;
		var h=500;
		can=$("<canvas id='can' width="+w+" height="+h+"></canvas>")[0];
		$(can).appendTo(".palette-right");
		$copy.css({width:w,height:h});
		cobj=can.getContext("2d")
	    palt=new palette(cobj,can,$copy[0]);
	        palt.draw();
	        draw();
	})
	function draw(){
		$("#line").click(function(){
           palt.type=this.id;
           alert(1)
           palt.draw();
	    })
	    $("#arc").click(function(){
           palt.type=this.id;
           palt.draw();
	    })
	      $("#poly").click(function(){
           palt.type=this.id;
           palt.draw();
	    })
	      $("#poly").click(function(){
           palt.type=this.id;
           palt.polyNum=prompt("请输入多边形的边数")
           palt.draw();
	    })
	      $("#jiao").click(function(){
           palt.type=this.id;
           palt.jiaoNum=prompt("请输入五角星的角数")
           palt.draw();
	    })
	     $("#pencil").click(function(){
           palt.type=this.id;
           palt.pencil();
	    })
	     $("#rect").click(function(){
           palt.type=this.id;
           palt.draw();
	    })
	     $(".cexiao").click(function(){
	     	 var end=palt.history.pop();
	     	 if(palt.history.length>0){
	     	 	palt.o.putImageData(palt.history[palt.history.length-1],0,0,0,0,palt.width,palt.height);
	     	 }else{
	     	 	palt.o.clearRect(0,0,palt.width,palt.height);
	     	 	alert("不能在撤销了")
	     	 }
	     })
	     $(".baocun").click(function(){
	     	location.href=can.toDataURL('image/png').replace("image/png","image/octet-stream")
	     })
	   } 
	 $("#fill").click(function(){
	     	 palt.style="fill"
	   })
	 $("#stroke").click(function(){
	 	  palt.style="stroke"
	 })
	 $("#lineWidth").change(function(){
	 	    palt.lineWidth=this.value
	 })
	 $("#color").change(function(){
	 	   palt.fillStyle=this.value
	 })
	 $("#color2").change(function(){
	 	   palt.strokeStyle=this.value
	 })
	 $(".bj").change(function(){
	    document.style.background="red"
	 })

})