<!--
 * @Description: 房源录入-房源信息
 * @Version: 1.0
 * @Autor: zhaoyy1
 * @Date: 2019-09-10 17:33:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-27 14:38:34
 -->
<template>
  <div class="housingMessage">
    <!-- 搜索框开始 -->
    <div class="search_box">
      <el-form size="mini" label-width="3rem" labelPosition="left">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="栋号">
              <el-input
                v-model="form.buildNo"
                placeholder="请输入内容"
                clearable
                @keyup.enter.native="queryHousList"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="栋名称" label-width="4rem">
              <el-input
                v-model="form.buildingName"
                placeholder="请输入内容"
                clearable
                @keyup.enter.native="queryHousList"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="户型">
              <el-select
                v-model="form.houseType"
                clearable
                @keyup.enter.native="queryHousList"
              >
                <el-option
                  v-for="(item, index) in apartment"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="朝向">
              <el-select
                v-model="form.orientation"
                clearable
                @keyup.enter.native="queryHousList"
              >
                <el-option
                  v-for="(item, index) in orientation"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预测绘建筑面积" label-width="7rem">
              <el-row :gutter="0">
                <el-col :span="11">
                  <el-input
                    v-model="form.coveredAreaBegin"
                    clearable
                    @keyup.enter.native="queryHousList"
                  ></el-input>
                </el-col>
                <el-col class="line" :span="2" style="text-align: center"
                  >-</el-col
                >
                <el-col :span="11">
                  <el-input
                    v-model="form.coveredAreaEnd"
                    clearable
                    @keyup.enter.native="queryHousList"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="竣工建筑面积" label-width="6rem">
              <el-row :gutter="0">
                <el-col :span="11">
                  <el-input
                    v-model="form.completionAreaBegain"
                    clearable
                    @keyup.enter.native="queryHousList"
                  ></el-input>
                </el-col>
                <el-col class="line" :span="2" style="text-align: center"
                  >-</el-col
                >
                <el-col :span="11">
                  <el-input
                    v-model="form.completionAreaEnd"
                    clearable
                    @keyup.enter.native="queryHousList"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房产来源" label-width="5rem">
              <el-select
                v-model="form.houseRecource"
                clearable
                @keyup.enter.native="queryHousList"
              >
                <el-option
                  v-for="(item, index) in source"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="mini" @click="queryHousList"
              >查询</el-button
            >
            <el-button type="primary" size="mini" @click="reset"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 搜索框结束 -->
    <div>
      <div style="margin-bottom: 20px">
        <el-button type="primary" size="mini" @click="add" :disabled="ban"
          >新增</el-button
        >
        <el-button
          type="primary"
          size="mini"
          @click="dialogFormVisible = true"
          :disabled="ban"
          >房源批量导入</el-button
        >
        <el-button type="primary" size="mini" @click="download"
          >下载模板</el-button
        >
        <el-button type="danger" size="mini" @click="deleteBox" :disabled="ban"
          >删除</el-button
        >
        <el-button
          type="primary"
          size="mini"
          class="button_right delete"
          @click="checkReseau"
          :disabled="ban"
          >二次编码核验
        </el-button>
      </div>
      <div
        class="quarterMessage_box"
        v-loading="houseListLoading"
        element-loading-text="数据加载中"
      >
        <template>
          <el-table
            ref="multipleTable"
            :data="houseList"
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
            <el-table-column type="selection"></el-table-column>
            <el-table-column
              label="序号"
              type="index"
              width="60"
              :index="indexMethod"
            ></el-table-column>
            <el-table-column prop="buildNo" label="栋号"></el-table-column>
            <el-table-column prop="buildName" label="栋名称"></el-table-column>
            <el-table-column prop="houseNo" label="房号"></el-table-column>
            <el-table-column prop="houseLayout" label="户型"></el-table-column>
            <el-table-column prop="orientation" label="朝向"></el-table-column>
            <el-table-column
              prop="coveredArea"
              label="预测绘建筑面积"
            ></el-table-column>
            <el-table-column
              prop="completionArea"
              label="竣工建筑面积"
            ></el-table-column>
            <el-table-column prop="source" label="房产来源"></el-table-column>
            <el-table-column prop label="操作" width="250">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="check(scope.row)"
                  >查看</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  @click="copy(scope.row)"
                  :disabled="ban"
                  >复制</el-button
                >
                <el-button
                  type="warning"
                  size="mini"
                  @click="edit(scope.row)"
                  :disabled="ban"
                  >编辑</el-button
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
    </div>
    <!-- 提示 -->
    <el-dialog
      title="提示"
      :visible.sync="promptTitle"
      width="30%"
      :close-on-click-modal="false"
    >
      <div v-for="(item, index) in promptList" :key="index">
        <div>{{ item }}</div>
      </div>
    </el-dialog>
    <!-- 提示 -->
    <el-dialog
      title="房源批量导入"
      :visible.sync="dialogFormVisible"
      width="50%"
      id="import"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        v-loading="loading"
        element-loading-text="正在导入中"
      >
        <p>请选择需要上传的文件</p>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :before-remove="beforeRemove"
          accept=".xls, .xlsx, .doc, .docx, .ppt, .txt"
          multiple
          :limit="1"
          :http-request="uploadFile"
          :on-change="handleChange"
          :on-exceed="handleExceed"
          :file-list="fileList"
          ref="upload"
          :auto-upload="false"
          id="upload"
        >
          <el-button size="small" type="primary">选择</el-button>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="queding" :disabled="loading"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 复制弹窗 -->
    <el-dialog
      title="复制房源"
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
                  <el-form-item label="房号">
                    <el-input v-model="copyFrom.houseNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="位数">
                    <el-input v-model="copyFrom.num"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="其他">
                <el-form-item label="保留原有材料">
                  <el-switch
                    v-model="copyFrom.saveOldDate"
                    class="el-input"
                    style="line-height: 39px"
                  ></el-switch>
                </el-form-item>
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
      :visible.sync="dialogFormVisible1"
      width="30%"
      id="delete_box"
      :close-on-click-modal="false"
    >
      <el-form :model="form">
        <p>确定删除房源吗？</p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false" size="mini"
          >取 消</el-button
        >
        <el-button @click="deleteHouse" size="mini" type="primary"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="对接测绘数据"
      :visible.sync="dialogFormVisible2"
      width="70%"
      :close-on-click-modal="false"
    >
      <el-form :model="form">
        <p>请输入房间号进行查询</p>
        <div class="search_input">
          <input type="text" v-model="houseNo" />
          <el-button type="primary" size="small">查 询</el-button>
        </div>
      </el-form>
      <div class="quarterMessage_box">
        <template>
          <el-table
            ref="multipleTable"
            :data="houseList"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange1"
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
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column
              label="序号"
              width="50"
              type="index"
            ></el-table-column>
            <el-table-column
              prop="buildName"
              label="栋名称"
              width="80"
            ></el-table-column>
            <el-table-column
              prop="houseNo"
              label="房号"
              width="60"
            ></el-table-column>
            <el-table-column
              prop="sourceName"
              label="房屋来源"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="houseLayout"
              label="户型"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="orientation"
              label="朝向"
              width="80"
            ></el-table-column>
            <el-table-column
              prop="coveredArea"
              label="建筑面积"
              width="80"
            ></el-table-column>
            <el-table-column prop="function" label="房屋用途"></el-table-column>
          </el-table>
        </template>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import http from "@/api/common(bj).js";
