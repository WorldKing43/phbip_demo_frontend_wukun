<!--查封冻结-->
<template>
  <div id="seizureFreezeDetail" class="page-detail">
    <div class="content">
      <div class="el-tabs__content">
        <div class="top">
          <el-form ref="form" label-width="5rem" size="mini" :model="form">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="查封类型">
                  <el-select
                    v-model="form.unitType"
                    placeholder="--请选择--"
                    class="w100"
                    clearable
                    @change="getSealfreezeHouseList"
                  >
                    <el-option
                      v-for="item in unitTypeData"
                      :label="item.name"
                      :value="item.value"
                      :key="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="查封状态">
                  <el-select
                    v-model="form.sealState"
                    placeholder="--请选择--"
                    class="w100"
                    clearable
                    @change="getSealfreezeHouseList"
                  >
                    <el-option
                      v-for="item in sealStateData"
                      :label="item.name"
                      :value="item.value"
                      :key="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" size="mini" @click="getSealfreezeHouseList">查询</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div style="text-align:right">
          <el-button type="primary" size="mini" @click="continueSeal">续封</el-button>
        </div>
        <!--结果列表-->
        <div class="table-list" style="margin-top: 10px;margin-bottom:10px;">
          <el-table
            :data="tableData"
            border
            ref="houseTable"
            size="mini"
            :header-cell-style="globalHeaderStyle"
            :cell-style="globalCellStyle"
          >
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="districtName" label="小区名称"></el-table-column>
            <el-table-column prop="buildingName" label="栋名称"></el-table-column>
            <el-table-column prop="buildNo" label="栋号"></el-table-column>
            <el-table-column prop="houseNo" label="房号"></el-table-column>
            <el-table-column prop="beSealUpObject" label="被查封人/单位" width="120px"></el-table-column>
            <el-table-column prop="unitTypeName" label="查封类型"></el-table-column>
            <el-table-column prop="sealUpTime" label="查封日期"></el-table-column>
            <el-table-column prop="seizor" label="查封人"></el-table-column>
            <el-table-column prop="unSeizor" label="解封人"></el-table-column>
            <el-table-column prop="unSealUpTime" label="解封日期"></el-table-column>
            <el-table-column prop="stateName" label="查封状态"></el-table-column>
            <el-table-column label="操作" width="500px">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="checkDetail(scope.row)">查看</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="editDetail(scope.row)"
                  :disabled="scope.row.unSealUpNo == 0"
                >编辑</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="deArchive(scope.row)"
                  :disabled="(scope.row.unSealUpNo==0)"
                >解封</el-button>
                <el-button type="primary" size="mini" @click="printClosureForm(scope.row)">打印查封单</el-button>
                <el-button type="primary" size="mini" @click="printUnsealedSheet(scope.row)">打印解封单</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import publicTitle from "@/components/TitleStylex"; //标题组件
