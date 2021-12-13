<template>
  <div id="housetransfer" class="page-detail">
    <div class="content">
      <div class="contentColor">
        <div class="top">
          <el-form
            :model="form"
            size="mini"
            class="form-inline"
            label-width="3rem"
          >
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="小区">
                  <el-autocomplete
                    class="inline-input"
                    v-model="form.name"
                    :fetch-suggestions="getCommunitySelectList"
                    placeholder="请输入内容"
                    :trigger-on-focus="false"
                    :clearable="true"
                    style="width: 100%"
                    popper-class="select-option"
                    @select="getNeighbourhoodList(1)"
                  ></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所在区" label-width="3.5rem">
                  <el-select
                    v-model="form.area"
                    clearable
                    placeholder
                    style="width: 100%"
                    @change="getNeighbourhoodList(1)"
                  >
                    <el-option
                      v-for="item in areaData"
                      :key="item.id"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="总建筑面积" label-width="5.5rem">
                  <el-row :gutter="0">
                    <el-col :span="10">
                      <el-input
                        v-model="form.minTotalArea"
                        clearable
                        @change="getNeighbourhoodList(1)"
                      ></el-input>
                    </el-col>
                    <el-col class="line" :span="4" style="text-align: center"
                      >-</el-col
                    >
                    <el-col :span="10">
                      <el-input
                        v-model="form.maxTotalArea"
                        clearable
                        @change="getNeighbourhoodList(1)"
                      ></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="数据维护权归属" label-width="7.5rem">
                  <el-select
                    v-model="form.belongArea"
                    clearable
                    placeholder
                    style="width: 100%"
                    filterable
                    @change="getNeighbourhoodList(1)"
                  >
                    <el-option
                      v-for="item in belongAreaData"
                      :key="item.id"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-button
                  type="primary"
                  @click="newReport"
                  size="mini"
                  v-if="hasPerm('fygl_fyfwk_dcsj')"
                  >导出数据</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  v-if="hasPerm('fygl_fyfwk_xqwhgs')"
                  @click="openMaintenancebelongDialog"
                  >小区维护归属</el-button
                >
                <el-button type="primary" size="mini" @click="handleRights"
                  >房改房权属管理</el-button
                >
                <el-button type="primary" size="mini" @click="getReliefResult"
                  >获取救济结果</el-button
                >
              </el-col>
              <el-col :span="12" style="text-align: right">
                <el-button
                  type="primary"
                  size="mini"
                  @click="getNeighbourhoodList(1)"
                  >查询</el-button
                >
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div style="margin-bottom: 10px"></div>
        <div>
          <el-table
            :data="tableData"
            border
            @cell-dblclick="goDetail"
            :header-cell-style="globalHeaderStyle"
            :cell-style="globalCellStyle"
          >
            <el-table-column
              type="index"
              :index="indexMethod"
              label="序号"
              width="60px"
            ></el-table-column>
            <el-table-column prop="code" label="小区号"></el-table-column>
            <el-table-column prop="name" label="小区名称"></el-table-column>
            <el-table-column prop="areaName" label="所在区"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column
              prop="totalCoveredArea"
              label="总建筑面积"
            ></el-table-column>
            <el-table-column
              prop="districtMaintainBelongName"
              label="数据维护权归属"
            ></el-table-column>
          </el-table>
          <!-- 分页功能 -->
          <div class="page_box" style="background: white">
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
    </div>
    <!-- 小区维护归属弹框 -->
    <el-dialog
      title="小区维护归属"
      :visible.sync="maintenancebelongDialog"
      width="60%"
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <div class="tableStyle">
        <TitleStylex title="请选择小区">
          <el-button
            type="primary"
            size="mini"
            slot="publicTitleLeft"
            @click="openCommunityListDialog"
            >选择</el-button
          >
        </TitleStylex>
        <table class="detail" :model="selectedData">
          <tr>
            <td>小区号</td>
            <td>
              <el-input
                size="mini"
                disabled
                v-model="selectedData.code"
              ></el-input>
            </td>
            <td>小区名称</td>
            <td>
              <el-input
                size="mini"
                disabled
                v-model="selectedData.name"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td>
              <el-input
                size="mini"
                disabled
                v-model="selectedData.address"
              ></el-input>
            </td>
            <td>数据维护权</td>
            <td>
              <el-input
                size="mini"
                disabled
                v-model="selectedData.districtMaintainBelongName"
              ></el-input>
            </td>
          </tr>
        </table>
        <TitleStylex title="请选择新的维护归属"></TitleStylex>
        <table class="detail" :model="changeAfter">
          <tr>
            <td class="must" style="width: 30%">请选择新的小区数据维护权</td>
            <td colspan="3" style="width: 70%">
              <el-select
                v-model="changeAfter.changeMaintainBelong"
                clearable
                placeholder
                style="width: 100%"
              >
                <el-option
                  v-for="item in belongAreaData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="must" style="width: 30%">请填写变更依据</td>
            <td colspan="3" style="width: 70%">
              <el-input
                size="mini"
                clearable
                v-model="changeAfter.changBasis"
              ></el-input>
            </td>
          </tr>
        </table>
        <div style="text-align: center; margin-top: 5px">
          <el-button type="primary" size="mini" @click="saveMaintain"
            >确 定</el-button
          >
        </div>
      </div>
    </el-dialog>
    <div v-if="isShowRights">
      <el-dialog
        title="房改房权属管理"
        :visible.sync="isShowRights"
        width="95%"
        :close-on-click-modal="false"
      >
        <FgRightsDiaod @isShow="closeDialog"></FgRightsDiaod>
      </el-dialog>
    </div>
    <!-- 选择弹框 -->
    <el-dialog
      title="请选择小区"
      :visible.sync="communityListDialog"
      width="80%"
      :close-on-click-modal="false"
    >
      <el-form :model="formDialog" size="mini" label-width="3rem">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="小区">
              <el-autocomplete
                class="inline-input"
                v-model="formDialog.name"
                :fetch-suggestions="getCommunitySelectListDialog"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                :clearable="true"
                style="width: 100%"
                popper-class="select-option"
                @select="getCommunityList(1)"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="所在区" label-width="3.5rem">
              <el-select
                v-model="formDialog.area"
                clearable
                placeholder
                style="width: 100%"
                @change="getCommunityList(1)"
              >
                <el-option
                  v-for="item in areaData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="总建筑面积" label-width="5.5rem">
              <el-row :gutter="0">
                <el-col :span="10">
                  <el-input
                    v-model="formDialog.minTotalArea"
                    clearable
                    @change="getCommunityList(1)"
                  ></el-input>
                </el-col>
                <el-col class="line" :span="4" style="text-align: center"
                  >-</el-col
                >
                <el-col :span="10">
                  <el-input
                    v-model="formDialog.maxTotalArea"
                    clearable
                    @change="getCommunityList(1)"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="数据维护权归属" label-width="7.5rem">
              <el-select
                v-model="formDialog.belongArea"
                clearable
                placeholder
                style="width: 100%"
                @change="getCommunityList(1)"
              >
                <el-option
                  v-for="item in belongAreaData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" size="mini" @click="getCommunityList(1)"
              >查询</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <div class="table">
        <el-table
          :data="communityList"
          ref="newCorrectInfo"
          @row-click="chooseInfo"
          border
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column label="#" width="50" align="center">
            <template slot-scope="scope">
              <el-radio class="radio" v-model="radio" :label="scope.$index"
                >&nbsp;</el-radio
              >
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="60px"
          ></el-table-column>
          <el-table-column prop="code" label="小区号"></el-table-column>
          <el-table-column prop="name" label="小区名称"></el-table-column>
          <el-table-column prop="areaName" label="所在区"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column
            prop="totalCoveredArea"
            label="总建筑面积(平方米)"
          ></el-table-column>
          <el-table-column
            prop="districtMaintainBelongName"
            label="数据维护权归属"
          ></el-table-column>
        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="handleCommunitySizeChange"
            @current-change="handleCommunityCurrentChange"
            :current-page="communityListPage.currentPage"
            :page-sizes="communityListPage.pageSizesList"
            :page-size="communityListPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="communityListPage.totalNumber"
            background
          ></el-pagination>
        </div>
      </div>
      <div slot="footer" style="text-align: center">
        <el-button @click="getCommunitySelect()" type="primary" size="mini"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/api/housestore.js";
