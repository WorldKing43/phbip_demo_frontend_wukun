<template>
  <div class="houseReturn">
    <el-form size="mini" v-model="form">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="批次代码" label-width="5rem">
            <el-input class="w100" v-model="form.batchCode" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="批次名称" label-width="5rem">
            <el-input class="w100" v-model="form.batchName" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="单位名称" label-width="5rem">
            <el-input class="w100" v-model="form.unitName" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否退回" label-width="5rem">
            <!-- <el-input class='w100' v-model='form.isReturn' clearable></el-input> -->
            <el-select class="w100" v-model="form.isReturn">
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="统一社会信用代码" label-width="8rem">
            <el-input class="w100" v-model="form.uscc" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="批次制定时间" label-width="6rem">
            <el-date-picker
              class="w100"
              type="date"
              v-model="form.createTimeBegin"
              style="width: 43%"
            ></el-date-picker>
            <span>至</span>
            <el-date-picker
              class="w100"
              type="date"
              v-model="form.createTimeEnd"
              style="width: 43%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="合同签订状态" label-width="6rem">
            <el-select class="w100" v-model="form.signState" clearable>
              <el-option
                v-for="item in stateList"
                :laeel="item.name"
                :value="item.value"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button size="mini" type="primary" @click="search()">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="planmanage-conten">
      <el-table :data="tableData" border size="mini" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="batchCode" label="批次代码"></el-table-column>
        <el-table-column prop="batchName" label="批次名称"></el-table-column>
        <el-table-column prop="unitName" label="单位名称"></el-table-column>
        <el-table-column prop="uscc" label="统一社会信用代码"></el-table-column>
        <el-table-column prop="createTime" label="批次制定时间"></el-table-column>
        <el-table-column prop="signState" label="合同签订状态"></el-table-column>
        <el-table-column prop="originalCount" label="原分配房数"></el-table-column>
        <el-table-column prop="nowCount" label="现分配房数"></el-table-column>
        <el-table-column label="已退回">
          <el-table-column prop="registerCount" label="登记环节"></el-table-column>
          <el-table-column prop="signCheckCount" label="签约审核环节"></el-table-column>
          <el-table-column prop="signCount" label="签约环节"></el-table-column>
        </el-table-column>
        <el-table-column label="是否退回" prop="isReturn"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="goDetail(scope.row)"
              :disabled="scope.row.signState === '已签约'? true : false"
            >退回</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <div class="block" align="right">
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
import http from "@/api/housestore.js";
import { mapGetters } from "vuex";
export default {
  name: "houseReturn",
  data() {
    return {
      //分页需要的数据
      currentPage: 1,
      // pageNo: 1,
      pageSize: 20,
      pageSizesList: [20, 50, 100, 200],
      totalDataNumber: 0, //数据的总数
      form: {
        batchCode: "",
        batchName: "",
        unitName: "",
        uscc: "",
        createTimeBegin: "",
        createTimeEnd: "",
        signState: "",
        isReturn: ""
      },
      tableData: [],
      stateList: [], //签订状态下拉框
      returnYesOrNo: false
    };
  },
  computed: {
    openTab() {
      return this.$store.state.openTab;
    },
    activeIndex: {
      get() {
        return this.$store.state.activeIndex;
      },
      set(val) {
        this.$store.commit("set_active_index", val);
      }
    }
  },
  methods: {
    //获取字典
    getDictionary() {
      let nameData = ["退房合同签订状态"];
      let params = {
        names: nameData.toString()
      };
      http
        .getDictionary(params)
        .then(res => {
          res = JSON.parse(res);
          this.stateList = res.退房合同签订状态;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查询
    search() {
      let params = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      let data = this.form;
      http
        .returnHouseSearch(params, data)
        .then(res => {
          console.log(res);
          this.tableData = res.content;
          this.totalDataNumber = res.totalElements;
          res.signState == "已签约"
            ? (this.returnYesOrNo = true)
            : (this.returnYesOrNo = false);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //双击前往详情页面
    goDetail(val) {
      let tab = {
        route: "/houseReturnCom" + "/" + val.guid,
        name: val.batchCode,
        type: "single"
      };
      this.openTopTab(tab);
    },
    //分页大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.search();
    },
    // 页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    }
  },
  mounted() {
    this.getDictionary(); //查询字典
    this.search();
  }
};
</script>
<style lang="scss" scoped>
.houseReturn {
  margin: 20px;
}
.w100 {
  width: 100%;
}
.planmanage-conten {
  padding-top: 5px;
  background: #fff;
}
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
.el-table /deep/ td,
.el-table /deep/ th {
  text-align: center;
}
.el-table /deep/ th {
  background: #e6f0fc;
  border-right: 1px solid #d0cdc7;
  border-bottom: 1px solid #d0cdc7;
}
.el-table /deep/ td {
  border-right: 1px solid #d0cdc7;
  border-bottom: 1px solid #d0cdc7;
}
.el-table {
  border: 1px solid #d0cdc7;
}
/deep/ .el-table thead.is-group th {
  background: #e6f0fc;
}
.el-pagination {
  margin-top: 15px;
}
</style>

