/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-15 10:07:59
 * @LastEditTime: 2020-07-16 10:43:28
 * @LastEditors: Please set LastEditors
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import axios from 'axios'
import store from './store' //引入store
import {Loading} from 'element-ui'
// import login from './api/login'
import './assets/iconfont/iconfont.js'
import './assets/iconfont/iconfont.css'
import '../static/style/basicStyle.scss' //全局统一样式

//全局引入地图相关依赖
import $ from 'jquery'
import 'element-ui/lib/theme-chalk/index.css';

import 'babel-polyfill'
import {
  hasPermission
} from './components/js/btnPermissions'
import mixin from "./mixin.js"

Vue.mixin(mixin);
Vue.use(ElementUI);
Vue.use(Loading);
Vue.prototype.hasPerm = hasPermission;
Vue.prototype.globalHeaderStyle = {
  'background': '#E6F0FC',
  'color': '#333',
  'text-align': 'center',
  'border-color': '#b3b3b3'
};
Vue.prototype.globalCellStyle = {
  'text-align': 'center',
  'border-color': '#b3b3b3'
}
//**调用字典公用方法—— item:传入的接口调取的数据，obj：字典赋值的变量， node: 节点名 */
Vue.prototype.$dictionaryChange = function (item, obj, node) {
  item.forEach(element => {
    if (element.name == node) {
      obj = element.children
    }
  })
  return obj
}
let loading;
Vue.prototype.$startLoading = function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
Vue.prototype.$endLoading = function endLoading() {    //使用Element loading-close 方法
  loading.close()
}
// Vue.prototype.$axios = axios
Vue.config.productionTip = false
//定义时间格式的原型链 格式类型YYYY-MM-HH
Vue.filter('dateFormat', function (time) {
  if (time) {
    return time.split(" ")[0]
  } else {
    return "";
  }
});
//定义一个判断是否为正整数的判断
Vue.filter('checkNum', function (num, title) {
  if (Number(num) > 0 && (parseInt(num) == parseFloat(num))) {
    return true;
  } else {
    this.$alert('请输入' + title + '为正整数', '提示', {
      confirmButtonText: '确定'
    });
  }
});

//实现弹框的可拖动指令
Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header');
    const dragDom = el.querySelector('.el-dialog');
    dialogHeaderEl.style.cssText += ';cursor:move;'
    dragDom.style.cssText += ';top:0px;';
    const sty = (function () {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr];
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr];
      }
    })()
    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;
      const screenWidth = document.body.clientWidth; // body当前宽度
      const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取) 
      const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
      const dragDomheight = dragDom.offsetHeight; // 对话框高度
      const minDragDomLeft = dragDom.offsetLeft;
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;
      const minDragDomTop = dragDom.offsetTop;
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;
      // 获取到的值带px 正则匹配替换
      let styL = sty(dragDom, 'left');
      let styT = sty(dragDom, 'top');

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100);
        styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100);
      } else {
        styL = +styL.replace(/\px/g, '');
        styT = +styT.replace(/\px/g, '');
      };

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离 
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        // 边界处理
        if (-(left) > minDragDomLeft) {
          left = -(minDragDomLeft);
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft;
        }

        if (-(top) > minDragDomTop) {
          top = -(minDragDomTop);
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop;
        }
        // 移动当前元素 
        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
      };
      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
})

Vue.prototype.$getDate = function (date) {
  return /\d{4}-\d{1,2}-\d{1,2}/g.exec(date)
}
Vue.prototype.$getTime = function (time) {
  return time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate()
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, //使用store
  data: {
    enablePermission: true, // 总的权限控制开关
    enablePermissionLevel2:true, // 二级菜单的权限控制开关，总开关启用，该项配置才存在意义
    permission: {
      buttons: [], // 按钮权限的数组
      menus: [], // 菜单权限的数组
      pathMap: {}, // 按照名称路径构建的权限对象
      treeData: [], // 按照上下级别构造的树形权限数据
    }, // 权限数据
    eventHub: new Vue()
  },
  components: {
    App
  },
  template: '<App/>'
})
