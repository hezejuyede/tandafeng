import * as types from './mutations-types';
import {login, getUserInfo} from '../api/user'
import md5 from 'md5'
import {setItem, getItem, removeAllItem} from '../utils/storage'
import {TOKEN} from '../constant'
import {setTimeStamp} from '../utils/auth'
import {Message} from 'element-ui'

// 参数列表：{commit, state}
// state指的是state数据
// commit调用mutations的方法
// name就是调用此方法时要传的参数


export const setCityName = ({commit, state}, name) => {
  commit(types.SET_CITY, name);
};


export const userLogin = ({commit, state}, userInfo) => {
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {
        login({
            username,
            password: md5(password)
        })
            .then((res)=> {
                commit(types.SET_TOKEN, res.data.data.access_token);
                // 保存登录时间
                setTimeStamp();
                Message.success(res.data.msg);
                resolve()
            })
            .catch(err => {
                reject(err)
            })
    })


};



export const logout = ({commit, state}, userInfo) => {
    this.commit(types.SET_TOKEN, '');
    this.commit('user/setUserInfo', {});
    removeAllItem();
    this.$router.push('/login')

};
