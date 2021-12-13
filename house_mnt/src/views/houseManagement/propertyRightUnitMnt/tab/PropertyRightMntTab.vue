<template>
  <div id="property-right-mnt-tab" class="page-detail" style="overflow-y:auto">
    <div class="buttonGroup">
      <el-button type="primary" size="mini"  @click="getLog">查看日志</el-button>
      <el-button type="primary" @click="deleteProcess" size="mini">删除案件</el-button>
    </div>
    <div class="content">
      <div class="tableStyle">
        <title-stylex title="单位管理">
          <el-button
            slot="publicTitleRight"
            size="mini"
            type="primary"
            @click="save()"
            v-if="this.$route.params.state != 'done'"
          >保存</el-button>
        </title-stylex>
        <table>
          <tr>
            <td class="must">单位名称</td>
            <td>
              <el-input v-model="propretyRightDetial.dwmc" clearable :disabled="disabled"></el-input>
            </td>
            <td class="must">统一社会信用代码</td>
            <td>
              <el-input v-model="propretyRightDetial.tyshxydm" clearable :disabled="isDisabled"></el-input>
            </td>
          </tr>
          <tr>
            <td class="must">产权类别</td>
            <td>
              <el-select
                style="width: 100%;"
                placeholder
                size="mini"
                clearable
                :disabled="disabled"
                v-model="propretyRightDetial.qylb"
              >
                <el-option
                  v-for="item in qylbData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
            <td>单位类型</td>
            <td>
              <el-select
                style="width: 100%;"
                placeholder
                size="mini"
                clearable
                :disabled="disabled"
                v-model="propretyRightDetial.dwlx"
              >
                <el-option
                  v-for="(item,index) in unitTypeData"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>单位电话</td>
            <td>
              <el-input v-model="propretyRightDetial.dwdh" clearable :disabled="disabled"></el-input>
            </td>
            <td>单位详细地址</td>
            <td>
              <el-input v-model="propretyRightDetial.dwdz" clearable :disabled="disabled"></el-input>
            </td>
          </tr>
          <tr>
            <td>法人</td>
            <td>
              <el-input v-model="propretyRightDetial.fr" clearable :disabled="disabled"></el-input>
            </td>
            <td>法人证件类型</td>
            <td>
              <el-select
                style="width: 100%;"
                placeholder
                size="mini"
                clearable
                :disabled="disabled"
                v-model="propretyRightDetial.frzjlx"
              >
                <el-option
                  v-for="(item,index) in idenTypeData"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>法人证件号码</td>
            <td>
              <el-input v-model="propretyRightDetial.frzjhm" clearable :disabled="disabled"></el-input>
            </td>
            <td>法人联系电话</td>
            <td>
              <el-input v-model="propretyRightDetial.frdh" clearable :disabled="disabled"></el-input>
            </td>
          </tr>
          <tr>
            <td>住房专员</td>
            <td>
              <el-input v-model="propretyRightDetial.zfzy" clearable :disabled="disabled"></el-input>
            </td>
            <td>住房专员证件类型</td>
            <td>
              <el-select
                style="width: 100%;"
                placeholder
                size="mini"
                clearable
                :disabled="disabled"
                v-model="propretyRightDetial.zyzjlx"
              >
                <el-option
                  v-for="(item,index) in idenTypeData"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>住房专员证件号码</td>
            <td>
              <el-input v-model="propretyRightDetial.zyzjh" clearable :disabled="disabled"></el-input>
            </td>
            <td>住房专员联系电话</td>
            <td>
              <el-input v-model="propretyRightDetial.zfzylxdh" clearable :disabled="disabled"></el-input>
            </td>
          </tr>
          <tr>
            <td>住房专员2</td>
            <td>
              <el-input v-model="propretyRightDetial.zfzye" clearable :disabled="disabled"></el-input>
            </td>
            <td>住房专员2证件类型</td>
            <td>
              <el-select
                style="width: 100%;"
                placeholder
                size="mini"
                clearable
                :disabled="disabled"
                v-model="propretyRightDetial.zyzjlxe"
              >
                <el-option
                  v-for="(item,index) in idenTypeData"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>住房专员2证件号码</td>
            <td>
              <el-input v-model="propretyRightDetial.zyzjhe" clearable :disabled="disabled"></el-input>
            </td>
            <td>住房专员2联系电话</td>
            <td>
              <el-input v-model="propretyRightDetial.zfzylxdhe" :disabled="disabled"></el-input>
            </td>
          </tr>
          <tr>
            <td>案件类别</td>
            <td>
              <el-input v-model="propretyRightDetial.czlx" :disabled="isDisabled"></el-input>
            </td>
            <td colspan="2" style="background: #fff"></td>
          </tr>
        </table>
        <div class="check_style">
          <title-stylex title="审核意见" v-if="this.$route.query.activityName"></title-stylex>
          <el-table
            class="table_height"
            :data="opinionList"
            border
            size="mini"
            :header-cell-style="globalHeaderStyle"
            :cell-style="globalCellStyle"
            v-if="(this.$route.query.activityName&&opinionList.length>0)||this.$route.params.state=='done'"
          >
            <el-table-column prop="activitySource" label="环节"></el-table-column>
            <el-table-column prop="dealer" label="办理人"></el-table-column>
            <el-table-column label="办理时间">
              <template slot-scope="scope">{{scope.row.dealTime|dateFormat}}</template>
            </el-table-column>
            <el-table-column prop="remark" label="办理意见"></el-table-column>
          </el-table>
          <div class="checkBox" v-if="this.$route.query.activityName&&this.$route.params.state=='todo'">
            <el-form>
              <el-row :gutter="20">
                <el-form-item label="当前环节:" label-width="5rem" style="margin-bottom: 0">
                  <span class="process_p">{{this.$route.query.activityName}}</span>
                </el-form-item>
                <el-form-item label="办理意见:" label-width="5rem">
                  <ContextTextarea v-model="opinion" :list="commonWords"></ContextTextarea>
                </el-form-item>
              </el-row>
            </el-form>
            <div style="text-align:center">
              <el-button
                size="mini"
                type="primary"
                @click="returnBack"
                v-if="this.$route.query.activityName =='审核'&&this.$route.params.state=='todo'"
              >退回上一环节</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="submit"
                v-if="this.$route.query.activityName&&this.$route.params.state=='todo'"
              >提交</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="logDialog" width="57%" title="查看日志" :close-on-click-modal="false">
      <div class="table-list">
        <el-table
          :data="logList"
          class="w100"
          height="300"
          :default-sort="{ prop: 'date', order: 'descending' }"
          :row-class-name="tableRowClassName"
          :header-cell-style="{
            background: '#E6F0FC',
            color: '#606266',
            'text-align': 'center'
          }"
          :cell-style="{
            'text-align': 'center'
          }"
        >
          <el-table-column prop="processTime" label="操作日期" sortable></el-table-column>
          <el-table-column prop="subjectUnit" label="单位"></el-table-column>
          <el-table-column prop="subjectName" label="操作人"></el-table-column>
          <el-table-column prop="actionName" label="操作"></el-table-column>
          <el-table-column prop="context" label="操作详情"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import titleStylex from "@/components/TitleStylex.vue"; //标题组件
