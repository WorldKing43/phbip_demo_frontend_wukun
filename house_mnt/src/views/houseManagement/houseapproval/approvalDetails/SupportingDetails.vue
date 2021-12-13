<!--
 * @Description: 入库审批-配套设施详情
 * @Version: 1.0
 * @Autor: 
 * @Date: 2019-10-05
 * @LastEditors: 金雅蓓
 * @description:修改数据字典及样式
 -->
<template>
  <div id="supporting-details" class="tableStyle">
    <div style="text-align:right;margin-top:10px;margin-bottom:10px;">
      <el-button
        type="primary"
        size="mini"
        @click="save"
        :disabled="!(this.$parent.params.activityName == '资产运维部初审')"
        v-if="!(this.$route.params.state == 'done')&&hasPerm('fygl_rksp_ptssxx_bc')"
      >保存</el-button>
    </div>
    <table>
      <tr>
        <td>小区名称</td>
        <td>
          <el-input v-model="form.districtName" :disabled="edit"></el-input>
        </td>
        <td>栋名称</td>
        <td>
          <el-input v-model="form.buildingName" :disabled="edit"></el-input>
        </td>
      </tr>
      <tr>
        <td>上报部门</td>
        <td>
          <el-input v-model="form.reportDept" :disabled="edit"></el-input>
        </td>
        <td>配套设施类型</td>
        <td>
          <el-select v-model="form.facilityType" clearable :disabled="edit" style="width:100%">
            <el-option
              v-for="(item, index) in device"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>配套设施数量</td>
        <td>
          <el-input v-model="form.facilityCount" :disabled="edit"></el-input>
        </td>
        <td>配套设施面积</td>
        <td style="position:relative">
          <el-input v-model="form.facilityArea" :disabled="edit"></el-input>
          <span style="position:absolute;top:2px;right:3px;">平方米</span>
        </td>
      </tr>
      <tr>
        <td>配套设施每层数量</td>
        <td>
          <el-input v-model="form.facilityCountFloor" :disabled="edit"></el-input>
        </td>
        <td>配套设施每层面积</td>
        <td style="position:relative">
          <el-input v-model="form.facilityAreaFloor" :disabled="edit"></el-input>
          <span style="position:absolute;top:2px;right:3px;">平方米</span>
        </td>
      </tr>
      <tr>
        <td>使用情况</td>
        <td>
          <el-input v-model="form.usedCase" :disabled="edit"></el-input>
        </td>
        <td>使用单位</td>
        <td>
          <el-input v-model="form.usedUnit" :disabled="edit"></el-input>
        </td>
      </tr>
      <tr>
        <td>金额</td>
        <td style="position:relative">
          <el-input v-model="form.price" :disabled="edit"></el-input>
          <span style="position:absolute;top:2px;right:3px;">元</span>
        </td>
        <td>财政拨款金额</td>
        <td style="position:relative">
          <el-input v-model="form.appropriationAmount" :disabled="edit"></el-input>
          <span style="position:absolute;top:2px;right:3px;">元</span>
        </td>
      </tr>
      <tr>
        <td>财政拨款尚欠金额</td>
        <td style="position:relative">
          <el-input v-model="form.oweAmount" :disabled="edit"></el-input>
          <span style="position:absolute;top:2px;right:3px;">元</span>
        </td>
        <td>设施编号</td>
        <td>
          <el-input v-model="form.facilityNo" :disabled="edit"></el-input>
        </td>
      </tr>
      <tr>
        <td>设施名称</td>
        <td>
          <el-input v-model="form.assortFacilityName" :disabled="edit"></el-input>
        </td>
        <td>设施来源</td>
        <td>
          <el-select v-model="form.facilityOrigin" clearable style="width:100%" :disabled="edit">
            <el-option
              v-for="(item, index) in deviceSource"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>归属</td>
        <td>
          <el-select v-model="form.belong" style="width:100%" clearable :disabled="edit">
            <el-option
              v-for="(item, index) in belongArea"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
        <td>租售单位</td>
        <td>
          <el-input v-model="form.rentalUnit" :disabled="edit"></el-input>
        </td>
      </tr>
      <tr>
        <td>物业类型</td>
        <td>
          <el-select
            v-model="form.propertyCompanyType"
            style="width:100%"
            clearable
            :disabled="edit"
          >
            <el-option
              v-for="(item, index) in propertyCompanyTypeData"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
        <td>基金性质</td>
        <td>
          <el-select v-model="form.fundNature" style="width:100%" clearable :disabled="edit">
            <el-option
              v-for="(item, index) in fundNatureData"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>室内车位数量</td>
        <td>
          <el-input v-model="form.indoorPackingCount" :disabled="edit"></el-input>
        </td>
        <td>室外车位数量</td>
        <td>
          <el-input v-model="form.outdoorPackingCount" :disabled="edit"></el-input>
        </td>
      </tr>
      <tr>
        <td>说明</td>
        <td colspan="3">
          <el-input v-model="form.explain" :disabled="edit"></el-input>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import api from "@/api/houseApproval.js";
import { mapGetters } from "vuex";
export default {
  name: "supportingDetails",
  data() {
    return {
      form: {
        districtName: "",
        buildingName: "",
        reportDept: "",
        facilityOrigin: "",
        facilityCount: "",
        facilityArea: "",
        facilityCountFloor: "",
        facilityAreaFloor: "",
        usedCase: "",
        usedUnit: "",
        price: "",
        appropriationAmount: "",
        oweAmount: "",
        facilityNo: "",
        assortFacilityName: "",
        facilityOrigin: "",
        belong: "",
        rentalUnit: "",
        propertyCompanyType: "",
        fundNature: "",
        indoorPackingCount: "",
        outdoorPackingCount: "",
        explain: ""
      },
      edit: true, //表示是否可编辑
      device: [],
      belongArea: [],
      deviceSource: [],
      propertyCompanyTypeData: [], //物业类型
      fundNatureData: [] //基金性质
    };
  },
  methods: {
    //获取字典
    getDictionary() {
      let name = [
        "配套设施类型",
        "设施来源",
        "维护归属1",
        "物业类型",
        "基金性质"
      ];
      let params = {
        names: name.toString()
      };
      api
        .searchDictionary(params)
        .then(res => {
          this.device = JSON.parse(res).配套设施类型;
          this.deviceSource = JSON.parse(res).设施来源;
          this.belongArea = JSON.parse(res).维护归属1;
          this.propertyCompanyTypeData = JSON.parse(res).物业类型;
          this.fundNatureData = JSON.parse(res).基金性质;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存配套设施详情
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
            .editSupportDevice(params, data)
            .then(res => {
              if (res) {
                this.query();
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
    //查询详情
    query() {
      let params = {
        supportDeviceGuid: this.$parent.meta.sheshiGuid
      };
      api
        .supportingdetails(params)
        .then(res => {
          console.log(res);
          this.form = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    if (
      this.$parent.params.activityName == "资产运维部初审" &&
      this.$route.params.state == "todo" &&
      this.$route.query.itemName != "原有小区入库"
    ) {
      this.edit = false;
    } else {
      this.edit = true;
    }
    this.getDictionary();
    this.query();
  }
};
</script>
<style lang="scss" scoped>
</style>
