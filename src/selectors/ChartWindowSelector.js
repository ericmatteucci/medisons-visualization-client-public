// @flow

import { createSelector } from 'reselect';
import type {
  SignalNameType,
  SignalDataType,
  SignalDomainValuesType,
  SignalFrequencyType,
} from '../data/reduxModels/SignalDataModel';
import SignalDataModel from '../data/reduxModels/SignalDataModel';
import {
  bloodPressureDomainValuesSelector,
  electrocardiogramDomainValuesSelector,
  oxygenSaturationDomainValuesSelector,
  derangementScoreDomainValuesSelector,
} from './SignalDomainValueSelector';
import { CHART_WINDOW_SIZE } from '../constants/ValueConstants';
import ChartDataModel from '../data/models/ChartDataModel';

const bloodPressureState = (state: Object): SignalDataModel =>
  state.signalDataReducer.bloodPressure;

const electrocardiogramState = (state: Object): SignalDataModel =>
  state.signalDataReducer.electrocardiogram;

const oxygenSaturationState = (state: Object): SignalDataModel =>
  state.signalDataReducer.oxygenSaturation;

const derangementScoreState = (state: Object): SignalDataModel =>
  state.signalDataReducer.derangementScore;

export class ChartWindowSelector {
  static createChartDataWindow = (
    name: SignalNameType,
    frequency: SignalFrequencyType,
    data: SignalDataType,
    domainValues: SignalDomainValuesType,
  ): ChartDataModel => {
    if (frequency > 0) {
      const numberOfSamples = CHART_WINDOW_SIZE / frequency;

      const end = data.length;
      const start = end - numberOfSamples > 0 ? end - numberOfSamples : 0;

      return new ChartDataModel(name, data.slice(start, end), domainValues.slice(start, end));
    }

    return new ChartDataModel(name, [], []);
  };

  static bloodPressureChartWindowSelectorFcn = (
    bloodPressureSignalData: SignalDataModel,
    bloodPressureDomainValues: SignalDomainValuesType,
  ): ChartDataModel =>
    ChartWindowSelector.createChartDataWindow(
      bloodPressureSignalData.name,
      bloodPressureSignalData.frequency,
      bloodPressureSignalData.data,
      bloodPressureDomainValues,
    );

  static electrocardiogramChartWindowSelectorFcn = (
    electrocardiogramSignalData: SignalDataModel,
    electrocardiogramDomainValues: SignalDomainValuesType,
  ): ChartDataModel =>
    ChartWindowSelector.createChartDataWindow(
      electrocardiogramSignalData.name,
      electrocardiogramSignalData.frequency,
      electrocardiogramSignalData.data,
      electrocardiogramDomainValues,
    );

  static oxygenSaturationChartWindowSelectorFcn = (
    oxygenSaturationSignalData: SignalDataModel,
    oxygenSaturationDomainValues: SignalDomainValuesType,
  ): ChartDataModel =>
    ChartWindowSelector.createChartDataWindow(
      oxygenSaturationSignalData.name,
      oxygenSaturationSignalData.frequency,
      oxygenSaturationSignalData.data,
      oxygenSaturationDomainValues,
    );

  static derangementScoreChartWindowSelectorFcn = (
    derangementScoreSignalData: SignalDataModel,
    derangementScoreDomainValues: SignalDomainValuesType,
  ): ChartDataModel =>
    ChartWindowSelector.createChartDataWindow(
      derangementScoreSignalData.name,
      derangementScoreSignalData.frequency,
      derangementScoreSignalData.data,
      derangementScoreDomainValues,
    );
}

// Selectors for the vitals data
export const bloodPressureChartWindowSelector = createSelector(
  [bloodPressureState, bloodPressureDomainValuesSelector],
  ChartWindowSelector.bloodPressureChartWindowSelectorFcn,
);

export const electrocardiogramChartWindowSelector = createSelector(
  [electrocardiogramState, electrocardiogramDomainValuesSelector],
  ChartWindowSelector.electrocardiogramChartWindowSelectorFcn,
);

export const oxygenSaturationChartWindowSelector = createSelector(
  [oxygenSaturationState, oxygenSaturationDomainValuesSelector],
  ChartWindowSelector.oxygenSaturationChartWindowSelectorFcn,
);

// Selector for the derangement score
export const derangementScoreChartWindowSelector = createSelector(
  [derangementScoreState, derangementScoreDomainValuesSelector],
  ChartWindowSelector.derangementScoreChartWindowSelectorFcn,
);
