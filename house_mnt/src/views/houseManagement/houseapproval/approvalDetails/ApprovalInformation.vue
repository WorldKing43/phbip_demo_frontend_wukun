<!--报批基本信息-->
<template>
  <div class="approvalInformation">
    <div class="toSubmit">
      <el-button
        type="primary"
        size="mini"
        @click="save()"
        v-if="!flagOpen && hasPerm('fygl_rksp_bpjbxx_bc')"
        >保存</el-button
      >
    </div>
    <el-form
      ref="form"
      :model="form"
      label-width="7rem"
      label-position="right"
      :disabled="flagOpen"
      size="mini"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="批次号">
            <el-input v-model="form.code" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="报批主题">
            <el-input v-model="form.subject" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="申请依据">
          <el-input v-model="form.accordance" disabled></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="上报责任单位">
            <el-select class="w100" v-model="form.accountableUnit" disabled>
              <el-option
                v-for="(item, index) in ascriptionoptions"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房源数量">
            <!-- 这一个是假数据 -->
            <el-input v-model="form.houseCount" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="关联项目">
            <el-input v-model="form.relatedProject" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="报批单位">
            <el-input v-model="form.reportUnit" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="报批人">
            <el-input v-model="form.reportPerson" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="申请说明">
          <el-input type="textarea" v-model="form.suggest" disabled></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="单位自有住房">
            <el-select v-model="form.report" disabled @change="reportChange()">
              <el-option
                v-for="(item, index) in trueOrFalse"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="isShow">
          <el-form-item label="签约模式">
            <el-select v-model="form.signModel">
              <el-option
                v-for="(item, index) in qymsList"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 单位信息 -->
      <title-style title="单位信息" v-if="showDwxx"></title-style>
      <div class="demand-detail-table" v-if="showDwxx">
        <table style="width: 100%">
          <tr>
            <td class="must">单位名称</td>
            <td>
              <el-input
                v-model="proposerForm.unitName"
                disabled
                placeholder="请输入"
              ></el-input>
            </td>
            <td>单位类型</td>
            <td>
              <el-select
                style="width: 100%"
                disabled
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
              <el-input disabled v-model="proposerForm.uscc"></el-input>
            </td>
            <td class="must">单位证件类型</td>
            <td>
              <el-select
                style="width: 100%"
                v-model="proposerForm.unitIdenType"
                placeholder="请选择"
                disabled
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
                disabled
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
                disabled
                placeholder="请输入"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>单位所属行业</td>
            <td>
              <el-select
                v-model="proposerForm.belongIndustry"
                disabled
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
                disabled
                placeholder="请输入"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="must">法人</td>
            <td>
              <el-input
                v-model="proposerForm.legalPerson"
                disabled
                placeholder="请输入"
              ></el-input>
            </td>
            <td class="must">法人证件类型</td>
            <td>
              <el-select
                style="width: 100%"
                v-model="proposerForm.legalIdenType"
                disabled
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
                disabled
                placeholder="请输入"
              ></el-input>
            </td>
            <td>法人联系电话</td>
            <td>
              <el-input
                v-model="proposerForm.legalPersonPhone"
                disabled
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
                disabled
                placeholder="请输入"
              ></el-input>
            </td>
            <td>住房专员证件类型</td>
            <td>
              <el-select
                style="width: 100%"
                v-model="proposerForm.houseManIdenType"
                placeholder="请选择"
                disabled
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
                disabled
                placeholder="请输入"
              ></el-input>
            </td>
            <td>住房专员联系电话</td>
            <td>
              <el-input
                v-model="proposerForm.houseManMobilePhone"
                disabled
                placeholder="请输入"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>住房专员2</td>
            <td>
              <el-input
                v-model="proposerForm.houseMan2"
                disabled
                placeholder="请输入"
              ></el-input>
            </td>
            <td>住房专员2证件类型</td>
            <td>
              <el-select
                style="width: 100%"
                v-model="proposerForm.houseManIdenType2"
                placeholder="请选择"
                disabled
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
                disabled
                placeholder="请输入"
              ></el-input>
            </td>
            <td>住房专员2联系电话</td>
            <td>
              <el-input
                v-model="proposerForm.houseManMobilePhone2"
                disabled
                placeholder="请输入"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>备注</td>
            <td colspan="3">
              <el-input
                v-model="proposerForm.remark"
                disabled
                placeholder="请输入"
              ></el-input>
            </td>
          </tr>
        </table>
      </div>
      <!-- 申请入库房屋概况 -->
      <title-style :title="firstTitle"></title-style>
      <!-- 房屋性质 -->
      <div class="housing">
        <div class="category-data">
          <div class="table">
            <table v-if="nature">
              <tr class="title-bg">
                <th>房源性质</th>
                <th>套数</th>
              </tr>
              <tr v-for="(item, index) in nature" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.value }} 套</td>
              </tr>
            </table>
          </div>
        </div>
        <!-- 户型 -->
        <div class="hosueType">
          <div class="table">
            <table v-if="type">
              <tr class="title-bg">
                <th>户型</th>
                <th>套数</th>
              </tr>
              <tr v-for="(item, index) in type" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.value }} 套</td>
              </tr>
            </table>
          </div>
        </div>
        <!-- 预测绘面积 -->
        <div class="buildingArea">
          <div class="table">
            <table v-if="area">
              <tr class="title-bg">
                <th>预测绘建筑面积(平方米)</th>
                <th>套数</th>
              </tr>
              <tr v-for="(item, index) in area" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.value }} 套</td>
              </tr>
            </table>
          </div>
        </div>
        <!-- 竣工 -->
        <div class="category-data">
          <div class="table">
            <table v-if="nature">
              <tr class="title-bg">
                <th>竣工建筑面积(平方米)</th>
                <th>套数</th>
              </tr>
              <tr v-for="(item, index) in completionArea" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.value }} 套</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <!-- 房屋使用权管理 -->
      <title-style :title="secondTitle"></title-style>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="分配权归属单位" label-width="9rem">
            <el-select
              class="w100"
              v-model="form.allocationRight"
              filterable
              clearable
            >
              <template v-if="form.report == '是'">
                <el-option
                  v-for="item in uintAllocationRight"
                  :label="item.name"
                  :value="item.value"
                  :key="item.id"
                ></el-option>
              </template>
              <template v-else>
                <el-option
                  v-for="item in divisionUnit"
                  :label="item.name"
                  :value="item.value"
                  :key="item.id"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <p class="unit_p">说明: 分配权指该批房由哪个单位进行配租配售</p>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="签约权归属单位" label-width="9rem">
            <el-select
              class="w100"
              v-model="form.signatoryRightUnit"
              @change="selectTrigger()"
              filterable
              clearable
            >
              <el-option
                v-for="item in signingUnit"
                :label="item.name"
                :value="item.value"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <p class="unit_p">
            说明:
            签约权指该批房的租赁合同或者购房合同与哪个单位签订，若无可选单位请联系系统管理员添加
          </p>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="数据维护权归属单位" label-width="9rem">
            <el-select
              class="w100"
              v-model="form.maintainRight"
              filterable
              clearable
            >
              <el-option
                v-for="item in maintenanceUnit"
                :label="item.name"
                :value="item.value"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <p class="unit_p">说明: 数据维护权指该批房的数据勘误权限</p>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="监管权归属" label-width="9rem">
            <el-select
              class="w100"
              v-model="form.operationalRight"
              filterable
              clearable
            >
              <el-option
                v-for="item in operations"
                :label="item.name"
                :value="item.value"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <p class="unit_p">
            说明:
            若该批房为企业自有住房，需上报主管部门进行备案监管。则运维权指该批房需上报哪个主管部门进行监管
          </p>
        </el-col>
      </el-row>
      <!-- 审核意见 -->
      <title-style :title="thirdTitle"></title-style>
      <el-form-item
        label="本批次房源是否符合建设项目管理任务书/监管协议的要求"
        label-width="24rem"
        v-if="conform"
      >
        <el-radio-group v-model="form.isConform" :disabled="conFormContrl">
          <el-radio label="0">符合</el-radio>
          <el-radio label="1">不符合</el-radio>
          <el-radio label="2">与建设项目无关</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label-width="0" v-if="conform">
        <el-input
          type="textarea"
          :rows="2"
          v-model="form.constructionDetails"
          :disabled="conFormContrl"
          placeholder="请填写详细说明"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="本批次房源是否已完成现场核查"
        label-width="14rem"
        v-if="workCheck"
      >
        <el-radio-group v-model="form.afterFieldwork" :disabled="codestate">
          <el-radio label="true">是</el-radio>
          <el-radio label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label label-width="0" v-if="workCheck">
        <el-input
          type="textarea"
          v-model="form.fileldworkNote"
          placeholder="请输入现场核查结果及意见"
          :disabled="codestate"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="table-list" v-if="show">
      <el-table
        :data="tableData"
        border
        :header-cell-style="globalHeaderStyle"
        :cell-style="globalCellStyle"
      >
        <el-table-column prop="activitySource" label="环节"></el-table-column>
        <el-table-column prop="dealer" label="办理人"></el-table-column>
        <el-table-column prop="dealTime" label="办理时间"></el-table-column>
        <el-table-column prop="remark" label="办理意见"></el-table-column>
      </el-table>
    </div>
    <div class="checkBox" v-if="!(this.$route.params.state == 'done')">
      <el-form v-model="checkForm">
        <el-row :gutter="20">
          <el-form-item label="当前环节:" label-width="5rem">
            <span class="process_p">{{
              handleSpecialActivityName(activityName)
            }}</span>
          </el-form-item>
          <el-form-item label="办理意见:" label-width="5rem">
            <ContextTextarea
              v-model="checkForm.remark"
              :list="commonWords"
            ></ContextTextarea>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div class="submitBtn" v-if="!flagOpen">
      <el-button
        type="primary"
        @click="submit"
        size="small"
        v-if="hasPerm('fygl_rksp_bpjbxx_tj')"
        >提交下一环节</el-button
      >
      <el-button
        type="primary"
        size="small"
        @click="backToLink()"
        v-if="hasPerm('fygl_rksp_bpjbxx_th')"
        >退回</el-button
      >
    </div>
    <!-- 提交-时若当前环节为"资产运维部初审"，则打开此弹框 -->
    <el-dialog
      title="请选择要提交的环节"
      :visible.sync="submitDialog"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-radio-group v-model="activityDestination">
        <el-radio
          class="selectRadio"
          v-for="item in acitivityNameList"
          :label="item"
          :key="item.index"
        ></el-radio>
      </el-radio-group>
      <div class="selectBtn">
        <el-button size="mini" @click="submitDialog = false">取消</el-button>
        <el-button type="primary" size="mini" @click="toSureCommit"
          >确定</el-button
        >
      </div>
    </el-dialog>
    <!-- 弹框-退回 -->
    <el-dialog
      title="请选择要退回的环节"
      :visible.sync="returnDialog"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-radio-group v-model="returnDestination">
        <el-radio
          class="selectRadio"
          v-for="item in returnNameList"
          :label="item.name"
          :key="item.index"
        ></el-radio>
      </el-radio-group>
      <div class="selectBtn">
        <el-button size="mini" @click="cancelReturn">取消</el-button>
        <el-button type="primary" size="mini" @click="toSureReturn"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import api from "@/api/houseApproval";
