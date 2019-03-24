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
import Chart from '../Chart/Chart';
import {
  bloodPressureScoreSelector,
  electrocardiogramScoreSelector,
  oxygenSaturationScoreSelector,
  respiratoryRateScoreSelector,
  temperatureScoreSelector,
} from '../../selectors/ScoreDataSelector';

type ChartPaneBoundPropsType = {
  bloodPressureChartData: ChartDataModel,
  electrocardiogramChartData: ChartDataModel,
  oxygenSaturationChartData: ChartDataModel,
  respiratoryRateChartData: ChartDataModel,
  temperatureChartData: ChartDataModel,
};

type ChartPanePropTypes = ChartPaneBoundPropsType;

class ChartPane extends React.Component<ChartPanePropTypes> {
  static propTypes = {
    bloodPressureChartData: PropTypes.instanceOf(ChartDataModel).isRequired,
    electrocardiogramChartData: PropTypes.instanceOf(ChartDataModel).isRequired,
    oxygenSaturationChartData: PropTypes.instanceOf(ChartDataModel).isRequired,
    respiratoryRateChartData: PropTypes.instanceOf(ChartDataModel).isRequired,
    temperatureChartData: PropTypes.instanceOf(ChartDataModel).isRequired,
  };

  static mapStateToProps = (state: ReduxStateType): ChartPaneBoundPropsType => ({
    bloodPressureChartData: bloodPressureScoreSelector(state),
    electrocardiogramChartData: electrocardiogramScoreSelector(state),
    oxygenSaturationChartData: oxygenSaturationScoreSelector(state),
    respiratoryRateChartData: respiratoryRateScoreSelector(state),
    temperatureChartData: temperatureScoreSelector(state),
  });

  render() {
    return (
      <div className={s.main}>
        <Chart type="line" chartData={this.props.bloodPressureChartData} showSlider={false} />
        <Chart type="line" chartData={this.props.electrocardiogramChartData} showSlider={false} />
        <Chart type="line" chartData={this.props.oxygenSaturationChartData} showSlider={false} />
        <Chart type="line" chartData={this.props.respiratoryRateChartData} showSlider={false} />
        <Chart type="line" chartData={this.props.temperatureChartData} showSlider={false} />
      </div>
    );
  }
}

const ConnectedChartPane = connect(ChartPane.mapStateToProps)(ChartPane);

export default withStyles(s)(ConnectedChartPane);
