// @flow

export type ScoreTimestampType = number;
export type ScoreValueType = number;

/**
 * Model to aggregate score points over time.
 */
export default class ScoreDataModel {
  timestamps: Array<ScoreTimestampType> = [];
  bloodPressure: Array<ScoreValueType> = [];
  derangement: Array<ScoreValueType> = [];
  electrocardiogram: Array<ScoreValueType> = [];
  oxygenSaturation: Array<ScoreValueType> = [];
  respiratoryRate: Array<ScoreValueType> = [];
  temperature: Array<ScoreValueType> = [];
}
