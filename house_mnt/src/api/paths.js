/* 此处添加api接口 */
export const publicPath = {
  getMisId: 'batch/Material_misId/generate', //材料附件-创建mis资源Id
  getMaterial: 'common/resource/get', //材料附件-获取材料
  getHouseMaterial: '/house_selection/Material_misId', //材料附件-获取选房材料
  uploadMaterial: 'common/material/upload', //材料附件-材料上传
  downLoadMaterial: 'common/material/download', //材料附件-材料下载
  deleteMaterial: 'common/material/delete', //材料附件-材料删除
  createMis: '/common/mis/create', //创建mis资源,非流程项目需要创建
  createMisFlow: 'common/process/material', //获取流程材料-流程通用
  findMisGuid: 'signing/misId/get', //查询是否存在misguid
  getProcessInfo: '/house/store/process/info/get', //获取流程信息
  getMaterialApproval: '/house/storage/approval/material_info/get', //房源入库审批-获取材料资源
  getOpinion: "/common/opinion/get", //获取办理意见列表(房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  saveOpinion: "/common/opinion/save", //保存调用保存办理意见
  getTempOpinion: "/common/opinion/temp/get", //获取暂存意见
  saveTempOpinion: "/common/opinion/temp/save", //保存暂存意见
  getCommunityList: '/community/info/list', //根据小区名称或编号模糊查询小区信息
  getPropertyChangeInfo: '/house/store/property/change/log/info', //房源管理-获取房屋产权变更记录(房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getNatureChangeInfo: '/house/store/nature/change/log/info', //房源管理-获取房屋性质变更记录(房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getHistoryInfo: '/house/store/right/change/log/info', //房源管理-获取使用权变更记录(房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getPropertyRightChangeInfo: '/house/store/property_info/get', //产权变更-产权变更申请批次信息查询(产权变更、房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getNatureChangeDetailInfo: '/house/store/nature_info/get', //性质变更-性质变更申请批次信息查询(性质变更、房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getPropertyUnit: '/construction_raising/property/unit/get', //产权变更-获取所有产权单位标识和名称(房改房共用)
  getRentInfo: '/house/store/rent/info/get', //房源管理-获取房屋出租情况(房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getSignInfo: '/house/store/sign/info/get', //房源管理-获取房屋签约情况(房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getBatchInfo: '/house/store/batch/info/get', //房源管理-获取分配批次信息(房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getHousePlan: '/house/plan/get', //获取房源计划详情信息(房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getBatchApply: '/house/plan/supply/get', //获取房源计划里面的供应信息(房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getReleasedHouseInfo: '/house/info/released/page', //分页查询房源计划中已下达的房源信息(房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getUnit: '/house/store/property/unit/get', //产权变更-获取所有产权单位标识和名称(产权变更、房源房屋库、房屋综合查询、可分配房源查询、全市房屋综合查询共用)
  getDictionary: '/house/plan/dictionary', //根据字典名称查询(性质变更、产权变更)
  failToPass: '/house/store/change/process/fail', //产权变更+性质变更-流程审核不通过
  propertyList: '/house/store/property/unit/addnull/get', //房源管理-产权归属下拉数据（增加了“空”选项）
  propertyUnitList: '/house/store/property/unit/list/get', //房源管理-局建房产权归属下拉数据（增加了“空”选项）
  allocationUnitList: '/house/store/allocation/unit/list/get', //房源管理-局建房产权归属下拉数据（增加了“空”选项）
  signUpRightList: '/house/store/signatoryRight/info/get', //房源管理-签约权下拉数据（增加了“空”选项）
  divisionList: '/house/store/allocationRight/info/get', //房源管理-签约权下拉数据（增加了“空”选项）
  getHouseErrataList: '/house/store/errata/list/get',//房屋综合查询(市局)-查询房屋勘误信息
  getHouseErrataDetialInfo: '/house/store/errata/detial/info/get',//房屋综合查询(市局)-查询房屋勘误详细信息
  getHouseExportDetialInfo: '/house/store/export/detial/info/get',//房屋综合查询(市局)-查询房屋勘误导入详细信息
  getRealPropertyList: "/house/store/realropertyList/get",//获取当前小区所有不动产证书材料
  modifyHouseInspect:"/house/inspect",//修改核查状态，并记录路修改日志

}

