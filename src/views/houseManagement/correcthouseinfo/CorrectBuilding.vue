<!--栋信息-->
<template>
  <div class="CorrectBuilding">
      <!--查询栏-->
      <div class="top">
        <el-form ref="form" :model="form" label-width="5rem" size="mini">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="栋号">
                <el-input v-model="form.code" clearable @change="getBuildingList(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="栋名称">
                <el-input v-model="form.name" clearable @change="getBuildingList(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否带电梯" label-width="5.5rem">
                <el-select
                  v-model="form.elevator"
                  placeholder="--请选择--"
                  class="w100"
                  clearable
                  @change="getBuildingList(1)"
                >
                  <el-option
                    v-for="item in options"
                    :label="item.label"
                    :value="item.value"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="总楼层数">
                <el-input v-model="form.floorCount" clearable @change="getBuildingList(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="宗地号">
                <el-input v-model="form.landNo" clearable @change="getBuildingList(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="裙楼层数">
                <el-input v-model="form.skirtFloorCount" clearable @change="getBuildingList(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <div style="text-align:right">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="getBuildingList(1)"
                    v-if="hasPerm('fygl_fyxxkw_dxx_cx')"
                    style="margin-right:10px"
                  >查询</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="reset"
                    v-if="hasPerm('fygl_fyxxkw_dxx_cz')"
                  >重置</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="aside-btn">
        <div class="left_btn">
          <el-button type="primary" size="mini" :disabled="(this.$route.query.activityName == '审批')" v-if="hasPerm('fygl_fyxxkw_dxx_xzmb') && !(this.$route.params.state == 'done')" @click="downloadTemplate()">下载模板</el-button>
          <el-upload
            style="display:inline-block"
            ref="upload"
            :http-request="uploadFile"
            action
            :show-file-list="false"
            accept=".xls, .xlsx"
          >
            <el-button size="mini" type="primary" :disabled="(this.$route.query.activityName == '审批')" v-if="hasPerm('fygl_fyxxkw_dxx_drdxx') && !(this.$route.params.state == 'done')">导入栋信息</el-button>
          </el-upload>
          <el-button type="primary" size="mini" :disabled="(this.$route.query.activityName == '审批')" v-if="hasPerm('fygl_fyxxkw_dxx_drxq') && !(this.$route.params.state == 'done')" @click="importBuiInfo()">导入详情</el-button>
        </div>
        <div class="right_btn">
          <el-button
            class="delete"
            type="danger"
            @click="deleteData"
            size="mini"
            style="padding-bottom: 7px;margin-top: 0px;"
            :disabled="(this.$route.query.activityName == '审批')"
            v-if="hasPerm('fygl_fyxxkw_dxx_sc') && !(this.$route.params.state == 'done') "
          >删除</el-button>
        </div>
      </div>
      <!--结果列表-->
      <div class="table-list" style="margin-top: 10px;margin-bottom:10px;">
        <el-table
          :data="buildingData"
          border
          @cell-dblclick="goDetail"
          @selection-change="handleSelectionChange"
          @row-click="clickRow"
          ref="houseTable"
          size="mini"
          style="width: 100%"
          class="w100"
          :header-cell-style="{
            background: '#E6F0FC',
            color: '#606266',
            'text-align': 'center',
            'border-color': '#DBDBDB'
          }"
          :row-class-name="tableRowClassName"
          :cell-style="statusStyle"
        >
          <el-table-column type="selection" width="44"></el-table-column>
          <el-table-column prop="districtName" label="小区名称"></el-table-column>
          <el-table-column prop="code" label="栋号"></el-table-column>
          <el-table-column prop="name" label="栋名称"></el-table-column>
          <el-table-column prop="elevatorName" label="是否带电梯"></el-table-column>
          <el-table-column prop="floorCount" label="总楼层数"></el-table-column>
          <el-table-column prop="skirtFloorCount" label="裙楼层数"></el-table-column>
          <el-table-column prop="landNo" label="宗地号"></el-table-column>
          <el-table-column
            label="操作"
            width="200px"
            v-if="!((this.$route.params.state == 'done')||(this.$route.query.activityName == '审批'))"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="goDetail(scope.row)"
                v-if="hasPerm('fygl_fyxxkw_dxx_ck')"
              >编辑</el-button>
              <el-button
                type="warning"
                size="mini"
                v-if="scope.row.state == 0"
                @click="recoverBuildingInfo(scope.row)"
              >恢复</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="deleteBuilding(scope.row)"
                :disabled= !scope.row.isEdit 
                v-if="hasPerm('fygl_fyxxkw_dxx_sc') "
              >删除</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100px"
            v-if="this.$route.params.state == 'done'||(this.$route.query.activityName == '审批')"
          >
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="goDetail(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页功能 -->
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
      <!-- 弹框 -->
      <!-- 导入详情弹框 -->
      <el-dialog
      title="导入详情"
      :visible.sync="openDialog"
      width="80%"
      :close-on-click-modal="false"
    >
      <el-button type="primary" size="mini" @click="deBuildingReInfo()">删除</el-button>
      <i style="color:red;font-size:18px;">总共{{importInfo.totalNumber}}条数据！</i>
      <div class="table-list" style="margin-top: 10px;margin-bottom:10px;">
        <el-table
          :data="DetailList"
          border
          @selection-change="selectedList"
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="DONGH" label="栋号"></el-table-column>
          <el-table-column prop="DONGMC" label="栋名称"></el-table-column>
          <el-table-column prop="WANGGBBM" label="网格办编码"></el-table-column>
          <el-table-column prop="DANYS" label="单元数"></el-table-column>
          <el-table-column prop="ZONGLC" label="总楼层数"></el-table-column>
          <el-table-column prop="QUNLCS" label="裙楼层数"></el-table-column>
          <el-table-column prop="DIXCS" label="地下层数"></el-table-column>
          <el-table-column prop="SHIFDDT" label="是否带电梯"></el-table-column>
          <el-table-column prop="JIANZJG" label="建筑结构"></el-table-column>
          <el-table-column prop="JIANZJC" label="建筑基础"></el-table-column>
          <el-table-column prop="JIANZMJ" label="建筑面积"></el-table-column>
          <el-table-column prop="JIDMJ" label="基地面积"></el-table-column>
          <el-table-column prop="DICYT" label="底层用途"></el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editBuildingReInfo(scope.row)">编辑</el-button>
              <el-button type="primary" size="mini" @click="deBuildingReInfo(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="importSizeChange"
            @current-change="importCurrentChange"
            :current-page="importInfo.currentPage"
            :page-sizes="importInfo.pageSizesList"
            :page-size="importInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="importInfo.totalNumber"
            background
          ></el-pagination>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";
