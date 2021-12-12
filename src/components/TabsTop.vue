<!--
 * @Description:
 * @Version: 1.0
 * @Autor: zhaoyy1
 * @Date: 2019-08-23 11:18:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-05 15:54:59
-->
<template>
  <div class="theme">
    <el-tabs
      v-model="activeIndex"
      type="border-card"
      v-if="openTab.length"
      @tab-click="tabClick"
      @tab-remove="tabRemove"
      style="background:#fff;padding-bottom: 10px;height:100%;"
    >
      <el-tab-pane
        :key="item.path"
        v-for="item in openTab"
        :label="item.label || item.name"
        :name="item.path"
        :closable="openTab && openTab.length > 1"
      ></el-tab-pane>
      <keep-alive>
        <router-view :key="$route.fullPath" class="pageStyle"></router-view>
      </keep-alive>
      <!-- <router-view class="pageStyle"></router-view> -->
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { mapState } from "vuex";

export default {
  data() {
    return {
      EventTopTabClose: "TopTabClose",
      EventTopTabFocus: "TopTabFocus",
      FuncBeforeTopTabClose: "beforeTopTabClose",
      isTopTabs: true,
      tabClosable: false,
      keepAliveCtrl: null
    };
  },
  props: {
    startInfo: {
      type: Object,
      default: () => {
        return {
          parentFullPath: "",
          targetFullPath: "",
          targetName: "",
          targetPath: "",
          query: {},
          params: {}
        };
      }
    }
  },
  computed: {
    ...mapGetters(["getsiderMenus"]),
    ...mapGetters(["openTab"]),
    ...mapState(["activeTab"]),
    activeIndex: {
      get() {
        return this.activeTab.path;
      },
      set(val) {}
    }
  },
  methods: {
    ...mapMutations(["remove_tab", "add_tabs", "set_active_tab"]),
    //tab标签点击时切换路由
    tabClick(tab, event) {
      this.__setKeepAliveCtrl2();
      let tabItem = this.findTab(tab.name);
      this.showTab(tabItem);
    },
    //不需要提示的关闭顶层页签方法 mxq 增：2019.12.2
    toTabRemove(targetName, isOpenDefault) {
      this.__setKeepAliveCtrl2();
      let tab = this.findTab(targetName),
        newTab = null;
      if (tab.path == this.activeIndex) {
        let tabs = this.openTab,
          len = tabs.length;
        let idx = tabs.indexOf(tab);
        if (len > 1) {
          newTab = idx == len - 1 ? tabs[idx - 1] : tabs[idx + 1];
        }
      }
      if (this.__beforeTabRemove(tab) === false) {
        return;
      }
      this.remove_tab(tab);
      if (tab.path == this.activeIndex) {
        if (newTab) {
          this.showTab(newTab);
        } else if (isOpenDefault !== false) {
          this.__openMenuDefault();
        }
      }
      this.__clearCache(targetName);
      // this.__setKeepAliveCtrl2();
      // let tab = this.findTab(targetName),
      //   newTab = null;
      // if (tab.path == this.activeIndex) {
      //   let tabs = this.openTab,
      //     len = tabs.length;
      //   let idx = tabs.indexOf(tab);
      //   if (len > 1) {
      //     newTab = idx == len - 1 ? tabs[idx - 1] : tabs[idx + 1];
      //   }
      // }
      // if (this.__beforeTabRemove(tab) === false) {
      //   return;
      // }
      // this.remove_tab(tab);
      // if (tab.path == this.activeIndex) {
      //   if (newTab) {
      //     this.showTab(newTab);
      //   } else if (isOpenDefault !== false) {
      //     this.__openMenuDefault();
      //   }
      // }
      // this.__clearCache(targetName);
    },
    //移除tab标签
    tabRemove(targetName) {
      if (this.$route.params.guid == "new") {
        this.$alert("请先保存", "提示", {
          confirmButtonText: "确定"
        });
        this.$confirm("新建案件还未保存, 是否确认关闭?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.toTabRemove(targetName);
          })
          .catch(() => {});
      } else {
        this.toTabRemove(targetName);
      }
    },
    findMenuByIndex(index) {
      let data = this.getsiderMenus || [];
      let menu = this.findOneInTree(data, function(node) {
        return node.index == index;
      });
      return menu;
    },
    __beforeTabRemove(tab) {
      let ctl = this.__findTabComponent(tab.path);
      if (ctl && typeof ctl[this.FuncBeforeTopTabClose] == "function") {
        if (ctl[this.FuncBeforeTopTabClose](tab) === false) {
          return false;
        }
      }
      if (ctl) ctl.$emit(this.EventTopTabClose, tab);
      return true;
    },
    __getRoutePath(path) {
      if (!/^\//.test(path)) {
        path = this.startInfo.parentFullPath + "/" + path;
      }
      return path;
    },
    __getMenuByIndex(fullPath) {
      // 根据路由查找菜单
      let data = this.getsiderMenus || [];
      while (data && data.length > 0) {
        let next = [];
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          if (this.__getRoutePath(item.index) == fullPath) {
            return item;
          } else {
            next.push.apply(next, item.children || []);
          }
        }
        data = next;
      }
      return null;
    },
    __findDefaultMenu() {
      // 查找默认的菜单
      let data = this.getsiderMenus || [];
      let menu = this.findOneInTree(data, function(node) {
        return node.active && node.hidden !== true;
      });
      if (!menu) {
        menu = this.findOneInTree(data, function(node) {
          return node.index && node.hidden !== true;
        });
      }
      return menu;
    },
    __getRoutePath(path) {
      if (!/^\//.test(path)) {
        path = this.startInfo.parentFullPath + "/" + path;
      }
      return path;
    },
    __findTabComponent(key) {
      this.__setKeepAliveCtrl2();
      if (this.keepAliveCtrl) {
        key = this.__findKey(this.keepAliveCtrl.keys, key);
        let idx = this.keepAliveCtrl.keys.indexOf(key);
        if (idx != -1) {
          let vc = this.keepAliveCtrl.cache[key];
          return vc.componentInstance;
        }
      }
    },
    __findKey(keys, key) {
      let idx = this.keepAliveCtrl.keys.indexOf(key);
      if (idx != -1) return key;
      idx = this.keepAliveCtrl.keys.indexOf(decodeURI(key));
      if (idx != -1) return decodeURI(key);
      idx = this.keepAliveCtrl.keys.indexOf(encodeURI(key));
      if (idx != -1) return encodeURI(key);

      for (let i = 0; i < keys.length; i++) {
        if (keys[i].startsWith(key + "?")) {
          key = keys[i];
          break;
        }
      }
      return key;
    },
    __clearCache(key) {
      this.__setKeepAliveCtrl2();
      if (this.keepAliveCtrl) {
        key = this.__findKey(this.keepAliveCtrl.keys, key);
        let idx = this.keepAliveCtrl.keys.indexOf(key);
        if (idx != -1) {
          let vc = this.keepAliveCtrl.cache[key];
          delete this.keepAliveCtrl.cache[key];
          this.keepAliveCtrl.keys.splice(idx, 1);
          vc.componentInstance.$destroy();
        }
      }
    },
    __clearNotMatch() {
      if (!this.keepAliveCtrl) return;
      let keys = [];
      for (let i = 0; i < this.keepAliveCtrl.keys.length; i++) {
        let key = this.keepAliveCtrl.keys[i];
        if (!this.hasTab(key)) {
          keys.push(key);
        }
      }

      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        this.__clearCache(key);
      }
    },
    __setKeepAliveCtrl(components, key, depth, curDepth) {
      // 已存在，不再继续查找
      if (this.keepAliveCtrl) return;
      depth = depth || 5;
      curDepth = curDepth || 1;
      // 次数超限，不再继续
      if (curDepth > depth) return;
      let next = [],
        rst = null;
      for (let i = 0; i < components.length; i++) {
        let comp = components[i],
          vnode = comp.$vnode;
        if (
          vnode.key !== key ||
          !vnode.parent ||
          !vnode.parent.componentOptions ||
          // vnode.parent.componentOptions.tag !== "keep-alive" ||
          !vnode.parent.componentInstance
        ) {
          if (comp.$children && comp.$children.length > 1) {
            next.push.apply(next, comp.$children);
          }
          continue;
        }
        let kaComp = vnode.parent.componentInstance;
        if (kaComp.cache && kaComp.keys && kaComp.keys.indexOf(key) != -1) {
          rst = kaComp;
          break;
        } else {
          if (comp.$children && comp.$children.length > 1) {
            next.push.apply(next, comp.$children);
          }
        }
      }
      if (!rst) {
        this.__setKeepAliveCtrl(next, key, depth, curDepth + 1);
      } else {
        this.keepAliveCtrl = rst;
      }
    },
    __setKeepAliveCtrl2() {
      if (!this.keepAliveCtrl && this.hasTab()) {
        for (let i = 0; i < this.openTab.length; i++) {
          let tab = this.openTab[i];
          this.__setKeepAliveCtrl(this.$children, tab.path);
          if (this.keepAliveCtrl) break;
        }
      }
    },
    hasTab(key) {
      if (key === undefined) {
        return this.openTab && this.openTab.length > 0;
      } else {
        return this.findTab(key) ? true : false;
      }
    },
    findTab(tabKey) {
      if (!tabKey) return null;
      if (typeof tabKey === "object") tabKey = tabKey.path;
      tabKey = this.__getRoutePath(tabKey);
      let tab = null,
        tabs = this.openTab;
      if (tabs && tabs.length > 0) {
        for (let i = 0; i < tabs.length; i++) {
          let path1 = this.__getRoutePath(tabs[i].path),
            path2 = decodeURI(path1),
            path3 = encodeURI(path1);
          if (path1 == tabKey || path2 == tabKey || path3 == tabKey) {
            tab = tabs[i];
            break;
          }
        }
      }
      return tab;
    },
    showTab(tab) {
      this.__setKeepAliveCtrl2();
      tab.label = tab.label || tab.name;
      tab.path = tab.path || tab.route;
      if (tab.path) tab.path = this.__getRoutePath(tab.path);

      if (this.$route.fullPath != tab.path) {
        this.__clearNotMatch();
        let _this = this;
        let route = { params: tab.params || {}, query: tab.query || {} };
        if (tab.routeName) {
          route.name = tab.routeName;
        } else if (tab.path) {
          route.path = tab.path;
        } else if (tab.name) {
          tab.routeName = route.name = tab.routeName || tab.name;
        }
        if (!tab.path) tab.path = "t_" + new Date().getTime();
        this.$router.push(route, function(params) {
          if (tab.path != params.fullPath) {
            tab.path = params.fullPath;
          }
          if (params.params) tab.params = params.params;
          if (params.query) tab.query = params.query;
          _this.__setActiveTab(tab);
        });
      } else {
        this.__setActiveTab(tab);
      }
    },
    __setActiveTab(tab) {
      let itab = this.findTab(tab);
      if (!itab) {
        this.__label(tab);
        this.add_tabs(tab);
      }
      if (itab && tab.path != this.activeIndex) {
        let ctl = this.__findTabComponent(itab.path);
        if (ctl) ctl.$emit(this.EventTopTabFocus, tab);
      }
      this.set_active_tab(tab);
    },
    __label(tab) {
      tab.label = tab.label || tab.name;
      let ss = window.sessionStorage || window.localStorage;
      if (ss) {
        if (tab.label && tab.label != "（未命名）") {
          let key = "title_" + decodeURI(tab.path);
          ss.setItem(key, tab.label);
        } else {
          let key1 = "title_" + tab.path,
            key2 = encodeURI(key1),
            key3 = decodeURI(key1);
          tab.label =
            ss.getItem(key1) || ss.getItem(key2) || ss.getItem(key3) || "";
        }
      }
    },
    __openRouteDefault() {
      let menu = this.__getMenuByIndex(this.startInfo.targetFullPath);
      if (menu && menu.hidden === true) {
        return;
      }
      if (this.startInfo.targetFullPath) {
        menu = menu || {};
        let tab = {
          path: this.startInfo.targetFullPath,
          label: menu.childtitle || "（未命名）",
          name: this.startInfo.targetName,
          routeName: this.startInfo.targetName,
          type: menu.childtitle ? "isMenu" : "single", //jyb增
          params: this.startInfo.params,
          query: this.startInfo.query
        };
        this.__label(tab);
        this.showTab(tab);
      }
    },
    __openMenuDefault() {
      let menu = this.__findDefaultMenu();
      if (menu) {
        let tab = {
          path: menu.index,
          label: menu.childtitle || "（未命名）",
          type: "single"
        };
        this.showTab(tab);
      }
    }
  },
  mounted() {
    this.__openRouteDefault();
    if (!this.hasTab()) {
      this.__openMenuDefault();
    }
  }
};
</script>

<style lang="scss">
.theme {
  height: 100%;
  overflow: hidden;
  > .el-tabs {
    height: 100%;
    display: flex;
    flex-direction: column;
    > .el-tabs__content {
      height: 100%;
      width: 100%;
      overflow: hidden;
      padding: 0;
      > .el-tab-pane {
        display: none;
      }
    }
  }
}
</style>
