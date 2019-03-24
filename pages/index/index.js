const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModel: false,
    showAdd: false,
    recordList: null,
    addTitle: null,
    addContent: null,
    currentTitle: null,
    currentContent: null,
    flag: 0,
    current_m_id: null,
    hasUserInfo: false,
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    foreword: "高校辅导员不仅是高等学校教师队伍和管理队伍的重要组成部分，而且是开展大学生思想政治教育和管理工作的组织者、实施者和指导者。高校辅导员工作岗位如此重要，对辅导员所具备的基本能力和素质到底应该如何界定，值得深入的商榷和思考，本人结合高校辅导员工作经验，就高校辅导员工作中辅导员应具备的基本能力素质提出如下见解。"
  },
  onLoad: function (options) {
    let that = this
    app.getUser(function(){
      if (app.globalData.userInfo) {
        that.getMemorandumList()
      } else {
        that.onLoad()
      }
    })
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
    var that = this;
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          that.setData({
            showModel: true
          })
        }
      }
    },1000)
  },
  getMemorandumList: function (){
    var that = this;
    wx.request({
      url: 'https://wx.xingda188.com/daliangongye_2018_09_25/web/api/memorandum/getMemorandumList.php',
      data: {
        user_id: app.globalData.userInfo.user_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          recordList: res.data.data
        })
      }
    }) 
  },

//  统一授权
  agreeGetUser(e) {
    let that=this
    console.log(app.globalData.userInfo)
    // 此处拿到encryptedData需要发到后台去解密出unionid 
    // console.log(e.detail.encryptedData)
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.request({
            url: 'https://wx.xingda188.com/daliangongye_2018_09_25/web/api/user/updateUser.php',
            method:'post',
            data: {
              user_id:app.globalData.userInfo.user_id,
              wx_name:e.detail.userInfo.nickName,
              wx_pic:e.detail.userInfo.avatarUrl
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data.data)
              that.setData({
                recordList: res.data.data
              })
            }
          })
          // 有授权，关闭弹窗
          this.setData({
            showModel: false
          })
        }
      }
    })
  },

  addRecord () {
    this.getMemorandumList()
    this.setData({
      showAdd: true,
      flag: 1
    })
  },

  cancelAdd () {
   this.setData({
     showAdd: false
   })
  },
  cancelEdit() {
    this.setData({
      showAdd: false
    })
  },

  // 此处调用接口添加记录  添加成功即关闭modal  然后刷新刷新数据重新渲染
  yesAdd () {
    var that = this
    wx.request({
      url: 'https://wx.xingda188.com/daliangongye_2018_09_25/web/api/memorandum/addMemorandum.php',
      data: {
        m_title: that.data.addTitle,
        m_content: that.data.addContent,
        user_id: app.globalData.userInfo.user_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status==1) {
          // 添加成功刷新数据
          that.getMemorandumList()
          wx.showToast({
            title: '添加成功',
            icon: 'none'
          })
          that.setData({
            showAdd: false
          })
        }else {
          wx.showToast({
            title: '添加失败',
            icon: 'none'
          })
        }
      }
    }) 
  },

  // 此处调用接口修改记录  修改成功即关闭modal  然后刷新刷新数据重新渲染
  yesEdit() {
    var that = this
    console.log(that.data.addTitle, that.data.addContent)
    wx.request({
      url: 'https://wx.xingda188.com/daliangongye_2018_09_25/web/api/memorandum/updateMemorandum.php',
      data: {
        m_title: that.data.addTitle,
        m_content: that.data.addContent,
        m_id: that.data.current_m_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status == 1) {
          // 修改成功刷新数据
          wx.request({
            url: 'https://wx.xingda188.com/daliangongye_2018_09_25/web/api/memorandum/getMemorandumList.php',
            data: {},
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data.data)
              that.setData({
                recordList: res.data.data
              })
            }
          })
          wx.showToast({
            title: '编辑成功',
            icon: 'none'
          })
          that.setData({
            showAdd: false
          })
        } else {
          wx.showToast({
            title: '编辑失败',
            icon: 'none'
          })
        }
      }
    })
  },

  inputTitle (e) {
    var that = this
    // console.log(e.detail.value)
    that.setData({
      addTitle: e.detail.value
    })
  }, 

  inputContent (e) {
    var that = this
    // console.log(e.detail.value)
    that.setData({
      addContent: e.detail.value
    })
  },

  //  编辑备忘录
  editM (e) {
    var that = this
    that.setData({
      flag: 0,
      current_m_id: e.currentTarget.dataset.m_id
    })
    console.log('编辑', e.currentTarget.dataset.m_id)
    // 先拿到当前这条记录的内容
    wx.request({
      url: 'https://wx.xingda188.com/daliangongye_2018_09_25/web/api/memorandum/getMemorandumList.php',
      data: {
        m_id: e.currentTarget.dataset.m_id,
        user_id: app.globalData.user_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          currentTitle: res.data.data[0].m_title,
          currentContent: res.data.data[0].m_content,
          addTitle: res.data.data[0].m_title,
          addContent: res.data.data[0].m_content,
          showAdd: true
        })
        // console.log(that.data.currentTitle, that.data.currentContent)
      }
    })  
  },

  deleteM (e) {
    var that = this
    that.setData({
      current_m_id: e.currentTarget.dataset.m_id
    })
    wx.request({
      url: 'https://wx.xingda188.com/daliangongye_2018_09_25/web/api/memorandum/deleteMemorandum.php',
      data: {
        m_id: e.currentTarget.dataset.m_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data)
        if(res.data.status == 1) {
          wx.showToast({
            title: '已删除',
            icon: 'none'
          })
          // 删除成功，重新渲染数据
          wx.request({
            url: 'https://wx.xingda188.com/daliangongye_2018_09_25/web/api/memorandum/getMemorandumList.php',
            data: {},
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data.data)
              that.setData({
                recordList: res.data.data
              })
            }
          })
        } else {
          wx.showToast({
            title: '删除失败',
            icon: 'none'
          })
        }
      }
    })

    console.log('删除', e.currentTarget.dataset.m_id)
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