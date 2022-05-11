<template>
    <div>
        <el-table class="tb-edit"
                  :data="tables"
                  :header-cell-style="{background:'#0D447A',color:'#ffffff',height:'60px',borderColor:'#6195C5',fontSize:'14px',fontWeight: 'bold'}"
                  :cell-style="{fontSize:'14px',fontWeight: 'norma',color:'#ffffff',background:'#175A96',borderColor:'#6195C5'}"
                  border
                  id="rebateSetTable2"
                  ref="moviesTable"
                  highlight-current-row
                  style="width: 98%;margin: auto">
            <template v-for="(col ,index) in cols">
                <el-table-column  align="center"  v-if="col.prop==='industry'" :label="col.label" :prop="col.prop">
                    <template slot-scope="scope">
                        <span v-if="scope.row.industry==='01'">电力</span>
                        <span v-if="scope.row.industry==='02'">钢铁</span>
                        <span v-if="scope.row.industry==='03'">交通</span>
                        <span v-if="scope.row.industry==='04'">建筑</span>
                        <span v-if="scope.row.industry==='05'">建材</span>
                        <span v-if="scope.row.industry==='06'">化工</span>
                    </template>
                </el-table-column>
                <el-table-column  align="center"  v-if="col.prop!=='industry'" :label="col.label" :prop="col.prop"  >
                </el-table-column>
            </template>
        </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'modal',
        data() {
            return {}
        },
        methods: {},
        props: {
            /**
             * 列表数据
             */
            tables: {
                type: Array,
                required: true
            },
            /**
             *表头
             */
            cols: {
                type: Array,
                required: true
            },
        },
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/less/base";

</style>
