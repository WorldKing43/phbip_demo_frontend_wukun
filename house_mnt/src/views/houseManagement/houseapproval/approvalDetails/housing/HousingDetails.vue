<!--房源信息详情-->
<template>
  <div class="housingDetails tableStyle">
    <div style="text-align:right;margin-top:10px;">
      <el-button
        type="primary"
        size="mini"
        @click="save"
        :disabled="!(this.$parent.params.activityName == '资产运维部初审')"
        v-if="!(this.$route.params.state == 'done') && hasPerm('fygl_rksp_fyxx_bc')"
      >保存</el-button>
    </div>
    <div>
      <publicTitle title="房源基本信息"></publicTitle>
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
          <td>栋号</td>
          <td>
            <el-input v-model="form.buildNo" disabled></el-input>
          </td>
          <td>栋名称</td>
          <td>
            <el-input v-model="form.buildName" disabled></el-input>
          </td>
        </tr>
        <tr>
          <td>房号</td>
          <td>
            <el-input v-model="form.houseNo" :disabled="edit"></el-input>
          </td>
          <td>网格办编码</td>
          <td style="position:relative">
            <el-input v-model="form.serialNo" :disabled="edit"></el-input>
            <!-- <el-button type="primary" size="mini" @click="location" style="position:absolute;top:7px;right:5px;" v-if="hasPerm('fygl_rksp_fyxx_dw')">定位</el-button> -->
          </td>
        </tr>
        <tr>
          <td>所在单元</td>
          <td>
            <el-input v-model="form.unit" :disabled="edit"></el-input>
          </td>
          <td>所在楼层</td>
          <td>
            <el-input v-model="form.floorNo" :disabled="edit"></el-input>
          </td>
        </tr>
        <tr>
          <td>房屋来源</td>
          <td>
            <el-select style="width: 100%;" v-model="form.source" :disabled="edit">
              <el-option
                v-for="(item, index) in sourceData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
          <td>房屋用途</td>
          <td>
            <el-select style="width: 100%;" v-model="form.function" :disabled="edit">
              <el-option
                v-for="(item, index) in functionData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>户型</td>
          <td>
            <el-select style="width: 100%;" v-model="form.houseLayout" :disabled="edit">
              <el-option
                v-for="(item, index) in typeData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
          <td>朝向</td>
          <td>
            <el-select
              style="width: 100%;"
              v-model="form.orientation"
              :disabled="edit"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in orientationData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>平台</td>
          <td>
            <el-select
              style="width: 100%;"
              v-model="form.terrace"
              :disabled="edit"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in terraceData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
          <td>是否架空层</td>
          <td>
            <el-select style="width: 100%;" v-model="form.innerFloor" :disabled="edit" placeholder>
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
          <td>(预测绘)建筑面积</td>
          <td>
            <el-input v-model="form.coveredArea" :disabled="edit"></el-input>
          </td>
          <td>(预测绘)套内面积</td>
          <td>
            <el-input v-model="form.indoorArea" :disabled="edit"></el-input>
          </td>
        </tr>
        <tr>
          <td>(预测绘)分摊面积</td>
          <td>
            <el-input v-model="form.residentialPoolArea" :disabled="edit"></el-input>
          </td>
          <td>竣工分摊面积</td>
          <td>
            <el-input v-model="form.completionShareArea" :disabled="edit"></el-input>
          </td>
        </tr>
        <tr>
          <td>竣工套内面积</td>
          <td>
            <el-input v-model="form.completionIndoorArea" :disabled="edit"></el-input>
          </td>
          <td>竣工建筑面积</td>
          <td>
            <el-input v-model="form.completionArea" :disabled="edit"></el-input>
          </td>
        </tr>
        <tr>
          <td>分摊面积说明</td>
          <td colspan="3">
            <el-input v-model="form.residentialAreaContent" :disabled="edit"></el-input>
          </td>
        </tr>
        <tr>
          <td>开工时间</td>
          <td>
            <el-date-picker
              type="date"
              v-model="form.startConstructionTime"
              :disabled="edit"
              clearable
              style="width:100%"
            ></el-date-picker>
          </td>
          <td>竣工时间</td>
          <td>
            <el-date-picker
              type="date"
              v-model="form.finishConstructionTime"
              :disabled="edit"
              clearable
              style="width:100%"
            ></el-date-picker>
          </td>
        </tr>
        <tr>
          <td>交付使用时间</td>
          <td>
            <el-date-picker
              type="date"
              v-model="form.deliveryTime"
              :disabled="edit"
              clearable
              style="width:100%"
            ></el-date-picker>
          </td>
          <td>装修标准</td>
          <td>
            <el-select
              style="width: 100%;"
              v-model="form.decorationType"
              placeholder
              :disabled="edit"
              @change="changeDecorationType"
              clearable
            >
              <el-option
                v-for="(item,index) in DistrictRenovationList"
                :key="index"
                :label="item.renovationCode"
                :value="item.renovationCode"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>装修标准说明</td>
          <td colspan="3">
            <el-tooltip class="item" effect="dark" content="此处利用鼠标可拖动" placement="right-end">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="form.decorationTypeDescription"
                disabled
              ></el-input>
            </el-tooltip>
            <!-- <el-select
              style="width: 100%;"
              v-model="form.decorationTypeDescription"
              placeholder
              clearable
              :disabled="edit"
              @change="changeDecorationTypeDescription"
            >
              <el-option
                v-for="(item,index) in DistrictRenovationList"
                :key="index"
                :label="item.renovationDescription"
                :value="item.renovationDescription"
              ></el-option>
            </el-select>-->
          </td>
        </tr>
        <tr>
          <td>是否样板房</td>
          <td>
            <el-select style="width: 100%;" v-model="form.modelHouses" placeholder :disabled="edit">
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
            <el-select style="width: 100%;" v-model="form.helpSell" placeholder :disabled="edit">
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
          <td>初始房源性质</td>
          <td>
            <el-select style="width:100%" v-model="form.startNature" disabled>
              <el-option
                v-for="(item, index) in houseType"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </td>
          <td>当前房源性质</td>
          <td>
            <el-select style="width:100%" v-model="form.changeAfterNature" disabled>
              <el-option
                v-for="(item, index) in houseType"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>初始产权归属</td>
          <td>
            <el-input v-model="form.propertypBelongName" disabled></el-input>
          </td>
          <td>当前产权归属</td>
          <td>
            <el-input v-model="form.propertyUnit" disabled></el-input>
          </td>
        </tr>
        <tr>
          <td>备注</td>
          <td colspan="3">
            <el-input type="textarea" v-model="form.specification" :disabled="edit"></el-input>
          </td>
        </tr>
      </table>
      <publicTitle title="房源使用权信息"></publicTitle>
      <table>
        <tr>
          <td>初始分配权归属</td>
          <td>
            <el-select style="width:100%" v-model="form.initialAllocationRight" disabled>
              <el-option
                v-for="(item, index) in divisionUnit"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </td>
          <td>当前分配权归属</td>
          <td>
            <el-select style="width:100%" v-model="form.allocationRight" disabled>
              <el-option
                v-for="(item, index) in divisionUnit"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>初始签约权归属</td>
          <td>
            <el-select style="width:100%" v-model="form.initialSignatoryRight" disabled>
              <el-option
                v-for="(item, index) in signingUnit"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </td>
          <td>当前签约权归属</td>
          <td>
            <el-select style="width:100%" v-model="form.signatoryRight" disabled>
              <el-option
                v-for="(item, index) in signingUnit"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>初始数据维护权归属</td>
          <td>
            <el-select style="width:100%" v-model="form.initialMaintainRight" disabled>
              <el-option
                v-for="(item, index) in maintenanceUnit"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </td>
          <td>当前数据维护权归属</td>
          <td>
            <el-select style="width:100%" v-model="form.maintainRight" disabled>
              <el-option
                v-for="(item, index) in maintenanceUnit"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>初始运维权归属</td>
          <td>
            <el-select style="width:100%" v-model="form.initialOperationalRight" disabled>
              <el-option
                v-for="(item, index) in operations"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </td>
          <td>当前运维权归属</td>
          <td>
            <el-select style="width:100%" v-model="form.operationalRight" disabled>
              <el-option
                v-for="(item, index) in operations"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/api/houseApproval";
