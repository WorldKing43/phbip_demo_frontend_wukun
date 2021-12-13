<!--
 * @Author: 
 * @Date: 2020-06-12
 * @LastEditors: maxq
 * @Description: 产权单位管理待办已办
 -->
<template>
  <div id="property-right-mnt" class="page-detail">
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
            import("@/views/houseManagement/propertyRightUnitMnt/PropertyRightTodo")
        },
        {
          id: "id_2",
          label: "已办箱",
          closable: false,
          lazy: true,
          component: () =>
            import("@/views/houseManagement/propertyRightUnitMnt/ProperyRightDone")
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
#property-right-mnt {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
