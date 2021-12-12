<!--计划指定-->
<template>
  <div class="newPlan">
    <div class="content">
      <!--头部-->
      <div class="top">
        <div class="left">
          <el-button
            type="primary"
            size="small"
            @click="checkLog = true"
            v-if="hasPerm('fyjh_jhzd_ckrz')"
          >查看日志</el-button>
          <div style="display:inline-block;" v-if="(this.$route.params.state=='assigned')">
            <el-button
              type="warning"
              size="small"
              @click="backToPlan"
              v-if="hasPerm('fyjh_yxdjh_thfyjh')"
            >退回至房源计划</el-button>
            <el-button
              type="warning"
              size="small"
              @click="backToStore"
              v-if="hasPerm('fyjh_yxdjh_hszfyk')"
            >回收至房源库</el-button>
          </div>
        </div>
        <div class="right">
          <el-button
            type="danger"
            size="small"
            @click="deletebatch"
            v-if="this.$route.query.activityName == '编制' && this.$route.params.state == 'todo' && hasPerm('fyjh_jhzd_scfyjh')"
          >删除房源计划</el-button>
        </div>
      </div>
      <!--基本信息-->
      <div class="basicTable">
        <dist-side-tab :menu="menu" :params="params"></dist-side-tab>
      </div>
      <!--查看日志-->
      <el-dialog
        title="查看日志"
        :visible.sync="checkLog"
        v-if="checkLog"
        width="52%"
        :close-on-click-modal="false"
      >
        <checkLog></checkLog>
      </el-dialog>
      <!-- 退回至房源计划 -->
      <el-dialog
        title="退回至房源计划"
        :visible.sync="toPlanFlag"
        width="70%"
        :close-on-click-modal="false"
      >
        <ReturnToHousePlan @closed="close" @returnEmit="refreshHouseList"></ReturnToHousePlan>
      </el-dialog>
      <!-- 回收至房源库 -->
      <div v-if="recovery">
        <el-dialog
          title="回收至房源库"
          :visible.sync="recovery"
          width="70%"
          :close-on-click-modal="false"
        >
          <RecyclingRoom @closed="close" @recyclEmit="refreshHouseList"></RecyclingRoom>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import DistSideTab from "@/components/DistSideTab";
import checkLog from "../CheckLog";
import ReturnToHousePlan from "../ReturnToHousePlan";
import RecyclingRoom from "../RecyclingRoom";
import http from "../newplan/serve.js";
import { mapGetters } from "vuex";
export default {
  name: "newplan",
  components: {
    DistSideTab,
    checkLog,
    ReturnToHousePlan,
    RecyclingRoom
  },
  data() {
    return {
      toview: false,
      checkLog: false, //查看日志
      toPlanFlag: false, //回退至房源计划dialog
      recovery: false, //回收至房源库dialog
      //页签参数 mxq
      params: {
        planGuid: "", //计划标识
        state: "" //从哪儿进入得状态
      },
      menu: {
        children: [
          {
            id: "1",
            label: "计划信息",
            closable: true,
            active: true,
            component: () =>
              import("@/views/housePlan/planManagement/PlanBasicInfo")
          },
          {
            id: "2",
            label: "房源",
            closable: true,
            hidden: true,
            component: () =>
              import("@/views/housePlan/planManagement/newplan/HouseResources")
          },
          {
            id: "3",
            label: "过程材料",
            closable: true,
            component: () =>
              import("@/views/housePlan/planManagement/ProcessMaterials")
          }
        ]
      },
      state: "" //判断是从计划制定-待办箱/计划制定-已办箱/已下达计划那个页面进入 控制按钮显隐
    };
  },
  methods: {
    //调取房源详情刷新的方法
    refreshHouseList() {
      this.$refs.test.getHouseInfoFromPlan();
    },
    close() {
      //关闭所有弹窗
      this.toPlanFlag = false;
      this.recovery = false;
    },
    //退回至房源计划
    backToPlan() {
      this.toPlanFlag = true;
      this.$root.eventHub.$emit("backToPlan");
    },
    //回收至房源库
    backToStore() {
      this.recovery = true;
      this.$root.eventHub.$emit("backToStore");
    },
    //删除计划
    deletebatch() {
      let params = { guid: this.$route.params.guid };
      this.$confirm("此操作将永久删除该房源计划, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          http
            .getPlanDelete(params)
            .then(res => {
              if (res) {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.closeTopTab();
                this.Event.$emit("AllPlan", "search");
              } else {
                this.$message({
                  type: "warning",
                  message: res.data.message
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  //来到这个组件的时候
  created() {
    let planGuid = this.$route.params.guid;
    if (planGuid != "new") {
      this.params.planGuid = planGuid || "";
      this.params.state = this.$route.params.state || ""; //从计划制定待办箱进入 state为'todo'
    }
    if (
      this.$route.query.activityName == "编制" ||
      this.$route.query.activityName == undefined
    ) {
      this.menu.children[1].hidden = false;
    }
  }
};
</script>

<style lang="scss">
.newPlan {
  .top {
    padding: 5px 0 20px 0; /* 更改头部按钮高度 */
    display: flex;
    justify-content: space-between;
  }
}
</style>
