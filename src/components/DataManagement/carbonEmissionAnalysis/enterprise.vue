<template>
    <div>
        <el-table class="tb-edit"
                  :data="tables"
                  :header-cell-style="{background:'#0D447A',color:'#ffffff',height:'60px',borderColor:'#6195C5',fontSize:'14px',fontWeight: 'bold'}"
                  :cell-style="{fontSize:'14px',fontWeight: 'norma',color:'#ffffff',background:'#175A96',borderColor:'#6195C5'}"
                  border
                  id="rebateSetTable3"
                  ref="moviesTable"
                  highlight-current-row
                  style="width: 95%;margin: auto">
            <el-table-column
                type="index"
                label="序号"
                align="center"
                width="60">
            </el-table-column>
            <el-table-column
                align="center"
                label="企业名称">
                <template slot-scope="scope">
                    <el-popover placement="top-start" title="企业名称" width="350" trigger="hover"
                                :content="scope.row.enterpriseName">
                        <div slot="reference"
                             style="width: 100%;height: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap">
                            {{scope.row.enterpriseName}}
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                width="80"
                align="center"
                label="碳排来源">
                <template slot-scope="scope">
                    <span v-if="scope.row.carbonEmissionSources==='01'">电力</span>
                    <span v-if="scope.row.carbonEmissionSources==='02'">钢铁</span>
                    <span v-if="scope.row.carbonEmissionSources==='03'">交通</span>
                    <span v-if="scope.row.carbonEmissionSources==='04'">建筑</span>
                    <span v-if="scope.row.carbonEmissionSources==='05'">建材</span>
                    <span v-if="scope.row.carbonEmissionSources==='06'">化工</span>
                </template>
            </el-table-column>
            <el-table-column
                width="135"
                prop="totalCarbonEmission"
                label="碳排总量（万吨）"
                align="center">
            </el-table-column>
            <el-table-column
                width="120"
                prop="excessDisplacement"
                align="center"
                label="超排量（万吨）">
            </el-table-column>
            <el-table-column
                prop="purchaseAmount"
                label="预计购买碳配碳金额(万元)"
                align="center"
                width="185">
            </el-table-column>
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
        },
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/less/base";

</style>

