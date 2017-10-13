import { CHECKSOURCE } from '../constants/admin';

const initialState = {
  frame: '',
  currentSourceData:'',

}

const admin = (state = initialState, action: any) => {
  // console.log(action)
  switch (action.type) {
    case CHECKSOURCE:
      return {
        ...state,
        currentSourceData:action.data.data
      }
    default:
      return state
  }
}

export default admin;