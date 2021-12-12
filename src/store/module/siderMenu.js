/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-15 10:07:58
 * @LastEditTime: 2020-08-17 17:12:11
 * @LastEditors: Please set LastEditors
 */
let siderMenus = [{
    id: "00",
    title: '房源管理',
    childtitle: '房源管理',
    icon: '#icon-peizuguanli',
    children: [{
        index: '/roomChangeRoomInput',
        childtitle: "房改房录入"
      }, {
        index: "/housinginformation",
        childtitle: "房源信息录入",
      },
      {
        index: "/warehousingApplication",
        childtitle: "房源入库申请",
      },
      //===========以上为集成部分================
      {
        index: '/approvalChange',
        childtitle: '入库审批',
      },
      {
        index: '/correcthouseInfo',
        childtitle: '房源信息勘误',
      },
      {
        index: '/propertyRightMnt',
        childtitle: '产权单位管理'
      },
      {
        index: '/maintenanceMnt',
        childtitle: '房屋维修管理'
      },
      {
        index: '/naturechange',
        childtitle: '房源性质变更'
      },
      {
        index: '/propertyRightChange',
        childtitle: '房源产权变更'
      },
      {
        index: '/houseLocationChange',
        childtitle: '房屋坐落变更'
      },
      {
        index: '/seizureFreeze',
        childtitle: '查封冻结'
      },
      {
        index: '/housetransfer',
        childtitle: '房屋库',
      },
      {
        index: '/HouseDistrictSearch',
        childtitle: '房屋库查询',
      },
      {
        index: '/inquireHouse',
        childtitle: '房屋综合查询',
      },
      {
        index: '/cityBureauInquire',
        childtitle: '房屋综合查询(市局)',
      },
      {
        index: '/thirdPartyOperation',
        childtitle: '房屋综合查询(第三方运营)',
      },
      {
        index: '/vacuumRoominquire',
        childtitle: '可分配房源查询'
      },
      {
        index: '/cityWideInquireHouse',
        childtitle: '全市房屋综合查询',
      },
      {
        index: '/officeHouseInquire',
        childtitle: '市级管理住房查询'
      },{
        index: '/enterpriseRecordHouse',
        childtitle: '单位自有住房查询'
      }
    ]
  },
  {
    id: "02",
    title: '房源计划',
    icon: '#icon-fangyuanjihua',
    children: [{
        index: '/planmanagement',
        childtitle: '计划制定',
      },
      {
        index: '/assignedPlan',
        childtitle: '已下达计划',
      },
      {
        index: '/planquery',
        childtitle: '计划查询',
      },
      // {
      //   index: '/houseReturn',
      //   childtitle: '定向单位房源退回'
      // }
    ]
  },
  {
    id: "03",
    title: '计价管理',
    childtitle: '计价管理',
    icon: '#icon-peizuguanli',
    children: [{
        index: "/basePricing",
        childtitle: "基准价管理"
      },
      {
        index: "/pricingCoeffcient",
        childtitle: "计价系数管理"
      },
      {
        index: '/pricingFormula',
        childtitle: '计价公式管理',
      },
      {
        index: '/bussinessModel',
        childtitle: '业务计价模型',
      },
      {
        index: '/housePrice',
        childtitle: '房屋价格管理'
      }
    ]
  },
  {
    id: "04",
    title: '房源网格地图',
    index: '/MapInfoFrame',
    childtitle: '房源网格地图',
    icon: '#icon-peizuguanli',
    children:[],
  },
  {
    id: "05",
    title: '拆迁返还',
    index: '/demolitionReturn',
    childtitle: '拆迁返还',
    icon: '#icon-peizuguanli',
    children:[],
  }
]

// 当前一级菜单的路由
let CurrentLevel1Menu = ''
let allButtons = ''

const state = {
  siderMenus,
  CurrentLevel1Menu,
  allButtons
}
const getters = {
  getsiderMenus: state => {
    return state.siderMenus
  },
  getallButtons: state => {
    return state.allButtons
  },
  getCurrentLevel1Menu: (state) => {
    return state.CurrentLevel1Menu
  }
}
const mutations = {
  changeSiderMenu(state, data) {
    [...state.siderMenus] = data;
  },
  setsiderMenu(state, data) {
    state.siderMenus = data.myData;
  },
  setallButtons(state, data) {
    state.allButtons = data.myData;
  },
  setCurrentLevel1Menu(state, data) {
    state.CurrentLevel1Menu = data;
  }
}
export default {
  state,
  getters,
  mutations
}
