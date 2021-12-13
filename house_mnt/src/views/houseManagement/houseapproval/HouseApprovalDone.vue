<!--
 * @Author:
 * @Date: 2019-12-04
 * @LastEditors: 金雅蓓
 * @Description: 优化代码,去掉以前残余页签代码
 * @model:入库审批已办箱优化
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
              class="float"
              size="mini"
              @click="query(1)"
              v-if="hasPerm('fygl_rksp_cx')"
            >查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
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
            <el-button
              type="primary"
              size="mini"
              @click="goDetail(scope.row)"
              v-if="hasPerm('fygl_rksp_ck')"
            >查看</el-button>
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
  </div>
</template>

<script>
import { houseApproval } from "@/api/paths.js";
import api from "@/api/houseApproval";
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
      accountableUnit: [] //上报单位
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
    //查询所有
    query(index) {
      if (index) {
        this.currentPage = index;
      }
      this.tableData = [];
      let _params = {};
      _params = {
        state: 1,
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
          console.log(res);
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
    //双击或点击查看进入详情页的触发的事件
    goDetail(val) {
      this.openCoach(val);
      let state = "done"; //待办状态
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
    }
  },
  mounted() {
    this.query();
  }
};
</script>

<style lang="scss">
</style>

