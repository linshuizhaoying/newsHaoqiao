import { CHECKSOURCE, ALLSOURCES, REMOVESOURCE, UPDATESOURCES, ADDSOURCE } from '../constants/admin';

const initialState = {
  currentSourceData:'',
  currentSourceList:''
}

const admin = (state = initialState, action: any) => {
  // console.log(action)
  switch (action.type) {
    case CHECKSOURCE:
      return {
        ...state,
        currentSourceData: action.data.data
      }
    case ALLSOURCES:
      return {
        ...state,
        currentSourceList: action.data.data
      }
      
    default:
      return state
  }
}

export default admin;