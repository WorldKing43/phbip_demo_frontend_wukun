<!--房源信息-->
<template>
  <div class="housingInformation">
    <div>
      <div class="top">
        <el-form ref="form" :model="form" label-width="5rem" size="mini" label-position="right">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="栋名称" prop="buildName">
                <el-input v-model="form.buildName" clearable @change="query(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="栋号" prop="buildNo">
                <el-input v-model="form.buildNo" clearable @change="query(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房号" prop="houseNo">
                <el-input v-model="form.houseNo" clearable @change="query(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房产来源" prop="source">
                <el-select
                  v-model="form.source"
                  placeholder="--请选择--"
                  class="w100"
                  clearable
                  @change="query(1)"
                >
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item, index) in source"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="户型" prop="type">
                <el-select
                  v-model="form.type"
                  placeholder="--请选择--"
                  class="w100"
                  clearable
                  @change="query(1)"
                >
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item, index) in type"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="朝向" prop="orientation">
                <el-select
                  v-model="form.orientation"
                  placeholder="--请选择--"
                  class="w100"
                  clearable
                  @change="query(1)"
                >
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item, index) in toward"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="预测绘建筑面积" label-width="8rem">
                <el-row :gutter="0">
                  <el-col :span="11">
                    <el-input v-model="form.coveredAreabegain" clearable @change="query(1)"></el-input>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align: center">-</el-col>
                  <el-col :span="11">
                    <el-input v-model="form.coveredAreaEnd" clearable @change="query(1)"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="初始房屋性质" prop="nature" label-width="7rem">
                <el-select
                  v-model="form.nature"
                  placeholder="--请选择--"
                  class="w100"
                  clearable
                  @change="query(1)"
                >
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="item in nature"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="竣工建筑面积" label-width="7rem">
                <el-row :gutter="0">
                  <el-col :span="11">
                    <el-input v-model="form.completionAreabegain" clearable @change="query(1)"></el-input>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align: center">-</el-col>
                  <el-col :span="11">
                    <el-input v-model="form.completionAreaEnd" clearable @change="query(1)"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item style="text-align:right">
                <el-button
                  type="primary"
                  size="mini"
                  @click="bulkEditingDialog()"
                  :disabled="!(this.$parent.params.activityName == '资产运维部初审')||(this.$route.query.itemName == '原有小区入库')"
                  v-if="!(this.$route.params.state == 'done') && hasPerm('fygl_rksp_fyxx_plxg')"
                >批量修改</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="exportFile()"
                  v-if="hasPerm('fygl_rksp_fyxx_dc')"
                >导出</el-button>
                <!-- 上传文件组件 -->
                <el-upload
                  style="display:inline-block;"
                  class="upload-demo"
                  ref="upload"
                  :http-request="importFile"
                  action
                  :show-file-list="false"
                  accept=".xls, .xlsx"
                >
                  <el-button
                    size="mini"
                    type="primary"
                    :disabled="!(this.$parent.params.activityName == '资产运维部初审')||(this.$route.query.itemName == '原有小区入库')"
                    v-if="!(this.$route.params.state == 'done') && hasPerm('fygl_rksp_fyxx_dr')"
                  >导入</el-button>
                </el-upload>
                <el-button
                  type="primary"
                  size="mini"
                  @click="query(1)"
                  v-if="hasPerm('fygl_rksp_fyxx_cx')"
                >查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!--结果列表-->
      <div class="table-list">
        <el-table
          v-loading="loading"
          :data="tableData"
          border
          ref="houseTable"
          @cell-dblclick="goDetail"
          @selection-change="handleSelectionChange"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column prop="districtName" label="小区名称"></el-table-column>
          <el-table-column prop="buildName" label="栋名称"></el-table-column>
          <el-table-column prop="houseNo" label="房号"></el-table-column>
          <el-table-column prop="sourceName" label="房产来源"></el-table-column>
          <el-table-column prop="typeName" label="户型"></el-table-column>
          <el-table-column prop="orientationName" label="朝向"></el-table-column>
          <el-table-column prop="coveredArea" label="预测绘建筑面积(平方米)"></el-table-column>
          <el-table-column prop="completionArea" label="竣工建筑面积(平方米)"></el-table-column>
          <el-table-column prop="startNatureName" label="初始房屋性质"></el-table-column>
        </el-table>
      </div>
      <div class="page_box">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizesList"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        ></el-pagination>
      </div>
      <el-dialog
        title="批量修改"
        :visible.sync="bulkEditingDialogVisible"
        width="40%"
        :close-on-click-modal="false"
      >
        <el-form ref="form" :model="formData" label-width="120px" class="formDialog">
          <el-form-item label="已选房号" style="width:100%">
            <el-input v-model="houseList" size="mini" disabled></el-input>
          </el-form-item>
          <el-form-item label="初始产权归属">
            <el-autocomplete
              style="width:100%"
              class="inline-input"
              size="mini"
              v-model="propertypBelong"
              :fetch-suggestions="getPropertyRightUnit"
              placeholder
              :trigger-on-focus="false"
              :clearable="true"
              popper-class="select-option"
              @select="changePropertyRightUnit"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="初始房源性质">
            <el-select style="width:100%" v-model="formData.startNature" size="mini" clearable>
              <el-option
                v-for="(item, index) in nature"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房屋来源">
            <el-select
              v-model="formData.source"
              style="width: 100%;"
              placeholder="--请选择--"
              size="mini"
              clearable
            >
              <el-option
                :label="item.name"
                :value="item.value"
                v-for="(item, index) in source"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房屋用途">
            <el-select style="width: 100%;" v-model="formData.function" size="mini" clearable>
              <el-option
                v-for="(item, index) in functionData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在单元">
            <el-input v-model="formData.unit" size="mini" clearable></el-input>
          </el-form-item>
          <el-form-item label="所在楼层">
            <el-input v-model="formData.floorNo" size="mini" clearable></el-input>
          </el-form-item>
          <el-form-item label="户型">
            <el-select
              v-model="formData.houseLayout"
              placeholder="--请选择--"
              size="mini"
              style="width: 100%;"
              clearable
            >
              <el-option
                :label="item.name"
                :value="item.value"
                v-for="(item, index) in type"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="朝向">
            <el-select
              v-model="formData.orientation"
              placeholder="--请选择--"
              style="width: 100%;"
              size="mini"
              clearable
            >
              <el-option
                :label="item.name"
                :value="item.value"
                v-for="(item, index) in toward"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否有架空层">
            <el-select
              style="width: 100%;"
              v-model="formData.innerFloor"
              placeholder
              size="mini"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平台">
            <el-select
              style="width: 100%;"
              v-model="formData.terrace"
              size="mini"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="(item, index) in terraceData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="(预测绘)建筑面积">
            <el-input v-model="formData.coveredArea" size="mini" style="width:70%" clearable></el-input>
            <span>平方米</span>
          </el-form-item>
          <el-form-item label="(预测绘)套内面积">
            <el-input v-model="formData.indoorArea" size="mini" style="width:70%" clearable></el-input>
            <span>平方米</span>
          </el-form-item>
          <el-form-item label="(预测绘)分摊面积">
            <el-input
              v-model="formData.residentialPoolArea"
              size="mini"
              style="width:70%"
              clearable
            ></el-input>
            <span>平方米</span>
          </el-form-item>
          <el-form-item label="竣工建筑面积">
            <el-input v-model="formData.completionArea" size="mini" style="width:70%" clearable></el-input>
            <span>平方米</span>
          </el-form-item>
          <el-form-item label="竣工套内面积">
            <el-input
              v-model="formData.completionIndoorArea"
              size="mini"
              style="width:70%"
              clearable
            ></el-input>
            <span>平方米</span>
          </el-form-item>
          <el-form-item label="竣工分摊面积">
            <el-input
              v-model="formData.completionShareArea"
              size="mini"
              style="width:70%"
              clearable
            ></el-input>
            <span>平方米</span>
          </el-form-item>
          <el-form-item label="分摊面积说明" style="width:100%">
            <el-input v-model="formData.residentialAreaContent" size="mini" clearable></el-input>
          </el-form-item>
          <el-form-item label="是否样板房">
            <el-select
              style="width: 100%;"
              v-model="formData.modelHouses"
              placeholder
              size="mini"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否代售">
            <el-select
              style="width: 100%;"
              v-model="formData.helpSell"
              placeholder
              size="mini"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="装修标准">
            <el-select
              style="width: 100%;"
              v-model="formData.decorationType"
              placeholder
              @change="changeDecorationType"
              size="mini"
              clearable
            >
              <el-option
                v-for="(item,index) in DistrictRenovationList"
                :key="index"
                :label="item.renovationCode"
                :value="item.renovationCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="装修标准说明">
            <el-tooltip class="item" effect="dark" content="此处利用鼠标可拖动" placement="right-end">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="formData.decorationTypeDescription"
                disabled
              ></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formData.specification" size="mini" clearable></el-input>
          </el-form-item>
          <el-form-item style="width:100%">
            <el-button @click="bulkEditingDialogVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="bulkEditing" size="mini">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import HousingDetails from "@/views/houseManagement/houseapproval/approvalDetails/housing/HousingDetails";
