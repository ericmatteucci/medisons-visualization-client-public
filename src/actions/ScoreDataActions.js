// @flow

import type { ActionType } from './actionTypes/ActionTypes';
import type { ScoreTimestampType, ScoreValueListType } from '../data/reduxModels/ScoreDataModel';

export const UPDATE_SCORE_DATA_ACTION = 'UPDATE_SCORE_DATA_ACTION';

export type UpdateScoreDataActionType = {
  timestamp: ScoreTimestampType,
  bloodPressure: ScoreValueListType,
  derangement: ScoreValueListType,
  electrocardiogram: ScoreValueListType,
  oxygenSaturation: ScoreValueListType,
  respiratoryRate: ScoreValueListType,
  temperature: ScoreValueListType,
} & ActionType;

export const updateScoreDataAction = (
  timestamp: ScoreTimestampType,
  bloodPressure: ScoreValueListType,
  derangement: ScoreValueListType,
  electrocardiogram: ScoreValueListType,
  oxygenSaturation: ScoreValueListType,
  respiratoryRate: ScoreValueListType,
  temperature: ScoreValueListType,
): UpdateScoreDataActionType => ({
  type: UPDATE_SCORE_DATA_ACTION,
  timestamp,
  bloodPressure,
  derangement,
  electrocardiogram,
  oxygenSaturation,
  respiratoryRate,
  temperature,
});
