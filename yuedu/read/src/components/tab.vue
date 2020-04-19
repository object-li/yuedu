<template>
<div>
    <div class="head-wrap">
        <div class="head">
            <div class="head-l">
                <div class="logo">
                    <router-link to="/detail/6">
                    <span class="mlogo">
                        <span class="logo-a fl"></span>
                        <span class="logo-b fl"></span>
                        <span class="logo-c fl"></span>
                    </span>
                    悦读 FM
                    </router-link>
                </div>
                <div class="menu">
                    <a  href="javascipt:void(0)" v-for="(list,index) in lists" :key="index" @click="send(list.id,index)" :class="{active:index==curr}">{{list.type}}</a>
                </div>
            </div>
            <div class="head-r">
                <div class="search">
                    <input type="text">
                    <i></i>
                </div>
                <div class="fr">
                    <div class="login" v-if="!txt">
                        <a href="javascript:void(0)" @click="login">登录</a>
                        <a href="javascript:void(0)" @click="register">注册</a>
                    </div>
                    <div class="login" v-else>
                        <a href="javascript:void(0)">{{txt}}</a>
                        <a href="javascript:void(0)" @click="exit">退出</a>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    <div class="pop" id="login">
        <div class="pop-wp">
            <a href="javascript:void(0)" class="pop-close" @click="loginExit">×</a>
            <div class="pop-title">登录</div>
            <div class="account-form">
                <input type="text"  class="account-input"  placeholder="邮箱" v-model="email" @input="change">
                <div id="error_tip_email" class="error-tip">
                    <span class="error hidden">此邮箱尚未注册</span>
                    <span class="error hidden">请输入注册邮箱</span>
                </div>
                <div class="account-line"></div>
                <input type="password"  class="account-input" placeholder="密码"  v-model="password">
                <div id="error_tip_lpassword" class="error-tip">
                    <span class="error hidden">用户或密码错误</span>
                    <span class="error hidden">请输入密码</span>
                </div>
            </div>
            <div class="account-other">
                <span>
                    <a href="javascript:void(0)" class="red-link">忘记密码</a>
                </span>
                <label><input type="checkbox" value="1" id="check"> 下次自动登录</label>
            </div>
            <button type="button" class="account-btn" @click="signin">登 录</button>
        </div>
    </div> 
    <div class="pop" id="register" style="">
        <div class="pop-wp" id="r-wp">
            <a href="javascript:void(0)" title="关闭" class="pop-close" @click="registerExit">×</a>
            <div class="pop-title">注册</div>
                <div class="account-form">
                    <input type="text"  class="account-input" placeholder="昵称" v-model.trim="nikiname">
                    <div id="error_tip_rusername" class="error-tip"><span id="rusername-error" class="error hidden">请输入昵称</span></div>
                    <div class="account-line"></div>
                    <input type="text"  class="account-input" placeholder="邮箱" v-model.trim="email">
                    <div id="error_tip_remail" class="error-tip">
                        <span  class="error hidden ">请输入邮箱</span>
                        <span  class="error hidden ">邮箱格式不正确</span>
                        <span  class="error hidden ">邮箱被占用</span>
                    </div>
                    <div class="account-line"></div>
                    <input type="password" id="rpassword" class="account-input" placeholder="密码" v-model.trim="password">
                    <div id="error_tip_rpassword" class="error-tip">
                        <span class="error hidden ">请输入密码</span>
                        <span  class="error hidden ">密码格式不正确</span>
                    </div>
                    <div class="account-line"></div>
                    <input type="password"  class="account-input" placeholder="确认密码" v-model.trim="cpassword" >
                    <div id="error_tip_repassword1" class="error-tip">
                        <span class=" error hidden">请输入确认密码</span>
                        <span class=" error hidden" >两次密码不一致</span>
                    </div>
                </div>
                <div class="account-other">
                    <label><input type="checkbox" id="angree"> 我已认真阅读并同意悦读FM的<a href="javascript:void(0)" class="red-link">《使用协议》</a></label>
                    <div id="error_tip_angree" class="error-tip"><span id="angree-error" class="error hidden" >请阅读并同意悦读FM使用协议</span></div>
                </div>
                <button type="button" class="account-btn" @click="signup">注册</button>
        </div>
    </div>
