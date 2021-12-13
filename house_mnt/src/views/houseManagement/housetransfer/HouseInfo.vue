<!--房源信息-->
<template>
  <div class="housingInformation">
    <div class="top">
      <el-form ref="form" :model="form" label-width="7rem" size="mini">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="栋号">
              <el-input
                v-model="form.buildNo"
                clearable
                @change="getHouseList(1)"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="栋名称">
              <el-input
                clearable
                v-model="form.buildingName"
                @change="getHouseList(1)"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房号">
              <el-input
                clearable
                v-model="form.houseNo"
                @change="getHouseList(1)"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="户型">
              <el-select
                v-model="form.type"
                placeholder="--请选择--"
                class="w100"
                clearable
                multiple
                @change="getHouseList(1)"
              >
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="item in typeData"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="朝向">
              <el-select
                v-model="form.orientation"
                placeholder="--请选择--"
                class="w100"
                clearable
                multiple
                @change="getHouseList(1)"
              >
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="item in orientationData"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预测绘建筑面积">
              <el-row :gutter="0">
                <el-col :span="11">
                  <el-input
                    clearable
                    v-model="form.coveredAreaMin"
                    @blur="getHouseList(1)"
                  ></el-input>
                </el-col>
                <el-col class="line" :span="2" style="text-align: center"
                  >-</el-col
                >
                <el-col :span="11">
                  <el-input
                    clearable
                    v-model="form.coveredAreaMax"
                    @blur="getHouseList(1)"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="竣工建筑面积">
              <el-row :gutter="0">
                <el-col :span="11">
                  <el-input
                    v-model="form.completionAreabegain"
                    clearable
                    @change="getHouseList(1)"
                  ></el-input>
                </el-col>
                <el-col class="line" :span="2" style="text-align: center"
                  >-</el-col
                >
                <el-col :span="11">
                  <el-input
                    v-model="form.completionAreaEnd"
                    clearable
                    @change="getHouseList(1)"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房源性质">
              <el-select
                v-model="form.nature"
                placeholder="--请选择--"
                class="w100"
                clearable
                multiple
                filterable
                @change="getHouseList(1)"
              >
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="item in natureData"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="房屋状态">
              <el-select
                v-model="form.state"
                placeholder="--请选择--"
                class="w100"
                clearable
                multiple
                @change="getHouseList(1)"
              >
                <el-option
                  v-for="item in stateData"
                  :label="item.name"
                  :value="item.value"
                  :key="item.guid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="维修状态" label-width="7rem">
              <el-select
                style="width: 100%"
                v-model="form.maintainType"
                placeholder="请选择"
                @change="getHouseList(1)"
                clearable
              >
                <el-option
                  v-for="(item, index) in stateList"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="当前属性">
              <el-select
                v-model="form.currentProperty"
                placeholder="--请选择--"
                class="w100"
                clearable
                @change="getHouseList(1)"
              >
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="item in currentPropertyData"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="当前产权归属">
              <el-select
                v-model="form.propertyRight"
                placeholder="--请选择--"
                class="w100"
                clearable
                multiple
                filterable
                @change="getHouseList(1)"
              >
                <el-option
                  v-for="(item, index) in propertyRightUnitOptions"
                  :label="item.value"
                  :value="item.name"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="是否问题房源">
              <el-select
                v-model="form.situational"
                placeholder="--请选择--"
                class="w100"
                clearable
                @change="getHouseList(1)"
              >
                <el-option
                  v-for="item in options"
                  :label="item.label"
                  :value="item.value"
                  :key="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="空房标注" label-width="7rem">
              <el-select
                v-model="form.situationalRemark"
                placeholder="--请选择--"
                class="w100"
                multiple
                clearable
                @change="getHouseList(1)"
              >
                <el-option
                  v-for="item in situationalRemarkData"
                  :label="item.name"
                  :value="item.value"
                  :key="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注" label-width="7rem">
              <el-input
                v-model="form.specification"
                clearable
                @change="getHouseList(1)"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否包含核销">
              <el-select
                v-model="form.demolitionState"
                placeholder="--请选择--"
                class="w100"
                clearable
              >
                <el-option
                  v-for="item in options"
                  :label="item.label"
                  :value="item.value"
                  :key="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="房产来源">
              <el-select
                v-model="form.source"
                clearable
                placeholder="--请选择--"
                class="w100"
                multiple
                @change="getHouseList(1)"
              >
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="item in sourceData"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="18" style="text-align: right">
            <el-button
              type="primary"
              size="mini"
              v-if="hasPerm('fygl_fyfwk_fwxx_dc')"
              @click="exportTable"
              >导出</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="getHouseList(1)"
              v-if="hasPerm('fygl_fyfwk_fwxx_cx')"
              >查询</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="reset"
              v-if="hasPerm('fygl_fyfwk_fwxx_cz')"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!--结果列表-->
    <div class="table-list" style="margin-top: 10px; margin-bottom: 10px">
      <el-table
        :data="tableData"
        border
        @cell-dblclick="goDetail"
        class="w100"
        :header-cell-style="{
          background: '#E6F0FC',
          color: '#606266',
          'text-align': 'center',
          'border-color': '#DBDBDB',
        }"
        :cell-style="{
          'text-align': 'center',
          'border-color': '#DBDBDB',
        }"
      >
        <el-table-column
          type="index"
          :index="indexMethod"
          label="序号"
        ></el-table-column>
        <el-table-column prop="districtName" label="小区名称"></el-table-column>
        <el-table-column prop="buildNo" label="栋号"></el-table-column>
        <el-table-column prop="buildName" label="栋名称"></el-table-column>
        <el-table-column prop="houseNo" label="房号"></el-table-column>
        <el-table-column prop="typeName" label="户型"></el-table-column>
        <el-table-column prop="orientationName" label="朝向"></el-table-column>
        <el-table-column
          prop="coveredArea"
          label="预测绘建筑面积(平方米)"
        ></el-table-column>
        <el-table-column
          prop="completionArea"
          label="竣工建筑面积(平方米)"
        ></el-table-column>
        <el-table-column prop="specification" label="备注"></el-table-column>
        <el-table-column prop="stateName" label="房屋状态"></el-table-column>
      </el-table>
    </div>
    <!-- 分页功能 -->
    <div class="page_box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[50, 100, 200, 500, 1000, 2000]"
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
import http from "@/api/house.js";
import api from "@/api/housestore.js";
import publicMethod from "@/api/publicMethod.js";
export default {
  name: "houseinfo",
  data() {
    return {
      form: {
        buildNo: "",
        buildingName: "",
        houseNo: "",
        type: "",
        orientationList: "",
        coveredAreaMax: "",
        coveredAreaMin: "",
        completionAreabegain: "",
        completionAreaEnd: "",
        nature: "",
        state: "",
        source: "",
        currentProperty: "",
        propertyRight: "",
        situational: "",
        situationalRemark: "",
        specification: "",
        demolitionState: "0",
        maintainType: "",
      }, //表单
      tableData: [], //表格数据
      //分页需要的数据
      currentPage: 1,
      pageNo: 1,
      pageSize: 50,
      totalNumber: 0, //数据的总数
      natureData: [], // 房屋性质下拉
      sourceData: [], //来源下拉
      typeData: [], //类型下拉
      orientationData: [], //朝向下拉
      stateData: [], //房屋状态
      currentPropertyData: [], //当前属性下拉
      situationalRemarkData: [], //房源标注下拉
      propertyRightUnitOptions: [], //变更单位集合
      options: [
        { value: "1", label: "是" },
        { value: "0", label: "否" },
      ],
      stateList: [
        { name: "退房待维修", value: 1 },
        { name: "已申报维修", value: 2 },
        { name: "已完成维修", value: 3 },
        { name: "空", value: "null" },
      ],
    };
  },
  methods: {
    //导出
    exportTable() {
      let url = "";
      url =
        process.env.API +
        "/house/store/disrict/house_info/export" +
        "?districtGuid=" +
        this.$parent.params.guid +
        "&buildingName=" +
        this.form.buildingName +
        "&buildNo=" +
        this.form.buildNo +
        "&houseNo=" +
        this.form.houseNo +
        "&type=" +
        this.form.type.toString() +
        "&state=" +
        this.form.state.toString() +
        "&situationalRemark=" +
        this.form.situationalRemark.toString() +
        "&situational=" +
        this.form.situational +
        "&currentProperty=" +
        this.form.currentProperty +
        "&source=" +
        this.form.source.toString() +
        "&propertyRight=" +
        this.form.propertyRight.toString() +
        "&orientationList=" +
        this.form.orientation.toString() +
        "&specification=" +
        this.form.specification +
        "&coveredAreaMin=" +
        this.form.coveredAreaMin +
        "&coveredAreaMax=" +
        this.form.coveredAreaMax +
        "&nature=" +
        this.form.nature.toString() +
        "&completionAreabegain=" +
        this.form.completionAreabegain +
        "&completionAreaEnd=" +
        this.form.completionAreaEnd +
        "&demolitionState=" +
        this.form.demolitionState +
        "&maintainType=" +
        this.form.maintainType;
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
    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //得到产权单位
    getPropertyRightUnit() {
      let params = {
        searchContent: "",
      };
      publicMethod
        .getUnit(params)
        .then((res) => {
          this.propertyRightUnitOptions = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //重置
    reset() {
      this.form = {
        buildNo: "",
        buildingName: "",
        houseNo: "",
        type: "",
        orientation: "",
        coveredAreaMax: "",
        coveredAreaMin: "",
        completionAreabegain: "",
        completionAreaEnd: "",
        nature: "",
        state: "",
        source: "",
        currentProperty: "",
        propertyRight: "",
        situational: "",
        situationalRemark: "",
        specification: "",
        demolitionState: "",
      };
    },
    handleSizeChange(val) {
      //改变页面显示条数
      this.pageSize = val;
      this.currentPage = 1;
      this.getHouseList();
    },
    handleCurrentChange(val) {
      //跳转页面
      this.currentPage = val;
      this.getHouseList();
    },
    goDetail(val) {
      let name = val.houseNo;
      this.$parent.openTab({
        id: val.guid,
        label: name || "房屋详情",
        closable: true,
        meta: {
          houseGuid: val.guid,
          menuId: "4",
        },
        component: () =>
          import("@/views/houseManagement/housetransfer/details/HouseDetails"),
      });
    },
    //获取房屋列表
    getHouseList(index) {
      let reg = /^(\-)?\d+(\.\d{1,2})?$/;
      let re = new RegExp(reg);
      if (this.form.coveredAreaMax) {
        if (!re.test(this.form.coveredAreaMax)) {
          this.$alert("面积不合法", "提示", {
            confirmButtonText: "确定",
          });
          return;
        }
      }
      if (this.form.coveredAreaMin) {
        if (!re.test(this.form.coveredAreaMin)) {
          this.$alert("面积不合法", "提示", {
            confirmButtonText: "确定",
          });
          return;
        }
      }
      if (index) {
        this.currentPage = index;
      }
      if (!this.form.propertyRight) {
        this.propertyRightGuid = "";
      }
      let params = {
        districtGuid: this.$parent.params.guid, //小区唯一标识
        buildNo: this.form.buildNo,
        buildingName: this.form.buildingName,
        houseNo: this.form.houseNo,
        type: this.form.type.toString(),
        orientationList: this.form.orientation.toString(),
        coveredAreaMax: this.form.coveredAreaMax,
        coveredAreaMin: this.form.coveredAreaMin,
        completionAreabegain: this.form.completionAreabegain,
        completionAreaEnd: this.form.completionAreaEnd,
        nature: this.form.nature.toString(),
        state: this.form.state.toString(),
        source: this.form.source.toString(),
        currentProperty: this.form.currentProperty,
        propertyRight: this.form.propertyRight.toString(),
        situational: this.form.situational,
        situationalRemark: this.form.situationalRemark.toString(),
        specification: this.form.specification,
        demolitionState: this.form.demolitionState,
        maintainType: this.form.maintainType,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
      };
      http
        .getstoreHousePage(params)
        .then((res) => {
          this.tableData = res.content;
          this.totalNumber = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取字典
    getDictionary() {
      let namesArr = [
        "房产来源",
        "户型",
        "朝向",
        "房屋性质",
        "房屋状态",
        "变更单位",
        "当前属性",
        "房源标注",
      ];
      let params = {
        names: namesArr.toString(),
      };
      api
        .getDictionary(params)
        .then((res) => {
          res = JSON.parse(res);
          this.orientationData = this.$dictionaryChange(
            res.朝向,
            this.orientationData,
            "通用"
          );
          this.natureData = this.$dictionaryChange(
            res.房屋性质,
            this.natureData,
            "通用"
          );
          this.sourceData = res.房产来源;
          this.typeData = res.户型;
          this.stateData = res.房屋状态;
          this.currentPropertyData = res.当前属性;
          this.situationalRemarkData = res.房源标注;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.Event.$on("HouseInfo", (data) => {
      if (data == "getHouseList") {
        this.getHouseList();
      }
    });
    this.getDictionary();
    this.getPropertyRightUnit();
    this.getHouseList();
  },
};
</script>

<style lang="scss" scoped>
</style>
