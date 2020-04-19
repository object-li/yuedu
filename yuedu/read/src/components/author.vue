<template>
     <div class="user">
        <div class="user-base">
            <div class="user-avatar">
                <img src="http://yuedufm.com/static/file/member/af9a2de111219abf34e65c2ed489e28b" alt="">
            </div>
            <div class="user-con">
                <div class="user-name">
                    {{info.author}}
                    <i></i>
                </div>
                <div class="user-info">
                    <div class="user-status">
                        作品：7 <br> 粉丝：91
                    </div>
                    <a href="javascript:void(0)" class="user-focus">关注</a>
                </div>
            </div>
        </div>
        <div class="item-status">
            <span class="good item" @click="like">
                <span class="item-s-b item-s-b1">
                    <i class="icon1"></i>
                    <span class="item-s-tip item-s-tip1">赞</span>
                </span>
                <span id="click_num">{{info.like_count}}</span>
            </span>
            <span class="collect item">
                <span class="item-s-b item-s-b2">
                    <i class="icon2"></i>
                    <span class="item-s-tip item-s-tip2">收藏</span>
                </span>
                <span id="collect_num">{{info.collection_count}}</span>
            </span>
            <span class="reward item">
                <span class="item-s-b item-s-b3" >
                    <i class="icon3"><strong>赏</strong></i>
                    <span class="item-s-tip item-s-tip3">打赏</span>
                </span>
                <span class="item-s-img">
                    <img src="http://yuedufm.com/static/file/dashang/2ed5f10c5ccd79f6f28c796c8069b54a"> 
                </span> 
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name:"author",
    data(){
        return {
            info:"",
            num:1
        }
    },
    methods:{
        like() {
            if(localStorage.getItem("key")) {
                if(this.num%2!=0) {
                    this.axios.post('http://localhost:3000/api/article/'+this.$route.params.id+'/like',
                    {
                        like:1
                    },
                    {
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization':'Bearer '+localStorage.getItem("key")
                        }
                    }).then(res=>{
                        if(res.data.res_msg=="请求成功") {
                            this.getVal();
                            this.num+=1;
                        }else {
                            alert("请重新登录")
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }else {
                    this.axios.delete('http://localhost:3000/api/article/'+this.$route.params.id+'/like',
                    {
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization':'Bearer '+localStorage.getItem("key")
                        }
                    }).then(res=>{
                        this.getVal();
                        this.num-=1;
                    }).catch(err=>{
                        console.log(err)
                    })
                } 
            }else {
                alert("请先登录");
            }
        },
        getVal(){
             this.axios.get("http://localhost:3000/api/article/"+this.$route.params.id).then(({data})=>{
                this.info=data.res;
            }).catch(error=>{
                console.log(error);
            })
        }
    },
    watch:{
        '$route': {
            handler(to) {
                this.getVal();
            },
            immediate:true
        }
    }
}
</script>
<style scoped>
 .user {
    position: relative;
    margin-bottom: 30px;
    background-color: #fff;
}
.user-base {
    padding: 30px;
    border-bottom: 1px dashed #EEE;
    overflow: hidden;
}
 .user-avatar,  .user-con {
    float: left;
}
.user-avatar img {
    width: 80px;
    height: 80px;
}
.user-con {
    color: #707070;
    margin-left: 26px;
}
.user-con .user-name {
    padding-bottom: 15px;
    font-size: 16px;
}
 .user-name i {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: url(../assets/speaking.png) no-repeat 0px 0px;
}
.user-con .user-info {
    font-size: 12px;
    overflow: hidden;
}
.user-status {
    float: left;
}
.user-focus {
    float: right;
    height: 30px;
    line-height: 30px;
    margin-left: 78px;
    padding: 0 15px;
    font-size: 12px;
    color: white;
    font-size: 12px;
    background-color: #ee5044;
}
.item-status {
    padding: 20px 0;
    text-align: center;
}
.item {
    display: inline-block;
    line-height: 52px;
    font-size: 18px;
    color: #707070;
    margin: 0 35px 0 0;
}
.item-status .item-s-b {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 1px solid #ACACAC;
    line-height: 50px;
    text-align: center;
    color: #999;
    margin-right: 15px;
    border-radius: 50%;
    font-size: 18px;
}
.item-s-b i {
    display: inline-block;
    width: 25px;
    height: 25px;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    vertical-align: middle;
}
.good i {
    background: url(../assets/good.png) no-repeat 6px 0px;
}
.item-s-tip {
    display: none;
    font-size: 12px;
    color: #fff;
}
.collect i {
    background: url(../assets/love.png) no-repeat 4px 2px;
}
.item-status .reward {
    margin: 0;
}
.item-s-img {
    display: none;
    position: absolute;
    margin-left: -50px;
    margin-top: -260px;
}
.item-s-b1:hover .icon1, .item-s-b2:hover .icon2,.item-s-b3:hover .icon3 {
    display: none;
}
.item-s-b1:hover .item-s-tip1,.item-s-b2:hover .item-s-tip2,.item-s-b3:hover .item-s-tip3 {
    display: inline;
}
.item-s-b1:hover,.item-s-b2:hover {
    background-color: #999;
}
.item-s-b3:hover {
    border-color: #d7382c;
    background-color:#d7382c;
}
.reward:hover .item-s-img {
    display: block;
}
</style>