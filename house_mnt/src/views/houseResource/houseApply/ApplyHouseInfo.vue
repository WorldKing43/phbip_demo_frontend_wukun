<!--
 * @Description: 房源录入-房源新建页
 * @Version: 1.0
 * @Autor: wangyue
 * @Date: 2019-11-26
 * @LastEditors: wangyue
 * @LastEditTime: 2020-03-31 10:59:29
 -->
<template>
  <div class="HousingEdit">
    <div class="quarterMessage_box margin_box">
      <div class="width button" style="margin:20px 0">
        <el-button type="primary" @click="fanhui" size="mini">返回</el-button>
      </div>
      <el-form :model="houseInfoPreDTO" :rules="rules" ref="houseInfoPreDTO" label-width="9rem">
        <div class="demo-ruleForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="网格办编号">
                <el-input v-model="houseInfoPreDTO.serialNo" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="不动产权单元号">
                <el-input v-model="houseInfoPreDTO.immovablePropertyUnitNo" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="小区名称">
                <el-input v-model="houseInfoPreDTO.districtName" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="栋号">
                <el-select v-model="houseInfoPreDTO.buildGuid" placeholder readonly disabled>
                  <el-option v-for="(item,index) in buildNameList" :key="index" :label="item.code" :value="item.guid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="栋名称" required>
                <el-select v-model="houseInfoPreDTO.buildGuid" clearable>
                  <el-option v-for="(item,index) in buildNameList" :key="index" :label="item.name" :value="item.guid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房号" required>
                <el-input v-model="houseInfoPreDTO.houseNo" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="不动产权证书号">
                <el-input v-model="houseInfoPreDTO.rightOverImmovablesId" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="初始产权归属" required>
                <el-select v-model="houseInfoPreDTO.propertypBelong" filterable clearable placeholder="点击输入进行相关搜索">
                  <el-option v-for="(item,index) in propertyList" :key="index" :label="item.value" :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="初始房源性质" required>
                <el-select v-model="houseInfoPreDTO.startNature" clearable>
                  <el-option v-for="(item,index) in nature" :key="index" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房屋来源" required>
                <el-select v-model="houseInfoPreDTO.source" clearable>
                  <el-option v-for="(item, index) in source" :key="index" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="房屋用途" required>
                <el-select v-model="houseInfoPreDTO.function" clearable>
                  <el-option v-for="(item,index) in houesUser" :key="index" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在单元">
                <el-input v-model="houseInfoPreDTO.unit" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在楼层">
                <el-input v-model="houseInfoPreDTO.floorNo" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="户型" required>
                <el-select v-model="houseInfoPreDTO.houseLayout" clearable>
                  <el-option v-for="(item , index) in apartment" :key="index" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="朝向" required>
                <el-select v-model="houseInfoPreDTO.orientation" clearable>
                  <el-option v-for="(item , index) in orientation" :key="index" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否有架空层" required>
                <el-select v-model="houseInfoPreDTO.innerFloor" clearable>
                  <el-option v-for="(item,index) in twoChooseList" :key="index" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="平台" required>
                <el-select v-model="houseInfoPreDTO.terrace" clearable>
                  <el-option v-for="(item , index) in queryTerrace" :key="index" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预测绘建筑面积">
                <DistInputNumber v-model="houseInfoPreDTO.coveredArea" placeholder="请输入" unit="平方米" size="mini"
                  :min="0"></DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预测绘套内面积">
                <DistInputNumber v-model="houseInfoPreDTO.indoorArea" placeholder="请输入" unit="平方米" size="mini" :min="0">
                </DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预测绘分摊面积">
                <DistInputNumber v-model="houseInfoPreDTO.residentialPoolArea" placeholder="请输入" unit="平方米" size="mini"
                  :min="0"></DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分摊面积说明">
                <el-input v-model="houseInfoPreDTO.residentialAreaContent" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="竣工建筑面积">
                <DistInputNumber v-model="houseInfoPreDTO.completionArea" placeholder="请输入" unit="平方米" size="mini"
                  :min="0"></DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="竣工分摊面积">
                <DistInputNumber v-model="houseInfoPreDTO.completionShareArea" placeholder="请输入" unit="平方米" size="mini"
                  :min="0"></DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="竣工套内面积">
                <DistInputNumber v-model="houseInfoPreDTO.completionIndoorArea" placeholder="请输入" unit="平方米" size="mini"
                  :min="0"></DistInputNumber>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否样板房">
                <el-select v-model="houseInfoPreDTO.modelHouses" clearable>
                  <el-option v-for="(item,index) in twoChooseList" :key="index" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否代售">
                <el-select v-model="houseInfoPreDTO.helpSell" clearable>
                  <el-option v-for="(item,index) in twoChooseList" :key="index" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="装修标准">
                <!-- required -->
                <el-select v-model="houseInfoPreDTO.decorationType" @change="decorationChange" clearable>
                  <el-option v-for="(item,index) in decorationType" :key="index" :label="item.renovationCode"
                    :value="item.renovationCode"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="装修标准说明">
                <el-input type="textarea" disabled v-model="houseInfoPreDTO.decorationTypeDescription" autosize>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="竣工时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="houseInfoPreDTO.finishConstructionTime"
                  style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="交付使用时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="houseInfoPreDTO.deliveryTime"
                  style="width: 100%;">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input type="textarea" v-model="houseInfoPreDTO.specification" autosize></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import DistInputNumber from "@/components/DistInputNumber";
