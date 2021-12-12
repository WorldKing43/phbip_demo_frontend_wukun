<!-- 房源详情 -->
<template>
  <div class="bg-fff details">
    <div class="title">
      <div class="title-icon"></div>
      <div class="title-font">房源详情</div>
      <div class="title-bottom"></div>
    </div>
    <div class="margin30">
      <!--表单-->
      <el-form ref="form" :model="form" label-position="left" size="mini" label-width="3rem">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="小区">
              <el-input v-model="form.districtName" clearable @change="queries(1)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="栋号">
              <el-input v-model="form.buildName" clearable @change="queries(1)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房号">
              <el-input v-model="form.houseNo" clearable @change="queries(1)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="户型">
              <el-select
                v-model="form.type"
                placeholder="请选择"
                style="width: 100%"
                clearable
                @change="queries(1)"
              >
                <el-option
                  v-for="(item,index) in typeCode"
                  :label="item.name"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="房屋状态">
              <el-select
                v-model="form.state"
                placeholder="请选择"
                style="width: 100%"
                clearable
                @change="queries(1)"
              >
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item,index) in stateCode"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预测绘建筑面积" label-width="7rem">
              <el-row :gutter="0">
                <el-col :span="10">
                  <el-input v-model="form.areaMin" clearable @change="queries(1)"></el-input>
                </el-col>
                <el-col class="line" :span="4" style="text-align: center">至</el-col>
                <el-col :span="10">
                  <el-input v-model="form.areaMax" clearable @change="queries(1)"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="竣工建筑面积" label-width="6rem">
              <el-row :gutter="0">
                <el-col :span="11">
                  <el-input v-model="form.completionAreabegain" clearable @change="queries(1)"></el-input>
                </el-col>
                <el-col class="line" :span="2" style="text-align: center">-</el-col>
                <el-col :span="11">
                  <el-input v-model="form.completionAreaEnd" clearable @change="queries(1)"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item style="text-align:right">
              <el-button type="primary" @click="queries(1)" v-if="hasPerm('fyjh_jhzd_jhxx_cx')">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!--表格-->
      <div class="table-list">
        <el-table
          :data="selectedHouseData"
          border
          class="w100"
          :header-cell-style="{
          'background': '#E6F0FC',
          'color': '#606266',
          'text-align':'center',
          'border-color': '#DBDBDB',
          }"
          :cell-style="{
          'text-align':'center',
          'border-color': '#DBDBDB',
          }"
        >
          <el-table-column label="序号" type="index" width="55"></el-table-column>
          <el-table-column prop="districtName" label="小区"></el-table-column>
          <el-table-column prop="buildName" label="栋名称"></el-table-column>
          <el-table-column prop="buildCode" label="栋号"></el-table-column>
          <el-table-column prop="houseNo" label="房号"></el-table-column>
          <el-table-column prop="typeName" label="户型"></el-table-column>
          <el-table-column prop="coveredArea" label="预测绘建筑面积(平方米)"></el-table-column>
          <el-table-column prop="completionArea" label="竣工建筑面积(平方米)"></el-table-column>
          <el-table-column prop="allocationRightUnit" label="分配权归属"></el-table-column>
          <el-table-column prop="signatoryRightUnit" label="签约权归属"></el-table-column>
          <el-table-column prop="houseStateName" label="房屋状态"></el-table-column>
          <el-table-column prop="stateName" label="房源状态"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "./serve.js";
export default {
  props: {
    selectedHouseData: Array
  },
  data() {
    return {
      form: {
        areaMax: "",
        areaMin: "",
        districtName: "",
        houseNo: "",
        state: "",
        type: "",
        buildName: "",
        activityName: "",
        completionAreabegain: "",
        completionAreaEnd: ""
      },
      typeCode: [],
      stateCode: []
    };
  },
  methods: {
    coveredArea(row) {
      return row.coveredArea + "㎡";
    },
    queries() {
      this.$emit("fatherFn", this.form);
    },
    //获取字典
    getDictionary() {
      let namesArr = ["户型", "房屋状态"];
      let params = {
        names: namesArr.toString()
      };
      http
        .getDictionary(params)
        .then(res => {
          res = JSON.parse(res);
          this.typeCode = res.户型;
          this.stateCode = res.房屋状态;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getDictionary();
  }
};
</script>

<style lang="scss" scoped>
.details {
  margin-top: 20px;
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
  .margin30 {
    margin: 30px;
  }
}
</style>

