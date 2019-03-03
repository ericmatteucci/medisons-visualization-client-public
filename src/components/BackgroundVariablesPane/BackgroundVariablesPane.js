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
import { DataInputModalDisplayNames } from '../../constants/DisplayConstants';

type BackgroundVariablesPaneBoundPropTypes = {
  age: number,
  height: number,
  weight: number,
  sex: string,
};

type BackgroundVariablesPanePropTypes = BackgroundVariablesPaneBoundPropTypes;

/**
 * Modal to allow for data input into the system.
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
    return (
      <div className={s.main}>
        <div className={s.item}>
          <div className={s.itemName}>{DataInputModalDisplayNames.AGE}</div>
          <div className={s.itemValue}>{this.props.age}</div>
        </div>
        <div className={s.item}>
          <div className={s.itemName}>{DataInputModalDisplayNames.HEIGHT}</div>
          <div className={s.itemValue}>{this.props.height}</div>
        </div>
        <div className={s.item}>
          <div className={s.itemName}>{DataInputModalDisplayNames.WEIGHT}</div>
          <div className={s.itemValue}>{this.props.weight}</div>
        </div>
        <div className={s.item}>
          <div className={s.itemName}>{DataInputModalDisplayNames.SEX}</div>
          <div className={s.itemValue}>{this.props.sex}</div>
        </div>
      </div>
    );
  }
}

const ConnectedBackgroundVariablesPane = connect(BackgroundVariablesPane.mapStateToProps)(
  BackgroundVariablesPane,
);

export default withStyles(s)(ConnectedBackgroundVariablesPane);
