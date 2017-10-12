import { TAG_LIST 
 } from '../constants/info'

//  import {
//   TAGLIST_API, // 标签列表接口
// } from '../service/api'

const tagList = (data: any) => ({
  type: TAG_LIST,
  data: data,
})

export function TagListRemote () {
  // return (dispatch: any) => axios.post(LOGIN_API, user)
  // .then((info: any) => {
  //   dispatch(tagList(info))
  //   return info
  // })
  return (dispatch: any) =>{
    let arr = {
      data:['前端','Node.js','css','javascript','vue','react','typescript','redis','mongodb','es6'],
      state:{
        code: 1
      }
    }
    dispatch(tagList(arr))
  }
}