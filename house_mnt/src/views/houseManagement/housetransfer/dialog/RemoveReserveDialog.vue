<template>
  <!-- 取消预留 -->
  <div class="dialog">
    <div class="dialog-content">
      <div class="dialog-left">
        <el-form :model="dialogLeftForm" size="mini" label-position="left">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="栋名称" label-width="5rem">
                <el-input
                  v-model="dialogLeftForm.buildingName"
                  clearable
                  placeholder="请输入栋名称"
                  @change="leftSearch"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房号" label-width="5rem">
                <el-input
                  v-model="dialogLeftForm.houseNo"
                  clearable
                  placeholder="请输入房号"
                  @change="leftSearch"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="户型" label-width="5rem">
                <el-select
                  v-model="dialogLeftForm.type"
                  clearable
                  placeholder="请选择户型"
                  style="width:100%"
                  @change="leftSearch"
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
                    <el-input v-model="dialogLeftForm.coveredAreaMin" @change="leftSearch"></el-input>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align: center">-</el-col>
                  <el-col :span="11">
                    <el-input v-model="dialogLeftForm.coveredAreaMax" @change="leftSearch"></el-input>
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
                      @change="leftSearch"
                    ></el-input>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align: center">-</el-col>
                  <el-col :span="11">
                    <el-input
                      v-model="dialogLeftForm.completionAreaEnd"
                      clearable
                      @change="leftSearch"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" size="mini" @click="leftSearch">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
        <p>请选择需要解除预留的房源</p>
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
        </el-table>
        <div class="pagination-style">
          <el-pagination
            background
            @size-change="pageSize"
            @current-change="currentPage"
            :current-page="pageInfo.pageIndex"
            :page-sizes="pageInfo.pageSizes"
            :page-size="pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
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
        <el-form :model="dialogRightForm" size="mini" label-position="left">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="栋名称" label-width="5rem">
                <el-input
                  v-model="dialogRightForm.buildingName"
                  clearable
                  placeholder="请输入栋名称"
                  style="width:100%"
                  @change="rightSearch"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房号" label-width="5rem">
                <el-input
                  v-model="dialogRightForm.HouseNo"
                  clearable
                  placeholder="请输入房号"
                  style="width:100%"
                  @change="rightSearch"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="户型" label-width="5rem">
                <el-select
                  v-model="dialogRightForm.type"
                  clearable
                  placeholder="请选择户型"
                  style="width:100%"
                  @change="rightSearch"
                >
                  <el-option
                    v-for="(item, index) in rightTypeData"
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
              <el-button type="primary" size="mini" @click="rightSearch">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
        <p>
          已选中房源，已添加{{ tableRightDataLenth }}套，已选中{{
          rightSelection.length
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
        </el-table>
      </div>
    </div>
    <div class="dialog-footer">
      <el-form v-model="rightsForm" size="mini" style="width:84%">
        <el-form-item style="text-align:center;margin:0 auto">
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

export default {
  name: "reservedialog",
  data() {
    return {
      guid: "", //小区标识
      dialogLeftForm: {}, //弹框左侧表单
      dialogRightForm: {
        coveredAreaMin: "",
        coveredAreaMax: ""
      }, //弹框右侧表单
      stateData: [], //下拉框数据
      tableLeftData: [], //左侧表格数据
      tableRightData: [], //右侧表格数据
      leftSelection: [], //左侧选择的数据
      rightSelection: [], //右侧选择的数据
      tableRightDataLenth: 0,
      rightsForm: {}, //底部表单
      distributionOption: [], //分配权
      signingOption: [], //签约权
      operationOption: [], //运维权
      reason: "", //依据
      typeData: [], //户型下拉
      rightTypeData: [], //右边户型下拉
      rightData: [],
      leftData: [], //所有左侧的数据
      // 分页信息
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        pafeSizes: [10, 20, 50, 100],
        total: 0
      }
    };
  },
  methods: {
    // 获取已经预留的房子
    getReserveHouse() {
      this.leftSearch();
    },
    // 左侧查询
    leftSearch() {
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
      let params = {
        buildingName: this.dialogLeftForm.buildingName, //楼栋唯一标识
        coveredAreaMax: this.dialogLeftForm.coveredAreaMax, //大建筑面积
        coveredAreaMin: this.dialogLeftForm.coveredAreaMin, //小建筑面积
        completionAreabegain: this.dialogLeftForm.completionAreabegain,
        completionAreaEnd: this.dialogLeftForm.completionAreaEnd,
        districtGuid: this.guid, //小区唯一标识
        flag: true, //是否查封
        houseNo: this.dialogLeftForm.houseNo, //房号
        property: "busy", //变更属性
        type: this.dialogLeftForm.type, //户型
        pageSize: this.pageInfo.pageSize,
        pageIndex: this.pageInfo.pageIndex
      };
      http
        .getStoreHouseList(params)
        .then(res => {
          this.leftData = res.content;
          this.pageInfo.total = res.totalElements;
          if (this.rightData == "" && res.content.length > 0) {
            this.tableLeftData = res.content;
          } else {
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
    pageSize(val) {
      // 切换页面大小
      this.pageInfo.pageIndex = 1;
      this.pageInfo.pageSize = val;
      this.leftSearch();
    },
    currentPage(val) {
      this.pageInfo.pageIndex = val;
      this.leftSearch();
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
    searchCompleteArea(data, paramsA, paramsB) {
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
          message: "请选择房源信息"
        });
        return;
      }
      this.$confirm(`确定将选中房源解除预留?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let selectedGuid = [];
          let propertiesArr = [];
          for (let item of this.tableRightData) {
            selectedGuid.push(item.guid);
          }
          let params = {
            flag: false,
            property: ["busy"].toString()
          };
          let data = selectedGuid;
          http
            .changeHouseState(params, data)
            .then(res => {
              console.log(res);
              this.$message({
                type: "success",
                message: "解除预留"
              });
              this.$emit("isShow");
              this.Event.$emit("inquireHouse", "getHouseList");
              this.Event.$emit("HouseInfo", "getHouseList");
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
      // }
    },
    //取消
    cancel() {
      this.$emit("isShow");
    },
    //获取字典
    getDictionary() {
      let namesArr = ["户型"];
      let params = {
        names: namesArr.toString()
      };
      http
        .getDictionary(params)
        .then(res => {
          res = JSON.parse(res);
          this.typeData = res.户型;
          this.rightTypeData = res.户型;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取当前小区下所有栋
    getAllBuilding() {
      let params = {
        districtGuid: this.getGuidOfHouseStore
      };
      http
        .getAllBuilding(params)
        .then(res => {
          res.forEach(item => {
            let obj = {
              name: item.name,
              value: item.guid
            };
            this.buildingData.push(obj);
            this.rightBuildNameData.push(obj);
          });
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
    }
  },
  mounted() {
    this.guid = this.$route.params.guid;
    this.getReserveHouse();
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
