<!--
 * @Description: 房源
 * @Version: 2.0
 * @Autor: wangyue
 * @Date: 2019-11-29 19:05:37
 * @LastEditors: wangyue
 * @LastEditTime: 2020-03-31 10:08:53
 -->

<template>
  <div class="prehousing">
    <div style="margin-top:15px">
      <el-button type="primary" size="mini" @click="chooseDistrict" :disabled="isBan">选择房源</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="deteleSelection"
        :disabled="isBan"
        title="移除当前页选择的预房源"
      >移除选择</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="deteleAllSelection"
        :disabled="isBan"
        title="移除所有的预房源"
      >移除所有</el-button>
    </div>
    <div
      class="quarterMessage_box"
      style="margin-top:15px;"
      v-loading="houseListLoading"
      element-loading-text="数据加载中"
    >
      <template>
        <el-table
          size="mini"
          :data="preHousList"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange2"
          @row-dblclick="doubleClick"
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
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="序号" type="index" :index="indexMethod" width="70"></el-table-column>
          <el-table-column prop="districtName" label="小区名称"></el-table-column>
          <el-table-column prop="buildName" label="栋名称"></el-table-column>
          <el-table-column prop="houseNo" label="房号"></el-table-column>
          <el-table-column prop="source" label="房产来源" show-overflow-tooltip></el-table-column>
          <el-table-column prop="houseLayout" label="户型" show-overflow-tooltip></el-table-column>
          <el-table-column prop="orientation" label="朝向" show-overflow-tooltip></el-table-column>
          <el-table-column prop="coveredArea" label="建筑面积"></el-table-column>
          <el-table-column prop="function" label="房屋用途"></el-table-column>
          <el-table-column prop="startNature" label="初始房源性质" show-overflow-tooltip></el-table-column>
          <el-table-column prop label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deteleYuHousing(scope.$index, scope.row)"
                :disabled="isBan"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template>
        <div class="block page_box">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageObj.currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="pageObj.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageObj.total"
          ></el-pagination>
        </div>
      </template>
    </div>
    <el-dialog
      title="选择房源"
      :visible.sync="prehousingFormVisible"
      width="60%"
      class="box"
      :close-on-click-modal="false"
    >
      <div>
        <div class="content_left" style="width:100%">
          <div class="search_box">
            <el-form size="mini" :model="form" label-width="3rem" labelPosition="left">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="栋名称" label-width="4rem">
                    <el-input v-model="form.buildingName" clearable @keyup.enter.native="search"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="房号">
                    <el-input v-model="form.houseNo" clearable @keyup.enter.native="search"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="户型">
                    <el-select
                      v-model="form.typeName"
                      placeholder
                      clearable
                      @keyup.enter.native="search"
                    >
                      <el-option
                        v-for="(item , index) in options.apartment"
                        :key="index"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="建筑面积" label-width="5rem">
                    <el-row :gutter="0">
                      <el-col :span="11">
                        <el-input
                          v-model="form.coveredAreaMin"
                          clearable
                          @keyup.enter.native="search"
                        ></el-input>
                      </el-col>
                      <el-col class="line" :span="2" style="text-align:center;">至</el-col>
                      <el-col :span="11">
                        <el-input
                          v-model="form.coveredAreaMax"
                          clearable
                          @keyup.enter.native="search"
                        ></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="初始房源性质" label-width="7rem">
                    <el-select
                      v-model="form.startNature"
                      placeholder
                      clearable
                      @keyup.enter.native="search"
                    >
                      <el-option
                        v-for="(item , index) in propertyNatureList"
                        :key="index"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5" style="float: right;">
                  <el-button type="primary" size="mini" @click="search">查询</el-button>
                  <el-button type="primary" size="mini" @click="reset">重置</el-button>
                </el-col>
              </el-row>
              <el-row></el-row>
            </el-form>
          </div>
          <div style="margin-bottom:5px">
            <div class="annotation">说明：原则上一个批次只允许上报一种性质的房源！</div>
            <el-button
              type="primary"
              size="mini"
              @click="allSelection"
              :disabled="isBan||chooseHouseList.length==0"
              title="添加所有的预房源"
            >添加所有</el-button>
          </div>
          <div class="quarterMessage_box" v-loading="Loading" element-loading-text="数据加载中">
            <template>
              <el-table
                :data="chooseHouseList"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange"
                ref="table"
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
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="buildName" label="栋名称"></el-table-column>
                <el-table-column prop="houseNo" label="房号"></el-table-column>
                <el-table-column prop="houseLayout" label="户型"></el-table-column>
                <el-table-column prop="coveredArea" label="建筑面积"></el-table-column>
                <el-table-column prop="startNature" label="初始房源性质" show-overflow-tooltip></el-table-column>
              </el-table>
            </template>
            <p style="float:left;margin-top:10px">已选中{{multipleSelection.length}}套</p>
            <template>
              <div class="block page_box" style="float:right;margin-top:5px">
                <el-pagination
                  background
                  @size-change="handleSizeChange1"
                  @current-change="handleCurrentChange1"
                  :current-page="pageObj1.currentPage4"
                  :page-sizes="[50, 100, 300, 500]"
                  :page-size="pageObj1.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="pageObj1.total"
                ></el-pagination>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer footer">
        <el-button size="mini" @click="prehousingFormVisible = false">取消</el-button>
        <el-button type="primary" @click="savePreHouse" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import http from "@/api/common(bj).js";
