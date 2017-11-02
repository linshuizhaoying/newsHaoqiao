import { TAGLIST_API, NEWSLIST_API, WEEKNEWSLIST_API, MOUTHNEWSLIST_API } from '../service/api';
import axios from '../util/axios'
import { getToken } from '../util/store';

import { TAG_LIST, NEWS_LIST
 } from '../constants/info'

 
const tagList = (data: any) => ({
  type: TAG_LIST,
  data: data,
})

const newsList = (data: any) => ({
  type: NEWS_LIST,
  data: data,
})

const weeksnewsList = (data: any) => ({
  type: NEWS_LIST,
  data: data,
})

const mouthsnewsList = (data: any) => ({
  type: NEWS_LIST,
  data: data,
})


export function TagListRemote () {
    // 写入权限验证
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken() 
    return (dispatch: any) => axios.get(TAGLIST_API)
    .then((info: any) => {
      let result: any[] = []
      const final: any[] = []
      result = [] || info.data.data.filter( (item: any) => {return item.status === '活跃'})
      result.forEach( (item: any) => { final.push(item.tagTitle)})
      info.data = final
      console.log(info)
      dispatch(tagList(info))
      return info
    })
}

export function newsListRemote () {
  return (dispatch: any) => axios.get(NEWSLIST_API)
  .then((info: any) => {
    dispatch(newsList(info))
    return info
  })
}

export function WeeksNewsListRemote () {
  return (dispatch: any) => axios.get(WEEKNEWSLIST_API)
  .then((info: any) => {
    dispatch(weeksnewsList(info))
    return info
  })
}
export function MouthsNewsListRemote () {
  return (dispatch: any) => axios.get(MOUTHNEWSLIST_API)
  .then((info: any) => {
    dispatch(mouthsnewsList(info))
    return info
  })
}