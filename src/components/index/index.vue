<template>
    <div class="template">
        <div class="crumbs">
            <i class="el-icon-s-home"></i>
            <span>系统首页</span>
        </div>
        <div class="templateDiv">

            <div class="templateBottom">
                <div class="templateBottomL fl" ref="templateBottomL">
                    <div id="dataBar1" :style="{width: '100%', height: lHeight}"></div>
                </div>
                <div class="templateBottomR fl" ref="templateBottomR">
                    <div id="dataBar2" :style="{width: '100%', height: rHeight}"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import url from '../../assets/js/URL';
    import {getNowTime, getLestWeekTime} from '../../assets/js/api'

    export default {
        name: 'index',
        data() {
            return {
                message: '',
                examineTime:"",
                HideModal: true,
                iconData: [
                    {

                        "img": require("../../assets/img/home/dshdd.png"),
                        "text": "待审核运单/个",
                        "count": "0"
                    },
                    {
                        "img": require("../../assets/img/home/dshqy.png"),
                        "text": "待审核企业/个",
                        "count": "0"
                    },
                    {
                        "img": require("../../assets/img/home/ylgs.png"),
                        "text": "运力总数/个",
                        "count": "0"
                    },
                    {
                        "img": require("../../assets/img/home/hzgs.png"),
                        "text": "货主总数/个",
                        "count": "0"
                    },
                    {
                        "img": require("../../assets/img/home/zptxf.png"),
                        "text": "平台总消费额/元",
                        "count": "0"
                    },
                    {
                        "img": require("../../assets/img/home/zptps.png"),
                        "text": "平台总开票数/个",
                        "count": "0"
                    },
                ],
                lHeight:"",
                rHeight:"",
            }
        },
        computed: {},
        components: {},
        mounted() {
            /*this.getUserLine();
            this.getOrderLine();
            this.setHeight();*/


        },
        created() {
            this.getAdminState();
        },
        methods: {
            //页面加载检查用户是否登陆，没有登陆就加载登陆页面
            getAdminState() {
                const userInfo = localStorage.getItem("userInfo");
                if (userInfo === null) {


                } else {
                    let nowTime = getNowTime();
                    let lestWeekTime = getLestWeekTime();
                    let times = [];
                    times.push(lestWeekTime);
                    times.push(nowTime);
                    this.examineTime = times;
                    this.loadingShowData();
                }
            },


            //瞬间加载数据
            loadingShowData() {

                this.$post(" " + url + "/verify/yunWeiQuery", {})
                    .then((res) => {
                        if (res.code === 200) {
                            if (JSON.stringify(res.data) !== "{}") {
                                this.iconData[0].count = res.data.TOAUDITORDERNUM;
                                this.iconData[1].count = res.data.TOAUDITQIYENUM;
                                this.iconData[2].count = res.data.DRIVERNUM;
                                this.iconData[3].count = res.data.ENTERPRISENUM;
                                this.iconData[4].count = res.data.TOTALMONEY;
                                this.iconData[5].count = res.data.KPNUM;
                            } else {
                                this.$message.warning("暂无数据");
                            }
                        } else {
                            this.$message.warning(res.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },


            //获取用户折线图
            getUserLine() {
                this.$post(" " + url + "/census/userLine", {
                    "beginTime":this.examineTime[0],
                    "endTime":this.examineTime[1]
                })
                    .then((res) => {
                        if (res.code === 200) {
                            if (JSON.stringify(res.data) !== "{}") {
                                let yData = [];
                                for (let i = 0; i < res.data.yAxis.length; i++) {
                                    let json = {
                                        "name": res.data.yAxis[i].name,
                                        "type": 'line',
                                        "stack": '数量',
                                        "data": res.data.yAxis[i].data
                                    };
                                    yData.push(json)
                                }


                                let myChart = this.$echarts.init(document.getElementById('dataBar1'));
                                // 绘制图表
                                myChart.setOption({
                                    title : {
                                        text: '用户数量显示',
                                        subtext: '最近30天'
                                    },
                                    tooltip : {
                                        trigger: 'axis'
                                    },
                                    grid:{
                                        x:60,
                                        borderWidth:1
                                    },
                                    toolbox: {
                                        show : true,
                                        feature : {
                                            mark : {show: true},
                                            /*    dataView : {show: true, readOnly: false},*/
                                            magicType : {show: true, type: ['line', 'bar']},
                                            restore : {show: true},
                                            saveAsImage : {show: true}
                                        }
                                    },
                                    calculable : true,
                                    xAxis : [
                                        {
                                            type : 'category',
                                            boundaryGap : false,
                                            data : res.data.xAxis
                                        }
                                    ],
                                    yAxis : [
                                        {
                                            type : 'value'
                                        }
                                    ],
                                    series : yData
                                });

                            }
                            else {
                                this.$message.warning("暂无数据");
                            }
                        } else {
                            this.$message.warning(res.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },


            //获取订单折线图
            getOrderLine() {
                this.$post(" " + url + "/census/orderLine", {
                    "beginTime":this.examineTime[0],
                    "endTime":this.examineTime[1]
                })
                    .then((res) => {
                        if (res.code === 200) {
                            if (JSON.stringify(res.data) !== "{}") {
                                let xData = [];
                                let yData = [];

                                for (let i = 0; i < res.data.length; i++) {
                                    let yJson = res.data[i].totalCount;
                                    let xJson = res.data[i].censusDate;
                                    yData.push(yJson);
                                    xData.push(xJson);

                                }
                                let myChart = this.$echarts.init(document.getElementById('dataBar2'));
                                // 绘制图表
                                myChart.setOption({
                                    title : {
                                        text: '订单数量显示',
                                        subtext: '最近30天'
                                    },
                                    tooltip : {
                                        trigger: 'axis'
                                    },
                                    grid:{
                                        x:60,
                                        borderWidth:1
                                    },
                                    toolbox: {
                                        show : true,
                                        feature : {
                                            mark : {show: true},
                                            /*    dataView : {show: true, readOnly: false},*/
                                            magicType : {show: true, type: ['line', 'bar']},
                                            restore : {show: true},
                                            saveAsImage : {show: true}
                                        }
                                    },
                                    calculable : true,
                                    xAxis : [
                                        {
                                            type : 'category',
                                            boundaryGap : false,
                                            data : xData
                                        }
                                    ],
                                    yAxis : [
                                        {
                                            type : 'value'
                                        }
                                    ],
                                    series : [
                                        {
                                            name: '每日订单数量',
                                            type: 'line',
                                            stack: '总量',
                                            data: yData
                                        }]
                                });

                            }
                            else {
                                this.$message.warning("暂无数据");
                            }
                        } else {
                            this.$message.warning(res.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            //动态设置高度
            setHeight() {
                let l = this.$refs.templateBottomL.offsetHeight;
                this.lHeight = 0.95 * l + "px";
                this.rHeight = 0.95 * l + "px";
            }
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .template {
        width: 100%;
        height: 100%;
        background-color: @color-F0;

        .crumbs {
            height: 35px;
            display: flex;
            align-items: center;
            padding-left: 20px;
            margin-bottom: 20px;
            background-color: @color-white;

            .el-icon-s-home {
                font-size: 180%;
                margin-right: 5px;
                color: @color-bg-lan;
            }
        }

        .templateDiv {
            width: 100%;
            height: 100%;
            background-color: @color-F0;

            .templateTop {
                width: 96%;
                margin: 0 auto;
                height: 12%;

                .IconTemplate {
                    width: 15.5%;
                    height: 100%;
                    background-color: #2d8cf0;
                    margin-right: 1.5%;
                    display: flex;
                    border-radius: 5px;

                    .IconTemplateDiv {
                        height: 100%;
                        width: 100%;
                        border-radius: 5px;
                        background-repeat: no-repeat;
                        background-size: cover;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;

                        .textStyle {
                            font-size: @font-size-small;
                            color: @color-white;
                            margin-top: 10px;
                            margin-right: 10px;
                        }

                        .countStyle {
                            font-size: @font-size-large-x;
                            color: @color-white;
                            margin-right: 10px;
                        }


                    }

                }

                .IconTemplate:last-child {
                    width: 15%;
                    height: 100%;
                    background-color: #2d8cf0;
                    margin-right: 0;
                    display: flex;

                    .IconTemplateDiv {
                        height: 100%;
                        width: 100%;
                        background-repeat: no-repeat;
                        background-size: cover;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;

                        .textStyle {
                            font-size: @font-size-small;
                            color: @color-white;
                            margin-top: 10px;
                            margin-right: 10px;
                        }

                        .countStyle {
                            font-size: @font-size-large-x;
                            color: @color-white;
                            margin-right: 10px;
                        }


                    }

                }

            }

            .templateBottom {
                height: 72%;
                width: 96%;
                margin: 20px auto;
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: @color-white;
                .templateBottomL{
                    width: 50%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                }

                .templateBottomR{
                    width: 50%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

            }
        }

    }

    @media only screen and (max-width: 1400px) {
        .template {
            width: 1400px;
        }

    }


</style>
