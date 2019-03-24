import config from './config.js'

export function get(url, data) {
  return request(url, 'GET', data)
}

export function post(url, data) {
  return request(url, 'POST', data)
}

export function login() {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '获取用户信息...',
      mask: true
    })
    wx.login({
      success: function (res) {
        console.log('获取成功')
        if (res.code) {
          resolve(res)
        } else {
          reject(res.errMsg)
        }
      },
      fail: function (res) {
        console.log('连接失败')
        wx.showModal({
          title: '网络异常',
          content: '请检查数据网络是否连接',
          showCancel: false,
          confirmText: '重新连接',
          success: function (res) {
            if (res.confirm) {
              login()
            } else if (res.cancel) {
            }
          }
        })
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  })
}

export function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '获取用户信息...',
      mask: true,
      success: res => {
        wx.getUserInfo({
          success: function (res) {
            console.log('获取成功')
            if (res.userInfo) {
              resolve(res)
            } else {
              reject(res.errMsg)
            }
          },
          fail: function (res) {
            console.log('连接失败')
            wx.showModal({
              title: '网络异常',
              content: '请检查数据网络是否连接',
              showCancel: false,
              confirmText: '重新连接',
              success: function (res) {
                if (res.confirm) {
                  login()
                } else if (res.cancel) {
                }
              }
            })
          },
          complete: function (res) {
            wx.hideLoading()
          }
        })
      }
    })
  })
}

function request(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: 'Loading...', // 提示的内容,
      mask: true, // 显示透明蒙层，防止触摸穿透,
      success: res => {
        wx.request({
          data,
          method,
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          url: config.host + url,
          success: function (res) {
            console.log('连接成功')
            if (res.statusCode == 200) {
              resolve(res.data)
            } else {
              reject(res.errMsg)
            }
          },
          // fail: function (res) {
          //   console.log('连接失败')
          //   wx.showModal({
          //     title: '网络异常',
          //     content: '请检查数据网络是否连接',
          //     showCancel: false,
          //     confirmText: '重新连接',
          //     success: function (res) {
          //       if (res.confirm) {
          //         request(url, method, data)
          //       } else if (res.cancel) {
          //       }
          //     }
          //   })
          // },
          complete: function (res) {
            wx.hideLoading()
          }
        })
      }
    })
  })
}

export function showModal(title, content, showCancel, yesText = '确认', noText = '取消') {
  // yesText = yesText || '确认'
  // noText = noText || '取消'
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: title, // 提示的标题,
      content: content, // 提示的内容,
      showCancel: showCancel, // 是否显示取消按钮,
      cancelText: noText, // 取消按钮的文字，默认为取消，最多 4 个字符,
      cancelColor: '#000000', // 取消按钮的文字颜色,
      confirmText: yesText, // 确定按钮的文字，默认为取消，最多 4 个字符,
      confirmColor: '#3CC51F', // 确定按钮的文字颜色,
      success: res => {
        if (res.confirm) {
          resolve()
        } else if (res.cancel) {
          reject(res.cancel)
        }
      }
    })
  })
}
