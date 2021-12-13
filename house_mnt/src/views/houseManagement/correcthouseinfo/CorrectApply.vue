<template>
  <div class="correctApply">
    <TitleStylex title="勘误信息列表">
      <el-button
        slot="publicTitleRight"
        size="mini"
        type="primary"
        @click="saveCorrectInfo"
        v-if="!(this.$route.params.state == 'done') && hasPerm('fygl_fyxxkw_kwsqxx_bc')"
      >保存</el-button>
    </TitleStylex>
    <div class="table">
      <el-table
        :data="changeInfo"
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
        <el-table-column prop="type" label="勘误对象"></el-table-column>
        <el-table-column label="勘误类型" width="200">
          <template slot-scope="scope">
            {{scope.row.changeGuid}}
            <el-button
              type="primary"
              size="mini"
              @click="openGroundDetailDialog(scope.row)"
              v-if="scope.row.changeGuid=='新增宗地号'"
            >详情</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="openDownloadDetailDialog(scope.row, 'area')"
              v-if="scope.row.changeGuid=='导入面积'"
            >详情</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="openDownloadDetailDialog(scope.row, 'building')"
              v-if="scope.row.changeGuid=='导入栋信息'"
            >详情</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="openDownloadDetailDialog(scope.row, 'housing')"
              v-if="scope.row.changeGuid=='导入房屋信息'"
            >详情</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="changeItem" label="勘误项"></el-table-column>
        <el-table-column prop="changeBefore" label="勘误前"></el-table-column>
        <el-table-column prop="changeAfter" label="勘误后"></el-table-column>
        <el-table-column prop="changeTime" label="勘误时间"></el-table-column>
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
    <publicTitle title="勘误申请信息"></publicTitle>
    <div>
      <table class="correct">
        <tr>
          <td class="must">勘误依据</td>
          <td colspan="3">
            <el-input
              v-model="correctForm.according"
              :disabled="accordingControl||this.$route.params.state=='done'"
              rows="10"
              cols="500"
              type="textarea"
            ></el-input>
          </td>
        </tr>
      </table>
    </div>
    <div v-if="this.opinionList.length || this.activityName == '审批'">
      <publicTitle title="审核意见"></publicTitle>
      <el-table
        :data="opinionList"
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
        <el-table-column prop="activitySource" label="环节"></el-table-column>
        <el-table-column prop="dealer" label="办理人"></el-table-column>
        <el-table-column prop="dealTime" label="办理时间"></el-table-column>
        <el-table-column prop="remark" label="办理意见"></el-table-column>
      </el-table>
    </div>
    <div class="checkBox" v-if="this.flag">
      <el-form>
        <el-row :gutter="20">
          <el-form-item label="当前环节:" label-width="5rem">
            <span class="process_p">{{ activityName }}</span>
          </el-form-item>
          <el-form-item label="办理意见:" label-width="5rem">
            <ContextTextarea v-model="auditInfo.opinion" :list="commonWords"></ContextTextarea>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div style="text-align:center">
      <el-button
        type="primary"
        size="mini"
        @click="sendback()"
        v-if="(this.activityName=='审批')&&this.flag && hasPerm('fygl_fyxxkw_kwsqxx_thsyhj')"
      >退回上一环节</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="submitNext()"
        v-if="this.flag && hasPerm('fygl_fyxxkw_kwsqxx_tj')"
      >提交</el-button>
    </div>
    <!--新增宗地号 详情-->
    <el-dialog
      title="查看详情"
      :visible.sync="groundDetailDialog"
      width="60%"
      :close-on-click-modal="false"
    >
      <div class="tableStyle">
        <table :model="groundDetail">
          <tr>
            <td class="must">小区编号</td>
            <td>
              <el-input v-model="groundDetail.districtCode" disabled></el-input>
            </td>
            <td class="must">宗地号</td>
            <td>
              <el-input v-model="groundDetail.landNo" disabled></el-input>
            </td>
          </tr>
          <tr>
            <td class="must">土地合同号</td>
            <td>
              <el-input v-model="groundDetail.contractNo" disabled></el-input>
            </td>
            <td>土地补充合同号</td>
            <td>
              <el-input v-model="groundDetail.contractNoAdded" disabled></el-input>
            </td>
          </tr>
          <tr>
            <td class="must">土地面积</td>
            <td>
              <el-input v-model="groundDetail.landArea" disabled></el-input>
            </td>
            <td class="must">土地用途</td>
            <td>
              <el-input v-model="groundDetail.landUsed" disabled></el-input>
            </td>
          </tr>
          <tr>
            <td class="must">使用期始</td>
            <td>
              <el-date-picker
                v-model="groundDetail.useStart"
                type="date"
                disabled
                placeholder="选择日期"
                style="width:100%"
              ></el-date-picker>
            </td>
            <td class="must">使用期止</td>
            <td>
              <el-date-picker
                v-model="groundDetail.useEnd"
                type="date"
                disabled
                placeholder="选择日期"
                style="width:100%"
              ></el-date-picker>
            </td>
          </tr>
          <tr>
            <td class="must">所在区</td>
            <td>
              <el-select v-model="groundDetail.area" disabled style="width:100%">
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
              <el-input v-model="groundDetail.roadName" disabled></el-input>
            </td>
          </tr>
          <tr>
            <td>说明</td>
            <td colspan="3">
              <el-input v-model="groundDetail.remark" disabled></el-input>
            </td>
          </tr>
        </table>
      </div>
    </el-dialog>
    <!-- 导入面积 详情 -->
    <el-dialog
      title="查看详情"
      :visible.sync="downloadDetailDialog"
      width="60%"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <div class="table-list" style="margin-top: 10px;margin-bottom:10px;">
        <el-table
          :data="downloadDetailList"
          border
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column>
          <el-table-column prop="DONGH" label="栋号"></el-table-column>
          <el-table-column prop="DONGMC" label="栋名称"></el-table-column>
          <el-table-column prop="FANGH" label="房号"></el-table-column>
          <el-table-column prop="JUNGMJ" label="竣工建筑面积(平方米)"></el-table-column>
          <el-table-column prop="JUNGGTMJ" label="竣工分摊面积(平方米)"></el-table-column>
          <el-table-column prop="JUNGTNMJ" label="竣工套内面积(平方米)"></el-table-column>
        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="importAreahandleSizeChange"
            @current-change="importAreahandleCurrentChange"
            :current-page="importAreaInfoPage.currentPage"
            :page-sizes="importAreaInfoPage.pageSizesList"
            :page-size="importAreaInfoPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="importAreaInfoPage.totalNumber"
            background
          ></el-pagination>
        </div>
      </div>
    </el-dialog>
    <!-- 导入栋信息详情 -->
    <el-dialog
      title="导入详情"
      :visible.sync="openBuildingDialog"
      width="80%"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <div class="table-list" style="margin-top: 10px;margin-bottom:10px;">
        <el-table
          :data="downloadDetailList"
          border
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
        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="importAreahandleSizeChange"
            @current-change="importAreahandleCurrentChange"
            :current-page="importAreaInfoPage.currentPage"
            :page-sizes="importAreaInfoPage.pageSizesList"
            :page-size="importAreaInfoPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="importAreaInfoPage.totalNumber"
            background
          ></el-pagination>
        </div>
      </div>
    </el-dialog>
    <!-- 导入房屋信息详情 -->
    <el-dialog
      title="查看详情"
      :visible.sync="openDialog"
      width="80%"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <div class="table-list" style="margin-top: 10px;margin-bottom:10px;">
          <el-table
          :data="downloadDetailList"
          border
          :header-cell-style="globalHeaderStyle"
          :cell-style="globalCellStyle"
        >
          <el-table-column type="index" label="序号" width="40"></el-table-column>
          <el-table-column prop="DONGH" label="栋号"></el-table-column>
          <el-table-column prop="DONGMC" label="栋名称"></el-table-column>
          <el-table-column prop="FANGH" label="房号"></el-table-column>
          <el-table-column prop="WANGGBBM" label="网格办编码"></el-table-column>
          <el-table-column prop="HUX" label="户型"></el-table-column>
          <el-table-column prop="CHAOX" label="朝向"></el-table-column>
          <el-table-column prop="SUOZLC" label="所在楼层"></el-table-column>
          <el-table-column prop="FANGCLY" label="房屋来源"></el-table-column>
          <el-table-column prop="JUNGMJ" label="竣工建筑面积"></el-table-column>
        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="importAreahandleSizeChange"
            @current-change="importAreahandleCurrentChange"
            :current-page="importAreaInfoPage.currentPage"
            :page-sizes="importAreaInfoPage.pageSizesList"
            :page-size="importAreaInfoPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="importAreaInfoPage.totalNumber"
            background
          ></el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import publicTitle from "@/components/TitleStyle"; //标题组件
