var util = require('../../utils/util.js')

var app = getApp();

// pages/movies/movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    comingSoon:{},
    top250:{},
    searchResult:{},
    // 电影页面与搜索页面的切换
    containerShow:true,
    searchPanelShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 正在上映
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    // 即将上映
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    // 豆瓣电影top250
    var top250 = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
    this.getMovieListData(top250,"top250","豆瓣Top250");
  },

  getMovieListData: function (url, settedKey, categoryTitle){
    var that = this;
    wx.request({
      // url: 'https://douban.uieee.com/v2/movie/top250',
      url:url,
      method:'GET',
      header:{
        "Content-Type":"application/xml;charset=uft-8"
      },
      success:function(res){
        // success
        // console.log(res);
        that.processDoubanData(res.data, settedKey, categoryTitle);
      },
      fail:function(err){
        // fail
        console.log(err);
      }
    })
  },

  processDoubanData: function (moviesDouban, settedKey,categoryTitle) { 
    // console.log(moviesDouban);
    var movies = [];
    // 循环数组
    for(var idx in moviesDouban.subjects){
      // 获取每一项下的数据
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if(title.length >= 6){
        title = title.substring(0,6) + '...';
      }
      var temp = {
        // 获取星星
        stars: util.convertToStarsArray(subject.rating.stars),
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      }
      movies.push(temp);
    }
    var readyData = {};
    readyData[settedKey] = {
      // 有movies属性
      movies:movies,
      categoryTitle: categoryTitle
    };
    // 数据绑定
    this.setData(readyData);
  },

  // 更多页面
  onMoreTap:function(event){
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: './more-movie/more-movie?category=' + category,
    })
  },

  // 电影详情页面
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId,
    })
  },

  // input输入框聚焦时触发 
  onBindFocus:function(event){
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },
  
  // input输入框失焦或者回车时触发
  onBindChange:function(event){
    // 获取到输入框内容
    var text = event.detail.value;
    // console.log(text);
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    // console.log(searchUrl);
    this.getMovieListData(searchUrl,"searchResult","")
  },

  // input输入框内容清除
  onCancelImgTap:function(event){
    this.setData({
      containerShow:true,
      searchPanelShow:false,
      // 搜索数据被清空
      // searchResult: {}
    })
  }
})
