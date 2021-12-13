<!--
 * @Description: 房源录入首页
 * @Version: 1.0
 * @Autor: zhaoyy1
 * @Date: 2019-09-17 17:47:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-23 15:17:06
 -->
<template>
  <div id="housinginFormation" class="housinginformation page-detail">
    <div class="content">
      <div class="el-tabs__content">
        <div class="search_box">
          <el-form size="mini" labelPosition="left" label-width="4rem">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="小区号">
                  <el-input
                    v-model="options.code"
                    placeholder="请输入内容"
                    clearable
                    @keyup.enter.native="queryFunc"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="小区名称" label-width="5rem">
                  <el-input
                    v-model="options.districtName"
                    placeholder="请输入内容"
                    clearable
                    @keyup.enter.native="queryFunc"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所在区">
                  <el-select v-model="options.area" clearable>
                    <el-option
                      v-for="(item, index) in area"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                      @keyup.enter.native="queryFunc"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="总建筑面积" label-width="6rem">
                  <el-row :gutter="0">
                    <el-col :span="10">
                      <el-input
                        v-model="options.coveredAreaStrat"
                        clearable
                        @keyup.enter.native="queryFunc"
                      ></el-input>
                    </el-col>
                    <el-col :span="2" style="text-align: center;">
                      <span>-</span>
                    </el-col>
                    <el-col :span="10">
                      <el-input
                        v-model="options.coveredAreaEnd"
                        clearable
                        @keyup.enter.native="queryFunc"
                      ></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6" style="float:right">
                <div style="float:right">
                  <el-button type="primary" size="mini" @click="queryFunc">查询</el-button>
                  <el-button type="primary" size="mini" @click="reset">重置</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 列表 -->
        <el-row class="toolbar">
          <el-button type="primary" size="mini" @click="tiaozhuan">新增小区</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="querycommunity(),communityEntry = true"
          >原有小区录入</el-button>
          <el-button type="danger" size="mini" class="button_right delete" @click="tanchu">删除</el-button>
        </el-row>
        <div class="list_content">
          <div class="quarterMessage_box">
            <template>
              <el-table
                :data="housinginfoList"
                style="width: 100%"
                border
                @selection-change="changeFun"
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
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="序号" width="60" type="index" :index="indexMethod"></el-table-column>
                <el-table-column prop="code" label="小区号"></el-table-column>
                <el-table-column prop="name" label="小区名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="area" label="所在区" show-overflow-tooltip></el-table-column>
                <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
                <el-table-column prop="totalCoveredArea" label="总建筑面积" show-overflow-tooltip></el-table-column>
                <el-table-column prop="itemName" label="事项操作" show-overflow-tooltip></el-table-column>
                <el-table-column prop label="操作">
                  <template slot-scope="scope">
                    <el-button
                      type="warning"
                      @click="edit(scope.row)"
                      size="mini" 
                      :disabled ="scope.row.itemName=='原有小区入库' || scope.row.original"
                    >编辑</el-button>
                    <el-button type="primary" @click="rowDblclick(scope.row)" size="mini">查看</el-button>
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
                  :current-page="pageObj.currentPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="pageObj.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="pageObj.total"
                ></el-pagination>
              </div>
            </template>
          </div>
        </div>
      </div>
      <!-- 删除确认弹窗 -->
      <el-dialog
        title="删除小区"
        :visible.sync="dialogFormVisible1"
        width="30%"
        id="delete_box"
        :close-on-click-modal="false"
      >
        <el-form>
          <p>确定删除该小区吗？</p>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false" size="mini">取 消</el-button>
          <el-button size="mini" @click="deleteArea" type="primary">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 请选择原有小区 -->
      <el-dialog
        title="请选择原有小区"
        :visible.sync="communityEntry"
        width="70%"
        :close-on-click-modal="false"
      >
        <el-form size="mini" labelPosition="left" label-width="6rem" :model="communityForm">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="小区号">
                <el-input
                  v-model="communityForm.code"
                  placeholder="请输入内容"
                  clearable
                  @keyup.enter.native="querycommunity"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="小区名称">
                <el-input
                  v-model="communityForm.districtName"
                  placeholder="请输入内容"
                  clearable
                  @keyup.enter.native="querycommunity"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所在区">
                <el-select
                  v-model="communityForm.area"
                  clearable
                  @keyup.enter.native="querycommunity"
                >
                  <el-option
                    v-for="(item, index) in area"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                    @keyup.enter.native="querycommunity"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="总建筑面积">
                <el-row :gutter="0">
                  <el-col :span="10">
                    <el-input
                      v-model="communityForm.coveredAreaStrat"
                      clearable
                      @keyup.enter.native="querycommunity"
                    ></el-input>
                  </el-col>
                  <el-col :span="2" style="text-align: center;">
                    <span>-</span>
                  </el-col>
                  <el-col :span="10">
                    <el-input
                      v-model="communityForm.coveredAreaEnd"
                      clearable
                      @keyup.enter.native="querycommunity"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6" style="float:right;margin-bottom:20px">
              <div style="float:right">
                <el-button type="primary" size="mini" @click="querycommunity">查询</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div class="quarterMessage_box">
          <template>
            <el-table
              :data="communityTable"
              style="width: 100%"
              border
              size="mini"
              @cell-click="rowclick"
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
              <el-table-column prop="code" label="小区号"></el-table-column>
              <el-table-column prop="name" label="小区名称"></el-table-column>
              <el-table-column prop="area" label="所在区"></el-table-column>
              <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
              <el-table-column prop="totalCoveredArea" label="总建筑面积" show-overflow-tooltip></el-table-column>
            </el-table>
          </template>
        </div>
        <el-pagination
          @size-change="handleCorrectSizeChange"
          @current-change="handleCorrectCurrentChange"
          :current-page="communityForm.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="communityForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="communityForm.totalNumber"
          background
        ></el-pagination>
        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button type="primary" @click="community" size="mini">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import http from "@/api/common(bj).js";
