<!--
 * @Author: maxq
 * @Date: 2020-07-15 09:59:41
 * @LastEditTime: 2020-07-15 10:06:46
 * @LastEditors: Please set LastEditors
 * @Description: 房屋坐落变更-待办箱已办箱盒子
 * @FilePath: \frontend\house-mnt\src\views\houseManagement\changeOfHouseLocation\HouseLocationChange.vue
--> 
<template>
  <div id="house-location-change" class="page-detail">
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
            import("@/views/houseManagement/changeOfHouseLocation/HouseLocationTodo.vue")
        },
        {
          id: "id_2",
          label: "已办箱",
          closable: false,
          lazy: true,
          component: () =>
            import("@/views/houseManagement/changeOfHouseLocation/HouseLocationDone.vue")
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
#house-location-change {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
