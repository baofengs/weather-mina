/**
 * 所有相关的请求
 * @return Promise
 */

import config from '../config';
const cfg = config[config.env];
const QQMapWX = require('../qqmap/qqmap-wx-jssdk.min.js');

/**
 * @desc 获取天气信息
 * @param {*} city 
 * @return Promise
 */
export const getWeather = (city) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${cfg.url}?city=${city}`,
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {
                resolve(res.data);
            },
            error: () => {
                reject();
            }
        });
    });
}

/**
 * @desc 获取经纬度
 * @param {*} null
 * @return Promise
 */
export const getLocation = () => {
    return new Promise((resolve, reject) => {
        wx.getLocation({
            type: 'wgs84',
            success: (res) => {
                resolve(res);
            },
            error: (res) => {
                reject();
            }
        });
    });
}

/**
 * @desc 根据经纬度获取城市信息
 * @param {*} l 经纬度
 * @return Promise
 */
export const getCityByLocation = (l) => {
    const qqmapsdk = new QQMapWX({
        key: 'RVSBZ-ETTHF-DU7JS-N4L73-C5F7V-UHFN6'
    });
    return new Promise((resolve, reject) => {
        // const addressRes = {
        //     result: {
        //         address_component: {
        //             city: '武汉'
        //         }
        //     }
        // };
        if (!l || !l.latitude || !l.longitude) {
            reject();
        }
        // resolve(addressRes);
        qqmapsdk.reverseGeocoder({
            location: {
                latitude: l.latitude,
                longitude: l.longitude
            },
            success: (res) => {
                resolve(res);
            },
            error: () => {
                reject();
            }
        });
    });
}
