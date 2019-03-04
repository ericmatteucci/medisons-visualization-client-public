// @flow

export type ScoreTimestampType = Array<number>;
export type ScoreValueListType = Array<number>;

/**
 * Model to aggregate score points over time.
 */
export default class ScoreDataModel {
  timestamp: ScoreTimestampType = [];
  bloodPressure: ScoreValueListType = [];
  derangement: ScoreValueListType = [];
  electrocardiogram: ScoreValueListType = [];
  oxygenSaturation: ScoreValueListType = [];
  respiratoryRate: ScoreValueListType = [];
  temperature: ScoreValueListType = [];
}
