// map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "/images/icon/star.png",
      id: 0,
      longitude: 113.324520,
      latitude: 23.099994,
      width: 25,
      height: 25
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.20229
      }, {
        longitude: 113.324520,
        latitude: 23.099994
      }],
      color: "#FF0000DD",
      width: 3,
      dottedLine: true
    }]
  },

  markertap: function(event) {
    // 使用微信内置地图查看位置
    wx.openLocation({
      latitude: 23.099994,
      longitude: 113.324520,
    })
  }


})