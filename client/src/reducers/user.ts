import { USER_REG, 
         USER_LOGIN, 
         USER_LOGOUT,
         USER_TOKEN 
       } from '../constants/user'

const initialState = {
  isLogin: false,
  token: '',
  userName: '',
  userId: '',
  status: '',
  msg: '',
}

const user = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_REG:
      return {
        ...state,
        isLogin: true,
        userName: action.data.data.data.userName,
        token: action.data.data.data.token,
        userId: action.data.data.data.userId,
        status: action.data.state.code,
        msg: action.data.state.msg,
      }
    case USER_LOGIN:
      return {
        ...state,
        isLogin: true,
        userName: action.data.data.data.userName,
        token: action.data.data.data.token,
        userId: action.data.data.data.userId,
        status: action.data.state.code,
        msg: action.data.state.msg,
      }
    case USER_TOKEN:
      return {
        ...state,
        isLogin: true,
        userId: action.data.data.userId,
        userName: action.data.data.userName
      } 
    case USER_LOGOUT:
      return{
        ...state,
        isLogin: false,
        userName: '',
        token: '',
        userId: '',
        status: '',
        msg: '',
      }
    default:
      return state
  }
}

export default user;