<template>
  <div>
    <el-table :data="tableData" border @cell-dblclick="goDetail" size="mini" style="width: 100%">
      <el-table-column prop="code" label="批次号" width="120"></el-table-column>
      <el-table-column prop="property" label="报批主题" width="120"></el-table-column>
      <el-table-column prop="description" label="报批依据" width="140"></el-table-column>
      <el-table-column prop="batchCode" label="上报责任单位" width="140"></el-table-column>
      <el-table-column prop="state" width="100" label="报批房源数"></el-table-column>
      <el-table-column prop="compileDate" label="上报单位"></el-table-column>
      <el-table-column prop="planEditor" label="上报时间"></el-table-column>
      <el-table-column prop="planEditor" label="状态" width="100"></el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <div class="block" align="right">
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
import http from "../../../housePlan/planManagement/newplan/serve.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      //分页需要的数据
      currentPage: 1,
      pageSize: 20,
      pageSizesList: [20, 50, 100, 200],
      totalDataNumber: 0, //数据的总数
      
      planState: "",
      form: {}
    };
  },
  computed: {
    openTab() {
      return this.$store.state.openTab;
    },
    ...mapGetters({
      tableData: "getHouseData"
    })
  },
  methods: {
    //分页查询房源计划
    getPlanList() {
      this.getPath();
      let params = {
        batchCodeNmae: this.form.batchCodeNmae,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        propertyCode: this.form.propertyCode,
        state: this.form.state,
        guid: this.form.guid
      };
      http
        .housePlanPage(params)
        .then(res => {
          // console.log(res.content)
          this.$store.commit("setHouseData", res.content);
          this.totalDataNumber = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //分页大小改变
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getPlanList();
    },
    // 页码改变
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getPlanList();
    },
    //双击，去到详情页（存在一定的BUG）
    goDetail(val) {
      // console.log(val)
      let flag = false;
      let newpath = "/newplan" + "/" + val.code;
      for (let item of this.openTab) {
        if (item.route === newpath) {
          this.$store.commit("set_active_index", newpath);
          // console.log('是已经打开的页面地址')
          this.$router.push({ path: newpath });
          flag = true;
          break;
        }
      }
      if (!flag) {
        this.$router.push({ path: newpath, query: { guid: val.guid } });
        this.$store.commit("add_tabs", { route: newpath, name: val.code });
        this.$store.commit("set_active_index", newpath);
        //this.$store.commit('add_planGuid',val.guid);//存guid
      }
    },
    //获取当前路由，根据路由改变查询的参数
    getPath() {
      if (this.$route.path == "/planmanagement/edit") {
        this.form.state = 0;
      } else if (this.$route.path == "/planmanagement/firstrial") {
        this.planState = 1;
      } else if (this.$route.path == "/planmanagement/reviewed") {
        this.planState = 2;
      } else {
        this.planState = "";
      }
    }
  },
  mounted() {
    this.getPlanList();
  },
  created() {
    this.$on("form", info => {
      this.form = info;
      this.currentPage = 1;
      this.getPlanList();
    });
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
</style>


