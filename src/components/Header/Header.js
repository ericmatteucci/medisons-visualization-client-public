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
import s from './Header.css';
import DataInputModal from '../DataInputModal/DataInputModal';

type HeaderPropTypes = {};

class Header extends React.Component<HeaderPropTypes> {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.banner}>
            <h1 className={s.bannerTitle}>MediSons</h1>
            <p className={s.bannerDesc}>PhysioRange</p>
          </div>
          <DataInputModal />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
