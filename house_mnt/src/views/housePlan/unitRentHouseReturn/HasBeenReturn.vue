<template>
  <div>
    <el-button size='mini' type='primary'>返回</el-button>
    <div class="planmanage-conten">
      <el-table :data="tableData" border size="mini"  style="width: 100%">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="code" label="序号"></el-table-column>
        <el-table-column prop="propertyName" label="房屋位置"></el-table-column>
        <el-table-column prop="description" label="面积"></el-table-column>
        <el-table-column prop="batchName" label="租金单价"></el-table-column>
        <el-table-column prop="activityName" label="批次制定时间"></el-table-column>
        <el-table-column prop="sign" label="退回时间"></el-table-column>
        <el-table-column prop="signing" label="签约类型"></el-table-column>
        <el-table-column prop="signed" label="签约状态"></el-table-column>
        <el-table-column prop="returned" label="状态"></el-table-column>
        <el-table-column prop="returned" label="操作人"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope='scope'>
              <el-button size='mini' type='primary' @click="">退回</el-button>
          </template>
        </el-table-column>
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
  </div>
</template>
<script>
import http from '@/api/housestore'
export default {
  name:'toSignUp',
  data(){
    return {
       //分页需要的数据
      currentPage: 1,
      // pageNo: 1,
      pageSize: 20,
      pageSizesList: [20, 50, 100, 200],
      totalDataNumber: 0, //数据的总数
    }
    tableData: []
  },
  methods:{
     //查询
    search(){
      let params = {
        pageIndex: currentPage,
        pageSize: pageSize,
        menuName: '已退回'

      }
      let data = this.form
      // http.signStateSearch(params, data).then(res => {
      //   console.log(res)
      //   this.tableData = res.content
      //   this.totalDataNumber = res.totalElements
      // }).catch(err => {
      //   console.log(err)
      // })
    },
     //分页大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.search();
    },
    // 页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    },
  }
}
</script>
<style lang="scss">
.planmanage-conten{
  padding-top:5px;
  background: #fff;
}
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
.el-pagination{
  margin-top:15px;
}
</style>