import http from "@/api/common(bj).js";
export default {
  name: "housingEdit",
  components: {
    DistInputNumber
  },
  data() {
    return {
      houseNo: "",
      rules: { required: true }, //必填规则
      orientation: [], //朝向
      houseInfoPreDTO: {},
      houesUser: [], //房屋用途
      apartment: [], //户型
      // 新增房源可以选择的栋
      buildNameList: [],
      // 选择是否数据字典
      twoChooseList: [
        { name: "是", value: true },
        { name: "否", value: false }
      ],
      decorationType: [], // 装修类型数据字典
      source: [], // 房屋来源
      nature: [], //房屋性质
      queryTerrace: [],
      decorationType: [],
      propertyList: [] //初始产权归属
    };
  },
  methods: {
    //查询房屋信息
    getHouseInfo() {
      let params = {
          districtGuid: this.$parent.meta.districtGuid,
          pageIndex: 1,
          pageSize: 1,
          houseInfoGuid: this.$parent.meta.houseGuid
        };
      http
        .getHouseInfo(params)
        .then(res => {
          console.log(res);
          this.houseInfoPreDTO = res.content[0];
          if (this.houseInfoPreDTO.buildGuid == null) {
            this.houseInfoPreDTO.buildGuid = res.content[0].unitGuid;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //原有小区保存
    originalCommunity(params, data) {
      http
        .houseInfoAdd(params, data)
        .then(res => {
          if (res) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.houseInfoPreDTO = res;
            this.houseInfoPreDTO.districtName = this.$parent.params.districtName;
            //发送房源信息刷新
            this.Event.$emit("HousingEdit", { msg: "refresh" });
            this.againOpen(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //小区保存
    community(params, data) {
      http
        .addHouse(params, data)
        .then(res => {
          if (res) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.houseInfoPreDTO = res;
            this.houseInfoPreDTO.districtName = this.$parent.params.districtName;
            //发送房源信息刷新
            this.Event.$emit("HousingEdit", { msg: "refresh" });
            this.againOpen(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存重新打开
    againOpen(res) {
      this.fanhui();
      this.$parent.openTab({
        id: res.guid,
        label: res.houseNo,
        closable: true,
        meta: {
          state: "1", //1可编辑 0 查看 2新增
          menuId: "housingMessage"
        },
        component: () => import("@/views/houseResource/houseInput/HousingEdit")
      });
    },
    getDict() {
      let dictionaryName = [
        "房屋用途",
        "房屋性质",
        "户型",
        "朝向",
        "平台",
        "房产来源"
      ];
      let params = { names: dictionaryName.toString() };
      http
        .getDictionary(params)
        .then(res => {
          let resp = JSON.parse(res);
          this.houesUser = resp.房屋用途;
          this.nature = this.$dictionaryChange(
            resp.房屋性质,
            this.nature,
            "通用"
          );
          this.apartment = resp.户型;
          resp.朝向.forEach(item => {
            if (item.name == "通用") {
              this.orientation = item.children;
            }
          });
          this.queryTerrace = resp.平台;
          this.source = resp.房产来源;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //判断小区是否更改
    edit() {
      //1可编辑 0 查看 2新增
      if (this.$parent.meta.state == "2") {
        //判断是否带栋号guid
        if (this.$parent.meta.buildGuid) {
          this.houseInfoPreDTO.buildGuid = this.$parent.meta.buildGuid;
        }
      } else {
        let params = {};
        if (this.$parent.params.source == "原有小区录入") {
          params = {
            districtGuid: this.$parent.params.projectGuid,
            pageIndex: 1,
            pageSize: 1,
            houseInfoGuid: this.$parent.params.houseInfoGuid,
            configName: "原有小区入库"
          };
        } else {
          params = {
            districtGuid: this.$parent.params.projectGuid,
            pageIndex: 1,
            pageSize: 1,
            houseInfoGuid: this.$parent.params.houseInfoGuid
          };
        }
        http
          .getHouseInfo(params)
          .then(res => {
            this.houseInfoPreDTO = res.content[0];
            if (this.houseInfoPreDTO.buildGuid == null) {
              this.houseInfoPreDTO.buildGuid = res.content[0].unitGuid;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    async onLoad() {
      this.Event.$on("HouseInputTab", data => {
        if (data.msg == "ChangeSave") {
          this.getDict();
          let params = { districtGuid: this.$parent.params.projectGuid };
          http
            .renovationPreInfoList(params)
            .then(res => {
              this.decorationType = res;
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
      let params = { districtGuid: this.$parent.params.projectGuid };
      await http
        .renovationPreInfoList(params)
        .then(res => {
          this.decorationType = res;
        })
        .catch(err => {
          console.log(err);
        });
      await http
        .getProperty(params)
        .then(res => {
          this.propertyList = res;
        })
        .catch(err => {
          console.log(err);
        });
      await this.getBuildName();
      await this.edit();
    },
    fanhui() {
      this.$parent.close();
    },
    // 获取可以选择的栋-只可以更改子级的栋
    getBuildName() {
      this.buildNameList = [];
      let params;
      params = {
        code: "",
        name: "",
        floorCount: "",
        landNo: "",
        elevator: "",
        skirtFloorCount: "",
        districtGuid: this.$parent.params.projectGuid,
        pageIndex: 1,
        pageSize: 1000
      };
      if (this.$parent.params.source == "原有小区录入") {
        http
          .houseBuilding(params)
          .then(res => {
            // guid createSelf code
            res.content.forEach(item => {
              //if (item.createSelf == true) {
              this.buildNameList.push({
                guid: item.guid,
                code: item.code,
                name: item.name
              });
              //}
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        let params = { districtGuid: this.$parent.params.projectGuid };
        http
          .getBuildName(params)
          .then(res => {
            this.buildNameList = res;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //装修标准选择
    decorationChange() {
      this.decorationType.forEach(item => {
        if (this.houseInfoPreDTO.decorationType == item.renovationCode) {
          this.houseInfoPreDTO.decorationTypeDescription =
            item.renovationDescription;
        }
      });
    }
  },
  created() {
    // this.getDict();
    // this.onLoad();
    this.houseInfoPreDTO.districtName = this.$parent.params.districtName;
    // this.decorationChange();
  },
  mounted() {
    this.getHouseInfo();//获取房屋信息
  },
};
</script>
<style lang="scss" scoped>
.HousingEdit {
  //总样式增加禁用文字居中，此处单独修改
  /deep/ .quarterMessage_box .el-input.is-disabled .el-input__inner {
    text-align: left;
  }
}
</style>
