// @flow

import type { ActionType } from './actionTypes/ActionTypes';

export const UPDATE_CHART_VIEW_RANGE_ACTION = 'UPDATE_CHART_VIEW_RANGE_ACTION';

export type UpdateChartViewRangeActionType = {
  start: number,
  end: number,
} & ActionType;

export const updateChartViewRangeAction = (
  start: number,
  end: number,
): UpdateChartViewRangeActionType => ({
  type: UPDATE_CHART_VIEW_RANGE_ACTION,
  start,
  end,
});
