<!--
 * @Author: JinYaBei
 * @Date: 2019-10-05
 * @LastEditors: Please set LastEditors
 * @Description: 房改房 代办
 -->
<template>
  <!--房改房 待办-->
  <div>
    <div>
      <el-form
        size="mini"
        label-position="left"
        :model="form"
        label-width="5rem"
      >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="小区名称">
              <el-input
                clearable
                v-model="form.districtName"
                @change="getSearchListTodo(1)"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="申请时间">
              <el-date-picker
                type="date"
                v-model="form.applicationTimeBegin"
                value-format="yyyy-MM-dd"
                style="width: 45%"
                @change="getSearchListTodo(1)"
              ></el-date-picker>
              <span>至</span>
              <el-date-picker
                type="date"
                v-model="form.applicationTimeEnd"
                value-format="yyyy-MM-dd"
                style="width: 45%"
                @change="getSearchListTodo(1)"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button
              type="primary"
              size="mini"
              @click="getSearchListTodo(1)"
              v-if="hasPerm('fygl_fgflr_cx')"
              >查询</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="toolbar">
      <el-button
        type="primary"
        size="mini"
        @click="newRoomChangeRoom()"
        v-if="hasPerm('fygl_fgflr_xz')"
        >新增</el-button
      >
      <el-button
        slot="publicTitleLeft"
        size="mini"
        type="primary"
        @click="newCommunity"
        v-if="hasPerm('fygl_fgflr_xzxq')"
        >新增小区</el-button
      >
    </div>
    <div>
      <el-table
        :data="roomChangeRoomInfo"
        border
        size="mini"
        :header-cell-style="globalHeaderStyle"
        :cell-style="globalCellStyle"
      >
        <el-table-column
          label="序号"
          width="80"
          type="index"
          :index="indexMethod"
        ></el-table-column>
        <el-table-column prop="XQMC" label="小区名称"></el-table-column>
        <el-table-column prop="ZTS" label="上报房源总量"></el-table-column>
        <el-table-column prop="JBR" label="经办人"></el-table-column>
        <el-table-column label="申请时间">
          <template slot-scope="scope">{{
            scope.row.SQSJ | dateFormat
          }}</template>
        </el-table-column>
        <el-table-column prop="STATE" label="申请状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="jumpDetailPage(scope.row)"
              >办理</el-button
            >
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
      title="新增小区"
      :visible.sync="DialogVisible"
      width="60%"
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <TitleStylex title="小区信息"></TitleStylex>
      <div class="tableStyle">
        <table :model="communityDetail">
          <tr>
            <td class="must">小区编号</td>
            <td style="position: relative">
              <el-input
                size="mini"
                v-model="communityDetail.code"
                clearable
                disabled
              ></el-input>
              <el-button
                size="mini"
                type="primary"
                style="position: absolute; top: 5px; right: 3px"
                @click="getDistrictCode"
                >生成</el-button
              >
            </td>
            <td class="must">小区名称</td>
            <td>
              <el-input
                size="mini"
                v-model="communityDetail.name"
                clearable
                @change="createAddress"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="must">所在区</td>
            <td>
              <el-select
                style="width: 100%"
                placeholder
                size="mini"
                clearable
                v-model="communityDetail.area"
                @change="createAddress"
              >
                <el-option
                  v-for="(item, index) in areaData"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
            <td>所在街道</td>
            <td>
              <el-input
                size="mini"
                v-model="communityDetail.street"
                clearable
                @change="createAddress"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>路（门牌号）</td>
            <td>
              <el-input
                size="mini"
                v-model="communityDetail.roadName"
                clearable
                @change="createAddress"
              ></el-input>
            </td>
            <td class="must">详细地址</td>
            <td>
              <el-input
                size="mini"
                v-model="communityDetail.address"
                clearable
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>总建筑面积</td>
            <td style="position: relative">
              <el-input
                size="mini"
                v-model="communityDetail.totalCoveredArea"
                clearable
              ></el-input>
              <span style="position: absolute; top: 0px; right: 5px"
                >平方米</span
              >
            </td>
            <td>竣工时间</td>
            <td>
              <el-date-picker
                style="width: 100%"
                size="mini"
                type="date"
                v-model="communityDetail.finishConstructionTime"
                clearable
              ></el-date-picker>
            </td>
          </tr>
          <tr>
            <td>是否自管</td>
            <td>
              <el-select
                style="width: 100%"
                placeholder
                size="mini"
                clearable
                v-model="communityDetail.selfSupervise"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
            <td>是否自建</td>
            <td>
              <el-select
                style="width: 100%"
                placeholder
                size="mini"
                clearable
                v-model="communityDetail.selfBuilt"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>数据维护归属权</td>
            <td>
              <el-input
                size="mini"
                v-model="districtMaintainBelongName"
                clearable
                disabled
              ></el-input>
            </td>
            <td>小区详细说明</td>
            <td>
              <el-input
                size="mini"
                v-model="communityDetail.remark"
                clearable
              ></el-input>
            </td>
          </tr>
        </table>
        <div style="text-align: center; margin-top: 5px">
          <el-button @click="DialogVisible = false" size="mini"
            >取 消</el-button
          >
          <el-button type="primary" @click="addDistrict" size="mini"
            >确 定</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import api from "@/api/roomChangeRoomInput";
