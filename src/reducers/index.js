import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import signalDataReducer from './signalDataReducer';
import dataInputReducer from './dataInputReducer';
import backgroundVariablesReducer from './backgroundVariablesReducer';

export default combineReducers({
  user,
  runtime,
  backgroundVariablesReducer,
  dataInputReducer,
  signalDataReducer,
});