import api from "@/api/house.js";
import publicMethod from "@/api/publicMethod.js";
import TitleStylex from "@/components/TitleStylex";
import FgRightsDiaod from "./dialog/FgRightsDiaod"; //使用权变更
import common from "@/api/common.js";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  components: {
    TitleStylex,
    FgRightsDiaod,
  },
  data() {
    return {
      isShow: true,
      form: {}, //表单
      tableData: [], //表格
      //分页需要的数据
      currentPage: 1,
      pageSize: 100,
      pageSizesList: [100, 200, 500, 1000],
      totalNumber: 0, //数据的总数
      val: "1",
      belongAreaData: [], //数据维护归属-下拉
      areaData: [], //区域数据-下拉
      selectCommunityOptions: [], //选中的数据
      selectCommunityOptionsDialog: [],
      maintenancebelongDialog: false, //维护归属弹框
      formDialog: {}, //弹框表单查询条件
      communityList: [], //小区列表
      communityListPage: {
        currentPage: 1,
        pageSize: 20,
        pageSizesList: [10, 20, 30, 40],
        totalNumber: 0,
      },
      communityListDialog: false, //小区列表弹框
      radio: "", //是否选中某条数据
      selectedData: {}, //选中的数据
      allCommunityList: [], //所有小区列表
      changeAfter: {
        changeMaintainBelong: "",
        changBasis: "",
      },
      isShowRights: false, //使用权变更
    };
  },
  methods: {
    handleRights() {
      this.isShowRights = true;
    },
    //关闭弹框
    closeDialog() {
      this.isShowRights = false;
    },
    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //得到所有小区
    getCommunitySelectListDialog(str, cb) {
      let params = {
        searchContent: this.formDialog.name,
      };
      publicMethod
        .getCommunityList(params)
        .then((res) => {
          for (let i of res) {
            i.value = i.districtNameNo;
          }
          this.selectCommunityOptionsDialog = res; //将结果存入下拉小区数据中
          if (this.selectCommunityOptionsDialog.length === 0) {
            this.selectCommunityOptionsDialog = [{ value: "暂无数据" }];
          }
          cb(this.selectCommunityOptionsDialog);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //小区模糊查询
    getCommunitySelectList(str, cb) {
      let params = {
        searchContent: this.form.name,
      };
      publicMethod
        .getCommunityList(params)
        .then((res) => {
          for (let i of res) {
            i.value = i.districtNameNo;
          }
          this.selectCommunityOptions = res; //将结果存入下拉小区数据中
          if (this.selectCommunityOptions.length === 0) {
            this.selectCommunityOptions = [{ value: "暂无数据" }];
          }
          cb(this.selectCommunityOptions);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //导出数据
    newReport() {
      let url = process.env.API + "/house/store/district/page/export";
      var elemIF = document.createElement("iframe");
      elemIF.src = url;
      elemIF.style.display = "none";
      elemIF.onload = function () {
        setTimeout(function () {
          elemIF.remove();
        }, 2000);
      };
      document.body.appendChild(elemIF);
    },
    //分页大小改变
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getNeighbourhoodList();
    },
    // 页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getNeighbourhoodList();
    },
    //打开小区维护归属弹框
    openMaintenancebelongDialog() {
      this.maintenancebelongDialog = true;
    },
    //打开小区列表弹框
    openCommunityListDialog() {
      this.communityListDialog = true;
      this.getCommunityList();
    },
    //得到小区列表
    getCommunityList(index) {
      if (index) {
        this.communityListPage.currentPage = index;
      }
      let params = {
        area: this.formDialog.area, //区域
        pageIndex: this.communityListPage.currentPage,
        pageSize: this.communityListPage.pageSize,
        belongArea: this.formDialog.belongArea, //维护归属
        name: this.formDialog.name, //小区名称
        minTotalArea: this.formDialog.minTotalArea, //小面积
        maxTotalArea: this.formDialog.maxTotalArea, //小面积
        code: this.formDialog.code, //小区号
        street: this.formDialog.street, //街道
      };
      api
        .getPage(params)
        .then((res) => {
          this.communityList = res.content;
          this.communityListPage.totalNumber = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //小区列表每页大小变化
    handleCommunitySizeChange(val) {
      this.communityListPage.pageSize = val;
      this.getCommunityList(1);
    },
    //小区列表第几页变化
    handleCommunityCurrentChange(val) {
      this.communityListPage.currentPage = val;
      this.getCommunityList();
    },
    //选中
    chooseInfo(val) {
      this.communityList.forEach((item, index) => {
        if (item.guid === val.guid) {
          this.radio = index;
          this.selectedData = val;
        }
      });
    },
    //得到选中的小区
    getCommunitySelect() {
      this.communityListDialog = false;
    },
    //保存修改的数据维护权
    saveMaintain() {
      if (!this.selectedData.guid) {
        this.$message("请选择小区之后,在确定");
      } else if (!this.changeAfter.changeMaintainBelong) {
        this.$message("请选择新的小区数据维护权");
      } else if (!this.changeAfter.changBasis) {
        this.$message("请填写变更依据");
      } else {
        let params = {
          districtGuid: this.selectedData.guid,
          changeMaintainBelong: this.changeAfter.changeMaintainBelong,
          changBasis: this.changeAfter.changBasis,
        };
        api
          .saveMaintain(params)
          .then((res) => {
            this.maintenancebelongDialog = false;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    goDetail(val) {
      let tab = {
        label: val.name,
        name: "housinginfo",
        params: {
          guid: val.guid,
          code: val.code,
        },
      };
      this.openTopTab(tab);
    },
    //分页获取小区列表
    getNeighbourhoodList(index) {
      if (index) {
        this.currentPage = index;
      }
      let params = {
        area: this.form.area, //区域
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        belongArea: this.form.belongArea, //维护归属
        name: this.form.name, //小区名称
        minTotalArea: this.form.minTotalArea, //小面积
        maxTotalArea: this.form.maxTotalArea, //小面积
        code: this.form.code, //小区号
        street: this.form.street, //街道
        maintainType: this.form.maintainType,
      };
      api
        .getPage(params)
        .then((res) => {
          this.tableData = res.content;
          this.totalNumber = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取字典数据
    getDictionary() {
      let nameData = ["所属区", "数据维护权归属"];
      let params = {
        names: nameData.toString(),
      };
      http
        .getDictionary(params)
        .then((res) => {
          res = JSON.parse(res);
          this.areaData = res.所属区;
          this.belongAreaData = res.数据维护权归属;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getReliefResult() {
      this.$confirm("此操作将获取更新救济服务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {};
          common
            .getReliefResult(params)
            .then((res) => {
              
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消获取更新",
          });
        });
    },
  },
  created() {
    this.getDictionary(); //获取字典数据
  },
  mounted() {
    this.getNeighbourhoodList(); //分页获取小区列表
    this.getDictionary(); //获取字典数据
  },
};
</script>

<style lang="scss" scoped>
#housetransfer {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
