<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: zhaoyy1
 * @Date: 2019-09-10 17:33:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-23 15:19:35
 -->
<template>
  <div class="tungMessage">
    <div class="search_box">
      <el-form size="mini" label-width="3rem" labelPosition="left">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="栋号">
              <el-input
                v-model="form.code"
                placeholder="请输入内容"
                clearable
                @keyup.enter.native="getDInfo"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="栋名称" label-width="4rem">
              <el-input
                v-model="form.name"
                placeholder="请输入内容"
                clearable
                @keyup.enter.native="getDInfo"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否带电梯" label-width="6rem">
              <el-select
                v-model="form.elevator"
                clearable
                @keyup.enter.native="getDInfo"
              >
                <el-option
                  v-for="item in isElevator"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="总楼层数" label-width="5rem">
              <el-input
                v-model="form.floorCount"
                placeholder="请输入内容"
                clearable
                @keyup.enter.native="getDInfo"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="裙楼层数" label-width="5rem">
              <el-input
                v-model="form.skirtFloorCount"
                placeholder="请输入内容"
                clearable
                @keyup.enter.native="getDInfo"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="宗地号" label-width="4rem">
              <el-input
                v-model="form.landNo"
                placeholder="请输入内容"
                clearable
                @keyup.enter.native="getDInfo"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="mini" @click="getDInfo"
              >查询</el-button
            >
            <el-button type="primary" size="mini" @click="reset"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="quarterMessage_box">
      <div style="margin-bottom: 15px">
        <el-button
          type="primary"
          size="mini"
          class="button_right add"
          @click="add"
          :disabled="ban"
          >新增</el-button
        >
        <el-button
          type="danger"
          size="mini"
          class="button_right delete"
          @click="deleteBox"
          :disabled="ban"
          >删除
        </el-button>
        <el-button
          type="primary"
          size="mini"
          class="button_right delete"
          @click="checkReseau"
          :disabled="ban"
          >二次编码核验
        </el-button>
      </div>
      <template>
        <el-table
          ref="multipleTable"
          :data="tungListData"
          :row-class-name="tableRowClassName"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          border
          :header-cell-style="{
            background: '#E6F0FC',
            color: '#606266',
            'text-align': 'center',
            'border-color': '#DBDBDB',
          }"
          :cell-style="{
            'text-align': 'center',
            'border-color': '#DBDBDB',
          }"
        >
          <el-table-column type="selection" :selectable="isDisabled">
          </el-table-column>
          <el-table-column
            label="序号"
            type="index"
            width="60"
            :index="indexMethod"
          ></el-table-column>
          <el-table-column
            prop="districtName"
            label="小区名称"
          ></el-table-column>
          <el-table-column prop="code" label="栋号"></el-table-column>
          <el-table-column prop="name" label="栋名称"></el-table-column>
          <el-table-column prop="elevator" label="是否带电梯">
            <template slot-scope="scope">
              <span v-if="scope.row.elevator === true">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column prop="floorCount" label="总楼层数"></el-table-column>
          <el-table-column
            prop="skirtFloorCount"
            label="裙楼层数"
          ></el-table-column>
          <el-table-column prop="landNo" label="宗地号"></el-table-column>
          <el-table-column prop label="操作" width="450">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="copy(scope.row)"
                :disabled="
                  (!scope.row.createSelf && scope.row.createSelf != null) || ban
                "
                >复制
              </el-button>
              <el-button
                size="mini"
                type="warning"
                @click="edit(scope.row)"
                :disabled="
                  (!scope.row.createSelf && scope.row.createSelf != null) || ban
                "
                >编辑
              </el-button>
              <el-button size="mini" type="warning" @click="check(scope.row)"
                >查看</el-button
              >
              <el-button
                size="mini"
                type="primary"
                @click="newHouse(scope.row)"
                :disabled="
                  ban || (!scope.row.createSelf && scope.row.createSelf != null)
                "
                >新增房源</el-button
              >
              <el-button
                size="mini"
                type="primary"
                @click="checkHouse(scope.row)"
                >查看房源</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template>
        <div class="block page_box">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageObj.currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="pageObj.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageObj.total"
          ></el-pagination>
        </div>
      </template>
    </div>
    <el-dialog
      title="对接测绘数据"
      :visible.sync="dialogFormVisible"
      width="70%"
      :close-on-click-modal="false"
    >
      <el-form :model="form">
        <p>请输入建筑物ID进行查询</p>
        <div class="search_input">
          <input type="text" v-model="bullidID" />
          <el-button type="primary" size="small" @click="query"
            >查 询</el-button
          >
        </div>
      </el-form>
      <div class="quarterMessage_box">
        <template>
          <el-table
            :data="tungList"
            style="width: 100%"
            border
            :row-class-name="tableRowClassName"
            :header-cell-style="{
              background: '#E6F0FC',
              color: '#606266',
              'text-align': 'center',
              'border-color': '#DBDBDB',
            }"
            :cell-style="{
              'text-align': 'center',
              'border-color': '#DBDBDB',
            }"
          >
            <el-table-column
              prop="buildID"
              label="建筑物ID"
              width="80"
            ></el-table-column>
            <el-table-column
              prop="riseId"
              label="栋号"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="栋名称"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="landNo"
              label="宗地号"
              width="120"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="floorCount"
              label="楼层号"
              width="120"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="skirtFloorCount"
              label="裙楼层数"
              width="120"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="subFloorCount"
              label="底下层数"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="coveredArea"
              label="建筑面积"
              show-overflow-tooltip
            ></el-table-column>
          </el-table>
        </template>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addBuilding2">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 复制弹窗 -->
    <el-dialog
      title="复制栋"
      :visible.sync="copyFormVisible"
      width="50%"
      :close-on-click-modal="false"
    >
      <div class="quarterMessage_box">
        <el-form
          ref="form"
          :model="copyFrom"
          label-width="7rem"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="复制来源">
                <el-input v-model="copyFrom.name" readonly disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="复制到">
                <el-col :span="12">
                  <el-form-item label="栋号">
                    <el-input
                      placeholder
                      v-model="copyFrom.buildingNo"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="位数">
                    <el-input placeholder v-model="copyFrom.num"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="其他">
                <el-col :span="12">
                  <el-form-item label="复制房源">
                    <el-switch
                      v-model="copyFrom.copyHouse"
                      class="el-input"
                      style="line-height: 39px"
                    ></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="保留原有材料">
                    <el-switch
                      v-model="copyFrom.saveOldDate"
                      class="el-input"
                      style="line-height: 39px"
                    ></el-switch>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="copyFormVisible = false" size="mini"
          >取 消</el-button
        >
        <el-button type="primary" @click="copyTung" size="mini"
          >确 定</el-button
        >
      </div>
      <div class="title">
        <h5>温情提示</h5>
        <p>
          1、若需要连续复制多栋，请用半角冒号分隔。例如您需要复制从A栋到M栋（合计13栋）产房信息，在复制到栋号中录入A：M。
        </p>
        <p>
          2、若栋号位数为多位时，请在位数中录入您需要的位数。位数不能大于10。
        </p>
      </div>
    </el-dialog>
    <!-- 删除确认弹窗 -->
    <el-dialog
      title="删除栋"
      :visible.sync="dialogFormVgetisible1"
      width="30%"
      id="delete_box"
      :close-on-click-modal="false"
    >
      <el-form :model="form">
        <p>确定删除该栋及其栋详情吗？</p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deteleTung" type="primary" size="mini"
          >确 定</el-button
        >
        <el-button @click="dialogFormVgetisible1 = false" size="mini"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
  <!-- 栋信息和新增栋模板结束-->
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import http from "@/api/common(bj).js";
import common from "@/api/common.js";
export default {
  name: "tungmessage",
  data() {
    return {
      multipleSelection: [],
      copyFormVisible: false,
      buildingNo: "", //复制到栋号
      tungListData: [], //栋信息列表
      isElevator: [
        { name: "是", value: true },
        { name: "否", value: false },
      ], //是否带电梯
      bullidID: "", //建筑Id
      tungList: [], //测绘数据栋列表
      tungListObj: {}, //测绘数据栋信息
      isTungListShow: false, //是否显示测绘数据栋列表
      dialogFormVisible: false,
      pageObj: {
        currentPage4: 1,
        pageSize: 100,
        total: 0,
      },
      copyFrom: {
        buildingGuid: "", //复制来源栋标识
        buildingNo: "", //复制到：栋号
        copyHouse: false, //是否复制房源
        num: "", //复制来：位数
        saveOldDate: false,
      },
      form: {
        code: "",
        name: "",
        elevator: "",
        skirtFloorCount: "",
        landNo: "",
        floorCount: "",
      },
      dto1: {},
      dto: {
        baseArea: "", //基层面积
        buildBasic: "", //建筑基础
        buildID: "string",
        buildingInfoMaintainBelong: "", //栋信息维护归属
        code: "", //小区号
        construction: "", //建筑结构
        coveredArea: "", //建筑面积
        deliveryTime: "", //交付时间
        districtGuid: "string", //小区标识
        districtName: "string", //小区名称
        elevator: "", //是否带电梯
        finishConstructionTime: "", // 竣工时间
        floorCount: "", //楼层数
        groundFloorUse: "", //底层用途
        guid: "string", //唯一标识
        houseType: "", //房屋类型
        houseTypeName: "string", //房屋类型名称
        landNo: "", //宗地号
        middleFloor: "string", //指定中间层
        name: "", //栋名称(幢名称)
        otherArea: "", //其他面积
        parentGuid: "string", //幢标识
        pictureCode: "string", //图片代码
        regionDistrictGuid: "", //大区标识
        remark: "说明", //备注
        reportGuid: "string", //上报标识
        riseId: "string", //栋编码
        selfSale: true, //是否代售
        serialNo: "string", //网格办编码（栋）
        shareArea: "", //分摊面积
        skirtFloorCount: "", //裙楼层数
        startConstructionTime: "", //开工时间
        state: 0, //状态
        subFloorCount: "", //地下层数
        unitCount: "", //单元总数
        usedName: "string", //曾用栋名
        usefulLife: "", //使用年限
        //栋号不确定
      },
      dialogFormVgetisible1: false,
      ban: false,
    };
  },
  methods: {
    //序号
    indexMethod(index) {
      return (
        index + (this.pageObj.currentPage4 - 1) * this.pageObj.pageSize + 1
      );
    },
    reset() {
      //重置搜素条件
      for (var i in this.form) {
        this.form[i] = "";
      }
    },
    // 编辑
    edit(row) {
      this.$parent.params.buildingGuid = row.guid;
      //打开新的tab页
      this.$parent.openTab({
        id: row.guid + "栋详细1",
        label: row.name,
        closable: true,
        meta: {
          state: "1", //1可编辑 0 查看 2新增
          landNoGuid: row.guid,
          menuId: "tungMessage",
        },
        component: () =>
          import("@/views/houseResource/houseInput/TungMessageEdit"),
      });
      this.Event.$emit("tungMessageEdit", { msg: row.guid });
    },
    // 查看
    check(row) {
      this.$parent.params.buildingGuid = row.guid;
      //打开新的tab页
      this.$parent.openTab({
        id: row.guid + "栋详细0",
        label: row.name,
        closable: true,
        meta: {
          state: "0", //1可编辑 0 查看 2新增
          landNoGuid: row.guid,
          itemName: this.$parent.params.itemName,
          menuId: "tungMessage",
        },
        component: () =>
          import("@/views/houseResource/houseInput/TungMessageEdit"),
      });
      this.Event.$emit("tungMessageEdit", { msg: row.guid });
    },
    deleteBox() {
      if (this.multipleSelection.length === 0) {
        this.open("请先选择栋");
        return;
      }
      this.dialogFormVgetisible1 = true;
    },
    // 点击复制
    copy(row) {
      this.copyFormVisible = true;
      this.copyFrom.buildingGuid = row.guid;
      this.copyFrom.name = row.name;
    },
    handleSizeChange(val) {
      this.pageObj.pageSize = val;
      this.getDInfo();
    },
    handleCurrentChange(val) {
      let Current = "Current";
      this.pageObj.currentPage4 = val;
      this.getDInfo(Current);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //提示框
    open(title) {
      this.$message(title);
    },
    // 对接测绘数据里面的栋信息
    addBuilding2() {
      var that = this;
      let dto = that.tungListObj;
      if (JSON.stringify(dto) == "{}") {
        that.open("请先查询栋");
      }
    },
    //删除栋
    deteleTung() {
      var that = this;
      let arr = [];
      that.multipleSelection.forEach(function (ele, index) {
        arr.push(ele.guid);
      });
      let data = arr;
      let params;
      if (this.$parent.params.source == "原有小区入库") {
        params = {
          districtGuid: this.$parent.params.projectGuid,
          itemName: "原有小区入库",
        };
      } else {
        params = { districtGuid: this.$parent.params.projectGuid };
      }
      http
        .deteleTung(params, data)
        .then((res) => {
          if (res) {
            that.$message({
              message: "删除成功",
              type: "success",
            });
            that.dialogFormVgetisible1 = false;
            that.getDInfo();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //复制栋 信息
    copyTung() {
      //必填项
      if (this.copyFrom.buildingNo == null || this.copyFrom.buildingNo == "") {
        this.$alert("请填写栋号！");
        return;
      }
      let data;
      let params;
      if (this.$parent.params.source == "原有小区入库") {
        params = {
          buildingGuid: this.copyFrom.buildingGuid,
          buildingNo: this.copyFrom.buildingNo,
          copyHouse: this.copyFrom.copyHouse,
          num: this.copyFrom.num,
          saveOldDate: this.copyFrom.saveOldDate,
          configName: "原有小区入库",
        };
      } else {
        params = {
          buildingGuid: this.copyFrom.buildingGuid,
          buildingNo: this.copyFrom.buildingNo,
          copyHouse: this.copyFrom.copyHouse,
          num: this.copyFrom.num,
          saveOldDate: this.copyFrom.saveOldDate,
        };
      }
      http
        .copyTung(params, data)
        .then((res) => {
          if (res.status == "success") {
            this.$message({
              message: "复制成功",
              type: "success",
            });
            this.getDInfo();
            this.copyFormVisible = false;
          } else {
            this.$message({
              message: "复制失败",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //对栋测绘数据的查询
    query() {
      var that = this;
      if (that.bullidID != "") {
        var params = {
          bullidID: that.bullidID,
        };
      } else {
        that.open("请输入建筑物ID进行查询!");
      }
    },
    //获取测绘数据栋
    getTung(optionsName, data) {
      var that = this;
      that.isTungListShow = true;
      that[optionsName] = data;
    },
    //提示框
    open(title) {
      this.$message(title);
    },
    // 新增
    add() {
      //判断是否保存小区
      if (this.$parent.params.projectGuid == "newguid") {
        this.$alert("请先创建小区！", "提示");
        return;
      }
      //打开新的tab页
      this.$parent.openTab({
        id: "tungMessageEdit",
        label: "新增栋",
        closable: true,
        meta: {
          state: "2", //1可编辑 0 查看 2新增
          menuId: "tungMessage",
        },
        component: () =>
          import("@/views/houseResource/houseInput/TungMessageEdit"),
      });
    },
    getDInfo(val) {
      //分页查询参数，分页归至为1
      if (val != "Current") {
        this.pageObj.currentPage4 = 1;
      }
      let params;
      params = {
        code: this.form.code,
        name: this.form.name,
        floorCount: this.form.floorCount,
        landNo: this.form.landNo,
        elevator: this.form.elevator,
        skirtFloorCount: this.form.skirtFloorCount,
        districtGuid: this.$parent.params.projectGuid,
        itemName: this.$parent.params.itemName,
        pageIndex: this.pageObj.currentPage4,
        pageSize: this.pageObj.pageSize,
      };
      if (this.$parent.params.source == "原有小区入库") {
        http
          .houseBuilding(params)
          .then((res) => {
            this.tungListData = res.content;
            this.pageObj.total = res.totalElements;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        http
          .getDInfo(params)
          .then((res) => {
            this.tungListData = res.content;
            this.pageObj.total = res.totalElements;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //新增房源
    newHouse(val) {
      //打开新的tab页
      this.$parent.openTab({
        id: val.guid + "新增房源",
        label: "新增房源",
        closable: true,
        meta: {
          state: "2", //1可编辑 0 查看 2新增
          menuId: "housingMessage",
          buildGuid: val.guid,
        },
        component: () => import("@/views/houseResource/houseInput/HousingEdit"),
      });
    },
    //查看房源
    checkHouse(val) {
      //打开新的tab页
      this.$parent.openTab({
        id: val.guid + "房源信息",
        label: "房源信息",
        closable: true,
        meta: {
          buildGuid: val.guid, //栋标识
          menuId: "housingMessage",
        },
        component: () =>
          import("@/views/houseResource/houseInput/HousingMessage"),
      });
    },
    //判断小区是否更改
    onLoad() {
      this.Event.$on("HouseInputTab", (data) => {
        if (data.msg == "ChangeSave") {
          this.getDInfo();
          this.dto1.districtName = this.$parent.params.districtName;
          this.dto1.landNo = this.$parent.params.landNo;
        }
      });
      //判断是否栋信息进行修改
      this.Event.$on("tungMessageEdit", (data) => {
        if (data.msg == "refresh") {
          this.getDInfo();
        }
      });
    },
    isDisabled(row) {
      if (row.createSelf === false) {
        return false;
      }
      return true;
    },
    tableRowClassName({ row }) {
      console.log(row);
      if (
        row.serialNo == null ||
        row.serialNo == "" ||
        row.standardAddress == null ||
        row.standardAddress == ""
      ) {
        return "warning";
      }
    },
    checkReseau() {
      this.$confirm("确认要对异常数据进行二次核验吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params;
          if (this.$parent.params.source == "原有小区入库") {
            params = {
              districtGuid: this.$parent.params.projectGuid,
              itemName: "原有小区入库",
              type: 9,
            };
          } else {
            params = { districtGuid: this.$parent.params.projectGuid, type: 9 };
          }
          common
            .checkReseau(params)
            .then((res) => {
               this.getDInfo()
              this.$message({
                message: "核验成功",
                type: "success",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消核验",
          });
        });
    },
    tableRowClassName({ row }) {
      console.log(row);
      if (
        row.serialNo == null ||
        row.serialNo == "" ||
        row.standardAddress == null ||
        row.standardAddress == ""
      ) {
        return "warning";
      }
    },
  },
  created() {
    this.onLoad();
    this.getDInfo();
    this.dto1.districtName = this.$parent.params.districtName;
    this.dto1.landNo = this.$parent.params.landNo;
    if (this.$parent.params.edit === "2") {
      this.ban = true;
    }
  },
  mounted() {
    console.log(this.$parent.params);
  },
};
</script>
<style lang="scss" scoped>
.tungMessage {
  .el-pagination {
    float: right;
    margin-top: 20px;
    text-align: right;
  }
  .el-switch {
    height: 39px;
  }
  //总样式增加禁用文字居中，此处单独修改
  /deep/ .quarterMessage_box .el-input.is-disabled .el-input__inner {
    text-align: left;
  }
  //表示紧急程度的矩形
  /deep/ .el-table__row.warning {
    background: #e6a23c;
    // .index::after {
    //   content: "";
    //   width: 25px;
    //   height: 25px;
    //   display: block;
    //   background: #e6a23c;
    //   position: absolute;
    //   top: 50%;
    //   left: -15px;
    //   transform: translateY(-50%);
    // }
  }
}
</style>
