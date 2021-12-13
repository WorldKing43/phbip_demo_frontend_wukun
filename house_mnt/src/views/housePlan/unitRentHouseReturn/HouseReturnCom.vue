<!--双击进入批次详情界面-->
<template>
  <div class="newReport">
    <!--头部-->
    <!-- 基本信息 -->
    <div class="basicTable">
      <!-- <div class="content">
        <el-tabs
          v-model="activeIndex1"
          type="border-card"
          closable
          v-if="openTab1&&openTab1.length"
          @tab-click="tabClick"
          @tab-remove="tabRemove"
          style="height:100%;background:#fff"
        >
          <el-tab-pane
            :key="item.path"
            v-for="(item) in openTab1"
            :label="item.name"
            :name="item.path"
          >
          </el-tab-pane>
          <router-view></router-view>
        </el-tabs>
      </div>
      <div class="siderbar">
        <SliderRight></SliderRight>
      </div>-->
      <dist-side-tab :menu="menu" :params="params"></dist-side-tab>
    </div>
  </div>
</template>

<script>
import DistSideTab from "@/components/DistSideTab";
import { mapGetters, mapState } from "vuex";

export default {
  name: "houseReturnCom",
  components: {
    SliderRight
  },
  data() {
    return {
      isShow: true,
      titleName: "",
      show: false,
      //页签参数  mxq
      params: {},
      menu: {
        children: [{}]
      }
    };
  },
  computed: {
    ...mapGetters(["getReturnHouseGuid"]),
    openTab1() {
      return this.$store.state.openTab1;
    },
    activeIndex1: {
      get() {
        return this.$store.state.activeIndex1;
      },
      set(val) {
        this.$store.commit("set_active_index1", val);
      }
    },
    openTab() {
      return this.$store.state.openTab;
    },
    activeIndex: {
      get() {
        return this.$store.state.activeIndex;
      },
      set(val) {
        this.$store.commit("set_active_index", val);
      }
    }
  },
  methods: {
    //tab标签点击时切换路由
    tabClick(tab) {
      // console.log(this.openTab);
      this.$router.push({ path: this.activeIndex1 });
      this.$store.commit("setIndexToOpenTab", {
        activeIndex: this.activeIndex,
        childActiveIndex: this.activeIndex1
      }); //将activeIndex1存入openTab中相应的childActiveIndex中
    },
    //移除tab标签
    tabRemove(targetName) {
      // console.log("二级tabs删除：", targetName);
      // 首页不删
      if (targetName == "/") {
        return;
      }
      this.$store.commit("delete_tabs1", {
        targetName: targetName,
        activeIndex: this.activeIndex
      });
      if (this.activeIndex1 === targetName) {
        //设置当前激活的路由
        if (this.openTab1 && this.openTab1.length >= 1) {
          this.$store.commit(
            "set_active_index1",
            this.openTab1[this.openTab1.length - 1].path
          );
          this.$store.commit("setIndexToOpenTab", {
            activeIndex: this.activeIndex,
            childActiveIndex: this.activeIndex1
          }); //^将activeIndex1存入openTab中相应的childActiveIndex中
          this.$router.push({ path: this.activeIndex1 });
        } else {
          // this.$router.push({ path: "/" });
        }
      }
      let arr = this.openTab;
      if (this.openTab1.length == 0) {
        for (let item of arr) {
          if (item.route === this.activeIndex) {
            this.$store.commit("delete_tabs", this.activeIndex);
            break;
          }
        }
        this.$router.push({ path: arr[arr.length - 1].route }); ///删除到最后一个二级tab时，这里开始跳转
        this.$store.commit(
          "set_active_index",
          this.openTab[this.openTab.length - 1].route
        );
        //判断此时的activeIndex对应的type是否为menu
        let flag = false;
        this.openTab.forEach(element => {
          if (this.activeIndex == element.route && element.type == "isMenu") {
            // console.log("我是菜单类型的tab");
            flag = true;
          }
        });
        if (!flag) {
          // console.log("我是一般的tab");
          this.$store.commit("changeChildOpenTab", {
            activeIndex: this.activeIndex,
            openTab: this.openTab
          }); //返回与一级tab中activeIndex相应的数据给到opentab1
          this.$store.commit("setChildActiveIndex", {
            activeIndex: this.activeIndex
          }); //设置子级的active
          this.$router.push({ path: this.activeIndex1 });
          this.$store.commit("changeGuid", {
            activeIndex: this.activeIndex,
            name: this.activeIndex1
          }); //---传入一二级tab的activeIndex去更改guid
        }
      }
    }
  },
  created() {
    this.$store.commit("changeChildOpenTab", {
      activeIndex: this.activeIndex,
      openTab: this.openTab
    }); //返回与一级tab中activeIndex相应的数据给到opentab1
    this.$store.commit("houseReturnList", {
      path: this.$route.path,
      openTab: this.openTab1
    }); //进入到该页面时，sliderCon默认将导航的第一条数据添加到openTabs1中
    this.$store.commit("setIndexToOpenTab", {
      activeIndex: this.activeIndex,
      childActiveIndex: this.activeIndex1
    }); //将activeIndex1存入openTab中相应的childActiveIndex中
    this.$store.commit("setGuid", {
      activeIndex: this.activeIndex,
      guidData: { name: "returnHouseGuid", guid: this.$route.query.signGuid }
    }); //++保存小区的guid和当前的activeIndex1
    // this.$store.commit("setGuid", {
    //   activeIndex: this.activeIndex,
    //   guidData: { name: "ApprovalInfoCode", guid: this.$route.query.code }
    // }); //++保存小区的code和当前的activeIndex1
  }
};
</script>

