// pages/self/self.js

const app = getApp()
var plugin = requirePlugin("smsvercode"); //引用短信校验码插件

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    valid_flag: 0,
    phonenumber: '',
    text: '获取验证码',
    currentTime: 61,
    disabled: false,
    color: '#59b550',
    valid_flag1: 0,
    id: ''
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
    this.update_phone()
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

  change_phone: function () {
    this.setData({
      valid_flag: 1
    })
  },

  update_phone: function () {
    let that = this
    const db = wx.cloud.database()
    db.collection('auth').where({
      user: app.globalData.userInfo.open_id,
    }).get({
      success(res) {
        console.log("123", res)
        if (res.data.length == 0) {
          wx.showToast({
            title: 'error: -400',
            complete: function () {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
        else {
          console.log(res.data)
          that.setData({
            phone: res.data[0]['phone'],
            id: res.data[0]['_id']
          })
        }
      }
    })
  },

  goto_advice: function (){
    wx.navigateTo({
      url: '/pages/advice/advice',
    })
  },

  bindphonenumber: function (e) {
    this.data.phonenumber = e.detail.value;
  },

  //获取短信验证码
  getcode: function (e) {
    let that = this
    that.setData({
      disabled: true,
      color: '#ccc',
    })
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
    plugin.getvercode(this.data.phonenumber, function (res) {
      if (res.errno == "0") {
        wx.showToast({
          title: '发送成功',
        })
        var interval = setInterval(function () {
          currentTime--; //每执行一次让倒计时秒数减一
          that.setData({
            text: currentTime + 's后重新获取', //按钮文字变成倒计时对应秒数

          })
          if (currentTime <= 0) {
            clearInterval(interval)
            that.setData({
              text: '重新获取验证码',
              currentTime: 61,
              disabled: false,
              color: '#59b550'
            })
          }
        }, 1000);
      } else {
        wx.showToast({
          title: '发送失败',
        })
      }
    });
  },

  //校验短信校验码
  formSubmit: function (e) {
    var that = this;
    var phonenumber = e.detail.value.phonenumber;
    var vercode = e.detail.value.vercode;

    plugin.checkvercode(phonenumber, vercode, function (res) {
      if (res.errno == "0") {
        const db = wx.cloud.database()
        db.collection('auth').doc(that.data.id).update({
          data: {
            phone: that.data.phonenumber
          },
          success(res) {
            console.log(res)
            if (res.errMsg == "collection.add:ok") {
              that.setData({
                valid_flag: 0
              })
              wx.showToast({
                title: '认证成功',
              })
            } else {
              console.log(res.result.errMsg)
              wx.showToast({
                title: '认证失败',
              })
            }
            that.getMemorandumList()
          },
          fail(res) {
            console.log(res)
            wx.showToast({
              title: '认证失败',
            })
          }
        })
      } else {
        wx.showToast({
          title: '校验失败',
        })
      }
    });
  }
})