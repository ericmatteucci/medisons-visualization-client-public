// @flow

export type ChartDataType = Array<number>;
export type ChartDomainValuesType = Array<number>;

/**
 * The ChartDataModel model. This object contains information for domain series data, most
 * likely time-series data consisting of time points.
 */
export default class ChartDataModel {
  data: ChartDataType = [];
  domainValues: ChartDomainValuesType = [];

  /**
   * Creates a new ChartDataModel and assigns the values of
   * data and domainValues to the arguments.
   * Mostly for testing.
   * @param newData The new data.
   * @param newDomainValues The new domainValues.
   * @returns {ChartDataModel} An assigned ChartDataModel. If the array arguments
   * are of uneven size, returns an empty ChartDataModel.
   */
  static create = (
    newData: ChartDataType,
    newDomainValues: ChartDomainValuesType,
  ): ChartDataModel => {
    const ret = new ChartDataModel();
    const arraySizeFlag = newData.length === newDomainValues.length;

    ret.data = arraySizeFlag ? newData.slice() : [];
    ret.domainValues = arraySizeFlag ? newDomainValues.slice() : [];

    return ret;
  };

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
