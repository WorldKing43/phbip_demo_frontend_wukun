<template>
  <div class="all-housing-resource">
    <div>
      <!--房源状况-->
      <GetMoreHouse :getPlanGuid="planGuid" ref="child" @reGetList="queryWaitSelectedList"></GetMoreHouse>
    </div>
    <!--待选房列表-->
    <div class="bg-fff details">
      <div class="title">
        <div class="title-icon"></div>
        <div class="title-font">待选房列表</div>
        <div class="title-bottom"></div>
      </div>
      <div class="margin30">
        <!--表单-->
        <el-form
          ref="form"
          :model="waitSelectedForm"
          label-position="left"
          size="mini"
          label-width="5rem"
        >
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="小区名称">
                <el-input
                  v-model="waitSelectedForm.districtName"
                  clearable
                  @change="queryWaitSelectedList(1)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="栋号">
                <el-input
                  v-model="waitSelectedForm.buildName"
                  clearable
                  @change="queryWaitSelectedList(1)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房号">
                <el-input
                  v-model="waitSelectedForm.houseNo"
                  clearable
                  @chnage="queryWaitSelectedList(1)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="户型">
                <el-select
                  v-model="waitSelectedForm.type"
                  placeholder
                  style="width: 100%"
                  clearable
                  @change="queryWaitSelectedList(1)"
                >
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in typeCode"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="房屋状态">
                <el-select
                  v-model="waitSelectedForm.state"
                  placeholder
                  style="width: 100%"
                  clearable
                  @change="queryWaitSelectedList(1)"
                >
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in stateCode"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="预测绘建筑面积" label-width="7rem">
                <el-row :gutter="0">
                  <el-col :span="10">
                    <el-input
                      v-model="waitSelectedForm.areaMin"
                      clearable
                      @change="queryWaitSelectedList(1)"
                    ></el-input>
                  </el-col>
                  <el-col class="line" :span="4" style="text-align: center">至</el-col>
                  <el-col :span="10">
                    <el-input
                      v-model="waitSelectedForm.areaMax"
                      clearable
                      @change="queryWaitSelectedList(1)"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="竣工建筑面积" label-width="6rem">
                <el-row :gutter="0">
                  <el-col :span="11">
                    <el-input
                      v-model="waitSelectedForm.completionAreabegain"
                      clearable
                      @change="queryWaitSelectedList(1)"
                    ></el-input>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align: center">-</el-col>
                  <el-col :span="11">
                    <el-input
                      v-model="waitSelectedForm.completionAreaEnd"
                      clearable
                      @change="queryWaitSelectedList(1)"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="签约权">
                <el-select
                  v-model="waitSelectedForm.signatoryRight"
                  placeholder
                  style="width: 100%"
                  clearable
                  @change="queryWaitSelectedList(1)"
                >
                  <el-option
                    v-for="(item,index) in signatoryRightData"
                    :label="item.name"
                    :value="item.value"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item style="float:right">
                <el-button type="primary" @click="isWaitingSelectAll" size="mini">全选</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="queryWaitSelectedList(1)"
                  v-if="hasPerm('fyjh_jhzd_fy_cx')"
                >查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!--表格-->
        <div class="table-list">
          <el-table
            :data="getHouseData"
            height="500"
            border
            ref="table"
            @selection-change="handleSelectionChange"
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
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="districtName" label="小区"></el-table-column>
            <el-table-column prop="buildName" label="栋号"></el-table-column>
            <el-table-column prop="houseNo" label="房号"></el-table-column>
            <el-table-column prop="typeName" label="户型"></el-table-column>
            <el-table-column prop="coveredArea" label="预测绘建筑面积(平方米)" width="155px"></el-table-column>
            <el-table-column prop="completionArea" label="竣工建筑面积(平方米)" width="155px"></el-table-column>
            <el-table-column prop="allocationRightUnit" label="分配权归属"></el-table-column>
            <el-table-column prop="signatoryRightUnit" label="签约权归属"></el-table-column>
            <el-table-column prop="stateName" label="房屋状态"></el-table-column>
            <el-table-column prop="situationalName" label="空房房源标记"></el-table-column>
            <el-table-column prop="specification" label="备注"></el-table-column>
          </el-table>
          <div class="table-foot">
            <div>
              <el-button
                type="primary"
                size="mini"
                @click="addHouseToPlan"
                :disabled="isaddHouseToPlan"
                v-if="hasPerm('fyjh_jhzd_fy_tjzjh')"
              >添加至计划</el-button>
              <el-button
                type="warning"
                size="mini"
                @click="removeHouseFromPlan"
                :disabled="isremoveHouseFromPlan"
                v-if="hasPerm('fyjh_jhzd_fy_cdxyc')"
              >从待选移出</el-button>
            </div>
            <!-- 分页功能 -->
            <div class="block" align="center">
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
    <!-- 选中房列表 -->
    <div class="bg-fff details">
      <div class="title">
        <div class="title-icon"></div>
        <div class="title-font">选中房列表</div>
        <div class="title-bottom"></div>
      </div>
      <div class="margin30">
        <!--表单-->
        <el-form ref="form" :model="form" label-position="left" size="mini" label-width="5rem">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="小区名称">
                <el-input v-model="form.districtName" clearable @change="queries(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="栋号">
                <el-input v-model="form.buildName" clearable @change="queries(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房号">
                <el-input v-model="form.houseNo" clearable @change="queries(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="户型">
                <el-select
                  v-model="form.type"
                  placeholder
                  style="width: 100%"
                  clearable
                  @change="queries(1)"
                >
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in typeCode"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="房屋状态">
                <el-select
                  v-model="form.state"
                  placeholder
                  style="width: 100%"
                  clearable
                  @change="queries(1)"
                >
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in stateCode"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="预测绘建筑面积" label-width="7rem">
                <el-row :gutter="0">
                  <el-col :span="10">
                    <el-input v-model="form.areaMin" clearable @change="queries(1)"></el-input>
                  </el-col>
                  <el-col class="line" :span="4" style="text-align: center">至</el-col>
                  <el-col :span="10">
                    <el-input v-model="form.areaMax" clearable @change="queries(1)"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="竣工建筑面积" label-width="6rem">
                <el-row :gutter="0">
                  <el-col :span="11">
                    <el-input v-model="form.completionAreabegain" clearable @change="queries(1)"></el-input>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align: center">-</el-col>
                  <el-col :span="11">
                    <el-input v-model="form.completionAreaEnd" clearable @change="queries(1)"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="签约权">
                <el-select
                  v-model="form.signatoryRight"
                  placeholder
                  style="width: 100%"
                  clearable
                  @change="queries(1)"
                >
                  <el-option
                    v-for="(item,index) in signatoryRightData"
                    :label="item.name"
                    :value="item.value"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="text-align:right;margin-bottom:10px;">
              <el-button
                type="primary"
                @click="queries(1)"
                v-if="hasPerm('fyjh_jhzd_fy_cx')"
                size="mini"
              >查询</el-button>
              <el-button type="primary" @click="isSelectedHouseAll" size="mini">全选</el-button>
            </el-col>
          </el-row>
        </el-form>
        <!--表格-->
        <div class="table-list">
          <el-table
            :data="selectedHouseData"
            height="500"
            border
            ref="selectHouse"
            @selection-change="handleChangeFromSelected"
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
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="districtName" label="小区"></el-table-column>
            <el-table-column prop="buildName" label="栋号"></el-table-column>
            <el-table-column prop="houseNo" label="房号"></el-table-column>
            <el-table-column prop="typeName" label="户型" width></el-table-column>
            <el-table-column prop="coveredArea" label="预测绘建筑面积(平方米)" width="155px"></el-table-column>
            <el-table-column prop="completionArea" label="竣工建筑面积(平方米)" width="155px"></el-table-column>
            <el-table-column prop="allocationRightUnit" label="分配权归属"></el-table-column>
            <el-table-column prop="signatoryRightUnit" label="签约权归属"></el-table-column>
            <el-table-column prop="houseStateName" label="房屋状态"></el-table-column>
          </el-table>
          <div class="table-foot">
            <div>
              <el-button
                type="warning"
                size="mini"
                @click="removeSelectedHouseFromPlan"
                :disabled="isremoveSelectedHouseFromPlan"
                v-if="hasPerm('fyjh_jhzd_fy_cjhyc')"
              >从计划移出</el-button>
            </div>
            <!-- 分页功能 -->
            <div class="block" align="center">
              <el-pagination
                @size-change="handleSizeChangeSelected"
                @current-change="handleCurrentChangeSelected"
                :current-page="currentPageSelected"
                :page-sizes="pageSizesListSelected"
                :page-size="pageSizeSelected"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalNumberSelected"
                background
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 房源统计-->
    <div class="bg-fff">
      <div>
        <div class="title">
          <div class="title-icon"></div>
          <div class="title-font">房源统计</div>
          <div class="title-bottom"></div>
        </div>
        <div class="housing">
          <div class="category end-category">
            <!--状态类别-->
            <el-table
              :data="houseStateData"
              border
              size="mini"
              style="width: 100%"
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
              <el-table-column prop="name" label="状态类别" align="center"></el-table-column>
              <el-table-column prop="value" label="数量" align="center"></el-table-column>
            </el-table>
          </div>
          <div class="doormodel end-doormodel">
            <!--房型-->
            <el-table
              :data="houseTypeData"
              border
              size="mini"
              style="width: 100%"
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
              <el-table-column prop="name" label="房型" align="center"></el-table-column>
              <el-table-column prop="value" label="数量" align="center"></el-table-column>
            </el-table>
          </div>
          <div class="area end-area">
            <!--面积-->
            <el-table
              :data="houseAreaData"
              border
              size="mini"
              style="width: 100%"
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
              <el-table-column prop="name" label="预测绘建筑面积(平方米)" align="center"></el-table-column>
              <el-table-column prop="value" label="数量" align="center"></el-table-column>
            </el-table>
          </div>
          <div class="category end-category">
            <!--统计权归属-->
            <el-table
              :data="signTypeData"
              border
              size="mini"
              style="width: 100%"
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
              <el-table-column prop="name" label="签约归属权" align="center"></el-table-column>
              <el-table-column prop="value" label="数量" align="center"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GetMoreHouse from "./getMoreHouse";
