<!--
 * @Description: 房源录入-配套设施新增
 * @Version: 1.0
 * @Autor: wangyue
 * @Date: 2019-11-26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-23 10:21:08
 -->
<template>
  <div class="facilitiesEdit">
    <div style="margin:20px 0">
      <el-button type="primary" @click="submitForm('dto')" size="mini">保存</el-button>
      <el-button type="primary" @click="fanhui" size="mini">返回</el-button>
    </div>
    <div class="quarterMessage_box" id="box">
      <el-form
        :model="dto"
        :rules="rules"
        ref="dto"
        label-width="9rem"
        class="demo-ruleForm"
        :disabled="isEdit"
      >
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="小区名称">
                <el-input v-model="dto.districtName" readonly disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="栋名称">
                <el-select v-model="dto.buildingGuid" clearable>
                  <el-option
                    v-for="(item,index) in buildNameList"
                    :key="index"
                    :label="item.name"
                    :value="item.guid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上报部门">
                <el-input v-model="dto.reportDept" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="配套设施类型">
                <el-select v-model="dto.facilityType" clearable>
                  <el-option
                    v-for="(item,index) in device"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="配套设施数量">
                <DistInputNumber
                  v-model="dto.facilityCount"
                  placeholder="请输入"
                  unit="个"
                  size="mini"
                  :min="0"
                ></DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="配套设施面积">
                <DistInputNumber
                  v-model="dto.facilityArea"
                  placeholder="请输入"
                  unit="平方米"
                  size="mini"
                  :min="0"
                ></DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="配套设施每层数量">
                <DistInputNumber
                  v-model="dto.facilityCountFloor"
                  placeholder="请输入"
                  unit="个"
                  size="mini"
                  :min="0"
                ></DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="配套设施每层面积">
                <DistInputNumber
                  v-model="dto.facilityAreaFloor"
                  placeholder="请输入"
                  unit="平方米"
                  size="mini"
                  :min="0"
                ></DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用情况">
                <el-input v-model="dto.usedCase" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用单位">
                <el-input v-model="dto.usedUnit" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="金额">
                <DistInputNumber
                  v-model="dto.price"
                  placeholder="请输入"
                  unit="元"
                  size="mini"
                  :min="0"
                ></DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="财政拨款金额">
                <DistInputNumber
                  v-model="dto.appropriationAmount"
                  placeholder="请输入"
                  unit="元"
                  size="mini"
                  :min="0"
                ></DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="财政拨款尚欠金额">
                <DistInputNumber
                  v-model="dto.oweAmount"
                  placeholder="请输入"
                  unit="元"
                  size="mini"
                  :min="0"
                ></DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设施编号" required>
                <el-input v-model="dto.facilityNo" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设施名称" required>
                <el-input v-model="dto.assortFacilityName" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设施来源" required>
                <el-select v-model="dto.facilityOrigin" clearable>
                  <el-option
                    v-for="(item,index) in deviceSource"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="租售单位">
                <el-input v-model="dto.rentalUnit" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="物业类型">
                <el-select v-model="dto.propertyCompanyType" clearable>
                  <el-option
                    v-for="item in wylx"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="基金性质">
                <el-select v-model="dto.fundNature" clearable>
                  <el-option
                    v-for="item in jjxz"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="室内车位数量">
                <DistInputNumber
                  v-model="dto.indoorPackingCount"
                  placeholder="请输入"
                  size="mini"
                  :min="0"
                ></DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="室外车位数量">
                <DistInputNumber
                  v-model="dto.outdoorPackingCount"
                  placeholder="请输入"
                  size="mini"
                  :min="0"
                ></DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="说明">
                <el-input v-model="dto.explain" type="textarea" autosize></el-input>
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
  name: "facilitiesEdit",
  components: {
    DistInputNumber
  },
  data() {
    return {
      deviceSource: [],
      device: [],
      wylx: [],
      jjxz: [],
      dto: {
        districtName: "",
        buildingGuid: "",
        reportDept: "",
        facilityType: "",
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
        rentalUnit: "",
        propertyCompanyType: "",
        fundNature: "",
        indoorPackingCount: "",
        outdoorPackingCount: "",
        explain: ""
      },
      rules: { required: true }, //必填规则
      buildingName: [],
      buildNameList: [],
      isEdit: false,
    };
  },
  methods: {
    // 点击保存按钮
    submitForm(formName) {
      this.$confirm("此操作将进行保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let dto = this.dto;
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.addFacility(dto);
            } else {
              this.open("请确认填写信息完整！！！");
              return false;
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存"
          });
        });
    },
    // 提交添加
    addFacility(dto) {
      //判断必填项
      if (this.dto.facilityNo == null || this.dto.facilityNo == "") {
        this.$alert("请输入设施编号", "提示");
      } else if (
        this.dto.assortFacilityName == null ||
        this.dto.assortFacilityName == ""
      ) {
        this.$alert("请输入设施名称", "提示");
      } else if (
        this.dto.facilityOrigin == null ||
        this.dto.facilityOrigin == ""
      ) {
        this.$alert("请输入设施来源", "提示");
      } else {
        if (this.dto.buildingGuid) {
          for (var i in this.buildNameList) {
            if (this.buildNameList[i].guid == this.dto.buildingGuid) {
              let data = {
                buildingName: this.buildNameList[i].name,
                buildingNo: this.buildNameList[i].code,
                ...this.dto
              };
              //判断是否为原有小区录入
              let params = {
                districtGuid: this.$parent.params.projectGuid,
                buildingGuid: this.dto.buildingGuid
              };
              if (this.$parent.params.source == "原有小区入库") {
                this.originalCommunity(params, data);
                break;
              } else {
                this.community(params, data);
                break;
              }
            }
          }
        } else {
          let data = {
            ...this.dto
          };
          //判断是否为原有小区录入
          let params = {
            districtGuid: this.$parent.params.projectGuid,
            buildingGuid: this.dto.buildingGuid
          };
          if (this.$parent.params.source == "原有小区入库") {
            this.originalCommunity(params, data);
          } else {
            this.community(params, data);
          }
        }
      }
    },
    //原有小区保存
    originalCommunity(params, data) {
      http
        .assortFacilityAdd(params, data)
        .then(res => {
          if (res) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.dto = res;
            this.dto.districtName = this.$parent.params.districtName;
            //发送配套设施信息刷新
            this.Event.$emit("facilitiesEdit", { msg: "refresh" });
            this.againOpen(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //小区保存
    community(params, data) {
      http
        .addFacility(params, data)
        .then(res => {
          if (res) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.dto = res;
            this.dto.districtName = this.$parent.params.districtName;
            //发送配套设施信息刷新
            this.Event.$emit("facilitiesEdit", { msg: "refresh" });
            this.againOpen(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存重新打开
    againOpen(res) {
      this.fanhui();
      this.$parent.openTab({
        id: res.guid,
        label: res.districtName,
        closable: true,
        meta: {
          state: "1",
          menuId: "peiTaosheShi"
        },
        component: () =>
          import("@/views/houseResource/houseInput/FacilitiesEdit")
      });
    },
    //字典
    getDict() {
      let dictionaryName = [
        "建筑结构",
        "建筑基础",
        "底层用途",
        "栋归属",
        "地段标准",
        "设施来源",
        "物业类型",
        "基金性质",
        "配套设施类型"
      ];
      let params = { names: dictionaryName.toString() };
      http
        .getDictionary(params)
        .then(res => {
          let resp = JSON.parse(res);
          this.structure = resp.建筑结构;
          this.buildingBasics = resp.建筑基础;
          this.bottomUse = resp.底层用途;
          this.tungAscription = resp.栋归属;
          this.lotStandardList = resp.地段标准;
          this.device = resp.配套设施类型;
          this.deviceSource = resp.设施来源;
          this.wylx = resp.物业类型;
          this.jjxz = resp.基金性质;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //判断小区是否更改
    edit() {
      //1可编辑 0 查看 2新增
      if (this.$parent.meta.state == "1") {
        let params = {
          districtGuid: this.$parent.params.projectGuid,
          pageIndex: 1,
          pageSize: 1,
          assortFacilityGuid: this.$parent.params.assortFacilityGuid,
          configName:
            this.$parent.params.itemName == "原有小区入库" ? "原有小区入库" : "" //原有小区入库，新增则会为空
        };
        http
          .checkFacility(params)
          .then(res => {
            this.dto = res.content[0];
            console.log(res);
            this.dto.districtName = this.$parent.params.districtName;
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.$parent.meta.state == "2") {
        this.dto = {};
        this.dto.districtName = this.$parent.params.districtName;
      } else if (this.$parent.meta.state == "0") {
        let params = {
          districtGuid: this.$parent.params.projectGuid,
          pageIndex: 1,
          pageSize: 1,
          assortFacilityGuid: this.$parent.params.assortFacilityGuid,
          configName: this.$parent.params.itemName == "原有小区入库" ? "原有小区入库" : "" //原有小区入库，新增则会为空
        };
        http
          .checkFacility(params)
          .then(res => {
            this.dto.districtName = this.$parent.params.districtName;
            console.log(res)
            this.dto = res.content[0];
          })
          .catch(err => {
            console.log(err);
          });
        this.isEdit = true;
      }
    },
    onLoad() {
      console.log(this.$parent.params);
      this.Event.$on("HouseInputTab", data => {
        if (data.msg == "ChangeSave") {
          this.getDict();
          this.dto.districtName = this.$parent.params.districtName;
        }
      });
    },
    fanhui() {
      this.$parent.close();
    },
    // 获取可以选择的栋
    getBuildName() {
      this.buildNameList = [];
      let params;
      params = {
        code: "",
        name: "",
        floorCount: "",
        landNo: "",
        elevator: "",
        skirtFloorCount: "",
        districtGuid: this.$parent.params.projectGuid,
        pageIndex: 1,
        pageSize: 1000
      };
      if (this.$parent.params.source == "原有小区入库") {
        http
          .houseBuilding(params)
          .then(res => {
            // guid createSelf code
            res.content.forEach(item => {
              //if (item.createSelf == true) {
              this.buildNameList.push({
                guid: item.guid,
                code: item.code,
                name: item.name
              });
              //}
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        let params = { districtGuid: this.$parent.params.projectGuid };
        http
          .getBuildName(params)
          .then(res => {
            this.buildNameList = res;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    this.onLoad();
    this.getBuildName();
    this.getDict();
    this.edit();
  }
};
</script>
<style lang="scss" scoped>
.facilitiesEdit {
  //总样式增加禁用文字居中，此处单独修改
  /deep/ .quarterMessage_box .el-input.is-disabled .el-input__inner {
    text-align: left;
  }
}
</style>
