<!--
 * @Author: JinYaBei
 * @Date: 2019-10-05 
 * @LastEditors: Please set LastEditors
 * @Description: 房源房屋库性质变更
 -->
<template>
  <!--房源房屋库性质变更 待办-->
  <div class="NatureChangeTodoBox">
    <div class="search_box">
      <el-form size="mini" label-position="left" :model="form">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="批次名称" label-width="5rem">
              <el-input clearable v-model="form.batchName" @change="natureChangeTodoSearch(1)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="申请时间" label-width="5rem">
              <el-date-picker
                type="date"
                v-model="form.minDateTime"
                value-format="yyyy-MM-dd"
                style="width:45%;"
                @change="natureChangeTodoSearch(1)"
              ></el-date-picker>
              <span>至</span>
              <el-date-picker
                type="date"
                v-model="form.maxDateTime"
                value-format="yyyy-MM-dd"
                style="width:45%;"
                @change="natureChangeTodoSearch(1)"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button
              type="primary"
              size="mini"
              @click="natureChangeTodoSearch(1)"
              v-if="hasPerm('fygl_fycqbg_cx')"
            >查询</el-button>
            <el-button size="mini" @click="reset" v-if="hasPerm('fygl_fycqbg_cz')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row class="toolbar">
      <el-button
        type="primary"
        size="mini"
        @click="newNatrueChange()"
        v-if="hasPerm('fygl_fycqbg_xzcqbgpc')"
      >新增产权变更申请批次</el-button>
    </el-row>
    <div class="table">
      <el-table
        :data="natureChangeInfo"
        border
        :header-cell-style="globalHeaderStyle"
        :cell-style="globalCellStyle"
      >
        <el-table-column label="序号" width="80" type="index" :index="indexMethod"></el-table-column>
        <el-table-column prop="XMBS" label="批次编号"></el-table-column>
        <el-table-column prop="XMMC" label="批次名称"></el-table-column>
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
              @click="check(scope.row)"
              v-if="hasPerm('fygl_fycqbg_ck')"
            >查看</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="jumpDetailPage(scope.row)"
              v-if="hasPerm('fygl_fycqbg_jxbl')"
            >继续办理</el-button>
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
import { mapGetters, mapMutations } from "vuex";
import { formatDate } from "@/components/js/date"; //时间过滤
import api from "@/api/natureChange";
import http from "@/api/housestore";
export default {
  name: "NatrueChangeTodoBox",
  data() {
    return {
      form: {
        businessName: "房源产权变更",
        pageIndex: 1,
        pageSize: 10,
        state: 0
      }, //变更明细查询条件
      natureChangeInfo: [], //性质变更列表
      //分页需要的数据
      currentPage: 1,
      pageNo: 1,
      pageSize: 10,
      pageSizesList: [10, 20, 30, 40],
      totalNumber: 0 //数据的总数
    };
  },
  computed: {
    ...mapGetters(["openTab"]),
    activeIndex: {
      get() {
        return this.$store.state.activeIndex;
      },
      set(val) {
        this.$store.commit("set_active_index", val);
      }
    },
    openTab() {
      return this.$store.state.openTab;
    }
  },
  methods: {
    ...mapMutations(["add_tabs", "set_active_tab", "add_children_tab"]),
    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //性质变更代办箱查询
    natureChangeTodoSearch(index) {
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
      api
        .natureChangeTodoSearch(params)
        .then(res => {
          this.natureChangeInfo = res.content;
          this.totalNumber = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // pageSize改变
    handleSizeChange(val) {
      this.form.pageIndex = 1;
      this.form.pageSize = val;
      this.natureChangeTodoSearch();
    },
    // currentPage改变
    handleCurrentChange(val) {
      this.form.pageIndex = val;
      this.natureChangeTodoSearch();
    },
    // 重置
    reset() {
      this.form = {
        businessName: "房源产权变更",
        pageIndex: 1,
        pageSize: 10,
        state: 0
      };
    },

    // 新增性质变更申请批次
    newNatrueChange() {
      let flag = false;
      let val = {};
      // val.XMBS = "新增";
      val.TID = "new";
      val.state = "new";
      this.openDetail(val);
    },

    //跳转到性质信息的页面
    openDetail(row) {
      row = row || {};
      let tab = {
        label: row.XMBS || "新增产权变更申请批次",
        name: "propertyRightChangeTab",
        params: {
          guid: row.XMBS || "new",
          taskId: row.TID
        },
        query: {
          state: row.state
        }
      };
      this.openTopTab(tab);
    },

    //查看
    check(val) {
      let flag = false;
      val.state = "done";
      this.openDetail(val);
    },
    //领取任务
    openCahe(val) {
      let params = {
        taskId: val.TID
      };
      http
        .openCache(params)
        .then(res => {
          console.log("领取任务成功");
          if (res) {
            this.openDetail(val);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 受理，
    jumpDetailPage(val) {
      val.state = "todo";
      this.openCahe(val);
    }
  },
  mounted() {
    this.Event.$on("toreload", data => {
      if (data == "makeChange") {
        this.natureChangeTodoSearch();
      }
    });
    this.Event.$on("NatureChangeTodoBox", data => {
      if (data == "natureChangeTodoSearch") {
        this.natureChangeTodoSearch();
      }
    });
    this.natureChangeTodoSearch(); //查询
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
.NatureChangeTodoBox {
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

