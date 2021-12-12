/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-15 10:07:58
 * @LastEditTime: 2019-10-15 11:46:10
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue';
import Vuex from 'vuex';
import siderMenu from './module/siderMenu'
import badgeData from './module/badgeData'
import {
  Level
} from 'chalk';


Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    siderMenu,
    badgeData
  },
  state: {
    openTab1: [], //1
    activeIndex1: '',
    openTab: [], //所有打开的路由
    activeIndex: '', //激活状态
    activeTab: '', //激活的 tab+
    openChildTab: [], //所有打开的子路由
  },
  getters: {
    openTab(state) {
      return state.openTab;
    },
    // 刷新列表
    getFreshTable(state) {
      return state.refreshTable
    },
  },
  mutations: {
    setGuid(state, data) {
      let flag = false;
      let _index = '';
      // console.log(state.openTab)
      for (let item of state.openTab) {
        if (item.route === data.activeIndex) {
          //若是菜单类型的一级tab，是没有item.data的
          if (!item.data) {
            return;
          }
          item.data.forEach((ele, index) => {
            //通过name来找相应的item，ele.guid不存在代表的是新增，存在代表是双击进来的。
            if (ele.name == data.guidData.name && ele.guid !== '') {
              flag = true;
              _index = index;
            }
          })
          if (!flag) {
            item.data.push(data.guidData)
          }
        }
      }
    },
    //通过传入的activeIndex去改变各个guid的值
    changeGuid(state, data) {
      let guidList = []
      for (let item of state.openTab) {
        if (item.route === data.activeIndex) {
          guidList = item.data;
          //  console.log('通过传入的activeIndex获取到的data数据：',guidList)
          break;
        }
      }
      if (guidList) {
        for (let ele of guidList) {
          //房源房屋库中-小区的guid
          if (ele.name == 'neighbourhood') {
            this.state.neighbourhoodGuid = ele.guid
            // console.log('更改后neighbourhoodGuid为',ele.guid)
          }
          // 房源房屋库中-栋的guid
          if (ele.name == 'building') {
            this.state.buildingGuid = ele.guid
            // console.log('更改后buildingGuid为',ele.guid)
          }
          // 房源房屋库中-房屋的guid
          if (ele.name == 'house') {
            this.state.houseGuid = ele.guid
            // console.log('更改后houseGuid为',ele.guid)
          }
          //制定计划中计划的guid
          if (ele.name == 'planGuid') {
            this.state.planGuid = ele.guid
            // console.log('更改后的planGuid=',this.state.planGuid)
          }
          //指定计划中待办已办状态
          if (ele.name == 'workState') {
            this.state.workState = ele.guid
            // console.log('更改后的workState=',this.state.workState)
          }
          //信息勘误-小区guid
          if (ele.name == 'villageGuidCorrect') {
            this.state.villageGuidCorrect = ele.guid
            // console.log('villageGuidCorrect=',this.state.villageGuidCorrect)
          }
          //信息勘误-栋guid
          if (ele.name == 'buildingGuidCorrect') {
            this.state.buildingGuidCorrect = ele.guid
            // console.log('buildingGuidCorrect=',this.state.buildingGuidCorrect)
          }
          //信息勘误-房屋guid
          if (ele.name == 'houseGuidCorrect') {
            this.state.houseGuidCorrect = ele.guid
            // console.log('houseGuidCorrect=',this.state.houseGuidCorrect)
          }
          //入库审批报批基本信息 -mxq-05.10:增
          if (ele.name == 'ApprovalInfoGuid') {
            this.state.ApprovalInfoGuid = ele.guid
            // console.log('更改后的ApprovalInfoGuid=', ele.Guid)
          }
          if (ele.name == 'ApprovalInfoCode') {
            this.state.ApprovalInfoCode = ele.guid
            // console.log('更改后的ApprovalInfoCode=', this.state.ApprovalInfoCode)
          }
          //入库审批-小区guid
          if (ele.name == 'communityInformation') {
            this.state.communityInformation = ele.guid
            // console.log('更改后的communityInformation=', this.state.communityInformation)
          }
          //入库审批-栋guid
          if (ele.name == "buildingInformation") {
            this.state.approvalBuildingGuid = ele.guid
            // console.log('更改后的approvalBuildingGuid=', this.state.approvalBuildingGuid)
          }
          //入库审批-房屋guid
          if (ele.name == "housingDetails") {
            this.state.housingGuid = ele.guid
            // console.log('更改后的housingGuid=', this.state.housingGuid)
          }
          //入库审批-配套设施guid
          if (ele.name == "facilityGuid") {
            this.state.facilityGuid = ele.guid
          }
          //房源计划-计划查询的guid
          if (ele.name == 'searchPlanGuid') {
            this.state.searchPlanGuid = ele.guid
            // console.log('更改后的searchPlanGuid=', this.state.searchPlanGuid)
          }
          //房源计划-定向单位房源退回
          if (ele.name == 'returnHouseGuid') {
            this.state.returnHouseGuid = ele.guid
          }
        }
      }
    },
    //传入activeIndex进来
    setChildActiveIndex(state, data) {
      for (let item of state.openTab) {
        if (item.route === data.activeIndex) {
          this.state.activeIndex1 = item.childActiveIndex;
        }
      }
    },
    //将activeIndex1的值也存入到openTab中
    setIndexToOpenTab(state, data) {
      for (let item of state.openTab) {
        if (item.route === data.activeIndex) {
          item.childActiveIndex = data.childActiveIndex;
        }
      }
    },
    //根据传入的activeIndex的值，返回相应的childTabs给到openTab1
    changeChildOpenTab(state, data) {
      data.openTab.forEach(item => {
        if (item.route == data.activeIndex) {
          this.state.openTab1 = item.childTabs;
        }
      })
    },
    //添加tabs1
    add_tabs1(state, data) {
      this.state.openTab1.push(data);
    },
    //添加tabs+
    add_tabs(state, data) {
      data.label = data.label || data.name;
      data.path = data.path || data.route;
      let itab = null,
        key1 = data.path,
        key2 = encodeURI(key1),
        key3 = decodeURI(key1);
      for (let item of state.openTab) {
        if (item.path == key1 || item.path == key2 || item.path == key3) {
          itab = item;
          break;
        }
      }
      if (!itab) {
        state.openTab.push(data);
      }
    },
    //移除tabs+
    remove_tab(state, tab) {
      let key = tab;
      if (typeof tab === 'object') key = tab.path || tab.route;
      let itab = null,
        key1 = key,
        key2 = encodeURI(key1),
        key3 = decodeURI(key1);
      for (let item of state.openTab) {
        if (item.path == key1 || item.path == key2 || item.path == key3) {
          itab = item;
          break;
        }
      }
      let idx = state.openTab.indexOf(itab);
      if (idx != -1) state.openTab.splice(idx, 1);
    },
    //删除tabs
    delete_tabs(state, route) {
      let key = route;
      if (typeof route === 'object') key = route.path || route.route;
      let itab = null,
        key1 = key,
        key2 = encodeURI(key1),
        key3 = decodeURI(key1);
      for (let item of state.openTab) {
        if (item.path == key1 || item.path == key2 || item.path == key3) {
          itab = item;
          break;
        }
      }
      let idx = state.openTab.indexOf(itab);
      if (idx != -1) {
        state.openTab.splice(idx, 1);
      }
    },
    //设置活动的tab+
    set_active_tab(state, tab) {
      let key = tab;
      if (typeof tab === 'object') key = tab.path || tab.route;
      let itab = null,
        key1 = key,
        key2 = encodeURI(key1),
        key3 = decodeURI(key1);
      for (let item of state.openTab) {
        if (item.path == key1 || item.path == key2 || item.path == key3) {
          itab = item;
          break;
        }
      }
      let idx = state.openTab.indexOf(itab);
      let activeTab = state.activeTab || {};
      if (idx != -1 && activeTab.path != itab.path) {
        state.activeTab = itab;
        state.activeIndex = itab.path;
        if (state.activeTab.children && state.activeTab.children.length > 0) {
          state.childOpenTabs = state.activeTab.children;
        }
      }
    },
    //设置当前激活的tab
    set_active_index(state, index) {
      let key = index;
      if (typeof index === 'object') key = index.path || index.route;
      let itab = null,
        key1 = key,
        key2 = encodeURI(key1),
        key3 = decodeURI(key1);
      for (let item of state.openTab) {
        if (item.path == key1 || item.path == key2 || item.path == key3) {
          itab = item;
          break;
        }
      }
      let idx = state.openTab.indexOf(itab);
      let activeTab = state.activeTab || {};
      if (idx != -1 && activeTab.path != itab.path) {
        state.activeTab = itab;
        state.activeIndex = itab.path;
        if (state.activeTab.children && state.activeTab.children.length > 0) {
          state.childOpenTabs = state.activeTab.children;
        }
      }
    },
    //更新tab名称+
    update_tab_name(state, tab) {
      let key = tab;
      if (typeof tab === 'object') key = tab.path || tab.route;
      let itab = null,
        key1 = key,
        key2 = encodeURI(key1),
        key3 = decodeURI(key1);
      for (let item of state.openTab) {
        if (item.path == key1 || item.path == key2 || item.path == key3) {
          itab = item;
          break;
        }
      }
      let idx = state.openTab.indexOf(itab);
      if (idx != -1) {
        if (itab.label) {
          itab.label = tab.label || tab.name;
        } else if (itab.name) {
          itab.name = tab.label || tab.name;
        }
      }
    },
    //设置修改tab的方法
    update_tabs(state, data) {
      data.label = data.label || data.name;
      data.path = data.path || data.route;
      let itab = null,
        key1 = data.path,
        key2 = encodeURI(key1),
        key3 = decodeURI(key1);
      for (let item of state.openTab) {
        if (item.path == key1 || item.path == key2 || item.path == key3) {
          itab = item;
          break;
        }
      }
      if (itab) {
        itab.label = data.label;
        itab.path = data.path;
      }
    },
    //删除tabs1
    delete_tabs1(state, data) {
      let index = 0;
      for (let option of state.openTab1) {
        if (option.path === data.targetName) {
          break;
        }
        index++;
      }
      this.state.openTab1.splice(index, 1);
    },
    //设置当前激活的tab1
    set_active_index1(state, index) {
      this.state.activeIndex1 = index;
    },
    //添加子tab+
    add_children_tab(state, tab) {
      //杨进勇修改
      if (state.activeTab.children && state.activeTab.children.length > 0) {
        let flag = true;
        for (let i = 0; i < state.activeTab.children.length; i++) {
          if (state.activeTab.children[i].name == tab.name) {
            flag = false;
            state.activeTab.children[i].active = true;
          } else {
            state.activeTab.children[i].active = false;
          }
        }
        if (flag) {
          tab.active = true;
          state.activeTab.children.push(tab)
        }
      } else { //不存在添加
        state.activeTab.children = [];
        tab.active = true;
        state.activeTab.children.push(tab)
      }
      state.childOpenTabs = state.activeTab.children;
    },
    // 刷新列表
    refresh_table(state, data) {
      state.refreshTable = data
    },
    // 在保存操作后更新router
    update_route_path(state, data) {
      if (state.activeTab.children) {
        state.activeTab.children.forEach(element => {
          // 修改state中的值
          element.params.state = data
        })
      }
      if (state.activeTab.person_params) {
        state.activeTab.person_params.guid = data
      }
      if (state.activeTab.children[0].params) {
        state.activeTab.children[0].params.edit = false
      }
      if (data.guid) {
        state.activeTab.person_params = data
      }
    },
  },
  actions: {

  }
})
export default store;
