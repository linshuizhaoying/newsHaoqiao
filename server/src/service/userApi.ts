import * as jwt from 'jsonwebtoken'
import Validator from '../utils/validator'
import { AddRegUser, LoginUser } from '../db/controllers'
import { config } from '../config'
interface UserData  {
  userId: string,
  userName: string,
  token: string,
  msg: string
}

interface ErrorData  {
  code: number,
  msg: string

}

interface Result {
  status: string,
  userId: string,
  userName: string,
  msg: string
}


// 返回正常数据
const success = ( data: UserData ) => {
  return {
    'state': {
        'code': 1,
        'msg': data.msg
    },
    'data': {
       data
    }
 }
}

// 返回错误提醒

const error = ( data: ErrorData ) => {
  return{
    'state': {
        'code': data.code,
        'msg':  data.msg
    }
  }
}

/**
 *  用户注册
 *  请求参数
 *  参数名	类型	必填	描述	默认值	参考值
 *  username	string	是	用户id	-	qianyuhui
 *  password	string	是	用户密码,md5加密	-	78e731027d8fd50ed642340b7c9a63b3
 *  email	string	否	用户邮箱	-	4799109@qq.com
 *  返回参数
 *  {
 *    "state": {
 *        "code": 1,
 *        "msg": "注册成功!"
 *    },
 *    "data": {
 *        "userID":"1111",
 *        "userName":"666"
 *    }
 * }
 */
export const reg = async(ctx: any) => {
  console.log(ctx.request.body)
  const {username, password, email} = ctx.request.body;
  // 后端先做初步的数据校验和非法字符处理
  if (Validator.userCheck(username) && Validator.passCheck(password) && Validator.emailCheck(email)) {
  // 数据符合规范
  // 插入数据库并验证重名
    let result: any = ''
    result = await AddRegUser( {username, password, email} )
    console.log('添加用户状况:\n', result)
    if (result.status === 'error') {
      // 用户名重复
      return ctx.body =  error(
      {
        code: 2,
        msg: result.msg
      })
    } else {
      const { userName, userId, msg } = result
      const token = jwt.sign({
        userId: userId,
        userName: userName,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 1 hours
      }, config.app.keys)
      return ctx.body = success({ userName, userId, token, msg })
    }
  } else {
    // 用户提交数据异常
  return ctx.body =  error(
    {
      code: 2,
      msg: '用户数据不正常'
    })
  }
}

/**
 * 用户登录
 * 请求参数
 *  参数名	类型	必填	描述	默认值	参考值
 *  username	string	是	用户id	-	qianyuhui
 *  password	string	是	用户密码,md5加密	-	78e731027d8fd50ed642340b7c9a63b3
 * 返回参数
 *  "state": {
 *      "code": 1,
 *      "msg": "登录成功"
 *  },
 *  "data": {
 *      "userId":'',
 *      "userName":'',
 *      "token": xxx
 *  }
 */
export const login = async(ctx: any) => {
  const {username, password, email} = ctx.request.body;
   // 后端先做初步的数据校验和非法字符处理
   if (Validator.userCheck(username) && Validator.passCheck(password)) {
    // 数据符合规范
    // 查询数据库
      const result: Result = {
        status: '',
        userId: '',
        userName: '',
        msg: ''
      }
      const hadUser = await LoginUser( {username, password} )
      console.log('登录用户状况:\n', result)
      if (hadUser === null || hadUser.password !== password) {
        result.msg = '账户不存在或者密码错误'
        result.status = 'error'
      } else {
        console.log('查询后的信息为:' )
        console.log(hadUser)
        result.msg = '用户登录成功!'
        result.status = 'success'
        result.userId = hadUser._id
        result.userName = hadUser.username
      }

      if (result.status === 'error') {
        // 用户不存在 或者 用户密码错误
        return ctx.body =  error(
        {
          code: 2,
          msg: result.msg
        })
      } else {
        const { userName, userId, msg } = result
        const token = jwt.sign({
          userId: userId,
          userName: userName,
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 1 hours
        }, config.app.keys)
        return ctx.body = success({ userName, userId, token, msg })
      }
    } else {
      // 用户提交数据异常
    return ctx.body =  error(
      {
        code: 2,
        msg: '用户数据不正常'
      })
    }
}

export const userInfo = async(ctx: any) => {
  return ctx.body = { userInfo: '{username:test110,password:nopass,email:test}' }
}
export const token = async(ctx: any) => {
  // 根据接口规范返回数据
  return ctx.body = {
    'state': {
          'code': 1,
          'msg': '登录成功'
      },
      'data': {
          'userId': ctx.tokenContent.userId,
          'userName': ctx.tokenContent.userName
      }
  }
}