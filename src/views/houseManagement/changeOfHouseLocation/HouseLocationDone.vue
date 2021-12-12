<!--
 * @Author: maxq
 * @Date: 2020-07-15 10:05:06
 * @LastEditTime: 2020-07-17 11:12:03
 * @LastEditors: Please set LastEditors
 * @Description: 房屋坐落变更-已办箱
 * @FilePath: \frontend\house-mnt\src\views\houseManagement\changeOfHouseLocation\HouseLocationDone.vue
--> 
<template>
  <div id="house-location-done">
    <el-form :model="form" size="mini" label-width="5rem">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="小区名称">
             <el-input clearable v-model="form.district" @change="search(1)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="申请时间">
            <el-date-picker type="date" v-model="form.sqsjq" style="width:45%;" @change="search(1)"></el-date-picker>
            <span>至</span>
            <el-date-picker type="date" v-model="form.sqsjz" style="width:45%;" @change="search(1)"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button size="mini" type="primary" @click="search(1)">查询</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" :cell-style="globalCellStyle" :header-cell-style="globalHeaderStyle" border>
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column prop="bghxqmc" label="小区名称(变更后)"></el-table-column>
      <el-table-column prop="bghdmc" label="栋名称(变更后)"></el-table-column>
      <el-table-column prop="fwsl" label="房屋变更数量"></el-table-column>
      <el-table-column prop="jbr" label="经办人"></el-table-column>
      <el-table-column prop="sqsj" label="申请时间"></el-table-column>
      <el-table-column prop="STATE" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="view(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page_box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizesList"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import http from '@/api/interface.js';
import api from "@/api/roomChangeRoomInput";
export default {
  name: 'houseLocationTodo',
  data() {
    return {
      form: {
        district: '',
        sqsjq: '',
        sqsjz: ''
      },
      tableData:[],
      //分页数据
      currentPage: 1, //当前页
      pageSizesList: [20, 50, 100, 200], //页面条数可选
      pageSize: 20, //此时当前页条数
      total: 0,//数据总数
    }
  },
  methods: {
    search() {
      let params = {
        state: 1,//已办
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      let data = this.form;
      http.getLocationList(params, data).then(res => {
        this.tableData = res.content;
        this.total = res.totalElements
      }).catch(err => {console.log(err)})
    },
    //打开页签
    goDetail(val, state) {
      let tab = {
        route: "/houseLocationDetail" + "/" + val.guid + "/" + state,
        name: val.bghxqmc || '新增房屋坐落变更',
        type: "single",
        query: {
          taskId: val.TID,
        }
      };
      this.openTopTab(tab);
    },
   
    //当前页的大小变化
    handleSizeChange(val) {
      this.pageSize = val;
      this.search()
    },
    //当前页的页码变化
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search()
    },
    //查看
    view(val) {
      this.goDetail(val, 'check');
    },
  },
  mounted() {
    this.search();//查询列表数据
    this.Event.$on('HouseLocationTodo', data =>{
      if(data == 'search') this.search()
    })
  }
}
</script>
<style lang="scss" scoped>
// #house-location-done{
  
// }
</style>
