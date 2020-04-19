<template>
    <div>
        <div class="comments clearfix">
            <input class="inp" type="text" placeholder="说点什么吧!" v-model.trim="msg">
            <button class="btn" @click="add">评论</button>
        </div>
        <div class="comment-con">
            <div class="comment-num">最新评论({{comments.length}})</div>
            <ul class="comment-lists"  v-if="comments.length==0">
                <div class="info">暂无评论</div>
            </ul>
            <ul class="comment-lists" v-else>
                <li v-for="(comment,index) in comments" :key="index">
                    <div class="avatar">
                        <img :src="comment.avatar" alt="">
                    </div>
                    <div class="comment-infos">
                        <div class="comment-meta">
                            <a href="javascript:void(0)" class="comment-user">{{comment.nikiname}}</a>
                            <span>{{comment.reply_time}}</span>
                        </div>
                        <p class="comment-msg">{{comment.content}}</p>
                    </div>
                    <a href="javascript:void(0)" class="del" v-if="(userId==comment.user_id)" @click="del(comment.id)">
                        <span>删除</span>
                    </a>
                </li>
            </ul>
        </div>
      
    </div>
</template>
<script>
import bus from '../bus.js'
export default {
    name:"discuss",
    data() {
        return {
            comments:"",
            msg:"",
            userId:localStorage.getItem("userId")
        }
    },
    methods:{
        add() {
            if(localStorage.getItem("key")) {
                if(this.msg.length) {
                    this.axios.post("http://localhost:3000/api/comment",
                    {
                        article_id: Number(this.$route.params.id),
                        content: this.msg,
                    },
                    {
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization':'Bearer '+localStorage.getItem("key")
                        },
                    }).then(res=>{
                        this.msg="";
                        this.getlist();
                    }).catch(error=>{
                        console.log(error);
                    })
                }else {
                    alert("请输入评论内容");
                }
            }else {
                alert("请登录");
            }  
        },
        getlist(){
            this.comments=[];
            this.axios.get("http://localhost:3000/api/comments/"+this.$route.params.id+"/page/1").then(({data})=>{
            if(data.res_code===200) {
                this.comments=this.comments.concat(data.res);
            }else {
                this.comments="";
            }
            }).catch(error=>{
                console.log(error);
            })
        },
        del(val) {
            this.axios.delete("http://localhost:3000/api/comment/"+val,
            {
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+ localStorage.getItem("key")
                },
            }).then(res=>{
                this.getlist();
            }).catch(error=>{
                console.log(error)
            })
        }
    },
    watch:{
        '$route':{
            handler(to) {
               this.getlist();
            },
            immediate:true
        },
    }
}
</script>
<style scoped>
.comments .inp {
    float: left;
    width: 530px;
    padding: 10px;
    height: 30px;
    line-height: 16px;
    font-size: 12px;
    outline: none;
    border: none;
    background-color: #fff;
}
.comments .btn {
    float: right;
    width: 70px;
    height: 50px;
    line-height: 50px;
    font-size: 12px;
    color: white;
    border: none;
    outline: 0;
    cursor: pointer;
    text-align: center;
    background: #ee5044;
}
.comment-con {
    margin-top: 30px;
}
.comment-num {
    width: 83px;
    font-size: 12px;
    padding: 0 15px;
    color: #ee5044;
    cursor: pointer;
    line-height: 40px;
    background-color: #fff;
}
.comment-lists {
    padding: 30px 30px 0;
    background: #FFF;
}
.comment-lists li {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px dashed #EEE;
    overflow: hidden;
}
.comment-lists .avatar {
    margin-right: 15px;
}
.comment-lists .avatar, .comment-infos {
    float: left;
}
.comment-meta {
    line-height: 22px;
    margin-bottom: 5px;
}
.comment-infos p {
    margin-bottom: 15px;
    font-size: 12px;
    color: #707070;
}
.comment-meta .comment-user {
    color: #707070;
    font-size: 14px;
    font-weight: bold;
}
.comment-meta span {
    margin-left: 8px;
    font-size: 12px;
    color: #999;
}
.comment-lists .avatar img {
    width: 40px;
    height: 40px;
}
.comment-con {
    margin-top: 30px;
}
.clearfix {
    overflow: hidden;
}
.info {
    padding: 0 0 30px;
    text-align: center;
}
.del {
    float: right
}
.del span {
    font-size: 13px;
    color: #ee5400;
}
</style>