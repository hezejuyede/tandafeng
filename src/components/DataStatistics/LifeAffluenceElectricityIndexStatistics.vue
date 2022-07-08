<template>
    <div class="template">
        <div class="crumbs">
            <div class="crumbsLeft fl">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>乡村振兴统计报表</el-breadcrumb-item>
                    <el-breadcrumb-item>生活富裕电力指数统计</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="container">
            <div class="containerBottom">
                <div class="containerLeft fl"    ref="containerLeft">
                    <div class="containerLeftDiv">
                        <LeftNavigationBar :treeData="treeData"></LeftNavigationBar>
                    </div>

                </div>
                <div class="containerDiv fl">
                    <div class="handle-box">
                        <el-button  icon="el-icon-upload2"  style="background-color: #008972;color: #fff" @click="importPrinting"  >导出</el-button>
                    </div>
                    <div class="handle-table">
                        <el-table class="tb-edit"
                                  :data="tables"
                                  :header-cell-style="{background:'#E3EFED',color:'#3A7D72',height:'60px',borderColor:'#F3F3F3',fontSize:'14px',fontWeight: 'bold'}"
                                  :cell-style="{fontSize:'14px',fontWeight: 'norma',background:'#FFF'}"
                                  border
                                  :height="this.tableHeight"
                                  id="rebateSetTable"
                                  ref="moviesTable"
                                  highlight-current-row
                                  :row-class-name="tableRowClassName"
                                  style="width: 98%;margin: auto">
                            <el-table-column
                                type="index"
                                label="序号"
                                align="center"
                                width="60">
                            </el-table-column>

                            <el-table-column
                                align="center"
                                label="类别">
                            </el-table-column>
                            <el-table-column
                                prop="totalCarbonEmission"
                                label="2018年"
                                align="center">
                                <el-table-column
                                    prop="totalCarbonEmission"
                                    label="用电量(万千瓦时)"
                                    align="center">
                                </el-table-column>
                                <el-table-column
                                    prop="excessDisplacement"
                                    align="center"
                                    label="用电量比量(%)">
                                </el-table-column>
                            </el-table-column>
                            <el-table-column
                                prop="totalCarbonEmission"
                                label="2019年"
                                align="center">
                                <el-table-column
                                    prop="totalCarbonEmission"
                                    label="用电量(万千瓦时)"
                                    align="center">
                                </el-table-column>
                                <el-table-column
                                    prop="excessDisplacement"
                                    align="center"
                                    label="用电量比量(%)">
                                </el-table-column>
                            </el-table-column>
                            <el-table-column
                                prop="totalCarbonEmission"
                                label="2020年"
                                align="center">
                                <el-table-column
                                    prop="totalCarbonEmission"
                                    label="用电量(万千瓦时)"
                                    align="center">
                                </el-table-column>
                                <el-table-column
                                    prop="excessDisplacement"
                                    align="center"
                                    label="用电量比量(%)">
                                </el-table-column>
                            </el-table-column>


                        </el-table>
                    </div>
                    <div class="handle-page"
                         style="display: flex;align-items: center;justify-content:flex-end;margin-top: 15px;margin-bottom:10px;padding-right: 100px">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[10,50,100, 150,200,250,300]"
                            :page-size="mrPage"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="countSize">
                        </el-pagination>
                    </div>
                </div>
            </div>

        </div>



    </div>
