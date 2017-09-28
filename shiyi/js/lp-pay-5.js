$().ready(function(){
	var aa=$("input[type='password']");
	var number=0;
	var arr=[];
	for(var i = 0; i<aa.length;i++){
		 var t = aa[i];
         t.index = i;
         t.setAttribute("readonly", true);
         t.onkeyup=function(){
     		$('.line div').addClass('color');
  			$('.line div').each(function(index,val){
  				if(aa[index].value.length==0){
  					$('.line div').eq(index).removeClass('color');		
  				}
  			})
  			if($('.color').length==6){
				$('.cover').removeClass('active');
        		$('.return')[0].addEventListener('touchstart',function(){
        			location.href='https://htmlpreview.github.io/?https://raw.githubusercontent.com/shiyi207/shiyi/master/html/index.html';
        		})
			}
            this.value=this.value.replace(/^(.).*$/,'$1');
            var next = this.index + 1;
            if(next > aa.length - 1) return;
            aa[next].removeAttribute("readonly");
            aa[next].focus();
        }
	}
	aa[0].removeAttribute("readonly");
//		资料-跳转
//		 var txts = document.getElementsByTagName("input");
//              for(var i = 0; i<txts.length;i++){
//                  var t = txts[i];
//                  t.index = i;
//                  t.setAttribute("readonly", true);
//                  t.onkeyup=function(){
//                      this.value=this.value.replace(/^(.).*$/,'$1');
//                      var next = this.index + 1;
//                      if(next > txts.length - 1) return;
//                      txts[next].removeAttribute("readonly");
//                      txts[next].focus();
//                  }
//              }
//              txts[0].removeAttribute("readonly");
	

})
