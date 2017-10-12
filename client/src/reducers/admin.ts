import { FRAME } from '../constants/admin';

const initialState = {
  frame: ''
}

const admin = (state = initialState, action: any) => {
  // console.log(action)
  switch (action.type) {
    case FRAME:
      return {
        ...state,
        frame:action.data.data
      }
    default:
      return state
  }
}

export default admin;