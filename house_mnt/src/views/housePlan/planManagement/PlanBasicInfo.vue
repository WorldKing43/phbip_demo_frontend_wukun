<template>
  <div class="HousingPlanNo">
    <!--基本信息-->
    <div class="basicInformation">
      <div class="title">
        <div class="title-icon"></div>
        <div class="title-font">基本信息</div>
        <div class="title-bottom"></div>
      </div>
      <div>
        <div class="left">
          <el-button
            type="primary"
            size="mini"
            @click="saveBasicInfomation"
            style="float:right;margin-right:20px;margin-bottom:10px;"
            v-if="!opinionShow && hasPerm('fyjh_jhzd_jhxx_bc')"
          >保存</el-button>
        </div>
        <!-- 基本信息-->
        <div class="basicInformation-table">
          <table>
            <tr>
              <td class="must">计划归属</td>
              <td>
                <el-input v-model="basicForm.belongToName" :disabled="isDisabled"></el-input>
              </td>
              <td>房源计划号</td>
              <td>
                <el-input v-model="basicForm.code" :disabled="isDisabled"></el-input>
              </td>
            </tr>
            <tr>
              <td class="must">计划说明</td>
              <td colspan="3">
                <el-input
                  placeholder="请输入内容"
                  v-model="basicForm.description"
                  clearable
                  :disabled="opinionShow"
                  style="background:#fff"
                  @change="descriptionChange"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td class="must">计划用途</td>
              <td>
                <el-radio-group
                  :disabled="opinionShow"
                  v-model="basicForm.function"
                  style="margin-left:10px"
                  @change="radioChange"
                >
                  <el-radio
                    v-for="(item, index) in functionData"
                    :key="index"
                    :label="item.value"
                    :value="index"
                  >{{ item.name }}</el-radio>
                </el-radio-group>
              </td>
              <td class="must">计划属性</td>
              <td>
                <el-select
                  :disabled="opinionShow"
                  clearable
                  v-model="propertyTemp"
                  placeholder="请先选择计划用途"
                  style="width: 100%;"
                  @change="propertyChange"
                >
                  <el-option
                    v-for="(item, index) in propertyData"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="must">供应计划</td>
              <td>
                <el-select
                  clearable
                  :disabled="opinionShow"
                  v-model="basicForm.supplyCode"
                  @change="supplyChange"
                  placeholder="请选择"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="(item, index) in supplyCodeOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </td>
              <td class="must">分配批次</td>
              <td>
                <el-select
                  clearable
                  :disabled="opinionShow"
                  v-model="basicForm.batchCode"
                  @change="batchChange"
                  placeholder="请先选择供应计划"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="(item, index) in batchCodeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr v-if="this.queenAndGroupShow">
              <td class="must">包含队列</td>
              <td>
                <el-input v-model="queueStr" readonly style="width:75%"></el-input>
                <el-button size="mini" :disabled="opinionShow" @click="dialogQueueClick">选择</el-button>
              </td>
              <td class="must">包含分组</td>
              <td>
                <el-input v-model="groupStr" readonly style="width:75%"></el-input>
                <el-button size="mini" :disabled="opinionShow" @click="dialogGroupClick">选择</el-button>
              </td>
            </tr>
            <tr>
              <td>编制人</td>
              <td>
                <el-input placeholder="市局" v-model="basicForm.planEditor" disabled></el-input>
              </td>
              <td>编制时间</td>
              <td>
                <el-input placeholder v-model="basicForm.compileDate" disabled></el-input>
              </td>
            </tr>
            <tr>
              <td>状态</td>
              <td colspan="3">
                <el-input placeholder v-model="basicForm.activityName" disabled></el-input>
              </td>
            </tr>
          </table>
        </div>
        <!-- 选择队列--对话框 -->
        <el-dialog title="选择队列" :visible.sync="dialogQueue" :close-on-click-modal="false">
          <el-table
            :data="queueData"
            ref="queueTable"
            @selection-change="queueSelectionChange"
            style="margin:10px;width: 100%"
            border
            :header-cell-style="{
              background: '#F7F6F5',
              color: '#606266',
              'text-align': 'center',
              'border-color': '#DBDBDB'
            }"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="name" label="队列名称" align="center"></el-table-column>
          </el-table>
          <div align="center">
            <el-button size="mini" @click="dialogQueue = false">取消</el-button>
            <el-button type="primary" size="mini" @click="makeSureQueue">确定</el-button>
          </div>
        </el-dialog>
        <!-- 选择分组--对话框 -->
        <el-dialog title="选择分组" :visible.sync="dialogGroup" :close-on-click-modal="false">
          <el-table
            :data="groupData"
            ref="groupTable"
            @selection-change="groupSelectionChange"
            style="margin:10px;width: 100%"
            border
            :header-cell-style="{
              background: '#F7F6F5',
              color: '#606266',
              'text-align': 'center',
              'border-color': '#DBDBDB'
            }"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="name" label="分组名称" align="center"></el-table-column>
          </el-table>
          <div align="center">
            <el-button size="mini" @click="dialogGroup = false">取消</el-button>
            <el-button type="primary" size="mini" @click="makeSureGroup">确定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <!-- 房源统计-->
    <div>
      <HouseSituation
        :houseAreaData="houseAreaData"
        :houseStateData="houseStateData"
        :houseTypeData="houseTypeData"
        :signTypeData="signTypeData"
      ></HouseSituation>
    </div>
    <!--房源详情-->
    <div>
      <HouseDetails
        :current="currentPage"
        :size="pageSize"
        :selectedHouseData="selectedHouseData"
        @fatherFn="getHouseInfoFromPlan"
      ></HouseDetails>
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
    <!--审核意见-->
    <div class="opinion">
      <div class="title">
        <div class="title-icon"></div>
        <div class="title-font">审核意见</div>
        <div class="title-bottom"></div>
      </div>
      <div>
        <!-- selectedHouseData:选中房的数据 -->
        <MoreOpinion
          :opinion="opinionTableData"
          :info="basicForm"
          :basicFormShow="basicFormShow"
          :opinionShowFlag="opinionIsShow"
          :endIsShow="endShow"
          :planGuid="planGuid"
          :selectedHouseData="selectedHouseData"
          ref="opinionChild"
        ></MoreOpinion>
      </div>
    </div>
  </div>
