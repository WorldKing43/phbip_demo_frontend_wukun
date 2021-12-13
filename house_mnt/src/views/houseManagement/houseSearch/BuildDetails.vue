<!--栋详情-->
<template>
  <div class="buildingDetails tableStyle">
    <table>
      <tr>
        <td>小区编码</td>
        <td>
          <el-input disabled v-model="form.districtCode"></el-input>
        </td>
        <td>小区名称</td>
        <td>
          <el-input disabled v-model="form.districtName"></el-input>
        </td>
      </tr>
      <tr>
        <td>网格办编码</td>
        <td style="position:relative">
          <el-input disabled v-model="form.serialNo"></el-input>
          <!-- <el-button type="primary" size="mini" @click="location" style="position:absolute;top:7px;right:5px;" v-if="hasPerm('fygl_fyfwk_dxx_dw')">定位</el-button> -->
        </td>
        <td>宗地号</td>
        <td>
          <el-input disabled v-model="form.landNo"></el-input>
        </td>
      </tr>
      <tr>
        <td>栋号</td>
        <td>
          <el-input disabled v-model="form.code"></el-input>
        </td>
        <td>栋名称</td>
        <td>
          <el-input disabled v-model="form.name"></el-input>
        </td>
      </tr>
      <tr>
        <td>单元数</td>
        <td>
          <el-input disabled v-model="form.unitCount"></el-input>
        </td>
        <td>总楼层数</td>
        <td>
          <el-input disabled v-model="form.floorCount"></el-input>
        </td>
      </tr>
      <tr>
        <td>裙楼层数</td>
        <td>
          <el-input disabled v-model="form.skirtFloorCount"></el-input>
        </td>
        <td>地下层数</td>
        <td>
          <el-input disabled v-model="form.subFloorCount"></el-input>
        </td>
      </tr>
      <tr>
        <td>指定中间层</td>
        <td>
          <el-input disabled v-model="form.middleFloor"></el-input>
        </td>
        <td>是否带电梯</td>
        <td>
          <el-select style="width: 100%;" v-model="form.elevator" placeholder disabled>
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
          <el-select style="width:100%" v-model="form.lotCoefficient" disabled>
            <el-option
              v-for="(item, index) in locationType"
              :label="item.name"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
        </td>
        <td>建筑结构</td>
        <td>
          <el-select style="width: 100%;" v-model="form.construction" disabled>
            <el-option
              v-for="(item,index) in constructionData"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>建筑基础</td>
        <td>
          <el-select style="width: 100%;" v-model="form.buildBasic" disabled>
            <el-option
              v-for="(item,index) in buildBasicData"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
        <td>建筑面积</td>
        <td style="position:relative">
          <el-input v-model="form.coveredArea" disabled></el-input>
          <span style="position:absolute;top:2px;right:5px;">m²</span>
        </td>
      </tr>
      <tr>
        <td>基底面积</td>
        <td style="position:relative">
          <el-input v-model="form.baseArea" disabled></el-input>
          <span style="position:absolute;top:2px;right:5px;">m²</span>
        </td>
        <td>底层用途</td>
        <td>
          <el-select style="width:100%" v-model="form.groundFloorUse" disabled>
            <el-option
              v-for="(item, index) in groundFloorType"
              :label="item.name"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>开工时间</td>
        <td>
          <el-date-picker class="w100" type="date" v-model="form.startConstructionTime" disabled></el-date-picker>
        </td>
        <td>竣工时间</td>
        <td>
          <el-date-picker class="w100" type="date" v-model="form.finishConstructionTime" disabled></el-date-picker>
        </td>
      </tr>
      <tr>
        <td>交付使用时间</td>
        <td colspan="3">
          <el-date-picker class="w100" type="date" v-model="form.deliveryTime" disabled></el-date-picker>
        </td>
       
      </tr>
      <tr>
        <td>电梯个数</td>
        <td><el-input size="mini" v-model="form.countElevator" disabled clearable></el-input></td>
        <td>每层户数</td>
        <td><el-input size="mini" v-model="form.countFloor" disabled clearable></el-input></td>
      </tr>
      <tr>
        <td>栋详细说明</td>
        <td colspan="3">
          <el-input disabled v-model="form.remark"></el-input>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/api/house.js";
import api from "@/api/houseApproval";
export default {
  name: "buildingDetails",
  data() {
    return {
      options: [{ value: true, label: "是" }, { value: false, label: "否" }],
      form: {}, //表格数据
      maintenanceUnit: [], //数据维护权归属
      buildPurposeData: [], //栋用途
      constructionData: [], //建筑结构
      locationType: [], //地段标准
      buildBasicData: [], //建筑基础
      groundFloorType: [] //底层用途
    };
  },
  filters: {
    timeFormat: function(dateParms) {
      // 对传入的时间参数进行判断
      if (typeof dateParms != "undefined") {
        var datetime = dateParms;
        //判断是否为字符串
        if (typeof dateParms == "string" && dateParms.constructor == String) {
          //将字符串日期转换为日期格式
          var datetime = new Date(Date.parse(dateParms.replace(/-/g, "/")));
        }

        //获取年月日时分秒
        var year = datetime.getFullYear();
        var month = datetime.getMonth() + 1;
        var date = datetime.getDate();
        var hour = datetime.getHours();
        var minutes = datetime.getMinutes();
        var second = datetime.getSeconds();

        //月，日，时，分，秒 小于10时，补0
        if (month < 10) {
          month = "0" + month;
        }
        if (date < 10) {
          date = "0" + date;
        }
        if (hour < 10) {
          hour = "0" + hour;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (second < 10) {
          second = "0" + second;
        }

        //拼接日期格式【例如：yyyymmdd】
        var resultdate = year + "-" + month + "-" + date;
        return resultdate;
      }
    }
  },
  computed: {
    ...mapGetters(["getBuildingGuid"])
  },
  methods: {
    //定位
    location(){
        this.$route.query.serialNo = this.form.serialNo;
        this.goMapInfo();
    },
    //跳转到地图服务
    goMapInfo(){
      let tab = {
        id:"MapInfo",
        label:"地图信息",
        closable: true,
        component: () =>
              import("@/components/MapInfo")
      };
      this.$parent.openTab(tab);
    },
    //获取栋详情
    getBuildingInfo() {
      let params = {
        guid: this.$parent.meta.fangGuid
      };
      http
        .getBuildingInfo(params)
        .then(res => {
          this.form = res;
          console.log("===", this.form);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取字典数据
    getDictionary() {
      let nameData = [
        "数据维护权归属",
        "住宅类型",
        "建筑结构",
        "地段标准",
        "建筑基础",
        "底层用途"
      ];
      let params = { names: nameData.toString() };
      api
        .searchDictionary(params)
        .then(res => {
          res = JSON.parse(res);
          this.maintenanceUnit = res.数据维护权归属;
          this.buildPurposeData = res.住宅类型;
          this.constructionData = res.建筑结构;
          this.locationType = res.地段标准;
          this.buildBasicData = res.建筑基础;
          this.groundFloorType = res.底层用途;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getDictionary();
    this.getBuildingInfo();
  }
};
</script>

<style lang="scss" scoped>
</style>
