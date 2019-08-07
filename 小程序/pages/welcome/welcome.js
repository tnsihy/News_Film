Page({
  onTap:function(){
    /**
     *  路由跳转
     * wx.navigateTo(Object object) 保留当前页面，跳转到应用内的某个页面
     * wx.redirectTo(Object object) 关闭当前页面，跳转到应用内的某个页面
     * wx.navigateBack(Object object) 关闭当前页面，返回上一页面或多级页面
     */
    wx.switchTab({
      url: '../posts/posts',
    })
  }
})