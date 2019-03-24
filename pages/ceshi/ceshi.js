Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  //确认信息更正函数
  openConfirm: function () {
    wx.showModal({
      title: '确认更改信息',
      content: '点击【确认】进行信息更改，更改后不可恢复，点击【取消】返回。',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },
  // 返回函数
  back:function(){
    var x=getCurrentPages();
    console.log(x);
    wx.navigateBack({
      delta:x
    })    
  },
  // 展开函数
  toggle:function(e){
    var openif=this.data.openif;
    // console.log(e);
    var name=e.currentTarget.id;
    for (var i = 0, len = openif.length; i < len; ++i) {
      if (openif[i].name == name) {
        openif[i].open = !openif[i].open
        }
      }
      this.setData({
        openif:openif
      });
  },
  // 定义数据、对象
  data: {
      // 主要数据
      openif:[
        { 
          name:"jibenxinxi",
          cname:"基本信息",
          open:true,
          page: ['手机号码', 'QQ号码', '微信号码', '家庭地址', '身份证号', '入学日期', '所在寝室'],
          value: ['15541165293', '暂无', 'weixin123', '辽宁省朝阳市建平县黑水镇', '211322198711111118', '2015-09-01', '22#616-1'],
          handle:['call','','','','','',''],
          handlename: ['呼叫', '', '', '', '', '', '查看']

        },
        {
          name:"jiatingchengyuanxinxi",
          cname:"家庭信息",
          open:false,
          page: ['父亲姓名', '父亲手机', '父亲单位', '母亲姓名', '母亲手机','母亲单位', '特殊说明'],
          value: ['丁某某', '14567778888', '下岗', '代某某', '13899996666', '大连机车厂', ''],
          handle: ['', 'call', '', '', 'call', '', ''],
          handlename: ['', '呼叫', '', '', '呼叫', '', '']
        },
        {
          name:"xueyeqingkuang",
          cname:"学业情况",
          open:false,
          page:['2015秋','2016春','2016秋','2017春'],
          value: ['1/60（纯）；2/60（综）', '1/60（纯）；2/60（综）', '1/60（纯）；2/60（综）','1/60（纯）；2/60（综）'],
          handle:[],
          handlename:[]
        },
        {
          name: "xueshenggongzuo",
          cname: "学生工作",
          open: false,
          page: ['2015秋', '2016春', '2016秋', '2017春'],
          value: ['班级班长', '班级班长', '班级班长', '班级班长'],
          handle: [],
          handlename: []
        },
        {
          name: "chufenqingkuang",
          cname: "处分情况",
          open: false,
          page: ['2015秋', '2016春', '2016秋', '2017春'],
          value: ['', '', '', ''],
          handle: [],
          handlename: []
        },
        {
          name: "zongjiaoxinyang",
          cname: "宗教信仰",
          open: false,
          page: ['2015秋', '2016春', '2016秋', '2017春'],
          value: ['', '', '', ''],
          handle: [],
          handlename: []
        },
        {
          name: "rongyuchenghao",
          cname: "荣誉称号",
          open: false,
          page: ['2015秋', '2016春', '2016秋', '2017春'],
          value: ['', '', '2015-2016学年大连市三好学生', ''],
          handle: [],
          handlename: []
        },
        {
          name: "huojiangxuejin",
          cname: "获奖学金",
          open: false,
          page: ['2015秋', '2016春', '2016秋', '2017春'],
          value: ['', '', '2015-2016学年国家奖学金', ''],
          handle: [],
          handlename: []
        },
        {
          name: "wenhuahuodong",
          cname: "文化活动",
          open: false,
          page: ['2015秋', '2016春', '2016秋', '2017春'],
          value: ['乒乓球协会成员', '', '', ''],
          handle: [],
          handlename: []
        },
        {
          name: "xuejichuli",
          cname: "学籍处理",
          open: false,
          page: ['2015秋', '2016春', '2016秋', '2017春'],
          value: ['', '', '', ''],
          handle: [],
          handlename: []
        },
        {
          name: "economist",
          cname: "经济情况",
          open: false,
          page: ['2015秋', '2016春', '2016秋', '2017春'],
          value: ['非贫困生', '一般困难', '特殊困难', '一般困难'],
          handle: ['', '', '', ''],
          handlename: ['', '受助', '', '']
        }
        ,
        {
          name: "shouzhuqingkuang",
          cname: "受助情况",
          open: false,
          page: ['2015秋', '2016春', '2016秋', '2017春'],
          value: ['', '一等助学金', '校友助学金、一等助学就', '二等助学就'],
          handle: ['', '', '', ''],
          handlename: ['', '', '', '']
        }
        ,
        {
          name: "teshujizai",
          cname: "特殊记载",
          open: false,
          page: ['2015秋', '2016春', '2016秋', '2017春'],
          value: ['', '', '', '2017年10月11日献血'],
          handle: ['', '', '', ''],
          handlename: ['', '', '', '']
        }
      ]
  },
  // 电话呼叫函数
  call:function(e){
    var phonenumber = e.currentTarget.dataset.biaoji;
    wx.makePhoneCall({
            phoneNumber: phonenumber 
    })
  }
  
})