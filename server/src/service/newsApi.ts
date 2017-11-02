import { AllNews, HoursNews, WeeksNews, MouthsNews } from '../db/controllers/index';


// 返回正常数据
const success = ( data: any) => {
  return {
    'state': {
        'code': 1,
        'msg': 'success'
    },
    'data': {
       data
    }
 }
}
// 返回错误提醒
const error = () => {
  return{
    'state': {
        'code': 2,
        'msg':  'error'
    }
  }
}


export const allNews = async(ctx: any) => {
  // console.log('allNews')
  // console.log(ctx.request.body)
  const result = await AllNews()
  // console.log(result)
  return ctx.body = success(result)
}

export const hoursNews = async(ctx: any) => {
  const result = await HoursNews()
  return ctx.body = success(result)
}

export const weeksNews = async(ctx: any) => {
  const result = await WeeksNews()
  return ctx.body = success(result)
}

export const mouthsNews = async(ctx: any) => {
  const result = await MouthsNews()
  return ctx.body = success(result)
}