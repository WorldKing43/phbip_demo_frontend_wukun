import store from '../../store/module/siderMenu'

export function hasPermission(permission) {
  let myBtns = store.state.allButtons;
  if (myBtns) {
    let flag = false;
    myBtns.forEach((val) => {
      if (val.code == permission) {
        flag = true;
      }
    })
    return flag;
  } else {
    return true;
  }
}
