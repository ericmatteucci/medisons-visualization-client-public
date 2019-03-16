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
import s from './BackgroundDataPane.css';
import { DataInputModalDisplayNames, EMPTY_VALUE_STRING } from '../../constants/DisplayConstants';
import {
  AGE_DEFAULT_VALUE,
  HEIGHT_DEFAULT_VALUE,
  WEIGHT_DEFAULT_VALUE,
  SEX_DEFAULT_VALUE,
} from '../../constants/ValueConstants';

// Sub-component names used for testing
export const BackgroundDataPaneComponentNames = {
  AGE_DISPLAY_BOX: 'BVP_AGE_DISPLAY_BOX',
  HEIGHT_DISPLAY_BOX: 'BVP_HEIGHT_DISPLAY_BOX',
  WEIGHT_DISPLAY_BOX: 'BVP_WEIGHT_DISPLAY_BOX',
  SEX_DISPLAY_BOX: 'BVP_SEX_DISPLAY_BOX',
};

type BackgroundDataPaneBoundPropTypes = {
  age: number,
  height: number,
  weight: number,
  sex: string,
};

type BackgroundDataPanePropTypes = BackgroundDataPaneBoundPropTypes;

/**
 * Pane to show the current background variables being used in the system.
 */
class BackgroundDataPane extends React.Component<BackgroundDataPanePropTypes> {
  static propTypes = {
    age: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    sex: PropTypes.string.isRequired,
  };

  static mapStateToProps = (state: any): BackgroundDataPaneBoundPropTypes => ({
    age: state.backgroundDataReducer.age,
    height: state.backgroundDataReducer.height,
    weight: state.backgroundDataReducer.weight,
    sex: state.backgroundDataReducer.sex,
  });

  render() {
    const displaySex = this.props.sex === SEX_DEFAULT_VALUE ? EMPTY_VALUE_STRING : this.props.sex;
    const displayAge =
      this.props.age === AGE_DEFAULT_VALUE ? EMPTY_VALUE_STRING : this.props.age.toFixed(0);
    const displayHeight =
      this.props.height === HEIGHT_DEFAULT_VALUE
        ? EMPTY_VALUE_STRING
        : this.props.height.toFixed(0);
    const displayWeight =
      this.props.weight === WEIGHT_DEFAULT_VALUE
        ? EMPTY_VALUE_STRING
        : this.props.weight.toFixed(0);

    return (
      <div className={s.main}>
        <div className={s.item}>
          <div className={s.itemName}>{DataInputModalDisplayNames.AGE}</div>
          <div id={BackgroundDataPaneComponentNames.AGE_DISPLAY_BOX} className={s.itemValue}>
            {displayAge}
          </div>
        </div>
        <div className={s.item}>
          <div className={s.itemName}>{DataInputModalDisplayNames.HEIGHT}</div>
          <div id={BackgroundDataPaneComponentNames.HEIGHT_DISPLAY_BOX} className={s.itemValue}>
            {displayHeight}
          </div>
        </div>
        <div className={s.item}>
          <div className={s.itemName}>{DataInputModalDisplayNames.WEIGHT}</div>
          <div id={BackgroundDataPaneComponentNames.WEIGHT_DISPLAY_BOX} className={s.itemValue}>
            {displayWeight}
          </div>
        </div>
        <div className={s.item}>
          <div className={s.itemName}>{DataInputModalDisplayNames.SEX}</div>
          <div id={BackgroundDataPaneComponentNames.SEX_DISPLAY_BOX} className={s.itemValue}>
            {displaySex}
          </div>
        </div>
      </div>
    );
  }
}

// Unconnected component for testing purposes
export const UnconnectedBackgroundDataPane = BackgroundDataPane;

const ConnectedBackgroundDataPane = connect(BackgroundDataPane.mapStateToProps)(BackgroundDataPane);

export default withStyles(s)(ConnectedBackgroundDataPane);
