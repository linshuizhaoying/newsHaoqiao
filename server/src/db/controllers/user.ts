const User = require('../models/user.js');
interface RegUser  {
  username: string,
  password: string,
  email: string
}
interface LoginUser  {
  username: string,
  password: string
}

interface Result {
  status: string,
  userId: string,
  userName: string,
  msg: string
}

export const AddRegUser = async(user: RegUser) => {
  const {username, password, email} = user
  const newUser = new User({username, password, email})
  let hadUser: any = ''
  const result: Result = {
    status: '',
    userId: '',
    userName: '',
    msg: ''
  }

  await User.findOne({'username': username}, (err: any, data: any) => {
    hadUser = data
  })

  // 先对用户名进行重复校验
  if (hadUser && hadUser.username === username) {
    result.msg = '用户名不能重复'
    result.status = 'error'
    return result

  } else {
    console.log('添加用户')
    await newUser.save().then( (data: any) => {
      console.log('保存后的信息为:' )
      console.log(data)
      result.msg = '用户注册成功!'
      result.status = 'success'
      result.userId = data._id
      result.userName = data.username
      console.log(result)
    })
    return result
  }


}

export const LoginUser = async(user: LoginUser) => {
  const {username, password} = user
  console.log('用户正在登录:')
  console.log(user)

  let hadUser: any = ''
  const result: Result = {
    status: '',
    userId: '',
    userName: '',
    msg: ''
  }

  await User.findOne({'username': username}, (err: any, data: any) => {
    hadUser = data
  })
  console.log('hadUser:', hadUser)
  console.log(hadUser === null || hadUser.password === password)
  if (hadUser === null || hadUser.password !== password) {
    result.msg = '账户不存在或者密码错误'
    result.status = 'error'
    return result
  } else {
    console.log('查询后的信息为:' )
    console.log(hadUser)
    result.msg = '用户登录成功!'
    result.status = 'success'
    result.userId = hadUser._id
    result.userName = hadUser.username
    console.log(result)
    return result
  }
}