<!--
 * @Author: 
 * @Date: 2019-12-03 
 * @LastEditors: 金雅蓓
 * @Description: 解决办理意见无记录的问题
 * @model:审核意见模块
 -->
<template>
  <div class="basicInformation-table-list">
    <el-table
      v-if="opinionShowFlag"
      :data="opinion"
      border
      class="w100"
      :header-cell-style="{
      'background': '#E6F0FC',
      'color': '#333',
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
    <div>
      <div
        v-if="endIsShow&& doneBtn != true "
        style="padding: 0 0 10px 24px"
      >当前环节：{{info.activityName}}</div>
      <div class="makeopinion" v-if="endIsShow&& doneBtn != true ">
        <div style="width:86px;margin-left:24px;" class="must">办理意见</div>
        <ContextTextarea v-model="form.opinion" :list="commonWords"></ContextTextarea>
      </div>
      <div class="foot-button" v-show="planGuid && info.activityName!='已下达' && doneBtn != true ">
        <el-button
          type="primary"
          size="small"
          v-show="info.activityName!='编制'"
          @click="planToPreNode"
          v-if="hasPerm('fyjh_jhzd_thsyhj')"
        >退回上一环节</el-button>
        <el-button
          type="primary"
          size="small"
          @click="planToNextNode"
          v-if="hasPerm('fyjh_jhzd_tjxyhj')"
        >提交下一环节</el-button>
        <el-button
          type="primary"
          size="small"
          v-show="info.activityName!='编制'"
          @click="processFail"
          v-if="hasPerm('fyjh_jhzd_shbtg')"
        >审核不通过</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ContextTextarea from "@/components/ContextTextarea"; //常用意见组件
import http from "../newplan/serve.js";
import api from "@/api/housePlan.js";
import { mapGetters } from "vuex";

