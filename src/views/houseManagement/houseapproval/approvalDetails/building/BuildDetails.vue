<!--栋详情-->
<template>
  <div class="buildDetails tableStyle">
    <div style="text-align:right;margin-top:10px;margin-bottom:10px;">
      <el-button
        type="primary"
        size="mini"
        @click="save"
        :disabled="!(this.$parent.params.activityName == '资产运维部初审')"
        v-if="!(this.$route.params.state == 'done') && hasPerm('fygl_rksp_dxx_bc')"
      >保存</el-button>
    </div>
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
        <td style="position:relative">
          <el-input v-model="form.serialNo" :disabled="edit"></el-input>
          <!-- <el-button type="primary" size="mini" @click="location" style="position:absolute;top:7px;right:5px;" v-if="hasPerm('fygl_rksp_dxx_dw')">定位</el-button> -->
        </td>
        <td>宗地号</td>
        <td>
          <el-select style="width: 100%;" v-model="form.landNo" disabled>
            <el-option v-for="(item, index) in landNoList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>栋号</td>
        <td>
          <el-input v-model="form.code" :disabled="edit"></el-input>
        </td>
        <td>栋名称</td>
        <td>
          <el-input v-model="form.name" :disabled="edit"></el-input>
        </td>
      </tr>
      <tr>
        <td>单元数</td>
        <td colspan="3">
          <el-input v-model="form.unitCount" :disabled="edit"></el-input>
        </td>
      </tr>
      <tr>
        <td>总楼层数</td>
        <td>
          <el-input v-model="form.floorCount" :disabled="edit"></el-input>
        </td>
        <td>裙楼层数</td>
        <td>
          <el-input v-model="form.skirtFloorCount" :disabled="edit"></el-input>
        </td>
      </tr>
      <tr>
        <td>地下层数</td>
        <td>
          <el-input v-model="form.subFloorCount" :disabled="edit"></el-input>
        </td>
        <td>指定中间层</td>
        <td>
          <el-input v-model="form.middleFloor" :disabled="edit"></el-input>
        </td>
      </tr>
      <tr>
        <td>是否带电梯</td>
        <td>
          <el-select style="width: 100%;" v-model="form.elevator" :disabled="edit" placeholder>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
        <td>地段标准</td>
        <td>
          <el-select style="width:100%" v-model="form.locationFix" :disabled="edit">
            <el-option
              v-for="(item, index) in locationType"
              :label="item.name"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>建筑结构</td>
        <td>
          <el-select style="width: 100%;" v-model="form.construction" :disabled="edit">
            <el-option
              v-for="(item, index) in constructionData"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
        <td>建筑基础</td>
        <td>
          <el-select style="width: 100%;" v-model="form.buildBasic" :disabled="edit">
            <el-option
              v-for="(item, index) in buildBasicData"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>建筑面积</td>
        <td style="position:relative">
          <el-input v-model="form.coveredArea" :disabled="edit"></el-input>
          <span style="position:absolute;top:2px;right:3px;">㎡</span>
        </td>
        <td>基底面积</td>
        <td style="position:relative">
          <el-input v-model="form.baseArea" :disabled="edit"></el-input>
          <span style="position:absolute;top:2px;right:3px;">㎡</span>
        </td>
      </tr>
      <tr>
        <td>底层用途</td>
        <td>
          <el-select style="width:100%" v-model="form.groundFloorUse" :disabled="edit">
            <el-option
              v-for="(item, index) in groundFloorType"
              :label="item.name"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
        </td>
        <td>开工时间</td>
        <td>
          <el-date-picker
            class="w100"
            type="date"
            v-model="form.startConstructionTime"
            :disabled="edit"
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
            :disabled="edit"
          ></el-date-picker>
        </td>
        <td>交付使用时间</td>
        <td>
          <el-date-picker class="w100" type="date" v-model="form.deliveryTime" :disabled="edit"></el-date-picker>
        </td>
      </tr>
      <tr>
        <td>电梯个数</td>
        <td>
          <el-input v-model="form.countElevator" :disabled="edit" clearable></el-input>
        </td>
        <td>每层户数</td>
        <td>
          <el-input v-model="form.countFloor"  :disabled="edit" clearable></el-input>
        </td>
      </tr>
      <tr>
        <td>数据维护归属</td>
        <td colspan="3">
          <el-select style="width: 100%;" v-model="form.buildingInfoMaintainBelong" disabled>
            <el-option
              v-for="(item, index) in maintenanceUnit"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>栋详细说明</td>
        <td colspan="3">
          <el-input v-model="form.remark" :disabled="edit"></el-input>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/api/houseApproval";
export default {
  name: "buildDetails",
  data() {
    return {
      form: {},
      maintenanceUnit: [], //数据维护权归属
      buildPurposeData: [], //栋用途
      constructionData: [], //建筑结构
      locationType: [], //地段标准
      buildBasicData: [], //建筑基础
      groundFloorType: [], //底层用途
      landNoList: [], //宗地号
      options: [
        { value: true, label: "是" },
        { value: false, label: "否" }
      ], //是否下拉菜单
      edit: true //是否可编辑
    };
  },
  methods: {
    //保存栋详情
    save() {
      this.$confirm("此操作将进行保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            reportGuid: this.$parent.params.reportGuid
          };
          let data = this.form;
          api
            .editBuilding(params, data)
            .then(res => {
              if (res) {
                this.getQueryBuilding();
                this.$message({
                  type: "success",
                  message: "保存成功!"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存"
          });
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
    },
    dateFormat(val) {
      if (val) {
        return val.split(" ")[0];
      }
    },
    getQueryBuilding() {
      let _params = {
        guid: this.$parent.meta.dongGuid,
        reportGuid: this.$route.query.guid
      };
      api
        .getBuildingDetails(_params)
        .then(res => {
          console.log(res);
          this.form = res;
          this.form.startConstructionTime = this.dateFormat(
            res.startConstructionTime
          );
          this.form.finishConstructionTime = this.dateFormat(
            res.finishConstructionTime
          );
          this.form.deliveryTime = this.dateFormat(res.deliveryTime);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取所有宗地信息
    getAllLand() {
      let params = {
        districtGuid: this.$parent.params.districtGuid
      };
      api
        .getAllLand(params)
        .then(res => {
          this.landNoList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
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
  },
  mounted() {
    this.getDictionary(); //获取字典
    this.getAllLand(); //获取所有宗地号
    if (
      this.$parent.params.activityName == "资产运维部初审" &&
      this.$route.params.state == "todo" &&
      this.$route.query.itemName != "原有小区入库"
    ) {
      this.edit = false;
    } else {
      this.edit = true;
    }
    this.getQueryBuilding();
  }
};
</script>

<style lang="scss" scoped>
</style>
