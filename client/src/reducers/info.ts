import { TAG_LIST, NEWS_LIST } from '../constants/info';

const initialState = {
  tagList: [],
  newsList: []
}

const info = (state = initialState, action: any) => {
  // console.log(action)
  switch (action.type) {
    case TAG_LIST:
      return {
        ...state,
        tagList:action.data.data
      }
    case NEWS_LIST:
    return {
      ...state,
      newsList:action.data.data.data
    }
    default:
      return state
  }
}

export default info;