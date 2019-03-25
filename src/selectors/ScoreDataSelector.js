// @flow

import { createSelector } from 'reselect';
import { ScoreDisplayNames } from '../constants/DisplayConstants';
import type { ReduxStateType } from '../reducers/ReduxStateType';
import type { ScoreTimestampType, ScoreValueListType } from '../data/reduxModels/ScoreDataModel';
import ChartDataModel from '../data/models/ChartDataModel';
import { NO_SCORE_VALUE } from '../constants/ValueConstants';

const currentTimestamps = (state: ReduxStateType): ScoreTimestampType =>
  state.compositeScoreDataReducer.scoreData.timestamp;

const derangement = (state: ReduxStateType): ScoreValueListType =>
  state.compositeScoreDataReducer.scoreData.derangement;

const bloodPressure = (state: ReduxStateType): ScoreValueListType =>
  state.compositeScoreDataReducer.scoreData.bloodPressure;

const electrocardiogram = (state: ReduxStateType): ScoreValueListType =>
  state.compositeScoreDataReducer.scoreData.electrocardiogram;

const oxygenSaturation = (state: ReduxStateType): ScoreValueListType =>
  state.compositeScoreDataReducer.scoreData.oxygenSaturation;

const respiratoryRate = (state: ReduxStateType): ScoreValueListType =>
  state.compositeScoreDataReducer.scoreData.respiratoryRate;

const temperature = (state: ReduxStateType): ScoreValueListType =>
  state.compositeScoreDataReducer.scoreData.temperature;

/**
 * Provides methods to couple lists of data values and timestamps.
 */
export class ScoreDataSelector {
  /**
   * Returns the largest timestamp value contained in the ScoreDataModel,
   * as this corresponds to the latest time.
   * @param timestamps All the timestamps in the model
   * @return {number} The latest time value
   */
  static getLatestTime = (timestamps: ScoreTimestampType): number => {
    if (timestamps !== undefined && timestamps.length > 0) {
      return timestamps[timestamps.length - 1];
    }
    return 0;
  };

  /**
   * Get the latest score for the specified data.
   * @param data The data to find the latest score for.
   * @returns {number} The latest score.
   */
  static getLatestScore = (data: ScoreValueListType): number => {
    if (data !== undefined && data.length > 0) {
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i] !== null) {
          return data[i];
        }
      }
    }

    return NO_SCORE_VALUE;
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

export const latestDerangementScoreSelector = createSelector(
  [derangement],
  ScoreDataSelector.getLatestScore,
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
