<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import http from "./api/houseApproval";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: false
    };
  },
  computed: {
    ...mapGetters(["getsiderMenus"])
  },
  methods: {
    //添加一个刷新页面的功能
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    getOpenPermission() {
      let params = {
        key: "dist.phbip.auth.enabled"
      };
      http
        .getOpenPermission(params)
        .then(res => {
          console.log(res);
          if (res == "false") {
            this.isRouterAlive = true;
          } else {
            // 获取并完成权限的处理
            this.getPermission();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getPermission() {
      var _params = {};
      http.getPermission(_params).then(res => {
        let permissionData = this.preparePermission(res);
        this.$root.permission = permissionData;
        this.processTopMenu(permissionData.pathMap);
        this.$store.commit("setallButtons", { myData: permissionData.buttons });
        this.isRouterAlive = true;
      });
    },
    preparePermission(data) {
      // 准备权限数据
      data = data || [];
      let pmap = {},
        ptree = [],
        buttons = [],
        menus = [],
        pathMap = {};
      // 第一次循环，GUID与功能项的映射、菜单、按钮
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        pmap[item.guid] = item;
        if (item.internalType == "2") {
          buttons.push(item);
        } else if (item.internalType == "1") {
          menus.push(item);
        }
      }
      // 第二次循环，构建功能树形结构
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        if (pmap[item.parentGuid]) {
          pmap[item.parentGuid].children = pmap[item.parentGuid].children || [];
          pmap[item.parentGuid].children.push(item);
        } else {
          ptree.push(item);
        }
      }
      // 树形结构遍历，完成功能路径映射
      this.treeEach(ptree, (node, parent) => {
        let path = parent ? parent.treePath + "->" : "";
        node.treePath = path + node.name;
        pathMap[node.treePath] = node;
      });
      return {
        buttons: buttons,
        menus: menus,
        pathMap: pathMap,
        treeData: ptree
      };
    },
    processTopMenu(permissionPathMap) {
      // 处理顶层菜单权限
      permissionPathMap = permissionPathMap || {};
      let menuTree = this.getsiderMenus || [];
      // menuTree = JSON.parse(JSON.stringify(menuTree));
      let menuMap = {};

      // 遍历菜单树，构建菜单路径映射
      this.treeEach(menuTree, (node, parent) => {
        let path = parent ? parent.treePath + "->" : "";
        node.treePath = path + (node.childtitle || node.title);
        menuMap[node.treePath] = node;
      });

      // 处理菜单权限
      this.treeEach(menuTree, (node, parent) => {
        // 没有权限的菜单项，隐藏菜单
        node.hidden = !permissionPathMap[node.treePath];
      });

      this.$store.commit("setsiderMenu", { myData: menuTree });
    },
    //loading
    loading() {
      this.$loading = ({
        lock: true,
        text: '拼命加载中，请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    }
  },
  created() {
    if (this.$root.enablePermission) {
      this.getOpenPermission();
    } else {
      this.isRouterAlive = true;
    }
  },
  mounted() {}
};
</script>

<style>
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #666;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
}
html,
body,
#app {
  height: 100%;
  width: 100%;
}
#app .el-input .el-input__inner,
#app .el-textarea .el-textarea__inner,
#app .is-disabled .el-input__inner,
#app input {
  color: #666;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
}
/* */
#app .el-table td,
#app .el-table th {
  color: #606266;
  padding: 9px 0;
  font-size: 14px;
}
#app .el-submenu__title {
  color: #424242;
}
#app .el-submenu__title:hover,
.el-menu-item:hover {
  background-color: #fff !important;
  color: rgb(64, 158, 255);
}
body::-webkit-scrollbar {
  display: none;
}
body .el-table th.gutter {
  display: table-cell !important;
}
body .el-table colgroup.gutter {
  display: table-cell !important;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
/******设置loading加载框样式******/
body .el-loading-spinner {
  font-size: 30px;
}
body .el-loading-spinner .el-loading-text {
  font-size: 16px;
}
/* body .el-loading-mask{
  width: 110%;
} */
.el-message--success p,
.el-message--warning p,
.el-message--info p {
  font-size: 24px;
}

.el-icon-success,
.el-icon-warning,
.el-icon-info {
  font-size: 24px;
}

.el-dialog__header {
  padding: 10px 20px 10px 20px;
  background: #0b7ef7;
}
.el-dialog__headerbtn {
  top: 15px;
}
.el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
.el-dialog__title {
  color: #fff !important;
}
.el-dialog__body {
  padding: 20px;
  height: calc(100% - 100px);
  overflow: auto;
}
.el-select {
  width: 100%;
}
</style>
