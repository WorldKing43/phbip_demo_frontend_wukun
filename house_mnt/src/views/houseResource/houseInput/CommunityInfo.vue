<!--
 * @Description: 小区信息明细页
 * @Version: 1.0
 * @Autor: zhaoyy1
 * @Date: 2019-09-10 17:33:13
 * @LastEditors: wangyue
 * @LastEditTime: 2020-03-31 10:48:51
 -->
<template>
  <div class="houseInfomationEdit">
    <div class="save-button-right">
      <el-button type="primary" @click="submitForm" size="mini" class="save" :disabled="ban">保存</el-button>
    </div>
    <title-stylex title="基本信息"></title-stylex>
    <div class="quarterMessage_box">
      <el-form :model="dto" :rules="rules" ref="dto" label-width="9rem" :disabled="ban">
        <div class="demo-ruleForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="小区编号" required>
                <el-input v-model="dto.code" readonly>
                  <el-button type="primary" @click="getDistrictCode" size="mini" :disabled="source" slot="append">生成
                  </el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="小区名称" required>
                <el-input v-model="dto.name" placeholder="请输入" clearable :disabled="source"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="相关项目">
                <el-select v-model="associationItem" clearable @change="associationItems()"
                  :disabled="this.$parent.params.projectGuid!='newguid' || source">
                  <el-option v-for="(item,index) in projectList" :key="index" :label="item.name" :value="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在区" required>
                <el-select v-model="dto.area" clearable @change="generateAddress()" :disabled="source">
                  <el-option v-for="item in areaList" :key="item.value" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在街道" required>
                <el-input v-model="dto.street" @keyup.native="generateAddress()" :disabled="source" placeholder="请输入"
                  clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="路（门牌号）" required>
                <el-input v-model="dto.roadName" @keyup.native="generateAddress()" :disabled="source" placeholder="请输入"
                  clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="地址" required  style="position:relative">
                <el-input v-model="dto.address" class="address" :disabled="source" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="建设单位" required>
                <el-input v-model="dto.developer" :disabled="source" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设计单位" required>
                <el-input v-model="dto.designOrgnation" :disabled="source" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用地面积" required>
                <DistInputNumber v-model="dto.landArea" placeholder="请输入" unit="平方米" size="mini" :min="0"
                  :disabled="source">
                </DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总建筑面积" required>
                <DistInputNumber v-model="dto.totalCoveredArea" placeholder="请输入" unit="平方米" size="mini" :min="0"
                  :disabled="source">
                </DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="容积率">
                <el-input v-model="dto.volumeRatio" :disabled="source" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开工时间">
                <el-form-item>
                  <el-date-picker :disabled="source" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                    v-model="dto.startConstructionTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="竣工时间">
                <el-form-item>
                  <el-date-picker :disabled="source" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                    v-model="dto.finishConstructionTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="交付使用时间">
                <el-form-item>
                  <el-date-picker :disabled="source" type="date" placeholder="选择日期" v-model="dto.deliveryTime"
                    value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否自管">
                <el-select v-model="dto.selfSupervise" clearable :disabled="source">
                  <el-option v-for="item in selfManagement" :key="item.value" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否自建">
                <el-select v-model="dto.selfBuilt" clearable :disabled="source">
                  <el-option v-for="item in selfBuilt" :key="item.value" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="是否代售">
                <el-select v-model="dto.helpSale" :disabled="source" clearable>
                  <el-option v-for="item in selfBuilt" :key="item.value" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="小区详细说明">
                <el-input type="textarea" v-model="dto.remark" placeholder="详细说明" :disabled="source" autosize>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <!-- 装修标准 -->
    <title-stylex title="装修标准">
      <div slot="publicTitleRight">
        <el-button type="primary" size="mini" @click="newAdd" :disabled="ban">新增</el-button>
      </div>
    </title-stylex>
    <div class="table">
      <el-table class="margin-top-15" :data="dto.districtRenovationPreInfoDTOS" border size="mini" :header-cell-style="{
          'background': '#E6F0FC',
          'color': '#606266',
          'text-align':'center',
          'border-color': '#DBDBDB',
          }" :cell-style="{
          'text-align':'center',
          'border-color': '#DBDBDB',
          }">
        <el-table-column label="序号" width="55">
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="装修标准" prop="renovationCode" width="300"></el-table-column>
        <el-table-column label="装修标准说明" prop="renovationDescription"></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editRenovationDialog(scope.row,scope.$index)">编辑</el-button>
            <el-button type="primary" size="mini" @click="deleteLine(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 装修标准弹框 -->
    <el-dialog :visible.sync="openDecorationStandardsDialog" :title="title" width="40%" :close-on-click-modal="false">
      <el-form :model="decorationStandards">
        <el-form-item label="装修标准" label-width="6rem">
          <el-input v-model="decorationStandards.renovationCode" style="text-align:left"></el-input>
        </el-form-item>
        <el-form-item label="装修标准说明" label-width="6rem">
          <el-input v-model="decorationStandards.decorationRemark" type="textarea" autosize></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:center;margin-top:20px;">
        <el-button @click="openDecorationStandardsDialog = false" size="mini">取消</el-button>
        <el-button @click="addRenovation" type="primary" size="mini" v-if="title == '新增装修标准'">确定</el-button>
        <el-button @click="editRenovation" type="primary" size="mini" v-if="title == '编辑装修标准'">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import TitleStylex from "@/components/TitleStylex";
