<template>
  <div>
    <Material :parameter="parameter"></Material>
  </div>
</template>

<script>
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
    this.parameter = this.$parent.params.PID1;
  },
  mounted() {
    this.parameter = this.$parent.params.PID1;
  }
};
</script>

<style lang="scss" scoped>
</style>