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

// eslint-disable-next-line css-modules/no-unused-class
import s from './VitalsChartPane.css';
import ChartDataModel from '../../data/reduxModels/ChartDataModel';
import Chart from '../Chart/Chart';

type VitalsChartBoundPropsType = {
  oxygenSaturationChartData: ChartDataModel,
};

type VitalsChartPanePropTypes = VitalsChartBoundPropsType;

class VitalsChartPane extends React.Component<VitalsChartPanePropTypes> {
  static propTypes = {
    oxygenSaturationChartData: PropTypes.instanceOf(ChartDataModel).isRequired,
  };

  static mapStateToProps = (state: Object): VitalsChartBoundPropsType => ({
    oxygenSaturationChartData: state.chartDataReducer.oxygenSaturation,
  });

  render() {
    return (
      <div className={s.main}>
        <Chart
          type="line"
          title="Oxygen Saturation"
          chartData={this.props.oxygenSaturationChartData}
        />
      </div>
    );
  }
}

const ConnectedVitalsChartPane = connect(VitalsChartPane.mapStateToProps)(
  VitalsChartPane,
);

export default withStyles(s)(ConnectedVitalsChartPane);