import http from "@/api/propertyRightChange.js";
import publicMethod from "@/api/publicMethod";
import api from "@/api/roomChangeRoomInput";
import ContextTextarea from "@/components/ContextTextarea"; //常用意见组件
// import examineOpinion from '@/components/ExamineOpinion.vue' //审核意见组件
export default {
  name: "propertyRightMntTab",
  components: {
    titleStylex,
    // examineOpinion
    //标题公共组件
    ContextTextarea
  },
  data() {
    return {
      opinionData: [], //审核意见列表数据
      logDialog: false, //日志弹框
      logList: [], //日志列表
      handleIsShow: true, //审核意见可输入框及提交按钮显隐
      activityName: "", //当前环节名
      opinionText: "", //获取的审核意见
      newForm: {},
      isDisabled: true,
      commonWords: [], //办理意见常用语
      opinionList: [], //办理意见列表
      flowData: {
        ACTIVITYNAME: "",
        createUserName: "",
        pid: "",
        taskId: ""
      }, //流程数据
      opinion: "", //意见
      propretyRightDetial: {
        tyshxydm: this.$route.query.tyshxydm,
        dwdz: "",
        zfzy: "",
        zyzjh: "",
        zyzjlx: "",
        zfzylxdh: "",
        frzjhm: "",
        frzjlx: "",
        fr: "",
        dwdh: "",
        dwmc: "",
        frdh: "",
        dwzh: "",
        dwlx: "",
        dwzjlx: "",
        zfzye: "",
        zyzjhe: "",
        zyzjlxe: "",
        zfzyyddh: "",
        zfzyyddhe: "",
        zfzylxdhe: "",
        qylb: "1",
        frlxdz: "",
        czlx: this.$route.query.ajlb,
        cqdwbz: ""
      },
      show: true, //页面显示
      disabled: false,
      qylbData: [
        { value: "0", label: "政府单位" },
        { value: "1", label: "企业单位" }
      ],
      idenTypeData: [], //证件类型
      unitTypeData: [] //单位类型
    };
  },
  methods: {
    //隔行换色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else {
        return "";
      }
      return "";
    },
    //提交下一环节
    submit() {
      if (!this.opinion) {
        this.$alert("请填写办理意见", "提示");
      }
      if (!this.propretyRightDetial.dwmc) {
        this.$message({
          type: "warning",
          message: "请填写单位名称！"
        });
      } else if (!this.propretyRightDetial.tyshxydm) {
        this.$message({
          type: "warning",
          message: "请填写统一社会信用代码！"
        });
      } else if (!this.propretyRightDetial.qylb) {
        this.$message({
          type: "warning",
          message: "请填写产权类别！"
        });
      }
      // else if (!this.propretyRightDetial.fr) {
      //   this.$message({
      //     type: "warning",
      //     message: "请填写法人！"
      //   });
      // } else if (!this.propretyRightDetial.frzjlx) {
      //   this.$message({
      //     type: "warning",
      //     message: "请填写法人证件类型！"
      //   });
      // } else if (!this.propretyRightDetial.frzjhm) {
      //   this.$message({
      //     type: "warning",
      //     message: "请填写法人证件号码！"
      //   });
      // }
      else {
        let data = this.propretyRightDetial;
        let params = {
          projectId: this.flowData.pid
        };
        let _params = {
          projectId: this.flowData.pid,
          cqbz: this.$route.query.guid,
          taskId: this.flowData.taskId || this.$route.query.taskId,
          activityName:
            this.flowData.ACTIVITYNAME || this.$route.query.activityName
        };
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        http
          .submitPropertyRightProcess(_params)
          .then(res => {
            this.$message({
              message: "流程提交成功",
              type: "success"
            });
            this.saveOpinion();
            //待办箱刷新广播
            this.Event.$emit("PropertyRightTodo", "getPropertyRightList");
            //已办箱刷新广播
            this.Event.$emit("ProperyRightDone", "getPropertyRightList");
            this.closeTopTab();
            loading.close()
          })
          .catch(err => {
            console.log(err);
            loading.close()
          });
      }
    },
    //保存
    save() {
      if (!this.propretyRightDetial.dwmc) {
        this.$message({
          type: "warning",
          message: "请填写单位名称！"
        });
      } else if (!this.propretyRightDetial.tyshxydm) {
        this.$message({
          type: "warning",
          message: "请填写统一社会信用代码！"
        });
      } else if (!this.propretyRightDetial.qylb) {
        this.$message({
          type: "warning",
          message: "请填写产权类别！"
        });
      }
      //  else if (!this.propretyRightDetial.fr) {
      //   this.$message({
      //     type: "warning",
      //     message: "请填写法人！"
      //   });
      // } else if (!this.propretyRightDetial.frzjlx) {
      //   this.$message({
      //     type: "warning",
      //     message: "请填写法人证件类型！"
      //   });
      // } else if (!this.propretyRightDetial.frzjhm) {
      //   this.$message({
      //     type: "warning",
      //     message: "请填写法人证件号码！"
      //   });
      // }
       else {
        let data = this.propretyRightDetial;
        let params = {
          projectId: this.flowData.pid
        };
        this.$confirm("此操作将进行保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$startLoading();
            http
              .savePropertyRightInfo(params, data)
              .then(res => {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                console.log(res);
                this.flowData.pid = res.PID;
                if (res.TID) {
                  let val = {
                    tyshxydm: res.tyshxydm,
                    type: "pre",
                    guid: res.guid,
                    state: "todo",
                    taskId: res.TID,
                    name: res.name,
                    activityName: res.activityName
                  };
                  console.log(val)
                  this.openCache(res);
                  this.closeTopTab();
                  this.openDetail(val);
                }
                this.flowData.ACTIVITYNAME =
                  res.activityName || this.$route.query.activityName;
                this.getProperRightInfo();
                this.getProcessInfo();
                this.Event.$emit('PropertyRightTodo', 'getPropertyRightList')
                this.$endLoading()
              })
              .catch(err => {
                console.log(err);
                this.$endLoading()
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
    //跳转页面
    openDetail(val) {
      let state = "todo"; //办理状态
      let tab = {
        label: val.name,
        route: "/propertyRightMntTab" + "/" + state,
        query: {
          tyshxydm: val.tyshxydm,
          type: "pre",
          guid: val.guid,
          taskId: val.taskId,
          activityName: val.activityName
        },
        // name: val.name,
        type: "single"
      };
      this.closeTopTab();
      this.openTopTab(tab);
    },
    //领取任务
    openCache(val) {
      let params = {
        taskId: val.TID
      };
      api
        .openCache(params)
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    },
    //获取产权信息
    getProperRightInfo() {
      let params = {
        tyshxydm: this.$route.query.tyshxydm,
        type: this.$route.query.type,
        guid: this.$route.query.guid
      };
      http
        .getProperRightInfo(params)
        .then(res => {
          if (res != null) {
            this.propretyRightDetial = res;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取字典数据
    getDictionary() {
      let nameData = ["办理意见常用语", "证件类型", "重点单位类型"];
      let params = { names: nameData.toString() };
      api
        .getDictionary(params)
        .then(res => {
          res = JSON.parse(res);
          this.commonWords = this.$dictionaryChange(
            res.办理意见常用语,
            this.commonWords,
            "房源分配常用意见"
          );
          this.idenTypeData = this.$dictionaryChange(
            res.证件类型,
            this.idenTypeData,
            "通用"
          );
          this.unitTypeData = this.$dictionaryChange(
            res.重点单位类型,
            this.unitTypeData,
            "分配"
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取办理意见列表
    getOpionionList() {
      let params = {
        pid: this.flowData.pid
      };
      publicMethod
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
        taskId: this.flowData.taskId
      };
      publicMethod
        .getTempOpinion(params)
        .then(res => {
          this.opinion = res.remark;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存暂存意见
    saveTempOpinion() {
      if (
        this.flowData.taskId &&
        this.flowData.ACTIVITYNAME &&
        this.flowData.pid
      ) {
        let params = {
          taskId: this.flowData.taskId || this.$route.query.taskId
        };
        let data = {
          activitySource:
            this.flowData.ACTIVITYNAME || this.$route.query.activityName, //来源环节
          businessType: "产权单位录入", //业务类型
          dealTime: new Date(), //办理时间
          dealer: this.loginer, //办理人
          pid: this.flowData.pid,
          remark: this.opinion //办理意见
        };
        publicMethod
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
    //提交下一环节保存办理意见
    saveOpinion() {
      let data = {
        activitySource:
          this.flowData.ACTIVITYNAME || this.$route.query.activityName, //来源环节
        businessType: "产权单位录入", //业务类型
        dealTime: new Date(), //办理时间
        dealer: this.loginer, //办理人
        pid: this.flowData.pid,
        remark: this.opinion,
        taskId: this.flowData.taskId || this.$route.query.taskId
      };
      let params = { taskId: this.flowData.taskId || this.$route.query.taskId };
      publicMethod
        .saveOpinion(params, data)
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    },
    //获取流程数据
    getProcessInfo() {
      let params = {
        taskId: this.$route.query.taskId
      };
      publicMethod
        .getProcessInfo(params)
        .then(res => {
          console.log(res)
          if (res) {
            this.flowData.ACTIVITYNAME = res[0].ACTIVITYNAME;
            this.flowData.createUserName = res[0].CREATEUSERNAME;
            this.flowData.pid = res[0].PID;
            this.flowData.taskId = res[0].TID;
            this.getOpionionList();
          }
        })
        .catch(err => {
          console.log(err);
        });
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
    //案件删除
    deleteProcess() {
      this.$confirm("请确认是否要删除该案件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            projectId: this.flowData.pid,
            tyshxydm: this.$route.query.tyshxydm
          };
          http
            .deleteProcess(params)
            .then(res => {
              if (res) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.closeTopTab();
                this.Event.$emit("PropertyRightTodo", "getPropertyRightList");
              }
            })
            .catch(err => {
              this.$message({
                type: "info",
                message: "删除失败!"
              });
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //流程回退
    returnBack() {
      this.$confirm("请确认是否要退回上一环节?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!this.opinion) {
            this.$alert("请填写办理意见", "提示");
          } else {
            let params = {
              activityName:
                this.flowData.ACTIVITYNAME || this.$route.query.activityName,
              projectId: this.flowData.pid,
              taskId: this.flowData.taskId || this.$route.query.taskId
            };
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            http
              .rebackProcess(params)
              .then(res => {
                if (res) {
                  //待办箱刷新广播
                  this.Event.$emit("PropertyRightTodo", "getPropertyRightList");
                  //已办箱刷新广播
                  this.Event.$emit("ProperyRightDone", "getPropertyRightList");
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退回"
          });
        });
    },
    //查看日志
    getLog() {
      this.logDialog = true;
      let params = {
        houseGuid: this.flowData.pid
      };
      http
        .getPropertyRightLog(params)
        .then(res => {
          this.logList = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  mounted() {
    if (this.$route.query.state != "new") {
      this.getProperRightInfo();
    }
    if (this.$route.query.state == "new1") {
      this.propretyRightDetial.czlx = this.$route.query.ajlb;
    }
  },
  created() {
    this.getDictionary();
    if (this.$route.params.state == "new") {
      this.form = {};
      this.disabled = false;
    } else if (
      this.$route.params.state == "todo" &&
      this.$route.query.activityName == "受理"
    ) {
      this.getProcessInfo();
      this.getProperRightInfo();
      this.disabled = false;
    } else if (
      (this.$route.query.activityName != "受理" &&
        this.$route.params.state == "todo") ||
      this.$route.params.state == "done"
    ) {
      this.disabled = true;
      this.getProcessInfo();
    }
    this.getLoginer();
  }
};
</script>
<style lang="scss" scoped>
#property-right-mnt-tab{
  .process_p {
    color: #fdae2b !important;
  }
 .table-list {
    height: 300px;
    /deep/ .el-table .warning-row {
      /*隔行换色*/
      background: oldlace;
    }
    /deep/ .el-table td,
    .el-table th.is-leaf {
      /*取消border*/
      border-bottom: none;
    }
    .el-table--border::after,
    .el-table--group::after,
    .el-table::before {
      background-color: #fff;
    }
    .el-table--enable-row-hover /deep/ .el-table__body tr:hover > td {
      /*取消划过效果*/
      background-color: transparent !important;
    }
    ::-webkit-scrollbar {
      /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
      width: 2px;
      height: 16px;
      background-color: #f5f5f5;
    }
    ::-webkit-scrollbar-thumb {
      /*定义滑块 内阴影+圆角*/
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #e6f0fc;
    }
  }
  .table_height{
    margin-bottom: 20px;
  }
  .check_style{
    margin: 30px auto 50px;
  }
}
</style>
