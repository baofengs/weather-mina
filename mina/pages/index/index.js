//index.js
//获取应用实例
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
const app = getApp();

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
        console.log('refreshing...', this.city);
        if (this.city) {
            this.getWeather(this.city);
            this.getHourlyWeather(this.city);
        }        
        wx.stopPullDownRefresh()
    },
    scroll: function (e) {
        console.log('scrolling...', e);
        
    },
    scrollToTop: function(e) {
        console.log('top: ', e);
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        this.getLocation((city) => {
            this.getWeather(city);
            this.getHourlyWeather(city);
        });
    },
    getLocation: function (callback) {
        var self = this;
        var qqmapsdk = new QQMapWX({
            key: 'RVSBZ-ETTHF-DU7JS-N4L73-C5F7V-UHFN6'
        });
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude
                    },
                    success: function (addressRes) {
                        var address = addressRes.result.address_component.city;
                        address = 'wuhan';
                        callback(address);
                        self.city = address;
                        self.setData({
                            city: address
                        });
                    }
                })
            }
        });
    },
    getHourlyWeather: function (city) {
        if (!city) return;
        var self = this;
        if (!this.loading) {
            this.setData({
                loading: true
            })
        }
        wx.request({
            url: 'https://weather.sanbf.cn/hourly?city=' + city,
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                self.logs = res.data.hourly;
                self.todayHourly = res.data.hourly;
                self.setData({
                    todayHourly: res.data.hourly,
                    loading: false,
                    opacity: 1,
                    showIn: 'show-in'
                });
            }
        });
    },
    getWeather: function (city) {
        if (!city) return;
        var slef = this;
        if (!this.loading) {
            this.setData({
                loading: true
            })
        }
        wx.request({
            url: 'https://weather.sanbf.cn?city=' + city,
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                const data = res.data.weather[0];
                slef.setData({
                    weather: {
                        now: data.now,
                        air: data.now.air_quality.city,
                        future: data.future,
                        suggestion: data.today.suggestion,
                        loading: false,
                        opacity: 1
                    }
                });
            }
        })
    },
    onShow: function () {
        // this.getLocation((city) => {
        //     this.getWeather(city);
        //     this.getHourlyWeather(city);
        // });
    }
})
