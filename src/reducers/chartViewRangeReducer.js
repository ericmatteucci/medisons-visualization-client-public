// @flow

import newState from '../lib/NewState';
import ChartViewRangeModel from '../data/reduxModels/ChartViewRangeModel';
import type { UpdateChartViewRangeActionType } from '../actions/ChartActions';
import { UPDATE_CHART_VIEW_RANGE_ACTION } from '../actions/ChartActions';

/**
 * Reducer for setting the view range for the charts.
 * @param state The current state.
 * @param action The incoming action.
 * @returns {DataInputModalModel} The current or a new state.
 */
const chartViewRangeReducer = (
  state: ChartViewRangeModel = new ChartViewRangeModel(),
  action: UpdateChartViewRangeActionType,
): ChartViewRangeModel => {
  if (
    action.type === UPDATE_CHART_VIEW_RANGE_ACTION &&
    action.start !== undefined &&
    action.end !== undefined &&
    action.start !== null &&
    action.end !== null
  ) {
    return newState(state, {
      start: action.start,
      end: action.end,
    });
  }

  // If this is the wrong action, or nothing has changed, return current state
  return state;
};

export default chartViewRangeReducer;
