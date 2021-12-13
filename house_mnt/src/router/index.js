import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
    children: [
      // 房源入库
      {
        path: "housinginformation",
        name: "housinginformation",
        component: () => import("@/views/houseResource/houseInput/Housinginformation"),
      },
      // 房源信息录入
      {
        path: "houseInputTab/:code/:guid/:edit",
        name: "houseInputTab",
        component: () => import("@/views/houseResource/houseInput/HouseInputTab"),
      },
      // 房源入库申请
      {
        path: "warehousingApplication",
        name: "warehousingApplication",
        component: () => import("@/views/houseResource/houseApply/WarehousingApplication"),
      },
      {
        path: "houseApplyTab/:code/:guid/:edit/:reportDistrictGuid",
        name: "houseApplyTab",
        component: () => import("@/views/houseResource/houseApply/HouseApplyTab"),
      },
      //==============================以上为集成部分=========================================
      //房改房录入
      {
        name: 'roomChangeRoomInput',
        path: 'roomChangeRoomInput',
        component: () => import('@/views/houseManagement/roomChangeRoomInput/RoomChangeRoomInput'),
      },
      { //房改房录入详情页面
        path: 'roomChangeRoomInputDetail',
        name: 'roomChangeRoomInputDetail',
        component: () => import('@/views/houseManagement/roomChangeRoomInput/RoomChangeRoomInputDetail')
      },
      { //房源管理--入库审批
        name: 'approvalChange',
        path: 'approvalChange',
        component: () => import('@/views/houseManagement/houseapproval/ApprovalChange'),
      },
      { //房源审批双击-tab
        path: 'approvalDetailsTab/:guid/:state',
        name: 'approvalDetailsTab',
        component: () => import('@/views/houseManagement/houseapproval/approvalDetails/ApprovalDetailsTab'),
      },
      { //房源信息勘误
        path: 'correcthouseInfo',
        name: 'correcthouseInfo',
        component: () => import('@/views/houseManagement/correcthouseinfo/tab/correcthouseInfo'),
      },
      { //房源信息勘误-tab
        path: "correctHouseInfoTab/:guid/:taskId/:state",
        name: "correctHouseInfoTab",
        component: () => import("@/views/houseManagement/correcthouseinfo/tab/correctHouseInfoTab"),
      },
      { //产权单位管理
        path: 'propertyRightMnt',
        name: 'propertyRightMnt',
        component: () => import('@/views/houseManagement/propertyRightUnitMnt/PropertyRightMnt')
      },
      { //产权单位管理详情
        path: 'propertyRightMntTab/:state',
        name: 'propertyRightMntTab',
        component: () => import('@/views/houseManagement/propertyRightUnitMnt/tab/PropertyRightMntTab')
      },
      { //房屋维修管理
        path: 'maintenanceMnt',
        name: 'maintenanceMnt',
        component: () => import('@/views/houseManagement/houseMaintenanceMnt/MaintenanceMnt.vue')
      },
      { //房屋维修详情
        path: 'maintenanceHouseInfo/:guid/:state',
        name: 'maintenanceHouseInfo',
        component: () => import('@/views/houseManagement/houseMaintenanceMnt/MaintenanceHouseInfo.vue')
      },
      { //房屋（房源库）
        path: 'housetransfer',
        name: 'housetransfer',
        component: () => import('@/views/houseManagement/housetransfer/HouseTransfer'),
      },
      { //房屋库查询
        path: 'HouseDistrictSearch',
        name: 'HouseDistrictSearch',
        component: () => import('@/views/houseManagement/houseSearch/HouseDistrictSearch.vue')
      },
      { //房源房屋库-tab
        path: 'houseSearchInfo/:guid/:code',
        name: 'houseSearchInfo',
        component: () => import('@/views/houseManagement/houseSearch/houseSearchInfo' ),
      },
      { //房源房屋库-tab
        path: 'housinginfo/:guid/:code',
        name: 'housinginfo',
        component: () => import('@/views/houseManagement/housetransfer/HousingInfo'),
      },
      { //房源性质变更
        path: 'naturechange',
        name: 'naturechange',
        component: () => import('@/views/houseManagement/naturechange/components/natureChange')
      },
      { //房源性质变更详情
        path: "natureChangeTab/:guid/:taskId",
        name: "natureChangeTab",
        component: () => import("@/views/houseManagement/naturechange/components/natureChangeTab"),
      },
      { //房源产权变更
        path: 'propertyRightChange',
        name: 'propertyRightChange',
        component: () => import('@/views/houseManagement/propertyRightChange/propertyRightChange')
      },
      { //房源产权变更详情
        path: "propertyRightChangeTab/:guid/:taskId",
        name: "propertyRightChangeTab",
        component: () => import("@/views/houseManagement/propertyRightChange/components/propertyRightChangeTab"),
      },
      {//房屋坐落变更
        path: 'houseLocationChange',
        name: 'HouseLocationChange',
        component: () => import('@/views/houseManagement/changeOfHouseLocation/HouseLocationChange.vue')
      },
      {//房屋坐落变更详情
        path: 'houseLocationDetail/:guid/:state',
        name: 'HouseLocationDetail',
        component: () => import('@/views/houseManagement/changeOfHouseLocation/HouseLocationDetail.vue')
      },
      { //查封冻结
        path: 'seizureFreeze',
        name: 'seizureFreeze',
        component: () => import('@/views/houseManagement/seizureFreeze/seizureFreeze')
      },
      { //查封冻结新增页面
        path: 'newSeizureFreeze/:state/:houseGuid/:guid',
        name: 'newSeizureFreeze',
        component: () => import('@/views/houseManagement/seizureFreeze/newSeizureFreeze')
      },
      { //查封冻结详情
        path: 'seizureFreezeDetail/:houseGuid',
        name: 'seizureFreezeDetail',
        component: () => import('@/views/houseManagement/seizureFreeze/seizureFreezeDetail')
      },
      { //房屋综合查询
        path: 'inquireHouse',
        name: 'inquireHouse',
        component: () => import('@/views/houseManagement/inquire/inquireHouse'),
      },
      {//房屋综合查询(市局)
        path: 'cityBureauInquire',
        name: 'cityBureauInquire',
        component: () => import('@/views/houseManagement/cityBureauInquire/CityBureauInquire.vue')
      },
      {//房屋综合查询(第三方运营)
        path: 'thirdPartyOperation',
        name: 'thirdPartyOperation',
        component: () => import('@/views/houseManagement/thirdPartyOperation/ThirdPartyOperation.vue')
      },
      { //真空房查询
        path: 'vacuumRoominquire',
        name: 'vacuumRoominquire',
        component: () => import('@/views/houseManagement/vacuumRoominquire/vacuumRoominquire'),
      },
      { //真空房查询详情
        path: 'vacuumRoomDetail/:houseGuid',
        name: 'vacuumRoomDetail',
        component: () => import('@/views/houseManagement/vacuumRoominquire/vacuumRoomDetail'),
      },
      { //市房屋综合查询
        path: 'cityWideInquireHouse',
        name: 'cityWideInquireHouse',
        component: () => import('@/views/houseManagement/cityWideInquireHouse/cityWideInquireHouse'),
      },
      { //局建房查询
        path: 'officeHouseInquire',
        name: 'officeHouseInquire',
        component: () => import('@/views/houseManagement/officeBuildingInquire/OfficeHouseInquire')
      },
      ,
      { //企业自有住房查询
        path: 'enterpriseRecordHouse',
        name: 'enterpriseRecordHouse',
        component: () => import("@/views/houseManagement/enterpriseRecordHouse/enterpriseRecordHouse"),
      },
      { //真空房查询详情
        path: 'enterpriseRecordHouseDetail/:houseGuid',
        name: 'enterpriseRecordHouseDetail',
        component: () => import('@/views/houseManagement/enterpriseRecordHouse/enterpriseRecordHouseDetail'),
      },
      {//局建房查询-tab
        path: 'officeBuildingHouseTab/:guid',
        name: 'officeBuildingHouseTab',
        component: () => import('@/views/houseManagement/officeBuildingInquire/OfficeBuildingHouseTab')
      },
      { //房源计划-计划制定
        path: 'planmanagement',
        name: 'planmanagement',
        component: () => import('@/views/housePlan/planManagement/PlanManagement'),
      },
      { //房源计划-tab
        path: 'newplan/:guid/:pid/:state',
        name: 'newplan',
        component: () => import('@/views/housePlan/planManagement/components/housePlanTab'),
      },
      { //已下达计划
        path: 'assignedPlan',
        name: 'assignedPlan',
        component: () => import('@/views/housePlan/planManagement/assigned/AssignedPlan')
      },
      { //计划查询
        path: 'planquery',
        name: 'planquery',
        component: () => import('@/views/housePlan/planQuery/PlanQuery'),
      },
      { //计划查询双击进入详细信息
        path: 'queryDetails/:guid/:pid',
        name: 'queryDetails',
        component: () => import('@/views/housePlan/planQuery/QueryDetails'),
      },
      //房源计划-定向单位房源退回-首页
      {
        name: 'houseReturn',
        path: 'houseReturn',
        component: () => import('@/views/housePlan/unitRentHouseReturn/HouseReturn')
      },

      //**********计价管理 *************/
      { // 基准价管理
        path: "basePricing",
        name: "basePricing",
        component: () => import("@/views/invoicingMnt/basePriceManagement/BasePricing.vue"),
      },
      { //基准价管理-页签详情页
        path: 'basePricingTab/:guid',
        name: 'basePricingTab',
        component: () => import("@/views/invoicingMnt/basePriceManagement/BasePricingTab.vue")
      },
      { // 计价系数管理
        path: "pricingCoeffcient",
        name: "pricingCoeffcient",
        component: () => import("@/views/invoicingMnt/priceCoefficientManagement/PricingCoeffcient.vue"),
      },
      { //计价系数管理-页签详情页
        path: 'coeffcientTab/:guid',
        name: 'coeffcientTab',
        component: () => import("@/views/invoicingMnt/priceCoefficientManagement/CoeffcientTab.vue")
      },
      { // 计价公式管理
        path: "pricingFormula",
        name: "pricingFormula",
        component: () => import("@/views/invoicingMnt/priceFormulaManagement/PricingFormula.vue"),
      },
      { //计价公式管理-页签详情页
        path: 'pricingFormulaTab/:guid',
        name: 'pricingFormulaTab',
        component: () => import("@/views/invoicingMnt/priceFormulaManagement/PricingFormulaTab.vue")
      },
      { // 业务计价模型
        path: "bussinessModel",
        name: "bussinessModel",
        component: () => import("@/views/invoicingMnt/bussinessPricingModel/BussinessModel.vue"),
      },
      { //业务计价模型-页签详情页
        path: 'bussModelTab/:guid/:state',
        name: 'bussModelTab',
        component: () => import("@/views/invoicingMnt/bussinessPricingModel/BussModelTab.vue")
      },
      { //房屋价格管理
        path: 'housePrice',
        name: 'housePrice',
        component: () => import('@/views/invoicingMnt/housePriceManagement/HousePrice.vue')
      },
      {//房屋价格管理-页签详情页
        path: 'housePriceTab/:guid',
        name: 'housePriceTab',
        component: () => import('@/views/invoicingMnt/housePriceManagement/HousePriceTab.vue')

      },{
        path: 'MapInfoFrame',
        name: 'MapInfo',
        component: () => import('@/components/MapInfo')
      },

      /**拆迁返还 */
      { // 基准价管理
        path: "demolitionReturn",
        name: "demolitionReturn",
        component: () => import("@/views/demolitionReturnMnt/demolitionReturn.vue"),
      },
      { //查封冻结详情
        path: 'demolitionReturnDetail/:guid',
        name: 'demolitionReturnDetail',
        component: () => import('@/views/demolitionReturnMnt/demolitionReturnDetail.vue')
      },
    ]
  }]
})
