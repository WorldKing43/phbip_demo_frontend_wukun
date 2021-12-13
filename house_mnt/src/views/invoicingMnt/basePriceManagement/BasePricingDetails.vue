<!--
 * @Description:基准价管理-基准价详情页
 * @Version: 1.0
 * @Autor: maxq
 * @Date: 2019-11-21 17:12 
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-09 09:44:21
-->
<template>
  <div id="base-pricing-details">
    <div>
      <title-stylex :title="firstTitle"></title-stylex>
      <table :model="districtData">
        <td>小区名称</td>
        <td>{{ districtData.name }}</td>
        <td>小区号</td>
        <td>{{ districtData.code }}</td>
        <td>地址</td>
        <td style="width: auto">{{ districtData.address }}</td>
      </table>
    </div>
    <div>
      <title-stylex :title="secondTitle"></title-stylex>
      <el-form size="mini" v-model="form" label-width="4rem">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="栋名称">
              <el-select
                v-model="form.buildingName"
                @change="baseBuildingChange"
                clearable
              >
                <el-option
                  v-for="(item, index) in buildingList"
                  :label="item"
                  :value="item"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="房号">
              <el-select
                v-model="form.houseNo"
                clearable
                @change="searchBasePricing(1)"
              >
                <el-option
                  v-for="(item, index) in baseHouseNoList"
                  :label="item"
                  :value="item"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-button type="primary" size="mini" @click="searchBasePricing(1)"
              >查询</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="preserveBuildingPrice()"
              >维护基准价(整栋)</el-button
            >
            <el-button type="primary" size="mini" @click="preserveHousePrice()"
              >维护基准价(某套房)</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :data="tableData"
        :cell-style="globalCellStyle"
        :header-cell-style="globalHeaderStyle"
        border
      >
        <el-table-column prop="buildingNo" label="栋号"></el-table-column>
        <el-table-column prop="buildingName" label="栋名称"></el-table-column>
        <el-table-column prop="houseNo" label="房号"></el-table-column>
        <el-table-column
          prop="lzfzjdj"
          label="廉租房租金单价"
        ></el-table-column>
        <el-table-column
          prop="gzfzjdj"
          label="公租房租金单价"
        ></el-table-column>
        <el-table-column
          prop="ajxspfzjdj"
          label="安居型商品房租金单价"
        ></el-table-column>
        <el-table-column
          prop="rcfzjdj"
          label="人才房租金单价"
        ></el-table-column>
        <el-table-column prop="sczjdj" label="市场租金单价"></el-table-column>
        <el-table-column prop="dwzcbj" label="单位准成本价"></el-table-column>
        <el-table-column prop="dwwlj" label="单位微利价"></el-table-column>
        <el-table-column
          prop="dwajxspfsj"
          label="单位安居型商品房售价"
        ></el-table-column>
        <el-table-column prop="dwscj" label="单位市场售价"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="preserveOneHousePrice(scope.row)"
              >维护基准价</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="viewHistory(scope.row)"
              >查看历史评估价</el-button
            >
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
    <!-- 弹框 -->
    <!-- 维护基准价（整栋）-->
    <el-dialog
      title="维护基准价(整栋)"
      :visible.sync="openBuildingDiolog"
      width="40%"
      :close-on-click-modal="false"
    >
      <el-form label-width="6rem" size="mini" v-model="buildingForm">
        <title-stylex :title="dialogFirstTitle"></title-stylex>
        <el-form-item label="栋名称">
          <el-select
            v-model="buildingForm.buildingName"
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
        <title-stylex :title="dialogSecondTitle"></title-stylex>
        <el-form-item label="基准价类型">
          <el-select v-model="buildingForm.basePriceType" clearable>
            <el-option
              v-for="(item, index) in basePricingType"
              :label="item.name"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评估时间">
          <el-date-picker
            type="datetime"
            v-model="buildingForm.evaluationTime"
            class="w100"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="启用时间">
          <el-date-picker
            type="datetime"
            v-model="buildingForm.activationTime"
            class="w100"
          ></el-date-picker>
        </el-form-item>
        <title-stylex :title="dialogThirdTitle"></title-stylex>
        <el-form-item label="价格">
          <el-input
            style="width: 80%"
            v-model="buildingForm.basePrice"
            clearable
          ></el-input>
          <span>元/平方米</span>
        </el-form-item>
        <div class="buildingBtn">
          <el-button size="mini" @click="openBuildingDiolog = false"
            >取消</el-button
          >
          <el-button type="primary" size="mini" @click="confirmBuilding()"
            >确定</el-button
          >
        </div>
      </el-form>
    </el-dialog>
    <!-- 维护基准价（某套房）-->
    <el-dialog
      title="维护基准价(某套房)"
      :visible.sync="openHouseDiolog"
      width="40%"
      :close-on-click-modal="false"
    >
      <el-form label-width="6rem" size="mini" v-model="houseForm">
        <title-stylex :title="dialogFirstTitle"></title-stylex>
        <el-row>
          <el-col :span="12">
            <el-form-item label="栋名称" label-width="4rem">
              <el-select
                v-model="houseForm.buildingName"
                @change="changeHouseBuilding"
                :disabled="!isEdit"
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
          </el-col>
          <el-col :span="12">
            <el-form-item label="房号" label-width="3rem">
              <el-select
                v-model="houseForm.houseNo"
                :disabled="!isEdit"
                clearable
              >
                <el-option
                  v-for="(item, index) in houseNoList"
                  :label="item"
                  :value="item"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <title-stylex :title="dialogSecondTitle"></title-stylex>
        <el-form-item label="基准价类型">
          <el-select v-model="houseForm.basePriceType" clearable>
            <el-option
              v-for="(item, index) in basePricingType"
              :label="item.name"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评估时间">
          <el-date-picker
            type="datetime"
            v-model="houseForm.evaluationTime"
            class="w100"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="启用时间">
          <el-date-picker
            type="datetime"
            v-model="houseForm.activationTime"
            class="w100"
          ></el-date-picker>
        </el-form-item>
        <title-stylex :title="dialogThirdTitle"></title-stylex>
        <el-form-item label="价格">
          <el-input
            style="width: 80%"
            v-model="houseForm.basePrice"
            clearable
          ></el-input>
          <span>元/平方米</span>
        </el-form-item>
        <div class="buildingBtn">
          <el-button size="mini" @click="openHouseDiolog = false"
            >取消</el-button
          >
          <el-button type="primary" size="mini" @click="confirmHouse()"
            >确定</el-button
          >
        </div>
      </el-form>
    </el-dialog>
    <!-- 查看历史评估价 -->
    <el-dialog
      title="查看历史评估价"
      :visible.sync="opneHistoryDiolog"
      :close-on-click-modal="false"
    >
      <el-form size="mini" label-width="6rem" v-model="historyForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="基准价类型">
              <el-select
                v-model="historyForm.basePriceType"
                clearable
                @change="toCheck"
              >
                <el-option
                  v-for="(item, index) in basePricingType"
                  :label="item.name"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="评估时间">
              <el-date-picker
                type="datetime"
                v-model="historyForm.evaluationTimeStart"
                style="width: 45%"
                @change="toCheck"
              ></el-date-picker>
              <span>至</span>
              <el-date-picker
                type="datetime"
                v-model="historyForm.evaluationTimeEnd"
                style="width: 45%"
                @change="toCheck"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="启用时间">
              <el-date-picker
                type="datetime"
                v-model="historyForm.activationTimeStart"
                style="width: 45%"
                @change="toCheck"
              ></el-date-picker>
              <span>至</span>
              <el-date-picker
                type="datetime"
                v-model="historyForm.activationTimeEnd"
                @change="toCheck"
                style="width: 45%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" size="mini" @click="toCheck()"
              >查询</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :data="dialogTableData"
        :cell-style="globalCellStyle"
        :header-cell-style="globalHeaderStyle"
        border
      >
        <el-table-column
          prop="evaluationTime"
          label="评估时间"
        ></el-table-column>
        <el-table-column
          prop="activationTime"
          label="启用时间"
        ></el-table-column>
        <el-table-column
          prop="basePrice"
          label="xx基准价类型(元/平方米)"
        ></el-table-column>
      </el-table>
      <div class="buildingBtn">
        <el-button type="primary" size="mini" @click="opneHistoryDialog()"
          >关闭</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import TitleStylex from "@/components/TitleStylex";
