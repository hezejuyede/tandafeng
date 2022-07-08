<template>
    <div class="templateDiv">
        <div class="crumbsDiv">
            <div class="crumbsLeft fl">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>全省县域乡村振兴全景展示</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>

        <div class="templateDivLeft">
            <div id="chart_map" style="width:100%;height:650px;"></div>
        </div>
        <div class="templateDivRight">

        </div>


    </div>
</template>
<script type="text/ecmascript-6">
import '../../utils/shandong'


export default {
    name: 'index',
    data() {
        return {}
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
                    , '马山子镇': [117.876911, 38.026408],
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
                                textStyle: {color: "#ffffff"}
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
                                        color: 'rgba(47,79,79, .2)' // 100% 处的颜色
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
.templateDiv{
    width: 100%;
    height: 100%;
    .crumbsDiv {
        width: 100%;
        height: 50px;
        line-height: 50px;
        background-color: #fff;
        .crumbsLeft {
            width: 500px;
            height: 30px;
            padding-top: 17px;
            padding-left: 20px;
        }

        .crumbsRight {
            margin-right: 50px;
            .el-button {
                width: 100px;
                height: 35px;
            }
        }
        /deep/ .el-breadcrumb__inner {
            font-size: 20px;
            font-weight: bold;
            color: #000000;
        }
    }
    .templateDivLeft{
        width: 75%;
        height: 100%;
        background-color: #4b8df8;
        padding-left: 80px;
    }
}


</style>
