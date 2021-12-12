<!--房源信息勘误小区信息-->
<template>
  <div class="neighbourhoodInfo">
    <div style="position: relative">
      <el-button
        type="warning"
        size="mini"
        @click="restoreDistrict"
        :disabled="this.$route.query.activityName == '审批'"
        v-if="form.state == 0 && hasPerm('fygl_fyxxkw_hfxq')"
        >恢复小区</el-button
      >
      <el-button
        type="warning"
        size="mini"
        @click="del"
        :disabled="this.$route.query.activityName == '审批'"
        v-if="
          !(form.state == 0) &&
          !(this.$route.params.state == 'done') &&
          hasPerm('fygl_fyxxkw_scxq')
        "
        >删除小区</el-button
      >
      <div style="position: absolute; top: 0px; right: 0px">
        <el-button
          type="primary"
          size="mini"
          @click="save"
          :disabled="this.$route.query.activityName == '审批'"
          v-if="
            hasPerm('fygl_fyxxkw_bc') && !(this.$route.params.state == 'done')
          "
          style="text-align: right"
          >保存</el-button
        >
      </div>
    </div>
    <div class="tableStyle">
      <table>
        <tr>
          <td class="must">小区编号</td>
          <td>
            <el-input v-model="form.code" disabled></el-input>
          </td>
          <td class="must">小区名称</td>
          <td>
            <el-input
              v-model="form.name"
              @change="changeName()"
              :class="{ input: isName }"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>曾用小区名称</td>
          <td>
            <el-input v-model="form.usedName" disabled></el-input>
          </td>
          <td>所在区</td>
          <td style="text-align: left">
            <el-select
              style="width: 100%"
              v-model="form.area"
              placeholder="请选择"
              :class="{ input: isArea }"
              :disabled="edit"
              clearable
            >
              <el-option
                v-for="(item, index) in areaData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>所在街道</td>
          <td>
            <el-input
              v-model="form.street"
              placeholder="请输入内容"
              :class="{ input: isStreet }"
              :disabled="edit"
            ></el-input>
          </td>
          <td>路(门牌号)</td>
          <td>
            <el-input
              v-model="form.roadName"
              placeholder="如:道路、门牌号"
              :disabled="edit"
              :class="{ input: isRoad }"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>地址</td>
          <td style="position: relative" colspan="3">
            <el-input
              v-model="form.address"
              :disabled="edit"
              :class="{ input: isAdrress }"
            ></el-input>
            <el-button
              type="primary"
              size="mini"
              style="position: absolute; top: 5px; right: 5px"
              @click="generate"
              :disabled="edit"
              v-if="!(this.$route.params.state == 'done')"
              >生成</el-button
            >
          </td>
        </tr>
        <tr>
          <td>用地面积</td>
          <td :class="{ td: isLandAreaAsyn }" style="position: relative">
            <el-input
              v-model="form.landArea"
              placeholder="请输入内容"
              @input="proving1()"
              ref="landArea"
              :disabled="edit"
              :class="{ input: isLandAreaAsyn }"
            ></el-input>
            <span
              v-show="form.landArea"
              style="position: absolute; right: 5px; top: 7px"
              >㎡</span
            >
          </td>
          <td>总建筑面积</td>
          <td
            :class="{ td: isTotalCoveredAreaAsyn }"
            style="position: relative"
          >
            <el-input
              v-model="form.totalCoveredArea"
              placeholder="请输入内容"
              @input="proving2()"
              ref="totalCoveredArea"
              :disabled="edit"
              :class="{ input: isTotalCoveredAreaAsyn }"
            ></el-input>
            <span
              v-show="form.totalCoveredArea"
              style="position: absolute; right: 5px; top: 7px"
              >㎡</span
            >
          </td>
        </tr>
        <tr>
          <td>容积率</td>
          <td>
            <el-input
              v-model="form.volumeRatio"
              placeholder="请输入内容"
              @input="proving3"
              :disabled="edit"
              :class="{ input: isVolumeRatio }"
            ></el-input>
          </td>
          <td>开工时间</td>
          <td style="text-align: left">
            <el-date-picker
              style="width: 100%"
              v-model="form.startConstructionTime"
              type="date"
              :disabled="edit"
              placeholder="选择日期"
              :class="{ input: isStartConstructionTime }"
            ></el-date-picker>
          </td>
        </tr>
        <tr>
          <td>竣工时间</td>
          <td style="text-align: left">
            <el-date-picker
              style="width: 100%"
              v-model="form.finishConstructionTime"
              type="date"
              :disabled="edit"
              placeholder="选择日期"
              :class="{ input: isFinishConstructionTime }"
            ></el-date-picker>
          </td>
          <td>交付使用时间</td>
          <td style="text-align: left">
            <el-date-picker
              style="width: 100%"
              v-model="form.deliveryTime"
              type="date"
              :disabled="edit"
              placeholder="选择日期"
              :class="{ input: isDeliveryTime }"
            ></el-date-picker>
          </td>
        </tr>
        <tr>
          <td>开发商</td>
          <td>
            <el-input
              v-model="form.developer"
              placeholder="请输入内容"
              :class="{ input: isDeveloper }"
              :disabled="edit"
            ></el-input>
          </td>
          <td>设计单位</td>
          <td>
            <el-input
              v-model="form.designOrgnation"
              placeholder="请输入内容"
              :class="{ input: isDesignOrgnation }"
              :disabled="edit"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>是否自管</td>
          <td style="text-align: left">
            <el-select
              style="width: 100%"
              v-model="form.selfSupervise"
              placeholder="请选择"
              :class="{ input: isSelfManagement }"
              :disabled="edit"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
          <td>是否自建</td>
          <td style="text-align: left">
            <el-select
              style="width: 100%"
              v-model="form.selfBuilt"
              placeholder="请选择"
              :class="{ input: isSelfBuilt }"
              :disabled="edit"
              clearable
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
          <td>是否代售</td>
          <td style="text-align: left">
            <el-select
              style="width: 100%"
              v-model="form.helpSale"
              placeholder="请选择"
              @change="changeHelpSale"
              :class="{ input: isHelpSale }"
              :disabled="edit"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
          <td>装修标准</td>
          <td>
            <el-input v-model="form.decorationStandard" disabled></el-input>
          </td>
        </tr>
        <tr>
          <td>数据维护归属</td>
          <td>
            <el-select
              style="width: 100%"
              v-model="form.districtMaintainBelong"
              disabled
            >
              <el-option
                v-for="(item, index) in belongType"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </td>
          <td>小区详情说明</td>
          <td>
            <el-input
              type="textarea"
              v-model="form.remark"
              placeholder="请输入内容"
              @change="changeRemark()"
              :class="{ input: isRemark }"
              :disabled="edit"
            ></el-input>
          </td>
        </tr>
      </table>
    </div>
    <publicTitle title="装修标准"></publicTitle>
    <el-table
      :data="renovationList"
      style="width: 100%"
      border
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
      <el-table-column label="序号" type="index" width="70"></el-table-column>
      <el-table-column label="装修标准" width="200px">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.renovationCode"
            disabled
            type="textarea"
            cols="2"
            rows="4"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="装修标准说明">
        <template slot-scope="scope">
          <el-input
            type="textarea"
            cols="2"
            rows="4"
            v-model="scope.row.renovationDescription"
            :disabled="edit"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
    <publicTitle title="勘误信息列表"></publicTitle>
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
          <template slot-scope="scope">{{
            scope.row.changeBefore | dateFormat
          }}</template>
        </el-table-column>
        <el-table-column label="勘误后">
          <template slot-scope="scope">{{
            scope.row.changeAfter | dateFormat
          }}</template>
        </el-table-column>
        <el-table-column label="勘误时间">
          <template slot-scope="scope">{{
            scope.row.changeTime | dateFormat
          }}</template>
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
  </div>
