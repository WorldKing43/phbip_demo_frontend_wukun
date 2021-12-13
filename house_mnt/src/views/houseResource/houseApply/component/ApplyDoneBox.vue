<!--
 * @Description: 房源入库申请-已办箱
 * @Version: 1.0
 * @Autor: wangyue
 * @Date: 2020-01-16 16:04:47
 * @LastEditors: wangyue
 * @LastEditTime: 2020-03-25 15:29:06
 -->

<template>
  <div class="ApplyDoneBox">
    <div class="el-tabs__content">
      <div class="search_box">
        <el-form size="mini" labelPosition="left" label-width="5rem">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="批次号">
                <el-input v-model="form.code" placeholder="请输入内容" clearable @keyup.enter.native="qureyApplyList">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="报批主题">
                <el-input v-model="form.subject" placeholder="请输入内容" clearable @keyup.enter.native="qureyApplyList">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="上报责任单位" label-width="6rem">
                <el-select v-model="form.accountableUnit" clearable @keyup.enter.native="qureyApplyList">
                  <el-option v-for="item in ascriptionoptions" :key="item.value" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="上报人/上报单位" label-width="8rem">
                <el-input v-model="form.reportUnit" clearable @keyup.enter.native="qureyApplyList"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" style="margin-bottom:20px;display: flex;justify-content: flex-end;">
              <el-button type="primary" size="mini" @click="qureyApplyList">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <p>
      </p>
      <div class="quarterMessage_box">
        <template>
          <el-table ref="multipleTable" :data="warehousingApplyListAlready" style="width: 100%"
            @selection-change="handleSelectionChange" border @row-dblclick="doubleClick" :header-cell-style="{
                  'background': '#E6F0FC',
                  'color': '#606266',
                  'text-align':'center',
                  'border-color': '#DBDBDB',
                  }" :cell-style="{
                  'text-align':'center',
                  'border-color': '#DBDBDB',
                  }">
            <el-table-column label="序号" type="index" width="70" :index="indexMethod"></el-table-column>
            <el-table-column prop="code" label="批次号"></el-table-column>
            <el-table-column prop="subject" label="报批主题" show-overflow-tooltip></el-table-column>
            <el-table-column prop="accountableUnit" label="上报责任单位" show-overflow-tooltip></el-table-column>
            <el-table-column label="房源数量">
              <template slot-scope="scope">
                <span v-if="scope.row.houseCount != null">{{scope.row.houseCount}}</span>
                <span v-else>0</span>
              </template>
            </el-table-column>
            <el-table-column prop="reportPerson" label="上报人/上报单位" show-overflow-tooltip></el-table-column>
            <el-table-column prop="reportDate" label="上报时间"></el-table-column>
            <el-table-column prop="state" label="状态" width="100"></el-table-column>
          </el-table>
        </template>
        <template>
          <div class="block page_box">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="pageObj.currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="pageObj.pageSize"
              layout="total, sizes, prev, pager, next, jumper" :total="pageObj.total"></el-pagination>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/api/common(bj).js";
