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

// eslint-disable-next-line css-modules/no-unused-class
import s from './DerangementScoreChart.css';
import Chart from '../Chart/Chart';
import ChartDataModel from '../../data/models/ChartDataModel';
import {
  derangementScoreSelector,
  latestDerangementScoreSelector,
} from '../../selectors/ScoreDataSelector';
import { NO_SCORE_VALUE } from '../../constants/ValueConstants';
import { EMPTY_VALUE_STRING } from '../../constants/DisplayConstants';

type DerangementScoreChartBoundPropTypes = {
  chartData: ChartDataModel,
  latestScore: number,
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
    latestScore: PropTypes.number.isRequired,
  };

  static mapStateToProps = (state: any): DerangementScoreChartBoundPropTypes => ({
    chartData: derangementScoreSelector(state),
    latestScore: latestDerangementScoreSelector(state),
  });

  render() {
    const latestScore =
      this.props.latestScore === NO_SCORE_VALUE
        ? EMPTY_VALUE_STRING
        : this.props.latestScore.toFixed(2);

    return (
      <div className={s.main}>
        <p className={s.latestScore}>{latestScore}</p>
        <Chart type="line" chartData={[this.props.chartData]} overrideStyles={s.chart} />
      </div>
    );
  }
}

const ConnectedDerangementScoreChartContainer = connect(DerangementScoreChart.mapStateToProps)(
  DerangementScoreChart,
);

export default withStyles(s)(ConnectedDerangementScoreChartContainer);
