<!--
 * @Author: 
 * @Date: 2019-12-03 
 * @LastEditors: 金雅蓓
 * @Description: 优化代码
 * @model:计划制定代码代办已办tab页
 -->
<template>
  <div id="planManagement" class="page-detail">
    <div class="content">
      <dist-tabs2 ref="tabsCtrl" :tabs="tabs" :params="params"></dist-tabs2>
    </div>
  </div>
</template>
<script>
import DistTabs2 from "@/components/DistTabs2.vue";
export default {
  components: {
    DistTabs2
  },
  data() {
    return {
      params: {},
      tabs: [
        {
          id: "id_1",
          label: "待办箱",
          closable: false,
          active: true,
          lazy: false,
          component: () =>
            import("@/views/housePlan/planManagement/planstate/AllPlan")
        },
        {
          id: "id_2",
          label: "已办箱",
          closable: false,
          lazy: true,
          component: () =>
            import("@/views/housePlan/planManagement/planstate/EditPlan")
        }
      ]
    };
  },
  mounted() {
    this.$refs.tabsCtrl.openTab(this.tabs[0]);
  }
};
</script>

<style lang="scss" scoped>
#planManagement {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
