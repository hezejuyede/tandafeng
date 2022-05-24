<template>
    <div class="template">
        <div class="crumbs">
            <div class="crumbsLeft fl">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>数据管理</el-breadcrumb-item>
                    <el-breadcrumb-item>企业超排预警</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="crumbsRight fr">
                <el-button type="primary" @click="doSearch">查询</el-button>
                <el-button type="success" @click="doReset">重置</el-button>
                <el-button type="warning" @click="importPrinting">导出Excel</el-button>
            </div>
        </div>
        <div class="container">
            <div class="containerDiv">
                <div class="handle-box">
                    <label style="margin-right: 10px" class="fl">
                        <el-input v-model="select_word" placeholder="智能检索数据" style="width: 250px"></el-input>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px" class="fl">
                        <span>企业名称</span>
                        <span>:</span>
                        <el-input v-model="enterpriseName" placeholder="请输入企业名称" style="width: 250px"></el-input>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px" class="fl">
                        <span class="textColor">碳排来源</span>
                        <span>:</span>
                        <el-select
                            style="width:250px"
                            v-model="type"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择行业">
                            <el-option
                                v-for="item in typeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                </div>
                <div class="handle-table">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#f0f0f0'}"
                              :cell-style="{fontSize:'12px'}"
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
                            prop="enterpriseName"
                            align="center"
                            label="企业名称">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="碳排来源"
                            width="200">
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
                            prop="totalCarbonEmission"
                            label="碳排总量（万吨）"
                            align="center"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="excessDisplacement"
                            align="center"
                            label="超排量（万吨）"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="purchaseAmount"
                            label="预计购买碳配碳金额(万元)"
                            align="center"
                            width="200">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="handle-page" style="display: flex;align-items: center;justify-content: center;margin-top: 15px;margin-bottom:10px">
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


        <shadinLayer></shadinLayer>
    </div>
</template>
<script type="text/ecmascript-6">
    import { enterpriseOverDischargeWarning } from '../../api/dataManagement.js'
    import {typeOptions} from "../../utils/options";
    import shadinLayer from '../../common/shadinLayer'
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,



                detailsVisible:false,


                tableData: [],


                currentPage: 1,
                startIndex: 0,
                mrPage: 10,
                pageNum: Number,
                countSize: 0,

                select_word: '',
                enterpriseName: "",
                type: "",
                typeOptions: typeOptions,

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
        components: {shadinLayer},
        mounted() {

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
                if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    var H = window.screen.height;
                    this.tableHeight = H - 290 + "px";
                } else {
                    var h = document.body.clientHeight;
                    var w = document.body.clientWidth;

                    if (w < 1170) {
                        this.tableHeight = h - 400 + "px";
                    } else {

                        this.tableHeight = h - 290 + "px";
                    }
                }

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


            //重置
            doReset(){
                this.enterpriseName="";
                this.type="";
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
        background-color: @color-white;

        .crumbs {
            width: 100%;
            height: 80px;
            line-height: 80px;

            .crumbsLeft {
                width: 300px;
                height: 30px;
                padding-top: 35px;
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
            display: flex;
            align-items: center;
            justify-items: center;
            background-color: @color-F0;

            .containerDiv {
                /*width: 98%;*/
                /*margin: 20px auto;*/
                width: 100%;
                border-radius: 10px;
                background-color: @color-white;
                overflow: auto;

                .handle-box {
                    width: 100%;
                    height: 80px;
                    line-height: 80px;
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



</style>
