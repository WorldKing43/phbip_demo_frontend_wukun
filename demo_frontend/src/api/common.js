/* 公共方法 */
import requset from '@/config/axios'
import { mapUrl, grid } from '@/api/paths'
import http from '../views/housePlan/planManagement/newplan/serve'

export default {
  getNumList() {
        http.getHousePlanStateCount(params).then(res => {
          console.log(res)
          let all='';
          let editNum= '';
          let firstrialNum= '';
          let reviewedNum= '';
          let waitGiveNum= '';
          let givedNum= '';
          res.content.forEach(item => {
            console.log(item)
              all++;
            if(item == '0') {
              editNum++;
            } else if(item == '1') {
              firstrialNum++;
            } else if(item == '2') {
              reviewedNum++;
            } else if(item == '3') {
              waitGiveNum++;
            } else if(item == '4') {
              givedNum++;
            }
          });
          let BadgeItem = [
            {
              name: '所有',
              value: all
            },
            {
              name: '编制',
              value: editNum
            },
            {
              name: '初审',
              value: firstrialNum
            },
            {
              name: '审核',
              value: reviewedNum
            },
            {
              name: '待下达',
              value: waitGiveNum
            },
            {
              name: '已下达',
              value: givedNum
            }
          ]
          this.$store.commit('setBadgeItem',BadgeItem)
          
        }).catch(err => {
          console.log(err)
        })
    },

  //建筹地图服务相关的接口
  getHouseMapUrl(params){
    return requset.get(mapUrl.getHouseMapUrl, params)
  },
  //根据地址查询网格标准数据
  searchReseauDataByAddr(params){
    return requset.get(grid.searchReseauDataByAddr, params)
  },
  //根据网格编码查询网格标准数据
  searchReseauDataByCode(params){
    return requset.get(grid.searchReseauDataByCode, params)
  },

  //房屋/栋网格办信息保存
  saveGridInfo(params,data){
    return requset.post(grid.saveGridInfo,params,data);
  },

  getGridCodeByAddress(params){
    return requset.get(grid.getGridCodeByAddress, params)
  },
  ////地址救济服务插入接口
  sentReliefService(params,data){
    return requset.post(grid.sentReliefService,params,data);
  },
  checkReseau(params){
    return requset.get(grid.checkReseau,params);
  },
  getReliefResult(params){
    return requset.get(grid.getReliefResult,params);
  },

}
