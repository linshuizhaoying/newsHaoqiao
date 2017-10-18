
import axios from '../util/axios'
import { CHECKSOURCE, 
         ADDSOURCE, 
         REMOVESOURCE, 
         UPDATESOURCE, 
         ALLSOURCES,
         ALLTAGS,
         ADDTAG,
         UPDATETAG
        } from '../constants/admin';
import { getToken } from '../util/store';
import { ADDTAG, UPDATETAG } from '../constants/admin';
import { ADDSOURCE_API,
         ALLSOURCES_API, 
         REMOVESOURCE_API, 
         UPDATESOURCE_API,
         ALLTAGS_API,
         ADDTAG_API,
         UPDATETAG_API
         } from '../service/api/index';
interface SourceData  {
  sourceTitle: String,
  url: String, 
  type: String, // spider rss email
  code: String,
  lang: String,
}

interface TagData  {
  tagTitle: string,
  status: string
}

const checkSource = (data: any) => ({
  type: CHECKSOURCE,
  data: data,
})

const addSource = (data: any) => ({
  type: ADDSOURCE,
  data: data,
})

const allSource = (data: any) => ({
  type: ALLSOURCES,
  data: data,
})

const removeSource = (data: any) => ({
  type: REMOVESOURCE,
  data: data,
})

const updateSource = (data: any) => ({
  type: UPDATESOURCE,
  data: data,
})

const addTag = (data: any) => ({
  type: ADDTAG,
  data: data,
})

const allTags = (data: any) => ({
  type: ALLTAGS,
  data: data,
})

const updateTag = (data: any) => ({
  type: UPDATETAG,
  data: data,
})


export function checkLocalSource (data: any) {
  const { currentId, currentLink, currentTitle, currentLang, currentCode, currentType} = data
  const info ={
    currentId,
    currentLink,
    currentTitle, 
    currentLang, 
    currentCode,
    currentType
  }
  const arr = {
    data: info,
    state:{
      code: 1
    }
  }

  return (dispatch: any) => {
    dispatch(checkSource(arr))
    return info
  }
}

export function addSourceRemote (source: SourceData){
  // 写入权限验证
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken() 
  return (dispatch: any) => axios.post(ADDSOURCE_API, source)
  .then((info: any) => {
    dispatch(addSource(info))
    return info
  })
}

export function allSourceRemote (){
  // 写入权限验证
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken() 
  return (dispatch: any) => axios.get(ALLSOURCES_API)
  .then((info: any) => {
    dispatch(allSource(info))
    return info
  })
}

export function removeSourceRemote (id: string){
  // 写入权限验证
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken() 
  return (dispatch: any) => axios.post(REMOVESOURCE_API, {id})
  .then((info: any) => {
    dispatch(removeSource(info))
    return info
  })
}

export function updateSourceRemote (id: string, source: SourceData){
  // 写入权限验证
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken() 
  return (dispatch: any) => axios.post(UPDATESOURCE_API, {id, source})
  .then((info: any) => {
    dispatch(updateSource(info))
    return info
  })
}

export function allTagRemote (){
  // 写入权限验证
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken() 
  return (dispatch: any) => axios.get(ALLTAGS_API)
  .then((info: any) => {
    dispatch(allTags(info))
    return info
  })
}

export function addTagRemote (tag: TagData){
  // 写入权限验证
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken() 
  return (dispatch: any) => axios.post(ADDTAG_API, tag)
  .then((info: any) => {
    dispatch(addTag(info))
    return info
  })
}


export function updateTagRemote (id: string, tag: TagData){
  // 写入权限验证
  const {tagTitle, status} = tag
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken() 
  return (dispatch: any) => axios.post(UPDATETAG_API, {id, tagTitle, status})
  .then((info: any) => {
    dispatch(updateTag(info))
    return info
  })
}
