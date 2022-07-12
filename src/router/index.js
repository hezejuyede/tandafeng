import Vue from 'vue';
import Router from 'vue-router';
import {getItem} from '../utils/storage'

//主页相关路由
import Index from '../components/index/index'




//数据大屏
import LargeDataScreen from '../components/LargeDataScreen/index'



//数据统计
import RuralRevitalizationComprehensivePowerIndex from '../components/DataStatistics/RuralRevitalizationComprehensivePowerIndex.vue'
import IndustrialProsperityPowerIndex from '../components/DataStatistics/IndustrialProsperityPowerIndex.vue'
import LifeAffluenceElectricityIndexStatistics from '../components/DataStatistics/LifeAffluenceElectricityIndexStatistics.vue'
import AgriculturalDevelopmentElectricityIndex from '../components/DataStatistics/AgriculturalDevelopmentElectricityIndex.vue'
import HollowingRateStatistics from '../components/DataStatistics/HollowingRateStatistics.vue'
import PanoramicDisplayOfCountyHollowingRateInTheWholeProvince from '../components/DataStatistics/PanoramicDisplayOfCountyHollowingRateInTheWholeProvince'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/Index'
        },
        {
            path: '/',
            component: resolve => require(['../common/Home.vue'], resolve),
            meta: {title: '自述文件'},
            children: [
                {
                    path: '/Index',
                    component: Index,
                    meta: {title: '系统首页'}
                },
                {
                    path: '/PanoramicDisplayOfCountyHollowingRateInTheWholeProvince',
                    component: PanoramicDisplayOfCountyHollowingRateInTheWholeProvince,
                    meta: {title: '全省县域空心化率全景展示'}
                },

                {
                    path: '/RuralRevitalizationComprehensivePowerIndex',
                    component: RuralRevitalizationComprehensivePowerIndex,
                    meta: {title: '乡村振兴综合电力指数统计'}
                },

                {
                    path: '/IndustrialProsperityPowerIndex',
                    component: IndustrialProsperityPowerIndex,
                    meta: {title: '产业兴旺电力指数统计'}
                },

                {
                    path: '/LifeAffluenceElectricityIndexStatistics',
                    component: LifeAffluenceElectricityIndexStatistics,
                    meta: {title: '生活富裕电力指数统计'}
                },

                {
                    path: '/AgriculturalDevelopmentElectricityIndex',
                    component: AgriculturalDevelopmentElectricityIndex,
                    meta: {title: '农业发展电力指数统计'}
                },
                {
                    path: '/HollowingRateStatistics',
                    component: HollowingRateStatistics,
                    meta: {title: '空心化率统计'}
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/errPage/404.vue'], resolve),
                    meta: {title: '404'}
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/errPage/403.vue'], resolve),
                    meta: {title: '403'}
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/indexLogin/Login.vue'], resolve)
        },
        {
            path: '/LargeDataScreen',
            component: LargeDataScreen
        },
        {
            path: '*',
            redirect: '/404'
        }
    ],


})


