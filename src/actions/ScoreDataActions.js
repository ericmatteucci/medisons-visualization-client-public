// @flow

import type { ActionType } from './actionTypes/ActionTypes';
import type { ScoreTimestampsType, ScoreValueListType } from '../data/reduxModels/ScoreDataModel';

export const UPDATE_SCORE_DATA_ACTION = 'UPDATE_SCORE_DATA_ACTION';

export type UpdateScoresActionType = {
  timestamps: ScoreTimestampsType,
  bloodPressure: ScoreValueListType,
  derangement: ScoreValueListType,
  electrocardiogram: ScoreValueListType,
  oxygenSaturation: ScoreValueListType,
  respiratoryRate: ScoreValueListType,
  temperature: ScoreValueListType,
} & ActionType;

export const updateScoresAction = (
  timestamps: ScoreTimestampsType,
  bloodPressure: ScoreValueListType,
  derangement: ScoreValueListType,
  electrocardiogram: ScoreValueListType,
  oxygenSaturation: ScoreValueListType,
  respiratoryRate: ScoreValueListType,
  temperature: ScoreValueListType,
): UpdateScoresActionType => ({
  type: UPDATE_SCORE_DATA_ACTION,
  timestamps,
  bloodPressure,
  derangement,
  electrocardiogram,
  oxygenSaturation,
  respiratoryRate,
  temperature,
});
