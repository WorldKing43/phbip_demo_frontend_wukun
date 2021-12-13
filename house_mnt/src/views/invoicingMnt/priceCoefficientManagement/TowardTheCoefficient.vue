<!--
 * @Description:计价系数管理-朝向系数
 * @Version: 1.0
 * @Autor: maxq
 * @Date: 2019-11-22 10: 40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 
-->
<template>
  <div id="toward-the-coefficient">
    <div>
      <title-stylex :title="firstTitle"></title-stylex>
      <table :model="districtData">
        <td>小区名称</td>
        <td>{{ districtData.name }}</td>
        <td>小区号</td>
        <td>{{ districtData.code }}</td>
        <td>地址</td>
        <td>{{ districtData.address }}</td>
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
        <el-table-column
          prop="skirtFloorCount"
          label="裙楼层数"
        ></el-table-column>
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
              <el-select
                v-model="form.buildingName"
                clearable
                @change="search(1)"
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
          <el-col :span="10">
            <el-button type="primary" size="mini" @click="search(1)"
              >查询</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button type="primary" size="mini" @click="preserveTowards()"
              >维护朝向系数</el-button
            >
            <span class="explain"
              >说明：本小区所有楼栋的朝向系数默认使用系统缺省值。若需要调整某栋的朝向系数，请使用【维护朝向系数】功能进行调整。</span
            >
          </el-col>
        </el-row>
        <el-row>
          <p class="explainOne">
            该小区的朝向系数使用系统缺省值，
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
          <el-table-column prop="typeName" label="朝向"></el-table-column>
          <el-table-column
            prop="rentMultiLayerCoefficient"
            label="租多层朝向系数"
          ></el-table-column>
          <el-table-column
            prop="rentHighLayerCoefficient"
            label="租高层朝向系数"
          ></el-table-column>
          <el-table-column
            prop="sellMultiLayerCoefficient"
            label="售多层朝向系数"
          ></el-table-column>
          <el-table-column
            prop="sellHighLayerCoefficient"
            label="售高层朝向系数"
          ></el-table-column>
          <el-table-column prop="buildingName" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="toEdit(scope.row)"
                >编辑</el-button
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
    </div>
    <!-- 弹框 -->
    <!-- 查看系统缺省值 -->
    <el-dialog
      title="查看系统缺省朝向系数"
      :visible.sync="openFirstDialog"
      :close-on-click-modal="false"
    >
      <title-stylex :title="dialongFirstTitle"></title-stylex>
      <el-table
        :data="systemTableData"
        :cell-style="globalCellStyle"
        :header-cell-style="globalHeaderStyle"
        border
      >
        <el-table-column prop="typeName" label="朝向"></el-table-column>
        <el-table-column
          prop="rentMultiLayerCoefficient"
          label="租多层朝向系数"
        ></el-table-column>
        <el-table-column
          prop="rentHighLayerCoefficient"
          label="租高层朝向系数"
        ></el-table-column>
        <el-table-column
          prop="sellMultiLayerCoefficient"
          label="售多层朝向系数"
        ></el-table-column>
        <el-table-column
          prop="sellHighLayerCoefficient"
          label="售高层朝向系数"
        ></el-table-column>
      </el-table>
      <div class="bottom_btn">
        <el-button type="primary" size="mini" @click="openFirstDialog = false"
          >关闭</el-button
        >
      </div>
    </el-dialog>
    <!-- 维护朝向系数 -->
    <el-dialog
      :title="preserveOrEdit"
      :visible.sync="openSecondDialog"
      :close-on-click-modal="false"
    >
      <!-- <title-stylex  :title="dialogSecondTitle"></title-stylex>
      <el-radio-group v-model="systemDefault" >
        <el-radio label="1">基于系统缺省值调整</el-radio>
      </el-radio-group>-->
      <title-stylex :title="dialogThirdTitle"></title-stylex>
      <el-form v-model="dialogForm">
        <el-form-item label>
          <el-select
            v-model="dialogForm.buildingName"
            size="mini"
            style="width:40%;"
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
      <el-table
        :data="towardTableData"
        :cell-style="globalCellStyle"
        :header-cell-style="globalHeaderStyle"
        border
      >
        <el-table-column prop="typeName" label="朝向"></el-table-column>
        <el-table-column
          prop="rentMultiLayerCoefficient"
          label="租多层朝向系数"
        >
          <template slot-scope="scope">
            <el-input
              size="mini"
              v-model="scope.row.rentMultiLayerCoefficient"
              placeholder="请输入"
              clearable
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="rentHighLayerCoefficient" label="租高层朝向系数">
          <template slot-scope="scope">
            <el-input
              size="mini"
              v-model="scope.row.rentHighLayerCoefficient"
              placeholder="请输入"
              clearable
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="sellMultiLayerCoefficient"
          label="售多层朝向系数"
        >
          <template slot-scope="scope">
            <el-input
              size="mini"
              v-model="scope.row.sellMultiLayerCoefficient"
              placeholder="请输入"
              clearable
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sellHighLayerCoefficient" label="售高层朝向系数">
          <template slot-scope="scope">
            <el-input
              size="mini"
              v-model="scope.row.sellHighLayerCoefficient"
              placeholder="请输入"
              clearable
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom_btn">
        <el-button size="mini" @click="openSecondDialog = false"
          >取消</el-button
        >
        <el-button type="primary" size="mini" @click="changeTowardCoe()"
          >确定</el-button
        >
      </div>
    </el-dialog>
    <!-- 编辑朝向系数 -->
    <el-dialog
      :title="EditBuilding"
      :visible.sync="openThirdDialog"
      :close-on-click-modal="false"
    >
      <title-stylex :title="dialogThirdTitle"></title-stylex>
      <span></span>
      <el-table
        :data="singleBuildingData"
        :cell-style="globalCellStyle"
        :header-cell-style="globalHeaderStyle"
        border
      >
        <el-table-column prop="typeName" label="朝向"></el-table-column>
        <el-table-column
          prop="rentMultiLayerCoefficient"
          label="租多层朝向系数"
        >
          <template slot-scope="scope">
            <el-input
              size="mini"
              v-model="scope.row.rentMultiLayerCoefficient"
              placeholder="请输入"
              clearable
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="rentHighLayerCoefficient" label="租高层朝向系数">
          <template slot-scope="scope">
            <el-input
              size="mini"
              v-model="scope.row.rentHighLayerCoefficient"
              placeholder="请输入"
              clearable
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="sellMultiLayerCoefficient"
          label="售多层朝向系数"
        >
          <template slot-scope="scope">
            <el-input
              size="mini"
              v-model="scope.row.sellMultiLayerCoefficient"
              placeholder="请输入"
              clearable
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sellHighLayerCoefficient" label="售高层朝向系数">
          <template slot-scope="scope">
            <el-input
              size="mini"
              v-model="scope.row.sellHighLayerCoefficient"
              placeholder="请输入"
              clearable
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom_btn">
        <el-button size="mini" @click="openThirdDialog = false">取消</el-button>
        <el-button type="primary" size="mini" @click="sureToChange()"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import TitleStylex from "@/components/TitleStylex";
