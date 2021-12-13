<template>
  <div>
    <TitleStylex title="性质变更申请批次信息">
      <el-button
        slot="publicTitleRight"
        type="primary"
        size="mini"
        v-if="show && hasPerm('fygl_fyxzbg_bgsqxx_bc')"
        @click="saveChangeInfo"
      >保存</el-button>
    </TitleStylex>
    <div class="tableStyle">
      <table :model="form" class="detail">
        <tr>
          <td class="must">批次名称</td>
          <td>
            <el-input
              v-model="form.batchName"
              :disabled="(this.$parent.params.activityName=='审批'||this.$route.query.state=='done')"
            ></el-input>
          </td>
          <td class="must">批次编号</td>
          <td>
            <el-input v-model="form.code" disabled></el-input>
          </td>
        </tr>
        <tr>
          <td class="must">请选择变更后房屋性质</td>
          <td colspan="3">
            <el-select
              style="width: 100%;"
              placeholder="请选择"
              v-model="form.nature"
              :disabled="(this.$parent.params.activityName=='审批'||this.$route.query.state=='done')"
            >
              <el-option
                v-for="(item,index) in natureType"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="must">变更依据</td>
          <td colspan="3">
            <el-input
              v-model="form.changeBasis"
              :disabled="(this.$parent.params.activityName=='审批'||this.$route.query.state=='done')"
              cols="145"
              rows="8"
              type="textarea"
            ></el-input>
          </td>
        </tr>
      </table>
    </div>
    <publicTitle title="选中房列表"></publicTitle>
    <div class="table">
      <el-table
        :data="selectHouseInfo"
        border
        size="mini"
        :header-cell-style="{
					'background': '#E6F0FC',
					'color': '#606266',
					'text-align':'center',
					'border-color': '#DBDBDB',
					}"
        :cell-style="{
					'text-align':'center',
					'border-color': '#DBDBDB',
					}"
      >
        <el-table-column label="序号" width="80" type="index" :index="indexMethod"></el-table-column>
        <el-table-column prop="districtName" label="小区名称"></el-table-column>
        <el-table-column prop="buildName" label="栋号"></el-table-column>
        <el-table-column prop="houseNo" label="房号"></el-table-column>
        <el-table-column prop="typeName" label="户型"></el-table-column>
        <el-table-column prop="coveredArea" label="预测绘建筑面积(平方米)"></el-table-column>
        <el-table-column prop="completionArea" label="竣工建筑面积(平方米)"></el-table-column>
        <el-table-column prop="stateName" label="房屋状态"></el-table-column>
        <el-table-column prop="natureName" label="房屋性质（变更前）" width="140"></el-table-column>
        <el-table-column prop="changeAfterNatureName" label="房屋性质（变更后）" width="140"></el-table-column>
      </el-table>
      <div class="page_box">
        <el-pagination
          @size-change="handleHouseSizeChange"
          @current-change="handleHouseCurrentChange"
          :current-page="selectHousePage.currentPage"
          :page-sizes="selectHousePage.pageSizesList"
          :page-size="selectHousePage.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="selectHousePage.totalNumber"
          background
        ></el-pagination>
      </div>
    </div>
    <div v-if="this.opinionList.length||(this.activityName=='审批')">
      <publicTitle title="审核意见"></publicTitle>
      <el-table
        :data="opinionList"
        border
        size="mini"
        :header-cell-style="{
                        'background': '#E6F0FC',
                        'color': '#606266',
                        'text-align':'center',
                        'border-color': '#DBDBDB',
                        }"
        :cell-style="{
                        'text-align':'center',
                        'border-color': '#DBDBDB',
                        }"
      >
        <el-table-column prop="activitySource" label="环节"></el-table-column>
        <el-table-column prop="dealer" label="办理人"></el-table-column>
        <el-table-column prop="dealTime" label="办理时间"></el-table-column>
        <el-table-column prop="remark" label="办理意见"></el-table-column>
      </el-table>
    </div>
    <div class="checkBox" v-if="this.show">
      <el-form>
        <el-row :gutter="20">
          <el-form-item label="当前环节:" label-width="5rem">
            <span class="process_p">{{activityName}}</span>
          </el-form-item>
          <el-form-item label="办理意见:" label-width="5rem">
            <!-- <el-input type="textarea" v-model="auditInfo.opinion" style="width:99%"></el-input> -->
            <ContextTextarea v-model="auditInfo.opinion" :list="commonWords"></ContextTextarea>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div style="text-align:center;margin-top:10px;">
      <el-button
      type="warning"
      size="mini"
      v-if="this.activityName == '审批' && this.show && hasPerm('fygl_fyxzbg_shbtg')"
      @click="failToPass()"
      >审核不通过</el-button>
      <el-button
        type="primary"
        size="mini"
        v-if="(this.activityName=='审批') && this.show && hasPerm('fygl_fyxzbg_thsyhj')"
        @click="returnBack"
      >退回上一环节</el-button>
      <el-button
        type="primary"
        size="mini"
        v-if="this.show && hasPerm('fygl_fyxzbg_tj')"
        @click="submit"
      >提交</el-button>
    </div>
  </div>
