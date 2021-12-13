(function () {
  /**
   * 日期格式化
   * @param {Date} date 日期
   * @param {String} fmt 格式化字符串，如 yyyy-MM-dd HH:mm:ss.S
   */
  function datefmt(date, fmt) {
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "H+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ?
          o[k] :
          ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return fmt;
  }

  /**
   * 日期原型增加时间格式化的方法
   */
  Date.prototype.format = function (fmt) {
    return datefmt(this, fmt);
  };

  /**
   * 日期原型的JSON格式化修正
   */
  Date.prototype.toJSON = function () {
    return datefmt(this, "yyyy-MM-dd HH:mm:ss.S");
  };

  /**
   * 日期原型的ISO格式化修正
   */
  Date.prototype.toISOString = function () {
    return datefmt(this, "yyyy-MM-dd HH:mm:ss.S");
  };
})();

/**
 * 获取数据类型
 * @param {Object} obj 任意对象
 */
function typev(obj) {
  return Object.prototype.toString
    .call(obj)
    .split(/^\[object ([a-zA-Z]*)\]$/)[1]
    .toLowerCase();
}

/**
 * 数组遍历
 * @param {Array} arr 数组/伪数组
 * @param {Function} fn 遍历函数
 */
function each(arr, fn) {
  if (arr && arr.length && arr.length > 0 && fn && typeof fn === "function") {
    for (let i = 0; i < arr.length; i++) {
      let b = fn(arr[i], i, arr);
      if (b === false) {
        return false;
      }
    }
  }
}

/**
 * 树形查找（单个）
 * @param {Array} arr 数组对象
 * @param {Function} fn 检测函数
 * @param {String} tf 树节点属性，默认值：children
 * @returns {Object} 结果对象
 */
function treeOne(arr, fn, tf) {
  let rst = null;
  if (arr && fn) {
    treeEach(
      arr,
      function (item, p, i) {
        if (fn(item, p, i)) {
          rst = item;
          return false;
        }
      },
      null,
      tf
    );
  }
  return rst;
}

/**
 * 树形遍历
 * @param {Array} arr 数组对象
 * @param {Function} fn 遍历函数
 * @param {Object} p 上一节点
 * @param {String} tf 树节点属性，默认值：children
 */
function treeEach(arr, fn, p, tf) {
  tf = tf || "children";
  return each(arr, function (item, i) {
    let b = fn(item, p, i);
    if (b !== false) {
      b = treeEach(item[tf], fn, item, tf);
    }
    return b;
  });
}

/**
 * 查找树中的一个节点
 * @param {Array} tree 树状数据
 * @param {Function} fun 用于判断数据是否符合条件
 */
function findOneInTree(tree, fun) {
  let rst = null;
  if (tree && tree.length > 0) {
    for (var i = 0; i < tree.length; i++) {
      let node = tree[i];
      if (fun(node)) {
        rst = node;
      } else {
        rst = findOneInTree(node.children, fun);
      }
      if (rst) {
        break;
      }
    }
  }
  return rst;
}

/**
 * 设置路由链路信息
 * @param {String} to 路由地址（fullPath）
 * @param {String} from 上一路由地址（fullPath）
 * @param {Boolean} force true:强制赋值
 */
function setRouteTf(to, from, force) {
  let routeTf = window.__routeTf; //把window上面挂载的路由赋值
  if (!routeTf) {
    //路由不存在
    //把上一级的路由挂载在window上
    routeTf = window.__routeTf = {
      _route_tf_root_: from
    };
    // 初始加载进入，不进行数据缓存
    return;
  }
  //如果挂载在window上面的路由是顶层路由，不做任何操作
  if (from == routeTf["_route_tf_root_"]) return;
  //如果挂载window上面的路由不是顶层路由，调用window的缓存
  let ss = window.sessionStorage || window.localStorage;
  //如果缓存存在且window上面挂载的路由不存在，并且进行强制赋值,
  if (ss && (force || !routeTf[to])) {
    routeTf[to] = from; //就让window上面挂载的路由为顶层路由
    ss.setItem("_route_tf_" + to, from); //同时在缓存中，存储可以key为_route_tf_+当前路由，存储value为挂载的路由
  }
}