import DistInputNumber from "@/components/DistInputNumber";
import http from "@/api/common(bj).js";
export default {
  name: "CommunityInfo",
  components: {
    TitleStylex,
    DistInputNumber
  },
  data() {
    return {
      isBan: false, //生成只能触发一次
      area: "", //所属区域
      belongArea: "", //小区归属
      area_prepar: "", //小区区域
      selfBuilt: [
        { name: "是", value: true },
        { name: "否", value: false }
      ], //是否自建
      selfManagement: [
        { name: "是", value: true },
        { name: "否", value: false }
      ], //是否自管
      decorationStandard: "", //建房标准
      address: "", //小区地址
      rules: { required: true }, //必填规则
      dto: {
        address: "", //地址
        area: "", //区域
        belongArea: "", //小区归属
        code: "", //小区编号
        community: "", //社区
        constructorProjectGuid: "", //  不确定---建设项目标识
        decorationStandard: "", //装饰标准
        deliveryTime: "", //交付时间
        designOrgnation: "", // 设计单位
        developer: "", //建设单位
        fileCode: "", //文件代码---档案编号
        finishConstructionTime: "", //竣工时间
        houseCount: 0, //总套数
        landArea: "", //用地面积
        name: "", //小区名
        parentGuid: "", //大区标识
        picCode: "", //小区图
        remark: "", //小区详细说明
        reportGuid: "", //上报审批标识
        roadName: "", //路
        selfBuilt: "", //是否自建
        selfManagement: "", //是否自管
        selfSupervise:false,
        selfSale: true, //自销
        serialNo: "", //网格编码
        startConstructionTime: "", //开始构造开工时间
        state: 0, //状态
        street: "", //街道
        surveyProjectGuid: "", //测绘项目标识
        totalCoveredArea: "", //总建筑面积
        usedCode: "", //曾用小区代码
        usedName: "", //曾用小区名
        volumeRatio: "", //容积率
        districtRenovationPreInfoDTOS: []
      },
      projectList: [], //关联项目List
      associationItem: "", //关联项目index
      areaList: [],
      source: false, //判断是否是原有小区录入
      ban: false,
      //=============================装修标准
      title: "",
      openDecorationStandardsDialog: false, //打开定义装修标准弹框
      areaData: [], //所属区字典集合
      decorationStandards: {
        decorationType: "",
        decorationRemark: ""
      }, //装修类型说明
      districtId: ""
    };
  },
  methods: {
    submitForm() {
      if (!this.$parent.params.source) {
        //提交修改
        if (this.dto.code == "" || this.dto.code == null) {
          this.$alert("请输入小区编号", "提示");
          return;
        }
        if (this.dto.name == "" || this.dto.name == null) {
          this.$alert("请输入小区名称", "提示");
          return;
        }
        if (this.dto.area == "" || this.dto.area == null) {
          this.$alert("请输入所在区", "提示");
          return;
        }
        if (this.dto.street == "" || this.dto.street == null) {
          this.$alert("请输入所在街道", "提示");
          return;
        }
        if (this.dto.roadName == "" || this.dto.roadName == null) {
          this.$alert("请输入所在路", "提示");
          return;
        }
        if (this.dto.address == "" || this.dto.address == null) {
          this.$alert("请输入地址", "提示");
          return;
        }
        if (this.dto.landArea == "" || this.dto.landArea == null) {
          this.$alert("请输入用地面积", "提示");
          return;
        }
        if (
          this.dto.totalCoveredArea == "" ||
          this.dto.totalCoveredArea == null
        ) {
          this.$alert("请输入总建筑面积", "提示");
          return;
        }
        if (this.dto.developer == "" || this.dto.developer == null) {
          this.$alert("请输入建设单位", "提示");
          return;
        }
        if (
          this.dto.designOrgnation == "" ||
          this.dto.designOrgnation == null
        ) {
          this.$alert("请输入设计单位", "提示");
          return;
        }
        if (this.dto.districtRenovationPreInfoDTOS.length == 0) {
          this.$alert("请填写装修标准", "提示");
          return;
        }
      }
      // 修改小区信息
      if (this.$parent.params.projectGuid == "newguid") {
        this.addAuarters();
      } else {
        this.$confirm("此操作将进行保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (this.$parent.params.source == "原有小区入库") {
              let params;
              let data = this.dto;
              this.originalCommunity(params, data);
            } else {
              let params;
              let data = this.dto;
              this.community(params, data)
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消保存"
            });
          });
      }
    },
    //原有小区保存
    originalCommunity(params, data) {
      this.$startLoading();
      http
        .houseDistrictsave(params, data)
        .then(res => {
          if (res) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
          }
          this.Event.$emit("newHouseInputTab", { msg: "newHouseInputTab" });
          this.$parent.params.districtName = this.dto.name;
          this.$parent.params.landNos = this.dto.landNos;
          this.$parent.params.standardAddress =  this.dto.address;
          this.$parent.params.street =  this.dto.street;
          this.$parent.params.area = this.dto.area;
          //发送已保存信息
          this.Event.$emit("HouseInputTab", { msg: "ChangeSave" });
          this.$endLoading()
        })
        .catch(err => {
          console.log(err);
          this.$endLoading()
        });
    },
    //小区保存
    community(params, data) {
      this.$startLoading();
      http
        .addAuarters(params, data)
        .then(res => {
          if (res) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
          }
          this.Event.$emit("newHouseInputTab", { msg: "newHouseInputTab" });
          this.$parent.params.districtName = this.dto.name;
          this.$parent.params.standardAddress =  this.dto.address;
          this.$parent.params.street =  this.dto.street;
          this.$parent.params.landNos = this.dto.landNos;
          this.$parent.params.area = this.dto.area;
          //发送已保存信息
          this.Event.$emit("HouseInputTab", { msg: "ChangeSave" });
          this.$endLoading()
        })
        .catch(err => {
          console.log(err);
          this.$endLoading()
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //提示框
    open(title) {
      this.$message(title);
    },
    //建设筹集-小区信息新增
    addAuarters() {
      var that = this;
      let dto = that.dto;
      let params;
      let data = this.dto;
      http
        .addAuarters(params, data)
        .then(res => {
          if (res) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.Event.$emit("newHouseInputTab", { msg: "newHouseInputTab" });
            this.dto = res;
            //关闭当前窗口
            this.openDetail(res);
            this.closeTopTab();
            this.$parent.params.projectGuid = res.guid;
            this.$parent.params.districtName = res.name;
            this.$parent.params.landNos = res.landNos;
            this.$parent.params.area = this.dto.area;
          } else {
            this.open(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //新建保存重新打开
    openDetail(res) {
      let code;
      let guid = res.guid;
      code = "房源信息录入";
      let tempTab = {
        label: res.name,
        name: "houseInputTab",
        params: {
          code: code,
          guid: guid,
          edit: "1"
        }
      };
      this.openTopTab(tempTab);
    },
    //自动识别
    generateAddress() {
      let area = "";
      this.areaList.forEach(item => {
        if (item.value == this.dto.area) {
          area = item.name;
        }
      });
      this.dto.address = area + this.dto.street + this.dto.roadName;
    },
    //建设筹集小区信息新增条件-小区号生成获取
    getDistrictCode() {
      var that = this;
      let params;
      http
        .getDistrictCode(params)
        .then(res => {
          this.$parent.params.code = res;
          that.dto.code = res;
          this.isBan = true; //点击生成后不允许再次生成
        })
        .catch(err => {
          console.log(err);
        });
    },
    //字典
    async getDict() {
      let dictionaryName = [
        "所属区",
        "街道",
        "维护归属1",
        "自管",
        "自建",
        "装修标准"
      ];
      let params = { names: dictionaryName.toString() };
      await http
        .getDictionary(params)
        .then(res => {
          let resp = JSON.parse(res);
          this.areaList = resp.所属区;
          this.belongArea = resp.维护归属1;
          this.decorationStandard = resp.装修标准;
        })
        .catch(err => {
          console.log(err);
        });
      if (this.$parent.params.projectGuid == "newguid") {
        await http
          .projectInfoDistrict()
          .then(res => {
            if (res) {
              this.projectList = res;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    onLoad() {
      if (this.$parent.params.projectGuid.indexOf("newguid") == -1) {
        this.queryFunc();
      }
      //判断是否栋信息进行修改
      this.Event.$on("LandHouse", data => {
        if (data.msg == "refresh") {
          this.queryFunc();
        }
      });
      //判断是否为原有小区录入
      if (this.$parent.params.source == "原有小区入库") {
        this.source = true;
      } else {
        this.source = false;
      }
    },
    queryFunc() {
      if (this.$parent.params.source == "原有小区入库") {
        let params = { districtGuid: this.$parent.params.projectGuid };
        http
          .houseDistrictdetail(params)
          .then(res => {
            this.dto = res;
            this.$parent.params.code = res.code;
            this.isBan = true; //存在小区编号不允许在生成
            this.$parent.params.districtName = res.name;
            this.$parent.params.standardAddress = res.address;
            this.$parent.params.landNos = res.landNos;
            this.$parent.params.street =  this.dto.street;
            this.$parent.params.area = this.dto.area;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        let params = { districtGuid: this.$parent.params.projectGuid };
        let data;
        http
          .checkQuery(params, data)
          .then(res => {
            this.dto = res;
            this.$parent.params.code = res.code;
            this.isBan = true; //存在小区编号不允许在生成
            this.$parent.params.districtName = res.name;
            this.$parent.params.standardAddress = res.address;
            this.$parent.params.landNos = res.landNos;
            this.$parent.params.street =  this.dto.street;
            this.$parent.params.area = this.dto.area;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //相关项目
    associationItems() {
      if (this.dto.code != null && this.dto.code != "") {
        this.projectList[this.associationItem].code = this.dto.code;
      }
      this.dto = JSON.parse(
        JSON.stringify(this.projectList[this.associationItem])
      );
      this.dto.districtRenovationPreInfoDTOS = [];
    },
    //===================================装修标准=====
    //打开新增弹框
    newAdd() {
      this.openDecorationStandardsDialog = true;
      this.title = "新增装修标准";
      this.decorationStandards = {
        renovationCode: "",
        decorationRemark: ""
      };
    },
    //确定新增装修标准
    addRenovation() {
      //必填项
      if (
        this.decorationStandards.renovationCode == "" ||
        this.decorationStandards.renovationCode == null
      ) {
        this.$alert("请填写装修标准！", "提示");
        return;
      }
      if (
        this.decorationStandards.decorationRemark == "" ||
        this.decorationStandards.decorationRemark == null
      ) {
        this.$alert("请填写装修标准说明！", "提示");
        return;
      }
      this.dto.districtRenovationPreInfoDTOS.push({
        renovationCode: this.decorationStandards.renovationCode,
        renovationDescription: this.decorationStandards.decorationRemark
      });
      this.openDecorationStandardsDialog = false;
    },
    //删除装修标准
    deleteLine(val) {
      this.dto.districtRenovationPreInfoDTOS.splice(val, 1);
    },
    //新增装修标准
    newDecorationStandards() {
      this.openDecorationStandardsDialog = true;
      this.title = "新增装修标准";
      this.decorationStandards = {};
    },
    //打开编辑装修标准
    editRenovationDialog(val, index) {
      this.districtId = index;
      this.title = "编辑装修标准";
      this.openDecorationStandardsDialog = true;
      this.decorationStandards = {
        renovationCode: val.renovationCode,
        decorationRemark: val.renovationDescription
      };
    },
    //完成编辑装修标准
    editRenovation() {
      //必填项
      if (
        this.decorationStandards.renovationCode == "" ||
        this.decorationStandards.renovationCode == null
      ) {
        this.$alert("请填写装修标准！", "提示");
        return;
      }
      if (
        this.decorationStandards.decorationRemark == "" ||
        this.decorationStandards.decorationRemark == null
      ) {
        this.$alert("请填写装修标准说明！", "提示");
        return;
      }
      this.openDecorationStandardsDialog = false;
      this.dto.districtRenovationPreInfoDTOS.forEach((item, index) => {
        if (index == this.districtId) {
          item.renovationCode = this.decorationStandards.renovationCode;
          item.renovationDescription = this.decorationStandards.decorationRemark;
        }
      });
    },
    location(){
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
  created() {
    this.getDict();
    this.onLoad();
    if (this.$parent.params.edit === "2") {
      this.ban = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.houseInfomationEdit {
  .save-button-right {
    //margin-top: 20px;
    text-align: right;
  }
  //总样式增加禁用文字居中，此处单独修改
  /deep/ .quarterMessage_box .el-input.is-disabled .el-input__inner {
    text-align: left;
  }
}
</style>
