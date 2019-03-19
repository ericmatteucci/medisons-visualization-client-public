import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';

import dataInputReducer from './dataInputReducer';
import backgroundDataReducer from './backgroundDataReducer';
import scoreDataReducer from './scoreDataReducer';

const combinedReducer = combineReducers({
  user,
  runtime,
  backgroundDataReducer,
  dataInputReducer,
  scoreDataReducer,
});

export default combinedReducer;
