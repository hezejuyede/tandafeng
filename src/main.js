import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import VueQuillEditor from 'vue-quill-editor'
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
/*import '../static/css/theme-green/InvoicingManagement.css';       //浅绿色主题*/
import '../static/css/icon.css';
import "babel-polyfill";
import "./assets/less/base.less";
import echarts from 'echarts';

import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';

Vue.prototype.$echarts = echarts;

import VueAMap from 'vue-amap';  //注意不要和 AMap原始名称覆盖
Vue.use(VueAMap);
// 初始化vue-amap
VueAMap.initAMapApiLoader({
    // 高德的key
    key: '07a52f14c3b4c9c5faf58d8420575114',
    // 插件集合
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation', 'AMap.Geocoder', 'AMap.TruckDriving'],
    v: '1.4.4'
});

Vue.use(Viewer, {
    defaultOptions: {
        zIndex: 9999
    }
});

Vue.use(VueQuillEditor);
Vue.use(ElementUI, {size: 'small'});
Vue.prototype.axios = axios;



router.beforeEach((to, from, next) => {
    let adminToken = sessionStorage.getItem("adminToken");
    if (to.path === '/login' || to.path === '/register') {
        next();
    } else {
        if (adminToken === null) {
            next('/login');
        } else if (to.path === '/RoleManagement' || to.path === '/DepartmentManagement' || to.path === '/UserManagement' || to.path === '/MenuManagement') {
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            let userName = userInfo.userName;
            if (userName === '15550739985' || userName === '15254105620' || userName === '13256189181' || userName === '18764028855') {
                next()
            } else {
                next('/403');
            }

        } else {
            next();
        }
    }
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
