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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ChartTitles } from '../../constants/DisplayConstants';

// eslint-disable-next-line css-modules/no-unused-class
import s from './DerangementScoreChart.css';
import Chart from '../Chart/Chart';
import ChartDataModel from '../../data/reduxModels/ChartDataModel';

type DerangementScoreChartBoundPropTypes = {
  chartData: ChartDataModel,
};

type DerangementScoreChartPropTypes = DerangementScoreChartBoundPropTypes;

/**
 * The main chart for the application. Shows the derangement score that is calculated
 * and stored in the DB. This chart has independent sizing and functionality from the
 * other chart types.
 */
class DerangementScoreChart extends React.Component<DerangementScoreChartPropTypes> {
  static propTypes = {
    chartData: PropTypes.instanceOf(ChartDataModel).isRequired,
  };

  static mapStateToProps = (
    state: any,
  ): DerangementScoreChartBoundPropTypes => ({
    chartData: state.chartDataReducer.derangementScore,
  });

  chartStyle = () => ({
    height: '100%',
    width: '100%',
  });

  render() {
    return (
      <div className={s.main}>
        <Chart
          type="line"
          title={ChartTitles.DERANGEMENT_SCORE}
          chartData={this.props.chartData}
          overrideStyles={s.chart}
          overrideChartStyle={this.chartStyle}
        />
      </div>
    );
  }
}

const ConnectedDerangementScoreChartContainer = connect(
  DerangementScoreChart.mapStateToProps,
)(DerangementScoreChart);

export default withStyles(s)(ConnectedDerangementScoreChartContainer);
