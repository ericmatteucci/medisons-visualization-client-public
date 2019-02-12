// @flow
import _ from 'lodash';

export type ScoreTimestampType = number;
export type ScoreValueType = number;

/**
 * Model for an individual score point, including the individual vital scores from which it
 * was derived (for more information refer to the Data Aggregation Service and Database Manager
 * documentation).
 */
export class ScorePointModel {
  timestamp: ScoreTimestampType = -1;
  value: ScoreValueType = -1;
  electrocardiogram: ?ScoreValueType = null;
  oxygenSaturation: ?ScoreValueType = null;
  temperature: ?ScoreValueType = null;
  bloodPressure: ?ScoreValueType = null;

  constructor(
    timestamp: ScoreTimestampType,
    value: ScoreValueType,
    electrocardiogram: ?ScoreValueType = null,
    oxygenSaturation: ?ScoreValueType = null,
    temperature: ?ScoreValueType = null,
    bloodPressure: ?ScoreValueType = null,
  ) {
    this.timestamp = timestamp;
    this.value = value;
    this.electrocardiogram = electrocardiogram;
    this.oxygenSaturation = oxygenSaturation;
    this.temperature = temperature;
    this.bloodPressure = bloodPressure;
  }
}

export type ScoreListType = Array<ScorePointModel>;

/**
 * Model to aggregate score points over time.
 */
export class ScoreDataModel {
  scores: ScoreListType = [];

  /**
   * This function takes in an array of scores and does an insertion/block replacement.
   * It returns a new ScoreDataModel that stores a list with the combination of
   * previous and new scores.
   * @param newScores An array of new scores to insert
   * @return ScoreDataModel A new ScoreDataModel with inserted scores
   */
  insertScores(newScores: ScoreListType) {
    const result = _.unionBy(newScores, this.scores, 'timestamp');
    result.sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1));

    const newScoreDataModel = new ScoreDataModel();
    newScoreDataModel.scores = result;
    return newScoreDataModel;
  }
}
