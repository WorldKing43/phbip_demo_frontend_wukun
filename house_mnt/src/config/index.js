/*
 * @Author: 
 * @Date: 2020-02-28 15:37:26
 * @LastEditors: Please set LastEditors
 * @Description: axios-interceptors
 */
import DistAxios from "axios";
import { Loading } from 'element-ui';

let loading     //定义loading变量

function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}
//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

let service = DistAxios.create({
  // baseURL: root,
  baseURL: process.env.API,
  timeout: process.env.timeout * 1000
});
service.interceptors.request.use (
  config => {
    // config的data不需要被重设,否则会出现请求无法被反序列化的问题
    // config.data = JSON.stringify(config.data);
    config.withCredentials = true;
    // config.headers = {
    //   'Content-Type': 'application/json',
    //   'X-Requested-With': 'XMLHttpRequest'
    // };
    if (window.appCode) {
      config.headers.appCode = appCode;
    }
    if (config.headers.showLoading) {
      showFullScreenLoading()
    }
    return config
  },
  // 拦截出错处理
  error => {
    return Promise.reject(error)
  }
);
service.interceptors.response.use(
  response => {
    if (response.config.headers.showLoading) {
      tryHideFullScreenLoading()
    }
    return response;
  },
  error => {
    if (error.config.headers.showLoading) {
      tryHideFullScreenLoading()
    }
    return new Promise((resolve, reject) => {
      var config = error.config;
      if (error.response && error.response.status && error.response.status == 401) {
        console.log("request not authenticated,trying to authenicate.");
        var urlAuth = error.response.data;
        config.guid = guid();
        //认证完成之后重新请求资源
        authenicate(urlAuth, config.url, config.guid).then(userLoginName => {
          // console.log("当前登陆用户是：" + userLoginName);
          window.currentLoginUser = userLoginName;
          service(config).then(res => resolve(res), error => reject(error));
        });
      } else {
        reject(error.response.data); // 返回接口返回的错误信息
      }
    });
  }
);
/**
 * 对于ajax跨域请求认证方法
 * @param authenticateUrl 授权url
 * @param requestUrl 请求url
 * @param guid 当前请求的唯一标识
 * @returns {Promise<any>}
 */
const authenicate = (authenticateUrl, requestUrl, guid) => {
  console.log("将请求：" + requestUrl + "加入到认证队列中，GUID：" + guid);
  //初始化认证信息对象
  if (window.toAuthenticateMetas == undefined) {
    window.toAuthenticateMetas = [];
  }

  let promise = new Promise((resolve, reject) => {
    // 认证信息包含四个部分，认证url、访问请求url、请求唯一标识、用于处理他们关系的defer
    var toAuthenticateMeta = {
      "authenticationUrl": authenticateUrl,
      "requestUrl": requestUrl,
      "guid": guid,
      "resolve": resolve
    };
    toAuthenticateMetas.push(toAuthenticateMeta);
    if (toAuthenticateMetas[0].guid === guid) {
      window.authenicationFrame = createIframe(toAuthenticateMetas[0].authenticationUrl, toAuthenticateMetas[0].requestUrl);
      if (window.closeLoginFrame == null) {
        window.closeLoginFrame = function (e) {
          // e.data存在，并且e.data就是普通的字符串类型才走该逻辑
          if (e.data && e.data.indexOf) {

            if (e.data.indexOf("DASC_CLOSE_IFRAME") === 0) {
              //当收到dasc_authenticated时，表示认证已通过
              // 获取当前被认证的对象
              var toAuthenticateMeta = toAuthenticateMetas.shift();
              console.log("Authentication Success ", toAuthenticateMeta.requestUrl);
              console.log("将GUID：" + toAuthenticateMeta.guid + "，Url：" + toAuthenticateMeta.requestUrl + "的请求从认证队列中移除。");
              //删除认证窗体
              window.authenicationFrame.remove();
              // 如果
              if (toAuthenticateMetas.length > 0) {
                window.authenicationFrame = createIframe(toAuthenticateMetas[0].authenticationUrl, toAuthenticateMetas[0].requestUrl);
              }
              // 这里使用正确的promise，否则不会在正常的地方收到响应
              toAuthenticateMeta.resolve(e.data.substring("DASC_CLOSE_IFRAME".length + 1));
            }
            ;
          }
          ;
        }
        //监听iframe使用postMessage发送的message,仅仅在页面没有closeLoginFrame的时候进行监听
        window.addEventListener('message', closeLoginFrame, false);
      }
    }
  });
  return promise;
}
/**
 * 创建认证窗体Iframe，再同一时间仅仅允许创建一个iframe进行认证
 */
const createIframe = (url, source) => {
  //TODO 需要在top中打开,新版本中予以修改
  console.log("Authentication Begin " + source);
  let iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.style = "height: 100%; width: 100%; position: fixed; top: 0; left: 0; z-index:9999";
  document.body.append(iframe);
  return iframe;
}
const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
// Allow use of default import syntax in TypeScrip
export default service;
