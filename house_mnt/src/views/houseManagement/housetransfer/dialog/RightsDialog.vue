<template>
  <!-- 使用权变更 -->
  <div class="dialog">
    <div class="dialog-content">
      <div class="dialog-left">
        <el-form :model="dialogLeftForm" size="mini" label-width="4rem">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="栋名称">
                <el-input
                  v-model="dialogLeftForm.buildingName"
                  clearable
                  placeholder="请输入栋名称"
                  @change="getHouseList(1)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房号">
                <el-input
                  v-model="dialogLeftForm.houseNo"
                  clearable
                  placeholder="请输入房号"
                  @change="getHouseList(1)"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="户型">
                <el-select
                  v-model="dialogLeftForm.type"
                  clearable
                  placeholder="请选择户型"
                  style="width:100%"
                  @change="getHouseList(1)"
                >
                  <el-option
                    v-for="(item, index) in typeData"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预测绘建筑面积" label-width="7rem">
                <el-row :gutter="0">
                  <el-col :span="11">
                    <el-input v-model="dialogLeftForm.coveredAreaMin" @change="getHouseList(1)"></el-input>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align: center">-</el-col>
                  <el-col :span="11">
                    <el-input v-model="dialogLeftForm.coveredAreaMax" @change="getHouseList(1)"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="竣工建筑面积" label-width="6rem">
                <el-row :gutter="0">
                  <el-col :span="11">
                    <el-input
                      v-model="dialogLeftForm.completionAreabegain"
                      clearable
                      @change="getHouseList(1)"
                    ></el-input>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align: center">-</el-col>
                  <el-col :span="11">
                    <el-input
                      v-model="dialogLeftForm.completionAreaEnd"
                      clearable
                      @change="getHouseList(1)"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房屋状态" label-width="6rem">
                <el-select
                  v-model="dialogLeftForm.houseState"
                  clearable
                  placeholder="请选择房屋状态"
                  style="width:100%"
                  @change="getHouseList(1)"
                >
                  <el-option
                    v-for="(item, index) in houseState"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-button type="primary" @click="getHouseList(1)" size="mini">查询</el-button>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="24">
              <el-button type="primary" @click="getUserRightChooseAll" size="mini">全选并添加</el-button>
            </el-col>
          </el-row>-->
        </el-form>
        <p>请选择需要变更的房源</p>
        <el-table
          @row-click="clickRow"
          ref="moviesTable"
          :data="tableLeftData"
          border
          size="mini"
          height="500"
          style="width: 100%"
          @selection-change="handleLeftChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="buildName" label="栋名称"></el-table-column>
          <el-table-column prop="houseNo" label="房号"></el-table-column>
          <el-table-column prop="typeName" label="户型"></el-table-column>
          <el-table-column prop="coveredArea" label="预测绘建筑面积(平方米)" width="120px"></el-table-column>
          <el-table-column prop="completionArea" label="竣工建筑面积(平方米)" width="100px"></el-table-column>
          <el-table-column prop="changeAfterNatureName" label="房屋性质" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column
            prop="allocationRightUnit"
            label="分配权单位"
            width="150"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="signatoryRightUnit"
            label="签约权单位"
            width="150"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="operationalRightUnit"
            label="运维权单位"
            width="150"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="maintainRightUnit"
            label="维护归属"
            width="150"
            :show-overflow-tooltip="true"
          ></el-table-column>
        </el-table>
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
      <div class="dialog-center">
        <el-button @click="handleAdd" size="mini">
          添加
          <i class="el-icon-arrow-right"></i>
        </el-button>
        <el-button @click="handleRemove" size="mini" style="margin-left:0;">
          <i class="el-icon-arrow-left"></i>移除
        </el-button>
      </div>
      <div class="dialog-right">
        <el-form :model="dialogRightForm" size="mini" label-width="4rem">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="栋名称">
                <el-input
                  v-model="dialogRightForm.buildingName"
                  clearable
                  placeholder="请输入栋名称"
                  @change="rightSearch"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房号">
                <el-input
                  v-model="dialogRightForm.HouseNo"
                  clearable
                  placeholder="请输入房号"
                  @change="rightSearch"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="户型">
                <el-select
                  v-model="dialogRightForm.type"
                  clearable
                  placeholder="请选择户型"
                  style="width:100%"
                  @change="rightSearch"
                >
                  <el-option
                    v-for="(item, index) in typeData"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预测绘建筑面积" label-width="7rem">
                <el-row :gutter="0">
                  <el-col :span="11">
                    <el-input v-model="dialogRightForm.coveredAreaMin" @change="rightSearch"></el-input>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align: center">-</el-col>
                  <el-col :span="11">
                    <el-input v-model="dialogRightForm.coveredAreaMax" @change="rightSearch"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="竣工建筑面积" label-width="6rem">
                <el-row :gutter="0">
                  <el-col :span="11">
                    <el-input
                      v-model="dialogRightForm.completionAreabegain"
                      clearable
                      @change="rightSearch"
                    ></el-input>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align: center">-</el-col>
                  <el-col :span="11">
                    <el-input
                      v-model="dialogRightForm.completionAreaEnd"
                      clearable
                      @change="rightSearch"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <el-button type="primary" @click="rightSearch">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <p>
          已选中房源，已添加{{ tableRightDataLenth }}，已选中{{
          this.rightSelection.length
          }}套
        </p>
        <el-table
          :data="tableRightData"
          @row-click="clickRightRow"
          ref="rightTable"
          border
          height="500"
          size="mini"
          style="width: 100%"
          @selection-change="handleRightChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="buildName" label="栋名称"></el-table-column>
          <el-table-column prop="houseNo" label="房号"></el-table-column>
          <el-table-column prop="typeName" label="户型"></el-table-column>
          <el-table-column prop="coveredArea" label="预测绘建筑面积(平方米)" width="120px"></el-table-column>
          <el-table-column prop="completionArea" label="竣工建筑面积(平方米)" width="100px"></el-table-column>
          <el-table-column prop="changeAfterNatureName" label="房屋性质" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column
            prop="allocationRightUnit"
            label="分配权单位"
            width="150"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="signatoryRightUnit"
            label="签约权单位"
            width="150"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="operationalRightUnit"
            label="运维权单位"
            width="150"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="maintainRightUnit"
            label="维护归属"
            width="150"
            :show-overflow-tooltip="true"
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="dialog-footer">
      <el-form v-model="rightsForm" size="mini" style="width:84%">
        <el-form-item label="请选择需要变更的权利" label-width="12rem" :rules="rulesx">
          <el-checkbox-group v-model="rightsForm.checkList">
            <el-checkbox label="allocation" @change="changeRightUnit">分配权</el-checkbox>
            <el-checkbox label="signatory" @change="changeRightUnit">签约权</el-checkbox>
            <el-checkbox label="operational" @change="changeRightUnit">运维权</el-checkbox>
            <el-checkbox label="maintain" @change="changeRightUnit">数据维护权</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="请选择新的分配权单位" label-width="12rem" :rules="rulesx" v-if="show1">
          <el-select
            v-model="rightsForm.distribution"
            @change="getChangeValue"
            clearable
            placeholder
            filterable
            style="width:100%"
          >
            <el-option
              v-for="(item, index) in distributionOption"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择新的签约权单位" label-width="12rem" :rules="rulesx" v-if="show2">
          <el-select
            v-model="rightsForm.signing"
            @change="getChangeValue"
            clearable
            placeholder
            style="width:100%"
            filterable
          >
            <el-option
              v-for="(item, index) in signingOption"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择新的运维权单位" label-width="12rem" :rules="rulesx" v-if="show3">
          <el-select
            v-model="rightsForm.operation"
            @change="getChangeValue"
            clearable
            placeholder
            style="width:100%"
            filterable
          >
            <el-option
              v-for="(item, index) in operationOption"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择新的数据维护权单位" label-width="12rem" :rules="rulesx" v-if="show4">
          <el-select
            v-model="rightsForm.maintain"
            @change="getChangeValue"
            clearable
            placeholder
            filterable
            style="width:100%"
          >
            <el-option
              v-for="(item, index) in maintainOption"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请填写权利变更依据" label-width="12rem" :rules="rulesx">
          <el-input v-model="rightsForm.reason" type="textarea" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center;">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/api/housestore.js";
