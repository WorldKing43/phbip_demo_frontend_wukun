/* 此处添加api接口 */
export const url = {
  getUser:"/currentLicenseCardInfo",
  getDictionary:"/common/dic/get",//字典
  checkBach:'/construction_raising/house_intoStore/get',//根据批次标识查询批次基本信息
  checkQuery:'/construction_raising/community_info/get',//房源信息录入-双击查看某个小区详情
  exportApply:"/construction_raising/house_intoStore/export",
  deleteArea:"/construction_raising/house_district/delete",
  getDInfo:"/construction_raising/house_bulid_list/get",
  addDInfo:"/construction_raising/house_bulid/add",
  deleteDevice:"/construction_raising/assortFacility/delete",
  listFacility:"/construction_raising/assortFacility/list", // 查询配套设施
  checkFacility:"/construction_raising/assortFacility/page", //查询可选配套设施
  addFacility:"/construction_raising/assortFacility/add",//添加装修标准
  deteleYuHousing:'/construction_raising/house/deletePre',//移除预房源
  deteleTung: '/construction_raising/building/delete', //删除栋
  addHouse: '/construction_raising/houseInfo/add', //新增房源
  addAuarters: '/house/house_district/add', //建设筹集-小区信息新增
  getDistrictCode: '/construction_raising/house_district_code/get', //建设筹集小区信息新增条件-小区号生成获取
  chooseDistrict: '/house/house_intoStore/choose_district', //选择预房源-选择小区
  deleteHouse: '/construction_raising/houseInfo/delete', //删除房源
  deleteApply: '/construction_raising/house_intoStore/delete', //删除入库申请批次
  getCodes:"/construction_raising/house_intoStore/batchCode",
  getWarehousingApply: '/house/house_intoStore/page', //按条件查询入库申请
  commitInfo:"/construction_raising/house_intoStore/commit", //提交批次
  saveApplyBatch: '/house/house_intoStore/save', //保存申请批次
  getEnterpriseInfo:'/house/enterpriseInfo/get',//获取单位信息
  copyTung: '/construction_raising/building/copy', //复制栋
  copyHouse:"/construction_raising/house/copy",
  getHouseInfo:"/construction_raising/house/page",
  getPreHousList: '/construction_raising/house_intoStore/listHouse', //获取预房源列表
  getChoosePreHouseList:"/construction_raising/house_intoStore/list", //预房源-已选中的预房源列表
  set:"/construction_raising/house_intoStore/set",//添加房源
  setFacility:"/construction_raising/assortFacility/set", // 提交配套设施
  getBuidingCounts:"/construction_raising/house/building_statistics",
  getHousingData: '/house/house_district_list/get', //房源信息录入查询
  getMappingData: '/construction_raising/house_district/get', //点击查询对接测绘数据
  getBuildName:"/construction_raising/district/list", //获取栋名称
  getAllName:"/construction_raising/house_statistics/all", //获取栋名称
  removeFacility:'/construction_raising/assortFacility/remove',  //移除配套设施
  landNoAdd:"/construction_raising/landNo/add", //添加宗地信息
  landNoDelete:"/construction_raising/landNo/delete", //删除宗地信息
  getlandNoList:"/construction_raising/landNo/list", //查询宗地信息
  renovationPreInfoList:"/construction_raising/renovationPreInfo/list", //查询装修标准
  projectInfoDistrict:"/construction_raising/projectInfo/district",//查询项目信息关联到小区信息
  //=======================原有小区录入
  houseDistrict:"/house/district/page",//原有小区录入-查询原有小区
  houseDistrictdetail:"/house/district/detail/get",//原有小区录入-查询小区详情
  houseDistrictsave:"/house/district/save",//原有小区录入-保存小区信息和装修标准
  houseLandNo:"/house/landNo/list",//原有小区录入-查询小区宗地信息或者宗地详情
  houseBuilding:"/house/building/page",//原有小区录入-分页查询栋信息查询或者查询栋详情
  houseBuildingAdd:"/house/buliding/add",//原有小区录入-新增栋或者修改栋
  houseInfoAdd:"/house/houseInfo/add",//原有小区录入-新增或者修改房屋信息
  assortFacilityAdd:"/house/assortFacility/add",//原有小区录入-新增配套设施
  landNolist:'/construction_raising/landNo/list',//查询宗地信息
  getProperty:'/construction_raising/property/unit/get',//产权变更-获取所有产权单位标识和名称
}
