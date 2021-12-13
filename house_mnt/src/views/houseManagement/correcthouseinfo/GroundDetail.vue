<!--房源信息详情-->
<template>
  <div class="housingDetails">
    <div>
      <el-button
        type="primary"
        size="mini"
        @click="saveLandNo()"
        :disabled="this.$route.query.activityName == '审批'"
        v-if="!(this.$parent.meta.state == 'check')"
      >保存</el-button>
    </div>
    <div>
      <table>
        <tr>
          <td class="must">小区编号</td>
          <td>
            <el-input v-model="form.districtCode" disabled></el-input>
          </td>
          <td class="must">宗地号</td>
          <td>
            <el-input v-model="form.landNo" :disabled="!(this.$parent.meta.state == 'new')"></el-input>
          </td>
        </tr>
        <tr>
          <td>土地合同号</td>
          <td>
            <el-input v-model="form.contractNo" :disabled="edit"></el-input>
          </td>
          <td>土地补充合同号</td>
          <td>
            <el-input v-model="form.contractNoAdded" :disabled="edit"></el-input>
          </td>
        </tr>
        <tr>
          <td>土地面积</td>
          <td>
            <el-input v-model="form.landArea" :disabled="edit"></el-input>
          </td>
          <td>土地用途</td>
          <td>
            <el-input v-model="form.landUsed" :disabled="edit"></el-input>
          </td>
        </tr>
        <tr>
          <td>使用期始</td>
          <td>
            <el-date-picker
              v-model="form.useStart"
              type="date"
              :disabled="edit"
              placeholder="选择日期"
              style="width:100%"
            ></el-date-picker>
          </td>
          <td>使用期止</td>
          <td>
            <el-date-picker
              v-model="form.useEnd"
              type="date"
              :disabled="edit"
              placeholder="选择日期"
              style="width:100%"
            ></el-date-picker>
          </td>
        </tr>
        <tr>
          <td>所在区</td>
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
          <td>路名</td>
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
    <publicTitle title="勘误信息列表"></publicTitle>
    <div class="table">
      <el-table
        :data="changeDetailList"
        border
        size="mini"
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
        <el-table-column label="序号" width="80" type="index" :index="indexMethod"></el-table-column>
        <el-table-column prop="changeGuid" label="勘误类型"></el-table-column>
        <el-table-column prop="changeItem" label="勘误项"></el-table-column>
        <el-table-column label="勘误前">
          <template slot-scope="scope">{{ scope.row.changeBefore | dateFormat }}</template>
        </el-table-column>
        <el-table-column prop="changeAfter" label="勘误后">
          <template slot-scope="scope">{{ scope.row.changeAfter | dateFormat }}</template>
        </el-table-column>
        <el-table-column label="勘误时间">
          <template slot-scope="scope">{{ scope.row.changeTime | dateFormat }}</template>
        </el-table-column>
        <el-table-column prop="operator" label="变更人"></el-table-column>
      </el-table>
      <div class="page_box">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizesList"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNumber"
          background
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/api/housestore";
import http from "@/api/houseApproval";
import { Differ } from "@/components/js/change";
import publicTitle from "@/components/TitleStyle"; //标题组件
export default {
  components: {
    publicTitle //标题公共组件
  },
  data() {
    return {
      form: {
        districtCode: "",
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
      copyform: {}, //复制的宗地信息
      changeDetailList: [], //勘误信息列表
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
      options: [
        { value: true, label: "是" },
        { value: false, label: "否" }
      ], //是否下拉菜单
      edit: true, //表示是否可编辑
      currentPage: 1,
      pageSize: 10,
      pageSizesList: [10, 20, 30, 40],
      totalNumber: 0 //数据的总数
    };
  },
  methods: {
    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //打开一个页签
    openDetail(val) {
      this.$parent.openTab({
        id: "编辑" + val.guid,
        label: "编辑" + val.name || "宗地详情",
        closable: true,
        meta: {
          landGuid: val.guid,
          state: val.state,
          menuId: this.$parent.meta.menuId
        },
        component: () =>
          import("@/views/houseManagement/correcthouseinfo/GroundDetail")
      });
    },

    //保存或者编辑宗地信息
    saveLandNo() {
      if (!this.form.districtCode) {
        this.$alert("无法保存信息，请填写小区编号", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.form.landNo) {
        this.$alert("无法保存信息，请填写宗地号", "提示", {
          confirmButtonText: "确定"
        });
      } 
      // else if (!this.form.contractNo) {
      //   this.$alert("无法保存信息，请填写土地合同号", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.landArea) {
      //   this.$alert("无法保存信息，请填写土地面积", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.landUsed) {
      //   this.$alert("无法保存信息，请填写土地用途", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.useStart) {
      //   this.$alert("无法保存信息，请填写使用期始", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.useEnd) {
      //   this.$alert("无法保存信息，请填写使用期止", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.area) {
      //   this.$alert("无法保存信息，请填写所在区", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } else if (!this.form.roadName) {
      //   this.$alert("无法保存信息，请填写路名", "提示", {
      //     confirmButtonText: "确定"
      //   });
      // } 
      else {
        this.$confirm("此操作将进行保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let params = {
              districtGuid: this.$parent.params.districtGuid,
              projectId: this.$parent.params.PID1
            };
            let data = this.form;
            api
              .saveLandNo(params, data)
              .then(res => {
                if (res) {
                  if (this.$parent.meta.state == "new") {
                    this.saveChangeDetail();
                    this.$message({
                      type: "success",
                      message: "保存成功!"
                    });
                    this.$parent.close();
                    let val = {};
                    val.name = res.landNo;
                    val.state = "edit";
                    val.guid = res.guid;
                    this.openDetail(val);
                  } else {
                    this.saveChangeDetail();
                    this.checkDetail();
                    this.$message({
                      type: "success",
                      message: "保存成功!"
                    });
                  }
                  this.Event.$emit("GroundInformation", "searchGroundInfo");
                  this.Event.$emit(
                    "NeighbourhoodDetail",
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
    //获取小区编号
    getCode() {
      let params = {
        districtGuid: this.$parent.params.districtGuid
      };
      http
        .getCode(params)
        .then(res => {
          this.form.districtCode = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
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
        districtGuid: this.$parent.params.districtGuid
      };
      let data = {};
      api
        .getLandDetail(params, data)
        .then(res => {
          if (res) {
            if (!res.districtCode) {
              res.districtCode = this.form.disctrictCode;
            }
            this.form = res;
            this.copyform = this.deepClone(res); //变更前的数据
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //深度拷贝
    deepClone(source) {
      const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
      for (let keys in source) {
        // 遍历目标
        if (source.hasOwnProperty(keys)) {
          if (source[keys] && typeof source[keys] === "object") {
            // 如果值是对象，就递归一下
            targetObj[keys] = source[keys].constructor === Array ? [] : {};
            targetObj[keys] = this.deepClone(source[keys]);
          } else {
            // 如果不是，就直接赋值
            targetObj[keys] = source[keys];
          }
        }
      }
      return targetObj;
    },
    //保存变更明细
    saveChangeDetail() {
      var cfg = {
        landNo: "宗地号",
        contractNo: "土地合同号",
        contractNoAdded: "土地补充合同号",
        landArea: "土地面积",
        landUsed: "土地用途",
        useStart: "使用期始",
        useEnd: "使用期止",
        area: "所在区",
        roadName: "路名",
        remark: "说明"
      };
      var diff = new Differ(this.copyform, this.form, cfg);
      var changeData = diff.differ();
      if (changeData.length != 0) {
        changeData.forEach(ele => {
          ele.changeGuid = "修改宗地信息";
          ele.changeTime = new Date();
        });
      }
      let params = {
        districtGuid: this.$parent.params.districtGuid,
        landGuid: this.$parent.meta.landGuid,
        projectId: this.$parent.params.PID1
      };
      let data = changeData;
      api
        .saveChangeDetail(params, data)
        .then(res => {
          this.changeDetail();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取变更明细
    changeDetail() {
      let params = {
        districtGuid: this.$parent.params.districtGuid,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        projectId: this.$parent.params.PID1,
        type: this.$parent.meta.landGuid
      };
      api
        .changeDetail(params)
        .then(res => {
          this.changeDetailList = res.changeDetailsDTOS.content;
          this.totalNumber = res.changeDetailsDTOS.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //pageIndex改变时
    handleCurrentChange(val) {
      this.currentPage = val;
      this.changeDetail();
    },
    //pageSize改变时
    handleSizeChange(val) {
      this.pageSize = val;
      this.changeDetail();
    }
  },
  mounted() {
    this.getDictionary(); //调取字典
    this.edit = true;
    if (this.$parent.meta.state == "new") {
      this.edit = false;
      this.getCode();
    } else if (
      this.$parent.meta.state == "edit" &&
      this.$route.params.state == "todo" &&
      this.$route.query.activityName != "审批"
    ) {
      this.edit = false;
      this.checkDetail();
      this.changeDetail();
    } else if (
      (this.$parent.meta.state == "edit" &&
        this.$route.params.state == "done") ||
      this.$route.query.activityName == "审批"
    ) {
      this.edit = true;
      this.checkDetail();
      this.changeDetail();
    } else {
      this.edit = false;
      this.checkDetail();
      this.changeDetail();
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .td {
  background: #f2dede;
}

/deep/ .input {
  background: #f2dede;
}

/deep/ .input input {
  background: #f2dede;
}

/deep/ .input textarea {
  background: #f2dede;
}
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
}
</style>
