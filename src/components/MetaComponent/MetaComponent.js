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
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// eslint-disable-next-line css-modules/no-unused-class
import s from './MetaComponent.css';
import VitalsChartPane from '../VitalsChartPane/VitalsChartPane';
import DerangementScoreChart from '../DerangementScoreChart/DerangementScoreChart';

type MetaComponentPropsType = {};

class MetaComponent extends React.Component<MetaComponentPropsType> {
  render() {
    return (
      <div className={s.main}>
        <div className={s.scoreChart}>
          <DerangementScoreChart />
        </div>
        <VitalsChartPane />
      </div>
    );
  }
}

export default withStyles(s)(MetaComponent);
