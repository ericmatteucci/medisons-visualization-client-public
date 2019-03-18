// @flow

export type ScoreTimestampType = Array<number>;
export type ScoreValueListType = Array<number>;

/**
 * Model to aggregate score points over time.
 */
export default class ScoreDataModel {
  timestamp: ScoreTimestampType = [];
  derangement: ScoreValueListType = [];
  bloodPressure: ScoreValueListType = [];
  electrocardiogram: ScoreValueListType = [];
  oxygenSaturation: ScoreValueListType = [];
  respiratoryRate: ScoreValueListType = [];
  temperature: ScoreValueListType = [];
}
