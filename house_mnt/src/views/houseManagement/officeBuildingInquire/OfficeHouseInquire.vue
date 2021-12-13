<!--
 * @Description: 局建房查询
 * @Author: maxq
 * @Date: 2020-04-07 15:17
 * @LastEditors: chenwen
 * @LastEditTime: 2020-11-18 17:40:46
 -->

<template>
  <div id="inquireHouse" class="page-detail">
    <div class="content">
      <div class="contentColor">
        <div class="top">
          <el-form ref="form" :model="form" label-width="5rem" size="mini">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="小区">
                  <el-autocomplete
                    class="inline-input"
                    v-model="form.district"
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
                <el-form-item label="栋号" label-width="7.5rem">
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
                <el-form-item label="房号" label-width="4rem">
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
                <el-form-item label="产权归属">
                  <el-select
                    v-model="form.propertyRight"
                    placeholder="--请选择--"
                    multiple
                    class="w100"
                    clearable
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
                <el-form-item label="分配权" label-width="4rem">
                  <el-select
                    v-model="form.allocationRight"
                    placeholder="--请选择--"
                    class="w100"
                    clearable
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
            </el-row>
            <el-row :gutter="20">
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
                <el-form-item label="备注" label-width="7.5rem">
                  <el-input
                    v-model="form.remark"
                    @change="getHouseList(1)"
                  ></el-input>
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
              <el-col :span="6">
                <el-form-item label="退房时间">
                  <el-row :gutter="0">
                    <el-col :span="11">
                      <el-date-picker
                        type="date"
                        v-model="form.date1"
                        clearable
                        style="width: 100%"
                        @change="getHouseList(1)"
                      ></el-date-picker>
                    </el-col>
                    <el-col :span="2" style="text-align: center">
                      <span>-</span>
                    </el-col>
                    <el-col :span="11">
                      <el-date-picker
                        type="date"
                        v-model="form.date2"
                        clearable
                        style="width: 100%"
                        @change="getHouseList(1)"
                      ></el-date-picker>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
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
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" style="text-align: right">
                <el-form-item label-width="0">
                  <el-button
                    type="primary"
                    @click="getHouseList(1)"
                    v-if="hasPerm('fygl_sjglzfcx_cx')"
                    >查询</el-button
                  >
                  <el-button type="primary" @click="reset()">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!--导出数据按钮-->
        <div class="toolbar" style="margin-left: 15px">
          <el-button
            type="primary"
            @click="exportTable"
            size="mini"
            v-if="hasPerm('fygl_sjglzfcx_dc')"
            >导出</el-button
          >
        </div>
        <!--结果列表-->
        <div class="content" style="margin-top: 10px; margin-bottom: 10px">
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
            <el-table-column prop="maintainNo" label="办文号"></el-table-column>
            <el-table-column
              prop="houseLayoutName"
              label="户型"
            ></el-table-column>
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
            <el-table-column
              prop="specification"
              label="备注"
            ></el-table-column>
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
              prop="emptyTime"
              label="空置时间"
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
              prop="natureName"
              label="房源性质"
            ></el-table-column>
            <el-table-column label="竣工时间">
              <template slot-scope="scope">{{
                scope.row.finishConstructionTime | dateFormat
              }}</template>
            </el-table-column>
            <el-table-column
              prop="pc"
              label="分配方式/批次信息"
            ></el-table-column>
            <el-table-column prop="inspect" label="是否核查"></el-table-column>
            <el-table-column label="操作" width="320">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="changeNote(scope.row)"
                  >修改备注</el-button
                >
                <el-button
                  type="success"
                  size="mini"
                  @click="maintianSave(scope.row)"
                  >维修登记</el-button
                >
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
    <!-- 备注弹框 -->
    <el-dialog
      title="备注"
      width="40%"
      v-if="openNoteDialog"
      :visible.sync="openNoteDialog"
      :close-on-click-modal="false"
    >
      <div>
        <el-row :gutter="20">
          <el-col :span="4" style="text-align: right">备注</el-col>
          <el-col :span="18">
            <el-input
              v-model="remark"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              clearable
            ></el-input>
          </el-col>
        </el-row>
      </div>
      <div id="btn_box">
        <el-button
          size="mini"
          @click="
            openNoteDialog = false;
            remark = '';
          "
          >取消</el-button
        >
        <el-button size="mini" type="primary" @click="confirmNote()"
          >确定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="维修登记"
      width="40%"
      v-if="openMaintainDialog"
      :visible.sync="openMaintainDialog"
      :close-on-click-modal="false"
    >
      <div class="tableStyle">
        <table>
          <tr>
            <td>维修状态</td>
            <td colspan="3">
              <el-select v-model="maintainInfo.maintainType">
                <el-option
                  v-for="(item, index) in stateList1"
                  :label="item.name"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>办文编号</td>
            <td>
              <el-input v-model="maintainInfo.maintainNo"></el-input>
            </td>
            <td>办文时间</td>
            <td>
              <el-date-picker
                type="date"
                v-model="maintainInfo.maintainNoDate"
              ></el-date-picker>
            </td>
          </tr>
          <tr>
            <td>登记人</td>
            <td>
              <!-- <el-input v-model="maintainInfo.registrantName" ></el-input> -->
              {{ maintainInfo.registrantName }}
            </td>
            <td>登记时间</td>
            <td>
              <el-date-picker
                v-model="maintainInfo.registrantDate"
              ></el-date-picker>
            </td>
          </tr>
          <tr>
            <td>备注</td>
            <td colspan="3">
              <el-input
                type="textarea"
                v-model="maintainInfo.remark"
              ></el-input>
            </td>
          </tr>
        </table>
        <div class="dialog-foot">
          <el-button type="primary" size="small" @click="saveEdit()"
            >提 交</el-button
          >
        </div>
      </div>
    </el-dialog>

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
import http from "@/api/inquery.js";
import api from "@/api/housestore.js";
import officeapi from "@/api/vacuumRoominquire.js";
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
        district: "",
        buildNo: "",
        buildName: "",
        houseNo: "",
        type: "",
        state: "",
        propertyRight: "",
        allocationRight: "",
        secondDistribution: "", // 是否被二次分配
        remark: "",
        maintainType: "",
        simpleNature: "",
        inspect:""
      }, //表单
      sourceData: [], //来源下拉
      typeData: [], //类型下拉
      stateList1: [
        { name: "已申报维修", value: 2 },
        { name: "已完成维修", value: 3 },
      ],
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
      tableData: [], //表格假数据
      //分页需要的数据
      currentPage: 1,
      pageSize: 10,
      pageSizesList: [10, 20, 50, 100, 200],
      totalNumber: 0, //数据的总数
      maintainInfo: {},
      simpleNatureData: [],
      options: [
        { value: "1", label: "是" },
        { value: "0", label: "否" },
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
      show: false, //菜单栏是否显示完全
      selectCommunityOptions: [], //选中的小区
      openNoteDialog: false, //控制备注弹框显隐
      openMaintainDialog: false, //控制维修登记弹框显隐
      openInspectDialog: false, //控制核查状态弹框显隐
      remark: "", //备注弹框-备注字段
      houseGuid: "", //房屋标识
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
        searchContent: this.form.district,
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
        .propertyUnitList(params)
        .then((res) => {
          this.selectPropertyRightUnitOptions = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取分配权下拉数据
    divisionList() {
      let params = {};
      publicMethod
        .allocationUnitList(params)
        .then((res) => {
          this.divisionUnit = res.children;
        })
        .catch((err) => {});
    },
    deleteParmas() {
      if (!this.form.type || !this.form.type.length) {
        delete this.form.type;
      }
      if (!this.form.propertyRight || !this.form.propertyRight.length) {
        delete this.form.propertyRight;
      }
      if (!this.form.state || !this.form.state.length) {
        delete this.form.state;
      }
    },
    // 导出按钮
    exportTable() {
      this.deleteParmas();
      let data = {
        district: this.form.district,
        buildNo: this.form.buildNo,
        buildName: this.form.buildName,
        houseNo: this.form.houseNo,
        type: this.form.type,
        propertyRight: this.form.propertyRight,
        state: this.form.state,
        allocationRight: this.form.allocationRight,
        secondDistribution: this.form.secondDistribution, //是否被二次分配
        remark: this.form.remark,
        maintainType: this.form.maintainType,
        checkOutStartDate: this.form.date1,
        checkOutEndDate: this.form.date2,
        inspect: this.form.inspect,
      };
      let url = "";
      url = process.env.API + inquery.exportBureauHouse;
      // window.location.href = url;
      // var elemIF = document.createElement("iframe");
      // elemIF.src = url;
      // elemIF.style.display = "none";
      // elemIF.onload = function () {
      //   setTimeout(function () {
      //     elemIF.remove();
      //   }, 2000);
      // };
      // document.body.appendChild(elemIF);
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
    //修改备注按钮
    changeNote(val) {
      if (val.specification) this.remark = val.specification; //若此条存在备注，则给弹框赋值
      this.openNoteDialog = true;
      this.houseGuid = val.guid;
    },
    //登记维修记录
    maintianSave(val) {
      this.maintainInfo = {
        maintainType: "",
        maintainNo: "",
        maintainNoDate: "",
        registrantName: "",
        registrantDate: new Date(),
        remark: "",
      };
      this.openMaintainDialog = true;
      this.houseGuid = val.guid;
      this.getUserName();
    },
    //
    inspectSave(val) {
      this.inspect="",
      this.houseGuid = val.guid;
      this.openInspectDialog = true;
    },
    //获取当前登录人的信息
    getUserName() {
      let params = {};
      officeapi
        .getUserInfo(params)
        .then((res) => {
          this.maintainInfo.registrant = res.userLoginName;
          this.maintainInfo.registrantName = res.userName;
          console.log(res.userName);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //备注弹框内-确定按钮
    confirmNote() {
      let params = {
        houseGuid: this.houseGuid,
        remark: this.remark,
      };
      http
        .changeHouseRemark(params)
        .then((res) => {
          this.openNoteDialog = false;
          (this.remark = ""), //置空
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
    modifyHouseInspect() {
      let params = {
        houseGuid: this.houseGuid,
        inspect: this.inspect,
      };
      publicMethod
        .modifyHouseInspect(params)
        .then((res) => {
          this.openInspectDialog = false;
          this.inspect="",
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
        district: "",
        buildNo: "",
        buildName: "",
        houseNo: "",
        type: "",
        state: [],
        propertyRight: "",
        allocationRight: "",
        remark: "",
        inspect:""
      };
    },
    //获取房屋列表
    getHouseList(index) {
      if (index) {
        this.currentPage = index;
      }
      if (this.form.date1) {
        this.form.date1 = new Date(this.form.date1)
          .format("yyyy-MM-dd")
          .toString();
      }
      if (this.form.date2) {
        this.form.date2 = new Date(this.form.date2)
          .format("yyyy-MM-dd")
          .toString();
      }
      let params = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
      };
      this.deleteParmas();
      let nature = this.setSimpleNature(this.form.simpleNature);
      let data = {
        district: this.form.district,
        buildNo: this.form.buildNo,
        buildName: this.form.buildName,
        houseNo: this.form.houseNo,
        type: this.form.type,
        propertyRight: this.form.propertyRight,
        state: this.form.state,
        allocationRight: this.form.allocationRight,
        secondDistribution: this.form.secondDistribution, //是否被二次分配
        remark: this.form.remark,
        maintainType: this.form.maintainType,
        checkOutStartDate: this.form.date1,
        checkOutEndDate: this.form.date2,
        simpleNature: nature.simple,
        notSimpleNature: nature.notSimple,
        inspect: this.form.inspect,
      };
      http
        .bureaubuildingHouse(params, data)
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
        route: "/officeBuildingHouseTab/" + val.guid,
        name: val.districtName,
        type: "single",
        query: {
          districtName: val.districtName, //小区名称
          buildName: val.buildName, //栋名称
          houseNo: val.houseNo, //房号
        },
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
        "房屋状态",
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
          this.stateData = res.房屋状态;
          //剔除局建房不需要得下拉数据
          this.stateData = this.stateData.filter(
            (item) =>
              !(item.name == "已取得全部产权") &&
              !(item.name == "已出售") &&
              !(item.name == "已拆除") &&
              !(item.name == "长租住房租赁到期") &&
              !(item.name == "其他原因出库")
          );
          this.currentPropertyData = res.当前属性;
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
    //编辑后保存
    saveEdit() {
      let params = { houseGuid: this.houseGuid };
      let data = this.maintainInfo;
      officeapi
        .saveMaintainInfo(params, data)
        .then((res) => {
          this.$message({ type: "success", message: "保存成功！" });
          this.openMaintainDialog = false;
          this.$message({
            type: "success",
            message: "保存成功!",
          });
          this.getHouseList(); //刷新表格数据
        })
        .catch((err) => {
          console.log(res);
        });
    },
  },
  mounted() {
    this.getDictionary();

    this.getPropertyRightUnit(); //产权归属下拉数据
    this.divisionList(); //分配权下拉数据
    this.Event.$on("inquireHouse", (data) => {
      if (data == "inquireHouse") {
        this.getHouseList();
      }
    });
  },
};
</script>

<style lang="scss"scoped>
#inquireHouse {
  overflow-x: hidden;
  overflow-y: auto;
}
.content {
  background: white;
}
#btn_box {
  text-align: center;
  margin-top: 20px;
}
</style>
