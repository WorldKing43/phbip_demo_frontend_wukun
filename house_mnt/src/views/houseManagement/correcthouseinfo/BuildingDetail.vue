<!--栋详情-->
<template>
  <div class="buildingDetails">
    <div style="position: relative">
      <el-button
        type="warning"
        size="mini"
        @click="deleteBuildingInfo"
        :disabled="this.$route.query.activityName == '审批'"
        v-if="
          form.state == 1 &&
          !(this.$route.params.state == 'done') &&
          hasPerm('fygl_fyxxkw_hfxq')
        "
        >删除栋</el-button
      >
      <el-button
        type="warning"
        size="mini"
        @click="recoverBuildingInfo"
        :disabled="this.$route.query.activityName == '审批'"
        v-if="
          !(form.state == 1) &&
          !(this.$route.params.state == 'done') &&
          hasPerm('fygl_fyxxkw_dxx_hfd')
        "
        >恢复栋</el-button
      >
      <div style="position: absolute; top: 0px; right: 0px">
        <el-button
          type="primary"
          size="mini"
          @click="save"
          :disabled="this.$route.query.activityName == '审批'"
          v-if="
            hasPerm('fygl_fyxxkw_dxx_bc') &&
            !(this.$route.params.state == 'done')
          "
          >保存</el-button
        >
      </div>
    </div>
    <div class="tableStyle">
      <table>
        <tr>
          <td>小区编号</td>
          <td>
            <el-input v-model="form.districtCode" disabled></el-input>
          </td>
          <td>小区名称</td>
          <td>
            <el-input v-model="form.districtName" disabled></el-input>
          </td>
        </tr>
        <tr>
          <td>网格办编码</td>
          <td>
            <el-input
              v-model="form.serialNo"
              @change="changeSerialNo()"
              :class="{ input: isSerialNo }"
              :disabled="editform"
            >
              <el-button
                type="primary"
                @click="dinwei()"
                slot="append"
                size="mini"
                :disabled="editform"
                >定位
              </el-button>
            </el-input>
          </td>
          <td>宗地号</td>
          <td>
            <el-input
              disabled
              v-model="form.landNo"
              @change="changeLandNo()"
              :class="{ input: isLandNo }"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>栋号</td>
          <td>
            <el-input
              v-model="form.code"
              @change="changeCode()"
              :class="{ input: isCode }"
              :disabled="editform"
            ></el-input>
          </td>
          <td>栋名称</td>
          <td>
            <el-input
              v-model="form.name"
              @change="changeName()"
              :class="{ input: isName }"
              :disabled="editform"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>曾用栋号</td>
          <td>
            <el-input
              v-model="form.usedCode"
              :class="{ input: isCode }"
              disabled
            ></el-input>
          </td>
          <td>曾用栋名称</td>
          <td>
            <el-input
              v-model="form.usedName"
              :class="{ input: isName }"
              disabled
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>地址</td>
          <td colspan="3">
            <el-input
              v-model="form.standardAddress"
              :class="{ input: isStandardAddress }"
              :disabled="editform"
            >
              <el-button
                type="primary"
                @click="newCorrect()"
                slot="append"
                size="mini"
                >获取编码
              </el-button>
              <el-button
                type="primary"
                @click="jiuji()"
                slot="append"
                size="mini"
                >发起救济</el-button
              ></el-input
            >
          </td>
        </tr>
        <tr>
          <td>单元数</td>
          <td>
            <el-input
              v-model="form.unitCount"
              placeholder="请输入内容"
              @keyup.native="proving3"
              :disabled="editform"
              :class="{ input: isUnitCount }"
            ></el-input>
          </td>
          <td>总楼层数</td>
          <td>
            <el-input
              v-model="form.floorCount"
              placeholder="请输入内容"
              @keyup.native="proving4"
              :class="{ input: isFloorCount }"
              :disabled="editform"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>裙楼层数</td>
          <td>
            <el-input
              v-model="form.skirtFloorCount"
              placeholder="请输入内容"
              @keyup.native="proving5"
              :class="{ input: isSkirtFloorCount }"
              :disabled="editform"
            ></el-input>
          </td>
          <td>地下层数</td>
          <td>
            <el-input
              v-model="form.subFloorCount"
              placeholder="请输入内容"
              @keyup.native="proving6"
              :class="{ input: isSubFloorCount }"
              :disabled="editform"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>指定中间层</td>
          <td>
            <el-input
              placeholder="请输入内容"
              v-model="form.middleFloor"
              :class="{ input: isMiddleFloor }"
              :disabled="editform"
            ></el-input>
          </td>
          <td>是否带电梯</td>
          <td style="text-align: left">
            <el-select
              style="width: 100%"
              v-model="form.elevator"
              placeholder="请选择"
              clearable
              :class="{ input: isElevator }"
              :disabled="editform"
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
          <td>地段系数</td>
          <td>
            <el-input
              v-model="form.lotCoefficient"
              placeholder="请输入内容"
              :class="{ input: isLocationFix }"
              :disabled="editform"
            ></el-input>
          </td>
          <td>建筑结构</td>
          <td style="text-align: left">
            <el-select
              style="width: 100%"
              v-model="form.construction"
              placeholder="请选择"
              :class="{ input: isConstruction }"
              :disabled="editform"
              clearable
            >
              <el-option
                v-for="(item, index) in constructionData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>建筑基础</td>
          <td style="text-align: left">
            <el-select
              style="width: 100%"
              v-model="form.buildBasic"
              placeholder="请选择"
              clearable
              :disabled="editform"
              :class="{ input: isBuildBasic }"
            >
              <el-option
                v-for="(item, index) in buildBasicData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
          <td>建筑面积</td>
          <td :class="{ input: isCoveredAreaAsyn }" style="position: relative">
            <el-input
              v-model="form.coveredArea"
              placeholder="请输入内容"
              @input="proving1()"
              :class="{ input: isCoveredAreaAsyn }"
              :disabled="editform"
              ref="coveredArea"
            ></el-input>
            <span style="position: absolute; top: 7px; right: 5px">㎡</span>
          </td>
        </tr>
        <tr>
          <td>基底面积</td>
          <td :class="{ input: isBaseAreaAsyn }" style="position: relative">
            <el-input
              v-model="form.baseArea"
              placeholder="请输入内容"
              @input="proving2()"
              ref="baseArea"
              :class="{ input: isBaseAreaAsyn }"
              :disabled="editform"
            ></el-input>
            <span style="position: absolute; top: 7px; right: 5px">㎡</span>
          </td>
          <td>底层用途</td>
          <td style="text-align: left">
            <el-select
              style="width: 100%"
              v-model="form.groundFloorUse"
              :class="{ input: isGroundFloorUse }"
              :disabled="editform"
            >
              <el-option
                v-for="(item, index) in groundFloorUseData"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>开工时间</td>
          <td style="text-align: left">
            <el-date-picker
              style="width: 100%"
              v-model="form.startConstructionTime"
              type="date"
              placeholder="选择日期"
              :class="{ input: isStartConstructionTime }"
              :disabled="editform"
            ></el-date-picker>
          </td>
          <td>竣工时间</td>
          <td style="text-align: left">
            <el-date-picker
              style="width: 100%"
              v-model="form.finishConstructionTime"
              type="date"
              placeholder="选择日期"
              :class="{ input: isFinishConstructionTime }"
              :disabled="editform"
            ></el-date-picker>
          </td>
        </tr>
        <tr>
          <td>交付使用时间</td>
          <td style="text-align: left">
            <el-date-picker
              style="width: 100%"
              v-model="form.deliveryTime"
              type="date"
              placeholder="选择日期"
              :class="{ input: isDeliveryTime }"
              :disabled="editform"
            ></el-date-picker>
          </td>
          <td>电梯个数</td>
          <td>
            <el-input
              v-model="form.countElevator"
              :disabled="editform"
              clearable
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>每层户数</td>
          <td>
            <el-input
              v-model="form.countFloor"
              :disabled="editform"
              clearable
            ></el-input>
          </td>
          <td>数据维护归属</td>
          <td>
            <el-select
              style="width: 100%"
              v-model="form.buildingInfoMaintainBelong"
              placeholder
              disabled
            >
              <el-option
                v-for="item in belongAreaType"
                :label="item.name"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>栋详细说明</td>
          <td colspan="3">
            <el-input
              type="textarea"
              v-model="form.remark"
              placeholder="请输入内容"
              :class="{ input: isRemark }"
              :disabled="editform"
            ></el-input>
          </td>
        </tr>
      </table>
    </div>

    <publicTitle title="信息变更列表"></publicTitle>
    <div class="table">
      <el-table
        :data="changeDetailList"
        border
        size="mini"
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
          label="序号"
          width="80"
          type="index"
          :index="indexMethod"
        ></el-table-column>
        <el-table-column prop="changeGuid" label="勘误类型"></el-table-column>
        <el-table-column prop="changeItem" label="勘误项"></el-table-column>
        <el-table-column label="勘误前">
          <template slot-scope="scope">
            {{ scope.row.changeBefore | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="changeAfter" label="勘误后">
          <template slot-scope="scope">
            {{ scope.row.changeAfter | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="勘误时间">
          <template slot-scope="scope">
            {{ scope.row.changeTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="operator" label="变更人"></el-table-column>
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
      title="编码信息"
      :visible.sync="newCorrectDialog"
      width="80%"
      :close-on-click-modal="false"
      ><div class="search">
        <el-form
          size="mini"
          label-position="left"
          :model="newCorrectForm"
          label-width="5rem"
        >
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="栋地址">
                <el-input clearable v-model="newCorrectForm.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-checkbox v-model="checked" label="2">精准查询 </el-checkbox>
              <el-button
                type="primary"
                size="mini"
                @click="searchReseauDataByAddr"
                >查询</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="table">
        <el-table
          :data="newCorrectInfo"
          ref="newCorrectInfo"
          @row-click="chooseInfo"
          border
          size="mini"
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
          <el-table-column label="#" width="50" align="center">
            <template slot-scope="scope">
              <el-radio class="radio" v-model="radio" :label="scope.$index"
                >&nbsp;</el-radio
              >
            </template>
          </el-table-column>
          <el-table-column prop="addr" label="地址"> </el-table-column>
          <el-table-column
            prop="belong_building"
            label="网格办编码"
          ></el-table-column>
        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="handleCorrectSizeChange"
            @current-change="handleCorrectCurrentChange"
            :current-page="newCorrectInfoPage.currentPage"
            :page-sizes="newCorrectInfoPage.pageSizesList"
            :page-size="newCorrectInfoPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="newCorrectInfoPage.totalNumber"
            background
          ></el-pagination>
        </div>
      </div>
      <div slot="footer" style="text-align: center">
        <el-button @click="newCorrectConfirm()" type="primary" size="mini"
          >确定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dinweiDialog"
      width="30%"
      :close-on-click-modal="false"
    >
      <div>
        <p>通过地址编码获取的地址与当前地址不一致，确认是否替换当前地址！</p>
        <span>当前地址：</span> {{ this.form.standardAddress }}
        <p><span>网格办地址：</span>{{ this.address }}</p>
      </div>
      <div slot="footer" style="text-align: center">
        <el-button @click="change()" type="primary" size="mini">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/api/housestore.js";
import { Differ } from "@/components/js/change";
import publicTitle from "@/components/TitleStyle"; //标题组件
import common from "@/api/common.js";
export default {
  name: "buildingDetails",
  components: {
    publicTitle, //标题公共组件
  },
  data() {
    return {
      guid: "", //小区的guid
      bulidingGuid: "", //栋的guid
      PID: "", //PID
      edit: true, //禁用
      coveredAreaAsyn: "",
      baseAreaAsyn: "",
      changeDetailList: [], //数据列表
      copyData: [], //复制的数据
      form: {
        serialNo: "", //网格办编码
        maintainRight: "", //数据维护权归属
        baseArea: "",
        buildBasic: "",
        buildPurpose: "",
        code: "",
        construction: "",
        coveredArea: "",
        deliveryTime: "",
        districtGuid: "",
        elevator: "",
        finishConstructionTime: "",
        floorCount: "",
        groundFloorUse: "",
        guid: "",
        houseType: "",
        landNo: "",
        locationFix: "",
        middleFloor: "",
        name: "",
        remark: "",
        reportGuid: "",
        skirtFloorCount: "",
        startConstructionTime: "",
        subFloorCount: "",
        unitCount: "",
        lotCoefficient: "",
        standardAddress: "",
        countElevator: null, //电梯个数
        countFloor: null, //每层户数
      }, //表格数据
      tableData: [], //信息变更列表的数据
      options: [
        { value: true, label: "是" },
        { value: false, label: "否" },
      ],
      buildDataName: [], //获取栋名称
      buildPurposeData: [], //栋用途下拉数据
      constructionData: [], //建筑结构下拉数据
      buildBasicData: [], //建筑基础下拉数据
      groundFloorUseData: [], //底层用途下拉数据
      isClickDeleteBtn: false, //是否点击删除按钮
      currentPage: 1,
      pageSize: 10,
      pageSizesList: [10, 20, 30, 40],
      totalNumber: 0, //数据的总数
      belongAreaType: [], //数据维护归属下拉框
      isSerialNo: false,
      isName: false,
      isBuildPurpose: false,
      isUnitCount: false,
      isFloorCount: false,
      isSkirtFloorCount: false,
      isSubFloorCount: false,
      isMiddleFloor: false,
      isElevator: false,
      isLocationFix: false,
      isConstruction: false,
      isBuildBasic: false,
      isCoveredAreaAsyn: false,
      isBaseAreaAsyn: false,
      isGroundFloorUse: false,
      isStartConstructionTime: false,
      isFinishConstructionTime: false,
      isDeliveryTime: false,
      isRemark: false,
      isLandNo: false,
      isCode: false,
      isStandardAddress: false,
      edit: "", //表示是否可编辑
      editform: "", //表示是否可以编辑表格
      dinweiDialog: false,
      address: "",
      newCorrectDialog: false, //
      newCorrectForm: {
        page: 1,
        limit: 20,
        lv: 9,
        address: "",
      },
      newCorrectInfo: [], //
      newCorrectInfoPage: {
        currentPage: 1,
        pageSize: 20,
        pageSizesList: [10, 20, 30, 40],
        totalNumber: 0,
      },
      radio: false,
      checked: false,
    };
  },
  methods: {
    newCorrect() {
      this.newCorrectDialog = true;
      // this.getDictionary();
      this.$set(this.newCorrectForm, "address", this.form.standardAddress);
      this.searchReseauDataByAddr();
    },
    //当前页的大小改变
    handleCorrectSizeChange(val) {
      this.newCorrectForm.limit = val;
      this.searchReseauDataByAddr();
    },
    handleCorrectCurrentChange(val) {
      this.newCorrectForm.page = val;
      this.searchReseauDataByAddr();
    },
    //选中
    chooseInfo(val) {
      this.newCorrectInfo.forEach((item, index) => {
        if (item.guid === val.guid) {
          this.radio = index;
          this.selectedData = val;
        }
      });
    },
    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //获取栋详情
    getBuildingInfo() {
      let params = {};
      if (this.$route.params.state == "done") {
        params = {
          bulidingGuid: this.bulidingGuid,
          state: 1,
        };
      } else {
        params = {
          bulidingGuid: this.bulidingGuid,
          state: 0,
        };
      }
      http
        .getBuildingInfo(params)
        .then((res) => {
          this.form = res;
          if (this.form.state == 1) {
            this.edit = false;
          } else {
            this.edit = true;
          }
          this.copyData = this.deepClone(res); //变更前的数据
          if (this.form) {
            // this.baseAreaAsyn = this.form.baseArea
            //   ? this.form.baseArea + ""
            //   : "";
            // this.coveredAreaAsyn = this.form.coveredArea
            //   ? this.form.coveredArea + ""
            //   : "";
            // this.useCompany();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //删除栋
    deleteBuildingInfo() {
      this.$confirm("是否确定删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            projectId: this.PID,
          };
          let guidList = [];
          guidList.push(this.bulidingGuid);
          let data = guidList;
          http
            .deleteBuilding(params, data)
            .then((res) => {
              this.$message.success("删除成功");
              this.Event.$emit("CorrectApply", "changeDetail");
              this.Event.$emit("CorrectBuilding", "getBuildingList");
              this.getBuildingInfo();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    //恢复栋
    recoverBuildingInfo() {
      let params = {
        bulidingGuid: this.bulidingGuid,
        districtGuid: this.guid,
        projectId: this.PID,
      };
      http
        .restoreBuilding(params)
        .then((res) => {
          this.$message.success("恢复栋成功");
          this.Event.$emit("CorrectApply", "changeDetail");
          this.Event.$emit("CorrectBuilding", "getBuildingList");
          this.getBuildingInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //深度拷贝
    deepClone(source) {
      const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
      for (let keys in source) {
        // 遍历目标
        if (source.hasOwnProperty(keys)) {
          if (source[keys] && typeof source[keys] === "object") {
            // 如果值是对象，就递归一下
            targetObj[keys] = source[keys].constructor === Array ? [] : {};
            targetObj[keys] = deepClone(source[keys]);
          } else {
            // 如果不是，就直接赋值
            targetObj[keys] = source[keys];
          }
        }
      }
      return targetObj;
    },
    //保存变更明细
    saveChangeDetail() {
      var cfg = {
        maintainRight: "数据维护权归属",
        baseArea: "基底面积",
        buildBasic: "建筑基础",
        buildPurpose: "栋用途",
        code: "栋号",
        construction: "建筑结构",
        coveredArea: "建筑面积",
        deliveryTime: "交付使用时间",
        elevator: "是否带电梯",
        finishConstructionTime: "竣工时间",
        floorCount: "总楼层数",
        landNo: "宗地号",
        lotCoefficient: "地段系数",
        middleFloor: "指定中间层",
        name: "栋名称",
        remark: "栋详细说明",
        skirtFloorCount: "裙楼层数",
        startConstructionTime: "开工时间",
        subFloorCount: "地下层数",
        unitCount: "单元数",
        DistrictName: "小区编号",
        DistrictCode: "小区名称",
        groundFloorUse: "底层用途",
        serialNo: "网格办编码",
        standardAddress: "地址",
      };
      var diff = new Differ(this.copyData, this.form, cfg);
      var changeData = diff.differ();
      if (changeData.length != 0) {
        changeData.forEach((ele) => {
          ele.changeGuid = "修改栋信息";
          ele.changeTime = new Date();
        });
      }
      let params = {
        districtGuid: this.guid,
        projectId: this.PID,
        buildGuid: this.bulidingGuid,
      };
      let data = changeData;
      http
        .saveChangeDetail(params, data)
        .then((res) => {
          this.changeDetail();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取用户登录单位
    getAccessableUnitGuid() {
      let params = {};
      http
        .getAccessableUnitGuid(params)
        .then((res) => {
          this.accessableUnitGuid = res;
          if (this.accessableUnitGuid.length > 0) {
            this.accessableUnitGuid.forEach((e) => {
              if (this.form.buildingInfoMaintainBelong == e) {
                if (
                  this.$route.params.state == "done" ||
                  this.$route.query.activityName == "审批"
                ) {
                  this.editform = true;
                } else {
                  this.editform = false;
                }
              } else {
                this.editform = true;
              }
              return;
            });
          } else {
            this.editform = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取变更明细
    changeDetail() {
      let params = {
        districtGuid: this.guid,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        projectId: this.PID,
        type: this.bulidingGuid,
      };
      http
        .changeDetail(params)
        .then((res) => {
          this.changeDetailList = res.changeDetailsDTOS.content;
          this.totalNumber = res.changeDetailsDTOS.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //pageIndex改变时
    handleCurrentChange(val) {
      this.currentPage = val;
      this.changeDetail();
    },
    //pageSize改变时
    handleSizeChange(val) {
      this.pageSize = val;
      this.changeDetail();
    },
    //验证只能输入正整数
    proving1() {
      this.coveredAreaAsyn = this.coveredAreaAsyn.replace(/[^\.\d]/g, "");
      this.coveredAreaAsyn = this.coveredAreaAsyn.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      this.coveredAreaAsyn = this.coveredAreaAsyn
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", "."); //只保留一个小数点
    },
    proving2() {
      this.baseAreaAsyn = this.baseAreaAsyn.replace(/[^\.\d]/g, "");
      this.baseAreaAsyn = this.baseAreaAsyn.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      this.baseAreaAsyn = this.baseAreaAsyn
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", "."); //只保留一个小数点
    },
    proving3() {
      this.form.unitCount = this.form.unitCount.replace(/[^\.\d]/g, "");
      this.form.unitCount = this.form.unitCount.replace(".", "");
    },
    proving4() {
      this.form.floorCount = this.form.floorCount.replace(/[^\.\d]/g, "");
      this.form.floorCount = this.form.floorCount.replace(".", "");
    },
    proving5() {
      this.form.skirtFloorCount = this.form.skirtFloorCount.replace(
        /[^\.\d]/g,
        ""
      );
      this.form.skirtFloorCount = this.form.skirtFloorCount.replace(".", "");
    },
    proving6() {
      this.form.subFloorCount = this.form.subFloorCount.replace(/[^\.\d]/g, "");
      this.form.subFloorCount = this.form.subFloorCount.replace(".", "");
    },
    proving7() {
      this.form.middleFloor = this.form.middleFloor.replace(/[^\.\d]/g, "");
      this.form.middleFloor = this.form.middleFloor.replace(".", "");
    },
    //保存
    save() {
      let _params = {
        buildGuid: this.bulidingGuid,
      };
      http
        .userHouseCounts(_params)
        .then((res) => {
          if (res == 0 || res.data == 0) {
            this.saveBuilding();
          } else if (res > 0 || res.data > 0) {
            this.$confirm(
              "该小区名下有" +
                res +
                "套房正处于使用状态，请谨慎修改信息,是否继续?",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              }
            )
              .then(() => {
                this.saveBuilding();
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消",
                });
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    numAndFloat(num) {
      if (num !== "" || num !== undefined) {
        num = num.replace(/[^\d.]/g, ""); //必须保证第一个为数字而不是.
        num = num.replace(/^\./g, ""); ////保证只有出现一个.而没有多个.
        num = num.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        num = num.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        let arr = num.split("."); //最多保留小数点后一位
        if (arr.length > 1) {
          num =
            arr[0] + "." + (arr[1].length > 1 ? arr[1].substr(0, 1) : arr[1]);
        }
      }
    },
    saveBuilding() {
      // if (this.form.landNo == null) {
      //   this.$alert("无法保存信息，请输入宗地号", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.code) {
      //   this.$alert("无法保存信息，请输入栋号", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.name) {
      //   this.$alert("无法保存信息，请输入栋名称", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (this.form.floorCount == null) {
      //   this.$alert("无法保存信息，请输入总楼层数", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (this.form.skirtFloorCount == null) {
      //   this.$alert("无法保存信息，请输入裙楼层数", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (this.form.subFloorCount == null) {
      //   this.$alert("无法保存信息，请输入地下层数", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (this.form.elevator == null) {
      //   this.$alert("无法保存信息，请选择是否带电梯", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.construction) {
      //   this.$alert("无法保存信息，请选择建筑结构", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.buildBasic) {
      //   this.$alert("无法保存信息，请选择建筑基础", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.coveredArea) {
      //   this.$alert("无法保存信息，请输入建筑面积", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.baseArea) {
      //   this.$alert("无法保存信息，请输入基底面积", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.groundFloorUse) {
      //   this.$alert("无法保存信息，请选择底层用途", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else {
      this.$confirm("此操作将进行保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let _params = {};
          let _data = this.form;
          http
            .updateBuilding(_params, _data)
            .then((res) => {
              console.log(res);
              if (res) {
                this.saveChangeDetail();
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.getBuildingInfo();
              }
            })
            .catch((res) => {
              this.$message({
                message: "保存失败",
                type: "warning",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存",
          });
        });
      // }
    },
    //获取字典数据
    getDictionary() {
      let nameData = [
        "住宅类型",
        "建筑结构",
        "建筑基础",
        "底层用途",
        "数据维护权归属",
      ];
      let params = { names: nameData.toString() };
      http
        .getDictionary(params)
        .then((res) => {
          this.buildPurposeData = JSON.parse(res).住宅类型;
          this.constructionData = JSON.parse(res).建筑结构;
          this.buildBasicData = JSON.parse(res).建筑基础;
          this.groundFloorUseData = JSON.parse(res).底层用途;
          this.belongAreaType = JSON.parse(res).数据维护权归属;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //改变样式
    changeSerialNo() {
      this.isSerialNo = true;
    },
    changeLandNo() {
      this.isLandNo = true;
    },
    changeCode() {
      this.isCode = true;
    },
    changeName() {
      this.isName = true;
    },
    changeBuildPurpose() {
      this.isBuildPurpose = true;
    },
    changeUnitCount() {
      this.isUnitCount = true;
    },
    changeFloorCount() {
      this.isFloorCount = true;
    },
    changeSkirtFloorCount() {
      this.isSkirtFloorCount = true;
    },
    changeMiddleFloor() {
      this.isMiddleFloor = true;
    },
    changeLocationFix() {
      this.isLocationFix = true;
    },
    changeElevator() {
      this.isElevator = true;
    },
    changeConstruction() {
      this.isConstruction = true;
    },
    changeBuildBasic() {
      this.isBuildBasic = true;
    },
    changeCoveredAreaAsyn() {
      this.isCoveredAreaAsyn = true;
    },
    changeBaseAreaAsyn() {
      this.isBaseAreaAsyn = true;
    },
    changeGroundFloorUse() {
      this.isGroundFloorUse = true;
    },
    changeSubFloorCount() {
      this.isSubFloorCount = true;
    },
    changeStartConstructionTime() {
      this.isStartConstructionTime = true;
    },
    changeFinishConstructionTime() {
      this.isFinishConstructionTime = true;
    },
    changeDeliveryTime() {
      this.isDeliveryTime = true;
    },
    changeRemark() {
      this.isRemark = true;
    },
    changeStandardAddress() {
      this.isStandardAddress = true;
    },
    dinwei() {
      if (this.form.serialNo == null || this.form.serialNo == "") {
        return;
      }
      let params = {
        reseauCode: this.form.serialNo,
        page: 1,
        limit: 10,
      };
      common
        .searchReseauDataByCode(params)
        .then((res) => {
          if (res.length == 0) {
            this.$alert("没有查询到相关地址信息！");
          } else {
            if (this.form.standardAddress != res[0].addr) {
              this.dinweiDialog = true;
              this.address = res[0].addr;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    change() {
      this.form.standardAddress = this.address;
      this.dinweiDialog = false;
    },
    searchReseauDataByAddr() {
      if (
        this.newCorrectForm.address == null ||
        this.newCorrectForm.address == ""
      ) {
        return;
      }
      // this.newCorrectForm.address = this.dto1.standardAddress;
      let params = this.newCorrectForm;
      if (this.checked) {
        this.newCorrectForm.fuzzy = false;
      } else {
        this.newCorrectForm.fuzzy = true;
      }
      common
        .searchReseauDataByAddr(params)
        .then((res) => {
          this.newCorrectInfo = res;
          this.newCorrectInfoPage.totalNumber = res[0].count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    newCorrectConfirm() {
      if (!this.selectedData.code) {
        this.$message("请选择对应地址再进行提交");
      } else {
        this.form.serialNo = this.selectedData.code;
        this.$set(this.form, "standardAddress", this.selectedData.addr);
      }
      this.newCorrectDialog = false;
      this.checked = true;
    },
    jiuji() {
      this.$confirm("此操作将进行救济服务申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (
            this.form.standardAddress == null ||
            this.form.standardAddress == ""
          ) {
            return;
          }

          var houseAddress;
          houseAddress = this.form.standardAddress;

          let params = {
            reliefId: this.form.id,
            houseAddress: houseAddress,
            districtGuid: this.form.districtGuid,
            type: 9,
          };
          let data = {};
          common
            .sentReliefService(params, data)
            .then((res) => {
              this.$message({
                message: "救济服务发送成功",
                type: "success",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "info",
            message: "已取消保存",
          });
        });
    },
  },
  mounted() {
    this.Event.$on("BuildingDetail", (data) => {
      if (data == "getBuildingInfo") {
        this.getBuildingInfo();
      }
    });
    if (
      this.$route.params.state == "done" ||
      this.$route.query.activityName == "审批"
    ) {
      this.editform = true;
    } else {
      this.editform = false;
    }
  },
  created() {
    this.guid = this.$parent.params.districtGuid;
    this.bulidingGuid = this.$parent.meta.bulidingGuid;
    this.PID = this.$parent.params.PID1;
    this.getBuildingInfo();
    this.getAccessableUnitGuid();
    this.getDictionary(); //获取字典数据
    this.changeDetail();
  },
};
</script>

<style lang="scss" scoped>
//改变之后的样式
/deep/ .td {
  background: #f2dede;
}

/deep/ .input {
  background: #f2dede;
}

/deep/ .input input {
  background: #f2dede;
}

/deep/ .input textarea {
  background: #f2dede;
}
.el-input-group__append button.el-button {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
  margin-right: 5px;
}

// .company input {
//   // background-color: #fff;
//   width: 80%;
// }

// .buildingDetails {
//   & /deep/ .el-input__inner {
//     border: none;
//     outline: none;
//   }
//   table {
//     width: 100%;
//     margin: 20px auto;
//     border: 1px solid #dde5f9;
//     border-collapse: collapse;
//     text-align: center;
//     table-layout: fixed;
//     word-break: break-all;
//     .must::after {
//       content: "*";
//       color: #f56c6c;
//       margin-left: 4px;
//     }
//     .company {
//       font-size: 14px;
//       height: 40px;
//       padding: 0 15px;
//       color: #666;
//       input {
//         font-size: 14px;
//         float: left;
//         height: 100%;
//         line-height: 100%;
//         max-width: calc(100% - 24px);
//         border: 0;
//         outline: 0;
//       }
//       span {
//         float: left;
//         display: flex;
//         height: 100%;
//         align-items: center;
//       }
//     }
//     tr {
//       border: 1px solid #dde5f9;
//     }
//     td {
//       border: 1px solid #dde5f9;
//       font-size: 14px;
//       height: 2rem;
//       width: 25%;
//     }
//     td:nth-child(odd) {
//       background: aliceblue;
//       width: 20%;
//     }
//   }
// }
</style>
