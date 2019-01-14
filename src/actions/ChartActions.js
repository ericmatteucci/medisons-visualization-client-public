// @flow

import type { ActionType } from './actionTypes/ActionTypes';
import type {
  ChartDataType,
  ChartDomainValuesType,
  ChartIdentifierType,
} from '../data/reduxModels/ChartDataModel';

// action.type identifiers for the chart actions
export const UPDATE_DERANGEMENT_SCORE_CHART_ACTION =
  'UPDATE_DERANGEMENT_SCORE_CHART_ACTION';
export const UPDATE_OXYGEN_SATURATION_CHART_ACTION =
  'UPDATE_OXYGEN_SATURATION_CHART_ACTION';

// Chart data action types
export type UpdateChartDataActionType = {
  data: ChartDataType,
  domainValues: ChartDomainValuesType,
  chartId: ChartIdentifierType,
} & ActionType;

// Chart data actions
export const updateDerangementScoreChartAction = (
  chartId: ChartIdentifierType,
  domainValues: ChartDomainValuesType,
  data: ChartDataType,
): UpdateChartDataActionType => ({
  type: UPDATE_DERANGEMENT_SCORE_CHART_ACTION,
  data,
  domainValues,
  chartId,
});

export const updateOxygenSaturationChartAction = (
  chartId: ChartIdentifierType,
  domainValues: ChartDomainValuesType,
  data: ChartDataType,
): UpdateChartDataActionType => ({
  type: UPDATE_OXYGEN_SATURATION_CHART_ACTION,
  data,
  domainValues,
  chartId,
});
