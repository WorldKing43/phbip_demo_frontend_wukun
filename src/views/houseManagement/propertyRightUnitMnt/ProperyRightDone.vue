<template>
  <div>
    <el-form :model="form" size="mini" label-position="right">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="单位名称" label-width="5rem">
            <el-input v-model="serachMap.dwmc" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="统一社会信用代码" label-width="8rem">
            <el-input v-model="serachMap.tyshxydm" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请时间" label-width="5rem">
            <el-date-picker type="date" v-model="serachMap.sqsjq" style="width: 45%" clearable></el-date-picker>至
            <el-date-picker type="date" v-model="serachMap.sqsjz" style="width: 45%" clearable></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini" @click="getPropertyRightList">查询</el-button>
          <el-button size="mini" @click="reset()">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="tableData"
      border
      :header-cell-style="globalHeaderStyle"
      :cell-style="globalCellStyle"
    >
      <el-table-column type="index" label="序号" :index="indexMethod" width="50"></el-table-column>
      <el-table-column label="案件类别" prop="xmmc"></el-table-column>
      <el-table-column label="单位名称" prop="dwmc"></el-table-column>
      <el-table-column label="统一社会信用代码" prop="tyshxydm"></el-table-column>
      <el-table-column label="经办人" prop="jbr"></el-table-column>
      <el-table-column label="申请时间" prop="sqsj"></el-table-column>
      <el-table-column label="申请状态" prop="STATE"></el-table-column>
      <el-table-column label="操作" prop="name">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handle(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizesList"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      align="right"
      background
    ></el-pagination>
  </div>
</template>
<script>
import http from "@/api/propertyRightChange.js";
import api from "@/api/houseApproval";
export default {
  name: "property-right-todo",
  data() {
    return {
      form: {
        name: ""
      },
      tableData: [],
      //分页数据
      total: 0, //数据总条数
      pageSize: 20, //当前页条数
      currentPage: 1, //当前页
      pageSizesList: [20, 50, 100, 200], //分页下拉框
      openFirDialog: false, //提取单位信息弹框
      unitForm: {
        code: "" //统一社会信用代码
      },
      newForm: {
        code: "", //统一社会信息代码
        unitName: "" //单位名称
      },
      openSecDialog: false, //提示弹框
      serachMap: {}
    };
  },
  methods: {
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //办理
    handle(val) {
      //路由里可以加个guid
      let state = "done"; //办理状态
      let tab = {
        route: "/propertyRightMntTab" + "/" + state, //产权单位guid
        name: "产权单位基本信息",
        type: "single",
        query: {
          //另外想传的参数放这里
          tyshxydm: val.tyshxydm,
          type: "pre",
          taskId: val.TID,
          guid: val.guid,
          activityName: val.ACTIVITYNAME
        }
      };
      this.openTopTab(tab);
    },

    //当前页条数改变时
    handleSizeChange(val) {
      this.pageSize = val;
      this.search();
    },
    //当前页跳转时
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    },
    getPropertyRightList() {
      let date = this.serachMap;
      this.form.pageIndex = this.currentPage;
      this.form.pageSize = this.pageSize;
      this.form.state = 1;
      let params = this.form;
      http
        .getPropertyRightList(params, date)
        .then(res => {
          this.tableData = res.content;
          this.total = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //重置
    reset() {
      this.form = {
        dwmc: "",
        tyshxydm: "",
        sqsjq: "",
        sqsjz: "" 
      }
    }
  },
  mounted() {
    this.getPropertyRightList();
    //已办箱刷新广播接收事件
    this.Event.$on("ProperyRightDone", data => {
      if (data == "getPropertyRightList") this.getPropertyRightList();
    });
  }
};
</script>