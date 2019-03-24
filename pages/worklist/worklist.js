// pages/worklist/worklist.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addTitle: '',
    addContentL: '',
    flag: 0,
    showAdd: 0,
    recordList: [],
    list: [{
        id: '1',
        name: '学生党建工作内容',
        icon: 'dangjian',
        content: ""
      },
      {
        id: '2',
        name: '听课情况工作内容',
        icon: 'tingke',
        content: ""

      },
      {
        id: '3',
        name: '公寓走访工作内容',
        icon: 'gongyu',
        content: ""
      },
      {
        id: '4',
        name: '谈心谈话工作内容',
        icon: 'tanxin',
        content: ""
      },
      {
        id: '5',
        name: '家长沟通工作内容',
        icon: 'jiazhang',
        content: ""
      },
      {
        id: '6',
        name: '评奖评助工作内容',
        icon: 'jiangxuejin',
        content: ""
      },
      {
        id: '7',
        name: '骨干培养工作内容',
        icon: 'gugan',
        content: ""
      },
      {
        id: '8',
        name: '学生处分工作内容',
        icon: 'chufen',
        content: ""
      },
      {
        id: '9',
        name: '日常记录工作内容',
        icon: 'jilu',
        content: ""
      }

    ],
    dataTitle: "",
    content: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      dataTitle: that.data.list[options.id - 1].name,
      content: that.data.list[options.id - 1].content,
    })
    this.getMemorandumList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
  // 返回函数
  back: function() {
    var x = getCurrentPages();
    wx.navigateBack({
      delta: x
    })
  },

  add: function() {
    this.setData({
      flag: 1, 
      showAdd: 1,
    })
  },

  yesAdd: function() {
    var that = this
    console.log(that.data.addTitle)
    console.log(that.data.addContent)
    if (that.data.addTitle == ""){
      wx.showToast({
        title: '请输入标题',
        complete: function(){
          return 
        }
      })
    }
    else if (that.data.addContent == "") {
      wx.showToast({
        title: '请输入内容',
        complete: function () {
          return
        }
      })
    } else {
      var myDate = new Date()
      var date = ''
      date += myDate.getFullYear() + '/'
      date += myDate.getMonth() + '/'
      date += myDate.getDate() + ' '
      date += myDate.getHours() + ':'
      date += myDate.getMinutes() + ':'
      date += myDate.getSeconds() + ' '
      console.log(date)
      const db = wx.cloud.database()
      db.collection('record').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          title: that.data.addTitle,
          content: that.data.addContent,
          cate: that.data.dataTitle,
          time: date,
          user: app.globalData.userInfo.open_id
        },
        success(res) {
          console.log(res)
          if (res.errMsg == "collection.add:ok") {
            wx.showToast({
              title: '添加成功',
              complete: function(){
                that.setData({
                  showAdd: 0
                })
              }
            })
          } else{
            console.log(res.result.errMsg)
            wx.showToast({
              title: '添加失败',
              complete: function () {
                that.setData({
                  showAdd: 0
                })
              }
            })
          }
          that.getMemorandumList()
        },
        fail(res) {
          console.log(res)
          wx.showToast({
            title: '添加失败',
            complete: function () {
              that.setData({
                showAdd: 0
              })
            }
          })
        }
      })
    }
  },

  cancelAdd: function () {
    this.setData({
      showAdd: 0,
    })
  },

  inputTitle(e) {
    var that = this
    that.setData({
      addTitle: e.detail.value
    })
  },

  inputContent(e) {
    var that = this
    that.setData({
      addContent: e.detail.value
    })
  },

  getMemorandumList: function () {
    var that = this;
    const db = wx.cloud.database()
    db.collection('record').where({
      user: app.globalData.userInfo.open_id,
      cate: that.data.dataTitle
    }).get({
      success(res) {
        console.log(res)
        var data_list = []
        console.log(res.data.length)
        for (var i = 0; i < res.data.length; i++){
          let item = res.data[i]
          var cur = {
            _id: item._id,
            cate: item.cate,
            content: item.content,
            time: item.time,
            title: item.title,
            rotation: -90
          }
          data_list.push(cur)
        }
        console.log(data_list)
        that.setData({
          recordList: data_list
        })
        console.log(data_list)
      }
    })
  },

  click_arrow: function(e){
    console.log(e.currentTarget.dataset)
    let that = this
    let index = e.currentTarget.dataset.id
    if(that.data.recordList[index].rotation == -90){
      that.data.recordList[index].rotation = 0
      that.setData({
        recordList: that.data.recordList
      })
    } else{
      that.data.recordList[index].rotation = -90
      that.setData({
        recordList: that.data.recordList
      })
    }
  },

  delete_record: function (e) {
    let that = this
    console.log(e.currentTarget.dataset.id)
    let record_number = e.currentTarget.dataset.id
    let record_id = this.data.recordList[record_number]._id
    console.log(record_id)
    const db = wx.cloud.database()
    db.collection('record').doc(record_id).remove({
      success(res) {
        if (res.errMsg == "document.remove:ok"){
          wx.showToast({
            title: '删除成功',
          })
        } else {
          console.log(res.result.errMsg)
          wx.showToast({
            title: '删除失败',
          })
        }
        that.getMemorandumList()
      },
      fail(res) {
        console.log(res)
        wx.showToast({
          title: '删除失败',
        })
      }
    })
  }
})