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
