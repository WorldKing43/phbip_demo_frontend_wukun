<!--
 * @Description: 批次基本信息
 * @Version: 1.0
 * @Autor: zhaoyy1
 * @Date: 2019-09-17 17:47:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-29 15:52:28
 -->
<template>
  <div class="newwarehousing">
    <div style="margin: 15px 0">
      <el-button
        type="primary"
        size="mini"
        @click="tijiao"
        :disabled="isBan || this.$parent.params.projectGuid == 'newguid'"
        >提交</el-button
      >
      <el-button type="primary" @click="onSubmit" size="mini" :disabled="isBan"
        >保存</el-button
      >
    </div>
    <div class="quarterMessage_box">
      <el-form
        :model="houseReportInfoDTO"
        ref="houseReportInfoDTO"
        label-width="7rem"
        :disabled="isBan"
      >
        <div class="demo-ruleForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="批次号">
                <el-input
                  v-model="houseReportInfoDTO.code"
                  readonly
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="报批主题" required>
                <el-input
                  v-model="houseReportInfoDTO.subject"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请依据" required>
                <el-input
                  v-model="houseReportInfoDTO.accordance"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上报小区" required>
                <el-select
                  v-model="houseReportInfoDTO.reportDistrictGuid"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in reportDistrict"
                    :key="index"
                    :label="item.name"
                    :value="item.guid + '/' + item.itemName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上报责任单位" required>
                <el-select
                  v-model="houseReportInfoDTO.accountableUnit"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in ascriptionoptions"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房源数量" prop="houseCount">
                <el-input
                  v-model="houseReportInfoDTO.houseCount"
                  readonly
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="申请说明" required>
                <el-input
                  type="textarea"
                  v-model="houseReportInfoDTO.suggest"
                  placeholder="请输入申请说明"
                  autosize
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="showDwxx">
              <el-form-item label="签约模式" required>
                <el-select v-model="houseReportInfoDTO.signModel" clearable>
                  <el-option
                    v-for="(item, index) in qymsList"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位自有住房" required>
                <el-select
                  v-model="houseReportInfoDTO.report"
                  clearable
                  @change="reportChange()"
                >
                  <el-option
                    v-for="(item, index) in trueOrFalse"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <p class="unit_p">
                说明:如该批房源为单位自有住房，主管部门将其备案到对应企业，由企业进行分配并在信息平台上报入住人
              </p>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <!-- 单位信息 -->
    <TitleStyle title="单位信息" v-if="showDwxx"></TitleStyle>
    <div class="demand-detail-table" v-if="showDwxx">
      <table style="width: 100%">
        <tr>
          <td class="must">单位名称</td>
          <td>
            <el-input
              :disabled="isBan"
              v-model="proposerForm.unitName"
              placeholder="请输入"
            ></el-input>
          </td>
          <td>单位类型</td>
          <td>
            <el-select
              :disabled="isBan"
              style="width: 100%"
              v-model="proposerForm.unitType"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in unitTypeData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="must">单位证件号码</td>
          <td>
            <el-input
              style="width: 87%"
              v-model="proposerForm.uscc"
              :disabled="isBan"
            ></el-input>
            <el-button
              type="primary"
              style="float: right; width: 13%"
              :disabled="isBan"
              @click="getEnterpriseInfo(proposerForm.uscc)"
              >提取</el-button
            >
          </td>
          <td class="must">单位证件类型</td>
          <td>
            <el-select
              style="width: 100%"
              v-model="proposerForm.unitIdenType"
              :disabled="isBan"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="(item, index) in unitIdenTypeData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>单位性质</td>
          <td>
            <el-select
              style="width: 100%"
              v-model="proposerForm.property"
              :disabled="isBan"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in propertyData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
          <td>单位邮编</td>
          <td>
            <el-input
              v-model="proposerForm.postCode"
              :disabled="isBan"
              placeholder="请输入"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>单位所属行业</td>
          <td>
            <el-select
              v-model="proposerForm.belongIndustry"
              :disabled="isBan"
              style="width: 100%"
            >
              <el-option
                v-for="(item, index) in industryTypeList"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </td>
          <td>单位详细地址</td>
          <td>
            <el-input
              v-model="proposerForm.address"
              :disabled="isBan"
              placeholder="请输入"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="must">法人</td>
          <td>
            <el-input
              v-model="proposerForm.legalPerson"
              :disabled="isBan"
              placeholder="请输入"
            ></el-input>
          </td>
          <td class="must">法人证件类型</td>
          <td>
            <el-select
              style="width: 100%"
              v-model="proposerForm.legalIdenType"
              :disabled="isBan"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in legalIdenTypeData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="must">法人证件号</td>
          <td>
            <el-input
              v-model="proposerForm.legalIden"
              :disabled="isBan"
              placeholder="请输入"
            ></el-input>
          </td>
          <td>法人联系电话</td>
          <td>
            <el-input
              v-model="proposerForm.legalPersonPhone"
              :disabled="isBan"
              placeholder="请输入"
              clearable
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>住房专员</td>
          <td>
            <el-input
              v-model="proposerForm.houseMan"
              :disabled="isBan"
              placeholder="请输入"
            ></el-input>
          </td>
          <td>住房专员证件类型</td>
          <td>
            <el-select
              style="width: 100%"
              v-model="proposerForm.houseManIdenType"
              :disabled="isBan"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in legalIdenTypeData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>住房专员证件号</td>
          <td>
            <el-input
              v-model="proposerForm.houseManIden"
              :disabled="isBan"
              placeholder="请输入"
            ></el-input>
          </td>
          <td>住房专员联系电话</td>
          <td>
            <el-input
              v-model="proposerForm.houseManPhone"
              :disabled="isBan"
              placeholder="请输入"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>住房专员2</td>
          <td>
            <el-input
              v-model="proposerForm.houseMan2"
              :disabled="isBan"
              placeholder="请输入"
            ></el-input>
          </td>
          <td>住房专员2证件类型</td>
          <td>
            <el-select
              style="width: 100%"
              v-model="proposerForm.houseManIdenType2"
              :disabled="isBan"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in legalIdenTypeData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>住房专员2证件号</td>
          <td>
            <el-input
              v-model="proposerForm.houseManIden2"
              :disabled="isBan"
              placeholder="请输入"
            ></el-input>
          </td>
          <td>住房专员2联系电话</td>
          <td>
            <el-input
              v-model="proposerForm.houseManPhone2"
              :disabled="isBan"
              placeholder="请输入"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>备注</td>
          <td colspan="3">
            <el-input
              v-model="proposerForm.remark"
              :disabled="isBan"
              placeholder="请输入"
            ></el-input>
          </td>
        </tr>
      </table>
    </div>
    <div class="housing_statistics">
      <div class="title">
        <span>房源统计</span>
        <div class="xian"></div>
      </div>
      <div class="statistics_content">
        <div class="contentBox">
          <el-table
            :data="fwxz"
            border
            style="width: 100%"
            :header-cell-style="{ background: '#fef6e9', color: '#f6b850' }"
          >
            <el-table-column
              prop="startNature"
              label="初始房源性质"
              header-align="center"
            ></el-table-column>
            <el-table-column
              label="数量"
              prop="number"
              header-align="center"
            ></el-table-column>
          </el-table>
        </div>
        <div class="contentBox" style="overflow: auto">
          <el-table
            :data="houseType"
            border
            style="width: 100%"
            :header-cell-style="{ background: '#e9f7fc', color: '#5dc7ea' }"
          >
            <el-table-column
              prop="type"
              label="房型"
              header-align="center"
            ></el-table-column>
            <el-table-column
              label="数量"
              prop="number"
              header-align="center"
            ></el-table-column>
          </el-table>
        </div>
        <div class="contentBox">
          <table class cellspacing="0px" style="width: 100%">
            <colgroup>
              <col width="50%" />
              <col width="50%" />
            </colgroup>
            <thead></thead>
            <tbody>
              <tr class="two">
                <td style="font-weight: bold">
                  预测绘建筑面积
                  <br />(平方米)
                </td>
                <td style="font-weight: bold">套数</td>
              </tr>
              <tr
                v-for="(value, key, index) in houseCount.coveredArea"
                :key="index"
              >
                <td>{{ key }}</td>
                <td>{{ value }}套</td>
              </tr>
              <tr>
                <td>总计</td>
                <td>{{ coveredAreaTotal }}套</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="contentBox">
          <table class cellspacing="0px" style="width: 100%">
            <colgroup>
              <col width="50%" />
              <col width="50%" />
            </colgroup>
            <thead></thead>
            <tbody>
              <tr class="two">
                <td style="font-weight: bold">
                  竣工建筑面积
                  <br />(平方米)
                </td>
                <td style="font-weight: bold">套数</td>
              </tr>
              <tr
                v-for="(value, key, index) in houseCount.completionArea"
                :key="index"
              >
                <td>{{ key }}</td>
                <td>{{ value }}套</td>
              </tr>
              <tr>
                <td>总计</td>
                <td>{{ completionAreaTotal }}套</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- 提交确认弹窗 -->
    <div v-if="dialogFormVisible">
      <el-dialog
        title="提交"
        :visible.sync="dialogFormVisible"
        width="30%"
        id="delete_box"
        :close-on-click-modal="false"
      >
        <el-form>
          <p>
            小区名称：
            <span>{{ reportUnitName }}</span>
          </p>
          <p>
            总栋数：
            <span>{{ buildingCount }}</span
            >栋
          </p>
          <p>
            总套数：
            <span>{{ total }}</span
            >套
          </p>
          <p>请确认上述信息，确认无误再提交本报批！</p>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="mini"
            >取 消</el-button
          >
          <el-button @click="queding1" size="mini" type="primary"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import http from "@/api/common(bj).js";