import api from "@/api/house.js";

export default {
  name: "rightsdialog",
  data() {
    return {
      rightUnitData: [], //权利归属单位
      dialogLeftForm: {}, //弹框左侧表单
      dialogRightForm: {
        coveredAreaMin: "",
        coveredAreaMax: "",
        completionAreaEnd: "",
        completionAreabegain: "",
        houseState: ""
      }, //弹框右侧表单
      stateData: [], //下拉框数据
      tableLeftData: [], //左侧表格数据
      tableRightData: [], //右侧表格数据
      leftSelection: [], //左侧选择的数据
      rightSelection: [], //右侧选择的数据
      tableRightDataLenth: 0,
      //底部表单
      rightsForm: {
        checkList: [], //变更的权利
        distribution: "", //分配权
        signing: "", //签约权
        operation: "", //运维权
        maintain: "", //维护权
        reason: "" //变更依据
      },
      guid: "", //小区的guid
      distributionOption: [], //分配权下拉
      signingOption: [], //签约权下拉
      operationOption: [], //运维权下拉
      maintainOption: [], //维护权下拉
      houseState: [], //房屋状态
      distribution: "", //分配权
      reason: "", //依据
      newRightData: [], //下拉框数据
      selectNewRight: {}, //下拉框选择的数据
      typeData: [], //户型下拉
      buildingData: [], //栋下拉
      rightData: [],
      leftData: [], //所有左侧的数据
      rightUnit: [], //权利归属单位
      rulesx: [{ required: true }], //必填规则
      //分页需要的数据
      currentPage: 1,
      pageNo: 1,
      pageSize: 100,
      pageSizesList: [100, 200, 500, 1000],
      totalNumber: 0, //数据的总数
      SelectAll: false, //是否全选
      show1: false, //判断分配权是否显示
      show2: false, //判断签约权是否显示
      show3: false, //判断运维权是否显示
      show4: false //判断数据维护权是否显示
    };
  },
  methods: {
    //选中待选全部的样式
    SelectAllStyle() {
      if (this.SelectAll) {
        for (var i = 0; i < this.tableLeftData.length; i++) {
          this.$refs.moviesTable.toggleRowSelection(
            this.tableLeftData[i],
            true
          );
        }
      }
    },
    //全选并添加
    getUserRightChooseAll() {
      this.SelectAll = true;
      this.SelectAllStyle();
      let params = {
        buildingName: this.dialogLeftForm.buildingName, //楼栋唯一标识
        coveredAreaMax: this.dialogLeftForm.coveredAreaMax, //大建筑面积
        coveredAreaMin: this.dialogLeftForm.coveredAreaMin, //小建筑面积
        districtGuid: this.guid, //小区唯一标识
        houseNo: this.dialogLeftForm.houseNo, //房号
        completionAreabegain: this.dialogLeftForm.completionAreabegain,
        completionAreaEnd: this.dialogLeftForm.completionAreaEnd,
        type: this.dialogLeftForm.type //户型
      };
      api
        .getUserRightChooseAll(params)
        .then(res => {
          this.tableRightData = res;
          this.tableRightDataLenth = res.length;
          this.SelectAll = false;
          this.getHouseList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //分页大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.leftSearch(1);
    },
    // 页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.leftSearch();
    },
    //下拉框选择事件
    getChangeValue(val) {
      this.selectNewRight = this.rightUnitData.find(item => {
        return item.value === val;
      });
    },
    //获取房屋列表
    getHouseList() {
      this.leftSearch();
    },
    // 左侧查询
    leftSearch(index) {
      let reg = /^(\-)?\d+(\.\d{1,2})?$/;
      let re = new RegExp(reg);
      if (this.dialogLeftForm.coveredAreaMax) {
        if (!re.test(this.dialogLeftForm.coveredAreaMax)) {
          this.$alert("面积不合法", "提示", {
            confirmButtonText: "确定"
          });
          return;
        }
      }
      if (this.dialogLeftForm.coveredAreaMin) {
        if (!re.test(this.dialogLeftForm.coveredAreaMin)) {
          this.$alert("面积不合法", "提示", {
            confirmButtonText: "确定"
          });
          return;
        }
      }
      if (index) {
        this.currentPage = index;
      }
      let params = {
        buildingName: this.dialogLeftForm.buildingName, //楼栋唯一标识
        coveredAreaMax: this.dialogLeftForm.coveredAreaMax, //大建筑面积
        coveredAreaMin: this.dialogLeftForm.coveredAreaMin, //小建筑面积
        completionAreabegain: this.dialogLeftForm.completionAreabegain,
        completionAreaEnd: this.dialogLeftForm.completionAreaEnd,
        districtGuid: this.guid, //小区唯一标识
        houseNo: this.dialogLeftForm.houseNo, //房号
        type: this.dialogLeftForm.type, //户型
        houseState: this.dialogLeftForm.houseState, 
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      http
        .getStoreHouseList(params)
        .then(res => {
          this.leftData = res.content; //ywj
          if (this.rightData == "" && res.content.length > 0) {
            this.tableLeftData = res.content;
            this.totalNumber = res.totalElements;
          } else {
            this.totalNumber = res.totalElements;
            for (var i = 0; i < this.rightData.length; i++) {
              for (var j = 0; j < this.leftData.length; j++) {
                if (this.leftData[j].guid == this.rightData[i].guid) {
                  this.leftData.splice(j, 1);
                }
              }
            }
            this.tableLeftData = this.leftData;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 右侧查询
    rightSearch() {
      if (this.rightData != this.tableRightData) {
        this.tableRightData = [];
        for (var i = 0; i < this.rightData.length; i++) {
          this.tableRightData.push(this.rightData[i]);
        }
      }
      let params = {
        buildingName: this.dialogRightForm.buildingName, //楼栋唯一标识
        houseNo: this.dialogRightForm.HouseNo, //房号
        type: this.dialogRightForm.type, //户型
        AreaMax: this.dialogRightForm.coveredAreaMax, //最大面积
        AreaMin: this.dialogRightForm.coveredAreaMin, //最小面积
        completionAreabegain: this.dialogRightForm.completionAreabegain,
        completionAreaEnd: this.dialogRightForm.completionAreaEnd
      };
      var arr1 = [];
      arr1 = this.searchBuildName(this.tableRightData, params.buildingName);
      var arr2 = [];
      arr2 = this.searchHouseNo(arr1, params.houseNo);
      var arr3 = [];
      arr3 = this.searchType(arr2, params.type);
      var arr4 = [];
      arr4 = this.searchArea(
        arr3,
        this.dialogRightForm.coveredAreaMin,
        this.dialogRightForm.coveredAreaMax
      );
      var arr5 = [];
      arr5 = this.searchCompleteArea(
        arr4,
        this.dialogRightForm.completionAreabegain,
        this.dialogRightForm.completionAreaEnd
      );
      this.tableRightData = arr5;
    },
    searchBuildName(data, params) {
      //查询栋号
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        if (params == undefined) {
          arr.push(data[i]);
        } else if (params == "") {
          arr.push(data[i]);
        } else {
          if (data[i].buildName.indexOf(params) != -1) {
            arr.push(data[i]);
          }
        }
      }
      return arr;
    },
    searchHouseNo(data, params) {
      //查询房号
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        if (params == undefined) {
          arr.push(data[i]);
        } else if (params == "") {
          arr.push(data[i]);
        } else {
          if (data[i].houseNo.indexOf(params) != -1) {
            arr.push(data[i]);
          }
        }
      }
      return arr;
    },
    searchType(data, params) {
      //查询房型
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        if (params == undefined) {
          arr.push(data[i]);
        } else if (params == "") {
          arr.push(data[i]);
        } else {
          if (data[i].type == params) {
            arr.push(data[i]);
          }
        }
      }
      return arr;
    },
    searchArea(data, paramsA, paramsB) {
      //查询面积
      var arr = [];
      var r = /^\+?[0-9][0-9]*$/;
      for (var i = 0; i < data.length; i++) {
        if (paramsA != "") {
          if (!r.test(paramsA) && paramsA) {
            this.$alert("面积不合法,请重新输入", "提示", {
              confirmButtonText: "确定"
            });
          } else {
            if (data[i].coveredArea < paramsA) {
              continue;
            }
          }
        }
        if (paramsB != "") {
          if (!r.test(paramsB) && paramsB) {
            this.$alert("面积不合法,请重新输入", "提示", {
              confirmButtonText: "确定"
            });
          } else {
            if (data[i].coveredArea > paramsB) {
              continue;
            }
          }
        }
        arr.push(data[i]);
      }
      return arr;
    },
    //查询竣工建筑面积
    searchCompleteArea(data, paramsA, paramsB) {
      var arr = [];
      var r = /^\+?[0-9][0-9]*$/;
      for (var i = 0; i < data.length; i++) {
        if (paramsA != "") {
          if (!r.test(paramsA) && paramsA) {
            this.$alert("面积不合法,请重新输入", "提示", {
              confirmButtonText: "确定"
            });
          } else {
            if (data[i].completionArea < paramsA) {
              continue;
            }
          }
        }
        if (paramsB != "") {
          if (!r.test(paramsB) && paramsB) {
            this.$alert("面积不合法,请重新输入", "提示", {
              confirmButtonText: "确定"
            });
          } else {
            if (data[i].completionArea > paramsB) {
              continue;
            }
          }
        }
        arr.push(data[i]);
      }
      return arr;
    },
    //选择左边的数据
    handleLeftChange(val) {
      this.leftSelection = val;
    },
    // 选择右边的数据
    handleRightChange(val) {
      this.rightSelection = val;
      console.log("===", val);
    },
    //添加
    handleAdd() {
      let leftselected = this.leftSelection;
      leftselected.forEach(item => {
        this.tableRightData.push(item);
      });
      let [...arr] = this.tableLeftData;
      var result = [];
      for (var i = 0; i < arr.length; i++) {
        var flag = 1;
        for (var j = 0; j < leftselected.length; j++) {
          if (leftselected[j].guid == arr[i].guid) {
            flag = 0;
            this.rightData.push(arr[i]);
            break;
          }
        }
        if (flag) {
          result.push(arr[i]);
        }
      }
      this.tableLeftData = result;
      this.tableRightDataLenth = this.tableRightData.length;
    },
    // 移除
    handleRemove() {
      let rightSelected = this.rightSelection;
      rightSelected.forEach(item => {
        this.tableLeftData.push(item);
      });
      var result = [];
      for (var i = 0; i < this.rightData.length; i++) {
        var flag = 1;
        for (var j = 0; j < rightSelected.length; j++) {
          if (rightSelected[j].guid == this.rightData[i].guid) {
            flag = 0;
            this.rightData.splice(i, 1);
            i--;
            break;
          }
        }
        if (flag) {
          result.push(this.rightData[i]);
        }
      }
      this.tableRightData = result;
      this.tableRightDataLenth = this.tableRightData.length;
    },
    //单击left行
    clickRow(row) {
      this.$refs.moviesTable.toggleRowSelection(row);
    },
    //单击right行
    clickRightRow(row) {
      this.$refs.rightTable.toggleRowSelection(row);
    },
    // 提交
    submit() {
      if (this.rightSelection.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择房源"
        });
      } else if (this.rightsForm.checkList.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择需要变更的权利"
        });
      } else if (this.show1 && !this.rightsForm.distribution) {
        this.$message({
          type: "warning",
          message: "请选择新的分配权单位"
        });
      } else if (this.show2 && !this.rightsForm.signing) {
        this.$message({
          type: "warning",
          message: "请选择新的签约权单位"
        });
      } else if (this.show3 && !this.rightsForm.operation) {
        this.$message({
          type: "warning",
          message: "请选择新的运维权单位"
        });
      } else if (this.show4 && !this.rightsForm.maintain) {
        this.$message({
          type: "warning",
          message: "请选择新的维护权单位"
        });
      } else if (this.rightsForm.reason.length == 0) {
        this.$message({
          type: "warning",
          message: "请填写权利变更依据"
        });
      } else {
        let changeValue = this.rightsForm.changeValue;
        let power = [];
        for (let i = 0; i < this.rightsForm.checkList.length; i++) {
          if (this.rightsForm.checkList[i] == "allocation") {
            power.push({ id: 1, name: "分配权" });
          } else if (this.rightsForm.checkList[i] == "signatory") {
            power.push({ id: 2, name: "签约权" });
          } else if (this.rightsForm.checkList[i] == "operational") {
            power.push({ id: 3, name: "运维权" });
          } else if (this.rightsForm.checkList[i] == "maintainOption") {
            power.push({ id: 4, name: "维护权" });
          }
        }
        let powersort = power.sort(function(a, b) {
          return a.id - b.id;
        });
        let powerlist = "";
        for (let j = 0; j < powersort.length; j++) {
          if (j !== power.length - 1) {
            powerlist += powersort[j].name + ",";
          } else {
            powerlist += powersort[j].name;
          }
        }
        this.$confirm(
          // "确定将选中房源的" +
          //   powerlist +
          //   "变更为" +
          //   this.selectNewRight.name +
          //   "?",
          "确定变更这些权利单位?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            let selectedGuid = [];
            let propertiesArr = [];
            for (let item of this.rightSelection) {
              selectedGuid.push(item.guid);
            }
            let titleSelection = [];
            this.rightsForm.checkList.forEach(element => {
              titleSelection.push(element);
            });
            let params = {
              changeValue: this.rightsForm.changeValue,
              properties: titleSelection.toString(),
              allocationChangeValue: this.rightsForm.distribution,
              signatoryChangeValue: this.rightsForm.signing,
              operationalChangeValue: this.rightsForm.operation,
              maintainChangeValue: this.rightsForm.maintain,
              reason: this.rightsForm.reason
            };
            let data = selectedGuid;
            http
              .changeHouseRight(params, data)
              .then(res => {
                this.$message({
                  type: "success",
                  message: "变更成功"
                });
                this.$emit("isShow");
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      }
    },
    //取消
    cancel() {
      this.$emit("isShow");
    },
    //获取字典
    getDictionary() {
      let namesArr = [
        "户型",
        "分配权归属单位",
        "签约权归属单位",
        "运维权归属",
        "数据维护权归属",
        "房屋状态"
      ];
      let params = {
        names: namesArr.toString()
      };
      http
        .getDictionary(params)
        .then(res => {
          this.typeData = JSON.parse(res).户型;
          this.distributionOption = JSON.parse(res).分配权归属单位; //分配权
          this.signingOption = JSON.parse(res).签约权归属单位; //签约权
          this.operationOption = JSON.parse(res).运维权归属; //运维权
          this.maintainOption = JSON.parse(res).数据维护权归属; //维护权
          this.houseState = JSON.parse(res).房屋状态; //维护权
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取用户信息
    getUserInfo() {
      let params = {};
      http
        .getUserName(params)
        .then(res => {
          this.dialogRightForm.unSeizor = res.userName;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //改变产权单位
    changeRightUnit() {
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.show4 = false;
      this.rightsForm.checkList.forEach(ele => {
        if (ele == "allocation") {
          this.show1 = true;
        } else if (ele == "signatory") {
          this.show2 = true;
        } else if (ele == "operational") {
          this.show3 = true;
        } else if (ele == "maintain") {
          this.show4 = true;
        }
      });
    }
  },
  mounted() {
    this.guid = this.$route.params.guid;
    this.getHouseList();
    this.getDictionary(); //获取字典数据
    this.getUserInfo(); //操作人
  }
};
</script>

<style lang="scss" scoped>
.dialog-content {
  display: flex;
  align-content: space-between;
  .dialog-left,
  .dialog-right {
    width: 44%;
    border: 1px solid #ccc;
    height: auto;
    padding: 10px;
  }
  .dialog-center {
    width: 8%;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
}
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
}
.el-table /deep/ td,
.el-table /deep/ th {
  text-align: center;
}
.el-table /deep/ th {
  background: #e6f0fc;
  border-right: 1px solid #d0cdc7;
  border-bottom: 1px solid #d0cdc7;
}
.el-table /deep/ td {
  border-right: 1px solid #d0cdc7;
  border-bottom: 1px solid #d0cdc7;
}
.el-table {
  border: 1px solid #d0cdc7;
}
</style>
