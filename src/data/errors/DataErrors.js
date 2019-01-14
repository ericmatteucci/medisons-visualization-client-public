// @flow

export default class MismatchedChartDataError extends Error {
  constructor() {
    super(
      'Attempt to set chart data with mismatched data and domainValues lengths.',
    );
    this.name = 'MismatchedChartDataError';
  }
}
