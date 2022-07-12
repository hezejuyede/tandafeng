<template>
    <div class="templateDiv">
        <!--header-->
        <div class="header">
            <div class="bg_header">
                <div class="header_nav fl t_title">
                    山东省县域电力指数可视化展示
                </div>
            </div>
        </div>
        <!--main-->
        <div class="data_content">

            <div class="data_main">
                <div class="main_left fl">
                    <div class="left_1 t_btn6" style="cursor: pointer;">


                        <div class="main_title">
                            乡村振兴电力走势趋势
                        </div>
                        <div id="chart_1" class="chart" style="width:100%;height: 250px"></div>
                    </div>
                    <div class="left_2" style="cursor: pointer;">

                    </div>
                </div>
                <div class="main_center fl" style="position: relative">
                    <div class="select">
                        <el-select
                            style="width: 130px;background-color: #409EFF"
                            v-model="year"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="年份">
                            <el-option
                                v-for="item in yearOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="center_text" style="position: relative;">

                        <div class="main_title" style="width: 200px; text-align: center">
                            <img src="./picture/t_3.png" alt="">
                           山东省数据中心
                        </div>
                        <div id="chart_map" style="width:100%;height:610px;">
                        </div>
                        <div class="linshi_zdy">
                           <!-- <ul>
                                <li><span></span>2015批(8个)</li>
                                <li><span></span>2016批(15个)</li>
                                <li><span></span>2017批(13个)</li>
                                <li><span></span>2018批(11个)</li>
                            </ul>-->
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="bottom1 fl">
                            <div class="">乡村振兴电力综合指数</div>
                            <div class="" id="bottom1"></div>
                        </div>
                        <div class="bottomT fl">
                            <div class="bottomT1">产业兴旺</div>
                            <div class="bottomT2">
                                999.9
                            </div>
                        </div>
                        <div class="bottomT fl">
                            <div class="bottomT1">生活富裕</div>
                            <div class="bottomT2">
                                999.9
                            </div>

                        </div>
                        <div class="bottomT fl">
                            <div class="bottomT1">农业发展</div>
                            <div class="bottomT2">
                                999.9
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>
<script type="text/ecmascript-6">
    import '../../utils/shandong'
    import {
        carbonEmissionPrediction,
        carbonEmissionWarning,
        electricityCarbonEmissionsPeak,
        peakCarbonEmission,
        shandongMap
    } from "../../api/largeDataScreen";

    export default {
        name: 'index',
        data() {
            return {
                year:"",
                yearOptions:[
                    {"name": "2019年", "id": "1"},
                    {"name": "2020年", "id": "2"},
                    {"name": "2021年", "id": "4"},
                ],
            }
        },
        computed: {},
        components: {},
        mounted() {
            this.doSearch();
        },
        created() {

        },
        methods: {

            //页面初始
            doSearch() {
                this.shandongMap();
                this.electricityCarbonEmissionsPeak();
                this.carbonEmissionPrediction()

            },

            //全省碳排放趋势预测
            carbonEmissionPrediction() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('bottom1'));
                myChart.setOption({
                    tooltip: {
                        formatter: '{a} <br/>{b} : {c}%'
                    },
                    series: [
                        {
                            name: 'Pressure',
                            type: 'gauge',
                            detail: {
                                formatter: '{value}'
                            },
                            data: [
                                {
                                    value: 50,
                                    name: 'SCORE'
                                }
                            ]
                        }
                    ]
                });
            },

            //不同区域碳排放预警
            carbonEmissionWarning() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('chart_2'));
                myChart.clear();
                myChart.setOption({
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['正常值', '超出值'],
                        textStyle: {
                            color: '#fff'
                        },
                        top: '8%'
                    },
                    grid: {
                        top: '20%',
                        left: '5%',
                        right: '5%',
                        bottom: '5%',
                        containLabel: true
                    },
                    color: ['#FF4949', '#FFA74D', '#FFEA51', '#4BF0FF', '#44AFF0', '#4E82FF', '#584BFF', '#BE4DFF', '#F845F1'],
                    xAxis: {
                        type: 'category',
                        boundaryGap: true,
                        data: ['滨城区', '沾化区', '惠民县', '阳信县', '无棣县', '博兴县', '邹平市'],
                        splitLine: {
                            show: false
                        },
                        offset: 5,
                        axisTick: { //y轴刻度线
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        axisLabel: {
                            color: '#FFF',
                            //  让x轴文字方向为竖向
                            interval: 0,
                            formatter: function (value) {
                                return value.split('').join('\n')
                            }
                        }
                    },
                    yAxis: {
                        name: '单位万吨',
                        nameTextStyle: {
                            color: "#FFF",
                            nameLocation: "center",
                        },
                        type: 'value',
                        splitLine: {
                            lineStyle: {
                                color: "#3A4467"
                            }
                        },
                        axisLine: {
                            show: false,
                        },
                        axisTick: { //y轴刻度线
                            show: false,
                        },
                        axisLabel: {
                            textStyle: {
                                color: "#FFF"
                            }
                        },
                    },
                    series: [

                        {

                            name: '超出值',
                            type: 'bar',
                            barGap: "-100%",
                            data: [9461.88, 0, 0, 0, 0, 0, 10233.63, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                            itemStyle: {
                                normal: {
                                    color: '#FE0000',
                                    barBorderRadius: [5, 5, 5, 5]
                                }
                            }
                        },
                        {

                            name: '正常值',
                            type: 'bar',
                            barGap: "-100%",
                            data: [5961.88, 4933.63, 4183.14, 1133.01, 4204.47, 4061.88, 7883.14],
                            itemStyle: {
                                normal: {
                                    color: '#AF6911',
                                    barBorderRadius: [5, 5, 5, 5]
                                }
                            }
                        },
                    ]
                });
            },


            //电力行业碳排放达峰预测
            electricityCarbonEmissionsPeak() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('chart_1'));
                myChart.clear();
                myChart.setOption({
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['电力综合指数', '产业兴旺', '生活富裕', '农业发展'],
                        textStyle: {
                            color: '#fff',
                            fontSize: '10'
                        },
                        top: '8%'
                    },
                    grid: {
                        top: '30%',
                        left: '5%',
                        right: '5%',
                        bottom: '5%',
                        containLabel: true
                    },
                    color: ['#00C6CE', '#A476CD', '#A68A15', '#65BB2D'],
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['2019', '2020', '2021'],
                        splitLine: {
                            show: false
                        },
                        offset: 10,
                        axisTick: { //y轴刻度线
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    yAxis: {
                        name: '',
                        nameTextStyle: {
                            color: "#FFF",
                            nameLocation: "center",
                        },
                        type: 'value',
                        splitLine: {
                            lineStyle: {
                                color: "#3A4467"
                            }
                        },
                        min: 50,
                        axisLine: {
                            show: false,
                        },
                        axisTick: { //y轴刻度线
                            show: false,
                        },
                        axisLabel: {
                            textStyle: {
                                color: "#FFF"
                            }
                        },
                    },
                    series: [
                        {
                            name: '电力综合指数',
                            type: 'line',
                            lineStyle: {
                                color: '#00C6CE'
                            },
                            smooth: false, //true 有弧度 ，false 没弧度（直线）
                            symbol: 'circle',
                            itemStyle: {
                                normal: {
                                    color: '#53C7A0'
                                }
                            },
                            data: [78, 90, 108]
                        },
                        {
                            name: '产业兴旺',
                            type: 'line',
                            lineStyle: {
                                color: '#A476CD'
                            },
                            smooth: false, //true 有弧度 ，false 没弧度（直线）
                            symbol: 'circle',
                            itemStyle: {
                                normal: {
                                    color: '#28A1FB'
                                }
                            },
                            data: [78, 89, 98]
                        },
                        {
                            name: '生活富裕',
                            type: 'line',
                            lineStyle: {
                                color: '#E37A17'
                            },
                            smooth: false, //true 有弧度 ，false 没弧度（直线）
                            symbol: 'circle',
                            itemStyle: {
                                normal: {
                                    color: '#A68A15'
                                }
                            },
                            data: [61, 76, 83]
                        },
                        {
                            name: '农业发展',
                            type: 'line',
                            lineStyle: {
                                color: '#65BB2D'
                            },
                            smooth: false, //true 有弧度 ，false 没弧度（直线）
                            symbol: 'circle',
                            itemStyle: {
                                normal: {
                                    color: '#E37A17'
                                }
                            },
                            data: [71, 76, 79,]
                        },
                    ]
                });
            },

            //碳排放峰值预测
            peakCarbonEmission() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('chart_4'));
                myChart.clear();
                myChart.setOption({
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['低碳情景', '基准情景', '高耗能情景'],
                        textStyle: {
                            color: '#fff'
                        },
                        top: '8%'
                    },
                    grid: {
                        top: '30%',
                        left: '5%',
                        right: '5%',
                        bottom: '5%',
                        containLabel: true
                    },
                    color: ['#FF4949', '#FFA74D', '#FFEA51', '#4BF0FF', '#44AFF0', '#4E82FF', '#584BFF', '#BE4DFF', '#F845F1'],
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['2018', '2022', '2026', '2030', '2034', '2038', '2042', '2046', '2050'],
                        splitLine: {
                            show: false
                        },
                        offset: 10,
                        axisTick: { //y轴刻度线
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    yAxis: {
                        name: '单位万吨',
                        nameTextStyle: {
                            color: "#FFF",
                            nameLocation: "center",
                        },
                        type: 'value',
                        splitLine: {
                            lineStyle: {
                                color: "#3A4467"
                            }
                        },
                        min: 50,
                        axisLine: {
                            show: false,
                        },
                        axisTick: { //y轴刻度线
                            show: false,
                        },
                        axisLabel: {
                            textStyle: {
                                color: "#FFF"
                            }
                        },
                    },
                    series: [
                        {
                            name: '低碳情景',
                            type: 'line',
                            lineStyle: {
                                color: '#53C7A0'
                            },
                            smooth: false, //true 有弧度 ，false 没弧度（直线）
                            symbol: 'circle',
                            itemStyle: {
                                normal: {
                                    color: '#53C7A0'
                                }
                            },
                            data: [78, 90, 108, 105, 95, 86, 76, 72, 73]
                        },
                        {
                            name: '基准情景',
                            type: 'line',
                            lineStyle: {
                                color: '#28A1FB'
                            },
                            smooth: false, //true 有弧度 ，false 没弧度（直线）
                            symbol: 'circle',
                            itemStyle: {
                                normal: {
                                    color: '#28A1FB'
                                }
                            },
                            data: [78, 89, 98, 108, 109, 105, 97, 86, 69.4]
                        },
                        {
                            name: '高耗能情景',
                            type: 'line',
                            lineStyle: {
                                color: '#E37A17'
                            },
                            smooth: false, //true 有弧度 ，false 没弧度（直线）
                            symbol: 'circle',
                            itemStyle: {
                                normal: {
                                    color: '#E37A17'
                                }
                            },
                            data: [81, 86, 93, 105, 118, 126, 128, 124, 107]
                        },
                    ]
                });
                window.addEventListener("resize", function () {
                    myChart.resize();
                });
            },


            //山东碳排放地图
            shandongMap() {
                var myChart = this.$echarts.init(document.getElementById('chart_map'));

                function showProvince() {
                    var geoCoordMap = {
                        '下河乡': [118.278110, 37.822820],
                        '郭集': [118.035729, 37.398876],
                        '辛店镇': [117.589722, 37.363453],
                        '魏桥镇': [117.498970, 37.028880]
                        , '马山子镇': [117.876911, 38.026408] ,
                        '商店镇': [117.689804, 37.558530],
                        '湖滨镇': [118.199060, 37.097540]
                    };
                    var data = [
                        {
                            name: '下河乡',
                            value: [50, '分布式光伏开发试点镇：<br/>项目承建企业24家<br/>发电服务站目前数量24个站点']
                        },
                        {
                            name: '郭集',
                            value: [50, '分布式光伏开发试点镇：<br/>项目承建企业24家<br/>发电服务站目前数量24个站点']
                        },
                        {
                            name: '辛店镇',
                            value: [50, '分布式光伏开发试点镇：<br/>项目承建企业24家<br/>发电服务站目前数量24个站点']
                        },
                        {
                            name: '魏桥镇',
                            value: [50, '分布式光伏开发试点镇：<br/>项目承建企业24家<br/>发电服务站目前数量24个站点']
                        },
                        {
                            name: '马山子镇',
                            value: [50, '分布式光伏开发试点镇：<br/>项目承建企业24家<br/>发电服务站目前数量24个站点']
                        },
                        {
                            name: '商店镇',
                            value: [50, '分布式光伏开发试点镇：<br/>项目承建企业24家<br/>发电服务站目前数量24个站点']
                        },
                        {
                            name: '湖滨镇',
                            value: [50, '分布式光伏开发试点镇：<br/>项目承建企业24家<br/>发电服务站目前数量24个站点']
                        }
                    ];
                    var max = 480,
                        min = 9;
                    var maxSize4Pin = 50,
                        minSize4Pin = 20;
                    var convertData = function (data) {
                        var res = [];
                        for (var i = 0; i < data.length; i++) {
                            var geoCoord = geoCoordMap[data[i].name];

                            if (geoCoord) {
                                res.push({
                                    name: data[i].name,
                                    value: geoCoord.concat(data[i].value),
                                });
                            }
                        }
                        return res;
                    };

                    myChart.setOption({
                        tooltip: {
                            trigger: 'item',
                            formatter: function loadData(result) {
                                return result.name + '<br />' + result.value[3];
                            }
                        },
                        geo: {
                            zoom: 1.2,
                            show: true,
                            map: '山东',
                            mapType: '山东',
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {color: "#4bf316"}
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                            },
                            roam: true,
                            itemStyle: {
                                normal: {
                                    borderColor: 'rgba(147, 235, 248, 1)',
                                    borderWidth: 2,
                                    areaColor: {
                                        type: 'radial',
                                        x: 0.5,
                                        y: 0.5,
                                        r: 0.8,
                                        colorStops: [{
                                            offset: 0,
                                            color: 'rgba(175,238,238, 0)' // 0% 处的颜色
                                        }, {
                                            offset: 1,
                                            color: 'rgba(   47,79,79, .2)' // 100% 处的颜色
                                        }],
                                        globalCoord: false // 缺省为 false
                                    },
                                    shadowColor: 'rgba(128, 217, 248, 1)',
                                    shadowOffsetX: -2,
                                    shadowOffsetY: 2,
                                    shadowBlur: 10
                                },
                                emphasis: {
                                    areaColor: '#389BB7',
                                    borderWidth: 0
                                }
                            }
                        },
                        series: [
                            {
                                name: '电商进农村示范县',
                                type: 'scatter',
                                coordinateSystem: 'geo',
                                symbol: 'pin',
                                symbolSize: function (val) {
                                    var a = (maxSize4Pin - minSize4Pin) / (max - min);
                                    var b = minSize4Pin - a * min;
                                    b = maxSize4Pin - a * max;
                                    return a * val[2] + b;
                                },
                                label: {
                                    normal: {
                                        formatter: '{b}',
                                        show: true,
                                        textStyle: {
                                            color: '#fff',
                                            fontSize: 10,
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: 'red', //标志颜色
                                    }
                                },
                                zlevel: 6,
                                data: convertData(data),
                            },
                            {
                                type: 'effectScatter',
                                coordinateSystem: 'geo',
                                data: convertData(data.sort(function (a, b) {
                                    return b.value - a.value;
                                }).slice(0, 47)),
                                symbolSize: function (val) {
                                    return val[2] / 10;
                                },
                                showEffectOn: 'render',
                                rippleEffect: {
                                    brushType: 'stroke'
                                },
                                hoverAnimation: true,
                                itemStyle: {
                                    normal: {
                                        color: '#05C3F9',
                                        shadowBlur: 10,
                                        shadowColor: '#05C3F9'
                                    }
                                },
                                zlevel: 1
                            },

                        ]
                    });
                }

                showProvince();
                window.addEventListener("resize", function () {
                    myChart.resize();
                });
            },
        }

    }


