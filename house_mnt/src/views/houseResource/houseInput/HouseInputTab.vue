<!--
 * @Description: 房源录入tab
 * @Version: 2.0
 * @Autor: wangyue
 * @Date: 2019-11-29 19:05:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-23 09:48:28
 -->
<template>
  <div class="HouseInputTab">
    <div class="content">
      <dist-side-tab :menu="menu" :params="params"></dist-side-tab>
    </div>
  </div>
</template>

<script>
import DistSideTab from "@/components/DistSideTab";
export default {
  name: "houseInputTab",
  components: {
    DistSideTab
  },
  data() {
    return {
      storeName: "houseInputTab",
      params: {
        projectGuid: this.$route.params.guid,
        type: this.$route.params.type,
        source: this.$route.query ? this.$route.query.source : null,
        edit: this.$route.params.edit,
        itemName: ""
      },
      menu: {
        children: [
          {
            id: "houseInfomationEdit",
            label: "小区信息",
            closable: true,
            component: () =>
              import("@/views/houseResource/houseInput/CommunityInfo")
          },
          {
            id: "landInfomation",
            label: "宗地信息",
            closable: true,
            component: () =>
              import("@/views/houseResource/houseInput/LandInfomation")
          },
          {
            id: "tungMessage",
            label: "栋信息",
            closable: true,
            component: () =>
              import("@/views/houseResource/houseInput/TungMessage")
          },
          {
            id: "housingMessage",
            label: "房源信息",
            closable: true,
            component: () =>
              import("@/views/houseResource/houseInput/HousingMessage")
          },
          {
            id: "peiTaosheShi",
            label: "配套设施信息",
            closable: true,
            component: () =>
              import("@/views/houseResource/houseInput/PeiTaosheShi")
          }
        ]
      }
    };
  },
  created() {
    console.log(this.$route.query.source)
    if (this.$route.query.source) {
      this.params.itemName = this.$route.query.source;
    }
  }
};
</script>