import common from "@/api/common";
import TitleStyle from "@/components/TitleStyle"; //标题组件
import axios from "dist-axios";
import merge from "webpack-merge";
import { mapMutations } from "vuex";
export default {
  name: "newwarehousing",
  components: {
    TitleStyle,
  },
  data() {
    return {
      dialogFormVisible: false,
      total: 0,
      enable1: true,
      buildingCount: 0,
      houseType: [],
      startNatureDic: [], //房屋性质
      ascriptionoptions: [],
      options: {
        ascriptionoptions: [],
      },
      proposerForm: {},
      legalIdenTypeData: [], // 重点单位类型
      industryTypeList: [], //单位所属行业下拉框
      propertyData: [], // 单位性质
      unitIdenTypeData: [], // 单位证件类型下拉数据
      unitTypeData: [], //证件类型
      houseReportInfoDTO: {
        code: "",
        subject: "",
        suggest: "",
        houseCount: "",
        reportDistrictGuid: "",
        accountableUnit: "",
        accordance: "",
        report: false,
      },
      // 小区列表
      reportDistrict: [],
      // 提交的小区名
      reportUnitName: "",
      fwxz: [],
      fwxz1: [],
      houseType1: [],
      businessName: "房源入库申请材料",
      houseCount: {}, //套数
      houseTypeDic: [], //户型字典
      showDwxx: false,
      isBan: false, //判断是否是提交过的
      isSave: true, //判断是否为保存
      completionAreaTotal: 0,
      coveredAreaTotal: 0,
      trueOrFalse: [
        { value: true, label: "是" },
        { value: false, label: "否" },
      ],
      qymsList: [],
    };
  },
  methods: {
    // 点击提交按钮
    tijiao() {
      this.dialogFormVisible = true;
      for (var i in this.reportDistrict) {
        if (
          this.reportDistrict[i].guid ==
          this.houseReportInfoDTO.reportDistrictGuid.split("/")[0]
        ) {
          this.reportUnitName = this.reportDistrict[i].name;
          break;
        }
      }
      let params = { reportGuid: this.$parent.params.projectGuid };
      let data;
      http
        .getBuidingCounts(params, data)
        .then((res) => {
          this.buildingCount = res[0].buildingCount;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCodes() {
      http
        .getCodes()
        .then((res) => {
          this.houseReportInfoDTO.code = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取套数
    async getCounts() {
      this.completionAreaTotal = 0;
      this.coveredAreaTotal = 0;
      let params = {
        coveredAreaMin: 50.0,
        coveredAreaMax: 80.0,
        reportGuid: this.$parent.params.projectGuid,
      };
      let res = await http.getAllName(params);
      //面积
      if (res.area === null) {
      } else {
        this.houseCount = res.area;
        for (var key in this.houseCount.completionArea) {
          this.completionAreaTotal =
            this.houseCount.completionArea[key] + this.completionAreaTotal;
        }
        for (var key in this.houseCount.coveredArea) {
          this.coveredAreaTotal =
            this.houseCount.coveredArea[key] + this.coveredAreaTotal;
        }
      }
      this.fwxz = res.startNatrue;
      this.fwxz1 = res.startNatrue;
      for (var i in this.fwxz) {
        this.fwxz[i].number = this.fwxz[i].number + "套";
      }
      this.fwxz.forEach((item) => {
        this.startNatureDic.forEach((ele) => {
          if (item.startNature == ele.value) {
            item.startNature = ele.name;
          }
        });
      });
      this.houseType = res.houselayout;
      this.houseType1 = res.houselayout;
      for (var i in this.houseType) {
        this.houseType[i].number = this.houseType[i].number + "套";
        for (var j in this.houseTypeDic) {
          if (this.houseTypeDic[j].value == this.houseType[i].type) {
            this.houseType[i].type = this.houseTypeDic[j].name;
            break;
          }
        }
      }
    },
    reportChange() {
      if (this.houseReportInfoDTO.report) {
        this.showDwxx = true;
      } else {
        this.showDwxx = false;
      }
    },
    //获取下拉框数据
    getDictionaryByName() {
      let nameList = [
        "重点单位类型",
        "证件类型",
        "单位性质",
        "单位所属行业",
        "户型",
        "朝向",
        "单位证件类型",
        "签约模式",
      ];
      let params = {
        names: nameList.toString(),
      };
      http
        .getDictionary(params)
        .then((res) => {
          res = JSON.parse(res);
          this.industryTypeList = res.单位所属行业;
          this.legalIdenTypeData = this.$dictionaryChange(
            res.证件类型,
            this.legalIdenTypeData,
            "分配"
          );
          this.propertyData = this.$dictionaryChange(
            res.单位性质,
            this.propertyData,
            "配租"
          );
          this.unitTypeData = this.$dictionaryChange(
            res.重点单位类型,
            this.unitTypeData,
            "分配"
          );
          this.typeData = res.户型;
          this.orientationData = this.$dictionaryChange(
            res.朝向,
            this.orientationData,
            "通用"
          );
          this.unitIdenTypeData = res.单位证件类型;
          this.qymsList = res.签约模式;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDict() {
      //如果是提交过的，禁止再次操作
      if (this.$parent.params) {
        //判断是否已经获取批次号
        if (
          this.$parent.params.edit == "已申请" ||
          this.$parent.params.edit == "申请通过"
        ) {
          this.isBan = true;
        } else {
          this.isBan = false;
        }
      }
      let dictionaryName = ["建筹上报责任单位", "户型", "房屋性质"];
      let params = { names: dictionaryName.toString() };
      http
        .getDictionary(params)
        .then((res) => {
          let resp = JSON.parse(res);
          this.ascriptionoptions = resp.建筹上报责任单位;
          this.houseTypeDic = resp.户型;
          this.startNatureDic = this.$dictionaryChange(
            resp.房屋性质,
            this.startNatureDic,
            "通用"
          );
          this.getCounts(); // 获取全部
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSubmit() {
      this.$confirm("此操作将进行保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.saveApplyBatch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存",
          });
        });
    },
    //提示框
    open(title) {
      this.$message(title);
    },
    //保存申请批次
    saveApplyBatch() {
      if (
        this.houseReportInfoDTO.subject == "" ||
        this.houseReportInfoDTO.subject == null
      ) {
        this.$alert("请输入批次主题!");
      } else if (
        this.houseReportInfoDTO.accordance == "" ||
        this.houseReportInfoDTO.accordance == null
      ) {
        this.$alert("请输入申请依据!");
      } else if (
        this.houseReportInfoDTO.reportDistrictGuid == "" ||
        this.houseReportInfoDTO.reportDistrictGuid == null
      ) {
        this.$alert("请选择本批次需要上报的小区!");
      } else if (
        this.houseReportInfoDTO.accountableUnit == "" ||
        this.houseReportInfoDTO.accountableUnit == null
      ) {
        this.$alert("请选择上报责任单位!");
      } else if (
        this.houseReportInfoDTO.suggest == "" ||
        this.houseReportInfoDTO.suggest == null
      ) {
        this.$alert("请填写申请说明!");
      } else if (
        this.houseReportInfoDTO.report == true &&
        (this.houseReportInfoDTO.signModel == "" ||
          this.houseReportInfoDTO.signModel == null)
      ) {
        this.$alert("请填写签约模式!");
      } else {
        var that = this;
        let houseReportInfoDTO = JSON.parse(
          JSON.stringify(this.houseReportInfoDTO)
        );
        houseReportInfoDTO.state = "1";
        houseReportInfoDTO.reportDate = this.$getTime(new Date());
        let params;
        houseReportInfoDTO.reportDistrictGuid = this.houseReportInfoDTO.reportDistrictGuid.split(
          "/"
        )[0];
        houseReportInfoDTO.itemName = this.houseReportInfoDTO.reportDistrictGuid.split(
          "/"
        )[1];
        this.$parent.params.itemName = houseReportInfoDTO.itemName;
        let data = {
          houseReportInfoDTO: houseReportInfoDTO,
          enterpriseInfoDTO: JSON.parse(JSON.stringify(this.proposerForm)),
        };
        http
          .saveApplyBatch(params, data)
          .then((res) => {
            let guid = res.guid;
            if (res) {
              this.enable1 = false;
              this.Event.$emit("WarehousingApplication", { msg: "refresh" });
              //判断是否是提交
              if (this.isSave == true) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
              } else {
                this.commitInfo(guid);
                this.isSave = true;
              }
              if (this.$parent.params.projectGuid == "newguid") {
                this.openDetail(res);
                this.closeTopTab();
              }
              this.$parent.params.projectGuid = res.guid;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    getEnterpriseInfo(uscc) {
      let params = { uscc: uscc || "" };
      http.getEnterpriseInfo(params).then((resp) => {
        this.proposerForm = resp;
      });
    },
    //新建保存重新打开
    openDetail(res) {
      let code;
      let guid = res.guid;
      code = "房源入库申请";
      let edit = res.state;
      let reportDistrictGuid = res.reportDistrictGuid;
      let tempTab = {
        label: res.subject,
        name: "houseApplyTab",
        params: {
          code: code,
          guid: guid,
          edit: "待申请",
          reportDistrictGuid,
        },
      };
      this.openTopTab(tempTab);
    },
    //提交操作
    commitInfo(guid) {
      this.$startLoading();
      let params;
      let data = [guid];
      http
        .commitInfo(params, data)
        .then((res) => {
          this.$message({
            message: "提交成功",
            type: "success",
          });
          this.dialogFormVisible = false;
          this.Event.$emit("WarehousingApplication", { msg: "refresh" });
          this.closeTopTab();
          this.$endLoading();
        })
        .catch((err) => {
          console.log(err);
          this.$endLoading();
        });
    },
    //获取上报责任单位
    getAscriptionoptions() {
      var that = this;
      let params = {
        accountableUnit: 1,
      };
      http
        .getAscriptionoptions(params)
        .then((res) => {
          that.options.ascriptionoptions = tool.changeData(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    queding1() {
      //先保存
      this.isSave = false; //为提交
      this.saveApplyBatch();
    },
    // 获取小区列表
    chooseDistrict() {
      let params;
      console.log(this.$parent.params);
      if (this.$parent.params) {
        if (
          this.$parent.params.edit == "new" ||
          this.$parent.params.edit == "待申请"
        ) {
          params = { state: "new" };
        }
      }
      http
        .chooseDistrict(params)
        .then((res) => {
          this.reportDistrict = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    startProject() {
      let params = { businessName: "房源管理入库审批" };
      common
        .startProject(params)
        .then((res) => {
          //console.log(res)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onLoad() {
      if (this.$parent.params.projectGuid.indexOf("newguid") == -1) {
        let params = { guid: this.$parent.params.projectGuid };
        http
          .checkBach(params)
          .then((res) => {
            this.houseReportInfoDTO = res;
            this.$parent.params.districtGuid = res.reportDistrictGuid;
            this.$parent.params.itemName = this.houseReportInfoDTO.itemName;
            this.houseReportInfoDTO.reportDistrictGuid =
              this.houseReportInfoDTO.reportDistrictGuid +
              "/" +
              this.houseReportInfoDTO.itemName;
            this.enable1 = false;
            this.total = res.houseCount;
            this.reportChange();
            this.getEnterpriseInfo(this.houseReportInfoDTO.unitCode);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.getCodes(); // 获取批次号
      }
    },
    changeSave() {
      //判断其他二级页签已更改保存
      this.Event.$on("ApplyChangeSave", (data) => {
        if (data.msg == "ChangeSave") {
          this.onLoad();
          this.getDict(); // 获取数据字典
          this.chooseDistrict(); // 获取小区列表
        }
      });
    },
  },
  created() {
    this.changeSave();
    this.onLoad();
    this.getDict(); // 获取数据字典
    this.chooseDistrict(); // 获取小区列表
    this.getDictionaryByName(); //数据字典
  },
};
</script>
<style lang="scss" scoped>
.unit_p {
  color: red;
  margin-top: 8px;
  margin-left: 4px;
}
.newwarehousing {
  .housing_statistics {
    margin-top: 20px;
    .title {
      //标题
      width: 100%;
      height: 20px;
      box-sizing: border-box;
      border-left: 4px solid #f5a623;
      position: relative;
      margin-bottom: 28px;
      span {
        position: absolute;
        display: inline-block;
        box-sizing: border-box;
        padding-left: 10px;
        padding: 0 20px 0 10px;
        height: 20px;
        line-height: 20px;
        font-size: 20px;
        z-index: 2;
        background: #fff;
      }
      .xian {
        position: absolute;
        top: 18px;
        width: 100%;
        height: 1px;
        background: #ccc;
      }
    }

    .statistics_content {
      width: 100%;
      box-sizing: border-box;
      padding: 0 30px;
      display: flex;
      justify-content: space-between;
      .contentBox {
        width: 24%;
        background: #fff;
        box-sizing: border-box;
        padding: 20px;
        min-height: 288px;
        box-shadow: 5px 5px 5px rgba(221, 229, 249, 1),
          2px -2px 2px rgba(221, 229, 249, 1),
          -2px 2px 2px rgba(221, 229, 249, 1),
          -2px -2px 2px rgba(221, 229, 249, 1);
        table {
          border-top: 1px solid rgba(221, 229, 249, 1);
          border-left: 1px solid rgba(221, 229, 249, 1);
        }
        tbody {
          tr.frist {
            background: rgba(254, 246, 232, 1);
          }
          tr.two {
            background: #eef9f4;
            color: #71d0a5;
          }
          td {
            line-height: 38px;
            text-align: center;
            border-bottom: 1px solid rgba(221, 229, 249, 1);
            border-right: 1px solid rgba(221, 229, 249, 1);
          }
        }
      }
    }
    & /deep/ .el-table .cell {
      text-align: center;
    }
    & /deep/ .el-table {
      border-color: rgba(221, 229, 249, 1) !important;
      border-right: none !important;
      .el-table__empty-block {
        border-bottom: 1px solid #b3b3b3;
      }
      th {
        border-color: rgba(221, 229, 249, 1) !important;
      }

      td {
        border-color: rgba(221, 229, 249, 1) !important;
      }
    }
  }
  //总样式增加禁用文字居中，此处单独修改
  /deep/ .quarterMessage_box .el-input.is-disabled .el-input__inner {
    text-align: left;
  }
  //总样式为#333，此处单独修改
  /deep/ .el-table .cell {
    color: unset;
  }
}
.demand-detail-table
  table:not(.el-table__header):not(.el-table__body):not(.el-table__footer):not(.scroll-table) {
  width: 100%;
  color: #333;
  border: 1px solid #b3b3b3;
  background: #f0f8ff;
  margin-bottom: 10px;
  border-right: none;
  tr {
    border: 1px solid #b3b3b3;
    border-right: none;
    th {
      color: #333;
      background: rgb(230, 240, 252);
      white-space: normal;
      word-break: break-all;
      padding: 9px 0;
      border: 1px solid #b3b3b3;
    }

    td {
      height: 38px;
      width: auto;
      line-height: 38px;
      padding: 0;
      text-align: center;
      //border-bottom: 1px solid #b3b3b3;
      //border-right: 1px solid #b3b3b3;

      .el-input__inner,
      .dist-input-number {
        height: 38px !important;
        line-height: 38px;
        border: none;
        text-align: left;
      }

      .el-input.is-disabled .el-input__inner {
        background: #fbfbfb;
      }
      & /deep/ .el-input .el-input__inner {
        border-radius: 0 !important;
        border-top: none !important;
        border-bottom: none !important;
      }

      input {
        border-radius: 0 !important;
        border-top: none !important;
        border-bottom: none !important;
      }
    }

    td:empty {
      background: #fbfbfb;
    }
  }

  tr:hover {
    background-color: #f5f7fa;
  }
}
</style>
