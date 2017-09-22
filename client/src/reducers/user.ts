import { USER_REG, 
        //  USER_LOGIN, 
        //  USER_LOGOUT 
       } from '../constants/user'

const initialState = {
  isLogin: false,
  token: '',
  userName: '',
  userId: ''
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
      }
    default:
      return state
  }
}

export default user;