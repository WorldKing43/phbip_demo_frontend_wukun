<template>
  <!-- 房源标注 -->
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
                  @change="getReserveHouse(1)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房号" label-width="5rem">
                <el-input
                  v-model="dialogLeftForm.houseNo"
                  clearable
                  placeholder="请输入房号"
                  @change="getReserveHouse(1)"
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
                  @change="getReserveHouse(1)"
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
                    <el-input v-model="dialogLeftForm.coveredAreaMin" @change="getReserveHouse(1)"></el-input>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align: center">-</el-col>
                  <el-col :span="11">
                    <el-input v-model="dialogLeftForm.coveredAreaMax" @change="getReserveHouse(1)"></el-input>
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
                      @change="getReserveHouse(1)"
                    ></el-input>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align: center">-</el-col>
                  <el-col :span="11">
                    <el-input
                      v-model="dialogLeftForm.completionAreaEnd"
                      clearable
                      @change="getReserveHouse(1)"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" @click="getReserveHouse(1)" size="mini">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
        <p>请选择需要标记的房源</p>
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
              <el-button type="primary" size="mini" @click="rightSearch">查询</el-button>
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
        </el-table>
      </div>
    </div>
    <div class="dialog-footer">
      <el-form v-model="rightsForm" size="mini" style="width:84%">
        <el-form-item label="请填写标记原因" label-width="8rem" :rules="rulesx">
          <el-select v-model="rightsForm.reason" clearable placeholder style="width:100%">
            <el-option
              v-for="(item) in markReason"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请填写标记依据" label-width="8rem" :rules="rulesx">
          <el-input type="textarea" v-model="rightsForm.basis"></el-input>
        </el-form-item>
        <el-form-item label="过程材料" label-width="8rem">
          <template>
            <Material :parameter="parameter" :show="show"></Material>
          </template>
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
import Material from "@/components/CorrelativeMaterial";
import api from "@/api/house.js";

export default {
  name: "reservedialog",
  components: {
    Material
  },
  data() {
    return {
      parameter: "", //过程材料要传的参数
      guid: "", //小区的guid
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
      rulesx: [{ required: true }], //必填规则
      rightsForm: {
        reason: "",
        basis: ""
      },
      materialGuid: "", //生成过程材料的guid
      markReason: [], //标记原因下拉
      //分页需要的数据
      currentPage: 1,
      pageSize: 50,
      pageSizesList: [50, 100, 200, 3000],
      totalNumber: 0, //数据的总数
      show: false
    };
  },
  methods: {
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
    // 获取问题房源的房子
    getReserveHouse(index) {
      this.leftSearch(index);
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
        buildingName: this.dialogLeftForm.buildingName, //栋名称
        coveredAreaMax: this.dialogLeftForm.coveredAreaMax, //大建筑面积
        coveredAreaMin: this.dialogLeftForm.coveredAreaMin, //小建筑面积
        completionAreabegain: this.dialogLeftForm.completionAreabegain,
        completionAreaEnd: this.dialogLeftForm.completionAreaEnd,
        districtGuid: this.$route.params.guid, //小区唯一标识
        flag: false, //是否查封
        houseNo: this.dialogLeftForm.houseNo, //房号
        property: "situational", //变更属性
        type: this.dialogLeftForm.type, //户型
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      http
        .getStoreHouseList(params)
        .then(res => {
          this.leftData = res.content;
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
      console.log("户型数据为", arr);
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

    //取消
    cancel() {
      this.$emit("isShow");
    },
    //获取字典
    getDictionary() {
      let namesArr = ["户型", "房源标注"];
      let params = {
        names: namesArr.toString()
      };
      http
        .getDictionary(params)
        .then(res => {
          this.typeData = JSON.parse(res).户型;
          this.rightTypeData = JSON.parse(res).户型;
          this.markReason = JSON.parse(res).房源标注;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //问题房源标注-生成guid
    getGenerateGuid() {
      let params = {};
      api
        .getGenerateGuid(params)
        .then(res => {
          this.parameter = res;
          this.materialGuid = res;
          this.createMis();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 提交
    submit() {
      if (this.rightSelection.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择房源信息"
        });
      } else if (!this.rightsForm.reason) {
        this.$message({
          type: "warning",
          message: "请填写标记原因"
        });
      } else if (!this.rightsForm.basis) {
        this.$message({
          type: "warning",
          message: "请填写标记依据"
        });
      } else {
        this.$confirm(`确定将选中房源进行标记?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let selectedGuid = [];
            let propertiesArr = [];
            for (let item of this.rightSelection) {
              selectedGuid.push(item.guid);
            }
            let params = {
              flag: true,
              property: ["situational"].toString(),
              reason: this.rightsForm.reason
            };
            let data = selectedGuid;
            http
              .changeHouseState(params, data)
              .then(res => {
                //保存操作原因和依据的接口
                let _parmas = {
                  operation: "问题房源标记",
                  reason: this.rightsForm.reason,
                  basis: this.rightsForm.basis,
                  materialGuid: this.materialGuid
                };
                let _data = selectedGuid;
                http
                  .saveReasonAndBasis(_parmas, _data)
                  .then(res => {
                    if (res) {
                      this.$message.success("提交成功");
                      this.$emit("isShow");
                      this.Event.$emit("HouseDetails", "getSituationalList");
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
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
    //创建MISid
    createMis() {
      let params = {
        businessName: "房源问题标注",
        guid: this.materialGuid
      };
      api
        .createMis(params)
        .then(res => {
          this.parameter = this.materialGuid;
          this.Event.$emit("CorrelativeMaterial", "getMaterial");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getGenerateGuid();
    this.guid = this.$route.params.guid;
    this.getReserveHouse(); // 获取问题房源的房子
    this.getDictionary(); //获取字典数据
  }
};
</script>

<style lang="scss" scoped>
.dialog-content {
  display: flex;
  align-content: space-around;
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
