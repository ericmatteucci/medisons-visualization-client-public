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
import Modal from 'react-responsive-modal';
import { PlusButton } from 'react-svg-buttons';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// eslint-disable-next-line css-modules/no-unused-class
import s from './DataInputModal.css';
import { updateDataInputModalVisibleAction } from '../../actions/DataInputModalActions';
import type { DispatchFunctionType } from '../../actions/actionTypes/ActionTypes';
import { DataInputModalDisplayNames } from '../../constants/DisplayConstants';

type DataInputModalBoundPropTypes = {
  dataInputModalVisible: boolean,
};

type DataInputModalConnectedPropTypes = {
  dispatch: DispatchFunctionType,
};

type DataInputModalPropTypes = DataInputModalBoundPropTypes & DataInputModalConnectedPropTypes;

class DataInputModal extends React.Component<DataInputModalPropTypes> {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    dataInputModalVisible: PropTypes.bool.isRequired,
  };

  static mapStateToProps = (state: any): DataInputModalBoundPropTypes => ({
    dataInputModalVisible: state.dataInputReducer.visible,
  });

  _handleModalOpen = () => {
    this.props.dispatch(updateDataInputModalVisibleAction(true));
  };

  _handleModalClose = () => {
    this.props.dispatch(updateDataInputModalVisibleAction(false));
  };

  render() {
    return (
      <div className={s.main}>
        <PlusButton color="#FFFFFF" thickness={3} onClick={this._handleModalOpen} />
        <Modal open={this.props.dataInputModalVisible} onClose={this._handleModalClose} center>
          <h2>{DataInputModalDisplayNames.TITLE}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus
            hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
          </p>
        </Modal>
      </div>
    );
  }
}

const ConnectedDataInputModal = connect(DataInputModal.mapStateToProps)(DataInputModal);

export default withStyles(s)(ConnectedDataInputModal);
