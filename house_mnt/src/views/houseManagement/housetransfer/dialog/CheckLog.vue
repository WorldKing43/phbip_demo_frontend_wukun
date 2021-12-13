<!--查看日志 -->
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
        <el-table-column prop="unit" label="关键字" width="180"></el-table-column>
        <el-table-column prop="date" label="时间和日期" sortable width="180"></el-table-column>
        <el-table-column prop="name" label="来源" width="180"></el-table-column>
        <el-table-column prop="operation" label="备注"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Log.vue",
  data() {
    return {
      //表格假数据
      tableData: []
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
    }
  }
};
</script>

<style lang="scss" scoped>
.table-list {
  height: 300px;
  & /deep/ .el-table .warning-row {
    /*隔行换色*/
    background: oldlace;
  }
  & /deep/ .el-table td,
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
