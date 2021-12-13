<template>
  <div class="attachment">
    <!--表格-->
    <div class="table">
      <el-table
        :data="tableData"
        ref="Table"
        border
        @cell-dblclick="goDetail"
        :header-cell-style="{
          'background': '#E6F0FC',
          'color': '#606266',
          'text-align':'center',
          'border-color': '#DBDBDB',
          }"
        :cell-style="{
          'text-align':'center',
          'border-color': '#DBDBDB',
          }"
      >
        <el-table-column prop="name" label="附件名称" width></el-table-column>
        <el-table-column prop="name" label="上传人" width></el-table-column>
        <el-table-column prop="name" label="上传时间" width></el-table-column>
        <el-table-column prop="name" label="附件大小" width></el-table-column>
        <el-table-column prop="operation" label="操作" width>
          <template slot-scope="scope">
            <el-button @click="viewDetails(scope.row)" type="text" size="small">
              <i class="el-icon-view"></i>
            </el-button>
            <el-button @click="deleteFile(scope.row)" type="text" size="small">
              <i class="el-icon-delete" style="color:red"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="pagination">
      <el-pagination
        background
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.currentPage"
        :page-sizes="[100, 200, 500, 1000]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="form.total"
      ></el-pagination>
    </div>
    <!-- 文件详情 -->
    <el-dialog title="文件详情" :visible.sync="fileDetails" width="60%">
      <span>文件内容</span>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileDetails: false,
      form: {
        name: "",
        total: 100, //总条数
        pagesize: 100, //每页的条数
        currentPage: 1, //当前页
        pagesize: 100
      },
      //表格数据
      tableData: [
        {
          name: "xxxxxxxxxxxxxx"
        }
      ] //接口数据
    };
  },
  methods: {
    viewDetails(row) {
      console.log("查看");
    },
    deleteFile(row) {
      console.log("删除");
    },
    //双击
    goDetail() {
      console.log("双击");
      this.fileDetails = true;
    },

    handleSizeChange(val) {
      //改变页面显示条数
      this.form.pagesize = val;
    },
    handleCurrentChange(val) {
      //跳转页面
      this.form.currentPage = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.attachment {
  padding: 20px;
  .pagination {
    /*分页*/
    float: right;
    padding-top: 10px;
    .pagination-left {
      font-size: 14px;
      margin-top: 10px;
      color: #333333;
    }
  }
}
</style>
