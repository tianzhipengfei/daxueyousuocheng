//app.js
const request = require('/utils/request.js')
App({
    // 登录
    onLaunch: function () {
      var that = this
      wx.cloud.init()
    },
    getUser: function (cb) {
      let that = this;
      setTimeout(function () {
      wx.login({
        success: res => {
          if (res.code) {
            const opendata = request.post('/user/getUser.php', { 'code': res.code })
            opendata.then(function (res) {
              console.log('success', res)
              if (res.data.role==0){
                wx.reLaunch({
                  url: '/pages/Identity/Identity',
                })
              }
              that.globalData.userInfo = res.data
              console.log(that.globalData.userInfo)
            }).catch(() => {
              console.log('出现未知错误！')
              wx.showToast({
                title: '出现未知错误！',
                icon: 'none',
                duration: 2000
              })
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '登录失败！' + res.errMsg,
              showCancel: false,
              success: function (res) {
                that.onLoad()
              }
            })
          }
        }
      })
      cb();
      },1000);
    },
  globalData: {
    userInfo: null
   }
})

// 判断用户是否首次登陆  1.如果是，选择身份    2.如果不是, 后台有这个用户的信息