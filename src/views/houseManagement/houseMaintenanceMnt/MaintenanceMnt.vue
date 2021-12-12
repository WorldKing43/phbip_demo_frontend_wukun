<!--
 * @Author: maxq
 * @Date: 2020-08-17 16:44:49
 * @LastEditTime: 2020-08-26 11:51:56
 * @LastEditors: Please set LastEditors
 * @Description: 房屋维修管理
 * @FilePath: \frontend\house-mnt\src\views\houseManagement\houseMaintenanceMnt\maintenceMnt.vue
-->
<template>
  <div id="maintenance-mnt" class="page-detail">
    <div class="content">
      <div class="el-tabs__content">
        <el-form :model="form" size="mini" label-width="3rem">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item label="小区">
                <el-input v-model="form.districtName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="栋名称" label-width="4rem">
                <el-input v-model="form.buildName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="栋号">
                <el-input v-model="form.buildNo" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="房号">
                <el-input v-model="form.houseNo" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="维修状态" label-width="5rem">
                <el-select v-model="form.maintainType" clearable>
                  <el-option v-for="(item, index) in stateList" :label="item.name" :value="item.value" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" size="mini" @click="search()">查 询</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div class="btn_box">
          <el-button type="primary" size="mini" @click="createNew()">新 增</el-button>
        </div>
        <el-table :data="tableData" border :header-cell-style="globalHeaderStyle" :cell-style="globalCellStyle">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="小区号" prop="districtNo"></el-table-column>
          <el-table-column label="小区名称" prop="districtName"></el-table-column>
          <el-table-column label="栋名称" prop="buildName"></el-table-column>
          <el-table-column label="房号" prop="houseNo"></el-table-column>
          <el-table-column label="维修状态" prop="maintainType"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="view(scope.row)">查看</el-button>
              <el-button size="mini" type="primary" @click="handle(scope.row)">编辑</el-button>
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
            :total="total"
            align="right"
            background
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import http from '@/api/vacuumRoominquire.js';
import api from "@/api/roomChangeRoomInput";
export default {
  name: "maintenanceMnt",
  components: {

  },
  data() {
    return {
      form: {
        districtName: '',
        buildName: '',
        buildNo: '',
        houseNo: '',
        maintainType: '',
      },
      stateList: [],//维修状态下拉字典
      tableData: [],
      //分页数据
      total: 0, //数据总条数
      pageSize: 20, //当前页条数
      currentPage: 1, //当前页
      pageSizesList: [20, 50, 100, 200], //分页下拉框
    }
  },
  methods: {
    //查询
    search() {
      let params = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      }
      let data = this.form;
      http.getMaintenanceList(params, data).then(res => {
        this.tableData = res.content;
        this.total = res.totalElements
      }).catch(err => { console.log(err) })
    },
    //打开页签公共方法
    goDetail(val, state) {
      let tab = {
        route: "/maintenanceHouseInfo" + "/" + val.houseGuid + "/" + state,
        name: val.houseNo || '新增房屋维修',
        type: "single",
      };
      this.openTopTab(tab);
    },
    //新增
    createNew() {
     let val = {houseGuid: 'new'};
      this.goDetail(val, 'new')
    },
    //查看
    view(val) {
      this.goDetail(val, 'check');
    },
    //编辑
    handle(val) {
      this.goDetail(val, 'todo');
    },
    //当前页条数改变时
    handleSizeChange(val) {
      this.pageSize = val;
      this.search();
    },
    //当前页跳转时
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    },
      //获取字典数据
    getDictionary() {
      let nameData = ["维修类型"];
      let params = { names: nameData.toString() };
      api.getDictionary(params).then(res => {
        res = JSON.parse(res);
        this.stateList = res.维修类型;
      }).catch(err => {
        console.log(err);
      });
    }
  },
  mounted() {
    this.getDictionary(); //获取字典
    this.search();
     this.Event.$on("maintenanceMnt", data =>{
      if(data == 'search') this.search()
    });
  },
}
</script>
<style lang="scss" scoped>
#maintenance-mnt{
  .btn_box {
    margin-bottom: 10px
  }
}
</style>