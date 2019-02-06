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
import ChartDataModel from '../../data/reduxModels/ChartDataModel';

type ChartInjectedPropTypes = {
  type: string,
  title: string,
  chartData: ChartDataModel,
  overrideStyles: ?string,
  overrideChartStyle: ?Function,
};

type ChartPropTypes = ChartInjectedPropTypes;

class Chart extends React.Component<ChartPropTypes> {
  static propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    chartData: PropTypes.instanceOf(ChartDataModel).isRequired,
    overrideStyles: PropTypes.string,
    overrideChartStyle: PropTypes.func,
  };

  static defaultProps = {
    overrideStyles: null,
    overrideChartStyle: null,
  };

  /**
   * Get the chart options for the chart object.
   * @private
   */
  _getChartOptions = (): Object => ({
    title: {
      text: this.props.title,
    },
    tooltip: {},
    xAxis: {
      data: this.props.chartData.getDomainValues(),
    },
    yAxis: {},
    series: [
      {
        type: this.props.type,
        data: this.props.chartData.getData(),
      },
    ],
  });

  _getDefaultChartStyle = (): Object => ({
    position: 'relative',
    height: '50%',
    width: '100%',
  });

  render() {
    return (
      <div
        className={
          this.props.overrideStyles ? this.props.overrideStyles : s.main
        }
      >
        <ReactEcharts
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
