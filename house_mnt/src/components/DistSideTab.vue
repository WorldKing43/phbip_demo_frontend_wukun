<template>
  <el-container class="dist-side-tab">
    <el-main>
      <DistTabs ref="tabsCtrl" :tabs="tabs" :params="params" :onTabChange="__onTabChange"></DistTabs>
    </el-main>
    <el-aside>
      <DistNavMenu
        v-if="data.children.length > 0"
        ref="menuCtrl"
        :data="data"
        :header="header"
        :activeId="activeId"
        :onItemClick="__onItemClick"
      ></DistNavMenu>
    </el-aside>
  </el-container>
</template>

<script>
import DistNavMenu from "./DistNavMenu.vue";
import DistTabs from "./DistTabs.vue";

export default {
  components: {
    DistNavMenu,
    DistTabs
  },
  data() {
    return {
      activeId: "",
      tabs: [],
      data: {
        children: []
      },
      __showDefault: true
    };
  },
  props: {
    header: {
      type: Object,
      default: () => {
        return { label: "导航", hidden: false };
      }
    },
    showDefault: {
      type: Boolean,
      default: true
    },
    menu: {
      children: []
    },
    params: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    openDefault() {
      this.__showDefault = true;
      if (this.menu) {
        this.__openDefault(this.data.children);
      }
    },
    findTab(tabId) {
      return this.$refs.tabsCtrl.findTab(tabId);
    },
    findMenu(menuId) {
      let menuItem = null;
      if (menuId) menuItem = this.__findMenu(this.data.children, menuId);
      return menuItem;
    },
    openMenu(menuId) {
      let menuItem = this.findMenu(menuId);
      if (menuItem) this.$refs.tabsCtrl.openTab(menuItem);
    },
    __onItemClick(menuItem, $event) {
      if (this.$route.params.guid == "new") {
        this.$alert("请先保存", "提示", {
          confirmButtonText: "确定"
        });
      } else {
        this.$refs.tabsCtrl.openTab(menuItem);
      }
    },
    __onTabChange(tab, oldTab) {
      this.activeId = (tab.meta || {}).menuId || (tab || {}).id || "";
      this.$emit("onTabChange", tab, oldTab);
    },
    __findMenu(menuItems, menuId) {
      let first = null;
      if (menuItems && menuItems.length > 0) {
        for (let i = 0; i < menuItems.length; i++) {
          let mi = menuItems[i];
          if (mi.id == menuId && mi.type != "group" && mi.type != "submenu") {
            first = mi;
          } else {
            first = this.__findMenu(mi.children, menuId);
          }
          if (first) break;
        }
      }
      return first;
    },
    __findFirst(menuItems) {
      let first = null;
      if (menuItems && menuItems.length > 0) {
        for (let i = 0; i < menuItems.length; i++) {
          let mi = menuItems[i];
          if (
            mi.type != "group" &&
            mi.type != "submenu" &&
            mi.hidden !== true
          ) {
            first = mi;
          } else {
            first = this.__findFirst(mi.children);
          }
          if (first) break;
        }
      }
      return first;
    },
    __findDefault(menuItems) {
      let menuItem = null;
      if (menuItems && menuItems.length > 0) {
        for (let i = 0; i < menuItems.length; i++) {
          let mi = menuItems[i];
          if (
            mi.type != "group" &&
            mi.type != "submenu" &&
            mi.active &&
            mi.hidden !== true
          ) {
            menuItem = mi;
          } else {
            menuItem = this.__findDefault(mi.children);
          }
          if (menuItem) break;
        }
      }
      return menuItem;
    },
    __openDefault(menuItems) {
      // tab组件未加载、菜单项为空、Tab已存在内容，则不打开默认页
      if (
        !this.$refs.tabsCtrl ||
        !menuItems ||
        menuItems.length == 0 ||
        (this.tabs && this.tabs.length > 0)
      ) {
        return;
      }
      let menuItem = this.__findDefault(menuItems);
      if (!menuItem) menuItem = this.__findFirst(menuItems);
      if (menuItem) this.$refs.tabsCtrl.openTab(menuItem);
    },
    __merge(itemArray) {
      itemArray = itemArray || [];
      let newItems = [];
      for (let i = 0; i < itemArray.length; i++) {
        let item = itemArray[i];
        if (!item) continue;
        let iMenu = this.__findMenu(this.data.children, item.id);
        if (!iMenu) {
          this.loadMenuItemPermission(item);
          newItems.push(item);
        }
      }
      this.data.children.push.apply(this.data.children, newItems);
    }
  },
  watch: {
    "menu.children": function(val, oldVal) {
      this.__merge(val);
      if (
        (!oldVal || oldVal.length == 0) &&
        val &&
        val.length > 0 &&
        this.__showDefault
      ) {
        this.__openDefault(val);
      }
    },
    showDefault: function(val, oldVal) {
      this.__showDefault = val;
    }
  },
  mounted() {
    this.__showDefault = this.showDefault;
    if (this.menu) {
      this.__merge(this.menu.children);
    }
    if (this.menu && this.__showDefault) {
      this.__openDefault(this.data.children);
    }
  }
};
</script>

<style lang="scss">
.dist-side-tab {
  > .el-main {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
  .el-aside {
    margin-left: 15px;
    width: 218px !important;
  }
}
</style>
