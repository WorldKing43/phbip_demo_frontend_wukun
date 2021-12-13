<!--小区信息-->
<template>
  <div class="communityInformation tableStyle">
    <publicTitle title="小区信息">
      <el-button
        slot="publicTitleRight"
        type="primary"
        size="mini"
        @click="save"
        :disabled="!(this.$parent.params.activityName == '资产运维部初审')||(this.$route.query.itemName=='原有小区入库')"
        v-if="(!(this.$route.params.state == 'done'))&& hasPerm('fygl_rksp_xqxx_bc')"
      >保存</el-button>
    </publicTitle>
    <table :model="form">
      <tr>
        <td>小区编号</td>
        <td>
          <el-input v-model="form.code" disabled></el-input>
        </td>
        <td>小区名称</td>
        <td>
          <el-input v-model="form.name" :disabled="edit"></el-input>
        </td>
      </tr>
      <tr>
        <td>所在区</td>
        <td>
          <el-select style="width: 100%;" v-model="form.area" :disabled="edit" placeholder>
            <el-option
              v-for="item in areaData"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
        <td>所在街道</td>
        <td>
          <el-input v-model="form.street" :disabled="edit"></el-input>
        </td>
      </tr>
      <tr>
        <td>路(门牌号)</td>
        <td>
          <el-input v-model="form.roadName" :disabled="edit" placeholder="如:道路、门牌号"></el-input>
        </td>
        <td>地址</td>
        <td>
          <el-input v-model="form.address" :disabled="edit"></el-input>
        </td>
      </tr>
      <tr>
        <td>用地面积</td>
        <td style="position:relative">
          <el-input v-model="form.landArea" :disabled="edit" class="w100"></el-input>
          <span style="position:absolute;top:0px;right:5px;">㎡</span>
        </td>
        <td>总建筑面积</td>
        <td style="position:relative">
          <el-input v-model="form.totalCoveredArea" class="w100" :disabled="edit"></el-input>
          <span style="position:absolute;top:0px;right:5px;">㎡</span>
        </td>
      </tr>
      <tr>
        <td>容积率</td>
        <td>
          <el-input v-model="form.volumeRatio" :disabled="edit"></el-input>
        </td>
        <td>开工时间</td>
        <td>
          <el-date-picker
            class="w100"
            type="date"
            v-model="form.startConstructionTime"
            :disabled="edit"
          ></el-date-picker>
        </td>
      </tr>
      <tr>
        <td>竣工时间</td>
        <td>
          <el-date-picker
            class="w100"
            type="date"
            v-model="form.finishConstructionTime"
            :disabled="edit"
          ></el-date-picker>
        </td>
        <td>交付使用时间</td>
        <td>
          <el-date-picker class="w100" type="date" v-model="form.deliveryTime" :disabled="edit"></el-date-picker>
        </td>
      </tr>
      <tr>
        <td>开发商</td>
        <td>
          <el-input v-model="form.developer" :disabled="edit"></el-input>
        </td>
        <td>设计单位</td>
        <td>
          <el-input v-model="form.designOrgnation" :disabled="edit"></el-input>
        </td>
      </tr>
      <tr>
        <td>是否自管</td>
        <td>
          <el-select
            style="width: 100%;"
            v-model="form.selfSupervise"
            :disabled="edit"
            placeholder
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
        <td>是否自建</td>
        <td>
          <el-select style="width: 100%;" v-model="form.selfBuilt" :disabled="edit" placeholder>
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
        <td>是否代售</td>
        <td>
          <el-select style="width: 100%;" v-model="form.helpSale" :disabled="edit" placeholder>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
        <td>数据维护归属</td>
        <td>
          <el-select style="width: 100%;" v-model="form.districtMaintainBelong" disabled>
            <el-option
              v-for="(item, index) in maintenanceUnit"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>装修标准</td>
        <td style="position:relative">
          <el-input v-model="form.decorationStandardName" :disabled="edit" class="w100"></el-input>
          <el-button
            type="primary"
            size="mini"
            style="position:absolute;top:5px;right:3px"
            @click="newDecorationStandards"
            :disabled="!(this.$parent.params.activityName == '资产运维部初审')||(this.$route.query.itemName=='原有小区入库')"
            v-if="!(this.$route.params.state == 'done') && hasPerm('fygl_rksp_xqxx_zx')"
          >新增</el-button>
        </td>
        <td>小区详情说明</td>
        <td>
          <el-input v-model="form.remark" :disabled="edit"></el-input>
        </td>
      </tr>
    </table>

    <publicTitle title="装修标准"></publicTitle>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :header-cell-style="{
        background: '#E6F0FC',
        color: '#606266',
        'text-align': 'center',
        'border-color': '#DBDBDB'
      }"
      :cell-style="{
        'text-align': 'center',
        'border-color': '#DBDBDB'
      }"
    >
      <el-table-column label="序号" type="index" width="70"></el-table-column>
      <el-table-column prop="renovationCode" label="装修标准"></el-table-column>
      <el-table-column prop="renovationDescription" label="装修标准说明"></el-table-column>
      <el-table-column
        prop
        label="操作"
        show-overflow-tooltip
        v-if="(this.$route.params.state == 'todo')&&this.$parent.params.activityName == '资产运维部初审'&&(this.$route.query.itemName!='原有小区入库')"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="editRenovationDialog(scope.row)"
            v-if="hasPerm('fygl_rksp_xqxx_bj')"
          >编辑</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="deleteRenovation(scope.row)"
            v-if="hasPerm('fygl_rksp_xqxx_sc')"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="openDecorationStandardsDialog"
      :title="title"
      width="40%"
      class="dialog"
      :close-on-click-modal="false"
    >
      <el-form :model="decorationStandards">
        <el-form-item label="装修标准" label-width="6rem">
          <el-input v-model="decorationStandards.renovationCode" style="text-align:left"></el-input>
        </el-form-item>
        <el-form-item label="装修标准说明" label-width="6rem">
          <el-input v-model="decorationStandards.decorationRemark" type="textarea"></el-input>
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
import { mapGetters } from "vuex";
import http from "@/api/houseApproval.js";
import publicTitle from "@/components/TitleStylex"; //标题组件
export default {
  name: "communityInformation",
  components: {
    publicTitle //标题公共组件
  },
  data() {
    return {
      form: {
        parentGuid: "",
        parentName: "",
        serialNo: "",
        name: "",
        belongArea: "",
        area: "",
        street: "",
        adress: "",
        landArea: "",
        totalCoveredArea: "",
        volumeRatio: "",
        surveryProjectName: "",
        surveyProjectGuid: "",
        constructorProjectName: "",
        constructorProjectGuid: "",
        selfManagement: "",
        selfBuilt: "",
        selfSale: "",
        decorationStandard: "",
        developer: "",
        designOrgnation: "",
        startConstructionTime: "",
        finishConstructionTime: "",
        deliveryTime: "",
        remark: ""
      },
      edit: true,
      maintenanceUnit: [], //数据维护权归属
      options: [
        { value: true, label: "是" },
        { value: false, label: "否" }
      ], //是否自管，是否自建下拉菜单
      tableData: [],
      decorationStandards: {
        renovationCode: "",
        decorationRemark: ""
      }, //装修类型说明
      title: "",
      openDecorationStandardsDialog: false, //打开定义装修标准弹框
      areaData: [] //所属区字典集合
    };
  },
  methods: {
    //新增装修标准
    newDecorationStandards() {
      this.openDecorationStandardsDialog = true;
      this.title = "新增装修标准";
      this.decorationStandards = {};
    },
    //编辑装修标准
    editRenovationDialog(val) {
      this.title = "编辑装修标准";
      this.openDecorationStandardsDialog = true;
      this.decorationStandards = {
        renovationCode: "",
        decorationRemark: ""
      };
      this.getRenovationDetail(val);
    },
    //保存小区信息
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
          http
            .editdistrictInfo(params, data)
            .then(res => {
              if (res) {
                this.getNeighbourhoodDetail();
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
      let nameData = ["数据维护权归属", "所属区"];
      let params = { names: nameData.toString() };
      http
        .searchDictionary(params)
        .then(res => {
          res = JSON.parse(res);
          this.maintenanceUnit = res.数据维护权归属;
          this.areaData = res.所属区;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取小区详细信息
    getNeighbourhoodDetail() {
      let _params = {
        guid: this.$parent.params.reportGuid
      };
      http
        .getDistrictInfo(_params)
        .then(res => {
          this.form = res;
          this.$parent.params.disctrictCode = res.code;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //装修标准新增
    addRenovation() {
      let params = {
        districtGuid: this.$parent.params.districtGuid,
        decorationType: this.decorationStandards.renovationCode,
        decorationRemark: this.decorationStandards.decorationRemark
      };
      http
        .addRenovation(params)
        .then(res => {
          if (res) {
            this.$message({
              message: "新增成功",
              type: "success"
            });
            this.openDecorationStandardsDialog = false;
            this.getRenovationList();
            this.getNeighbourhoodDetail();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取装修详情
    getRenovationDetail(val) {
      let params = {
        decorationGuid: val.guid
      };
      http
        .editRenovation(params)
        .then(res => {
          if (res) {
            this.decorationStandards.renovationCode = res.renovationCode;
            this.decorationStandards.decorationRemark =
              res.renovationDescription;
            this.decorationStandards.guid = res.guid;
            this.getRenovationList(); //获取装修列表
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取装修列表
    getRenovationList() {
      let params = {
        districtGuid: this.$parent.params.districtGuid
      };
      http
        .getRenovationList(params)
        .then(res => {
          console.log(res);
          this.tableData = res;
        })
        .catch(err => {
          consoel.log(err);
        });
    },
    //编辑装修类型
    editRenovation() {
      let params = {
        decorationGuid: this.decorationStandards.guid,
        operate: "edit",
        decorationType: this.decorationStandards.renovationCode,
        decorationRemark: this.decorationStandards.decorationRemark
      };
      http
        .editRenovation(params)
        .then(res => {
          console.log(res);
          if (res) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.openDecorationStandardsDialog = false;
            this.getRenovationList();
            this.getNeighbourhoodDetail();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除装修类型
    deleteRenovation(val) {
      let params = {
        decorationGuid: val.guid,
        operate: "delete"
      };
      http
        .editRenovation(params)
        .then(res => {
          if (res) {
            this.getRenovationList();
            this.getNeighbourhoodDetail();
            this.$message({
              message: "删除成功",
              type: "success"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getNeighbourhoodDetail();
    this.getRenovationList();
    this.getDictionary();
    if (
      this.$parent.params.activityName == "资产运维部初审" &&
      this.$route.params.state == "todo" &&
      this.$route.query.itemName != "原有小区入库"
    ) {
      this.edit = false;
    } else {
      this.edit = true;
    }
    this.Event.$on("CommunityInformation", data => {
      if (data == "getNeighbourhoodDetail") {
        this.getNeighbourhoodDetail();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
