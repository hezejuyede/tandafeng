import request from '../utils/http.js'

const URL = {
    carbonEmissionPrediction: '/carbonEmissionPrediction',                        //碳排放预测
    carbonEmissionWarning: '/carbonEmissionWarning',                              //碳排放预警
    electricityCarbonEmissionsPeak: '/electricityCarbonEmissionsPeak',            //电力行业碳排放达峰预测
    peakCarbonEmission: '/peakCarbonEmission',                                    //碳排放峰值
    shandongMap: '/shandongMap',                                                  //山东碳排放地图
};


/**
 * 碳排放预测
 */
export const carbonEmissionPrediction = data => {
    return request({
        url: URL.carbonEmissionPrediction,
        method: 'POST',
        data
    })
}

/**
 * 碳排放预警
 */
export const carbonEmissionWarning = data => {
    return request({
        url: URL.carbonEmissionWarning,
        method: 'POST',
        data
    })
}

/**
 * 电力行业碳排放达峰预测
 */
export const electricityCarbonEmissionsPeak = data => {
    return request({
        url: URL.electricityCarbonEmissionsPeak,
        method: 'POST',
        data
    })
}

/**
 *碳排放峰值
 */
export const peakCarbonEmission = data => {
    return request({
        url: URL.peakCarbonEmission,
        method: 'POST',
        data
    })
}


/**
 * 山东碳排放地图
 */
export const shandongMap = data => {
    return request({
        url: URL.shandongMap,
        method: 'POST',
        data
    })
}




