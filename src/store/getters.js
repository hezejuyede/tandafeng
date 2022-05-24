import {getItem} from '../utils/storage'


export const getCityFn = state => state.city;

export const token = state => state.token;

export const userInfo = state => state.userInfo;

export const hasUserInfo = state => {
    return JSON.stringify(state.userInfo) !== '{}'
};


export const TMP = state => state.TMP;
