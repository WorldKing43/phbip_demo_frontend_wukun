<!--
 * @Description: 房源录入-房源新建页
 * @Version: 1.0
 * @Autor: wangyue
 * @Date: 2019-11-26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-27 14:45:59
 -->
<template>
  <div class="HousingEdit">
    <div class="quarterMessage_box margin_box">
      <div class="width button" style="margin: 20px 0">
        <el-button
          type="primary"
          @click="submitForm('houseInfoPreDTO')"
          size="mini"
          >保存</el-button
        >
        <el-button type="primary" @click="fanhui" size="mini">返回</el-button>
      </div>
      <el-form
        :model="houseInfoPreDTO"
        :disabled="disEdit"
        :rules="rules"
        ref="houseInfoPreDTO"
        label-width="9rem"
      >
        <div class="demo-ruleForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="网格办编号" style="position: relative" required>
                <el-input
                  v-model="houseInfoPreDTO.serialNo"
                  placeholder="请输入"
                  clearable
                >
                  <el-button
                    type="primary"
                    @click="dinwei()"
                    slot="append"
                    size="mini"
                    >定位
                  </el-button>
                </el-input>
                <!-- <el-button type="primary" size="mini" @click="location" style="position:absolute;top:7px;right:5px;" v-if="hasPerm('fygl_fyxxlr_fyxx_dw')">定位</el-button> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="不动产权单元号">
                <el-input
                  v-model="houseInfoPreDTO.immovablePropertyUnitNo"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="小区名称">
                <el-input
                  v-model="houseInfoPreDTO.districtName"
                  readonly
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="栋号">
                <el-select
                  v-model="houseInfoPreDTO.buildGuid"
                  placeholder
                  readonly
                  disabled
                >
                  <el-option
                    v-for="(item, index) in buildNameList"
                    :key="index"
                    :label="item.code"
                    :value="item.guid"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="栋名称" required>
                <el-select
                  v-model="houseInfoPreDTO.buildGuid"
                  clearable
                  @change="generateAddress()"
                >
                  <el-option
                    v-for="(item, index) in buildNameList"
                    :key="index"
                    :label="item.name"
                    :value="item.guid"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房号" required>
                <el-input
                  v-model="houseInfoPreDTO.houseNo"
                  placeholder="请输入"
                  @keyup.native="generateAddress()"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="不动产权证书号">
                <el-input
                  v-model="houseInfoPreDTO.rightOverImmovablesId"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="地址">
                <el-input
                  v-model="houseInfoPreDTO.standardAddress"
                  clearable
                  readonly
                >
                  <el-button
                    type="primary"
                    @click="newCorrect()"
                    slot="append"
                    size="mini"
                    >获取编码</el-button
                  >
                  <el-button
                    type="primary"
                    @click="jiuji()"
                    slot="append"
                    size="mini"
                    >发起救济</el-button
                  >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="初始产权归属" required>
                <el-select
                  v-model="houseInfoPreDTO.propertypBelong"
                  filterable
                  clearable
                  placeholder="点击输入进行相关搜索"
                >
                  <el-option
                    v-for="(item, index) in propertyList"
                    :key="index"
                    :label="item.value"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="初始房源性质" required>
                <el-select
                  v-model="houseInfoPreDTO.startNature"
                  clearable
                  @change="starNatureChange()"
                >
                  <el-option
                    v-for="(item, index) in nature"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房屋来源" required>
                <el-select v-model="houseInfoPreDTO.source" clearable>
                  <el-option
                    v-for="(item, index) in sourceList"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房屋用途" required>
                <el-select v-model="houseInfoPreDTO.function" clearable>
                  <el-option
                    v-for="(item, index) in houesUser"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在单元">
                <el-input
                  v-model="houseInfoPreDTO.unit"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在楼层">
                <el-input
                  v-model="houseInfoPreDTO.floorNo"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="户型" required>
                <el-select v-model="houseInfoPreDTO.houseLayout" clearable>
                  <el-option
                    v-for="(item, index) in apartment"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="朝向" required>
                <el-select v-model="houseInfoPreDTO.orientation" clearable>
                  <el-option
                    v-for="(item, index) in orientation"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否有架空层" required>
                <el-select v-model="houseInfoPreDTO.innerFloor" clearable>
                  <el-option
                    v-for="(item, index) in twoChooseList"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="平台" required>
                <el-select v-model="houseInfoPreDTO.terrace" clearable>
                  <el-option
                    v-for="(item, index) in queryTerrace"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预测绘建筑面积">
                <DistInputNumber
                  v-model="houseInfoPreDTO.coveredArea"
                  placeholder="请输入"
                  unit="平方米"
                  size="mini"
                  :min="0"
                ></DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预测绘套内面积">
                <DistInputNumber
                  v-model="houseInfoPreDTO.indoorArea"
                  placeholder="请输入"
                  unit="平方米"
                  size="mini"
                  :min="0"
                >
                </DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预测绘分摊面积">
                <DistInputNumber
                  v-model="houseInfoPreDTO.residentialPoolArea"
                  placeholder="请输入"
                  unit="平方米"
                  size="mini"
                  :min="0"
                ></DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分摊面积说明">
                <el-input
                  v-model="houseInfoPreDTO.residentialAreaContent"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="竣工建筑面积">
                <DistInputNumber
                  v-model="houseInfoPreDTO.completionArea"
                  @change="changeArea()"
                  placeholder="请输入"
                  unit="平方米"
                  size="mini"
                  :min="0"
                ></DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="竣工套内面积">
                <DistInputNumber
                  v-model="houseInfoPreDTO.completionIndoorArea"
                  @change="changeArea()"
                  placeholder="请输入"
                  unit="平方米"
                  size="mini"
                  :min="0"
                ></DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="竣工分摊面积">
                <DistInputNumber
                  v-model="houseInfoPreDTO.completionShareArea"
                  placeholder="请输入"
                  unit="平方米"
                  size="mini"
                  :min="0"
                ></DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否样板房">
                <el-select v-model="houseInfoPreDTO.modelHouses" clearable>
                  <el-option
                    v-for="(item, index) in twoChooseList"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否代售">
                <el-select v-model="houseInfoPreDTO.helpSell" clearable>
                  <el-option
                    v-for="(item, index) in twoChooseList"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="装修标准">
                <!-- required -->
                <el-select
                  v-model="houseInfoPreDTO.decorationType"
                  @change="decorationChange"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in decorationType"
                    :key="index"
                    :label="item.renovationCode"
                    :value="item.renovationCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="装修标准说明">
                <el-input
                  type="textarea"
                  disabled
                  v-model="houseInfoPreDTO.decorationTypeDescription"
                  autosize
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签约模式" v-if="showSignModel">
                <!-- required -->
                <el-select
                  v-model="houseInfoPreDTO.signModel"
                  clearable
                  placeholder="注：网签代表职工在平台上签约；备案代表职工不在平台上签约"
                >
                  <el-option
                    v-for="(item, index) in signModel"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="竣工时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="houseInfoPreDTO.finishConstructionTime"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="交付使用时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="houseInfoPreDTO.deliveryTime"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  v-model="houseInfoPreDTO.specification"
                  autosize
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <el-dialog
      title="编码信息"
      :visible.sync="newCorrectDialog"
      width="80%"
      :close-on-click-modal="false"
    >
      <div class="search">
        <el-form
          size="mini"
          label-position="left"
          :model="newCorrectForm"
          label-width="5rem"
        >
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="房屋地址">
                <el-input
                  clearable
                  v-model="newCorrectForm.address"
                  size="medium"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
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
          <el-table-column prop="addr" label="地址"></el-table-column>
          <el-table-column prop="code" label="网格办编码"></el-table-column>
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
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import DistInputNumber from "@/components/DistInputNumber";
import http from "@/api/common(bj).js";
import common from "@/api/common.js";
export default {
  name: "housingEdit",
  components: {
    DistInputNumber,
  },
  data() {
    return {
      houseNo: "",
      rules: { required: true }, //必填规则
      orientation: [], //朝向
      houseInfoPreDTO: {},
      houesUser: [], //房屋用途
      apartment: [], //户型
      // 新增房源可以选择的栋
      buildNameList: [],
      // 选择是否数据字典
      twoChooseList: [
        { name: "是", value: true },
        { name: "否", value: false },
      ],
      radio: false,
      decorationType: [], // 装修类型数据字典
      sourceList: [], // 房屋来源
      nature: [], //房屋性质
      queryTerrace: [],
      signModel: ["网签", "备案"], //签约模式
      showSignModel: false,
      propertyList: [], //初始产权归属
      disEdit: false, //控制表单是否禁用
      addressList: [], //模糊查询列表
      isDropdownView: true, //判断是否显示模糊查询结果
      newCorrectDialog: false, //
      newCorrectForm: {
        page: 1,
        limit: 20,
        lv: 11,
        address: "",
      },
      newCorrectInfo: [], //
      newCorrectInfoPage: {
        currentPage: 1,
        pageSize: 20,
        pageSizesList: [10, 20, 30, 40],
        totalNumber: 0,
      },
      selectedData: {}, //选中的某条数据
      reliefID: "",
      areaList: [],
      checked: false,
    };
  },
  methods: {
    newCorrect() {
      this.newCorrectDialog = true;
      // this.getDictionary();
      this.$set(
        this.newCorrectForm,
        "address",
        this.houseInfoPreDTO.standardAddress
      );
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
    newCorrectConfirm() {
      if (!this.selectedData.code) {
        this.$message("请选择对应地址再进行提交");
      } else {
        this.saveGridInfo();
      }
    },
    saveGridInfo() {
      this.houseInfoPreDTO.serialNo = this.selectedData.code;
      this.houseInfoPreDTO.standardAddress = this.selectedData.addr;
      this.houseInfoPreDTO.longitude = this.selectedData.loc.coordinates[0];
      this.houseInfoPreDTO.latitude = this.selectedData.loc.coordinates[1];
      this.newCorrectDialog = false;
    },
    // 保存
    submitForm(formName) {
      this.$confirm("此操作将进行保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //=============================================
          if (
            this.houseInfoPreDTO.buildGuid == "" ||
            this.houseInfoPreDTO.buildGuid == null
          ) {
            this.$alert("请选择栋名称", "提示");
          }else if (
            this.houseInfoPreDTO.houseNo == "" ||
            this.houseInfoPreDTO.houseNo == null
          ) {
            this.$alert("请输入房号", "提示");
          }  else if (
            this.houseInfoPreDTO.serialNo == "" ||
            this.houseInfoPreDTO.serialNo == null
          ) {
            this.$alert("请输入网格办编号", "提示");
          } else if (
            this.houseInfoPreDTO.function == "" ||
            this.houseInfoPreDTO.function == null
          ) {
            this.$alert("请选择房屋用途", "提示");
          } else if (
            this.houseInfoPreDTO.houseLayout == "" ||
            this.houseInfoPreDTO.houseLayout == null
          ) {
            this.$alert("请选择户型", "提示");
          } else if (
            this.houseInfoPreDTO.orientation == "" ||
            this.houseInfoPreDTO.orientation == null
          ) {
            this.$alert("请选择朝向", "提示");
          } else if (
            this.houseInfoPreDTO.innerFloor != false &&
            this.houseInfoPreDTO.innerFloor != true
          ) {
            this.$alert("请选择是否有架空层", "提示");
          } else if (
            this.houseInfoPreDTO.terrace == "" ||
            this.houseInfoPreDTO.terrace == null
          ) {
            this.$alert("请选择是否有平台", "提示");
          } else if (
            this.houseInfoPreDTO.source == "" ||
            this.houseInfoPreDTO.source == null
          ) {
            this.$alert("请选择房屋来源", "提示");
          } else if (
            this.houseInfoPreDTO.propertypBelong == "" ||
            this.houseInfoPreDTO.propertypBelong == null
          ) {
            this.$alert("请输入初始产权归属", "提示");
          } else if (
            this.houseInfoPreDTO.startNature == "暂未绑定字段" ||
            this.houseInfoPreDTO.startNature == null
          ) {
            this.$alert("请输入初始房源性质", "提示");
          } else {
            if (!this.houseInfoPreDTO.signModel) {
              let startNatureTmp = "";
              this.nature.forEach((item) => {
                if (item.value == this.houseInfoPreDTO.startNature) {
                  startNatureTmp = item.name;
                }
              });
              if (
                startNatureTmp == "企业自建人才住房" ||
                startNatureTmp == "机关事业单位自有产权住房"
              ) {
                this.$alert("请选择签约模式", "提示");
              }
            }
            //判断交付时间，竣工时间
            if (
              this.houseInfoPreDTO.deliveryTime == "" ||
              this.houseInfoPreDTO.deliveryTime == null
            ) {
            } else {
              if (
                this.houseInfoPreDTO.finishConstructionTime == "" ||
                this.houseInfoPreDTO.finishConstructionTime == null
              ) {
                this.$alert("竣工时间不得晚于交付使用时间！", "提示");
                return;
              } else if (
                new Date(this.houseInfoPreDTO.finishConstructionTime) >
                new Date(this.houseInfoPreDTO.deliveryTime)
              ) {
                this.$alert("竣工时间不得晚于交付使用时间！", "提示");
                return;
              }
            }
            this.houseInfoPreDTO.districtGuid = this.$parent.params.projectGuid;
            this.buildNameList.forEach((item) => {
              if (item.guid == this.houseInfoPreDTO.buildGuid) {
                this.houseInfoPreDTO.buildName = item.name;
                this.houseInfoPreDTO.buildNo = item.code;
              }
            });
            let params = {
              buildingGuid: this.houseInfoPreDTO.buildGuid,
            };
            this.houseInfoPreDTO.reliefID = this.reliefID;
            let data = this.houseInfoPreDTO;
            console.log(this.reliefID);
            console.log(data);
            if (this.$parent.params.source == "原有小区入库") {
              this.originalCommunity(params, data);
            } else {
              if (
                this.houseInfoPreDTO.coveredArea ===
                this.houseInfoPreDTO.residentialPoolArea +
                  this.houseInfoPreDTO.indoorArea
              ) {
                //保存小区
                this.community(params, data);
              } else {
                this.$confirm(
                  "当前预测绘面积不等于预测绘套内面积加预测绘分摊面积, 是否继续?",
                  "提示",
                  {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                  }
                )
                  .then(() => {
                    this.community(params, data);
                  })
                  .catch(() => {
                    this.$message({
                      type: "info",
                      message: "已取消保存",
                    });
                  });
              }
            }
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存",
          });
        });
    },
    //原有小区保存
    originalCommunity(params, data) {
      http
        .houseInfoAdd(params, data)
        .then((res) => {
          if (res) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
            this.houseInfoPreDTO = res;
            this.houseInfoPreDTO.districtName = this.$parent.params.districtName;
            //发送房源信息刷新
            this.Event.$emit("HousingEdit", { msg: "refresh" });
            this.againOpen(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //小区保存
    community(params, data) {
      http
        .addHouse(params, data)
        .then((res) => {
          if (res) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
            this.houseInfoPreDTO = res;
            this.houseInfoPreDTO.districtName = this.$parent.params.districtName;

            //发送房源信息刷新
            this.Event.$emit("HousingEdit", { msg: "refresh" });
            this.againOpen(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //保存重新打开
    againOpen(res) {
      this.fanhui();
      this.$parent.openTab({
        id: res.guid,
        label: res.houseNo,
        closable: true,
        meta: {
          state: "1", //1可编辑 0 查看 2新增
          menuId: "housingMessage",
        },
        component: () => import("@/views/houseResource/houseInput/HousingEdit"),
      });
    },
    getDict() {
      let dictionaryName = [
        "房屋用途",
        "房屋性质",
        "户型",
        "朝向",
        "平台",
        "房产来源",
        "所属区",
      ];
      let params = { names: dictionaryName.toString() };
      http
        .getDictionary(params)
        .then((res) => {
          let resp = JSON.parse(res);
          this.houesUser = resp.房屋用途;
          this.nature = this.$dictionaryChange(
            resp.房屋性质,
            this.nature,
            "通用"
          );
          this.areaList = resp.所属区;
          this.apartment = resp.户型;
          resp.朝向.forEach((item) => {
            if (item.name == "通用") {
              this.orientation = item.children;
            }
          });
          this.queryTerrace = resp.平台;
          this.sourceList = resp.房产来源;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //自动识别
    generateAddress() {
      this.addr();
    },
    addr() {
      console.log(this.consistent);
      if (
        this.houseInfoPreDTO.buildGuid != null &&
        this.houseInfoPreDTO.standardAddress != undefined &&
        this.houseInfoPreDTO.buildGuid != ""
      ) {
        for (var j = 0; j < this.buildNameList.length; j++) {
          if (this.buildNameList[j].guid == this.houseInfoPreDTO.buildGuid) {
            this.houseInfoPreDTO.buildName = this.buildNameList[j].name;
            break;
          }
        }
      } else {
        this.houseInfoPreDTO.buildName = "";
      }
      var addr;
      if (
        (this.houseInfoPreDTO.buildName == null ||
          this.houseInfoPreDTO.buildName == "") &&
        (this.houseInfoPreDTO.standardAddress == null ||
          this.houseInfoPreDTO.standardAddress == undefined) &&
        !this.consistent
      ) {
        addr =
          this.$parent.params.standardAddress +
          this.$parent.params.districtName;
      } else if (
        (this.houseInfoPreDTO.buildName == null ||
          this.houseInfoPreDTO.buildName == "") &&
        (this.houseInfoPreDTO.standardAddress != null ||
          this.houseInfoPreDTO.standardAddress != undefined) &&
        !this.consistent
      ) {
        addr =
          this.$parent.params.standardAddress +
          this.$parent.params.districtName;
      } else if (
        (this.houseInfoPreDTO.buildName != null ||
          this.houseInfoPreDTO.buildName != "") &&
        (this.houseInfoPreDTO.standardAddress != null ||
          this.houseInfoPreDTO.standardAddress != undefined) &&
        (this.houseInfoPreDTO.houseNo == null ||
          this.houseInfoPreDTO.houseNo == "") &&
        !this.consistent
      ) {
        addr =
          this.$parent.params.standardAddress +
          this.$parent.params.districtName +
          this.houseInfoPreDTO.buildName;
      } else if (
        (this.houseInfoPreDTO.buildName != null ||
          this.houseInfoPreDTO.buildName != "") &&
        (this.houseInfoPreDTO.standardAddress != null ||
          this.houseInfoPreDTO.standardAddress != undefined) &&
        (this.houseInfoPreDTO.houseNo != null ||
          this.houseInfoPreDTO.houseNo != "") &&
        !this.consistent
      ) {
        addr =
          this.$parent.params.standardAddress +
          this.$parent.params.districtName +
          this.houseInfoPreDTO.buildName +
          this.houseInfoPreDTO.houseNo;
      } else if (
        this.houseInfoPreDTO.standardAddress != null &&
        this.consistent
      ) {
        addr = this.houseInfoPreDTO.standardAddress;
      }
      this.$set(this.houseInfoPreDTO, "standardAddress", addr);
    },
    //判断小区是否更改
    edit() {
      //1可编辑 0 查看 2新增
      if (this.$parent.meta.state == "2") {
        //判断是否带栋号guid
        if (this.$parent.meta.buildGuid) {
          this.houseInfoPreDTO.buildGuid = this.$parent.meta.buildGuid;
        }
        this.getreliefID();
        this.addr();
      } else {
        let params = {};
        if (this.$parent.params.source == "原有小区入库") {
          params = {
            districtGuid: this.$parent.params.projectGuid,
            pageIndex: 1,
            pageSize: 1,
            houseInfoGuid: this.$parent.params.houseInfoGuid,
            configName: "原有小区入库",
          };
        } else {
          params = {
            districtGuid: this.$parent.params.projectGuid,
            pageIndex: 1,
            pageSize: 1,
            houseInfoGuid: this.$parent.params.houseInfoGuid,
          };
        }
        http
          .getHouseInfo(params)
          .then((res) => {
            if (res.content[0].standardAddress != null) {
              this.consistent = true;
            }
            this.houseInfoPreDTO = res.content[0];
            // this.reliefID = this.houseInfoPreDTO.reliefID;
            this.getreliefID();
            if (this.houseInfoPreDTO.buildGuid == null) {
              this.houseInfoPreDTO.buildGuid = res.content[0].unitGuid;
            }
            this.starNatureChange();
            this.addr();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    getreliefID() {
      if (
        this.houseInfoPreDTO.reliefID == null ||
        this.houseInfoPreDTO.reliefID == "" ||
        this.houseInfoPreDTO.reliefID == "undefined"
      ) {
        this.reliefID = Math.round(Math.random() * 10000000);
      } else {
        this.reliefID = this.houseInfoPreDTO.reliefID;
      }
      console.log(this.reliefID);
    },
    async onLoad() {
      this.Event.$on("HouseInputTab", (data) => {
        if (data.msg == "ChangeSave") {
          this.getDict();
          let params = { districtGuid: this.$parent.params.projectGuid };
          http
            .renovationPreInfoList(params)
            .then((res) => {
              this.decorationType = res;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
      let params = { districtGuid: this.$parent.params.projectGuid };
      await http
        .renovationPreInfoList(params)
        .then((res) => {
          this.decorationType = res;
        })
        .catch((err) => {
          console.log(err);
        });
      await http
        .getProperty(params)
        .then((res) => {
          this.propertyList = res;
        })
        .catch((err) => {
          console.log(err);
        });
      await this.getBuildName();
      await this.edit();
    },
    fanhui() {
      this.$parent.close();
    },
    // 获取可以选择的栋-只可以更改子级的栋
    getBuildName() {
      this.buildNameList = [];
      let params;
      params = {
        code: "",
        name: "",
        floorCount: "",
        landNo: "",
        elevator: "",
        skirtFloorCount: "",
        districtGuid: this.$parent.params.projectGuid,
        pageIndex: 1,
        pageSize: 1000,
      };
      if (this.$parent.params.source == "原有小区入库") {
        http
          .houseBuilding(params)
          .then((res) => {
            // guid createSelf code
            res.content.forEach((item) => {
              //if (item.createSelf == true) {
              this.buildNameList.push({
                guid: item.guid,
                code: item.code,
                name: item.name,
              });
              //}
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        let params = { districtGuid: this.$parent.params.projectGuid };
        http
          .getBuildName(params)
          .then((res) => {
            this.buildNameList = res;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //装修标准选择
    decorationChange() {
      this.decorationType.forEach((item) => {
        if (this.houseInfoPreDTO.decorationType == item.renovationCode) {
          this.houseInfoPreDTO.decorationTypeDescription =
            item.renovationDescription;
        }
      });
    },
    //初始房源性质
    starNatureChange() {
      let startNaturetemp = "";
      this.nature.forEach((item) => {
        if (item.value == this.houseInfoPreDTO.startNature) {
          startNaturetemp = item.name;
        }
      });
      if (
        startNaturetemp == "企业自建人才住房" ||
        startNaturetemp == "机关事业单位自有产权住房"
      ) {
        this.showSignModel = true;
      } else {
        this.showSignModel = false;
        this.houseInfoPreDTO.signModel = "";
      }
    },
    //计算分摊面积
    changeArea() {
      let num1 = this.houseInfoPreDTO.completionArea;
      let num2 = this.houseInfoPreDTO.completionIndoorArea;
      if (num1 && num2) {
        this.houseInfoPreDTO.completionShareArea = Number(num1) - Number(num2);
      }
    },
    //定位
    location() {
      this.$route.query.serialNo = this.houseInfoPreDTO.serialNo;
      this.goMapInfo();
    },
    //定位
    goMapInfo() {
      let tab = {
        id: "MapInfo",
        label: "地图信息",
        closable: true,
        component: () => import("@/components/MapInfo"),
      };
      this.$parent.openTab(tab);
    },

    searchReseauDataByAddr() {
      let params = this.newCorrectForm;
      if (this.checked) {
        this.newCorrectForm.fuzzy = false;
      } else {
        this.newCorrectForm.fuzzy = true;
      }
      common
        .searchReseauDataByAddr(params)
        .then((res) => {
          if (res.length == 0) {
            this.$alert("没有相似地址信息！");
            this.isDropdownView = false;
          } else {
            this.isDropdownView = true;
            this.newCorrectInfo = res;
            this.newCorrectInfoPage.totalNumber = res[0].count;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dinwei() {
      if (
        this.houseInfoPreDTO.serialNo == null ||
        this.houseInfoPreDTO.serialNo == ""
      ) {
        this.$alert("请输入网格办编码");
        return;
      }

      let params = {
        reseauCode: this.houseInfoPreDTO.serialNo,
        page: 1,
        limit: 10,
      };
      common
        .searchReseauDataByCode(params)
        .then((res) => {
          if (res.length == 0) {
            this.$alert("没有查询到相关地址信息！");
          } else {
            this.$message({
              message: "定位成功",
              type: "success",
            });
            this.houseInfoPreDTO.standardAddress = res[0].addr;
            this.selectedData = res[0];
            // this.saveGridInfo();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    jiuji() {
      console.log(this.buildNameList);
      for (var j = 0; j < this.buildNameList.length; j++) {
        if (this.buildNameList[j].guid == this.houseInfoPreDTO.buildGuid) {
          this.houseInfoPreDTO.buildName = this.buildNameList[j].name;
          break;
        }
      }
      if (
        (this.houseInfoPreDTO.buildName == null ||
          this.houseInfoPreDTO.buildName == "") &&
        (this.houseInfoPreDTO.houseNo == null ||
          this.houseInfoPreDTO.houseNo == "")
      ) {
        this.$alert("填写栋名称和房号");
         return;
      }
      if (
        this.houseInfoPreDTO.standardAddress == null ||
        this.houseInfoPreDTO.standardAddress == ""
      ) {
        return;
      }
      console.log(this.areaList);
      for (var i = 0; i < this.areaList.length; i++) {
        if (this.$parent.params.area == this.areaList[i].value) {
          this.houseInfoPreDTO.area = this.areaList[i].name;
          break;
        }
      }
      var houseAddress;
      if (this.consistent) {
        houseAddress = this.houseInfoPreDTO.standardAddress;
      } else {
        houseAddress =
          this.$parent.params.standardAddress +
           this.$parent.params.districtName + 
          this.houseInfoPreDTO.buildName +
          this.houseInfoPreDTO.houseNo;
      }
      let params = {
        reliefId: this.reliefID,
        houseAddress: houseAddress,
        districtName: this.houseInfoPreDTO.districtName,
        street: this.$parent.params.street,
        area: this.houseInfoPreDTO.area,
        type: 11,
      };
      console.log(params);
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
    },
  },
  created() {
    this.getDict();
    this.onLoad();
    this.houseInfoPreDTO.districtName = this.$parent.params.districtName;
    this.houseInfoPreDTO.street = this.$parent.params.street;
    this.decorationChange();
  },
  mounted() {
    this.$parent.meta.state == 0
      ? (this.disEdit = true)
      : (this.disEdit = false); //查看状态进入禁用表单
  },
};
</script>
<style lang="scss" scoped>
.HousingEdit {
  //总样式增加禁用文字居中，此处单独修改
  /deep/ .quarterMessage_box .el-input.is-disabled .el-input__inner {
    text-align: left;
  }
}
.page_box {
  text-align: right;
  margin-top: 10px;
}
.el-input-group__append button.el-button {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
  margin-right: 5px;
}
</style>
