import { TAG_LIST
} from '../constants/info'

const initialState = {
  tagList: ''
}

const info = (state = initialState, action: any) => {
  // console.log(action)
  switch (action.type) {
    case TAG_LIST:
      return {
        ...state,
        tagList:action.data.data
      }
    default:
      return state
  }
}

export default info;