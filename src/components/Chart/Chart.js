// @flow
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// eslint-disable-next-line css-modules/no-unused-class
import s from './Chart.css';
import ChartDataModel from '../../data/models/ChartDataModel';
import TimeUtilities from '../../lib/TimeUtilities';
import {
  CHART_GROUP,
  DEFAULT_CHART_VIEW_END,
  DEFAULT_CHART_VIEW_START,
} from '../../constants/ValueConstants';

type ChartInjectedPropsType = {
  type: string,
  chartData: ChartDataModel,
  showSlider: boolean,
  overrideStyles: ?string,
  overrideChartStyle: ?Function,
};

type ChartPropsType = ChartInjectedPropsType;

class Chart extends React.Component<ChartPropsType> {
  static propTypes = {
    type: PropTypes.string.isRequired,
    chartData: PropTypes.instanceOf(ChartDataModel).isRequired,
    showSlider: PropTypes.bool.isRequired,
    overrideStyles: PropTypes.string,
    overrideChartStyle: PropTypes.func,
  };

  static defaultProps = {
    overrideStyles: null,
    overrideChartStyle: null,
  };

  static chartLabelFormatter(index: number, value: number) {
    return TimeUtilities.epochToLocalDate(value);
  }

  static chartTooltipFormatter(params: Array<Object>) {
    if (params[0].value) {
      return `${TimeUtilities.epochToLocalDate(params[0].name)} - ${params[0].value.toFixed(2)}`;
    }
    return TimeUtilities.epochToLocalDate(params[0].name);
  }

  componentDidMount() {
    if (this._initialChartRender) {
      // This allows us to connect the charts together so
      // they can be zoomed and panned in unison.
      const chart = this._chartRef.current.getEchartsInstance();
      chart.group = CHART_GROUP;
      this._initialChartRender = false;
    }
  }

  shouldComponentUpdate(nextProps: ChartPropsType) {
    if (this.props.chartData !== nextProps.chartData) {
      const chart = this._chartRef.current.getEchartsInstance();

      chart.setOption({
        series: [
          {
            data: this.props.chartData.getData(),
          },
        ],
        xAxis: [
          {
            data: this.props.chartData.getDomainValues(),
          },
        ],
      });
    }

    return false;
  }

  /**
   * Get the chart options for the chart object.
   * @private
   */
  _getChartOptions = (): Object => ({
    tooltip: {
      trigger: 'axis',
      formatter: Chart.chartTooltipFormatter,
    },
    xAxis: [
      {
        data: this.props.chartData.getDomainValues(),
        axisLabel: {
          formatter: TimeUtilities.epochToLocalDate,
        },
      },
    ],
    yAxis: {},
    dataZoom: [
      {
        type: 'slider',
        show: this.props.showSlider,
        start: DEFAULT_CHART_VIEW_START,
        end: DEFAULT_CHART_VIEW_END,
        labelFormatter: Chart.chartLabelFormatter,
      },
      {
        type: 'inside',
        zoomOnMouseWheel: false,
        start: DEFAULT_CHART_VIEW_START,
        end: DEFAULT_CHART_VIEW_END,
      },
    ],
    series: [
      {
        type: this.props.type,
        data: this.props.chartData.getData(),
      },
    ],
  });

  _getDefaultChartStyle = (): Object => ({
    height: '100%',
  });

  // Local state variable to track if the chart has been initialized
  _initialChartRender = true;

  // The ref for this chart
  _chartRef = React.createRef();

  render() {
    return (
      <div className={this.props.overrideStyles ? this.props.overrideStyles : s.main}>
        <ReactEcharts
          ref={this._chartRef}
          option={this._getChartOptions()}
          notMerge
          lazyUpdate
          theme="theme_name"
          onChartReady={() => null}
          style={
            this.props.overrideChartStyle
              ? this.props.overrideChartStyle()
              : this._getDefaultChartStyle()
          }
        />
      </div>
    );
  }
}

export default withStyles(s)(Chart);
