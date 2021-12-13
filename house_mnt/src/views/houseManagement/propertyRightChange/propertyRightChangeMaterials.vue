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
  mounted() {
    this.parameter = this.$parent.params.PID;
  },
  created() {
    this.parameter = this.$parent.params.PID;
  }
};
</script>

<style lang="scss" scoped>
</style>