export default {
  name: "housinginformation",
  data() {
    return {
      dialogFormVisible1: false,
      landNo: "", //宗地号
      mappingData: [], //测绘列表数据
      mappingDataObj: {}, //测绘数据的小区信息
      mappingbool: false, //判断是否显示测绘数据
      code: "", //小区号
      districtName: "", //小区名称
      area: [], //区域
      housinginfoList: [],
      pageObj: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      options: {
        code: "",
        area: "",
        districtName: "",
        coveredAreaStrat: "",
        coveredAreaEnd: ""
      },
      dialogFormVisible: false,
      areaInfo: [], //选中的小区信息
      //新增原有小区
      communityEntry: false, //小区录入弹框
      communityForm: {
        pageSize: 10,
        currentPage: 1
      },
      communityTable: [],
      radio: "",
      isShow: true
    };
  },
  methods: {
    reset() {
      //重置搜素条件
      for (var i in this.options) {
        this.options[i] = "";
      }
    },
    deleteArea() {
      // 点击确定删除小区
      var guids = [];
      for (var i in this.areaInfo) {
        guids.push(this.areaInfo[i].guid);
      }
      let params;
      let data = guids;
      http
        .deleteArea(params, data)
        .then(res => {
          if (res) {
            this.$message({
              message: "删除小区成功",
              type: "success"
            });
            this.dialogFormVisible1 = false;
            this.getData();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    tanchu() {
      //弹出删除确认框
      if (this.areaInfo.length === 0) {
        this.open("请先选择小区");
        return;
      }
      this.dialogFormVisible1 = true;
    },
    changeFun(val) {
      //获取选中的数据
      this.areaInfo = val;
    },
    //跳转（新增）
    tiaozhuan() {
      let code;
      let guid = "newguid";
      code = "房源信息录入";
      let tempTab = {
        //0新增 1编辑 2 查看
        route: "/houseInputTab" + "/" + code + "/" + guid + "/" + "0",
        name: "新建小区",
        query: {
          itemName: ""
        }
      };
      this.openTopTab(tempTab);
    },
    edit(val) {
      let code;
      let guid = val.guid;
      code = "房源信息录入";
      let tempTab = {
        //0新增 1编辑 2 查看
        route: "/houseInputTab" + "/" + code + "/" + guid + "/" + "1",
        name: val.name,
        query: {
          itemName: val.itemName
        }
      };
      this.openTopTab(tempTab);
    },
    //查看
    rowDblclick(val) {
      console.log(val)
      let code;
      let guid = val.guid;
      code = "房源信息录入";
      let tempTab = {
        //0新增 1编辑 2 查看
        route: "/houseInputTab" + "/" + code + "/" + guid + "/" + "2",
        name: val.name,
        query: {
          source: val.itemName
        }
      };
      this.openTopTab(tempTab);
    },
    duijie() {
      // 对接测绘数据弹窗
      this.dialogFormVisible = true;
      this.mappingbool = false;
    },
    //字典
    getDict() {
      let dictionaryName = ["所属区"];
      let params = { names: dictionaryName.toString() };
      http
        .getDictionary(params)
        .then(res => {
          let resp = JSON.parse(res);
          this.area = resp.所属区;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      // 分页
      this.pageObj.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      let Current = "Current";
      this.pageObj.currentPage = val;
      this.getData(Current);
    },
    //提示框
    open(title) {
      this.$message(title);
    },
    //查询
    queryFunc() {
      this.getData();
    },
    getData(val) {
      //分页查询参数，分页归至为1
      if (val != "Current") {
        this.pageObj.currentPage = 1;
      }
      let params = {
        code: this.options.code,
        districtName: this.options.districtName,
        area: this.options.area,
        coveredAreaStrat: this.options.coveredAreaStrat,
        coveredAreaEnd: this.options.coveredAreaEnd,
        pageIndex: this.pageObj.currentPage,
        pageSize: this.pageObj.pageSize
      };
      http
        .getHousingData(params)
        .then(res => {
          this.housinginfoList = res.content;
          this.pageObj.total = res.totalElements;
          this.housinginfoList.forEach(item => {
            item.deliveryTime = this.$getDate(item.deliveryTime);
            item.startConstructionTime = this.$getDate(
              item.startConstructionTime
            );
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击查询对接测绘数据
    getMappingData() {
      var that = this;
      if (that.landNo != "") {
        let params = {
          landNo: that.landNo
        };
        http
          .getMappingData(params)
          .then(res => {
            that.mappingbool = true;
            that.mappingDataObj = res;
            that.mappingData = [];
            that.mappingData.push(res);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        that.open("请填写宗地号进行查询！！！");
      }
    },
    //建设筹集-小区信息新增对接测绘数据
    addAuarters() {
      var that = this;
      let dto = that.mappingDataObj;
      if (JSON.stringify(dto) == "{}") {
        that.open("请先查询小区");
      } else {
        let params;
        let data = this.dto;
        http
          .addAuarters(params, data)
          .then(res => {
            that.dialogFormVisible = false;
            that.open("新增小区成功");
            var guid = res.guid;
            var guid = res.name;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //序号
    indexMethod(row) {
      //return row + 1;
      return row + (this.pageObj.currentPage - 1) * this.pageObj.pageSize + 1;
    },
    //input搜索之后下拉框选中的对象
    handleSelect(item) {
      this.batchName = item.name;
    },
    //新增原有小区
    handleCorrectSizeChange(val) {
      this.communityForm.pageSize = val;
      this.querycommunity();
    },
    handleCorrectCurrentChange(val) {
      let Current = "Current";
      this.communityForm.currentPage = val;
      this.querycommunity(Current);
    },
    //查询相关小区
    querycommunity(val) {
      //分页查询参数，分页归至为1
      if (val != "Current") {
        this.communityForm.currentPage = 1;
      }
      this.radio = "";
      let params = {
        code: this.communityForm.code,
        districtName: this.communityForm.districtName,
        area: this.communityForm.area,
        coveredAreaStrat: this.communityForm.coveredAreaStrat,
        coveredAreaEnd: this.communityForm.coveredAreaEnd,
        pageIndex: this.communityForm.currentPage,
        pageSize: this.communityForm.pageSize
      };
      http
        .houseDistrict(params)
        .then(res => {
          this.communityTable = res.content;
          this.communityForm.totalNumber = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    community() {
      if (this.radio === "") {
        this.$alert("请选择小区！", "提示");
        return;
      }
      this.communityEntry = false;
      let code;
      let guid = this.communityTable[this.radio].guid;
      let edit = false;
      code = "房源信息录入";
      let tempTab = {
        route: "/houseInputTab" + "/" + code + "/" + guid + "/" + false,
        name: this.communityTable[this.radio].name,
        query: { source: "原有小区入库" }
      };
      this.openTopTab(tempTab);
    },
    //单机获取index
    rowclick(val) {
      this.communityTable.forEach((item, index) => {
        if (item.guid === val.guid) {
          this.radio = index;
        }
      });
    },
    onload() {
      this.Event.$on("newHouseInputTab", data => {
        if (data.msg == "newHouseInputTab") {
          this.getData();
        }
      });
    }
  },
  created() {
    //字典
    this.getDict();
    this.getData();
    this.onload();
  }
};
</script>

<style lang="scss" scoped>
.housinginformation {
  .search_box {
    .el-form-item {
      margin-bottom: 10px;
      margin-right: 15px;
    }
  }
  .toolbar {
    margin-bottom: 10px;
  }
  .page_box {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .el-pagination {
    margin-top: 20px;
    text-align: right;
  }
  .el-select {
    width: 100%;
  }
  //总样式增加禁用文字居中，此处单独修改
  /deep/ .quarterMessage_box .el-input.is-disabled .el-input__inner {
    text-align: left;
  }
}
#housinginFormation {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
