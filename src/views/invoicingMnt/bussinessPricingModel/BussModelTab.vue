<!--
 * @Description:计价公式管理-页签详情页
 * @Version: 1.0
 * @Autor: maxq
 * @Date: 2019-12-17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 
-->
<template>
  <div id="buss-model-Tab">
    <!-- 基本信息 -->
    <div>
      <dist-side-tab :menu="menu" :params="params"></dist-side-tab>
    </div>
  </div>
</template>
<script>
  import DistSideTab from "@/components/DistSideTab";
  export default {
    name: "bussModelTab",
    components: {
      DistSideTab
    },
    data() {
      return {
        //页签参数
        params: {
          modelGuid: ""
        },
        menu: {
          children: [
            {
              id: "1",
              label: "计价模型信息",
              closable: true,
              active: true,
              component: () =>
                import(
                  "@/views/invoicingMnt/bussinessPricingModel/BussModelInfo.vue"
                )
            }
          ]
        },
        params: {}
      };
    },
    created() {
      if (this.$route.params.guid != "new") {
        this.params.modelGuid = this.$route.params.guid; //保存计价模型guid
      }
    },
  }
</script>
<style lang="scss" scoped>
#buss-model-tab {
  .top {
    margin-bottom: 15px;
  }
}
</style>