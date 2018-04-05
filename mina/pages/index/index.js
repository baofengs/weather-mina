//index.js
const app = getApp();
import {getWeather, getLocation, getCityByLocation} from '../../lib/services/requests';

Page({
    data: {
        todayHourly: [],
        city: '',
        weather: {},
        loading: true,
        cityName: '',
        opacity: 0,
        showIn: ''
    },
    onPullDownRefresh: function () {
        this.getWeather(this.city);
        wx.stopPullDownRefresh()
    },
    scroll: function (e) {
        // console.log('scrolling...', e);
        
    },
    scrollToTop: function(e) {
        // console.log('top: ', e);
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        this.getLocation()
            .then(res => {
                const city = res.result.address_component.city;
                this.city = city;
                this.getWeather(city);
                this.setData({
                    city: city
                });
            });
    },
    getLocation: function () {
        return getLocation()
            .then(res => {
               return getCityByLocation(res);
            });
    },
    getWeather: function (city) {
        if (!city) return;
        getWeather(city)
            .then(res => {
                const data = res.data;
                const hourly = res.hourly;
                this.setData({
                    weather: {
                        now: data.now,
                        air: data.now.air_quality.city,
                        future: data.future,
                        suggestion: data.today.suggestion,
                        todayHourly: hourly,
                    },
                    loading: false
                });
            });
    },
    onShow: function () {
        // todo
    }
})
