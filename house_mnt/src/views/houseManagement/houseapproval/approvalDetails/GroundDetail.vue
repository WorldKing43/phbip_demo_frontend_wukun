<!--房源信息详情-->
<template>
  <div class="housingDetails">
    <div class="tableStyle">
      <div style="text-align:right;margin-top:10px;">
        <el-button
          type="primary"
          size="mini"
          :disabled="!(this.$parent.params.activityName == '资产运维部初审')||this.$route.query.itemName == '原有小区入库'"
          v-if="((this.$parent.meta.state=='new')&&!(this.$parent.meta.state=='done'))"
          @click="save"
        >保存</el-button>
        <el-button
          type="primary"
          size="mini"
          :disabled="!(this.$parent.params.activityName == '资产运维部初审')"
          v-if="((this.$parent.meta.state=='edit'&&!(this.$parent.meta.state=='done')))"
          @click="saveInfo"
        >保存</el-button>
      </div>
      <div>
        <table>
          <tr>
            <td class="must">小区编号</td>
            <td>
              <el-input v-model="districtCode" disabled></el-input>
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
            <td style="position:relative;line-height:2rem">
              <el-input v-model="landArea" :disabled="edit"></el-input>
            </td>
            <td class="must">土地用途</td>
            <td>
              <el-input v-model="form.landUsed" :disabled="edit"></el-input>
            </td>
          </tr>
          <tr>
            <td class="must">使用期始</td>
            <td>
              <el-date-picker
                v-model="form.useStart"
                type="date"
                :disabled="edit"
                placeholder="选择日期"
                class="w100"
              ></el-date-picker>
            </td>
            <td class="must">使用期止</td>
            <td>
              <el-date-picker
                v-model="form.useEnd"
                type="date"
                :disabled="edit"
                placeholder="选择日期"
                class="w100"
              ></el-date-picker>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/api/houseApproval";
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
        remark: ""
      }, //宗地详情的表单
      districtGuid: "", //小区的guid
      areaData: [], //所属区
      landArea: "", //面积
      typeData: [], //户型
      terraceData: [], //平台
      sourceData: [], //房屋来源
      functionData: [], //房屋用途
      divisionUnit: [], //分配权归属单位下拉框
      signingUnit: [], //签约权归属单位下拉框
      maintenanceUnit: [], //数据维护权归属单位下拉框
      operations: [], //运维权归属单位下拉框
      options: [
        { value: true, label: "是" },
        { value: false, label: "否" }
      ], //是否下拉菜单
      edit: true //表示是否可编辑
    };
  },
  methods: {
    //获取小区编号
    getCode() {
      let params = {
        districtGuid: this.districtGuid
      };
      api
        .getCode(params)
        .then(res => {
          this.districtCode = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //修改宗地信息
    saveInfo() {
      this.landArea = this.landArea.split("平方米");
      this.landArea = this.landArea[0];
      this.form.landArea = this.landArea;
      if (!this.districtCode) {
        this.$alert("无法保存信息，请填写小区编号", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.form.landNo) {
        this.$alert("无法保存信息，请填写宗地号", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.form.contractNo) {
        this.$alert("无法保存信息，请填写土地合同号", "提示", {
          confirmButtonText: "确定"
        });
      } else if (this.form.landArea == null) {
        this.$alert("无法保存信息，请填写土地面积", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.form.landUsed) {
        this.$alert("无法保存信息，请填写土地用途", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.form.useStart) {
        this.$alert("无法保存信息，请填写使用期始", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.form.useEnd) {
        this.$alert("无法保存信息，请填写使用期止", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.form.area) {
        this.$alert("无法保存信息，请填写所在区", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.form.roadName) {
        this.$alert("无法保存信息，请填写路名", "提示", {
          confirmButtonText: "确定"
        });
      } else {
        this.$confirm("此操作将进行保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let params = {
              landGuid: this.$parent.meta.landGuid,
              operate: "edit"
            };
            let data = this.form;
            api
              .editLand(params, data)
              .then(res => {
                if (res) {
                  this.$message({
                    type: "success",
                    message: "保存成功!"
                  });
                  this.landArea = "";
                  this.checkDetail();
                  this.Event.$emit("GroundInformation", "searchGroundInfo");
                  this.Event.$emit(
                    "CommunityInformation",
                    "getNeighbourhoodDetail"
                  );
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
      }
    },
    //保存宗地信息
    save() {
      this.landArea = this.landArea.split("平方米");
      this.landArea = this.landArea[0];
      this.form.landArea = this.landArea;
      if (!this.districtCode) {
        this.$alert("无法保存信息，请填写小区编号", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.form.landNo) {
        this.$alert("无法保存信息，请填写宗地号", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.form.contractNo) {
        this.$alert("无法保存信息，请填写土地合同号", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.form.landArea) {
        this.$alert("无法保存信息，请填写土地面积", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.form.landUsed) {
        this.$alert("无法保存信息，请填写土地用途", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.form.useStart) {
        this.$alert("无法保存信息，请填写使用期始", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.form.useEnd) {
        this.$alert("无法保存信息，请填写使用期止", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.form.area) {
        this.$alert("无法保存信息，请填写所在区", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.form.roadName) {
        this.$alert("无法保存信息，请填写路名", "提示", {
          confirmButtonText: "确定"
        });
      } else {
        this.$confirm("此操作将进行保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let params = {
              districtGuid: this.districtGuid
            };
            let data = this.form;
            api
              .addland(params, data)
              .then(res => {
                if (res) {
                  this.$message({
                    type: "success",
                    message: "保存成功!"
                  });
                  this.landArea = "";
                  this.$parent.close();
                  let val = {};
                  val.name = res.landNo;
                  val.state = "check";
                  val.guid = res.guid;
                  this.openDetail(val);
                  this.Event.$emit("GroundInformation", "searchGroundInfo");
                  this.Event.$emit(
                    "CommunityInformation",
                    "getNeighbourhoodDetail"
                  );
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
      }
    },
    //打开一个页签
    openDetail(val) {
      this.$parent.openTab({
        id: val.guid,
        label: val.name || "宗地详情",
        closable: true,
        meta: {
          landGuid: val.guid,
          state: val.state,
          menuId: this.$parent.meta.menuId
        },
        component: () =>
          import(
            "@/views/houseManagement/houseapproval/approvalDetails/GroundDetail"
          )
      });
    },
    //获取字典数据
    getDictionary() {
      let nameData = ["所属区"];
      let params = { names: nameData.toString() };
      api
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
        landGuid: this.$parent.meta.landGuid
      };
      let data = {};
      api
        .editLand(params, data)
        .then(res => {
          if (res) {
            this.form = res;
            this.landArea = this.form.landArea + "平方米";
            this.getCode();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getDictionary(); //调取字典
    this.districtGuid = this.$parent.params.districtGuid;
    if (this.districtGuid) {
      if (this.$parent.meta.state == "new") {
        this.edit = false;
        this.getCode();
      } else if (this.$parent.meta.state == "check") {
        this.edit = true;
        this.checkDetail();
      } else if (
        this.$parent.meta.state == "edit" &&
        this.$parent.params.activityName == "资产运维部初审" &&
        this.$route.query.itemName != "原有小区入库"
      ) {
        this.edit = false;
        this.checkDetail();
      } else {
        this.edit = true;
        this.checkDetail();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// .housingDetails {
//   table {
//     width: 100%;
//     margin: 20px auto;
//     border: 1px solid #dde5f9;
//     border-collapse: collapse;
//     text-align: center;
//     .must::after {
//       content: "*";
//       color: #f56c6c;
//       margin-left: 4px;
//     }
//     tr {
//       border: 1px solid #dde5f9;
//     }
//     td {
//       border: 1px solid #dde5f9;
//       font-size: 14px;
//       height: 2rem;
//       width: 8rem;
//       color: #666;
//     }
//     td:nth-child(odd) {
//       width: 11%;
//       background: aliceblue;
//       color: #000;
//     }
//     & /deep/ .el-input__inner {
//       border: none;
//       text-align: center;
//     }
//   }
//   & /deep/ .el-input.is-disabled .el-input__inner {
//     background-color: #fff;
//     text-align: center;
//   }
// }
</style>
