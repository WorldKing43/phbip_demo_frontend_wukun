/* 公共方法 */
import Dhttp from '../config/axios'
import {
  houseApproval,
  houseStore
} from '@/api/paths'

export default {
  // getListReportPrepare(params, data) { //上报审批查询
  //   return Dhttp.post(houseApproval.ListReportPrepare, params, data)
  // },
  getListReportPrepare(params) { //上报审批查询
    return Dhttp.get(houseApproval.ListReportPrepare, params)
  },
  getListReport(params,data) { //查询所有审批
    return Dhttp.post(houseApproval.ListReport, params,data)
  },
  getQueryReport(params) { //查询某个报批
    return Dhttp.get(houseApproval.QueryReport, params)
  },
  getListbuildingPrepare(params) { //查询栋信息准备
    return Dhttp.get(houseApproval.ListbuildingPrepare, params)
  },
  getListHousePrepare(params) { //按条件查询房源信息准备
    return Dhttp.get(houseApproval.ListHousePrepare, params)
  },
  getQuerySupportDevice(params) { //查询某个房源的设备信息
    return Dhttp.get(houseApproval.QuerySupportDevice, params)
  },
  CommitHouseReport(params, data) { //提交
    return Dhttp.post(houseApproval.HouseReportCommit, params, data)
  },
  getPickUpList(params, data) { //入库审批-获取接件列表
    return Dhttp.post(houseApproval.getPickUpList, params, data)
  },
  getPickUpData(params, data) { //入库审批-接件操作
    return Dhttp.post(houseApproval.getPickUpData, params, data)
  },
  saveApprovalInfo(params) { //入库审批-保存批次报批基本信息
    return Dhttp.get(houseApproval.saveApprovalInfo, params)
  },
  submitApprovalProcess(params, data) { //入库审批-流程提交
    return Dhttp.post(houseApproval.submitApprovalProcess, params, data)
  },
  getActivityNames(params) { //入库审批-获取环节名称
    return Dhttp.get(houseApproval.getActivityNames, params)
  },
  getDistrictInfo(params) { //入库审批-查询小区信息
    return Dhttp.get(houseApproval.getDistrictInfo, params)
  },
  getBuildingInfo(params) { //入库审批-查询栋信息
    return Dhttp.get(houseApproval.getBuildingInfo, params)
  },
  getBuildingDetails(params) { //入库审批-查询栋详情
    return Dhttp.get(houseApproval.getBuildingDetails, params)
  },
  getHouseInfo(params) { //入库审批-查询房信息
    return Dhttp.get(houseApproval.getHouseInfo, params)
  },
  getHouseDetails(params) { //入库审批-查询房源详情
    return Dhttp.get(houseApproval.getHouseDetails, params)
  },
  processRetrun(params, data) { //入库审批-流程回退
    return Dhttp.post(houseApproval.processRetrun, params, data)
  },
  getCouldReturn(params) { //入库审批-获取可回退环节
    return Dhttp.get(houseApproval.getCouldReturn, params)
  },
  searchDictionary(params) { //查询字典
    return Dhttp.get(houseStore.getDictionary, params)
  },
  openCoach(params) { //后台打开表单--认领任务
    return Dhttp.get(houseStore.openCache, params)
  },
  saveOpinion(params, data) { // 发送调用保存办理意见
    return Dhttp.post(houseStore.saveOpinion, params, data)
  },
  saveTempOpinion(params, data) {
    return Dhttp.post(houseStore.saveTempOpinion, params, data)
  },
  getTempOpinion(params) { // 获取暂存意见
    return Dhttp.get(houseStore.getTempOpinion, params)
  },
  getLoginer(params) { //得到当前登录人
    return Dhttp.get(houseStore.getLoginer, params)
  },
  getOpinion(params) { // 获取办理意见列表
    return Dhttp.get(houseStore.getOpinion, params)
  },
  //获取该域下的单位
  getListUnit(params) {
    return Dhttp.get(houseApproval.getListUnit, params)
  },
  //得到权限
  getPermission(params) {
    return Dhttp.get(houseApproval.getPermission, params);
  },
  //得到权限
  getOpenPermission(params) {
    return Dhttp.get(houseApproval.getOpenPermission, params);
  },
  //入库审批-获取配套设施列表
  supportingFacility(params) {
    return Dhttp.get(houseApproval.supportingFacility, params)
  },
  //入库审批-获取配套设施详细信息
  supportingdetails(params) {
    return Dhttp.get(houseApproval.supportingdetails, params)
  },
  //房源入库审批-修改小区信息
  editdistrictInfo(params, data) {
    return Dhttp.post(houseApproval.editdistrictInfo, params, data)
  },
  //房源入库审批-修改栋信息
  editBuilding(params, data) {
    return Dhttp.post(houseApproval.editBuilding, params, data)
  },
  //房源入库审批-修改配套设施信息
  editSupportDevice(params, data) {
    return Dhttp.post(houseApproval.editSupportDevice, params, data)
  },
  //房源入库审批-修改房屋信息
  edithouse(params, data) {
    return Dhttp.post(houseApproval.edithouse, params, data)
  },
  //房源入库审批-批量修改房屋信息
  bulkEdithouse(params, data) {
    return Dhttp.post(houseApproval.bulkEdithouse, params, data)
  },
  //导入文件
  importFile(params, data) {
    return Dhttp.post(houseApproval.importFile, params, data)
  },
  //获取小区编号
  getCode(params) {
    return Dhttp.get(houseApproval.getCode, params)
  },
  //新增宗地信息
  addland(params, data) {
    return Dhttp.post(houseApproval.addland, params, data)
  },
  //得到宗地列表
  getLandList(params) {
    return Dhttp.get(houseApproval.getLandList, params)
  },
  //入库审批-编辑/删除宗地号信息
  editLand(params, data) {
    return Dhttp.post(houseApproval.editLand, params, data)
  },
  //入库审批-入库审批-装修标准新增
  addRenovation(params) {
    return Dhttp.get(houseApproval.addRenovation, params)
  },
  //入库审批-查询小区下装修列表信息
  getRenovationList(params) {
    return Dhttp.get(houseApproval.getRenovationList, params)
  },
  //入库申请-获取小区下所有的宗地号
  getAllLand(params) {
    return Dhttp.get(houseApproval.getAllLand, params)
  },
  //入库审批-装修标准删除/修改
  editRenovation(params) {
    return Dhttp.get(houseApproval.editRenovation, params)
  },
  //入库审批-获取小区装修标准信息
  getDistrictRenovationList(params) {
    return Dhttp.get(houseApproval.getDistrictRenovationList, params)
  }
}
