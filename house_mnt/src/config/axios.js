/* 封装异步请求 */
import Vue from 'vue'
import axios from './index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

const val = new Vue()
export default {

  get(url, params, config) {
    return new Promise((resolve, reject) => {
      let getConfig = {
        method: 'get',
        url,
        params: params,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'showLoading': true
        }
      }
      if (config && config.timeout != undefined) {
        getConfig.timeout = config.timeout
      }
      if (config && config.showLoading === false) {
        getConfig.headers.showLoading = false
      }
      axios(getConfig).then(res => {
        if (res.data.status == "success" && res.data) {
          resolve(res.data.data || res.data || res)
        } else {
          reject(res)
          if(res.data.message){
            val.$alert(res.data.message, "提示")
            return;
          }
          val.$alert('网络错误，请稍后重试！', "提示")
          resolve(res)
        }
      }).catch(err => {
        val.$alert('网络错误，请稍后重试', "提示")
      })
    })
  },

  post(url, params, data, config) {
    return new Promise((resolve, reject) => {
      let postConfig = {
        method: 'post',
        url,
        data: data,
        params: params,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'showLoading': true
        }
      };
      if (config && config.timeout != undefined) {
        postConfig.timeout = config.timeout
      }
      if (config && config.showLoading === false) {
        postConfig.headers.showLoading = false
      }
      axios(postConfig).then(res => {
        if (res.data.status == "success"&& res.data) {
          resolve(res.data.data || res.data || res)
        } else {
          reject(res)
          if(res.data.message){
            val.$alert(res.data.message, "提示")
            return;
          }
          val.$alert('网络错误，请稍后重试！', "提示")
          resolve(res)
        }
      }).catch(err => {
        console.log(err)
        val.$alert('网络错误，请稍后重试！', "提示")
      })
    })
  },
  //下载功能封装 maxq 增：2020.04.01
  uploadFile(url,params,data,config){
    return new Promise((resolve, reject) => {
      let postConfig = {
        method: 'post',
        url,
        data: data,
        params: params,
        config:config
      };
      axios(postConfig).then(res => {
        if (res.data.status == "success") {
          resolve(res.data.data || res.data || res)
        } else {
          val.$alert(res.data.message, "提示")
          reject(res)
        }
      }).catch(err => {
        err.$alert('请求超时,请稍后重试!', "提示")
      })
    })
  },
   /**
   * 获取请求url前缀
   * @returns {*}
   */
  getBaseURL() {
    // 如果没有预设baseURL，那么用空串代替，方便合并
    var baseURL = "";
    if(axios&&axios.defaults&&axios.defaults.baseURL){
      baseURL = axios.defaults.baseURL;
    }
    return baseURL;
  },
}
