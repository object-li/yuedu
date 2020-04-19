<template>
    <div class="content-wrap">
        <div class="content">
            <div class="con-l">
                <articles></articles>
                <discuss></discuss>
            </div>
            <div class="con-r">
                <author></author>
                <related-item></related-item>
                <channel-item></channel-item>
                 <div class="side-sponsor">
                    <img src="http://qingwenyi.com/smedia/upload/1495.jpg" alt="" width="360px" height="236px">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import articles from '../components/articles.vue'
import discuss from '../components/discuss.vue'
import relatedItem from '../components/relatedItem.vue'
import channelItem from '../components/channelItem.vue'
import author from '../components/author.vue'
export default {
    components:{
        articles,
        discuss,
        relatedItem,
        channelItem,
        author
    }
}
</script>
<style  scoped>
    .content-wrap {
        width: 100%;
    }
    .content {
        width: 1010px;
        margin: auto;
        overflow: hidden;
    }
    .content .con-l {
        float: left;
        width: 620px;
        padding:40px 0;
        margin-right: 30px;
    }
    .content .con-r {
        float: right;
        width: 360px;
        padding:40px 0;
    }
</style>