<style  lang="scss"  scoped>
.newReport {
  .top {
    padding: 5px 0 20px 0; /* 更改头部按钮高度 */
    display: flex;
    justify-content: space-between;
    & /deep/ .el-dialog__header {
      background: #057ff8;
    }
    & /deep/ .el-dialog__title {
      color: #fff;
    }
    & /deep/ .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
    .left {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

  .basicTable {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .content {
      width: 85%;
      margin-right: 20px;
      .border-bottom {
        border-bottom: 1px solid #ccc;
        height: 30px;
        .trapezoid {
          /*设置梯形*/
          position: relative;
          display: inline-block;
          color: #59a3f6;
          padding: 5px 40px 5px 20px;
          z-index: 1;
          border-bottom: 1px solid #fff;
          border-left: 1px solid #ccc;
          .el-icon-error {
            color: red;
            margin-left: 10px;
          }
        }
        .trapezoid::before {
          /*设置梯形*/
          content: ""; /*用伪元素来生成一个矩形*/
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: -1;
          border-right: 1px solid #ccc;
          transform: scaleY(1.3) perspective(0.5em) rotateX(3deg);
          transform-origin: bottom left;
          border-top: 3px solid #2386f2;
          background: #fff;
        }
      }
      .con {
        background: #fff;
        border: 1px solid #ccc;
        border-top: none;
        height: 100%;
        .padding-10 {
          padding: 20px;
        }
      }
    }
    .siderbar {
      .sider-top {
        height: 40px;
        background: #2386f2;
        color: #fff;
        font-size: 1.2em;
        line-height: 40px;
        padding-left: 20px;
      }
    }
  }
  & /deep/ .el-dialog__header {
    padding: 10px 20px 10px 20px;
    background: #0b7ef7;
  }
  & /deep/ .el-dialog__headerbtn {
    top: 15px;
  }
  & /deep/ .el-dialog__title {
    color: #fff;
  }
  & /deep/ .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  & /deep/ .el-dialog__body {
    padding: 20px;
  }
}

.basicTable /deep/ .el-tabs__item {
  // 设置梯形
  position: relative;
  display: inline-block;
  color: #909399;
  padding: 5px 40px 5px 20px;
  z-index: 1;
  border-bottom: 1px solid #fff;
  border-left: 1px solid #ccc;
  border-right: none;
}
.basicTable /deep/ .el-tabs__item::before {
  //设置梯形
  content: ""; //用伪元素来生成一个矩形
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  border-right: 1px solid #ccc;
  transform: scaleY(1.3) perspective(0.5em) rotateX(3deg);
  transform-origin: bottom left;
  border-top: 2px solid #2386f2;
  background: #fff;
}
</style>
