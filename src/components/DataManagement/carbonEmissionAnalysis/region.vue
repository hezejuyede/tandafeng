<template>
    <div>
        <el-table class="tb-edit"
                  :data="tables"
                  :header-cell-style="{background:'#0D447A',color:'#ffffff',height:'60px',borderColor:'#6195C5',fontSize:'14px',fontWeight: 'bold'}"
                  :cell-style="{fontSize:'14px',fontWeight: 'norma',color:'#ffffff',background:'#175A96',borderColor:'#6195C5'}"
                  border
                  id="rebateSetTable1"
                  ref="moviesTable"
                  highlight-current-row
                  style="width: 98%;margin: auto">
            <template v-for="(col ,index) in cols">
                <el-table-column  align="center"  v-if="col.prop==='region'" :label="col.label" :prop="col.prop">
                    <template slot-scope="scope">
                        <span v-if="scope.row.region==='01'">济南市</span>
                        <span v-if="scope.row.region==='02'">青岛市</span>
                        <span v-if="scope.row.region==='03'">淄博市</span>
                        <span v-if="scope.row.region==='04'">枣庄市</span>
                        <span v-if="scope.row.region==='05'">东营市</span>
                        <span v-if="scope.row.region==='06'">烟台市</span>
                        <span v-if="scope.row.region==='07'">潍坊市</span>
                        <span v-if="scope.row.region==='08'">济宁市</span>
                        <span v-if="scope.row.region==='09'">泰安市</span>
                        <span v-if="scope.row.region==='10'">威海市</span>
                        <span v-if="scope.row.region==='11'">日照市</span>
                        <span v-if="scope.row.region==='12'">临沂市</span>
                        <span v-if="scope.row.region==='13'">德州市</span>
                        <span v-if="scope.row.region==='14'">聊城市</span>
                        <span v-if="scope.row.region==='15'">滨州市</span>
                        <span v-if="scope.row.region==='16'">菏泽市</span>
                    </template>
                </el-table-column>
                <el-table-column  align="center"  v-if="col.prop!=='region'" :label="col.label" :prop="col.prop">
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
