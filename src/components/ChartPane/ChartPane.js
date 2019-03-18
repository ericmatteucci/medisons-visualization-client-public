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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import type { ReduxStateType } from '../../reducers/ReduxStateType';

// eslint-disable-next-line css-modules/no-unused-class
import s from './ChartPane.css';
import ChartDataModel from '../../data/models/ChartDataModel';
import { ScoreDisplayNames } from '../../constants/DisplayConstants';
import Chart from '../Chart/Chart';
import {
  bloodPressureScoreSelector,
  electrocardiogramScoreSelector,
  oxygenSaturationScoreSelector,
} from '../../selectors/ScoreDataSelector';

type ChartPaneBoundPropsType = {
  bloodPressureChartData: ChartDataModel,
  electrocardiogramChartData: ChartDataModel,
  oxygenSaturationChartData: ChartDataModel,
};

type ChartPanePropTypes = ChartPaneBoundPropsType;

class ChartPane extends React.Component<ChartPanePropTypes> {
  static propTypes = {
    bloodPressureChartData: PropTypes.instanceOf(ChartDataModel).isRequired,
    electrocardiogramChartData: PropTypes.instanceOf(ChartDataModel).isRequired,
    oxygenSaturationChartData: PropTypes.instanceOf(ChartDataModel).isRequired,
  };

  static mapStateToProps = (state: ReduxStateType): ChartPaneBoundPropsType => ({
    bloodPressureChartData: bloodPressureScoreSelector(state),
    electrocardiogramChartData: electrocardiogramScoreSelector(state),
    oxygenSaturationChartData: oxygenSaturationScoreSelector(state),
  });

  render() {
    return (
      <div className={s.main}>
        <div className={s.column}>
          <div className={s.chart}>
            <Chart
              type="line"
              title={ScoreDisplayNames.BP}
              chartData={this.props.bloodPressureChartData}
            />
          </div>
          <div className={s.chart}>
            <Chart
              type="line"
              title={ScoreDisplayNames.ECG}
              chartData={this.props.electrocardiogramChartData}
            />
          </div>
        </div>
        <div className={s.column}>
          <div className={s.chart}>
            <Chart
              type="line"
              title={ScoreDisplayNames.SPO2}
              chartData={this.props.oxygenSaturationChartData}
            />
          </div>
        </div>
      </div>
    );
  }
}

const ConnectedChartPane = connect(ChartPane.mapStateToProps)(ChartPane);

export default withStyles(s)(ConnectedChartPane);