import { mapMutations } from "vuex";
export default {
  name: "prehousing",
  data() {
    return {
      multipleSelection2: [], //要提交房源的数组
      pageObj: {
        currentPage4: 1,
        pageSize: 100,
        total: 0
      },
      pageObj1: {
        currentPage4: 1,
        pageSize: 50,
        total: 0
      },
      preHousList: [], //获取预房源列表
      prehousingFormVisible: false,
      form: {
        typeName: "", //户型
        buildName: "", //栋名称
        houseNo: "", //房号
        coveredAreaMin: "", //最小面积
        coveredAreaMax: "", //最大面积
        startNature: "" //初始房源性质
      },
      options: {
        apartment: []
      },
      propertyNatureList: [], //房屋性质
      isBan: false, //判断是否是提交过的
      multipleSelection: [],
      chooseHouseList: [], //可选房源列表
      houseListLoading: false,
      Loading: false
    };
  },
  methods: {
    //提示框
    open(title) {
      this.$message(title);
    },
    //序号
    indexMethod(row) {
      return row + (this.pageObj.currentPage4 - 1) * this.pageObj.pageSize + 1;
    },
    //=========================================
    getDict() {
      //如果是提交过的，禁止再次操作
      if (
        this.$parent.params.edit == "已申请" ||
        this.$parent.params.projectGuid == "newguid" ||
        this.$parent.params.edit == "申请通过"
      ) {
        this.isBan = true;
      }
      let dictionaryName = ["户型", "房屋性质"];
      let params = { names: dictionaryName.toString() };
      http
        .getDictionary(params)
        .then(res => {
          let resp = JSON.parse(res);
          this.options.apartment = resp.户型;
          this.propertyNatureList = this.$dictionaryChange(
            resp.房屋性质,
            this.propertyNatureList,
            "通用"
          );
          this.getPreHousList(); //首次查询
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取某个小区下的预房源列表
    async getPreHousList() {
      this.houseListLoading = true;
      try {
        let params = {
          reportGuid: this.$parent.params.projectGuid,
          pageIndex: this.pageObj.currentPage4,
          pageSize: this.pageObj.pageSize
        };
        let data = {};
        let res = await http.getChoosePreHouseList(params, data);
        if (res) {
          this.houseListLoading = false;
        }
        this.preHousList = res.content;
        this.pageObj.total = res.totalElements;
      } catch (err) {
        console.log(err);
      }
    },
    handleSizeChange(val) {
      this.pageObj.pageSize = val;
      this.getPreHousList();
      this.multipleSelection2 = [];
    },
    handleCurrentChange(val) {
      this.pageObj.currentPage4 = val;
      this.getPreHousList();
      this.multipleSelection2 = [];
    },
    //要提交房源的多选操作
    handleSelectionChange2(val) {
      var that = this;
      this.multipleSelection2 = val;
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
            .deteleYuHousing(params, data)
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
    //移除所有
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
            .deteleYuHousing(params, data)
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
    //移除选择
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
            .deteleYuHousing(params, data)
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
    //双击查看房屋详情
    doubleClick(row) {
      console.log(row);
      this.$parent.openTab({
        id: row.guid,
        label: row.houseNo || "房源详情",
        closable: true,
        meta: {
          state: "0", //1可编辑 0 查看 2新增
          menuId: "2",
          districtGuid: row.districtGuid,
          houseGuid: row.guid,
          reportGuid: row.reportGuid,
          itemName: row.itemName
        },
        component: () =>
          import("@/views/houseResource/houseApply/GetHouseInfoDetail.vue")
      });
    },
    //========弹框操作========选择房源============
    //打开选择房源
    chooseDistrict() {
      this.prehousingFormVisible = true;
      if (this.$parent.params.districtGuid != null) {
        let params = {
          buildName: this.form.buildingName,
          coveredAreaMax: this.form.coveredAreaMax,
          coveredAreaMin: this.form.coveredAreaMin,
          districtGuid: this.$parent.params.districtGuid,
          houseNo: this.form.houseNO,
          pageIndex: this.pageObj1.currentPage4,
          pageSize: this.pageObj1.pageSize,
          typeName: this.form.typeName,
          reportGuid: this.$parent.params.projectGuid,
          itemName: this.$parent.params.itemName
        };
        this.Loading = true;
        http
          .getPreHousList(params)
          .then(res => {
            if (res) {
              this.Loading = false;
              this.chooseHouseList = res.content;
              this.pageObj1.total = res.totalElements;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 重置查询条件
    reset() {
      for (var i in this.form) {
        this.form[i] = "";
      }
    },
    //查询选择房源
    search(val) {
      //分页查询参数，分页归至为1
      if (val != "Current") {
        this.pageObj1.currentPage4 = 1;
      }
      this.Loading = true;
      var guid = this.$parent.params.projectGuid;
      let params = {
        buildName: this.form.buildingName,
        coveredAreaMax: this.form.coveredAreaMax,
        coveredAreaMin: this.form.coveredAreaMin,
        districtGuid: this.$parent.params.districtGuid,
        houseNO: this.form.houseNo,
        pageIndex: this.pageObj1.currentPage4,
        pageSize: this.pageObj1.pageSize,
        typeName: this.form.typeName,
        reportGuid: this.$parent.params.projectGuid,
        startNature: this.form.startNature,
        itemName: this.$parent.params.itemName
      };
      http
        .getPreHousList(params)
        .then(res => {
          if (res) {
            this.Loading = false;
            this.chooseHouseList = res.content;
            this.pageObj1.total = res.totalElements;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange1(val) {
      this.pageObj1.pageSize = val;
      this.search();
    },
    handleCurrentChange1(val) {
      let Current = "Current";
      this.pageObj1.currentPage4 = val;
      this.search(Current);
    },
    //默认多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //全选所有
    allSelection() {
      this.$confirm("确认添加全部房源?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = [];
          this.multipleSelection.forEach(item => {
            data.push(item.guid);
          });
          let params = {
            reportGuid: this.$parent.params.projectGuid,
            districtGuid: this.$parent.params.districtGuid,
            isSelectAll: true
          };
          http
            .set(params, data)
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
    },
    //点击确定选择预房源
    savePreHouse() {
      if (this.multipleSelection.length == 0) {
        this.open("请先勾选预房源");
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
          .set(params, data)
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
    }
  },
  created() {
    this.getDict();
  }
};
</script>
<style lang="scss" scope>
.prehousing {
  .el-pagination {
    float: right;
    margin-top: 20px;
    text-align: right;
  }
  .annotation {
    color: red;
    font-size: 16px;
  }
  //总样式增加禁用文字居中，此处单独修改
  /deep/ .quarterMessage_box .el-input.is-disabled .el-input__inner {
    text-align: left;
  }
}
</style>
