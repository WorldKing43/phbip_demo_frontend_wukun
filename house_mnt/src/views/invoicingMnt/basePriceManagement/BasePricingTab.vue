<!--
 * @Description:基准价管理-页签详情页
 * @Version: 1.0
 * @Autor: maxq
 * @Date: 2019-11-20 20:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 
-->
<template>
  <div id="base-pricing-tab">
    <!--头部-->
    <div class="buttonGroup">
      <el-button type="primary" size="mini">查看日志</el-button>
    </div>
    <!-- 基本信息 -->
    <div>
      <dist-side-tab :menu="menu" :params="params"></dist-side-tab>
    </div>
  </div>
</template>
<script>
import DistSideTab from "@/components/DistSideTab";
export default {
  name: "basePricingTab",
  components: {
    DistSideTab
  },
  data() {
    return {
      //页签参数
      params: {
        districtGuid: "" //小区标识
      },
      menu: {
        children: [
          {
            id: "1",
            label: "基础价",
            closable: true,
            active: true,
            component: () =>
              import(
                "@/views/invoicingMnt/basePriceManagement/BasePricingDetails.vue"
              )
          },
          {
            id: "2",
            label: "附件",
            closable: true,
            component: () =>
              import(
                "@/views/invoicingMnt/basePriceManagement/BaseAttachment.vue"
              )
          }
        ]
      }
    };
  },
  created() {
    this.params.districtGuid = this.$route.params.guid;
  }
};
</script>
<style lang="scss" scoped>
</style>