</div>
</template>
<script>
import bus from '../bus.js'
export default {
    name: 'tab',
    data(){
        return {
            lists:[],
            curr:-1,
            email:null,
            password:null,
            nikiname:null,
            cpassword:null,
            txt:"",
        }
    },
    created(){
        bus.$on("send-val",data=>{
            this.curr=data;
        })
        this.axios.get("http://localhost:3000/api/types").then(({data})=>{
            this.lists=this.lists.concat(data.res);
        }).catch(error=>{
            console.log(error);
        })
        this.txt=localStorage.getItem("username");
        this.email=localStorage.getItem("email");
        this.password=localStorage.getItem("pass");
    },
    methods:{
        send(id,i) {
            this.curr=i;
            this.$router.push({name:'list',params:{id:id}});
            bus.$emit("send-id",1);
        },
        login(){
            var mark=document.getElementById("login");
            var pop=document.getElementsByClassName("pop-wp")[0];
            pop.classList.remove("move");
            mark.style.display="block";
            document.body.style.overflow="hidden";
        },
        loginExit(){
            var exit=document.getElementsByClassName("pop-close")[0];
            var pop=document.getElementsByClassName("pop-wp")[0];
            var mark=document.getElementById("login");
            pop.classList.add("move");
            var time=setTimeout(function(){
                mark.style.display="none";
            },400)
            document.body.style.overflow="";
        },
        register(){
            var regest=document.getElementById("r-wp");
            var mark=document.getElementById("register");
            regest.classList.remove("move")
            mark.style.display="block";
            document.body.style.overflow="hidden";
        },
        registerExit(){
            var regest=document.getElementById("r-wp");
            var mark=document.getElementById("register");
            var exit=document.getElementsByClassName("pop-close")[1];
            regest.classList.add("move");
            var time=setTimeout(function(){
                mark.style.display="none"
            },400)
            document.body.style.overflow="";
        },
        signin() {
            this.axios.post("http://localhost:3000/api/user/login",{
                email:this.email,
                password:this.password
            }).then(({data})=>{
                if(data.res_code===200) {
                    localStorage.setItem("username",data.res.user.nikiname);
                    localStorage.setItem("key",data.res.token);
                    localStorage.setItem("userId",data.res.user.id)
                    this.txt=localStorage.getItem("username");
                    var check=document.getElementById("check");
                    window.location.reload();
                    if(check.checked) {
                        localStorage.setItem("pass",this.password);
                        localStorage.setItem("email",this.email);
                    }else {
                        this.email="";
                        this.password=""
                    }
                    this.loginExit();
                }else {
                    if(!this.email.length){
                        document.getElementById("error_tip_email").lastElementChild.classList.remove("hidden");
                    } else {
                        document.getElementById("error_tip_email").lastElementChild.classList.add("hidden");
                        if(data.res_msg=="用户名不存在") {
                            document.getElementById("error_tip_email").firstElementChild.classList.remove("hidden");
                        }else {
                            document.getElementById("error_tip_email").firstElementChild.classList.add("hidden");
                        }
                    }
                    if(!this.password.length) {
                        document.getElementById("error_tip_lpassword").lastElementChild.classList.remove("hidden");
                    }else {
                        document.getElementById("error_tip_lpassword").lastElementChild.classList.add("hidden");
                        if(data.res_msg=='用户名或密码错误') {
                            document.getElementById("error_tip_lpassword").firstElementChild.classList.remove("hidden");
                        }else {
                            document.getElementById("error_tip_lpassword").firstElementChild.classList.add("hidden");
                        }
                    }
                }
            }).catch(error=>{
                console.log(error);
            })
        },
        exit() {
           this.txt=localStorage.removeItem("username");
           localStorage.removeItem("key");
           localStorage.removeItem("userId");
           window.location.reload();
        },
        signup() {
            var agree=document.getElementById("angree");
            var pattEmail=/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            var pattPass=/^\w{6}$/
            if(this.nikiname!=null) {
                document.getElementById("error_tip_rusername").firstElementChild.classList.add("hidden");
            }else {
                document.getElementById("error_tip_rusername").firstElementChild.classList.remove("hidden");
            }
            if(this.password==null) {  
                document.getElementById("error_tip_rpassword").firstElementChild.classList.remove("hidden");
            }else if(!pattPass.test(this.password)){
                document.getElementById("error_tip_rpassword").lastElementChild.classList.remove("hidden");
            }else {
                document.getElementById("error_tip_rpassword").firstElementChild.classList.add("hidden");
                document.getElementById("error_tip_rpassword").lastElementChild.classList.add("hidden");
            }
            if(this.email==null) {
                document.getElementById("error_tip_remail").children[0].classList.remove("hidden");
            }else if(!pattEmail.test(this.email)) {
                document.getElementById("error_tip_remail").children[1].classList.remove("hidden");
            }else {
                document.getElementById("error_tip_remail").children[0].classList.add("hidden");
                document.getElementById("error_tip_remail").children[1].classList.add("hidden");
            }
            if(this.cpassword==null) {
                document.getElementById("error_tip_repassword1").firstElementChild.classList.remove("hidden");
            }else if (this.password!=this.cpassword) {
                document.getElementById("error_tip_repassword1").lastElementChild.classList.remove("hidden");
            }else {
                document.getElementById("error_tip_repassword1").firstElementChild.classList.add("hidden");
                document.getElementById("error_tip_repassword1").lastElementChild.classList.add("hidden");
            }
            if(agree.checked) {
                var agree_error=document.getElementById("angree-error");
                agree_error.classList.add("hidden");
            }else {
                var agree_error=document.getElementById("angree-error");
                agree_error.classList.remove("hidden");
            }
            if(this.email!=null&&this.password!=null&&this.nikiname!=null&&this.cpassword!=null&&this.password==this.cpassword&&pattEmail.test(this.email)&&pattPass.test(this.password)&&agree.checked) {
                this.axios.post("http://localhost:3000/api/user",{
                    email:this.email,
                    password:this.password,
                    username:this.nikiname,
                    nikiname:this.nikiname
                }).then(({data})=>{
                    console.log(data)
                    if(data.res_msg=="邮箱被占用") {
                        document.getElementById("error_tip_remail").children[2].classList.remove("hidden");
                    }else {
                        this.registerExit();
                        this.email=null;
                        this.nikiname=null;
                        this.cpassword=null;
                        this.password=null;
                        agree.checked=false;
                        document.getElementById("error_tip_remail").children[2].add("hidden");
                    }
                }).catch(error=>{
                    console.log(error);
                })
            }
        },
        change() {
            localStorage.clear();
        }
    }
}
</script>
<style scoped>
    .head-wrap {
        width: 100%;
        background-color: #fff;
    }
    .head {
        width: 1010px;
        padding: 38px 0;
        height: 30px;
        margin: auto;
    }
    .head a {
        color: #707070;
    }
     .head-l {
        float: left;
        line-height: 30px;
        font-size: 14px;
        color: #707070;
        overflow: hidden;
    }
    .menu {
       margin-left: 130px;
    }
    .menu a {
        padding: 0 20px;
    }
    .fr {
        height: 20px;
        line-height: 20px;
        margin: 5px 0 5px 20px;
        border-left: 1px dotted #CCC;
    }
    .hidden {
        display: none;
    }
    .login a {
        padding-left: 20px;
        font-size: 12px;
    }
    .head-r {
        float: right;
        overflow: hidden;
    }
    .logo,.menu,.search,.fr {
        float: left;
    }
    .search {
        position: relative;
        height: 20px;
        line-height: 16px;
        overflow: hidden;
        width: 150px;
        margin: 5px 0;
        box-shadow: 1px 1px 1px rgba(0,0,0,.05);
    }
    .search i {
        position: absolute;
        display: inline-block; 
        width: 18px;
        height: 18px; 
        background: url(../assets/search.png) no-repeat 3px 5px;
    }
    .search input {
        width: 120px;
        height: 16px;
        padding: 2px 5px;
        border: none;
        border-radius: 0;
        outline: none;
        background: transparent;
    }  
    .logo .mlogo {
        margin-right: 15px;
    }
    .mlogo span {
        float: left;
        width: 4px;
        background: #ee5044;
        border-radius: 2px;
    }
    .logo-a {
        height: 18px;
        margin: 6px 4px 0 0;
    }
    .logo-b {
        height: 28px;
        margin: 0 4px 0 0;
    }
    .logo-c {
        height: 18px;
        margin: 6px 0 0 0;
    }
    .active {
        color: #ee5044 !important;
    }
    .head a:hover {
        color: #ee5044
    }
    .pop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: none;
        background: rgba(0,0,0,.5);
        z-index: 999;
    }
    .pop-wp {
        background: #FFF;
        padding: 30px 50px 50px;
        width: 280px;
        position: absolute;
        top: 120px;
        left: -50%;
        margin-left: -190px;
        animation: right .2s linear forwards;
    }
    .pop-close {
        position: absolute;
        top: -15px;
        right: -15px;
        width: 30px;
        line-height: 30px;
        text-align: center;
        background: #444;
        color: #CCC;
        font-size: 24px;
        border-radius: 50%;
    }
    .pop-title {
        font-size: 24px;
        margin-bottom: 20px;
        line-height: 24px;
    }
    .account-form {
        border: 1px solid #dcdcdc;
        padding: 0 15px;
    }
    .account-input {
        height: 20px;
        width: 100%;
        display: block;
        margin: 10px 0;
        outline: none;
        border: none;
    }
    .account-other {
        padding: 15px 5px;
    }
    .account-other span {
        float: right;
        font-size: 12px;
    }
    .red-link {
        color: #ee5044;
    }
    label {
        font-size: 12px;
        cursor: pointer;
    }
    .account-btn {
        width: 100%;
        height: 45px;
        background: #eb4235;
        color: #FFF;
        text-align: center;
        cursor: pointer;
        font-size: 14px;
        outline: none;
        border: none;
    }
    .account-line {
        width: 100%;
        height: 1px;
        background: #dcdcdc;
        overflow: hidden;
    }
     @keyframes right {
        0% {
            left:-50%;
        }
        100% {
             left:50%;
        }
    }
    @keyframes  left{
        0% {
           left:50%;
        }
        100% {
           left:150%;
        }
    }
    .move {
        animation: left .2s linear forwards;
    }
    .error-tip {
        position: relative;
    }
    .error-tip span {
        position: absolute;
        top: -5px;
        left: 0;
        padding: 2px 8px;
        background: rgba(238,80,68,.8);
        color: #FFF;
        font-size: 12px;
        border-radius: 3px;
    }
    .error-tip span:before {
        position: absolute;
        top: -5px;
        left: 8px;
        display: inline-block;
        border-right: 5px solid transparent;
        border-bottom: 5px solid rgba(238,80,69,.8);
        border-left: 5px solid transparent;
        content: '';
    }
    .account-other .error-tip .error {
        top: 5px!important;
        left: 12px!important;
    }
</style>