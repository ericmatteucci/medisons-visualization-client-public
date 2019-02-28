// @flow

export type SignalNameType = string;
export type SignalDataType = Array<number>;
export type SignalTimestampType = number;
export type SignalFrequencyType = number;
export type SignalDomainValuesType = Array<number>;

/**
 * The SignalDataModel model. This object contains information for domain series data, most
 * likely time-series data consisting of time points.
 */
export default class SignalDataModel {
  name: SignalNameType = '';
  data: SignalDataType = [];
  timestamp: SignalTimestampType = -1;
  frequency: SignalFrequencyType = -1;
}
