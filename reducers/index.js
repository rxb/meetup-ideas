import { combineReducers } from 'redux'
import groups from './groups'
import schedule from './schedule'
import user from './user'
import locations from './locations'


const reducers = combineReducers({
  groups,
  schedule,
  user,
  locations
})

export default reducers