<!--
 * @Description: 房源入库tab页
 * @Version: 1.0
 * @Autor: zhaoyy1
 * @Date: 2019-09-26 19:06:41
 * @LastEditors: wangyue
 * @LastEditTime: 2020-03-25 14:45:35
 -->

<template>
  <div class="HouseApplyTab">
    <div class="content">
      <dist-side-tab :menu="menu" :params="params"></dist-side-tab>
    </div>
  </div>
</template>

<script>
import DistSideTab from "@/components/DistSideTab";
export default {
  name: "houseApplyTab",
  components: {
    DistSideTab
  },
  data() {
    return {
      storeName: "houseApplyTab",
      params: {
        projectGuid: this.$route.params.guid,
        type: this.$route.params.type,
        edit: this.$route.params.edit
      },
      menu: {
        children: [
          {
            id: "newWarehousing",
            label: "批次管理",
            closable: true,
            component: () =>
              import("@/views/houseResource/houseApply/NewWarehousing")
          },
          {
            id: "preHousing",
            label: "房源",
            closable: true,
            component: () =>
              import("@/views/houseResource/houseApply/PreHousing")
          },
          {
            id: "housingDevice",
            label: "配套设施",
            closable: true,
            component: () =>
              import("@/views/houseResource/houseApply/HousingDevice")
          },
          {
            id: "files",
            label: "过程材料",
            closable: true,
            component: () => import("@/views/houseResource/houseApply/Files")
          },
        ]
      }
    };
  }
};
</script>