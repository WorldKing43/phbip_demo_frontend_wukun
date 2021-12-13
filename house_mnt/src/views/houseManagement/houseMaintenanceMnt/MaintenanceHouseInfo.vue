<!--
 * @Author: maxq
 * @Date: 2020-08-18 16:11:21
 * @LastEditTime: 2020-09-02 16:21:59
 * @LastEditors: Please set LastEditors
 * @Description: 房屋维修管理-详情
 * @FilePath: \frontend\house-mnt\src\views\houseManagement\houseMaintenanceMnt\MaintenanceHouseInfo.vue
-->
<template>
  <div id="maintenance-house-info" class="page-detail">
    <div class="content">
      <div class="el-tabs__content">
        <title-stylex title="请选择需要维修的房屋">
          <el-button
            type="primary"
            size="mini"
            slot="publicTitleLeft"
            @click="chooseHouse()"
            v-if="!logShow"
          >请选择</el-button>
        </title-stylex>
        <el-table :data="tableData" border :header-cell-style="globalHeaderStyle" :cell-style="globalCellStyle">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="小区名称" prop="districtName"></el-table-column>
          <el-table-column label="栋名称" prop="buildName"></el-table-column>
          <el-table-column label="房号" prop="houseNo"></el-table-column>
          <el-table-column label="维修状态" prop="maintainTypeName"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="viewHouse(scope.row)">查看</el-button>
              <el-button size="mini" type="danger" @click="deleteHouse(scope.row)" v-if="!logShow">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page_box">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizesList"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            align="right"
            background
          ></el-pagination>
        </div>
        <div v-if="!logShow">
          <title-stylex title="请登记维修信息"></title-stylex>
          <div>
            <el-form :model="maintainForm" label-width="6rem" size="mini">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="维修状态">
                    <el-select v-model="maintainForm.maintainType" @change="selectChange" clearable>
                      <el-option v-for="(item, index) in stateList" :label="item.name" :value="item.value" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="tableStyle">
            <table v-show="showTable">
              <tr v-show="waitMaintain">
                <td>文号</td>
                <td>
                  <el-input v-model="maintainData.maintainNo"></el-input>
                </td>
                <td>文号日期</td>
                <td>
                  <el-date-picker type="date" v-model="maintainData.maintainNoDate"></el-date-picker>
                </td>
              </tr>
              <tr v-show="maintained">
                <td>维修开始时间</td>
                <td>
                  <el-date-picker type="datetime" v-model="maintainData.maintainDateBegin"></el-date-picker>
                </td>
                <td>维修结束时间</td>
                <td>
                  <el-date-picker type="datetime" v-model="maintainData.maintainDateEnd"></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>登记人</td>
                <td>
                  <el-input v-model="maintainData.registrant"></el-input>
                </td>
                <td>登记时间</td>
                <td>
                  <el-date-picker type="datetime" v-model="maintainData.registrantDate"></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>备注</td>
                <td colspan="3">
                  <el-input type="textarea" v-model="maintainData.remark"></el-input>
                </td>
              </tr>
            </table>
          </div>
          <div class="bottom_btn">
            <el-button type="primary" size="small" @click="save()" v-show="showTable">确  定</el-button>
          </div>
        </div>
        <div v-if="logShow">
          <title-stylex title="维修记录"></title-stylex>
          <el-table :data="mainTable" :cell-style="globalCellStyle" :header-cell-style="globalHeaderStyle" border>
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="维修状态" prop="maintainTypeName"></el-table-column>
            <el-table-column label="登记人" prop="registrant"></el-table-column>
            <el-table-column label="登记时间" prop="registrantDate"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="viewMaintain(scope.row)" v-if="editCtrl">查看</el-button>
                <el-button size="mini" type="primary" @click="handleMaintain(scope.row)" v-if="!editCtrl">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteMaintain(scope.row)" v-if="!editCtrl">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
         <!-- 请选择-房屋 弹框 -->
        <el-dialog title="请选择需要维修的房屋" :visible.sync="houseDialog" v-if="houseDialog" width=60%>
          <el-form :model="houseForm" size="mini" label-width="3rem">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="小区">

                  <el-autocomplete
                    v-model="houseForm.districtName"
                    :fetch-suggestions="getCommunity"
                    :trigger-on-focus="false"
                    :clearable="true"
                    popper-class="select-option"
                    @select="houseList()"
                    style="width:100%"
                  ></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="栋号" label-width="5rem">
                  <el-input v-model="houseForm.buildNo" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="栋名称" label-width="4rem">
                  <el-input v-model="houseForm.buildName" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="房号">
                  <el-input v-model="houseForm.houseNo" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="维修状态" label-width="5rem">
                  <el-select v-model="houseForm.maintainType" clearable>
                    <el-option v-for="(item, index) in stateList" :label="item.name" :value="item.value" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-button size="mini" type="primary" @click="houseList()">查询</el-button>
              </el-col>
            </el-row>
          </el-form>
          <el-table :data="houseData" @selection-change="selectHouseChange" :cell-style="globalCellStyle" :header-cell-style="globalHeaderStyle" border>
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="小区号" prop="districtNo"></el-table-column>
            <el-table-column label="小区名称" prop="districtName"></el-table-column>
            <el-table-column label="栋号" prop="buildNo"></el-table-column>
            <el-table-column label="栋名称" prop="buildName"></el-table-column>
            <el-table-column label="房号" prop="houseNo"></el-table-column>
            <el-table-column label="朝向" prop="orientationName"></el-table-column>
            <el-table-column label="户型" prop="typeName"></el-table-column>
            <el-table-column label="房屋状态" prop="stateName"></el-table-column>
          </el-table>
          <div class="page_box">
            <el-pagination
              @size-change="houseSizeChange"
              @current-change="houseCurrentChange"
              :current-page="houseCurrentPage"
              :page-sizes="housePageSizesList"
              :page-size="housePageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalHouse">
            </el-pagination>
          </div>
          <div class="dialog-foot">
            <el-button size="mini" @click="houseDialog = false">取 消</el-button>
            <el-button size="mini" type="primary" @click="addHouse()">确 定</el-button>
          </div>
        </el-dialog>
          <!-- 查看房屋弹框 -->
        <el-dialog title="房屋基本信息" :visible.sync="houseInfoDialog" v-if="houseInfoDialog" width=60%>
          <div class="tableStyle">
            <table>
              <tr>
                <td>小区编号</td>
                <td>
                  <el-input disabled v-model="form.districtNo"></el-input>
                </td>
                <td>小区名称</td>
                <td>
                  <el-input disabled v-model="form.districtName"></el-input>
                </td>
              </tr>
              <tr>
                <td>栋号</td>
                <td>
                  <el-input disabled v-model="form.buildNo"></el-input>
                </td>
                <td>栋名称</td>
                <td>
                  <el-input disabled v-model="form.buildName"></el-input>
                </td>
              </tr>
              <tr>
                <td>房号</td>
                <td>
                  <el-input disabled v-model="form.houseNo"></el-input>
                </td>
                <td>网格办编码</td>
                <td>
                  <el-input disabled v-model="form.serialNo"></el-input>
                </td>
              </tr>
              <tr>
                <td>房屋状态</td>
                <td>
                  <el-input disabled v-model="form.stateName"></el-input>
                </td>
                <td>所在单元</td>
                <td>
                  <el-input disabled v-model="form.unit"></el-input>
                </td>
              </tr>
              <tr>
                <td>所在楼层</td>
                <td>
                  <el-input disabled v-model="form.floorNo"></el-input>
                </td>
                <td>房屋来源</td>
                <td>
                  <el-select style="width: 100%;" placeholder v-model="form.source" disabled>
                    <el-option
                      v-for="(item, index) in sourceData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>房屋用途</td>
                <td>
                  <el-select style="width: 100%;" placeholder v-model="form.function" disabled>
                    <el-option
                      v-for="(item, index) in functionData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>户型</td>
                <td>
                  <el-select
                    v-model="form.houseLayout"
                    style="width: 100%"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in houseLayoutData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>朝向</td>
                <td>
                  <el-select
                    style="width: 100%;"
                    v-model="form.orientation"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in orientationData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>平台</td>
                <td>
                  <el-select v-model="form.terrace" style="width: 100%" disabled>
                    <el-option
                      v-for="(item, index) in terraceData"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>是否有架空层</td>
                <td>
                  <el-select
                    style="width: 100%;"
                    v-model="form.innerFloor"
                    placeholder
                    disabled
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>(预测绘)建筑面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.coveredArea"></el-input>
                  <span style="position:absolute;top:2px;right:5px;">m²</span>
                </td>
              </tr>
              <tr>
                <td>(预测绘)分摊面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.residentialPoolArea"></el-input>
                  <span style="position:absolute;top:2px;right:5px;">m²</span>
                </td>
                <td>(预测绘)套内面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.indoorArea"></el-input>
                  <span style="position:absolute;top:2px;right:5px;">m²</span>
                </td>
              </tr>
              <tr>
                <td>竣工建筑面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.completionArea"></el-input>
                  <span style="position:absolute;top:2px;right:5px;">m²</span>
                </td>
                <td>竣工分摊面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.completionShareArea"></el-input>
                  <span style="position:absolute;top:2px;right:5px;">m²</span>
                </td>
              </tr>
              <tr>
                <td>竣工套内面积</td>
                <td style="position:relative">
                  <el-input disabled v-model="form.completionIndoorArea"></el-input>
                  <span style="position:absolute;top:2px;right:5px;">m²</span>
                </td>
                <td>分摊面积说明</td>
                <td>
                  <el-input v-model="form.residentialAreaContent" disabled></el-input>
                </td>
              </tr>
              <tr>
                <td>初始房源性质</td>
                <td>
                  <el-select style="width:100%" placeholder v-model="form.startNature" disabled>
                    <el-option
                      v-for="(item, index) in changeAfterNatureData"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
                <td>当前房源性质</td>
                <td>
                  <el-select style="width:100%" v-model="form.changeAfterNature" disabled>
                    <el-option
                      v-for="(item, index) in changeAfterNatureData"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>初始属性</td>
                <td>
                  <el-select style="width:100%" v-model="form.originalProperty" disabled>
                    <el-option
                      v-for="(item, index) in currentPropertyData"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
                <td>当前属性</td>
                <td>
                  <el-select style="width:100%" v-model="form.currentProperty" disabled>
                    <el-option
                      v-for="(item, index) in originalPropertyData"
                      :label="item.name"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>开工时间</td>
                <td>
                  <el-date-picker
                    class="w100"
                    type="date"
                    v-model="form.startConstructionTime"
                    disabled
                  ></el-date-picker>
                </td>
                <td>竣工时间</td>
                <td>
                  <el-date-picker
                    class="w100"
                    type="date"
                    v-model="form.finishConstructionTime"
                    disabled
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>交付使用时间</td>
                <td>
                  <el-date-picker class="w100" type="date" v-model="form.deliveryTime" disabled></el-date-picker>
                </td>
                <td>装修标准</td>
                <td>
                  <el-input disabled v-model="form.decorationType"></el-input>
                </td>
              </tr>
              <tr>
                <td>装修标准说明</td>
                <td colspan="3">
                  <el-tooltip class="item" effect="dark" content="此处利用鼠标可拖动" placement="right-end">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 4 }"
                      disabled
                      v-model="form.decorationTypeDescription"
                    ></el-input>
                  </el-tooltip>
                </td>
              </tr>
              <tr>
                <td>是否样板房</td>
                <td>
                  <el-select
                    style="width: 100%;"
                    v-model="form.modelHouses"
                    disabled
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>是否代售</td>
                <td>
                  <el-select
                    style="width: 100%;"
                    v-model="form.helpSell"
                    disabled
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>是否查封冻结</td>
                <td>
                  <el-select style="width: 100%;" v-model="form.closed" disabled>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td>资产库状态</td>
                <td>
                  <el-input disabled v-model="form.assetStateName"></el-input>
                </td>
              </tr>
              <tr>
                <td>空房标注</td>
                <td>
                  <el-input disabled v-model="form.situationalRemark"></el-input>
                </td>
                <td>是否被二次分配</td>
                <td>
                  <el-select style="width: 100%;" placeholder v-model="form.secondDistribution" disabled>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>备注</td>
                <td colspan="3">
                  <el-input disabled v-model="form.specification"></el-input>
                </td>
              </tr>
            </table>
          </div>
        </el-dialog>
        <!-- 维修记录弹框 -->
        <el-dialog title="维修记录详情" :visible.sync="maintainDialog">
          <div class="tableStyle">
            <table>
              <tr>
                <td>维修状态</td>
                <td colspan="3">
                  <el-select v-model="maintainInfo.maintainType" :disabled="editCtrl">
                    <el-option v-for="(item, index) in stateList" :label="item.name" :value="item.value" :key="index"></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>文号</td>
                <td>
                  <el-input v-model="maintainInfo.maintainNo" :disabled="editCtrl"></el-input>
                </td>
                <td>文号日期</td>
                <td>
                  <el-date-picker type="date" v-model="maintainInfo.maintainNoDate" :disabled="editCtrl"></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>维修开始时间</td>
                <td>
                  <el-date-picker type="datetime" v-model="maintainInfo.maintainDateBegin" :disabled="editCtrl"></el-date-picker>
                </td>
                <td>维修结束时间</td>
                <td>
                  <el-date-picker type="datetime" v-model="maintainInfo.maintainDateEnd" :disabled="editCtrl"></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>登记人</td>
                <td>
                  <el-input v-model="maintainInfo.registrant" :disabled="editCtrl"></el-input>
                </td>
                <td>登记时间</td>
                <td>
                  <el-date-picker type="datetime" v-model="maintainInfo.registrantDate" :disabled="editCtrl"></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>备注</td>
                <td colspan="3">
                  <el-input type="textarea" v-model="maintainInfo.remark" :disabled="editCtrl"></el-input>
                </td>
              </tr>
            </table>
            <div class="dialog-foot">
              <el-button type="primary" size="small" @click="saveEdit()" v-if="!editCtrl">提 交</el-button>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import titleStylex from "@/components/TitleStylex.vue"; //标题组件
