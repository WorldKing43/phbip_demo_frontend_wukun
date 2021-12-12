<!--栋信息-->
<template>
  <div class="buildingInformation">
    <div>
      <!--查询栏-->
      <div class="top">
        <el-form ref="form" :model="form" label-width="5rem" size="mini">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="栋号">
                <el-input v-model="form.code" clearable @change="query(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="栋名称">
                <el-input v-model="form.buildName" clearable @change="query(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否带电梯" label-width="6rem">
                <el-select
                  v-model="form.elevator"
                  placeholder="--请选择--"
                  class="w100"
                  clearable
                  @change="query(1)"
                >
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item) in options"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="总楼层数">
                <el-input v-model="form.floorCount" clearable @change="query(1)"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="裙楼层数">
                <el-input v-model="form.skirtFloorCount" clearable @change="query(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="宗地号">
                <el-input v-model="form.landNo" clearable @change="query(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-button
                  type="primary"
                  class="float"
                  size="mini"
                  @click="query(1)"
                  v-if="hasPerm('fygl_rksp_dxx_cx')"
                >查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!--结果列表-->
      <div class="table-list">
        <el-table
          :data="tableData"
          border
          @cell-dblclick="goDetail"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column type="index" :index="indexMethod" label="序号" width="50px"></el-table-column>
          <el-table-column prop="districtName" label="小区名称"></el-table-column>
          <el-table-column prop="code" label="栋号"></el-table-column>
          <el-table-column prop="name" label="栋名称"></el-table-column>
          <el-table-column prop="elevatorName" label="是否带电梯"></el-table-column>
          <el-table-column prop="floorCount" label="总楼层数"></el-table-column>
          <el-table-column prop="skirtFloorCount" label="裙楼层数"></el-table-column>
          <el-table-column prop="landNo" label="宗地号"></el-table-column>
        </el-table>
      </div>
    </div>
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
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/api/houseApproval.js";
import api from "@/api/housestore.js";
export default {
  name: "buildingInformation",
  data() {
    return {
      form: {
        code: "", //栋号
        buildName: "", //栋名称
        elevator: "", //是否带电梯
        floorCount: "", //总楼层数
        landNo: "", //宗地号
        skirtFloorCount: "" //裙楼层数
      },
      //分页信息
      totalNumber: 100,
      pageSize: 50,
      currentPage: 1,
      pageSizesList: [50, 100, 200, 500, 1000],
      options: [
        { value: true, label: "是", name: "是" },
        { value: false, label: "否", name: "否" }
      ],
      //表格假数据
      tableData: [],
      houseType: [] //住宅类型下拉框
    };
  },
  methods: {
    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    getListbuildingPrepare() {
      //下拉菜单
      let namesArr = ["住宅类型"];
      let params = {
        names: namesArr.toString()
      };
      api
        .getDictionary(params)
        .then(res => {
          this.houseType = JSON.parse(res).住宅类型;
        })
        .catch(err => {
          console.log(err);
        });
    },
    query(index) {
      if (index) {
        this.currentPage = index;
      }
      let _params = {};
      _params = {
        guid: this.$parent.params.reportGuid,
        landNo: this.form.landNo,
        code: this.form.code,
        buildName: this.form.buildName,
        elevator: this.form.elevator,
        floorCount: this.form.floorCount,
        skirtFloorCount: this.form.skirtFloorCount,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      console.log(_params);
      http
        .getBuildingInfo(_params)
        .then(res => {
          this.tableData = res.content;
          this.totalNumber = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //分页大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.query(1);
    },
    // 页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.query();
    },
    goDetail(val) {
      this.$parent.openTab({
        id: val.guid,
        label: val.name || "栋详情",
        closable: true,
        meta: {
          dongGuid: val.guid,
          menuId: "4"
        },
        component: () =>
          import(
            "@/views/houseManagement/houseapproval/approvalDetails/building/BuildDetails"
          )
      });
    }
  },
  mounted() {
    this.getListbuildingPrepare();
    this.query();
  }
};
</script>

<style lang="scss" scoped>
.buildingInformation {
  .top {
    padding: 20px 10px;
    .el-form {
      width: 100%;
      .w100 {
        width: 100%;
      }
    }
  }
  .table-list {
    & /deep/ .el-table__body tr.current-row > td {
      background: #f7f1ec !important;
    }
    & /deep/ .el-table--border {
      border-color: #dbdbdb;
    }
  }
  .pagination {
    /*分页*/
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .block {
    margin-top: 10px;
  }
}
</style>
