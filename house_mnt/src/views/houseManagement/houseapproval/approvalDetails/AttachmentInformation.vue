<!--过程材料-->
<template>
  <div>
    <Material :parameter="parameter" :show="show"></Material>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Material from "@/components/CorrelativeMaterial";
import publicMethod from "@/api/publicMethod";
export default {
  name: "material",
  components: {
    Material //过程材料公共组件
  },
  data() {
    return {
      parameter: "",
      show: false //按钮不显示
    };
  },
  methods: {
    //获取过程材料
    getMaterial() {
      let params = {
        guid: this.$parent.params.districtGuid,
        material: true,
        report: false
      };
      publicMethod
        .getMaterial(params)
        .then(res => {
          if (!res.id) {
            this.createMis();
          } else {
            this.parameter = this.$parent.params.districtGuid;
            this.Event.$emit("CorrelativeMaterial", "getMaterial");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }, //创建过程材料
    createMis() {
      let businessName = "房源信息录入材料";
      let params = {
        businessName: businessName,
        guid: this.$route.params.guid
      };
      publicMethod
        .createMis(params)
        .then(res => {
          console.log(res);
          if (res) {
            this.parameter = this.$parent.params.districtGuid;
            this.Event.$emit("CorrelativeMaterial", "getMaterial");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {},
  created() {
    this.parameter = this.$parent.params.districtGuid;
    this.getMaterial();
  }
};
</script>
