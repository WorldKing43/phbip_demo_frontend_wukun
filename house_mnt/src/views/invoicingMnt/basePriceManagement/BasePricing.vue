<!--
 * @Description:基准价管理-首页面
 * @Version: 1.0
 * @Autor: maxq
 * @Date: 2019-11-20 20:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 
-->
<template>
  <div id="base-pricing" class="page-detail">
    <div class="content">
      <div class="el-tabs__content">
        <div>
          <el-form size="mini" v-model="form">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="小区号" label-width="3.5rem">
                  <el-input v-model="form.districtNum" clearable @change="search(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="小区名称" label-width="4.5rem">
                  <el-input v-model="form.districtName" clearable @change="search(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" size="mini" @click="search(1)">查询</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div>
          <el-table
            :data="tableData"
            :cell-style="globalCellStyle"
            :header-cell-style="globalHeaderStyle"
            border
          >
            <el-table-column label="小区号" prop="code"></el-table-column>
            <el-table-column label="小区名称" prop="name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="enterTheDetails(scope.row)">管理基准价</el-button>
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
  </div>
</template>
<script>
import http from "@/api/interface.js";
export default {
  name: "basePricing",
  data() {
    return {
      form: {
        districtNum: "", //小区号
        districtName: "" //小区名称
      },
      tableData: [],
      //分页数据
      total: 0, //数据总条数
      pageSize: 20, //当前页条数
      currentPage: 1, //当前页
      pageSizesList: [20, 50, 100, 200] //分页下拉框
    };
  },
  methods: {
    //查询
    search(index) {
      if (index) {
        this.currentPage = index;
      }
      let params = {
        districtName: this.form.districtName,
        districtNum: this.form.districtNum,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      http
        .getDistrictList(params)
        .then(res => {
          this.tableData = res.content;
          this.total = res.totalElements; //数据总条数
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击管理基准价 跳转页面
    enterTheDetails(val) {
      let tab = {
        label: val.name,
        path: "/basePricingTab/" + val.guid
      };
      this.openTopTab(tab);
    },
    basePricingMnt() {},
    //当前页条数改变时
    handleSizeChange(val) {
      this.pageSize = val;
      this.search(1);
    },
    //当前页跳转时
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    }
  },
  mounted() {
    this.search();
  }
};
</script>
<style lang="scss" scoped>
#base-pricing {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