import http from "@/api/interface.js";
export default {
  name: "RoomChangeRoomInputTodoBox",
  data() {
    return {
      form: {
        businessName: "房改房录入",
        state: 0,
        districtName: "",
        applicationTimeBegin: "",
        applicationTimeEnd: "",
      }, //变更明细查询条件
      roomChangeRoomInfo: [], //房改房待办箱列表
      //分页需要的数据
      currentPage: 1,
      pageNo: 1,
      pageSize: 10,
      pageSizesList: [10, 20, 30, 40],
      totalNumber: 0, //数据的总数
      DialogVisible: false, // 新增小区弹窗是否显示
      areaData: [], //所在区下拉选择
      districtMaintainBelongName: "", //小区归属权的中文
      communityDetail: {
        code: "",
        name: "",
        area: "",
        street: "",
        roadName: "",
        address: "",
        totalCoveredArea: "",
        finishConstructionTime: "",
        selfSupervise: "",
        selfBuilt: "",
        districtMaintainBelong: "",
        remark: "",
      }, //小区详情
      options: [
        { value: true, label: "是" },
        { value: false, label: "否" },
      ], //是否下拉菜单
    };
  },
  methods: {
    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //新增
    newRoomChangeRoom() {
      let params = {};
      api
        .getBatchCode(params)
        .then((res) => {
          if (res) {
            let val = {};
            val.guid = res;
            val.state = "new";
            val.taskId = "new";

            this.openDetail(val);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //跳转到房改房详情的页面
    openDetail(val) {
      let tab = {
        route: "/roomChangeRoomInputDetail",
        query: {
          code: val.guid,
          state: val.state,
          taskId: val.taskId,
          activityName: val.activityName,
        },
        name: val.name || "新增房改房录入",
        type: "single",
      };
      this.openTopTab(tab);
    },
    //性质变更代办箱查询
    getSearchListTodo(index) {
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
        pageIndex: this.currentPage,
      };
      api
        .getSearchList(params)
        .then((res) => {
          this.roomChangeRoomInfo = res.content;
          this.totalNumber = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //新增小区
    newCommunity() {
      this.communityDetail = {
        code: "",
        name: "",
        area: "",
        street: "",
        roadName: "",
        address: "",
        totalCoveredArea: "",
        finishConstructionTime: "",
        selfSupervise: "",
        selfBuilt: "",
        districtMaintainBelong: "",
        remark: "",
      };
      this.DialogVisible = true;
      this.getUnit();
    },
    //获取数据维护归属权
    getUnit() {
      let params = {};
      api
        .getUnit(params)
        .then((res) => {
          this.communityDetail.districtMaintainBelong = res.value;
          this.districtMaintainBelongName = res.name;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //生产小区编号
    getDistrictCode() {
      let params = {};
      api
        .getDistrictCode(params)
        .then((res) => {
          this.communityDetail.code = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //新增小区确认
    addDistrict() {
      if (!this.communityDetail.code) {
        this.$message({
          message: "请填写小区编号",
          type: "info",
        });
      } else if (!this.communityDetail.name) {
        this.$message({
          message: "请填写小区名称",
          type: "info",
        });
      } else if (!this.communityDetail.area) {
        this.$message({
          message: "请填写所在区",
          type: "info",
        });
      } else if (!this.communityDetail.address) {
        this.$message({
          message: "请填写详细地址",
          type: "info",
        });
      } else {
        this.$confirm("此操作将进行保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            api
              .getBatchCode({})
              .then((res) => {
                let params = {
                  batchCode: res,
                  lx: "xzxq"
                };
                let data = this.communityDetail;
                api
                  .addDistrict(params, data)
                  .then((res) => {
                    if (res) {
                      api.addInfo(params).then(() => {
                        this.$message({
                          message: "保存成功",
                          type: "success",
                        });
                        this.DialogVisible = false;
                        this.getSearchListTodo();
                      });
                    }
                  })
                  .catch((err) => {
                    consoel.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消保存",
            });
          });
      }
    },
    //自动生成地址
    createAddress() {
      let name = "";
      if (this.areaData) {
        this.areaData.forEach((ele) => {
          if (ele.value == this.communityDetail.area) {
            name = ele.name;
          }
        });
      }
      this.communityDetail.address =
        name + this.communityDetail.street + this.communityDetail.roadName;
    },
    // pageSize改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.getSearchListTodo(1);
    },
    // currentPage改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSearchListTodo();
    },
    //领取任务
    openCahe(val) {
      let params = {
        taskId: val.TID,
      };
      api
        .openCache(params)
        .then((res) => {
          if (res) {
            let row = {
              guid: val.XMBS,
              state: "todo",
              taskId: val.TID,
              name: val.XQMC,
              activityName: val.ACTIVITYNAME,
            };
            this.openDetail(row);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 受理
    jumpDetailPage(val) {
      val.state = "todo";
      this.openCahe(val);
    },
    //获取字典数据
    getDictionary() {
      let nameData = ["所属区"];
      let params = { names: nameData.toString() };
      api
        .getDictionary(params)
        .then((res) => {
          res = JSON.parse(res);
          this.areaData = res.所属区;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.Event.$on("RoomChangeRoomInputTodoBox", (data) => {
      if (data == "getSearchListTodo") {
        this.getSearchListTodo();
      }
    });
    this.getSearchListTodo(); //查询
    this.getDictionary();
  },
};
</script>


<style lang="scss" scoped>
</style>
