// @flow

import { combineReducers } from 'redux';
import dataInputReducer from './dataInputReducer';
import backgroundDataReducer from './backgroundDataReducer';
import compositeScoreDataReducer from './compositeScoreDataReducer';

const combinedReducer = combineReducers({
  backgroundDataReducer,
  dataInputReducer,
  compositeScoreDataReducer,
});

export default combinedReducer;
