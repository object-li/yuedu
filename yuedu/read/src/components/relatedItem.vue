<template>
     <div class="related-item">
        <h3>
            其他相关节目
            <span>
                <i class="pre" @click="pre"></i>
                <i  class="next" @click="next"></i>
            </span>
        </h3>
        <div class="related-list">
            <ul id="list">
                <li v-for="(item,index) in imglists" :key="index">
                    <router-link :to="'/detail/'+ item.id">
                        <img :src="item.img_url" alt="">
                        <span>{{item.title}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default { 
    name:"relatedItem",
    data(){
        return {
            imglists:[],
            left:0
        }
    },
    created(){
        this.axios.get("http://localhost:3000/api/articles/rand").then(({data})=>{
            this.imglists=this.imglists.concat(data.res);
        }).catch(error=>{
            console.log(error);
        })
    },
    methods: {
        next() {
            var ul=document.getElementById("list");
            if(this.left>-1320) {
                this.left+=-330;
            }
            ul.style.transform=`translate(${this.left+'px'},0)`;
        },
        pre() {
            var ul=document.getElementById("list");
            if(this.left<0) {
                this.left+=330;
            }
            ul.style.transform=`translate(${this.left+'px'},0)`;
        }
    }
}
</script>
<style scoped>
.related-item {
    padding: 30px;
    margin-bottom: 30px;
    background-color: #fff;
    overflow: hidden;
}
.related-item h3 {
    padding-left: 8px;
    line-height: 17px;
    font-size: 14px;
    color: #707070;
    border-left: 3px solid #ee5044;
}
.related-item h3 span {
    float: right;
}
.related-list li a {
    display: block !important;
}
.related-list li span {
    display: block;
    width: 100%;
    padding-top: 10px;
    font-size: 12px;
    line-height: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.related-item h3 span i {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
}
.related-item h3 span .next {
    background: url(../assets/next_icon.png) no-repeat 0px 1px;
}
.related-item h3 span .pre {
    background: url(../assets/next_icon.png) no-repeat 4px 3px;
    transform: rotate(180deg);
}
.related-item .related-list li {
    float: left;
    width: 135px;
    padding-top: 30px;
    margin-right: 30px;
}
.related-list {
    width: 1650px;
    overflow: hidden;
}
.related-list li img {
    width: 100%;
    display: block;
}
ul {
    transition: all .5s;
    overflow: hidden;
}
#list li a:hover {
    color: #ee5044 !important;
}
</style>