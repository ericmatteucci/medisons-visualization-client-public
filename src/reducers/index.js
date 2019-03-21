// @flow

import { combineReducers } from 'redux';
import dataInputReducer from './dataInputReducer';
import backgroundDataReducer from './backgroundDataReducer';
import compositeScoreData from './compositeScoreData';

const combinedReducer = combineReducers({
  backgroundDataReducer,
  dataInputReducer,
  compositeScoreData,
});

export default combinedReducer;
