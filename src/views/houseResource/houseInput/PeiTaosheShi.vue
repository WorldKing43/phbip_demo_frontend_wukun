<!--
 * @Description:录入配套设施信息
 * @Version: 1.0
 * @Autor: zhaoyy1
 * @Date: 2019-09-10 17:33:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-23 09:53:14
 -->
 
<template>
  <!-- 房源入库申请模块 -->
  <div class="warehousingapplication">
    <div>
      <!-- 搜索框开始 -->
      <div class="search_box">
        <el-form size="mini" labelPosition="left">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="栋名称" label-width="4rem">
                <el-input v-model="form.buildingName" placeholder="请输入内容" clearable @keyup.enter.native="getFacility">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="上报部门" label-width="5rem">
                <el-input v-model="form.reportUnit" placeholder="请输入内容" clearable @keyup.enter.native="getFacility">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="配套设施类型" label-width="7rem">
                <el-select v-model="form.facilityType" clearable @keyup.enter.native="getFacility">
                  <el-option v-for="(item,index) in device" :key="index" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="设施来源" label-width="5rem">
                <el-select v-model="form.facilityOrigin" clearable @keyup.enter.native="getFacility">
                  <el-option v-for="(item,index) in deviceSource" :key="index" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div style="float: right">
              <el-button type="primary" size="mini" @click="getFacility">查询</el-button>
              <el-button type="primary" size="mini" @click="reset">重置</el-button>
            </div>
          </el-row>
        </el-form>
      </div>
      <!-- 搜索框结束 -->
      <div>
        <el-button type="primary" size="mini" @click="add" :disabled="ban">新增</el-button>
        <el-button type="danger" size="mini" @click="deleteBox" :disabled="ban">删除</el-button>
      </div>
      <div class="quarterMessage_box" style="margin-top:30px">
        <template>
          <el-table ref="multipleTable" :data="warehousingApplyList" tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange" border @row-dblclick="doubleClick" :header-cell-style="{
						'background': '#E6F0FC',
						'color': '#606266',
						'text-align':'center',
						'border-color': '#DBDBDB',
						}" :cell-style="{
						'text-align':'center',
						'border-color': '#DBDBDB',
						}">
            <el-table-column type="selection" :selectable="isDisabled"></el-table-column>
            <el-table-column label="序号" type="index" width="60" :index="indexMethod"></el-table-column>
            <el-table-column prop="buildingName" label="栋名称"></el-table-column>
            <el-table-column prop="reportDept" label="上报部门"></el-table-column>
            <el-table-column prop="facilityType" label="配套设施类型"></el-table-column>
            <el-table-column prop="facilityCount" label="配套设施数量"></el-table-column>
            <el-table-column prop="facilityNo" label="设施编号"></el-table-column>
            <el-table-column prop="assortFacilityName" label="设施名称"></el-table-column>
            <el-table-column prop="facilityOrigin" label="设施来源" width="100">
            </el-table-column>
            <el-table-column prop="rentalUnit" label="租售单位" width="100">
            </el-table-column>
          </el-table>
        </template>
        <template>
          <div class="block page_box">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="pageObj.currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="pageObj.pageSize"
              layout="total, sizes, prev, pager, next, jumper" :total="pageObj.total"></el-pagination>
          </div>
        </template>
      </div>
    </div>
    <el-dialog title="删除配套设施" :visible.sync="dialogFormVgetisible1" width="30%" id="delete_box"
      :close-on-click-modal="false">
      <el-form :model="form">
        <p>确定删除所选配套设施及其详情吗？</p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVgetisible1 = false" size="mini">取 消</el-button>
        <el-button @click="deteleTung" size="mini" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import http from "@/api/common(bj).js";
