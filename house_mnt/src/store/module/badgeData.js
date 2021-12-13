let BadgeItem = [
  {
    name: '待办',
    value: ''
  },
  {
    name: '已办',
    value: ''
  },
  // {
  //   name: '初审',
  //   value: ''
  // },
  // {
  //   name: '审核',
  //   value: ''
  // },
  // {
  //   name: '待下达',
  //   value: ''
  // },
  // {
  //   name: '已下达',
  //   value: ''
  // }
]
const state = {
  BadgeItem,
}
const getters = {
  getBadgeItem: state => {
    return state.BadgeItem
  },
}
const mutations = {
  setBadgeItem (state , data){
    state.BadgeItem = data;
  }
}
export default {
  state,
  getters,
  mutations
}