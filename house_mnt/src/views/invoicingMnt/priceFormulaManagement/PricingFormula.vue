<!--
 * @Description:计价公式管理-首页面
 * @Version: 1.0
 * @Autor: maxq
 * @Date: 2019-11-20 20:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 
-->
<template>
  <div id="pricing-formula" class="page-detail">
    <div class="content">
      <div class="el-tabs__content">
        <div>
          <el-form size="mini" v-model="form" label-width="4.5rem">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="公式代码">
                  <el-input v-model="form.formulaCode" clearable @change="search(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="公式名称">
                  <el-input v-model="form.formulaName" clearable @change="search(1)"></el-input>
                </el-form-item>
              </el-col>
              <!-- 公式类别后面要修改为下拉框 -->
              <el-col :span="6">
                <el-form-item label="公式类别">
                  <el-select v-model="form.formulaType" clearable @change="search(1)">
                    <el-option
                      v-for="(item, index) in typeList"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" size="mini" @click="search(1)">查询</el-button>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 10px;">
              <el-button type="primary" size="mini" @click="addFormula()">增加公式</el-button>
            </el-row>
          </el-form>
        </div>
        <div>
          <el-table
            :data="tableData"
            :cell-style="globalCellStyle"
            :header-cell-style="globalHeaderStyle"
            border
          >
            <el-table-column label="公式代码" prop="formulaCode"></el-table-column>
            <el-table-column label="公式名称" prop="formulaName"></el-table-column>
            <el-table-column label="公式类别" prop="typeName"></el-table-column>
            <el-table-column label="创建人" prop="createrName"></el-table-column>
            <el-table-column label="创建单位" prop="createUnitName"></el-table-column>
            <el-table-column label="创建时间" prop="createTime"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="enterTheDetails(scope.row)">编辑</el-button>
                <el-button type="primary" size="mini" @click="deleteTheDetails(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="page_box">
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
        </div>
        <!-- 弹框 -->
        <el-dialog
          title="增加公式"
          :visible.sync="openDialog"
          width="30%"
          :close-on-click-modal="false"
        >
          <el-form v-model="dialogForm" label-width="5rem" size="mini">
            <el-form-item label="公式代码">
              <el-input v-model="dialogForm.FormulaCode"></el-input>
            </el-form-item>
            <el-form-item label="公式名称">
              <el-input v-model="dialogForm.FormulaCode"></el-input>
            </el-form-item>
            <el-form-item label="公式类别">
              <el-select v-model="dialogForm.FormulaCode">
                <el-option
                  v-for="(item, index) in formulaType"
                  :label="item.name"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="dialog_btn">
            <el-button size="mini" @click="openDialog = false">取消</el-button>
            <el-button type="primary" size="mini" @click="confirmAdd()">确定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/api/interface.js";
export default {
  name: "pricingCoeffcient",
  data() {
    return {
      form: {
        formulaCode: "",
        formulaName: "",
        formulaType: ""
      },
      tableData: [],
      //分页数据
      total: 0,
      pageSize: 20,
      currentPage: 1,
      pageSizesList: [20, 50, 100, 200],
      typeList: [], //公式类别
      openDialog: false, //控制弹框显隐；
      dialogForm: {
        //弹框表单
        FormulaCode: ""
      },
      formulaType: [] //公式类别下拉框
    };
  },
  methods: {
    //根据名称查询字典
    getDictionary() {
      let nameArr = ["公式类别"];
      let params = {
        names: nameArr.toString()
      };
      http.getDictionary(params).then(res => {
        res = JSON.parse(res);
        this.typeList = res.公式类别;
      });
    },
    //查询
    search(index) {
      if (index) {
        this.currentPage = index;
      }
      let params = {
        formulaCode: this.form.formulaCode,
        formulaName: this.form.formulaName,
        formulaType: this.form.formulaType,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      http
        .searchFormulaList(params)
        .then(res => {
          this.tableData = res.content;
          this.total = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //增加公式
    addFormula() {
      // this.openDialog = true;
      this.openDetails();
    },
    //增加公式-确定按钮
    confirmAdd() {
      this.openDialog = false;
    },
    //删除
    deleteTheDetails(val) {
      let params = {
        formulaGuid: val.guid
      };
      http
        .deleteFormula(params)
        .then(res => {
          this.search();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    openDetails(row) {
      row = row || {};
      let tab = {
        label: row.formulaName || "新增",
        path: "/pricingFormulaTab/" + (row.guid || "new")
      };
      this.openTopTab(tab);
    },
    //点击-编辑 跳转页面
    enterTheDetails(val) {
      this.openDetails(val);
      // let tab = {
      //   label: '详情',
      //   path: '/pricingFormulaTab/' + (val.guid || 'new'),
      // }
      // this.openTopTab(tab)
    },
    //当前页条数改变时
    handleSizeChange(val) {
      this.pageSize = val;
      this.search(1);
    },
    //当前页跳转时
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    }
  },
  mounted() {
    this.getDictionary(); //获取数据字典
    this.search(); //查询信息
    this.Event.$on("PricingFormula", data => {
      //接收广播事件
      if (data == "search") {
        this.search(); //刷新页面
      }
    });
  }
};
</script>
<style lang="scss" scoped>
#pricing-formula {
  overflow-x: hidden;
  overflow-y: auto;
  .dialog_btn {
    text-align: center;
  }
}
</style>
