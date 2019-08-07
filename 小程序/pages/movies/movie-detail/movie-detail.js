var util = require('../../../utils/util.js')
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 点击电影跳转到对应id的电影详情页面 这里是获取到id
    var movieId = options.id;
    var url = app.globalData.doubanBase + '/v2/movie/subject/' + movieId;
    // 获取到id后发送http请求
    util.http(url, this.processDoubanData);
  },

  // 回调函数 处理函数
  processDoubanData: function(data) {
    console.log(data);
    // 判空 有可能久远的电影导演内容为空
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatar != null) {
        director.avatar = data.director[0].avatars.large
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    };

    // 将需要的数据放在一个对象中
    var movie = {
      // movieImg海报 originalTitle别名 wishCount多少人想看 commentCount多少人评论 
      // generes类型 casts影人信息 summary简介
      movieImg: data.images ? data.images.large : "",
      country : data.countries[0],
      title:data.title,
      originalTitle:data.original_title,
      wishCount:data.wish_count,
      commentCount:data.comments_count,
      year:data.year,
      genres:data.genres.join("、"),
      stars: util.convertToStarsArray(data.rating.stars),
      score:data.rating.average,
      director:director,
      casts:util.convertToCastString(data.casts),
      castInfo:util.convertToCastInfos(data.casts),
      summary:data.summary
    }
    this.setData({
      movie:movie
    })
  },

  // 查看图片
  viewMoviePostImg:function(event){
    var src = event.currentTarget.dataset.src;
    // wx.previewImage在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作
    wx.previewImage({
      // current当前显示图片的http链接  urls需要预览的图片http链接列表
      current:src,
      urls: [src]
    })
  }
})