import http from "./serve.js";
import api from "@/api/housePlan.js";
export default {
  components: {
    GetMoreHouse
  },
  data() {
    return {
      flag: true, //控制 新增还是移除房源
      signatoryRightData: [], //签约权下拉
      houseStateData: [], //统计状态
      houseTypeData: [], //统计房型
      houseAreaData: [], //统计面积
      signTypeData: [], // 统计签约归属权
      selectedHouseData: [], //选中房列表
      //待选房分页数据
      currentPage: 1,
      pageSize: 20,
      pageSizesList: [20, 50, 100, 500],
      totalNumber: 0, //数据的总数
      //选中房分页数据
      currentPageSelected: 1,
      pageSizeSelected: 20,
      pageSizesListSelected: [20, 50, 100, 500],
      totalNumberSelected: 0, //数据的总数
      waitSelectedForm: {}, //待选房源上面的表单
      form: {},
      multipleSelection: [],
      multipleSelected: [],
      getHouseData: [],
      communityGuid: [],
      typeCode: [],
      stateCode: [],
      isaddHouseToPlan: false, //是否灰置添加至计划按钮
      isremoveHouseFromPlan: false, //是否灰置从待选移出按钮
      isremoveSelectedHouseFromPlan: false, //是否灰置从待选移出按钮
      planGuid: "",
      waitingSelectAll: false, //表示待选是否全选
      selectHouseAll: false, //表示选中房所有
      totalCount: "" //全选
    };
  },
  methods: {
    //选中表格中的数据，触发此方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // this.waitingSelectAll = false
    },
    handleChangeFromSelected(val) {
      this.multipleSelected = val;
      // this.selectHouseAll = false
    },
    //待选房全选
    isWaitingSelectAll() {
      this.waitingSelectAll = true;
      this.SelectAllStyle();
    },
    //选中房全选
    isSelectedHouseAll() {
      this.selectHouseAll = true;
      this.SelectHouseAllStyle();
    },
    //选中待选全部的样式
    SelectAllStyle() {
      if (this.waitingSelectAll) {
        for (var i = 0; i < this.getHouseData.length; i++) {
          this.$refs.table.toggleRowSelection(this.getHouseData[i], true);
        }
      }
    },
    //选中全部已选的样式
    SelectHouseAllStyle() {
      if (this.selectHouseAll) {
        for (var i = 0; i < this.selectedHouseData.length; i++) {
          this.$refs.selectHouse.toggleRowSelection(
            this.selectedHouseData[i],
            true
          );
        }
      }
    },
    //添加房源至计划或者从计划中移除房源调取的接口
    houseToPlan() {
      console.log(this.multipleSelection);
      let params = {};
      let data = [];
      if (this.flag) {
        console.log("从这里进入");
        params = {
          isAdd: this.flag,
          planGuid: this.$parent.params.planGuid,
          isChooseAll: this.waitingSelectAll,
          areaMax: this.waitSelectedForm.areaMax,
          areaMin: this.waitSelectedForm.areaMin,
          districtName: this.waitSelectedForm.districtName,
          buildName: this.waitSelectedForm.buildName,
          houseNo: this.waitSelectedForm.houseNo,
          state: this.waitSelectedForm.state,
          type: this.waitSelectedForm.type,
          completionAreabegain: this.waitSelectedForm.completionAreabegain,
          completionAreaEnd: this.waitSelectedForm.completionAreaEnd,
          signatoryRight: this.waitSelectedForm.signatoryRight
        };
        if (!this.waitingSelectAll) {
          let arr = [];
          this.multipleSelection.forEach(item => {
            arr.push(item.guid);
          });
          data = arr;
        } else {
          data = [];
        }
      } else {
        console.log("或者这里");
        params = {
          isAdd: this.flag,
          planGuid: this.$parent.params.planGuid,
          isChooseAll: this.selectHouseAll,
          areaMax: this.waitSelectedForm.areaMax,
          areaMin: this.waitSelectedForm.areaMin,
          districtName: this.waitSelectedForm.districtName,
          buildName: this.waitSelectedForm.buildName,
          houseNo: this.waitSelectedForm.houseNo,
          state: this.waitSelectedForm.state,
          type: this.waitSelectedForm.type,
          completionAreabegain: this.waitSelectedForm.completionAreabegain,
          completionAreaEnd: this.waitSelectedForm.completionAreaEnd,
          signatoryRight: this.waitSelectedForm.signatoryRight
        };
        if (!this.selectHouseAll) {
          let arr = [];
          this.multipleSelection.forEach(item => {
            arr.push(item.guid);
          });
          data = arr;
        } else {
          data = [];
        }
      }
      console.log(params);
      console.log(data);
      http
        .houseInfoAddOrRemove(params, data)
        .then(res => {
          this.Event.$emit("HouseInfo", "getHouseList"); //mxq 增：2019.11.05
          this.queryWaitSelectedList(); //获取待选房列表
          this.getSelectedHouseList(); //分页查询房源计划中关联的房源信息
          this.getTotalList(); //获取统计信息
          if (this.flag) {
            //表示添加至计划
            this.waitingSelectAll = false;
          } else {
            this.selectHouseAll = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //添加至计划的按钮
    addHouseToPlan() {
      this.getJudge();
    },
    //房源计划添加房源-判断是否存在问题房源
    getJudge() {
      this.flag = true;
      let params = {
        planGuid: this.$parent.params.planGuid,
        isChooseAll: this.waitingSelectAll
      };
      let arr = [];
      if (!this.waitingSelectAll) {
        this.multipleSelection.forEach(item => {
          arr.push(item.guid);
        });
      }
      let data = arr;
      api
        .getJudge(params, data)
        .then(res => {
          if (res > 0 || res.data > 0) {
            this.$confirm(
              "选择的房源中包含问题房源，请确认是否添加至房源计划?",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }
            )
              .then(() => {
                this.houseToPlan();
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消添加至计划"
                });
              });
          } else {
            this.houseToPlan();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //从待选中移出房源
    removeHouseFromPlan() {
      this.isremoveHouseFromPlan = true; //灰置按钮
      let params = {
        planGuid: this.$parent.params.planGuid,
        isChooseAll: this.waitingSelectAll
      };
      let arr = [];
      if (!this.waitingSelectAll) {
        this.multipleSelection.forEach(item => {
          arr.push(item.guid);
        });
      }
      let data = arr;
      http
        .houseInfoWaitingRemove(params, data)
        .then(res => {
          this.queryWaitSelectedList(); //待选房列表
        })
        .catch(err => {
          console.log(err);
        });
    },
    //从选中的房源中移除
    removeSelectedHouseFromPlan() {
      this.isremoveSelectedHouseFromPlan = true; //灰置按钮
      this.flag = false;
      this.multipleSelection = this.multipleSelected;
      this.houseToPlan();
    },
    //分页查询房源计划中关联的====已选中房源信息
    getSelectedHouseList(index) {
      this.selectHouseAll = false;
      if (index) {
        this.currentPageSelected = index;
      }
      let params = {
        areaMax: this.form.areaMax,
        areaMin: this.form.areaMin,
        districtName: this.form.districtName,
        pageIndex: this.currentPageSelected,
        pageSize: this.pageSizeSelected,
        planGuid: this.$parent.params.planGuid,
        houseNo: this.form.houseNo,
        state: this.form.state,
        type: this.form.type,
        buildName: this.form.buildName,
        completionAreabegain: this.form.completionAreabegain,
        completionAreaEnd: this.form.completionAreaEnd,
        signatoryRight: this.form.signatoryRight
      };
      http
        .houseInfoSelectedPage(params)
        .then(res => {
          this.selectedHouseData = res.content; //选中房列表
          this.totalNumberSelected = res.totalElements;
          this.isremoveSelectedHouseFromPlan = false; //已选房源下的房源移除按钮恢复
          // setTimeout(() => {
          //   loading.close();
          // }, 5000);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //分页查询房源计划中关联的=====待选房列表
    queryWaitSelectedList(index) {
      this.waitingSelectAll = false;
      // 添加loading加载框
      if (index) {
        this.currentPage = index;
      }
      const loading = this.$loading({
        lock: true,
        text: "正在查询",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: ".el-table"
      });
      let timeout = 0;
      let params = {
        areaMax: this.waitSelectedForm.areaMax,
        areaMin: this.waitSelectedForm.areaMin,
        districtName: this.waitSelectedForm.districtName,
        planGuid: this.$parent.params.planGuid,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        houseNo: this.waitSelectedForm.houseNo,
        state: this.waitSelectedForm.state,
        type: this.waitSelectedForm.type,
        buildName: this.waitSelectedForm.buildName,
        completionAreabegain: this.waitSelectedForm.completionAreabegain,
        completionAreaEnd: this.waitSelectedForm.completionAreaEnd,
        signatoryRight: this.waitSelectedForm.signatoryRight
      };
      http
        .houseInfoWaitingPage(params, timeout)
        .then(res => {
          console.log(res);
          this.getHouseData = res.content;
          this.totalNumber = res.totalElements;
          loading.close();
          this.isaddHouseToPlan = false; //恢复按钮
          this.isremoveHouseFromPlan = false; //恢复按钮
          this.Event.$emit("getHousePlanByGuid", "PlanBasicInfo");
        })
        .catch(err => {
          loading.close();
        });
    },
    //获取当前计划下的房源统计信息
    getTotalList() {
      let params = {
        planGuid: this.$parent.params.planGuid
      };
      console.log("params:", params);
      http
        .getHouseStateStatistics(params)
        .then(res => {
          if (res) {
            this.houseStateData = res;
          }
        })
        .catch(err => {
          console.log(err);
        });
      http
        .getHouseAreaStatistics(params)
        .then(res => {
          if (res) {
            this.houseAreaData = res;
          }
        })
        .catch(err => {
          console.log(err);
        });
      http
        .getHouseTypeStatistics(params)
        .then(res => {
          if (res) {
            this.houseTypeData = res;
          }
        })
        .catch(err => {
          console.log(err);
        });
      http
        .getHouseSignStatistics(params)
        .then(res => {
          if (res) {
            this.signTypeData = res;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //待选分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.queryWaitSelectedList();
      this.SelectAllStyle();
    },
    //待选分页改变当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryWaitSelectedList();
      this.SelectAllStyle();
    },
    //选中分页
    handleSizeChangeSelected(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSizeSelected = val;
      this.getSelectedHouseList();
      this.SelectHouseAllStyle();
    },
    //选中分页 改变大小
    handleCurrentChangeSelected(val) {
      this.currentPageSelected = val;
      this.getSelectedHouseList();
      this.SelectHouseAllStyle();
    },
    queries() {
      this.getSelectedHouseList();
    },
    //获取签约权数据字典
    getSignatoryRight() {
      let params = {};
      api
        .getSignatoryRight(params)
        .then(res => {
          this.signatoryRightData = res.children;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取字典
    getDictionary() {
      let namesArr = ["户型", "房屋状态"];
      let params = {
        names: namesArr.toString()
      };
      http
        .getDictionary(params)
        .then(res => {
          res = JSON.parse(res);
          this.typeCode = res.户型;
          this.stateCode = res.房屋状态;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.planGuid = this.$parent.params.planGuid;
    this.getSignatoryRight(); //获取签约权
    this.getDictionary(); //获取字典
    if (this.planGuid) {
      this.getSelectedHouseList(); //已选中房源信息
      this.getTotalList(); //获取统计信息
      this.queryWaitSelectedList(); //待选房列表
    }
  }
};
</script>

<style lang="scss" scoped>
.all-housing-resource {
  color: #838383;
  padding: 20px;
  .bg-fff {
    background: #fff;
  }
  .title {
    display: flex;
    padding: 10px;
    .title-icon {
      width: 5px;
      height: 18px;
      background: #f5a623;
      margin-right: 10px;
      margin-top: 2px;
    }
    .title-font {
      width: 7rem;
      font-size: 18px;
    }
    .title-bottom {
      width: 100%;
      height: 18px;
      border-bottom: 1px solid #ccc;
    }
  }
  .housing {
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    padding-bottom: 30px;
    font-size: 1.3em;
    .category {
      width: 33%;
      height: auto;
      border-radius: 10px;
      box-shadow: 0px 0px 20px 8px #eef4fc;
      .title-bg {
        background: #fef6e9;
        width: 100%;
        height: 2rem;
        span {
          margin-left: 20px;
          color: #f6b850;
        }
      }
      .table {
        table {
          margin: 20px auto;
          border: 1px solid #dde5f9;
          border-collapse: collapse;
          tr {
            border: 1px solid #dde5f9;
          }
          th {
            border: 1px solid #dde5f9;
            font-size: 14px;
            height: 2rem;
            width: 8rem;
          }
        }
      }
    }
    .area {
      width: 33%;
      height: auto;
      border-radius: 10px;
      box-shadow: 0px 0px 20px 8px #eef4fc;
      .title-bg {
        background: #eef9f4;
        width: 100%;
        height: 2rem;
        span {
          margin-left: 20px;
          color: #71d0a5;
        }
      }
      .table {
        table {
          margin: 20px auto;
          border: 1px solid #dde5f9;
          border-collapse: collapse;
          tr {
            border: 1px solid #dde5f9;
          }
          th {
            border: 1px solid #dde5f9;
            font-size: 14px;
            height: 2rem;
            width: 8rem;
          }
        }
      }
    }
    .doormodel {
      width: 33%;
      height: auto;
      border-radius: 10px;
      box-shadow: 0px 0px 20px 8px #eef4fc;
      .title-bg {
        background: #e9f7fc;
        width: 100%;
        height: 2rem;
        span {
          margin-left: 20px;
          color: #5dc7ea;
        }
      }
      .table {
        table {
          margin: 20px auto;
          border: 1px solid #dde5f9;
          border-collapse: collapse;
          tr {
            border: 1px solid #dde5f9;
          }
          th {
            border: 1px solid #dde5f9;
            font-size: 14px;
            height: 2rem;
            width: 8rem;
          }
        }
      }
    }
  }
  .details {
    margin-top: 20px;
    padding-bottom: 30px;
    .margin30 {
      margin: 30px;
    }
  }
}
.table-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 18px;
}
.end-category,
.end-area,
.end-doormodel {
  box-sizing: border-box;
  padding: 20px;
}
</style>
