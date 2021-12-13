<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: zhaoyy1
 * @Date: 2019-09-10 17:33:13
 * @LastEditors: wangyue
 * @LastEditTime: 2020-03-09 17:53:59
 -->
<template>
  <div class="file">
    <CorrelativeMaterial :parameter="guid"></CorrelativeMaterial>
  </div>
</template>
<script>
import CorrelativeMaterial from "@/components/CorrelativeMaterial";
export default {
  name: "files",
  data() {
    return {
      guid: this.$route.params ? this.$route.params.reportDistrictGuid : ""
    };
  },
  components: {
    CorrelativeMaterial
  }
};
</script>
<style lang="scss" scoped>
</style>