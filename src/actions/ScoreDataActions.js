// @flow

import type { ActionType } from './actionTypes/ActionTypes';
import type { ScoreTimestampType, ScoreValueListType } from '../data/reduxModels/ScoreDataModel';

export const UPDATE_SCORE_DATA_ACTION = 'UPDATE_SCORE_DATA_ACTION';
export const UPDATE_SCORE_DATA_ERROR_ACTION = 'UPDATE_SCORE_DATA_ERROR_ACTION';
export const UPDATE_SCORE_DATA_LOADING_ACTION = 'UPDATE_SCORE_DATA_LOADING_ACTION';

export type UpdateScoreDataActionType = {
  timestamp: ScoreTimestampType,
  derangement: ScoreValueListType,
  bloodPressure: ScoreValueListType,
  electrocardiogram: ScoreValueListType,
  oxygenSaturation: ScoreValueListType,
  respiratoryRate: ScoreValueListType,
  temperature: ScoreValueListType,
} & ActionType;

export type UpdateScoreDataErrorActionType = {
  isError: boolean,
  message: String,
} & ActionType;

export type UpdateScoreDataLoadingActionType = {
  scoreDataLoading: boolean,
} & ActionType;

export const updateScoreDataAction = (
  timestamp: ScoreTimestampType,
  derangement: ScoreValueListType,
  bloodPressure: ScoreValueListType,
  electrocardiogram: ScoreValueListType,
  oxygenSaturation: ScoreValueListType,
  respiratoryRate: ScoreValueListType,
  temperature: ScoreValueListType,
): UpdateScoreDataActionType => ({
  type: UPDATE_SCORE_DATA_ACTION,
  timestamp,
  derangement,
  bloodPressure,
  electrocardiogram,
  oxygenSaturation,
  respiratoryRate,
  temperature,
});

export const updateScoreDataErrorAction = (
  isError: boolean,
  message: String,
): UpdateScoreDataErrorActionType => ({
  type: UPDATE_SCORE_DATA_ERROR_ACTION,
  isError,
  message,
});

export const updateScoreDataLoadingAction = (
  scoreDataLoading: boolean,
): UpdateScoreDataLoadingActionType => ({
  type: UPDATE_SCORE_DATA_LOADING_ACTION,
  scoreDataLoading,
});
