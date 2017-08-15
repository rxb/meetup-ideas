import { combineReducers } from 'redux'
import groups from './groups'
import schedule from './schedule'
import user from './user'

const reducers = combineReducers({
  groups,
  schedule,
  user
})

export default reducers