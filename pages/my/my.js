// pages/my/my.js

const app = getApp()
var plugin = requirePlugin("smsvercode"); //引用短信校验码插件

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myNoticeList: [],
    valid_flag: 0,
    phonenumber: '',
    text: '获取验证码',
    currentTime: 61,
    disabled: false,
    color: '#59b550',
    valid_flag1: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.judgeAuth()
    this.getMyNotice()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  goto_self: function (){
    if(this.data.valid_flag1 == 0){
      return 
    } else{
      wx.navigateTo({
        url: '/pages/self/self',
      })
    }
  },

  getMyNotice: function() {
    let myInfor = app.globalData.userInfo
    var that = this
    wx.request({
      url: 'https://wx.xingda188.com/daliangongye_2018_09_25/web/api/notice/getNoticeList.php',
      data: {},
      method: 'post',
      success: function(res) {
        let noticeList = res.data.data
        var myNoticeList = []
        console.log(noticeList)
        for (var i = 0; i < noticeList.length; i++) {
          if (noticeList[i].user_id == myInfor.user_id) {
            myNoticeList.push(noticeList[i])
          }
        }
        that.setData({
          myNoticeList: myNoticeList
        })
        console.log(myNoticeList)
      },
      fail: function() {},
      complete: function() {}
    })
  },

  previewImg(e) {
    var that = this
    console.log(e)
    wx.request({
      url: 'https://wx.xingda188.com/daliangongye_2018_09_25/web/api/notice/getNoticeList.php',
      data: {
        n_id: e.currentTarget.dataset.n_id
      },
      method: 'GET',
      success: function(res) {
        console.log(res.data)
        wx.previewImage({
          current: e.currentTarget.dataset.src, // 当前显示图片的http链接
          urls: res.data.data[0].n_pic // 需要预览的图片http链接列表
        })
      },
      fail: function() {},
      complete: function() {}
    })
  },

  deleteNotice(e) {
    var that = this
    console.log(e.currentTarget.dataset.n_id)
    wx.showModal({
      title: '提示',
      content: '确认删除此条通知吗？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://wx.xingda188.com/daliangongye_2018_09_25/web/api/notice/deleteNotice.php',
            data: {
              n_id: e.currentTarget.dataset.n_id
            },
            // header: {
            //   'content-type': 'application/x-www-form-urlencoded'
            // },
            method: 'GET',
            success: function(res) {
              // 删除成功重新渲染通知类表
              if (res.data.status == 1) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'none'
                })
                wx.request({
                  url: 'https://wx.xingda188.com/daliangongye_2018_09_25/web/api/notice/getNoticeList.php',
                  data: {},
                  method: 'POST',
                  success: function(res) {
                    console.log(res.data)
                    that.setData({
                      noticeList: res.data.data
                    })
                  },
                  fail: function() {},
                  complete: function() {}
                })
              } else {
                wx.showToast({
                  title: '删除失败',
                  icon: 'none'
                })
              }
            },
            fail: function() {},
            complete: function() {
              that.getMyNotice()
            }
          })
        }
      }
    })
  },

  judgeAuth: function() {
    let that = this
    const db = wx.cloud.database()
    db.collection('auth').where({
      user: app.globalData.userInfo.open_id,
    }).get({
      success(res) {
        console.log("123", res)
        if (res.data.length == 0) {
          wx.showModal({
            title: '登录',
            content: '需要您手机号验证',
            success(res) {
              if (res.confirm) {
                that.setData({
                  valid_flag: 1
                })
              } else if (res.cancel) {
                wx.switchTab({
                  url: '/pages/index/index'
                })
              }
            }
          })
        }
        else{
          that.setData({
            valid_flag1: 1
          })
        }
      }
    })
  },

  bindphonenumber: function(e) {
    this.data.phonenumber = e.detail.value;
  },

  //获取短信验证码
  getcode: function(e) {
    let that = this
    that.setData({
      disabled: true,
      color: '#ccc',
    })
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
    plugin.getvercode(this.data.phonenumber, function(res) {
      if (res.errno == "0") {
        wx.showToast({
          title: '发送成功',
        })
        var interval = setInterval(function() {
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
  formSubmit: function(e) {
    var that = this;
    var phonenumber = e.detail.value.phonenumber;
    var vercode = e.detail.value.vercode;

    plugin.checkvercode(phonenumber, vercode, function(res) {
      if (res.errno == "0") {
        const db = wx.cloud.database()
        db.collection('auth').add({
          data: {
            user: app.globalData.userInfo.open_id,
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