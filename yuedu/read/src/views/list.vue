<template>
    <div class="content-wrap">
        <div class="content">
            <div class="con-l">
                <list-item></list-item>
                <page></page>
            </div>
            <div class="con-r">
                <div class="side-sponsor">
                     <img src="http://yuedufm.com/static/website/images/yueduwx_2.jpg" alt="" width="360px" height="236px">
                </div>
                <channelTop></channelTop>
                <div class="side-sponsor">
                     <img src="http://qingwenyi.com/smedia/upload/1534.jpg" alt="" width="360px" height="236px">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import listItem from '../components/listItem'
    import channelTop from '../components/channelTop'
    import page from '../components/page'
    export default {
        components:{
            listItem,
            channelTop,
            page
        }
    }
</script>
<style scoped>
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