export const url = {
  palnInit: '/house/plan/init', //初始化（新增）房源计划
  planModify: '/house/plan/save', //修改房源计划
  planProperty: '/house/plan/property', //根据计划用途级联筛选计划属性
  planBatches: '/house/plan/batches', //根据供应计划号获取批次信息
  planSelectQueue: '/house/plan/select/queues', //获取该计划选择的队
  planSelectGroup: '/house/plan/select/groups', //获取该计划选择的组
  housePlanPage: '/house/plan/page', //分页查询房源计划
  housePlanGroups: '/house/plan/groups', //根据批次代码获取组信息
  housePlanQueues: '/house/plan/queues', //根据批次代码获取队信息
  unitInfoList: '/unit/info/list', //根据小区查询楼栋号
  getHousePlan: '/house/plan/get', //获取房源计划详情信息
  housePlanSubmit: '/house/plan/submit', //提交/回退房源计划至下一个阶段
  housePlanOpinion: '/common/opinion/get', //获取当前计划的审核意见
  houseInfoAddOrRemove: '/house/info/addandremove', //从房源计划中添加或移除房源
  houseInfoWaitingRemove: '/house/info/waiting/remove', //从待选房列表中移除房源
  houseInfoStockList: '/house/plan/associate', //查询房源库并添加进待选房列表
  houseInfoWaitingPage: '/house/info/waiting/page', //分页查询房源计划中待选房信息
  houseInfoSelectedPage: '/house/info/selected/page', //分页查询房源计划中选中房信息
  houseInfoReleasedPage: '/house/info/released/page', //分页查询房源计划中已下达的房源信息
  houseStateStatistics: '/house/info/state/statistics', //获取未下达计划中关联的房屋状态统计
  houseAreaStatistics: '/house/info/area/statistics', //获取未下达计划中关联的房屋状态统计
  houseTypeStatistics: '/house/info/type/statistics', //获取未下达计划中关联的房屋状态统计
  houseSignStatistics: '/house/signatoryRight/house_info', //获取未下达计划中关联的归属权的统计

  managedStateStatistics: '/managed/info/state/statistics', //获取已下达计划中关联的房源状态统计
  managedAreaStatistics: '/managed/info/area/statistics', //获取已下达计划中关联的房源状态统计
  managedTypeStatistics: '/managed/info/type/statistics', //获取已下达计划中关联的房源状态统计
  managedSignStatistics: '/house/signatoryRight/manage_info', //获取已下达计划中关联的归属权的统计

  //houseInfoWaitingPage: '/house/info/waiting/page', //分页查询待选房列表

  returnHousing: '/house/info/return', //退回至房源计划
  recyclingRoom: '/house/info/recovery/list', //回收至房源库的房源查询
  recyclingHome: '/house/info/recovery', //回收至房源库
  housePlanStateCount: '/house/plan/statecount', //根据计划状态分组获取计划的条数
  filedList: '/dic/filed/list', //根据字段名称查询字典表
  planDelete: '/house/plan/delete', //逻辑删除房源计划
  planDictionary: '/house/plan/dictionary', //根据字典名称查询
  processTodo: '/house/plan/process/todo', //查询列表待办
  processDone: '/house/plan/process/done', //查询列表已办
  processRelease: '/house/plan/process/release', //查询列表已下达
  processInit: '/house/plan/process/init', //流程初始化房源计划
  processCoach: '/house/plan/process/coach', //后台打开
  processSubmit: '/house/plan/process/submit', //发送环节
  processReturn: '/house/plan/process/return', //回退环节
  planLog: '/house/plan/log', //查询房源计划业务日志
  planExistedSelected: '/house/plan/selected/whether', //判断该房源计划是否已添加房源
  allHousePlan: '/house/plan/all', //房源计划-计划查询所有的房源计划
  getBatchApply: '/house/plan/supply/get', //获取房源计划里面的供应信息
  getJudge: '/house/info/waiting/judge/get', //房源计划添加房源-判断是否存在问题房源
  //////////////////////////////
  returnedHousingQuery: '/house/info/return/list', //退回至房源计划的房源查询
  getLog: '/house/plan/log', //查询房源计划业务日志
  getSignatoryRightCount: '/house/plan/signatoryRight/count', //房源计划-批次下达时判断计划下是否存在签约权为空的房屋
  exportsignatoryRight: '/house/plan/signatoryRight/export', //房源计划-导出计划下签约权为空的房屋
  processFail: '/house/plan/process/Fail', //房源计划-流程审核不通过
  getSignatoryRight: '/house/store/signatoryRight/info/get', //房源计划待选房列表获取签约权下拉字典

  //**计价管理模块公共接口
  getOpenPermission: '/property/value', //得到打开权限的开关
  getDictionary: '/common/dic/get', //根据字典名称查询
  getUserInfo: '/currentUserInfo', //获取当前登陆用户信息
  getUnitInfo: 'valuation/formula/org', //获取登录人所在单位
  createMis: '/common/mis/create', //创建mis资源,非流程项目需要创建
  getMaterial: 'common/resource/get', //附件-获取材料
  uploadMaterial: 'common/material/upload', //附件-材料上传
  downLoadMaterial: 'common/material/download', //附件-材料下载
  deleteMaterial: 'common/material/delete', //附件-材料删除
}

