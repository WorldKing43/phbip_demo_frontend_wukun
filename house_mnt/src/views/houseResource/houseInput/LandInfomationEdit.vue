<!--
 * @Description: 房源录入-宗地信息新建
 * @Version: 2.0
 * @Autor: wangyue
 * @Date: 2019-11-29 19:05:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-23 16:15:49
 -->
<template>
  <div class="HousingEdit">
    <div class="quarterMessage_box margin_box">
      <div class="width button" style="margin:20px 0">
        <el-button type="primary" @click="submitForm()" size="mini" v-if="!edit">保存</el-button>
        <el-button type="primary" @click="goBack" size="mini">返回</el-button>
      </div>
      <el-form :disabled="edit" :model="addLandNoInfo" :rules="rules" ref="addLandNoInfo" label-width="9rem">
        <div class="demo-ruleForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="小区编号" required>
                <el-input v-model="addLandNoInfo.districtCode" readonly disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="宗地号" required>
                <el-input v-model="addLandNoInfo.landNo" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="土地合同号" required>
                <el-input v-model="addLandNoInfo.contractNo" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="土地补充合同号">
                <el-input v-model="addLandNoInfo.contractNoAdded" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="土地面积" required>
                <DistInputNumber v-model="addLandNoInfo.landArea" placeholder="请输入" unit="平方米" size="mini" :min="0">
                </DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="土地用途" required>
                <el-input v-model="addLandNoInfo.landUsed" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用期始" required>
                <el-date-picker type="date" placeholder="选择日期" v-model="addLandNoInfo.useStart"
                  value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用期止" required>
                <el-date-picker type="date" placeholder="选择日期" v-model="addLandNoInfo.useEnd" value-format="yyyy-MM-dd"
                  style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在区" required>
                <el-select v-model="addLandNoInfo.area" clearable :disabled='parentArea'>
                  <el-option v-for="(item,index) in area" :key="index" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="路名" required>
                <el-input v-model="addLandNoInfo.roadName" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="说明" class="width">
                <el-input v-model="addLandNoInfo.remark" type="textarea" autosize></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import DistInputNumber from "@/components/DistInputNumber";
import http from "@/api/common(bj).js";
export default {
  name: "landInfomationEdit",
  components: {
    DistInputNumber
  },
  data() {
    return {
      addLandNoInfo: {
        districtCode: this.$parent.params.code,
        landNo: "",
        contractNo: "",
        contractNoAdded: "",
        useStart: "",
        useEnd: "",
        area: "",
        roadName: "",
        remark: "",
        landArea: "",
        landUsed: ""
      },
      rules: { required: true }, //必填规则
      area: [], //所属区
      edit: false, //是否可编辑
      parentArea: false //判断是否为原有小区不存在所属区
    };
  },
  methods: {
    // 保存
    submitForm() {
      if (
        this.addLandNoInfo.districtCode == "" ||
        this.addLandNoInfo.districtCode == null
      ) {
        this.$alert("请输入小区编号", "提示");
      } else if (
        this.addLandNoInfo.landNo == "" ||
        this.addLandNoInfo.landNo == null
      ) {
        this.$alert("请输入宗地号", "提示");
      } else if (
        this.addLandNoInfo.contractNo == "" ||
        this.addLandNoInfo.contractNo == null
      ) {
        this.$alert("请输入土地合同号", "提示");
      } else if (
        this.addLandNoInfo.landArea == "" ||
        this.addLandNoInfo.landArea == null
      ) {
        this.$alert("请输入土地面积", "提示");
      } else if (
        this.addLandNoInfo.landUsed == "" ||
        this.addLandNoInfo.landUsed == null
      ) {
        this.$alert("请输入土地用途", "提示");
      } else if (
        this.addLandNoInfo.useStart == "" ||
        this.addLandNoInfo.useStart == null
      ) {
        this.$alert("请输入使用期始", "提示");
      } else if (
        this.addLandNoInfo.useEnd == "" ||
        this.addLandNoInfo.useEnd == null
      ) {
        this.$alert("请输入使用期止", "提示");
      } else if (
        this.addLandNoInfo.area == "" ||
        this.addLandNoInfo.area == null
      ) {
        this.$alert("请输入所在区", "提示");
      } else if (
        this.addLandNoInfo.roadName == "" ||
        this.addLandNoInfo.roadName == null
      ) {
        this.$alert("请输入路名", "提示");
      } else {
        this.$confirm("此操作将进行保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            console.log(this.$parent.params)
            //判断是否为原有小区录入
            let params;
            let data = this.addLandNoInfo;
            if (this.$parent.params.source == "原有小区入库") {
              params = {
                distritGuid: this.$parent.params.projectGuid,
                configName: "原有小区入库"
              };
            } else {
              params = { distritGuid: this.$parent.params.projectGuid };
            }
            http
              .landNoAdd(params, data)
              .then(res => {
                if (res) {
                  this.$message({
                    message: "保存成功",
                    type: "success"
                  });
                  //发送宗地信息刷新
                  this.Event.$emit("LandInfomationEdit", { msg: "refresh" });
                  this.Event.$emit("LandHouse", { msg: "refresh" });
                  this.Event.$emit("HouseInputTab", { msg: "ChangeSave" }); //新增宗地信息后新增栋获取宗地号
                  this.addLandNoInfo = res;
                  this.addLandNoInfo.districtCode = this.$parent.params.code;
                  //重新打开页面
                  this.goBack();
                  //打开新的tab页
                  this.$parent.openTab({
                    id: res.guid + "1",
                    label: res.landNo,
                    closable: true,
                    meta: {
                      state: "1", //1可编辑 0 查看  2新增
                      landNoGuid: res.guid,
                      menuId: "landInfomation"
                    },
                    component: () =>
                      import(
                        "@/views/houseResource/houseInput/LandInfomationEdit"
                      )
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
      }
    },
    //字典
    getDict() {
      let dictionaryName = ["所属区"];
      let params = { names: dictionaryName.toString() };
      http
        .getDictionary(params)
        .then(res => {
          let resp = JSON.parse(res);
          this.area = resp.所属区;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //显示已有信息
    onLoad() {
      // 查询
      let params = {
        landNo: "",
        districtGuid: this.$parent.params.projectGuid,
        landNoGuid: this.$parent.meta.landNoGuid
      };
      if (this.$parent.params.source == "原有小区入库") {
        http
          .houseLandNo(params)
          .then(res => {
            if (res) {
              this.addLandNoInfo = res[0];
              this.addLandNoInfo.districtCode = this.$parent.params.code;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        http
          .getlandNoList(params)
          .then(res => {
            if (res) {
              this.addLandNoInfo = res[0];
              this.addLandNoInfo.districtCode = this.$parent.params.code;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //返回
    goBack() {
      this.$parent.close();
    }
  },
  created() {
    this.getDict();
    //兼容老数据没有所属区情况
    if (this.$parent.params.area === null) {
      this.parentArea = false;
    } else {
      this.addLandNoInfo.area = this.$parent.params.area;
      this.parentArea = true;
    }
    //1为编辑 0 为查看 2为新增
    if (this.$parent.meta.state == "1") {
      this.edit = false;
      this.onLoad();
    } else if (this.$parent.meta.state == "0") {
      this.edit = true;
      this.onLoad();
    } else {
    }
  }
};
</script>
<style lang="scss" scoped>
.HousingEdit {
  //总样式增加禁用文字居中，此处单独修改
  /deep/ .quarterMessage_box .el-input.is-disabled .el-input__inner {
    text-align: left;
  }
}
</style>