import http from "@/api/interface.js";
export default {
  name: "basePricingDetails",
  components: {
    TitleStylex,
  },
  data() {
    return {
      firstTitle: "小区信息",
      secondTitle: "基准价",
      dialogFirstTitle: "请选择栋",
      dialogSecondTitle: "请选择基准价类型",
      dialogThirdTitle: "请填写相应价格",
      districtGuid: "", //小区标识
      buildingGuid: "", //栋标识
      houseGuid: "", //房屋标识
      districtData: {
        name: "", //小区名称
        code: "", //小区号
        address: "", //地址
      }, //小区信息
      form: {
        buildingName: "", //栋名称
        houseNo: "", //栋号
      },
      buildingList: [], //栋名称
      tableData: [], //表格数据
      //分页数据
      total: 0,
      pageSize: 20,
      currentPage: 1,
      pageSizesList: [20, 50, 100, 200],
      openBuildingDiolog: false, //维护基准价(整栋)弹框显隐
      openHouseDiolog: false, //维护基准价(某套房)弹框显隐
      opneHistoryDiolog: false, //查看历史评估价弹框显隐
      defalutBuildingList: [], //维护基准价弹框内栋名称下拉框
      buildingForm: {
        buildingName: "",
      }, //维护基准价（整栋）表单数据
      houseForm: {
        buildingName: "", //栋名成
        houseNo: "", //房号
        basePriceType: "", //基准价类型
        evaluationTime: "", //评估时间
        activationTime: "", //启用时间
        basePrice: "", //价格
      }, //维护基准价（某套房）表单数据
      dialogTableData: [], //查看历史评估价表格数据
      basePricingType: [], //基准价类型下拉框
      houseNoList: [], //弹框内-房号下拉框
      baseHouseNoList: [], //基准价-房号下拉框
      historyForm: {
        //查看历史评价弹框表单数据
        basePriceType: "",
        evaluationTimeStart: "",
        evaluationTimeEnd: "",
        activationTimeStart: "",
        activationTimeEnd: "",
      },
      isEdit: false,
    };
  },
  methods: {
    //根据名称查询字典
    getDictionary() {
      let nameArr = ["基准价类型"];
      let params = {
        names: nameArr.toString(),
      };
      http.getDictionary(params).then((res) => {
        res = JSON.parse(res);
        this.basePricingType = res.基准价类型;
      });
    },
    //查询小区信息
    searchDistrict() {
      let params = {
        districtGuid: this.districtGuid,
      };
      http
        .getDistrictInfo(params)
        .then((res) => {
          this.districtData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //维护基准价(整栋)弹框-选择的某栋名称下拉改变时
    changeBuilding() {
      this.buildingGuid = this.buildingForm.buildingName; //选择栋名称时给栋标识赋值
    },
    //维护基准价(某套房)弹框-选择的某栋名称下拉改变时
    changeHouseBuilding() {
      this.buildingGuid = this.houseForm.buildingName; //选择栋名称时给栋标识赋值
      this.getHouseNoSelect(); //获取房号下拉数据
    },
    //基准价-栋下拉框数据改变时 下拉数据
    baseBuildingChange() {
      this.buildingGuid = this.form.buildingName;
      this.getBaseHouseNoList(); //栋名称修改时 查询此栋下的房号
      this.searchBasePricing(1);
    },
    //基准价-栋名称下拉数据查询(给下拉框赋值)
    searchBuilding() {
      let params = {
        districtGuid: this.districtGuid,
      };
      http
        .getBuildingList(params)
        .then((res) => {
          this.buildingList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //基准价-房号下拉数据查询
    getBaseHouseNoList() {
      let params = {
        districtGuid: this.districtGuid,
        buildingName: this.form.buildingName,
      };
      http
        .getBaseHouseNoList(params)
        .then((res) => {
          this.baseHouseNoList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //基准价-小区下基准价查询
    searchBasePricing(index) {
      if (index) {
        this.currentPage = index;
      }
      let params = {
        districtGuid: this.districtGuid,
        buildingName: this.form.buildingName,
        houseNo: this.form.houseNo,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
      };
      http
        .searchBasePricing(params)
        .then((res) => {
          this.tableData = res.content;
          this.total = res.totalElements;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取栋下拉框(维护基准价按钮弹框内的公共方法)
    getBuildingSelect(val) {
      let params = {
        districtGuid: this.districtGuid,
        flag: val,
      };
      http
        .baseSearchBuilding(params)
        .then((res) => {
          this.defalutBuildingList = res; //赋值给栋名称下拉框
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHouseNoSelect() {
      let params = {
        districtGuid: this.districtGuid,
        buildingGuid: this.houseForm.buildingName,
      };
      http
        .getHouseNoList(params)
        .then((res) => {
          this.houseNoList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //维护基准价(整栋) 按钮- 查询栋名称下拉数据
    preserveBuildingPrice(val) {
      this.openBuildingDiolog = true;
      this.buildingForm = {}; //清空维护基准价弹框
      this.getBuildingSelect(true); //获取栋下拉数据
    },
    //维护基准价（整栋）- 确定按钮
    confirmBuilding() {
      if (!this.buildingForm.buildingName) {
        this.$message("请填写栋名称");
      } else if (!this.buildingForm.basePriceType) {
        this.$message("请填写基准价类型");
      } else if (!this.buildingForm.evaluationTime) {
        this.$message("请填写评估时间");
      } else if (!this.buildingForm.activationTime) {
        this.$message("请填写启用时间");
      } else if (!this.buildingForm.basePrice) {
        this.$message("请填写价格");
      } else {
        let params = {
          districtGuid: this.districtGuid,
          buildingGuid: this.buildingForm.buildingName,
          activationTime: this.buildingForm.activationTime,
          basePrice: this.buildingForm.basePrice,
          basePriceType: this.buildingForm.basePriceType,
          evaluationTime: this.buildingForm.evaluationTime,
        };
        let data = {};
        http
          .preserveBasePricing(params, data)
          .then((res) => {
            this.searchBasePricing(); //刷新一次表格查询
            this.searchBuilding(); //增加栋后 查询表单 栋名称 下拉框数据需要再次刷新
            this.$message({
              type: "success",
              message: "操作成功!",
            });
          })
          .catch((err) => {
            console.log(err);
          });
        this.openBuildingDiolog = false;
      }
    },
    //维护基准价（某套房）按钮
    preserveHousePrice() {
      this.isEdit = true;
      this.openHouseDiolog = true;
      this.houseForm = {}; //清空维护基准价某套房的弹框
      this.getBuildingSelect(false);
    },
    //列表单个维护基准价按钮
    preserveOneHousePrice(val) {
      this.isEdit = false;
      this.openHouseDiolog = true;
      this.houseForm = {
        houseNo: val.houseNo,
        buildingName: val.buildingName,
        buildingGuid: val.buildingGuid,
      }; //清空维护基准价某套房的弹框
      // this.getBuildingSelect(false);
    },
    //维护基准价（某套房）- 确定按钮
    confirmHouse() {
      var buildGuid;
      if (this.houseForm.buildingGuid == undefined) {
        buildGuid = this.houseForm.buildingName;
      } else {
        buildGuid = this.houseForm.buildingGuid;
      }
      if (!this.houseForm.buildingName) {
        this.$message("请填写栋名称");
      } else if (!this.houseForm.basePriceType) {
        this.$message("请填写基准价类型");
      } else if (!this.houseForm.evaluationTime) {
        this.$message("请填写评估时间");
      } else if (!this.houseForm.activationTime) {
        this.$message("请填写启用时间");
      } else if (!this.houseForm.basePrice) {
        this.$message("请填写价格");
      } else {
        let params = {
          districtGuid: this.districtGuid,
          buildingGuid: buildGuid,
          activationTime: this.houseForm.activationTime,
          basePrice: this.houseForm.basePrice,
          basePriceType: this.houseForm.basePriceType,
          evaluationTime: this.houseForm.evaluationTime,
          houseNo: this.houseForm.houseNo,
        };
        let data = {};
        http
          .preserveBasePricing(params, data)
          .then((res) => {
            this.openHouseDiolog = false;
            this.searchBasePricing(); //刷新一次表格查询
            this.$message({
              type: "success",
              message: "操作成功!",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //查看历史评估价
    viewHistory(val) {
      this.opneHistoryDiolog = true;
      this.buildingGuid = val.buildingGuid; //栋标识
      this.houseGuid = val.houseGuid; //房屋标识
    },
    //查看历史评估价-查询按钮
    toCheck() {
      console.log(this.historyForm.basePriceType);
      if (
        this.historyForm.basePriceType == "" ||
        this.historyForm.basePriceType == undefined
      ) {
        this.$alert("请先选择基准价类型!", "提示");
      } else {
        let params = {
          districtGuid: this.districtGuid, //小区标识
          buildingGuid: this.buildingGuid,
          houseGuid: this.houseGuid,
          basePriceType: this.historyForm.basePriceType,
          evaluationTimeStart: this.historyForm.evaluationTimeStart,
          evaluationTimeEnd: this.historyForm.evaluationTimeEnd,
          activationTimeStart: this.historyForm.activationTimeStart,
          activationTimeEnd: this.historyForm.activationTimeEnd,
        };
        http
          .historyPrice(params)
          .then((res) => {
            this.dialogTableData = res;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //关闭历史评估价弹框
    opneHistoryDialog() {
      this.opneHistoryDiolog = false;
      this.historyForm = {}; //清空上次数据--金雅蓓
      this.dialogTableData = []; //清空上次查询数据-金雅蓓
    },
    //当前页条数改变时
    handleSizeChange(val) {
      this.pageSize = val;
      this.searchBasePricing(1); //解决分页bug--金雅蓓
    },
    //当前页跳转时
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchBasePricing();
    },
  },
  created() {
    this.districtGuid = this.$parent.params.districtGuid; //小区标识赋值
  },
  mounted() {
    this.getDictionary(); //查询字典
    this.searchDistrict(); //查询小区信息
    this.searchBuilding(); //查询栋列表下拉框数据
    this.searchBasePricing(); //基准查询
  },
};
</script>
<style lang="scss" scoped>
#base-pricing-details {
  padding-left: 15px;
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
  .buildingBtn {
    text-align: center;
    margin-top: 10px;
  }
  .w100 {
    width: 100%;
  }
}
</style>

