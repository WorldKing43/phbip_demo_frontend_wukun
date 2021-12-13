import Dhttp from '../config/axios'
import {
  url
} from '@/api/paths'

export default {
  //房源计划添加房源-判断是否存在问题房源
  getJudge(params, data) {
    return Dhttp.post(url.getJudge, params, data)
  },
  //房源计划-批次下达时判断计划下是否存在签约权为空的房屋
  getSignatoryRightCount(params) {
    return Dhttp.get(url.getSignatoryRightCount, params)
  },
  //房源计划-流程审核不通过
  processFail(params) {
    return Dhttp.get(url.processFail, params)
  },
  //房源计划待选房列表获取签约权下拉字典
  getSignatoryRight(params) {
    return Dhttp.get(url.getSignatoryRight, params)
  }
}
