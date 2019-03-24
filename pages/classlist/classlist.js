// pages/classlist/classlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classCategory: [
      { message: "材料成型及控制工程16-1班", path: "minority.png",num:"31" },
      { message: "机械工程专业16-2班", path: "minority.png", num: "31" },
      { message: "机械工程专业（中本）16-1班", path: "minority.png", num: "29" },
      { message: "机械工程专业（创新）16-1班", path: "minority.png", num: "30" },
      { message: "工业工程专业16-1班", path: "minority.png", num: "28" },
      { message: "工业工程专业16-2班", path: "minority.png", num: "29" },
      { message: "材料成型及控制工程专业16-1班", path: "minority.png", num: "29"},
      { message: "材料成型及控制工程专业16-2班", path: "minority.png", num: "28" },
      { message: "机械电子工程专业16-1班", path: "minority.png", num: "31" },
      { message: "机械电子工程专业16-2班", path: "minority.png", num: "30" },
    ],
    totalnum:'300',
    girlnum:"40"
    
  
  },
  // 返回函数
  back: function () {
    var x = getCurrentPages();
    console.log(x);
    wx.navigateBack({
      delta: x
    })
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
  
  }
})