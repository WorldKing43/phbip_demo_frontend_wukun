//查询模块的函数
import axios from '@/config/axios'
import {
  roomChangeRoomInput,
  houseStore
} from '@/api/paths'

export default {
  //房改房录入-生成批次编号
  getBatchCode(params) {
    return axios.get(roomChangeRoomInput.getBatchCode, params)
  },
  //房改房录入-获取当前登陆人所属单位标识
  getUnit(params) {
    return axios.get(roomChangeRoomInput.getUnit, params)
  },
  //房改房录入-小区号生成
  getDistrictCode(params) {
    return axios.get(roomChangeRoomInput.getDistrictCode, params)
  },
  //获取字典
  getDictionary(params) {
    return axios.get(roomChangeRoomInput.getDictionary, params)
  },
  //房改房录入-新增小区信息
  addDistrict(params, data) {
    return axios.post(roomChangeRoomInput.addDistrict, params, data)
  },
  //房改房录入-获取小区名称
  getDistrictName(params) {
    return axios.get(roomChangeRoomInput.getDistrictName, params)
  },
  //房改房录入-获取某条记录的详细信息
  getInfo(params) {
    return axios.get(roomChangeRoomInput.getInfo, params)
  },
  //房改房录入-查看/删除/编辑某个小区详情信息
  operateDistrict(params, data) {
    return axios.post(roomChangeRoomInput.operateDistrict, params, data)
  },
  //房改房录入-新增栋信息
  addBuild(params, data) {
    return axios.post(roomChangeRoomInput.addBuild, params, data)
  },
  //房改房录入-查看/删除/编辑某个栋详情信息
  operateBuild(params, data) {
    return axios.post(roomChangeRoomInput.operateBuild, params, data)
  },
  //房改房录入-获取栋名称下拉值
  getBuildName(params) {
    return axios.get(roomChangeRoomInput.getBuildName, params)
  },
  //房改房录入-新增房屋信息
  addHouse(params, data) {
    return axios.post(roomChangeRoomInput.addHouse, params, data)
  },
  //房改房录入 - 查看 / 删除 / 编辑某个房屋详情信息
  operateHouse(params, data) {
    return axios.post(roomChangeRoomInput.operateHouse, params, data)
  },
  //房改房录入-原有小区录入信息查询
  getDistrictList(params) {
    return axios.get(roomChangeRoomInput.getDistrictList, params)
  },
  getHouseDistricAndPretList(params) {
    return axios.get(roomChangeRoomInput.getHouseDistricAndPretList, params)
  },
  //房改房录入-原有小区录入新增
  addOriginalDistrict(params) {
    return axios.get(roomChangeRoomInput.addOriginalDistrict, params)
  },
  //房改房录入-获取小区下栋列表信息
  getBuildList(params) {
    return axios.get(roomChangeRoomInput.getBuildList, params)
  },
  //房改房录入-原有小区录入新增
  addOriginalBuild(params) {
    return axios.get(roomChangeRoomInput.addOriginalBuild, params)
  },
  //房改房录入-保存
  addInfo(params) {
    return axios.get(roomChangeRoomInput.addInfo, params)
  },
  //房改房录入-待办箱/已办箱列表查看
  getSearchList(params) {
    return axios.get(roomChangeRoomInput.getSearchList, params)
  },
  //认领任务
  openCache(params) {
    return axios.get(roomChangeRoomInput.openCache, params)
  },
  //房改房录入-流程下达
  submit(params) {
    return axios.get(roomChangeRoomInput.submit, params)
  },
  //房改房录入-流程回退
  returnTask(params, data) {
    return axios.post(roomChangeRoomInput.returnTask, params, data)
  },
  //房改房录入-流程不通过
  unsubmit(params) {
    return axios.get(roomChangeRoomInput.unsubmit, params)
  },
  processDelete(params){
    return axios.get(roomChangeRoomInput.processDelete, params)
  },
  getUserName(params){
    return axios.get(houseStore.getUserName, params)
  }
}