import { mapGetters } from "vuex";
import http from "@/api/houseApproval.js";
import { houseApproval } from "@/api/paths.js";
import api from "@/api/common(bj).js";
import publicMethod from "@/api/publicMethod.js";
export default {
  name: "HousingInformation",
  components: {
    HousingDetails
  },
  data() {
    return {
      form: {
        buildName: "",
        source: "",
        type: "",
        orientation: "",
        coveredAreaEnd: "",
        coveredAreabegain: "",
        completionAreabegain: "",
        completionAreaEnd: "",
        nature: ""
      },
      //分页信息
      total: 0,
      pageSize: 50,
      currentPage: 1,
      pageSizesList: [50, 100, 200, 500, 1000],
      //表格假数据
      tableData: [],
      toward: [], //朝向
      source: [],
      type: [],
      nature: [], //房屋性质
      houseList: "", //选中房号列表
      houseGuidList: [], //选中房的guid
      formData: {}, //要批量修改的表单
      options: [
        { value: true, label: "是" },
        { value: false, label: "否" }
      ], //是否下拉菜单
      bulkEditingDialogVisible: false, //批量修改
      typeData: [], //户型
      terraceData: [], //平台
      sourceData: [], //房屋来源
      functionData: [], //房屋用途
      divisionUnit: [], //分配权归属单位下拉框
      signingUnit: [], //签约权归属单位下拉框
      maintenanceUnit: [], //数据维护权归属单位下拉框
      operations: [], //运维权归属单位下拉框
      propertyRightUnitOptions: [], //产权归属
      DistrictRenovationList: [], //装修类型下拉
      propertypBelong: "", //产权单位
      loading: false //是否有遮罩层
    };
  },
  methods: {
    //改变装修类型
    changeDecorationType() {
      if (this.DistrictRenovationList) {
        for (var i = 0; i < this.DistrictRenovationList.length; i++) {
          if (
            this.DistrictRenovationList[i].renovationCode ==
            this.formData.decorationType
          ) {
            this.formData.decorationTypeDescription = this.DistrictRenovationList[
              i
            ].renovationDescription;
            break;
          } else {
            this.formData.decorationTypeDescription = "";
          }
        }
      }
    },
    //改变装修标准说明
    changeDecorationTypeDescription() {
      if (this.DistrictRenovationList) {
        for (var i = 0; i < this.DistrictRenovationList.length; i++) {
          if (
            this.formData.decorationTypeDescription ==
            this.DistrictRenovationList[i].renovationDescription
          ) {
            this.formData.decorationType = this.DistrictRenovationList[
              i
            ].renovationCode;
            break;
          } else {
            this.formData.decorationType = "";
          }
        }
      }
    },
    //入库审批-获取小区装修标准信息
    getDistrictRenovationList() {
      let params = {
        districtGuid: this.$parent.params.districtGuid
      };
      http
        .getDistrictRenovationList(params)
        .then(res => {
          this.DistrictRenovationList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //选中
    changePropertyRightUnit(item) {
      this.formData.propertypBelong = item.name;
    },
    //根据产权单位查询
    getPropertyRightUnit(str, cb) {
      let params = {
        searchContent: this.propertypBelong
      };
      publicMethod
        .getUnit(params)
        .then(res => {
          this.propertyRightUnitOptions = res; //将结果存入下拉小区数据中
          if (this.propertyRightUnitOptions.length === 0) {
            this.propertyRightUnitOptions = [{ value: "暂无数据" }];
          }
          cb(this.propertyRightUnitOptions);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //打开批量修改弹框
    bulkEditingDialog() {
      this.bulkEditingDialogVisible = true;
      this.getDistrictRenovationList();
    },
    //选中的房号和guid
    handleSelectionChange(val) {
      this.houseList = [];
      this.houseGuidList = [];
      if (val) {
        val.forEach(ele => {
          this.houseList.push(ele.houseNo);
          this.houseGuidList.push(ele.guid);
        });
      }
      if (this.houseList.length == 0) {
        this.houseList = [];
      } else {
        this.houseList = this.houseList.toString();
      }
    },
    //批量修改的确定按钮
    bulkEditing() {
      if (this.houseList.length == 0) {
        this.$message({
          message: "请选择批量修改的房",
          type: "info"
        });
        this.bulkEditingDialogVisible = false;
      } else {
        let params = {
          reportGuid: this.$parent.params.reportGuid
        };
        this.formData.houseGuidList = this.houseGuidList;
        if (!this.propertypBelong) {
          this.formData.propertypBelong = "";
        }
        let data = this.formData;
        http
          .bulkEdithouse(params, data)
          .then(res => {
            if (res) {
              this.bulkEditingDialogVisible = false;
              this.houseList = [];
              this.houseGuidList = [];
              this.formData = {};
              this.query();
              this.$message({
                message: "批量修改成功",
                type: "success"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //导入
    importFile(context) {
      this.loading = true;
      let params = { reportGuid: this.$parent.params.reportGuid };
      let data = new FormData();
      data.append("file", context.file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      http
        .importFile(params, data, config)
        .then(res => {
          this.loading = false;
          this.$message({
            type: "success",
            message: "上传成功"
          });
          this.query();
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    //导出
    exportFile() {
      let url =
        process.env.API +
        houseApproval.exportFile +
        "?reportGuid=" +
        this.$route.params.guid;
      // window.open(url);
      var elemIF = document.createElement("iframe");
      elemIF.src = url;
      elemIF.style.display = "none";
      elemIF.onload = function() {
        setTimeout(function() {
          elemIF.remove();
        }, 2000);
      };
      document.body.appendChild(elemIF);
      // window.location.href = url;
    },
    //获取数据字典
    getListHousePrepare() {
      let nameData = [
        "房产来源",
        "房屋性质",
        "户型",
        "朝向",
        "房屋用途",
        "平台"
      ];
      let _params = { names: nameData.toString() };
      http
        .searchDictionary(_params)
        .then(res => {
          res = JSON.parse(res);
          this.toward = this.$dictionaryChange(res.朝向, this.toward, "通用");
          this.type = res.户型;
          this.source = res.房产来源;
          this.nature = this.$dictionaryChange(
            res.房屋性质,
            this.nature,
            "通用"
          );
          this.functionData = res.房屋用途;
          this.terraceData = res.平台;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //房源列表查询
    query(index) {
      let _params = {};
      if (index) {
        this.currentPage = index;
      }
      _params = {
        guid: this.$parent.params.reportGuid,
        buildName: this.form.buildName,
        buildNo: this.form.buildNo,
        houseNo: this.form.houseNo,
        source: this.form.source,
        type: this.form.type,
        orientation: this.form.orientation,
        coveredAreabegain: this.form.coveredAreabegain,
        coveredAreaEnd: this.form.coveredAreaEnd,
        completionAreabegain: this.form.completionAreabegain,
        completionAreaEnd: this.form.completionAreaEnd,
        nature: this.form.nature,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      http
        .getHouseInfo(_params)
        .then(res => {
          this.tableData = res.content;
          this.total = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //改变页面显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.query(1);
    },
    //跳转页面
    handleCurrentChange(val) {
      this.currentPage = val;
      this.query();
    },
    //跳转详情
    goDetail(val) {
      let name = val.houseNo;
      this.$parent.openTab({
        id: val.guid,
        label: name || "房屋详情",
        meta: {
          houseGuid: val.guid,
          menuId: "5"
        },
        closable: true,
        component: () =>
          import(
            "@/views/houseManagement/houseapproval/approvalDetails/housing/HousingDetails"
          )
      });
    }
  },
  mounted() {
    this.getListHousePrepare();
    this.query();
  }
};
</script>

<style lang="scss" scoped>
.housingInformation {
  width: 100%;
  .formDialog {
    width: 100%;
    .el-form-item {
      width: 50%;
      margin-bottom: 0px;
      display: inline-block;
      width: 49.5%;
    }
  }
  .top {
    background: #fff;
    padding: 10px 20px 5px 20px;
    .el-form {
      width: 100%;
    }
    .float {
      float: right;
    }
    .w100 {
      width: 100%;
    }
  }
  .newBatch {
    margin-top: 20px;
  }
  .table-list {
    margin-top: 20px;
    background: #fff;
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
