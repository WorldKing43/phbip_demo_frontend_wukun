<!--
 * @Description: 房屋综合查询(市局)
 * @Author: maxq
 * @Date: 2020-05-14
 * @LastEditors: zhaoyy1
 * @LastEditTime: 2020-10-13 16:24:10
 -->
<!--房屋综合查询-->
<template>
  <div id="city-bureau-inquire" class="page-detail">
    <div class="content">
      <div class="contentColor">
        <el-form ref="form" :model="form" label-width="5rem" size="mini">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="小区" label-width="7rem">
                <el-autocomplete
                  class="inline-input"
                  v-model="form.districtName"
                  :fetch-suggestions="getCommunitySelectList"
                  placeholder="请输入内容"
                  :trigger-on-focus="false"
                  :clearable="true"
                  popper-class="select-option"
                  style="width: 100%"
                  @select="getHouseList(1)"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="栋号" label-width="7rem">
                <el-input
                  v-model="form.buildNo"
                  clearable
                  @change="getHouseList(1)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="栋名称" label-width="7.5rem">
                <el-input
                  v-model="form.buildingName"
                  clearable
                  @change="getHouseList(1)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房号" label-width="7rem">
                <el-input
                  v-model="form.houseNo"
                  clearable
                  @change="getHouseList(1)"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="户型" label-width="7rem">
                <el-select
                  v-model="form.type"
                  placeholder="--请选择--"
                  class="w100"
                  clearable
                  multiple
                  @change="getHouseList(1)"
                >
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="item in typeData"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="朝向" label-width="7rem">
                <el-select
                  v-model="form.orientationList"
                  placeholder="--请选择--"
                  class="w100"
                  clearable
                  multiple
                  @change="getHouseList(1)"
                >
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="item in orientationData"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <!-- <el-form-item label="备注" label-width="7.5rem">
                  <el-input v-model="form.specification" @change="getHouseList(1)"></el-input>
              </el-form-item>-->
              <el-form-item label="房屋状态" label-width="7rem">
                <el-select
                  v-model="form.state"
                  placeholder="--请选择--"
                  class="w100"
                  clearable
                  multiple
                  @change="getHouseList(1)"
                >
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="item in stateData"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="维修状态" label-width="7rem">
                <el-select
                  style="width: 100%"
                  v-model="form.maintainType"
                  placeholder="请选择"
                  @change="getHouseList(1)"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in stateList"
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
              <el-form-item label="房源性质" label-width="7rem">
                <el-select
                  v-model="form.nature"
                  placeholder="--请选择--"
                  class="w100"
                  clearable
                  multiple
                  filterable
                  @change="getHouseList(1)"
                >
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="item in natureData"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否被二次分配" label-width="7.5rem">
                <el-select
                  v-model="form.secondDistribution"
                  placeholder="--请选择--"
                  class="w100"
                  clearable
                  @change="getHouseList(1)"
                >
                  <el-option
                    v-for="item in options"
                    :label="item.label"
                    :value="item.value"
                    :key="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房产来源" label-width="7.5rem">
                <el-select
                  v-model="form.source"
                  placeholder="--请选择--"
                  class="w100"
                  clearable
                  multiple
                  @change="getHouseList(1)"
                >
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="item in sourceData"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否问题房源" label-width="7rem">
                <el-select
                  v-model="form.situational"
                  placeholder="--请选择--"
                  class="w100"
                  clearable
                  @change="getHouseList(1)"
                >
                  <el-option
                    v-for="item in options"
                    :label="item.label"
                    :value="item.value"
                    :key="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="show" class="show">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="产权归属" label-width="7rem">
                  <el-select
                    v-model="form.propertyRight"
                    placeholder="--请选择--"
                    class="w100"
                    clearable
                    filterable
                    multiple
                    @change="getHouseList(1)"
                  >
                    <el-option
                      v-for="(item, index) in selectPropertyRightUnitOptions"
                      :label="item.value"
                      :value="item.name"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="数据运维权" label-width="7rem">
                  <el-select
                    v-model="form.operationalRight"
                    @change="getHouseList(1)"
                    placeholder="--请选择--"
                    class="w100"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="item in maintenanceUnit"
                      :label="item.name"
                      :value="item.value"
                      :key="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="签约权" label-width="7.5rem">
                  <el-select
                    v-model="form.signatoryRight"
                    placeholder="--请选择--"
                    class="w100"
                    clearable
                    filterable
                    @change="getHouseList(1)"
                  >
                    <el-option
                      v-for="item in signingUnit"
                      :label="item.name"
                      :value="item.value"
                      :key="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="竣工建筑面积" label-width="7rem">
                  <el-row :gutter="0">
                    <el-col :span="10">
                      <el-input
                        v-model="form.completionAreabegain"
                        clearable
                        @change="getHouseList(1)"
                      ></el-input>
                    </el-col>
                    <el-col class="line" :span="4" style="text-align: center"
                      >-</el-col
                    >
                    <el-col :span="10">
                      <el-input
                        v-model="form.completionAreaEnd"
                        clearable
                        @change="getHouseList(1)"
                      ></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <!-- <el-form-item label="空房标注" label-width="7rem">
                    <el-select
                      v-model="form.situationalRemark"
                      placeholder="--请选择--"
                      class="w100"
                      multiple
                      clearable
                      @change="getHouseList(1)"
                    >
                      <el-option
                        v-for="item in situationalRemarkData"
                        :label="item.name"
                        :value="item.value"
                        :key="item.name"
                      ></el-option>
                    </el-select>
                </el-form-item>-->
              </el-col>
              <el-col :span="6">
                <el-form-item label="预测绘建筑面积" label-width="7.5rem">
                  <el-row :gutter="0">
                    <el-col :span="10">
                      <el-input
                        v-model="form.coveredAreaMin"
                        clearable
                        @change="getHouseList(1)"
                      ></el-input>
                    </el-col>
                    <el-col class="line" :span="4" style="text-align: center"
                      >-</el-col
                    >
                    <el-col :span="10">
                      <el-input
                        v-model="form.coveredAreaMax"
                        clearable
                        @change="getHouseList(1)"
                      ></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="当前属性" label-width="7rem">
                  <el-select
                    v-model="form.currentProperty"
                    placeholder="--请选择--"
                    class="w100"
                    clearable
                    @change="getHouseList(1)"
                  >
                    <el-option
                      :label="item.name"
                      :value="item.value"
                      v-for="item in currentPropertyData"
                      :key="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否包含核销" label-width="7rem">
                  <el-select
                    v-model="form.demolitionState"
                    placeholder="--请选择--"
                    class="w100"
                    clearable
                    @change="getHouseList(1)"
                  >
                    <el-option
                      v-for="item in options"
                      :label="item.label"
                      :value="item.value"
                      :key="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否查封冻结" label-width="7rem">
                  <el-select
                    v-model="form.closed"
                    placeholder="--请选择--"
                    class="w100"
                    clearable
                    @change="getHouseList(1)"
                  >
                    <el-option
                      v-for="item in options"
                      :label="item.label"
                      :value="item.value"
                      :key="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="分配单位">
                  <el-input
                    v-model="form.fpdw"
                    @change="getHouseList(1)"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="20">
            <el-col :span="24" style="text-align: right">
              <el-form-item label-width="0">
                <el-button type="primary" @click="opennAllSearch()" v-if="!show"
                  >展开</el-button
                >
                <el-button type="primary" @click="opennAllSearch()" v-if="show"
                  >收起</el-button
                >
                <el-button
                  type="primary"
                  @click="getHouseList(1)"
                  v-if="hasPerm('fygl_fwzhcx(sj)_cx')"
                  >查询</el-button
                >
                <el-button type="primary" @click="reset()">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!--导出数据按钮-->
        <div class="toolbar" style="margin-left: 15px">
          <el-button
            type="primary"
            @click="exportTable"
            size="mini"
            v-if="hasPerm('fygl_fwzhcx(sj)_dc')"
            >导出</el-button
          >
          <!-- <el-button
            type="primary"
            @click="exportProposedDistributionHouse"
            size="mini"
            v-if="hasPerm('fygl_cx_dcfynfpjgqd')"
          >导出房源拟分配结果清单</el-button>
          <el-button
            type="primary"
            @click="exportHouseBatchInfo"
            size="mini"
            v-if="hasPerm('fygl_cx_dcglpcfyqd')"
          >导出关联批次房源清单</el-button>-->
        </div>
        <!--结果列表-->
        <div style="margin-top: 10px; margin-bottom: 10px">
          <el-table
            :header-cell-style="globalHeaderStyle"
            :cell-style="globalCellStyle"
            :data="tableData"
            border
            @row-dblclick="goDetail"
            ref="houseTable"
            size="mini"
          >
            <el-table-column
              type="index"
              label="序号"
              width="50"
              :index="indexMethod"
              fixed
            ></el-table-column>
            <el-table-column
              prop="districtName"
              label="小区名称"
              fixed
            ></el-table-column>
            <el-table-column
              prop="buildName"
              label="栋名称"
              fixed
            ></el-table-column>
            <el-table-column
              prop="buildNo"
              label="栋号"
              fixed
            ></el-table-column>
            <el-table-column
              prop="houseNo"
              label="房号"
              fixed
            ></el-table-column>
            <el-table-column
              prop="maintainTypeName"
              label="维修状态"
            ></el-table-column>
            <el-table-column prop="typeName" label="户型"></el-table-column>
            <el-table-column
              prop="orientationName"
              label="朝向"
            ></el-table-column>
            <el-table-column
              prop="coveredArea"
              label="预测绘建筑面积(平方米)"
            ></el-table-column>
            <el-table-column
              prop="completionArea"
              label="竣工建筑面积(平方米)"
            ></el-table-column>
            <!-- <el-table-column prop="specification" label="备注"></el-table-column> -->
            <el-table-column
              prop="stateName"
              label="房屋状态"
            ></el-table-column>
            <el-table-column
              prop="propertyRightUnit"
              label="产权归属"
            ></el-table-column>
            <el-table-column
              prop="allocationRightUnit"
              label="分配权"
            ></el-table-column>
            <el-table-column
              prop="signatoryRightUnit"
              label="签约权"
            ></el-table-column>
            <el-table-column
              prop="secondAllocationRight"
              label="二次分配权"
            ></el-table-column>
            <el-table-column
              prop="secondSignatoryRight"
              label="二次签约权"
            ></el-table-column>
            <el-table-column
              prop="secondDistribution"
              label="是否被二次分配"
            ></el-table-column>
            <el-table-column
              prop="sourceName"
              label="房产来源"
            ></el-table-column>
            <el-table-column
              prop="changeAfterNatureName"
              label="房源性质"
            ></el-table-column>
            <el-table-column label="竣工时间">
              <template slot-scope="scope">{{
                scope.row.finishConstructionTime | dateFormat
              }}</template>
            </el-table-column>
            <!-- <el-table-column prop="pc" label="分配方式/批次信息"></el-table-column> -->
          </el-table>
          <!--分页-->
          <div class="page_box" style="background: white">
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/api/inquery.js";
import api from "@/api/housestore.js";
import publicMethod from "@/api/publicMethod.js";
import axios from "dist-axios";
import { houseStore } from "@/api/paths";
import { inquery } from "@/api/paths.js";