import axios from "dist-axios";
import common from "@/api/common.js";
export default {
  name: "housingmessage",
  data() {
    return {
      multipleSelection: [],
      houseNo: "",
      houseGuids: [], //删除的房源数组
      houseList: [],
      orientation: [], //朝向
      buildingName: "", //栋名称
      districtGuid: "", //小区标识
      houseRecource: [], //房屋来源
      houseType: [], //户型
      pageIndex: "", //起始页
      pageSize: "", //每页显示的条
      fileList: [],
      pageObj: {
        currentPage4: 1,
        pageSize: 100,
        total: 0,
      },
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      copyFormVisible: false,
      form: {
        orientation: "", //朝向
        houseType: "", //户型
        houseRecource: "", //房屋来源
        buildingName: "", //栋名称
        completionAreaBegain: "",
        completionAreaEnd: "",
        coveredAreaBegin: "",
        coveredAreaEnd: "",
        buildNo: "",
      },
      houseInfoPreDTO: {},
      houesUser: [],
      apartment: [],
      copyFrom: {
        saveOldDate: false,
        num: "",
      },
      // 房屋来源
      source: [],
      loading: false, //上传加载
      houseListLoading: false,
      promptTitle: false,
      promptList: [],
      //栋信息-查看房源
      buildGuid: this.$parent.meta ? this.$parent.meta.buildGuid : "",
      ban: false,
    };
  },
  methods: {
    onLoad() {
      //判断是否栋信息进行修改
      this.Event.$on("HousingEdit", (data) => {
        if (data.msg == "refresh") {
          this.queryHousList();
        }
      });
    },
    // 获取数据字典
    getDict() {
      let dictionaryName = ["房屋用途", "户型", "朝向", "房产来源"];
      let params = { names: dictionaryName.toString() };
      http
        .getDictionary(params)
        .then((res) => {
          let resp = JSON.parse(res);
          this.houesUser = resp.房屋用途;
          this.apartment = resp.户型;
          resp.朝向.forEach((item) => {
            if (item.name == "通用") {
              this.orientation = item.children;
            }
          });
          this.source = resp.房产来源;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //点击查询获取房源信息列表
    async queryHousList(val) {
      //分页查询参数，分页归至为1
      if (val != "Current") {
        this.pageObj.currentPage4 = 1;
      }
      this.houseListLoading = true;
      try {
        let params;
        if (this.$parent.params.source == "原有小区入库") {
          if (this.$route.params.edit == "false") {
            params = {
              buildNo: this.form.buildNo,
              buildingName: this.form.buildingName,
              houseType: this.form.houseType,
              orientation: this.form.orientation,
              completionAreaBegain: this.form.completionAreaBegain,
              completionAreaEnd: this.form.completionAreaEnd,
              coveredAreaBegin: this.form.coveredAreaBegin,
              coveredAreaEnd: this.form.coveredAreaEnd,
              houseRecource: this.form.houseRecource,
              districtGuid: this.$parent.params.projectGuid,
              pageIndex: this.pageObj.currentPage4,
              pageSize: this.pageObj.pageSize,
              buildGuid: this.buildGuid, //栋标识
              configName: "原有小区入库",
              type: "1",
            };
          } else {
            params = {
              buildNo: this.form.buildNo,
              buildingName: this.form.buildingName,
              houseType: this.form.houseType,
              orientation: this.form.orientation,
              completionAreaBegain: this.form.completionAreaBegain,
              completionAreaEnd: this.form.completionAreaEnd,
              coveredAreaBegin: this.form.coveredAreaBegin,
              coveredAreaEnd: this.form.coveredAreaEnd,
              houseRecource: this.form.houseRecource,
              districtGuid: this.$parent.params.projectGuid,
              pageIndex: this.pageObj.currentPage4,
              pageSize: this.pageObj.pageSize,
              buildGuid: this.buildGuid, //栋标识
              configName: "原有小区入库",
            };
          }
        } else {
          params = {
            buildNo: this.form.buildNo,
            buildingName: this.form.buildingName,
            houseType: this.form.houseType,
            orientation: this.form.orientation,
            completionAreaBegain: this.form.completionAreaBegain,
            completionAreaEnd: this.form.completionAreaEnd,
            coveredAreaBegin: this.form.coveredAreaBegin,
            coveredAreaEnd: this.form.coveredAreaEnd,
            houseRecource: this.form.houseRecource,
            districtGuid: this.$parent.params.projectGuid,
            pageIndex: this.pageObj.currentPage4,
            pageSize: this.pageObj.pageSize,
            buildGuid: this.buildGuid, //栋标识
            configName: this.$parent.params.itemName,
          };
        }
        let res = await http.getHouseInfo(params);
        if (res) {
          this.houseListLoading = false;
        }
        this.houseList = res.content;
        this.pageObj.total = res.totalElements;
      } catch (err) {
        console.log(err);
      }
    },
    //序号
    indexMethod(index) {
      return (
        index + (this.pageObj.currentPage4 - 1) * this.pageObj.pageSize + 1
      );
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pageObj.pageSize = val;
      this.queryHousList();
    },
    handleCurrentChange(val) {
      let Current = "Current";
      this.pageObj.currentPage4 = val;
      this.queryHousList(Current);
    },
    reset() {
      //重置搜素条件
      for (var i in this.form) {
        this.form[i] = "";
      }
    },
    add() {
      //判断是否保存小区
      if (this.$parent.params.projectGuid == "newguid") {
        this.$alert("请先创建小区！", "提示");
        return;
      }
      //打开新的tab页
      this.$parent.openTab({
        id: "HousingEdit",
        label: "新增房源",
        closable: true,
        meta: {
          state: "2", //1可编辑 0 查看 2新增
          menuId: "housingMessage",
        },
        component: () => import("@/views/houseResource/houseInput/HousingEdit"),
      });
    },
    download() {
      let url = process.env.API + "construction_raising/house/template/export";
      var elemIF = document.createElement("iframe");
      elemIF.src = url;
      elemIF.style.display = "none";
      elemIF.onload = function () {
        setTimeout(function () {
          elemIF.remove();
        }, 2000);
      };
      document.body.appendChild(elemIF);
    },
    // 删除
    deleteBox() {
      if (this.multipleSelection.length === 0) {
        this.open("请先选择房");
        return;
      }
      this.dialogFormVisible1 = true;
    },
    //提示框
    open(title) {
      this.$message(title);
    },
    //删除房源
    deleteHouse() {
      var that = this;
      let arr = [];
      that.multipleSelection.forEach(function (ele, index) {
        arr.push(ele.guid);
      });
      let houseGuids = arr;
      let params = { districtGuid: this.$parent.params.projectGuid };
      http
        .deleteHouse(params, houseGuids)
        .then((res) => {
          if (res) {
            that.$message({
              message: "删除成功",
              type: "success",
            });
            that.dialogFormVisible1 = false;
            this.queryHousList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //查看
    check(row) {
      this.$parent.params.houseInfoGuid = row.guid;
      //打开新的tab页
      this.$parent.openTab({
        id: row.guid,
        label: row.houseNo,
        closable: true,
        meta: {
          state: "0", //1可编辑 0 查看 2新增
          menuId: "housingMessage",
        },
        component: () => import("@/views/houseResource/houseInput/HousingEdit"),
      });
    },
    edit(row) {
      this.$parent.params.houseInfoGuid = row.guid;
      //打开新的tab页
      this.$parent.openTab({
        id: row.guid,
        label: row.houseNo,
        closable: true,
        meta: {
          state: "1", //1可编辑 0 查看 2新增
          menuId: "housingMessage",
        },
        component: () => import("@/views/houseResource/houseInput/HousingEdit"),
      });
    },
    copy(row) {
      this.copyFrom.houseGuid = row.guid;
      this.copyFormVisible = true;
      this.copyFrom.name = row.buildName + "," + row.houseNo;
    },
    //复制栋
    copyTung() {
      //必填项
      if (this.copyFrom.houseNo == null || this.copyFrom.houseNo == "") {
        this.$alert("请填写房号！");
        return;
      }
      let params;
      if (this.$parent.params.source == "原有小区入库") {
        params = {
          houseGuid: this.copyFrom.houseGuid,
          houseNo: this.copyFrom.houseNo,
          num: this.copyFrom.num,
          saveOldDate: this.copyFrom.saveOldDate,
          configName: "原有小区入库",
        };
      } else {
        params = {
          houseGuid: this.copyFrom.houseGuid,
          houseNo: this.copyFrom.houseNo,
          num: this.copyFrom.num,
          saveOldDate: this.copyFrom.saveOldDate,
        };
      }
      let data;
      http
        .copyHouse(params, data)
        .then((res) => {
          if (res.status == "success") {
            this.$message({
              message: "复制成功",
              type: "success",
            });
            this.copyFormVisible = false;
            this.queryHousList();
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
    //===========================================
    uploadFile(item) {
      const obj = item.file;
      const form = new FormData();
      form.append("file", obj);
      var districtGuid = this.$parent.params.projectGuid;
      let configName = "原有小区入库";
      let _config = { headers: { "Content-Type": "multipart/form-data" } };
      let url;
      if (this.$parent.params.source == "原有小区入库") {
        url =
          "/house/house/report?districtGuid=" +
          districtGuid +
          "&configName=" +
          configName;
      } else {
        url = "/construction_raising/house/report?districtGuid=" + districtGuid;
      }
      axios({
        method: "post",
        url: url,
        headers: {
          "Content-Type": "multipart/form-data;charset=UTF-8",
        },
        data: form,
      })
        .then((res) => {
          if (res) {
            this.loading = false;
            this.dialogFormVisible = false;
            this.queryHousList();
            this.promptList = res.data.data;
            this.promptTitle = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //点击确定
    queding() {
      if (this.$refs.upload.uploadFiles.length == 0) {
        this.$alert("请选择上传文件！", "提示");
        this.loading = false;
        return;
      }
      this.$refs.upload.submit();
      this.loading = true;
    },
    //对接测绘数据
    handleSelectionChange1(val) {
      this.multipleSelection = val;
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
              type: 11,
            };
          } else {
            params = {
              districtGuid: this.$parent.params.projectGuid,
              type: 11,
            };
          }
          common
            .checkReseau(params)
            .then((res) => {
              this.queryHousList();
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
  },
  created() {
    this.getDict();
    this.onLoad();
    // 获取列表
    this.queryHousList();
    this.houseInfoPreDTO.districtName = this.$parent.params.districtName;
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
.housingMessage {
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
