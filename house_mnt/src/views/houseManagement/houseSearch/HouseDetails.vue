<!--房详情-->
<template>
  <div class="house-details">
    <!-- <div class="buttonGroup">
      <el-button
        type="primary"
        @click="oepnpropertyRightInfoDialog"
        size="mini"
        v-if="hasPerm('fygl_fyfwk_fwxx_cqxxbd')"
      >产权信息补登</el-button>
      <el-button
        type="primary"
        @click="openLogDialog"
        size="mini"
        v-if="hasPerm('fygl_fyfwk_fwxx_ckrz')"
      >查看日志</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="openCheckPeople"
        v-if="hasPerm('fygl_fyfwk_fwxx_ckrzr')"
      >查看入住人</el-button> -->
      <!-- <el-button
        type="primary"
        size="mini"
        @click="changeNote()"
        v-if="hasPerm('fygl_fyfwk_fwxx_bz')"
      >备注</el-button>-->
    <!-- </div> -->
    <!-- 房源基础信息 -->
    <div class="tableStyle">
      <el-collapse v-model="openCollapse">
        <!-- 房源基本信息 -->
        <el-collapse-item name="1">
          <template slot="title">
            <publicTitle title="房源基本信息"></publicTitle>
          </template>
          <div>
            <table class="detail">
              <tr>
                <td>小区编号</td>
                <td>
                  <el-input disabled v-model="form.districtNo"></el-input>
                </td>
                <td>小区名称</td>
                <td>
                  <el-input disabled v-model="form.districtName"></el-input>
                </td>
              </tr>
              <tr>
                <td>栋号</td>
                <td>
                  <el-input disabled v-model="form.buildNo"></el-input>
                </td>
                <td>栋名称</td>
                <td>
                  <el-input disabled v-model="form.buildName"></el-input>
                </td>
              </tr>
              <tr>
                <td>房号</td>
                <td>
                  <el-input disabled v-model="form.houseNo"></el-input>
                </td>
                <td>网格办编码</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.serialNo"></el-input>
                  <!-- <el-button
                    type="primary"
                    size="mini"
                    @click="location"
                    style="position:absolute;top:7px;right:5px;"
                    v-if="hasPerm('fygl_fyfwk_fwxx_dw')"
                  >定位</el-button> -->
                </td>
              </tr>
              <tr>
                <td>房屋状态</td>
                <td>
                  <el-input disabled v-model="form.stateName"></el-input>
                </td>
                <td>所在单元</td>
                <td>
                  <el-input disabled v-model="form.unit"></el-input>
                </td>
              </tr>
              <tr>
                <td>所在楼层</td>
                <td>
                  <el-input disabled v-model="form.floorNo"></el-input>
                </td>
                <td>房屋来源</td>
                <td>
                  <el-select style="width: 100%;" v-model="form.source" disabled>
                    <el-option
                      v-for="(item, index) in sourceData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>房屋用途</td>
                <td>
                  <el-select style="width: 100%;" v-model="form.function" disabled>
                    <el-option
                      v-for="(item, index) in functionData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>户型</td>
                <td>
                  <el-select
                    v-model="form.houseLayout"
                    placeholder="请选择"
                    style="width: 100%"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in typeData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>朝向</td>
                <td>
                  <el-select
                    style="width: 100%;"
                    v-model="form.orientation"
                    placeholder="请选择"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in orientationData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>平台</td>
                <td>
                  <el-select v-model="form.terrace" placeholder="请选择" style="width: 100%" disabled>
                    <el-option
                      v-for="(item, index) in terraceData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>是否有架空层</td>
                <td>
                  <el-select
                    style="width: 100%;"
                    v-model="form.innerFloor"
                    placeholder="请选择"
                    disabled
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>(预测绘)建筑面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.coveredArea"></el-input>
                  <span style="position:absolute;top:2px;right:5px;">m²</span>
                </td>
              </tr>
              <tr>
                <td>(预测绘)分摊面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.residentialPoolArea"></el-input>
                  <span style="position:absolute;top:2px;right:5px;">m²</span>
                </td>
                <td>(预测绘)套内面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.indoorArea"></el-input>
                  <span style="position:absolute;top:2px;right:5px;">m²</span>
                </td>
              </tr>
              <tr>
                <td>竣工建筑面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.completionArea"></el-input>
                  <span style="position:absolute;top:2px;right:5px;">m²</span>
                </td>
                <td>竣工分摊面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.completionShareArea"></el-input>
                  <span style="position:absolute;top:2px;right:5px;">m²</span>
                </td>
              </tr>
              <tr>
                <td>竣工套内面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.completionIndoorArea"></el-input>
                  <span style="position:absolute;top:2px;right:5px;">m²</span>
                </td>
                <td>分摊面积说明</td>
                <td>
                  <el-input v-model="form.residentialAreaContent" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>开工时间</td>
                <td>
                  <el-date-picker
                    class="w100"
                    type="date"
                    v-model="form.startConstructionTime"
                    disabled
                  ></el-date-picker>
                </td>
                <td>竣工时间</td>
                <td>
                  <el-date-picker
                    class="w100"
                    type="date"
                    v-model="form.finishConstructionTime"
                    disabled
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>交付使用时间</td>
                <td>
                  <el-date-picker class="w100" type="date" v-model="form.deliveryTime" disabled></el-date-picker>
                </td>
                <td>装修标准</td>
                <td>
                  <el-input disabled v-model="form.decorationType"></el-input>
                </td>
              </tr>
              <tr>
                <td>装修标准说明</td>
                <td colspan="3">
                  <el-tooltip class="item" effect="dark" content="此处利用鼠标可拖动" placement="right-end">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4 }"
                      placeholder="请输入内容"
                      disabled
                      v-model="form.decorationTypeDescription"
                    ></el-input>
                  </el-tooltip>
                </td>
              </tr>
              <tr>
                <td>是否样板房</td>
                <td>
                  <el-select
                    style="width: 100%;"
                    v-model="form.modelHouses"
                    placeholder="请选择"
                    disabled
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>是否代售</td>
                <td>
                  <el-select
                    style="width: 100%;"
                    v-model="form.helpSell"
                    placeholder="请选择"
                    disabled
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
            </table>
          </div>
          </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 产权信息补登 -->
    <el-dialog
      title="产权信息补登"
      :visible.sync="dialogIsShow"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-form :model="propertyRightInfo" label-position="right" label-width="6rem" size="mini">
        <el-form-item label="权利人">
          <el-input v-model="propertyRightInfo.obligee" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用期限">
          <el-date-picker
            v-model="propertyRightInfo.startUseTime"
            type="date"
            placeholder="选择日期"
            style="width:48%;display:inline-block"
          ></el-date-picker>至
          <el-date-picker
            v-model="propertyRightInfo.endUserTime"
            type="date"
            placeholder="选择日期"
            style="width:48%;display:inline-block"
          ></el-date-picker>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="不动产单元号">
              <el-input v-model="propertyRightInfo.immovablePropertyUnitNo" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登记价人民币">
              <el-input v-model="propertyRightInfo.registPrice" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="登记时间">
              <el-date-picker
                v-model="propertyRightInfo.djsj"
                type="date"
                style="width:100%"
                placeholder="选择日期"
                width="100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="竣工时间">
              <el-date-picker
                v-model="propertyRightInfo.finishConstructionTime"
                type="date"
                style="width:100%"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="套内面积">
              <el-input v-model="propertyRightInfo.indoorArea" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="共有情况">
              <el-input v-model="propertyRightInfo.commonalityCondition" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="房屋现值">
              <el-input v-model="propertyRightInfo.housePresentPrice" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房屋原值">
              <el-input v-model="propertyRightInfo.houseOriginalPrice" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="不动产证书号">
              <el-input v-model="propertyRightInfo.rightOverImmovablesId" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align:center;">
        <el-button size="mini" @click="dialogIsShow = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="dialogSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看日志 -->
    <el-dialog :visible.sync="logDialog" width="80%" title="查看日志" :close-on-click-modal="false">
      <el-form size="mini" :model="logForm" label-width="5rem">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="日志类型">
              <el-select v-model="logForm.auditType" clearable>
                <el-option
                  v-for="(item, index) in logType"
                  :label="item.name"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房屋状态">
              <el-select v-model="logForm.state" clearable>
                <el-option
                  v-for="(item, index) in houseState"
                  :label="item.name"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" size="mini" @click="getLog()">查 询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class="table-list">
        <el-table
          :data="logList"
          border
          size="mini"
          height="300"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column prop="processTime" label="操作日期" sortable width="120"></el-table-column>
          <el-table-column prop="subjectUnit" label="单位" width="180"></el-table-column>
          <el-table-column prop="subjectName" label="操作人" width="80"></el-table-column>
          <el-table-column prop="actionName" label="操作" width="160"></el-table-column>
          <el-table-column prop="context" label="操作详情"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 查看附件 -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/api/house.js";