//房改房录入
export const roomChangeRoomInput = {
  getBatchCode: '/house/reform/batchCode/generate', //房改房录入-生成批次编号
  getUnit: '/house/reform/unit/guid/get', //房改房录入-获取当前登陆人所属单位标识
  getDistrictCode: '/construction_raising/house_district_code/get', //小区号生成获取
  getDictionary: '/house/plan/dictionary', //根据字典名称查询
  addDistrict: '/house/reform/district/info/add', //房改房录入-新增小区信息
  getDistrictName: '/house/reform/district/name/get', //房改房录入-获取小区名称
  getInfo: '/house/reform/one/info/get', //房改房录入-获取某条记录的详细信息
  getDistrictList: '/house/reform/district/list/get', //房改房录入-原有小区录入信息查询
  getHouseDistricAndPretList: '/house/reform/districtAndPre/list/get', //房改房录入-原有小区和新增小区录入信息查询
  addOriginalDistrict: '/house/reform/district/original/info/add', //房改房录入-原有小区录入新增
  operateDistrict: '/house/reform/district/info/get', //房改房录入-查看/删除/编辑某个小区详情信息
  addBuild: '/house/reform/build/info/add', //房改房录入-新增栋信息
  getBuildList: '/house/reform/build/list/get', //房改房录入-获取小区下栋列表信息
  addOriginalBuild: '/house/reform/build/original/info/add', //房改房录入-原有小区栋新增
  operateBuild: '/house/reform/build/info/get', //房改房录入-查看/删除/编辑某个栋详情信息
  getBuildName: '/house/reform/build/name/get', //房改房录入-获取栋名称下拉值
  addHouse: '/house/reform/info/add', //房改房录入-新增房屋信息
  operateHouse: '/house/reform/info/get', //房改房录入-查看/删除/编辑某个房屋详情信息
  addInfo: '/house/reform/house_info/add', //房改房录入-保存
  submit: '/house/reform/process/submit', //房改房录入-流程下达
  returnTask: '/house/reform/process/return-task', //房改房录入-流程回退
  unsubmit: '/house/reform/process/unsubmit', //房改房录入-流程不通过
  getSearchList: '/house/reform/approval/searchList', //房改房录入-待办箱/已办箱列表查看
  openCache: '/common/process/openCoach', //后台打开表单--认领任务
  processDelete: '/house/reform/process/delete' //房改房录入-案件删除
}

//房源入库审批
export const houseApproval = {
  ListReportPrepare: 'house_report/report/list/searchContent', //上报审批查询
  ListReport: '/house/storage/approval/searchList', //入库审批-查询待办已办
  QueryReport: '/house/storage/approval/info/get', //查询某个报批基本信息
  ListbuildingPrepare: '/house_report/building/list/getHouseType', //查询栋信息准备
  ListHousePrepare: '/house_report/house/list/getContntValue', //按条件查询房源信息准备
  QuerySupportDevice: '/house_report/house/querySupportDevice', //查询某个房源的设备信息
  HouseReportCommit: '/house_report/commit', //审批提交
  getListUnit: '/house/unit/list', //获取该域下的单位
  getPermission: '/funcation/available', //得到相关权限
  getOpenPermission: '/property/value', //得到打开权限的开关
  getPickUpList: '/house/store/unrevieve', //入库审批-获取接件列表
  getPickUpData: '/house/store/recieve', //入库审批-接件操作
  saveApprovalInfo: '/house/storage/approval/info/add', //入库审批-保存批次报批基本信息
  submitApprovalProcess: '/house/storage/approval/process/submit', //入库审批-流程提交
  getActivityNames: '/house/storage/approval/activity_name/get', //入库审批-获取环节名称
  getDistrictInfo: '/house_report/district/query', //入库审批-查询小区信息
  getBuildingInfo: '/house_report/building/list', //入库审批-查询栋信息
  getBuildingDetails: 'house_report/building/queryBuilding', //入库审批-查询栋详情
  getHouseInfo: '/house_report/house/list', //入库审批-查询房信息
  getHouseDetails: '/house_report/house/queryHouse', //入库审批-查询房源详情
  processRetrun: '/house/storage/approval/rreturn-task', //入库审批-流程回退
  getCouldReturn: '/common/process/return-activities', //入库审批-获取可回退环节
  supportingFacility: '/house/storage/approval/querySupportDevice/list', //入库审批-获取配套设施列表
  supportingdetails: '/house/storage/approval/supportDevice/get', //入库审批-获取配套设施详细信息
  exportFile: '/house/storage/approval/export', //房源入库审批-导出
  editdistrictInfo: '/house/storage/approval/district/edit', //房源入库审批-修改小区信息
  editBuilding: '/house/storage/approval/building/edit', //房源入库审批-修改栋信息
  editSupportDevice: '/house/storage/approval/SupportDevice/edit', //房源入库审批-修改配套设施信息
  edithouse: '/house/storage/approval/house/edit', //'房源入库审批-修改房屋信息
  importFile: '/house/storage/approval/house/report', //房源入库审批-导入
  bulkEdithouse: '/house/storage/approval/house_list/edit', //房源入库审批-批量修改房屋信息
  getCode: '/house/storage/approval/code/get', //入库申请-获取小区编号
  addland: '/house/storage/approval/land/add', //入库审批-新增宗地号信息
  getLandList: '/house/storage/approval/land/list', //查询宗地列表
  getLandDetail: '/house/storage/approval/land/edit', //入库审批-编辑/删除宗地号信息
  editLand: '/house/storage/approval/land/edit', //入库审批-编辑/删除宗地号信息
  addRenovation: '/house/storage/approval/renovation/add', //入库审批-装修标准新增
  getRenovationList: '/house/storage/approval/renovation/list', //入库审批-查询小区下装修列表信息
  getAllLand: '/house/storage/approval/land/get', //获取所有的宗地号
  editRenovation: '/house/storage/approval/renovation/edit', //入库审批-装修标准删除/修改
  getDistrictRenovationList: '/house/storage/approval/districtRenovation/lit', //入库审批-获取小区装修标准信息
}

