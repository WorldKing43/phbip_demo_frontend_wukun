<!--查封冻结-->
<template>
  <div id="seizureFreeze" class="page-detail">
    <div class="content">
      <div class="el-tabs__content">
        <div class="top">
          <el-form ref="form" label-width="5rem" size="mini" :model="form">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="小区名称">
                  <el-input v-model="form.districtName" clearable @change="getSealfreezeList(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="栋名称">
                  <el-input v-model="form.buildingName" clearable @change="getSealfreezeList(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="栋号">
                  <el-input v-model="form.buildNo" clearable @change="getSealfreezeList(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="房号">
                  <el-input v-model="form.houseNo" clearable @change="getSealfreezeList(1)"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="被查封人/单位" label-width="7rem">
                  <el-input v-model="form.beSealUpObject" clearable @change="getSealfreezeList(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="当前状态">
                  <el-select
                    v-model="form.state"
                    placeholder="--请选择--"
                    class="w100"
                    clearable
                    style="width:100%"
                    @change="getSealfreezeList(1)"
                  >
                    <el-option
                      v-for="item in stateDataInfo"
                      :label="item.name"
                      :value="item.name"
                      :key="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" size="mini" @click="getSealfreezeList(1)">查询</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div>
          <el-button type="primary" size="mini" @click="openNewDialog">新增</el-button>
          <el-button type="primary" size="mini" @click="notlibrary">不在库房源查封登记</el-button>
        </div>
        <!--结果列表-->
        <div class="table-list" style="margin-top: 10px;margin-bottom:10px;">
          <el-table
            :data="seizureFreezeInfo"
            border
            ref="houseTable"
            size="mini"
            :header-cell-style="globalHeaderStyle"
            :cell-style="globalCellStyle"
          >
            <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
            <el-table-column prop="districtName" label="小区名称"></el-table-column>
            <el-table-column prop="bulidingName" label="栋名称"></el-table-column>
            <el-table-column prop="buildNo" label="栋号"></el-table-column>
            <el-table-column prop="houseNo" label="房号"></el-table-column>
            <el-table-column prop="beSealUpObject" label="被查封人/单位"></el-table-column>
            <el-table-column prop="num" label="轮候数"></el-table-column>
            <el-table-column prop="stateName" label="当前状态"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="getDetail(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="page_box">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="pageSizesList"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNumber"
              background
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="新增查封"
      :visible.sync="newDialog"
      width="80%"
      class="newSeizureFreezeHeader"
      :close-on-click-modal="false"
    >
      <div class="search">
        <el-form size="mini" label-position="left" :model="newSeizureFreezeForm" label-width="5rem">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="小区">
                <el-autocomplete
                  class="inline-input"
                  v-model="newSeizureFreezeForm.districtName"
                  :fetch-suggestions="getCommunityDialogSelectList"
                  placeholder="请输入内容"
                  :trigger-on-focus="false"
                  :clearable="true"
                  style="width:100%"
                  popper-class="select-option"
                  @select="newSeizureFreezeSearch(1)"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="栋名称">
                <el-input
                  v-model="newSeizureFreezeForm.buildingName"
                  clearable
                  @change="newSeizureFreezeSearch(1)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="栋号">
                <el-input
                  v-model="newSeizureFreezeForm.buildNo"
                  clearable
                  @change="newSeizureFreezeSearch(1)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房号">
                <el-input
                  v-model="newSeizureFreezeForm.houseNo"
                  clearable
                  @change="newSeizureFreezeSearch(1)"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="房屋性质">
                <el-select
                  v-model="newSeizureFreezeForm.natureName"
                  placeholder="--请选择--"
                  class="w100"
                  style="width:100%"
                  clearable
                  @change="newSeizureFreezeSearch(1)"
                >
                  <el-option
                    v-for="item in natureData"
                    :label="item.name"
                    :value="item.value"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房屋状态">
                <el-select
                  v-model="newSeizureFreezeForm.stateName"
                  placeholder="--请选择--"
                  style="width:100%"
                  class="w100"
                  clearable
                  @change="newSeizureFreezeSearch(1)"
                >
                  <el-option
                    v-for="item in stateData"
                    :label="item.name"
                    :value="item.value"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" size="mini" @click="newSeizureFreezeSearch(1)">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="table">
        <el-table
          :data="newSeizureFreezeInfo"
          ref="newCorrectInfo"
          @row-click="chooseInfo"
          border
          size="mini"
          :header-cell-style="{
            background: '#E6F0FC',
            color: '#606266',
            'text-align': 'center',
            'border-color': '#DBDBDB'
          }"
          :cell-style="{
            'text-align': 'center',
            'border-color': '#DBDBDB'
          }"
        >
          <el-table-column label="#" width="50" align="center">
            <template slot-scope="scope">
              <el-radio class="radio" v-model="radio" :label="scope.$index">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="districtCode" label="小区号"></el-table-column>
          <el-table-column prop="districtName" label="小区名称"></el-table-column>
          <el-table-column prop="bulidingName" label="栋名称"></el-table-column>
          <el-table-column prop="buildNo" label="栋号"></el-table-column>
          <el-table-column prop="houseNo" label="房号"></el-table-column>
          <el-table-column prop="natureName" label="房屋性质"></el-table-column>
          <el-table-column prop="stateName" label="房屋状态"></el-table-column>
        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="newSeizureFreezeSizeChange"
            @current-change="newSeizureFreezeCurrentChange"
            :current-page="newSeizureFreezeInfoPage.currentPage"
            :page-sizes="newSeizureFreezeInfoPage.pageSizesList"
            :page-size="newSeizureFreezeInfoPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="newSeizureFreezeInfoPage.totalNumber"
            background
          ></el-pagination>
        </div>
      </div>
      <div slot="footer" style="text-align:center">
        <el-button @click="newSeizureFreeze()" type="primary" size="mini">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/api/freezeSeized.js";
