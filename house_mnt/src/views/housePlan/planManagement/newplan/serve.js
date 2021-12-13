import axios from '@/config/axios'
import {
  url,
  houseStore
} from '@/api/paths'

// export function init(params){ //
//   return Dhttp.get(common.init,params)
// }
export default {
  //初始化（新增）房源计划
  planInit(params) {
    return axios.get(url.palnInit, params)
  },

  //修改房源计划
  planModify(params, data) {
    return axios.post(url.planModify, params, data)
  },

  //根据计划用途级联筛选计划属性
  planProperty(params) {
    return axios.get(url.planProperty, params)
  },

  //根据供应计划号获取批次信息
  getPlanBatchesBySupplyCode(params) {
    return axios.get(url.planBatches, params)
  },

  //分页查询房源计划
  housePlanPage(params) {
    return axios.get(url.housePlanPage, params)
  },

  //根据批次代码获取组信息
  getGroupsByBatchCode(params) {
    return axios.get(url.housePlanGroups, params);
  },

  //根据批次代码获取队信息
  getQueuesByBatchCode(params) {
    return axios.get(url.housePlanQueues, params)
  },

  //获取小区列表
  getCommunityList(params) {
    return axios.get(url.communityList, params)
  },

  //获取该计划选择的队
  getPlanSelectQueue(params) {
    return axios.get(url.planSelectQueue, params)
  },

  //获取该计划选择的组
  getPlanSelectGroup(params) {
    return axios.get(url.planSelectGroup, params)
  },

  //根据小区查询楼栋号
  getUnitInfoList(params) {
    return axios.get(url.unitInfoList, params)
  },

  //获取房源计划详情信息
  getHousePlan(params) {
    return axios.get(url.getHousePlan, params)
  },

  //提交到下一个环节
  toNextNode(params, data) {
    return axios.post(url.housePlanSubmit, params, data)
  },

  //获取当前计划的审核意见
  getHousePlanOpinion(params) {
    return axios.get(url.housePlanOpinion, params)
  },

  //从房源计划中添加或移除房源
  houseInfoAddOrRemove(params, data) {
    return axios.post(url.houseInfoAddOrRemove, params, data)
  },

  //从待选房列表中移除房源
  houseInfoWaitingRemove(params, data) {
    return axios.post(url.houseInfoWaitingRemove, params, data)
  },

  //查询房源库并添加进待选房列表
  getHouseInfoStockList(params, data) {
    return axios.post(url.houseInfoStockList, params, data)
  },

  //分页查询房源计划中关联的房源信息
  houseInfoWaitingPage(params, timeout) {
    return axios.get(url.houseInfoWaitingPage, params, timeout)
  },
  //分页查询房源计划中选中房信息
  houseInfoSelectedPage(params, timeout) {
    return axios.get(url.houseInfoSelectedPage, params, timeout)
  },
  //分页查询房源计划中已下达的房源信息
  houseInfoReleasedPage(params, timeout) {
    return axios.get(url.houseInfoReleasedPage, params, timeout)
  },

  //获取未下达计划中关联的房屋状态统计
  getHouseStateStatistics(params) {
    return axios.get(url.houseStateStatistics, params)
  },

  //获取未下达计划中关联的归属权的统计
  getHouseSignStatistics(params) {
    return axios.get(url.houseSignStatistics, params)
  },

  //获取未下达计划中关联的房屋状态统计
  getHouseAreaStatistics(params) {
    return axios.get(url.houseAreaStatistics, params)
  },

  //获取未下达计划中关联的房屋状态统计
  getHouseTypeStatistics(params) {
    return axios.get(url.houseTypeStatistics, params)
  },

  //获取已下达计划中关联的房源状态统计
  getManagedStateStatistics(params) {
    return axios.get(url.managedStateStatistics, params)
  },

  //获取已下达计划中关联的房源状态统计
  getManagedAreaStatistics(params) {
    return axios.get(url.managedAreaStatistics, params)
  },

  // houseSignStatistics:'/house/signatoryRight/house_info',//获取未下达计划中关联的归属权的统计

  //   managedStateStatistics:'/managed/info/state/statistics' ,//获取已下达计划中关联的房源状态统计
  //   managedAreaStatistics:'/managed/info/area/statistics' ,//获取已下达计划中关联的房源状态统计
  //   managedTypeStatistics:'/managed/info/type/statistics' ,//获取已下达计划中关联的房源状态统计
  //   managedSignStatistics:'/house/signatoryRight/manage_info',//获取已下达计划中关联的归属权的统计


  //获取已下达计划中关联的房源状态统计
  getManagedTypeStatistics(params) {
    return axios.get(url.managedTypeStatistics, params)
  },

  //获取已下达计划中关联的归属权的状态统计
  getSignTypeStatistics(params) {
    return axios.get(url.managedSignStatistics, params)
  },

  //分页查询待选房列表
  getHouseInfoWaitingList(params) {
    return axios.get(url.houseInfoWaitingPage, params)
  },

  //根据计划状态分组获取计划的条数
  getHousePlanStateCount(params) {
    return axios.get(url.housePlanStateCount, params)
  },

  //根据字段名称查询字典表
  getFiledList(params) {
    return axios.get(url.planDictionary, params)
  },
  //逻辑删除房源计划
  getPlanDelete(params) {
    return axios.get(url.planDelete, params)
  },
  //获取字典
  getDictionary(params) {
    return axios.get(url.planDictionary, params)
  },
  //流程-获取房源计划列表待办
  getPlanListTodo(params) {
    return axios.get(url.processTodo, params)
  },
  //流程-获取房源计划列表已办
  getPlanListDone(params) {
    return axios.get(url.processDone, params)
  },
  //流程-获取房源计划列表已下达
  getPlanListRelease(params) {
    return axios.get(url.processRelease, params)
  },
  //流程化-新增房源计划-初始化
  initPlanInProcess(params) {
    return axios.get(url.processInit, params)
  },
  //coach
  processCoach(params) {
    return axios.get(url.processCoach, params)
  },
  //发送环节
  processSubmit(params) {
    return axios.get(url.processSubmit, params)
  },
  //回退环节
  processReturn(params) {
    return axios.get(url.processReturn, params)
  },
  //查询房源计划业务日志
  getPlanLog(params) {
    return axios.get(url.planLog, params)
  },
  //判断该房源计划是否已添加房源
  existedSelectedHouse(params) {
    return axios.get(url.planExistedSelected, params)
  },
  //退回至房源计划的房源查询
  getReturnedHousingQuery(params) {
    return axios.get(url.returnedHousingQuery, params)
  },
  //回收至房源库的房源查询
  getRecyclingRoom(params) {
    return axios.get(url.recyclingRoom, params)
  },
  //查询房源库并添加进待选房列表
  getReturnHousing(params, data) { //退回至房源计划
    return axios.post(url.returnHousing, params, data)
  },
  //查询房源库并添加进待选房列表
  getRecyclingHome(params, data) { //退回至房源计划
    return axios.post(url.recyclingHome, params, data)
  },
  //计划查询-查询所有房源计划
  getAllHousePlan(params) {
    return axios.get(url.allHousePlan, params)
  },
  //获取供应计划
  getBatchApply(params) {
    return axios.get(url.getBatchApply, params)
  },
  // mxq 增：2019.10.30
  getLoginer(params) { //得到当前登录人
    return axios.get(houseStore.getLoginer, params)
  },
  saveOpinion(params, data) { // 发送调用保存办理意见
    return axios.post(houseStore.saveOpinion, params, data)
  },
  getOpinion(params) { // 获取办理意见列表
    return axios.get(houseStore.getOpinion, params)
  },
  saveTempOpinion(params, data) { //保存暂存意见
    return axios.post(houseStore.saveTempOpinion, params, data)
  },
  getTempOpinion(params) { // 获取暂存意见
    return axios.get(houseStore.getTempOpinion, params)
  },
  //查看日志
  getLog(params) {
    return axios.get(houseStore.getLog, params)
  }

}
