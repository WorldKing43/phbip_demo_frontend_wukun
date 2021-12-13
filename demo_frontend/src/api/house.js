//房源房屋库模块接口
import axios from '@/config/axios'
import {
  house
} from '@/api/paths'
import Axios from 'axios';

export default {
  //分页获取小区列表
  getPage(params) {
    return axios.get(house.storeDistrictPage, params);
  },

  //获取小区信息
  getNeighbourhoodInfo(params) {
    return axios.get(house.storeDistrictGet, params);
  },

  //获取栋信息
  getBuildingInfo(params) {
    return axios.get(house.storeBuildingInfo, params)
  },

  // 获取房屋详情
  getHouseInfo(params) {
    return axios.get(house.storeHouseInfo, params)
  },

  //分页查询楼栋列表
  getBuildingPage(params) {
    return axios.get(house.storeBuildingPage, params)
  },

  //获取房屋列表
  getstoreHousePage(params) {
    return axios.get(house.storeHousePage, params)
  },

  //房源房屋库-续封
  countinueSeal(params, data) {
    return axios.post(house.countinueSeal, params, data)
  },

  //房源房屋库 -续封获取详情
  getCountinueSealInfo(params) {
    return axios.get(house.getCountinueSealInfo, params)
  },

  //得到配套设施列表
  getSupportDevice(params) {
    return axios.get(house.getSupportDevice, params)
  },

  //得到配套设施详情
  getSupportDeviceInfo(params) {
    return axios.get(house.getSupportDeviceInfo, params)
  },

  //家庭/单位、承租/购房/房改情况
  getOccupancy(params) {
    return axios.get(house.getOccupancy, params)
  },

  //房源房屋库-查看房屋操作日志
  getLog(params) {
    return axios.get(house.getLog, params)
  },

  //房源房屋库-查询小区下装修列表信息
  getRenovationList(params) {
    return axios.get(house.getRenovationList, params)
  },

  //房源房屋库-获取宗地号信息列表
  getLandList(params) {
    return axios.get(house.getLandList, params)
  },

  //房源房屋库-获取某个宗地号详细信息
  getLandDetail(params) {
    return axios.get(house.getLandDetail, params)
  },

  //房源房屋库-生成材料的guid
  getGenerateGuid(params) {
    return axios.get(house.getGenerateGuid, params)
  },

  //问题房源标注-获取房源标记信息
  getSituationalList(params) {
    return axios.get(house.getSituationalList, params)
  },

  //问题房源标注-解除房源标记信息
  removeSituationalInfo(params) {
    return axios.get(house.removeSituationalInfo, params)
  },

  //问题房源标注-获取某条详细房源标注信息
  getSituationalInfo(params) {
    return axios.get(house.getSituationalInfo, params)
  },

  //创建非流程的guid
  createMis(params) {
    return axios.get(house.createMis, params)
  },

  //获取过程材料规定
  getMaterial(params) {
    return axios.get(house.getMaterial, params)
  },
  //房源房屋库-使用权变更全选
  getUserRightChooseAll(params) {
    return axios.get(house.getUserRightChooseAll, params)
  },

  //房源房屋库-过程材料-添加文件夹
  addMaterialDir(params, data) {
    return axios.post(house.addMaterialDir, params, data)
  },

  //房屋库-修改小区的数据维护权
  saveMaintain(params) {
    return axios.get(house.saveMaintain, params)
  },

  //房屋库-栋信息数据维护权修改
  saveBuildMaintain(params, data) {
    return axios.post(house.saveBuildMaintain, params, data)
  },

  //房屋库-栋信息数据维护权全选
  getAllBuildList(params) {
    return axios.get(house.getAllBuildList, params)
  },

  // 房屋综合查询(市局)-获取房屋详情
  getCityHouseInfo(params) {
    return axios.get(house.getCityHouseInfo, params)
  },
  //房屋库-查询房屋分配权为空，属性为房改的房屋信息
  getPropertyIsFgList(params, data){
    return axios.post(house.getPropertyIsFgList, params, data)
  },
  changeHouseOwnerShip(params, data){
    return axios.post(house.changeHouseOwnerShip, params, data)
  },
  getRecordUnit(params) {
    return axios.get(house.getRecordUnit, params)
  },
  getRecordRzr(params) {
    return axios.get(house.getRecordRzr, params)
  },
  getFamilyInfo(params) {
    return axios.get(house.getFamilyInfo, params)
  },
  getZdDistrictList(params){
    return axios.get(house.getZdDistrictList, params)
  },
  getZdBuildtList(params){
    return axios.get(house.getZdBuildtList, params)
  },

  getZdHouseList(params){
    return axios.get(house.getZdHouseList, params)
  }
}
