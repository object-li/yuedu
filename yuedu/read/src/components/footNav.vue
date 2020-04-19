<template>
    <div class="foot-wrap">
        <div class="foot">
            <div class="img">
                <div>捐</div>
                <div><i class="weixin"></i></div>
                <div><i class="sina"></i></div>
            </div>
            <div class="about">
                <div class="con">
                    <a href="javascript:void(0)">关于我们 &nbsp;|&nbsp; </a>
                    <a href="javascript:void(0)">加入我们</a>
                </div>
            </div>
            <div class="intro"> © 2010-2016 Yuedu.fm All rights reserved粤ICP备14076392号</div>
        </div>
    </div>
</template>
<script>
export default {
    name:"footNav"
}
</script>
<style scoped>
    .foot-wrap {
        width: 100%;
    }
    .foot .about {
        padding-bottom: 8px;
        overflow: hidden;
    }
    .foot .about a {
        font-size: 12px;
        color: #707070;
    }
    .intro {
        font-size: 12px;
        color: #aaa;
    }
    .foot {
        width: 1010px;
        margin: auto;
        padding-bottom: 40px;
    }
    .foot .img {
        float: right;
    }
    .foot .img div {
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        position: relative;
        border-radius: 50%;
        background: #DDD;
        font-size: 20px;
        display: inline-block;
        margin-left: 10px;
        color: #707070;
    }
    .foot .img div i {
        display: inline-block;
        width: 25px;
        height: 25px;
        vertical-align: middle;
    }
    .foot .img div .sina {
        background:url(../assets/sina.png) no-repeat 1px -2px;
    }
    .foot .img div .weixin{
        background:url(../assets/weixin.png) no-repeat 0px 0px;
    }
</style>