import TitleStylex from "@/components/TitleStylex";
import ContextTextarea from "@/components/ContextTextarea"; //常用意见组件
import http from "@/api/housestore.js";
import api from "@/api/publicMethod";

export default {
  name: "correctApply",
  components: {
    publicTitle, //标题公共组件
    TitleStylex, //标题公共组件
    ContextTextarea
  },
  data() {
    return {
      form: {
        pageIndex: 1,
        pageSize: 10
      }, //变更信息里面的查询条件
      changeInfo: [], //勘误信息列表
      currentPage: 1,
      pageSize: 10,
      pageSizesList: [10, 20, 30, 40],
      totalNumber: 0, //数据的总数
      correctForm: {
        according: "" //依据
      },
      auditInfo: {
        //信息
        opinion: "" //办理意见
      },
      guid: "",
      loginer: "", //经办人
      submitTime: "", //提交时间
      opinionList: [], //暂存意见
      target: "", //表示下一环节
      Material: [], //材料的部分数据
      flag: true, //判断页面的显隐
      accordingControl: false, //判断依据是否可读
      getFlowData: "", //得到流程数据
      guid: "", //小区的guid
      taskId: "", //taskId的值
      PID: "", //pid的值
      activityName: "", //当前环节名
      commonWords: [], //办理意见常用语
      groundDetailDialog: false, //宗地详情弹框
      groundDetail: {}, //宗地详情列表
      areaData: [], //所属区
      downloadDetailDialog: false, //导入面积详情弹框
      downloadDetailList: [], //导入详情列表
      //导入详情列表的分页
      importAreaInfoPage: {
        currentPage: 1,
        pageSize: 50,
        pageSizesList: [50, 100, 200, 500, 1000, 2000],
        totalNumber: 0 //数据的总数
      },
      openDialog: false, //导入房屋信息详情弹框显隐
      openBuildingDialog: false //导入栋信息详情弹框显隐
    };
  },
  methods: {
    //得到每页的编号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    //获取流程数据
    getProcessInfo() {
      let params = {
        taskId: this.taskId
      };
      api
        .getProcessInfo(params)
        .then(res => {
          this.getFlowData = res[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取勘误信息
    changeDetail(index) {
      if (index) {
        this.form.pageIndex = index;
      }
      this.form.districtGuid = this.guid;
      this.form.projectId = this.PID;
      let params = this.form;
      http
        .changeDetail(params)
        .then(res => {
          this.changeInfo = res.changeDetailsDTOS.content;
          this.correctForm.according = res.errataBasis;
          this.submitTime = res.detailTime;
          this.totalNumber = res.changeDetailsDTOS.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //当前每页大小改变时
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.changeDetail(1);
    },
    //当前页码的改变
    handleCurrentChange(val) {
      this.form.pageIndex = val;
      this.changeDetail();
    },
    //打开宗地详情弹框
    openGroundDetailDialog(val) {
      this.groundDetailDialog = true;
      this.checkGroundDetail(val);
    },
    //查看宗地详情
    checkGroundDetail(val) {
      let params = {
        landNoGuid: val.remark,
        districtGuid: this.$parent.params.districtGuid
      };
      let data = {};
      http
        .getLandDetail(params, data)
        .then(res => {
          this.groundDetail = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //打开导入面积详情弹框
    openDownloadDetailDialog(val, element) {
      this.getImportAreaInfo(element);
      if(element == 'area') { 
        this.downloadDetailDialog = true  //面积详情弹框
      }else if(element == 'building') { 
        this.openBuildingDialog = true   //栋信息详情弹框
      }else {
        this.openDialog = true   //房屋信息详情弹框
      }
    },
    //查询**导入面积**导入详情列表
    getImportAreaInfo(element) {
      console.log(element)
      let params = {
        districtGuid: this.$parent.params.districtGuid,
        pid: this.PID,
        pageSize: this.importAreaInfoPage.pageSize,
        pageIndex: this.importAreaInfoPage.currentPage
      };
      if(element == 'area') {
        http.getImportAreaInfo(params).then(res => {
          this.downloadDetailList = res.content;
          this.importAreaInfoPage.totalNumber = res.totalElements;
        }).catch(err => {});
      }else if(element == 'building') {
        http.getBuildingReInfo(params).then(res => {
          this.downloadDetailList = res.content;
          this.importAreaInfoPage.totalNumber = res.totalElements;
        }).catch(err => {});
      }else {
        http.importDetails(params).then(res => {
          this.downloadDetailList = res.content;
          this.importAreaInfoPage.totalNumber = res.totalElements;
        }).catch(err =>{})
      }
      // http.getImportAreaInfo(params).then(res => {
      //   this.downloadDetailList = res.content;
      //   this.importAreaInfoPage.totalNumber = res.totalElements;
      // }).catch(err => {});
    },
    //查询导入详情列表Size改变时
    importAreahandleSizeChange(val) {
      this.importAreaInfoPage.pageSize = val;
      this.getImportAreaInfo();
    },
    //查询导入详情列表currentPage改变时
    importAreahandleCurrentChange(val) {
      this.importAreaInfoPage.currentPage = val;
      this.getImportAreaInfo();
    },
    //保存勘误依据
    saveCorrectInfo() {
      if (!this.correctForm.according) {
        this.$alert("无法保存信息,勘误依据不能为空", "提示", {
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
              districtGuid: this.guid,
              errataBasis: this.correctForm.according,
              projectId: this.PID
            };
            http
              .saveCorrectInfo(params)
              .then(res => {
                this.changeDetail();
                this.saveTempOpinion();
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
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
    //得到当前登录人
    getLoginer() {
      let params = {};
      http
        .getLoginer(params)
        .then(res => {
          this.loginer = res.userName;
          console.log("===", res);
        })
        .catch(err => {
          console.log(err);
        });
    },

    //提交
    submitNext() {
      console.log(this.auditInfo.opinion);
      if (!this.correctForm.according) {
        this.$alert("无法提交信息，请输入勘误依据", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.auditInfo.opinion) {
        this.$alert("无法提交信息，请输入办理意见", "提示", {
          confirmButtonText: "确定"
        });
      } else {
        this.$startLoading();
        let _params = {};
        if (this.guid && this.PID) {
          if (this.correctForm.according) {
            _params = {
              districtGuid: this.guid,
              errataBasis: this.correctForm.according,
              projectId: this.PID
            };
          }
          http
            .saveCorrectInfo(_params)
            .then(res => {
              this.changeDetail();
              // this.closeTopTab();
            })
            .catch(err => {
              console.log(err);
              
            });
        }
        let params = {
          activityName: this.activityName,
          districtGuid: this.guid,
          taskId: this.taskId,
          projectId: this.PID
        };
        http
          .submit(params)
          .then(res => {
            if (res) {
              //待办箱刷新广播
              this.Event.$emit("toreload", "makeCorrect");
              //已办箱刷新广播
              this.Event.$emit("CorrectDoneBox", "correctDoneSearch")
              this.closeTopTab();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$endLoading();
            }
          })
          .catch(err => {
            console.log(err);
            this.$endLoading();
          });
      }
      this.saveOpinion();
    },
    //流程回退
    sendback() {
      let params = {
        activityName: this.activityName,
        districtGuid: this.guid,
        taskId: this.taskId,
        projectId: this.PID
      };
      this.$startLoading();
      http
        .returnBack(params)
        .then(res => {
          if (res) {
            this.$message({
              message: "退回上一环节",
              type: "success"
            });
            this.saveOpinion();
            this.Event.$emit("toreload", "makeCorrect");
            //已办箱刷新广播
            this.Event.$emit("CorrectDoneBox", "correctDoneSearch")
            this.closeTopTab();
            this.$endLoading();
          }
        })
        .catch(err => {
          console.log(err);
          this.$endLoading();
        });
    },
    //获取办理意见列表
    getOpionionList() {
      let params = {
        pid: this.PID
      };
      http
        .getOpinion(params)
        .then(res => {
          this.opinionList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取暂存意见
    getTempOpinion() {
      let params = {
        taskId: this.taskId
      };
      http
        .getTempOpinion(params)
        .then(res => {
          this.auditInfo.opinion = res.remark;
          this.submitTime = res.dealTime;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //提交下一环节保存办理意见
    saveOpinion() {
      let data = {
        activitySource: this.activityName, //来源环节
        businessType: "房源信息勘误", //业务类型
        dealTime: new Date(), //办理时间
        dealer: this.loginer, //办理人
        pid: this.PID,
        remark: this.auditInfo.opinion
      };
      let params = { taskId: this.taskId };
      http
        .saveOpinion(params, data)
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    },
    //保存暂存意见
    saveTempOpinion() {
      let params = { taskId: this.taskId };
      let data = {
        activitySource: this.activityName, //来源环节
        businessType: "房源信息勘误", //业务类型
        dealTime: new Date(), //办理时间
        dealer: this.loginer, //办理人
        pid: this.PID,
        remark: this.auditInfo.opinion //办理意见
        // result: this.auditInfo.result //办理结果
      };
      http
        .saveTempOpinion(params, data)
        .then(res => {
          console.log("保存暂存意见成功");
          this.getTempOpinion();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取每一页的规定
    getGUID(val) {
      this.guid = val.guid;
    },
    //获取字典
    getDictionary() {
      let namesArr = ["办理意见常用语", "所属区"];
      let params = {
        names: namesArr.toString()
      };
      http
        .getDictionary(params)
        .then(res => {
          res = JSON.parse(res);
          this.areaData = res.所属区;
          this.commonWords = this.$dictionaryChange(
            res.办理意见常用语,
            this.commonWords,
            "房源分配常用意见"
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.Event.$on("CorrectApply", data => {
      if (data == "changeDetail") {
        this.changeDetail();
      }
    });
  },
  created() {
    this.guid = this.$parent.params.districtGuid;
    this.taskId = this.$parent.params.taskId;
    this.state = this.$parent.params.state;
    this.PID = this.$parent.params.PID1;
    this.activityName = this.$parent.params.ACTIVITYNAME;
    if (this.state == "new" || this.state == "todo") {
      this.flag = true;
    } else if (this.state == "done") {
      this.flag = false;
    }
    if (this.activityName) {
      if (this.activityName == "审批") {
        this.accordingControl = true;
      } else {
        this.accordingControl = false;
      }
    }
    this.changeDetail();
    this.getLoginer();
    this.getOpionionList();
    this.getTempOpinion();
    this.getDictionary(); //获取字典
  }
};
</script>

<style lang="scss" scoped>
.correctApply {
  .correct {
    width: 100%;
    margin: 20px auto;
    border-collapse: collapse;
    text-align: center;
    table-layout: fixed;
    word-break: break-all;
    tr {
      border: 1px solid #dde5f9;
    }
    td {
      font-size: 14px;
      height: 2rem;
      textarea {
        border: 1px solid #dde5f9;
      }
    }
    td:nth-child(odd) {
      width: 25%;
      background: aliceblue;
    }
  }
}
</style>
