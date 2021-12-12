<template>
  <div class="all-housing-resource">
    <!--房源-->
    <div class="bg-fff">
      <div class="title" style="margin-top:10px;">
        <div class="title-icon"></div>
        <div class="title-font">房源</div>
        <div class="title-bottom"></div>
      </div>
      <div class="margin30">
        <!--表单-->
        <el-form
          ref="form"
          :model="waitSelectedForm"
          label-position="left"
          size="mini"
          label-width="3.0rem"
        >
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="小区">
                <el-autocomplete
                  class="inline-input"
                  v-model="waitSelectedForm.districtName"
                  :fetch-suggestions="getCommunityList"
                  placeholder="请输入内容"
                  :trigger-on-focus="false"
                  :clearable="true"
                  style="width:100%"
                  popper-class="select-option"
                  @select="queryWaitSelectedList(1)"
                ></el-autocomplete>
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
                  @change="queryWaitSelectedList(1)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房屋性质" label-width="4.5rem">
                <el-select
                  v-model="waitSelectedForm.nature"
                  placeholder
                  style="width: 100%"
                  clearable
                  @change="queryWaitSelectedList(1)"
                >
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item, index) in natureType"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
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
                    v-for="(item, index) in houseType"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房屋状态" label-width="4.5rem">
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
                    v-for="(item, index) in stateType"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="预测绘建筑面积" label-width="7.5rem">
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
              <el-form-item label="竣工建筑面积" label-width="6.5rem">
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
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item style="text-align:right">
                <el-button
                  type="primary"
                  size="mini"
                  @click="queryWaitSelectedList(1)"
                  v-if="hasPerm('fygl_fyxzbg_fyxx_cx')"
                  :disabled="edit"
                >查询</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="WaitSelectedAll"
                  :disabled="edit"
                  v-if="hasPerm('fygl_fyqcbg_fyxx_qx')"
                >全选</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!--表格-->
        <div class="table-list">
          <el-table
            ref="getWaitingList"
            :data="getHouseData"
            height="500"
            border
            @selection-change="handleSelectionChange"
            :header-cell-style="{
              background: '#E6F0FC',
              color: '#333',
              'text-align': 'center',
              'border-color': '#DBDBDB'
            }"
            :cell-style="{
              'text-align': 'center',
              'border-color': '#DBDBDB'
            }"
          >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="districtName" label="小区"></el-table-column>
            <el-table-column prop="buildName" label="栋号"></el-table-column>
            <el-table-column prop="houseNo" label="房号"></el-table-column>
            <el-table-column prop="typeName" label="户型"></el-table-column>
            <el-table-column prop="coveredArea" label="预测绘建筑面积(平方米)" width="160"></el-table-column>
            <el-table-column prop="completionArea" label="竣工建筑面积(平方米)" width="150"></el-table-column>
            <el-table-column prop="changeAfterNatureName" label="房屋性质"></el-table-column>
            <el-table-column prop="stateName" label="房屋状态"></el-table-column>
          </el-table>
          <div class="table-foot">
            <div>
              <el-button
                type="primary"
                size="mini"
                @click="addHouseToSelectHouse"
                :disabled="edit"
                v-if="hasPerm('fygl_fyxzbg_fyxx_qr')"
              >确认</el-button>
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
        <el-form ref="form" :model="form" label-position="left" size="mini" label-width="3rem">
          <el-row :gutter="10">
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
                  style="width:100%"
                  @select="queries(1)"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="栋号">
                <el-input v-model="form.bulidNo" clearable @change="queries(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房号">
                <el-input v-model="form.houseNo" clearable @change="queries(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房屋性质" label-width="4.5rem">
                <el-select v-model="form.nature" style="width: 100%" clearable @change="queries(1)">
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item, index) in natureType"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="户型" label-width="3rem">
                <el-select v-model="form.type" style="width: 100%" clearable @change="queries(1)">
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item, index) in houseType"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房屋状态" label-width="4.5rem">
                <el-select v-model="form.state" style="width: 100%" clearable @change="queries(1)">
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item, index) in stateType"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="预测绘建筑面积" label-width="7.5rem">
                <el-row :gutter="0">
                  <el-col :span="10">
                    <el-input v-model="form.coveredAreaMin" clearable @change="queries(1)"></el-input>
                  </el-col>
                  <el-col class="line" :span="4" style="text-align: center">至</el-col>
                  <el-col :span="10">
                    <el-input v-model="form.coveredAreaMax" clearable @change="queries(1)"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="竣工建筑面积" label-width="6.5rem">
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
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item style="float:right">
                <el-button
                  type="primary"
                  size="mini"
                  @click="queries(1)"
                  v-if="hasPerm('fygl_fyxzbg_fyxx_cx')"
                >查询</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="selectHouseAll"
                  :disabled="edit"
                  v-if="hasPerm('fygl_fyqcbg_fyxx_qx')"
                >全选</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!--表格-->
        <div class="table-list">
          <el-table
            ref="selectedHouseDataList"
            :data="selectedHouseData"
            height="500"
            border
            @selection-change="handleChangeFromSelected"
            :header-cell-style="{
              background: '#E6F0FC',
              color: '#606266',
              'text-align': 'center',
              'border-color': '#DBDBDB'
            }"
            :cell-style="{
              'text-align': 'center',
              'border-color': '#DBDBDB'
            }"
          >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="QMC" label="小区"></el-table-column>
            <el-table-column prop="DH" label="栋号"></el-table-column>
            <el-table-column prop="FH" label="房号"></el-table-column>
            <el-table-column prop="houseLayoutName" label="户型"></el-table-column>
            <el-table-column prop="JZMJ" label="预测绘建筑面积(平方米)" width="160"></el-table-column>
            <el-table-column prop="completionArea" label="竣工建筑面积(平方米)" width="150"></el-table-column>
            <el-table-column prop="nature" label="房屋性质"></el-table-column>
            <el-table-column prop="state" label="房屋状态"></el-table-column>
          </el-table>
          <div class="table-foot">
            <div>
              <el-button
                type="warning"
                size="mini"
                @click="removeSelectedHouse"
                :disabled="edit"
                v-if="hasPerm('fygl_fyxzbg_fyxx_yc')"
              >移除</el-button>
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
    <!-- 选中房统计-->
    <div class="bg-fff">
      <div>
        <div class="title">
          <div class="title-icon"></div>
          <div class="title-font">选中房统计</div>
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
                background: '#E6F0FC',
                color: '#606266',
                'text-align': 'center',
                'border-color': '#DBDBDB'
              }"
              :cell-style="{
                'text-align': 'center',
                'border-color': '#DBDBDB'
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
                background: '#E6F0FC',
                color: '#606266',
                'text-align': 'center',
                'border-color': '#DBDBDB'
              }"
              :cell-style="{
                'text-align': 'center',
                'border-color': '#DBDBDB'
              }"
            >
              <el-table-column prop="name" label="房型" align="center"></el-table-column>
              <el-table-column prop="value" label="数量" align="center"></el-table-column>
            </el-table>
          </div>
          <div class="area end-area">
            <!--性质-->
            <el-table
              :data="houseNatureData"
              border
              size="mini"
              style="width: 100%"
              :header-cell-style="{
                background: '#E6F0FC',
                color: '#606266',
                'text-align': 'center',
                'border-color': '#DBDBDB'
              }"
              :cell-style="{
                'text-align': 'center',
                'border-color': '#DBDBDB'
              }"
            >
              <el-table-column prop="name" label="房屋性质" align="center"></el-table-column>
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
import api from "@/api/natureChange";
import publicMethod from "@/api/publicMethod.js";

