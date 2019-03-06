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
import s from './BackgroundVariablesPane.css';
import {
  DataInputModalDisplayNames,
  EMPTY_VALUE_STRING,
  SELECT_SEX_HINT,
} from '../../constants/DisplayConstants';

// Sub-component names used for testing
export const BackgroundVariablesPaneComponentNames = {
  AGE_DISPLAY_BOX: 'BVP_AGE_DISPLAY_BOX',
  HEIGHT_DISPLAY_BOX: 'BVP_HEIGHT_DISPLAY_BOX',
  WEIGHT_DISPLAY_BOX: 'BVP_WEIGHT_DISPLAY_BOX',
  SEX_DISPLAY_BOX: 'BVP_SEX_DISPLAY_BOX',
};

type BackgroundVariablesPaneBoundPropTypes = {
  age: number,
  height: number,
  weight: number,
  sex: string,
};

type BackgroundVariablesPanePropTypes = BackgroundVariablesPaneBoundPropTypes;

/**
 * Pane to show the current background variables being used in the system.
 */
class BackgroundVariablesPane extends React.Component<BackgroundVariablesPanePropTypes> {
  static propTypes = {
    age: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    sex: PropTypes.string.isRequired,
  };

  static mapStateToProps = (state: any): BackgroundVariablesPaneBoundPropTypes => ({
    age: state.backgroundVariablesReducer.age,
    height: state.backgroundVariablesReducer.height,
    weight: state.backgroundVariablesReducer.weight,
    sex: state.backgroundVariablesReducer.sex,
  });

  render() {
    const displaySex = this.props.sex === SELECT_SEX_HINT ? EMPTY_VALUE_STRING : this.props.sex;
    const displayAge = this.props.age === -1 ? EMPTY_VALUE_STRING : this.props.age.toFixed(0);
    const displayHeight =
      this.props.height === -1 ? EMPTY_VALUE_STRING : this.props.height.toFixed(0);
    const displayWeight =
      this.props.weight === -1 ? EMPTY_VALUE_STRING : this.props.weight.toFixed(0);

    return (
      <div className={s.main}>
        <div className={s.item}>
          <div className={s.itemName}>{DataInputModalDisplayNames.AGE}</div>
          <div id={BackgroundVariablesPaneComponentNames.AGE_DISPLAY_BOX} className={s.itemValue}>
            {displayAge}
          </div>
        </div>
        <div className={s.item}>
          <div className={s.itemName}>{DataInputModalDisplayNames.HEIGHT}</div>
          <div
            id={BackgroundVariablesPaneComponentNames.HEIGHT_DISPLAY_BOX}
            className={s.itemValue}
          >
            {displayHeight}
          </div>
        </div>
        <div className={s.item}>
          <div className={s.itemName}>{DataInputModalDisplayNames.WEIGHT}</div>
          <div
            id={BackgroundVariablesPaneComponentNames.WEIGHT_DISPLAY_BOX}
            className={s.itemValue}
          >
            {displayWeight}
          </div>
        </div>
        <div className={s.item}>
          <div className={s.itemName}>{DataInputModalDisplayNames.SEX}</div>
          <div id={BackgroundVariablesPaneComponentNames.SEX_DISPLAY_BOX} className={s.itemValue}>
            {displaySex}
          </div>
        </div>
      </div>
    );
  }
}

// Unconnected component for testing purposes
export const UnconnectedBackgroundVariablesPane = BackgroundVariablesPane;

const ConnectedBackgroundVariablesPane = connect(BackgroundVariablesPane.mapStateToProps)(
  BackgroundVariablesPane,
);

export default withStyles(s)(ConnectedBackgroundVariablesPane);
