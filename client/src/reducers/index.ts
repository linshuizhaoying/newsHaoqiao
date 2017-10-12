import { combineReducers } from 'redux';

import user from './user'
import info from './info'
import admin from './admin'
export default combineReducers({
  user,
  info,
  admin
})