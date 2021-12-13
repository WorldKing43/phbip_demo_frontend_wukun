<template>
  <div>
    <div>
      <!--基本信息-->
      <div>
        <div class="content">
          <!--头部-->
          <div class="buttonGroup">
            <el-button type="primary" size="mini" @click="getBack"
              >返回</el-button
            >
          </div>
          <div>
            <dist-side-tab :menu="menu" :params="params"></dist-side-tab>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DistSideTab from "@/components/DistSideTab";
import { mapGetters } from "vuex";

export default {
  name: "newplan",
  components: {
    DistSideTab,
  },

  data() {
    return {
      isShow: true,
      titleName: "",
      editableTabsValue: "1",
      isShowRights: false, //使用权变更
      outStoreShowFlag: false, //核销
      reserveShowFlag: false, //预留
      removeReserveShowFlag: false, //解除预留
      problemHouseFlag: false, //问题房源
      buildingInfoMaintainBelongFlag: false, //栋归属
      params: {
        guid: "",
      },
      menu: {
        children: [
          {
            id: "1",
            label: "小区信息",
            closable: true,
            active: true,
            component: () =>
              import(
                "@/views/houseManagement/houseSearch/DistrictInfo"
              ),
          },
        //   {
        //     id: "2",
        //     label: "宗地信息",
        //     closable: true,
        //     component: () =>
        //       import("@/views/houseManagement/housetransfer/GroundInformation"),
        //   },
          {
            id: "3",
            label: "栋信息",
            closable: true,
            component: () =>
              import("@/views/houseManagement/houseSearch/BuildList"),
          },
          {
            id: "4",
            label: "房屋信息",
            closable: true,
            component: () =>
              import("@/views/houseManagement/houseSearch/houseList"),
          },
        //   {
        //     id: "5",
        //     label: "配套设施信息",
        //     closable: true,
        //     component: () =>
        //       import(
        //         "@/views/houseManagement/housetransfer/SupportingInformation"
        //       ),
        //   },
        //   {
        //     id: "6",
        //     label: "过程材料",
        //     closable: true,
        //     component: () =>
        //       import(
        //         "@/views/houseManagement/housetransfer/housetransferMaterials"
        //       ),
        //   },
        ],
      },
    };
  },
  methods: {
    //返回
    getBack() {
      let tab = {
        label: "房屋库查询",
        name: "HouseDistrictSearch",
      };
      this.openTopTab(tab);
    },
    //出库
    outStoreShow() {
      this.outStoreShowFlag = true;
    },
    //预留
    reserveShow() {
      this.reserveShowFlag = true;
    },
    // 解除预留
    removeReserveShow() {
      this.removeReserveShowFlag = true;
    },
    //问题房源
    problemHouse() {
      this.problemHouseFlag = true;
    },
    //栋归属
    buildingInfoMaintainBelongShow() {
      this.buildingInfoMaintainBelongFlag = true;
    },
    handleRights() {
      this.isShowRights = true;
    },
    //关闭弹框
    closeDialog() {
      this.isShowRights = false;
      this.outStoreShowFlag = false; //出库
      this.reserveShowFlag = false; //预留
      this.removeReserveShowFlag = false; //解除预留
      this.problemHouseFlag = false; //问题房源
      this.buildingInfoMaintainBelongFlag = false; //问题房源
    },
  },
};
</script>

<style  lang="scss"  scoped>
.content /deep/ .el-tabs__item {
  /*设置梯形*/
  position: relative;
  display: inline-block;
  color: #909399;
  padding: 5px 40px 5px 20px;
  z-index: 1;
  border-bottom: 1px solid #fff;
  border-left: 1px solid #ccc;
  border-right: none;
}
.content /deep/ .el-tabs__item::before {
  /*设置梯形*/
  content: ""; /*用伪元素来生成一个矩形*/
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  border-right: 1px solid #ccc;
  transform: scaleY(1.3) perspective(0.5em) rotateX(3deg);
  transform-origin: bottom left;
  border-top: 3px solid #2386f2;
  background: #fff;
}
.dialog-box {
  /deep/ .el-dialog {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    background: #fff;
    height: calc(100% - 100px);
    margin: 50px auto !important;
  }
  /deep/ .el-dialog__header {
    padding: 10px 20px 10px 20px;
    background: #0b7ef7;
  }
  /deep/ .el-dialog__headerbtn {
    top: 15px;
  }
  /deep/ .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  /deep/ .el-dialog__title {
    color: #fff;
  }
  /deep/ .el-dialog__body {
    padding: 20px;
    height: calc(100% - 100px);
    overflow: auto;
  }
}
</style>
