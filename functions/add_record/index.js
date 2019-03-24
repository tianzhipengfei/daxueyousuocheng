// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const record = db.collection('record')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // console.log(event)
  let content = event.content
  let title = event.title
  let cate = event.cate
  let time = event.time
  try {
    return await db.collection('record').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        title: title,
        content: content,
        user: wxContext.OPENID,
        cate: cate,
        time: time
      }
    })
  } catch (e) {
    console.error(e)
  }
  // record.add({
  //   data:{
  //     title: title,
  //     content: content,
  //     user: wxContext.OPENID,
  //     datetime: myDate.toLocaleString(),
  //     cate: cate
  //   },
  //   success: function(res){
  //     console.log("suc:", res)
  //   }, fail: function(res) {
  //     console.log("fail:",res)
  //   }
  // })
}