</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "css/base";
    @import "css/index";

    .linshi_zdy {
        position: absolute;
        right: 0px;
        top: 450px;
    }

    .linshi_zdy li {
        width: 150px;
        font-size: 16px;
        padding: 3px 8px;
        cursor: pointer;
    }

    .linshi_zdy span {
        display: block;
        width: 14px;
        height: 14px;
        float: left;
        border-radius: 50%;
        margin-top: 3px;
        margin-right: 5px;
    }

    .linshi_zdy li:first-child {
        color: #ff0000;
    }

    .linshi_zdy li:first-child span {
        background: #ff0000;
    }

    .linshi_zdy li:nth-child(2) {
        color: #9cff00;
    }

    .linshi_zdy li:nth-child(2) span {
        background: #9cff00;
    }

    .linshi_zdy li:nth-child(3) {
        color: #fff;
    }

    .linshi_zdy li:nth-child(3) span {
        background: #fff;
    }

    .linshi_zdy li:nth-child(4) {
        color: #f4a100;
    }

    .linshi_zdy li:nth-child(4) span {
        background: #f4a100;
    }

    .t_title {
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 2.5em;
        line-height: 80px;
        color: #fff;
    }

    #chart_map {
        cursor: pointer;
    }

    .t_show {
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 2px;
        background: #2C58A6;
        padding: 2px 5px;
        color: #fff;
        cursor: pointer;
    }


    .select{
        width: 200px;
        height: 50px;
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999999999;
    }

    /deep/ .el-select > .el-input {
        display: block;
        background-color: #052450;
    }
    .bottom{
        position: absolute;
        left: 0;
        bottom: -50px;
        width: 100%;
        height:100px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #4b8df8;

    }
    .bottom1{
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: red;
        height: 100%;
    }
    .bottomT{
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction:column;
    }

    .bottomT1 {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .bottomT2 {
        flex: 1;
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color:#05295C;
        font-size: 18px;
        color: #01BB49;
    }

</style>
<style scoped lang="less" rel="stylesheet/less">
    @import "css/index";
</style>
