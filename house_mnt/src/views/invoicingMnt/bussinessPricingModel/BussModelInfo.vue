<!--
 * @Description:业务计价模型-计价模型信息
 * @Version: 1.0
 * @Autor: maxq
 * @Date: 2019-11-22 10: 40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 
-->
<template>
  <div id="buss-model-info">
    <title-stylex :title="firstTitle"></title-stylex>
    <div class="btnStyle">
      <el-button type="primary" size="mini" @click="save()">保存</el-button>
    </div>
    <el-form ref="form" :model="form" size="mini" label-width="6rem">
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="房价类型">
            <el-select v-model="dialogForm.type">
              <el-option
                v-for="(item, index) in housePricingList"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-form-item label="计价公式名称">
            <el-select v-model="dialogForm.formulaName" @change="selectFormulaName">
              <el-option
                v-for="(item, index) in formulaList"
                :label="item.formulaName"
                :value="item.guid"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="小区名称">
            <el-autocomplete
              class="inline-input"
              v-model="dialogForm.districtName"
              :fetch-suggestions="getDistrictList"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              popper-class="select-option"
              style="width:100%"
              @select="selectChange"
              clearable
            ></el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-form-item label="栋名称">
            <el-select
              v-model="dialogForm.buildingName"
              @change="changeBuilding(dialogForm.buildingName)"
              clearable
            >
              <el-input v-model="formItem.buildingName" clearable @input="searchBuilding()"></el-input>
              <el-option
                v-for="(item, index) in buildingListItem"
                :label="item.buildingName"
                :value="item.buildingGuid"
                :disabled="item.disabled"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="房源计划">
            <el-select
              v-model="dialogForm.housePlanNo"
              @change="changeHousePlanNo(dialogForm.housePlanNo)"
              clearable
            >
              <el-input v-model="formItem.housePlanNo" clearable @input="searchHousePlanNo()"></el-input>
              <el-option
                v-for="(item, index) in housePlanListItem"
                :label="item.housePlanNo"
                :value="item.housePlanGuid"
                :disabled="item.disabled"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-form-item label="房号">
            <el-select v-model="dialogForm.houseNo" @change="selectHouseNo" clearable>
              <el-input v-model="formItem.houseNo" clearable @input="searchHouseNoItem"></el-input>
              <el-option
                v-for="(item, index) in houseNoListItem"
                :label="item.houseNo"
                :value="item.houseGuid"
                :disabled="item.disabled"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import TitleStylex from "@/components/TitleStylex";
