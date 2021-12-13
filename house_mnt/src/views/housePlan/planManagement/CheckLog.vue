<!--
 * @Author: 
 * @Date: 2019-12-03 
 * @LastEditors: 金雅蓓
 * @Description:通过页签传值，实现查看日志的操作 
 * @model:查看日志
 -->
<template>
  <div>
    <div class="table-list">
      <el-table
        :data="tableData"
        class="w100"
        height="300"
        :default-sort="{prop: 'date', order: 'descending'}"
        :row-class-name="tableRowClassName"
        :header-cell-style="{
          'background': '#E6F0FC',
          'color': '#606266',
          'text-align':'center',
          }"
        :cell-style="{
          'text-align':'center',
          }"
      >
        <el-table-column prop="processTime" label="操作日期" sortable></el-table-column>
        <el-table-column prop="subjectUnit" label="单位"></el-table-column>
        <el-table-column prop="subjectName" label="操作人"></el-table-column>
        <el-table-column prop="actionName" label="操作"></el-table-column>
        <el-table-column prop="context" label="操作详情"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "./newplan/serve.js";
export default {
  name: "Log.vue",
  data() {
    return {
      //表格假数据
      tableData: [
        {
          processTime: "",
          subjectUnit: "",
          subjectName: "",
          context: ""
        }
      ]
    };
  },
  methods: {
    formatter(row, column) {
      //格式化指定列的值 :formatter="formatter"
      return row.address;
    },
    //隔行换色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else {
        return "";
      }
      return "";
    },
    getPlanLog() {
      //查询房源计划业务日志
      if (this.getPlanGuid != "") {
        let _params = { planGuid: this.getPlanGuid };
        http
          .getPlanLog(_params)
          .then(res => {
            this.tableData = res;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    this.getPlanGuid = this.$route.params.guid;
    if (this.getPlanGuid) {
      this.getPlanLog();
    }
  }
};
</script>

<style lang="scss" scoped>
.table-list {
  height: 300px;
  /deep/ .el-table .warning-row {
    /*隔行换色*/
    background: oldlace;
  }
  /deep/ .el-table td,
  .el-table th.is-leaf {
    /*取消border*/
    border-bottom: none;
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background-color: #fff;
  }
  .el-table--enable-row-hover /deep/ .el-table__body tr:hover > td {
    /*取消划过效果*/
    background-color: transparent !important;
  }
  ::-webkit-scrollbar {
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    width: 2px;
    height: 16px;
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar-thumb {
    /*定义滑块 内阴影+圆角*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #e6f0fc;
  }
}
</style>
