<!--
 * @Author: JinYaBei
 * @Date: 2019-10-05 
 * @LastEditors: Please set LastEditors
 * @Description: 房源信息勘误代办
 -->
<template>
  <!--房源信息勘误 待办-->
  <div class="CorrectTodoBox">
    <div class="search_box">
      <el-form size="mini" label-position="left" :model="form">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="勘误小区名称" label-width="7rem">
              <el-input clearable v-model="form.districtName" @change="correctTodoSearch(1)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="申请时间" label-width="5rem">
              <el-date-picker
                type="date"
                v-model="form.minDateTime"
                value-format="yyyy-MM-dd"
                style="width:45%;"
                clearable
                @change="correctTodoSearch(1)"
              ></el-date-picker>
              <span>至</span>
              <el-date-picker
                type="date"
                v-model="form.maxDateTime"
                value-format="yyyy-MM-dd"
                style="width:45%;"
                clearable
                @change="correctTodoSearch(1)"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button
              type="primary"
              size="mini"
              @click="correctTodoSearch(1)"
              v-if="hasPerm('fygl_fyxxkw_cx')"
            >查询</el-button>
            <el-button type="primary" size="mini" @click="reset" v-if="hasPerm('fygl_fyxxkw_cz')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row class="toolbar">
      <el-button
        type="primary"
        size="mini"
        @click="newCorrect()"
        v-if="hasPerm('fygl_fyxxkw_xzfyxxkwsq')"
      >新增房源信息勘误申请</el-button>
    </el-row>
    <div class="table">
      <el-table
        :data="correntInfo"
        border
        :header-cell-style="globalHeaderStyle"
        :cell-style="globalCellStyle"
      >
        <el-table-column label="序号" width="80" type="index" :index="indexMethod"></el-table-column>
        <el-table-column prop="XMMC" label="勘误小区名称"></el-table-column>
        <el-table-column prop="JBR" label="经办人"></el-table-column>
        <el-table-column label="申请时间">
          <template slot-scope="scope">{{scope.row.SQSJ|dateFormat}}</template>
        </el-table-column>
        <el-table-column prop="STATE" label="申请状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="jumpDetailPage(scope.row)"
              v-if="hasPerm('fygl_fyxxkw_bl')"
            >办理</el-button>
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
          :total="totalNumber"
          background
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      title="新增房源信息勘误申请"
      :visible.sync="newCorrectDialog"
      width="80%"
      :close-on-click-modal="false"
    >
      <div class="search">
        <el-form size="mini" label-position="left" :model="newCorrectForm" label-width="5rem">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="小区">
                <el-autocomplete
                  class="inline-input"
                  v-model="newCorrectForm.name"
                  :fetch-suggestions="getCommunitySelectList"
                  placeholder="请输入内容"
                  :trigger-on-focus="false"
                  :clearable="true"
                  popper-class="select-option"
                  style="width:100%"
                  @select="newCorrectSearch(1)"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所在区">
                <el-select
                  v-model="newCorrectForm.area"
                  clearable
                  placeholder
                  style="width:100%"
                  @change="newCorrectSearch(1)"
                >
                  <el-option
                    v-for="(item,index) in areaData"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所在街道">
                <el-input clearable v-model="newCorrectForm.street" @change="newCorrectSearch(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" size="mini" @click="newCorrectSearch(1)">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="table">
        <el-table
          :data="newCorrectInfo"
          ref="newCorrectInfo"
          @row-click="chooseInfo"
          border
          size="mini"
          v-loading="loading"
          :header-cell-style="{
                        'background': '#E6F0FC',
                        'color': '#606266',
                        'text-align':'center',
                        'border-color': '#DBDBDB',
                        }"
          :cell-style="{
                        'text-align':'center',
                        'border-color': '#DBDBDB',
                        }"
        >
          <el-table-column label="#" width="50" align="center">
            <template slot-scope="scope">
              <el-radio class="radio" v-model="radio" :label="scope.$index">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="code" label="小区号"></el-table-column>
          <el-table-column prop="name" label="小区名称"></el-table-column>
          <el-table-column prop="area" label="所属区"></el-table-column>
          <el-table-column prop="street" label="街道"></el-table-column>
          <el-table-column prop="address" label="位置"></el-table-column>
          <el-table-column prop="houseCount" label="总套数"></el-table-column>
          <el-table-column prop="selfBuilt" label="自建" :formatter="selfBuiltFormat"></el-table-column>
          <el-table-column prop="districtMaintainBelongName" label="维护归属"></el-table-column>
        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="handleCorrectSizeChange"
            @current-change="handleCorrectCurrentChange"
            :current-page="newCorrectInfoPage.currentPage"
            :page-sizes="newCorrectInfoPage.pageSizesList"
            :page-size="newCorrectInfoPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="newCorrectInfoPage.totalNumber"
            background
          ></el-pagination>
        </div>
      </div>
      <div slot="footer" style="text-align:center">
        <el-button @click="newCorrectConfirm()" type="primary" size="mini">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import http from "@/api/common";
