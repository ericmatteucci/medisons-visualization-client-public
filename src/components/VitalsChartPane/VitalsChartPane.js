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
import s from './VitalsChartPane.css';
import ChartDataModel from '../../data/models/ChartDataModel';
import { SignalDisplayNames } from '../../constants/DisplayConstants';
import Chart from '../Chart/Chart';
import {
  bloodPressureChartWindowSelector,
  electrocardiogramChartWindowSelector,
  oxygenSaturationChartWindowSelector,
} from '../../selectors/ChartWindowSelector';

type VitalsChartBoundPropsType = {
  bloodPressureChartData: ChartDataModel,
  electrocardiogramChartData: ChartDataModel,
  oxygenSaturationChartData: ChartDataModel,
};

type VitalsChartPanePropTypes = VitalsChartBoundPropsType;

class VitalsChartPane extends React.Component<VitalsChartPanePropTypes> {
  static propTypes = {
    bloodPressureChartData: PropTypes.instanceOf(ChartDataModel).isRequired,
    electrocardiogramChartData: PropTypes.instanceOf(ChartDataModel).isRequired,
    oxygenSaturationChartData: PropTypes.instanceOf(ChartDataModel).isRequired,
  };

  static mapStateToProps = (state: ReduxStateType): VitalsChartBoundPropsType => ({
    bloodPressureChartData: bloodPressureChartWindowSelector(state),
    electrocardiogramChartData: electrocardiogramChartWindowSelector(state),
    oxygenSaturationChartData: oxygenSaturationChartWindowSelector(state),
  });

  render() {
    return (
      <div className={s.main}>
        <div className={s.column}>
          <div className={s.chart}>
            <Chart
              type="line"
              title={SignalDisplayNames.BP}
              chartData={this.props.bloodPressureChartData}
            />
          </div>
          <div className={s.chart}>
            <Chart
              type="line"
              title={SignalDisplayNames.ECG}
              chartData={this.props.electrocardiogramChartData}
            />
          </div>
        </div>
        <div className={s.column}>
          <div className={s.chart}>
            <Chart
              type="line"
              title={SignalDisplayNames.SPO2}
              chartData={this.props.oxygenSaturationChartData}
            />
          </div>
        </div>
      </div>
    );
  }
}

const ConnectedVitalsChartPane = connect(VitalsChartPane.mapStateToProps)(VitalsChartPane);

export default withStyles(s)(ConnectedVitalsChartPane);
