<!-- 
 * @Author: 
 * @Date: 2019-12-03 
 * @LastEditors: 金雅蓓
 * @Description: 优化代码
 * @model:计划查询列表
-->
<template>
  <div id="planQuery" class="page-detail">
    <div class="content">
      <div class="contentColor">
        <div class="planmanage-section el_tabs__content">
          <el-form size="mini" label-width="6rem">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="房源计划号">
                  <el-input clearable v-model="form.code" @change="getTbaleList(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="计划属性">
                  <el-select
                    v-model="form.propertyCode"
                    clearable
                    placeholder="--请选择--"
                    style="width:100%;"
                    @change="getTbaleList(1)"
                  >
                    <el-option
                      v-for="(item, index) in propertyData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="计划状态">
                  <el-select
                    v-model="form.state"
                    clearable
                    placeholder="--请选择--"
                    style="width:100%;"
                    @change="getTbaleList(1)"
                  >
                    <el-option
                      v-for="(item, index) in stateData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="分配批次">
                  <el-input v-model="form.batchCodeName" clearable @change="getTbaleList(1)"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="编制时间">
                  <el-row :gutter="0">
                    <el-col :span="11">
                      <el-date-picker
                        type="date"
                        v-model="form.date1"
                        clearable
                        style="width:100%"
                        @change="getTbaleList(1)"
                      ></el-date-picker>
                    </el-col>
                    <el-col :span="2" style="text-align:center">
                      <span>-</span>
                    </el-col>
                    <el-col :span="11">
                      <el-date-picker
                        type="date"
                        v-model="form.date2"
                        clearable
                        style="width:100%"
                        @change="getTbaleList(1)"
                      ></el-date-picker>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="编制单位">
                  <el-input clearable v-model="form.belongTo" @change="getTbaleList(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button
                  type="primary"
                  size="mini"
                  @click="getTbaleList(1)"
                  v-if="hasPerm('fyjh_jhcx_jhxx_cx')"
                  style="margin-left:1.8rem"
                >查询</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="content">
          <el-table
            :data="tableData"
            border
            size="mini"
            @cell-dblclick="goDetail"
            style="width: 100%"
            :header-cell-style="globalHeaderStyle"
            :cell-style="globalCellStyle"
          >
            <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
            <el-table-column prop="code" label="房源计划号" width="110"></el-table-column>
            <el-table-column prop="propertyName" label="计划属性" width="180"></el-table-column>
            <el-table-column prop="description" label="计划说明"></el-table-column>
            <el-table-column prop="batchName" label="分配批次"></el-table-column>
            <el-table-column prop="activityName" label="计划状态" width="80"></el-table-column>
            <el-table-column prop="creator" label="编制人" width="80"></el-table-column>
            <el-table-column prop="auditor" label="审批人" width="80"></el-table-column>
            <el-table-column prop="finalAuditor" label="批准人" width="80"></el-table-column>
            <el-table-column prop="compileDate" :formatter="dateFormat" label="编制时间" width="80"></el-table-column>
            <el-table-column prop="belongToName" label="编制单位" width="140"></el-table-column>
          </el-table>
          <!-- 分页功能 -->
          <div class="page_box" style="background:white">
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
    </div>
  </div>
</template>

<script>
import http from "../planManagement/newplan/serve.js";
import { mapGetters } from "vuex";

export default {
  name: "planquery",
  components: {},
  data() {
    return {
      //分页需要的数据
      currentPage: 1,
      pageSize: 20,
      pageSizesList: [20, 50, 100, 200],
      totalDataNumber: 0, //数据的总数
      //计划查询查询模块的查询条件
      form: {
        code: "",
        propertyCode: "",
        state: "",
        batchCodeName: "",
        date1: "",
        date2: "",
        belongTo: ""
      },
      propertyData: [], //计划用途
      stateData: [], //房源计划
      tableData: [] //计划查询列表的数据
    };
  },
  methods: {
    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //数据字典
    getMoreList() {
      let arr;
      arr = ["计划用途", "房源计划阶段"];
      let params = {
        names: arr.toString()
      };
      http
        .getFiledList(params)
        .then(res => {
          res = JSON.parse(res);
          this.stateData = res.房源计划阶段;
          let propertyArr = [];
          let propertylist = res.计划用途;
          for (let i = 0; i < propertylist.length; i++) {
            propertylist[i].children.forEach(element => {
              propertyArr.push(element);
            });
          }
          this.propertyData = propertyArr;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //得到计划查询的列表页
    getTbaleList(index) {
      if (index) {
        this.currentPage = index;
      }
      if (this.form.date1) {
        this.form.date1 = new Date(this.form.date1)
          .format("yyyy-MM-dd")
          .toString();
      }
      if (this.form.date2) {
        this.form.date2 = new Date(this.form.date2)
          .format("yyyy-MM-dd")
          .toString();
      }
      let params = {
        activityName: this.form.state,
        batchCodeName: this.form.batchCodeName,
        code: this.form.code,
        compileDateBegin: this.form.date1,
        compileDateEnd: this.form.date2,
        compileDepartment: this.form.belongTo,
        propertyCode: this.form.propertyCode,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      http
        .getAllHousePlan(params)
        .then(res => {
          this.tableData = res.content;
          this.totalDataNumber = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //双击前往详情页面
    goDetail(val) {
      console.log("====val", val);
      let tab = {
        label: val.code,
        route: "/queryDetails/" + val.guid + "/" + val.PID,
        query: { state: "done" },
        type: "single"
      };
      this.openTopTab(tab);
    },
    //分页大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTbaleList(1);
    },
    // 页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTbaleList();
    },
    //格式化数据
    dateFormat(row) {
      return row.compileDate.split(" ")[0];
    }
  },
  mounted() {
    this.getMoreList(); //数据字典
    this.getTbaleList(); //得到计划查询的列表页
  }
};
</script>

<style lang="scss" scoped>
#planQuery {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
