// 处理后端返回错误的中间件
import {
  USER_REG, USER_LOGIN
 } from '../constants';
import notificationUtils from '../util/notification';
export const errorReporter = (store: any) => (next: any) => (action: any) => {
  console.log(action.data)
  if(action.data && action.data.state.code !== 1) {
    switch (action.type) {
      case USER_REG:
        notificationUtils.notificationError(action.data.state.msg, `注册失败`, 3);
        break;
      case USER_LOGIN:
        notificationUtils.notificationError(action.data.state.msg, '登录失败', 3);
        break;

      default:
        return null;
    }
  } else {
    return next(action);
  }
}
