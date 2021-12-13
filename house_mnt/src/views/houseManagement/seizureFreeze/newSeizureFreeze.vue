<!--查封冻结新增 -->
<template>
  <div id="newseizureFreeze" class="page-detail">
    <div class="content">
      <div class="tableStyle">
        <div class="dialogContent">
          <publicTitle title="查封详情"></publicTitle>
          <table :model="newSeizureFreezeDetail">
            <tr>
              <td class="must">小区名称</td>
              <td>
                <el-input
                  v-model="newSeizureFreezeDetail.districtName"
                  :disabled="!(this.$route.params.state == 'notlibrary')"
                ></el-input>
              </td>
              <td>栋号</td>
              <td>
                <el-input
                  v-model="newSeizureFreezeDetail.buildNo"
                  :disabled="!(this.$route.params.state == 'notlibrary')"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td class="must">房号</td>
              <td>
                <el-input
                  v-model="newSeizureFreezeDetail.houseNo"
                  :disabled="!(this.$route.params.state == 'notlibrary')"
                ></el-input>
              </td>
              <td>被查封人/单位</td>
              <td>
                <el-input
                  v-model="newSeizureFreezeDetail.beSealUpObject"
                  clearable
                  :disabled="edit"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td>被查封人身份证/单位回执号</td>
              <td>
                <el-input
                  v-model="newSeizureFreezeDetail.beSealUpIdentityCardNo"
                  clearable
                  :disabled="edit"
                ></el-input>
              </td>
              <td>办文编号</td>
              <td>
                <el-input v-model="newSeizureFreezeDetail.officeNumber" clearable :disabled="edit"></el-input>
              </td>
            </tr>
            <tr>
              <td>查封合同号</td>
              <td>
                <el-input v-model="newSeizureFreezeDetail.contractNo" clearable :disabled="edit"></el-input>
              </td>
              <td>查封文号</td>
              <td>
                <el-input v-model="newSeizureFreezeDetail.sealUpNo" clearable :disabled="edit"></el-input>
              </td>
            </tr>
            <tr>
              <td class="must">查封类型</td>
              <td>
                <el-select
                  v-model="newSeizureFreezeDetail.unitType"
                  placeholder="--请选择--"
                  class="w100"
                  clearable
                  style="width:100%"
                  :disabled="edit"
                >
                  <el-option
                    v-for="item in unitTypeData"
                    :label="item.name"
                    :value="item.value"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </td>
              <td>查封单位</td>
              <td>
                <el-input v-model="newSeizureFreezeDetail.sealUpUnit" clearable :disabled="edit"></el-input>
              </td>
            </tr>
            <tr>
              <td>查封单位联系人</td>
              <td>
                <el-input
                  v-model="newSeizureFreezeDetail.sealUpUnitContact"
                  clearable
                  :disabled="edit"
                ></el-input>
              </td>
              <td>查封单位联系电话</td>
              <td>
                <el-input
                  v-model="newSeizureFreezeDetail.sealUpUnitPhone"
                  clearable
                  :disabled="edit"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td>查封期限(按月计算)</td>
              <td>
                <el-input v-model="newSeizureFreezeDetail.sealUpDeadLine" clearable disabled></el-input>
              </td>
              <td :class="newSeizureFreezeDetail.unitType == 1 && isMust == 0? 'must' : ''">查封有效期起</td>
              <td>
                <el-date-picker
                  v-model="newSeizureFreezeDetail.sealUpBeginTime"
                  type="date"
                  placeholder="选择日期"
                  style="width:100%"
                  :disabled="edit"
                  @change="getMonthsCount(newSeizureFreezeDetail.sealUpBeginTime,newSeizureFreezeDetail.sealUpEndTime,newSeizureFreezeDetail.sealUpDeadLine,'查封详情')"
                ></el-date-picker>
              </td>
            </tr>
            <tr>
              <td :class="newSeizureFreezeDetail.unitType == 1 && isMust == 0? 'must' : ''">查封有效期止</td>
              <td colspan="3">
                <el-date-picker
                  v-model="newSeizureFreezeDetail.sealUpEndTime"
                  type="date"
                  placeholder="选择日期"
                  style="width:100%"
                  :disabled="edit"
                  @change="getMonthsCount(newSeizureFreezeDetail.sealUpBeginTime,newSeizureFreezeDetail.sealUpEndTime,newSeizureFreezeDetail.sealUpDeadLine,'查封详情')"
                ></el-date-picker>
              </td>
            </tr>
            <tr>
              <td>查封说明</td>
              <td colspan="3">
                <el-input
                  type="textarea"
                  v-model="newSeizureFreezeDetail.description"
                  rows="6"
                  clearable
                  :disabled="edit"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td>查封人</td>
              <td>
                <el-input v-model="newSeizureFreezeDetail.seizor" disabled></el-input>
              </td>
              <td>查封时间</td>
              <td>
                <el-date-picker
                  v-model="newSeizureFreezeDetail.sealUpTime"
                  type="date"
                  placeholder="选择日期"
                  style="width:100%"
                  disabled
                ></el-date-picker>
              </td>
            </tr>
          </table>
        </div>
        <div class="dialogContent">
          <publicTitle title="续封详情" v-if="!(this.renewalList.length==0)"></publicTitle>
          <div v-for="(item,index) in  renewalList" :key="index">
            <table :model="item">
              <tr>
                <td>小区名称</td>
                <td>
                  <el-input v-model="item.districtName" disabled></el-input>
                </td>
                <td>栋号</td>
                <td>
                  <el-input v-model="item.buildNo" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>房号</td>
                <td>
                  <el-input v-model="item.houseNo" disabled></el-input>
                </td>
                <td>被查封人/单位</td>
                <td>
                  <el-input v-model="item.beSealUpObject" clearable disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>被查封人身份证/单位回执号</td>
                <td>
                  <el-input v-model="item.beSealUpIdentityCardNo" clearable disabled></el-input>
                </td>
                <td>办文编号</td>
                <td>
                  <el-input v-model="item.officeNumber" clearable :disabled="item.state"></el-input>
                </td>
              </tr>
              <tr>
                <td>查封合同号</td>
                <td>
                  <el-input v-model="item.contractNo" clearable :disabled="item.state"></el-input>
                </td>
                <td>查封文号</td>
                <td>
                  <el-input v-model="item.sealUpNo" clearable :disabled="item.state"></el-input>
                </td>
              </tr>
              <tr>
                <td class="must">查封类型</td>
                <td>
                  <el-select
                    v-model="item.unitType"
                    placeholder="--请选择--"
                    class="w100"
                    clearable
                    style="width:100%"
                    disabled
                  >
                    <el-option
                      v-for="item in unitTypeData"
                      :label="item.name"
                      :value="item.value"
                      :key="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>查封单位</td>
                <td>
                  <el-input v-model="item.sealUpUnit" clearable :disabled="item.state"></el-input>
                </td>
              </tr>
              <tr>
                <td>查封单位联系人</td>
                <td>
                  <el-input v-model="item.sealUpUnitContact" clearable :disabled="item.state"></el-input>
                </td>
                <td>查封单位联系电话</td>
                <td>
                  <el-input v-model="item.sealUpUnitPhone" clearable :disabled="item.state"></el-input>
                </td>
              </tr>
              <tr>
                <td>查封期限(按月计算)</td>
                <td>
                  <el-input v-model="item.sealUpDeadLine" clearable disabled></el-input>
                </td>
                <td class="must">查封有效期起</td>
                <td>
                  <el-date-picker
                    v-model="item.sealUpBeginTime"
                    type="date"
                    placeholder="选择日期"
                    style="width:100%"
                    :disabled="item.state"
                    @change="getMonthsCount(item.sealUpBeginTime,item.sealUpEndTime,item.sealUpDeadLine,'续封详情')"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td class="must">查封有效期止</td>
                <td colspan="3">
                  <el-date-picker
                    v-model="item.sealUpEndTime"
                    type="date"
                    placeholder="选择日期"
                    style="width:100%"
                    :disabled="item.state"
                    @change="getMonthsCount(item.sealUpBeginTime,item.sealUpEndTime,item.sealUpDeadLine,'续封详情')"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>查封说明</td>
                <td colspan="3">
                  <el-input
                    type="textarea"
                    v-model="item.description"
                    rows="6"
                    clearable
                    :disabled="item.state"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td>查封人</td>
                <td>
                  <el-input v-model="item.seizor" disabled></el-input>
                </td>
                <td>查封时间</td>
                <td>
                  <el-date-picker
                    v-model="item.sealUpTime"
                    type="date"
                    placeholder="选择日期"
                    style="width:100%"
                    disabled
                  ></el-date-picker>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div
          class="dialogContent"
          v-if="this.$route.params.state == 'deArchive'||(this.$route.params.state =='check'&&this.newSeizureFreezeDetail.unSealUpReason)"
        >
          <publicTitle title="解封"></publicTitle>
          <table :model="newSeizureFreezeDetail">
            <tr>
              <td>解封说明</td>
              <td colspan="3">
                <el-input
                  type="textarea"
                  v-model="newSeizureFreezeDetail.unSealUpReason"
                  :disabled="!(this.$route.params.state == 'deArchive')"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td>解封人</td>
              <td>
                <el-input v-model="newSeizureFreezeDetail.unSeizor" disabled></el-input>
              </td>
              <td>解封日期</td>
              <td>
                <el-date-picker
                  v-model="newSeizureFreezeDetail.unSealUpTime"
                  type="date"
                  placeholder="选择日期"
                  style="width:100%"
                  disabled
                ></el-date-picker>
              </td>
            </tr>
          </table>
        </div>
        <div style="text-align:center" class="buttonGroup">
          <el-button
            type="primary"
            size="mini"
            slot="publicTitleRight"
            v-if="this.$route.params.state=='new'||this.$route.params.state=='notlibrary'"
            @click="saveSealfreezeDetail"
          >保存</el-button>
          <el-button
            type="primary"
            size="mini"
            slot="publicTitleRight"
            v-if="this.$route.params.state=='edit'"
            @click="editSave"
          >保存</el-button>
          <el-button
            type="primary"
            size="mini"
            v-if="this.$route.params.state == 'continueSeal'"
            @click="saveRenewal"
          >保存</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="saveUnseal"
            v-if="this.$route.params.state=='deArchive'"
          >保存</el-button>
          <el-button
            type="primary"
            size="mini"
            v-if="this.$route.params.state=='check'"
            @click="print"
          >打印</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/api/freezeSeized.js";
