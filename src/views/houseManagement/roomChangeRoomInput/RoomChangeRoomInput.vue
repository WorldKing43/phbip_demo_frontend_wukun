<!--
 * @Author: jyb
 * @Date: 2019-10-6
 * @LastEditors: jyb
 * @Description: 房改房录入待办已办
 -->
<template>
  <div id="RoomChangeRoomInput" class="page-detail">
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
            import(
              "@/views/houseManagement/roomChangeRoomInput/RoomChangeRoomInputTodoBox"
            )
        },
        {
          id: "id_2",
          label: "已办箱",
          closable: false,
          lazy: true,
          component: () =>
            import(
              "@/views/houseManagement/roomChangeRoomInput/RoomChangeRoomInputDoneBox"
            )
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
#RoomChangeRoomInput {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
