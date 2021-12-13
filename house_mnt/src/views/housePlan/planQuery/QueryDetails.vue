<!-- 
 * @Author: 
 * @Date: 2019-12-03 
 * @LastEditors: 金雅蓓
 * @Description: 优化代码
 * @model:计划查询Tab
-->
<template>
  <div class="queryDetails page-detail">
    <div class="content">
      <dist-side-tab :menu="menu" :params="params"></dist-side-tab>
    </div>
  </div>
</template>

<script>
import DistSideTab from "@/components/DistSideTab";
import { mapGetters } from "vuex";
export default {
  components: {
    DistSideTab
  },
  data() {
    return {
      toview: false,
      returnBtnShow: false, //退回上一环节
      isEdit: true, //是否为编制状态
      //页签参数 mxq
      params: {
        planGuid: ""
      },
      menu: {
        children: [
          {
            id: "1",
            label: "计划信息",
            closable: true,
            active: true,
            component: () => import("@/views/housePlan/planQuery/PlanningInfo")
          },
          {
            id: "2",
            label: "过程材料",
            closable: true,
            component: () =>
              import("@/views/housePlan/planQuery/ProcessMaterials")
          }
        ]
      }
    };
  },
  methods: {},
  //来到这个组件的时候
  created() {
    this.planGuid = this.$route.params.guid;
  }
};
</script>

<style  lang="scss">
</style>