// import UploadFile from "@/components/UploadFile";
import { mapGetters } from "vuex";
import http from "@/api/housestore.js";
import api from "@/api/publicMethod";
export default {
 
  data() {
    return {
      options: [
        { value: true, label: "是", name: "是" },
        { value: false, label: "否", name: "否" }
      ],
      buildingData: [], //栋列表信息
      form: {
        pageIndex: 1,
        pageSize: 100
      }, //表单
      buildingUseType: [], //栋用途下拉列表
      //分页需要的数据
      currentPage: 1,
      pageNo: 1,
      pageSize: 100,
      pageSizesList: [100, 200, 500, 1000],
      totalNumber: 0, //数据的总数
      selectedData: [], //选中的数据
      guidList: [], //选中的guid
      state: [],
      distributionSubject: [],
      guid: "", //小区的guid
      taskId: "", //任务taskID
      PID: "", //PID
      show: true, //按钮的显隐
      openDialog: false,//导入详情弹框控制显隐
      DetailList: [], //导入详情列表
      //导入详情列表的分页
      importInfo: {
        currentPage: 1,
        pageSize: 50,
        pageSizesList: [50, 100, 200, 500, 1000, 2000],
        totalNumber: 0 //数据的总数
      },
      downloadListSelect: [], //导入详情列表选中的数据
     
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.state == 0) {
        return "background:#f2dede";
      } else if (rowIndex === 3) {
        return "text-align:center;border-color:#DBDBDB";
      }
      return "";
    },
    //使删除的情况下，高亮显示
    statusStyle({ row, column, rowIndex, columnIndex }) {
      if (this.buildingData[rowIndex].state == 0) {
        return "background:#f2dede;text-align:center;border-color:#DBDBDB";
      } else {
        return "text-align:center;border-color:#DBDBDB";
      }
    },
    //验证只能输入正整数
    proving1() {
      this.form.unitCount = this.form.unitCount.replace(/[^\.\d]/g, "");
      this.form.unitCount = this.form.unitCount.replace(".", "");
    },
    proving2() {
      this.form.floorCount = this.form.floorCount.replace(/[^\.\d]/g, "");
      this.form.floorCount = this.form.floorCount.replace(".", "");
    },
    proving3() {
      this.form.skirtFloorCount = this.form.skirtFloorCount.replace(
        /[^\.\d]/g,
        ""
      );
      this.form.skirtFloorCount = this.form.skirtFloorCount.replace(".", "");
    },
    proving4() {
      this.form.subFloorCount = this.form.subFloorCount.replace(/[^\.\d]/g, "");
      this.form.subFloorCount = this.form.subFloorCount.replace(".", "");
    },
    //重置
    reset() {
      this.form = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
    },
    //table选中数据
    handleSelectionChange(val) {
      this.selectedData = val;
    },
    //单行选中
    clickRow(row) {
      this.$refs.houseTable.toggleRowSelection(row);
    },
    //改变页面显示条数
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.getBuildingList(1);
    },
    //currentchnage改变
    handleCurrentChange(val) {
      this.form.pageIndex = val;
      this.getBuildingList();
    },
    //保存栋
    saveBuilding(val) {
      let params = {
        bulidingGuid: val.guid
      };
      http
        .saveClickBuilding(params)
        .then(res => {
          console.log(res)
          if (res) {
            let name = val.name;
            this.$parent.openTab({
              id: val.guid,
              label: val.name || "栋详情",
              closable: true,
              meta: {
                bulidingGuid: val.guid,
                state: "check",
                menuId: "3"
              },
              component: () =>
                import(
                  "@/views/houseManagement/correcthouseinfo/BuildingDetail"
                )
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //恢复栋
    recoverBuildingInfo(val) {
      let params = {
        bulidingGuid: val.guid,
        districtGuid: val.districtGuid,
        projectId: this.PID
      };
      http
        .restoreBuilding(params)
        .then(res => {
          this.$message.success("恢复栋成功");
          this.getBuildingList();
          this.Event.$emit("BuildingDetail", "getBuildingInfo");
          this.Event.$emit("CorrectApply", "changeDetail");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除某一栋
    deleteBuilding(val) {
      if (this.selectedData.length) {
        this.$confirm("是否确定删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.guidList.push(val.guid);
            let params = {
              projectId: this.PID
            };
            let data = this.guidList;
            this.guidList = []; //清空前端数据
            http
              .deleteBuilding(params, data)
              .then(res => {
                this.$message.success("删除成功");
                this.getBuildingList();
                this.Event.$emit("BuildingDetail", "getBuildingInfo");
                this.Event.$emit("CorrectApply", "changeDetail");
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      }
    },
    //获取字典
    getDictionary() {
      let namesArr = ["住宅类型"];
      let params = {
        names: namesArr.toString()
      };
      http
        .getDictionary(params)
        .then(res => {
          this.buildingUseType = JSON.parse(res).住宅类型;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取楼栋列表
    getBuildingList(index) {
      if (index) {
        this.form.pageIndex = index;
      }
      this.form.districtGuid = this.guid;
      let params = this.form;
      http
        .getBuildingPage(params)
        .then(res => {
          this.buildingData = res.content;
          this.totalNumber = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除
    deleteData() {
      if (this.selectedData.length) {
        this.$confirm("是否确定删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.selectedData.forEach(element => {
              this.guidList.push(element.guid);
            });
            let params = {
              projectId: this.PID
            };
            let data = this.guidList;
            this.guidList = []; //清空前端数据
            http
              .deleteBuilding(params, data)
              .then(res => {
                this.$message.success("删除成功");
                this.show = false;
                this.getBuildingList();
                this.Event.$emit("BuildingDetail", "getBuildingInfo");
                this.Event.$emit("CorrectApply", "changeDetail");
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      }
    },
    //获取流程数据
    getProcessInfo() {
      let params = {
        taskId: this.taskId
      };
      api
        .getProcessInfo(params)
        .then(res => {
          this.PID = res[0].PID;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //双击，去到详情页
    goDetail(val) {
      this.saveBuilding(val);
    },
    //下载模板-按钮
    downloadTemplate() { 
      let url = process.env.API + "/house/store/build/download";
      var elemIF = document.createElement("iframe");
      elemIF.src = url;
      elemIF.style.display = "none";
      elemIF.onload = function() {
        setTimeout(function() {
          elemIF.remove();
        }, 2000);
      };
      document.body.appendChild(elemIF);
    },
   
    //导入面积
    uploadFile(context) {
      //启动loading加载框
      this.$startLoading();
      let params = { districtGuid: this.guid, pid: this.PID };
      let data = new FormData();
      data.append("file", context.file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      http.reportHouseBuildInfo(params, data, config).then(res => {
          if(res != null ){
            if (res.data === undefined) {
              this.dialogErrorVisible = true;
              this.error = res;
            }else{
              this.$alert("上传成功", "提示");
            }
          }
          this.getBuildingList();
          this.$endLoading();
        })
        .catch(err => {
          console.log(err);
          this.$endLoading();
        });
    },
    //获取导入信息弹框内列表数据
    getBuildingReInfo() {
      let params = {
        districtGuid: this.guid, 
        pid: this.PID, 
        pageSize: this.importInfo.pageSize,
        pageIndex: this.importInfo.currentPage
      };
      http.getBuildingReInfo(params).then(res => {
        this.DetailList = res.content;
        this.importInfo.totalNumber = res.totalElements
      }).catch(err => {
        console.log(err)
      })
    },
    //导入详情-按钮
    importBuiInfo() {
      this.openDialog = true;
      this.getBuildingReInfo() //获取列表信息
      
    },
    //导入详情弹框内-删除
    deBuildingReInfo(val) {
      this.$confirm('是否确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = { pid: this.PID };
        let data = [];
        if (val) {
          data = [val.GUID];
        } else {
          data = this.downloadListSelect;
        }
        http.deleteBuildingReInfo(params, data).then(res => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.getBuildingReInfo();
        })
        .catch(err => {
          console.log(err);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    //导入列表选中的数据
    selectedList(val) {
      this.downloadListSelect = [];
      console.log(val)
      if (val) {
        val.forEach(ele => {
          this.downloadListSelect.push(ele.GUID);
        });
      }
    },
     //查询导入详情列表Size改变时
    importSizeChange(val) {
      this.importInfo.pageSize = val;
      this.getBuildingReInfo();
    },
    //查询导入详情列表currentPage改变时
    importCurrentChange(val) {
      this.importInfo.currentPage = val;
      this.getBuildingReInfo();
    },
    //导入详情-弹框内编辑按钮
    editBuildingReInfo(val) {
      this.openDialog = false;
      this.$parent.openTab({
        id: 'dongxq_01',
        label: val.DONGMC || "栋详情",
        closable: true,
        component: () => import("@/views/houseManagement/correcthouseinfo/BuildingDetail"),
        meta:{
          bulidingGuid: val.DONGBS
        }
      })
    }
  },
  mounted() {
    this.Event.$on("CorrectBuilding", data => {
      if (data == "getBuildingList") {
        this.getProcessInfo();
        this.getBuildingList();
      }
    });
  },
  created() {
    this.guid = this.$parent.params.districtGuid; //小区的guid
    this.taskId = this.$parent.params.taskId; //任务ID
    if (this.guid) {
      this.getBuildingList();
    }
    if (this.taskId) {
      this.getProcessInfo();
    }
    this.getDictionary();
  }
};
</script>

<style lang="scss" scoped>
.el-table tr {
  background: "#f2dede";
}
.delete {
  margin-top: 2%;
}
.CorrectBuilding {
  .top {
    background: #fff;
    padding: 10px 20px 5px 20px;
    .el-form-item {
      margin-bottom: 10px;
    }
    .el-form-item /deep/ .el-form-item__label {
      text-align: left;
    }
    .float {
      float: right;
    }
    .w100 {
      width: 100%;
    }
  }
  .newBatch {
    margin-top: 20px;
  }
  .table-list {
    margin-top: 20px;
    background: #fff;
    & /deep/ .el-table__body tr.current-row > td {
      background: #f7f1ec !important;
    }
    & /deep/ .el-table--border {
      border-color: #dbdbdb;
    }
  }
}
.aside-btn {
  width: 100%;
  height: 30px;
  position: relative;
  .right_btn {
    position: absolute;
    right: 0px;;
  }
  .left_btn{
    position: absolute;
    left:0px;
  }
}
</style>
