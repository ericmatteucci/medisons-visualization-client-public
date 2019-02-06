// @flow

import CompositeChartDataModel from '../data/reduxModels/CompositeChartDataModel';
import ChartDataModel from '../data/reduxModels/ChartDataModel';
import newState from '../lib/NewState';
import type { UpdateChartDataActionType } from '../actions/ChartActions';
import {
  UPDATE_DERANGEMENT_SCORE_CHART_ACTION,
  UPDATE_OXYGEN_SATURATION_CHART_ACTION,
} from '../actions/ChartActions';

const derangementScore = (
  state: ChartDataModel = new ChartDataModel(),
  action: UpdateChartDataActionType,
): ChartDataModel => {
  if (
    action.type === UPDATE_DERANGEMENT_SCORE_CHART_ACTION &&
    action.data.length === action.domainValues.length
  ) {
    return newState(state, {
      data: action.data,
      domainValues: action.domainValues,
    });
  }

  // not the right action or the arrays are of unequal size, so return the current state
  return state;
};

const oxygenSaturation = (
  state: ChartDataModel = new ChartDataModel(),
  action: UpdateChartDataActionType,
): ChartDataModel => {
  if (
    action.type === UPDATE_OXYGEN_SATURATION_CHART_ACTION &&
    action.data.length === action.domainValues.length
  ) {
    return newState(state, {
      data: action.data,
      domainValues: action.domainValues,
    });
  }

  // not the right action or the arrays are of unequal size, so return the current state
  return state;
};

/**
 * This is the main chart data reducer. Since we currently get a single set
 * of data per call, one reducer will be required per data type.
 * @param state
 * @param action
 * @returns {CompositeChartDataModel}
 */
const chartDataReducer = (
  state: CompositeChartDataModel = new CompositeChartDataModel(),
  action: UpdateChartDataActionType,
): CompositeChartDataModel =>
  newState(state, {
    derangementScore: derangementScore(state.derangementScore, action),
    oxygenSaturation: oxygenSaturation(state.oxygenSaturation, action),
  });

export default chartDataReducer;
