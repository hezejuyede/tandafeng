<template>
    <div class="loading">
        <img style="width: 128px;height:128px;" src="../assets/img/loading.gif" alt="">
        <p class="desc">{{title}}</p>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            title: {
                type: String,
                default: "数据载入中...."
            }
        }
    }

</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/less/base";

    .loading {
        width: 100%;
        height: 100%;
        text-align: center;
        background-color: @color-white;
        opacity: 0.8;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99999;

        .desc {
            line-height: 20px;
            font-size: @font-size-large;
            color: #303133;
            margin-top: 20px;
        }
    }

</style>
