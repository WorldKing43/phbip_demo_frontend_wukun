<!--房源信息-->
<template>
  <div class="housingInformation">
    <div class="top">
      <el-form ref="form" :model="form" label-width="7rem" size="mini">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="栋号">
              <el-input
                v-model="form.jzBuildNo"
                clearable
                @change="getHouseList(1)"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="栋名称">
              <el-input
                clearable
                v-model="form.jzName"
                @change="getHouseList(1)"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房号">
              <el-input
                clearable
                v-model="form.jzHouseNo"
                @change="getHouseList(1)"
              ></el-input>
            </el-form-item>
          </el-col>
         
            <el-button
              type="primary"
              size="mini"
              @click="getHouseList(1)"
              v-if="hasPerm('fygl_fyfwk_fwxx_cx')"
              >查询</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="reset"
              v-if="hasPerm('fygl_fyfwk_fwxx_cz')"
              >重置</el-button
            >
        </el-row>
      </el-form>
    </div>
    <!--结果列表-->
    <div class="table-list" style="margin-top: 10px; margin-bottom: 10px">
      <el-table
        :data="tableData"
        border
        @cell-dblclick="goDetail"
        class="w100"
        :header-cell-style="{
          background: '#E6F0FC',
          color: '#606266',
          'text-align': 'center',
          'border-color': '#DBDBDB',
        }"
        :cell-style="{
          'text-align': 'center',
          'border-color': '#DBDBDB',
        }"
      >
        <el-table-column
          type="index"
          :index="indexMethod"
          label="序号"
        ></el-table-column>
        <el-table-column prop="districtName" label="小区名称"></el-table-column>
        <el-table-column prop="buildNo" label="栋号"></el-table-column>
        <el-table-column prop="buildName" label="栋名称"></el-table-column>
        <el-table-column prop="houseNo" label="房号"></el-table-column>
        <el-table-column prop="typeName" label="户型"></el-table-column>
        <el-table-column prop="orientationName" label="朝向"></el-table-column>
        <el-table-column
          prop="coveredArea"
          label="预测绘建筑面积(平方米)"
        ></el-table-column>
        <el-table-column
          prop="completionArea"
          label="竣工建筑面积(平方米)"
        ></el-table-column>
      </el-table>
    </div>
    <!-- 分页功能 -->
    <div class="page_box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[50, 100, 200, 500, 1000, 2000]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNumber"
        background
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/api/house.js";
import api from "@/api/housestore.js";
import publicMethod from "@/api/publicMethod.js";
export default {
  name: "houseinfo",
  data() {
    return {
      form: {
        jzBuildNo: "",
        jzName: "",
        jzHouseNo: "",
        type: "",
        orientationList: "",
        coveredAreaMax: "",
        coveredAreaMin: "",
        completionAreabegain: "",
        completionAreaEnd: "",
        nature: "",
        state: "",
        source: "",
        currentProperty: "",
        propertyRight: "",
        situational: "",
        situationalRemark: "",
        specification: "",
        demolitionState: "0",
        maintainType: "",
      }, //表单
      tableData: [], //表格数据
      //分页需要的数据
      currentPage: 1,
      pageNo: 1,
      pageSize: 50,
      totalNumber: 0, //数据的总数
      natureData: [], // 房屋性质下拉
      sourceData: [], //来源下拉
      typeData: [], //类型下拉
      orientationData: [], //朝向下拉
      stateData: [], //房屋状态
      currentPropertyData: [], //当前属性下拉
      situationalRemarkData: [], //房源标注下拉
      propertyRightUnitOptions: [], //变更单位集合
      options: [
        { value: "1", label: "是" },
        { value: "0", label: "否" },
      ],
      stateList: [
        { name: "退房待维修", value: 1 },
        { name: "已申报维修", value: 2 },
        { name: "已完成维修", value: 3 },
        { name: "空", value: "null" },
      ],
    };
  },
  methods: {

    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //得到产权单位
    getPropertyRightUnit() {
      let params = {
        searchContent: "",
      };
      publicMethod
        .getUnit(params)
        .then((res) => {
          this.propertyRightUnitOptions = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //重置
    reset() {
      this.form = {
        jzBuildNo: "",
        jzName: "",
        jzHouseNo: "",
        type: "",
        orientation: "",
        coveredAreaMax: "",
        coveredAreaMin: "",
        completionAreabegain: "",
        completionAreaEnd: "",
        nature: "",
        state: "",
        source: "",
        currentProperty: "",
        propertyRight: "",
        situational: "",
        situationalRemark: "",
        specification: "",
        demolitionState: "",
      };
    },
    handleSizeChange(val) {
      //改变页面显示条数
      this.pageSize = val;
      this.currentPage = 1;
      this.getHouseList();
    },
    handleCurrentChange(val) {
      //跳转页面
      this.currentPage = val;
      this.getHouseList();
    },
    goDetail(val) {
      let name = val.houseNo;
      this.$parent.openTab({
        id: val.guid,
        label: name || "房屋详情",
        closable: true,
        meta: {
          houseGuid: val.guid,
          menuId: "4",
        },
        component: () =>
          import("@/views/houseManagement/houseSearch/HouseDetails"),
      });
    },
    //获取房屋列表
    getHouseList(index) {
      let reg = /^(\-)?\d+(\.\d{1,2})?$/;
      let re = new RegExp(reg);
      if (index) {
        this.currentPage = index;
      }
      if (!this.form.propertyRight) {
        this.propertyRightGuid = "";
      }
      let params = {
        districtGuid: this.$parent.params.guid, //小区唯一标识
        buildNo: this.form.jzBuildNo,
        buildName: this.form.jzName,
        houseNo: this.form.jzHouseNo,
        propertyRight: 'b7ce3aad-33be-11ea-aa59-bbcb0143f280',
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
      };
      http
        .getZdHouseList(params)
        .then((res) => {
          this.tableData = res.content;
          this.totalNumber = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取字典
    getDictionary() {
      let namesArr = [
        "房产来源",
        "户型",
        "朝向",
        "房屋性质",
        "房屋状态",
        "变更单位",
        "当前属性",
        "房源标注",
      ];
      let params = {
        names: namesArr.toString(),
      };
      api
        .getDictionary(params)
        .then((res) => {
          res = JSON.parse(res);
          this.orientationData = this.$dictionaryChange(
            res.朝向,
            this.orientationData,
            "通用"
          );
          this.natureData = this.$dictionaryChange(
            res.房屋性质,
            this.natureData,
            "通用"
          );
          this.sourceData = res.房产来源;
          this.typeData = res.户型;
          this.stateData = res.房屋状态;
          this.currentPropertyData = res.当前属性;
          this.situationalRemarkData = res.房源标注;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    // this.Event.$on("HouseInfo", (data) => {
    //   if (data == "getHouseList") {
    //     this.getHouseList();
    //   }
    // });
    this.getDictionary();
    // this.getPropertyRightUnit();
    // this.getHouseList();
  },
};
</script>

<style lang="scss" scoped>
</style>
