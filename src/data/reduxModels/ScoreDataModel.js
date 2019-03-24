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

  /**
   * Returns a new ScoreDataModel containing this' data merged with the new data
   * passed in. The new data will be appended at the end of the arrays and it is
   * assumed to be in order.
   * @param timestamp new timestamp data
   * @param derangement new derangement score values
   * @param bloodPressure new blood pressure array
   * @param electrocardiogram more electrocardiogram data
   * @param oxygenSaturation more oxygen saturation values
   * @param respiratoryRate an array containing more respiratory rate score values
   * @param temperature more temperature scores
   * @return {ScoreDataModel} containing all pre-existing and new data
   */
  mergeData(
    timestamp: ScoreTimestampType,
    derangement: ScoreValueListType,
    bloodPressure: ScoreValueListType,
    electrocardiogram: ScoreValueListType,
    oxygenSaturation: ScoreValueListType,
    respiratoryRate: ScoreValueListType,
    temperature: ScoreValueListType,
  ): ScoreDataModel {
    const newModel = new ScoreDataModel();

    newModel.timestamp = this.timestamp.concat(timestamp);
    newModel.derangement = this.derangement.concat(derangement);
    newModel.bloodPressure = this.bloodPressure.concat(bloodPressure);
    newModel.electrocardiogram = this.electrocardiogram.concat(electrocardiogram);
    newModel.oxygenSaturation = this.oxygenSaturation.concat(oxygenSaturation);
    newModel.respiratoryRate = this.respiratoryRate.concat(respiratoryRate);
    newModel.temperature = this.temperature.concat(temperature);

    return newModel;
  }
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
