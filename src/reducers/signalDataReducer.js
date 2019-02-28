// @flow

import CompositeSignalDataModel from '../data/reduxModels/CompositeSignalDataModel';
import SignalDataModel from '../data/reduxModels/SignalDataModel';
import newState from '../lib/NewState';
import type { SignalNameType } from '../data/reduxModels/SignalDataModel';
import type { UpdateSignalDataActionType } from '../actions/SignalDataActions';
import { SignalNames } from '../constants/ValueConstants';
import {
  UPDATE_DERANGEMENT_SCORE_CHART_ACTION,
  UPDATE_SIGNAL_DATA_ACTION,
} from '../actions/SignalDataActions';

const derangementScore = (
  state: SignalDataModel = new SignalDataModel(),
  action: UpdateSignalDataActionType,
): SignalDataModel => {
  if (action.type === UPDATE_DERANGEMENT_SCORE_CHART_ACTION) {
    return newState(state, {
      name: action.name,
      data: action.data,
      frequency: action.frequency,
      timestamp: action.timestamp,
    });
  }

  // not the right action, so return the current state
  return state;
};

const signalData = (
  state: SignalDataModel = new SignalDataModel(),
  action: UpdateSignalDataActionType,
  matchName: SignalNameType,
): SignalDataModel => {
  if (action.type === UPDATE_SIGNAL_DATA_ACTION && action.name === matchName) {
    return newState(state, {
      name: action.name,
      data: action.data,
      frequency: action.frequency,
      timestamp: action.timestamp,
    });
  }

  // not the right action or name so return the original state
  return state;
};

/**
 * This is the main chart data reducer. Since we currently get a single set
 * of data per call, one reducer will be required per data type.
 * @param state
 * @param action
 * @returns {CompositeSignalDataModel}
 */
const signalDataReducer = (
  state: CompositeSignalDataModel = new CompositeSignalDataModel(),
  action: UpdateSignalDataActionType,
): CompositeSignalDataModel =>
  newState(state, {
    derangementScore: derangementScore(state.derangementScore, action),
    bloodPressure: signalData(state.bloodPressure, action, SignalNames.BP),
    oxygenSaturation: signalData(state.oxygenSaturation, action, SignalNames.SPO2),
    electrocardiogram: signalData(state.electrocardiogram, action, SignalNames.ECG),
  });

export default signalDataReducer;
