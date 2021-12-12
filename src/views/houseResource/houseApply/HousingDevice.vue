<!--
 * @Description: 配套设施
 * @Version: 2.0
 * @Autor: wangyue
 * @Date: 2019-11-29 19:05:37
 * @LastEditors: wangyue
 * @LastEditTime: 2020-03-31 10:00:46
 -->

<template>
  <div class="housingDevice">
    <div style="margin-top:15px">
      <el-button type="primary" size="mini" @click="chooseDistrict" :disabled="isBan">选择配套设施</el-button>
      <el-button type="primary" size="mini" @click="deteleSelection" :disabled="isBan" title="移除当前页选择的配套设施">选择移除
      </el-button>
      <el-button type="primary" size="mini" @click="deteleAllSelection" :disabled="isBan" title="移除所有的配套设施">移除所有
      </el-button>
    </div>
    <div class="quarterMessage_box" style="margin-top:20px">
      <el-table size="mini" @selection-change="handleSelectionChange2" :data="preHousList" style="width: 100%" border
        :header-cell-style="{
          'background': '#E6F0FC',
          'color': '#606266',
          'text-align':'center',
          'border-color': '#DBDBDB',
          }" :cell-style="{
          'text-align':'center',
          'border-color': '#DBDBDB',
          }">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="序号" type="index" :index="indexMethod" width="70"></el-table-column>
        <el-table-column prop="buildingName" label="栋名称"></el-table-column>
        <el-table-column prop="reportDept" label="上报部门"></el-table-column>
        <el-table-column prop="facilityType" label="配套设施类型"></el-table-column>
        <el-table-column prop="facilityCount" label="配套设施数量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="facilityNo" label="设施编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="assortFacilityName" label="设施名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="facilityOrigin" label="设施来源"></el-table-column>
        <el-table-column prop="rentalUnit" label="租售单位" show-overflow-tooltip></el-table-column>
        <el-table-column prop label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deteleYuHousing(scope.$index, scope.row)" :disabled="isBan">
              移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pageObj.currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="pageObj.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="pageObj.total"></el-pagination>
    </div>
    <!-- 选择预房源弹窗 -->
    <el-dialog title="选择配套设施" :visible.sync="prehousingFormVisible" width="60%" class="box"
      :close-on-click-modal="false">
      <div>
        <div class="content_left" style="width:100%">
          <div class="search_box">
            <el-form size="mini" label-width="5rem" label-position="left">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="栋名称" label-width="4rem">
                    <el-input v-model="form.buildingName" clearable @keyup.enter.native="query"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="上报部门">
                    <el-input v-model="form.reportUnit" clearable @keyup.enter.native="query"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="配套设施类型" label-width="6rem">
                    <el-select v-model="form.facilityType" clearable @keyup.enter.native="query">
                      <el-option v-for="(item,index) in device" :key="index" :label="item.name" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30">
                <el-col :span="8">
                  <el-form-item label="设施来源">
                    <el-select v-model="form.facilityOrigin" clearable @keyup.enter.native="query">
                      <el-option v-for="(item,index) in deviceSource" :key="index" :label="item.name"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                </el-col>
                <el-col :span="8">
                  <el-form-item label="租售单位">
                    <el-input v-model="form.rentalUnit" clearable @keyup.enter.native="query"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-button type="primary" size="mini" @click="query">查询</el-button>
                  <el-button type="primary" size="mini" @click="reset">重置</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <!-- 搜索框结束 -->
          <div style="display:flex;margin-bottom:5px">
            <h5 style="line-height:25px;">可选择配套设施</h5>
            <el-button type="primary" size="mini" @click="allSelection" :disabled="isBan||chooseHouseList.length==0"
              title="添加所有的配套设施" style="margin-left:10px">添加所有</el-button>
          </div>
          <div class="quarterMessage_box">
            <template>
              <el-table :data="chooseHouseList" style="width: 100%" border @selection-change="handleSelectionChange"
                :header-cell-style="{
                'background': '#E6F0FC',
                'color': '#606266',
                'text-align':'center',
                'border-color': '#DBDBDB',
                }" :cell-style="{
                'text-align':'center',
                'border-color': '#DBDBDB',
                }">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="buildingName" label="栋名称"></el-table-column>
                <el-table-column prop="reportDept" label="上报部门"></el-table-column>
                <el-table-column prop="facilityType" label="配套设施类型"></el-table-column>
                <el-table-column prop="facilityCount" label="配套设施数量" show-overflow-tooltip></el-table-column>
                <el-table-column prop="facilityNo" label="设施编号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="assortFacilityName" label="设施名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="facilityOrigin" label="设施来源"></el-table-column>
              </el-table>
            </template>
            <p style="float:left;margin-top:10px">已选中{{multipleSelection.length}}套</p>
            <template>
              <div class="block page_box" style="float:right;margin-top:5px">
                <el-pagination background @size-change="handleSizeChange1" @current-change="handleCurrentChange1"
                  :current-page="pageObj1.currentPage4" :page-sizes="[50, 100, 300, 500]" :page-size="pageObj1.pageSize"
                  layout="total, sizes, prev, pager, next, jumper" :total="pageObj1.total"></el-pagination>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer footer">
        <el-button @click="prehousingFormVisible = false" size="mini">取消</el-button>
        <el-button type="primary" @click="savePreHouse" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  <!-- 预房源模板 -->
