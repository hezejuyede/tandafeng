import * as types from './mutations-types';
import {setItem} from "../utils/storage";
import {TOKEN} from "../constant";


// state指的是state的数据
// name传递过来的数据

const mutations = {
    [types.SET_CITY](state, name) {
        state.city = name;
    },

    [types.SET_TOKEN](state, token) {
        state.token = token
        setItem(TOKEN, token)
    },
    [types.SET_USER_INFO](state, userInfo) {
        state.userInfo = userInfo
    },
    [types.SET_TMP_VALUE](state, item) {
        state.TMP[item.name] = item.value;
    },


};

export default mutations
