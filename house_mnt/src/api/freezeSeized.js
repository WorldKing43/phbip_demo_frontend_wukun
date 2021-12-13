import axios from '@/config/axios'
import {
  freezeSeized
} from '@/api/paths'

export default {
  ////查封/冻结-新增案件列表查询
  createCaseSearch(params, data) {
    return axios.post(freezeSeized.createCaseSearch, params, data)
  },
  //查封/冻结-获取该房屋下被查封人/单位信息
  getSealfreezeInfo(params) {
    return axios.get(freezeSeized.getSealfreezeInfo, params)
  },
  //查封/冻结-房屋查封
  saveSealfreezeDetail(params, data) {
    return axios.post(freezeSeized.saveSealfreezeDetail, params, data)
  },
  //获取当前登陆用户的身份信息
  getUserName(params) {
    return axios.get(freezeSeized.getUserName, params)
  },
  //得到查封/冻结-查询查封冻结列表
  getSealfreezeList(params) {
    return axios.get(freezeSeized.getSealfreezeList, params)
  },
  //得到查封/冻结-查询某条房屋查询情况
  getSealfreezeHouseList(params) {
    return axios.get(freezeSeized.getSealfreezeHouseList, params)
  },
  //查封/冻结-获取选中的查封详情
  getSealfreezeHouseListDetail(params) {
    return axios.get(freezeSeized.getSealfreezeHouseListDetail, params)
  },
  //查封/冻结-保存修改信息
  editSave(params, data) {
    return axios.post(freezeSeized.editSave, params, data)
  },
  //查封/冻结-获取某个可以续费的查封信息
  getRenewal(params) {
    return axios.get(freezeSeized.getRenewal, params)
  },
  //查封/冻结-续封保存
  saveRenewal(params, data) {
    return axios.post(freezeSeized.saveRenewal, params, data)
  },
  //房屋解封 - 保存
  saveUnseal(params) {
    return axios.post(freezeSeized.saveUnseal, params)
  },
  //获取报表链接
  getReportUrl(params) {
    return axios.get(freezeSeized.getReportUrl, params)
  },
}
