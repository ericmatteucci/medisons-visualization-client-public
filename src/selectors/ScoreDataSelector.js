// @flow

import { createSelector } from 'reselect';
import type { ScoreTimestampType } from '../data/reduxModels/ScoreDataModel';

const currentTimestamps = (state: Object): ScoreTimestampType => state.scoreDataReducer.timestamp;

export class ScoreDataSelector {
  static getLatestTime = (timestamps: ScoreTimestampType): number => Math.max(timestamps);
}

export const latestScoreTimeSelector = createSelector(
  [currentTimestamps],
  ScoreDataSelector.getLatestTime,
);
