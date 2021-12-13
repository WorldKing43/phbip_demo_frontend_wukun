<!--小区信息-->
<template>
  <div class="neighbourhoodInfo tableStyle">
    <table>
      <tr>
        <td>小区编号</td>
        <td>
          <el-input disabled v-model="form.code"></el-input>
        </td>
        <td>小区名称</td>
        <td>
          <el-input disabled v-model="form.name"></el-input>
        </td>
      </tr>
      <tr>
        <td>曾用小区名称</td>
        <td>
          <el-input disabled v-model="form.usedName"></el-input>
        </td>
        <td>所在区</td>
        <td>
          <el-select
            style="width: 100%"
            v-model="form.area"
            placeholder
            disabled
          >
            <el-option
              v-for="item in areaDataType"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>所在街道</td>
        <td>
          <el-input disabled v-model="form.street"></el-input>
        </td>
        <td>路(门牌号)</td>
        <td>
          <el-input disabled v-model="form.roadName"></el-input>
        </td>
      </tr>
      <tr>
        <td>地址</td>
        <td colspan="3">
          <el-input disabled v-model="form.address"></el-input>
        </td>
      </tr>
      <tr>
        <td>用地面积</td>
        <td style="position: relative">
          <el-input disabled v-model="form.landArea"></el-input>
          <span style="position: absolute; top: 2px; right: 3px">m²</span>
        </td>
        <td>总建筑面积</td>
        <td style="position: relative">
          <el-input disabled v-model="form.totalCoveredArea"></el-input>
          <span style="position: absolute; top: 2px; right: 3px">m²</span>
        </td>
      </tr>
      <tr>
        <td>容积率</td>
        <td>
          <el-input disabled v-model="form.volumeRatio"></el-input>
        </td>
        <td>开工时间</td>
        <td>
          <el-date-picker
            class="w100"
            type="date"
            v-model="form.startConstructionTime"
            disabled
          ></el-date-picker>
        </td>
      </tr>
      <tr>
        <td>竣工时间</td>
        <td>
          <el-date-picker
            class="w100"
            type="date"
            v-model="form.finishConstructionTime"
            disabled
          ></el-date-picker>
        </td>
        <td>交付使用时间</td>
        <td>
          <el-date-picker
            class="w100"
            type="date"
            v-model="form.deliveryTime"
            disabled
          ></el-date-picker>
        </td>
      </tr>
      <tr>
        <td>开发商</td>
        <td>
          <el-input disabled v-model="form.developer"></el-input>
        </td>
        <td>设计单位</td>
        <td>
          <el-input disabled v-model="form.designOrgnation"></el-input>
        </td>
      </tr>
      <tr>
        <td>是否自管</td>
        <td>
          <el-select
            style="width: 100%"
            v-model="form.selfSupervise"
            placeholder
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
        <td>是否自建</td>
        <td>
          <el-select
            style="width: 100%"
            v-model="form.selfBuilt"
            placeholder
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
      <tr>
        <td>是否代售</td>
        <td>
          <el-select
            style="width: 100%"
            v-model="form.helpSale"
            placeholder
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
        <td>数据维护归属</td>
        <td>
          <el-select
            style="width: 100%"
            v-model="form.districtMaintainBelong"
            placeholder
            disabled
          >
            <el-option
              v-for="item in belongAreaType"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>装修标准</td>
        <td>
          <el-select
            style="width: 100%"
            v-model="form.decorationStandard"
            placeholder
            disabled
          >
            <el-option
              v-for="item in decorationStandardType"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
        <td>小区详情说明</td>
        <td>
          <el-input disabled v-model="form.remark"></el-input>
        </td>
      </tr>
    </table>
    <publicTitle title="装修标准"></publicTitle>
    <el-table
      :data="tableData"
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
      <el-table-column prop="renovationCode" label="装修标准"></el-table-column>
      <el-table-column
        prop="renovationDescription"
        label="装修标准说明"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/api/house.js";
import api from "@/api/housestore.js";
import { mapMutations } from "vuex";
import publicTitle from "@/components/TitleStylex"; //标题组件
export default {
  name: "neighbourhoodInfo",
  components: {
    publicTitle, //标题公共组件
  },
  data() {
    return {
      form: {},
      options: [
        { value: true, label: "是" },
        { value: false, label: "否" },
      ], //是否自管，是否自建下拉菜单
      guid: "",
      areaDataType: [], //所在区
      belongAreaType: [], //数据维护归属
      decorationStandardType: [], //装修标准
      tableData: [],
    };
  },
  computed: {
    // ...mapGetters(["getHousingStockGuid"]),
    activeIndex: {
      get() {
        return this.$store.state.activeIndex;
      },
      set(val) {
        this.$store.commit("set_active_index", val);
      },
    },
    activeIndex1: {
      get() {
        return this.$store.state.activeIndex1;
      },
      set(val) {
        this.$store.commit("set_active_index1", val);
      },
    },
  },
  filters: {
    timeFormat: function (dateParms) {
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
    },
  },
  methods: {
    //获取装修列表
    getRenovationList() {
      let params = {
        districtGuid: this.$parent.params.guid,
      };
      http
        .getRenovationList(params)
        .then((res) => {
          console.log(res);
          this.tableData = res;
        })
        .catch((err) => {
          consoel.log(err);
        });
    },
    //获取小区详情信息
    getNeighbourhoodDetail() {
      let params = {
        guid: this.$parent.params.guid,
      };
      http
        .getNeighbourhoodInfo(params)
        .then((res) => {
          this.form = res;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取字典
    getDictionary() {
      let namesArr = ["数据维护权归属", "装修标准", "所属区"];
      let params = {
        names: namesArr.toString(),
      };
      api
        .getDictionary(params)
        .then((res) => {
          this.belongAreaType = JSON.parse(res).数据维护权归属;
          this.decorationStandardType = JSON.parse(res).装修标准;
          this.areaDataType = JSON.parse(res).所属区;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.guid = this.$parent.params.guid = this.$route.params.guid; //guid赋值
    this.getNeighbourhoodDetail();
    this.getDictionary();
    this.getRenovationList();
  },
};
</script>

<style lang="scss" scoped>
</style>
