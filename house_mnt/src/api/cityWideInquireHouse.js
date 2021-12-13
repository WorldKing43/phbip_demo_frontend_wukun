//全市查询模块的函数
import axios from '@/config/axios'
import {
  cityWideInquireHouse
}
from '@/api/paths'

export default {
  //房源管理-全市房屋综合查询列表
  getCityWideHouse(params,data) {
    return axios.post(cityWideInquireHouse.getCityWideHouse, params,data)
  },
  // 房源管理-全市房屋综合查询列表
  exportCityWideHouse(params) {
    return axios.get(cityWideInquireHouse.exportCityWideHouse, params)
  },
  //房屋综合查询市局导出
  exportCityBureauComprehensiveHouseInfo(params){
    return axios.get(cityWideInquireHouse.exportCityBureauComprehensiveHouseInfo,params)
  },

  //企业自有住房查询
  getEnterpriseHouseList(params,data ){
    return axios.post(cityWideInquireHouse.getEnterpriseHouseList,params, data)
  },

  changeEnterpriseHouses(params,data){
    return axios.post(cityWideInquireHouse.changeEnterpriseHouses,params,data)
  }
}
