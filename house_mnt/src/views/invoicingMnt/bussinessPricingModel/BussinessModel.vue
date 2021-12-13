<!--
 * @Description:业务计价模型-首页面
 * @Version: 1.0
 * @Autor: maxq
 * @Date: 2019-11-20 20:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 
-->
<template>
  <div id="bussiness-model" class="page-detail">
    <div class="content">
      <div class="el-tabs__content">
        <div>
          <el-form size="mini" v-model="form">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="房价类型" label-width="5rem">
                  <el-select v-model="form.housePriceType" clearable @change="search(1)">
                    <el-option
                      v-for="(item, index) in housePricingList"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="公式名称" label-width="5rem">
                  <el-input v-model="form.formulaName" clearable @change="search(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="小区名" label-width="4rem">
                  <el-input v-model="form.districtName" clearable @change="search(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="栋名" label-width="3rem">
                  <el-input v-model="form.buildingName" clearable @change="search(1)"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="房号" label-width="3rem">
                  <el-input v-model="form.houseNo" clearable @change="search(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-button type="primary" size="mini" @click="search(1)">查询</el-button>
              </el-col>
            </el-row>
            <el-row :gutter="20"></el-row>
          </el-form>
        </div>
        <div style="margin-bottom:10px;">
          <el-button type="primary" size="mini" @click="addPriceModel()">增加计价模型</el-button>
        </div>
        <div>
          <el-table
            :data="tableData"
            :cell-style="globalCellStyle"
            :header-cell-style="globalHeaderStyle"
            border
          >
            <el-table-column label="房价类型" prop="typeName"></el-table-column>
            <el-table-column label="房源计划号" prop="housePlanNo"></el-table-column>
            <el-table-column label="小区名" prop="districtName"></el-table-column>
            <el-table-column label="栋名" prop="buildingName"></el-table-column>
            <el-table-column label="房号" prop="houseNo"></el-table-column>
            <el-table-column label="公式名称" prop="formulaName"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="editModel(scope.row)">编辑</el-button>
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
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/api/interface.js";
export default {
  name: "bussinessModel",
  data() {
    return {
      districtGuid: "", //小区标识
      buildingGuid: "", //栋标识
      guid: null, //计价模型guid
      form: {
        housePriceType: "",
        formulaName: "",
        districtName: "",
        buildingName: "",
        houseNo: ""
      },
      tableData: [],
      //分页数据
      total: 0,
      pageSize: 20,
      currentPage: 1,
      pageSizesList: [20, 50, 100, 200],
      openDialog: false, //弹框是否可见
      changeTitle: "", //弹框表头名称
      dialogForm: {
        typeName: "", //房价类型
        formulaName: "", //计价公式名称
        districtName: "", //小区名称
        buildingName: "", //栋名称
        housePlanNo: "", //房源计划
        houseNo: "" //房号
      }, //弹框表单数据
      housePricingList: [], //房价类型下拉框
      formulaList: [], //计价公式名称下拉框
      buildinglist: [], //栋名称下拉框
      housePlanList: [], //房源计划下拉框
      houseNoList: [] //房号下拉框
    };
  },
  methods: {
    //根据名称查询字典
    getDictionary() {
      let nameArr = ["计价房价类型"];
      let params = {
        names: nameArr.toString()
      };
      http.getDictionary(params).then(res => {
        res = JSON.parse(res);
        this.housePricingList = res.计价房价类型;
      });
    },
    //查询
    search(index) {
      if (index) {
        this.currentPage = index;
      }
      let params = {
        housePriceType: this.form.housePriceType,
        formulaName: this.form.formulaName,
        districtName: this.form.districtName,
        buildingName: this.form.buildingName,
        houseNo: this.form.houseNo,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      http
        .searchModelList(params)
        .then(res => {
          this.tableData = res.content;
          this.total = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    openDetails(row) {
      row = row || {};
      let tab = {
        label: row.formulaName || "新增",
        path:
          "/bussModelTab/" + (row.guid || "new") + "/" + (row.state || "new")
      };
      this.openTopTab(tab);
    },
    //增加计价模型
    addPriceModel() {
      // this.changeTitle = '增加计价模型'
      // this.openDialog = true
      this.openDetails();
      // console.log(this.openDialog)
    },
    //计价公式名称
    getModelList() {
      let params = {};
      http
        .getModelList(params)
        .then(res => {
          console.log(res, "计价公式");
          this.formulaList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //编辑
    editModel(val) {
      // this.dialogForm = val;
      val.state = "check";
      this.openDetails(val);
      // this.changeTitle = '编辑计价模型'
      // this.openDialog = true
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
    this.search(); //查询信息
    this.getDictionary(); //获取字典
    // this.getHousePlanList();//获取房源计划
    // this.getModelList();//获取计价公式名称
    this.Event.$on("BussinessNodel", data => {
      //接收广播刷新事件
      if (data == "search") {
        this.search();
      }
    });
  }
};
</script>
<style lang="scss" scoped>
#bussiness-model {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
