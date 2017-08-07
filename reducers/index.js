import { combineReducers } from 'redux'
import groups from './groups'
import schedule from './schedule'

const reducers = combineReducers({
  groups,
  schedule
})

export default reducers