<template>
    <div class="channel-item">
        <h3>
            <a href="javascript:void(0)" @click="jump">
                查看全部 
                <i></i>
            </a>
            {{type}}FM频道其他节目
        </h3>
        <ul class="channel-list">
            <li v-for="(list,index) in lists" :key="index">
                <a href="javascript:void(0)" @click="switchTo(list.id)" >{{list.title}}</a>
                <p>
                    <span>文：{{list.author}}</span>
                    <span>主播：{{list.podcast}}</span>
                </p>
            </li>
        </ul>
    </div>
</template>
<script>
import bus from '../bus'
export default {
    name:"channelItem",
    data(){
        return {
            id:"",
            lists:[],
            type:"悦读"
        }
    },
    created() {
        bus.$on("change-txt",data=>{ 
            this.id=data;
            this.lists=[];
            this.axios.get("http://localhost:3000/api/articles/"+data+"/rand").then((res)=>{
                this.type=data==1?"悦读":data==2?"情感":data==3?"连播":data==4?"校园":data==5?"音乐":"Labs";
                this.lists=this.lists.concat(res.data.res);
            }).catch(error=>{
                console.log(error);
            })
        })
    },
    methods: {
        jump() {
            this.$router.push("/"+this.id);
            bus.$emit("send-val",(this.id-1));
        },
        switchTo(val) {
            this.$router.push("/detail/"+val);
            bus.$emit("send-val",(this.id-1));
        }
    }
}
</script>
<style  scoped>
 .channel-item {
    padding: 30px;
    margin-bottom: 30px;
    background-color: #fff;
}
.channel-item h3 {
    padding-left: 8px;
    line-height: 17px;
    font-size: 14px;
    color: #707070;
    border-left: 3px solid #ee5044;
    overflow: hidden;
}
.channel-item h3 a {
    font-size: 12px;
    font-weight: normal;
}
.channel-item h3 a i {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
}
 .channel-item h3 a {
    float: right;
}
.channel-item h3 i {
    background: url(../assets//next.png) no-repeat -1px 3px;
}
.channel-list {
    padding-top: 30px;
}
.channel-list li a:hover {
    color: #ee5044 ;
}
.channel-list li {
    padding-bottom: 10px;
    margin-bottom: 10px;
    line-height: 20px;
    border-bottom: 1px dashed #EEE;
}
.channel-list li a {
    font-size: 12px;
    color: #707070;
}
.channel-list li p {
    font-size: 12px;
    color: #999;
}
a:hover{
    color: #ee5044 !important;
}
</style>