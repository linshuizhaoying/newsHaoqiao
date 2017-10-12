import axios from '../util/axios'
import { getToken } from '../util/store';
import { FRAME } from '../constants/admin';

import {
  FRAME_API, // frame重新处理获取接口
} from '../service/api'

const frame = (data: any) => ({
 type: FRAME,
 data: data,
})

export function frameRemote (url: string) {
 return (dispatch: any) =>{

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken() 
    return (dispatch: any) => axios.post(FRAME_API, {url:url})
    .then((info: any) => {
      dispatch(frame(info))
    })
 }
}