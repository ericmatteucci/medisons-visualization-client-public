// @flow
import CompositeSignalDataModel from '../data/reduxModels/CompositeSignalDataModel';
import ScoreDataModel from '../data/reduxModels/ScoreDataModel';

export type ReduxStateType = {
  signalDataReducer: CompositeSignalDataModel,
  scoreDataReducer: ScoreDataModel,
};
