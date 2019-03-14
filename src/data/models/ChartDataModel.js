// @flow

import type {
  SignalNameType,
  SignalDataType,
  SignalDomainValuesType,
} from '../reduxModels/SignalDataModel';

/**
 * The ChartDataModel. This object contains information for domain series data, most
 * likely time-series data consisting of time points.
 */
export default class ChartDataModel {
  name: SignalNameType = '';
  data: SignalDataType = [];
  domainValues: SignalDomainValuesType = [];

  constructor(name: SignalNameType, domainValues: SignalDomainValuesType, data: SignalDataType) {
    this.name = name;
    this.data = data;
    this.domainValues = domainValues;
  }

  getName = (): SignalNameType => this.name;

  getData = (): SignalDataType => this.data;

  getDomainValues = (): SignalDomainValuesType => this.domainValues;
}
