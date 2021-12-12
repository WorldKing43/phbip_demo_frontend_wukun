<!--
 * @Description:计价公式管理-页签详情页
 * @Version: 1.0
 * @Autor: maxq
 * @Date: 2019-11-22 10: 31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 
-->
<template>
  <div id="pricing-formula-Tab">
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
        formulaGuid: ""
      },
      menu: {
        children: [
          {
            id: "1",
            label: "公式信息",
            closable: true,
            active: true,
            component: () =>
              import(
                "@/views/invoicingMnt/priceFormulaManagement/FormulaInfo.vue"
              )
          }
        ]
      },
      params: {}
    };
  },
  created() {
    if (this.$route.params.guid != "new") {
      this.params.formulaGuid = this.$route.params.guid; //保存计价公式guid
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
</style>