// 定义用户动作接口
export interface UserAction {
  type: string
  data?: {
    data?: object
  }
}

// 定义用户的信息
export interface UserInfo {
  userId: '',
  userName: '',
  type: '', // 0 管理员 || 1 普通用户
}

// 定义用户的状态
export interface UserState {
  isLogin: boolean
  token: string | null
  userInfo: UserInfo | null
}



