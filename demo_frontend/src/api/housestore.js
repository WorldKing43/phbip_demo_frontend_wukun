import axios from '@/config/axios'
import {
  houseStore,
  houseReturn,
  publicPath,
  demolition
} from '@/api/paths'

export default {

  //分页获取小区列表
  getPage(params) {
    return axios.get(houseStore.storeDistrictPage, params);
  },

  //获取小区信息
  getNeighbourhoodInfo(params) {
    return axios.get(houseStore.storeDistrictGet, params);
  },

  //分页查询楼栋列表
  getBuildingPage(params) {
    return axios.get(houseStore.storeBuildingPage, params)
  },

  //获取栋信息
  getBuildingInfo(params) {
    return axios.get(houseStore.storeBuildingInfo, params)
  },

  //获取房屋列表
  getstoreHousePage(params) {
    return axios.get(houseStore.storeHousePage, params)
  },

  // 获取房屋详情
  getHouseInfo(params) {
    return axios.get(houseStore.storeHouseInfo, params)
  },
  //更改房屋权利
  changeHouseRight(params, data) {
    return axios.post(houseStore.storeHouseChange, params, data)
  },
  //预留,冻结，解除
  changeHouseState(params, data) {
    return axios.post(houseStore.storeStateChange, params, data)
  },
  //获取房屋列表
  getStoreHouseList(params) {
    return axios.get(houseStore.storeHouseList, params)
  },
  //产权信息补登
  setHouseRepair(params, data) {
    return axios.post(houseStore.storeHouseRepair, params, data)
  },
  //根据房屋获取当前有效房源的申请人信息
  applicantInfo(params) {
    return axios.get(houseStore.applicantInfo, params)
  },
  //获取用户信息
  getUserName(params) {
    return axios.get(houseStore.getUserName, params)
  },
  //房屋查封
  sealSave(params, data) {
    return axios.post(houseStore.sealSave, params, data)
  },
  //获取字典
  getDictionary(params) {
    return axios.get(houseStore.getDictionary, params)
  },
  //获取该域下的单位
  getListUnit(params) {
    return axios.get(houseStore.getListUnit, params)
  },
  //获取当前小区下的所有栋
  getAllBuilding(params) {
    return axios.get(houseStore.getAllBuilding, params)
  },
  //查询该房屋下所有查封记录
  sealList(params) {
    return axios.get(houseStore.sealList, params)
  },
  getSeal(params) {
    return axios.get(houseStore.getSeal, params)
  },
  //解封
  unsealSave(params, data) {
    return axios.post(houseStore.unsealSave, params, data)
  },
  //判读是否修改房屋的查封状态
  modifyClosed(params, data) {
    return axios.post(houseStore.modifyClosed, params, data)
  },
  //房屋移交中---获取所有的房子
  getAllHouse(params) {
    return axios.get(houseStore.moveList, params)
  },
  //获取所有的小区
  getAllDistrict(params) {
    return axios.get(houseStore.getAllDistrict, params)

  },
  //房屋移交
  storeMove(params, data) {
    return axios.post(houseStore.storeMove, params, data)
  },
  //房屋库记录操作原因和依据接口
  saveReasonAndBasis(params, data) {
    return axios.post(houseStore.saveReasonAndBasis, params, data)
  },
  //产权变更+性质变更-流程审核不通过
  failToPass(params) {
    return axios.get(publicPath.failToPass, params)
  },
  /*------------------------------勘误操作------------------------------------------- */
  //小区信息勘查删除操作
  deleteDistrict(params, data) {
    return axios.post(houseStore.deleteDistrict, params, data)
  },
  //楼栋信息勘查删除操作
  deleteBuilding(params, data) {
    return axios.post(houseStore.deleteBuilding, params, data)
  },
  //房屋信息勘查删除操作
  deleteHouse(params, data) {
    return axios.post(houseStore.deleteHouse, params, data)
  },
  //小区信息堪查修改操作
  updateDistrict(params, data) {
    return axios.post(houseStore.updateDistrict, params, data)
  },
  //楼栋信息勘查修改操作
  updateBuilding(params, data) {
    return axios.post(houseStore.updateBuilding, params, data)
  },
  //房屋信息勘查修改操作
  updateHouse(params, data) {
    return axios.post(houseStore.updateHouse, params, data)
  },
  //配套设备信息修改操作
  updateDevice(params, data) {
    return axios.post(houseStore.updateDevice, params, data)
  },
  //房源信息勘误代办和已办箱的查询
  correctSearch(params, data) {
    return axios.post(houseStore.correctSearch, params, data)
  },
  //开启房源信息勘误的流程
  startProject(params) {
    return axios.get(houseStore.startProject, params)
  },
  //认领任务
  openCache(params) {
    return axios.get(houseStore.openCache, params)
  },
  //删除小区
  deleteComunity(params, data) {
    return axios.post(houseStore.deleteComunity, params, data)
  },
  //获取变更明细
  changeDetail(params) {
    return axios.get(houseStore.changeDetail, params)
  },
  //保存勘误信息
  saveCorrectInfo(params) {
    return axios.get(houseStore.saveCorrectInfo, params)
  },
  //得到当前登录人
  getLoginer(params) {
    return axios.get(houseStore.getLoginer, params)
  },
  //流程提交
  submit(params) {
    return axios.get(houseStore.submit, params)
  },
  //流程回退
  returnBack(params) {
    return axios.get(houseStore.returnBack, params);
  },
  //流程提交不通过
  unsubmit(params) {
    return axios.get(houseStore.unsubmit, params)
  },
  // 获取办理意见列表
  getOpinion(params) {
    return axios.get(houseStore.getOpinion, params)
  },
  // 发送调用保存办理意见
  saveOpinion(params, data) {
    return axios.post(houseStore.saveOpinion, params, data)
  },
  // 获取暂存意见
  getTempOpinion(params) {
    return axios.get(houseStore.getTempOpinion, params)
  },
  // 保存暂存意见
  saveTempOpinion(params, data) {
    return axios.post(houseStore.saveTempOpinion, params, data)
  },
  //获取流程材料
  getProcessMaterials(params) {
    return axios.get(houseStore.getProcessMaterials, params)
  },
  //上传流程材料
  uploadProcessMaterials(params, data) {
    return axios.post(houseStore.uploadProcessMaterials, params, data)
  },
  //获取栋名称
  getBuildingName(params) {
    return axios.get(houseStore.getBuildingName, params)
  },
  //恢复栋
  restoreBuilding(params) {
    return axios.get(houseStore.restoreBuilding, params)
  },
  //恢复房屋
  restorehousing(params) {
    return axios.get(houseStore.restorehousing, params)
  },
  //房源信息勘误-点击查看时栋信息保存
  saveClickBuilding(params) {
    return axios.get(houseStore.saveClickBuilding, params)
  },
  //房源信息勘误-点击查看时房屋信息保存
  saveClickhousing(params) {
    return axios.get(houseStore.saveClickhousing, params)
  },
  //房源信息勘误-保存变更明细
  saveChangeDetail(params, data) {
    return axios.post(houseStore.saveChangeDetail, params, data)
  },
  //房源信息勘误-恢复小区
  restoreDistrict(params) {
    return axios.get(houseStore.restoreDistrict, params)
  },
  //房源信息勘误-统计小区下被使用房屋数量
  userHouseCounts(params) {
    return axios.get(houseStore.userHouseCounts, params)
  },
  //房源信息勘误-删除案件
  delCase(params) {
    return axios.get(houseStore.delCase, params)
  },
  //房源信息勘误 - 查看日志
  getLog(params) {
    return axios.get(houseStore.getLog, params)
  },
  //房源信息勘误-查询小区下装修列表信息
  getRenovationList(params) {
    return axios.get(houseStore.getRenovationList, params)
  },
  //房源信息勘误-获取宗地号信息列表
  getLandList(params) {
    return axios.get(houseStore.getLandList, params)
  },
  //房源信息勘误-获取某个宗地号详细信息
  getLandDetail(params) {
    return axios.get(houseStore.getLandDetail, params)
  },
  //房源信息勘误-修改装修标准说明
  saveDecoration(params, data) {
    return axios.post(houseStore.saveDecoration, params, data)
  },
  //房源信息勘误-宗地号的新增或修改
  saveLandNo(params, data) {
    return axios.post(houseStore.saveLandNo, params, data)
  },
  //房源信息勘误-新增宗地号的删除
  deleteLandNo(params) {
    return axios.get(houseStore.deleteLandNo, params)
  },
  //房源勘误-批量修改房源信息
  editHouseList(params, data) {
    return axios.post(houseStore.editHouseList, params, data)
  },
  //房源信息勘误-导入面积信息
  importArea(params, data) {
    return axios.post(houseStore.importArea, params, data)
  },
  //房源信息勘误-查询导入面积详细信息
  getImportAreaInfo(params) {
    return axios.get(houseStore.getImportAreaInfo, params)
  },
  //房源信息勘误 - 删除导入记录
  deleteDownloadInfo(params, data) {
    return axios.post(houseStore.deleteDownloadInfo, params, data)
  },
  //房源信息勘误-栋信息-导入栋信息
  reportHouseBuildInfo(params, data) {
    return axios.post(houseStore.reportHouseBuildInfo, params, data)
  },
  //房源信息勘误-栋信息-导入详情-列表信息
  getBuildingReInfo(params) {
    return axios.get(houseStore.getBuildingReInfo, params)
  },
  //房源信息勘误-栋信息-导入详情弹框内删除
  deleteBuildingReInfo(params, data) {
    return axios.post(houseStore.deleteBuildingReInfo, params, data)
  },
  //房源信息勘误-房源信息-导入房屋信息
  reportHouseInfo(params, data) {
    return axios.post(houseStore.reportHouseInfo, params, data)
  },
  //房源信息勘误-房源信息-右侧导入详情
  importDetails(params) {
    return axios.get(houseStore.importDetails, params)
  },
  //房源信息勘误-房源信息-右侧导入详情弹框内-删除
  deleteDetails(params, data) {
    return axios.post(houseStore.deleteDetails, params, data)
  },
//通过当前登录用户获取过滤的单位标识清单，合并前端查询的标识
  getAccessableUnitGuid(params){
    return axios.get(houseStore.getAccessableUnitGuid, params)
  },

  //------------房源计划-定向单位房源退回---------
  //定向单位房源退回-待办箱查询
  returnHouseSearch(params, data) {
    return axios.post(houseReturn.returnHouseSearch, params, data)
  },
  //定向单位房源退回-待签约、已退回、已签约查询
  searchList(params, data) {
    return axios.post(houseReturn.searchList, params, data)
  },
  //定向单位房源-待签约-表格退回操作
  housingReturn(params, data) {
    return axios.post(houseReturn.housingReturn, params, data)
  },

  downloadDemolitionTemplate(params){
    return axios.get(demolition.downloadDemolitionTemplate, params)
  },
  importDemolition(params, data) {
    return axios.post(demolition.importDemolition, params, data)
  },
  getDemolitionList(params, data) {
    return axios.post(demolition.getDemolitionList, params, data)
  },

}
