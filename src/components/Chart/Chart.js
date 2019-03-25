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
import getChartOptions from '../../lib/ChartOptions';
import { CHART_GROUP } from '../../constants/ValueConstants';

type ChartInjectedPropsType = {
  type: string,
  chartData: Array<ChartDataModel>,
  overrideStyles: ?string,
  overrideChartStyle: ?Function,
};

type ChartPropsType = ChartInjectedPropsType;

class Chart extends React.Component<ChartPropsType> {
  static propTypes = {
    type: PropTypes.string.isRequired,
    chartData: PropTypes.arrayOf(PropTypes.instanceOf(ChartDataModel)).isRequired,
    overrideStyles: PropTypes.string,
    overrideChartStyle: PropTypes.func,
  };

  static defaultProps = {
    overrideStyles: null,
    overrideChartStyle: null,
  };

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

      const numCharts = nextProps.chartData.length;

      const series = new Array(numCharts);
      const xAxis = new Array(numCharts);

      for (let i = 0; i < numCharts; i++) {
        series[i] = {
          data: nextProps.chartData[i].getData(),
        };

        xAxis[i] = {
          data: nextProps.chartData[i].getDomainValues(),
        };
      }

      chart.setOption({
        series,
        xAxis,
      });
    }

    return false;
  }

  _getDefaultChartStyle = (): Object => ({
    height: '100%',
    width: '100%',
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
          option={getChartOptions(this.props.type, this.props.chartData)}
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