import http from "@/api/interface.js";
export default {
  name: "towardTheCoefficient",
  components: {
    TitleStylex
  },
  data() {
    return {
      firstTitle: "小区信息",
      secondTitle: "栋信息",
      thirdTitle: "朝向系数",
      dialongFirstTitle: "查看系统缺省朝向系数",
      dialogSecondTitle: "选择调整方式",
      dialogThirdTitle: "选择栋",
      districtGuid: "", //小区标识
      buildingGuid: "", //栋标识
      districtData: {
        name: "", //小区名称
        code: "", //小区号
        address: "" //地址
      }, //小区信息
      form: {
        buildingName: "",
        houseNumber: ""
      },
      buildingList: [], //栋名称下拉框
      defalutBuildingList: [], //维护朝向系数弹框内栋下拉框
      basePricingType: [], //基准价类型下拉框
      towardList: [], //朝向数据字典
      tableData: [], //朝向系数表格数据
      buildingData: [], //栋列表表格数据
      //分页数据
      total: 0,
      pageSize: 5,
      currentPage: 1,
      pageSizesList: [5, 10, 20, 50],
      systemTableData: [], //查看系统缺省值 表格数据
      openFirstDialog: false, //查看系统缺省值弹框显隐
      openSecondDialog: false, //维护朝向系数弹框显隐
      openThirdDialog: false, //朝向系数弹框显隐
      systemDefault: "", //基于系统缺省值调整
      buildingName: "", //弹框选择栋下拉框
      towardTableData: [], //维护朝向系数弹框 表格数据
      preserveOrEdit: "维护朝向系数", //朝向系数弹框标题
      EditBuilding: "编辑朝向系数", //点击-编辑按钮 弹框标题
      //小区信息分页数据
      buildingtotal: 0,
      buildingPageSize: 5,
      buildingCurrentPage: 1,
      buildingPageSizesList: [5, 10, 20, 50],
      singleBuildingData: [], //编辑弹框表格数据
      dialogForm: {
        buildingName: "" //栋名称
      }
    };
  },
  methods: {
    //根据名称查询字典
    getDictionary() {
      let nameArr = ["基准价类型", "朝向类型"];
      let params = {
        names: nameArr.toString()
      };
      http.getDictionary(params).then(res => {
        res = JSON.parse(res);
        this.basePricingType = res.基准价类型;
        this.towardList = res.朝向类型;
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
          this.buildingtotal = res.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //朝向系数-查询 按钮
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
        .searchAllToward(params)
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
    //朝向系数-栋名称下拉数据查询(给下拉框赋值)
    searchBuilding() {
      let params = {
        districtGuid: this.districtGuid
      };
      http
        .getTowardBuilding(params)
        .then(res => {
          this.buildingList = res;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //维护朝向系数-查询表格数据
    searchorientation() {
      let params = {
        districtGuid: this.districtGuid,
        buildingGuid: this.dialogForm.buildingName
      };
      http
        .searchorientation(params)
        .then(res => {
          this.towardTableData = res;
          // this.towardTableData = this.changeToward(res)
        })
        .catch(err => {
          console.log(err);
        });
    },
    //维护朝向系数-按钮点击触发的事件
    preserveTowards() {
      this.openSecondDialog = true;
      this.dialogForm.buildingName = ""; //打开时清空前一次的数据
      this.towardTableData = [];
      this.getBuildingSelect(); //查询栋名称下拉数据
    },
    //维护朝向系数弹框内-栋下拉框数据
    getBuildingSelect() {
      let params = {
        districtGuid: this.districtGuid,
        flag: true
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
    //维护朝向系数-选择栋改变时 触发的事件
    changeBuilding() {
      this.buildingGuid = this.dialogForm.buildingName; //栋标识
      this.searchorientation(); //查询某栋的朝向系数
    },
    //维护朝向系数弹框内-确定按钮
    changeTowardCoe() {
      this.openSecondDialog = false;
      let params = {};
      let data = this.towardTableData;
      http
        .changBuildingToward(params, data)
        .then(res => {
          this.search(); //列表刷新
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // //朝向系数转汉字本页面公共方法
    // changeToward(TableRes) {
    //   for(let  i = 0; i < TableRes.length; i++){
    //     this.towardList.forEach(element => {
    //       if(TableRes[i].type == element.value){ //对接口获取的值与数据字典朝向类型进行对比 将数字转为汉字
    //         TableRes[i].type = element.name
    //       }
    //     });
    //   }
    //  return TableRes
    // },
    //查看系统缺省值
    toCheck() {
      this.openFirstDialog = true;
      let params = {};
      http
        .getDefaultValue(params)
        .then(res => {
          this.systemTableData = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //表格-编辑按钮
    toEdit(val) {
      console.log(val);
      // selectedBuildingName = val.name
      this.openThirdDialog = true;
      let params = {
        orientationGuid: val.guid //取每条数据的朝向标识
      };
      http
        .singleBuildingSearch(params)
        .then(res => {
          this.singleBuildingData = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //单栋编辑弹框-确定按钮
    sureToChange() {
      this.openThirdDialog = false;
      let params = {};
      let data = this.singleBuildingData;
      http
        .singleBuildingEdit(params, data)
        .then(res => {
          console.log(res);
          this.search(1); //修改后刷新一次
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //当前页条数改变时
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.search(1);
    },
    //当前页跳转时
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    },
    //小区信息-当前页条数改变时
    buildingSizeChange(val) {
      this.buildingPageSize = val;
      this.getBuildingInfo(1);
    },
    //小区信息-当前页跳转时
    buildingCurrentChange(val) {
      this.buildingCurrentPage = val;
      this.getBuildingInfo();
    }
  },
  created() {
    this.districtGuid = this.$parent.params.districtGuid; //小区标识赋值
  },
  mounted() {
    this.getDictionary(); //查询字典
    this.searchDistrict(); //查询小区信息
    this.getBuildingInfo(); //查询栋信息
    this.searchBuilding(); //查询栋列表下拉框数据
    this.search(); //朝向系数查询
    // this.searchBasePricing() //基准查询
  }
};
</script>
<style lang="scss" scoped>
#toward-the-coefficient {
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
