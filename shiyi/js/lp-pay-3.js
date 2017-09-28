$().ready(function() {
		$("#signupForm").validate({
			rules:{
				user: "required",
				pass: {
				    required: true,//必填
				    minlength: 11,
				    maxlength: 11
				},
				yinhang: {
				    required: true,//必填
				    minlength: 19,
				    maxlength: 19
				},
				id: {
				    required: true,//必填
				    minlength: 18,
				    maxlength: 18
				}
			},
			errorPlacement:function(error,val){//一但验证错误就会触发函数，val是jquery对象	
			 	if(val.next('img').length==0){
					$('<img>').attr('src','../img/lp/lp-pay-3-11.png').css('width','0.24rem').insertAfter(val);
			 	}
			},
			success:function(error,val){//验证成功触发函数,dom对象		
			 	if ($(val).next('img').length!=0){
					$(val).next('img').remove();
			 	}	
			}
		})

		$('.sure1')[0].addEventListener('touchstart',function(){
			if($('.sure1').css('display')=='none'){
				$('.sure1').css('display','inline-block');
				$('.sure2').css('display','none');
			}else{
				$('.sure2').css('display','inline-block');
				$('.sure1').css('display','none');
			}
		})
		$('.sure2')[0].addEventListener('touchstart',function(){
			if($('.sure2').css('display')=='none'){
				$('.sure2').css('display','block');
				$('.sure1').css('display','none');
			}else{
				$('.sure1').css('display','block');
				$('.sure2').css('display','none');
			}
		})
		
//		键盘与fixed
		window.alert = function (msg) {
		  $('body').append('<div>' + msg + '</div>')
		};
		function fixedWatch(el) {
		  if(document.activeElement.nodeName == 'INPUT'){
		    el.css('position', 'static');
		  } else {
		    el.css('position', 'fixed');
		  }
		}
		setInterval(function () {
		  fixedWatch($('.lp-footer'));
		}, 500);

	})