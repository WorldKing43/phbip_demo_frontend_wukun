<template>
  <div class="natureChangeTab">
    <div class="content">
      <div class="buttonGroup">
        <el-button type="primary" size="mini" @click="getBack">返回</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="getLog"
          v-if="hasPerm('fygl_fycqbg_ckrz')"
        >查看日志</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="delCase"
          v-if="!(this.$route.query.state == 'done') && hasPerm('fygl_fycqbg_scaj')&&this.$route.params.taskId!='new'"
        >删除案件</el-button>
      </div>
      <div>
        <dist-side-tab :menu="menu" :params="params"></dist-side-tab>
      </div>
      <el-dialog :visible.sync="logDialog" width="62%" title="查看日志" :close-on-click-modal="false">
        <div class="table-list">
          <el-table
            :data="logList"
            class="w100"
            height="300"
            :default-sort="{ prop: 'date', order: 'descending' }"
            :row-class-name="tableRowClassName"
            :header-cell-style="{
              background: '#E6F0FC',
              color: '#606266',
              'text-align': 'center'
            }"
            :cell-style="{
              'text-align': 'center'
            }"
          >
            <el-table-column prop="processTime" label="操作日期" sortable></el-table-column>
            <el-table-column prop="subjectUnit" label="单位"></el-table-column>
            <el-table-column prop="subjectName" label="操作人"></el-table-column>
            <el-table-column prop="actionName" label="操作"></el-table-column>
            <el-table-column prop="context" label="操作详情"></el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import DistSideTab from "@/components/DistSideTab";
import publicMethod from "@/api/publicMethod";
import api from "@/api/natureChange";
export default {
  components: {
    DistSideTab
  },
  data() {
    return {
      params: {},
      storeName: "propertyRightChangeTab",
      //页签参数
      menu: {
        children: [
          {
            id: "1",
            label: "变更申请信息",
            closable: true,
            active: true,
            component: () =>
              import(
                "@/views/houseManagement/propertyRightChange/propertyRightChangeApplyInfo"
              )
          },
          {
            id: "2",
            label: "房源信息",
            closable: true,
            component: () =>
              import(
                "@/views/houseManagement/propertyRightChange/propertyRightChangeHouse"
              )
          },
          {
            id: "3",
            label: "过程材料",
            closable: true,
            component: () =>
              import(
                "@/views/houseManagement/propertyRightChange/propertyRightChangeMaterials"
              )
          }
        ]
      },
      PID: "",
      logDialog: false, //日志弹框
      logList: [] //日志列表
    };
  },
  methods: {
    //隔行换色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else {
        return "";
      }
      return "";
    },
    //返回
    getBack() {
      let tab = {
        label: "房源产权变更",
        name: "propertyRightChange"
      };
      this.openTopTab(tab);
    },
    //查看日志
    getLog() {
      this.logDialog = true;
      let params = {
        code: this.$route.params.guid,
        projectId: this.PID
      };
      api
        .getLog(params)
        .then(res => {
          this.logList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取流程数据
    getProcessInfo() {
      let params = {
        taskId: this.$route.params.taskId
      };
      publicMethod
        .getProcessInfo(params)
        .then(res => {
          this.PID = res[0].PID;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除案件
    delCase() {
      this.$confirm("请确认是否要删除该案件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            code: this.$route.params.guid,
            projectId: this.PID
          };
          api
            .delCase(params)
            .then(res => {
              if (res) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.closeTopTab();
                this.Event.$emit(
                  "NatureChangeTodoBox",
                  "natureChangeTodoSearch"
                );
              }
            })
            .catch(err => {
              this.$message({
                type: "info",
                message: "删除失败!"
              });
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    commitApply() {
      console.log("tijiao");
    },
    getGuid(data) {
      console.log(data);
      this.reportGuid = data;
    }
  },
  mounted() {
    if (this.$route.params.taskId == "new") {
    } else {
      this.getProcessInfo();
    }
    // let guid = this.$route.params.guid;
    // if (guid != "new") {
    //   this.params.guid = guid || "";
    // }
  }
};
</script>

<style lang="scss">
</style>
