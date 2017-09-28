'use strict'
$(document).ready(function(){
	 $('.next-page ').click(function () {
        $.fn.fullpage.moveSectionDown();
    });
     $('#resume').fullpage({
     	'navigation': true,
        'navigationTooltips':['个人简历','基本资料','专业技能','项目经验','自我评价'],
        'anchors': ['page1', 'page2', 'page3', 'page4','page5'],
		'menu': '#menu',
		'scrollingSpeed': 700,//滚动速度
		'easing': 'easeInOut',
		'afterRender':function(){
			 if ($('.navbar-toggle').css('display') == 'block') {
		        $('.navbar-collapse li').on('click', function () {
		          	$('.navbar-toggle').trigger('click');
		      	});
		    }
			$('#fp-nav').addClass('hidden-xs');
        	// 为了避免标签太多同一时间加载的话在刚载入页面时候产生怪异感，所有动画元素初始都是hidden的
			setTimeout(function () {
		        $('.item-1 .corner').show();
		        $('.resume-hide').show();
		    }, 500);
		},
		// 滚动触发后结束前回调
      	onLeave: function (index, nextIndex, direction){
      		switch (index) {
		        case 1:
		            $('.item-1 .corner').hide();
		            $('.resume-hide').hide();
		            $('.navbar').removeClass('black');
		            break;
		        case 2:
		            if (direction == 'down') {
		              	$('.item-2 .icon-infomation').addClass('zoomOutUp');
		              	setTimeout(function () {
		                	$('.item-2 .icon-infomation').removeClass('zoomOutUp');
		                	$('.item-2 .container').hide();
		              	}, 500);
		            } else {
		              $('.item-2 .container').hide();
		            }
		            break;
		        case 3:
		            $('.item-3 .container').hide();
		            $('.navbar').removeClass('blue');
		            break;
		        case 4:
		            $('.navbar').removeClass('blue');
		            break;
		    }
      	},
      	// 滚动结束后回调
      	afterLoad: function (anchorLink, index) {
      		switch (anchorLink) {
		        case 'page1':
		            $('.item-1 .corner').show();
		            $('.resume-hide').show();
		            $('.navbar').addClass('black');
		            break;
		        case 'page2':
		            $('.item-2 .container').show();
		            break;
		        case 'page3':
		            $('.navbar').addClass('blue');
		            $('.item-3 .container').show();
		            break;
		        case 'page4':
		        	$('.navbar').addClass('black');
		            break;
		        case 'page5':
		            break;
		        }
      	},
    });
})
