import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import signalDataReducer from './signalDataReducer';

export default combineReducers({
  user,
  runtime,
  signalDataReducer,
});
