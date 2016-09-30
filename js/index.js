$(function(){
	var cw=$(window).outerWidth(true);
	var ch=$(window).outerHeight(true);
	$('body').css({
		width:cw,
		height:ch,
		background:'#000',
		background:'url(../image/bigbg.jpg) no-repeat center',
	})
	function makepoker(){
		var poker=[];
	    var colors=['h','s','c','d'];
	    var biao={};
		while(poker.length!==52){
		var c=colors[Math.floor(Math.random()*4)];
		var n=Math.ceil(Math.random()*13);
		var v={
			color:c,
			number:n,
		}
		if(!biao[c+n]){
			poker.push(v);
			biao[c+n]=true;
		}
	 }
	 return poker;
	}
	function setpoker(poker){
		var index=0;
		var dict={
		1:'A',
		2:2,
		3:3,
		4:4,
		5:5,
		6:6,
		7:7,
		8:8,
		9:9,
		10:'T',
		11:'J',
		12:'Q',
		13:'k',
	}
	for (var i = 0; i < 7; i++) {
    	 for (var j = 0,poke; j < i+1; j++) {
	    	index+=1;
	        poke=poker[index];
		    $("<div>")
		     .attr('id',i+'_'+j)
		     .attr('data-number',poke.number)
	         .addClass('pai')
			 .css('background-image','url(./image/'+dict[poke.number]+poke.color+'.png)')
			 .appendTo('.scene') 
			 .delay(index*30)
			 .animate({
			 	top:i*40,
			 	left:j*130+(6-i)*65,
			 	opacity:1,
			 })
    	 };
    }	
     for (;index <poker.length; index++) {	
    		v=poker[index];
    		index+=1;
    		 $("<div>")
    		 // .attr('id',i+'_'+j)
    		 .attr('data-number',v.number)
	         .addClass('pai left')
			 .css('background-image','url(./image/'+dict[v.number]+v.color+'.png)')
			 .appendTo('.scene')
			 .delay(index*30) 
			 .animate({
			 	top:430,
			 	left:195,
			 	opacity:1,
			 })
    	};	
	}
	// setpoker(makepoker());
	var moveright=$('.moveright');
	var moveleft=$('.moveleft');
	var zIndex=1;
	moveright.on('click',function(){
	 if($('.left').length){
		$('.left').last()
		.css('z-index',zIndex++)
		.animate({left:480})
		.queue(function(){
			$(this).removeClass('left').addClass('right').dequeue();
		})
	  }
	})
	var number=0;
	moveleft.on('click',function(){
		number+=1;
	   if($('.left').length){return;}
	   if(number>3){return;}
		$('.right').each(function(i,v){
			$(this)
			.css('z-index',0)
			.delay(i*50)
			.animate({left:195})
			.queue(function(){
			$(this).removeClass('right').addClass('left').dequeue();
		})
	  })
	})
	var prev=null;
	function getNumber(el){
		return parseInt($(el).attr('data-number'));
	}
	var scores=0;
	var painum=52;
	var leftt=$('.left-title1');
	var paidata=$('.pai-data');
	$('.scene').on('click','.pai',function(){
		if($(this).attr('id')&&!iscanclick(this)){return}
		var number=parseInt($(this).attr('data-number'))
		if(number===13){
			$(this)
			 .animate({
				top:0,
				left:700,
			}).queue(function(){
				$(this).detach().dequeue();
			})
			scores++;
			painum--;
			leftt.text(scores);
			paidata.text(painum);
			return;
		}else{
			if(prev){
				if(getNumber(prev)+getNumber(this)===13){
					prev.add(this).animate({
					top:0,
					left:700,
				   }).queue(function(){
					$(this).detach().dequeue();
				  })
				  scores++;
				  leftt.text('得分'+scores);
				  painum-=2;
				  paidata.text('牌数'+painum)
				}else{
					if($(this).attr('id')===$(prev).attr('id')){
						$(this).animate({
							top:"+=20"
						})
					}else{
						$(this).animate({
						top:'-=20',
					}).animate({
						top:'+=20'
					})
					prev.delay(400).animate({
						top:'+=20',
					})
				  }
				} 
				prev=null;
			}else{
				prev=$(this);
				prev.animate({
					top:'-=20',
				})
			}
		}
     function iscanclick(el){
     	var x=parseInt($(el).attr('id').split('_')[0]);
     	var y=parseInt($(el).attr('id').split('_')[1]);
     	if($('#'+(x+1)+'_'+y).length||$('#'+(x+1)+'_'+(y+1)).length){
     		return false;
     	}else{
     		return true;
     	}
     }

	}) 
	   var time=$('.time');
       var m=0;
		var s=0;
		var h=0;
		var ms=0;
 function gettime(){
	   	  ms+=1;
	      if(ms>9){
	   	    s+=1;
	   	    ms=0;
		   }
		   if(s>5){
		   	 s=0;
		   	 m+=1;
		   }
		   if(m>9){
		   	  m=0;
		   	  s+=1;
		   }  
		   if(h==1){
	       
		   	alert('游戏结束');
		   	$(".scene .pai").detach();
		   } 
		   time.text("定时器"+h+m+':'+s+ms);
	   }
      var reset=$('.reset');
      var flag=true;
      reset.on('click',function(){
   	  scores=0;
   	  painum=52;
   	  leftt.text('得分'+scores);
   	  paidata.text('牌数'+painum)
   	  $('.scene .pai').detach();
   	  setpoker(makepoker());
   	  if(flag){
	    t=setInterval(gettime,1000)
	   flag=false;
	   return flag;
	  }else{
	  	 m=0;
		 s=0;
		 h=0;
		 ms=0;
	  	 clearInterval(t);
	  	 t=setInterval(gettime,1000)
	  }
   })
   var play=$('.play');
   play.on('click',function(){
 	  // $('.rule').animate({
 	  // 	 opacity:1
 	  // })
 	  $('.rule').fadeIn();
   })
   var entertitle=$('.enter-title');
   entertitle.on('click',function(){
   	  $('.enter').animate({
   	  	opacity:0,
   	  });
   	  $('.box').animate({
   	  	opacity:1,
   	  })
   })
   var  getover=$('.get-ovre');
   getover.on("click",function(){
   	  scores=0;
   	  painum=52;
   	  leftt.text('得分'+scores);
   	  paidata.text('牌数'+painum)
   	  $('.scene .pai').detach();
   	   m=0;
	   s=0;
	   h=0;
	   ms=0;
	   clearInterval(t);
	   time.text("定时器"+h+m+':'+s+ms);
   })
})