import { combineReducers } from 'redux';

import dataInputReducer from './dataInputReducer';
import backgroundDataReducer from './backgroundDataReducer';
import scoreDataReducer from './scoreDataReducer';
import chartViewRangeReducer from './chartViewRangeReducer';

const combinedReducer = combineReducers({
  backgroundDataReducer,
  dataInputReducer,
  scoreDataReducer,
  chartViewRangeReducer,
});

export default combinedReducer;
