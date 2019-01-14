// @flow

export type ChartDataType = Array<number>;
export type ChartDomainValuesType = Array<number>;
export type ChartIdentifierType = string;

/**
 * The ChartDataModel model. This object contains information for domain series data, most
 * likely time-series data consisting of time points.
 */
export default class ChartDataModel {
  data: ChartDataType = [];
  domainValues: ChartDomainValuesType = [];

  /**
   * Gets the data for this series.
   * @returns {Array<number>} The data array.
   */
  getData = (): ChartDataType => this.data;

  /**
   * Gets the domain values for this series.
   * @returns {ChartDomainValuesType}
   */
  getDomainValues = (): ChartDomainValuesType => this.domainValues;
}
