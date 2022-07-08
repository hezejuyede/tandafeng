<template>
    <div class="templateDiv">
        <div class="templateDivLeft fl">
            <div class="LeftText clearfix">
                <div class="LeftTextTitle">
                    县域乡村振兴全景展示
                </div>
                <div class="LeftTextSelect clearfix">
                    <div class="fl" style="margin-right: 10px">
                        <el-select
                            style="width: 120px"
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
                    <div class="fl">
                        <el-select
                            style="width: 120px"
                            v-model="type"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="选择县域类型">
                            <el-option
                                v-for="item in typeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="LeftTextExplain clearfix">
                    <div class="LeftTextExplainDiv ">
                        <div class="LeftTextExplainL fl" style="background-color: #17A15E"></div>
                        <div class="LeftTextExplainR fl">示范引领类</div>
                    </div>
                    <div class="LeftTextExplainDiv">
                        <div class="LeftTextExplainL fl" style="background-color: #1790A0"></div>
                        <div class="LeftTextExplainR fl">整体推进类</div>
                    </div>
                    <div class="LeftTextExplainDiv">
                        <div class="LeftTextExplainL fl" style="background-color: #116295"></div>
                        <div class="LeftTextExplainR fl">巩固提升类</div>
                    </div>


                </div>
            </div>
            <div id="chart_map" style="width:100%;height:650px;"></div>
        </div>
        <div class="templateDivRight fl">
            <div class="rightBar">
                <div class="rightBarTitle clearfix">乡村振兴电力指数趋势</div>
                <div id="chart_2" class="chart t_btn9" style="width:100%;height: 250px;"></div>
            </div>
            <div class="rightList">
                <div class="rightListTitle clearfix">电力指数TOP5</div>
                <div class="rightListRadio">
                    <el-radio-group v-model="radio1">
                        <el-radio-button label="示范引领类"></el-radio-button>
                        <el-radio-button label="整体推进类"></el-radio-button>
                        <el-radio-button label="巩固提升类"></el-radio-button>
                    </el-radio-group>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#FFF',color:'#959595',height:'60px',borderColor:'#FFF',fontSize:'12px',fontWeight: 'bold'}"
                              :cell-style="{fontSize:'12px',fontWeight: 'norma',background:'#FFF'}"
                              :height="250"
                              id="rebateSetTable"
                              ref="moviesTable"
                              highlight-current-row
                              style="width: 90%;margin: auto">
                        <el-table-column
                            label="排名"
                            align="center"
                            width="60">
                            <template slot-scope="scope">
                                <span style="color: #4C897E;font-size: 14px">{{"0"+ (scope.$index+1)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="county"
                            align="center"
                            label="县域">
                        </el-table-column>
                        <el-table-column
                            prop="enterpriseName"
                            align="center"
                            label="电力指数">
                            <template slot-scope="scope">
                                <span style="color: #F08A63;font-size: 16px">{{scope.row.enterpriseName}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
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
            regionBar:[{"type":"bar","color":"#008972","barWidth" : 10,},{"type":"bar","color":"#F2AA49","barWidth" : 10},{"type":"bar","color":"#909399","barWidth" : 10}],
            regionData:[
                [
                    "类型",
                    "示范引领类",
                    "整体推进类",
                    "巩固提升类"
                ],
                [
                    "2018",
                    594.12,
                    256.47,
                    175.39
                ],
                [
                    "2019",
                    594.12,
                    256.47,
                    175.39
                ],
                [
                    "2020",
                    594.12,
                    256.47,
                    175.39
                ]
            ],
            radio1:"示范引领类",
            tables:[
                {"enterpriseName":"99.9","county":"邹城市"},
                {"enterpriseName":"98.6","county":"肥城县"},
                {"enterpriseName":"97.5","county":"招远市"},
                {"enterpriseName":"97.1","county":"商河县"},
                {"enterpriseName":"96.4","county":"博兴县"}
            ],
            year:"",
            yearOptions:[
                {"name": "2018年", "id": "1"},
                {"name": "2019年", "id": "2"},
                {"name": "2020年", "id": "4"},
                {"name": "全部", "id": ""}
            ],
            type:"",
            typeOptions:[
                {"name": "示范引领类", "id": "1"},
                {"name": "整体推进类", "id": "2"},
                {"name": "巩固提升类", "id": "4"},
                {"name": "全部", "id": ""}
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
            this.carbonEmissionWarning();
        },


        //山东碳排放地图
        shandongMap() {
            var myChart = this.$echarts.init(document.getElementById('chart_map'));

            function showProvince() {
                var geoCoordMap = {};
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
                                textStyle: {color: "#ffffff",fontSize: 8,}
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
                                areaColor: "#17A15E", //区域颜色
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

        //不同区域碳排放预警
        carbonEmissionWarning() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('chart_2'));
            // 绘制图表
            myChart.setOption(
                {
                    legend: {
                        textStyle: {
                            fontSize: 10,//字体大小
                            color: '#B9BABA'//字体颜色
                        },
                    },
                    tooltip: {
                        trigger: 'item',
                        textStyle: {
                            color: '#B9BABA'
                        },
                    },
                    grid: {},
                    dataset: {
                        source: this.regionData
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
                                color: "#B9BABA"
                            }
                        }
                    },
                    yAxis: {
                        axisLine: {
                            show: true,

                        },
                        axisTick: { //y轴刻度线
                            show: false,
                            axisLine: { //y轴
                                show: false
                            },
                            textStyle: {
                                color: "#fff",
                                margin: 15
                            },


                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "#F0F1F1",
                                width: 1,
                                type: "solid"
                            },
                        },

                        axisLabel: {
                            textStyle: {
                                color: "#B9BABA"
                            }
                        }
                    },
                    series: this.regionBar
                }, true);
        },
    }

}


