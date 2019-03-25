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
import echarts from 'echarts';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// eslint-disable-next-line css-modules/no-unused-class
import s from './MetaComponent.css';
import ChartPane from '../ChartPane/ChartPane';
import DerangementScoreChart from '../DerangementScoreChart/DerangementScoreChart';
import { CHART_GROUP } from '../../constants/ValueConstants';

type MetaComponentPropsType = {};

class MetaComponent extends React.Component<MetaComponentPropsType> {
  componentDidMount() {
    if (this._initialRender) {
      // This allows for the charts to be connected together such that
      // they are zoomed and panned together.
      echarts.connect(CHART_GROUP);
      this._initialRender = false;
    }
  }

  _initialRender = true;

  render() {
    return (
      <div className={s.main}>
        <div className={s.scoreChart}>
          <DerangementScoreChart />
        </div>
        <ChartPane />
      </div>
    );
  }
}

export default withStyles(s)(MetaComponent);
