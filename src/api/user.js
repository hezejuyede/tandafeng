import request from '../utils/http.js'

const URL = {
    login: '/userLogin',                        //登录
    getUserInfo: '/getUserInfo',                //获取用户信息
};


/**
 * 登录
 */
export const login = data => {
    return request({
        url: URL.login,
        method: 'POST',
        data
    })
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
    return request({
        url: '/getUserInfo'
    })
}
