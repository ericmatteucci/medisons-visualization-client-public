// @flow

export type ScoreTimestampType = Array<number>;
export type ScoreValueListType = Array<number>;

/**
 * Model to aggregate score points over time.
 */
export class ScoreDataModel {
  timestamp: ScoreTimestampType = [];
  derangement: ScoreValueListType = [];
  bloodPressure: ScoreValueListType = [];
  electrocardiogram: ScoreValueListType = [];
  oxygenSaturation: ScoreValueListType = [];
  respiratoryRate: ScoreValueListType = [];
  temperature: ScoreValueListType = [];
}

export class ScoreDataErrorModel {
  isError: boolean = false;
  message: string = '';
}

export class CompositeScoreDataModel {
  scoreData: ScoreDataModel = new ScoreDataModel();
  scoreDataError: ScoreDataErrorModel = new ScoreDataErrorModel();
  scoreDataLoading: boolean = true;
}
