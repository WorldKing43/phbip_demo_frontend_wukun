<template>
  <el-container class="dist-nav-menu">
    <el-header v-show="!header.hidden">
      <span>{{header.label}}</span>
    </el-header>
    <el-main>
      <el-menu :default-openeds="openeds">
        <dist-nav-item
          v-for="item in data.children"
          :key="item.id"
          :data="item"
          :activeId="activeId"
          :onItemClick="onItemClick"
        ></dist-nav-item>
      </el-menu>
    </el-main>
  </el-container>
</template>

<script>
import DistNavItem from "./DistNavItem.vue";

export default {
  name: "DistNavMenu",
  data() {
    return {
      openeds: []
    };
  },
  props: {
    activeId: {
      type: String,
      default: ""
    },
    header: {
      type: Object,
      default: () => {
        return { label: "导航", hidden: false };
      }
    },
    data: {
      children: []
    },
    onItemClick: Function
  },
  methods: {
    expandFirst() {
      if (this.data && this.data.children) {
        for (let i = 0; i < this.data.children.length; i++) {
          var item = this.data.children[i];
          if (this.openeds.indexOf(item.id) == -1) {
            this.openeds.push(item.id);
          }
        }
      }
    }
  },
  components: {
    "dist-nav-item": DistNavItem
  },
  watch: {
    "data.children": function(val, oldVal) {
      this.expandFirst();
    }
  },
  mounted() {
    this.expandFirst();
  }
};
</script>

<style lang="scss">
.dist-nav-menu {
  min-height: 400px;
  > .el-header {
    height: 40px !important;
    background: #409eff;
    line-height: 40px;
    color: #fff;
    .pack-up {
      cursor: pointer;
    }
  }
  > .el-main {
    border: 1px solid #d9e2f8;
    background: white;
    margin: 0;
    padding: 0;
    .el-menu {
      .el-menu-item {
        height: 40px;
        line-height: 40px;
      }
      .el-menu-item.is-active {
        border-bottom: 1px solid #409eff;
      }
      .el-submenu__title,
      .el-menu-item {
        text-align: left;
      }
    }
  }
}
</style>

