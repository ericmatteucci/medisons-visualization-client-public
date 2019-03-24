// @flow

import { DEFAULT_CHART_VIEW_END, DEFAULT_CHART_VIEW_START } from '../../constants/ValueConstants';

/**
 * This data model determines the viewable range on the charts.
 */
export default class ChartViewRangeModel {
  start: number = DEFAULT_CHART_VIEW_START;
  end: number = DEFAULT_CHART_VIEW_END;
}
