//查询模块的函数
//房屋维修管理模块函数
import axios from '@/config/axios'
import {
  vacuumRoominquire,
  houseMaintenance,
  url
} from '@/api/paths'

export default {
  //查询真空房列表信息
  getVacuumRoomList(params, data) {
    return axios.post(vacuumRoominquire.getVacuumRoomList, params, data)
  },
  //查询真空房弹框列表信息
  getVacuumRoomDilogList(params, data) {
    return axios.post(vacuumRoominquire.getVacuumRoomDilogList, params, data)
  },
  //保存真空房标记
  saveVacuumTag(params, data) {
    return axios.post(vacuumRoominquire.saveVacuumTag, params, data)
  },


  /**房屋维修管理 */
  //房屋维修管理-查询维修管理列表
  getMaintenanceList(params, data) {
    return axios.post(houseMaintenance.getMaintenanceList, params, data)
  },
  //房屋维修管理-获取新增确定后房屋列表信息
  getAddMaintainList(params) {
    return axios.get(houseMaintenance.getAddMaintainList, params)
  },
  //房屋维修管理-生成批次代码
  getMaintainCode(params) {
    return axios.get(houseMaintenance.getMaintainCode, params)
  },
  //房屋维修管理-确定新增记录
  addHouseMaintain(params, data) {
    return axios.post(houseMaintenance.addHouseMaintain, params, data)
  },
  //房屋维修管理-删除选择房屋
  deleteMaintainHouse(params) {
    return axios.get(houseMaintenance.deleteMaintainHouse, params)
  },
  //房屋维修管理-房屋维修管理信息保存
  saveHouseMaintain(params, data) {
    return axios.post(houseMaintenance.saveHouseMaintain, params, data)
  },
  //房屋维修管理-房屋维修管理信息保存
  getHouseMaintainInfo(params) {
    return axios.get(houseMaintenance.getHouseMaintainInfo, params)
  },
  //房屋维修管理-查看维修记录列表
  getHouseMaintainLogList(params) {
    return axios.get(houseMaintenance.getHouseMaintainLogList, params)
  },
  //房屋维修管理-删除维修记录
  deleteMaintainInfo(params, data) {
    return axios.post(houseMaintenance.deleteMaintainInfo, params, data)
  },
  //房屋维修管理-删除维修记录
  saveEditMaintain(params, data) {
    return axios.post(houseMaintenance.saveEditMaintain, params, data)
  },
  saveMaintainInfo(params, data) {
    return axios.post(houseMaintenance.saveMaintainInfo, params, data)
  },
  //获取当前登陆用户信息
  getUserInfo(params) {
    return axios.get(url.getUserInfo, params)
  },
}
