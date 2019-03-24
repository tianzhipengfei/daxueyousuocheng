// pages/notice/notice.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    newif:false,
    historyif:false,
    role:"",
    list: [
      {
        id: '1',
        name: '关于即将开始评选本年度奖学金的通知',
        icon: '党建'
      },
      {
        id: '2',
        name: '关于奖学金发放的通知',
        icon: '听课'

      },
      {
        id: '3',
        name: '关于周三下午没课的同学听报告的通知',
        icon: '听课'
      },
      {
        id: '4',
        name: '关于学分核对的通知',
        icon: '听课'
      }
    ],
    checkboxItems: [
      { name: 'standard is dealt for u.', value: '0', checked: true },
      { name: 'standard is dealicient for u.', value: '1' }
    ],
    work: {
    },
    listLength: "",

    // 下面是我的data
    noticeList: null,
    enterTitle: null,
    enterContent: null,
    enterContentNum: 0,
    uploadReturnList: [],
    avatarUrl: null,
    nickName: null
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  },

  newnotice:function () {
    // 返回刷新通知列表
    // 请求所有通知列表  
    var that = this
    wx.request({
      url: 'https://wx.xingda188.com/daliangongye_2018_09_25/web/api/notice/getNoticeList.php',
      data: {},
      method: 'post',
      success: function (res) {
        console.log(res.data)
        that.setData({
          noticeList: res.data.data
        })
      },
      fail: function () {
      },
      complete: function () {
      }
    })
    var newif = this.data.newif
    that.setData({
      newif: !newif,
      enterContentNum: 0,
      files: []
    })
  },

  historynotice:function () {
    var historyif = this.data.historyif
    this.setData({
      historyif: !historyif
    })
  },

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
        console.log(that.data.files)
      }
    })
  },

  previewImage: function (e) {

    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  
  // 通知列表的图片点击预览
  previewImg (e) {
    var that = this
    console.log(e)
    wx.request({
      url: 'https://wx.xingda188.com/daliangongye_2018_09_25/web/api/notice/getNoticeList.php',
      data: {
        n_id: e.currentTarget.dataset.n_id
      },
      method: 'GET',
      success: function (res) {
          console.log(res.data)
        wx.previewImage({
          current: e.currentTarget.dataset.src, // 当前显示图片的http链接
          urls: res.data.data[0].n_pic // 需要预览的图片http链接列表
        })
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    var  that = this  
    var listLength = this.data.listLength;
    var list = this.data.list.length;
    that.setData({
      role: app.globalData.userInfo.role,
      listLength: list,
      avatarUrl: app.globalData.userInfo.wx_pic,
      nickName: app.globalData.userInfo.wx_name
    })

    // 请求所有通知列表  
    wx.request({
      url: 'https://wx.xingda188.com/daliangongye_2018_09_25/web/api/notice/getNoticeList.php',
      data: {},
      method: 'post',
      success: function (res) {
        console.log(res.data)
        that.setData({
          noticeList: res.data.data
        })
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  },

  //确认信息发布函数
  openConfirm: function () {
    var that = this
    if (that.data.enterTitle==null && that.data.enterContent==null) {
      wx.showToast({
        title: '必填内容不能为空',
        icon: 'none'
      })
      return
    }
    wx.showModal({
      title: '确认发布通知',
      content: '点击【确认】进行通知发布，发布后不可撤回，点击【取消】返回。',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
            // 确认添加通知   展示loading状态
          wx.showLoading({
            title: '发布中...'
          })
            // 用户确定添加一个通知 如果有图片  则先把图片上传起来 循环上传
            if (that.data.files.length) {
              let filesList = that.data.files,
                  uploadList = [];
              for (let [index, elem] of filesList.entries()) {
                wx.uploadFile({
                  url: 'https://wx.xingda188.com/daliangongye_2018_09_25/web/api/fileupload/pic_upload.php',
                  filePath: elem,
                  name: 'file',
                  formData: {},
                  success(res) {
                    uploadList.push(JSON.parse(res.data).data)
                    that.setData({
                      uploadReturnList: uploadList
                    })
                    // console.log(that.data.uploadReturnList)
                  }
                })
              }
            }
            // 拿到图片路径  然后调用添加通知的接口   增加一条新通知  为确保先拿到图片路径  需设一个定时器
            setTimeout(() => {
              wx.request({
                url: 'https://wx.xingda188.com/daliangongye_2018_09_25/web/api/notice/addNotice.php',
                data: {
                  n_title: that.data.enterTitle,
                  n_content: that.data.enterContent,
                  n_pic: that.data.uploadReturnList,
                  user_id: app.globalData.userInfo.user_id
                },
                header: {
                  'content-type':'application/x-www-form-urlencoded'
                },
                method: 'POST',
                success: function (res) {
                  console.log(res.data, '新增通知成功')
                  if(res.data.status == 1) {
                    wx.showToast({
                      title: '发布成功',
                      icon: 'none'
                    })
                    wx.hideLoading()
                    that.onLoad()
                    that.setData({
                      newif:false
                    })
                  }else {
                    wx.showToast({
                      title: '发布失败',
                      icon: 'none'
                    })
                  }
                },
                fail: function () {
                },
                complete: function () {
                }
              })
            }, 3000)
        } else {
        }
      }
    });
  },
  //  添加通知
  enterTitle (e) {
    console.log(e.detail.value, e.detail.cursor)
    this.setData({
      enterTitle: e.detail.value
    })
  },

  enterContent (e) {
    console.log(e.detail.value, e.detail.cursor)
    this.setData({
      enterContent: e.detail.value,
      enterContentNum: e.detail.cursor
    })
  },
  
  // 删除选中的图片
  deleteImg (e) {
    var that = this
    // console.log(e.currentTarget.dataset.src, '删除图片')
    // console.log(that.data.files)
    let filesList = that.data.files
    for (let [index, elem] of filesList.entries()) {
      if (e.currentTarget.dataset.src == elem) {
        filesList.splice(index, 1)
      }
      console.log(that.data.files);
      that.setData({
        files: filesList
      })
    }
  },
  // 删除一条通知  需要重新渲染通知列表
  deleteNotice(e) {
    var that = this
    console.log(e.currentTarget.dataset.n_id)
    wx.showModal({
      title: '提示',
      content: '确认删除此条通知吗？',
      success : function(res) {
         if(res.confirm) {
           wx.request({
             url: 'https://wx.xingda188.com/daliangongye_2018_09_25/web/api/notice/deleteNotice.php',
             data: {
               n_id: e.currentTarget.dataset.n_id
             },
             // header: {
             //   'content-type': 'application/x-www-form-urlencoded'
             // },
             method: 'GET',
             success: function (res) {
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
                   success: function (res) {
                     console.log(res.data)
                     that.setData({
                       noticeList: res.data.data
                     })
                   },
                   fail: function () {
                   },
                   complete: function () {
                   }
                 })
               } else {
                 wx.showToast({
                   title: '删除失败',
                   icon: 'none'
                 })
               }
             },
             fail: function () {
             },
             complete: function () {
             }
           })
         }
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