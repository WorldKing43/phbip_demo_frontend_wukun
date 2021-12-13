<!--
 * @Description:计价系数管理-页签详情页
 * @Version: 1.0
 * @Autor: maxq
 * @Date: 2019-11-22 10:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 
-->
<template>
  <div id="coeffcient-tab">
    <!--头部-->
    <div class="buttonGroup">
      <el-button type="primary" size="small">查看日志</el-button>
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
            label: "朝向系数",
            closable: true,
            active: true,
            component: () =>
              import(
                "@/views/invoicingMnt/priceCoefficientManagement/TowardTheCoefficient.vue"
              )
          },
          {
            id: "2",
            label: "楼层系数",
            closable: true,
            component: () =>
              import(
                "@/views/invoicingMnt/priceCoefficientManagement/CoefficientOfFloor.vue"
              )
          },
          {
            id: "3",
            label: "附件",
            closable: true,
            component: () =>
              import(
                "@/views/invoicingMnt/priceCoefficientManagement/PriceAttachment.vue"
              )
          }
        ]
      },
      params: {}
    };
  },
  created() {
    this.params.districtGuid = this.$route.params.guid; //页签参数存储小区标识
  }
};
</script>
<style lang="scss" scoped>
</style>
