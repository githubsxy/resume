/**
 * Created by Administrator on 2017/4/10.
 */
'use strict'
$(document).ready(function () {
    //定义一个数组存放52张牌，每张牌是一个对象，包括花色和数字
    //{huase:'h',shuzi:2}
    let arr=[];
    let huasearr=['c','d','h','s'];//四种花色
    let sign={};
    // {
    //     2_c:true,
    //     3_d:true
    // }
    //产生52张牌。随机
    while (arr.length<52){
        let shuzi=Math.ceil(Math.random()*13);//随机产生1——13的一个数
        let huase=huasearr[Math.floor(Math.random()*huasearr.length)];//随机产生一个花色
        //产生的对象不能重复
        if(!sign[shuzi+'_'+huase]){
            sign[shuzi+'_'+huase]=true;
            arr.push({shuzi,huase});
        }
    }
    //把图片绘制到页面中
    let n=0;//数组中第0张图片
    //发牌，塔形，第一排一张，第二排两张...共七牌  共发了28张牌
    for(let i=0;i<7;i++){//行数
        for(let j=0;j<i+1;j++){//每行张数
            $('<li class="card">').attr('id',i+'_'+j).attr('value',arr[n].shuzi).css('background-image',`url(img/${arr[n].shuzi}${arr[n].huase}.png`).appendTo('ul').delay(n*50).animate({
                left:300-50*i+100*j,
                top:50*i,
                opacity:1
            },400);
            n++;//最后n=28，下一张的下标为28
        }
    }
    //剩余的牌发在左下角
    for(;n<52;n++){
        $('<li class="card zuo">').attr('id','7_'+n).attr('value',arr[n].shuzi).css('background-image',`url(img/${arr[n].shuzi}${arr[n].huase}.png`).appendTo('ul').delay(n*50).animate({
            left:100,
            top:460,
            opacity:1
        },400);
    }
    //给牌添加点击事件
    let current=null;//存放当前点击的那一张
    $('li').click(function () {
        let x=parseInt($(this).attr('id').split('_')[0]);//存放当前点击的
        let y=parseInt($(this).attr('id').split('_')[1]);

        //压着的不能被点击到
        if(x<6){//2_1被3_1 和3_2压着
            if($(`#${x+1}_${y}`).length==1 || $(`#${x+1}_${y+1}`).length==1){
                return;
            }
        }
        $(this).toggleClass('active');//点击到的添加类名
        if(!current){
            //当点击到13直接移除
            if($(this).attr('value')==13){
                $(this).animate({
                    left:100,
                    top:0,
                    opacity:0,
                },function () {
                    $('.active').remove();
                    current=null;
                })
            }else{
                current=$(this);
            }
        }else{
            //当两张牌之和为13时，移除
            if(parseInt(current.attr('value'))+parseInt($(this).attr('value'))==13){
                $('.active').animate({
                    left:100,
                    top:0,
                    opacity:0,
                },function () {
                    $('.active').remove();
                    current=null;
                })
            }else{
                setTimeout(function () {
                    $('.active').removeClass('active');
                    current=null;
                },400);

            }
        }
    });

    let index=1;
    $('.right').click(function () {
        $('.zuo').last().addClass('you').removeClass('zuo').css('z-index',++index).each(function (index) {
           $(this).delay(index*50).animate({
               left:510
           },400)
        })
    });

    $('.left').click(function () {
        $('.you').addClass('zuo').removeClass('you').css('z-index',++index).each(function (index) {
            $(this).delay(index*50).animate({
                left:100
            },400)
        })
    })




});