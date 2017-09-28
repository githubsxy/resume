$(document).ready(function(){
//	联系人数
	$('.zhc-actop h6').html($('.zhc-list li').length)
	
//	点击左滑
//$('.zhc-li-right p').each(function(index,value){
//	value.addEventListener('touchmove',function(){
//		$(this).css('right','0')
//		$(this).children().first().css('display','inline-block')
//		$(this).children('span').css('display','none')
//	})
//	value.addEventListener('touchenter',function(){
//		$(this).css('right','-1.6rem')
//		$(this).children().first().css('display','none')
//		$(this).children('span').css('display','inline-block')
//	})
//})
	$('.zhc-li-right p').hover(function(){
		$(this).css('right','0')
		$(this).children().first().css('display','inline-block')
		$(this).children('span').css('display','none')
	},function(){
		$(this).css('right','-1.6rem')
		$(this).children().first().css('display','none')
		$(this).children('span').css('display','inline-block')
	})
//		删除
	$('.zhc-li-right p img').each(function(index,value){
		value.addEventListener('touchstart',function(){
			$(this).parentsUntil('ul').remove()	
		})
	})
		
		
//	楼层跳转?
//	var arr=$.map($('.zhc-actrile ul'),function(index,val){
//		return index.offsetTop
//	})
//	console.log(arr)
//	$('.zhc-asdie li')
//	$(Window)[0].addEventListener('touchmove',)
//	
//	console.log(111)
//		var obj=document.body.scrollTop==0?document.documentElement:document.body;
//		arr.forEach(function(value,index){
//			if(obj.scrollTop>=arr[index]){
//				$('.zhc-asdie li').get().forEach(function(value,index){
//					value.classList.remove('zhc-active')
//				})
//				$('.zhc-asdie li').get()[index].classList.add('zhc-active')
//			}
//			
//		})

	
})
