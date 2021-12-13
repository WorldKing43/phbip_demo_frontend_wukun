<!--配套设施详情 -->
<template>
  <div id="supporting-details">
    <div class="tableStyle">
      <table>
        <tr>
          <td>小区名称</td>
          <td>{{form.districtName}}</td>
          <td>栋名称</td>
          <td>{{form.buildingName}}</td>
        </tr>
        <tr>
          <td>上报部门</td>
          <td>{{form.reportDept}}</td>
          <td>配套设施类型</td>
          <td>{{form.facilityType}}</td>
        </tr>
        <tr>
          <td>配套设施数量</td>
          <td>{{form.facilityCount}}</td>
          <td>配套设施面积</td>
          <td>{{form.facilityArea}}</td>
        </tr>
        <tr>
          <td>配套设施每层数量</td>
          <td>{{form.facilityCountFloor}}</td>
          <td>配套设施每层面积</td>
          <td>{{form.facilityAreaFloor}}</td>
        </tr>
        <tr>
          <td>使用情况</td>
          <td>{{form.usedCase}}</td>
          <td>使用单位</td>
          <td>{{form.usedUnit}}</td>
        </tr>
        <tr>
          <td>金额</td>
          <td>{{form.price}}</td>
          <td>财政拨款金额</td>
          <td>{{form.appropriationAmount}}</td>
        </tr>
        <tr>
          <td>财政拨款尚欠金额</td>
          <td>{{form.oweAmount}}</td>
          <td>设施编号</td>
          <td>{{form.facilityNo}}</td>
        </tr>
        <tr>
          <td>设施名称</td>
          <td>{{form.assortFacilityName}}</td>
          <td>设施来源</td>
          <td>{{form.facilityOrigin}}</td>
        </tr>
        <tr>
          <td>归属</td>
          <td>{{form.belong}}</td>
          <td>租售单位</td>
          <td>{{form.rentalUnit}}</td>
        </tr>
        <tr>
          <td>物业类型</td>
          <td>{{form.propertyCompanyType}}</td>
          <td>基金性质</td>
          <td>{{form.fundNature}}</td>
        </tr>
        <tr>
          <td>室内车位数量</td>
          <td>{{form.indoorPackingCount}}</td>
          <td>室外车位数量</td>
          <td>{{form.outdoorPackingCount}}</td>
        </tr>
        <tr>
          <td>说明</td>
          <td colspan="3">{{form.explain}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import http from "@/api/house.js";
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
      }
    };
  },
  methods: {
    query() {
      let params = {
        supportDeviceGuid: this.$parent.meta.guid
      };
      http
        .getSupportDeviceInfo(params)
        .then(res => {
          this.form = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.query();
  }
};
</script>
<style lang="scss" scoped>
</style>

