// 将模拟数据引入  设置断点后 F10单步调试 可以在控制台查看postsData的值
var postsData = require('../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据 
   * 数据优先
   * 目前只能做单项数据绑定
   */
  data: {
    // 将数据放在data里才能在wxml中使用
    // 相当于post_key:[ 这里是数据 ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //可以通过使用setData方法绑定数据 当数据为数组时需要给数组一个名称 即对象的值为这个数组数据
    // 下面这种写法也可以缩写为this.setData({post_content})  ES6写法
    // this.setData({post_content:post_content}) 
    this.setData({
      post_key:postsData.postList
    })
  },

  onPostTap:function(event){
    // 获取到点击的是哪个新闻  postId没有连字符所以
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },

  onSwiperTap:function(event){
    //target与currentTarget的区别
    //target指的是当前点击的组件  currentTarget指的是事件捕获的组件
    //target这里指的是image  currentTarget这里指的是swiper
    //catch:tap可以阻止事件冒泡
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  }

})