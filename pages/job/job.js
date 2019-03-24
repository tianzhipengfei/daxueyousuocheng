// pages/job/job.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  data: {
    list: [
      {
        id: '1',
        name: '学生党建工作内容',
        icon:'dangjian'
      },
      {
        id: '2',
        name: '听课情况工作内容',
        icon:'tingke'

      },
      {
        id: '3',
        name: '公寓走访工作内容',
        icon: 'gongyu'
      },
      {
        id: '4',
        name: '谈心谈话工作内容',
        icon: 'tanxin'
      },
      {
        id: '5',
        name: '家长沟通工作内容',
        icon: 'jiazhang'
      },
      {
        id: '6',
        name: '评奖评助工作内容',
        icon: 'jiangxuejin'
      },
      {
        id: '7',
        name: '骨干培养工作内容',
        icon: 'gugan'
      },
      {
        id: '8',
        name: '学生处分工作内容',
        icon: 'chufen'
      },
      {
        id: '9',
        name: '日常记录工作内容',
        icon: 'jilu'
      }
      
    ],
    work:{
      
    },
    listLength:"",
    foreword: "高校辅导员不仅是高等学校教师队伍和管理队伍的重要组成部分，而且是开展大学生思想政治教育和管理工作的组织者、实施者和指导者。高校辅导员工作岗位如此重要，对辅导员所具备的基本能力和素质到底应该如何界定，值得深入的商榷和思考，本人结合高校辅导员工作经验，就高校辅导员工作中辅导员应具备的基本能力素质提出如下见解。"
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  //弹出具体工作分类项目函数
  actionSheetTap: function () {
    wx.showActionSheet({
      itemList: ['学生党建', '公寓走访', '听课情况', '谈心谈话', '家长沟通', '评奖评助'],
      success: function (e) {
        console.log(e.tapIndex)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("这个是job页里的onLoad方法！");
    var listLength = this.data.listLength;
    var list=this.data.list.length;
    this.setData({
      listLength: list
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