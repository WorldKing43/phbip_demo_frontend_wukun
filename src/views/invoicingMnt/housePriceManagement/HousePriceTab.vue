<!--
 * @Author: maxq
 * @Date: 2020-07-13 11:28:32
 * @LastEditTime: 2020-07-13 17:26:12
 * @LastEditors: Please set LastEditors
 * @Description: 房屋价格管理-tab页
 * @FilePath: \frontend\house-mnt\src\views\invoicingMnt\housePriceManagement\HousePriceTab.vue
--> 
<template>
  <div id="house-price-tab">
    <!-- 基本信息 -->
    <div>
      <dist-side-tab :menu="menu" :params="params"></dist-side-tab>
    </div>
  </div>
</template>
<script>
  import DistSideTab from "@/components/DistSideTab";
  export default {
    name: "housePriceTab",
    components: {
      DistSideTab
    },
    data() {
      return {
        //页签参数
        params: {
          houseGuid: ""
        },
        menu: {
          children: [
            {
              id: "1",
              label: "房屋价格信息",
              closable: true,
              active: true,
              component: () =>
                import(
                  "@/views/invoicingMnt/housePriceManagement/HousePriceDetail.vue"
                )
            }
          ]
        },
        params: {}
      };
    },
    created() {
      console.log(this.$route)
      if (this.$route.params.guid) {
        this.params.houseGuid = this.$route.params.guid; //保存房屋标识
      }
    },
  }
</script>
