<template>
  <div class="tableStyle">
    <publicTitle title="房源基本信息"></publicTitle>
    <div id="supporting-details">
      <div class="tableStyle">
        <table class="detail">
          <tr>
            <td>小区名称</td>
            <td>
              <el-input disabled v-model="form.XIAOQMC"></el-input>
            </td>
            <td>栋号</td>
            <td>
              <el-input disabled v-model="form.DONGH"></el-input>
            </td>
          </tr>
          <tr>
            <td>栋名称</td>
            <td>
              <el-input disabled v-model="form.DONGMC"></el-input>
            </td>
            <td>房号</td>
            <td>
              <el-input disabled v-model="form.FANGH"></el-input>
            </td>
          </tr>
          <tr>
            <td>宗地号</td>
            <td>
              <el-input disabled v-model="form.ZONGDH"></el-input>
            </td>
            <td>所在楼层</td>
            <td>
              <el-input disabled v-model="form.SUOZLC"></el-input>
            </td>
          </tr>
          <tr>
            <td>建筑面积</td>
            <td>
              <el-input disabled v-model="form.JIANZMJ"></el-input>
            </td>
            <td>房屋来源</td>
            <td>
              <el-input disabled v-model="form.FANGWLY"></el-input>
            </td>
          </tr>
          <tr>
            <td>备注</td>
            <td colspan="3" style="position: relative">
              <el-input disabled v-model="form.BEIZ"></el-input>
            </td>
          </tr>
          <tr>
            <td>导入人</td>
            <td>
              <el-input disabled v-model="form.DAORR"></el-input>
            </td>
            <td>导入时间</td>
            <td>
              <el-input disabled v-model="form.DAORSJ"></el-input>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <publicTitle title="附件管理"></publicTitle>
    <div>
      <Material :parameter="parameter" :show="show"></Material>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import http from "@/api/housestore.js";
import publicMethod from "@/api/publicMethod";
import publicTitle from "@/components/TitleStylex"; //标题组件
import Material from "@/components/CorrelativeMaterial";
export default {
  data() {
    return {
      parameter: "",
      form: [],
      show: false
    };
  },
  name: "buildingDetails",
  components: {
    publicTitle, //标题公共组件
    Material,
  },
  methods: {
    getDemolitionList() {
      let params = {
        pageIndex: 1,
        pageSize: 1,
      };
      let _data = {
        GUID: this.$route.params.guid,
      };
      http
        .getDemolitionList(params, _data)
        .then((res) => {
          console.log(res);
          this.form = res.content[0];
        })
        .catch((err) => console.log(err));
    },
    //获取过程材料
    getMaterial() {
        console.log(this.$route.params.guid)
      let params = {
        guid: this.$route.params.guid,
        material: true,
        report: false,
      };
      publicMethod
        .getMaterial(params)
        .then((res) => {
          if (!res.id) {
            this.createMis();
          } else {
            this.parameter = this.$route.params.guid;
            this.Event.$emit("CorrelativeMaterial", "getMaterial");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, //创建过程材料
    createMis() {
      let businessName = "拆迁返还";
      let params = {
        businessName: businessName,
        guid: this.$route.params.guid,
      };
      publicMethod
        .createMis(params)
        .then((res) => {
          console.log(res);
          if (res) {
            this.parameter = this.$route.params.guid;
            this.Event.$emit("CorrelativeMaterial", "getMaterial");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.parameter = this.$route.params.guid;
    this.getDemolitionList();
    this.getMaterial();
  },
};
</script>
<style lang="scss" scoped>
</style>