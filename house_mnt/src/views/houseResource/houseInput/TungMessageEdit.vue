<!--
 * @Description: 房源录入-栋信息新建
 * @Version: 1.0
 * @Autor: wangyue
 * @Date: 2019-11-26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-23 17:36:55
 -->
<template>
  <div class="tungMessageEdit">
    <div class="changci_content_left">
      <div class="quarterMessage_box margin_box">
        <div style="margin: 20px 0">
          <el-button type="primary" @click="submitForm('dto1')" size="mini"
            >保存</el-button
          >
          <el-button type="primary" @click="fanhui" size="mini">返回</el-button>
        </div>
        <el-form
          :model="dto1"
          :rules="rules"
          ref="dto1"
          label-width="9rem"
          class="demo-ruleForm"
          :disabled="isEdit"
        >
          <div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="网格办编码" style="position: relative">
                  <el-input
                    v-model="dto1.serialNo"
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
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="宗地号" required>
                  <el-select
                    v-model="dto1.landNo"
                    clearable
                    @change="changeLandNo"
                  >
                    <el-option
                      v-for="(item, index) in landNoList"
                      :key="index"
                      :label="item.landNo"
                      :value="item.landNo"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="小区名称" class="width">
                  <el-input v-model="dto1.districtName" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="栋号" required>
                  <el-input
                    v-model="dto1.code"
                    placeholder="请输入"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="栋名称" required>
                  <el-input
                    v-model="dto1.name"
                    placeholder="请输入"
                    clearable
                    @keyup.native="generateAddress()"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="土地使用期" required>
                  <el-date-picker
                    type="date"
                    v-model="dto1.usefulLife"
                    disabled
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="地址" required>
                  <el-input v-model="dto1.standardAddress">
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
                    >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否带电梯" required>
                  <el-select v-model="dto1.elevator" clearable>
                    <el-option
                      v-for="(item, index) in isElevator"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="底层用途" required>
                  <el-select v-model="dto1.groundFloorUse" clearable>
                    <el-option
                      v-for="(item, index) in bottomUse"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="总楼层数" required>
                  <el-input
                    v-model="dto1.floorCount"
                    placeholder="请输入"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单元数">
                  <el-input
                    v-model="dto1.unitCount"
                    placeholder="请输入"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="地下层数" required>
                  <el-input
                    v-model="dto1.subFloorCount"
                    placeholder="请输入"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="裙楼层数" required>
                  <el-input
                    v-model="dto1.skirtFloorCount"
                    placeholder="请输入"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="建筑面积" required>
                  <DistInputNumber
                    v-model="dto1.coveredArea"
                    placeholder="请输入"
                    unit="平方米"
                    size="mini"
                    :min="0"
                  >
                  </DistInputNumber>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="基层面积" required>
                  <DistInputNumber
                    v-model="dto1.baseArea"
                    placeholder="请输入"
                    unit="平方米"
                    size="mini"
                    :min="0"
                  >
                  </DistInputNumber>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="建筑基础" required>
                  <el-select v-model="dto1.buildBasic" clearable>
                    <el-option
                      v-for="(item, index) in buildingBasics"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="建筑结构" required>
                  <el-select v-model="dto1.construction" clearable>
                    <el-option
                      v-for="(item, index) in structure"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开工时间" required>
                  <el-form-item>
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="dto1.startConstructionTime"
                      style="width: 100%"
                    ></el-date-picker>
                  </el-form-item>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="竣工时间">
                  <el-form-item>
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="dto1.finishConstructionTime"
                      style="width: 100%"
                    ></el-date-picker>
                  </el-form-item>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="交付使用时间">
                  <el-form-item>
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="dto1.deliveryTime"
                      style="width: 100%"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="指定中间层">
                  <el-input
                    v-model="dto1.middleFloor"
                    placeholder="请输入"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电梯个数">
                  <el-input
                    v-model="dto1.countElevator"
                    placeholder="请输入"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="每层户数">
                  <el-input
                    v-model="dto1.countFloor"
                    placeholder="请输入"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="栋详细说明" class="width xiangqing">
                  <el-input
                    type="textarea"
                    v-model="dto1.remark"
                    autosize
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
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
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import DistInputNumber from "@/components/DistInputNumber";
import http from "@/api/common(bj).js";
import common from "@/api/common.js";
export default {
  name: "TungMessageEdit",
  components: {
    DistInputNumber,
  },
  data() {
    return {
      buildingBasics: [], //建筑基础
      structure: [], //建筑结构
      bottomUse: [], //底层用途
      lotStandardList: [], //地段标准数据字典
      isElevator: [
        { name: "是", value: true },
        { name: "否", value: false },
      ], //是否带电梯
      dto1: {
        //表单字段
        serialNo: "",
        landNo: "",
        districtName: "",
        code: "",
        name: "",
        elevator: "",
        standardAddress: "",
        groundFloorUse: "",
        floorCount: "",
        unitCount: "",
        subFloorCount: "",
        skirtFloorCount: "",
        coveredArea: "",
        baseArea: "",
        buildBasic: "",
        construction: "",
        startConstructionTime: "",
        finishConstructionTime: "",
        deliveryTime: "",
        middleFloor: "",
        countElevator: null, //电梯个数
        countFloor: null, //每层户数
        remark: "",
        reliefID: "",
        street: "",
        area: "",
      },
      rules: { required: true }, //必填规则
      landNoList: [], //宗地号列表
      isEdit: false,
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
      selectedData: {}, //选中的某条数据
      radio: false,
      areaList: [],
      reliefID: "",
      isChoose: false,
      checked: false,
      consistent: false,
    };
  },
  methods: {
    newCorrect() {
      this.newCorrectDialog = true;
      // this.getDictionary();
      this.$set(this.newCorrectForm, "address", this.dto1.standardAddress);
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
        this.dto1.serialNo = this.selectedData.code;
        this.$set(this.dto1, "standardAddress", this.selectedData.addr);
        this.isChoose = true;
      }
      this.newCorrectDialog = false;
    },

    saveGridInfo() {
      let data = this.selectedData;
      let params = {
        districtGuid: this.$parent.params.projectGuid,
        itemName: this.$route.query.itemName,
      };
      if (this.$parent.params.source != "原有小区入库") {
        common
          .saveGridInfo(params, data)
          .then((res) => {
            if (res) {
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 保存
    submitForm(formName) {
      this.$confirm("此操作将进行保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.dto1.landNo == "" || this.dto1.landNo == null) {
            this.$alert("请输入宗地号", "提示");
          } else if (this.dto1.code == "" || this.dto1.code == null) {
            this.$alert("请输入栋号", "提示");
          } else if (this.dto1.name == "" || this.dto1.name == null) {
            this.$alert("请输入栋名称", "提示");
          } else if (
            this.dto1.usefulLife == "" ||
            this.dto1.usefulLife == null
          ) {
            this.$alert("请输入土地使用期", "提示");
          } else if (
            this.dto1.floorCount === "" ||
            this.dto1.floorCount === null
          ) {
            this.$alert("请输入总楼层数", "提示");
          } else if (
            this.dto1.skirtFloorCount === "" ||
            this.dto1.skirtFloorCount === null
          ) {
            this.$alert("请输入裙楼层数", "提示");
          } else if (
            this.dto1.subFloorCount === "" ||
            this.dto1.subFloorCount === null
          ) {
            this.$alert("请输入地下层数", "提示");
          } else if (
            this.dto1.construction == "" ||
            this.dto1.construction == null
          ) {
            this.$alert("请输入建筑结构", "提示");
          } else if (
            this.dto1.buildBasic == "" ||
            this.dto1.buildBasic == null
          ) {
            this.$alert("请输入建筑基础", "提示");
          } else if (
            this.dto1.coveredArea === "" ||
            this.dto1.coveredArea === null
          ) {
            this.$alert("请输入建筑面积", "提示");
          } else if (this.dto1.baseArea === "" || this.dto1.baseArea === null) {
            this.$alert("请输入基层面积", "提示");
          } else if (
            this.dto1.startConstructionTime == "" ||
            this.dto1.startConstructionTime == null
          ) {
            this.$alert("请输入开工时间", "提示");
          } else if (
            this.dto1.groundFloorUse == "" ||
            this.dto1.groundFloorUse == null
          ) {
            this.$alert("请选择底层用途", "提示");
          } else if (
            this.dto1.elevator != false &&
            this.dto1.elevator != true
          ) {
            this.$alert("请选择是否有电梯", "提示");
          } else {
            //判断开工时间是否晚于竣工时间
            if (
              this.dto1.finishConstructionTime != "" &&
              this.dto1.finishConstructionTime != null
            ) {
              if (
                new Date(this.dto1.startConstructionTime) >
                new Date(this.dto1.finishConstructionTime)
              ) {
                this.$alert("开工时间不得晚于竣工时间", "提示");
                return;
              }
            }
            //判断是否为原有小区录入
            let params = { districtGuid: this.$parent.params.projectGuid };
            this.dto1.reliefID = this.reliefID;
            let data = this.dto1;
            console.log(data);
            if (this.$parent.params.source == "原有小区入库") {
              this.originalCommunity(params, data);
            } else {
              this.community(params, data);
            }
            if (this.isChoose) {
              this.saveGridInfo();
            }
          }
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: "已取消保存",
          });
        });
    },
    //原有小区保存
    originalCommunity(params, data) {
      http
        .houseBuildingAdd(params, data)
        .then((res) => {
          if (res) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
            this.dto1 = res;
            this.dto1.districtName = this.$parent.params.districtName;
            this.Event.$emit("tungMessageEdit", { msg: "refresh" });
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
        .addDInfo(params, data)
        .then((res) => {
          if (res) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
            this.dto1 = res;
            this.dto1.districtName = this.$parent.params.districtName;
            this.dto1.standardAddress = this.selectedData.addr;
            this.Event.$emit("tungMessageEdit", { msg: "refresh" });
            this.againOpen(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
      //自动识别
    generateAddress() {
      this.addr();
    },
    //保存重新打开
    againOpen(res) {
      this.fanhui();
      this.$parent.openTab({
        id: res.guid + "栋详细1",
        label: res.name,
        closable: true,
        meta: {
          state: "1", //1可编辑 0 查看 2新增
          menuId: "tungMessage",
        },
        component: () =>
          import("@/views/houseResource/houseInput/TungMessageEdit"),
      });
    },
    //
    changeLandNo() {
      this.$forceUpdate();
      this.dto1.usefulLife = null;
      this.landNoList.forEach((item) => {
        if (this.dto1.landNo === item.landNo) {
          if (item.useEnd != null && item.useEnd != "") {
            this.dto1.usefulLife = new Date(item.useEnd);
          }
        }
      });
    },
    //字典
    getDict() {
      let dictionaryName = [
        "建筑结构",
        "建筑基础",
        "底层用途",
        "地段标准",
        "所属区",
      ];
      let params = { names: dictionaryName.toString() };
      http
        .getDictionary(params)
        .then((res) => {
          let resp = JSON.parse(res);
          this.structure = resp.建筑结构;
          this.buildingBasics = resp.建筑基础;
          this.areaList = resp.所属区;
          this.bottomUse = resp.底层用途;
          this.lotStandardList = resp.地段标准;
        })
        .catch((err) => {
          console.log(err);
        });
      this.getlandNoList();
    },
    //宗地号列表
    getlandNoList() {
      console.log(this.$parent.meta, this.$route);
      let _params;
      _params = {
        landNo: "",
        districtGuid: this.$parent.params.projectGuid,
        landNoGuid: "",
      };
      if (
        this.$parent.params.source == "原有小区入库" &&
        this.$parent.meta.state != 0
      ) {
        http
          .houseLandNo(_params)
          .then((res) => {
            if (res.length > 0) {
              this.landNoList = res;
              this.dto1.landNo = res[0].landNo; //宗地号
              this.dto1.usefulLife = res[0].useEnd; //土地使用期
            } else {
              this.$alert("请先新增宗地信息", "提示", {
                type: "warning",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        let _params1 = { districtGuid: this.$parent.params.projectGuid };
        http
          .landNolist(_params1)
          .then((res) => {
            this.landNoList = res;
            if (this.dto1.landNo) {
              this.dto1.landNo = res[0].landNo;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //定位
    location() {
      this.$route.query.serialNo = this.dto1.serialNo || 4403040060050500012;
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
    addr() {
      var addr;
      if (
        (this.dto1.name == null || this.dto1.name == "") &&
        (this.dto1.standardAddress == null ||
          this.dto1.standardAddress == undefined) &&
        !this.consistent
      ) {
        addr =
          this.$parent.params.standardAddress +
          this.$parent.params.districtName;
      } else if (
        (this.dto1.name != null || this.dto1.name != "") &&
        (this.dto1.standardAddress != null ||
          this.dto1.standardAddress != undefined) &&
        !this.consistent
      ) {
        addr =
          this.$parent.params.standardAddress +
          this.$parent.params.districtName +
          this.dto1.name;
      } else if (this.dto1.standardAddress != null && this.consistent) {
        addr = this.dto1.standardAddress;
      }
      this.$set(this.dto1, "standardAddress", addr);
    },
    //判断小区是否更改
    edit() {
      //1可编辑 0 查看 2新增
      if (this.$parent.meta.state == "2") {
        this.dto1 = {};
        this.dto1.districtName = this.$parent.params.districtName;
        // this.dto1.standardAddress =
        //   this.dto1.standardAddress || this.$parent.params.standardAddress;
        this.addr();
        this.getreliefID();
      } else {
        if (this.$parent.meta.state == "0") {
          this.isEdit = true;
        }
        let params = {
          //buildPurpose: "",
          //unitCount: "",
          code: "",
          floorCount: "",
          landNo: "",
          name: "",
          elevator: "",
          skirtFloorCount: "",
          districtGuid: this.$parent.params.projectGuid,
          buildingGuid: this.$parent.params.buildingGuid,
          itemName: this.$parent.meta.itemName,
          pageIndex: 1,
          pageSize: 1,
        };
        if (this.$parent.params.source == "原有小区入库") {
          http
            .houseBuilding(params)
            .then((res) => {
              this.dto1 = res.content[0];
              this.dto1.districtName = this.$parent.params.districtName;
              // this.dto1.standardAddress =
              //   this.dto1.standardAddress ||
              //   this.$parent.params.standardAddress;
             this.addr();
              this.getreliefID();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          http
            .getDInfo(params)
            .then((res) => {
              if (this.dto1.standardAddress != res.content[0].standardAddress) {
                this.consistent = true;
              }
              this.dto1 = res.content[0];
              this.dto1.districtName = this.$parent.params.districtName;
              // this.dto1.standardAddress =
              //   this.dto1.standardAddress ||
              //   this.$parent.params.standardAddress;
              this.addr();
              this.getreliefID();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
    getreliefID() {
      if (
        this.dto1.reliefID == null ||
        this.dto1.reliefID == "" ||
        this.dto1.reliefID == "undefined"
      ) {
        this.reliefID = Math.round(Math.random() * 10000000);
      } else {
        this.reliefID = this.dto1.reliefID;
      }
      console.log(this.reliefID);
    },
    onLoad() {
      this.Event.$on("HouseInputTab", (data) => {
        if (data.msg == "ChangeSave") {
          this.getDict();
          this.dto1.districtName = this.$parent.params.districtName;
          this.addr();

          this.dto1.street = this.$parent.params.street;
        }
      });
    },
    fanhui() {
      this.$parent.close();
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
          if (res.length == 0) {
            this.$alert("没有相似地址信息！");
            // this.isDropdownView = false;
          } else {
            this.newCorrectInfo = res;
            this.newCorrectInfoPage.totalNumber = res[0].count;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dinwei() {
      if(this.dto1.serialNo == null||
        this.dto1.serialNo == ""
      ) {
        return;
      }
      let params = {
        reseauCode: this.dto1.serialNo,
        page: 1,
        limit: 10,
      };
      common
        .searchReseauDataByCode(params)
        .then((res) => {
          if (res.length == 0) {
            this.$alert("没有查询到相关地址信息！");
          } else {
            this.dto1.standardAddress = res[0].addr;
            this.selectedData = res[0];
            // this.saveGridInfo();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    jiuji() {
      this.$confirm("此操作将进行救济服务申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.dto1.name == null || this.dto1.name == "") {
            this.$alert("填写栋名称");
            return;
          }
          if (
            this.dto1.standardAddress == null ||
            this.dto1.standardAddress == ""
          ) {
            return;
          }
          for (var i = 0; i < this.areaList.length; i++) {
            if (this.$parent.params.area == this.areaList[i].value) {
              this.dto1.area = this.areaList[i].name;
              break;
            }
          }
          var houseAddress;
          if (this.isChoose) {
            houseAddress = this.dto1.standardAddress;
          } else {
            houseAddress =
              this.$parent.params.standardAddress +
              this.$parent.params.districtName +
              this.dto1.name;
          }
          let params = {
            reliefId: this.reliefID,
            houseAddress: houseAddress,
            districtName: this.dto1.districtName,
            street: this.$parent.params.street,
            area: this.dto1.area,
            type: 9,
          };
          let data = {};
          console.log(params);
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
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存",
          });
        });
    },
  },
  created() {
    this.onLoad();
    this.getDict();
    this.edit();
  },
};
</script>
<style lang="scss" scoped>
.tungMessageEdit {
  //总样式增加禁用文字居中，此处单独修改
  /deep/ .quarterMessage_box .el-input.is-disabled .el-input__inner {
    text-align: left;
  }
  .el-input-group__append button.el-button {
    background-color: #409eff;
    border-color: #409eff;
    color: #fff;
    margin-right: 5px;
  }
}
</style>