export default {
  data() {
    return {
      selectCommunity: {}, //选择小区
      communityForm: {}, //小区名称或编号
      selectCommunityOptions: [], //下拉的小区数据
      checkAll: false,
      checkedCities: [], //选中的栋
      cities: [], //存放栋
      isIndeterminate: true,
      houseForm: {}, //添加至待选房列表的查询条件
      districtGuid: "", //选中的小区
      unitGuid: [], //最终选中的栋
      distribution: [], //变更单位
      tipindex: -1,
      natureType: [], //性质下拉列表
      stateType: [], //状态下拉列表
      houseType: [], //房型下拉列表
      guid: "", //批次代码
      flag: true, //控制 新增还是移除房源
      houseStateData: [], //统计状态
      houseTypeData: [], //统计房型
      houseNatureData: [], //统计房屋性质
      selectedHouseData: [], //选中房列表
      //待选房分页数据
      currentPage: 1,
      pageSize: 50,
      pageSizesList: [50, 100, 200, 300],
      totalNumber: 0, //数据的总数
      //选中房分页数据
      currentPageSelected: 1,
      pageSizeSelected: 50,
      pageSizesListSelected: [50, 100, 200, 300],
      totalNumberSelected: 0, //数据的总数
      waitSelectedForm: {}, //待选房源上面的表单
      form: {},
      multipleSelection: [],
      multipleSelected: [],
      getHouseData: [],
      communityGuid: [],
      natureType: [], //房屋性质
      houseType: [], //房屋类型
      stateType: [], //房屋状态
      isaddHouseToPlan: false, //是否灰置添加至计划按钮
      isremoveHouseFromPlan: false, //是否灰置从待选移出按钮
      isremoveSelectedHouse: false, //是否灰置从待选移出按钮
      waitSelectAllFlag: false, //待选房列表选中全部
      selectHouseAllFlag: false, //选中房全选所有列表
      edit: true, //判断按钮是否被禁用
      selectCommunityOptions: [] //选中的小区
    };
  },
  methods: {
    //房源小区模糊查询
    getCommunityList(str, cb) {
      let params = {
        searchContent: this.waitSelectedForm.districtName
      };
      publicMethod
        .getCommunityList(params)
        .then(res => {
          for (let i of res) {
            i.value = i.districtNameNo;
          }
          this.selectCommunityOptions = res; //将结果存入下拉小区数据中
          if (this.selectCommunityOptions.length === 0) {
            this.selectCommunityOptions = [{ value: "暂无数据" }];
          }
          cb(this.selectCommunityOptions);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //选中房小区模糊查询
    getCommunitySelectList(str, cb) {
      let params = {
        searchContent: this.form.districtName
      };
      publicMethod
        .getCommunityList(params)
        .then(res => {
          for (let i of res) {
            i.value = i.districtNameNo;
          }
          this.selectCommunityOptions = res; //将结果存入下拉小区数据中
          if (this.selectCommunityOptions.length === 0) {
            this.selectCommunityOptions = [{ value: "暂无数据" }];
          }
          cb(this.selectCommunityOptions);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //房源查询
    queryWaitSelectedList(index) {
      if (index) {
        this.currentPage = index;
      }
      let params = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      let data = {
        code: this.guid,
        districtName: this.waitSelectedForm.districtName,
        buildingName: this.waitSelectedForm.buildName,
        houseNo: this.waitSelectedForm.houseNo,
        type: this.waitSelectedForm.type,
        nature: this.waitSelectedForm.nature,
        state: this.waitSelectedForm.state,
        coveredAreaMax: this.waitSelectedForm.areaMax,
        coveredAreaMin: this.waitSelectedForm.areaMin,
        completionAreabegain: this.waitSelectedForm.completionAreabegain,
        completionAreaEnd: this.waitSelectedForm.completionAreaEnd
      };
      api
        .getWaitigHouselist(params, data)
        .then(res => {
          this.getHouseData = res.content;
          this.totalNumber = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //全选
    WaitSelectedAll() {
      this.waitSelectAllFlag = true;
      this.toggleSelection(this.getHouseData);
      console.log("====待选房全选");
    },
    //选中房全选
    selectHouseAll() {
      this.selectHouseAllFlag = true;
      this.toggleSelectionSelect(this.selectedHouseData);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.getWaitingList.toggleRowSelection(row);
        });
      } else {
        this.$refs.getWaitingList.clearSelection();
      }
    },
    toggleSelectionSelect(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.selectedHouseDataList.toggleRowSelection(row);
        });
      } else {
        this.$refs.selectedHouseDataList.clearSelection();
      }
    },
    reset() {
      this.communityForm.name = "";
      this.selectCommunityOptions = [];
      this.cities = []; //存放的栋信息
    },
    //对面积进行相关的正则判断
    proving() {
      if (
        this.houseForm.areaMin !== "" ||
        this.houseForm.areaMin !== undefined
      ) {
        this.houseForm.areaMin = this.houseForm.areaMin.replace(/[^\d.]/g, ""); //必须保证第一个为数字而不是.
        this.houseForm.areaMin = this.houseForm.areaMin.replace(/^\./g, ""); ////保证只有出现一个.而没有多个.
        this.houseForm.areaMin = this.houseForm.areaMin.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        this.houseForm.areaMin = this.houseForm.areaMin
          .replace(".", "$#$")
          .replace(/\./g, "")
          .replace("$#$", ".");
        let arr = this.houseForm.areaMin.split("."); //最多保留小数点后两位
        if (arr.length > 1) {
          this.houseForm.areaMin =
            arr[0] + "." + (arr[1].length > 2 ? arr[1].substr(0, 2) : arr[1]);
        }
      }
    },
    proving2() {
      if (
        this.houseForm.areaMax !== "" ||
        this.houseForm.areaMax !== undefined
      ) {
        this.houseForm.areaMax = this.houseForm.areaMax.replace(/[^\d.]/g, ""); //必须保证第一个为数字而不是.
        this.houseForm.areaMax = this.houseForm.areaMax.replace(/^\./g, ""); ////保证只有出现一个.而没有多个.
        this.houseForm.areaMax = this.houseForm.areaMax.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        this.houseForm.areaMax = this.houseForm.areaMax
          .replace(".", "$#$")
          .replace(/\./g, "")
          .replace("$#$", ".");
        let arrx = this.houseForm.areaMax.split("."); //最多保留小数点后两位
        if (arrx.length > 1) {
          this.houseForm.areaMax =
            arrx[0] +
            "." +
            (arrx[1].length > 2 ? arrx[1].substr(0, 2) : arrx[1]);
        }
      }
    },
    //全选
    handleCheckAllChange(val) {
      this.unitGuid = val ? this.cities : [];
      this.isIndeterminate = false;
      this.checkedCities = this.unitGuid;
    },
    //选择栋 触发
    handleCheckedCitiesChange(value) {
      let arr = value;
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
      let guidData = [];
      arr.forEach(element => {
        guidData.push(element);
      });
      this.unitGuid = guidData;
    },
    //添加至待选房列表
    onSubmit() {
      this.houseForm.districtGuid = this.districtGuid;
      this.houseForm.code = this.guid;
      this.$parent.params.districtGuid = this.districtGuid;
      let params = this.houseForm;
      let guidArr = this.unitGuid;
      let data = [];
      guidArr.forEach(item => {
        if (item != null) {
          data.push(item.guid);
        }
      });
      api
        .getApplylist(params, data)
        .then(res => {
          this.queryWaitSelectedList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取字典
    getDictionary() {
      let namesArr = ["变更单位", "户型", "房屋性质", "房屋状态"];
      let params = {
        names: namesArr.toString()
      };
      publicMethod
        .getDictionary(params)
        .then(res => {
          res = JSON.parse(res);
          this.distribution = res.变更单位;
          this.natureType = this.$dictionaryChange(
            res.房屋性质,
            this.natureType,
            "通用"
          );
          this.stateType = res.房屋状态;
          this.houseType = res.户型;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //分页查询房源计划中关联的=====待选房列表

    //待选分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.queryWaitSelectedList(1);
    },
    //待选分页改变当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryWaitSelectedList();
    },
    //选中表格中的数据，触发此方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleChangeFromSelected(val) {
      this.multipleSelected = val;
    },
    //分页查询房源计划中关联的====已选中房源信息
    getSelectedHouseList(index) {
      if (index) {
        this.currentPageSelected = index;
      }
      this.form.code = this.guid;
      this.form.pageIndex = this.currentPageSelected;
      this.form.pageSize = this.pageSizeSelected;
      let params = this.form;
      api
        .getSelectHouse(params)
        .then(res => {
          this.selectedHouseData = res.content; //选中房列表
          this.totalNumberSelected = res.totalElements;
          //this.isremoveSelectedHouse = false;//已选房源下的房源移除按钮恢复
        })
        .catch(err => {
          console.log(err);
        });
    },
    //选中分页
    handleSizeChangeSelected(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSizeSelected = val;
      this.getSelectedHouseList(1);
    },
    //选中分页 改变大小
    handleCurrentChangeSelected(val) {
      this.currentPageSelected = val;
      this.getSelectedHouseList();
    },
    //添加至选中房
    addHouseToSelectHouse() {
      //this.isaddHouseToPlan = true;//置灰按钮
      this.flag = true;
      // this.houseToPlan();
      let params = {};
      let data = [];
      console.log("====添加至选中房", this.waitSelectAllFlagthis);
      if (this.waitSelectAllFlag) {
        params = {
          code: this.guid,
          districtName: this.waitSelectedForm.districtName,
          buildingName: this.waitSelectedForm.buildName,
          houseNo: this.waitSelectedForm.houseNo,
          type: this.waitSelectedForm.type,
          nature: this.waitSelectedForm.nature,
          state: this.waitSelectedForm.state,
          coveredAreaMax: this.waitSelectedForm.areaMax,
          coveredAreaMin: this.waitSelectedForm.areaMin,
          completionAreabegain: this.waitSelectedForm.completionAreabegain,
          completionAreaEnd: this.waitSelectedForm.completionAreaEnd,
          isChooseAll: this.waitSelectAllFlag
        };
      } else {
        params = {
          code: this.guid
        };
        let arr = [];
        this.multipleSelection.forEach(item => {
          arr.push(item.GUID);
        });
        data = arr;
      }
      api
        .addToSelectedList(params, data)
        .then(res => {
          this.getSelectedHouseList(); //分页查询房源计划中关联的房源信息
          this.queryWaitSelectedList();
          this.getHouseNature(); //得到房屋性质
          this.getHouseState(); //得到房屋状态
          this.getHouseType(); //得到房屋类型
          this.Event.$emit("NatureChangeApplyInfo", "getChangeInfo");
          if (this.waitSelectAllFlag) {
            this.waitSelectAllFlag = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //得到房屋性质
    getHouseNature() {
      let params = {
        code: this.guid
      };
      api
        .getHouseNature(params)
        .then(res => {
          this.houseNatureData = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //得到房屋状态
    getHouseState() {
      let params = {
        code: this.guid
      };
      api
        .getHouseState(params)
        .then(res => {
          this.houseStateData = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //得到房屋类型
    getHouseType() {
      let params = {
        code: this.guid
      };
      api
        .getHouseType(params)
        .then(res => {
          this.houseTypeData = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //从选中房中移出
    removeSelectedHouse() {
      // this.isremoveSelectedHouse = true;//灰置按钮
      let params = {};
      let data = [];
      if (this.selectHouseAllFlag) {
        params = {
          code: this.guid,
          districtName: this.form.districtName,
          buildingName: this.form.bulidNo,
          houseNo: this.form.houseNo,
          nature: this.form.nature,
          type: this.form.type,
          state: this.form.state,
          coveredAreaMax: this.form.coveredAreaMax,
          coveredAreaMin: this.form.coveredAreaMin,
          completionAreabegain: this.form.completionAreabegain,
          completionAreaEnd: this.form.completionAreaEnd,
          isChooseAll: this.selectHouseAllFlag
        };
        api
          .removeSelectHouse(params, data)
          .then(res => {
            if (res) {
              this.queryWaitSelectedList(); //获取待选房列表
              this.getSelectedHouseList(); //分页查询房源计划中关联的房源信息
              this.getHouseNature(); //得到房屋性质
              this.getHouseState(); //得到房屋状态
              this.getHouseType(); //得到房屋类型
              this.$message({
                message: "从选中房中移出",
                type: "success"
              });
              if (this.selectAllFlag) {
                this.selectAllFlag = false;
              }
              if (this.selectHouseAllFlag) {
                this.selectHouseAllFlag = false;
              }
              this.Event.$emit("NatureChangeApplyInfo", " getChangeInfo");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        params = {
          code: this.guid,
          districtName: this.form.districtName,
          buildingName: this.form.bulidNo,
          houseNo: this.form.houseNo,
          nature: this.form.nature,
          type: this.form.type,
          state: this.form.state,
          coveredAreaMax: this.form.coveredAreaMax,
          coveredAreaMin: this.form.coveredAreaMin,
          completionAreabegain: this.form.completionAreabegain,
          completionAreaEnd: this.form.completionAreaEnd,
          isChooseAll: this.selectHouseAllFlag
        };
        let arr = [];
        this.multipleSelection.forEach(item => {
          arr.push(item.guid);
        });
        data = arr;
        this.multipleSelection = this.multipleSelected;
        if (this.multipleSelection.length == 0) {
          this.$alert("无房可选，不能从选中房移出", "提示", {
            confirmButtonText: "确定"
          });
        } else {
          let arr = [];
          this.multipleSelection.forEach(item => {
            arr.push(item.guid);
          });
          data = arr;
          api
            .removeSelectHouse(params, data)
            .then(res => {
              if (res) {
                this.queryWaitSelectedList(); //获取待选房列表
                this.getSelectedHouseList(); //分页查询房源计划中关联的房源信息
                this.getHouseNature(); //得到房屋性质
                this.getHouseState(); //得到房屋状态
                this.getHouseType(); //得到房屋类型
                this.$message({
                  message: "从选中房中移出",
                  type: "success"
                });
                if (this.selectAllFlag) {
                  this.selectAllFlag = false;
                }
                if (this.selectHouseAllFlag) {
                  this.selectHouseAllFlag = false;
                }
                this.Event.$emit("NatureChangeApplyInfo", " getChangeInfo");
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    queries(index) {
      this.getSelectedHouseList(index);
    }
  },
  mounted() {
    if (
      this.$route.query.state == "done" ||
      this.$parent.params.activityName == "审批"
    ) {
      this.edit = true;
    } else {
      this.edit = false;
    }
    if (this.getNatureChangeGuid) {
      this.queryWaitSelectedList(); //待选房列表
    }
    this.getSelectedHouseList(); //已选中房源信息
    this.getHouseNature(); //得到房屋性质
    this.getHouseState(); //得到房屋状态
    this.getHouseType(); //得到房屋类型
    this.getDictionary();
  },
  created() {
    this.guid = this.$parent.params.guid;
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
        padding: 10px;
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
        padding: 10px;
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
        padding: 10px;
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
