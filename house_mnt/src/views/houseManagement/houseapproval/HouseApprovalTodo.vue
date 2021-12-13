<!--
 * @Author:
 * @Date: 2019-12-04
 * @LastEditors: 金雅蓓
 * @Description: 优化代码,去掉以前残余页签代码
 * @model:入库审批代办箱优化
 -->
<template>
  <div class="houseapproval">
    <div class="top">
      <el-form ref="form" :model="form" size="mini">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="批次号" label-width="4rem">
              <el-input v-model="form.code" clearable @change="query(1)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报批主题" label-width="5rem">
              <el-input v-model="form.subject" clearable @change="query(1)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="上报单位" label-width="5rem">
              <el-input v-model="form.reportUnit" clearable @change="query(1)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button
              type="primary"
              size="mini"
              @click="query(1)"
              v-if="hasPerm('fygl_rksp_cx')"
            >查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row class="toolbar">
      <el-button
        type="primary"
        size="mini"
        @click="pickUpEvent()"
        v-if="hasPerm('fygl_rksp_sl')"
      >受 理</el-button>
    </el-row>
    <!--结果列表-->
    <div class="table-list">
      <el-table
        :data="tableData"
        border
        size="mini"
        @cell-dblclick="goDetail"
        :header-cell-style="globalHeaderStyle"
        :cell-style="globalCellStyle"
      >
        <el-table-column type="index" label="序号" width="60px" :index="indexMethod"></el-table-column>
        <el-table-column prop="code" label="批次号"></el-table-column>
        <el-table-column prop="subject" label="报批主题"></el-table-column>
        <el-table-column prop="accordance" label="报批依据"></el-table-column>
        <el-table-column prop="accountableUnit" label="上报责任单位"></el-table-column>
        <el-table-column prop="houseCount" label="房源数量"></el-table-column>
        <el-table-column prop="reportUnit" label="上报单位"></el-table-column>
        <el-table-column label="上报时间">
          <template slot-scope="scope">{{scope.row.reportDate|dateFormat}}</template>
        </el-table-column>
        <el-table-column prop="ACTIVITYNAME" label="办理环节" width="160"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="goDetail(scope.row)">办理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="page_box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizesList"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </div>
    <!-- 接件弹框 -->
    <el-dialog title="受理" :visible.sync="pickUpDialog" width="70%" :close-on-click-modal="false">
      <el-form size="mini" label-position="right" v-model="pickUpForm">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="报批主题" label-width="5rem">
              <el-input v-model="pickUpForm.subject" clearable @change="pickUpEvent(1)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上报单位" label-width="5rem">
              <el-input v-model="pickUpForm.accountableUnit" clearable @change="pickUpEvent(1)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" size="mini" @click="pickUpEvent(1)">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class="table-list">
        <el-table
          :data="pickUpTabData"
          border
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column prop="code" label="批次号"></el-table-column>
          <el-table-column prop="subject" label="报批主题"></el-table-column>
          <el-table-column prop="accordance" label="报批依据"></el-table-column>
          <el-table-column prop="accountableUnit" label="上报责任单位"></el-table-column>
          <el-table-column prop="houseCount" label="房源数量"></el-table-column>
          <el-table-column prop="reportUnit" label="上报单位"></el-table-column>
          <el-table-column label="上报时间">
            <template slot-scope="scope">{{scope.row.reportDate|dateFormat}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="toPickUp(scope.row)">受理</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div class="page_box">
        <el-pagination
          @size-change="pickUpSizeChange"
          @current-change="pickUpCurrentChange"
          :current-page="pickUpCurrentPage"
          :page-sizes="pickUpSizesList"
          :page-size="pickUpPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNumber"
          background
          class="pagination"
        ></el-pagination>
      </div>
      <div style="text-align:center">
        <el-button size="mini" @click="cancelPickUp()">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { houseApproval } from "@/api/paths.js";
import api from "@/api/houseApproval";
import http from "@/api/publicMethod";
import { mapGetters } from "vuex";
export default {
  name: "houseapproval",
  data() {
    return {
      form: {
        code: "",
        subject: "",
        reportUnit: ""
      },
      //分页信息
      total: 0,
      pageSize: 20,
      currentPage: 1,
      pageSizesList: [20, 50, 100, 200],
      //表格假数据
      tableData: [],
      state: [],
      reportUnit: [], //上报责任单位
      accountableUnit: [], //上报单位
      pickUpDialog: false, //接件弹框显隐
      pickUpForm: {
        //接件弹框查询表单
        subject: "",
        accountableUnit: ""
      },
      pickUpTabData: [], //接件弹框表格数据
      //接件弹框分页信息
      totalNumber: 0,
      pickUpPageSize: 20,
      pickUpCurrentPage: 1,
      pickUpSizesList: [20, 50, 100, 200]
    };
  },
  methods: {
    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //查询下拉菜单
    getListPrepare() {
      let _params = { content: "入库审批状态" };
      api
        .getListReportPrepare(_params)
        .then(res => {
          this.reportUnit = JSON.parse(res).reportUnit;
          this.state = JSON.parse(res).state;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击接件按钮
    pickUpEvent(index) {
      this.pickUpDialog = true;
      if (index) {
        this.pickUpCurrentPage = index;
      }
      let params = {
        pageIndex: this.pickUpCurrentPage,
        pageSize: this.pickUpPageSize
      };
      let data = {
        subject: this.pickUpForm.subject,
        accountableUnit: this.pickUpForm.accountableUnit
      };
      api
        .getPickUpList(params, data)
        .then(res => {
          this.pickUpTabData = res.content;
          this.totalNumber = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //接件弹框-点击接件
    toPickUp(val) {
      console.log(val.GUID);
      let nowGuid = val.GUID;
      let params = {
        businessName: ""
      };
      if(val.report==1){
        params.businessName = "单位自有住房入库"
      }else{
        params.businessName = "房源入库审批(新)"
      }
      let data = [nowGuid];
      this.$startLoading();
      api
        .getPickUpData(params, data)
        .then(res => {
          this.$message({
            type: "success",
            message: "接件成功！"
          });
          this.query();
          this.pickUpDialog = false;
          //创建过程材料
          let businessName = "房源信息录入";
          let params = {
            businessName: businessName,
            guid: val.reportDistrictGuid
          };
          http
            .createMis(params)
            .then(res => {
              this.$endLoading()
            })
            .catch(err => {
              console.log(err);
              this.$endLoading()
            });
        })
        .catch(err => {
          console.log(err);
          this.$endLoading()
        });
    },
    //接件弹框-底部取消按钮
    cancelPickUp() {
      this.pickUpDialog = false;
    },
    //查询所有
    query(index) {
      if (index) {
        this.currentPage = index;
      }
      this.tableData = [];
      let _params = {};
      _params = {
        state: 0,
        code: this.form.code,
        subject: this.form.subject,
        reportUnit: this.form.reportUnit,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      let data = ["房源入库审批(新)","单位自有住房入库"]
      api
        .getListReport(_params,data)
        .then(res => {
          this.tableData = this.handleSpecialData(res.content);
          this.total = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //处理特殊数据。1、资产运维部初审—>资产运维初审。2、资产运维部复审—>资产运维复审。3、资产运维部终审—>资产运维终审。
    handleSpecialData(tableData) {
      tableData.forEach(item => {
        if(item.ACTIVITYNAME == '资产运维部初审' || item.ACTIVITYNAME == '资产运维部复审' || item.ACTIVITYNAME == '资产运维部终审') {
          item.ACTIVITYNAME = item.ACTIVITYNAME.replace('资产运维部', '资产运维');
        }
      });
      return tableData;
    },
    //后台打开表单--认领任务
    openCoach(val) {
      let params = {
        taskId: val.TID
      };
      api
        .openCoach(params)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 双击或点击办理进入详情页
    goDetail(val) {
      this.openCoach(val); //后台打开表单 认领任务
      let state = "todo"; //待办状态
      let tab = {
        route: "/approvalDetailsTab" + "/" + val.guid + "/" + state,
        name: val.code,
        type: "single",
        query: {
          guid: val.guid,
          pid: val.PID,
          tid: val.TID,
          itemName: val.itemName
        }
      };
      this.openTopTab(tab);
    },
    //待办箱改变页面显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.query(1);
    },
    //待办箱改变当前页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.query();
    },
    //弹框修改页面数据条数
    pickUpSizeChange(val) {
      this.pickUpPageSize = val;
      this.pickUpEvent(1);
    },
    //弹框修改当前页数
    pickUpCurrentChange(val) {
      this.pickUpCurrentPage = val;
      this.pickUpEvent();
    }
  },

  mounted() {
    this.query();
    this.Event.$on("query", data => {
      if (data == "HouseApproval") {
        this.query();
      }
    });
  }
};
</script>

<style lang="scss">
</style>