//房源房屋库
export const house = {
  getMaterial: 'common/resource/get', //材料附件-获取材料
  createMis: '/common/mis/create', //创建mis资源,非流程项目需要创建
  storeDistrictGet: '/house/store/district/get', //获取小区信息
  storeBuildingInfo: '/house/store/building/get', //获取楼栋信息
  storeHouseInfo: '/house/store/house/get', //获取房屋信息
  storeBuildingPage: '/house/store/building/page', //分页查询楼栋列表
  storeHousePage: '/house/store/house/page', //分页查询房屋列表
  storeDistrictPage: '/house/store/district/page', //分页查询小区信息
  countinueSeal: '/house/store/renewal/save', //房源房屋库-续封
  getCountinueSealInfo: '/house/store/seal/get', //获取选中的查封详情
  getSupportDevice: '/house/store/querySupportDevice/list', //得到配套设施列表
  getSupportDeviceInfo: '/house/store/querySupportDevice/info', //得到配套设施详情
  getOccupancy: '/house/checkIn/occupancy', //家庭/单位、承租/购房/房改情况
  getLog: "/house/store/log/info/get", //房源房屋库-查看房屋操作日志
  getRenovationList: '/house/store/district/renovation/get', //房源房屋库-查询小区下装修列表信息
  getLandList: '/house/store/district/land/get', //房源房屋库-查询宗地列表
  getLandDetail: '/house/store/district/land_info/get', //房源房屋库-获取某个宗地号详细信息
  getGenerateGuid: '/house/store/situational/guid/generate', //房源房屋库-生成材料的guid
  getSituationalList: '/house/store/situational/list/get', //问题房源标注-获取房源标记信息
  removeSituationalInfo: '/house/store/situational/info/remove', //问题房源标注-解除房源标记信息
  getSituationalInfo: '/house/store/situational/info/get', //问题房源标注-获取某条详细房源标注信息
  getUserRightChooseAll: '/house/store/right/change/isChooseAll', //房源房屋库-使用权变更全选
  addMaterialDir: '/house/store/material_dir/add', //房源房屋库-过程材料-添加文件夹
  saveMaintain: '/house/store/district/maintain/change', //房屋库-修改小区的数据维护权
  saveBuildMaintain: '/house/store/build/maintain/change', //"房屋库-栋信息数据维护权修改
  getAllBuildList: '/house/store/build/list/get', //房屋库-栋信息数据维护权全选
  getCityHouseInfo: '/house/store/comprehensive/house/info/get', //房屋综合查询(市局)-查询房屋信息
  getPropertyIsFgList: '/house/property/fg/list',
  changeHouseOwnerShip: '/house/property/fg/ownership/change',
  getRecordUnit: '/enterprise/record/unit/get',
  getRecordRzr: '/enterprise/record/rzr/get',
  getFamilyInfo: '/enterprise/record/family/get',
  getZdDistrictList: '/district/list',
  getZdBuildtList: '/build/list',
  getZdHouseList : '/house/list'
}

