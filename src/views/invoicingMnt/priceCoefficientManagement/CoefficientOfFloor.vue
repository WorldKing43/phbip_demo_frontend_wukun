<!--
 * @Description:计价系数管理-楼层系数
 * @Version: 1.0
 * @Autor: maxq
 * @Date: 2019-11-22 10: 40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 
-->
<template>
  <div id="coefficient-of-floor">
    <div>
      <title-stylex :title="firstTitle"></title-stylex>
      <table :model="districtData">
        <td>小区名称</td>
        <td>{{districtData.name}}</td>
        <td>小区号</td>
        <td>{{districtData.code}}</td>
        <td>地址</td>
        <td>{{districtData.address}}</td>
      </table>
      <title-stylex :title="secondTitle"></title-stylex>
      <el-table
        :data="buildingData"
        :cell-style="globalCellStyle"
        :header-cell-style="globalHeaderStyle"
        border
      >
        <el-table-column prop="code" label="栋号"></el-table-column>
        <el-table-column prop="name" label="栋名称"></el-table-column>
        <el-table-column prop="floorCount" label="总楼层"></el-table-column>
        <el-table-column prop="skirtFloorCount" label="裙楼层数"></el-table-column>
        <el-table-column prop="elevator" label="是否带电梯"></el-table-column>
      </el-table>
      <div class="page_box">
        <el-pagination
          @size-change="buildingSizeChange"
          @current-change="buildingCurrentChange"
          :current-page="buildingCurrentPage"
          :page-sizes="buildingPageSizesList"
          :page-size="buildingPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="buildingtotal"
          align="right"
          background
        ></el-pagination>
      </div>
    </div>
    <div>
      <title-stylex :title="thirdTitle"></title-stylex>
      <el-form size="mini" v-model="form" label-width="4rem">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="栋名称">
              <el-select v-model="form.buildingName" clearable @change="search(1)">
                <el-option
                  v-for="(item, index) in buildingList"
                  :label="item"
                  :value="item"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-button type="primary" size="mini" @click="search(1)">查询</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button type="primary" size="mini" @click="preserveFloor()">维护楼层系数(调整缺省值)</el-button>
            <el-button type="primary" size="mini" @click="createFloor()">维护楼层系数(生成)</el-button>
            <span class="explain">说明：本小区所有楼栋的楼层系数默认使用系统缺省值。若需要调整某栋的楼层系数，请使用【维护楼层系数】功能进行调整。</span>
          </el-col>
        </el-row>
        <el-row>
          <p class="explainOne">
            该小区的楼层系数使用系统缺省值，
            <span class="explainSecond" @click="toCheck()">查看系统缺省值</span>
          </p>
        </el-row>
      </el-form>
      <div class="towardTable">
        <el-table
          :data="tableData"
          :cell-style="globalCellStyle"
          :header-cell-style="globalHeaderStyle"
          border
        >
          <el-table-column prop="buildingNo" label="栋号"></el-table-column>
          <el-table-column prop="buildingName" label="栋名称"></el-table-column>
          <el-table-column prop="totalFloor" label="楼层总数"></el-table-column>
          <el-table-column prop="currentFloor" label="当前楼层"></el-table-column>
          <el-table-column prop="sptxs" label="售普通系数"></el-table-column>
          <el-table-column prop="sfsxs" label="售复式系数"></el-table-column>
          <el-table-column prop="sddtxs" label="售带电梯系数"></el-table-column>
          <el-table-column prop="sddtfsxs" label="售带电梯复式系数"></el-table-column>
          <el-table-column prop="zptxs" label="租普通系数"></el-table-column>
          <el-table-column prop="zfsxs" label="租复式系数"></el-table-column>
          <el-table-column prop="zddtxs" label="租带电梯系数"></el-table-column>
          <el-table-column prop="zddtfsxs" label="租带电梯复式系数"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="toEdit(scope.row)">编辑</el-button>
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
      </div>
    </div>
    <!-- 弹框 -->
    <!-- 查看系统缺省值 -->
    <el-dialog
      title="查看系统缺省楼层系数"
      :visible.sync="openFirstDialog"
      width="80%"
      :close-on-click-modal="false"
    >
      <title-stylex :title="dialongFirstTitle"></title-stylex>
      <el-table
        :data="systemTableData"
        :cell-style="globalCellStyle"
        :header-cell-style="globalHeaderStyle"
        border
      >
        <el-table-column prop="totalFloor" label="楼层总数"></el-table-column>
        <el-table-column prop="currentFloor" label="当前楼层"></el-table-column>
        <el-table-column prop="sptxs" label="售普通系数"></el-table-column>
        <el-table-column prop="sfsxs" label="售复式系数"></el-table-column>
        <el-table-column prop="sddtxs" label="售带电梯系数"></el-table-column>
        <el-table-column prop="sddtfsxs" label="售带电梯复式系数"></el-table-column>
        <el-table-column prop="zptxs" label="租普通系数"></el-table-column>
        <el-table-column prop="zfsxs" label="租复式系数"></el-table-column>
        <el-table-column prop="zddtxs" label="租带电梯系数"></el-table-column>
        <el-table-column prop="zddtfsxs" label="租带电梯复式系数"></el-table-column>
      </el-table>
      <div class="page_box">
        <el-pagination
          @size-change="systemSizeChange"
          @current-change="systemCurrentChange"
          :current-page="systemCurrentPage"
          :page-sizes="systemPageSizesList"
          :page-size="systemPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNumber"
          align="right"
          background
        ></el-pagination>
      </div>
      <div class="bottom_btn">
        <el-button type="primary" size="mini" @click="openFirstDialog = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 维护楼层系数(调整缺省值) -->
    <el-dialog
      :title="preserveDialog"
      :visible.sync="openSecondDialog"
      width="80%"
      :close-on-click-modal="false"
    >
      <title-stylex :title="dialogSecondTitle"></title-stylex>
      <el-form v-model="dialogForm">
        <el-form-item label>
          <el-select
            v-model="dialogForm.buildingName"
            size="mini"
            style="width:40%;"
            @change="changeFloor"
            clearable
          >
            <el-option
              v-for="(item, index) in defalutBuildingList"
              :label="item.name"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <title-stylex :title="dialogThirdTitle"></title-stylex>
      <el-table
        :data="floorTableData"
        :cell-style="globalCellStyle"
        :header-cell-style="globalHeaderStyle"
        border
      >
        <el-table-column prop="totalFloor" label="楼层总数"></el-table-column>
        <el-table-column prop="currentFloor" label="当前楼层"></el-table-column>
        <el-table-column prop="sptxs" label="售普通系数">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.sptxs" placeholder="请输入" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sfsxs" label="售复式系数">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.sfsxs" placeholder="请输入" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sddtxs" label="售带电梯系数">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.sddtxs" placeholder="请输入" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sddtfsxs" label="售带电梯复式系数">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.sddtfsxs" placeholder="请输入" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="zptxs" label="租普通系数">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.zptxs" placeholder="请输入" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="zfsxs" label="租复式系数">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.zfsxs" placeholder="请输入" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="zddtxs" label="租带电梯系数">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.zddtxs" placeholder="请输入" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="zddtfsxs" label="租带电梯复式系数">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.zddtfsxs" placeholder="请输入" clearable></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom_btn">
        <el-button size="mini" @click="openSecondDialog = false">取消</el-button>
        <el-button type="primary" size="mini" @click="changeFloorCoe()">确定</el-button>
      </div>
    </el-dialog>
    <!-- 维护楼层系数(生成) -->
    <el-dialog
      title="维护楼层系数(生成)"
      :visible.sync="openThirdDialog"
      width="40%"
      :close-on-click-modal="false"
    >
      <title-stylex :title="dialogSecondTitle"></title-stylex>
      <el-form v-model="generateForm">
        <el-form-item label>
          <el-select
            v-model="generateForm.buildingName"
            size="mini"
            @change="changeBuilding"
            clearable
          >
            <el-option
              v-for="(item, index) in defalutBuildingList"
              :label="item.name"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <title-stylex :title="dialogFourthTitle"></title-stylex>
      <el-form size="mini" label-width="7rem" v-model="setUpForm">
        <el-form-item label="楼层总数">
          <el-input v-model="setUpForm.totalFloor" clearable></el-input>
        </el-form-item>
        <el-form-item label="中间楼层">
          <el-input style="width:48%" v-model="setUpForm.floorMiddleMin" clearable></el-input>
          <span>/</span>
          <el-input style="width:48%" v-model="setUpForm.floorMiddleMax" clearable></el-input>
        </el-form-item>
        <el-form-item label="售浮动系数(%)">
          <el-input v-model="setUpForm.sellFloatCoefficient" clearable></el-input>
        </el-form-item>
        <el-form-item label="租浮动系数(%)">
          <el-input v-model="setUpForm.rentFloatCoefficient" clearable></el-input>
        </el-form-item>
      </el-form>
      <div class="bottom_btn">
        <el-button size="mini" @click="openThirdDialog = false">取消</el-button>
        <el-button type="primary" size="mini" @click="confirmCreate()">确定</el-button>
      </div>
    </el-dialog>
    <!-- 楼层系数-编辑弹框 -->
    <el-dialog
      :title="preserveDialog"
      :visible.sync="openFouthDialog"
      width="80%"
      :close-on-click-modal="false"
    >
      <!-- <title-stylex :title="dialogSecondTitle"></title-stylex>
      <el-form v-model="dialogForm">
        <el-form-item label>
          <el-select
            v-model="dialogForm.buildingName"
            size="mini"
            style="width:40%;"
            @change="changeFloor"
            clearable
          >
            <el-option
              v-for="(item, index) in defalutBuildingList"
              :label="item.name"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>-->
      <title-stylex :title="editDialog"></title-stylex>
      <el-table
        :data="singlefloorData"
        :cell-style="globalCellStyle"
        :header-cell-style="globalHeaderStyle"
        border
      >
        <el-table-column prop="totalFloor" label="楼层总数"></el-table-column>
        <el-table-column prop="currentFloor" label="当前楼层"></el-table-column>
        <el-table-column prop="sptxs" label="售普通系数">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.sptxs" placeholder="请输入" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sfsxs" label="售复式系数">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.sfsxs" placeholder="请输入" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sddtxs" label="售带电梯系数">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.sddtxs" placeholder="请输入" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sddtfsxs" label="售带电梯复式系数">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.sddtfsxs" placeholder="请输入" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="zptxs" label="租普通系数">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.zptxs" placeholder="请输入" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="zfsxs" label="租复式系数">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.zfsxs" placeholder="请输入" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="zddtxs" label="租带电梯系数">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.zddtxs" placeholder="请输入" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="zddtfsxs" label="租带电梯复式系数">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.zddtfsxs" placeholder="请输入" clearable></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom_btn">
        <el-button size="mini" @click="openFouthDialog = false">取消</el-button>
        <el-button type="primary" size="mini" @click="singleFloorSure()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import TitleStylex from "@/components/TitleStylex";