import https from "@/api/housestore.js";
import { formatDate } from "@/components/js/date"; //时间过滤
import publicMethod from "@/api/publicMethod.js";
export default {
  data() {
    return {
      newCorrectDialog: false, //新增房源信息勘误弹框
      newCorrectForm: {
        //新增勘误信息的查询条件
        pageIndex: 1,
        pageSize: 20
      },
      newCorrectInfo: [], //新增勘误信息的查询列表
      areaData: [], //所在区的下拉列表
      radio: "", //实现单选
      selectedData: {}, //选中的某条数据
      newCorrectInfoPage: {
        currentPage: 1,
        pageSize: 20,
        pageSizesList: [10, 20, 30, 40],
        totalNumber: 0
      },
      form: {
        businessName: "房源信息勘误",
        pageIndex: 1,
        pageSize: 20,
        state: 0
      }, //勘误代办箱查询条件
      correntInfo: [], //勘误信息查询列表
      flowData: {}, //流程环境的数据
      tableData: [],
      currentPage: 1,
      pageNo: 1,
      pageSize: 20,
      pageSizesList: [20, 50, 100, 200],
      totalNumber: 0, //数据的总数
      params_name: "",
      clickDialog: false, //双击对话框
      personInfo: {},
      selectCommunityOptions: [], //选中的数据
      loading: false,
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
    formatTime(time) {
      let date = new Date(time);
      return formatDate(date, "hh:mm");
    },
    formatDateTime(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
    //小区模糊查询
    getCommunitySelectList(str, cb) {
      let params = {
        searchContent: this.newCorrectForm.name
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
    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //代办箱查询
    correctTodoSearch(index) {
      if (index) {
        this.newCorrectForm.pageIndex = index;
      }
      if (this.form.minDateTime) {
        this.form.minDateTime = this.form.minDateTime.toString();
      }
      if (this.form.maxDateTime) {
        this.form.maxDateTime = this.form.maxDateTime.toString();
      }
      let params = this.form;
      let data = {};
      https
        .correctSearch(params, data)
        .then(res => {
          this.correntInfo = res.content;
          this.totalNumber = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //跳转到小区页面
    openDetail(row) {
      row = row || {};
      let tab = {
        route:
          "/correctHouseInfoTab/" +
          (row.XMBS || "new") +
          "/" +
          row.TID +
          "/" +
          row.operator,
        query: {
          activityName: row.STATE
        },
        name: row.XMMC || "新增房源信息勘误申请",
        type: "single"
      };
      this.openTopTab(tab);
    },
    //转化为true/false
    selfBuiltFormat(selfBuiltDataStatus) {
      return selfBuiltDataStatus.selfBuilt ? "是" : "否";
    },
    //选中
    chooseInfo(val) {
      this.newCorrectInfo.forEach((item, index) => {
        if (item.guid === val.guid) {
          this.radio = index;
          this.selectedData = val;
        }
      });
    },
    //当前页的大小改变
    handleCorrectSizeChange(val) {
      this.newCorrectForm.pageSize = val;
      this.newCorrectSearch(1);
    },
    handleCorrectCurrentChange(val) {
      this.newCorrectForm.pageIndex = val;
      this.newCorrectSearch();
    },
    // 重置
    reset() {
      this.form = {
        businessName: "房源信息勘误",
        pageIndex: 1,
        pageSize: 100,
        state: 0
      };
    },
    // 新增房源信息勘误申请
    newCorrect() {
      this.newCorrectDialog = true;
      this.getDictionary();
      this.newCorrectSearch();
    },
    //新增房源信息勘误里面的查询
    newCorrectSearch(index) {
      this.loading = true;
      this.radio = false;
      if (index) {
        this.newCorrectForm.currentPage = index;
      }
      let params = this.newCorrectForm;
      https
        .getPage(params)
        .then(res => {
           this.loading = false;
          this.newCorrectInfo = res.content;
          this.newCorrectInfoPage.totalNumber = res.totalElements;
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    //数据字典
    getDictionary() {
      let nameData = ["所属区"];
      let params = {
        names: nameData.toString()
      };
      https
        .getDictionary(params)
        .then(res => {
          this.areaData = JSON.parse(res).所属区;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //开启流程
    startProject() {
      this.$startLoading();
      let params = {
        districtGuid: this.selectedData.guid
      };
      https
        .startProject(params)
        .then(res => {
          if (res) {
            this.openNewCache(res);
          }
        })
        .catch(err => {
          console.log(err);
          this.$endLoading()
        });
    },
    //从新增进去启动流程
    openNewCache(val) {
      let params = {
        taskId: val.taskId
      };
      https
        .openCache(params)
        .then(res => {
          if (res) {
            this.newCorrectDialog = false;
            let flag = false;
            let row = {};
            row.XMMC = this.selectedData.name;
            row.XMBS = this.selectedData.guid;
            row.operator = "new";
            row.TID = val.taskId;
            this.openDetail(row);
            this.selectedData = {};
            this.radio = "";
            this.$endLoading()
          }
        })
        .catch(err => {
          console.log(err);
          this.$endLoading()
        });
    },
    // 新增房源信息勘误申请 --确定
    newCorrectConfirm() {
      if (!this.selectedData.guid) {
        this.$message("请选择小区再进行提交");
      } else {
        this.startProject();
      }
    },
    //openCache办理进去
    //从新增进去启动流程
    openCache(val) {
      let params = {
        taskId: val.TID
      };
      https
        .openCache(params)
        .then(res => {
          val.operator = "todo";
          this.openDetail(val);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //办理
    jumpDetailPage(val) {
      this.openCache(val);
    },
    // pageSize改变
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.correctTodoSearch(1);
    },
    // currentPage改变
    handleCurrentChange(val) {
      this.form.pageIndex = val;
      this.correctTodoSearch();
    }
  },
  mounted() {
    this.Event.$on("toreload", data => {
      if ((data = "makeCorrect")) {
        this.correctTodoSearch();
      }
    });
    this.Event.$on("CorrectTodoBox", data => {
      if (data == "correctTodoSearch") {
        this.correctTodoSearch();
      }
    });
    this.correctTodoSearch(); //查询
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
    formatTime(time) {
      let date = new Date(time);
      return formatDate(date, "hh:mm");
    },
    formatDateTime(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>


<style lang="scss">
.CorrectTodoBox {
  .search_box {
    .el-form-item {
      margin-bottom: 10px;
      margin-right: 15px;
    }
  }
  .toolbar {
    margin-bottom: 10px;
  }
}
</style>
