<!--
 * @Description: 入库审批-配套设施列表页面
 * @Version: 1.0
 * @Autor: maxq
 * @Date: 2019-10-18
 * @LastEditors: jyb
 * @LastEditTime: 2019-10-18
 -->
<template>
  <div id="supportingInfomation">
    <el-form v-model="form" size="mini" label-position="right" label-width="5rem">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="栋名称">
            <el-input v-model="form.buildingName" clearable @change="query(1)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="上报部门">
            <el-input v-model="form.reportDept" clearable @change="query(1)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="配套设施类型" label-width="7rem">
            <el-select v-model="form.facilityType" clearable class="w100" @change="query(1)">
              <el-option
                v-for="(item,index) in device"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="设施来源">
            <el-select v-model="form.facilityOrigin" clearable class="w100" @change="query(1)">
              <el-option
                v-for="(item,index) in deviceSource"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="归属">
            <el-select v-model="form.belong" style="width:100%" clearable @change="query(1)">
              <el-option
                v-for="(item,index) in belongArea"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button
            type="primary"
            size="mini"
            @click="query(1)"
            v-if="hasPerm('fygl_rksp_ptssxx_cx')"
          >查询</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="reset()"
            v-if="hasPerm('fygl_rksp_ptssxx_cz')"
          >重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="table-list" style="margin-top:20px">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        :header-cell-style="globalHeaderStyle"
        :cell-style="globalCellStyle"
      >
        <el-table-column label="序号" type="index" width="70" :index="indexMethod"></el-table-column>
        <el-table-column prop="buildingName" label="栋名称"></el-table-column>
        <el-table-column prop="reportDept" label="上报部门"></el-table-column>
        <el-table-column prop="facilityTypeName" label="配套设施类型"></el-table-column>
        <el-table-column prop="facilityCount" label="配套设施数量"></el-table-column>
        <el-table-column prop="facilityNo" label="设施编号"></el-table-column>
        <el-table-column prop="assortFacilityName" label="设施名称"></el-table-column>
        <el-table-column prop="facilityOriginName" label="设施来源"></el-table-column>
        <el-table-column prop="belongName" label="归属"></el-table-column>
        <el-table-column prop="rentalUnit" label="租售单位"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="goDetail(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page_box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/houseApproval";
import { mapGetters } from "vuex";
export default {
  name: "prehousing",
  data() {
    return {
      tableData: [],
      //分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      form: {
        buildingName: "", //栋名称
        reportDept: "",
        facilityType: "",
        facilityOrigin: "",
        belong: "",
        rentalUnit: ""
      },
      device: [], //配套设施类型下拉框
      belongArea: [], //维护归属1下拉框
      deviceSource: [] //设施来源下拉框
    };
  },
  methods: {
    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //获取字典
    getDictionary() {
      let name = ["配套设施类型", "设施来源", "维护归属1"];
      let params = {
        names: name.toString()
      };
      api
        .searchDictionary(params)
        .then(res => {
          this.device = JSON.parse(res).配套设施类型;
          this.deviceSource = JSON.parse(res).设施来源;
          this.belongArea = JSON.parse(res).维护归属1;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查询
    query(index) {
      if (index) {
        this.currentPage = index;
      }
      let params = {
        reportGuid: this.$parent.params.reportGuid,
        buildingName: this.form.buildingName,
        reportDept: this.form.reportDept,
        facilityType: this.form.facilityType,
        facilityOrigin: this.form.facilityOrigin,
        belong: this.form.belong,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      api
        .supportingFacility(params)
        .then(res => {
          console.log(res);
          this.tableData = res.content;
        })
        .catch(err => {
          console.log(err);
        });
    },

    reset() {
      // 重置查询条件
      this.form = {};
    },
    //双击进入到下一页面
    goDetail(val) {
      this.$parent.openTab({
        id: val.guid,
        label: val.assortFacilityName || "配套设施详情",
        closable: true,
        meta: {
          sheshiGuid: val.guid,
          menuId: "6"
        },
        component: () =>
          import(
            "@/views/houseManagement/houseapproval/approvalDetails/SupportingDetails"
          )
      });
    },
    handleSizeChange(val) {
      // 外面列表分页条数变化获取数据
      this.pageSize = val;
      this.query(1);
    },
    handleCurrentChange(val) {
      // 外面列表当前页变化获取数据
      this.currentPage = val;
      this.query();
    }
  },
  created() {
    this.getDictionary(); //查询字典
    this.query(); //查询配套设施列表
  }
};
</script>
<style lang="scss" scoped>
</style>
