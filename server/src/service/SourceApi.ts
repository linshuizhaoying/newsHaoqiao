import { AddSource, AllSources, RemoveSource, UpdateSource } from '../db/controllers/source';

interface SourceData  {
  sourceTitle: String,
  url: String,
  type: String, // spider rss email
  code: String,
  lang: String,
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

export const addSource = async(ctx: any) => {
  console.log('addSource')
  console.log(ctx.request.body)
  const {sourceTitle, url, lang, type, code} = ctx.request.body;
  await AddSource( {sourceTitle, url, lang, type, code} )
  return ctx.body = success('')
}

export const allSources = async(ctx: any) => {
  console.log('allSource')
  console.log(ctx.request.body)
  const {sourceTitle, url, lang, type, code} = ctx.request.body;
  const result = await AllSources()
  console.log(result)
  return ctx.body = success(result)
}

export const removeSource = async(ctx: any) => {
  console.log('removeSource')
  console.log(ctx.request.body)
  const {id} = ctx.request.body;
  await RemoveSource(id)
  return ctx.body = success('')
}

export const updateSource = async(ctx: any) => {
  console.log('updateSource')
  console.log(ctx.request.body)
  const {id} = ctx.request.body;
  const {sourceTitle, url, lang, type, code} = ctx.request.body.source
  return ctx.body = await UpdateSource(id, {sourceTitle, url, lang, type, code} )
}