//房源勘误
export const houseStore = {
  storeDistrictPage: '/house/store/district/list/get', //房源信息勘误-分页查询小区列表
  storeDistrictGet: '/house/store/house_district/get', //房源信息勘误-获取小区信息
  storeBuildingPage: '/house/store/house_buliding/list/get', //房源信息勘误-分页查询楼栋列表
  storeBuildingInfo: '/house/store/house_buliding/get', //房源信息勘误-获取楼栋信息
  storeHousePage: '/house/store/house_info/list/get', //房源信息勘误-查询房屋信息列表
  storeHouseInfo: '/house/store/house_info/get', //获取房屋信息
  storeHouseChange: '/house/store/house/change', //房屋信息的变更操作(产权变更:[property]、权利变更:[allocation、signatory、operational]、性质变更:[nature]、出库:[outStock])
  storeStateChange: '/house/store/house/state/change', //变更房屋信息列表(预留/解除预留:busy[true/预留、false/解除预留]、冻结/解冻:locked[true/冻结、false/解冻]、问题房屋:situational/true)
  storeHouseList: '/house/store/house/list', //获取房屋信息列表(产权变更、使用权变更、性质变更、出库、预留/解除预留:busy、冻结/解冻:locked、查封/解封:closed、问题房屋标记:situational/false)
  storeHouseRepair: '/house/store/house/repair', //产权信息补登
  applicantInfo: '/house/store/applicant/info', //根据房屋获取当前有效房源的申请人信息
  sealSave: '/house/store/seal/save', //房屋查封
  getUserName: '/currentLicenseCardInfo', //获取当前登陆用户的身份信息
  getDictionary: '/house/plan/dictionary', //根据字典名称查询
  getListUnit: '/house/unit/list', //获取该域下的单位
  getAllBuilding: '/house/store/building/all', //根据小区获取所有的楼栋
  sealList: '/house/store/seal/list', //查询该房屋下所有查封记录
  getSeal: '/house/store/seal/get', //获取选中的查封详情
  unsealSave: '/house/store/unseal/save', //房屋解封
  modifyClosed: '/house/store/modify/closed', //判读是否修改房屋的查封状态
  moveList: '/house/store/move/list', //房屋移交中获取房屋信息
  getAllDistrict: '/house/store/district/all', //获取所有的小区
  storeMove: '/house/store/move', //房屋移交的操作
  saveReasonAndBasis: 'house/store/reasonAndBasis/save', //房屋库记录操作原因和依据接口
  updateDevice: 'house/store/device/update', //配套设备信息修改操作
  updateDistrict: '/house/store/house_district/add', //小区信息堪查修改操作
  updateBuilding: '/house/store/house_bulid/add', //楼栋信息勘查修改操作
  updateHouse: '/house/store/house_info/add', //房屋信息勘查修改操作
  deleteDistrict: 'house/store/district/delete', //小区信息勘查删除操作
  deleteBuilding: '/house/store/house_buliding/delete', //楼栋信息勘查删除操作
  deleteHouse: '/house/store/house_info/delete', //房屋信息勘查删除操作
  correctSearch: '/house/store/search_district_list', //房源信息勘误-待办箱已办列表查询
  startProject: '/house/store/create_district', //开启流程
  openCache: '/common/process/openCoach', //后台打开表单--认领任务
  deleteComunity: '/house/store/house_district/delete', //删除小区
  changeDetail: '/house/store/change_detail/get', //获取变更明细
  saveChangeDetail: '/house/store/change_detail/add', //保存变更明细
  saveCorrectInfo: '/house/store/errata_application/add', //保存勘误申请信息
  getLoginer: '/currentLicenseCardInfo', //得到当前登录人
  submit: '/house/store/process/submit', //流程提交
  unsubmit: '/house/store/process/unsubmit', //流程提交不通过
  returnBack: '/house/store/process/reback', //流程回退
  getOpinion: "/common/opinion/get", //获取办理意见列表
  saveOpinion: "/common/opinion/save", //保存调用保存办理意见
  getTempOpinion: "/common/opinion/temp/get", //获取暂存意见
  saveTempOpinion: "/common/opinion/temp/save", //保存暂存意见
  getProcessMaterials: '/common/process/material', //获取流程材料
  uploadProcessMaterials: '/house/store/material/upload', //上传流程材料--只能用在房源信息勘误
  downloadProcessMaterials: '/common/material/download', //下载流程材料
  getBuildingName: '/house/store/bulid_name/get', //房源信息勘误-获取小区下栋名称'
  restoreDistrict: '/house/store/house_district/restore', //房源信息勘误-恢复小区
  restoreBuilding: 'house/store/house_buliding/restore', //房源信息勘误-恢复栋
  restorehousing: 'house/store/house_info/restore', //房源信息勘误-恢复房屋
  saveClickhousing: '/house/store/house_infoing/add', //房源信息勘误-点击查看时房屋信息保存
  saveClickBuilding: '/house/store/house_buliding/add', //房源信息勘误-点击查看时栋信息保存
  userHouseCounts: '/house/store/used_house/count', //房源信息勘误-统计小区下被使用房屋数量
  delCase: '/house/store/process/delete', //房源信息勘误-删除案件
  getLog: '/house/store/log/get', //查看日志
  getRenovationList: '/house/store/decoration/errata/get', //房源勘误-查询小区下装修列表信息
  getLandList: '/house/store/landNo/errata/get', //房源勘误-查询宗地列表
  getLandDetail: '/house/store/landNo/errata/info/get', //房源勘误-获取某个宗地号详细信息
  saveDecoration: '/house/store/decoration/errata/save', //房源信息勘误-修改装修标准说明
  saveLandNo: '/house/store/landNo/errata/save', //房源信息勘误-宗地号的新增或修改
  deleteLandNo: '/house/store/landNo/errata/delete', //房源信息勘误-新增宗地号的删除"
  editHouseList: '/house/storage/errata/house_list/edit', //房源勘误-批量修改房源信息
  downloadTemplate: '/house/store/house/download', //房源信息勘误-下载导入模板
  importArea: '/house/store/house/area/report', //房源信息勘误-导入面积信息
  getImportAreaInfo: '/house/store/house/area/report/info/get', //房源信息勘误-查询导入面积详细信息"
  deleteDownloadInfo: '/house/store/house/area/report/info/delete', //房源信息勘误 - 删除导入记录
  reportHouseBuildInfo: '/house/store/house/build/report', //房源信息勘误-栋信息-导入栋信息
  getBuildingReInfo: '/house/store/house/build/report/info/get',//房源信息勘误-栋信息-导入详情
  deleteBuildingReInfo: '/house/store/house/build/report/info/delete', //房源信息勘误-栋信息-导入详情弹框内删除
  reportHouseInfo: '/house/store/errata/info/export', //房源信息勘误-房源信息-导入房屋信息
  importDetails: '/house/store/house/report/info/get', //房源信息勘误-房源信息-右侧导入详情
  deleteDetails: '/house/store/house/report/info/delete', //房源信息勘误-房源信息-右侧导入详情弹框内-删除
  getAccessableUnitGuid: '/house/store/user/unit/info/get',//通过当前登录用户获取过滤的单位标识清单，合并前端查询的标识
}