export default {
  name: "ApplyDoneBox",
  data() {
    return {
      multipleSelection: [],
      warehousingApplyList: [], //入库申请列表
      dialogFormVisible: false,
      codes: [],
      pageObj: {
        currentPage4: 1,
        pageSize: 10,
        total: 0
      },
      form: {
        code: "", //批次号
        subject: "", //报批主题
        accountableUnit: "", //责任单位
        reportUnit: "", //上报单位
        state: ""
      },
      options: {
        ascriptionoptions: [],
        companyoptions: [],
        statusoptions: []
      },
      statusArr: ["待提交", "待修改", "已审批", "待审核"],
      stateArr: [],
      userName: "",
      warehousingApplyListAlready: [],
      ascriptionoptions: [],
      businessName: 1 //待办箱：0已办箱：1 默认待办箱
    };
  },
  methods: {
    //序号
    indexMethod(index) {
      return (
        index + (this.pageObj.currentPage4 - 1) * this.pageObj.pageSize + 1
      );
    },
    getUser() {
      http
        .getUser()
        .then(res => {
          this.userName = res.userName;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDict() {
      var dictionaryName = ["申请批次状态", "建筹上报责任单位"];
      let params = { names: dictionaryName.toString() };
      http
        .getDictionary(params)
        .then(res => {
          let resp = JSON.parse(res);
          this.stateArr = resp.申请批次状态;
          this.ascriptionoptions = resp.建筹上报责任单位;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.pageObj.pageSize = val;
      this.getWarehousingApply();
    },
    handleCurrentChange(val) {
      let Current = "Current";
      this.pageObj.currentPage4 = val;
      this.getWarehousingApply(Current);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //双击查看批次详情
    doubleClick(val) {
      let code;
      let guid = val.guid;
      code = "房源入库申请";
      let edit = val.state;
      let reportDistrictGuid = val.reportDistrictGuid
      let tempTab = {
        route: "/houseApplyTab" + "/" + code + "/" + guid + "/" + edit + "/" +reportDistrictGuid,
        name: val.subject,
      };
      this.openTopTab(tempTab);
    },
    //已办箱 待办箱
    qureyApplyList(val) {
      //分页查询参数，分页归至为1
      if (val != "Current") {
        this.pageObj.currentPage4 = 1;
      }
      let params = {
        businessName: this.businessName,
        accountableUnit: this.form.accountableUnit,
        code: this.form.code,
        pageIndex: this.pageObj.currentPage4,
        pageSize: this.pageObj.pageSize,
        reportUnit: this.form.reportUnit,
        state: this.form.state,
        subject: this.form.subject
      };
      http
        .getWarehousingApply(params)
        .then(res => {
          //已办箱1
          if (this.businessName == 1) {
            this.warehousingApplyListAlready = res.content.filter(item => {
              return item;
            });
            this.pageObj.total = res.totalElements;
          } else {
            //待办箱0
            this.warehousingApplyList = res.content.filter(item => {
              return item;
            });
            this.pageObj.total = res.totalElements;
          }
          this.warehousingApplyList.forEach(item => {
            item.reportDate = this.$getDate(item.reportDate);
            if (item.state === 2) {
              item.warning = 1;
            }
          });
          this.warehousingApplyListAlready.forEach(item => {
            item.reportDate = this.$getDate(item.reportDate);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //按条件查询入库申请
    getWarehousingApply() {
      let params = {
        businessName: this.businessName,
        accountableUnit: this.form.accountableUnit,
        code: this.form.code,
        pageIndex: this.pageObj.currentPage4,
        pageSize: this.pageObj.pageSize,
        reportUnit: this.form.reportUnit,
        state: this.form.state,
        subject: this.form.subject
      };
      http
        .getWarehousingApply(params)
        .then(res => {
          //已办箱1
          if (this.businessName == 1) {
            this.warehousingApplyListAlready = res.content.filter(item => {
              return item;
            });
            this.pageObj.total = res.totalElements;
          } else {
            //待办箱0
            this.warehousingApplyList = res.content.filter(item => {
              return item;
            });
            this.pageObj.total = res.totalElements;
          }
          this.warehousingApplyList.forEach(item => {
            item.reportDate = this.$getDate(item.reportDate);
            if (item.state === 2) {
              item.warning = 1;
            }
          });
          this.warehousingApplyListAlready.forEach(item => {
            item.reportDate = this.$getDate(item.reportDate);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取上报状态
    getStatusoptions() {
      var that = this;
      let params = {
        state: 1
      };
      http
        .getStatusoptions(params)
        .then(res => {
          that.options.statusoptions = tool.changeData(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取各种下拉框的函数
    getOptions(optionsName, optionsData) {
      var that = this;
      that.options[optionsName] = optionsData;
    },
    onload() {
      this.Event.$on("WarehousingApplication", data => {
        if (data.msg == "refresh") {
          this.getWarehousingApply();
        }
      });
      this.getWarehousingApply();
    }
  },
  created() {
    this.getDict();
    this.onload();
  }
};
</script>
<style lang="scss" scoped>
.ApplyDoneBox {
  .el-select {
    width: 100%;
  }
  .changci_content_left {
    p {
      margin: 10px 0px;
    }
  }
  .el-icon-warning {
    color: red;
  }
  .el-pagination {
    margin-top: 20px;
    text-align: right;
  }
  //总样式增加禁用文字居中，此处单独修改
  /deep/ .quarterMessage_box .el-input.is-disabled .el-input__inner {
    text-align: left;
  }
}
</style>