</template>
<script>
import http from "@/api/common(bj).js";
export default {
  name: "housingDevice",
  data() {
    return {
      multipleSelection1: [],
      multipleSelection: [],
      multipleSelection2: [], //要提交房源的数组
      pageObj: {
        currentPage4: 1,
        pageSize: 10,
        total: 0
      },
      pageObj1: {
        currentPage4: 1,
        pageSize: 10,
        total: 0
      },
      chooseHouseList: [],
      preHousList: [],
      prehousingFormVisible: false,
      form: {
        buildingName: "", //栋名称
        reportUnit: "",
        facilityType: "",
        facilityOrigin: "",
        belong: "",
        rentalUnit: ""
      },
      device: [],
      belongAreas: [],
      deviceSource: [],
      isBan: false, //判断是否是提交过的
    };
  },
  methods: {
    getDict() {
      //如果是提交过的，禁止再次操作
      if (
        this.$parent.params.edit == "已申请" ||
        this.$parent.params.projectGuid == "newguid" ||
        this.$parent.params.edit == "申请通过"
      ) {
        this.isBan = true;
      }
      let dictionaryName = ["设施来源", "维护归属1", "配套设施类型"];
      let params = { names: dictionaryName.toString() };
      http
        .getDictionary(params)
        .then(res => {
          let resp = JSON.parse(res);
          this.deviceSource = resp.设施来源;
          this.belongAreas = resp.维护归属1;
          this.device = resp.配套设施类型;
          this.getPreHousList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取配套设施列表
    getPreHousList() {
      let params = {
        reportGuid: this.$parent.params.projectGuid,
        pageSize: this.pageObj.pageSize,
        pageIndex: this.pageObj.currentPage4
      };
      let data
      http
        .listFacility(params, data)
        .then(res => {
          if (res.content) {
            res.content.forEach(element => {
              // 配套设施类型
              for (var i in this.device) {
                if (element.facilityType == this.device[i].value) {
                  element.facilityType = this.device[i].name;
                  break;
                }
              }
              // 设施来源
              for (var i in this.deviceSource) {
                if (element.facilityOrigin == this.deviceSource[i].value) {
                  element.facilityOrigin = this.deviceSource[i].name;
                  break;
                }
              }
              // 归属
              for (var i in this.belongAreas) {
                if (element.belong == this.belongAreas[i].value) {
                  element.belong = this.belongAreas[i].name;
                  break;
                }
              }
            });
            this.preHousList = res.content;
            this.pageObj.total = res.totalElements;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      // 外面列表分页条数变化获取数据
      this.pageObj.pageSize = val;
      this.getPreHousList();
      this.multipleSelection2 = [];
    },
    handleCurrentChange(val) {
      // 外面列表当前页变化获取数据
      this.pageObj.currentPage4 = val;
      this.getPreHousList();
      this.multipleSelection2 = [];
    },
    //提示框
    open(title) {
      this.$message(title);
    },
    handleSelectionChange1(val) {
      // 选择外面配套设施列表的数据
      var that = this;
      this.multipleSelection1 = val;
    },
    //要提交房源的的复选框的操作
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
    },
    //提交房源入库弹窗
    submitPop() {
      let houseReportInfoDTO = this.$store.state.pcObj;
      houseReportInfoDTO.state = 4;
      let params
      houseReportInfoDTO.itemName = this.$parent.params.itemName
      let data = houseReportInfoDTO
      http
        .saveApplyBatch(params,data)
        .then(res => {
          if (res) {
            this.$message({
              message: "已提交",
              type: "success"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查询房源信息列表
    checkHousList(pageIndex, pageSize) {
      var that = this;
      that.chooseHouse();
    },
    //序号
    indexMethod(row) {
      return row + (this.pageObj.currentPage4 - 1) * this.pageObj.pageSize + 1;
    },
    //移除预房源
    deteleYuHousing(index, row) {
      this.$confirm("确认移除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            reportGuid: this.$parent.params.projectGuid,
            isSelectAll: false
          };
          let data = [row.guid];
          http
            .removeFacility(params, data)
            .then(res => {
              if (res) {
                this.$message({
                  message: "移除成功",
                  type: "success"
                });
                this.getPreHousList();
                //刷新
                this.Event.$emit("ApplyChangeSave", { msg: "ChangeSave" });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消移除"
          });
        });
    },
    deteleAllSelection() {
      this.$confirm("确认移除全部?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            reportGuid: this.$parent.params.projectGuid,
            isSelectAll: true
          };
          let data = [];
          http
            .removeFacility(params, data)
            .then(res => {
              if (res) {
                this.$message({
                  type: "success",
                  message: "移除成功"
                });
                this.getPreHousList();
                //刷新
                this.Event.$emit("ApplyChangeSave", { msg: "ChangeSave" });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消移除"
          });
        });
    },
    deteleSelection() {
      this.$confirm("确认移除选择?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            reportGuid: this.$parent.params.projectGuid,
            isSelectAll: false
          };
          let data = [];
          this.multipleSelection2.forEach(item => {
            data.push(item.guid);
          });
          http
            .removeFacility(params, data)
            .then(res => {
              if (res) {
                this.$message({
                  type: "success",
                  message: "移除成功"
                });
                this.getPreHousList();
                //刷新
                this.Event.$emit("ApplyChangeSave", { msg: "ChangeSave" });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消移除"
          });
        });
    },
    //========弹框操作========选择配套设施============
    //点击选择配套设施
    chooseDistrict() {
      this.prehousingFormVisible = true;
      this.query();
    },
    query(val) {
      //分页查询参数，分页归至为1
      if (val != "Current") {
        this.pageObj1.currentPage4 = 1;
      }
      // 查询弹框里的配套设施查询
      let params = {
        reportGuid: this.$parent.params.projectGuid,
        belong: this.form.belong,
        buildingName: this.form.buildingName,
        districtGuid: this.$parent.params.districtGuid,
        facilityOrigin: this.form.facilityOrigin,
        facilityType: this.form.facilityType,
        pageIndex: this.pageObj1.currentPage4,
        pageSize: this.pageObj1.pageSize,
        rentalUnit: this.form.rentalUnit,
        reportDept: this.form.reportUnit,
        configName:this.$parent.params.itemName
      };
      http
        .checkFacility(params)
        .then(res => {
          if (res.content) {
            res.content.forEach(element => {
              // 配套设施类型
              for (var i in this.device) {
                if (element.facilityType == this.device[i].value) {
                  element.facilityType = this.device[i].name;
                  break;
                }
              }
              // 设施来源
              for (var i in this.deviceSource) {
                if (element.facilityOrigin == this.deviceSource[i].value) {
                  element.facilityOrigin = this.deviceSource[i].name;
                  break;
                }
              }
              // 归属
              for (var i in this.belongAreas) {
                if (element.belong == this.belongAreas[i].value) {
                  element.belong = this.belongAreas[i].name;
                  break;
                }
              }
            });
            this.chooseHouseList = res.content;
            this.pageObj1.total = res.totalElements;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //重置查询条件
    reset() {
      for (var i in this.form) {
        this.form[i] = "";
      }
    },
    handleSizeChange1(val) {
      // 弹框列表分页条数变化获取数据
      this.pageObj1.pageSize = val;
      this.query();
    },
    handleCurrentChange1(val) {
      let Current = "Current";
      // 弹框列表当前页变化获取数据
      this.pageObj1.currentPage4 = val;
      this.query(Current);
    },
    //选择配套设施弹框里的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //确定配套设施
    savePreHouse() {
      if (this.multipleSelection.length === 0) {
        this.open("请先勾选配套设施");
        return;
      } else {
        let data = [];
        this.multipleSelection.forEach(item => {
          data.push(item.guid);
        });
        let params = {
          reportGuid: this.$parent.params.projectGuid,
          districtGuid: this.$parent.params.districtGuid,
          isSelectAll: false
        };
        http
          .setFacility(params, data)
          .then(res => {
            if (res) {
              this.prehousingFormVisible = false;
              this.getPreHousList();
              //刷新
              this.Event.$emit("ApplyChangeSave", { msg: "ChangeSave" });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //全选
    allSelection() {
      this.$confirm("确认添加全部配套设施?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = [];
          let params = {
            reportGuid: this.$parent.params.projectGuid,
            districtGuid: this.$parent.params.districtGuid,
            isSelectAll: true
          };
          http
            .setFacility(params, data)
            .then(res => {
              if (res) {
                this.prehousingFormVisible = false;
                this.getPreHousList();
                //刷新
                this.Event.$emit("ApplyChangeSave", { msg: "ChangeSave" });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消移除"
          });
        });
    }
  },
  created() {
    this.getDict();
  }
};
</script>
<style lang="scss" scoped>
.housingDevice {
  .el-pagination {
    float: right;
    margin-top: 20px;
    text-align: right;
  }
  //总样式增加禁用文字居中，此处单独修改
  /deep/ .quarterMessage_box .el-input.is-disabled .el-input__inner {
    text-align: left;
  }
}
</style>
