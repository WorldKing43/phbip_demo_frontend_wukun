<!--栋信息-->
<template>
  <div class="buildingInformation">
    <div>
      <!--查询栏-->
      <div class="top">
        <el-form ref="form" :model="form" label-width="5rem" size="mini">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="栋号">
                <el-input v-model="form.buildCode" clearable @change="getBuildingList(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="栋名称">
                <el-input v-model="form.buildName" clearable @change="getBuildingList(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <el-button
                  type="primary"
                  class="float"
                  size="mini"
                  @click="getBuildingList(1)"
                  v-if="hasPerm('fygl_fyfwk_dxx_cx')"
                >查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!--结果列表-->
      <div class="table-list" style="margin-top: 10px;margin-bottom:10px;">
        <el-table
          :data="tableData"
          border
          @cell-dblclick="goDetail"
          class="w100"
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
          <el-table-column type="index" :index="indexMethod" width="55"></el-table-column>
          <el-table-column prop="districtName" label="小区名称"></el-table-column>
          <el-table-column prop="code" label="栋号"></el-table-column>
          <el-table-column prop="name" label="栋名称"></el-table-column>
          <el-table-column prop="elevatorName" label="是否带电梯"></el-table-column>
          <el-table-column prop="floorCount" label="总楼层数"></el-table-column>
          <el-table-column prop="skirtFloorCount" label="裙楼层数"></el-table-column>
          <el-table-column prop="landNo" label="宗地号"></el-table-column>
        </el-table>
      </div>
      <!-- 分页功能 -->
      <div class="page_box">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizesList"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNumber"
          background
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/api/house.js";
import api from "@/api/housestore.js";

export default {
  name: "buildinginfo",
  data() {
    return {
      //分页需要的数据
      options: [
        { value: true, label: "是", name: "是" },
        { value: false, label: "否", name: "否" }
      ],
      currentPage: 1,
      pageNo: 1,
      pageSize: 100,
      pageSizesList: [100, 200, 500, 1000],
      totalNumber: 0, //数据的总数
      form: {}, //表单
      houseTypeData: [], //栋用途下拉数据
      //表格假数据
      tableData: [] //表格
    };
  },
  methods: {
    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //改变页面显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getBuildingList();
    },
    //跳转页面
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getBuildingList();
    },
    //双击，去到详情页
    goDetail(val) {
      let name = val.name;
      this.$parent.openTab({
        id: val.guid,
        label: name || "栋详情",
        closable: true,
        meta: {
          fangGuid: val.guid,
          menuId: "3"
        },
        component: () =>
          import(
            "@/views/houseManagement/houseSearch/BuildDetails"
          )
      });
    },
    //获取楼栋列表
    getBuildingList(index) {
      if (index) {
        this.currentPage = index;
      }
      let params = {
        districtGuid: this.$parent.params.guid,
        landNo: this.form.landNo,
        floorCount: this.form.floorCount,
        skirtFloorCount: this.form.skirtFloorCount,
        buildName: this.form.buildName,
        buildNo: this.form.buildCode,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      http
        .getZdBuildtList(params)
        .then(res => {
          this.tableData = res.content;
          this.totalNumber = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取字典
    getDictionary() {
      let namesArr = ["住宅类型"];
      let params = {
        names: namesArr.toString()
      };
      api
        .getDictionary(params)
        .then(res => {
          this.houseTypeData = JSON.parse(res).住宅类型;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    // this.getBuildingList();
    this.getDictionary(); //获取字典
  }
};
</script>

<style lang="scss" scoped>
</style>
