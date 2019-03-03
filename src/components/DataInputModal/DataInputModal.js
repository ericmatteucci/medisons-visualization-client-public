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
import { PlusButton, CloseButton, HoverMorphIcon } from 'react-svg-buttons';
import Select from 'react-select';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// eslint-disable-next-line css-modules/no-unused-class
import s from './DataInputModal.css';
import {
  updateBackgroundVariablesAction,
  updateDataInputModalVisibleAction,
} from '../../actions/DataInputModalActions';
import type { DispatchFunctionType } from '../../actions/actionTypes/ActionTypes';
import { DataInputModalDisplayNames } from '../../constants/DisplayConstants';

// Value options for entering a sex parameter into the system
const sexOptions = [{ value: 'M', label: 'M' }, { value: 'F', label: 'F' }];

type DataInputModalBoundPropTypes = {
  dataInputModalVisible: boolean,
};

type DataInputModalConnectedPropTypes = {
  dispatch: DispatchFunctionType,
};

type DataInputModalStateType = {
  ageInputState: string,
  weightInputState: string,
  heightInputState: string,
  selectedSexState: string,
};

type DataInputModalPropTypes = DataInputModalBoundPropTypes & DataInputModalConnectedPropTypes;

/**
 * Modal to allow for data input into the system.
 */
class DataInputModal extends React.Component<DataInputModalPropTypes, DataInputModalStateType> {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    dataInputModalVisible: PropTypes.bool.isRequired,
  };

  static mapStateToProps = (state: any): DataInputModalBoundPropTypes => ({
    dataInputModalVisible: state.dataInputReducer.visible,
  });

  constructor(props: DataInputModalPropTypes) {
    super(props);
    this.state = {
      ageInputState: '',
      heightInputState: '',
      weightInputState: '',
      selectedSexState: '',
    };
  }

  /**
   * Clears the current state values.
   * @private
   */
  _clearValues = () => {
    this.setState({
      ageInputState: '',
      heightInputState: '',
      weightInputState: '',
      selectedSexState: '',
    });
  };
  /**
   * Validate the values entered into the input boxes.
   * @returns {boolean} Whether all values are valid or not.
   * @private
   */
  _validateValues = (): boolean =>
    Number(this.state.ageInputState) !== Number.NaN &&
    Number(this.state.heightInputState) !== Number.NaN &&
    Number(this.state.weightInputState) !== Number.NaN &&
    this.state.selectedSexState !== '';

  /**
   * Handles a submit action. If all values are valid, dispatches an action to update the values.
   * Otherwise, it will keep the window open and display an error message.
   * @private
   */
  _handleSubmit = () => {
    if (this._validateValues()) {
      this.props.dispatch(
        updateBackgroundVariablesAction(
          Number(this.state.ageInputState),
          Number(this.state.heightInputState),
          Number(this.state.weightInputState),
          this.state.selectedSexState,
        ),
      );
    }
    this._clearValues();
  };

  /**
   * Dispatches an action to show the data input modal.
   * @private
   */
  _handleModalOpen = () => {
    this.props.dispatch(updateDataInputModalVisibleAction(true));
  };

  /**
   * Dispatches an action to close the data input modal.
   * @private
   */
  _handleModalClose = () => {
    this._clearValues();
    this.props.dispatch(updateDataInputModalVisibleAction(false));
  };

  /**
   * Handler to update the age input state.
   * @param event The event that occurred.
   * @private
   */
  _handleAgeInputChange = (event: SyntheticKeyboardEvent) => {
    this.setState({ ageInputState: event.target.value });
  };

  /**
   * Handler to update the height input state.
   * @param event The event that occurred.
   * @private
   */
  _handleHeightInputChange = (event: SyntheticKeyboardEvent) => {
    this.setState({ heightInputState: event.target.value });
  };

  /**
   * Handler to update the weight input state.
   * @param event The event that occurred.
   * @private
   */
  _handleWeightInputChange = (event: SyntheticKeyboardEvent) => {
    this.setState({ weightInputState: event.target.value });
  };

  /**
   * Handler for to update the selected sex input state.
   * @param selectedOption The currently selected sex option.
   * @private
   */
  _handleSexInputChange = (selectedOption: string) => {
    this.setState({ selectedSexState: selectedOption });
  };

  render() {
    return (
      <div className={s.main}>
        <PlusButton color="#FFFFFF" thickness={3} onClick={this._handleModalOpen} />
        <Modal open={this.props.dataInputModalVisible} onClose={this._handleModalClose} center>
          <h2>{DataInputModalDisplayNames.TITLE}</h2>
          <div className={s.contentPane}>
            <div className={s.inputItem}>
              <p>Age:</p>
              <input
                type="text"
                value={this.state.ageInputState}
                onChange={this._handleAgeInputChange}
              />
            </div>
            <div className={s.inputItem}>
              <p>Height (cm):</p>
              <input
                type="text"
                value={this.state.heightInputState}
                onChange={this._handleHeightInputChange}
              />
            </div>
            <div className={s.inputItem}>
              <p>Weight (kg):</p>
              <input
                type="text"
                value={this.state.weightInputState}
                onChange={this._handleWeightInputChange}
              />
            </div>
            <div className={s.inputItem}>
              <p>Sex:</p>
              <Select
                value={this.state.selectedSexState}
                options={sexOptions}
                placeholder="Select..."
                onChange={this._handleSexInputChange}
              />
            </div>
          </div>
          <div className={s.buttonPane}>
            <CloseButton color="#FF0000" thickness={3} onClick={this._handleModalClose} />
            <HoverMorphIcon
              baseType="check"
              hoverType="arrowRight"
              color="#458B00"
              thickness={3}
              onClick={this._handleSubmit}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

const ConnectedDataInputModal = connect(DataInputModal.mapStateToProps)(DataInputModal);

export default withStyles(s)(ConnectedDataInputModal);
