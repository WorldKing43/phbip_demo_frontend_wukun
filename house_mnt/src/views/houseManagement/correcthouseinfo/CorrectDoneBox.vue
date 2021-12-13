<!--
 * @Author: JinYaBei
 * @Date: 2019-10-05 
 * @LastEditors: Please set LastEditors
 * @Description: 房源信息勘误代办
 -->
<template>
  <!--房源信息勘误 待办-->
  <div class="CorrectDoneBox">
    <div class="search">
      <el-form size="mini" label-position="left" :model="form">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="勘误小区名称" label-width="7rem">
              <el-input clearable v-model="form.districtName" @change="correctDoneSearch(1)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="申请时间" label-width="5rem">
              <el-date-picker
                type="date"
                v-model="form.minDateTime"
                value-format="yyyy-MM-dd"
                style="width:45%;"
                @change="correctDoneSearch(1)"
              ></el-date-picker>
              <span>至</span>
              <el-date-picker
                type="date"
                v-model="form.maxDateTime"
                value-format="yyyy-MM-dd"
                style="width:45%;"
                @change="correctDoneSearch(1)"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button
              type="primary"
              size="mini"
              @click="correctDoneSearch(1)"
              v-if="hasPerm('fygl_fyxxkw_cx')"
            >查询</el-button>
            <el-button size="mini" @click="reset" v-if="hasPerm('fygl_fyxxkw_cz')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
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
            <el-button type="primary" size="mini" @click="check(scope.row)">查看</el-button>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import http from "@/api/common";
import https from "@/api/housestore.js";
import { formatDate } from "@/components/js/date"; //时间过滤
export default {
  data() {
    return {
      correntInfo: [], //勘误信息已办箱
      form: {
        businessName: "房源信息勘误",
        pageIndex: 1,
        pageSize: 20,
        state: 1
      }, //勘误代办箱查询条件
      //分页需要的数据
      currentPage: 1,
      pageNo: 1,
      pageSize: 20,
      pageSizesList: [20, 50, 100, 200],
      totalNumber: 0, //数据的总数
      params_name: "",
      clickDialog: false, //双击对话框
      personInfo: {}
    };
  },
  components: {},
  methods: {
    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //已办箱查询
    correctDoneSearch(index) {
      if (index) {
        this.form.pageIndex = index;
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
    // 重置
    reset() {
      this.form = {
        businessName: "房源信息勘误",
        pageIndex: 1,
        pageSize: 20,
        state: 1
      };
    },
    //查看
    check(val) {
      val.operator = "done";
      this.openDetail(val);
    },
    // pageSize改变
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.correctDoneSearch(1);
    },
    // currentPage改变
    handleCurrentChange(val) {
      this.form.pageIndex = val;
      this.correctDoneSearch();
    },
    //跳转到小区页面
    openDetail(row) {
      row = row || {};
      let tab = {
        label: row.XMMC || "新增房源信息勘误申请",
        name: "correctHouseInfoTab",
        type: "single",
        params: {
          guid: row.XMBS || "new",
          taskId: row.TID,
          state: row.operator
        }
      };
      this.openTopTab(tab);
    }
  },
  mounted() {
    this.correctDoneSearch(); //查询
    this.Event.$on('CorrectDoneBox', data => {
      if(data == 'correctDoneSearch') {
        this.correctDoneSearch() //已办箱刷新广播接收
      }
    })
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
.CorrectDoneBox {
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
