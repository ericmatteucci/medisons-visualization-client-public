// @flow

import newState from '../lib/NewState';
import {
  UPDATE_SCORE_DATA_ACTION,
  UPDATE_SCORE_DATA_ERROR_ACTION,
  UPDATE_SCORE_DATA_LOADING_ACTION,
} from '../actions/ScoreDataActions';
import type {
  UpdateScoreDataActionType,
  UpdateScoreDataErrorActionType,
  UpdateScoreDataLoadingActionType,
} from '../actions/ScoreDataActions';
import {
  CompositeScoreDataModel,
  ScoreDataErrorModel,
  ScoreDataModel,
} from '../data/reduxModels/ScoreDataModel';

const scoreData = (
  state: ScoreDataModel = new ScoreDataModel(),
  action: UpdateScoreDataActionType,
): ScoreDataModel => {
  if (action.type === UPDATE_SCORE_DATA_ACTION) {
    return state.mergeData(
      action.timestamp,
      action.derangement,
      action.bloodPressure,
      action.electrocardiogram,
      action.oxygenSaturation,
      action.respiratoryRate,
      action.temperature,
    );
  }

  return state;
};

const scoreDataError = (
  state: ScoreDataErrorModel = new ScoreDataErrorModel(),
  action: UpdateScoreDataErrorActionType,
): ScoreDataErrorModel => {
  if (action.type === UPDATE_SCORE_DATA_ERROR_ACTION) {
    return newState(state, {
      isError: action.isError,
      message: action.message,
    });
  }

  return state;
};

const scoreDataLoading = (
  state: boolean = false,
  action: UpdateScoreDataLoadingActionType,
): boolean => (action.type === UPDATE_SCORE_DATA_LOADING_ACTION ? action.scoreDataLoading : state);

const compositeScoreData = (
  state: CompositeScoreDataModel = new CompositeScoreDataModel(),
  action: UpdateScoreDataActionType &
    UpdateScoreDataErrorActionType &
    UpdateScoreDataLoadingActionType,
): CompositeScoreDataModel => {
  const newOne = newState(state, {
    scoreData: scoreData(state.scoreData, action),
    scoreDataError: scoreDataError(state.scoreDataError, action),
    scoreDataLoading: scoreDataLoading(state.scoreDataLoading, action),
  });
  return newOne;
};

export default compositeScoreData;
