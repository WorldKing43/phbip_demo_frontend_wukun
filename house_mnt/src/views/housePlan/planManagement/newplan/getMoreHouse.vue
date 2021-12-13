<!-- 制定计划-房源 -->
<template>
  <div class="bg-fff">
    <!-- 房源状况=选择小区、栋、房-->
    <div>
      <div class="title">
        <div class="title-icon"></div>
        <div class="title-font">房源状况</div>
        <div class="title-bottom"></div>
      </div>
      <div class="housing">
        <div class="category">
          <!--选择小区-->
          <div class="title-bg">
            <span>选择小区</span>
          </div>
          <div class="table">
            <el-form
              @submit.native.prevent
              :model="communityForm"
              style="width:100%;"
              size="mini"
              label-position="left"
            >
              <el-row :gutter="10">
                <el-col :span="24">
                  <el-form-item label="小区名称" label-width="7.8rem"></el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="24">
                  <el-form-item>
                    <el-autocomplete
                      class="inline-input"
                      v-model="communityForm.name"
                      :fetch-suggestions="getCommunityList"
                      placeholder="请输入内容"
                      :trigger-on-focus="false"
                      :clearable="true"
                      popper-class="select-option"
                      @select="selectedChange"
                      style="width:100%"
                    ></el-autocomplete>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="24" style="text-align:center">
                  <el-button type="primary" @click="reset" size="mini">重置</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div class="area">
          <!--选择栋-->
          <div class="title-bg">
            <span>选择栋</span>
          </div>
          <div class="table">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <div
                class="tips"
                v-for="(city, index) in cities"
                :key="index"
                @mouseenter="tipindexchange(index)"
                @mouseleave="tipindexchangex()"
              >
                <p v-show="index == tipindex">{{ city.name }}</p>
                <el-checkbox :label="city">{{ city.name }}</el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
        </div>
        <div class="doormodel">
          <!--选择房-->
          <div class="title-bg">
            <span>选择房</span>
          </div>
          <div class="table">
            <el-form
              ref="form"
              :model="houseForm"
              size="mini"
              class="selecthouse"
              label-position="left"
            >
              <!-- 分配权暂时前端注释掉，具体要根据当前登录人来直接展示登录人的分配权 -->
              <!-- <el-form-item label="分配权" label-width="80px">
                <el-select v-model="houseForm.houseOwnership" placeholder="分配权" style="width:100%" clearable>
                  <el-option
                    v-for="(item,index) in distribution"
                    :key="index"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>-->
              <el-form-item label="户型" label-width="80px">
                <el-select
                  v-model="houseForm.type"
                  placeholder="户型"
                  multiple
                  style="width:100%"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in apartment"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="房号" label-width="80px">
                <el-col :span="24">
                  <el-input v-model="houseForm.houseNo" clearable></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="竣工建筑面积(平方米)" label-width="10rem">
                <el-row :gutter="0">
                  <el-col :span="11">
                    <el-input
                      v-model="houseForm.completionAreabegain"
                      clearable
                      @keyup.native="proving"
                    ></el-input>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align:center">-</el-col>
                  <el-col :span="11">
                    <el-input
                      v-model="houseForm.completionAreaEnd"
                      clearable
                      @keyup.native="proving2"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="预测绘建筑面积(平方米)" label-width="11rem">
                <el-row :gutter="0">
                  <el-col :span="11">
                    <el-input v-model="houseForm.areaMin" clearable></el-input>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align:center">-</el-col>
                  <el-col :span="11">
                    <el-input v-model="houseForm.areaMax" clearable></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item style="text-align:center;">
                <el-button type="primary" @click="onSubmit">添加至待选房列表</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "./serve.js";