/**
 * 获取上一路由地址
 * @param {String} to 路由地址（fullPath）
 */
function getRouteF(to) {
  let from = null;
  if (!from) {
    let routeTf = (window.__routeTf = window.__routeTf || {});
    from = routeTf[to];
  }
  if (!from) {
    let ss = window.sessionStorage || window.localStorage;
    if (ss) {
      from = ss.getItem("_route_tf_" + to);
    }
  }
  from = from || "";
  return from;
}

/**
 * 数慧事件总线
 * @param {Vue} eventBus 事件总线，一个全局的Vue实例
 */
function DistEvent(eventBus) {
  // 事件总线
  this.eventBus = eventBus;
  // 事件存储, key: 事件名称String，value: 响应函数Function
  this.__events = {};

  /**
   * 注册事件，即接收消息
   * @param {String | String[]} name 事件名称
   * @param {Function} fn 回调函数
   */
  this.$on = function (name, fn) {
    if (!this.eventBus) {
      console.info("eventBus not exists!");
      return;
    }

    if (typev(name) == "array") {
      for (let i = 0; i < name.length; i++) {
        this.$on(name[i], fn);
      }
    } else {
      this.__events[name] = this.__events[name] || [];
      let fns = this.__events[name];
      if (fns.indexOf(fn) == -1) fns.push(fn);
    }
    this.eventBus.$on(name, fn);
  };

  /**
   * 触发事件，即发送消息
   * @param {String} name 事件名称
   * @param {Any[]} params 参数列表
   */
  this.$emit = function (name, params) {
    if (!this.eventBus) {
      console.info("eventBus not exists!");
      return;
    }
    var args = Array.prototype.slice.call(arguments);
    this.eventBus.$emit.apply(this.eventBus, args);
  };

  /**
   * 注销事件
   * @param {String | String[]} name 事件名称
   * @param {Function} fn 注册的回调函数，为空则注销同名的所有注册
   */
  this.$off = function (name, fn) {
    if (!this.eventBus) {
      console.info("eventBus not exists!");
      return;
    }
    if (typev(name) == "array") {
      for (let i = 0; i < name.length; i++) {
        this.$off(name[i], fn);
      }
    } else {
      let fns = this.__events[name];
      if (fn) {
        this.eventBus.$emit(name, fn);
        if (fn && fns && fns.indexOf(fn)) {
          fns.splice(fns.indexOf(fn), 1);
        }
      } else {
        this.eventBus.$emit(name);
        if (fns) delete this.__events[name];
      }
    }
  };

  /**
   * 销毁所有注册的事件
   */
  this.$destroy = function () {
    if (!this.eventBus) {
      return;
    }
    for (let n in this.__events) {
      let fns = this.__events[n];
      for (let i = 0; i < fns.length; i++) {
        this.eventBus.$off(n, fns[i]);
      }
      fns.splice(0, fns.length);
    }
  };
}