export default {
  name: "moreOpinion",
  components: {
    ContextTextarea
  },
  inject: ["reload"], //注入reload方法实现刷新页面
  props: {
    opinion: Array,
    opinionShowFlag: Boolean,
    endIsShow: Boolean,
    basicFormShow: Boolean,
    info: Object,
    selectedHouseData: Array,
    planGuid: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      form: {
        opinion: "",
        dealer: ""
      },
      btnShow: false,
      tableShow: false,
      all: "",
      editNum: "",
      firstrialNum: "",
      reviewedNum: "",
      waitGiveNum: "",
      givedNum: "",
      doneBtn: false,
      commonWords: [] //办理意见常用语
    };
  },
  created() {
    //监听
    this.$root.eventHub.$on("planToNextNode", () => {
      this.planToNextNode();
    });
    this.$root.eventHub.$on("planToPreNode", () => {
      this.planToPreNode();
    });
  },
  beforeDestroy() {
    //组件销毁时结束绑定
    this.$root.eventHub.$off("planToNextNode");
    this.$root.eventHub.$off("planToPreNode");
  },
  methods: {
    //提交到下一个环节
    planToNextNode() {
      if (this.selectedHouseData.length == 0) {
        this.$message({
          message: "请前去房源界面添加房源"
        });
      } else {
        let params = {
          guid: this.planGuid
        };
        api
          .getSignatoryRightCount(params)
          .then(res => {
            if (res.signtoryRight > 0 || res.propertyRight > 0) {
              this.$alert(
                "该计划下有" +
                  res.signtoryRight +
                  "套无签约权归属，" +
                  res.propertyRight +
                  "套无房屋产权,是否导出数据?",
                "提示",
                {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消"
                }
              )
                .then(res => {
                  let url = "";
                  url =
                    process.env.API +
                    "/house/plan/signatoryRight/export" +
                    "?guid=" +
                    this.planGuid;
                  var elemIF = document.createElement("iframe");
                  elemIF.src = url;
                  elemIF.style.display = "none";
                  elemIF.onload = function() {
                    setTimeout(function() {
                      elemIF.remove();
                    }, 2000);
                  };
                  document.body.appendChild(elemIF);
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              let reg = /^[\s\S]*.*[^\s][\s\S]*$/;
              console.log(this.form.opinion);
              if (!this.form.opinion) {
                this.$message({
                  message: "请填写办理意见"
                });
              } else if (!reg.test(this.form.opinion)) {
                this.$alert("请填写意见，且不能全部为空格！");
                return;
              } else {
                let params = {
                  activityName: this.info.activityName,
                  guid: this.planGuid,
                  projectId: this.info.projectId,
                  recordLog: false, //记录日志
                  sendSMS: false, //是否发送短信
                  taskId: this.$route.query.taskId || this.info.taskId,
                  opinion: this.form.opinion
                };
                this.$alert("此操作将提交该计划到下一环节, 是否继续?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(async () => {
                    const loading = this.$loading({
                      lock: true,
                      text: 'Loading',
                      spinner: 'el-icon-loading',
                      background: 'rgba(0, 0, 0, 0.7)'
                    });
                    let res = await http.processSubmit(params);
                    if (res.status != "fail") {
                      this.$message({
                        type: "success",
                        message: "提交成功"
                      });
                      this.$emit("saveOpinion", this.form);
                      this.saveOpinion('success'); //保存办理意见
                      this.Event.$emit("toreload", "makePlan");
                      this.closeTopTab();
                      loading.close()
                    } else {
                      this.$message({
                        type: "info",
                        message: "提交失败"
                      });
                      loading.close()
                    }
                  })
                  .catch(() => {
                    this.$message({
                      type: "info",
                      message: "已取消提交"
                    });
                    loading.close()
                  });
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //回退到上一个环节
    planToPreNode() {
      let reg = /^[\s\S]*.*[^\s][\s\S]*$/;
      if (!reg.test(this.form.opinion)) {
        this.$alert("请填写意见，且不能全部为空格！");
        return;
      }
      let params = {
        activityName: this.info.activityName,
        guid: this.planGuid,
        projectId: this.info.projectId,
        recordLog: false, //记录日志
        sendSMS: false, //是否发送短信
        taskId: this.$route.query.taskId || this.info.taskId,
        opinion: this.form.opinion
      };
      this.$confirm("此操作将提交该计划到上一环节, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          let res = await http.processReturn(params);
          if (res.status != "fail") {
            this.$message({
              type: "success",
              message: "提交成功"
            });
            this.saveOpinion(false); //保存办理意见
            this.Event.$emit("toreload", "makePlan");
            this.closeTopTab();
            loading.close()
          } else {
            this.$message({
              type: "info",
              message: "提交失败"
            });
            loading.close()
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交"
          });
          loading.close()
        });
    },
    //审核不通过
    processFail() {
      let reg = /^[\s\S]*.*[^\s][\s\S]*$/;
      if (!reg.test(this.form.opinion)) {
        this.$alert("请填写意见，且不能全部为空格！");
        return;
      }
      this.$confirm("是否确认审核不通过?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            guid: this.planGuid,
            taskId: this.$route.query.taskId || this.info.taskId
          };
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          api
            .processFail(params)
            .then(res => {
              if (res) {
                this.$message({
                  type: "success",
                  message: "审核不通过提交成功"
                });
                this.Event.$emit("toreload", "makePlan");
                this.closeTopTab();
                loading.close()
              }
            })
            .catch(err => {
              console.log(err);
              loading.close()
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
          loading.close()
        });
    },
    //得到当前登录人
    getLoginer() {
      let params = {};
      http
        .getLoginer(params)
        .then(res => {
          this.form.dealer = res.userName;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存办理意见
    saveOpinion(val) {
      let params = { taskId: this.info.taskId };
      let data = {
        activitySource: this.info.activityName, //目标环节
        businessType: "房源计划制定流程", //业务类型
        pid: this.info.projectId, //流程Id
        dealTime: new Date(), //办理时间
        dealer: this.form.dealer, //办理人
        remark: this.form.opinion, //办理意见
        result: val,// 退回-fasle  提交-success
      };
      http
        .saveOpinion(params, data)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存暂存意见
    saveTempOpinion() {
      let params = { taskId: this.info.taskId };
      let data = {
        activitySource: this.activityName, //目标环节
        businessType: "房源计划制定流程", //业务类型
        pid: this.info.projectId,
        dealTime: new Date(), //办理时间
        dealer: this.form.dealer, //办理人
        remark: this.form.opinion //办理意见
      };
      http
        .saveTempOpinion(params, data)
        .then(res => {
          this.getTempOpinion();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取暂存意见
    getTempOpinion() {
      let params = {
        taskId: this.info.taskId
      };
      http
        .getTempOpinion(params)
        .then(res => {
          this.form.opinion = res.remark;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取字典
    getDictionary() {
      let namesArr = ["办理意见常用语"];
      let params = {
        names: namesArr.toString()
      };
      http
        .getDictionary(params)
        .then(res => {
          res = JSON.parse(res);
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
  created() {
    if (this.$route.params.state == "done") {
      //从已办箱进来
      this.doneBtn = true;
    }
  },
  mounted() {
    let parent = this.$parent;
    if (!this.planGuid) {
      if (parent.params && parent.params.planGuid) {
        this.planGuid = parent.params.planGuid;
      }
    }
    if (!this.planGuid) {
      parent = parent.$parent;
      if (parent.params && parent.params.planGuid) {
        this.planGuid = parent.params.planGuid;
      }
    }
    this.getLoginer(); //获取当前登录人
    this.getDictionary(); //获取字典
    if (this.info.taskId != "") {
      this.getTempOpinion(); //获取暂存意见
    }
  }
};
</script>

<style lang="scss" scoped>
.makeopinion {
  display: flex;
  justify-content: flex-start;
}
.end {
  display: flex;
  justify-content: center;
  padding-top: 10px;
}
.foot-button {
  text-align: center;
  margin-top: 10px;
}
</style>

