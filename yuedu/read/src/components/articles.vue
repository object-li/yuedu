<template>
    <div>
        <div class="item">
            <div class="item-base">
                <div class="tit">{{content.title}}</div>
                <div class="info">
                    <span class="info-l">
                        <em><i class="writer"></i>{{content.author}}</em>
                        <em><i class="listener"></i>{{content.podcast}}</em>
                        <em><i class="clock"></i>{{content.duration}}</em>
                    </span>
                    <span class="info-r">播放 <span class="num">{{content.play_time}}</span> 次</span>
                </div>
                <div class="pic">
                    <img :src="content.img_url" alt="爱因斯坦的梦——因果不定的世界 - 悦读FM">
                </div>
                <audio :src="content.mp3_url" controls></audio>
            </div>
            <div class="item-main">
                <div v-html="content.content" :class="['article',{control:this.remind=='展开全文'}]"></div>
                <div class="hint">
                    <a href="javascript:void(0)" @click="change">{{remind}}</a>
                    <i :class="[{change:remind=='收起'}]"></i>
                </div>
            </div>
            <div class="item-footer clearfix">
                <div class="left">
                    <strong>标签: </strong>
                    <a href="javascript:void(0)" v-for="(label,index) in labels" :key="index">{{label}}</a>
                </div>
                <div class="right">
                    <a href="javascript:void(0)" class="sina"   title="分享到新浪微博"></a>
                    <a href="javascript:void(0)" class="douban" title="分享到豆瓣网"></a>
                    <a href="javascript:void(0)" class="qq"     title="分享到QQ空间"></a>
                    <a href="javascript:void(0)" class="weixin" title="分享到微信"></a>
                </div>
            </div>
        </div>
        <div class="item-pg clearfix">
           <span class="fl" @click="pre(content.id)">
               <a href="javascript:void(0)" >
                    <i></i> 
                    上一篇
               </a>
            </span>
            <span class="fr" @click="next(content.id)">
                <a href="javascipt:void(0)">
                    下一篇 
                    <i></i>
                </a>
            </span>
        </div>
    </div>
</template>
<script>
import bus from '../bus.js'
    export default {
        name:"articles",
        data(){
            return {
                remind:"展开全文",
                content:"",
                labels:[]
            }
        },
        methods: {
            change(e) {
                this.remind=e.target.innerHTML=="收起"?"展开全文":"收起";
            },
            pre(val) {
                val=val<=1?2:val
                this.$router.push('/detail/'+(val-1));
            },
            next(val) {
                val=val>=1025?1024:val;
                this.$router.push('/detail/'+(val+1));
            },
        },
        watch:{
            '$route':{
                handler(to){
                    this.axios.get("http://localhost:3000/api/article/"+to.params.id).then(({data})=>{
                        this.content=data.res;
                        this.labels=this.content.labels.split(",");
                        bus.$emit("change-txt",data.res.type_id)
                    }).catch(error=>{
                        console.log(error)
                    })
                },
                immediate:true
            }
        }
    }
</script>
<style scoped>
.item {
    display: inline-block;
    font-size: 18px;
    color: #707070;
    margin: 0 35px 0 0;
}
.item-base {
    padding: 30px;
    margin-bottom: 25px;
    background-color: #fff;
}
.item-base .tit {
    line-height: 24px;
    margin-bottom: 8px;
    font-size: 24px;
    color: #707070;
}
.info {
    margin-bottom: 25px;
    color: #999;
    font-size: 12px;
    overflow: hidden;
}
.clearfix {
    overflow: hidden;
}
.item-footer {
    padding: 0 30px;
}
.article {
    line-height: 30px;
    font-size: 12px;
    text-indent: 20px;
    word-break: break-word;
} 
.item-main .control {
    height: 280px;
    overflow: hidden;
}
.info .info-l {
    float: left;
}
.info .info-l em {
    margin-right: 20px;
    font-style: normal;
}
.info-l .writer {
    background: url(../assets/pencil.png) no-repeat 0px 0px;
}
.info-l .listener,.user-name i{
    background: url(../assets/speaking.png) no-repeat 0px 0px;
}
.info-l .clock {
    background: url(../assets/time.png) no-repeat 0px 0px;
}  
.info-l i, .user-name i {
    display: inline-block;
    width: 14px;
    height: 13px;
    vertical-align: middle;
}
.info .info-r {
    float: right;
}
.info .info-r .num {
    font-size: 16px;
}
audio {
    width: 100%;
    margin-top: 20px;
    outline: none;
}
.item-main {
    padding: 20px 30px;  
}
.item-footer,.item-main {
    margin-bottom: 30px;
    background-color: #fff;
}
.item-footer .left {
    float: left;
    line-height: 25px;
    color: #707070;
    font-size: 12px;
}
.item-footer .left a {
    margin-right: 10px;
    color: #707070;
}
.item-footer .right {
    float: right;
}
.item-footer .right a {
    font-size: 12px;
    padding-left: 17px;
    line-height: 16px;
    height: 16px;
    background: url(http://bdimg.share.baidu.com/static/api/img/share/icons_0_16.png?v=91362611.png) no-repeat;
    cursor: pointer;
    margin: 6px 6px 6px 0;
}
.item-footer .right .douban {
    background-position: 0 -468px;
}
.item-footer .right .sina {
    background-position: 0 -104px;
}
.item-footer .right .qq {
    background-position: 0 -52px;
}
.item-footer .right .weixin {
    background-position: 0 -1612px;
}
.item-pg {
    font-size: 14px;
    padding: 0 30px;
    margin-bottom: 30px;
}
.item-pg span {
    font-size: 14px;
    color: #707070;
}
.fl {
    float: left;
}
.fr {
    float: right;
}
.fl i {
     background: url(../assets/pre.png) no-repeat 12px 5px;
}
.fr i {
     background: url(../assets/pre.png) no-repeat 11px 6px;
     transform: rotate(180deg)
}
.item-pg span i {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
}
.item-main .hint {
    text-align: right;
}
.item-main .hint a {
    color: #707070;
    font-size: 12px;
}
.hint i {
    display: inline-block;
    width: 15px;
    height: 15px;
    vertical-align: middle;
    background: url(../assets/select.png) no-repeat 3px 4px;
}
.change {
    transform: rotate(180deg);
}
.hint a:hover {
    color: #ee5044;
}
</style>