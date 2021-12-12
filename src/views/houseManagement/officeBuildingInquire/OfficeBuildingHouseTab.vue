<!--
 * @Description: 局建房查询
 * @Author: maxq
 * @Date: 2020-04-07 15:17
 * @LastEditors  :
 * @LastEditTime :
 -->
<template>
  <div id="office-building-house-tab">
    <div  class="buttonGroup">
      <el-button type="primary" size="mini" @click="goback()">返回</el-button>
    </div>
    <div class="content">
      <dist-side-tab :menu="menu" :params="params"></dist-side-tab>
    </div>
  </div>
</template>
<script>
import DistSideTab from "@/components/DistSideTab";
export default {
  name: 'officeBuildingHouseTab',
  components: {
    DistSideTab,
  },
   data() {
    return {
      //页签参数
      params: {
        houseGuid: "", //房屋标识
        districtName: "", //小区名称
        buildName: "", //栋名称
        houseNo: "" //房号
      },
      menu: {
        children: [
          {
            id: "1",
            label: "基本信息",
            closable: true,
            active: true,
            component: () =>import("@/views/houseManagement//officeBuildingInquire/OfficeRoomDetail.vue")
          },
          // {
          //   id: "2",
          //   label: "售房查询",
          //   closable: true,
          //   component: () =>import("@/views/houseManagement//officeBuildingInquire/HouseSellingQuery.vue")
          // },
        ]
      },
    
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  },
  created() {
    if(this.$route.params.guid) {
      this.params.houseGuid = this.$route.params.guid
      this.params.districtName = this.$route.query.districtName
      this.params.buildName = this.$route.query.buildName
      this.params.houseNo = this.$route.query.houseNo
    }
  }
}
</script>