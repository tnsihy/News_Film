// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle:"",
    movies:{},
    requestUrl:"",
    totalCount:0,
    // 指movies数据是不是为空
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取到category 通过url传递参数可从options获取
    var category = options.category;
    // console.log(category);
    this.data.navigateTitle = category;

    var dataUrl = "";
    // 请求相应的数据
    switch(category){
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData);
  },

  processDoubanData: function (moviesDouban){
    var movies = [];
    // 循环数组
    for (var idx in moviesDouban.subjects) {
      // 获取每一项下的数据
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        // 获取星星
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }
    // 解决上滑加载数据只是刷新的效果，即每一次都要加载上一次的数据
    var totalMovies = {};
    
    if(!this.data.isEmpty){
      // 将老数据与新数据合并一起
      totalMovies = this.data.movies.concat(movies);
    }else{
      // 当movies数据为空时
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    // 数据绑定
    this.setData({
      movies: totalMovies
    });
    // 关闭
    wx.hideNavigationBarLoading();
    // 关闭刷新
    wx.stopPullDownRefresh();
    this.data.totalCount += 20;
  },

  // 页面渲染以后
  onReady:function(event){
    // 动态设置导航栏标题
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  },

  // 移动端是 上滑加载更多 下滑刷新
  onScrollLower:function(event){
    // 默认加载20个
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData);
    // 加载等待动画 开启
    wx.showNavigationBarLoading()
  },

  // 监听用户下拉动作 重新加载数据
  onPullDownRefresh:function(event){
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    var refreshUrl = this.data.requestUrl + "?start=0&count=20";
    // 需要将数据置空，刷新不需要再结合旧数据了,因为前面已经有了，不需要重复
    this.data.movies = {};
    this.data.isEmpty = true;
    util.http(nextUrl,this.processDoubanData);
    // 加载等待动画 开启
    wx.showNavigationBarLoading();
  },

  // 电影详情页面
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId,
    })
  }
})