import http from "@/api/interface.js";
export default {
  name: "bussModelInfo",
  components: {
    TitleStylex
  },
  data() {
    return {
      firstTitle: "计价模型信息",
      districtGuid: "", //小区标识
      buildingGuid: "", //栋标识
      modelGuid: null, //计价模型标识
      houseGuid: "", //获取房号标识
      FormulaGuid: "", //获取公式名称标识
      housePlanGuid: "", //获取房源计划标识
      form: {
        housePriceType: "",
        formulaName: "",
        districtName: "",
        buildingName: "",
        houseNo: ""
      },
      formItem: {
        //表单里面收索框的信息
        houseNo: "",
        buildingName: "", //栋名称
        housePlanNo: "" //房源计划
      },
      openDialog: false, //弹框是否可见
      changeTitle: "", //弹框表头名称
      dialogForm: {
        typeName: "", //房价类型
        formulaName: "", //计价公式名称
        districtName: "", //小区名称
        buildingName: "", //栋名称
        housePlanNo: "", //房源计划
        houseNo: "" //房号
      }, //弹框表单数据
      housePricingList: [], //房价类型下拉框
      formulaList: [], //计价公式名称下拉框
      buildinglist: [], //栋名称下拉框
      buildingListItem: [], //栋名称下拉框部分数据
      housePlanList: [], //房源计划下拉框
      housePlanListItem: [], //房源计划下拉框部分数据
      houseNoList: [], //房号下拉框
      houseNoListItem: [] //房号部分下拉框
    };
  },
  methods: {
    //根据名称查询字典
    getDictionary() {
      let nameArr = ["计价房价类型"];
      let params = {
        names: nameArr.toString()
      };
      http.getDictionary(params).then(res => {
        res = JSON.parse(res);
        this.housePricingList = res.计价房价类型;
      });
    },
    //获取计价模型基本信息
    getModelInfo() {
      let params = {
        modelGuid: this.modelGuid
      };
      http
        .getModelInfo(params)
        .then(res => {
          this.districtGuid = res.districtGuid; //小区标识赋值
          this.buildingGuid = res.buildingGuid; //栋标识赋值
          this.housePlanGuid = res.housePlanGuid; //房源计划标识赋值
          this.formulaGuid = res.formulaGuid; //公式名称标识赋值
          this.houseGuid = res.houseGuid; //房标识赋值
          this.dialogForm = res; //表单赋值
          if (this.districtGuid && this.buildingGuid) {
            this.getModelBuilding(); //查询栋名称下拉框数据
            this.getModelHouseNo(); //查询房号下拉框数据
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    openDetails(row) {
      row = row || {};
      let tab = {
        label: row.formulaName || "新增",
        path: "/bussModelTab/" + (row.guid || "new")
      };
      this.openTopTab(tab);
    },
    //计价公式名称
    getModelList() {
      let params = {};
      http
        .getModelList(params)
        .then(res => {
          this.formulaList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //新增弹框-小区名称模糊查询
    getDistrictList(str, cb) {
      let params = {
        districtNameNo: this.dialogForm.districtName
      };
      http
        .searchDistrict(params)
        .then(res => {
          for (let i of res) {
            i.value = i.districtNameNo;
          }
          let arr = [];
          arr = res;
          if (arr.length === 0) {
            arr = [{ value: "暂无数据" }];
          }
          cb(arr);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //小区名称选择更改时
    selectChange(item) {
      this.districtGuid = item.districtGuid; //获取所选小区得小区标识
      this.dialogForm.buildingName = "";
      (this.dialogForm.houseNo = ""), this.getModelBuilding(); //获取栋名称下拉列表
    },
    //新增弹框-栋名称-下拉框
    getModelBuilding() {
      let params = {
        districtGuid: this.districtGuid
      };
      http
        .getModelBuilding(params)
        .then(res => {
          this.buildinglist = res;
          this.buildingListItem = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchBuilding() {
      this.buildingListItem = [];
      if (this.buildinglist.length != 0) {
        this.buildinglist.forEach(ele => {
          if (ele.buildingName.indexOf(this.formItem.buildingName) != -1) {
            this.buildingListItem.push(ele);
          }
        });
      }
      if (this.buildingListItem.length == 0) {
        this.dialogForm.buildingName = "";
        this.buildingGuid = "";
        this.buildingListItem.push({
          buildingName: "暂无数据",
          buildingGuid: "暂无数据",
          disabled: true
        });
      }
    },
    //栋名称选择更改时
    changeBuilding(val) {
      this.buildingGuid = val; //获取当前选择栋得guid
      this.dialogForm.houseNo = "";
      this.getModelHouseNo(); //查询房号下拉框数据
    },
    //新增弹框-房号-下拉框
    getModelHouseNo() {
      let params = {
        buildingGuid: this.buildingGuid
      };
      http
        .getModelHouseNo(params)
        .then(res => {
          this.houseNoList = res;
          this.houseNoListItem = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //房号查询部分数据
    searchHouseNoItem() {
      this.houseNoListItem = [];
      if (this.houseNoList.length != 0) {
        this.houseNoList.forEach(ele => {
          if (ele.houseNo.indexOf(this.formItem.houseNo) != -1) {
            this.houseNoListItem.push(ele);
          }
        });
      }
      if (this.houseNoListItem.length == 0) {
        this.dialogForm.houseNo = "";
        this.houseGuid = "";
        this.houseNoListItem.push({
          houseNo: "暂无数据",
          houseGuid: "暂无数据",
          disabled: true
        });
      }
    },
    //房号下拉选项修改时
    selectHouseNo(val) {
      this.houseGuid = val; //获取房标识
    },
    //新增弹框-房源计划-下拉框
    getHousePlanList() {
      let params = {};
      http
        .getHousePlanList(params)
        .then(res => {
          this.housePlanList = res;
          this.housePlanListItem = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查询房源计划
    searchHousePlanNo() {
      this.housePlanListItem = [];
      if (this.housePlanList.length != 0) {
        this.housePlanList.forEach(ele => {
          if (ele.housePlanNo.indexOf(this.formItem.housePlanNo) != -1) {
            this.housePlanListItem.push(ele);
          }
        });
      }
      if (this.housePlanListItem.length == 0) {
        this.dialogForm.housePlanNo = "";
        this.housePlanGuid = "";
        this.housePlanListItem.push({
          housePlanNo: "暂无数据",
          housePlanGuid: "暂无数据",
          disabled: true
        });
      }
    },
    //房源计划下拉选择修改时
    changeHousePlanNo(val) {
      this.housePlanGuid = val;
    },
    //计价公式下拉选项修改时
    selectFormulaName(val) {
      this.formulaGuid = val; //获取公式名称标识
    },
    //保存
    save() {
      this.$confirm("此操作将进行保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {};
          let data = {
            districtGuid: this.districtGuid, //小区标识
            buildingGuid: this.buildingGuid, //栋标识
            formulaGuid: this.formulaGuid, //计价公式guid
            houseGuid: this.houseGuid, //房标识
            housePlanGuid: this.housePlanGuid, //房源计划标识
            type: this.dialogForm.type, //房价类型
            guid: this.$parent.params.modelGuid //计价模型guid 新增就会为空串
          };
          http
            .modelSave(params, data)
            .then(res => {
              this.$parent.params.modelGuid = this.modelGuid = res.guid;
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              // this.updateTopTitle(res.districtName)
              if (this.$route.params.state == "new") {
                //新增才走进这里
                this.closeTopTab(); //关闭顶层页签
                let tab = {
                  label: res.formulaName,
                  path: "/bussModelTab/" + (res.guid || "new") + "/check"
                };
                this.openTopTab(tab); //再次打开页签，更新页签名
              }
              // // this.dialogForm.typeName = res.type
              // this.getModelInfo();//再次刷新
              this.Event.$emit("BussinessNodel", "search"); //广播刷新事件
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
  created() {
    this.modelGuid = this.$parent.params.modelGuid; //给计价模型赋值
  },
  mounted() {
    this.getDictionary(); //获取字典
    this.getHousePlanList(); //获取房源计划
    this.getModelList(); //获取计价公式名称
    if (this.modelGuid) {
      this.getModelInfo(); //查询模型信息
    }
  }
};
</script>
<style lang="scss" scoped>
#buss-model-info {
  .btnStyle {
    position: absolute;
    right: 15px;
    top: 15px;
  }
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
      font-size: 16px;
      height: 2rem;
      width: 8rem;
      line-height: 2rem;
      color: #666;
    }
    td:nth-child(odd) {
      width: 10%;
      background: aliceblue;
      color: #4b4b4b;
      /deep/.el-select-dropdown .el-popper {
        /deep/.el-scrollbar {
          display: block;
          .el-scrollbar__view .el-select-dropdown__list {
            min-height: 50px;
            height: 100%;
          }
          .el-select-dropdown__empty {
            margin-top: 100px;
          }
        }
      }
    }
  }
}
</style>