//查询
export const inquery = {
  storeHousePage: '/house/store/house/page', //分页查询房屋列表
  exportHouseInfo: '/house/store/house_info/export', // 房屋列表导出
  exportProposedDistributionHouse: '/house/store/proposed/distribution/export', //房屋综合查询-导出定向房屋拟定分配信息
  exportHouseBatchInfo: '/house/store/house/batch/export', //房屋综合查询-导出有批次信息房屋
  exportCityBureauComprehensiveHouseInfo: '/house/store/city/bureau/comprehensive/export',
  exportThirdPartyOperationHouseInfo:'/house/store/thirdPartyOperation/list/export',//房屋综合查询第三方运营-导出
  /**局建房查询接口 */
  bureaubuildingHouse: 'house/store/bureau/construction/list/get', //局建房列表查询
  changeHouseRemark: '/house/store/remark/change', //修改房屋备注
  exportBureauHouse: '/house/store/bureau/construction/list/export', //局建房导出按钮
  getSignedContract: 'house/store/check_out_house/contract/signed', //局建房查询-售房查询-列表信息
  getCurrentOwner: '/house/store//house_owner/current',//局建房查询-售房查询-获取当前权利人
  getOldBuyer: '/house/store//house_owner/oldBuyer', //局建房查询-售房查询-获取原购房人信息
  getHistoryOwner: '/house/store//house_owner/history', //局建房查询-售房查询-查询历史权利人
  getContractInfo: '/house/store//contract/info/get', //局建房查询-售房查询-查询购买情况信息
  /**局建房查询(全市) */
  getCityHouseList: '/house/store/comprehensive/house/info/list',//局建房查询(全市)-列表查询
  /*房屋综合查询（第三方运营）*/
  getThirdPartyOperationHouseList:'/enterprise/thirdPartyOperation/house/list',//房屋综合查询（第三方运营）查询-列表查询
}

//真空房
export const vacuumRoominquire = {
  getVacuumRoomList: '/house/store/vacuum/list/get', //查询真空房列表信息
  getVacuumRoomDilogList: '/house/store/vacuum/list_info/get', //查询真空房列表信息弹框
  export: '/house/store/vacuum/list/export', //导出市局房屋/真空房信息
  saveVacuumTag: '/house/store/vacuum/list/tag' //真空房标记
}

//全市房屋综合查询
export const cityWideInquireHouse = {
  getCityWideHouse: '/house/store/citywide/comprehensive/list/get', //房源管理-全市房屋综合查询列表
  exportCityWideHouse: '/house/store/citywide/comprehensive/list/export', // 房源管理-全市房屋综合查询列表
  getEnterpriseHouseList:'/enterprise/record/house/list',
  changeEnterpriseHouses: '/enterprise/record/houses/change', //房源管理-自有企业住房移交模式变更
}

//性质变更
export const natureChange = {
  natureChangeTodoSearch: '/house/store/search_nature_List', //性质变更代办和已办查询
  saveChangeInfo: '/house/store/nature/change', //性质变更-变更申请信息保存
  getHouseNature: '/house/store/house_nature/list', //得到房屋性质
  getHouseState: '/house/store/house_state/list', //得到房屋状态
  getHouseType: '/house/store/house_type/list', //得到房屋户型
  submit: '/house/store/nature_process/submit', //提交下一环节
  returnBack: '/house/store/nature_process/reback', //流程回退
  getSelectHouse: '/house/choose/nature_info/get', //性质变更-查询已选中房屋信息
  removeSelectHouse: '/house/choose/nature_info/remove', //性质变更-移除已选中房屋信息
  getApplylist: '/house/store/stock/page', //查询房源库中的可供应房列表
  getWaitigHouselist: '/house/store/list/get', //产权变更/性质变更-获取待选房列表房源
  addToSelectedList: '/house/choose/nature_info/add', //性质变更-添加至选中房列表
  delCase: '/house/store/nature_process/delete', //性质变更--删除批次
  getLog: '/house/store/log_info/get', //性质变更--查看日志
}

//产权变更
export const propertyRightChange = {
  saveChangeInfo: '/house/store/property/change/add', //性质变更-变更申请信息保存
  submit: '/house/store/property_process/submit', //提交下一环节
  getPropertyCount: '/house/store/property_info/property/list', //产权变更-统计选中房产权数量
  // getUnit: '/house/store/property/unit/get' //产权变更-获取所有产权单位标识和名称

}