</script>
<style scoped lang="less" rel="stylesheet/less">
.templateDiv {
    width: 100%;
    height: 100%;

    .templateDivLeft {
        width: 75%;
        height: 100%;
        background-color: #EDF3F2;
        padding-left: 50px;
        position: relative;
        .LeftText{
            width: 270px;
            height: 200px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 999999;
            .LeftTextTitle{
                height: 40px;
                line-height: 40px;
                font-size: 18px;
                padding-left: 20px;
                color: #287165;
                font-weight: bold;
            }
            .LeftTextSelect{
                margin-top: 10px;
                padding-left: 20px;
            }
            .LeftTextExplain{
                height: 80px;
                margin-top: 20px;
                .LeftTextExplainDiv{
                    height: 20px;
                    padding-left: 20px;
                    margin-top: 5px;
                    .LeftTextExplainL{
                        width: 15px;
                        height: 15px;
                        margin-top: 2.5px;
                        border-radius:5px ;
                        margin-right: 5px;
                    }
                    .LeftTextExplainR{
                        color: #1790A0;
                    }
                }
            }

        }
    }

    .templateDivRight {
        width: 25%;
        height: 100%;

        .rightBar {
            height: 47%;
            background-color: #FFF;
            padding-top: 10px;
            margin-bottom: 3%;

            .rightBarTitle {
                height: 20px;
                color: #63978F;
                font-size: 16px;
                margin-top: 5px;
                margin-left: 20px;
                margin-bottom: 20px;
            }

        }

        .rightList {
            height: 48%;
            background-color: #FFF;
            .rightListTitle {
                height: 40px;
                color: #63978F;
                font-size: 16px;
                margin-top: 5px;
                margin-left: 20px;
                line-height: 40px;
            }
            .rightListRadio{
                width: 100%;
                padding-left: 20px;
                height: 40px;

                /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner {
                    background-color: #008972;
                }
            }
        }
    }
    .el-table {
        /deep/ th {
            padding: 0 ;
        }
        /deep/ td {
            padding: 2px ;
        }
    }
}


</style>
