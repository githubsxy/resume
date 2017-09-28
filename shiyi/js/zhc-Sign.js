$(document).ready(function(){
	$('.zhc-floor1')[0].addEventListener('touchstart',function(){
		$('.zhc-floor1 img').attr('src','../img/zhc/zhc-sign3_03.png')
		var day=$('.zhc-floor1 h6 span').html(1)
		console.log(day)
	})
})