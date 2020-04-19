<template>
    <div>
        <ul class="channels">
            <li v-for="(list,index) in lists" :key="index">
                <div class="channel-pic fl">
                    <router-link :to="'/detail/'+list.id">
                        <img :src="list.img_url">
                    </router-link>
                </div>
                <div class="channel-body">
                    <div class="channel-title">
                        <router-link :to="'/detail/'+list.id">{{list.title}}</router-link>
                    </div>
                    <div class="channel-meta">
                        <span><i class="fa fa-pencil"></i>{{list.author}}</span>
                        <span><i class="fa fa-microphone"></i>{{list.podcast}}</span>
                        <span><i class="fa fa-clock-o"></i>{{list.created_time}}</span>
                        <span><i class="fa fa-headphones"></i>{{list.play_time}}次</span>
                    </div>
                    <div class="channel-desc" v-html="list.content"></div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import bus from '../bus.js'
export default {
    name:"listItem",
    data(){
        return {
            lists:[],
        }
    },
    created(){
        bus.$emit("send-type_id",this.$route.params.id);
        this.getVal(1);
        bus.$on("send-id",data=>{
            this.getVal(data);
        })
        bus.$on("send-page",data=>{
            this.getVal(data);
        })
    },
    methods:{
        getVal(val) {
            this.lists=[];
            this.axios.get("http://localhost:3000/api/articles/"+this.$route.params.id+"/page/"+val).then(({data})=>{
                this.lists=this.lists.concat(data.res.articles);
                bus.$emit("send-num",data.res.count);
            }).catch(error=>{
                console.log(error);
            })
        }
    }
}
</script>
<style  scoped>
.channels li {
    overflow: hidden;
    margin-bottom: 30px;
    background: #FFF;
}
.fl {
    float: left;
}
.channel-pic {
    height: 210px;
    width: 210px;
    overflow: hidden;
}
.channel-body {
    margin-left: 210px;
    padding: 30px;
}
.channel-title {
    font-size: 18px;
    margin-bottom: 10px;
}
.channel-title a:hover {
     color: #ee5044
}
.channel-meta {
    margin-bottom: 25px;
    color: #999;
}
.channel-meta span {
    font-size: 12px;
    display: inline-block;
    margin-right: 15px;
}
.fa {
    display: inline-block;
    width: 18px;
    height: 15px;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    vertical-align: middle;
}
.fa-pencil {
    background: url(../assets/pencil.png) no-repeat 1px 1px;
}
.fa-microphone {
    background: url(../assets/speaking.png) no-repeat 1px 1px;
}
.fa-clock-o{
    background: url(../assets/time.png) no-repeat 1px 1px;
}
.fa-headphones {
     background: url(../assets/listen.png) no-repeat 1px 1px;
}
.channel-desc {
    height: 40px;
    line-height: 22px;
    letter-spacing: 1px;
    font-size: 12px;
    color: #707070;
    word-wrap: break-word;
    overflow: hidden;
}
</style>