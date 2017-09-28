window.onload=function(){
	var uls=document.querySelectorAll('.zhc-zl-two')
	uls.forEach((value,index)=>{
		var down=value.querySelector('.li-right > div');
		down.addEventListener('touchstart',function(){
			var kuai=down.querySelector('.zhc-right-full');
			var circle=down.querySelector('.zhc-right-circle');
			kuai.classList.toggle('move');
			circle.classList.toggle('moves');
		})

	})
}