<template>
  <div>
    <el-table :data="tableData" border @cell-dblclick="goDetail" size="mini" style="width: 100%">
      <el-table-column prop="code" label="房源计划号" width="220"></el-table-column>
      <el-table-column prop="propertyName" label="计划属性" width="180"></el-table-column>
      <el-table-column prop="description" label="计划说明"></el-table-column>
      <el-table-column prop="batchName" label="分配批次" width="180"></el-table-column>
      <el-table-column prop="activityName" label="计划状态" width="100"></el-table-column>
      <el-table-column prop="compileDate" label="编制时间"></el-table-column>
      <el-table-column prop="belongTo" label="计划归属"></el-table-column>
      <!-- :formatter="dateFormat"  -->
    </el-table>
    <!-- 分页功能 -->
    <div class="page_box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizesList"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalDataNumber"
        background
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import http from "../newplan/serve.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      //分页需要的数据
      currentPage: 1,
      pageSize: 20,
      pageSizesList: [20, 50, 100, 200],
      totalDataNumber: 0, //数据的总数
      form: {}
    };
  },
  methods: {
    //格式化内容-hover的时候会一直打印
    dateFormat(row) {
      return row.compileDate.split(" ")[0];
    },
    //分页查询房源计划
    getPlanList(flag) {
      let params = {
        code: this.form.code,
        propertyCode: this.form.propertyCode,
        activityName: this.form.activityName,
        batchCodeName: this.form.batchCodeName,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      if (flag == "todo") {
        //待办
        http
          .getPlanListTodo(params)
          .then(res => {
            console.log(res);
            this.$store.commit("setHouseData", res.content);
            this.totalDataNumber = res.totalElements;
          })
          .catch(err => {
            console.log(err);
          });
      } else if (flag == "done") {
        //已办
        http
          .getPlanListDone(params)
          .then(res => {
            this.$store.commit("setHouseData", res.content);
            this.totalDataNumber = res.totalElements;
          })
          .catch(err => {
            console.log(err);
          });
      } else if (flag == "release") {
        //已下达
        http
          .getPlanListRelease(params)
          .then(res => {
            this.$store.commit("setHouseData", res.content);
            this.totalDataNumber = res.totalElements;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //分页大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPath();
    },
    // 页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPath();
    },
    //双击前往详情页，根据path去判断是否为打开的页签。
    goDetail(val) {
      let tab = {
        route: "/newplan/" + val.guid,
        name: val.code,
        path: tab.route,
        query: { activityName: val.activityName }
      };
      this.openTopTab();
    },
    //获取当前路由，根据路由改变查询的参数
    getPath() {
      if (this.$route.path == "/planmanagement/edit") {
        this.getPlanList("done");
      } else if (this.$route.path == "/planmanagement/all") {
        this.getPlanList("todo");
      } else if (this.$route.path == "/assigned") {
        this.getPlanList("release");
      }
    }
  },
  created() {
    this.$on("form", info => {
      this.form = info;
      this.currentPage = 1;
      this.getPath();
    });
  },
  mounted() {
    //分页查询房源计划
    this.getPath();
  }
};
</script>

<style lang="scss" scoped>
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
.el-table /deep/ td,
.el-table /deep/ th {
  text-align: center;
}
.el-table /deep/ th {
  background: #e6f0fc;
  border-right: 1px solid #d0cdc7;
  border-bottom: 1px solid #d0cdc7;
}
.el-table /deep/ td {
  border-right: 1px solid #d0cdc7;
  border-bottom: 1px solid #d0cdc7;
}
.el-table {
  border: 1px solid #d0cdc7;
}
.el-pagination {
  margin-top: 15px;
}
</style>