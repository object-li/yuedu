<template>
    <div class="pg">
        <a href="javascript:void(0)" v-show="preshow" @click="page(curr-1)" class="pre">上一页</a>
        <a href="javascript:void(0)" v-for="(list,index) in pageNum" :key="index" @click="page(list)" :class="{active:list==curr}">{{list}}</a>
        <a href="javascript:void(0)" @click="page(curr+1)" class="next" v-show="nextshow">下一页</a>
    </div>
</template>
<script>
import bus from '../bus.js'
export default {
    name:"page",
    data(){
        return {
            preshow:false,
            nextshow:true,
            curr:1,
            totalNum:"",
        }
    },
    created(){
        bus.$on("send-id",data=>{
            this.preshow=false;
            this.nextshow=true;
            this.curr=data;
        })
        bus.$on("send-num",data=>{
            this.totalNum=Math.ceil(data/10);
        })
    },
    methods:{
        page(val){
            this.curr=val;
            this.preshow=val>=2?true:false;
            this.nextshow=val==this.totalNum?false:true;
            bus.$emit("send-page",val);
        }
    },
    computed: {
        pageNum(){
            let start;
            let end;
            let arr=[];
            if(this.totalNum>8) {
                if(this.curr>=6&&this.curr<this.totalNum-4) {
                    start=this.curr-4;
                    end=this.curr+4;
                }else if(this.curr<8) {
                    start=1;
                    end=8;
                }else {
                    start=this.totalNum-4;
                    end=this.totalNum;
                }
            }else {
                start=1;
                end=this.totalNum;
            }
            while(start<=end) {
                arr.push(start);
                start++;
            }
            return arr;
        }
    }
}
</script>
<style scoped>
    .pg {
        text-align: center;
        padding: 30px;
    }
    .pg a{
        font-size: 12px;
        padding: 3px 10px;
    }
    .pg .active {
        color: #ee5044;
        font-weight: bold;
    }
    .next {
        right: 659px;
        top: 31px;
    }
    a:hover {
         color: #ee5044;
    }
</style>