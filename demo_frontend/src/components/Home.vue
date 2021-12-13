<template>
  <div class="home">
    <el-container>
      <el-aside :style="{width:menuWidth + 'px'}">
        <slider-left @childByValue="childByValue"></slider-left>
      </el-aside>
      <el-main>
        <tabs-top ref="tabsTopCtrl" :startInfo="startInfo"></tabs-top>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import SliderLeft from "@/components/SliderLeft";
import TabsTop from "@/components/TabsTop";
export default {
  name: "Home",
  components: {
    SliderLeft,
    TabsTop
  },
  data() {
    return {
      startInfo: {
        parentFullPath: "",
        targetFullPath: "",
        targetName: "",
        targetPath: "",
        params: {},
        query: {}
      },
      menuState: "",
      menuWidth: 200
    };
  },
  methods: {
    childByValue: function(childValue) {
      this.menuState = childValue;
      if (childValue == false) {
        this.menuWidth = 200;
      } else {
        setTimeout(() => {
          this.menuWidth = 64;
        }, 200);
      }
    },
    __getFocusRoute() {
      // 当前界面对应的路由
      let matched = this.$route.matched;
      let route = null;
      if (matched) {
        for (let i = 0; i < matched.length; i++) {
          let inst = matched[i].instances;
          if (inst && inst.default == this) {
            route = matched[i];
            break;
          }
        }
      }
      return route;
    },
    __calcRoutePath(path, params) {
      // 计算路由的真实路径
      if (!path) return path;
      params = params || {};
      let regex = /\/:([^\/:]+)/g;
      let newText = "",
        startIndex = 0,
        execr = null;
      while ((execr = regex.exec(path)) !== null) {
        newText += path.substring(startIndex, execr.index);
        newText += "/" + params[execr[1]] || "";
        startIndex = regex.lastIndex;
      }
      newText += path.substring(startIndex);
      return newText;
    },
    __startInfo() {
      let matched = this.$route.matched;
      let focusRoute = this.__getFocusRoute();
      let idx = matched.indexOf(focusRoute);
      this.startInfo.params = this.$route.params || {};
      this.startInfo.query = this.$route.query || {};
      this.startInfo.parentFullPath = this.__calcRoutePath(
        focusRoute.path,
        this.$route.params
      );
      if (idx < matched.length - 1) {
        let route = matched[matched.length - 1];
        this.startInfo.targetFullPath = this.$route.fullPath;
        this.startInfo.targetName = route.name;
        this.startInfo.targetPath = this.startInfo.targetFullPath.substring(
          this.startInfo.parentFullPath.length + 1
        );
      }
    }
  },
  created() {
    this.__startInfo();
  }
};
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  > .el-container {
    width: 100%;
    height: 100%;
    > .el-main {
      padding: 0;
      overflow: hidden;
      background: #f7f8f8;
    }
    > .el-aside {
      overflow: hidden;
    }
  }
}
</style>