import publicTitle from "@/components/TitleStyle"; //标题组件
export default {
  name: "housingDetails",
  components: {
    publicTitle //标题公共组件
  },
  data() {
    return {
      form: {},
      typeData: [], //户型
      orientationData: [], //朝向
      terraceData: [], //平台
      houseType: [], //房屋性质
      sourceData: [], //房屋来源
      functionData: [], //房屋用途
      divisionUnit: [], //分配权归属单位下拉框
      signingUnit: [], //签约权归属单位下拉框
      maintenanceUnit: [], //数据维护权归属单位下拉框
      operations: [], //运维权归属单位下拉框
      DistrictRenovationList: [], //装修列表
      options: [
        { value: true, label: "是" },
        { value: false, label: "否" }
      ], //是否下拉菜单
      edit: true //表示是否可编辑
    };
  },
  methods: {
    //入库审批-获取小区装修标准信息
    getDistrictRenovationList() {
      let params = {
        districtGuid: this.$parent.params.districtGuid
      };
      api
        .getDistrictRenovationList(params)
        .then(res => {
          this.DistrictRenovationList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存房屋详情
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
            .edithouse(params, data)
            .then(res => {
              if (res) {
                this.getHousingInformation();
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
        "运维权归属"
      ];
      let params = { names: nameData.toString() };
      api
        .searchDictionary(params)
        .then(res => {
          res = JSON.parse(res);
          this.typeData = res.户型;
          this.orientationData = this.$dictionaryChange(
            res.朝向,
            this.orientationData,
            "通用"
          );
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
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取房屋信息
    getHousingInformation() {
      let _params = {
        guid: this.$parent.meta.houseGuid,
        reportGuid: this.$route.query.guid
      };
      api
        .getHouseDetails(_params)
        .then(res => {
          this.form = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //改变装修类型
    changeDecorationType() {
      if (this.DistrictRenovationList) {
        for (var i = 0; i < this.DistrictRenovationList.length; i++) {
          if (
            this.DistrictRenovationList[i].renovationCode ==
            this.form.decorationType
          ) {
            this.form.decorationTypeDescription = this.DistrictRenovationList[
              i
            ].renovationDescription;
            break;
          } else {
            this.form.decorationTypeDescription = "";
          }
        }
      }
    },
    //改变装修标准说明
    changeDecorationTypeDescription() {
      if (this.DistrictRenovationList) {
        for (var i = 0; i < this.DistrictRenovationList.length; i++) {
          if (
            this.form.decorationTypeDescription ==
            this.DistrictRenovationList[i].renovationDescription
          ) {
            this.form.decorationType = this.DistrictRenovationList[
              i
            ].renovationCode;
            break;
          } else {
            this.form.decorationType = "";
          }
        }
      }
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
    this.getDictionary(); //调取字典
    this.getHousingInformation(); //获取房源详情信息
    this.getDistrictRenovationList();
    //获取当前环节
    if (
      this.$parent.params.activityName == "资产运维部初审" &&
      this.$route.params.state == "todo" &&
      this.$route.query.itemName != "原有小区入库"
    ) {
      this.edit = false;
    } else {
      this.edit = true;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
