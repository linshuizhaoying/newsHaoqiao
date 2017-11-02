import axios from 'axios'

import createBrowserHistory from 'history/createBrowserHistory'
import NotificationUtils from '../util/notification';

const history = createBrowserHistory()

let instance = axios.create({
  // `validateStatus`定义是否解析或拒绝给定的promise
  // HTTP响应状态码。如果`validateStatus`返回`true`（或被设置为`null` promise将被解析;否则，promise将被
  // 拒绝。
  validateStatus (status: number) {
    return status < 500 && status !== 404
  }
})

// 截取请求或响应在被 then 或者 catch 处理之前
instance.interceptors.response.use(
  response => {
    console.log(response)
    if (response.status === 401) {
      console.log(401)      
      return Promise.reject(response.data)
    } else if (response.status >= 400) {
      return Promise.reject(response.data)
    } else {
      return Promise.resolve(response.data)
    }
  },
  error => {
    NotificationUtils.notificationError('获取失败!','身份验证失败',3)
    console.log(error)
    Promise.reject(error)
  }

)
export default instance