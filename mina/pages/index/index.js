//index.js
//获取应用实例
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
const app = getApp()

Page({
  data: {
      todayHourly: [],
      city: {},
      weather: {}
  },
  goto: function (data) {
    console.log('data: ', data);
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onPullDownRefresh: function () {
    console.log('refreshing...');
    this.getWeather();
    this.getHourlyWeather();
    wx.stopPullDownRefresh()
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    // 实例化API核心类
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
            var address = addressRes.result.address_component;
            that.setData({
                city: address.city
            })
          }
        })
      }
    })
  },
  getHourlyWeather: function () {
    var self = this;
    wx.request({
        url: 'https://weixin.jirengu.com/weather/future24h?location=%E5%8C%97%E4%BA%AC%E5%B8%82&key=study_javascript_in_jirengu.com', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        self.logs = res.data.hourly;
        self.todayHourly = res.data.hourly;
        self.setData({
            todayHourly: res.data.hourly
        })
      }
    })
  },
  getWeather: function () {
    var that = this;
    wx.request({
        url: 'https://weixin.jirengu.com/weather?location=%E5%8C%97%E4%BA%AC%E5%B8%82&key=study_javascript_in_jirengu.com', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
          const data = res.data.weather[0];
          that.setData({
              weather: {
                  now: data.now,
                  air: data.now.air_quality.city,
                  future: data.future,
                  suggestion: data.today.suggestion
              }
          })
      }
    })
  },
  
  onShow: function () {
      this.getWeather();
      this.getHourlyWeather();
  }
})
