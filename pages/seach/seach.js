// pages/seach/seach.js
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  data: {
    
    specialCategory: [
      { message: "回维学生", path: "minority.png" },
      { message: "宗教信仰", path: "religion.png" },
      { message: "孤儿学生", path: "orphan.png" },
      { message: "学业困难", path: "academicdifficulties.png" },
      { message: "心理问题", path: "psychology.png" },
      { message: "经济困难", path: "economicdifficulties.png" },
      { message: "各类处分", path: "punishment.png" },
      { message: "其它情况", path: "otherone.png" }
    ],
 
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
})