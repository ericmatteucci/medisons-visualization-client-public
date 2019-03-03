// @flow

import ScoreDataModel from '../data/reduxModels/ScoreDataModel';
import { UPDATE_SCORE_DATA_ACTION } from '../actions/ScoreDataActions';
import type { UpdateScoresActionType } from '../actions/ScoreDataActions';
import newState from '../lib/NewState';

const scoreDataReducer = (
  state: ScoreDataModel = new ScoreDataModel(),
  action: UpdateScoresActionType,
): ScoreDataModel => {
  if (action.type === UPDATE_SCORE_DATA_ACTION) {
    return newState(state, {
      timestamps: action.timestamps,
      bloodPressure: action.bloodPressure,
      derangement: action.derangement,
      electrocardiogram: action.electrocardiogram,
      oxygenSaturation: action.oxygenSaturation,
      respiratoryRate: action.respiratoryRate,
      temperature: action.temperature,
    });
  }
  return state;
};

export default scoreDataReducer;
