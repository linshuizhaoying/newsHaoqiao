// import * as util from 'util';
import axios from '../util/axios'
import { UserState } from '../models/user'
import { getToken, removeToken } from '../util/store';

import { USER_REG, 
         USER_LOGIN, 
         USER_TOKEN,
         USER_LOGOUT 
        } from '../constants/user'

import {
  REG_API, // 用户注册接口
  LOGIN_API, // 用户登录接口
  USERINFO_API, // 用户信息
  TOKEN_API, // 用户退出接口
} from '../service/api'

// 前端传来的注册结构
export interface IRegData {
  username: string,
  password: string,
  email: string
}
export interface ILoginData {
  username: string,
  password: string
}

const userReg = (data: UserState) => ({
  type: USER_REG,
  data: data,
})

const userLogin = (data: UserState) => ({
  type: USER_LOGIN,
  data: data,
})

const userToken = (data: any) => ({
  type: USER_TOKEN,
  data: data
})

const userLogout = () => ({
  type: USER_LOGOUT
})

export function RegInRemote (user: IRegData) {
  return (dispatch: any) => axios.post(REG_API, user)
    .then((info: any) => {
      dispatch(userReg(info))
      return info
    })
  
}

export function LoginInRemote (user: ILoginData) {
  return (dispatch: any) => axios.post(LOGIN_API, user)
  .then((info: any) => {
    dispatch(userLogin(info))
    return info
  })
}

export function UserInfoRemote (){
  // 写入权限验证
  console.log(getToken())
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken() 
  return (dispatch: any) => axios.get(USERINFO_API)
  .then((info: any) => {
    return info
  })
}

export function TokenRemote (){
  // 写入权限验证
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken() 
  return (dispatch: any) => axios.get(TOKEN_API)
  .then((info: any) => {
    dispatch(userToken(info))
    return info
  })
}


export function Logout() {
  return (dispatch: any)  => {
    dispatch(userLogout())
    removeToken()
  }
}