import axios from '@/config/axios'
import {
  propertyRightChange,
  proRightUnitUrl
} from '@/api/paths'

export default {
  //产权变更-变更房源信息保存
  saveChangeInfo(params, data) {
    return axios.post(propertyRightChange.saveChangeInfo, params, data)
  },

  //产权变更-提交下一环节
  submit(params) {
    return axios.get(propertyRightChange.submit, params)
  },
  //产权变更-统计选中房产权数量
  getPropertyCount(params) {
    return axios.get(propertyRightChange.getPropertyCount, params)
  },
  // //产权变更-获取所有产权单位标识和名称
  // getUnit(params) {
  //   return axios.get(propertyRightChange.getUnit, params)
  // }


  //产权单位管理
  getProperRightInfo(params) {
    return axios.get(proRightUnitUrl.getProperRightInfo, params)
  },
  //产权单位信息保存并启动流程
  savePropertyRightInfo(params, data) {
    return axios.post(proRightUnitUrl.savePropertyRightInfo, params, data)
  },
  //待办箱/已办箱列表查询
  getPropertyRightList(params, data) {
    return axios.post(proRightUnitUrl.getPropertyRightList, params, data)
  },
  //流程提交下一环节
  submitPropertyRightProcess(params) {
    return axios.get(proRightUnitUrl.submitPropertyRightProcess, params)
  },
  //得到当前登录人
  getLoginer(params) {
    return axios.get(proRightUnitUrl.getLoginer, params)
  },
  //案件删除
  deleteProcess(params) {
    return axios.get(proRightUnitUrl.deleteProcess, params)
  },

  //案件回退
  rebackProcess(params) {
    return axios.get(proRightUnitUrl.rebackProcess, params)
  },
  getPropertyRightLog(params) {
    return axios.get(proRightUnitUrl.getPropertyRightLog, params)
  },
}
