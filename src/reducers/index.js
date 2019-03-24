// @flow

import { combineReducers } from 'redux';
import dataInputReducer from './dataInputReducer';
import backgroundDataReducer from './backgroundDataReducer';
import chartViewRangeReducer from './chartViewRangeReducer';
import compositeScoreDataReducer from './compositeScoreDataReducer';

const combinedReducer = combineReducers({
  backgroundDataReducer,
  dataInputReducer,
  chartViewRangeReducer,
  compositeScoreDataReducer,
});

export default combinedReducer;