import { mapMutations } from "vuex";
export default {
  name: "peiTaosheShi",
  data() {
    return {
      multipleSelection: [],
      dialogFormVgetisible1: false,
      warehousingApplyList: [], //入库申请列表
      pageObj: {
        currentPage4: 1,
        pageSize: 10,
        total: 0
      },
      form: {
        belong: "", //批次号
        buildingName: "", //报批主题
        facilityOrigin: "", //责任单位
        facilityType: "", //上报单位
        rentalUnit: "",
        reportUnit: ""
      },
      deviceSource: [],
      device: [],
      ban: false
    };
  },
  methods: {
    //序号
    indexMethod(index) {
      return (
        index + (this.pageObj.currentPage4 - 1) * this.pageObj.pageSize + 1
      );
    },
    reset() {
      //重置搜素条件
      for (var i in this.form) {
        this.form[i] = "";
      }
    },
    // 获取数据字典
    async getDict() {
      try {
        let dictionaryName = ["设施来源", "配套设施类型"];
        let params = { names: dictionaryName.toString() };
        let res = await http.getDictionary(params);
        let resp = JSON.parse(res);
        this.deviceSource = resp.设施来源;
        this.device = resp.配套设施类型;
      } catch (err) {
        console.log(err);
      }
    },
    // 删除按钮
    deleteBox() {
      if (this.multipleSelection.length === 0) {
        this.open("请先选择配套设施");
        return;
      }
      this.dialogFormVgetisible1 = true;
    },
    // 确定删除
    deteleTung() {
      let arr = [];
      this.multipleSelection.map(item => {
        arr.push(item.guid);
      });
      arr = arr.toString()
      let params = {assortFacilityGuids:arr}
      http
        .deleteDevice(params)
        .then(res => {
          if (res) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.dialogFormVgetisible1 = false;
            this.getFacility();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.pageObj.pageSize = val;
      this.getFacility();
    },
    handleCurrentChange(val) {
      let Current = "Current";
      this.pageObj.currentPage4 = val;
      this.getFacility(Current);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //提示框
    open(title) {
      this.$message(title);
    },
    //双击查看配套设施详情
    doubleClick(val) {
      this.$parent.params.assortFacilityGuid = val.guid;
      let state;
      if (
        (!val.createSelf && val.createSelf != null) ||
        this.$parent.params.edit === "2"
      ) {
        state = "0";
      } else {
        state = "1";
      }
      this.$parent.openTab({
        id: val.guid,
        label: val.buildingName,
        closable: true,
        meta: {
          state: state, //1可编辑 0 查看 2新增
          menuId: "peiTaosheShi"
        },
        component: () =>
          import("@/views/houseResource/houseInput/FacilitiesEdit")
      });
    },
    //删除入库申请批次
    deleteApply(index, row) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //按条件导出入库申请
    exportApply() {
      var that = this;
      let params = that.form;
      http
        .exportApply(params)
        .then(res => {
          if (res.status == "success") {
            that.open("导出成功！");
          } else {
            that.open("导出失败！");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 新增配套设施
    add() {
      //判断是否保存小区
      if (this.$parent.params.projectGuid == "newguid") {
        this.$alert("请先创建小区！", "提示");
        return;
      }
      //打开新的tab页
      this.$parent.openTab({
        id: "facilitiesEdit",
        label: "新增配套设施",
        closable: true,
        meta: {
          state: "2", //1可编辑 0 查看 2新增
          menuId: "peiTaosheShi"
        },
        component: () =>
          import("@/views/houseResource/houseInput/FacilitiesEdit")
      });
    },
    // 查询配套设施
    getFacility(val) {
      //分页查询参数，分页归至为1
      if (val != "Current") {
        this.pageObj.currentPage4 = 1;
      }
      let params = {
        belong: this.form.belong,
        buildingName: this.form.buildingName,
        districtGuid: this.$parent.params.projectGuid,
        facilityOrigin: this.form.facilityOrigin,
        facilityType: this.form.facilityType,
        pageIndex: this.pageObj.currentPage4,
        pageSize: this.pageObj.pageSize,
        rentalUnit: this.form.rentalUnit,
        reportDept: this.form.reportUnit
      };
      if (this.$parent.params.source == "原有小区入库") {
        params = {
          belong: this.form.belong,
          buildingName: this.form.buildingName,
          districtGuid: this.$parent.params.projectGuid,
          facilityOrigin: this.form.facilityOrigin,
          facilityType: this.form.facilityType,
          pageIndex: this.pageObj.currentPage4,
          pageSize: this.pageObj.pageSize,
          rentalUnit: this.form.rentalUnit,
          reportDept: this.form.reportUnit,
          configName: "原有小区入库"
        };
      } else {
        params = {
          belong: this.form.belong,
          buildingName: this.form.buildingName,
          districtGuid: this.$parent.params.projectGuid,
          facilityOrigin: this.form.facilityOrigin,
          facilityType: this.form.facilityType,
          pageIndex: this.pageObj.currentPage4,
          pageSize: this.pageObj.pageSize,
          rentalUnit: this.form.rentalUnit,
          reportDept: this.form.reportUnit
        };
      }
      http
        .checkFacility(params)
        .then(res => {
          this.warehousingApplyList = res.content;
          this.pageObj.total = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    isDisabled(row) {
      if (row.createSelf === false) {
        return false;
      }
      return true;
    },
    onLoad() {
      //判断是否栋信息进行修改
      this.Event.$on("facilitiesEdit", data => {
        if (data.msg == "refresh") {
          this.getFacility();
        }
      });
    }
  },
  created() {
    this.onLoad();
    this.getDict();
    this.getFacility();
    if (this.$parent.params.edit === "2") {
      this.ban = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.warehousingapplication {
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
