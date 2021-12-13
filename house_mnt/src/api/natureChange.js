//性质变更模块的接口
import axios from '@/config/axios'
import {
  natureChange
} from '@/api/paths'

export default {
  //性质变更代办和已办查询
  natureChangeTodoSearch(params, data) {
    return axios.post(natureChange.natureChangeTodoSearch, params, data)
  },

  //性质变更-变更房源信息保存
  saveChangeInfo(params, data) {
    return axios.post(natureChange.saveChangeInfo, params, data)
  },

  //得到房屋性质
  getHouseNature(params) {
    return axios.get(natureChange.getHouseNature, params)
  },

  //获取房屋状态
  getHouseState(params) {
    return axios.get(natureChange.getHouseState, params)
  },

  //提交下一环节
  submit(params) {
    return axios.get(natureChange.submit, params)
  },

  //得到房屋类型
  getHouseType(params) {
    return axios.get(natureChange.getHouseType, params)
  },

  //流程回退
  returnBack(params) {
    return axios.get(natureChange.returnBack, params)
  },

  //查询选中状态的房屋
  getSelectHouse(params) {
    return axios.get(natureChange.getSelectHouse, params)
  },

  //从选房中移出
  removeSelectHouse(params, data) {
    return axios.post(natureChange.removeSelectHouse, params, data)
  },

  //添加至待选房列表
  getApplylist(params, data) {
    return axios.post(natureChange.getApplylist, params, data)
  },

  //得到待选房列表查询
  getWaitigHouselist(params, data) {
    return axios.post(natureChange.getWaitigHouselist, params, data)
  },

  //是否添加和移出
  addToSelectedList(params, data) {
    return axios.post(natureChange.addToSelectedList, params, data)
  },

  //性质变更-删除案件
  delCase(params) {
    return axios.get(natureChange.delCase, params)
  },

  getLog(params) {
    return axios.get(natureChange.getLog, params)
  }
}
