// @flow

import { createSelector } from 'reselect';
import type { ScoreTimestampType, ScoreValueListType } from '../data/reduxModels/ScoreDataModel';
import ChartDataModel from '../data/models/ChartDataModel';
import { ScoreDisplayNames } from '../constants/DisplayConstants';

const currentTimestamps = (state: Object): ScoreTimestampType => state.scoreDataReducer.timestamp;

const derangement = (state: Object): ScoreValueListType => state.scoreDataReducer.derangement;

const bloodPressure = (state: Object): ScoreValueListType => state.scoreDataReducer.bloodPressure;

const electrocardiogram = (state: Object): ScoreValueListType =>
  state.scoreDataReducer.electrocardiogram;

const oxygenSaturation = (state: Object): ScoreValueListType =>
  state.scoreDataReducer.electrocardiogram;

const respiratoryRate = (state: Object): ScoreValueListType =>
  state.scoreDataReducer.electrocardiogram;

const temperature = (state: Object): ScoreValueListType => state.scoreDataReducer.electrocardiogram;

export class ScoreDataSelector {
  static getLatestTime = (timestamps: ScoreTimestampType): number => {
    if (timestamps !== undefined && timestamps.length !== 0) {
      return Math.max(timestamps);
    }
    return 0;
  };

  static getDerangementChartData = (
    timestamps: ScoreTimestampType,
    derangementData: ScoreValueListType,
  ): ChartDataModel =>
    new ChartDataModel(ScoreDisplayNames.DERANGEMENT, timestamps, derangementData);

  static getBloodPressureChartData = (
    timestamps: ScoreTimestampType,
    bloodPressureData: ScoreValueListType,
  ): ChartDataModel =>
    new ChartDataModel(ScoreDisplayNames.BLOOD_PRESSURE, timestamps, bloodPressureData);

  static getElectrocardiogramChartData = (
    timestamps: ScoreTimestampType,
    electrocardiogramData: ScoreValueListType,
  ): ChartDataModel =>
    new ChartDataModel(ScoreDisplayNames.ELECTROCARDIOGRAM, timestamps, electrocardiogramData);

  static getOxygenSaturationChartData = (
    timestamps: ScoreTimestampType,
    oxygenSaturationData: ScoreValueListType,
  ): ChartDataModel =>
    new ChartDataModel(ScoreDisplayNames.OXYGEN_SATURATION, timestamps, oxygenSaturationData);

  static getRespiratoryRateChartData = (
    timestamps: ScoreTimestampType,
    respiratoryRateData: ScoreValueListType,
  ): ChartDataModel =>
    new ChartDataModel(ScoreDisplayNames.RESPIRATORY_RATE, timestamps, respiratoryRateData);

  static getTemperatureChartData = (
    timestamps: ScoreTimestampType,
    temperatureData: ScoreValueListType,
  ): ChartDataModel =>
    new ChartDataModel(ScoreDisplayNames.TEMPERATURE, timestamps, temperatureData);
}

export const latestScoreTimeSelector = createSelector(
  [currentTimestamps],
  ScoreDataSelector.getLatestTime,
);

export const derangementScoreSelector = createSelector(
  [currentTimestamps, derangement],
  ScoreDataSelector.getDerangementChartData,
);

export const bloodPressureScoreSelector = createSelector(
  [currentTimestamps, bloodPressure],
  ScoreDataSelector.getBloodPressureChartData,
);

export const electrocardiogramScoreSelector = createSelector(
  [currentTimestamps, electrocardiogram],
  ScoreDataSelector.getElectrocardiogramChartData,
);

export const oxygenSaturationScoreSelector = createSelector(
  [currentTimestamps, oxygenSaturation],
  ScoreDataSelector.getOxygenSaturationChartData,
);

export const respiratoryRateScoreSelector = createSelector(
  [currentTimestamps, respiratoryRate],
  ScoreDataSelector.getRespiratoryRateChartData,
);

export const temperatureScoreSelector = createSelector(
  [currentTimestamps, temperature],
  ScoreDataSelector.getTemperatureChartData,
);