import common from "@/api/publicMethod.js";
import api from "@/api/roomChangeRoomInput.js";
import http from '@/api/vacuumRoominquire.js';
import https from "@/api/house.js";
export default {
  name: "maintenanceHouseInfo",
  components: {
    titleStylex,
  },
  data() {
    return {
      tableData: [],
      //分页数据
      total: 0, //数据总条数
      pageSize: 20, //当前页条数
      currentPage: 1, //当前页
      pageSizesList: [20, 50, 100, 200], //分页下拉框
      stateList: [],
      houseDialog: false, //选择房屋弹框显隐
      houseForm: { //选择房屋弹框
        districtName: '',
        buildNo: '',
        buildName: '',
        houseNo: '',
        maintainType: ''
      },
      houseData: [],//选择房屋列表
      //分页数据
      houseCurrentPage: 1, //当前页
      housePageSizesList: [10, 20,50, 100], //页面条数可选
      housePageSize: 10, //此时当前页条数
      totalHouse: 0,//数据总数
      selectedHouse: [],//所选得房屋
      houseInfoDialog: false, //房屋基本信息弹框显隐
      originalPropertyData: [], //当前属性下拉框
      currentPropertyData: [], //初始属性下拉框
      batchCode: '',//批次代码
      form: {}, //查看后房屋数据
      sourceData: [], //房产来源下拉
      functionData: [], //房屋用途下拉
      changeAfterNatureData: [], //房屋性质下拉
      stateData: [], //房源状态下拉
      houseLayoutData: [], //户型下拉
      terraceData: [], //平台
      commmunityList: [], //小区列表
      constructionData: [], //建筑结构下拉
      buildBasicData: [], //建筑基础下拉
      orientationData: [],//朝向下拉数据
      originalPropertyData: [], //当前属性下拉框
      currentPropertyData: [], //初始属性下拉框
      options: [
        { value: true, label: "是" },
        { value: false, label: "否" }
      ], //是否下拉菜单
      maintainForm: {
        maintainType: '' //维修状态
      },
      maintainData: { //表格维修信息
        maintainNo: '',
        maintainNoDate: '',
        maintainDateBegin: '',
        maintainDateEnd: '',
        registrant: '',
        registrantDate: '',
        remark: '',
      },
      houseGuid: '',//房屋标识
      mainTable: [],
      maintainDialog: false,
      maintainInfo: {},
      logShow: false,//查看和编辑进来可以看到维修记录但是新增不能
      editCtrl: false, //表单是否禁用，编辑按钮是否隐藏控制
      waitMaintain: false, //已申报维修是否展示
      maintained: false, //已完成维修是否展示
      showTable: false, //是否展示表格
    }
  },
  methods: {
    //生成批次代码
    getBatchCode() {
      let params = {};
      http.getMaintainCode(params).then(res => {
        this.batchCode = res
      }).catch(err => { console.log(err) })
    },
    //查询维修房屋列表
    search() {
      let params = {
        batchCode: this.batchCode,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      http.getAddMaintainList(params).then(res => {
        this.tableData = res.content;
        this.total = res.totalElements
      }).catch(err => {})
    },
    //请选择
    chooseHouse() {
      this.houseDialog = true;
      this.houseList();
    },
    //请选择-查询房屋列表
    houseList() {
      let pageData = {
        pageIndex: this.houseCurrentPage,
        pageSize: this.housePageSize
      };
      let params = {...this.houseForm, ...pageData};
      https.getstoreHousePage(params).then(res => {
        this.houseData = res.content;
        this.totalHouse = res.totalElements;
      }).catch(err => {
        console.log(err);
      });
    },
   
    //查询小区
    getCommunity(str, cb) {
      let params = {
        searchContent: this.houseForm.districtName
      };
      common.getCommunityList(params).then(res => {
        for (let i of res) {
          i.value = i.districtNameNo;
        }
        this.selectCommunityOptions = res; //将结果存入下拉小区数据中
        if (this.selectCommunityOptions.length === 0) {
          this.selectCommunityOptions = [{ value: "暂无数据" }];
        }
        cb(this.selectCommunityOptions);
      }).catch(err => {
        console.log(err);
      });
    },
    //查看-房屋 基本信息
    viewHouse(val) {
      console.log(val)
      this.houseInfoDialog = true;
      let params = {
        guid: val.guid
      };
      https.getHouseInfo(params).then(res => {
        console.log(res)
        if (res) {
          this.form = res.houseInfo;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    //删除-房屋
    deleteHouse(val) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => { 
        let params = {
          houseGuid: val.guid,
          batchCode: this.batchCode
        };
        http.deleteMaintainHouse(params).then(res =>{
          this.$message({ type: 'success', message: '删除成功！' });
          this.search()
        }).catch(err =>{ console.log(err) })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消操作"
        });
      });
    },
    //选择的房屋更改时触发
    selectHouseChange(val) {
      console.log(val)
      this.selectedHouse = val
    },
    //确定新增房屋
    addHouse() {
      let params = {batchCode: this.batchCode};
      let data = [];
      this.selectedHouse.forEach(item =>{
        data.push(item.guid)
      });
      console.log(data)
      this.$confirm("此操作将进行保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        http.addHouseMaintain(params, data).then(res =>{
          this.$message({
            type: 'success',
            message: '保存成功！'
          });
          this.houseDialog = false;
          this.search();
        }).catch(err =>{ console.log(err) })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消保存"
        });
      });
    },
    //维修状态下拉修改时
    selectChange(val) {
      if(val == '') {
        this.showTable = this.waitMaintain = this.maintained = false
      } else {
        this.showTable = true;
        if(val == 1) {
          this.showTable = true
          this.waitMaintain = this.maintained = false
        } else if(val == 2) {
          this.waitMaintain = true 
          this.maintained = false
        } else if(val == 3) {
          this.maintained = true
        }
      }
      //  else if(val){
      //    this.showTable = true;
      //    this.waitMaintain = this.maintained = false
      // }
    },
    //保存
    save() {
      let params = { 
        batchCode: this.batchCode,
        maintainType: this.maintainForm.maintainType
      };
      let data = [this.maintainData];
      this.$confirm("此操作将进行保存, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          http.saveHouseMaintain(params, data).then(res =>{
            this.$message({
              message: "保存成功",
              type: "success"
            });
            // if(res.TID) {
            //   this.openCache(res);
            //   this.closeTopTab();
            //   let tab = {
            //     route: "/maintenanceHouseInfo" + "/" + this.batchCode + "/" + 'todo',
            //     name: '新增房屋维修信息',
            //     type: "single",
            //   };
            //   this.openTopTab(tab);
            // };
            this.Event.$emit("maintenanceMnt", "search");
            this.closeTopTab();
          }).catch(err =>{ console.log(err);this.$endLoading() })
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存"
          });
        });
    },
    //**编辑查看 */
    getHouseMaintainInfo() {
      let params = {houseGuid: this.houseGuid};
      http.getHouseMaintainInfo(params).then(res => {
        this.tableData =[res.houseInfo];
        this.mainTable = res.maintain;
      }).catch(err => { console.log(err) })
    },
    //获取记录信息
    MaintainLogList(val) {
      let params = {
        maintainGuid: val.guid,
        pageIndex: 1,
        pageSize: 10
      };
      http.getHouseMaintainLogList(params).then(res => {
        this.maintainInfo = res.content[0]
      }).catch(err => {
        console.log(err)
      })
    },
    //查看维修记录
    viewMaintain(val) {
      this.maintainDialog = true
      this.MaintainLogList(val)
    },
    //查看维修记录 
    handleMaintain(val) {
      this.maintainDialog = true
      this.MaintainLogList(val)
    },
    //删除维修记录
    deleteMaintain(val) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => { 
        let params = {
          houseGuid: val.houseGuid,
          maintainGuid: val.guid
        };
        let data = [];
        http.deleteMaintainInfo(params, data).then(res =>{
          this.$message({ type: 'success', message: '删除成功！' });
          this.getHouseMaintainInfo()
        }).catch(err =>{ console.log(err) })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消操作"
        });
      });
    },
    //编辑后保存
    saveEdit() {
      let params = {houseGuid: this.houseGuid};
      let data = this.maintainInfo;
      http.saveEditMaintain(params, data).then(res => {
        this.$message({ type: 'success', message: '保存成功！' });
        this.maintainDialog = false; //关闭弹框
      }).catch(err => { console.log(res) })
    },
    //当前页条数改变时
    handleSizeChange(val) {
      this.pageSize = val;
      this.search(1);
    },
    //当前页跳转时
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    },
     //当前页的大小变化
    houseSizeChange(val) {
      this.housePageSize = val;
      this.houseList()
    },
    //当前页的页码变化
    houseCurrentChange(val) {
      this.houseCurrentPage = val;
      this.houseList()
    },
    //获取字典数据
    getDictionary() {
      let nameData = ["维修类型","房产来源","房屋用途","房屋性质","房屋状态","户型","朝向","平台","办理意见常用语","建筑基础", "建筑结构", "当前属性", "最初属性"];
      let params = { names: nameData.toString() };
      api.getDictionary(params).then(res => {
        res = JSON.parse(res);
        this.stateList = res.维修类型;
        this.sourceData = res.房产来源;
        this.functionData = res.房屋用途;
        this.stateData = res.房屋状态;
        this.houseLayoutData = res.户型;
        this.buildBasicData = res.建筑基础;
        this.constructionData = res.建筑结构;
        this.terraceData = res.平台;
        this.originalPropertyData = res.当前属性;
        this.currentPropertyData = res.最初属性;
        this.orientationData = this.$dictionaryChange(res.朝向,this.orientationData,"通用");
        this.changeAfterNatureData = this.$dictionaryChange(res.房屋性质,this.changeAfterNatureData,"通用");
      }).catch(err => {
        console.log(err);
      });
    }
  },
  created() {
    if(this.$route.params.guid == 'new') {
      this.getBatchCode();//生成批次代码
    } else{
      this.houseGuid = this.$route.params.guid;
      this.$nextTick(() => {
        this.getHouseMaintainInfo() //获取维修记录信息
      })
    };
    if(this.$route.params.state != 'new') this.logShow = true;//新增进来不显示维修记录
    if(this.$route.params.state != 'todo') this.editCtrl = true;//查看进来表单禁用
  },
  mounted() {
    this.getDictionary(); //获取字典
    // this.search();//查询维修房屋列表
  },
}
</script>
<style lang="scss" scoped>
#maintenance-house-info {
  .bottom_btn{
    text-align: center;
    margin: 20px auto 50px
  } 
}
</style>