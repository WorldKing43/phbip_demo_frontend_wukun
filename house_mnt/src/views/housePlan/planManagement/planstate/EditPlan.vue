<!--
 * @Author: 
 * @Date: 2019-12-03 
 * @LastEditors: 金雅蓓
 * @Description: 优化代码
 * @model:计划制定代码已办箱
 -->
<template>
  <div class="editPlan">
    <div class="planmanage-section">
      <el-form
        :model="form"
        class="form-inline"
        size="mini"
        label-width="6rem"
        label-position="left"
      >
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="房源计划号">
              <el-input v-model="form.code" clearable @change="search(1)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="计划属性">
              <el-select
                v-model="form.propertyCode"
                clearable
                placeholder="--请选择--"
                style="width:100%"
                @change="search(1)"
              >
                <el-option
                  v-for="(item,index) in propertyData"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="计划状态">
              <el-select
                v-model="form.activityName"
                clearable
                placeholder="--请选择--"
                style="width:100%"
                @change="search(1)"
              >
                <el-option
                  v-for="(item,index) in stateData"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="分配批次">
              <el-input v-model="form.batchCodeName" clearable @change="search(1)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item style="float:left" label-width="0">
              <el-button type="primary" @click="search(1)" v-if="hasPerm('fyjh_jhzd_cx')">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="tableBox">
      <el-table
        :data="tableData"
        border
        @cell-dblclick="goDetail"
        size="mini"
        style="width: 100%"
        :header-cell-style="globalHeaderStyle"
        :cell-style="globalCellStyle"
      >
        <el-table-column type="index" :index="indexMethod" label="序号" width="60"></el-table-column>
        <el-table-column prop="code" label="房源计划号" width="220"></el-table-column>
        <el-table-column prop="propertyName" label="计划属性" width="180"></el-table-column>
        <el-table-column prop="description" label="计划说明"></el-table-column>
        <el-table-column prop="batchName" label="分配批次" width="180"></el-table-column>
        <el-table-column prop="activityName" label="计划状态" width="100"></el-table-column>
        <el-table-column prop="creator" label="编制人"></el-table-column>
        <el-table-column prop="auditor" label="审批人"></el-table-column>
        <el-table-column prop="finalAuditor" label="批准人"></el-table-column>
        <el-table-column prop="compileDate" label="编制时间">
          <template slot-scope="scope">{{scope.row.compileDate|dateFormat}}</template>
        </el-table-column>
        <el-table-column prop="belongToName" label="计划归属"></el-table-column>
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
          :total="totalDataNumber"
          background
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import TableComponent from "../components/TableComponent";
import http from "../newplan/serve.js";
export default {
  name: "allplan",
  components: {
    TableComponent
  },
  data() {
    return {
      all: "",
      editNum: "",
      firstrialNum: "",
      reviewedNum: "",
      waitGiveNum: "",
      givedNum: "",
      //表单数据
      formInline: {},
      propertyData: [],
      stateData: [],
      //分页需要的数据
      currentPage: 1,
      pageSize: 20,
      pageSizesList: [20, 50, 100, 200],
      totalDataNumber: 0, //数据的总数
      tableData: [],
      form: {
        //查询条件
        code: "",
        propertyCode: "",
        activityName: "",
        batchCodeName: ""
      }
    };
  },
  computed: {
    openTab() {
      return this.$store.state.openTab;
    }
  },
  methods: {
    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //得到数据字典
    getMoreList() {
      let arr;
      arr = ["计划用途", "房源计划阶段"];
      let params = {
        names: arr.toString()
      };
      http
        .getFiledList(params)
        .then(res => {
          let arr = [];
          this.stateData = JSON.parse(res).房源计划阶段;
          let list = JSON.parse(res).计划用途;
          for (let i = 0; i < list.length; i++) {
            list[i].children.forEach(element => {
              arr.push(element);
            });
          }
          this.propertyData = arr;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //分页查询房源计划
    search(index) {
      if (index) {
        this.currentPage = index;
      }
      let params = {
        code: this.form.code,
        propertyCode: this.form.propertyCode,
        activityName: this.form.activityName,
        batchCodeName: this.form.batchCodeName,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      http
        .getPlanListDone(params)
        .then(res => {
          this.tableData = res.content;
          this.totalDataNumber = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //双击前往详情页，根据path去判断是否为打开的页签。
    goDetail(val) {
      let tab = {
        route: "/newplan/" + val.guid + "/" + val.PID + "/" + "done",
        name: val.code,
        type: "single",
        query: { activityName: val.activityName }
      };
      this.openTopTab(tab);
    },
    //分页大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.search(1);
    },
    // 页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    }
  },
  mounted() {
    this.getMoreList(); //得到数据字典
    this.search(); //已办箱查询
  }
};
</script>
<style lang="scss" scoped>
.allplan {
  .planmanage-section {
    background: #fff;
    margin-top: 20px;
    & /deep/ .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
      margin-bottom: 0;
    }
  }
  .planmanage-conten {
    background: #fff;
    .plan-table {
      margin-top: 15px;
    }
  }
  .tableBox {
    margin-top: 20px;
  }
}
</style>

