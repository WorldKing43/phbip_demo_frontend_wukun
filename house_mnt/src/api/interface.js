/* 接口方法调用 */
import http from '@/config/axios'
import { url, valuation,location,publicPath } from '@/api/paths'

export default {
  //**公共接口 */
  //得到权限
  getPermission(params) {
    return http.get(houseApproval.getPermission, params);
  },
  //得到权限
  getOpenPermission(params) {
    return http.get(url.getOpenPermission, params);
  },
  //查询字典
  getDictionary(params) {
    return http.get(url.getDictionary, params)
  },
  //获取当前登陆用户信息
  getUserInfo(params) {
    return http.get(url.getUserInfo, params)
  },
  //获取登录人所在单位
  getUnitInfo(params) {
    return http.get(url.getUnitInfo, params)
  },

   //创建mis资源,非流程项目需要创建
   createMis(params) {
    return http.get(url.createMis, params)
  },
   //附件-获取材料
   getMaterial(params) {
    return http.get(url.getMaterial, params)
  },
   //附件-材料上传
   uploadMaterial(params, data, config) {
    return http.post(url.uploadMaterial, params, data, config)
  },
  //附件-材料下载
  downLoadMaterial(params) {
    return http.get(url.downLoadMaterial, params)
  },
  //附件-材料删除
  deleteMaterial(params, data) {
    return http.post(url.deleteMaterial, params, data)
  },
  //获取流程信息
  getProcessInfo(params) {
    return http.get(publicPath.getProcessInfo, params)
  },


  //**基准价管理*/
  //查询小区信息-基准价管理、计价系数管理查询所有小区
  getDistrictList(params) {
    return http.get(valuation.getDistrictList, params);
  },
  //管理基准价-查询小区信息
  getDistrictInfo(params) {
    return http.get(valuation.getDistrictInfo, params)
  },
  //管理基准价-栋名称下拉框数据
  getBuildingList(params) {
    return http.get(valuation.getBuildingList, params)
  },
  //管理基准价-栋号、房号基准价查询
  searchBasePricing(params) {
    return http.get(valuation.searchBasePricing, params)
  },
  //管理基准价-弹框内栋名称下拉框数据查询
  baseSearchBuilding(params) {
    return http.get(valuation.baseSearchBuilding, params)
  },
  //管理基准价-查看历史评估价
  historyPrice(params) {
    return http.get(valuation.historyPrice, params)
  },
  //管理基准价-维护基准价（栋和房公用）
  preserveBasePricing(params, data) {
    return http.post(valuation.preserveBasePricing, params, data)
  },
  //管理基准价-维护基准价-查询房号
  getHouseNoList(params) {
    return http.get(valuation.getHouseNoList, params)
  },
  //管理基准价-基准价-查询房号
  getBaseHouseNoList(params) {
    return http.get(valuation.getBaseHouseNoList, params)
  },
  


  //**计价系数管理*/
  //朝向系数
  //管理计价系数-朝向系数-栋名称下拉数据查询
  getTowardBuilding(params) {
    return http.get(valuation.getTowardBuilding, params)
  },
  //管理计价系数-查看系统缺省值
  getDefaultValue(params) {
    return http.get(valuation.getDefaultValue, params)
  },
  //管理计价系数-栋信息
  getBuildingInfo(params) {
    return http.get(valuation.getBuildingInfo, params)
  },
  //管理计价系数-朝向系数-查询
  searchAllToward(params) {
    return http.get(valuation.searchAllToward, params)
  },
  //管理计价系数-维护朝向系数按钮-查询
  searchorientation(params) {
    return http.get(valuation.searchorientation, params)
  },
  //管理计价系数-维护朝向系数弹框-确定
  changBuildingToward(params, data) {
    return http.post(valuation.changBuildingToward, params, data)
  },
  //管理计价系数-编辑-查询单个栋朝向信息
  singleBuildingSearch(params) {
    return http.get(valuation.singleBuildingSearch, params)
  },
  //管理计价系数-编辑弹框-确定按钮
  singleBuildingEdit(params, data) {
    return http.post(valuation.singleBuildingEdit, params, data)
  },
  //楼层系数
  //楼层系数-根据栋名称查询表格数据
  getFloorBuilding(params) {
    return http.get(valuation.getFloorBuilding, params)
  },
  searchFloor(params) {
    return http.get(valuation.searchFloor, params)
  },
  //维护楼层系数(调整缺省值)-查询表格数据
  searchFloorCoe(params) {
    return http.get(valuation.searchFloorCoe, params)
  },
  //查看系统缺省值
  getSystemValue(params) {
    return http.get(valuation.getSystemValue, params)
  },
  //维护楼层系数（调整缺省值）- 确定按钮
  changeFloorCoe(params, data) {
    return http.post(valuation.changeFloorCoe, params, data)
  },
  //楼层系数- 编辑按钮
  singleFloorEdit(params) {
    return http.get(valuation.singleFloorEdit, params)
  },
  //楼层系数-编辑弹框-确定按钮
  singleFloorSure(params, data) {
    return http.post(valuation.singleFloorSure, params, data)
  },
  //维护楼层系数(生成)-查询
  generateSearch(params) {
    return http.get(valuation.generateSearch, params)
  },
  //维护楼层系数(生成)弹框-确定按钮
  confirmGenerate(params, data) {
    return http.post(valuation.confirmGenerate, params, data)
  },



  //**计价公示管理 */
  //查询公式列表
  searchFormulaList(params) {
    return http.get(valuation.searchFormulaList, params)
  },
  //删除某条公式
  deleteFormula(params) {
    return http.get(valuation.deleteFormula, params)
  },
  //保存计价公式
  saveFormula(params, data) {
    return http.post(valuation.saveFormula, params, data)
  },
  //计价公式-查询公式信息
  getFormulaInfo(params) {
    return http.get(valuation.getFormulaInfo, params)
  },
  //计价公式-查询计价公式步骤列表
  getFormulaList(params) {
    return http.get(valuation.getFormulaList, params)
  },
  //计价公式-计价公式步骤保存
  saveFormulaSteps(params, data) {
    return http.post(valuation.saveFormulaSteps, params, data)
  },
  //计价公式-计价公式步骤信息的删除
  deleteFormulaStep(params) {
    return http.get(valuation.deleteFormulaStep, params)
  },
  //计价公式-编辑计价步骤信息
  editStep(params) {
    return http.get(valuation.editStep, params)
  },
  


  //**业务计价模型 */
  //查询计价模型列表
  searchModelList(params) {
    return http.get(valuation.searchModelList, params)
  },
  //新增计价模型-保存
  modelSave(params, data) {
    return http.post(valuation.modelSave, params, data)
  },
  //新增弹框-计价公式名称-下拉框
  getModelList(params) {
    return http.get(valuation.getModelList, params)
  },
  //新增弹框-小区名称-下拉框
  searchDistrict(params) {
    return http.get(valuation.searchDistrict, params)
  },
  //新增弹框-栋名称-下拉框
  getModelBuilding(params) {
    return http.get(valuation.getModelBuilding, params)
  },
  //新增弹框-房号-下拉框
  getModelHouseNo(params) {
    return http.get(valuation.getModelHouseNo, params)
  },
  //新增弹框-房源计划-下拉框
  getHousePlanList(params) {
    return http.get(valuation.getHousePlanList, params)
  },
  //编辑-详情页查询计价模型信息
  getModelInfo(params) {
    return http.get(valuation.getModelInfo, params)
  },


  /**房屋价格管理*/
  //房屋价格管理-列表查询
  getPriceList(params, data) {
    return http.post(valuation.getPriceList, params, data)
  },
 //房屋价格管理-导入价格
  importPrice(params, data) {
    return http.post(valuation.importPrice, params, data)
  },
  //查询某条详情信息导入记录
  importLog(params) {
    return http.get(valuation.importLog, params)
  },
  //查询某条导入记录详情
  importLogInfo(params) {
    return http.get(valuation.importLogInfo, params)
  },


  /**房屋坐落变更*/
  //房屋坐落变更-待办箱/已办箱列表查询
  getLocationList(params, data) {
    return http.post(location.getLocationList, params, data)
  },
  //房屋坐落变更-生成批次编号
  createBatchCode(params) {
    return http.get(location.createBatchCode, params)
  },
  //房屋坐落变更-批次信息获取(房屋+栋+小区+变更记录)
  getLocationInfo(params) {
    return http.get(location.getLocationInfo, params)
  },
  //房屋坐落变更-只有房改属性的房信息列表
  getFgHouseList(params, data) {
    return http.post(location.getFgHouseList, params, data)
  },
  //房屋坐落变更-选择要变更的房屋
  addLocatedHouse(params, data) {
    return http.post(location.addLocatedHouse, params, data)
  },
  //房屋坐落变更-删除要变更的房屋
  deleteHouseLocated(params) {
    return http.get(location.deleteHouseLocated, params)
  },
  //房屋坐落变更-保存
  saveLocationChange(params, data) {
    return http.post(location.saveLocationChange, params, data)
  },
  //房屋坐落变更-选择要变更后的小区
  addLocatedDistrict(params) {
    return http.get(location.addLocatedDistrict, params)
  },
  //房屋坐落变更-获取原有栋列表
  originalBuildList(params) {
    return http.get(location.originalBuildList, params)
  },
  //房屋坐落变更-选择要变更后的栋
  addLocatedBuild(params) {
    return http.get(location.addLocatedBuild, params)
  },
  //房屋坐落变更-若无小区则新增小区
  addNewDistrict(params, data) {
    return http.post(location.addNewDistrict, params, data)
  },
  //房屋坐落变更-若无栋则新增栋
  addNewBuilding(params, data) {
    return http.post(location.addNewBuilding, params, data)
  },
  //房屋坐落变更-删除要变更的房屋
  deleteHouseLocated(params) {
    return http.get(location.deleteHouseLocated, params)
  },
  //房屋坐落变更-查看/删除/编辑小区信息
  getLocatedDistrict(params, data) {
    return http.post(location.getLocatedDistrict, params, data)
  },
  //房屋坐落变更-查看/删除/编辑栋信息
  getLocatedBuild(params, data) {
    return http.post(location.getLocatedBuild, params, data)
  },
  //房屋坐落变更-流程提交
  submitProcess(params) {
    return http.get(location.submitProcess, params)
  },
  //房屋坐落变更-流程回退
  backProcess(params) {
    return http.get(location.backProcess, params)
  },
  //房屋坐落变更-流程不通过
  noPassProcess(params) {
    return http.get(location.noPassProcess, params)
  },
  //房屋坐落变更-删除案件
  deleteLocatedProcess(params) {
    return http.get(location.deleteLocatedProcess, params)
  },
}
