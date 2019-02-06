import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import chartDataReducer from './chartDataReducer';

export default combineReducers({
  user,
  runtime,
  chartDataReducer,
});
