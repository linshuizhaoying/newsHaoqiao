// import * as util from 'util';
import axios from '../util/axios';
import { UserState } from '../models/user';

import { USER_REG, 
        //  USER_LOGIN, 
        //  USER_LOGOUT 
        } from '../constants/user';

import {
  REG_API, // 用户注册接口
  // LOGIN_API, // 用户登录接口
  // LOGOUT_API, // 用户退出接口
} from '../service/api';

// 前端传来的注册结构
export interface IRegData {
  username: string,
  password: string,
  email: string
}

const userReg = (data: UserState) => ({
  type: USER_REG,
  data: data,
})

export function RegInRemote (user: IRegData) {
  return (dispatch: any) => axios.post(REG_API, user)
    .then((info: any) => {
      dispatch(userReg(info))
      return info
    })
  
}