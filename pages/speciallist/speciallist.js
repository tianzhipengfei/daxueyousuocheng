// pages/speciallist/speciallist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Speciallist: [{
      specialtype: 'jtjjkn',
      studentnum: ['1604060101', '1604060102', '1604060103', '1604060104'],
      name: ['代爽', "储科", "赵可豪", "李红峰"],
      type: ['已回维', '已回维', '已回维', '未回维'],
      heading: "回维学生",
      text: "",
      num: 4,
    }, {
      specialtype: 'jtjjkn',
      studentnum: ['1604060105', '1604060106', '1604060107', '1604060108', '1604060109'],
      name: ['徐乐乐', "马国川", "胡鹏鹏", "王伟", "郭佳奇"],
      type: ['基督教', '佛教', '佛教', '清真教', '清真教'],
      heading: "宗教信仰学生",
      text: "",
      num: 4,
    }, {
      specialtype: 'jtjjkn',
      studentnum: ['1234567', '777777', '8888888', '555555'],
      name: ['张三', "李四", "王五", "周六"],
      type: ['男', '男', '男', '女'],
      heading: "孤儿学生",
      text: "",
      num: 4,
    }, {
      specialtype: 'jtjjkn',
      studentnum: ['1234567', '777777', '8888888', '555555'],
      name: ['张三', "李四", "王五", "周六"],
      type: ['男', '男', '男', '女'],
      heading: "学业困难学生",
      text: "",
      num: 4,
    }, {
      specialtype: 'jtjjkn',
      studentnum: ['1234567', '777777', '8888888', '555555'],
      name: ['张三', "李四", "王五", "周六"],
      type: ['男', '男', '男', '女'],
      heading: "心理问题学生",
      text: "",
      num: 4,
    }, {
      specialtype: 'jtjjkn',
      studentnum: ['1234567', '777777', '8888888', '555555'],
      name: ['张三', "李四", "王五", "周六"],
      type: ['贫困', '贫困', '特困', '特困'],
      heading: "经济困难学生",
      text: "",
      num: 4,
    }, {
      specialtype: 'jtjjkn',
      studentnum: ['1234567', '777777', '8888888', '555555'],
      name: ['张三', "李四", "王五", "周六"],
      type: ['贫困', '贫困', '特困', '特困'],
      heading: "各类处分学生",
      text: "",
      num: 4,
    }, {
      specialtype: 'jtjjkn',
      studentnum: ['1234567', '777777', '8888888', '555555'],
      name: ['张三', "李四", "王五", "周六"],
      type: ['男', '男', '男', '女'],
      heading: "其他情况学生",
      text: "",
      num: 4,
    }],
    Special: {},
    all: {
      specialtype: 'jtjjkn',
      studentnum: ['1234567', '777777', '8888888', '555555'],
      name: ['代爽', '储科', '赵可豪', '李红峰', '徐乐乐', '马国川', '胡鹏鹏', '王伟', '郭佳奇', '张润', '冉辉', '孙继岩', '王瀚毅', '关畅', '陈梦峣',
        '冷学宝', '林美姣', '姜旭遥', '杜俊威', '马雨晴', '张胜华', '王成瑞', '王喆  ', '黄俊杰', '刘宗石', '吴铮  ', '张祥熙', '周瑀杭', '陆林', '于海峰','贾越茼'],
      type: ['女', '男', '男', '男', '男', '男', '男', '男', '女', '男', '男', '男', '女', '女', '男', '女', '男', '男', '女', '男', '男', '男', '男', '男', '女', '男', '男', '男', '男', '女'],
      heading: "机械学院材料成型及控制工程16-1班学生名单",
      text: "",
      num: 31,
    }
  },
  //查看详情函数
  viewdetails: function(e) {
    var num = e.currentTarget.dataset.studentnum;
    // console.log(num);

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id)
    let that = this;
    if (options.id) {
      var num = that.data.Speciallist[options.id].name.length;
      console.log(that.data.Speciallist[options.id])
      this.setData({
        Special: that.data.Speciallist[options.id],
        num: num
      });
    } else {
      var num = that.data.all.name.length;
      this.setData({
        Special: that.data.all,
        num: num
      });
    }


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
    console.log(x);
    wx.navigateBack({
      delta: x
    })
  }
})