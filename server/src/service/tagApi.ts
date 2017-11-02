import { AddTag, AllTags, UpdateTag } from '../db/controllers/index';

interface ITag  {
  tagTitle: string,
  status: string
}
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

export const addTag = async(ctx: any) => {
  console.log('addTag')
  console.log(ctx.request.body)
  const {tagTitle, status} = ctx.request.body;
  await AddTag( {tagTitle, status} )
  return ctx.body = success('')
}

export const allTags = async(ctx: any) => {
  console.log('allTags')
  console.log(ctx.request.body)
  const result = await AllTags()
  return ctx.body = success(result)
}


export const updateTag = async(ctx: any) => {
  console.log('updateTag')
  console.log(ctx.request.body)
  const { id } = ctx.request.body;
  const { tagTitle, status } = ctx.request.body
  return ctx.body = await UpdateTag(id, { tagTitle, status } )
}