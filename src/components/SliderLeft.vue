<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: 金雅蓓
 * @Date: 2019-08-09 10:18:38
 * @LastEditors  : 金雅蓓
 * @LastEditTime : 2019-12-27 10:46:40
 -->
<template>
  <div class="slider-left">
    <el-menu
      ref="menu"
      :default-active="defaultActive"
      class="slider"
      background-color="#fff"
      unique-opened
      :collapse="isCollapse"
    >
      <div class="logo" v-show="isShow">
        <img :src="picSrc" />
        <p>房源管理</p>
      </div>
      <template v-for="(item,index) in menuTree">
        <el-menu-item
          v-if="item.index"
          :key="item.id"
          :index="item.index"
          v-show="item.hidden !== true"
          @click="addTabs(item)"
        >
          <template slot="title">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.icon" />
            </svg>
            <span>{{item.title}}</span>
          </template>
        </el-menu-item>
        <el-submenu v-else :key="index" :index="item.id">
          <template slot="title">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.icon" />
            </svg>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item-group v-show="item.hidden !== true">
            <el-menu-item
              v-for="(child,index) in item.children"
              :key="index"
              :index="child.index"
              v-show="child.hidden !== true"
              @click="addTabs(child)"
            >{{child.childtitle}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  name: "Slider",
  data() {
    return {
      activeIndex: "",
      picSrc: require("../../static/image/house-mnt.svg"),
      isCollapse: false,
      isShow: true //是否显示logo
    };
  },
  computed: {
    ...mapState(["activeTab", "remove_tab"]),
    ...mapGetters(["getsiderMenus"]),
    openTab() {
      return this.$store.state.openTab;
    },
    defaultActive: {
      get() {
        let tab = this.activeTab,
          count = 0,
          to = tab.path,
          menu = null;
        while (!menu && to && count < 100) {
          count++;
          menu = this.findOneInTree(this.getsiderMenus, function(node) {
            return node.index == to;
          });
          if (!menu) {
            to = this.findRouteFrom(to);
          }
        }
        if (menu) {
          this.activeIndex = menu.index;
        }
        return this.activeIndex;
      }
    },
    menuTree: {
      get() {
        let data = JSON.parse(JSON.stringify(this.getsiderMenus));
        let tree = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].hidden !== true) {
            tree.push(data[i]);
          }
        }
        return tree;
      }
    }
  },

  methods: {
    addTabs(val) {
      let tab = {
        path: val.index,
        label: val.childtitle || val.title || "(未命名)",
        type: "isMenu"
      };
      this.openTopTab(tab);
      // let flag = false;
      // if (this.openTab.length > 1) {
      //   for (var i in this.openTab) {
      //     if (this.openTab[i].path == val.index) {
      //       this.$store.commit("set_active_index", val.index);
      //       break;
      //     } else {
      //       this.$refs.menu.activeIndex = this.defaultActive;
      //     }
      //   }
      // } else {
      // for (let item of this.openTab) {
      //   if (item.path === val.index) {
      //     this.$store.commit("set_active_index", val.index);
      //     console.log("左侧菜单栏提示：是已经打开的页面地址");
      //     flag = true;
      //     break;
      //   }
      // }
      // if (!flag) {
      //   this.$store.commit("add_tabs", {
      //     path: val.index,
      //     label: val.childtitle,
      //     type: "isMenu"
      //   });
      //   this.$store.commit("set_active_index", val.index);
      // }
      // }
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss">
.slider-left {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  .logo {
    width: 170px;
    padding: 20px;
    text-align: center;
    img {
      display: inline-block;
    }
    p {
      font-size: 18px;
      font-weight: bold;
      color: #777;
      margin-top: 10px;
    }
  }
  .el-menu-item-group__title {
    padding: 0;
  }
  .el-menu-item.is-active {
    background-color: rgba(49, 193, 248, 0.1) !important;
    border-right: 2px solid rgba(49, 193, 248, 1);
  }
}
</style>

