<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-19 19:28:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-31 11:29:36
 -->
<!--全市房屋综合查询-->
<template>
  <div id="cityWideInquireHouse" class="page-detail">
    <div class="content">
      <div class="contentColor">
        <div class="top">
          <el-form ref="form" :model="form" label-width="8rem" size="mini">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="小区">
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
                <el-form-item label="栋号">
                  <el-input
                    v-model="form.buildNo"
                    clearable
                    @change="getHouseList(1)"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="栋名称">
                  <el-input
                    v-model="form.buildName"
                    clearable
                    @change="getHouseList(1)"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="房号">
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
                <el-form-item label="所属区">
                  <el-select
                    v-model="form.area"
                    placeholder="--请选择--"
                    class="w100"
                    clearable
                    multiple
                    @change="getHouseList(1)"
                  >
                    <el-option
                      v-for="item in areaData"
                      :label="item.name"
                      :value="item.value"
                      :key="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所在街道">
                  <el-input
                    v-model="form.street"
                    clearable
                    @change="getHouseList(1)"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="户型">
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
                <el-form-item label="朝向">
                  <el-select
                    v-model="form.orientation"
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
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="预测绘建筑面积">
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
                <el-form-item label="竣工建筑面积">
                  <el-row :gutter="0">
                    <el-col :span="11">
                      <el-input
                        v-model="form.completionAreabegain"
                        clearable
                        @change="getHouseList(1)"
                      ></el-input>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center"
                      >-</el-col
                    >
                    <el-col :span="11">
                      <el-input
                        v-model="form.completionAreaEnd"
                        clearable
                        @change="getHouseList(1)"
                      ></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="房源性质">
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
                <el-form-item label="维修状态">
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
            <div v-if="show" class="show">
              <el-row :gutter="20">
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
                  <el-form-item label="房产来源">
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
                  <el-form-item label="房屋状态">
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
                  <el-form-item label="是否查封冻结">
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
              </el-row>
              <el-row :gutter="20">
                <!-- <el-col :span="6">
                  <el-form-item label="空房标注" label-width="7rem">
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
                  </el-form-item>
                </el-col>-->
                <el-col :span="6">
                  <el-form-item label="产权归属">
                    <el-select
                      v-model="form.propertyRight"
                      placeholder="--请选择--"
                      class="w100"
                      clearable
                      multiple
                      filterable
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
                  <el-form-item label="分配权">
                    <el-select
                      v-model="form.allocationRight"
                      placeholder="--请选择--"
                      class="w100"
                      clearable
                      multiple
                      filterable
                      @change="getHouseList(1)"
                    >
                      <el-option
                        v-for="item in divisionUnit"
                        :label="item.name"
                        :value="item.value"
                        :key="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="签约权">
                    <el-select
                      v-model="form.signatoryRight"
                      placeholder="--请选择--"
                      class="w100"
                      clearable
                      multiple
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
                  <el-form-item label="数据运维权">
                    <el-select
                      v-model="form.operationalRight"
                      placeholder="--请选择--"
                      class="w100"
                      clearable
                      multiple
                      filterable
                      @change="getHouseList(1)"
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
              </el-row>
              <el-row :gutter="20">
                <!-- <el-col :span="6">
                  <el-form-item label="备注">
                    <el-input v-model="form.specification" clearable @change="getHouseList(1)"></el-input>
                  </el-form-item>
                </el-col>-->
                <el-col :span="6">
                  <el-form-item label="当前属性">
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
                  <el-form-item label="是否包含核销">
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
                  <el-form-item label="是否问题房源">
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
                <el-col :span="6">
                  <el-form-item label="简版房源性质">
                    <el-select
                      v-model="form.simpleNature"
                      placeholder="--请选择--"
                      class="w100"
                      clearable
                      @change="getHouseList(1)"
                    >
                      <el-option
                        :label="item.name"
                        :value="item.value"
                        v-for="item in simpleNatureData"
                        :key="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="是否核查"  label-width="7.5rem">
                  <el-select
                    v-model="form.inspect"
                    placeholder="--请选择--"
                    class="w100"
                    clearable
                    @change="getHouseList(1)"
                  >
                    <el-option
                      v-for="item in inspectFormList"
                      :label="item.label"
                      :value="item.value"
                      :key="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="18" style="text-align: right">
                <el-form-item label-width="0">
                  <el-button
                    type="primary"
                    @click="opennAllSearch()"
                    v-if="!show && hasPerm('fygl_qsfwzhcx_sq')"
                    >展开</el-button
                  >
                  <el-button
                    type="primary"
                    @click="opennAllSearch()"
                    v-if="show && hasPerm('fygl_qsfwzhcx_sq')"
                    >收起</el-button
                  >
                  <el-button
                    type="primary"
                    @click="getHouseList(1)"
                    v-if="hasPerm('fygl_qsfwzhcx_cx')"
                    >查询</el-button
                  >
                  <el-button
                    type="primary"
                    @click="reset()"
                    v-if="hasPerm('fygl_qsfwzhcx_cz')"
                    >重置</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!--导出数据按钮-->
        <div class="toolbar">
          <el-button
            type="primary"
            size="mini"
            @click="exportList()"
            v-if="hasPerm('fygl_qsfwzhcx_dc')"
            >导出</el-button
          >
        </div>
        <!--结果列表-->
        <div class="table-list" style="margin-top: 10px; margin-bottom: 10px">
          <el-table
            :data="VacuumRoomList"
            border
            ref="houseTable"
            size="mini"
            style="width: 100%"
            class="w100"
            @row-dblclick="goDetail"
            :header-cell-style="globalHeaderStyle"
            :cell-style="globalCellStyle"
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
            <el-table-column prop="maintainNo" label="办文号"></el-table-column>
            <el-table-column prop="areaName" label="所在区"></el-table-column>
            <el-table-column prop="typeName" label="户型"></el-table-column>
            <el-table-column
              prop="orientationName"
              label="朝向"
            ></el-table-column>
            <el-table-column
              prop="coveredArea"
              label="预测绘建筑面积(平方米)"
              width="160"
            ></el-table-column>
            <el-table-column
              prop="completionArea"
              label="竣工建筑面积(平方米)"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="stateName"
              label="房屋状态"
            ></el-table-column>
            <!-- <el-table-column prop="situationalRemark" label="空房标注"></el-table-column> -->
            <!-- <el-table-column prop="specification" label="备注"></el-table-column> -->
            <el-table-column
              prop="allocationRightUnit"
              label="分配权"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="signatoryRightUnit"
              label="签约权"
              width="150"
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
              prop="propertyRightUnit"
              label="产权归属"
              width="150"
            ></el-table-column>
            <el-table-column prop="inspect" label="是否核查"></el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="inspectSave(scope.row)"
                  >是否核查</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="page_box" style="background: white">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="vacuumRoomForm.currentPage"
              :page-sizes="vacuumRoomForm.pageSizesList"
              :page-size="vacuumRoomForm.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="vacuumRoomForm.totalNumber"
              background
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="是否核查"
      width="40%"
      v-if="openInspectDialog"
      :visible.sync="openInspectDialog"
      :close-on-click-modal="false"
    >
      <div>
        <el-row :gutter="20">
          <el-col :span="4" style="text-align: right">是否核查</el-col>
          <el-col :span="18">
            <el-select
              v-model="inspect"
              placeholder="--请选择--"
              class="w100"
              clearable
            >
              <el-option
                v-for="item in inspectList"
                :label="item.label"
                :value="item.value"
                :key="item.name"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div id="btn_box">
        <el-button size="mini" @click="openInspectDialog = false"
          >取消</el-button
        >
        <el-button size="mini" type="primary" @click="modifyHouseInspect()"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/api/cityWideInquireHouse.js";
