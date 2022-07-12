<template>
    <div class="templateDiv">
        <div class="templateDivLeft fl">
            <div class="LeftText clearfix">
                <div class="LeftTextTitle">
                    全省县域空心化率全景展示
                </div>
                <div class="LeftTextSelect clearfix">
                    <div class="fl" style="margin-right: 10px">
                        <el-select
                            style="width: 130px"
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
                </div>
            </div>
            <div id="chart_map" style="width:100%;height:650px;"></div>
        </div>
        <div class="templateDivRight fl">
            <div class="rightList">
                <div class="rightListTitle clearfix">空心化率</div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#FFF',color:'#959595',height:'60px',borderColor:'#FFF',fontSize:'12px',fontWeight: 'bold'}"
                              :cell-style="{fontSize:'12px',fontWeight: 'norma',background:'#FFF'}"
                              :height="500"
                              id="rebateSetTable"
                              ref="moviesTable"
                              highlight-current-row
                              style="width: 90%;margin: auto">
                        <el-table-column
                            type="index"
                            label="排名"
                            align="center"
                            width="50">
                        </el-table-column>
                        <el-table-column
                            prop="county"
                            align="center"
                            label="县域">
                        </el-table-column>
                        <el-table-column
                            prop="enterpriseName"
                            align="center"
                            label="2019"
                            width="60">
                        </el-table-column>
                        <el-table-column
                            prop="enterpriseName"
                            align="center"
                            label="2020"
                            width="60">
                        </el-table-column>
                        <el-table-column
                            prop="enterpriseName"
                            align="center"
                            label="2021"
                            width="60">
                        </el-table-column>
                    </el-table>

                </div>
                <div class="rightListPage">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :page-size="mrPage"
                        layout="total,prev, pager, next, jumper"
                        :total="countSize">
                    </el-pagination>
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
            tables:[
                {"enterpriseName":"99.9","county":"邹城市"},
                {"enterpriseName":"98.6","county":"肥城县"},
                {"enterpriseName":"97.5","county":"招远市"},
                {"enterpriseName":"97.1","county":"商河县"},
                {"enterpriseName":"96.4","county":"博兴县"},
                {"enterpriseName":"99.9","county":"滕州市"},
                {"enterpriseName":"98.6","county":"荣成市"},
                {"enterpriseName":"97.5","county":"招远市"},
                {"enterpriseName":"97.1","county":"郓城县"},
                {"enterpriseName":"96.4","county":"临朐县"}
            ],
            year:"",
            yearOptions:[
                {"name": "2019年", "id": "1"},
                {"name": "2020年", "id": "2"},
                {"name": "2021年", "id": "4"},
            ],



            countyOptions: [
                {"name": "历下区", "value": "19.9"},
                {"name": "即墨区", "value": "29.9"},
                {"name": "胶州市", "value": "40"},
                {"name": "城阳区", "value": "59.9"},
                {"name": "兰山区", "value": "69.9"},
                {"name": "龙口市", "value": "79.9"},
                {"name": "市中区1", "value": "89.9"},
                {"name": "滕州市", "value": "90"},
                {"name": "沂南县", "value": "93"},
                {"name": "市南区", "value": "79.9"},
                {"name": "历城区", "value": "69.9"},
                {"name": "章丘区", "value": "59.9"},
                {"name": "芝罘区", "value": "49.9"},
                {"name": "市北区", "value": "39.9"},
                {"name": "荣成市", "value": "29.9"},
                {"name": "黄岛区", "value": "19.9"},
                {"name": "崂山区", "value": "19.9"},
                {"name": "邹城市", "value": "29.9"},
                {"name": "寿光市", "value": "39.9"},
                {"name": "临淄区", "value": "49.9"},
                {"name": "肥城市", "value": "59.9"},
                {"name": "平度市", "value": "69.9"},
                {"name": "招远市", "value": "79.9"},
                {"name": "张店区", "value": "89.9"},
                {"name": "莱州市", "value": "99.9"},
                {"name": "诸城市", "value": "99.9"},
                {"name": "莱芜区", "value": "89.9"},
                {"name": "东营区", "value": "79.9"},
                {"name": "槐荫区", "value": "69.9"},
                {"name": "广饶县", "value": "59.9"},
                {"name": "桓台县", "value": "49.9"},
                {"name": "青州市", "value": "39.9"},
                {"name": "天桥区", "value": "29.9"},
                {"name": "邹平市", "value": "19.9"},
                {"name": "文登区", "value": "19.9"},
                {"name": "莱西市", "value": "29.9"},
                {"name": "李沧区", "value": "39.9"},
                {"name": "任城区", "value": "49.9"},
                {"name": "兖州区", "value": "59.9"},
                {"name": "新泰市", "value": "69.9"},
                {"name": "东港区", "value": "79.9"},
                {"name": "岚山区", "value": "89.9"},
                {"name": "高密市", "value": "99.9"},
                {"name": "泰山区", "value": "99.9"},
                {"name": "东昌府区", "value": "89.9"},
                {"name": "滨城区", "value": "79.9"},
                {"name": "曹县", "value": "69.9"},
                {"name": "淄川区", "value": "59.9"},
                {"name": "昌邑市", "value": "49.9"},
                {"name": "沂水县", "value": "39.9"},
                {"name": "莱阳市", "value": "29.9"},
                {"name": "郓城县", "value": "19.9"},
                {"name": "海阳市", "value": "19.9"},
                {"name": "东明县", "value": "29.9"},
                {"name": "费县", "value": "39.9"},
                {"name": "微山县", "value": "49.9"},
                {"name": "环翠区", "value": "59.9"},
                {"name": "莒县", "value": "69.9"},
                {"name": "莱山区", "value": "79.9"},
                {"name": "博兴县", "value": "89.9"},
                {"name": "罗庄区", "value": "99.9"},
                {"name": "牡丹区", "value": "99.9"},
                {"name": "蓬莱区", "value": "89.9"},
                {"name": "曲阜市", "value": "79.9"},
                {"name": "福山区", "value": "69.9"},
                {"name": "巨野县", "value": "59.9"},
                {"name": "齐河县", "value": "49.9"},
                {"name": "单县", "value": "39.9"},
                {"name": "岱岳区", "value": "29.9"},
                {"name": "长清区", "value": "19.9"},
                {"name": "昌乐县", "value": "19.9"},
                {"name": "安丘市", "value": "29.9"},
                {"name": "牟平区", "value": "39.9"},
                {"name": "临朐县", "value": "49.9"},
                {"name": "郯城县", "value": "59.9"},
                {"name": "潍城区", "value": "69.9"},
                {"name": "茌平区", "value": "79.9"},
                {"name": "河东区", "value": "89.9"},
                {"name": "奎文区", "value": "99.9"},
                {"name": "钢城区", "value": "99.9"},
                {"name": "栖霞市", "value": "89.9"},
                {"name": "莒南县", "value": "79.9"},
                {"name": "德城区", "value": "69.9"},
                {"name": "兰陵县", "value": "59.9"},
                {"name": "乳山市", "value": "49.9"},
                {"name": "阳谷县", "value": "39.9"},
                {"name": "临邑县", "value": "29.9"},
                {"name": "市中区2", "value": "19.9"},
                {"name": "沂源县", "value": "19.9"},
                {"name": "垦利区", "value": "29.9"},
                {"name": "鄄城县", "value": "39.9"},
                {"name": "宁阳县", "value": "49.9"},
                {"name": "薛城区", "value": "59.9"},
                {"name": "禹城市", "value": "69.9"},
                {"name": "乐陵市", "value": "79.9"},
                {"name": "平邑县", "value": "89.9"},
                {"name": "梁山县", "value": "99.9"},
                {"name": "宁津县", "value": "99.9"},
                {"name": "利津县", "value": "89.9"},
                {"name": "平原县", "value": "79.9"},
                {"name": "临清市", "value": "69.9"},
                {"name": "无棣县", "value": "59.9"},
                {"name": "博山区", "value": "49.9"},
                {"name": "平阴县", "value": "39.9"},
                {"name": "陵城区", "value": "29.9"},
                {"name": "寒亭区", "value": "19.9"},
                {"name": "汶上县", "value": "19.9"},
                {"name": "莘县", "value": "29.9"},
                {"name": "阳信县", "value": "39.9"},
                {"name": "嘉祥县", "value": "49.9"},
                {"name": "金乡县", "value": "59.9"},
                {"name": "东平县", "value": "69.9"},
                {"name": "周村区", "value": "79.9"},
                {"name": "冠县", "value": "89.9"},
                {"name": "定陶区", "value": "99.9"},
                {"name": "济阳区", "value": "99.9"},
                {"name": "临沭县", "value": "89.9"},
                {"name": "夏津县", "value": "79.9"},
                {"name": "惠民县", "value": "69.9"},
                {"name": "五莲县", "value": "59.9"},
                {"name": "河口区", "value": "49.9"},
                {"name": "鱼台县", "value": "39.9"},
                {"name": "泗水县", "value": "29.9"},
                {"name": "高青县", "value": "19.9"},
                {"name": "武城县", "value": "19.9"},
                {"name": "坊子区", "value": "29.9"},
                {"name": "蒙阴县", "value": "39.9"},
                {"name": "商河县", "value": "49.9"},
                {"name": "庆云县", "value": "59.9"},
                {"name": "沾化区", "value": "69.9"},
                {"name": "成武县", "value": "79.9"},
                {"name": "高唐县", "value": "89.9"},
                {"name": "峄城区", "value": "99.9"},
                {"name": "东阿县", "value": "89.9"},
                {"name": "山亭区", "value": "79.9"},
                {"name": "台儿庄区", "value": "69.9"},
            ],

            currentPage: 1,
            startIndex: 0,
            mrPage: 10,
            pageNum: Number,
            countSize: 0,
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
            let that =this
            var myChart = this.$echarts.init(document.getElementById('chart_map'));

            var data = that.countyOptions;


            myChart.setOption({
                title: {
                    text: ''
                },
                tooltip : {
                    trigger: 'item',
                    formatter: '{b}',
                    itemSize:'14px'
                },
                dataRange: {
                    x: 'left',
                    y: 'center',
                    top:'100',
                    splitList: [
                        {start: 25, end: 100, label: '24%≤空心化率', color: '#2E7452'},
                        {start: 21, end: 24, label: '21%≤空心化率≤24%', color: '#549D7A'},
                        {start: 19, end: 21, label: '18%≤空心化率≤21%', color: '#53BB89'},
                        {start: 16, end: 18, label: '15%≤空心化率≤18%', color: '#91D2B3'},
                        {start: 0, end: 15, label: '空心化率≤15%', color: '#DCF1E7'},
                    ],
                    textStyle: {
                        color: '#3899FF' // 值域文字颜色
                    },
                    selectedMode: false,
                    color: ['#E0022B', '#E09107', '#A3E00B']
                },
                series : [
                    {
                        name: '县域乡村振兴全景展示',
                        type: 'map',
                        map: '山东',
                        mapType: '山东',
                        mapLocation: {
                            x: 'left'
                        },
                        zoom: 1.2,
                        roam: true,
                        show: true,
                        itemStyle:{
                            normal:{
                                borderColor: "#f0f0f0",
                                type:'dashed',
                                borderWidth: 1,
                                label:{show:true}
                            },
                            emphasis: {
                                areaColor: '#389BB7',
                                borderWidth: 0
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {color: "#FFFFFF",fontSize: 10,}
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        data:data
                    }],
            });

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
        padding-left: 100px;
        position: relative;
        .LeftText{
            width: 300px;
            height: 150px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 99;
            /*     background-color: #17A15E;*/
            .LeftTextTitle{
                height: 40px;
                line-height: 40px;
                font-size: 18px;
                padding-left: 20px;
                color: #287165;
                font-weight: bold;
            }
            .LeftTextSelect{
                margin-top: 20px;
                padding-left: 20px;
                position: relative;
                z-index: 9999999999999999999;
            }

        }
    }

    .templateDivRight {
        width: 25%;
        height: 100%;



        .rightList {
            height: 98%;
            background-color: #FFF;
            .rightListTitle {
                height: 40px;
                color: #63978F;
                font-size: 16px;
                margin-top: 5px;
                margin-left: 20px;
                line-height: 40px;
            }
            .rightListPage{
                height: 100px;
                width: 100%;
                display: flex;
                align-items: flex-start;
                justify-content: center;
            }
        }
    }

}


</style>
