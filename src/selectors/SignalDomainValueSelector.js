// @flow

import { createSelector } from 'reselect';
import type {
  SignalTimestampType,
  SignalFrequencyType,
  SignalDomainValuesType,
} from '../data/reduxModels/SignalDataModel';
import SignalDataModel from '../data/reduxModels/SignalDataModel';

const bloodPressureState = (state: Object): SignalDataModel =>
  state.signalDataReducer.bloodPressure;

const electrocardiogramState = (state: Object): SignalDataModel =>
  state.signalDataReducer.electrocardiogram;

const oxygenSaturationState = (state: Object): SignalDataModel =>
  state.signalDataReducer.oxygenSaturation;

const derangementScoreState = (state: Object): SignalDataModel =>
  state.signalDataReducer.derangementScore;

export class SignalDomainValueSelector {
  static createDomainValuesArray = (
    timestamp: SignalTimestampType,
    frequency: SignalFrequencyType,
    dataLength: number,
  ): SignalDomainValuesType => {
    const ret = new Array(dataLength);

    for (let i = 0; i < dataLength; i++) {
      ret[i] = timestamp + i * frequency;
    }

    return ret;
  };

  static bloodPressureDomainValuesSelectorFcn = (
    bloodPressureSignalData: SignalDataModel,
  ): SignalDomainValuesType =>
    SignalDomainValueSelector.createDomainValuesArray(
      bloodPressureSignalData.timestamp,
      bloodPressureSignalData.frequency,
      bloodPressureSignalData.data.length,
    );

  static electrocardiogramDomainValuesSelectorFcn = (
    electrocardiogramSignalData: SignalDataModel,
  ): SignalDomainValuesType =>
    SignalDomainValueSelector.createDomainValuesArray(
      electrocardiogramSignalData.timestamp,
      electrocardiogramSignalData.frequency,
      electrocardiogramSignalData.data.length,
    );

  static oxygenSaturationDomainValuesSelectorFcn = (
    oxygenSaturationSignalData: SignalDataModel,
  ): SignalDomainValuesType =>
    SignalDomainValueSelector.createDomainValuesArray(
      oxygenSaturationSignalData.timestamp,
      oxygenSaturationSignalData.frequency,
      oxygenSaturationSignalData.data.length,
    );

  static derangementScoreDomainValuesSelectorFcn = (
    derangementScoreSignalData: SignalDataModel,
  ): SignalDomainValuesType =>
    SignalDomainValueSelector.createDomainValuesArray(
      derangementScoreSignalData.timestamp,
      derangementScoreSignalData.frequency,
      derangementScoreSignalData.data.length,
    );
}

// Selectors for the vitals signals
export const bloodPressureDomainValuesSelector = createSelector(
  [bloodPressureState],
  SignalDomainValueSelector.bloodPressureDomainValuesSelectorFcn,
);

export const electrocardiogramDomainValuesSelector = createSelector(
  [electrocardiogramState],
  SignalDomainValueSelector.electrocardiogramDomainValuesSelectorFcn,
);

export const oxygenSaturationDomainValuesSelector = createSelector(
  [oxygenSaturationState],
  SignalDomainValueSelector.oxygenSaturationDomainValuesSelectorFcn,
);

// Selector for the derangement score
export const derangementScoreDomainValuesSelector = createSelector(
  [derangementScoreState],
  SignalDomainValueSelector.derangementScoreDomainValuesSelectorFcn,
);
