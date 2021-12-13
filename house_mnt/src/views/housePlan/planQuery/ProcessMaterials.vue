<!--
 * @Author: 
 * @Date: 2019-12-03 
 * @LastEditors: 金雅蓓
 * @Description: 编写
 * @model:计划制定过程材料
 -->
<template>
  <div>
    <Material :parameter="parameter"></Material>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Material from "@/components/CorrelativeMaterialFlowCorrect";
export default {
  components: {
    Material
  },
  data() {
    return {
      parameter: ""
    };
  },
  created() {
    this.parameter = this.$route.params.pid;
  }
};
</script>

<style lang="scss" scoped>
</style>