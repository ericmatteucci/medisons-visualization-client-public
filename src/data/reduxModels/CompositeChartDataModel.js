// @flow

import ChartDataModel from './ChartDataModel';

/**
 * This list defines the chart data that we request through calls
 * to the Database Manager. Note that this model is best suited for periodic
 * calls to the DB and is not as suited for realtime updates.
 */
export default class CompositeChartDataModel {
  derangementScore: ChartDataModel = new ChartDataModel();
  oxygenSaturation: ChartDataModel = new ChartDataModel();
}