import api from "@/api/houseApproval";
import publicMethod from "@/api/publicMethod";
import https from "@/api/vacuumRoominquire.js";
import housestore from "@/api/housestore";
import publicTitle from "@/components/TitleStyle"; //标题组件
import TitleStylex from "@/components/TitleStylex"; //带按钮的标题组件
import Material from "@/components/CorrelativeMaterial";
// import propertyRightChangeApplyInfoVue from "../../propertyRightChange/propertyRightChangeApplyInfo.vue";
export default {
  name: "buildingDetails",
  components: {
    publicTitle, //标题公共组件
    Material, //公共组件
    TitleStylex, //带按钮的标题公共组件
  },
  data() {
    return {
      val: "3",
      options: [
        { value: true, label: "是" },
        { value: false, label: "否" },
      ], //是否下拉菜单
      signInfoData: [], //签约数据
      deviceInfoData: [], //设备数据
      isShow: false, //根据不同的签约类型的显隐开关
      dialogIsShow: false, //产权信息补登开关
      checkLog: false, //日志开关
      form: {}, //基本信息
      propertyRightInfo: {}, //产权信息补登
      activeNames: [],
      activeName: [],
      typeData: [], //户型
      orientationData: [], //朝向
      terraceData: [], //平台
      divisionUnit: [], //分配权归属单位下拉框
      signingUnit: [], //签约权归属单位下拉框
      maintenanceUnit: [], //数据维护权归属单位下拉框
      operations: [], //运维权归属单位下拉框
      originalPropertyData: [], //当前属性下拉框
      currentPropertyData: [], //初始属性下拉框
      sourceData: [], //房屋来源
      functionData: [], //房屋用途
      houseType: [], //房屋性质
      checkPeopleDialog: false, //查看人弹框
      homeRetalInfo: [], //家庭承租信息
      unitRetalInfo: [], //单位承租信息
      homeBuyHouseInfo: [], //家庭购房情况
      unitBuyHouseInfo: [], //单位购房情况
      unitHousingReformInfo: [], //单位房改房情况
      isPutShow: true, //入库出库情况显示开关
      homeRetalForm: {
        name: "",
        mobilePhone: "",
      }, //家庭承租信息表单
      unitRetalForm: {
        unitName: "",
        houseMan: "",
        houseMan2: "",
        houseManPhone: "",
        houseManPhone2: "",
      }, //单位承租信息表单
      homeBuyHouseForm: {
        name: "",
        mobilePhone: "",
        contractTime: "",
        moveAwayTime: "",
      }, //家庭购房情况表单
      unitBuyHouseForm: {
        name: "",
      }, //单位购房情况表单
      unitHousingReformForm: {
        name: "",
      }, //单位房改房情况表单
      logDialog: false, //日志弹框
      logList: [], //日志列表
      outstock: {}, //核销记录
      checkAttachmentDialog: false, //附件弹框
      relieveDialog: false, //解除弹框
      situationalList: [], //问题房源标注列表
      situationalInfo: "", //问题列表的详情信息
      parameter: "", //过程材料传参
      removeBasis: "", //解除依据
      relieveList: [], //预留情况列表
      incomingAndOutgoingStatusList: [], //入库和出库情况列表
      propertyRightRecordsDialog: false, //产权记录弹框
      propertyRightRecordsList: [], //产权记录列表
      natureRecordsDialog: false, //性质变更记录弹框
      natureChangeRecordsList: [], //性质变更记录列表
      title: "", //标题
      historyRecordsDialog: false, //历史记录弹框
      allocationRecordsList: [], //性质变更记录列表
      signatoryRightRecordsList: [], //性质变更记录列表
      InitialMaintainRightRecordsList: [], //性质变更记录列表
      perationalRightRecordsList: [], //性质变更记录列表
      propertyRightRecordsDetailDialog: false, //产权记录详细情况弹框
      propertyRightDetailform: {}, //产权变更详细记录表单
      propertyRightDetailTable: [], //产权变更详细记录选中房表格和性质变更详细记录选中房意见
      detailOpinion: [], //产权变更详细记录选中房意见
      propertyRightDetailPage: {
        //产权变更选中房的分页的数据
        currentPage: 1,
        pageSize: 10,
        pageSizesList: [10, 20, 30, 40],
        totalNumber: 0,
      },
      propertyRightDetailCode: "", //产权变更详情code码
      natureRecordsDetailDialog: false, //性质变更记录详细情况弹框
      natureDetailform: {}, //性质变更详细记录表单
      natureDetailTable: [], //性质变更详细记录选中房表格
      natureDetailPage: {
        //性质变更选中房的分页的数据
        currentPage: 1,
        pageSize: 10,
        pageSizesList: [10, 20, 30, 40],
        totalNumber: 0,
      },
      errataDetailPage: {
        currentPage: 1,
        pageSize: 10,
        pageSizesList: [10, 20, 30, 40],
        totalNumber: 0,
      },
      errataInfoPage: {
        currentPage: 1,
        pageSize: 10,
        pageSizesList: [10, 20, 30, 40],
        totalNumber: 0,
      },
      housePlanInfoShow: false, //房源计划显示和隐藏(轮候显示，定向隐藏)
      allocationBatchInfoShow: false, //批次基本信息的显隐
      signInfoShow: false, //签约信息的显隐
      afterRentShow: false, //租后信息的显隐
      natureDetailCode: "", //性质变更详情code码
      openCollapse: "1", //默认打开第一个
      rentSituationList: [], //出租情况列表
      rentSituationDetailDialog: false, //出租详情弹框
      houseErrataDetailDialog: false, //查看勘误修改详情
      houseErrataAreaDetailDialog: false, //查看面积勘误详情
      houseErrataImportDetailDialog: false, //查看信息导入需改详情
      housePlanFrom: {}, //房源计划表格信息
      queueStr: "", //队列显示在input内
      groupStr: "", //分组显示在input内
      planUseData: [], //供应计划下拉
      supplyCodeOptions: [], //供应计划下拉
      planPropertyData: [], //计划属性下拉
      housePlanListForm: {}, //房源计划选中房查询条件
      housePlanList: [], //房源计划选中房列表
      housePlanListPage: {
        currentPage: 1,
        pageSize: 100,
        pageSizesList: [100, 200, 500, 1000],
        totalNumber: 0, //数据的总数
      },
      stateData: [], //房屋状态下拉列表
      planGuid: "", //计划的guid
      planPid: "", //计划的pid
      housePlanOpinion: [], //房源计划审核意见列表
      show: false,
      generalMessageDialog: false, //看分配方式、租后信息、查看签约信息的弹框是否打开
      signUpGuid: "", //签约标识
      batchCode: "", //批次代码
      distributionType: "", //分配方式
      batchInfo: {}, //批次信息
      signInfo: {}, //签约信息
      signOtherPersonalInfo: [], //签约其他人信息
      signUnitInfo: {}, //签约单位信息
      signType: "", //签约类型(区分单位还是个人)
      contractType: [], //合同类型
      rentStandard: [], //租金标准
      signTypeList: [], //签约方式
      distributeTypeData: [], //分配方式
      fwcslxOptions: [], //房屋初始类型
      hxOptions: [], //户型
      zjlxOptions: [], //证件类型
      xbOptions: [], //性别
      hyztOptions: [], //婚姻状况
      znzkoptions: [], //子女状况
      xlOptions: [], //学历
      xwOptions: [], //学位
      zwOptions: [], //职务
      zcOptions: [], //职称
      hkszdOptions: [], //户口所在地
      dwxzOptions: [], //单位性质
      ysqrgxOptions: [], //与申请人关系
      fpywlxOptions: [], //分配业务类型
      openNoteDialog: false, //控制备注弹框显隐
      remark: "", //备注弹框-备注字段
      erratList: [],
      erratDetailList: [],
      erratAreaList: [],
      erratImportList: [],
      errataType: "", //勘误类型
      logType: [], //日志类型
      houseState: [
        { name: "空房", value: "空房" },
        { name: "已预留", value: "已预留" },
        { name: "准计划", value: "准计划" },
        { name: "已计划", value: "已计划" },
        { name: "已分配未签约", value: "已分配未签约" },
        { name: "已出租", value: "已出租" },
        { name: "已签协议未签合同", value: "已签协议未签合同" },
        { name: "已出售", value: "已出售" },
        { name: "已取得全部产权", value: "已取得全部产权" },
        { name: "已拆除", value: "已拆除" },
        { name: "长租住房租赁到期", value: "长租住房租赁到期" },
        { name: "其他原因出库", value: "其他原因出库" },
        { name: "预房屋", value: "预房屋" },
      ], //房屋状态
      stateList: [], //维修类型
      historyDialog: false, //查看历史弹框显隐
      historyTable: [], //历史表格数据
      //分页数据
      total: 0, //数据总条数
      pageSize: 10, //当前页条数
      currentPage: 1, //当前页
      pageSizesList: [10, 20, 30, 50], //分页下拉框
      hisInfoDialog: false, //查看历史详情弹框
      historyInfo: {}, //维修历史详情
      logForm: {
        auditType: "", //日志类型
        state: "", //房屋状态
      },
    };
  },
  computed: {},
  methods: {
    //打开产权信息补登弹框
    oepnpropertyRightInfoDialog() {
      this.dialogIsShow = true;
      this.propertyRightInfo = {};
    },
    //隔行换色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else {
        return "";
      }
      return "";
    },
    //打开日志弹框
    openLogDialog() {
      this.logDialog = true;
      this.getLog();
    },
    //查看日志
    getLog() {
      let guid = { houseGuid: this.$parent.meta.houseGuid, type: "house" };
      let params = { ...this.logForm, ...guid };
      http
        .getLog(params)
        .then((res) => {
          this.logList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开查看页面弹框
    openCheckPeople() {
      this.checkPeopleDialog = true;
      this.getOccupancy();
    },
    //获取字典数据
    getDictionary() {
      let nameData = [
        "房产来源",
        "住宅类型",
        "房屋性质",
        "户型",
        "朝向",
        "平台",
        "房屋来源",
        "房屋用途",
        "分配权归属单位",
        "签约权归属单位",
        "数据维护权归属",
        "运维权归属",
        "当前属性",
        "最初属性",
        "计划用途",
        "房屋状态",
        "供应计划",
        "分配方式",
        "签约类型1",
        "合同类型",
        "租金标准",
        "证件类型",
        "性别",
        "婚姻状态",
        "子女状况",
        "学历",
        "学位",
        "职务",
        "最高职称",
        "户口所在地",
        "单位性质",
        "与主申请人的关系",
        "分配业务类型",
        "维修类型",
        "日志操作类型",
      ];
      let params = { names: nameData.toString() };
      api
        .searchDictionary(params)
        .then((res) => {
          res = JSON.parse(res);
          this.stateList = res.维修类型;
          this.logType = res.日志操作类型;
          this.typeData = res.户型;
          this.terraceData = res.平台;
          this.divisionUnit = res.分配权归属单位;
          this.signingUnit = res.签约权归属单位;
          this.maintenanceUnit = res.数据维护权归属;
          this.operations = res.运维权归属;
          this.houseType = this.$dictionaryChange(
            res.房屋性质,
            this.houseType,
            "通用"
          );
          this.functionData = res.房屋用途;
          this.sourceData = res.房产来源;
          this.originalPropertyData = res.当前属性;
          this.currentPropertyData = res.最初属性;
          this.orientationData = this.$dictionaryChange(
            res.朝向,
            this.orientationData,
            "通用"
          );
          res.计划用途.splice(res.计划用途.length - 1, 1);
          this.planUseData = res.计划用途;
          this.stateData = res.房屋状态;
          this.contractType = this.$dictionaryChange(
            res.合同类型,
            this.contractType,
            "分配配租"
          );
          let arr1 = res.租金标准;
          arr1.forEach((element) => {
            if (element.name == "分配") {
              this.rentStandard = element.children;
            }
          });
          this.distributeTypeData = this.$dictionaryChange(
            res.分配方式,
            this.distributeTypeData,
            "轮候配租批次"
          );
          console.log("===", this.distributeTypeData);
          let arr = res.签约类型1;
          this.signTypeList = JSON.parse(
            JSON.stringify(arr).replace(/name/g, "label")
          );
          console.log(this.signTypeList);
          this.signTypeList.forEach((item) => {
            item.children.forEach((element) => {
              if (!element.children.length) {
                element.children = null;
              }
            });
          });

          this.fwcslxOptions = res.房屋初始类型;
          this.zjlxOptions = this.$dictionaryChange(
            res.证件类型,
            this.zjlxOptions,
            "配租"
          );
          console.log("====", this.zjlxOptions);
          this.xbOptions = res.性别;
          this.hyztOptions = this.$dictionaryChange(
            res.婚姻状态,
            this.hyztOptions,
            "局建"
          );
          this.znzkoptions = this.$dictionaryChange(
            res.子女状况,
            this.znzkoptions,
            "配租"
          );
          this.xlOptions = this.$dictionaryChange(
            res.学历,
            this.xlOptions,
            "局建"
          );
          this.xwOptions = this.$dictionaryChange(
            res.学位,
            this.xwOptions,
            "配租"
          );
          this.zwOptions = this.$dictionaryChange(
            res.职务,
            this.zwOptions,
            "局建"
          );
          this.zcOptions = this.$dictionaryChange(
            res.最高职称,
            this.zcOptions,
            "配租"
          );
          this.hkszdOptions = this.$dictionaryChange(
            res.户口所在地,
            this.hkszdOptions,
            "局建"
          );
          this.dwxzOptions = this.$dictionaryChange(
            res.单位性质,
            this.dwxzOptions,
            "配租"
          );
          console.log("===", this.dwxzOptions);
          this.ysqrgxOptions = this.$dictionaryChange(
            res.与主申请人的关系,
            this.ysqrgxOptions,
            "配租签约"
          );
          this.fpywlxOptions = this.$dictionaryChange(
            res.分配方式,
            this.fpywlxOptions,
            "配租"
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取房屋详情
    getHouseinfo() {
      let params = {
        guid: this.$parent.meta.houseGuid,
      };
      http
        .getHouseInfo(params)
        .then((res) => {
          if (res) {
            this.form = res.houseInfo;
            this.signInfoData = res.signInfo;
            this.deviceInfoData = res.deviceInfo;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //产权信息补登
    dialogSubmit() {
      let params = {
        houseGuid: this.$parent.meta.houseGuid,
        immovablePropertyUnitNo: this.propertyRightInfo.immovablePropertyUnitNo,
        obligee: this.propertyRightInfo.obligee,
        startUseTime: this.propertyRightInfo.startUseTime,
        endUserTime: this.propertyRightInfo.endUserTime,
        indoorArea: this.propertyRightInfo.indoorArea,
        finishConstructionTime: this.propertyRightInfo.finishConstructionTime,
        registPrice: this.propertyRightInfo.registPrice,
        commonalityCondition: this.propertyRightInfo.commonalityCondition,
        djsj: this.propertyRightInfo.djsj,
        houseOriginalPrice: this.propertyRightInfo.houseOriginalPrice,
        housePresentPrice: this.propertyRightInfo.housePresentPrice,
        rightOverImmovablesId: this.propertyRightInfo.rightOverImmovablesId,
      };
      let data = {};
      housestore
        .setHouseRepair(params, data)
        .then((res) => {
          if (res) {
            this.$message({
              type: "success",
              message: "保存成功",
            });
            this.getHouseinfo();
            this.dialogIsShow = false;
          }
        })
        .catch((err) => {
          this.$message({
            type: "success",
            message: "保存失败",
          });
        });
    },
    handleChange(val) {
      console.log(val);
    },
    //家庭/单位、承租/购房/房改情况
    getOccupancy() {
      let params = {
        houseGuid: this.$parent.meta.houseGuid,
      };
      http
        .getOccupancy(params)
        .then((res) => {
          if (res) {
            for (var item in res) {
              console.log(item, res[item]);
              if (item == "单位购房") {
                this.unitBuyHouseInfo = res[item];
                if (this.unitBuyHouseInfo) {
                  this.homeBuyHouseForm.name = this.unitBuyHouseInfo[0].unitName;
                }
              } else if (item == "家庭承租") {
                this.homeRetalInfo = res[item];
                if (this.homeRetalInfo) {
                  this.homeRetalInfo.forEach((ele) => {
                    if (ele.relation == "申请人") {
                      this.homeRetalForm.name = ele.name;
                      this.homeRetalForm.mobilePhone = ele.mobilePhone;
                    }
                  });
                }
              } else if (item == "单位房改房") {
                this.unitHousingReformInfo = res[item];
                if (this.unitHousingReformInfo) {
                  this.unitHousingReformForm.name = this.unitHousingReformInfo[0].unitName;
                }
              } else if (item == "家庭购房") {
                this.homeBuyHouseInfo = res[item];
                if (this.homeBuyHouseInfo) {
                  this.homeBuyHouseInfo.forEach((ele) => {
                    if (ele.relation == "申请人") {
                      this.homeBuyHouseForm.name = ele.name;
                      this.homeBuyHouseForm.mobilePhone = ele.mobilePhone;
                      this.homeBuyHouseForm.contractTime = ele.contractTime;
                      this.homeBuyHouseForm.moveAwayTime = ele.moveAwayTime;
                    }
                  });
                }
              } else if (item == "单位承租") {
                this.unitRetalInfo = res[item];
                if (this.unitRetalInfo) {
                  this.unitRetalForm.unitName = this.unitRetalInfo[0].unitName;
                  this.unitRetalForm.houseMan = this.unitRetalInfo[0].houseMan;
                  this.unitRetalForm.houseMan2 = this.unitRetalInfo[0].houseMan2;
                  this.unitRetalForm.houseManPhone = this.unitRetalInfo[0].houseManPhone;
                  this.unitRetalForm.houseManPhone2 = this.unitRetalInfo[0].houseManPhone2;
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //问题房源标注-获取房源标记列表
    getSituationalList() {
      let params = {
        houseGuid: this.$parent.meta.houseGuid,
      };
      http
        .getSituationalList(params)
        .then((res) => {
          this.situationalList = res.situational;
          this.relieveList = res.busy;
          this.incomingAndOutgoingStatusList = res.inputAndOut;
          if (this.incomingAndOutgoingStatusList[0].secondReviewer == null) {
            this.isPutShow = false;
          }
          if (res.outstock[0]) {
            this.outstock = res.outstock[0];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //查看附件弹框
    checkAttachment(val) {
      this.checkAttachmentDialog = true;
      this.parameter = val.materialGuid;
      this.Event.$emit("housetransferMaterials", "getMaterial");
    },
    //打开解除弹框
    openRelieveDialog(val) {
      this.relieveDialog = true;
      this.getSituationalInfo(val);
      this.parameter = val.materialGuid;
      this.removeBasis = "";
    },
    //获取要解除的房源信息
    getSituationalInfo(val) {
      let params = {
        situationalGuid: val.guid,
      };
      http
        .getSituationalInfo(params)
        .then((res) => {
          this.situationalInfo = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //问题房源标注-解除房源标记信息
    removeSituationalInfo() {
      let params = {
        houseGuid: this.situationalInfo.houseGuid,
        situationalGuid: this.situationalInfo.guid,
        removeBasis: this.removeBasis,
      };
      http
        .removeSituationalInfo(params)
        .then((res) => {
          if (res) {
            this.$message({
              type: "success",
              message: "解除房源标记信息成功",
            });
            this.relieveDialog = false;
            this.getSituationalList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开产权记录弹框
    OpenPropertyRightRecordsDialog() {
      this.propertyRightRecordsDialog = true;
      this.getPropertyChangeInfo();
    },
    //得到历史产权变更记录
    getPropertyChangeInfo() {
      let params = {
        houseGuid: this.$parent.meta.houseGuid,
      };
      publicMethod
        .getPropertyChangeInfo(params)
        .then((res) => {
          this.propertyRightRecordsList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开产权变更记录详情弹框
    OpenPropertyRightRecordsDetailDialog(val) {
      this.propertyRightRecordsDetailDialog = true;
      this.propertyRightDetailCode = val.code;
      this.getPropertyRightChangeInfo();
      this.getChangeOpinon(val);
    },
    //得到产权变更详情的申请信息和选中房
    getPropertyRightChangeInfo() {
      let params = {
        code: this.propertyRightDetailCode,
        pageIndex: this.propertyRightDetailPage.currentPage,
        pageSize: this.propertyRightDetailPage.pageSize,
      };
      publicMethod
        .getPropertyRightChangeInfo(params)
        .then((res) => {
          this.propertyRightDetailform = res;
          this.propertyRightDetailCode = res.code;
          this.propertyRightDetailTable = res.houseInfoDTOPage.content;
          this.propertyRightDetailPage.totalNumber =
            res.houseInfoDTOPage.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //产权变更详情选中房列表得到每页的编号
    propertyRightIndexMethod(index) {
      return (
        index +
        (this.propertyRightDetailPage.currentPage - 1) *
          this.propertyRightDetailPage.pageSize +
        1
      );
    },
    //产权变更详情每页大小变化
    propertyRightDetailSizeChange(val) {
      this.propertyRightDetailPage.pageSize = val;
      this.getPropertyRightChangeInfo();
    },
    //产权变更详情第几页的变化
    propertyRightDetailCurrentChange(val) {
      this.propertyRightDetailPage.currentPage = val;
      this.getPropertyRightChangeInfo();
    },
    //产权变更详情意见列表或者性质变更意见列表
    getChangeOpinon(val) {
      let params = {
        pid: val.pid,
      };
      publicMethod
        .getOpinion(params)
        .then((res) => {
          this.detailOpinion = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开性质变更历史记录弹框
    OpenNatureRecordsDialog() {
      this.natureRecordsDialog = true;
      this.getNatureChangeInfo();
    },
    //得到历史产权变更记录
    getNatureChangeInfo() {
      let params = {
        houseGuid: this.$parent.meta.houseGuid,
      };
      publicMethod
        .getNatureChangeInfo(params)
        .then((res) => {
          this.natureChangeRecordsList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开性质变更记录详情弹框
    OpenNatureRecordsDetailDialog(val) {
      this.natureRecordsDetailDialog = true;
      this.natureDetailCode = val.code;
      this.getNatureChangeDetailInfo();
      this.getChangeOpinon(val);
    },
    //得到性质变更详情的申请信息和选中房
    getNatureChangeDetailInfo() {
      let params = {
        code: this.natureDetailCode,
        pageIndex: this.natureDetailPage.currentPage,
        pageSize: this.natureDetailPage.pageSize,
      };
      publicMethod
        .getNatureChangeDetailInfo(params)
        .then((res) => {
          this.natureDetailform = res;
          this.natureDetailCode = res.code;
          this.natureDetailTable = res.houseInfoDTOPage.content;
          this.natureDetailPage.totalNumber =
            res.houseInfoDTOPage.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //性质变更详情选中房列表得到每页的编号
    natureIndexMethod(index) {
      return (
        index +
        (this.natureDetailPage.currentPage - 1) *
          this.natureDetailPage.pageSize +
        1
      );
    },
    //性质变更详情每页大小变化
    natureDetailSizeChange(val) {
      this.natureDetailPage.pageSize = val;
      this.getNatureChangeDetailInfo();
    },
    //性质变更详情第几页的变化
    natureDetailCurrentChange(val) {
      this.natureDetailPage.currentPage = val;
      this.getNatureChangeDetailInfo();
    },
    //打开分配权变更弹框
    OpenAllocationRecordsDialog() {
      this.title = "查看分配权变更情况";
      this.historyRecordsDialog = true;
      this.getHistoryInfo();
    },
    //打开签约权变更弹框
    OpenSignatoryRightRecordsDialog() {
      this.title = "查看签约权变更情况";
      this.historyRecordsDialog = true;
      this.getHistoryInfo();
    },
    //打开数据维护权变更弹框
    OpenInitialMaintainRightRecordsDialog() {
      this.title = "查看数据维护权变更情况";
      this.historyRecordsDialog = true;
      this.getHistoryInfo();
    },
    //打开运维权变更弹框
    OpenOperationalRightRecordsDialog() {
      this.title = "查看运维权变更情况";
      this.historyRecordsDialog = true;
      this.getHistoryInfo();
    },
    //获取历史变更情况
    getHistoryInfo() {
      let params = {
        houseGuid: this.$parent.meta.houseGuid,
      };
      publicMethod
        .getHistoryInfo(params)
        .then((res) => {
          this.allocationRecordsList = res.AllocationRight;
          this.signatoryRightRecordsList = res.SignatoryRight;
          this.InitialMaintainRightRecordsList = res.MaintainRight;
          this.perationalRightRecordsList = res.OperationalRight;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取房屋出租情况
    getRentInfo() {
      let params = {
        houseGuid: this.$parent.meta.houseGuid,
      };
      publicMethod
        .getRentInfo(params)
        .then((res) => {
          this.rentSituationList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //出租详情查看
    openRentSituationDetailDialog(val) {
      this.rentSituationDetailDialog = true;
      this.planGuid = val.jhbs;
      this.planPid = val.jhpid;
      this.distributionType = val.fpfs;
      this.batchCode = val.pcdm;
      this.fpfs = val.fpfs;
      this.signUpGuid = val.qybz;
      this.signType = val.sfdw;
      this.openHousePlanDialog(val);
    },
    //得到计划属性
    getProperty() {
      if (this.planUseData) {
        for (let item of this.planUseData) {
          if (item.value == this.housePlanFrom.function) {
            this.planPropertyData = JSON.parse(JSON.stringify(item.children));
            break;
          }
        }
      }
    },
    //得到房源计划表格基本信息
    getHousePlanFrom() {
      let params = {
        guid: this.planGuid,
      };
      publicMethod
        .getHousePlan(params)
        .then((res) => {
          let arr = [],
            brr = [];
          this.housePlanFrom = res;
          if (res.queueInfo) {
            res.queueInfo.forEach((element) => {
              arr.push(element.name);
            });
          }
          if (res.groupInfo) {
            res.groupInfo.forEach((item) => {
              brr.push(item.name);
            });
          }
          this.queueStr = arr.toString(); //显示出来的
          this.groupStr = brr.toString(); //显示出来的
          this.getProperty();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取房源计划下选中房列表
    getHousePlanList(index) {
      if (index) {
        this.housePlanListPage.currentPage = index;
      }
      let params = {
        planGuid: this.planGuid,
        pageIndex: this.housePlanListPage.currentPage,
        pageSize: this.housePlanListPage.pageSize,
        areaMax: this.housePlanListForm.areaMax,
        areaMin: this.housePlanListForm.areaMin,
        districtName: this.housePlanListForm.districtName,
        houseNo: this.housePlanListForm.houseNo,
        state: this.housePlanListForm.state,
        type: this.housePlanListForm.type,
        buildName: this.housePlanListForm.buildName,
        completionAreabegain: this.housePlanListForm.completionAreabegain,
        completionAreaEnd: this.housePlanListForm.completionAreaEnd,
      };
      publicMethod
        .getReleasedHouseInfo(params)
        .then((res) => {
          this.housePlanList = res.content;
          this.housePlanListPage.totalNumber = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //每页的大小尺寸变化
    housePlanListSizeChange(val) {
      this.housePlanListPage.pageSize = val;
      this.getHousePlanList(1);
    },
    //当前的页码的大小改变
    housePlanListCurrentChange(val) {
      this.housePlanListPage.currentPage = val;
      this.getHousePlanList(1);
    },
    //获取审核意见列表
    gethousePlanOpinion() {
      let params = {
        pid: this.planPid,
      };
      publicMethod
        .getOpinion(params)
        .then((res) => {
          this.housePlanOpinion = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开房源计划弹框
    openHousePlanDialog() {
      this.allocationBatchInfoShow = false;
      this.signInfoShow = false;
      this.afterRentShow = false;
      if (this.planGuid) {
        this.housePlanInfoShow = true;
        this.getProperty();
        this.getHousePlanFrom();
        this.getHousePlanList();
        this.gethousePlanOpinion();
      } else {
        this.housePlanInfoShow = false;
      }
    },
    //打开分配基本信息弹框
    openAllocationBatchInfoDialog() {
      this.housePlanInfoShow = false;
      this.allocationBatchInfoShow = true;
      this.signInfoShow = false;
      this.afterRentShow = false;
      if (this.batchCode) {
        this.getBatchInfo();
      }
    },
    //获取批次信息
    getBatchInfo() {
      let params = {
        batchCode: this.batchCode,
      };
      publicMethod
        .getBatchInfo(params)
        .then((res) => {
          if (res.signTypeCascade) {
            res.signTypeCascade = Array.from(res.signTypeCascade); //签约类型
          }
          this.batchInfo = res;
          console.log(res.signTypeCascade);
          // this.batchInfo.signTypeCascade = JSON.parse(this.batchInfo.signTypeCascade)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开签约信息弹框
    openSignUpInfoDialog() {
      this.housePlanInfoShow = false;
      this.allocationBatchInfoShow = false;
      this.signInfoShow = true;
      this.afterRentShow = false;
      if (this.signUpGuid) {
        this.getSignInfo();
      }
    },
    //得到签约详情
    getSignInfo() {
      let params = {
        signGuid: this.signUpGuid,
      };
      publicMethod
        .getSignInfo(params)
        .then((res) => {
          if (res.sign[0]) {
            this.signInfo = res.sign[0];
          }
          this.signOtherPersonalInfo = res.otherPersonalInfo;
          if (res.unitInfo[0]) {
            this.signUnitInfo = res.unitInfo[0];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //打开租后信息弹框
    openAfterRentDialog() {
      this.housePlanInfoShow = false;
      this.allocationBatchInfoShow = false;
      this.signInfoShow = false;
      this.afterRentShow = true;
    },
    //修改备注按钮
    changeNote(val) {
      if (val.specification) this.remark = val.specification; //若此条存在备注，则给弹框赋值
      this.openNoteDialog = true;
    },
    //备注弹框内-确定按钮
    confirmNote() {
      let params = {
        houseGuid: this.$parent.meta.houseGuid,
        remark: this.remark,
      };
      http
        .changeHouseRemark(params)
        .then((res) => {
          this.openNoteDialog = false;
          (this.remark = ""), //置空
            this.$message({
              type: "success",
              message: "保存成功!",
            });
          this.getHouseinfo(); //刷新表格数据
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //房屋综合查询(市局)-查询房屋勘误
    getHouseErrataList() {
      let params = {
        houseGuid: this.$parent.meta.houseGuid,
        pageIndex: this.errataDetailPage.currentPage,
        pageSize: this.errataDetailPage.pageSize,
      };
      publicMethod
        .getHouseErrataList(params)
        .then((res) => {
          this.erratList = res.content;
          this.errataDetailPage.totalNumber = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //pagesize的大小改变
    handleHouseSizeChange(val) {
      this.errataDetailPage.pageSize = val;
      this.getHouseErrataList(1);
    },
    //pageIndex改变的时候
    handleHouseCurrentChange(val) {
      this.errataDetailPage.currentPage = val;
      this.getHouseErrataList();
    },
    openHouseErrataDetailDialog(val) {
      this.errataType = val.kwlx;
      if (this.errataType == "修改信息") {
        this.houseErrataDetailDialog = true;
        this.getHouseErrataDetialInfo(val);
      } else if (this.errataType == "导入面积") {
        this.houseErrataAreaDetailDialog = true;
        this.getHouseExportDetialInfo1(val);
      } else if (this.errataType == "导入修改信息") {
        this.houseErrataImportDetailDialog = true;
        this.getHouseExportDetialInfo(val);
      }
    },
    //房屋综合查询(市局)-查询房屋勘误
    getHouseErrataDetialInfo(val) {
      let params = {
        houseGuid: val.houseGuid,
        pid: val.pid,
        pageIndex: this.natureDetailPage.currentPage,
        pageSize: this.natureDetailPage.pageSize,
      };
      publicMethod
        .getHouseErrataDetialInfo(params)
        .then((res) => {
          this.erratDetailList = res.content;
          this.errataInfoPage.totalNumber = res.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //pagesize的大小改变
    houseSizeCurrentChange(val) {
      this.errataInfoPage.pageSize = val;
      this.getHouseErrataDetialInfo(1);
    },
    //pageIndex改变的时候
    houseIndexCurrentChange(val) {
      this.errataInfoPage.currentPage = val;
      this.getHouseErrataList();
    },
    //房屋综合查询(市局)-查询房屋勘误
    getHouseExportDetialInfo1(val) {
      let params = {
        houseGuid: val.houseGuid,
        pid: val.pid,
        exportType: "1",
      };
      publicMethod
        .getHouseExportDetialInfo(params)
        .then((res) => {
          this.erratAreaList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //房屋综合查询(市局)-查询房屋勘误
    getHouseExportDetialInfo(val) {
      let params = {
        houseGuid: val.houseGuid,
        pid: val.pid,
        exportType: "2",
      };
      publicMethod
        .getHouseExportDetialInfo(params)
        .then((res) => {
          this.erratImportList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //历史查询
    searchHistory(val) {
      let params = {
        houseGuid: this.$parent.meta.houseGuid,
        maintainGuid: val.guid || "",
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
      };
      if (val.guid) {
        params.pageIndex = params.pageSize = 1;
      }
      https
        .getHouseMaintainLogList(params)
        .then((res) => {
          if (!params.maintainGuid) {
            this.historyTable = res.content;
            this.total = res.totalElements;
          } else {
            this.historyInfo = res.content[0];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //维修状态-查看历史
    checkHistory(val) {
      this.historyDialog = true;
      this.searchHistory(val);
    },
    //维修状态-查看历史详情
    checkhisInfo(val) {
      this.hisInfoDialog = true;
      this.searchHistory(val);
    },
    //当前页条数改变时
    handleSizeChange(val) {
      this.pageSize = val;
      this.searchHistory();
    },
    //当前页跳转时
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchHistory();
    },
    //定位
    location() {
      this.$route.query.serialNo = this.form.serialNo;
      this.goMapInfo();
    },
    //跳转到地图服务
    goMapInfo() {
      let tab = {
        id: "MapInfo",
        label: "地图信息",
        closable: true,
        component: () => import("@/components/MapInfo"),
      };
      this.$parent.openTab(tab);
    },
  },
  mounted() {
    this.getHouseinfo();
    this.getDictionary();
    this.getSituationalList();
    this.getRentInfo();
    this.getHouseErrataList();
    this.Event.$on("HouseDetails", (data) => {
      if (data == "getSituationalList") {
        this.getSituationalList();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.house-details {
  //解除房源标注的样式
  .situationalInfoStyle {
    border: 1px solid #b3b3b3;
    margin: 10px 20px;
    tr {
      width: 100%;
      border: 1px solid #b3b3b3;
      td:nth-child(2n + 1) {
        width: 40%;
        border: 1px solid #b3b3b3;
        background: #f0f8ff;
        text-align: center;
      }
      td:nth-child(2n) {
        width: 60%;
        border: 1px solid #b3b3b3;
      }
    }
  }
  #btn_box {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
