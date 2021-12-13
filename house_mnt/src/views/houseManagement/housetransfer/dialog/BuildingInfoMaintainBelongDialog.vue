<template>
  <div class="dialog">
    <div class="dialog-content">
      <div class="dialog-left">
        <el-form :model="dialogLeftForm" size="mini" label-position="left" label-width="3.5rem">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="栋号">
                <el-input
                  v-model="dialogLeftForm.code"
                  clearable
                  placeholder="请输入栋号"
                  @change="leftSearch"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="栋名称">
                <el-input
                  v-model="dialogLeftForm.name"
                  clearable
                  placeholder="请输入栋名称"
                  @change="leftSearch"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" size="mini" @click="leftSearch">查询</el-button>
              <el-button type="primary" size="mini" @click="leftAllChoose">全选</el-button>
            </el-col>
          </el-row>
        </el-form>
        <p>请选择需修改栋归属的房源</p>
        <el-table
          @row-click="clickRow"
          ref="tableLeftData"
          :data="tableLeftData"
          border
          size="mini"
          height="500"
          style="width: 100%"
          @selection-change="handleLeftChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="districtName" label="小区名称"></el-table-column>
          <el-table-column prop="code" label="栋号"></el-table-column>
          <el-table-column prop="name" label="栋名称"></el-table-column>
          <el-table-column prop="elevatorName" label="是否带电梯"></el-table-column>
          <el-table-column prop="floorCount" label="总楼层数"></el-table-column>
          <el-table-column prop="skirtFloorCount" label="裙楼层数"></el-table-column>
          <el-table-column prop="landNo" label="宗地号"></el-table-column>
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
        <el-form :model="dialogRightForm" size="mini" label-position="left" label-width="4rem">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="栋号">
                <el-input
                  v-model="dialogRightForm.code"
                  clearable
                  placeholder="请输入栋名称"
                  style="width:100%"
                  @change="rightSearch"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="栋名称">
                <el-input
                  v-model="dialogRightForm.name"
                  clearable
                  placeholder="请输入栋名称"
                  @change="rightSearch"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" size="mini" @click="rightSearch">查询</el-button>
              <el-button type="primary" size="mini" @click="rightAllChoose">全选</el-button>
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
          ref="tableRightData"
          border
          height="500"
          size="mini"
          style="width: 100%"
          @selection-change="handleRightChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="districtName" label="小区名称"></el-table-column>
          <el-table-column prop="code" label="栋号"></el-table-column>
          <el-table-column prop="name" label="栋名称"></el-table-column>
          <el-table-column prop="elevatorName" label="是否带电梯"></el-table-column>
          <el-table-column prop="floorCount" label="总楼层数"></el-table-column>
          <el-table-column prop="skirtFloorCount" label="裙楼层数"></el-table-column>
          <el-table-column prop="landNo" label="宗地号"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="dialog-footer">
      <el-form v-model="rightsForm" size="mini" style="width:84%">
        <el-form-item label="请选择新的数据维护权归属" label-width="12rem" required>
          <el-select
            v-model="rightsForm.maintain"
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
        <el-form-item label="请填写权利变更依据" label-width="12rem" required>
          <el-input type="textarea" v-model="rightsForm.basis"></el-input>
        </el-form-item>
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
import api from "@/api/house.js";

