import Validator from '../utils/validator'

interface UserData  {
  userId: string,
  userName: string

}

interface ErrorData  {
  code: number,
  msg: string

}


const Msg = {
  0 : '数据库出错!',
  2 : '用户数据不正常',
  3 : '用户名不能重复'
}

// 返回正常数据
const success = ( data: UserData ) => {
  return {
    'state': {
        'code': 1,
        'msg': '注册成功!'
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

export const reg = async(ctx: any) => {
  console.log(ctx.request.body)
  const {username, password, email} = ctx.request.body;
  // 后端先做初步的数据校验和非法字符处理
  if (Validator.userCheck(username) && Validator.passCheck(password) && Validator.emailCheck(email)) {
      // 提交数据符合规范，查询数据库验证
      console.log('用户提交数据正常')
      const temp = {
        userId: 'id123',
        userName: username
      }
      return ctx.body = success(temp)
     } else {
       // 用户提交数据异常
      return ctx.body =  error(
       {
         code: 2,
         msg: Msg[2]
       })
     }
}
