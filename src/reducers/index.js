import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import signalDataReducer from './signalDataReducer';
import dataInputReducer from './dataInputReducer';
import backgroundDataReducer from './backgroundDataReducer';

const combinedReducer = combineReducers({
  user,
  runtime,
  backgroundDataReducer,
  dataInputReducer,
  signalDataReducer,
});

export default combinedReducer;
