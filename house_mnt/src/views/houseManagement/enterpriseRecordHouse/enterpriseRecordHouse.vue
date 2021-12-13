
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
            </el-row>

            <div v-if="show" class="show">
              <el-row :gutter="20">
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
                  <el-form-item label="签约模式">
                    <el-select
                      v-model="form.signModel"
                      placeholder="--请选择--"
                      class="w100"
                      clearable
                      @change="getHouseList(1)"
                    >
                      <el-option
                        :label="item.name"
                        :value="item.value"
                        v-for="(item, key) in options"
                        :key="key"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="是否上报入住人">
                    <el-select
                      v-model="form.report"
                      placeholder="--请选择--"
                      class="w100"
                      clearable
                      @change="getHouseList(1)"
                    >
                      <el-option
                        :label="item.label"
                        :value="item.value"
                        v-for="(item, key) in options"
                        :key="key"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <el-row :gutter="20">
              <el-col :span="24" style="text-align: right">
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
        <div>
          <el-button type="primary" size="mini" @click="changeTransfer"
            >签约模式变更</el-button
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
            @selection-change="handleSelectionChange"
            @row-dblclick="goDetail"
            :header-cell-style="globalHeaderStyle"
            :cell-style="globalCellStyle"
          >
            <el-table-column type="selection"></el-table-column>
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
            <el-table-column prop="typeName" label="户型"></el-table-column>
            <el-table-column
              prop="orientationName"
              label="朝向"
            ></el-table-column>
            <el-table-column
              prop="stateName"
              label="房屋状态"
            ></el-table-column>
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
              prop="propertyRightUnit"
              label="产权归属"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="report"
              label="是否上报入住人"
              width="150"
            ></el-table-column>
            <el-table-column prop="qianyms" label="签约方式"></el-table-column>
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
    <div v-if="isShowRights">
      <el-dialog
        title="签约模式修改"
        :visible.sync="isShowRights"
        width="95%"
        :close-on-click-modal="false"
      >
        <signModelDialog @isShow="closeDialog"></signModelDialog>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/api/cityWideInquireHouse.js";
import api from "@/api/housestore.js";
import publicMethod from "@/api/publicMethod.js";
import signModelDialog from "./SignModelDialog.vue"; //使用权变更
import axios from "dist-axios";
import { cityWideInquireHouse } from "@/api/paths.js";

export default {
  name: "inquire",
  components: {
    cityWideInquireHouse,
    signModelDialog,
  },
  data() {
    return {
      form: {
        districtNo: "",
        districtName: "",
        buildName: "",
        buildNo: "",
        houseNo: "",
        type: "",
        state: "",
        signatoryRight: "",
        operationalRight: "",
        allocationRight: "",
        // signatoryRight: "",
        currentProperty: "",
        propertyRight: "",
        orientation: "",
        nature: "",
        report: "",
        record: "",
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
      //分页需要的数据
      vacuumRoomForm: {
        currentPage: 1,
        pageSize: 10,
        pageSizesList: [10, 20, 50, 100, 200],
        totalNumber: 0, //数据的总数
      },
      options: [
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
      multipleSelection: [],
      dialogFormVisible: false,
      copyFrom: [],
      isShowRights: false,
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

      let data = {
        orientationList:
          this.form.orientation.length == 0 ? "" : this.form.orientation,
        state: this.form.state.length == 0 ? "" : this.form.state,
        type: this.form.type.length == 0 ? "" : this.form.type,
        districtName: this.form.districtName,
        buildName: this.form.buildName,
        houseNo: this.form.houseNo,
        propertyRight:
          this.form.propertyRight.length == 0 ? "" : this.form.propertyRight,
        districtNo: this.form.districtNo,
        buildNo: this.form.buildNo,
        signatoryRight:
          this.form.signatoryRight.length == 0 ? "" : this.form.signatoryRight,
        allocationRight:
          this.form.allocationRight.length == 0
            ? ""
            : this.form.allocationRight,  
        report: this.form.report,
        record: this.form.record,
        signModel:this.form.signModel
      };

      http
        .getEnterpriseHouseList(params, data)
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
      };
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
        "单位分配权归属单位",
        "签约权归属单位",
        "数据维护权归属",
        "运维权归属",
        "房源标注",
        "签约模式"
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
          this.divisionUnit = res.单位分配权归属单位;
          this.signingUnit = res.签约权归属单位;
          this.maintenanceUnit = res.数据维护权归属;
          this.operations = res.运维权归属;
          this.situationalRemarkData = res.房源标注;
          this.options = res.签约模式
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开详情
    goDetail(val) {
      let tab = {
        route: "/enterpriseRecordHouseDetail/" + val.guid,
        name: val.districtName,
        type: "single",
        query: {
          childtitle: "企业自有住房查询",
        },
      };
      this.openTopTab(tab);
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //签约模式变更
    changeTransfer() {
      this.isShowRights = true;
    },
    //关闭弹框
    closeDialog() {
      this.isShowRights = false;
    },
  },
  mounted() {
    this.getDictionary();
    this.getPropertyRightUnit();
    this.getHouseList();
    this.Event.$on("recordHouse", (data) => {
      if (data == "getHouseList") {
        this.getHouseList();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
#cityWideInquireHouse {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

