// @flow

import type { ActionType } from './actionTypes/ActionTypes';
import type {
  SignalDataType,
  SignalNameType,
  SignalFrequencyType,
  SignalTimestampType,
} from '../data/reduxModels/SignalDataModel';

// action.type identifiers for the chart actions
export const UPDATE_SIGNAL_DATA_ACTION = 'UPDATE_SIGNAL_DATA_ACTION';

// Chart data action types
export type UpdateSignalDataActionType = {
  name: SignalNameType,
  data: SignalDataType,
  frequency: SignalFrequencyType,
  timestamp: SignalTimestampType,
} & ActionType;

// Chart data actions
export const updateSignalDataAction = (
  name: SignalNameType,
  data: SignalDataType,
  timestamp: SignalTimestampType,
  frequency: SignalFrequencyType,
): UpdateSignalDataActionType => ({
  type: UPDATE_SIGNAL_DATA_ACTION,
  name,
  data,
  timestamp,
  frequency,
});