</template>

<script>
import publicTitle from "@/components/TitleStyle"; //标题组件
import TitleStylex from "@/components/TitleStylex";
import ContextTextarea from "@/components/ContextTextarea"; //常用意见组件
import api from "@/api/natureChange";
import http from "@/api/housestore.js";
import publicMethod from "@/api/publicMethod";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "natureChangeApplyInfo",
  components: {
    publicTitle, //标题公共组件
    TitleStylex, //标题公共组件
    ContextTextarea
  },
  data() {
    return {
      taskId: "", //taskid
      code: "", //批次代码
      state: "", //状态
      PID: "", //pid的值
      activityName: "", //当前环节名
      form: {
        batchName: "",
        code: "",
        nature: "",
        changeBasis: ""
      }, //性质变更申请批次信息
      selectHouseInfo: [], //选中房的数据
      selectHousePage: {
        //选中房的分页的数据
        currentPage: 1,
        pageSize: 10,
        pageSizesList: [10, 20, 30, 40],
        totalNumber: 0
      },
      natureType: [],
      auditInfo: {
        //审核信息
        result: "", //办理结果
        opinion: "" //办理意见
      },
      tableData: [],
      opinionList: [], //审核意见列表
      currentPage: 1,
      pageSize: 10,
      pageSizesList: [10, 20, 30, 40],
      totalNumber: 0,
      target: "",
      activityName: "",
      show: true, //页面显示
      commonWords: [] //办理意见常用语
    };
  },
  methods: {
    //得到每页的编号
    indexMethod(index) {
      return (
        index +
        (this.selectHousePage.currentPage - 1) * this.selectHousePage.pageSize +
        1
      );
    },
    //获取流程数据
    getProcessInfo() {
      let params = {
        taskId: this.taskId
      };
      publicMethod
        .getProcessInfo(params)
        .then(res => {
          this.activityName = res[0].ACTIVITYNAME;
          this.$parent.params.activityName = res[0].ACTIVITYNAME;
          this.PID = res[0].PID;
          this.$parent.params.PID = res[0].PID;
          this.getOpionionList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //提交下一环节保存办理意见
    saveOpinion() {
      let data = {
        activitySource: this.activityName, //来源环节
        businessType: "房源性质变更", //业务类型
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
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存暂存意见
    saveTempOpinion() {
      if (this.taskId && this.activityName && this.PID) {
        let params = { taskId: this.taskId };
        let data = {
          activitySource: this.activityName, //来源环节
          businessType: "房源性质变更", //业务类型
          dealTime: new Date(), //办理时间
          dealer: this.loginer, //办理人
          pid: this.PID,
          remark: this.auditInfo.opinion //办理意见
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
      }
    },
    //性质变更信息保存
    saveChangeInfo() {
      if (!this.form.batchName) {
        this.$alert("无法保存信息，请输入批次名称", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.form.nature) {
        this.$alert("无法保存信息，请输入变更后房屋性质", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.form.changeBasis) {
        this.$alert("无法保存信息，请输入变更依据", "提示", {
          confirmButtonText: "确定"
        });
      } else {
        this.$confirm("此操作将进行保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$startLoading();
            let params = {
              batchName: this.form.batchName,
              afterChangeName: this.form.nature,
              changeBasis: this.form.changeBasis,
              code: this.form.code
            };
            let data = [];
            if (this.selectHouseInfo) {
              this.selectHouseInfo.forEach(ele => {
                data.push(ele.guid);
              });
            }
            api
              .saveChangeInfo(params, data)
              .then(res => {
                //没选中房的之前的保存
                if (data.length == 0 && !this.form.code) {
                  this.form.code = res.Code;
                  this.activityName = res.activityName;
                  this.$parent.params.guid = res.Code;
                  this.$parent.params.activityName = res.activityName;
                  this.$parent.params.taskId = res.TID;
                  this.$route.params.guid = res.Code;
                  this.$route.params.guid = res.TID;
                  if (res.TID) {
                    this.openCahe(res.TID);
                    let val = {};
                    val.XMBS = res.Code;
                    val.TID = res.TID;
                    val.state = "todo";
                    this.closeTopTab();
                    this.openDetail(val);
                  }
                } else {
                  this.getChangeInfo(1);
                }
                this.Event.$emit(
                  "NatureChangeTodoBox",
                  "natureChangeTodoSearch"
                );
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.$endLoading()
              })
              .catch(err => {
                this.$message({
                  message: "保存失败",
                  type: "warning"
                });
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消保存"
            });
            this.$endLoading()
          });
      }
      this.saveTempOpinion();
    },
    //重新到变更申请信息
    openDetail(row) {
      let tab = {
        label: row.XMBS || "新增性质变更申请批次",
        name: "natureChangeTab",
        params: {
          guid: row.XMBS,
          taskId: row.TID
        },
        query: {
          state: row.state
        }
      };
      this.closeTopTab(tab);
      this.openTopTab(tab);
    },
    //领取任务
    openCahe(val) {
      let params = {
        taskId: val
      };
      http
        .openCache(params)
        .then(res => {
          console.log("领取任务成功");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //性质变更申请批次信息查询
    getChangeInfo(index) {
      if (index) {
        this.selectHousePage.currentPage = index;
      }
      let params = {
        code: this.code,
        pageIndex: this.selectHousePage.currentPage,
        pageSize: this.selectHousePage.pageSize
      };
      publicMethod
        .getNatureChangeDetailInfo(params)
        .then(res => {
          this.form.batchName = res.name;
          this.form.code = res.code;
          this.form.nature = res.nature;
          this.form.changeBasis = res.changeBasis;
          this.selectHouseInfo = res.houseInfoDTOPage.content;
          this.selectHousePage.totalNumber = res.houseInfoDTOPage.totalElements;
          this.$endLoading()
        })
        .catch(err => {
          console.log(err);
        });
    },
    //pagesize的大小改变
    handleHouseSizeChange(val) {
      this.selectHousePage.pageSize = val;
      this.getChangeInfo(1);
    },
    //pageIndex改变的时候
    handleHouseCurrentChange(val) {
      this.selectHousePage.currentPage = val;
      this.getChangeInfo();
    },
    //提交
    submit() {
      if (this.selectHouseInfo.length == 0) {
        this.$alert("无法提交下一环节，请前去房源信息界面去选房", "提示", {
          confirmButtonText: "确定"
        });
      } else if (!this.auditInfo.opinion) {
        this.$alert("请填写办理意见", "提示")
      }else {
      let params = {
        activityName: this.activityName,
        code: this.code,
        taskId: this.taskId
      };
      let data = {};
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      api
        .submit(params, data)
        .then(res => {
          if (res) {
            //待办箱刷新广播
            this.Event.$emit("NatureChangeTodoBox", "natureChangeTodoSearch");
            //已办箱刷新广播
            this.Event.$emit("NatureChangeDoneBox", "natureChangeDoneSearch");
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.saveOpinion();
            this.closeTopTab();
            loading.close()
          }
        })
        .catch(err => {
          console.log(err);
          loading.close()
        });
      }
    },
    //流程回退
    returnBack() {
      if(!this.auditInfo.opinion) {
        this.$alert("请填写办理意见", "提示")
      } else {
        let params = {
          activityName: this.activityName,
          code: this.code,
          taskId: this.taskId
        };
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        api
          .returnBack(params)
          .then(res => {
            if (res) {
              //待办箱刷新广播
              this.Event.$emit("NatureChangeTodoBox", "natureChangeTodoSearch");
              //已办箱刷新广播
              this.Event.$emit("NatureChangeDoneBox", "natureChangeDoneSearch");
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.saveOpinion();
              this.closeTopTab();
              loading.close()
            }
          })
          .catch(err => {
            console.log(err);
            loading.close()
          });
      }
    },
    //审核不通过
    failToPass() {
      if(!this.auditInfo.opinion) {
        this.$alert("请填写办理意见", "提示")
      } else {
        let params = {
          code: this.code
        };
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        http.failToPass(params).then(res => {
          //待办箱刷新广播
          this.Event.$emit("NatureChangeTodoBox", "natureChangeTodoSearch");
          //已办箱刷新广播
          this.Event.$emit("NatureChangeDoneBox", "natureChangeDoneSearch");
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.saveOpinion();
          this.closeTopTab();
          loading.close()
        }).catch(err => {
          console.log(err)
          loading.close()
        })
      }
    },
    //得到当前登录人
    getLoginer() {
      let params = {};
      http
        .getLoginer(params)
        .then(res => {
          this.loginer = res.userName;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取字典
    getDictionary() {
      let namesArr = ["房屋性质", "办理意见常用语"];
      let params = {
        names: namesArr.toString()
      };
      http
        .getDictionary(params)
        .then(res => {
          res = JSON.parse(res);
          this.natureType = this.$dictionaryChange(
            res.房屋性质,
            this.natureType,
            "现房源性质"
          );
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
    this.Event.$on("NatureChangeApplyInfo", data => {
      if (data == "getChangeInfo") {
        this.getChangeInfo(1);
      }
    });
  },
  created() {
    this.taskId = this.$route.params.taskId;
    this.code = this.$route.params.guid;
    this.state = this.$route.query.state;
    this.$parent.params.taskId = this.$route.params.taskId;
    this.$parent.params.guid = this.$route.params.guid;
    this.$parent.params.state = this.$route.query.state;
    this.getDictionary();
    this.getLoginer();
    if (this.state == "new") {
    } else if (this.state == "todo") {
      if (this.activityName == "审批") {
        this.show = false;
      } else if (this.activityName == "受理") {
        this.show = true;
      }
      this.getProcessInfo();
      this.getTempOpinion();
      this.getChangeInfo();
    } else if (this.state == "done") {
      this.show = false;
      this.getProcessInfo();
      this.getTempOpinion();
      this.getChangeInfo();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>