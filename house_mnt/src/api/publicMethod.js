// 公共方法：例如，获取字典
import axios from '@/config/axios'
import {
  publicPath
} from '@/api/paths'

export default {
  /*****过程材料接口*****/
  //材料附件-获取材料
  getMaterial(params) {
    return axios.get(publicPath.getMaterial, params)
  },
  //材料附件-获取选房材料
  getHouseMaterial(params) {
    return axios.get(publicPath.getHouseMaterial, params)
  },
  //材料附件-材料上传
  uploadMaterial(params, data, config) {
    return axios.post(publicPath.uploadMaterial, params, data, config)
  },
  //材料附件-材料下载
  downLoadMaterial(params) {
    return axios.get(publicPath.downLoadMaterial, params)
  },
  //材料附件-材料删除
  deleteMaterial(params, data) {
    return axios.post(publicPath.deleteMaterial, params, data)
  },
  //获取后端属性的配置方法
  getReportUrl(params) {
    return axios.get(publicPath.getReportUrl, params)
  },
  //归还任务
  backTask(params) {
    return axios.get(publicPath.backTask, params)
  },
  //创建mis资源,非流程项目需要创建
  createMis(params) {
    return axios.get(publicPath.createMis, params)
  },
  //获取流程材料-流程通用
  createMisFlow(params) {
    return axios.get(publicPath.createMisFlow, params)
  },
  //获取流程信息
  getProcessInfo(params) {
    return axios.get(publicPath.getProcessInfo, params)
  },
  //获取过程材料
  getMaterialApproval(params) {
    return axios.get(publicPath.getMaterialApproval, params)
  },
  // 获取办理意见列表(房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getOpinion(params) {
    return axios.get(publicPath.getOpinion, params)
  },

  // 发送调用保存办理意见
  saveOpinion(params, data) {
    return axios.post(publicPath.saveOpinion, params, data)
  },

  // 获取暂存意见
  getTempOpinion(params) {
    return axios.get(publicPath.getTempOpinion, params)
  },

  // 保存暂存意见
  saveTempOpinion(params, data) {
    return axios.post(publicPath.saveTempOpinion, params, data)
  },

  //根据小区名称或编号模糊查询小区信息
  getCommunityList(params) {
    return axios.get(publicPath.getCommunityList, params)
  },
  modifyHouseInspect(params) {
    return axios.get(publicPath.modifyHouseInspect, params)
  },

  //房源管理-获取房屋产权变更记录(产权变更、房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getPropertyChangeInfo(params) {
    return axios.get(publicPath.getPropertyChangeInfo, params)
  },

  //房源管理-获取房屋性质变更记录(房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getNatureChangeInfo(params) {
    return axios.get(publicPath.getNatureChangeInfo, params)
  },

  //房源管理-获取使用权变更记录(房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getHistoryInfo(params) {
    return axios.get(publicPath.getHistoryInfo, params)
  },

  //产权变更-产权变更申请批次信息查询(产权变更、房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getPropertyRightChangeInfo(params) {
    return axios.get(publicPath.getPropertyRightChangeInfo, params)
  },

  //性质变更-性质变更申请批次信息查询(性质变更、房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getNatureChangeDetailInfo(params) {
    return axios.get(publicPath.getNatureChangeDetailInfo, params)
  },

  //产权变更-获取所有产权单位标识和名称(房改房共用)
  getPropertyUnit(params) {
    return axios.get(publicPath.getPropertyUnit, params)
  },

  //房源管理-获取房屋出租情况(房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getRentInfo(params) {
    return axios.get(publicPath.getRentInfo, params)
  },

  //房源管理-获取房屋签约情况(房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getSignInfo(params) {
    return axios.get(publicPath.getSignInfo, params)
  },

  //获取房源计划详情信息(房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getHousePlan(params) {
    return axios.get(publicPath.getHousePlan, params)
  },

  //获取房源计划里面的供应信息(房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getBatchApply(params) {
    return axios.get(publicPath.getBatchApply, params)
  },

  //分页查询房源计划中已下达的房源信息(房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getReleasedHouseInfo(params) {
    return axios.get(publicPath.getReleasedHouseInfo, params)
  },

  //产权变更-获取所有产权单位标识和名称(产权变更、房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getUnit(params) {
    return axios.get(publicPath.getUnit, params)
  },

  //根据字典名称查询(性质变更、产权变更)
  getDictionary(params) {
    return axios.get(publicPath.getDictionary, params)
  },

  //房源管理-获取分配批次信息(房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getBatchInfo(params) {
    return axios.get(publicPath.getBatchInfo, params)
  },

  //房源管理-产权归属下拉数据（增加了“空”选项）
  propertyList(params) {
    return axios.get(publicPath.propertyList, params)
  },
    //房源管理-局建房产权归属下拉数据（增加了“空”选项）
  propertyUnitList(params) {
      return axios.get(publicPath.propertyUnitList, params)
    },
      //房源管理-局建房产权归属下拉数据（增加了“空”选项）
  allocationUnitList(params) {
    return axios.get(publicPath.allocationUnitList, params)
  },

 //房源管理-签约权下拉数据（增加了“空”选项）
  signUpRightList(params) {
    return axios.get(publicPath.signUpRightList, params)
  },

  //房源管理-签约权下拉数据（增加了“空”选项）
  divisionList(params) {
    return axios.get(publicPath.divisionList, params)
  },
  // 房屋综合查询(市局)-查询房屋勘误
  getHouseErrataList(params) {
    return axios.get(publicPath.getHouseErrataList, params)
  },
  // 房屋综合查询(市局)-查询房屋勘误详细信息
  getHouseErrataDetialInfo(params) {
    return axios.get(publicPath.getHouseErrataDetialInfo, params)
  },
  // 房屋综合查询(市局)-查询房屋勘误导入详细信息
  getHouseExportDetialInfo(params) {
    return axios.get(publicPath.getHouseExportDetialInfo, params)
  },
  //获取当前小区所有不动产证书材料
  getRealPropertyList(params){
    return axios.get(publicPath.getRealPropertyList,params)
  }

}
