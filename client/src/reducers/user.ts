import { USER_REG, 
        //  USER_LOGIN, 
        //  USER_LOGOUT 
       } from '../constants/user';

import { UserState,
         UserAction
       } from '../models/user';

const initialState = {
  isLogin: false,
  token: null,
  userInfo: null
}

const user = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case USER_REG:
      return {
        ...state,
        isLogin: true,
        userInfo: action.data && action.data.data !== undefined ? action.data.data  : 'no data'
      }
    default:
      return state
  }
}

export default user;