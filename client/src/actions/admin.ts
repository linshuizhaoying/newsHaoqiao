import { CHECKSOURCE } from '../constants/admin';

const checkSource = (data: any) => ({
  type: CHECKSOURCE,
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

  return (dispatch: any) => dispatch(checkSource(arr))
}