import api from "@/api/freezeSeized.js";
import http from "@/api/housestore.js";
import axios from "dist-axios";
import { houseStore } from "@/api/paths";
export default {
  name: "inquire",
  data() {
    return {
      form: {}, //表单
      unitTypeData: [], //查封类型的字典
      sealStateData: [], //查封状态的字典
      ischeckDetail: false, //查看详情页面的显隐
      isdeArchive: false, //解封界面详情的显隐
      isdeArchiveNext: false, //是否已进行了解封
      edit: false, //表示是否可编辑
      tableData: [],
      formData: {}, //查封详情的数据
      DialogVisble: false, //表示弹框是否打开
      guid: "" //查封标识
    };
  },
  components: {
    publicTitle
  },
  methods: {
    //获取字典数据
    getDictionary() {
      let nameData = ["查封类型", "查封状态"];
      let params = { names: nameData.toString() };
      http
        .getDictionary(params)
        .then(res => {
          this.unitTypeData = JSON.parse(res).查封类型;
          this.sealStateData = JSON.parse(res).查封状态;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击查看
    checkDetail(val) {
      val.state = "check";
      val.name = "查看";
      this.openDetail(val);
    },
    //编辑详情
    editDetail(val) {
      val.state = "edit";
      val.name = "编辑";
      this.openDetail(val);
    },
    //续封
    continueSeal() {
      let val = {};
      val.state = "continueSeal";
      val.name = "续封";
      val.guid = this.tableData[0].guid;
      val.houseGuid = this.tableData[0].houseGuid;
      this.openDetail(val);
    },
    //解封
    deArchive(val) {
      val.state = "deArchive";
      val.name = "解封";
      this.openDetail(val);
    },
    //打开详情
    openDetail(val) {
      let tab = {
        route:
          "/newSeizureFreeze/" +
          (val.state || "new") +
          "/" +
          val.houseGuid +
          "/" +
          val.guid,
        name: val.name,
        type: "single"
      };
      this.openTopTab(tab);
    },
    //查封/冻结-查询某条房屋查询情况
    getSealfreezeHouseList() {
      this.form.houseGuid = this.$route.params.houseGuid;
      let params = this.form;
      api
        .getSealfreezeHouseList(params)
        .then(res => {
          this.tableData = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查封/冻结-获取选中的查封详情
    getSealfreezeHouseListDetail(val) {
      let params = {
        guid: val.guid
      };
      api
        .getSealfreezeHouseListDetail(params)
        .then(res => {
          if (res.unitType) {
            res.unitType = res.unitType.toString();
          }
          this.formData = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取当前登录人的信息
    getUserName() {
      let params = {};
      api
        .getUserName(params)
        .then(res => {
          this.deArchiveData.unSeizor = res.userName;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //打印查封单
    printClosureForm(val) {
      let params = {};
      api
        .getReportUrl(params)
        .then(res => {
          let bdTokenUrl = "";
          if (res) {
            bdTokenUrl =
              res +
              "?rpx=phbip%2F%E6%88%BF%E6%BA%90-%E6%9F%A5%E5%B0%81%E4%BF%A1%E6%81%AF%E8%A1%A8.rpx&argRpx=&scale=1.0&guid=" +
              encodeURI(val.guid);
          } else {
            bdTokenUrl =
              "http://123.207.87.250:8081/report/reportJsp/showReport.jsp?rpx=phbip%2F%E6%88%BF%E6%BA%90-%E6%9F%A5%E5%B0%81%E4%BF%A1%E6%81%AF%E8%A1%A8.rpx&argRpx=&scale=1.0&guid=" +
              encodeURI(val.guid);
          }
          window.open(bdTokenUrl);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //打印解封单
    printUnsealedSheet(val) {
      let params = {};
      api
        .getReportUrl(params)
        .then(res => {
          let bdTokenUrl = "";
          if (res) {
            bdTokenUrl =
              res +
              "?rpx=phbip%2F%E6%88%BF%E6%BA%90-%E8%A7%A3%E5%B0%81%E4%BF%A1%E6%81%AF%E8%A1%A8.rpx&argRpx=&scale=1.0&guid=" +
              encodeURI(val.guid);
          } else {
            bdTokenUrl =
              "http://123.207.87.250:8081/report/reportJsp/showReport.jsp?rpx=phbip%2F%E6%88%BF%E6%BA%90-%E8%A7%A3%E5%B0%81%E4%BF%A1%E6%81%AF%E8%A1%A8.rpx&argRpx=&scale=1.0&guid=" +
              encodeURI(val.guid);
          }
          window.open(bdTokenUrl);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getDictionary();
    this.getSealfreezeHouseList();
    this.Event.$on("seizureFreezeDetail", data => {
      if (data == "getSealfreezeHouseList") {
        this.getSealfreezeHouseList();
      }
    });
  }
};
</script>

<style lang="scss">
#seizureFreezeDetail {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
