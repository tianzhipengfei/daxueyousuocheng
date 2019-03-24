// pages/Identity.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role: [{
      id: 1,
      name: '辅导员'
    }, {
      id: 2,
      name: '学生'
    }],
    current: null,
    position: 'right',
    checked: false,
    disabled: false,
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

  handleFruitChange({ detail = {} }) {
    console.log(detail)
    wx.showModal({
      title: '提示',
      content: '确认您的选择',
      success: () => {
        // 设置为辅导员
        if(detail.value == '辅导员') {
          wx.request({
            url: 'https://wx.xingda188.com/daliangongye_2018_09_25/web/api/user/updateUser.php',
            data: { 
              user_id: app.globalData.userInfo.user_id,
              role: 2
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'post', 
            success: function () {
              app.globalData.userInfo.role = 2
              wx.reLaunch({
                url: '/pages/index/index',
              })
            },
            fail: function () {
            },
            complete: function () {
            }
          })
        }
        // 设置为学生
        if (detail.value == '学生') {
          wx.request({
            url: 'https://wx.xingda188.com/daliangongye_2018_09_25/web/api/user/updateUser.php',
            data: {
              user_id: app.globalData.userInfo.user_id,
              role: 1
            },
            method: 'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function () {
              app.globalData.userInfo.role = 1
              wx.reLaunch({
                url: '/pages/index/index',
              })
            },
            fail: function () {
            },
            complete: function () {
            }
          })
        }
      }
    })
    this.setData({
      current: detail.value
    });
  },
  handleClick() {
    this.setData({
      position: this.data.position.indexOf('left') !== -1 ? 'right' : 'left',
    });
  },
  handleDisabled() {
    this.setData({
      disabled: !this.data.disabled
    });
  },
  handleAnimalChange({ detail = {} }) {
    this.setData({
      checked: detail.current
    });
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