</template>

<script>
import http from "@/api/housestore.js";
import publicTitle from "@/components/TitleStyle"; //标题组件
import { Differ } from "@/components/js/change";
import api from "@/api/publicMethod";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "NeighbourhoodDetail",
  components: {
    publicTitle, //标题公共组件
  },
  data() {
    return {
      districtGuid: "", //小区归属
      taskId: "", //任务guid
      state: "", //从哪里进来
      PID: "", //PID
      communityType: [], //小区归属
      readonly: true, //只读
      edit: false, //禁用
      totalCoveredAreaAsyn: "",
      landAreaAsyn: "",
      form: {
        address: "",
        area: "",
        belongArea: "",
        code: "",
        constructorProjectGuid: "",
        decorationStandard: "",
        deliveryTime: "",
        designOrgnation: "",
        developer: "",
        finishConstructionTime: "",
        guid: "",
        landArea: "",
        name: "",
        parentGuid: "",
        remark: "",
        reportGuid: "",
        selfBuilt: "",
        selfManagement: "",
        startConstructionTime: "",
        street: "",
        totalCoveredArea: "",
        volumeRatio: "",
        belongArea: "",
        helpSale: "",
        roadName: "",
      }, //小区信息
      show: true, //删除按钮的显隐
      copyData: {}, //复制之后的小区信息
      changeDetailList: [], //变更列表的数据
      tableData: [], //勘误信息列表
      renovationList: [], //装修标准列表
      accessableUnitGuid: [], //用户单位标识
      copyRenovationList: [], //复制之后的装修列表
      options: [
        { value: true, label: "是" },
        { value: false, label: "否" },
      ],
      areaData: [], //区域数据-下拉
      decorationStandardData: [], //装修标准-下拉
      belongType: [], //数据维护归属
      isArea: false, //所在区是否改变样式
      isStreet: false,
      isRoad: false,
      isAdrress: false,
      isLandAreaAsyn: false,
      isTotalCoveredAreaAsyn: false,
      isVolumeRatio: false,
      isStartConstructionTime: false,
      isFinishConstructionTime: false,
      isDeliveryTime: false,
      isDeveloper: false,
      isDesignOrgnation: false,
      isSelfManagement: false,
      isSelfBuilt: false,
      isDecorationStandard: false,
      isRemark: false,
      isComunity: false,
      isName: false,
      isChangeLandNo: false,
      isHelpSale: false,
      currentPage: 1,
      pageSize: 10,
      pageSizesList: [10, 20, 30, 40],
      totalNumber: 0, //数据的总数
    };
  },
  methods: {
    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //保存装修标准
    saveDecoration() {
      let params = {
        districtGuid: this.districtGuid,
      };
      let data = this.renovationList;
      http
        .saveDecoration(params, data)
        .then((res) => {
          if (res) {
            // this.getRenovationList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取装修列表
    getRenovationList() {
      let params = {
        districtGuid: this.districtGuid,
      };
      http
        .getRenovationList(params)
        .then((res) => {
          this.renovationList = res;
          this.copyRenovationList = this.deepClone(res); //复制前的装修标准
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取流程数据
    getProcessInfo() {
      let params = {
        taskId: this.taskId,
      };
      api
        .getProcessInfo(params)
        .then((res) => {
          if (res[0]) {
            this.PID = res[0].PID;
            this.$parent.params.PID1 = res[0].PID;
            this.$parent.params.PID = res[0].PIID;
            this.$parent.params.ACTIVITYNAME = res[0].ACTIVITYNAME;
            this.changeDetail();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取小区详情信息

    getNeighbourhoodDetail() {
      let params = {};
      if (this.state == "done") {
        //从已办箱进入
        params = {
          districtGuid: this.districtGuid,
          state: 1,
        };
      } else {
        //从待办箱进入
        params = {
          districtGuid: this.districtGuid,
          state: 0,
        };
      }
      http
        .getNeighbourhoodInfo(params)
        .then((res) => {
          this.form = res; //变更后的数据
          this.copyData = this.deepClone(res); //变更前的数据
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
              if (this.form.districtMaintainBelong == e) {
                if (
                  this.$route.params.state == "done" ||
                  this.$route.query.activityName == "审批"
                ) {
                  this.edit = true;
                } else {
                  this.edit = false;
                }
              } else {
                this.edit = true;
              }
              return;
            });
          } else {
            this.edit = false;
          }
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
            targetObj[keys] = this.deepClone(source[keys]);
          } else {
            // 如果不是，就直接赋值
            targetObj[keys] = source[keys];
          }
        }
      }
      return targetObj;
    },
    // //验证只能输入正整数
    proving1() {
      this.landAreaAsyn = this.landAreaAsyn.replace(/[^\.\d]/g, "");
      this.landAreaAsyn = this.landAreaAsyn.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      this.landAreaAsyn = this.landAreaAsyn
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", "."); //只保留一个小数点
      //this.useCompany();
    },
    proving2() {
      this.totalCoveredAreaAsyn = this.totalCoveredAreaAsyn.replace(
        /[^\.\d]/g,
        ""
      );
      this.totalCoveredAreaAsyn = this.totalCoveredAreaAsyn.replace(
        /\.{2,}/g,
        "."
      ); //只保留第一个. 清除多余的
      this.totalCoveredAreaAsyn = this.totalCoveredAreaAsyn
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", "."); //只保留一个小数点
      this.useCompany();
    },
    proving3() {
      this.form.volumeRatio = this.form.volumeRatio + "";
      this.form.volumeRatio = this.form.volumeRatio.replace(/[^\.\d]/g, "");
      this.form.volumeRatio = this.form.volumeRatio.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      this.form.volumeRatio = this.form.volumeRatio
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", "."); //只保留一个小数点
    },
    //计算字符串长度
    useCompany() {
      function fontwidth(text) {
        let span = document.createElement("span");
        let result = {};
        result.width = span.offsetWidth;
        span.style.visibility = "hidden";
        span.style.display = "inline-block";
        document.body.appendChild(span);
        if (typeof span.textContent != "undefined") {
          span.textContent = text;
        } else {
          span.innerText = text;
        }
        result.width =
          parseFloat(window.getComputedStyle(span).width) - result.width;
        return result;
      }
      if (this.landAreaAsyn.length == 0) {
        this.$refs.landArea.style.width = "80%";
      } else {
        this.$refs.landArea.style.width =
          fontwidth(this.landAreaAsyn).width + "px";
      }
      if (this.totalCoveredAreaAsyn.length == 0) {
        this.$refs.totalCoveredArea.style.width = "80%";
      } else {
        this.$refs.totalCoveredArea.style.width =
          fontwidth(this.totalCoveredAreaAsyn).width + "px";
      }
    },
    //生成
    generate() {
      if (!this.form.street) {
        this.$alert("无法生成地址，请填写所在街道", "提示", {
          confirmButtonText: "确定",
        });
      } else if (!this.form.roadName) {
        this.$alert("无法生成地址，请填写路", "提示", {
          confirmButtonText: "确定",
        });
      } else {
        this.areaData.forEach((element) => {
          if (this.form.area == element.value) {
            this.form.address =
              element.name + this.form.street + this.form.roadName;
            this.isAdrress = true;
          }
        });
      }
    },
    //获取字典数据
    getDictionary() {
      let nameData = ["小区归属", "所属区", "装修标准", "数据维护权归属"];
      let params = { names: nameData.toString() };
      http
        .getDictionary(params)
        .then((res) => {
          this.communityType = JSON.parse(res).小区归属;
          this.areaData = JSON.parse(res).所属区;
          this.decorationStandardData = JSON.parse(res).装修标准;
          this.belongType = JSON.parse(res).数据维护权归属;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 保存
    save() {
      let _params = {
        districtGuid: this.districtGuid,
      };
      http
        .userHouseCounts(_params)
        .then((res) => {
          if (res == 0 || res.data == 0) {
            this.saveDistrict();
            this.saveDecoration();
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
                this.saveDistrict();
                this.saveDecoration();
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
    //保存小区信息
    saveDistrict() {
      if (!this.form.code) {
        this.$alert("无法保存信息，请填写小区编号", "提示", {
          confirmButtonText: "确定",
        });
      } else if (!this.form.name) {
        this.$alert("无法保存信息，请填写小区名称", "提示", {
          confirmButtonText: "确定",
        });
      }
      // else if (!this.form.street) {
      //   this.$alert("无法保存信息，请填写所在街道", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.roadName) {
      //   this.$alert("无法保存信息，请填写路", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.address) {
      //   this.$alert("无法保存信息，请填写地址", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.landArea) {
      //   this.$alert("无法保存信息，请填写用地面积", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.totalCoveredArea) {
      //   this.$alert("无法保存信息，请填写总建筑面积", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.developer) {
      //   this.$alert("无法保存信息，请填写开发商", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.designOrgnation) {
      //   this.$alert("无法保存信息，请填写设计单位", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // }
      else {
        this.$confirm("此操作将进行保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let _params = {};
            let _data = this.form;
            http
              .updateDistrict(_params, _data)
              .then((res) => {
                this.saveChangeDetail();
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.getNeighbourhoodDetail();
              })
              .catch((err) => {
                console.log(err);
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
      }
    },
    //恢复小区
    restoreDistrict() {
      let params = {
        districtGuid: this.districtGuid,
        projectId: this.PID,
      };
      http
        .restoreDistrict(params)
        .then((res) => {
          this.changeDetail();
          this.show = true;
          this.getNeighbourhoodDetail();
          this.Event.$emit("CorrectApply", "changeDetail");
          this.$message({
            message: "恢复小区成功",
            type: "success",
          });
        })
        .catch((err) => {
          this.$message({
            message: "恢复小区失败",
            type: "warning",
          });
        });
    },
    //删除小区
    del() {
      this.$confirm("是否确定删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            districtGuid: this.districtGuid,
            projectId: this.PID,
          };
          let data = {};
          http
            .deleteComunity(params, data)
            .then((res) => {
              this.changeDetail();
              this.getNeighbourhoodDetail();
              this.Event.$emit("CorrectApply", "changeDetail");
              this.$message({
                message: "删除小区成功",
                type: "success",
              });
            })
            .catch((err) => {
              this.$message({
                message: "删除小区失败",
                type: "warning",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    changeArea() {
      this.isArea = true;
    },
    changeRoad() {
      this.isRoad = true;
    },
    changeLandAreaAsyn() {
      this.isLandAreaAsyn = true;
    },
    changeTotalCoveredAreaAsyn() {
      this.isTotalCoveredAreaAsyn = true;
    },
    changeComunity() {
      this.isComunity = true;
    },
    changeVolumeRatio() {
      this.isVolumeRatio = true;
    },
    //保存变更明细
    saveChangeDetail() {
      var cfg = {
        address: "详细地址",
        area: "所属区",
        belongArea: "小区归属",
        decorationStandard: "装修标准",
        deliveryTime: "交付时间",
        designOrgnation: "设计单位",
        developer: "开发商",
        finishConstructionTime: "竣工时间",
        landArea: "用地面积",
        name: "名称",
        remark: "小区详细说明",
        roadName: "路",
        selfBuilt: "是否自建",
        selfManagement: "是否自管",
        helpSale: "是否代售",
        startConstructionTime: "开工时间",
        street: "所在街道",
        totalCoveredArea: "总建筑面积",
        volumeRatio: "容积率",
      };
      var cfgRenovationList = {
        items: {
          renovationDescription: "装修说明",
        },
      };
      console.log("====copyData", this.copyData);
      console.log("===form", this.form);
      var changeData = new Differ(this.copyData, this.form, cfg).differ();
      console.log("===changeData", changeData);

      var diffRenovationList = new Differ(
        this.copyRenovationList,
        this.renovationList,
        cfgRenovationList
      ).differ();
      var list = [];
      if (diffRenovationList.length != 0) {
        diffRenovationList.forEach((ele) => {
          ele.changeItem = "装修类型说明";
        });
        list = changeData.concat(diffRenovationList);
        if (list.length != 0) {
          list.forEach((ele) => {
            ele.changeGuid = "修改小区信息";
            ele.changeTime = new Date();
          });
        }
      } else {
        list = changeData;
        if (list.length != 0) {
          list.forEach((ele) => {
            ele.changeGuid = "修改小区信息";
            ele.changeTime = new Date();
          });
        }
      }
      let params = {
        districtGuid: this.districtGuid,
        projectId: this.$parent.params.PID1,
      };
      let data = list;
      http
        .saveChangeDetail(params, data)
        .then((res) => {
          this.changeDetail();
          //必须在把装修标准记完变更明细，之后再调用获取装修标准的接口
          this.getRenovationList();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取变更明细
    changeDetail() {
      let params = {
        districtGuid: this.districtGuid,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        projectId: this.$parent.params.PID1,
        type: this.districtGuid,
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

    changeFinishConstructionTime() {
      this.isFinishConstructionTime = true;
    },
    changeDeveloper() {
      this.isDeveloper = true;
    },
    changeDesignOrgnation() {
      this.isDesignOrgnation = true;
    },
    changeSelfBuilt() {
      this.isSelfBuilt = true;
    },
    changeDecorationStandard() {
      this.isDecorationStandard = true;
    },
    changeRemark() {
      this.isRemark = true;
    },
    changeAdrress() {
      this.isAdrress = true;
    },
    changeSelfManagement() {
      this.isSelfManagement = true;
    },
    changeDeliveryTime() {
      this.isDeliveryTime = true;
    },
    changeStartConstructionTime() {
      this.isStartConstructionTime = true;
    },
    changeHelpSale() {
      this.isHelpSale = true;
    },
    changeLandNo() {
      this.isChangeLandNo = true;
    },
    changeName() {
      this.isName = true;
    },
    //改变时改变颜色
    changeStreet() {
      this.isStreet = true;
    },
  },
  mounted() {
    if (
      this.$route.params.state == "done" ||
      this.$route.query.activityName == "审批"
    ) {
      this.edit = true;
    } else {
      this.edit = false;
    }
  },
  created() {
    //赋值让其它页面的值可以
    this.$parent.params.districtGuid = this.$route.params.guid;
    this.$parent.params.state = this.$route.params.state;
    this.$parent.params.taskId = this.$route.params.taskId;
    this.districtGuid = this.$route.params.guid;
    this.taskId = this.$route.params.taskId;
    this.state = this.$route.params.state;
    this.getNeighbourhoodDetail(); //获取小区详情信息
    this.getAccessableUnitGuid();
    //获取流程数据
    this.getProcessInfo();
    this.getDictionary(); //获取字典数据
    this.getRenovationList();
    this.Event.$emit("CorrectTodoBox", "correctTodoSearch");
  },
};
</script>

<style lang="scss" scoped>
.must::before {
  content: "*";
  color: #f56c6c;
  margin-right: 6px;
}
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
</style>
