import request from '../utils/http.js'

const URL = {
    enterpriseOverDischargeWarning: '/enterpriseOverDischargeWarning',                        //企业超排预警
    enterprisePie: '/enterprisePie',                                                          //企业超排饼状图
    regionalCarbonReport: '/regionalCarbonReport',                                            //区域碳报表
    regionalCarbonBar: '/regionalCarbonBar',                                                  //区域碳柱状图
    regionalCarbonLine: '/regionalCarbonLine',                                                //区域碳线形图
    industryCarbonReport: '/industryCarbonReport',                                            //行业碳报表
    industryCarbonBar: '/industryCarbonBar',                                                  //行业碳柱状图
    industryCarbonLine: '/industryCarbonLine',                                                //行业碳线形图
};


/**
 * 企业超排预警
 */
export const enterpriseOverDischargeWarning = data => {
    return request({
        url: URL.enterpriseOverDischargeWarning,
        method: 'POST',
        data
    })
}

/**
 * 企业超排饼状图
 */
export const enterprisePie = data => {
    return request({
        url: URL.enterprisePie,
        method: 'POST',
        data
    })
}

/**
 * 区域碳报表
 */
export const regionalCarbonReport = data => {
    return request({
        url: URL.regionalCarbonReport,
        method: 'POST',
        data
    })
}

/**
 *区域碳柱状图
 */
export const regionalCarbonBar = data => {
    return request({
        url: URL.regionalCarbonBar,
        method: 'POST',
        data
    })
}


/**
 * 区域碳线形图
 */
export const regionalCarbonLine = data => {
    return request({
        url: URL.regionalCarbonLine,
        method: 'POST',
        data
    })
}


/**
 * 行业碳报表
 */
export const industryCarbonReport = data => {
    return request({
        url: URL.industryCarbonReport,
        method: 'POST',
        data
    })
}


/**
 * 行业碳柱状图
 */
export const industryCarbonBar = data => {
    return request({
        url: URL.industryCarbonBar,
        method: 'POST',
        data
    })
}


/**
 * 行业碳线形图
 */
export const industryCarbonLine = data => {
    return request({
        url: URL.industryCarbonLine,
        method: 'POST',
        data
    })
}
