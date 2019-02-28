// @flow

import SignalDataModel from './SignalDataModel';

/**
 * This list defines the chart data that we request through calls
 * to the Database Manager. Note that this model is best suited for periodic
 * calls to the DB and is not as suited for realtime updates.
 */
export default class CompositeSignalDataModel {
  derangementScore: SignalDataModel = new SignalDataModel();
  oxygenSaturation: SignalDataModel = new SignalDataModel();
  electrocardiogram: SignalDataModel = new SignalDataModel();
  bloodPressure: SignalDataModel = new SignalDataModel();
}