import http from "@/api/housestore.js";
import publicMethod from "@/api/publicMethod.js";
import publicTitle from "@/components/TitleStylex"; //标题组件
export default {
  data() {
    return {
      newSeizureFreezeForm: {}, //新增查封冻结的查封条件
      newSeizureFreezeInfo: [], //新增勘查封冻结列表
      newSeizureFreezeInfoPage: {
        //新增查封冻结的分页
        currentPage: 1,
        pageSize: 10,
        pageSizesList: [10, 20, 30, 40],
        totalNumber: 0
      },
      natureData: [], //房屋性质下拉数据
      stateData: [], //房屋状态
      unitTypeData: [], //查封类型
      selectedData: {}, //选中的某条数据
      radio: false, //实现单选
      DialogVisble: false, //查看详情页面的弹框
      form: {}, //表单
      seizureFreezeInfo: [], //勘查封冻结列表
      currentPage: 1,
      pageNo: 1,
      pageSize: 50,
      pageSizesList: [50, 100, 200, 500, 1000],
      totalNumber: 0, //数据的总数
      newDialog: false, //表示弹框是否打开
      stateDataInfo: [
        { name: "查封中", value: "0" },
        { name: "已解封", value: "1" }
      ],
      selectCommunityOptions: [] //选中的数据
    };
  },
  components: {
    publicTitle
  },
  methods: {
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //小区模糊查询--列表
    getCommunitySelectList(str, cb) {
      let params = {
        searchContent: this.form.districtName
      };
      publicMethod
        .getCommunityList(params)
        .then(res => {
          for (let i of res) {
            i.value = i.districtNameNo;
          }
          this.selectCommunityOptions = res; //将结果存入下拉小区数据中
          if (this.selectCommunityOptions.length === 0) {
            this.selectCommunityOptions = [{ value: "暂无数据" }];
          }
          cb(this.selectCommunityOptions);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //小区模糊查询--弹框
    getCommunityDialogSelectList(str, cb) {
      let params = {
        searchContent: this.newSeizureFreezeForm.districtName
      };
      publicMethod
        .getCommunityList(params)
        .then(res => {
          for (let i of res) {
            i.value = i.districtNameNo;
          }
          this.selectCommunityOptions = res; //将结果存入下拉小区数据中
          if (this.selectCommunityOptions.length === 0) {
            this.selectCommunityOptions = [{ value: "暂无数据" }];
          }
          cb(this.selectCommunityOptions);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取字典数据
    getDictionary() {
      let nameData = ["房屋性质", "房屋状态", "查封类型"];
      let params = { names: nameData.toString() };
      http
        .getDictionary(params)
        .then(res => {
          res = JSON.parse(res);
          this.natureData = this.$dictionaryChange(
            res.房屋性质,
            this.natureData,
            "通用"
          );
          this.stateData = res.房屋状态;
          this.unitTypeData = res.查封类型;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //打开冻结查封新增弹框
    openNewDialog() {
      this.newDialog = true;
      this.newSeizureFreezeSearch();
    },
    //新增弹框里面的查询
    newSeizureFreezeSearch(index) {
      this.radio = false;
      if (index) {
        this.newSeizureFreezeInfoPage.currentPage = index;
      }
      let params = {
        pageSize: this.newSeizureFreezeInfoPage.pageSize,
        pageIndex: this.newSeizureFreezeInfoPage.currentPage
      };
      let data = this.newSeizureFreezeForm;
      api
        .createCaseSearch(params, data)
        .then(res => {
          this.newSeizureFreezeInfo = res.content;
          this.newSeizureFreezeInfoPage.totalNumber = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //新增弹框页码改变
    newSeizureFreezeSizeChange(val) {
      this.newSeizureFreezeInfoPage.currentPage = 1;
      this.newSeizureFreezeInfoPage.pageSize = val;
      this.newSeizureFreezeSearch();
    },
    //新增弹框每页的大小改变
    newSeizureFreezeCurrentChange(val) {
      this.newSeizureFreezeInfoPage.currentPage = val;
      this.newSeizureFreezeSearch();
    },
    //选中
    chooseInfo(val) {
      this.newSeizureFreezeInfo.forEach((item, index) => {
        if (item.houseGuid === val.houseGuid) {
          this.radio = index;
          this.selectedData = val;
        }
      });
    },
    //不在库房源查封登记
    notlibrary() {
      let val = {
        state: "notlibrary"
      };
      let tab = {
        route:
          "/newSeizureFreeze/" +
          (val.state || "new") +
          "/" +
          (val.houseGuid || "new") +
          "/" +
          (val.guid || "new"),
        name: "新增查封",
        type: "single"
      };
      this.openTopTab(tab);
    },
    //新增弹框里面的确定
    newSeizureFreeze() {
      if (this.selectedData.closed == 1) {
        this.$confirm("该房正处于查封中，请确认是否轮候?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "轮候成功!"
            });
            let tab = {
              route:
                "/newSeizureFreeze/" +
                (this.selectedData.state || "new") +
                "/" +
                this.selectedData.houseGuid +
                "/" +
                (this.selectedData.guid || "new"),
              name: "新增查封",
              type: "single",
              query: {
                mustState: this.selectedData.closed, //查封中
              }
            };
            this.openTopTab(tab);
            this.radio = "";
            this.newDialog = false;
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消轮候"
            });
          });
      } else {
        let tab = {
          route:
            "/newSeizureFreeze/" +
            (this.selectedData.state || "new") +
            "/" +
            this.selectedData.houseGuid +
            "/" +
            (this.selectedData.guid || "new"),
          name: "新增查封",
          type: "single",
          query: {
            mustState: this.selectedData.closed, //新增
          }
        };
        this.openTopTab(tab);
        this.radio = "";
        this.newDialog = false;
      }
    },
    //得到查封冻结列表
    getSealfreezeList(index) {
      if (index) {
        this.currentPage = index;
      }
      this.form.pageIndex = this.currentPage;
      this.form.pageSize = this.pageSize;
      let params = this.form;
      api
        .getSealfreezeList(params)
        .then(res => {
          this.seizureFreezeInfo = res.content;
          this.totalNumber = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getSealfreezeList();
    },
    //得到查封冻结列表页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSealfreezeList();
    },
    //查看详情
    getDetail(val) {
      let tab = {
        route: "/seizureFreezeDetail/" + val.houseGuid,
        name: val.districtName,
        type: "single"
      };
      this.openTopTab(tab);
    }
  },
  mounted() {
    this.getDictionary();
    this.getSealfreezeList();
    this.Event.$on("seizureFreeze", data => {
      if (data == "getSealfreezeList") {
        this.getSealfreezeList();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
#seizureFreeze {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
