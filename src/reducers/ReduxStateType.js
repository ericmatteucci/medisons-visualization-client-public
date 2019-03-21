// @flow
import { CompositeScoreDataModel } from '../data/reduxModels/ScoreDataModel';
import BackgroundDataModel from '../data/reduxModels/BackgroundDataModel';
import DataInputModalModel from '../data/reduxModels/DataInputModalModel';

export type ReduxStateType = {
  backgroundDataReducer: BackgroundDataModel,
  dataInputReducer: DataInputModalModel,
  compositeScoreDataReducer: CompositeScoreDataModel,
};
