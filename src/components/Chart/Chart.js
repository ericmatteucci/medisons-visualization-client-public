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
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// eslint-disable-next-line css-modules/no-unused-class
import s from './Chart.css';
import ChartDataModel from '../../data/models/ChartDataModel';
import TimeUtilities from '../../lib/TimeUtilities';
import { CHART_GROUP } from '../../constants/ValueConstants';
import { updateChartViewRangeAction } from '../../actions/ChartActions';
import type { DispatchFunctionType } from '../../actions/actionTypes/ActionTypes';

type ChartBoundPropsType = {
  viewStart: number,
  viewEnd: number,
};

type ChartConnectedPropsType = {
  dispatch: DispatchFunctionType,
};

type ChartInjectedPropsType = {
  type: string,
  chartData: ChartDataModel,
  showSlider: boolean,
  overrideStyles: ?string,
  overrideChartStyle: ?Function,
};

type ChartPropsType = ChartBoundPropsType & ChartConnectedPropsType & ChartInjectedPropsType;

class Chart extends React.Component<ChartPropsType> {
  static propTypes = {
    type: PropTypes.string.isRequired,
    chartData: PropTypes.instanceOf(ChartDataModel).isRequired,
    showSlider: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    viewStart: PropTypes.number.isRequired,
    viewEnd: PropTypes.number.isRequired,
    overrideStyles: PropTypes.string,
    overrideChartStyle: PropTypes.func,
  };

  static defaultProps = {
    overrideStyles: null,
    overrideChartStyle: null,
  };

  static mapStateToProps = (state: any): ChartBoundPropsType => ({
    viewStart: state.chartViewRangeReducer.start,
    viewEnd: state.chartViewRangeReducer.end,
  });

  componentDidMount() {
    if (this._initialChartRender) {
      // This allows us to connect the charts together so
      // they can be zoomed and panned in unison.
      const chart = this._chartRef.current.getEchartsInstance();
      chart.group = CHART_GROUP;
      this._initialChartRender = false;

      chart.on('dataZoom', e => {
        this.props.dispatch(updateChartViewRangeAction(e.start, e.end));
      });
    }
  }

  shouldComponentUpdate(nextProps: ChartPropsType) {
    return this.props.chartData !== nextProps.chartData;
  }

  /**
   * Get the chart options for the chart object.
   * @private
   */
  _getChartOptions = (): Object => ({
    tooltip: {},
    xAxis: {
      data: this.props.chartData.getDomainValues(),
      axisLabel: {
        formatter: TimeUtilities.epochToLocalDate,
      },
    },
    yAxis: {},
    dataZoom: [
      {
        type: 'slider',
        show: this.props.showSlider,
        labelFormatter: TimeUtilities.epochToLocalDate,
      },
      {
        type: 'inside',
        zoomOnMouseWheel: false,
        start: this.props.viewStart,
        end: this.props.viewEnd,
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
const ConnectedChart = connect(Chart.mapStateToProps)(Chart);

export default withStyles(s)(ConnectedChart);