</template>
<script type="text/ecmascript-6">
import { enterpriseOverDischargeWarning } from '../../api/dataManagement.js'
import LeftNavigationBar from './assembly/LeftNavigationBar'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
    name: 'WorkingProcedure',
    data() {
        return {
            tableData: [],
            checkRadio:"指数数据",
            treeData: [
                {
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                },
                {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                },
                {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],


            currentPage: 1,
            startIndex: 0,
            mrPage: 10,
            pageNum: Number,
            countSize: 0,

            select_word: '',

        }
    },
    computed: {
        //模糊检索
        tables: function () {
            var search = this.select_word;
            if (search) {
                return this.tableData.filter(function (dataNews) {
                    return Object.keys(dataNews).some(function (key) {
                        return String(dataNews[key]).indexOf(search) > -1
                    })
                })
            }
            return this.tableData
        }
    },
    components: {LeftNavigationBar},
    mounted() {
        this.setLeft()

    },
    created() {
        this.getAdminState();
    },
    methods: {

        //页面加载检查用户是否登陆，没有登陆就加载登陆页面
        getAdminState() {
            this.setTableHeight();
            this.doSearch();
        },

        //根据屏幕设置Table高度
        setTableHeight() {
            var h = document.body.clientHeight;
            this.tableHeight = h - 290 + "px";
        },

        //设置左侧高度
        setLeft() {
            var h = document.body.clientHeight;
            this.$refs.containerLeft.style.height = (h - 180) + "px";
        },



        //根据头部显示底部
        showDetailsBottom(index) {
            this.detailsBottom = index + 1;
            if(this.detailsBottom===5){
                setTimeout(()=>{
                    this.drawMap();
                },1000);
            }

        },


        //查询
        doSearch() {
            let that = this;
            const getListData = async () => {
                const result = await enterpriseOverDischargeWarning({
                    "enterpriseName": that.enterpriseName,
                    "type": that.type,
                    "iDisplayStart": 0,
                    "iDisplayLength":that.mrPage
                })
                that.tableData = result.data.data.data;
                that.pageNum = Math.ceil(result.data.data.length / that.mrPage);
                that.countSize = result.data.data.length;
            }
            getListData();
        },


        //根据每行显示不同颜色
        tableRowClassName({row, rowIndex}) {
            if (row.xuhao % 2 === 0) {
                return '';
            } else {
                return 'f0';
            }
        },


        //显示数据改变
        handleSizeChange(val) {
            this.mrPage = val;
            this.startIndex = (this.currentPage - 1) * this.mrPage;
            this.doSearch();
        },


        //页面改变
        handleCurrentChange(val) {
            this.startIndex = (val - 1) * this.mrPage;
            this.doSearch();
        },


        //导出打印
        importPrinting() {
            let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'));
            /* get binary string as output */
            let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'});
            try {
                FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '企业超排预警报表.xlsx');
            } catch (e) {
                if (typeof console !== 'undefined')
                    console.log(e, wbout)
            }
        },

    },
}
</script>
<style scoped lang="less" rel="stylesheet/less">
@import "../../assets/less/base";

.template {
    width: 100%;
    height: 100%;
    background-color: #EFF3F3;

    .crumbs {
        width: 100%;
        height: 50px;
        line-height: 50px;
        background-color: @color-white;


        .crumbsLeft {
            width: 500px;
            height: 30px;
            padding-top: 20px;
            padding-left: 20px;

        }

        .crumbsRight {
            margin-right: 50px;

            .el-button {
                width: 100px;
                height: 35px;
            }
        }
    }

    .container {
        padding-top: 10px;
        background-color: #EFF3F3;


        .containerBottom {


            .containerLeft {
                width: 20%;
                display: flex;
                align-items: flex-start;
                justify-content: center;
                .containerLeftDiv{
                    width: 90%;
                    height: 90%;
                }
            }

            .containerDiv {
                width: 80%;
                border-radius: 10px;
                background-color: @color-white;
                overflow: auto;
                .handle-box {
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    padding-left: 20px;

                    .el-button {
                        width: 110px;
                        height: 35px;
                    }
                }

                .handle-title {
                    width: 100%;
                    height: 50px;
                    background-color: rgba(230, 242, 254, 1);
                    line-height: 50px;
                    padding-left: 50px;

                    div {
                        margin-right: 40px;
                        font-size: @font-size-small;
                    }

                    div:first-child {
                        margin-right: 10px;
                    }

                    .icon-dengpaolightbulb3 {
                        font-size: 150%;
                        color: @color-bg-red;
                    }
                }

                .handle-table {
                    width: 100%;
                }
            }
        }

    }

    .el-table {
        /deep/ th {
            padding: 0 ;
        }
        /deep/ td {
            padding: 5px ;
        }
    }

}
</style>
