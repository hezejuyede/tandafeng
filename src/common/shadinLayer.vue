<template>
    <div v-if="this.TMP.request_count > 0">
        <div
            style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; background: #eee; opacity: 0.5;"></div>
        <div
            style="font-size:50px; text-align:center; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999;">
            <i class="el-icon-loading" style="margin-top:20%;font-size: 200%;color: #409EFF"></i>
            <span style="font-size: 18px;color: #2d8cf0;display: block;margin-top: 10px">数据载入中......</span>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'

    export default {
        name: 'modal',
        data() {
            return {}
        },
        computed: {
            ...mapGetters([
                'TMP',
            ]),
            ...mapState([
                'TMP',
            ]),


        },
        watch: {
            TMP: {
                handler(newVal, oldVal) {
                    /*console.log(newVal);
                    console.log(oldVal)*/
                },
                immediate: true,
                deep: true
            }

        },
        methods: {},
        props: {},
    }
</script>

<style scoped>

</style>
