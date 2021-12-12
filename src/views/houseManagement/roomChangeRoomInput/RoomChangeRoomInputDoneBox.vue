<!--
 * @Author: jyb
 * @Date: 2019-10-05 
 * @LastEditors: jyb
 * @Description: 房改房已办办箱
 -->
<template>
  <!--房改房待办箱 已办-->
  <div>
    <div>
      <el-form size="mini" label-position="left" :model="form" label-width="5rem">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="小区名称">
              <el-input clearable v-model="form.districtName" @change="getSearchListDone(1)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="申请时间">
              <el-date-picker
                type="date"
                v-model="form.applicationTimeBegin"
                value-format="yyyy-MM-dd"
                style="width:45%;"
                @change="getSearchListDone(1)"
              ></el-date-picker>
              <span>至</span>
              <el-date-picker
                type="date"
                v-model="form.applicationTimeEnd"
                value-format="yyyy-MM-dd"
                style="width:45%;"
                @change="getSearchListDone(1)"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button
              type="primary"
              size="mini"
              @click="getSearchListDone(1)"
              v-if="hasPerm('fygl_fgflr_cx')"
            >查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-table
        :data="roomChangeRoomInfo"
        border
        size="mini"
        :header-cell-style="globalHeaderStyle"
        :cell-style="globalCellStyle"
      >
        <el-table-column label="序号" width="80" type="index" :index="indexMethod"></el-table-column>
        <el-table-column prop="XQMC" label="小区名称"></el-table-column>
        <el-table-column prop="ZTS" label="上报房源总量"></el-table-column>
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
import { mapGetters, mapMutations } from "vuex";
import api from "@/api/roomChangeRoomInput";
export default {
  name: "RoomChangeRoomInputDoneBox",
  data() {
    return {
      form: {
        businessName: "房改房录入",
        state: 1,
        districtName: "",
        applicationTimeBegin: "",
        applicationTimeEnd: ""
      }, //变更明细查询条件
      roomChangeRoomInfo: [], //房改房已办箱列表
      //分页需要的数据
      currentPage: 1,
      pageNo: 1,
      pageSize: 10,
      pageSizesList: [10, 20, 30, 40],
      totalNumber: 0 //数据的总数
    };
  },
  computed: {},
  methods: {
    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //跳转到房改房详情的页面
    openDetail(val) {
      let tab = {
        route: "/roomChangeRoomInputDetail",
        query: {
          code: val.XMBS,
          state: val.state,
          taskId: val.TID,
          activityName: val.ACTIVITYNAME
        },
        name: val.XQMC || "新增房改房录入",
        type: "single"
      };
      this.openTopTab(tab);
    },
    //性质变更已办箱查询
    getSearchListDone(index) {
      if (index) {
        this.currentPage = index;
      }
      if (this.form.applicationTimeBegin) {
        this.form.applicationTimeBegin = this.form.applicationTimeBegin.toString();
      }
      if (this.form.applicationTimeEnd) {
        this.form.applicationTimeEnd = this.form.applicationTimeEnd.toString();
      }
      let params = {
        state: this.form.state,
        businessName: this.form.businessName,
        districtName: this.form.districtName,
        applicationTimeBegin: this.form.applicationTimeBegin,
        applicationTimeEnd: this.form.applicationTimeEnd,
        pageSize: this.pageSize,
        pageIndex: this.currentPage
      };
      api
        .getSearchList(params)
        .then(res => {
          this.roomChangeRoomInfo = res.content;
          this.totalNumber = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // pageSize改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.getSearchListDone(1);
    },
    // currentPage改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSearchListDone();
    },
    //查看
    check(val) {
      val.state = "done";
      this.openDetail(val);
    },
    //领取任务
    openCahe(val) {
      let params = {
        taskId: val.TID
      };
      api
        .openCache(params)
        .then(res => {
          console.log("领取任务成功");
          if (res) {
            let row = {
              guid: val.XMBS,
              state: "todo",
              taskId: val.TID,
              name: val.XQMC
            };
            this.openDetail(row);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getSearchListDone(); //查询
    this.Event.$on("RoomChangeRoomInputDoneBox", data => {
      if(data == 'getSearchListDone') this.getSearchListDone() //刷新广播接收
    })
  }
};
</script>


<style lang="scss" scoped>
</style>
