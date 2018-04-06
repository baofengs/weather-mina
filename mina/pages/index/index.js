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
        showIn: '',
        suggestionStatus: false,
        suggestInfo: {},
        suggestTitle: '',
        suggestTitleClss: '',
        airStatus: false,
        airTitle: '',
        airInfo: {},
        airTitleClss: ''
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
    showSuggestion: function (e) {
        const data = e.currentTarget.dataset;
        this.setData({
            suggestionStatus: true,
            suggestTitle: data.title,
            suggestInfo: data.info,
            suggestTitleClss: data.class + ' section cmp-dlg-header'
        });
    },
    closeSuggestion: function (e) {
        this.setData({
            suggestionStatus: false
        });
    },
    showAir: function (e) {
        console.log('show Air...');
        const data = e.currentTarget.dataset;
        this.setData({
            airStatus: true,
            airTitle: data.title,
            airInfo: data.info,
            airTitleClss: 'section cmp-dlg-header'
        });
    },
    closeAir: function (e) {
        this.setData({
            airStatus: false
        });
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
                console.log(data);
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
