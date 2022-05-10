<template>
    <div class="template">
        <div class="crumbs">
            <div class="crumbsLeft fl">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>数据管理</el-breadcrumb-item>
                    <el-breadcrumb-item>区域碳报表</el-breadcrumb-item>
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
                        <span>时间范围</span>
                        <span>:</span>
                        <el-date-picker
                            :picker-options="pickerOptions"
                            style="width: 250px"
                            v-model="examineTime"
                            type="monthrange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM">
                        </el-date-picker>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px" class="fl">
                        <span class="textColor">区域范围</span>
                        <span>:</span>
                        <el-select
                            style="width: 250px"
                            v-model="region"
                            clearable
                            filterable
                            allow-create
                            multiple
                            collapse-tags
                            default-first-option
                            placeholder="请选择区域">
                            <el-option
                                v-for="item in regionOptions"
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
                              :header-cell-style="{background:'#fffff',color:'rgba(0, 0, 0, 0.8)',height:'60px',border:'none',fontSize:'14px',fontWeight: 'bold'}"
                              :cell-style="{fontSize:'14px',fontWeight: 'norma',color: '#666666'}"
                              border
                              :height="this.tableHeight"
                              id="rebateSetTable"
                              ref="moviesTable"
                              highlight-current-row
                              :row-class-name="tableRowClassName"
                              style="width: 98%;margin: auto">

                        <template v-for="(col ,index) in cols" >
                            <el-table-column  align="center"  :label="col.label" :prop="col.prop">
                            </el-table-column>
                        </template>
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


        <Modal :msg="message"
               :isHideModal="HideModal"></Modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import url from '../../assets/js/URL'
    import Modal from '../../common/modal'

    import {getNowTime, getLestWeekTime} from '../../assets/js/api'

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
                cols:[],

                currentPage: 1,
                startIndex: 0,
                mrPage: 10,
                pageNum: Number,
                countSize: 0,

                select_word: '',
                examineTime: "",
                region: "",
                regionOptions: [
                    {"name": "济南市", "id": "01"},
                    {"name": "青岛市", "id": "02"},
                    {"name": "淄博市", "id": "03"},
                    {"name": "枣庄市", "id": "04"},
                    {"name": "东营市", "id": "05"},
                    {"name": "烟台市", "id": "06"},
                    {"name": "潍坊市", "id": "07"},
                    {"name": "菏泽市", "id": "08"},
                    {"name": "济宁市", "id": "09"},
                    {"name": "泰安市", "id": "10"},
                    {"name": "威海市", "id": "11"},
                    {"name": "日照市", "id": "12"},
                    {"name": "临沂市", "id": "13"},
                    {"name": "德州市", "id": "14"},
                    {"name": "聊城市", "id": "15"},
                    {"name": "滨州市", "id": "16"}
                ],


                pickerOptions: {
                    disabledDate(time) {
                        let t = new Date().getDate();
                        // 如果想蕴含本月本月 - 8.64e7 * t 就不须要了，
                        // 如果想之前的不能抉择把 > 换成 <
                        return time.getTime() > Date.now();
                    },
                },






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
        components: {Modal},
        mounted() {

        },
        created() {

        },
        methods: {

            //页面加载检查用户是否登陆，没有登陆就加载登陆页面
            getAdminState() {
                this.setTableHeight();
                let nowTime = getNowTime();
                let lestWeekTime = getLestWeekTime();
                let times = [];
                times.push(lestWeekTime);
                times.push(nowTime);
                this.examineTime = times;
                this.loadingShowData(this.examineTime[0], this.examineTime[1], this.SENDER_USERNAME, this.SENDER_TELEPHONE,this.SHR_NAME,this.CONSIGNEE_TELEPHONE , this.startIndex, this.mrPage);
            },


            //根据屏幕设置Table高度
            setTableHeight() {
                if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    var H = window.screen.height;
                    this.tableHeight = H - 320 + "px";
                } else {
                    var h = document.body.clientHeight;
                    var w = document.body.clientWidth;

                    if (w < 1170) {
                        this.tableHeight = h - 400 + "px";
                    } else {

                        this.tableHeight = h - 320 + "px";
                    }
                }

            },

            //打开全局遮罩层
            openFullScreen() {
                this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: '#fff'
                });
            },

            //关闭全局遮罩层
            closeFullScreen() {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                });
                loading.close();
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


            //带Loading瞬间加载数据
            loadingShowDataL(data1, data2, data3, data4, data5,data6,data7,data8) {
                this.openFullScreen();
                /*  this.$post(" " + url + "/OrderController/getWayBill", {
                      "START_TIME": data1,
                      "END_TIME": data2,
                      "SENDER_USERNAME": data3,
                      "SENDER_TELEPHONE": data4,
                      "SHR_NAME": data5,
                      "CONSIGNEE_TELEPHONE": data6,
                      "startIndex": data7,
                      "pageSize": data8,
                  })
                      .then((res) => {
                          if (res.code === 200) {
                              if (JSON.stringify(res.data) !== "{}") {

                                  let data = [];
                                  for (let i = 0; i < res.data.curPageList.length; i++) {
                                      let json = {
                                          "xuhao": i + 1,
                                          "ORDER_NO": res.data.curPageList[i].ORDER_NO,
                                          "CODE_NAME": res.data.curPageList[i].CODE_NAME,
                                          "ENDL_DETAILED_STATION": res.data.curPageList[i].ENDL_DETAILED_STATION,
                                          "START_DETAILED_STATION": res.data.curPageList[i].START_DETAILED_STATION,
                                          "CARRIAGE": res.data.curPageList[i].CARRIAGE,
                                          "SHR_NAME": res.data.curPageList[i].SHR_NAME,
                                          "CONSIGNEE_TELEPHONE": res.data.curPageList[i].CONSIGNEE_TELEPHONE,
                                          "INSIDE_SH_STATUS": res.data.curPageList[i].INSIDE_SH_STATUS,
                                          "CREATE_TIME": res.data.curPageList[i].CREATE_TIME,
                                          "ID": res.data.curPageList[i].ID,
                                      };
                                      data.push(json)
                                  }
                                  this.tableData = data;
                                  this.pageNum = res.data.pageCount;
                                  this.currentPage = res.data.page;
                                  this.countSize = res.data.count;
                                  setTimeout(() => {
                                      this.closeFullScreen();
                                  }, 500);

                              } else {
                                  this.closeFullScreen();
                                  this.$message.warning("暂无数据");
                              }
                          } else {
                              this.closeFullScreen();
                              this.$message.warning(res.msg);
                          }
                      })
                      .catch((err) => {
                          this.closeFullScreen();
                          console.log(err)
                      })*/
            },


            //带Loading的查询
            doSearchL(){
                if (this.examineTime === null) {
                    this.loadingShowData("", "", this.SENDER_USERNAME, this.SENDER_TELEPHONE,this.SHR_NAME,this.CONSIGNEE_TELEPHONE , this.startIndex, this.mrPage);
                }
                else {
                    this.loadingShowData(this.examineTime[0],  this.examineTime[1],this.SENDER_USERNAME, this.SENDER_TELEPHONE,this.SHR_NAME,this.CONSIGNEE_TELEPHONE , this.startIndex, this.mrPage);
                }
            },

            //瞬间加载数据
            loadingShowData(data1, data2, data3, data4, data5,data6,data7,data8) {
                /* this.$post(" " + url + "/OrderController/getWayBill", {
                     "START_TIME": data1,
                     "END_TIME": data2,
                     "SENDER_USERNAME": data3,
                     "SENDER_TELEPHONE": data4,
                     "SHR_NAME": data5,
                     "CONSIGNEE_TELEPHONE": data6,
                     "startIndex": data7,
                     "pageSize": data8,
                 })
                     .then((res) => {
                         if (res.code === 200) {
                             if (JSON.stringify(res.data) !== "{}") {

                                 let data = [];
                                 for (let i = 0; i < res.data.curPageList.length; i++) {
                                     let json = {
                                         "xuhao": i + 1,
                                         "ORDER_NO": res.data.curPageList[i].ORDER_NO,
                                         "CODE_NAME": res.data.curPageList[i].CODE_NAME,
                                         "ENDL_DETAILED_STATION": res.data.curPageList[i].ENDL_DETAILED_STATION,
                                         "START_DETAILED_STATION": res.data.curPageList[i].START_DETAILED_STATION,
                                         "CARRIAGE": res.data.curPageList[i].CARRIAGE,
                                         "SHR_NAME": res.data.curPageList[i].SHR_NAME,
                                         "CONSIGNEE_TELEPHONE": res.data.curPageList[i].CONSIGNEE_TELEPHONE,
                                         "INSIDE_SH_STATUS": res.data.curPageList[i].INSIDE_SH_STATUS,
                                         "CREATE_TIME": res.data.curPageList[i].CREATE_TIME,
                                         "ID": res.data.curPageList[i].ID,
                                     };
                                     data.push(json)
                                 }
                                 this.tableData = data;
                                 this.pageNum = res.data.pageCount;
                                 this.currentPage = res.data.page;
                                 this.countSize = res.data.count;

                             } else {
                                 this.$message.warning("暂无数据");
                             }
                         } else {
                             this.$message.warning(res.msg);
                         }
                     })
                     .catch((err) => {
                         console.log(err)
                     })*/
            },


            //查询
            doSearch() {
                if (this.examineTime === null) {
                    this.loadingShowData("", "", this.SENDER_USERNAME, this.SENDER_TELEPHONE,this.SHR_NAME,this.CONSIGNEE_TELEPHONE , this.startIndex, this.mrPage);
                }
                else {
                    this.loadingShowData(this.examineTime[0], this.examineTime[1],this.SENDER_USERNAME, this.SENDER_TELEPHONE,this.SHR_NAME,this.CONSIGNEE_TELEPHONE , this.startIndex, this.mrPage);
                }

            },


            //根据每行显示不同颜色
            tableRowClassName({row, rowIndex}) {
                if (row.xuhao % 2 === 0) {
                    return '';
                } else {
                    return 'f0';
                }
            },




            //绘制地图
            drawMap() {
                let start = this.ruleForm.START_DETAILED_STATION;
                let end   = this.ruleForm.ENDL_DETAILED_STATION;

                let map = new AMap.Map('container', {
                    resizeEnable: true,
                    zoom: 18,
                });

                let truckOptions = {
                    map: map,
                    policy: 0,
                    size: 1
                };

                map.plugin('AMap.TruckDriving', function () {
                    let driving = new AMap.TruckDriving(truckOptions);
                    let path = [
                        {keyword: start, city: start},//终点
                        {keyword: end, city: end},//起点
                    ];

                    driving.search(path, function (status, result) {

                        if (status === 'complete') {

                        }
                        else {

                        }
                    });
                })



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
                    FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '运单列表.xlsx');
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
                width: 200px;
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

    .details {
        width: 100%;

        .detailsTop {
            height: 10%;
            border-bottom: 1px solid @color-F0;

            .detailsTopLeft {
                width: 60%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                div {
                    flex: 1;
                    height: 60%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }

            .detailsTopRight {
                width: 40%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                .el-button {
                    width: 110px;
                    height: 35px;
                }
            }
        }

        .detailsBottom {
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

            .handle-table {
                width: 100%;
            }

            height: 90%;
        }

        .seeOrderCenterDiv {
            height: 200px;
            width: 100%;
            padding-left: 2.5%;
            padding-right: 2.5%;
            font-size: @font-size-small-s;

            .seeOrderCenterDivO {
                width: 100%;
                height: 33%;

                .seeOrderCenterDivOD1 {
                    width: 50%;
                    height: 100%;
                    display: flex;
                    align-items: center;

                    div {
                        flex: 1;
                    }
                }

                .seeOrderCenterDivOD2 {
                    width: 50%;
                    height: 100%;
                    display: flex;
                    align-items: center;

                    div {
                        flex: 1;
                    }
                }
            }

            .seeOrderCenterDivT {
                height: 34%;

                .seeOrderCenterDivTD {
                    width: 50%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                }
            }
        }
    }

    .red {
        color: @color-bg-red;
    }


</style>
<style>
    .el-message-box .el-message-box__btns .el-button {
        width: 100px;
        height: 40px;
    }
    .el-select-dropdown__list {
        padding: 6px 20px;
    }


</style>