export default {
  name: "reservedialog",
  data() {
    return {
      guid: "", //小区标识
      dialogLeftForm: {}, //弹框左侧表单
      dialogRightForm: {}, //弹框右侧表单
      tableLeftData: [], //左侧表格数据
      tableRightData: [], //右侧表格数据
      leftSelection: [], //左侧选择的数据
      rightSelection: [], //右侧选择的数据
      tableRightDataLenth: 0,
      rightsForm: {}, //底部表单
      maintainOption: [], //运维权
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
      },
      rightChooseAll: false //是否全选
    };
  },
  methods: {
    // 左侧查询
    leftSearch() {
      if (this.rightChooseAll) {
        this.rightChooseAll = false;
      }
      let params = {
        code: this.dialogLeftForm.code,
        name: this.dialogLeftForm.name,
        districtGuid: this.guid, //小区唯一标识
        pageSize: this.pageInfo.pageSize,
        pageIndex: this.pageInfo.pageIndex
      };
      api
        .getBuildingPage(params)
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
      if (this.rightChooseAll) {
        this.rightChooseAll = false;
      }
      if (this.rightData != this.tableRightData) {
        this.tableRightData = [];
        for (var i = 0; i < this.rightData.length; i++) {
          this.tableRightData.push(this.rightData[i]);
        }
      }
      let params = {
        code: this.dialogRightForm.code, //楼栋唯一标识
        name: this.dialogRightForm.name //房号
      };
      var arr1 = [];
      arr1 = this.searchBuildCode(this.tableRightData, params.code);
      var arr2 = [];
      arr2 = this.searchBuildName(arr1, params.name);
      this.tableRightData = arr2;
    },
    //查询栋号
    searchBuildCode(data, params) {
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        if (params == undefined) {
          arr.push(data[i]);
        } else if (params == "") {
          arr.push(data[i]);
        } else {
          if (data[i].code.indexOf(params) != -1) {
            arr.push(data[i]);
          }
        }
      }
      return arr;
    },
    searchBuildName(data, params) {
      //查询房号
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        if (params == undefined) {
          arr.push(data[i]);
        } else if (params == "") {
          arr.push(data[i]);
        } else {
          if (data[i].name.indexOf(params) != -1) {
            arr.push(data[i]);
          }
        }
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
    //左侧全选
    leftAllChoose() {
      //左侧全选样式
      if (this.tableLeftData.length != 0) {
        this.tableLeftData.forEach(row => {
          this.$refs.tableLeftData.toggleRowSelection(row);
        });
      } else {
        this.$refs.tableLeftData.clearSelection();
      }
      let params = {
        districtGuid: this.guid,
        buildNo: this.dialogLeftForm.code,
        buildName: this.dialogLeftForm.name
      };
      api
        .getAllBuildList(params)
        .then(res => {
          this.leftSelection = res;
          for (var i = 0; i < this.tableRightData.length; i++) {
            var flags = 1;
            for (var j = 0; j < this.leftSelection.length; j++) {
              if (this.leftSelection[j].guid == this.tableRightData[i].guid) {
                flags = 0;
                this.leftSelection.splice(j, 1);
                j--;
                break;
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //右侧全选
    rightAllChoose() {
      this.rightSelection = this.tableRightData;
      this.rightChooseAll = true;
      //右侧全选样式
      if (this.tableRightData.length != 0) {
        this.tableRightData.forEach(row => {
          this.$refs.tableRightData.toggleRowSelection(row);
        });
      } else {
        this.$refs.tableRightData.clearSelection();
      }
    },
    //添加
    handleAdd() {
      if (this.rightChooseAll) {
        this.rightChooseAll = false;
      }
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
      if (this.rightChooseAll) {
        this.rightChooseAll = false;
      }
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
      } else if (!this.rightsForm.maintain) {
        this.$message({
          type: "warning",
          message: "请选择新的数据维护权归属"
        });
      } else if (!this.rightsForm.basis) {
        this.$message({
          type: "warning",
          message: "请填写权利变更依据"
        });
      } else {
        this.$confirm(`确定将选中的房修改栋归属?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let selectedGuid = [];
            for (let item of this.tableRightData) {
              selectedGuid.push(item.guid);
            }
            let params = {
              districtGuid: this.guid,
              buildNo: this.dialogRightForm.code,
              buildName: this.dialogRightForm.name,
              changeMaintainBelong: this.rightsForm.maintain,
              changBasis: this.rightsForm.basis,
              isChooseAll: this.rightChooseAll
            };
            let data = [];
            if (!this.rightChooseAll) {
              data = selectedGuid;
            }
            api
              .saveBuildMaintain(params, data)
              .then(res => {
                console.log(res);
                this.$message({
                  type: "success",
                  message: "修改栋归属成功"
                });
                this.$emit("isShow");
                this.Event.$emit("inquireHouse", "getHouseList");
                this.Event.$emit("HouseInfo", "getHouseList");
              })
              .catch(err => {
                this.$message({
                  type: "success",
                  message: "修改栋归属失败"
                });
              });
          })
          .catch(err => {
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
      let namesArr = ["数据维护权归属"];
      let params = {
        names: namesArr.toString()
      };
      http
        .getDictionary(params)
        .then(res => {
          res = JSON.parse(res);
          this.maintainOption = res.数据维护权归属;
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
    }
  },
  mounted() {
    this.guid = this.$route.params.guid;
    this.leftSearch();
    this.getDictionary(); //获取字典数据
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