import api from "@/api/housestore.js";
import publicMethod from "@/api/publicMethod.js";
import axios from "dist-axios";
import { cityWideInquireHouse } from "@/api/paths.js";

export default {
  name: "inquire",
  data() {
    return {
      form: {
        districtNo: "",
        districtName: "",
        buildName: "",
        buildNo: "",
        houseNo: "",
        area: "",
        street: "",
        type: "",
        state: "",
        signatoryRight: "",
        operationalRight: "",
        allocationRight: "",
        situational: "",
        // allocationRight: "",
        // signatoryRight: "",
        // operationalRight: "",
        situationalRemark: "",
        closed: "",
        secondDistribution: "", // 是否被二次分配
        currentProperty: "",
        source: "",
        propertyRight: "",
        orientation: "",
        specification: "",
        coveredAreaMin: "",
        coveredAreaMax: "",
        completionAreabegain: "",
        completionAreaEnd: "",
        nature: "",
        isVacuumHouse: "",
        demolitionState: 0,
        maintainType: "",
        simpleNature: "",
      }, //表单
      sourceData: [], //来源下拉
      typeData: [], //类型下拉
      areaData: [], //所属区下拉
      orientationData: [], //朝向下拉
      oldOptions: [], // 用来储存上一次的数据
      natureData: [], //房屋性质下拉
      stateData: [], //房屋状态下拉
      currentPropertyData: [], //当前属性下拉
      divisionUnit: [], //分配权归属单位;
      signingUnit: [], //签约权归属单位;
      maintenanceUnit: [], //数据维护权归属;
      operations: [], //运维权归属;
      selectPropertyRightUnitOptions: [], //产权单位下拉
      situationalRemarkData: [], //房源标注下拉
      VacuumRoomList: [], //真空房列表数据
      tableData: [],
      simpleNatureData: [],
      //分页需要的数据
      vacuumRoomForm: {
        currentPage: 1,
        pageSize: 10,
        pageSizesList: [10, 20, 50, 100, 200],
        totalNumber: 0, //数据的总数
      },
      options: [
        { value: 1, label: "是" },
        { value: 0, label: "否" },
      ],
      show: false, //搜索条件是否显示完全
      rulesx: [{ required: true }], //必填规则
      selectCommunityOptions: [], //选中的小区
      stateList: [
        { name: "退房待维修", value: 1 },
        { name: "已申报维修", value: 2 },
        { name: "已完成维修", value: 3 },
        { name: "空", value: "null" },
      ],
      inspect: "",
      inspectList: [
        { value: true, label: "是" },
        { value: false, label: "否" },
      ],
      inspectFormList: [
        { value: "1", label: "是" },
        { value: "0", label: "否" },
      ],
      openInspectDialog: false, //控制核查状态弹框显隐
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
    inspectSave(val) {
      (this.inspect = ""), (this.houseGuid = val.guid);
      this.openInspectDialog = true;
    },
    modifyHouseInspect() {
      let params = {
        houseGuid: this.houseGuid,
        inspect: this.inspect,
      };
      publicMethod
        .modifyHouseInspect(params)
        .then((res) => {
          this.openInspectDialog = false;
          (this.inspect = ""),
            this.$message({
              type: "success",
              message: "保存成功!",
            });
          this.getHouseList(); //刷新表格数据
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //得到每页的编号
    indexMethod(index) {
      return (
        index +
        (this.vacuumRoomForm.currentPage - 1) * this.vacuumRoomForm.pageSize +
        1
      );
    },

    //获取列表
    getHouseList(index) {
      if (index) {
        this.vacuumRoomForm.currentPage = index;
      }
      let params = {
        pageIndex: this.vacuumRoomForm.currentPage,
        pageSize: this.vacuumRoomForm.pageSize,
      };
      this.deleteParmas();
      let nature = this.setSimpleNature(this.form.simpleNature);
      let data = {
        orientationList: this.form.orientation,
        source: this.form.source,
        nature: this.form.nature,
        state: this.form.state,
        type: this.form.type,
        districtName: this.form.districtName,
        buildName: this.form.buildName,
        houseNo: this.form.houseNo,
        coveredAreaMax: this.form.coveredAreaMax,
        coveredAreaMin: this.form.coveredAreaMin,
        completionAreabegain: this.form.completionAreabegain,
        completionAreaEnd: this.form.completionAreaEnd,
        situational: this.form.situational,
        propertyRight: this.form.propertyRight,
        districtNo: this.form.districtNo,
        buildNo: this.form.buildNo,
        isVacuumHouse: this.form.isVacuumHouse,
        situationalRemark: this.form.situationalRemark,
        closed: this.form.closed,
        secondDistribution: this.form.secondDistribution, //是否被二次分配
        currentProperty: this.form.currentProperty,
        specification: this.form.specification,
        area: this.form.area,
        street: this.form.street,
        signatoryRight: this.form.signatoryRight,
        operationalRight: this.form.operationalRight,
        allocationRight: this.form.allocationRight,
        maintainType: this.form.maintainType,
        demolitionState: this.form.demolitionState,
        simpleNature: nature.simple,
        notSimpleNature: nature.notSimple,
        inspect:this.form.inspect,
      };
      http
        .getCityWideHouse(params, data)
        .then((res) => {
          this.VacuumRoomList = res.content;
          this.vacuumRoomForm.totalNumber = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //改变页面显示条数
    handleSizeChange(val) {
      this.vacuumRoomForm.currentPage = 1;
      this.vacuumRoomForm.pageSize = val;
      this.getHouseList();
    },
    //改变当前页码
    handleCurrentChange(val) {
      this.vacuumRoomForm.currentPage = val;
      this.getHouseList();
    },
    //展开功能
    opennAllSearch() {
      this.show = !this.show;
    },
    //重置
    reset() {
      this.form = {
        districtNo: "",
        districtName: "",
        buildName: "",
        buildNo: "",
        houseNo: "",
        area: "",
        street: "",
        type: "",
        state: "",
        signatoryRight: "",
        operationalRight: "",
        allocationRight: "",
        situational: "",
        situationalRemark: "",
        closed: "",
        currentProperty: "",
        source: "",
        propertyRight: "",
        orientation: "",
        specification: "",
        coveredAreaMin: "",
        coveredAreaMax: "",
        completionAreabegain: "",
        completionAreaEnd: "",
        nature: "",
        isVacuumHouse: "",
        demolitionState: "",
        simpleNature: "",
        notSimpleNature: "",
        inspect:""
      };
    },
    deleteParmas() {
      if (!this.form.orientation || !this.form.orientation.length) {
        delete this.form.orientation;
      }
      if (!this.form.source || !this.form.source.length) {
        delete this.form.source;
      }
      if (!this.form.nature || !this.form.nature.length) {
        delete this.form.nature;
      }
      if (!this.form.state || !this.form.state.length) {
        delete this.form.state;
      }
      if (!this.form.type || !this.form.type.length) {
        delete this.form.type;
      }
      if (!this.form.propertyRight || !this.form.propertyRight.length) {
        delete this.form.propertyRight;
      }
      if (!this.form.area || !this.form.area.length) {
        delete this.form.area;
      }
      if (!this.form.signatoryRight || !this.form.signatoryRight.length) {
        delete this.form.signatoryRight;
      }
      if (!this.form.operationalRight || !this.form.operationalRight.length) {
        delete this.form.operationalRight;
      }
      if (!this.form.allocationRight || !this.form.allocationRight.length) {
        delete this.form.allocationRight;
      }
    },

    //导出数据
    exportList() {
      let url = "";
      this.deleteParmas();
      url = process.env.API + cityWideInquireHouse.exportCityWideHouse;
      let nature = this.setSimpleNature(this.form.simpleNature);
      let data = {
        orientationList: this.form.orientation,
        source: this.form.source,
        nature: this.form.nature,
        state: this.form.state,
        type: this.form.type,
        districtName: this.form.districtName,
        buildName: this.form.buildName,
        houseNo: this.form.houseNo,
        coveredAreaMax: this.form.coveredAreaMax,
        coveredAreaMin: this.form.coveredAreaMin,
        completionAreabegain: this.form.completionAreabegain,
        situationalRemark: this.form.situationalRemark,
        completionAreaEnd: this.form.completionAreaEnd,
        situational: this.form.situational,
        propertyRight: this.form.propertyRight,
        districtNo: this.form.districtNo,
        buildNo: this.form.buildNo,
        isVacuumHouse: this.form.isVacuumHouse,
        closed: this.form.closed,
        secondDistribution: this.form.secondDistribution, //是否被二次分配
        currentProperty: this.form.currentProperty,
        specification: this.form.specification,
        area: this.form.area,
        street: this.form.street,
        signatoryRight: this.form.signatoryRight,
        operationalRight: this.form.operationalRight,
        allocationRight: this.form.allocationRight,
        maintainType: this.form.maintainType,
        demolitionState: this.form.demolitionState,
        simpleNature: nature.simple,
        notSimpleNature: nature.notSimple,
        inspect:this.form.inspect,
      };
      let form = this.createForm();
      form.attr("action", url);
      form.attr("method", "get");
      form.append(this.processParam("mapJson", JSON.stringify(data)));
      form.submit();
    },
    createForm() {
      let form = $("<form>"); //定义一个form表单
      form.attr("style", "display:none");
      form.attr("target", "_top");
      form.attr("method", "get");
      $("body").append(form); //将表单放置在web中
      return form;
    },
    //整理form传参
    processParam(name, value) {
      let getdata = $("<input>");
      getdata.attr("type", "hidden");
      getdata.attr("name", name);
      getdata.attr("value", value);
      return getdata;
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
    //获取分配权下拉数据
    divisionList() {
      let params = {};
      publicMethod
        .divisionList(params)
        .then((res) => {
          this.divisionUnit = res.children;
        })
        .catch((err) => {});
    },
    //获取字典
    getDictionary() {
      let namesArr = [
        "房产来源",
        "户型",
        "朝向",
        "所属区",
        "房屋性质",
        "房屋状态",
        "当前属性",
        // "分配权归属单位",
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
          this.areaData = res.所属区;
          this.typeData = res.户型;
          this.orientationData = this.$dictionaryChange(
            res.朝向,
            this.orientationData,
            "通用"
          );
          this.stateData = res.房屋状态;
          this.currentPropertyData = res.当前属性;
          // this.divisionUnit = res.分配权归属单位;
          // this.signingUnit = res.签约权归属单位;
          this.maintenanceUnit = res.数据维护权归属;
          this.operations = res.运维权归属;
          this.situationalRemarkData = res.房源标注;

          this.simpleNatureData = this.getSimpleNatureData(this.natureData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //给简版房源性质组装下拉数据
    getSimpleNatureData(data) {
      let nt1;
      data.forEach((item) => {
        if (item.name === "安居型商品房") {
          nt1 = item;
        }
      });
      let nt2 = { name: "不包含安居型商品房", value: "-" + nt1.value };
      return [{ name: "全部", value: "0" }].concat([nt1, nt2]);
    },
    //给简版房源性质整理查询值
    setSimpleNature(data) {
      let res = { simple: "", notSimple: "" };
      if (parseInt(data) > 0) {
        res.simple = data;
      }
      if (parseInt(data) < 0) {
        res.notSimple = Math.abs(parseInt(data)) + "";
      }
      return res;
    },
    //打开详情
    goDetail(val) {
      let tab = {
        route: "/vacuumRoomDetail/" + val.guid,
        name: val.districtName,
        type: "single",
        query: {
          childtitle: "全市房屋综合查询",
        },
      };
      this.openTopTab(tab);
    },
  },
  mounted() {
    this.getDictionary();
    this.getPropertyRightUnit();
    this.getHouseList();
    this.getSignUpRight(); //获取签约权下拉数据
    this.divisionList(); //获取分配权下拉数据
  },
};
</script>

<style lang="scss" scoped>
#cityWideInquireHouse {
  overflow-x: hidden;
  overflow-y: auto;
}
#btn_box {
  text-align: center;
  margin-top: 20px;
}
</style>

