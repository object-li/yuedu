<template>
    <div class="channel-item channel-top10">
        <h3>{{type}}频道 TOP10</h3>
        <ul class="channel-list">
            <li v-for="(list,index) in lists" :key="index">
                <router-link :to="'/detail/'+list.id">{{list.title}}</router-link>
                <div>
                    <span>文：{{list.author}}</span>
                    <span>主播：{{list.podcast}}</span>
                </div>
            </li>        
         </ul>
    </div>
</template>
<script>
import bus from '../bus.js'
export default {
    name:"channelTop",
    data(){
        return {
            lists:[],
            type:"悦读"
        }
    },
    watch: {
        '$route': {
            handler(to) {
                this.lists=[];
                this.axios.get("http://localhost:3000/api/articles/"+to.params.id+"/top10").then(({data})=>{
                    this.type=data.res.type;
                    this.lists=this.lists.concat(data.res.articles);
                }).catch(error=>{
                    console.log(error);
                })
            },
            immediate:true
        }
    }
}
</script>
<style scoped>
 .channel-item {
    padding: 30px;
    background: #FFF;
    margin-bottom: 30px;
    overflow: hidden;
}
.channel-item h3{
    font-size: 14px;
    border-left: 3px solid #ee5044;
    padding-left: 8px;
    line-height: 16px;
}
.channel-list {
    padding-top: 30px;
}
.channel-list a:hover{
    color: #ee5044;
}
.channel-top10 li {
    padding-bottom: 10px;
    margin-bottom: 10px;
    line-height: 20px;
    margin-left: 20px;
    font-size: 12px;
    border-bottom: 1px solid #EEE;
}
.channel-list li div span {
    margin-right: 20px;
    color: #999;
}
</style>