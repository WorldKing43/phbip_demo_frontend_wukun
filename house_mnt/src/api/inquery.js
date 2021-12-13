//查询模块的函数
import axios from '@/config/axios'
import {inquery} from '@/api/paths'

export  default{
  //查询
  getstoreHousePage(params) {
    return axios.get(inquery.storeHousePage,params)
  },
  /**局建房查询接口 */
  // 局建房查询-列表查询
  bureaubuildingHouse(params,data) {
    return axios.post(inquery.bureaubuildingHouse, params, data);
  },
  //修改房屋备注
  changeHouseRemark(params) {
    return axios.get(inquery.changeHouseRemark, params)
  },
  //局建房查询-售房查询-列表信息
  getSignedContract(params, data) {
    return axios.post(inquery.getSignedContract, params, data)
  },
   //局建房查询-售房查询-获取当前权利人
   getCurrentOwner(params) {
    return axios.get(inquery.getCurrentOwner, params)
  },
   //局建房查询-售房查询-获取原购房人信息
   getOldBuyer(params) {
    return axios.get(inquery.getOldBuyer, params)
  },
  //局建房查询-售房查询-查询历史权利人
  getHistoryOwner(params) {
    return axios.get(inquery.getHistoryOwner, params)
  },
  //局建房查询-售房查询-查询购买情况信息
  getContractInfo(params) {
    return axios.get(inquery.getContractInfo, params)
  },
  /**局建房查询(全市) */
  //查询
  getCityHouseList(params) {
    return axios.get(inquery.getCityHouseList,params)
  },
  /*房屋综合查询（第三方运营）*/
  getThirdPartyOperationHouseList(params,data) {
    return axios.post(inquery.getThirdPartyOperationHouseList,params,data)
  },
}