import common from "@/api/publicMethod.js";
import titleStyle from "@/components/TitleStyle";
import ContextTextarea from "@/components/ContextTextarea"; //常用意见组件
import http from "@/api/common(bj).js";
export default {
  name: "approvalInformation",
  inject: ["reload"],
  components: {
    titleStyle,
    ContextTextarea,
  },
  data() {
    return {
      show: true,
      submitFile: false, //暂时放置提交
      flagOpen: false, //是否可输入的表单及可点击的按钮
      form: {
        code: "",
        subject: "",
        accordance: "",
        accountableUnit: "",
        accountableUnitName: "",
        view: "",
        afterFieldwork: false,
        fileldworkNote: "",
        examinePass: "",
        examineNote: "",
        houseCount: "", //假数据,
        allocationRight: "", //分配权归属单位
        signatoryRightUnit: "", //签约权归属单位
        maintainRight: "", //数据维护权归属单位
        operationalRight: "", //运维权归属单位
        isConform: "", //符合/不符合单选框
        constructionDetails: "", //符合/不符合意见文本框
        //afterFieldwork: "", //是否完成现场核查单选框
        //fileldworkNote: "", //是否完成现场核查文本框
      },
      proposerForm: {},
      legalIdenTypeData: [], // 重点单位类型
      industryTypeList: [], //单位所属行业下拉框
      propertyData: [], // 单位性质
      unitIdenTypeData: [], // 单位证件类型下拉数据
      unitTypeData: [], //证件类型
      divisionUnit: [], //分配权归属单位下拉框
      signingUnit: [], //签约权归属单位下拉框
      maintenanceUnit: [], //数据维护权归属单位下拉框
      operations: [], //运维权归属单位下拉框
      ascriptionoptions: [], //上报责任单位
      firstTitle: "申请入库房源概况",
      secondTitle: "房源使用权管理",
      thirdTitle: "审核意见",
      nature: [], //房屋性质
      type: [], //户型
      area: [], //面积
      completionArea: [], //竣工面积
      codestate: false, //判断是否禁用
      rulesx: [{ required: true }], //必填规则
      //表格假数据
      tableData: [], //审核意见列表
      submitDialog: false, //提交弹框
      returnDialog: false, //退回弹框
      guid: "", //报批guid
      projectId: "", //流程Id
      taskId: "", //任务ID
      activityName: "", //环节名称
      activityDestination: "", //目标环节
      returnDestination: "", //退回环节
      acitivityNameList: [], //提交弹框环节选项
      returnNameList: [], //退回环节选项
      checkForm: {
        remark: "", //办理意见
        dealer: "", //办理人
      },
      conFormContrl: false, //符合/不符合判定控制是否可读
      workCheck: false, //现场核查完成/未完成是否显示
      conform: false, //房源是否符合建设项目是否显示
      newState: "", //待办已办
      commonWords: [], //办理意见常用语
      uintAllocationRight: [],
      report: "",
      trueOrFalse: [
        { value: true, label: "是" },
        { value: false, label: "否" },
      ],
      showDwxx: false,
      qymsList: [],
      isShow: true, //控制签约模式显隐
    };
  },
  methods: {
    showCard() {
      this.opinion = true;
    },
    //获取字典
    getDictionary() {
      let name = [
        "分配权归属单位",
        "签约权归属单位",
        "数据维护权归属",
        "运维权归属",
        "建筹上报责任单位",
        "办理意见常用语",
        "单位分配权归属单位",
        "签约模式",
        "重点单位类型",
        "单位性质",
        "证件类型",
        "单位证件类型",
      ];
      let params = {
        names: name.toString(),
      };
      api
        .searchDictionary(params)
        .then((res) => {
          res = JSON.parse(res);
          this.divisionUnit = res.分配权归属单位;
          this.signingUnit = res.签约权归属单位;
          this.maintenanceUnit = res.数据维护权归属;
          this.operations = res.运维权归属;
          this.ascriptionoptions = res.建筹上报责任单位;
          this.commonWords = this.$dictionaryChange(
            res.办理意见常用语,
            this.commonWords,
            "房源分配常用意见"
          );
          this.unitTypeData = this.$dictionaryChange(
            res.重点单位类型,
            this.unitTypeData,
            "分配"
          );
          this.propertyData = this.$dictionaryChange(
            res.单位性质,
            this.propertyData,
            "通用"
          );
          this.unitIdenTypeData = res.单位证件类型;
          this.uintAllocationRight = res.单位分配权归属单位;
          this.qymsList = res.签约模式;
          this.legalIdenTypeData = this.$dictionaryChange(
            res.证件类型,
            this.legalIdenTypeData,
            "通用"
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectTrigger() {
      // this.form.operationalRight = this.form.signatoryRightUnit;
    },
    reportChange() {
      if (this.form.report == "是") {
        this.showDwxx = true;
      } else {
        this.showDwxx = false;
      }
    },
    getEnterpriseInfo(uscc) {
      let params = { uscc: uscc };
      http.getEnterpriseInfo(params).then((resp) => {
        resp.property = resp.property + "";
        this.proposerForm = resp;
      });
    },
    //获取批次信息
    getQueryReport() {
      let _params = { reportGuid: this.$parent.params.reportGuid };
      console.log(_params);
      api
        .getQueryReport(_params)
        .then((res) => {
          res.forEach((element) => {
            this.$route.query.houseGuid = element.reportDistrictGuid;
            this.form = element;
            this.nature = element.count.nature; //房屋概况-房源性质/套数
            this.area = element.count.area; //房屋概况-面积/套数
            this.type = element.count.type; //房屋概况-户型/套数
            this.completionArea = element.count.completionArea; //房屋概况-竣工面积/套数
            this.reportChange();
            if (this.form.uscc) {
              this.getEnterpriseInfo(this.form.uscc);
            }
          });
          this.report = res[0].report;
          if (this.report && this.report == "否") {
            this.isShow = false;
          }
          this.$parent.params.districtGuid = res[0].reportDistrictGuid;
          if (this.form.accountableUnit) {
            if (!this.form.maintainRight)
              this.form.maintainRight = this.form.accountableUnit; //数据维护权默认为上报责任单位
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //保存批次信息
    save() {
      if (!this.form.allocationRight) {
        this.$alert("请选择分配权归属单位", "提示");
      } else if (!this.form.signatoryRightUnit) {
        this.$alert("请选择签约权归属单位");
      } else if (!this.form.maintainRight) {
        this.$alert("请选择数据维护权归属单位");
      } else if (!this.form.operationalRight) {
        this.$alert("请选择运维权归属单位");
      } else if (
        !this.form.isConform &&
        this.conFormContrl == false &&
        this.conform == true
      ) {
        this.$alert(
          "请选择本批次房源是否符合建设项目管理任务书/监管协议的要求"
        );
      } else if (!this.form.afterFieldwork && this.workCheck == true) {
        this.$alert("请选择本批次房源是否已完成现场核查");
      } else {
        this.$confirm("此操作将进行保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let params = {
              reportGuid: this.$parent.params.reportGuid,
              allocationRight: this.form.allocationRight,
              signatoryRightUnit: this.form.signatoryRightUnit,
              maintainRight: this.form.maintainRight,
              operationalRight: this.form.operationalRight,
              isConform: this.form.isConform,
              constructionDetails: this.form.constructionDetails,
              afterFieldwork: this.form.afterFieldwork,
              fileldworkNote: this.form.fileldworkNote,
              signModel: this.form.signModel,
            };
            api
              .saveApprovalInfo(params)
              .then((res) => {
                this.$message({
                  type: "success",
                  message: "保存成功！",
                });
                this.Event.$emit("query", "HouseApproval");
                this.saveTempOpinion();
                console.log(res);
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
    //查看结果
    handleClick(row) {
      if (row != null) {
        this.$confirm("查询的结果为," + row + "?", "查看结果", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
      } else {
        this.$confirm("查询的结果为无错误", "查看结果", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
      }
    },
    //提交
    submit() {
      if (!this.form.allocationRight) {
        this.$alert("请选择分配权归属单位", "提示");
      } else if (!this.form.signatoryRightUnit) {
        this.$alert("请选择签约权归属单位", "提示");
      } else if (!this.form.maintainRight) {
        this.$alert("请选择数据维护权归属单位", "提示");
      } else if (!this.form.operationalRight) {
        this.$alert("请选择运维权归属单位", "提示");
      } else if (
        !this.form.isConform &&
        this.conFormContrl == false &&
        this.conform == true
      ) {
        this.$alert(
          "请选择本批次房源是否符合建设项目管理任务书/监管协议的要求",
          "提示"
        );
      } else if (!this.form.afterFieldwork && this.workCheck == true) {
        this.$alert("请选择本批次房源是否已完成现场核查", "提示");
      } else if (!this.checkForm.remark) {
        this.$alert("请填写办理意见", "提示");
      } else {
        //先保存
        this.$confirm("此操作将进行保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$startLoading();
            let params = {
              reportGuid: this.$parent.params.reportGuid,
              allocationRight: this.form.allocationRight,
              signatoryRightUnit: this.form.signatoryRightUnit,
              maintainRight: this.form.maintainRight,
              operationalRight: this.form.operationalRight,
              isConform: this.form.isConform,
              constructionDetails: this.form.constructionDetails,
              afterFieldwork: this.form.afterFieldwork,
              fileldworkNote: this.form.fileldworkNote,
              signModel: this.form.signModel,
            };
            api
              .saveApprovalInfo(params)
              .then((res) => {
                this.saveTempOpinion();
                this.toSureCommit();
                if (this.activityName == "资产运维部初审") {
                  this.getActivityNames();
                }
                // this.$endLoading();
              })
              .catch((err) => {
                console.log(err);
                this.$endLoading();
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消保存",
            });
          });

        //再提交
      }
    },
    //获取目标环节选项（在资产运维部初审环节调用）
    getActivityNames() {
      let params = {
        taskId: this.taskId,
        projectId: this.projectId,
        activityName: this.activityName,
      };
      api
        .getActivityNames(params)
        .then((res) => {
          this.acitivityNameList = this.handleSpecialSendActivityName(res);
          this.submitDialog = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //确定提交
    toSureCommit() {
      if (this.activityName == "资产运维部初审") {
        if (!this.activityDestination) {
          this.$message({
            message: "请选择提交的环节",
          });
        } else {
          this.submitApprovalProcess();
        }
      } else {
        this.submitApprovalProcess();
      }
    },
    //确定提交接口
    submitApprovalProcess() {
      this.$startLoading();
      let params = {
        reportGuid: this.$parent.params.reportGuid,
        taskId: this.taskId,
        projectId: this.projectId,
        activityName: this.activityName,
        activityDestination: this.resumeSpecialSendActivityName(
          this.activityDestination
        ),
      };
      api
        .submitApprovalProcess(params)
        .then((res) => {
          console.log(res.status);
          this.submitDialog = false;
          this.saveOpinion(); //保存暂存意见
          this.$message({
            type: "success",
            message: "提交成功!",
          });
          this.Event.$emit("query", "HouseApproval");
          this.$parent.closeTopTab();
          if (res.status) {
            this.$endLoading();
          }
        })
        .catch((err) => {
          console.log(err);
          this.$endLoading();
        });
    },
    //退回按钮
    backToLink() {
      if (!this.checkForm.remark) {
        this.$alert("请填写办理意见", "提示");
      } else {
        this.getCouldReturn();
      }
    },
    //获取可退回环节
    getCouldReturn() {
      let params = {
        projectId: this.projectId,
        taskId: this.taskId,
      };
      api
        .getCouldReturn(params)
        .then((res) => {
          let newList = res.children;
          let newJson = '{"name": "申请"}';
          newList.push(JSON.parse(newJson));
          this.returnNameList = newList; //赋值
          this.returnDialog = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //确定退回
    toSureReturn() {
      let activityList = {};
      this.returnNameList.forEach((item) => {
        if (this.returnDestination == item.name) {
          activityList = item;
          return;
        }
      });
      if (!this.returnDestination) {
        this.$message("请选择要退回的环节");
      } else {
        let data = [activityList];
        let isRebackToAppliacnt = false;
        if (this.returnDestination == "申请") isRebackToAppliacnt = true;
        let params = {
          projectId: this.projectId,
          taskId: this.taskId,
          activityName: this.activityName,
          isRebackToAppliacnt: isRebackToAppliacnt,
        };
        this.$startLoading();
        api
          .processRetrun(params, data)
          .then((res) => {
            this.returnDialog = false;
            this.saveOpinion();
            this.$message({
              type: "success",
              message: "退回成功！",
            });
            this.Event.$emit("query", "HouseApproval");
            this.$parent.closeTopTab();
            this.$endLoading();
          })
          .catch((err) => {
            console.log(err);
            this.$endLoading();
          });
      }
    },
    //取消退回
    cancelReturn() {
      this.returnDialog = false;
    },
    //得到当前登录人
    getLoginer() {
      let params = {};
      api
        .getLoginer(params)
        .then((res) => {
          this.checkForm.dealer = res.userName;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //保存办理意见
    saveOpinion() {
      let params = { taskId: this.taskId };
      let data = {
        activitySource: this.activityName, //目标环节
        businessType:
          this.form.report == "是" ? "单位自有住房入库" : "房源入库审批(新)", //业务类型
        pid: this.projectId, //流程Id
        dealTime: new Date(), //办理时间
        dealer: this.checkForm.dealer, //办理人
        remark: this.checkForm.remark, //办理意见
      };
      api
        .saveOpinion(params, data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //保存暂存意见
    saveTempOpinion() {
      let params = { taskId: this.taskId };
      let data = {
        activitySource: this.activityName, //目标环节
        businessType:
          this.form.report == "是" ? "单位自有住房入库" : "房源入库审批(新)", //业务类型
        pid: this.projectId,
        dealTime: new Date(), //办理时间
        dealer: this.checkForm.dealer, //办理人
        remark: this.checkForm.remark, //办理意见
      };
      api
        .saveTempOpinion(params, data)
        .then((res) => {
          this.getTempOpinion();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取办理意见列表
    getOpionionList() {
      let params = {
        pid: this.projectId,
      };
      api
        .getOpinion(params)
        .then((res) => {
          this.tableData = this.handleSpecialData(res);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //处理特殊数据。1、资产运维部初审—>资产运维初审。2、资产运维部复审—>资产运维复审。3、资产运维部终审—>资产运维终审。
    handleSpecialData(tableData) {
      tableData.forEach((item) => {
        if (
          item.activitySource == "资产运维部初审" ||
          item.activitySource == "资产运维部复审" ||
          item.activitySource == "资产运维部终审"
        ) {
          item.activitySource = item.activitySource.replace(
            "资产运维部",
            "资产运维"
          );
        }
      });
      return tableData;
    },
    //获取暂存意见
    getTempOpinion() {
      let params = {
        taskId: this.taskId,
      };
      api
        .getTempOpinion(params)
        .then((res) => {
          this.checkForm.remark = res.remark;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取流程信息
    getProcessInfo() {
      let params = {
        taskId: this.taskId,
      };
      common
        .getProcessInfo(params)
        .then((res) => {
          console.log(res[0]);
          this.activityName = res[0].ACTIVITYNAME;
          this.$parent.params.activityName = res[0].ACTIVITYNAME;
          if (this.activityName == "资产运维部初审") {
            this.codestate = false;
            this.workCheck = true; //对 完成/未完成 及 文本框 判定是否显示
          } else if (this.activityName == "建设筹集部门审核") {
            this.codestate = true; //核查不可填
            this.workCheck = true; //核查显示
            this.conform = true; //建设显示
            this.conFormContrl = false; //建设可填
          } else if (
            this.activityName == "资产运维部复审" ||
            this.activityName == "资产运维部终审"
          ) {
            this.codestate = true; //核查不可填
            this.workCheck = true; //核查显示
            this.conform = true; //建设显示
            this.conFormContrl = true; //建设不可填
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //处理特殊数据。1、资产运维部初审—>资产运维初审。2、资产运维部复审—>资产运维复审。3、资产运维部终审—>资产运维终审。
    handleSpecialActivityName(activityName) {
      if (
        activityName == "资产运维部初审" ||
        activityName == "资产运维部复审" ||
        activityName == "资产运维部终审"
      ) {
        activityName = activityName.replace("资产运维部", "资产运维");
      }
      return activityName;
    },
    handleSpecialSendActivityName(activityList) {
      activityList.forEach((item, index) => {
        activityList[index] = this.handleSpecialActivityName(item);
      });
      return activityList;
    },
    resumeSpecialSendActivityName(activityName) {
      if (
        activityName == "资产运维初审" ||
        activityName == "资产运维复审" ||
        activityName == "资产运维终审"
      ) {
        activityName = activityName.replace("资产运维", "资产运维部");
      }
      return activityName;
    },
  },
  created() {
    this.getDictionary(); //查询字典
    this.getLoginer(); //获取当前登录人
  },

  mounted() {
    this.newState = this.$parent.params.newState = this.$route.params.state;
    let newParams = this.$route.query;
    this.guid = this.$parent.params.reportGuid = newParams.guid;
    this.projectId = this.$parent.params.pid = newParams.pid;
    this.taskId = this.$parent.params.tid = newParams.tid;
    this.getQueryReport(); //查询批次信息
    this.getProcessInfo(); //获取六层数据
    if (this.newState && this.newState == "done") {
      //判断是否已办
      this.flagOpen = true; //禁用表单，隐藏按钮
    }
    this.getOpionionList(); //获取意见列表
    this.getTempOpinion(); // 获取暂存意见

    if (this.form.accountableUnit) {
      if (!this.form.allocationRight)
        this.form.allocationRight = this.form.accountableUnit; //分配权默认为上报责任单位
      if (!this.form.maintainRight)
        this.form.maintainRight = this.form.accountableUnit; //数据维护权默认为上报责任单位
    }
  },
};
</script>

<style lang="scss" scoped>
.approvalInformation {
  .el-textarea /deep/ textarea {
    height: 100px;
    resize: none;
  }
}
/deep/ .el-form-item .el-form-item__label::before {
  //必填图标位置修改
  display: none;
}
/deep/ .is-required .el-form-item__label::after {
  content: "*";
  color: #f56c6c;
  margin-left: 4px;
}
.toSubmit {
  width: 100%;
  height: 50px;
  > .el-button {
    float: right;
  }
}
.housing {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  padding-bottom: 30px;
  font-size: 16px;
  .category-data,
  .buildingArea,
  .hosueType {
    width: 21rem;
    height: auto;
    border-radius: 10px;
    box-shadow: 0px 0px 20px 8px #eef4fc;
    .title-bg {
      width: 100%;
      height: 2rem;
      th {
        margin-left: 20px;
        font-weight: normal;
      }
    }
    .table {
      table {
        margin: 10px auto;
        border: 1px solid rgba(221, 229, 249, 0.788);
        border-collapse: collapse;
        tr {
          border: 1px solid rgb(234, 238, 248);
        }
        th:first-child {
          border: 1px solid rgb(234, 238, 248);
          font-size: 16px;
          height: 2rem;
          width: 11rem;
        }
        th {
          border: 1px solid rgb(234, 238, 248);
          font-size: 16px;
          height: 2rem;
          width: 6rem;
        }
        td {
          text-align: center;
          color: #555;
          border: 1px solid rgb(234, 238, 248);
          font-size: 14px;
          height: 2rem;
          width: 8rem;
        }
      }
    }
  }
  .category-data {
    .title-bg {
      background: #fef6e9;
      th {
        color: #f6b850;
      }
    }
  }
  .buildingArea {
    .title-bg {
      background: #eef9f4;
      th {
        color: #71d0a5;
      }
    }
  }
  .hosueType {
    .title-bg {
      background: #e9f7fc;
      th {
        color: #5dc7ea;
      }
    }
  }
}
.w100 {
  width: 100%;
}
.submitBtn {
  text-align: center;
  margin: 10px auto;
}
.selectRadio {
  display: block;
  margin: 20px auto 20px 30px;
}
.selectBtn {
  text-align: center;
}
.process_p {
  color: #fdae2b;
}
.checkBox {
  margin-top: 20px;
}
.unit_p {
  color: #838383;
  margin-top: -4px;
}
/deep/.el-textarea__inner {
  font-size: 16px;
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
