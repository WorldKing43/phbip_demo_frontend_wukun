<!--
 * @Description: 房源入库首页
 * @Version: 2.0
 * @Autor: zhaoyy1
 * @Date: 2019-09-17 17:47:16
 * @LastEditors  : wangyue
 * @LastEditTime : 2020-01-16 16:25:08
 -->
<template>
  <div class="warehousingapplication  page-detail">
    <div class="content">
      <dist-tabs2 ref="tabsCtrl" :tabs="tabs" :params="params"></dist-tabs2>
    </div>
  </div>
</template>
<script>
import DistTabs2 from "@/components/DistTabs2.vue";
export default {
  name: "warehousingapplication",
  components: {
    DistTabs2
  },
  data() {
    return {
      params: {},
      tabs: [
        {
          id: "ApplyToDoBox",
          label: "待办箱",
          closable: false,
          active: true,
          lazy: false,
          component: () =>
            import("@/views/houseResource/houseApply/component/ApplyToDoBox")
        },
        {
          id: "ApplyDoneBox",
          label: "已办箱",
          closable: false,
          lazy: true,
          component: () =>
            import("@/views/houseResource/houseApply/component/ApplyDoneBox")
        }
      ]
    };
  },
  mounted() {
    this.$refs.tabsCtrl.openTab(this.tabs[0]);
  }
};
</script> 
<style lang="scss">
#ProcessReviewPage {
  overflow: auto;
}
</style>
