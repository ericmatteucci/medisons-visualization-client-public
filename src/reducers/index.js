import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import signalDataReducer from './signalDataReducer';
import dataInputReducer from './dataInputReducer';

export default combineReducers({
  user,
  runtime,
  signalDataReducer,
  dataInputReducer,
});
