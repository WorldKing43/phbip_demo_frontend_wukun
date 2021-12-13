<!--
 * @Author: 
 * @Date: 2019-10-6
 * @LastEditors: maxq
 * @Description: 性质变更代办已办
 -->
<template>
  <div id="NatureChange" class="page-detail">
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
            import("@/views/houseManagement/naturechange/NatureChangeTodoBox")
        },
        {
          id: "id_2",
          label: "已办箱",
          closable: false,
          lazy: true,
          component: () =>
            import("@/views/houseManagement/naturechange/NatureChangeDoneBox")
        }
      ]
    };
  },
  created() {
    console.log("加载进入");
  },
  mounted() {
    this.$refs.tabsCtrl.openTab(this.tabs[0]);
  }
};
</script>

<style lang="scss" scoped>
#NatureChange {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
