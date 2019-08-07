// form/form-switch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // checked 改变时触发 change 事件
  onBindChange:function(event){
   console.log(event.detail.value); 
  },

  // checkbox-group中选中项发生改变时触发 change 事件
  onRadioChange:function(event){
    console.log(event.detail.value);
  },

  // checkbox-group中选中项发生改变时触发 change 事件
  onCheckboxChange:function(event){
    console.log(event.detail.value);
  },

  formSubmit:function(event){
    console.log('form发生了submit事件，携带数据');
    console.log(event.detail.value);
  },

  formReset:function(event){
    console.log('form发生了reset事件');
  }
})