let mixin = {
  data() {
    return {
      __tabsCtrl: null,
      __topTab: null,
      __startMenu: null,
      Event: new DistEvent(this.$root.eventHub)
    };
  },
  methods: {
    typev: typev,
    treeEach: treeEach,
    findOneInTree: findOneInTree,
    findRouteFrom: getRouteF,
    updateTopTitle(title) {
      // 更新顶层页签的标题
      let tab = this.getTopTab();
      if (tab && title) {
        if (tab.label) {
          tab.label = title || "（未命名）";
        } else {
          tab.name = title || "（未命名）";
        }
      }
    },
    openTopTab(tab) {
      //this.closeAllTop(); //打开页签前关闭所有页签--jyb
      // 打开顶层页签
      let tabs = this.getTopTabs();
      if (tabs) {
        tabs.showTab(tab);
      }
    },
    getTopTab() {
      // 获取顶层页签对象
      if (this.__topTab) return this.__topTab;
      let tabs = this.getTopTabs(),
        tab = null,
        focus = this,
        arr = [];
      while (tabs && focus) {
        if (focus == tabs && focus == this.$root) {
          break;
        }
        if (focus.$vnode && focus.$vnode.key) {
          arr.push(focus);
        }
        focus = focus.$parent;
      }
      if (tabs && tabs.findTab && arr.length > 0) {
        for (let i = arr.length - 1; i >= 0; i--) {
          let key = arr[i].$vnode.key;
          tab = tabs.findTab(key);
          if (tab) break;
        }
      }
      return tab;
    },
    closeTopTab() {
      // 关闭顶层页签
      let tab = this.getTopTab();
      if (tab) {
        // this.__tabsCtrl.tabRemove(tab.path || tab.route);
        this.__tabsCtrl.toTabRemove(tab.path || tab.route); //需要调用不进行保存提示的关闭页签方法 maxq 增：2019.12.2
      }
    },
    //关闭所有页签--jyb
    closeAllTop() {
      let tabs = this.getTopTabs(); //得到所有的页签
      if (tabs && tabs.openTopTab) {
        let pages = JSON.parse(JSON.stringify(tabs.openTab));
        for (var i = 0; i < pages.length; i++) {
          tabs.toTabRemove(pages[i], false);
        }
      }
    },
    getTopTabs() {
      // 获取页签的控制器组件
      if (this.__tabsCtrl) {
        return this.__tabsCtrl;
      }
      let ctrl = this;
      while (ctrl && ctrl != this.$root) {
        if (ctrl.isTopTabs) {
          this.__tabsCtrl = ctrl;
          break;
        } else if (ctrl.$refs["tabsTopCtrl"]) {
          //增加--jyb
          this.__tabsCtrl = ctrl.$refs["tabsTopCtrl"];
          break;
        } else {
          ctrl = ctrl.$parent;
        }
      }
      return this.__tabsCtrl;
    },
    // 加载起始菜单项
    loadStartMenu() {
      let tabs = this.getTopTabs(), //得到顶层的tab
        menu = null;
      // 找不到顶层页签控制器或者找不到菜单的获取方法时，
      if (!tabs || !tabs.findMenuByIndex) return;
      if (tabs) {
        /*
          this.$route.fullPath:得到顶层的url-得到顶层路由
          tabs.findMenuByIndex(this.$route.fullPath):根据url得到得到当前菜单项的名字和路由
        */
        this.__startMenu = menu = tabs.findMenuByIndex(this.$route.fullPath);
      }
      let to = this.$route.fullPath,
        count = 0;
      //当顶层路由存在时，且名字存在时，数量小于5时
      while (tabs && !menu && to && count < 5) {
        count++;
        menu = tabs.findMenuByIndex(to);
        if (menu) {
          this.__startMenu = menu;
          setRouteTf(this.$route.fullPath, to, true);
          break;
        } else {
          to = getRouteF(to);
        }
      }
    },
    // 加载菜单权限（二级菜单使用）
    loadMenuItemPermission(menuItem) {
      // 未启用权限，不做任何处理
      if (
        !menuItem ||
        !this.$root.enablePermission ||
        !this.$root ||
        !this.$root.permission ||
        this.$root.enablePermissionLevel2 === false
      ) {
        return;
      }
      let sm = this.__startMenu;
      let path = sm ? sm.treePath + "->" : "";
      path += menuItem.label;
      let pathMap = this.$root.permission.pathMap || {};
      // 没有权限，菜单隐藏
      if (!pathMap[path]) {
        menuItem.hidden = true;
      }
      //当获取不到菜单栏时显示
      if (!this.__startMenu) {
        menuItem.hidden = false;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    let rt = to ? to.fullPath : "";
    let rf = from ? from.fullPath : "";
    setRouteTf(rt, rf, false);
    next();
  },
  created() {
    let vn = this.$vnode;
    // 一级页签的起始菜单加载
    if (
      vn &&
      vn.parent &&
      vn.parent.componentOptions && vn.parent.componentOptions.tag == 'keep-alive'
    ) {
      this.loadStartMenu();
    }
    // 二级页签的起始菜单加载
    if (
      vn &&
      vn.componentOptions &&
      (vn.componentOptions.tag == "dist-side-tab" ||
        vn.componentOptions.tag == "DistSideTab")
    ) {
      this.loadStartMenu();
    }
  },
  destroyed() {
    this.Event.$destroy();
  }
};

export default mixin;
