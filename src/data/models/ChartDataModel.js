// @flow

import type { ScoreValueListType, ScoreTimestampType } from '../reduxModels/ScoreDataModel';

export type ChartNameType = string;
/**
 * The ChartDataModel. This object contains information for domain series data, most
 * likely time-series data consisting of time points.
 */
export default class ChartDataModel {
  name: ChartNameType = '';
  data: ScoreValueListType = [];
  domainValues: ScoreTimestampType = [];

  constructor(name: ChartNameType, domainValues: ScoreTimestampType, data: ScoreValueListType) {
    this.name = name;
    this.data = data;
    this.domainValues = domainValues;
  }

  getName = (): ChartNameType => this.name;

  getData = (): ScoreValueListType => this.data;

  getDomainValues = (): ScoreTimestampType => this.domainValues;
}
