<!--房源勘误-->
<template>
  <div id="correcthouseInfo" class="page-detail">
    <div class="content">
      <dist-tabs2 ref="tabsCtrl" :tabs="tabs" :params="params"></dist-tabs2>
    </div>
  </div>
</template>
<script>
import DistTabs2 from "@/components/DistTabs2.vue";
export default {
  name: "correcthouseInfo",
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
            import("@/views/houseManagement/correcthouseinfo/CorrectTodoBox")
        },
        {
          id: "id_2",
          label: "已办箱",
          closable: false,
          lazy: true,
          component: () =>
            import("@/views/houseManagement/correcthouseinfo/CorrectDoneBox")
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
#correcthouseInfo {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
