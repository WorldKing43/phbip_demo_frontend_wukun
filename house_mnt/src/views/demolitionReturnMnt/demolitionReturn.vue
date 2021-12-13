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
                  <el-input
                    v-model="form.XIAOQMC"
                    clearable
                    @change="getDemolitionList(1)"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="栋名称">
                  <el-input
                    v-model="form.DONGMC"
                    clearable
                    @change="getDemolitionList(1)"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="栋号">
                  <el-input
                    v-model="form.DONGH"
                    clearable
                    @change="getDemolitionList(1)"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="房号">
                  <el-input
                    v-model="form.FANGH"
                    clearable
                    @change="getDemolitionList(1)"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="宗地号" label-width="4rem">
                  <el-input
                    v-model="form.ZONGDH"
                    clearable
                    @change="getDemolitionList(1)"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-button
                  type="primary"
                  size="mini"
                  @click="getDemolitionList(1)"
                  >查询</el-button
                >
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div>
          <el-button type="primary" size="mini" @click="downloadTemplate"
            >下载模板</el-button
          >
          <el-upload
            class="upload-demo"
            :http-request="importDemolition"
            :show-file-list="false"
            action=""
            accept=".xls,.xlsx,.csv"
          >
            <el-button size="mini" type="primary">导入</el-button>
          </el-upload>
        </div>
      </div>
      <!--结果列表-->
      <div class="table-list" style="margin-top: 10px; margin-bottom: 10px">
        <el-table
          :data="demolitionList"
          border
          ref="houseTable"
          size="mini"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column prop="XIAOQMC" label="小区名称"></el-table-column>
          <el-table-column prop="DONGMC" label="栋名称"></el-table-column>
          <el-table-column prop="DONGH" label="栋号"></el-table-column>
          <el-table-column prop="FANGH" label="房号"></el-table-column>
          <el-table-column prop="ZONGDH" label="宗地号"></el-table-column>
          <el-table-column prop="SUOZLC" label="所在楼层"></el-table-column>
          <el-table-column prop="JIANZMJ" label="建筑面积"></el-table-column>
          <el-table-column prop="FANGWLY" label="房屋来源"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="getDetail(scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <div class="page_box">
          <el-pagination
            style="text-align: right; margin-top: 15px"
            background
            @size-change="peoplepageSize"
            @current-change="peoplecurrentPage"
            :current-page="peoplehasPagination.currentPage"
            :page-sizes="peoplehasPagination.pageSizes"
            :page-size="peoplehasPagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="peoplehasPagination.total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="promptTitle"
      width="40%"
      append-to-body
    >
      <div style="height: 300px; overflow: auto">
        <li
          v-for="(item, index) in promptList"
          v-bind:key="index"
          style="font-size: 18px; line-height: 24px; height: 24px"
        >
          {{ item }}
        </li>
      </div>
      <div slot="footer" style="text-align: center">
        <el-button size="mini" @click="promptTitle = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="promptTitle = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/api/housestore.js";
import publicTitle from "@/components/TitleStylex"; //标题组件
export default {
  data() {
    return {
      peoplehasPagination: {
        currentPage: 1,
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        total: 0,
      },
      demolitionList: [],
      promptList: [], //错误信息列表
      form: {},
      promptTitle: false,//导入模板的错误提示弹框显隐
    };
  },
  components: {
    publicTitle,
  },
  methods: {
    downloadTemplate() {
      let params = process.env.API + "/demolition/template/download";
      window.open(params);
    },
    importDemolition(context) {
      let _params = {};
      let _data = new FormData();
      _data.append("file", context.file);
      let _config = { headers: { "Content-Type": "text/plain" } };
      http
        .importDemolition(_params, _data, _config)
        .then((res) => {
          if (res.data === undefined) {
            this.promptList = res;
            this.promptTitle = true;
          } else {
            this.importDialog = false;
            this.$message({
              type: "success",
              message: "导入模板成功",
            });
            this.getDemolitionList();
          }
        })
        .catch((err) => console.log(err));
    },
    getDemolitionList() {
      let params = {
        pageIndex: this.peoplehasPagination.currentPage,
        pageSize: this.peoplehasPagination.pageSize,
      };
      let _data = {
        XIAOQMC: this.form.XIAOQMC,
        DONGMC: this.form.DONGMC,
        FANGH: this.form.FANGH,
        ZONGDH: this.form.ZONGDH,
        DONGH: this.form.ZONGDH,
      };
      http
        .getDemolitionList(params, _data)
        .then((res) => {
          console.log(res);
          this.demolitionList = res.content;
          this.peoplehasPagination.total = res.totalElements;
        })
        .catch((err) => console.log(err));
    },
    getDetail(val) {
      let tab = {
        route: "/demolitionReturnDetail/" + val.GUID,
        name: val.XIAOQMC + val.DONGMC + val.FANGH,
        type: "single",
      };
      this.openTopTab(tab);
    },
    peoplepageSize(val) {
      this.peoplehasPagination.currentPage = 1;
      this.peoplehasPagination.pageSize = val;
      this.getDemolitionList();
    },
    peoplecurrentPage(val) {
      this.peoplehasPagination.currentPage = val;
      this.getDemolitionList();
    },
  },
  mounted() {
    this.getDemolitionList();
  },
};
</script>

<style lang="scss" scoped>
.upload-demo {
  display: inline-block;
  margin-left: 10px;
}
</style>
