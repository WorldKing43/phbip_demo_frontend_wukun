<!--宗地详情-->
<template>
  <div class="housingDetails">
    <div>
      <table>
        <tr>
          <td class="must">小区编号</td>
          <td>
            <el-input v-model="form.districtCode" disabled></el-input>
          </td>
          <td class="must">宗地号</td>
          <td>
            <el-input v-model="form.landNo" :disabled="edit"></el-input>
          </td>
        </tr>
        <tr>
          <td class="must">土地合同号</td>
          <td>
            <el-input v-model="form.contractNo" :disabled="edit"></el-input>
          </td>
          <td>土地补充合同号</td>
          <td>
            <el-input v-model="form.contractNoAdded" :disabled="edit"></el-input>
          </td>
        </tr>
        <tr>
          <td class="must">土地面积</td>
          <td>
            <el-input v-model="form.landArea" :disabled="edit"></el-input>
          </td>
          <td class="must">土地用途</td>
          <td>
            <el-input v-model="form.landUsed" :disabled="edit"></el-input>
          </td>
        </tr>
        <tr>
          <td class="must">使用期始</td>
          <td>
            <el-date-picker v-model="form.useStart" type="date" :disabled="edit" placeholder="选择日期"></el-date-picker>
          </td>
          <td class="must">使用期止</td>
          <td>
            <el-date-picker v-model="form.useEnd" type="date" :disabled="edit" placeholder="选择日期"></el-date-picker>
          </td>
        </tr>
        <tr>
          <td class="must">所在区</td>
          <td>
            <el-select v-model="form.area" :disabled="edit" style="width:100%">
              <el-option
                v-for="(item,index) in areaData"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
          <td class="must">路名</td>
          <td>
            <el-input v-model="form.roadName" :disabled="edit"></el-input>
          </td>
        </tr>
        <tr>
          <td>说明</td>
          <td colspan="3">
            <el-input v-model="form.remark" :disabled="edit"></el-input>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/api/house";
import http from "@/api/houseApproval";
export default {
  name: "housingDetails",
  data() {
    return {
      districtCode: "",
      form: {
        landNo: "",
        contractNo: "",
        contractNoAdded: "",
        landArea: "",
        landUsed: "",
        useStart: "",
        useEnd: "",
        area: "",
        roadName: "",
        remark: "",
        districtCode: ""
      }, //宗地详情的表单
      districtGuid: "", //小区的guid
      areaData: [], //所属区
      typeData: [], //户型
      terraceData: [], //平台
      sourceData: [], //房屋来源
      functionData: [], //房屋用途
      divisionUnit: [], //分配权归属单位下拉框
      signingUnit: [], //签约权归属单位下拉框
      maintenanceUnit: [], //数据维护权归属单位下拉框
      operations: [], //运维权归属单位下拉框
      options: [{ value: true, label: "是" }, { value: false, label: "否" }], //是否下拉菜单
      edit: true //表示是否可编辑
    };
  },
  methods: {
    //获取小区编号
    // getCode() {
    //   let params = {
    //     districtGuid: this.districtGuid
    //   };
    //   api
    //     .getCode(params)
    //     .then(res => {
    //       this.districtCode = res;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    //获取字典数据
    getDictionary() {
      let nameData = ["所属区"];
      let params = { names: nameData.toString() };
      http
        .searchDictionary(params)
        .then(res => {
          this.areaData = JSON.parse(res).所属区;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查看详情
    checkDetail() {
      let params = {
        landNoGuid: this.$parent.meta.landGuid,
        districtGuid: this.$parent.params.guid
      };
      let data = {};
      api
        .getLandDetail(params, data)
        .then(res => {
          if (res) {
            this.form = res;
            // this.getCode();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getDictionary(); //调取字典
    this.edit = true;
    console.log("===", this.$parent.meta.state);
    if (this.$parent.meta.state == "check") {
      this.edit = true;
      this.checkDetail();
    }
  }
};
</script>

<style lang="scss" scoped>
.housingDetails {
  table {
    width: 100%;
    margin: 20px auto;
    border: 1px solid #dde5f9;
    border-collapse: collapse;
    text-align: center;
    tr {
      border: 1px solid #dde5f9;
    }
    td {
      border: 1px solid #dde5f9;
      font-size: 14px;
      height: 2rem;
      width: 8rem;
      color: #666;
    }
    td:nth-child(odd) {
      width: 11%;
      background: aliceblue;
      color: #000;
    }
    & /deep/ .el-input__inner {
      border: none;
      text-align: center;
    }
  }
  & /deep/ .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    text-align: center;
  }
}
</style>