import http from "@/api/housestore.js";
import publicTitle from "@/components/TitleStylex"; //标题组件
export default {
  data() {
    return {
      newSeizureFreezeDetail: {
        districtName: "", //小区名称
        buildingName: "",
        houseNo: "",
        beSealUpObject: "",
        beSealUpIdentityCardNo: "",
        officeNumber: "",
        contractNo: "",
        sealUpNo: "",
        unitType: "",
        sealUpUnit: "",
        sealUpUnitContact: "",
        sealUpUnitPhone: "",
        sealUpDeadLine: "",
        sealUpBeginTime: "",
        sealUpEndTime: "",
        description: "",
        seizor: "",
        renewDetails: "",
        sealUpTime: new Date()
      }, //新增查封冻结详情页数据
      unitTypeData: [], //查封类型
      renewalList: [], //续封列表
      edit: "", //表示是否可编辑
      isMust: "",//新增进来还是查封中进来
    };
  },
  components: {
    publicTitle
  },
  methods: {
    //计算月份差
    getMonthsCount(startDate, endDate, result, title) {
      if (!startDate) {
        this.$message({
          type: "info",
          message: "请填写查封有效期起"
        });
      } else if (!endDate) {
        this.$message({
          type: "info",
          message: "请填写查封有效期止"
        });
      } else if (new Date(startDate) > new Date(endDate)) {
        this.$message({
          type: "info",
          message: "查封有效期起不能大于查封有效期止"
        });
      } else {
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        let yearDiff = endDate.getYear() - startDate.getYear();
        // 月份差
        let monthDiff = endDate.getMonth() - startDate.getMonth();
        // 总的月数量
        let monthCount = monthDiff + yearDiff * 12;
        // 天数差
        let dayDiff = endDate.getDate() - startDate.getDate();
        // 不足一个月按一个月计算
        if (dayDiff > 0 || dayDiff == 0) {
          monthCount = monthCount + 1;
        }
        if (title == "续封详情") {
          this.renewalList[
            this.renewalList.length - 1
          ].sealUpDeadLine = monthCount;
        } else if (title == "查封详情") {
          this.newSeizureFreezeDetail.sealUpDeadLine = monthCount;
        }
      }
    },
    //打印
    print() {
      let val = this.newSeizureFreezeDetail;
      if (val.unSealUpNo == 0) {
        this.printUnsealedSheet();
      } else {
        this.printClosureForm();
      }
    },
    //打印查封单
    printClosureForm() {
      let params = {};
      api
        .getReportUrl(params)
        .then(res => {
          let bdTokenUrl = "";
          if (res) {
            bdTokenUrl =
              res +
              "?rpx=phbip%2F%E6%88%BF%E6%BA%90-%E6%9F%A5%E5%B0%81%E4%BF%A1%E6%81%AF%E8%A1%A8.rpx&argRpx=&scale=1.0&guid=" +
              encodeURI(this.$route.params.guid);
          } else {
            bdTokenUrl =
              "http://123.207.87.250:8081/report/reportJsp/showReport.jsp?rpx=phbip%2F%E6%88%BF%E6%BA%90-%E6%9F%A5%E5%B0%81%E4%BF%A1%E6%81%AF%E8%A1%A8.rpx&argRpx=&scale=1.0&guid=" +
              encodeURI(this.$route.params.guid);
          }
          window.open(bdTokenUrl);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //打印解封单
    printUnsealedSheet() {
      let params = {};
      api
        .getReportUrl(params)
        .then(res => {
          let bdTokenUrl = "";
          if (res) {
            bdTokenUrl =
              res +
              "?rpx=phbip%2F%E6%88%BF%E6%BA%90-%E8%A7%A3%E5%B0%81%E4%BF%A1%E6%81%AF%E8%A1%A8.rpx&argRpx=&scale=1.0&guid=" +
              encodeURI(this.$route.params.guid);
          } else {
            bdTokenUrl =
              "http://123.207.87.250:8081/report/reportJsp/showReport.jsp?rpx=phbip%2F%E6%88%BF%E6%BA%90-%E8%A7%A3%E5%B0%81%E4%BF%A1%E6%81%AF%E8%A1%A8.rpx&argRpx=&scale=1.0&guid=" +
              encodeURI(this.$route.params.guid);
          }
          window.open(bdTokenUrl);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取字典数据
    getDictionary() {
      let nameData = ["查封类型"];
      let params = { names: nameData.toString() };
      http
        .getDictionary(params)
        .then(res => {
          this.unitTypeData = JSON.parse(res).查封类型;
          console.log(this.unitTypeData)
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取查封冻结查看详情的接口
    getSealfreezeInfo() {
      let params = {
        houseGuid: this.$route.params.houseGuid
      };
      api
        .getSealfreezeInfo(params)
        .then(res => {
          this.newSeizureFreezeDetail.districtName = res.districtName;
          this.newSeizureFreezeDetail.buildNo = res.buildNo;
          this.newSeizureFreezeDetail.houseNo = res.houseNo;
          this.newSeizureFreezeDetail.beSealUpObject = res.beSealUpObject;
          this.newSeizureFreezeDetail.beSealUpIdentityCardNo =
            res.beSealUpIdentityCardNo;
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
          if (this.$route.params.state == "new") {
            this.newSeizureFreezeDetail.seizor = res.userName;
          }
          if (this.$route.params.state == "deArchive") {
            this.newSeizureFreezeDetail.unSeizor = res.userName;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存查封冻结详情的接口
    saveSealfreezeDetail() {
      if (this.$route.params.state == "notlibrary") {
        if (!this.newSeizureFreezeDetail.districtName) {
          this.$message({
            type: "info",
            message: "请填写小区名称"
          });
        } else if (!this.newSeizureFreezeDetail.houseNo) {
          this.$message({
            type: "info",
            message: "请填写房号"
          });
        } else if (!this.newSeizureFreezeDetail.unitType) {
          this.$message({
            type: "info",
            message: "请填写查封类型"
          });
        } else if (this.newSeizureFreezeDetail.unitType == 1) {
          if (!this.newSeizureFreezeDetail.sealUpBeginTime) {
            this.$message({
              type: "info",
              message: "请填写查封有效期起"
            });
          } else if (!this.newSeizureFreezeDetail.sealUpEndTime) {
            this.$message({
              type: "info",
              message: "请填写查封有效期止"
            });
          } else if (
            this.newSeizureFreezeDetail.sealUpBeginTime >
            this.newSeizureFreezeDetail.sealUpEndTime
          ) {
            this.$message({
              type: "info",
              message: "查封有效期起不能大于查封有效期止"
            });
          } else {
            this.saveSealfreezeDetails();
          }
        } else {
          this.saveSealfreezeDetails();
        }
      } else {
        if (!this.newSeizureFreezeDetail.unitType) {
          this.$message({
            type: "info",
            message: "请填写查封类型"
          });
        } else if (this.$route.query.mustState != 1) {
          if(this.newSeizureFreezeDetail.unitType == 1){
            if (!this.newSeizureFreezeDetail.sealUpBeginTime) {
              this.$message({
                type: "info",
                message: "请填写查封有效期起"
              });
            } else if (!this.newSeizureFreezeDetail.sealUpEndTime) {
              this.$message({
                type: "info",
                message: "请填写查封有效期止"
              });
            } else if (
              this.newSeizureFreezeDetail.sealUpBeginTime >
              this.newSeizureFreezeDetail.sealUpEndTime
            ) {
              this.$message({
                type: "info",
                message: "查封有效期起不能大于查封有效期止"
              });
            } else {
              this.saveSealfreezeDetails();
            }
          } else {
            this.saveSealfreezeDetails();
        }
        } else {
          this.saveSealfreezeDetails();
        }
      }
    },
    //保存查封冻结详情
    saveSealfreezeDetails() {
      this.$confirm("此操作将进行保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {};
          this.newSeizureFreezeDetail.houseGuid = this.$route.params.houseGuid;
          let data = this.newSeizureFreezeDetail;
          api
            .saveSealfreezeDetail(params, data)
            .then(res => {
              if (res) {
                if (res) {
                  this.$message({
                    type: "success",
                    message: "保存成功"
                  });
                  this.closeTopTab();
                  this.Event.$emit("seizureFreeze", "getSealfreezeList");
                }
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
    //查封/冻结-获取选中的查封详情
    getSealfreezeHouseListDetail() {
      let params = {
        guid: this.$route.params.guid
      };
      api
        .getSealfreezeHouseListDetail(params)
        .then(res => {
          if (res) {
            res.forEach(ele => {
              if (ele.unitType) {
                ele.unitType = ele.unitType.toString();
              }
              if (ele.renew == true) {
                ele.state = true;
                this.renewalList.push(ele);
              } else {
                this.newSeizureFreezeDetail = ele;
              }
            });
            if (this.$route.params.state == "edit") {
              if (this.renewalList.length == 0) {
                this.edit = false;
              } else {
                this.renewalList[this.renewalList.length - 1].state = false;
              }
            } else if (this.$route.params.state == "deArchive") {
              this.newSeizureFreezeDetail.unSealUpTime = new Date();
              this.getUserName();
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //编辑保存
    editSave() {
      this.$confirm("此操作将进行保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.renewalList.length == 0) {
            if (!this.newSeizureFreezeDetail.unitType) {
              this.$message({
                type: "info",
                message: "请填写查封类型"
              });
            } else if (this.newSeizureFreezeDetail.unitType == 1) {
              if (!this.newSeizureFreezeDetail.sealUpEndTime) {
                  this.$message({
                    type: "info",
                    message: "请填写查封有效期止"
                  });
                } else if (
                  this.newSeizureFreezeDetail.sealUpBeginTime >
                  this.newSeizureFreezeDetail.sealUpEndTime
                ) {
                  this.$message({
                    type: "info",
                    message: "查封有效期起不能大于查封有效期止"
                  });
                } else {
                  let params = {};
                  let data = this.newSeizureFreezeDetail;
                  api.editSave(params, data).then(res => {
                    if (res) {
                      this.$message({
                        type: "success",
                        message: "保存成功"
                      });
                      this.closeTopTab();
                      this.Event.$emit(
                        "seizureFreezeDetail",
                        "getSealfreezeHouseList"
                      );
                    }
                  }).catch(err => {});
                }
              }else {
                let params = {};
                let data = this.newSeizureFreezeDetail;
                api.editSave(params, data).then(res => {
                  if (res) {
                    this.$message({
                      type: "success",
                      message: "保存成功"
                    });
                    this.closeTopTab();
                    this.Event.$emit(
                      "seizureFreezeDetail",
                      "getSealfreezeHouseList"
                    );
                  }
                }).catch(err => {});
              }
            } else {
            if (!this.renewalList[this.renewalList.length - 1].unitType) {
              this.$message({
                type: "info",
                message: "请填写查封类型"
              });
            } else if (
              !this.renewalList[this.renewalList.length - 1].sealUpBeginTime
            ) {
              this.$message({
                type: "info",
                message: "请填写查封有效期起"
              });
            } else if (
              !this.renewalList[this.renewalList.length - 1].sealUpEndTime
            ) {
              this.$message({
                type: "info",
                message: "请填写查封有效期止"
              });
            } else if (
              this.renewalList[this.renewalList.length - 1].sealUpBeginTime >
              this.renewalList[this.renewalList.length - 1].sealUpEndTime
            ) {
              this.$message({
                type: "info",
                message: "查封有效期起不能大于查封有效期止"
              });
            } else {
              let params = {};
              let data = this.renewalList[this.renewalList.length - 1];
              api
                .editSave(params, data)
                .then(res => {
                  if (res) {
                    this.$message({
                      type: "success",
                      message: "保存成功"
                    });
                    this.closeTopTab();
                    this.Event.$emit(
                      "seizureFreezeDetail",
                      "getSealfreezeHouseList"
                    );
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存"
          });
        });
    },
    //得到续封详情
    getRenewal() {
      this.renewalList = [];
      let params = {
        houseGuid: this.$route.params.houseGuid
      };
      api
        .getRenewal(params)
        .then(res => {
          if (res) {
            res.forEach(ele => {
              if (ele.unitType) {
                ele.unitType = ele.unitType.toString();
              }
              ele.state = true;
              if (ele.renew == true) {
                this.renewalList.push(ele);
              } else {
                this.newSeizureFreezeDetail = ele;
              }
            });
            this.renewalList[this.renewalList.length - 1].state = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //续封里面的保存
    saveRenewal() {
      this.$confirm("此操作将进行保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!this.renewalList[this.renewalList.length - 1].unitType) {
            this.$message({
              type: "info",
              message: "请填写查封类型"
            });
          } else if (
            this.renewalList[this.renewalList.length - 1].unitType == 1
          ) {
            // if (
            //   !this.renewalList[this.renewalList.length - 1].sealUpBeginTime
            // ) {
            //   this.$message({
            //     type: "info",
            //     message: "请填写查封有效期起"
            //   });
            // } 
            //  else if (
            //   !this.renewalList[this.renewalList.length - 1].sealUpEndTime
            // ) {
            //   this.$message({
            //     type: "info",
            //     message: "请填写查封有效期止"
            //   });
            // }
            //  else if (
            //   this.renewalList[this.renewalList.length - 1].sealUpBeginTime >
            //   this.renewalList[this.renewalList.length - 1].sealUpEndTime
            // ) {
            //   this.$message({
            //     type: "info",
            //     message: "查封有效期起不能大于查封有效期止"
            //   });
            // } 
            if (this.renewalList) {
                this.renewalList.forEach(ele => {
                  ele.unSealUpNo += 1;
                });
              }
              let params = {
                houseGuid: this.newSeizureFreezeDetail.houseGuid,
                guid: this.newSeizureFreezeDetail.guid
              };
              let data = this.renewalList[this.renewalList.length - 1];
              api
                .saveRenewal(params, data)
                .then(res => {
                  if (res) {
                    this.$message({
                      type: "success",
                      message: "保存成功"
                    });
                    this.closeTopTab();
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            
          } else {
            if (this.renewalList) {
              this.renewalList.forEach(ele => {
                ele.unSealUpNo += 1;
              });
            }
            let params = {
              houseGuid: this.newSeizureFreezeDetail.houseGuid,
              guid: this.newSeizureFreezeDetail.guid
            };
            let data = this.renewalList[this.renewalList.length - 1];
            api
              .saveRenewal(params, data)
              .then(res => {
                if (res) {
                  this.$message({
                    type: "success",
                    message: "保存成功"
                  });
                  this.closeTopTab();
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存"
          });
        });
    },
    //解封里面的保存
    saveUnseal() {
      this.$confirm("此操作将进行保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            guid: this.newSeizureFreezeDetail.guid,
            unSeizor: this.newSeizureFreezeDetail.unSeizor,
            unSealUpReason: this.newSeizureFreezeDetail.unSealUpReason
          };
          api
            .saveUnseal(params)
            .then(res => {
              if (res) {
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
                this.closeTopTab();
                this.Event.$emit(
                  "seizureFreezeDetail",
                  "getSealfreezeHouseList"
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
  mounted() {
    this.getDictionary();
    // this.getUserName(); //获取登录名
    if (this.$route.params.state == "new") {
      this.getUserName();
      this.getSealfreezeInfo();
      this.edit = false;
    } else if (this.$route.params.state == "check") {
      this.getSealfreezeHouseListDetail();
      this.edit = true;
    } else if (this.$route.params.state == "edit") {
      this.getSealfreezeHouseListDetail();
    } else if (this.$route.params.state == "continueSeal") {
      this.getRenewal();
      this.edit = true;
    } else if (this.$route.params.state == "deArchive") {
      this.getSealfreezeHouseListDetail();
      this.edit = true;
    } else if (this.$route.params.state == "notlibrary") {
      this.edit = false;
    }
    //获取是轮候状态还是新增(1是查封中（轮候），0是新增)
    this.isMust = this.$route.query.mustState
    console.log(this.isMust)
  }
};
</script> 

<style lang="scss" scoped>
#newseizureFreeze {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