//房屋坐落变更
export const location = {
  getLocationList: '/located/process/list',//房屋坐落变更-待办箱/已办箱列表查询
  createBatchCode: '/located/batchCode/generate', //房屋坐落变更-生成批次编号
  getLocationInfo: '/located/get',//房屋坐落变更-批次信息获取(房屋+栋+小区+变更记录)
  getFgHouseList: '/located/house/list/get', //房屋坐落变更-只有房改属性的房信息列表
  addLocatedHouse: '/located/house/add', //房屋坐落变更-选择要变更的房屋
  deleteHouseLocated: '/located/house/delete', //房屋坐落变更-删除要变更的房屋
  saveLocationChange: '/located/save', //房屋坐落变更-保存
  addLocatedDistrict: '/located/original/district/add', //房屋坐落变更-选择要变更后的小区
  originalBuildList: '/located/build/list/get', //房屋坐落变更-获取原有栋列表
  addLocatedBuild: '/located/original/build/add', //房屋坐落变更-选择要变更后的栋
  addNewDistrict: '/located/new/district/add', //房屋坐落变更-若无小区则新增小区
  addNewBuilding: '/located/new/build/add', //房屋坐落变更-若无栋则新增栋
  getLocatedDistrict: '/located/district/get', //房屋坐落变更-查看/删除/编辑小区信息
  getLocatedBuild: '/located/build/get', //房屋坐落变更-查看/删除/编辑栋信息
  submitProcess: '/located/process/submit', //房屋坐落变更-流程提交
  backProcess: '/located/process/back', //房屋坐落变更-流程回退
  noPassProcess: '/located/process/nopass', //房屋坐落变更-流程不通过
  deleteLocatedProcess: '/located/process/delete' //房屋坐落变更-删除案件
}

//产权单位管理
export const  proRightUnitUrl = {
  getProperRightInfo: '/property/right/get', //产权管理-通过统一社会信用代码查询产权单位
  savePropertyRightInfo: '/property/right/save' ,//产权管理-产权单位信息保存并启动流程
  getPropertyRightList: '/property/right/list', //产权管理-待办箱/已办箱列表查询
  submitPropertyRightProcess: '/property/right/process/submit', //产权管理-流程提交下一环节
  getLoginer: '/currentLicenseCardInfo', //得到当前登录人
  deleteProcess: '/property/right/process/delete', //案件删除
  getPropertyRightLog: "/house/store/log/info/get", //房源房屋库-查看房屋操作日志
  rebackProcess: '/property/right/process/reback',//案件回退

}
//房屋维修管理
export const houseMaintenance = {
  getMaintenanceList: '/maintain/list/get', //房屋维修管理-查询维修管理列表
  getAddMaintainList: '/maintain/add/list/get', //房屋维修管理-获取新增确定后房屋列表信息
  getMaintainCode: '/maintain/batchCode/generate', //房屋维修管理-生成批次编号
  addHouseMaintain: '/maintain/list/add', //房屋维修管理-确定新增记录
  deleteMaintainHouse: '/maintain/house/delete', //房屋维修管理-删除选择房屋
  saveHouseMaintain: '/maintain/save', //房屋维修管理-房屋维修管理信息保存
  getHouseMaintainInfo: '/maintain/info/get', //房屋维修管理-获取记录房屋信息
  getHouseMaintainLogList: '/house/maintain/log/list',//房屋维修管理-查看维修记录列表
  deleteMaintainInfo: '/maintain/info/delete', //房屋维修管理-删除维修记录
  saveEditMaintain: '/maintain/info/edit',//房屋维修管理-保存编辑维修记录
  saveMaintainInfo: '/maintain/info/save' //维修记录-新增维修信息
}

//冻结查封
export const freezeSeized = {
  createCaseSearch: '/house/seal_freeze/list', //查封/冻结-新增案件列表查询
  getSealfreezeInfo: '/house/seal_freeze/person/get', //查封/冻结-获取该房屋下被查封人/单位信息
  saveSealfreezeDetail: '/house/seal_freeze/info/save', //查封/冻结-房屋查封
  getUserName: '/currentLicenseCardInfo', //获取当前登陆用户的身份信息
  getSealfreezeList: '/house/seal_freeze/get', //得到查封/冻结-查询查封冻结列表
  getSealfreezeHouseList: '/house/seal_freeze/info/get', //得到查封/冻结-查询某条房屋查询情况
  getSealfreezeHouseListDetail: '/house/store/seal/get', //查封/冻结-获取选中的查封详情
  editSave: '/house/seal_freeze/save', //查封/冻结-保存修改信息
  getRenewal: '/house/seal_freeze/renewal/get', //查封/冻结-获取某个可以续费的查封信息
  saveRenewal: '/house/store/renewal/save', //查封/冻结-续封保存
  saveUnseal: '/house/store/unseal/save', //房屋解封-保存
  getReportUrl: "/property/value?key=dist.phbip.report.urlPrefix", //获取后端报表链接的方法
}

