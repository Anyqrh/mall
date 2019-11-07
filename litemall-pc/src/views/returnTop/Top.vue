<template>
    <div class="top">
        <div class="return" title="返回顶部" @click="top"><i class="iconfont icon-arrow-top"></i></div>
    </div>
</template>

<script>
    export default {
        name: "Top",
        created(){
            this.hide()
        },
        methods:{
            top(){
                $('html,body').animate({scrollTop:0},1000)
            },
            hide(){
                $(window).scroll(function(){
                    var scroll = $(window).scrollTop()
                    // console.log(scroll)
                    if(scroll>400){
                        $(".return").css({"display":"block"})
//						$('#btn').fadeIn(500)
                    }else{
                        $(".return").css({"display":"none"})
//						$('.return').fadeOut(500)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .return {
        position: fixed;
        bottom: 200px;
        right: 20px;
        z-index: 99;
        width: 50px;
        height: 50px;
        background-color: #000;
        opacity:0.5;
        display: none;
    }

    .return:hover{
        opacity:0.7;
    }

    .icon-arrow-top{
        font-size: 20px;
        line-height: 50px;
        margin-left: 15px;
        color: #fff;
    }
</style>