import http from "@/api/interface.js";
export default {
  name: "coefficientOfFloor",
  components: {
    TitleStylex
  },
  data() {
    return {
      firstTitle: "小区信息",
      secondTitle: "栋信息",
      thirdTitle: "楼层系数",
      dialongFirstTitle: "系统缺省楼层系数",
      dialogSecondTitle: "选择栋",
      dialogThirdTitle: "调整楼层系数",
      dialogFourthTitle: "设置生成条件",
      districtGuid: "", //小区标识
      buildingGuid: "", //栋标识
      preserveDialog: "维护楼层系数(调整缺省值)",
      editDialog: "编辑楼层系数",
      districtData: {
        //小区信息
        name: "", //小区名称
        code: "", //小区号
        address: "" //地址
      },
      form: {
        buildingName: "",
        houseNumber: ""
      },
      buildingList: [], //栋名称下拉框
      defalutBuildingList: [], //弹框内选择栋下下拉框
      singlefloorData: [], //编辑弹框表格
      tableData: [], //朝向系数表格数据
      buildingData: [], //栋列表表格数据
      //分页数据
      total: 0,
      pageSize: 20,
      currentPage: 1,
      pageSizesList: [20, 50, 100, 200],
      //查看系统缺省值弹框分页
      totalNumber: 0,
      systemPageSize: 5,
      systemCurrentPage: 1,
      systemPageSizesList: [5, 10, 20, 50],

      //栋信息分页数据
      buildingtotal: 0,
      buildingPageSize: 5,
      buildingCurrentPage: 1,
      buildingPageSizesList: [5, 10, 20, 50],

      openFirstDialog: false, //查看系统缺省值-弹框控制显隐
      openSecondDialog: false, // 维护楼层系数(调整缺省值) -弹框控制显隐
      openThirdDialog: false, //维护楼层系数(生成) - 弹框控制显隐
      openFouthDialog: false, //楼层系数-编辑弹框显隐
      systemTableData: [], //查看系统缺省值-表格数据
      floorTableData: [
        {
          //维护楼层系数弹框 表格数据
          buildingName: ""
        }
      ],
      dialogForm: {
        //维护楼层系数（调整缺省值）弹框表单
        buildingName: "" //栋名称
      },
      generateForm: {
        //维护楼层系数（生成）弹框表单
        buildingName: ""
      },
      setUpForm: {
        //维护楼层系数-生成-设置生成条件表单
        totalFloor: "",
        floorMiddleMin: "",
        floorMiddleMax: "",
        sellFloatCoefficient: "",
        rentFloatCoefficient: ""
      },
      buildingName: "" //栋名称
    };
  },
  methods: {
    // //根据名称查询字典
    // getDictionary() {
    //   let nameArr = ['基准价类型']
    //   let params = {
    //     names: nameArr.toString()
    //   }
    //   http.getDictionary(params).then(res =>{
    //     res = JSON.parse(res);
    //     this.basePricingType = res.基准价类型;
    //   })
    // },
    //楼层系数-栋名称下拉数据查询(给下拉框赋值)
    getFloorBuilding() {
      let params = {
        districtGuid: this.districtGuid
      };
      http
        .getFloorBuilding(params)
        .then(res => {
          this.buildingList = res;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //小区信息
    searchDistrict() {
      let params = {
        districtGuid: this.districtGuid
      };
      http
        .getDistrictInfo(params)
        .then(res => {
          this.districtData = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //栋信息
    getBuildingInfo(index) {
      if (index) {
        this.buildingCurrentPage = index;
      }
      let params = {
        districtGuid: this.districtGuid,
        pageSize: this.buildingPageSize,
        pageIndex: this.buildingCurrentPage
      };
      http
        .getBuildingInfo(params)
        .then(res => {
          if (res.content) {
            res.content.forEach(ele => {
              if (ele.elevator == true) {
                ele.elevator = "是";
              } else {
                ele.elevator = "否";
              }
            });
          }
          this.buildingData = res.content;
          this.buildingtotal = res.numberOfElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取栋下拉框(维护朝向系数按钮弹框内的公共方法)
    getBuildingSelect(val) {
      let params = {
        districtGuid: this.districtGuid,
        flag: val
      };
      http
        .baseSearchBuilding(params)
        .then(res => {
          this.defalutBuildingList = res; //赋值给栋名称下拉框
        })
        .catch(err => {
          console.log(err);
        });
    },
    //根据栋名称查询表格数据
    search(index) {
      if (index) {
        this.currentPage = index;
      }
      let params = {
        districtGuid: this.districtGuid,
        buildingName: this.form.buildingName,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      };
      http
        .searchFloor(params)
        .then(res => {
          this.tableData = res.content;
          this.total = res.totalElements;
          // this.tableData = this.changeToward(res.content)
          console.log(this.tableData);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //维护朝向系数（调整缺省值）-修改选择栋时触发查询
    changeFloor() {
      this.buildingGuid = this.dialogForm.buildingName; //栋标识
      let params = {
        districtGuid: this.districtGuid, //小区标识
        buildingGuid: this.dialogForm.buildingName //栋标识
      };
      http
        .searchFloorCoe(params)
        .then(res => {
          this.floorTableData = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查看系统缺省值
    toCheck() {
      this.openFirstDialog = true;
      let params = {
        pageSize: this.systemPageSize,
        pageIndex: this.systemCurrentPage
      };
      http
        .getSystemValue(params)
        .then(res => {
          this.systemTableData = res.content;
          this.totalNumber = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
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
    //查看系统缺省值-当前页条数改变时
    systemSizeChange(val) {
      this.systemPageSize = val;
      this.toCheck();
    },
    //查看系统缺省值-当前页跳转时
    systemCurrentChange(val) {
      this.systemCurrentPage = val;
      this.toCheck();
    },
    //小区信息-当前页条数改变时
    buildingSizeChange(val) {
      this.pageSize = val;
      this.getBuildingInfo(1);
    },
    //小区信息-当前页跳转时
    buildingCurrentChange(val) {
      this.currentPage = val;
      this.getBuildingInfo();
    },

    //维护楼层系数
    preserveFloor() {
      this.openSecondDialog = true;
      this.dialogForm.buildingName = ""; //清空上一次的数据
      this.floorTableData = []; //清空上一次的数据
      this.getBuildingSelect(true);
    },
    //维护楼层系数(调整缺省值) - 确定按钮
    changeFloorCoe() {
      this.openSecondDialog = false;
      let params = {};
      let data = this.floorTableData;
      http
        .changeFloorCoe(params, data)
        .then(res => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.search(); //刷新一遍列表
        })
        .catch(err => {
          console.log(err);
        });
    },
    //表格-编辑
    toEdit(val) {
      this.openFouthDialog = true;
      let params = {
        floorGuid: val.guid //楼层系数标识
      };
      http
        .singleFloorEdit(params)
        .then(res => {
          this.singlefloorData = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //表格-编辑-确定按钮
    singleFloorSure() {
      this.openFouthDialog = true;
      let params = {};
      let data = this.singlefloorData;
      http
        .singleFloorSure(params, data)
        .then(res => {
          this.openFouthDialog = false; //关闭弹框
          this.search(); //刷新表格，再调一个查询
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //维护楼层系数（生成）- 栋名称选择修改时
    changeBuilding() {
      this.buildingGuid = this.generateForm.buildingName;
      //调取查询方法
      let params = {
        districtGuid: this.districtGuid,
        buildingGuid: this.buildingGuid
      };
      http
        .generateSearch(params)
        .then(res => {
          this.setUpForm = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //维护楼层系数(生成)
    createFloor() {
      this.openThirdDialog = true;
      this.generateForm.buildingName = ""; //清空上一次数据
      this.setUpForm = {};
      this.getBuildingSelect(false);
    },
    //维护楼层系数(生成) - 确定 按钮
    confirmCreate() {
      if (!this.generateForm.buildingName) {
        this.$message("请选择栋");
      } else if (!this.setUpForm.totalFloor) {
        this.$message("请填写楼层总数");
      } else if (!this.setUpForm.floorMiddleMin) {
        this.$message("请填写中间楼层");
      } else if (!this.setUpForm.floorMiddleMax) {
        this.$message("请填写中间楼层");
      } else if (!this.setUpForm.sellFloatCoefficient) {
        this.$message("请填写售浮动系数(%)");
      } else if (!this.setUpForm.rentFloatCoefficient) {
        this.$message("请填写租浮动系数(%)");
      } else {
        let params = {};
        let data = this.setUpForm;
        http
          .confirmGenerate(params, data)
          .then(res => {
            this.openThirdDialog = false;
            this.search(); //刷新表格
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  created() {
    this.districtGuid = this.$parent.params.districtGuid; //小区标识赋值
  },
  mounted() {
    this.searchDistrict(); //查询小区信息
    this.getBuildingInfo(); //查询栋信息
    this.getFloorBuilding(); //查询栋下拉框数据
    this.search(); //查询楼层信息
  }
};
</script>
<style lang="scss" scoped>
#coefficient-of-floor {
  padding: 0 0 15px 15px;
  table {
    width: 100%;
    margin: 20px auto;
    border: 1px solid #dde5f9;
    border-collapse: collapse;
    text-align: center;
    tr {
      border: 1px solid #dde5f9;
    }
    td {
      border: 1px solid #dde5f9;
      font-size: 16px;
      height: 2rem;
      width: 8rem;
      line-height: 2rem;
      color: #666;
    }
    td:nth-child(odd) {
      width: 10%;
      background: aliceblue;
      color: #4b4b4b;
    }
  }
  .towardTable {
    margin-top: 10px;
  }
  .explain {
    color: #4b4b4b;
  }
  .explainOne {
    text-align: center;
    color: #4b4b4b;
    .explainSecond {
      text-decoration: underline;
      color: #00f;
      cursor: pointer;
    }
  }
  .bottom_btn {
    text-align: center;
    margin: 15px auto;
  }
}
</style>

