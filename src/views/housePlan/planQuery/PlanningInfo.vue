<!-- 
 * @Author: 
 * @Date: 2019-12-03 
 * @LastEditors: zhaoyy1
 * @Description: 优化代码
 * @model:计划查询-计划信息页面
-->
<template>
  <div class="HousingPlanNo">
    <!--基本信息-->
    <publicTitle title="基本信息"></publicTitle>
    <div class="basicInformation">
      <div>
        <!-- 基本信息-->
        <div class="basicInformation-table tableStyle">
          <table>
            <tr>
              <td class="must">计划归属</td>
              <td>
                <el-input v-model="basicForm.belongToName" disabled></el-input>
              </td>
              <td>房源计划号</td>
              <td>
                <el-input v-model="basicForm.code" disabled></el-input>
              </td>
            </tr>
            <tr>
              <td class="must">计划说明</td>
              <td colspan="3">
                <el-input placeholder="请输入内容" v-model="basicForm.description" disabled></el-input>
              </td>
            </tr>
            <tr>
              <td class="must">计划用途</td>
              <td>
                <el-radio-group disabled v-model="basicForm.function" style="margin-left:10px">
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
                  v-model="propertyTemp"
                  placeholder="请先选择计划用途"
                  style="width: 100%;"
                  disabled
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
              <td>供应计划</td>
              <td>
                <el-select
                  disabled
                  v-model="basicForm.supplyCode"
                  placeholder="请选择"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="(item, index) in supplyCodeOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </td>
              <td>分配批次</td>
              <td>
                <el-select
                  disabled
                  v-model="basicForm.batchCode"
                  placeholder="请先选择供应计划"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="item in batchCodeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr v-if="queenAndGroupShow">
              <td>包含队列</td>
              <td>
                <el-input v-model="queueStr" readonly style="width:100%"></el-input>
              </td>
              <td>包含分组</td>
              <td>
                <el-input v-model="groupStr" readonly style="width:100%"></el-input>
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
  </div>
</template>

<script>
import publicTitle from "@/components/TitleStyle"; //标题组件
import HouseSituation from "../planManagement/newplan/HouseSituation";
import HouseDetails from "../planManagement/newplan/HouseDetails";
import http from "../planManagement/newplan/serve.js";
import publicMethod from "@/api/publicMethod";
import { mapGetters } from "vuex";

export default {
  name: "planningInfo",
  components: {
    publicTitle, //标题公共组件
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
      basicFormShow: false, //审核意见表格显隐控制
      opinionIsShow: false,
      currentPage: 1,
      pageSize: 100,
      pageSizesList: [100, 200, 500, 1000],
      totalNumber: 0, //数据的总数
      endShow: true, //审核意见的控制，具体不清楚
      dialogGroup: false, //分组对话框
      dialogQueue: false, //队列对话框
      queueData: [], //队列表格数据
      groupData: [], //分组表格数据
      queueSelection: [], //队列选中数据
      groupSelection: [], //分组选中数据
      isDisabled: true, //是否禁用
      supplyCodeOptions: [], //供应计划下拉数据,
      batchCodeOptions: [], //分配批次
      queueStr: "", //队列显示在input内
      groupStr: "", //分组显示在input内
      propertyData: [], //计划属性绑定的数据
      functionData: [], //计划用途
      formChange: false, //判断表单是否改变
      opinionShow: false, //基本信息中的禁用
      queenAndGroupShow: true //队列和数组的显隐设置
    };
  },
  methods: {
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
          buildName: val.buildName
        };
      } else {
        params = {
          planGuid: this.$parent.params.planGuid,
          pageIndex: this.currentPage,
          pageSize: this.pageSize
        };
      }
      //分页查询房源计划中关联的房源信息
      if (this.basicForm.activityName === "已下达") {
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
      this.getHouseInfoFromPlan(1);
    },
    // 分页页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getHouseInfoFromPlan();
    },
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
    //获取数据字典
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
    // 根据--供应计划号---获取---批次信息,发送请求，将数据存入batchCodeOptions中
    getBatchInfoBysupply() {
      let params = {
        supplyCode: this.basicForm.supplyCode
      };
      let arr = [];
      http
        .getPlanBatchesBySupplyCode(params)
        .then(res => {
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
          this.propertyTemp = res.property; //计划属性绑定的值
          if (res.activityName == "编制") {
            this.basicFormShow = false; //审核意见表格显隐控制
            this.opinionShow = false;
          } else {
            this.opinionShow = true;
          }
          if (res.activityName == "已下达") {
            this.endShow = false;
          }
          let _params = {
            batchCode: res.batchCode
          };
          this.basicForm = res;
          // if (this.basicForm.distributeType == "13") {
          //   this.queenAndGroupShow = false;
          // } else {
          //   this.queenAndGroupShow = true;
          // }
          let arr = [];
          let brr = [];
          if (res.queueInfo) {
            this.queueSelection = res.queueInfo; //选中的
            res.queueInfo.forEach(element => {
              arr.push(element.name);
            });
          }
          if (res.groupInfo) {
            this.groupSelection = res.groupInfo; //选中的
            res.groupInfo.forEach(item => {
              brr.push(item.name);
            });
          }
          this.queueStr = arr.toString(); //显示出来的
          this.groupStr = brr.toString(); //显示出来的
          this.getBatchInfoBysupply(); //获取---批次信息
          this.getProperty(); //获取计划属性
          //获取当前计划下的房源统计信息
          this.getTotalList();
          //获取当前计划下关联的房源信息
          this.getHouseInfoFromPlan();
          //对获取到的供应计划转字典
          console.log(this.basicForm.supplyCode, this.supplyCodeOptions)
          this.supplyCodeOptions.map(item =>{
            if(item.value == this.basicForm.supplyCode) this.basicForm.supplyCode = item.name
          })
          this.supplyCode
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.planGuid = this.$parent.params.planGuid = this.$route.params.guid;
  },
  mounted() {
    this.getPlanFunction();
    if (this.$parent.params.planGuid) {
      this.getHousePlanByGuid(); //获取房源计划详情信息
    } else {
      // 初始化新计划中一些基本信息
      http
        .initPlanInProcess()
        .then(res => {
          this.basicForm = res;
          if (res.activityName == "编制") {
            this.basicFormShow = false; //审核意见表格显隐控制
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