</template>

<script>
import MoreOpinion from "./components/MoreOpinion";
import HouseSituation from "./newplan/HouseSituation";
import HouseDetails from "./newplan/HouseDetails";
import http from "./newplan/serve.js";
import { mapGetters } from "vuex";

export default {
  name: "planinfo",
  components: {
    MoreOpinion,
    HouseSituation,
    HouseDetails
  },
  data() {
    return {
      propertyTemp: "",
      houseAreaData: [], //面积
      houseStateData: [], //状态类别
      houseTypeData: [], //户型
      signTypeData: [], //签约归属权
      selectedHouseData: [], //房源详情
      basicForm: {
        belongTo: "", //计划归属
        code: "", //房源计划号
        description: "", //计划说明
        function: "", //计划用途
        property: "", //计划属性
        supplyCode: "", //供应计划
        batchCode: "", //分配批次
        planEditor: "", //编制人
        compileDate: "", //时间
        activityName: "", //状态
        guid: "",
        projectId: "",
        taskId: ""
      },
      opinionTableData: [], //意见的表格数据
      queueString: "",
      groupString: "",
      basicFormShow: false, //审核意见表格显隐控制
      opinionIsShow: false,
      currentPage: 1,
      pageSize: 10,
      pageSizesList: [10, 20, 30, 50, 100, 200],
      totalNumber: 0, //数据的总数
      endShow: true, //审核意见的控制，具体不清楚
      dialogGroup: false, //分组对话框
      dialogQueue: false, //队列对话框
      queueData: [], //队列表格数据
      groupData: [], //分组表格数据
      queueSelection: [], //队列选中数据
      groupSelection: [], //分组选中数据
      isDisabled: true, //是否禁用
      supplyCodeOptions: [], //供应计划下拉数据
      batchCodeOptions: [], //分配批次
      batchCodeOptionsCopy: [], //分配批次保存所有数据
      queueStr: "", //队列显示在input内
      groupStr: "", //分组显示在input内
      propertyData: [], //计划属性绑定的数据
      functionData: [], //计划用途
      formChange: false, //判断表单是否改变
      opinionShow: false, //基本信息中的禁用
      planGuid: "", //计划标识
      queenAndGroupShow: true //组和队是否显示
    };
  },
  methods: {
    //获取表单信息
    initPlanInProcess() {
      let params = {};
      http
        .initPlanInProcess(params)
        .then(res => {
          this.basicForm = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //选择队列行时间
    clickRow(row) {
      if (this.$refs.queueTable) {
        this.$refs.queueTable.toggleRowSelection(row);
      }
      if (this.$refs.groupTable) {
        this.$refs.groupTable.toggleRowSelection(row);
      }
    },
    // 包含队列点击，获取批次下的队信息
    dialogQueueClick() {
      //判断batchCode是否存在
      if (this.basicForm.batchCode) {
        this.dialogQueue = true;
        this.$nextTick(() => {
          if (this.queueSelection.length > 0 && this.queueData.length > 0) {
            for (let i = 0; i < this.queueData.length; i++) {
              this.queueData[i].selected = false;
              for (let j = 0; j < this.queueSelection.length; j++) {
                if (this.queueData[i].guid == this.queueSelection[j].guid) {
                  this.queueData[i].selected = true;
                  break;
                }
              }
            }
            this.queueData.forEach(row => {
              if (row.selected) {
                this.$refs.queueTable.toggleRowSelection(row, true);
              }
            });
          }
        });
      } else {
        this.$alert("分配批次不能为空", "提示", {
          type: "warning"
        }).catch(() => {});
      }
    },
    // 队列中的确定
    makeSureQueue() {
      //显示结果在input框内
      let brr = [];
      this.queueSelection.forEach(item => {
        brr.push(item.name);
      });
      this.queueStr = brr.join();
      this.dialogQueue = false; //关闭
    },
    //队中选择，触发的函数，数据存入this.queueSelection
    queueSelectionChange(val) {
      //队中选择，触发的函数，数据存入this.queueSelection
      this.queueSelection = val; //对话框内选中的队列数据
      console.log(val);
      this.formChange = true;
    },
    // 包含分组点击，获取批次下的组信息，如果已选组
    dialogGroupClick() {
      if (this.basicForm.batchCode) {
        this.dialogGroup = true;
        this.$nextTick(() => {
          if (this.groupSelection.length > 0 && this.groupData.length > 0) {
            for (let i = 0; i < this.groupData.length; i++) {
              this.groupData[i].selected = false;
              for (let j = 0; j < this.groupSelection.length; j++) {
                if (this.groupData[i].guid == this.groupSelection[j].guid) {
                  this.groupData[i].selected = true;
                  break;
                }
              }
            }
            this.groupData.forEach(row => {
              if (row.selected) {
                this.$refs.groupTable.toggleRowSelection(row, true);
              }
            });
          }
        });
      } else {
        this.$alert("分配批次不能为空", "提示", {
          type: "warning"
        }).catch(() => {});
      }
    },
    // 分组中的确定
    makeSureGroup() {
      let brr = [];
      this.groupSelection.forEach(item => {
        brr.push(item.name);
      });
      let str = brr.join();
      this.groupStr = str;
      this.dialogGroup = false;
    },
    // 分组弹框-数据存入this.gourpSelection
    groupSelectionChange(val) {
      this.groupSelection = val;
      this.formChange = true;
    },
    // 保存基本信息
    saveBasicInfomation() {
      if (!this.basicForm.belongToName) {
        this.$message({
          message: "请填写计划归属"
        });
      } else if (!this.basicForm.description) {
        this.$message({
          message: "请填写计划说明"
        });
      } else if (!this.basicForm.function) {
        this.$message({
          message: "请填写计划用途"
        });
      } else if (!this.propertyTemp) {
        this.$message({
          message: "请填写计划属性"
        });
      } else if (!this.basicForm.supplyCode) {
        this.$message({
          message: "请填写供应计划"
        });
      } else if (!this.basicForm.batchCode) {
        this.$message({
          message: "请填写分配批次"
        });
      } else if (!this.queueStr && this.queenAndGroupShow) {
        this.$message({
          message: "请选择包含队列"
        });
      } else if (!this.groupStr && this.queenAndGroupShow) {
        this.$message({
          message: "请选择包含分组"
        });
      } else {
        this.$confirm("此操作将进行保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$startLoading();
            let selectedQueueGuid = []; //选中的队列信息
            this.queueSelection.forEach(item => {
              selectedQueueGuid.push(item.guid);
            });
            let selectedGroupGuid = []; //选中的组信息
            this.groupSelection.forEach(item => {
              selectedGroupGuid.push(item.guid);
            });
            let params = {};
            let data = {
              activityName: this.basicForm.activityName,
              projectId: this.basicForm.projectId,
              taskId: this.basicForm.taskId,
              batchCode: this.basicForm.batchCode,
              belongTo: this.basicForm.belongTo,
              code: this.basicForm.code,
              compileDate: new Date(this.basicForm.compileDate).toISOString(),
              compileDepartment: this.basicForm.compileDepartment,
              depreciation: this.basicForm.depreciation,
              description: this.basicForm.description,
              function: this.basicForm.function,
              guid: this.$parent.params.planGuid || this.basicForm.guid,
              planEditor: this.basicForm.planEditor,
              planFunctionName: this.basicForm.planFunctionName,
              property: this.propertyTemp,
              propertyRightYear: this.basicForm.propertyRightYear,
              recoverMethod: this.basicForm.recoverMethod,
              recoverMethodName: this.basicForm.recoverMethodName,
              state: this.basicForm.state,
              stateName: this.basicForm.stateName,
              supplyCode: this.basicForm.supplyCode,
              groupInfo: selectedGroupGuid,
              queueInfo: selectedQueueGuid
            };
            {
              //如果有房源计划代码则实现修改，如果没有则实现新增
              if (data.guid) {
                http
                  .planModify(params, data)
                  .then(res => {
                    if (res.status != "fail") {
                      this.basicForm.activityName = res.activityName;
                      this.basicForm.projectId = res.projectId;
                      this.basicForm.taskId = res.taskId;
                      http
                        .processCoach({ taskId: res.taskId })
                        .then(res => {
                          this.$refs["opinionChild"].saveTempOpinion(); //保存暂存意见
                          this.$endLoading()
                        })
                        .catch(err => {
                          console.log(err);
                          this.$endLoading()
                        });
                      this.$message({
                        type: "success",
                        message: "保存成功"
                      });
                      this.formChange = false;
                    } else {
                      this.$alert("保存失败" + res.message, "错误", {
                        confirmButtonText: "确定"
                      });
                    }
                  })
                  .catch(err => {
                    console.log("保存失败！", err);
                  });
              } else {
                //如果有房源计划代码则实现修改，如果没有则实现新增
                http
                  .planModify(params, data)
                  .then(res => {
                    this.$startLoading();
                    console.log(res);
                    this.$parent.params.planGuid = res.guid;
                    this.$parent.params.pid = res.projectId;
                    this.basicForm.code = res.code;
                    this.closeTopTab();
                    let tab = {
                      route:
                        "/newplan/" +
                        (res.guid || "new") +
                        "/" +
                        res.projectId +
                        "/todo",
                      name: this.basicForm.code,
                      query: {
                        activityName: res.activityName,
                        taskId: res.taskId
                      },
                      type: "single"
                    };
                    this.openTopTab(tab);
                    this.Event.$emit("toreload", "makePlan");
                    this.basicForm.activityName = res.activityName;
                    this.basicForm.projectId = res.projectId;
                    this.basicForm.taskId = res.taskId;
                    http
                      .processCoach({ taskId: res.taskId })
                      .then(res => {
                        this.$endLoading()
                      })
                      .catch(err => {
                        console.log(err);
                        this.$endLoading()
                      });
                    this.$message({
                      showClose: true,
                      message: "新增成功",
                      type: "success"
                    });
                    this.formChange = false;
                    // this.getHousePlanByGuid();//新增后查询，哥哥们别再删我了，这条代码有什么问题请找小马哥谢谢。
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
            }
            // else {
            //   this.$alert("请将基本信息填写完整", "提示", {
            //     type: "warning"
            //   }).catch(() => {});
            // }
            // this.$endLoading()
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消保存"
            });
          });
      }
    },

    // 获取审核意见
    getOpinionByHousePlan() {
      let params = {
        pid: this.basicForm.projectId
      };
      http
        .getHousePlanOpinion(params)
        .then(res => {
          console.log(res);
          if (res) {
            this.opinionTableData = res;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取当前计划下的房源统计信息
    getTotalList() {
      let params = {
        planGuid: this.$parent.params.planGuid
      };
      if (this.basicForm.activityName === "已下达") {
        http
          .getManagedStateStatistics(params)
          .then(res => {
            if (res) {
              this.houseStateData = res;
            }
          })
          .catch(err => {
            console.log(err);
          });
        http
          .getManagedAreaStatistics(params)
          .then(res => {
            if (res) {
              this.houseAreaData = res;
            }
          })
          .catch(err => {
            console.log(err);
          });
        http
          .getManagedTypeStatistics(params)
          .then(res => {
            if (res) {
              this.houseTypeData = res;
            }
          })
          .catch(err => {
            console.log(err);
          });
        http
          .getSignTypeStatistics(params)
          .then(res => {
            if (res) {
              this.signTypeData = res;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        http
          .getHouseStateStatistics(params)
          .then(res => {
            if (res) {
              this.houseStateData = res;
            }
          })
          .catch(err => {
            console.log(err);
          });
        http
          .getHouseAreaStatistics(params)
          .then(res => {
            if (res) {
              this.houseAreaData = res;
            }
          })
          .catch(err => {
            console.log(err);
          });
        http
          .getHouseTypeStatistics(params)
          .then(res => {
            if (res) {
              this.houseTypeData = res;
            }
          })
          .catch(err => {
            console.log(err);
          });
        http
          .getHouseSignStatistics(params)
          .then(res => {
            if (res) {
              this.signTypeData = res;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 获取当前计划下关联的房源信息
    getHouseInfoFromPlan(val) {
      //添加loading加载框
      const loading = this.$loading({
        lock: true,
        text: "正在查询",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: ".margin30"
      });
      let timeout = 0;
      let params = {};
      if (val) {
        params = {
          planGuid: this.$parent.params.planGuid,
          pageIndex: this.currentPage,
          pageSize: this.pageSize,
          areaMax: val.areaMax,
          areaMin: val.areaMin,
          districtName: val.districtName,
          houseNo: val.houseNo,
          state: val.state,
          type: val.type,
          buildName: val.buildName,
          completionAreabegain: val.completionAreabegain,
          completionAreaEnd: val.completionAreaEnd
        };
      } else {
        params = {
          planGuid: this.$parent.params.planGuid,
          pageIndex: this.currentPage,
          pageSize: this.pageSize
        };
      }
      //分页查询房源计划中关联的房源信息
      if (
        this.basicForm.activityName === "已下达" ||
        this.$route.query.activityName === "已下达"
      ) {
        http
          .houseInfoReleasedPage(params, timeout)
          .then(res => {
            this.selectedHouseData = res.content;
            this.totalNumber = res.totalElements;
            loading.close();
          })
          .catch(err => {
            console.log("分页查询房源计划中关联的房源信息失败", err);
            loading.close();
          });
      } else {
        http
          .houseInfoSelectedPage(params, timeout)
          .then(res => {
            this.selectedHouseData = res.content;
            this.totalNumber = res.totalElements;
            loading.close();
          })
          .catch(err => {
            console.log("分页查询房源计划中关联的房源信息失败", err);
            loading.close();
          });
      }
    },
    // 分页大小
    handleSizeChange(val) {
      this.pageSize = val;
      this.getHouseInfoFromPlan();
    },
    // 分页页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getHouseInfoFromPlan();
    },
    // 根据--计划用途--级联筛选---计划属性，发送请求，将数据存入propertyOptions下拉框中
    radioChange() {
      this.propertyTemp = ""; //清空
      this.getProperty();
      this.formChange = true;
    },
    //获得计划属性
    getProperty(Data) {
      let params = {
        function: this.basicForm.function
      };
      if (this.functionData) {
        for (let item of this.functionData) {
          if (item.value == this.basicForm.function) {
            this.propertyData = JSON.parse(JSON.stringify(item.children));
            break;
          }
        }
      }
    },
    //调取字典
    getPlanFunction() {
      let nameArr = ["计划用途", "供应计划"];
      let _params = {
        names: nameArr.toString()
      };
      http
        .getDictionary(_params)
        .then(res => {
          if (res) {
            res = JSON.parse(res);
            res.计划用途.splice(res.计划用途.length - 1, 1);
            this.functionData = res.计划用途;
            this.supplyCodeOptions = res.供应计划;
            this.getProperty();
          }
        })
        .catch(() => {});
    },
    // 供应计划改变
    supplyChange() {
      //随着供应计划的改变去清空下面的数据
      this.basicForm.batchCode = "";
      this.queueStr = ""; //队列显示在input内
      this.groupStr = ""; //分组显示在input内
      this.batchCodeOptions = [];
      this.getBatchInfoBysupply();
      this.formChange = true;
      this.queenAndGroupShow = true;
    },
    // 根据--供应计划号---获取---批次信息,发送请求，将数据存入batchCodeOptions中
    getBatchInfoBysupply() {
      let params = {
        supplyCode: this.basicForm.supplyCode
      };
      let arr = [];
      http
        .getPlanBatchesBySupplyCode(params)
        .then(res => {
          this.batchCodeOptionsCopy = res;
          res.forEach(item => {
            let obj = {
              value: item.code,
              label: item.name
            };
            arr.push(obj);
          });
          this.batchCodeOptions = arr;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取房源计划基本信息
    getHousePlanByGuid() {
      let params = {
        guid: this.$parent.params.planGuid
      };
      http
        .getHousePlan(params)
        .then(res => {
          this.basicForm = res;
          // if (this.basicForm.distributeType == "13") {
          //   this.queenAndGroupShow = false;
          // } else {
          //   this.queenAndGroupShow = true;
          // }
          if (this.basicForm.projectId) {
            this.getOpinionByHousePlan(); //获取审核意见
          }
          this.propertyTemp = res.property; //计划属性绑定的值
          if (res.activityName == "编制") {
            this.basicFormShow = false; //审核意见表格显隐控制
            this.opinionShow = false;
          } else {
            this.opinionShow = true;
          }
          if (res.activityName == "已下达") {
            this.endShow = false;
            this.opinionIsShow = true;
          }
          let _params = {
            batchCode: res.batchCode
          };

          let arr = [];
          let brr = [];
          if (res.queueInfo) {
            this.queueSelection = res.queueInfo; //选中的
            console.log(this.queueSelection);
            res.queueInfo.forEach(element => {
              arr.push(element.name);
            });
          }
          if (res.groupInfo) {
            this.groupSelection = res.groupInfo; //选中的
            console.log(this.groupSelection);
            res.groupInfo.forEach(item => {
              brr.push(item.name);
            });
          }
          this.queueStr = arr.toString(); //显示出来的
          this.groupStr = brr.toString(); //显示出来的
          this.getBatchInfoBysupply(); //获取---批次信息
          this.getProperty(); //获取计划属性
          //获取队列
          http
            .getQueuesByBatchCode(_params)
            .then(res => {
              if (res) {
                this.queueData = res;
              }
            })
            .catch(err => {
              console.log(err);
            });
          // 获取分组
          http
            .getGroupsByBatchCode(_params)
            .then(res => {
              //判断是否已经选择组
              if (res) {
                this.groupData = res;
              }
            })
            .catch(err => {
              console.log(err);
            });
          if (res.taskId != null && typeof res.taskId != "undefined") {
            http
              .processCoach({ taskId: res.taskId })
              .then(res => {
                //
              })
              .catch(err => {
                console.log(err);
              });
          }
          //获取当前计划下的房源统计信息
          this.getTotalList();
          //获取当前计划下关联的房源信息
          this.getHouseInfoFromPlan();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 分配批次改变，同时获取队，组数据
    batchChange() {
      this.queenAndGroupShow = true;
      // if (this.batchCodeOptionsCopy.length != 0) {
      //   for (var i = 0; i < this.batchCodeOptionsCopy.length; i++) {
      //     if (
      //       this.batchCodeOptionsCopy[i].code == this.basicForm.batchCode &&
      //       this.batchCodeOptionsCopy[i].distributeType == "13"
      //     ) {
      //       this.queenAndGroupShow = false;
      //     }
      //   }
      // }
      if (this.queenAndGroupShow) {
        this.queueStr = "";
        this.groupStr = "";
        this.queueSelection = [];
        this.groupSelection = [];
        this.queueData = []; //队列表格数据
        this.groupData = []; //分组表格数据
        let params = {
          batchCode: this.basicForm.batchCode
        };
        http
          .getQueuesByBatchCode(params)
          .then(res => {
            if (res.length) {
              //如果有队列才赋值
              this.queueData = res;
            }
          })
          .catch(err => {
            console.log(err);
          });
        http
          .getGroupsByBatchCode(params)
          .then(res => {
            //判断是否已经选择组
            if (res.length) {
              //如果有分组才赋值
              this.groupData = res;
            }
          })
          .catch(err => {
            console.log(err);
          });
        this.formChange = true;
      }
    },
    // 计划说明-表单改变
    descriptionChange() {
      this.formChange = true;
    },
    // 计划属性-表单改变
    propertyChange(val) {
      this.formChange = true;
    }
  },
  created() {
    this.planGuid = this.$parent.params.planGuid;
  },
  mounted() {
    this.getPlanFunction(); // 调取字典
    this.Event.$on("getHousePlanByGuid", data => {
      if (data == "PlanBasicInfo") {
        this.getHousePlanByGuid();
      }
    });
    if (this.planGuid) {
      //获取房源计划详情信息
      this.getHousePlanByGuid();
    } else {
      this.initPlanInProcess(); //初始化表单
    }
  }
};
</script>

<style lang="scss" scoped>
.HousingPlanNo {
  background: #fff;
  color: #838383;
  padding: 20px;
  .bg-fff {
    background: #fff;
  }
  .title {
    display: flex;
    padding: 10px;
    .title-icon {
      width: 5px;
      height: 18px;
      background: #f5a623;
      margin-right: 10px;
      margin-top: 2px;
    }
    .title-font {
      width: 7rem;
      font-size: 18px;
    }
    .title-bottom {
      width: 100%;
      height: 18px;
      border-bottom: 1px solid #ccc;
    }
  }
}
.basicInformation-table {
  padding: 20px 20px 10px 20px;
  table {
    margin: 20px auto;
    border: 1px solid #ccc;
    border-collapse: collapse;
    width: 100%;
    tr {
      border: 1px solid #ccc;
      width: 100%;
    }
    td {
      border: 1px solid #ccc;
      font-size: 14px;
      height: 2.5rem;
    }
    td:nth-child(odd) {
      width: 15%;
      text-align: center;
    }
    td:nth-child(even) {
      width: 30%;
      background: #f5f5f5;
      text-align: left;
    }
    /deep/ .el-input input {
      border: none;
      color: #282b30;
    }
  }
}
</style>
