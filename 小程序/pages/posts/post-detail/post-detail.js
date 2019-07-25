var postsData = require('../../../data/posts-data.js')
// 获取全局变量
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.setData({
      currentPostId:postId
    });
    // this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.setData({
      postData : postData
    })

    /**
     * 缓存Storage wx.setStorageSync(key,object/string) 是同步的
     * 缓存的上限不能超过10MB
     *    wx.setStorageSync('key', "tnsihy")
     * 修改缓存
     *    wx.setStorageSync('key', { name:"tnsihy",age:20 })
     * 获取缓存
     *    wx.getStorageSync('key')
     * 删除缓存 没有删除一直存在
     *    wx.removeStorageSync('key')
     * 清除所有缓存
     *    wx.clearStorage();
     */

    // 获取缓存key为posts_collected的value值
    var postsCollected = wx.getStorageSync("posts_collected");
    // 一开始可能缓存还没有变量 所以需要有判断
    // 当缓存存在时
    if(postsCollected){
      var postCollected = postsCollected[postId];
      if (postCollected){
        this.setData({
          collected: postCollected
        })
      }
    }else{
      // 当缓存不存在时
      var postsCollected={};
      // 比如点击第一个新闻 id为0  故value为{"0":false}
      postsCollected[postId] = false;
      // 修改缓存
      wx.setStorageSync("posts_collected", postsCollected);
    }

    this.setMusicMonitor();

    // 处理当音乐播放退出页面再进来时音乐播放的图标显示不对的问题
    // 当app.globalData.g_isPlayingMusic为true且id对应时将isPlayingMusic设为true
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId){
      this.setData({
        isPlayingMusic:true
      })
    }
  },

  // 将监听背景音频提取
  setMusicMonitor:function(){
    var that = this;
    // 监听背景音频播放事件
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = this.data.currentPostId;
    })
    // 监听背景音频暂停事件
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    })
  },

  onCollectionTap:function(event){
    // 获取key为"posts_collected"缓存的所有数据
    var postsCollected = wx.getStorageSync("posts_collected");
    // 获取对应id缓存的data值 如何将onLoad中的id值传到onCollectionTap中? postId -> currentPostId
    var postCollected = postsCollected[this.data.currentPostId];
    // 将缓存中的data值取反 即true取为false false取为true
    postCollected = !postCollected;
    // 将修改的值赋给这个key
    postsCollected[this.data.currentPostId] = postCollected;
    // 更新true或者flase的缓存值
    wx.setStorageSync("posts_collected", postsCollected);
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected:postCollected
    })

    // 设置收藏友好提示 wx.showToast()显示消息提示框
    wx.showToast({
      title: postCollected?"收藏成功":"取消收藏",
      duration:1000,
      // icon:"success"默认值
      icon:"success"
    })
  },

  onShareTap:function(event){
    wx.showActionSheet({
      itemList: [
        "分享到微信好友",
        "分享到朋友圈",
        "分享到QQ",
        "分享到微博"
      ],
      itemColor:"#405f80",
      success(res){
        // res.tapIndex 用户点击的按钮序号，从上到下的顺序，从0开始
      }
    })
  },

  onMusicTap:function(event){
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    // 音乐播放实例
    const bgMusic = wx.getBackgroundAudioManager();
    bgMusic.title = postData.music.title;
    bgMusic.coverImgUrl = postData.music.coverImg;
    // 定义到当前文章的数据
    bgMusic.src = postData.music.url;

    // 获取到播放状态
    var isPlayingMusic = this.data.isPlayingMusic;
    if(isPlayingMusic){
      // 执行暂停
      bgMusic.pause();
      this.setData({
        isPlayingMusic:false
      })
    }else{
      // 执行开始
      bgMusic.play();
      this.setData({
        isPlayingMusic:true
      })
    }
  }

})