export default {
  name: "inquire",
  data() {
    return {
      propertyRightGuid: "", //下拉框选中的产权单位的guid
      form: {
        districtName: "",
        buildingName: "",
        houseNo: "",
        type: "",
        orientationList: "",
        coveredAreaMax: "",
        coveredAreaMin: "",
        source: "",
        nature: "",
        state: "",
        propertyRight: "",
        situational: "", //是否问题房源
        districtNo: "",
        buildNo: "",
        signatoryRight: "",
        operationalRight: "",
        situationalRemark: "", //房源标注
        closed: "",
        secondDistribution: "", // 是否被二次分配
        currentProperty: "",
        specification: "",
        allocationRight: "",
        completionAreaEnd: "",
        completionAreabegain: "",
        demolitionState: "0",
        maintainType: "",
      }, //表单
      sourceData: [], //来源下拉
      typeData: [], //类型下拉
      orientationData: [], //朝向下拉
      oldOptions: [], // 用来储存上一次的数据
      natureData: [], //房屋性质下拉
      stateData: [
        { name: "已出售", value: 1 },
        { name: "已拆除", value: 2 }, //[20, 21, 22]
        { name: "已取得全部产权", value: 3 },
        { name: "未出售", value: 4 }, //[1,2,3,4,5,7,8,9,14]
      ], //房屋状态下拉
      currentPropertyData: [], //当前属性下拉
      divisionUnit: [], //分配权归属单位;
      signingUnit: [], //签约权归属单位;
      maintenanceUnit: [], //数据维护权归属;
      operations: [], //运维权归属;
      selectPropertyRightUnitOptions: [], //产权单位下拉
      situationalRemarkData: [], //房源标注下拉
      tableData: [], //表格假数据
      //分页需要的数据
      currentPage: 1,
      pageSize: 10,
      pageSizesList: [10, 20, 50, 100, 200],
      totalNumber: 0, //数据的总数
      options: [
        { value: "1", label: "是" },
        { value: "0", label: "否" },
      ],
      show: false, //菜单栏是否显示完全
      selectCommunityOptions: [], //选中的小区
      stateList: [
        { name: "退房待维修", value: 1 },
        { name: "已申报维修", value: 2 },
        { name: "已完成维修", value: 3 },
        { name: "空", value: "null" },
      ],
    };
  },
  methods: {
    //小区模糊查询
    getCommunitySelectList(str, cb) {
      let params = {
        searchContent: this.form.districtName,
      };
      publicMethod
        .getCommunityList(params)
        .then((res) => {
          for (let i of res) {
            i.value = i.districtNameNo;
          }
          this.selectCommunityOptions = res; //将结果存入下拉小区数据中
          if (this.selectCommunityOptions.length === 0) {
            this.selectCommunityOptions = [{ value: "暂无数据" }];
          }
          cb(this.selectCommunityOptions);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //获取产权归属
    getPropertyRightUnit() {
      let params = {};
      publicMethod
        .propertyList(params)
        .then((res) => {
          this.selectPropertyRightUnitOptions = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取签约权下拉数据
    getSignUpRight() {
      let params = {};
      publicMethod
        .signUpRightList(params)
        .then((res) => {
          this.signingUnit = res.children;
        })
        .catch((err) => {});
    },
    // 导出按钮
    exportTable() {
      let url = "";
      url =
        process.env.API +
        inquery.exportCityBureauComprehensiveHouseInfo +
        "?districtNo=" +
        this.form.districtNo +
        "&districtName=" +
        this.form.districtName +
        "&buildingName=" +
        this.form.buildingName +
        "&buildNo=" +
        this.form.buildNo +
        "&houseNo=" +
        this.form.houseNo +
        "&type=" +
        this.form.type.toString() +
        "&state=" +
        this.form.state.toString() +
        "&signatoryRight=" +
        this.form.signatoryRight +
        "&operationalRight=" +
        this.form.operationalRight +
        "&situationalRemark=" +
        this.form.situationalRemark.toString() +
        "&closed=" +
        this.form.closed +
        "&currentProperty=" +
        this.form.currentProperty +
        "&source=" +
        this.form.source.toString() +
        "&propertyRight=" +
        this.form.propertyRight.toString() +
        "&orientationList=" +
        this.form.orientationList.toString() +
        "&specification=" +
        this.form.specification +
        "&coveredAreaMin=" +
        this.form.coveredAreaMin +
        "&coveredAreaMax=" +
        this.form.coveredAreaMax +
        "&completionAreabegain=" +
        this.form.completionAreabegain +
        "&completionAreaEnd=" +
        this.form.completionAreaEnd +
        "&nature=" +
        this.form.nature.toString() +
        "&situational=" +
        this.form.situational +
        "&completionAreabegain=" +
        this.form.completionAreabegain +
        "&completionAreaEnd=" +
        this.form.completionAreaEnd +
        "&demolitionState=" +
        this.form.demolitionState +
        "&maintainType=" +
        this.form.maintainType;
      //window.location.href = url;
      var elemIF = document.createElement("iframe");
      elemIF.src = url;
      elemIF.style.display = "none";
      elemIF.onload = function () {
        setTimeout(function () {
          elemIF.remove();
        }, 2000);
      };
      document.body.appendChild(elemIF);
    },

    //  // 导出按钮
    //     exportProposedDistributionHouse() {
    //       let url = "";
    //       url =
    //         process.env.API +
    //         inquery.exportProposedDistributionHouse ;
    //       //window.location.href = url;
    //       var elemIF = document.createElement("iframe");
    //       elemIF.src = url;
    //       elemIF.style.display = "none";
    //       elemIF.onload = function() {
    //         setTimeout(function() {
    //           elemIF.remove();
    //         }, 2000);
    //       };
    //       document.body.appendChild(elemIF);
    //     },

    //  // 导出按钮
    //     exportHouseBatchInfo() {
    //       let url = "";
    //       url =
    //         process.env.API +
    //         inquery.exportHouseBatchInfo ;
    //       //window.location.href = url;
    //       var elemIF = document.createElement("iframe");
    //       elemIF.src = url;
    //       elemIF.style.display = "none";
    //       elemIF.onload = function() {
    //         setTimeout(function() {
    //           elemIF.remove();
    //         }, 2000);
    //       };
    //       document.body.appendChild(elemIF);
    //     },

    //展开功能
    opennAllSearch() {
      this.show = !this.show;
    },
    titleFormat(data) {
      let name = decodeURI(data).split("=")[1];
      return name;
    },
    //验证只能输入正整数
    proving1() {
      this.form.coveredAreaMin = this.form.coveredAreaMin.replace(
        /[^\.\d]/g,
        ""
      );
      this.form.coveredAreaMin = this.form.coveredAreaMin.replace(
        /\.{2,}/g,
        "."
      ); //只保留第一个. 清除多余的
      this.form.coveredAreaMin = this.form.coveredAreaMin
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", "."); //只保留一个小数点
    },
    proving2() {
      this.form.coveredAreaMax = this.form.coveredAreaMax.replace(
        /[^\.\d]/g,
        ""
      );
      this.form.coveredAreaMax = this.form.coveredAreaMax.replace(
        /\.{2,}/g,
        "."
      ); //只保留第一个. 清除多余的
      this.form.coveredAreaMax = this.form.coveredAreaMax
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", "."); //只保留一个小数点
      // this.form.coveredAreaMax=this.form.coveredAreaMax.replace('.','');
    },
    handleSizeChange(val) {
      //改变页面显示条数
      this.pageSize = val;
      this.getHouseList(1);
    },
    handleCurrentChange(val) {
      //跳转页面
      this.currentPage = val;
      this.getHouseList();
    },
    //重置按钮
    reset() {
      this.form = {
        districtName: "",
        buildingName: "",
        houseNo: "",
        type: "",
        orientationList: "",
        coveredAreaMax: "",
        coveredAreaMin: "",
        source: "",
        nature: "",
        state: "",
        propertyRight: "",
        situational: "", //是否问题房源
        districtNo: "",
        buildNo: "",
        signatoryRight: "",
        operationalRight: "",
        situationalRemark: "", //房源标注
        closed: "",
        currentProperty: "",
        specification: "",
        allocationRight: "",
        completionAreaEnd: "",
        completionAreabegain: "",
        demolitionState: "",
        maintainType: "",
      };
    },
    //获取房屋列表
    getHouseList(index) {
      // console.log(this.form.state)
      // let newState = this.form.state
      // console.log(newState.includes(99),newState.includes(88))
      // if(newState.includes(99)) {
      //   let index = newState.indexOf(99);
      //   newState.splice(index, 1)
      //   newState.push(20, 21, 22)
      //   console.log(newState)
      // }else if(newState.includes(88)) {
      //   let index = newState.indexOf(88);
      //   newState.splice(index, 1)
      //   newState.push(1,2,3,4,5,7,8,9,14)
      //   console.log(newState)
      // }
      if (index) {
        this.currentPage = index;
      }
      let params = {
        districtName: this.form.districtName,
        buildingName: this.form.buildingName,
        houseNo: this.form.houseNo,
        type: this.form.type.toString(),
        orientationList: this.form.orientationList.toString(),
        coveredAreaMax: this.form.coveredAreaMax,
        coveredAreaMin: this.form.coveredAreaMin,
        completionAreabegain: this.form.completionAreabegain,
        completionAreaEnd: this.form.completionAreaEnd,
        situational: this.form.situational,
        source: this.form.source.toString(),
        nature: this.form.nature.toString(),
        state: this.form.state.toString(),
        propertyRight: this.form.propertyRight.toString(),
        districtNo: this.form.districtNo,
        buildNo: this.form.buildNo,
        signatoryRight: this.form.signatoryRight,
        operationalRight: this.form.operationalRight,
        situationalRemark: this.form.situationalRemark.toString(),
        closed: this.form.closed,
        secondDistribution: this.form.secondDistribution, //是否被二次分配
        currentProperty: this.form.currentProperty,
        specification: this.form.specification,
        allocationRight: this.form.allocationRight,
        demolitionState: this.form.demolitionState,
        maintainType: this.form.maintainType,
        fpdw: this.form.fpdw,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
      };
      http
        .getCityHouseList(params)
        .then((res) => {
          this.tableData = res.content;
          this.totalNumber = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开详情
    goDetail(val) {
      let tab = {
        route: "/vacuumRoomDetail/" + val.guid,
        name: val.districtName,
        query: {
          childtitle: "房屋综合查询(市局)",
        },
        type: "single",
      };
      this.openTopTab(tab);
    },
    //获取字典
    getDictionary() {
      let namesArr = [
        "房产来源",
        "户型",
        "朝向",
        "房屋性质",
        // "房屋状态",
        "当前属性",
        "分配权归属单位",
        // "签约权归属单位",
        "数据维护权归属",
        "运维权归属",
        "房源标注",
      ];
      let params = {
        names: namesArr.toString(),
      };
      api
        .getDictionary(params)
        .then((res) => {
          res = JSON.parse(res);
          this.natureData = this.$dictionaryChange(
            res.房屋性质,
            this.natureData,
            "通用"
          );
          this.sourceData = res.房产来源;
          this.typeData = res.户型;
          this.orientationData = this.$dictionaryChange(
            res.朝向,
            this.orientationData,
            "通用"
          );
          // this.stateData = res.房屋状态;
          this.currentPropertyData = res.当前属性;
          this.divisionUnit = res.分配权归属单位;
          // this.signingUnit = res.签约权归属单位;
          this.maintenanceUnit = res.数据维护权归属;
          this.operations = res.运维权归属;
          this.situationalRemarkData = res.房源标注;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getDictionary();
    this.getPropertyRightUnit();
    this.getSignUpRight(); //获取签约权下拉数据
    this.Event.$on("inquireHouse", (data) => {
      if (data == "inquireHouse") {
        this.getHouseList();
      }
    });
  },
};
</script>

<style lang="scss"scoped>
#city-bureau-inquire {
  overflow-x: hidden;
  overflow-y: auto;
}
.content {
  background: white;
}
</style>