import publicMethod from "@/api/publicMethod.js";
export default {
  name: "getmorehouse",
  props: {
    getPlanGuid: String
  },
  data() {
    return {
      selectCommunity: {}, //选择小区
      communityForm: {}, //小区名称或编号
      selectCommunityOptions: [], //下拉的小区数据
      checkAll: false,
      checkedCities: [], //选中的栋
      cities: [], //存放栋
      isIndeterminate: true,
      houseForm: {},
      districtGuid: "", //选中的小区
      unitGuid: [], //最终选中的栋
      distribution: [], //变更单位
      apartment: [], // 户型
      tipindex: -1,
      hidden: false,
      nowguid: ""
    };
  },
  methods: {
    reset() {
      this.communityForm.name = "";
      this.selectCommunityOptions = [];
      this.cities = []; //存放的栋信息
    },
    //根据小区名称或编号查询
    getCommunityList(str, cb) {
      this.selectCommunity.guid = "";
      let params = {
        searchContent: this.communityForm.name
      };
      publicMethod
        .getCommunityList(params)
        .then(res => {
          for (let i of res) {
            i.value = i.districtNameNo;
          }
          this.selectCommunityOptions = res; //将结果存入下拉小区数据中
          this.hidden = true;
          if (this.selectCommunityOptions.length === 0) {
            this.selectCommunityOptions = [{ value: "暂无数据" }];
          }
          cb(this.selectCommunityOptions);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //气泡显示
    tipindexchange(index) {
      this.tipindex = index;
    },
    tipindexchangex() {
      this.tipindex = -1;
    },
    proving() {
      if (
        this.houseForm.areaMin !== "" ||
        this.houseForm.areaMin !== undefined
      ) {
        this.houseForm.areaMin = this.houseForm.areaMin.replace(/[^\d.]/g, ""); //必须保证第一个为数字而不是.
        this.houseForm.areaMin = this.houseForm.areaMin.replace(/^\./g, ""); ////保证只有出现一个.而没有多个.
        this.houseForm.areaMin = this.houseForm.areaMin.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        this.houseForm.areaMin = this.houseForm.areaMin
          .replace(".", "$#$")
          .replace(/\./g, "")
          .replace("$#$", ".");
        let arr = this.houseForm.areaMin.split("."); //最多保留小数点后两位
        if (arr.length > 1) {
          this.houseForm.areaMin =
            arr[0] + "." + (arr[1].length > 2 ? arr[1].substr(0, 2) : arr[1]);
        }
      }
    },
    proving2() {
      if (
        this.houseForm.areaMax !== "" ||
        this.houseForm.areaMax !== undefined
      ) {
        this.houseForm.areaMax = this.houseForm.areaMax.replace(/[^\d.]/g, ""); //必须保证第一个为数字而不是.
        this.houseForm.areaMax = this.houseForm.areaMax.replace(/^\./g, ""); ////保证只有出现一个.而没有多个.
        this.houseForm.areaMax = this.houseForm.areaMax.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        this.houseForm.areaMax = this.houseForm.areaMax
          .replace(".", "$#$")
          .replace(/\./g, "")
          .replace("$#$", ".");
        let arrx = this.houseForm.areaMax.split("."); //最多保留小数点后两位
        if (arrx.length > 1) {
          this.houseForm.areaMax =
            arrx[0] +
            "." +
            (arrx[1].length > 2 ? arrx[1].substr(0, 2) : arrx[1]);
        }
      }
    },
    //下拉框，选中小区名称，触发该方法
    selectedChange(item) {
      if (item.value != "暂无数据") {
        //发送请求，获取栋
        this.districtGuid = item.guid;
        let params = {
          districtGuid: item.guid
        };
        this.cities = [];
        http
          .getUnitInfoList(params)
          .then(res => {
            if (res.length > 0) {
              res.forEach(item => {
                this.cities.push(item);
                this.checkedCities.push(item);
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //全选
    handleCheckAllChange(val) {
      this.unitGuid = val ? this.cities : [];
      this.isIndeterminate = false;
      this.checkedCities = this.unitGuid;
    },
    //选择栋 触发
    handleCheckedCitiesChange(value) {
      let arr = value;
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
      let guidData = [];
      arr.forEach(element => {
        guidData.push(element);
      });
      this.unitGuid = guidData;
    },
    //添加至待选房列表
    onSubmit() {
      let params = {
        districtGuid: this.districtGuid,
        planGuid: this.getPlanGuid,
        allocationRight: this.houseForm.houseOwnership,
        type: this.houseForm.type.toString(),
        areaMin: this.houseForm.areaMin,
        areaMax: this.houseForm.areaMax,
        completionAreaEnd: this.houseForm.completionAreaEnd,
        completionAreabegain: this.houseForm.completionAreabegain,
        houseNo: this.houseForm.houseNo
      };
      let guidArr = this.unitGuid;
      let data = [];
      guidArr.forEach(item => {
        if (item != null) {
          data.push(item.guid);
        }
      });
      http
        .getHouseInfoStockList(params, data)
        .then(res => {
          this.$emit("reGetList");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取字典
    getDictionary() {
      let namesArr = ["变更单位", "户型"];
      let params = {
        names: namesArr.toString()
      };
      http
        .getDictionary(params)
        .then(res => {
          res = JSON.parse(res);
          this.distribution = res.变更单位;
          this.apartment = res.户型;
          //console.log(res);
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
.bg-fff {
  .table {
    padding: 10px;
  }
  background: #fff;
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
  .housing {
    display: flex;
    justify-content: space-around;
    margin-top: 33px;
    padding-bottom: 30px;
    font-size: 16px;
    .category {
      width: 30%;
      height: 21rem;
      border-radius: 10px;
      box-shadow: 0px 0px 20px 8px #eef4fc;
      .title-bg {
        background: #fef6e9;
        width: 100%;
        height: 2rem;
        span {
          margin-left: 10px;
          color: #f6b850;
        }
      }
    }
    .area {
      /*  overflow: auto; */
      width: 33%;
      height: 21rem;
      overflow-y: auto;
      border-radius: 10px;
      box-shadow: 0px 0px 20px 8px #eef4fc;
      .title-bg {
        background: #eef9f4;
        width: 100%;
        height: 2rem;
        span {
          margin-left: 10px;
          color: #71d0a5;
        }
      }
    }
    .doormodel {
      width: 33%;
      height: 21rem;
      overflow-y: auto;
      border-radius: 10px;
      box-shadow: 0px 0px 20px 8px #eef4fc;
      .title-bg {
        background: #e9f7fc;
        width: 100%;
        height: 2rem;
        span {
          margin-left: 10px;
          color: #5dc7ea;
        }
      }
    }
  }
}
.tips {
  float: left;
  box-sizing: border-box;
  width: 50%;
  padding-right: 5px;
  position: relative;
}
.el-checkbox-group /deep/ .el-checkbox {
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.tips p {
  z-index: 100;
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  color: #fff;
  padding: 2px 5px;
  border-radius: 4px;
  white-space: nowrap;
  background-color: #0fbcf9;
}
.tips p:before {
  content: "";
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-width: 8px;
  border-style: solid;
  border-color: #0fbcf9 transparent transparent;
}
.selecthouse /deep/ .el-select {
  width: 100%;
}
/deep/ .el-dropdown {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 2px;
  width: 160px;
}
</style>