//**计价管理********//
export const valuation = {
  //**基准价管理*/
  //基础价
  getDistrictList: '/valuation/house_district/list', //基准价管理、计价系数管理查询所有的小区
  getDistrictInfo: '/valuation/district_info/get', //详情页-小区信息查询
  getBuildingList: '/valuation/building_name/list', //详情页-栋名称下拉数据
  searchBasePricing: '/valuation/house_base_price/list', //详情页-基准价栋名称、房号查询
  baseSearchBuilding: '/valuation/building_guid_name/list', //详情页-维护基准价栋名称下拉查询
  historyPrice: '/valuation/house_price/history/list', //详情页-查看历史评估价
  preserveBasePricing: '/valuation/building/base_price/modify', //详情页-维护基准价(整栋)
  getHouseNoList: 'valuation/building/house_no/list', //详情页-维护基准价（某套房）弹框-房号下拉框数据
  getBaseHouseNoList: 'valuation/building_name/house_no/list', //详情页-基准价-房号下拉数据

  //**计价系数管理*/
  //朝向系数
  getTowardBuilding: '/valuation/orientation/building_name/list', //详情页-栋名称下拉查询
  getDefaultValue: '/valuation/orientation/default_value/list', //详情页-查看系统缺省值
  getBuildingInfo: '/valuation/building_info/list', //详情页-查询栋信息
  searchAllToward: '/valuation/orientation/list', //详情页-朝向系数下根据栋名称查询
  searchorientation: '/valuation/orientation/building/list', //详情页-维护朝向系数-按钮查询
  changBuildingToward: '/valuation/orientation/building/modify', //维护朝向系数-确定按钮
  singleBuildingSearch: '/valuation/orientation/single/list', //详情页-点击表格-编辑按钮查询单栋信息
  singleBuildingEdit: '/valuation/orientation/single/modify', //详情页-表格编辑弹框-确定按钮
  //楼层系数
  getFloorBuilding: 'valuation/floor/building_name/list', //详情页-楼层系数下拉查询
  searchFloor: 'valuation/floor/list', //楼层系数根据栋名称查询
  searchFloorCoe: 'valuation/floor/adjust_default/list', //维护楼层系数(调整缺省值)-表格数据
  getSystemValue: 'valuation/floor/default_value/list', //楼层系数-查看系统缺省值
  changeFloorCoe: 'valuation/floor/adjust_default/modify', //维护楼层系数（调整缺省值）- 确定按钮
  singleFloorEdit: 'valuation/floor/adjust_default/single', //楼层系数表格-编辑-查询信息
  singleFloorSure: 'valuation/floor/single/modify', //楼层系数-编辑弹框-确定按钮
  generateSearch: 'valuation/floor/generate/list', //维护楼层系数(生成)
  confirmGenerate: 'valuation/floor/generate/modify', //维护楼层系数(生成)弹框-确定按钮

  //**计价公式管理 */
  searchFormulaList: 'valuation/formula/page', //公示列表查询
  saveFormula: 'valuation/formula/save', //计价公式保存
  getFormulaInfo: 'valuation/formula/get', //计价公式-查询公式信息
  deleteFormula: 'valuation/formula/delete', //删除计价公式
  getFormulaList: 'valuation/formula/steps/list', //计价公式步骤列表
  deleteFormulaStep: 'valuation/formula/steps/delete', //计价公式步骤信息的删除
  formulaStepInfo: 'valuation/formula/steps/get', //单条计价公式步骤信息的
  editStep: 'valuation/formula/steps/get', //单条计价公式步骤信息

  //**业务计价模型 */
  searchModelList: 'valuation/model/page', //业务模型列表查询
  modelSave: 'valuation/model/save', //增加计价模型，编辑计价模型保存
  getModelList: 'valuation/model/formula/list', //获取计价公式名称下拉数据
  searchDistrict: 'valuation/model/district/list', //弹框内小区模块查询
  getModelBuilding: 'valuation/model/building/list', //获取弹框内栋名称下拉框
  getModelHouseNo: 'valuation/model/houseNo/list', //获取弹框内房号下拉框
  getHousePlanList: 'valuation/model/planNo/list', //获取房源计划下拉框
  getModelInfo: 'valuation/model/get', //点击编辑进入详情页查询计价模型信息
  saveFormulaSteps: 'valuation/formula/steps/save', //计价公式步骤保存

  //**房屋价格管理 */
  getPriceList: '/price/list/get',//房屋价格管理-列表查询
  importPrice: '/price/info/import',//房屋价格管理-导入价格
  importLog: '/price/log/list/get',//查询某条详情信息导入记录
  importLogInfo: '/price/log/info', //查询某条导入记录详情
}

// 定向单位房源退回
export const houseReturn = {
  returnHouseSearch: '/unit/check/out/page', //定向单位房源退回-首页查询
  searchList: '/unit/check/out/sign', //定向单位房源退回-待退回、已退回分页列表
  housingReturn: '/unit/check/out/house', //定向单位房源退回-房源退回
}

//添加嵌套地图地址
export const mapUrl = {
  getHouseMapUrl: '/property/value?key=dist.supermap-iserver.houseMap', //获取iframe嵌套地址
}

export const grid = {
  searchReseauDataByAddr:"/reseau/standardData/searchByAddr", //根据地址查询网格标准数据
  searchReseauDataByCode:"/reseau/standardData/searchByCode", //根据网格编码查询网格标准数据
  saveGridInfo: "/grid/info/save", //房屋/栋网格办信息保存
  getGridCodeByAddress: "/get/grid/code/by/address",//获取栋网格编码
  sentReliefService:"/reseau/relief/add",//地址救济服务插入接口
  checkReseau:"/reseau/check",
  getReliefResult:"/grid/relief/get",
}

export const demolition ={
  downloadDemolitionTemplate:"/demolition/template/download",//拆迁返还-模板下载
  importDemolition:"/demolition/import",//拆迁返还-信息导入
  getDemolitionList:"/demolition/list/get",//拆迁返还-列表查询
}
