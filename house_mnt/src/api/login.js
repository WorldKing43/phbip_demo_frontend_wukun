import http from "@/api/housestore.js";

//获取字典数据
function getDictionary(){
  let nameData = ['维护归属']
  let params = {
    names: nameData.toString()
  }
  http.getDictionary(params).then(res => {
    console.log('login')
  }).catch(err => {
    console.log(err)
  })
}
getDictionary();