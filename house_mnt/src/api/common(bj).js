import requset from '@/config/axios'
import { url } from '@/api/paths(bj)'
export default {
    getUser(){
       return requset.get(url.getUser);
    },
    getDictionary(params) {
		return requset.get(url.getDictionary,params) //字典
	},
    checkBach(params){
        return requset.get(url.checkBach,params)//根据批次标识查询批次基本信息
    },
    checkQuery(params,data){
        return requset.post(url.checkQuery,params,data)//房源信息录入-双击查看某个小区详情
    },
    exportApply(params){
        return requset.get(url.exportApply,params)
    },
    deleteArea(params,data){
        return requset.post(url.deleteArea,params,data);
    },
    getDInfo(params){
        return requset.get(url.getDInfo,params)
    },
    addDInfo(params,data){
        return requset.post(url.addDInfo,params,data)
    },
    deleteDevice(params){
        return requset.get(url.deleteDevice,params)
    },
    listFacility(params,data){
        return requset.post(url.listFacility, params, data)
    },
    checkFacility(params){
        return requset.get(url.checkFacility,params)
    },
    addFacility(params,data){
        return requset.post(url.addFacility,params, data)// 配套设施保存
    },
    deteleYuHousing(params,data){
        return requset.post(url.deteleYuHousing,params,data) //删除预房源
    },
    deteleTung(params,data){
        return requset.post(url.deteleTung,params,data)//删除栋
    },
    addHouse(params,data){
        return requset.post(url.addHouse,params,data)//新增房源
    },
    addAuarters(params,data){
        return requset.post(url.addAuarters,params,data)//v建设筹集-小区信息新增
    },
    getDistrictCode(params){
        return requset.get(url.getDistrictCode, params)//建设筹集小区信息新增条件-小区号生成获取
    },
    chooseDistrict(params){
        return requset.get(url.chooseDistrict, params)//选择预房源-选择小区
    },
    deleteHouse(params,data){
        return requset.post(url.deleteHouse,params,data)//v
    },
    deleteApply(params,data){
        return requset.post(url.deleteApply,params,data)//删除入库申请批次
    },
    getCodes(){
        return requset.get(url.getCodes)
    },
    getWarehousingApply(params){
        return requset.get(url.getWarehousingApply, params)//按条件查询入库申请
    },
    commitInfo(params,data){
        return requset.post(url.commitInfo, params, data)
    },
    saveApplyBatch(params,data){
        return requset.post(url.saveApplyBatch,params,data)//保存申请批次
    },
    getEnterpriseInfo(params){
        return requset.get(url.getEnterpriseInfo,params)//获取单位信息
    },
    copyTung(params,data){
        return requset.post(url.copyTung,params,data)//复制栋
    },
    copyHouse(params,data){
        return requset.post(url.copyHouse,params,data)
    },
    getHouseInfo(params){
        return requset.get(url.getHouseInfo,params)
    },
    getPreHousList(params){
        return requset.get(url.getPreHousList,params)//获取预房源列表
    },
    getChoosePreHouseList(params,data){
        return requset.post(url.getChoosePreHouseList,params,data)
    },
    set(params,data){
        return requset.post(url.set,params,data)
    },
    setFacility(params,data){
        return requset.post(url.setFacility,params,data)// 入库申请-添加配套设施
    },
    getBuidingCounts(params,data){
        return requset.post(url.getBuidingCounts,params,data)
    },
    getHousingData(params){
        return requset.get(url.getHousingData, params) //房源信息录入查询
    },
    getMappingData(params){
        return requset.get(url.getMappingData, params)//点击查询对接测绘数据
    },
    // 房源信息录入-房源信息获取栋名称
    getBuildName(params){
        return requset.get(url.getBuildName,params)
    },
    // 房源信息录入-获取全部
    getAllName(params){
        return requset.get(url.getAllName,params)
    },
    // 移除配套设施
    removeFacility(params,data){
        return requset.post(url.removeFacility,params, data)
    },
    // 添加宗地信息
    landNoAdd(params,data){
        return requset.post(url.landNoAdd,params, data)
    },
    // 删除宗地信息
    landNoDelete(params,data){
        return requset.post(url.landNoDelete,params, data)
    },
    // 查询宗地信息
    getlandNoList(params){
        return requset.get(url.getlandNoList,params)
    },
    // 查询装修标准
    renovationPreInfoList(params){
        return requset.get(url.renovationPreInfoList,params)
    },
    // 查询项目信息关联到小区信息
    projectInfoDistrict(){
        return requset.get(url.projectInfoDistrict)
    },
    //=====================================================
    //原有小区录入-查询原有小区
    houseDistrict(params){
        return requset.get(url.houseDistrict,params)
    },
    //原有小区录入-查询小区详情
    houseDistrictdetail(params){
        return requset.get(url.houseDistrictdetail,params)
    },
    //原有小区录入-保存小区信息和装修标准
    houseDistrictsave(params,data){
        return requset.post(url.houseDistrictsave,params, data)
    },
    //原有小区录入-查询小区宗地信息或者宗地详情
    houseLandNo(params){
        return requset.get(url.houseLandNo,params)
    },
    //原有小区录入-分页查询栋信息查询或者查询栋详情
    houseBuilding(params){
        return requset.get(url.houseBuilding,params)
    },
    //原有小区录入-分页查询栋信息查询或者查询栋详情
    houseBuildingAdd(params,data){
        return requset.post(url.houseBuildingAdd,params, data)
    },
    //原有小区录入-新增或者修改房屋信息
    houseInfoAdd(params,data){
        return requset.post(url.houseInfoAdd,params, data)
    },
    //原有小区录入-新增配套设施
    assortFacilityAdd(params,data){
        return requset.post(url.assortFacilityAdd,params, data)
    },
    //查询宗地信息
    landNolist(params){
        return requset.get(url.landNolist,params)
    },
    //产权变更-获取所有产权单位标识和名称
    getProperty(params){
        return requset.get(url.getProperty,params)
    }
}
