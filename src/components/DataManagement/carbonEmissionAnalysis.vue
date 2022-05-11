<template>
    <div class="templateDiv">
        <div class="crumbs clearfix">
            <div class="crumbsLeft fl" id="crumbsLeft">
                <div style="margin-left: 10px" class="fl">
                    <span class="textColor">时间</span>
                    <span>:</span>
                    <el-date-picker
                        :picker-options="pickerOptions"
                        style="width: 250px"
                        v-model="examineTime"
                        type="monthrange"
                        start-placeholder="开始月份"
                        end-placeholder="结束月份"
                        value-format="yyyy-MM">
                    </el-date-picker>
                </div>
                <div style="margin-left: 10px" class="fl">
                    <span class="textColor">区域</span>
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
                </div>
                <div style="margin-left: 10px" class="fl">
                    <span class="textColor">行业</span>
                    <span>:</span>
                    <el-select
                        style="width:250px"
                        v-model="type"
                        clearable
                        filterable
                        allow-create
                        multiple
                        collapse-tags
                        default-first-option
                        placeholder="请选择行业">
                        <el-option
                            v-for="item in typeOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="crumbsRight fr">
                <el-button type="primary" @click="doSearch">查询</el-button>
                <el-button type="success" @click="doReset">重置</el-button>
                <el-button type="warning" @click="importPrinting">导出Excel</el-button>
            </div>
        </div>
        <div class="regionTable">
            <region :tables="regionTable" :cols="regionCols"></region>
        </div>
        <div class="regionBar">
            <div id="regionBar" :style="{width: '100%', height: '100%'}"></div>
        </div>
        <div class="regionLine">
            <div id="regionLine" :style="{width: '100%', height: '100%'}"></div>
        </div>
        <div class="industryTable">
            <industry :tables="industryTable" :cols="industryCols"></industry>
        </div>

        <div class="industryBar">
            <div id="industryBar" :style="{width: '100%', height: '100%'}"></div>
        </div>
        <div class="industryLine">
            <div id="industryLine" :style="{width: '100%', height: '100%'}"></div>
        </div>
        <div class="enterpriseTable">
            <div class="enterpriseTableLeft fl">
                <enterprise :tables="enterpriseTable"></enterprise>
            </div>
            <div class="enterpriseTableRight fl">
                <div id="enterpriseBar" :style="{width: '100%', height: '100%'}"></div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import Region from './carbonEmissionAnalysis/region'
    import Enterprise from './carbonEmissionAnalysis/enterprise'
    import Industry from './carbonEmissionAnalysis/industry'
    import {regionOptions,typeOptions} from "../../utils/options";
    import {industryCarbonReport,
        enterpriseOverDischargeWarning,
        industryCarbonBar,
        industryCarbonLine,
        regionalCarbonLine,
        regionalCarbonBar,
        enterprisePie,
        regionalCarbonReport,
    } from "../../api/dataManagement";


    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                examineTime: [],
                region: [],
                regionOptions:regionOptions,

                type: [],
                typeOptions: typeOptions,


                regionTable:[],
                regionCols:[],
                regionData:[],
                regionBar:[],
                regionLine:[],

                industryTable:[],
                industryCols:[],
                industryData:[],
                industryBar:[],
                industryLine:[],

                enterpriseTable:[],
                enterprisePie:[],

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


        components: {Region,Enterprise,Industry},

        mounted() {
            this.doSearch();

        },
        created() {

        },
        methods: {

            //打开全局遮罩层
            openFullScreen() {
                this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0,0,0,0.4)'
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

            //重置
            doReset() {
                this.examineTime = [];
                this.region = "";
                this.type = "";
            },

            //查詢
            doSearch() {
                this.openFullScreen();
                let startTime, endTime;
                if (this.examineTime === null) {
                    startTime = 0;
                    endTime = 0;

                } else if (this.examineTime.length > 0) {

                    startTime = this.examineTime[0];
                    endTime = this.examineTime[1];
                } else {
                    startTime = 0;
                    endTime = 0;
                }

                this.setRegionList(startTime,endTime,this.region);
                this.setRegionBar(startTime,endTime,this.region);
                this.setRegionLine(startTime,endTime,this.region);

                this.setIndustryList(startTime,endTime,this.type);
                this.setIndustryBar(startTime,endTime,this.type);
                this.setIndustryLine(startTime,endTime,this.type);

                this.setEnterpriseList();
                this.setEnterprisePie();

                this.closeFullScreen();
            },

            //导出打印
            importPrinting() {
                let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable1'));
                /* get binary string as output */
                let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'});
                try {
                    FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '区域碳报表.xlsx');
                } catch (e) {
                    if (typeof console !== 'undefined')
                        console.log(e, wbout)
                }


                let wb2 = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable2'));
                /* get binary string as output */
                let wbout2 = XLSX.write(wb2, {bookType: 'xlsx', bookSST: true, type: 'array'});
                try {
                    FileSaver.saveAs(new Blob([wbout2], {type: 'application/octet-stream'}), '行业碳报表.xlsx');
                } catch (e) {
                    if (typeof console !== 'undefined')
                        console.log(e, wbout2)
                }


                let wb3 = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable3'));
                /* get binary string as output */
                let wbout3 = XLSX.write(wb3, {bookType: 'xlsx', bookSST: true, type: 'array'});
                try {
                    FileSaver.saveAs(new Blob([wbout3], {type: 'application/octet-stream'}), '企业超排预警.xlsx');
                } catch (e) {
                    if (typeof console !== 'undefined')
                        console.log(e, wbout3)
                }
            },

            //设置区域列表
            setRegionList(startTime,endTime,region){
                let that = this;
                const setRegionList = async () => {
                    const result = await regionalCarbonReport({
                        "startTime":startTime,
                        "endTime": endTime,
                        "region":region,
                    })
                     that.regionCols = result.data.data.cols;
                     that.regionTable = result.data.data.data;
                }
                setRegionList();
            },


            //设置区域柱状图
            setRegionBar(startTime, endTime, region) {
                let that = this;
                const setRegionBar = async () => {
                    const result = await regionalCarbonBar({
                        "startTime": startTime,
                        "endTime": endTime,
                        "region": region,
                    })

                    that.regionBar = result.data.data.bar;
                    that.regionData = result.data.data.data;

                    let myChart = this.$echarts.init(document.getElementById('regionBar'));
                    // 绘制图表
                    myChart.setOption(
                        {
                            legend: {
                                textStyle: {
                                    fontSize: 12,//字体大小
                                    color: '#ffffff'//字体颜色
                                },
                            },
                            tooltip: {
                                trigger: 'item',
                                textStyle: {
                                    color: '#ffffff'
                                },
                            },
                            grid: {},
                            dataset: {
                                source: that.regionData
                            },
                            xAxis: {

                                type: 'category',
                                axisLine: {
                                    lineStyle: {
                                        color: "#3A4467"
                                    }
                                },
                                offset: 10,
                                axisTick: { //x轴刻度线
                                    show: false,
                                },
                                splitLine: {show: false},
                                axisLabel: {
                                    textStyle: {
                                        color: "#FFF"
                                    }
                                }
                            },
                            yAxis: {
                                axisLine: {
                                    show: false,
                                },
                                axisTick: { //y轴刻度线
                                    show: false,
                                    axisLine: { //y轴
                                        show: false
                                    },

                                },
                                splitLine: {
                                    lineStyle: {
                                        color: "#3A4467"
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: "#FFF"
                                    }
                                }
                            },
                            series: that.regionBar
                        }, true);
                }

                setRegionBar();

            },
            //设置区域线形图
            setRegionLine(startTime, endTime, region) {
                let that = this;
                const setRegionLine = async () => {
                    const result = await regionalCarbonLine({
                        "startTime": startTime,
                        "endTime": endTime,
                        "region": region,
                    })
                    that.regionLine = result.data.data.line;
                    that.regionData = result.data.data.data;
                    let myChart = this.$echarts.init(document.getElementById('regionLine'));
                    // 绘制图表
                    myChart.setOption(
                        {
                            legend: {
                                textStyle: {
                                    fontSize: 12,//字体大小
                                    color: '#ffffff'//字体颜色
                                },
                            },
                            tooltip: {
                                trigger: 'item',
                                textStyle: {
                                    color: '#ffffff'
                                },
                            },
                            grid: {},
                            dataset: {
                                source: that.regionData
                            },
                            xAxis: {
                                type: 'category',
                                axisLine: {
                                    lineStyle: {
                                        color: "#3A4467"
                                    }
                                },
                                offset:10,
                                axisTick:{ //y轴刻度线
                                    show:false,

                                },

                                splitLine:{show: false},
                                axisLabel: {
                                    textStyle: {
                                        color: "#FFF"
                                    }
                                }
                            },
                            yAxis: {
                                axisLine: {
                                    show:false,
                                },
                                axisTick:{ //y轴刻度线
                                    show:false,
                                    axisLine:{ //y轴
                                        show:false
                                    },

                                },

                                splitLine: {
                                    lineStyle: {
                                        color: "#3A4467"
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: "#FFF"
                                    }
                                }
                            },
                            series: that.regionLine
                        }, true);
                }
                setRegionLine();

            },


            //设置行业列表
            setIndustryList(startTime, endTime, type) {
                let that = this;
                const setIndustryList = async () => {
                    const result = await industryCarbonReport({
                        "startTime": startTime,
                        "endTime": endTime,
                        "type": type
                    })
                    that.industryCols = result.data.data.cols;
                    that.industryTable = result.data.data.data;
                }
                setIndustryList();
            },

            //设置行业柱状图
            setIndustryBar(startTime, endTime, type) {
                let that = this;
                const setIndustryBarS = async () => {
                    const result = await industryCarbonBar({
                        "startTime": startTime,
                        "endTime": endTime,
                        "type": type
                    })
                    that.industryBar = result.data.data.bar;
                    that.industryData = result.data.data.data;

                    let myChart = this.$echarts.init(document.getElementById('industryBar'));
                    // 绘制图表
                    myChart.setOption(
                        {
                        legend: {
                            textStyle: {
                                fontSize: 12,//字体大小
                                color: '#ffffff'//字体颜色
                            },
                        },
                        tooltip: {
                            trigger: 'item',
                            textStyle: {
                                color: '#ffffff'
                            },
                        },
                        grid: {},
                        dataset: {
                            source: that.industryData
                        },

                        xAxis: {
                            type: 'category',
                            axisLine: {
                                lineStyle: {
                                    color: "#3A4467"
                                }
                            },
                            offset:10,
                            axisTick:{ //y轴刻度线
                                show:false,
                            },
                            axisLabel: {
                                textStyle: {
                                    color: "#FFF"
                                }
                            },

                            splitLine: {
                                show: false
                            }
                        },
                        yAxis: {
                            axisLine: {
                                show:false,
                            },
                            axisTick:{ //y轴刻度线
                                show:false,
                                axisLine:{ //y轴
                                    show:false
                                },
                            },
                            splitLine: {
                                lineStyle: {
                                    color: "#3A4467"
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color: "#FFF"
                                }
                            }
                        },
                        series: that.industryBar,
                    },true);
                }
                setIndustryBarS();
            },

            //设置行业线形图
            setIndustryLine(startTime, endTime, type) {
                let that = this;
                const setIndustryLine = async () => {
                    const result = await industryCarbonLine({
                        "startTime": startTime,
                        "endTime": endTime,
                        "type": type,
                    })
                    that.industryLine = result.data.data.line;
                    that.industryData = result.data.data.data;
                    let myChart = this.$echarts.init(document.getElementById('industryLine'));
                    // 绘制图表
                    myChart.setOption(
                        {
                        legend: {
                            textStyle: {
                                fontSize: 12,//字体大小
                                color: '#ffffff'//字体颜色
                            },
                        },
                        tooltip: {
                            trigger: 'item',
                            textStyle: {
                                color: '#ffffff'
                            },
                        },
                        grid: {},
                        dataset: {
                            source: that.industryData,
                        },
                        xAxis: {
                            type: 'category',
                            axisLine: {
                                lineStyle: {
                                    color: "#3A4467"
                                }
                            },
                            offset:10,
                            splitLine: {
                                show: false
                            },
                            axisTick:{ //y轴刻度线
                                show:false
                            },
                            axisLabel: {
                                textStyle: {
                                    color: "#FFF"
                                }
                            }
                        },
                        yAxis: {
                            axisLine: {
                                show:false,
                            },
                            axisTick:{ //y轴刻度线
                                show:false,
                                axisLine:{ //y轴
                                    show:false
                                },
                            },
                            splitLine: {
                                lineStyle: {
                                    color: "#3A4467"
                                }
                            },

                            axisLabel: {
                                textStyle: {
                                    color: "#FFF"
                                }
                            }
                        },

                        series: that.industryLine
                    },true);

                }
                setIndustryLine();


            },


            //设置企业列表
            setEnterpriseList(){
                let that = this;
                const setEnterpriseList = async () => {
                    const result = await enterpriseOverDischargeWarning({
                        "enterpriseName": "",
                        "type": "",
                        "iDisplayStart": 0,
                        "iDisplayLength":10
                    })
                    that.enterpriseTable = result.data.data.data;
                }
                setEnterpriseList();
            },

            //设置企业饼图
            setEnterprisePie(){
                let that = this;
                const setEnterprisePie = async () => {
                    const result = await enterprisePie({
                        "enterpriseName": "",
                        "type": "",
                        "iDisplayStart": 0,
                        "iDisplayLength":10
                    })
                    /*  that.regionCols = result.data.data.cols;
                      that.regionTable = result.data.data.data;*/

                    let myChart = this.$echarts.init(document.getElementById('enterpriseBar'));
                    // 绘制图表
                    myChart.setOption({
                        title: {
                            text: '不同企业超排预警',
                            subtext: '不完全统计',
                            left: 'center',
                            textStyle: {
                                //⽂字颜⾊
                                color: '#ffffff',
                                //字体风格,'normal','italic','oblique'
                                fontStyle: 'normal',
                                //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                                fontWeight: 'bold',
                                //字体系列
                                fontFamily: 'sans-serif',
                                //字体⼤⼩
                                fontSize: 18
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            textStyle: {
                                color: '#ffffff'
                            },
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            textStyle: {
                                fontSize: 12,//字体大小
                                color: '#ffffff'//字体颜色
                            },
                        },
                        series: [
                            {
                                name: '碳排放',
                                type: 'pie',
                                radius: ['40%', '70%'],
                                data: [
                                    {
                                        value: 1048, name: '800-1200吨', label: {
                                            color: '#ffffff'
                                        }
                                    },
                                    {
                                        value: 735, name: '500-800吨', label: {
                                            color: '#ffffff'
                                        }
                                    },
                                    {
                                        value: 580, name: '1200-1500吨', label: {
                                            color: '#ffffff'
                                        }
                                    },
                                    {
                                        value: 244, name: '1500吨以上', label: {
                                            color: '#ffffff'
                                        }
                                    },
                                    {
                                        value: 300, name: '500吨以下', label: {
                                            color: '#ffffff'
                                        }
                                    }
                                ],
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: '#ffffff'
                                    }
                                }
                            }
                        ]
                    });
                }
                setEnterprisePie();

               /* this.$nextTick(

                );*/



            },



        },
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .templateDiv {
        width: 100%;
        height: 100%;
        overflow: auto;
        background: url(../../assets/img/bg.png) no-repeat;
        background-size:100% 100%;
        .crumbs {
            width: 100%;
            height: 80px;
            line-height: 80px;
            .crumbsLeft {
                height: 30px;
            }
            .crumbsRight {
                margin-right: 50px;
                .el-button {
                    width: 100px;
                    height: 35px;
                }
            }
        }
        .regionTable{
            margin-bottom: 50px;
        }
        .regionBar{
            height: 500px;
            width: 100%;
            margin-bottom: 50px;
        }
        .regionLine{
            height: 500px;
            width: 100%;
            margin-bottom: 50px;
        }
        .industryTable{
            margin-bottom: 50px;
        }
        .industryBar{
            height: 500px;
            width: 100%;
            margin-bottom: 50px;
        }
        .industryLine{
            height: 500px;
            width: 100%;
            margin-bottom: 50px;
        }
        .enterpriseTable{
            height: 500px;
            .enterpriseTableLeft{
                width: 60%;
                height: 100%;
            }
            .enterpriseTableRight{
                width: 40%;
                height: 100%;
            }

        }
        .textColor{
            color:#ffffff;
        }
    }
</style>
