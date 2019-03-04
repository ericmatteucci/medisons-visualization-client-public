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
import {
  DataInputModalDisplayNames,
  DataInputModalErrorMessages,
} from '../../constants/DisplayConstants';

// Value options for entering a sex parameter into the system
const sexOptions = [{ value: 'M', label: 'Male' }, { value: 'F', label: 'Female' }];

type DataInputModalBoundPropTypes = {
  dataInputModalVisible: boolean,
  age: number,
  height: number,
  weight: number,
  sex: string,
};

type DataInputModalConnectedPropTypes = {
  dispatch: DispatchFunctionType,
};

type DataInputModalStateType = {
  ageInputState: string,
  weightInputState: string,
  heightInputState: string,
  selectedSexState: string,
  errorMessage: string,
};

type DataInputModalPropTypes = DataInputModalBoundPropTypes & DataInputModalConnectedPropTypes;

/**
 * Modal to allow for data input into the system.
 */
class DataInputModal extends React.Component<DataInputModalPropTypes, DataInputModalStateType> {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    dataInputModalVisible: PropTypes.bool.isRequired,
    age: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    sex: PropTypes.string.isRequired,
  };

  static mapStateToProps = (state: any): DataInputModalBoundPropTypes => ({
    dataInputModalVisible: state.dataInputReducer.visible,
    age: state.backgroundVariablesReducer.age,
    height: state.backgroundVariablesReducer.height,
    weight: state.backgroundVariablesReducer.weight,
    sex: state.backgroundVariablesReducer.sex,
  });

  constructor(props: DataInputModalPropTypes) {
    super(props);
    this.state = {
      ageInputState: this.props.age.toString(),
      heightInputState: this.props.height.toString(),
      weightInputState: this.props.weight.toString(),
      selectedSexState: this.props.sex,
      errorMessage: '',
    };
  }

  /**
   * Clears the current state values.
   * @private
   */
  _clearValues = () => {
    this.setState({
      ageInputState: this.props.age.toString(),
      heightInputState: this.props.height.toString(),
      weightInputState: this.props.weight.toString(),
      selectedSexState: this.props.sex,
      errorMessage: '',
    });
  };
  /**
   * Validate the values entered into the input boxes.
   * If any of the values are invalid, set an error message.
   * @returns {boolean} Whether all values are valid or not.
   * @private
   */
  _validateValues = (): boolean => {
    let ret = true;

    if (
      this.state.ageInputState !== '' &&
      (!Number(this.state.ageInputState) || Number(this.state.ageInputState) < 0)
    ) {
      this.setState({ errorMessage: DataInputModalErrorMessages.AGE_ERROR });
      ret = false;
    } else if (
      this.state.heightInputState !== '' &&
      (!Number(this.state.heightInputState) || Number(this.state.heightInputState) <= 0)
    ) {
      this.setState({ errorMessage: DataInputModalErrorMessages.HEIGHT_ERROR });
      ret = false;
    } else if (
      this.state.weightInputState !== '' &&
      (!Number(this.state.weightInputState) || Number(this.state.weightInputState) <= 0)
    ) {
      this.setState({ errorMessage: DataInputModalErrorMessages.WEIGHT_ERROR });
      ret = false;
    }

    return ret;
  };

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
      this._handleModalClose();
    }
  };

  /**
   * Dispatches an action to show the data input modal.
   * @private
   */
  _handleModalOpen = () => {
    this._clearValues();
    this.props.dispatch(updateDataInputModalVisibleAction(true));
  };

  /**
   * Dispatches an action to close the data input modal.
   * @private
   */
  _handleModalClose = () => {
    this.props.dispatch(updateDataInputModalVisibleAction(false));
  };

  /**
   * Handler to update the age input state.
   * @param event The event that occurred.
   * @private
   */
  _handleAgeInputChange = (event: SyntheticKeyboardEvent<*>) => {
    this.setState({ ageInputState: event.target.value });
  };

  /**
   * Handler to update the height input state.
   * @param event The event that occurred.
   * @private
   */
  _handleHeightInputChange = (event: SyntheticKeyboardEvent<*>) => {
    this.setState({ heightInputState: event.target.value });
  };

  /**
   * Handler to update the weight input state.
   * @param event The event that occurred.
   * @private
   */
  _handleWeightInputChange = (event: SyntheticKeyboardEvent<*>) => {
    this.setState({ weightInputState: event.target.value });
  };

  /**
   * Handler for to update the selected sex input state.
   * @param selectedOption The currently selected sex option.
   * @private
   */
  _handleSexInputChange = (selectedOption: Object) => {
    this.setState({ selectedSexState: selectedOption.value });
  };

  render() {
    return (
      <div className={s.main}>
        <PlusButton color="#FFFFFF" thickness={3} onClick={this._handleModalOpen} />
        <Modal open={this.props.dataInputModalVisible} onClose={this._handleModalClose} center>
          <div className={s.headerPane}>
            <div className={s.headerTitle}>{DataInputModalDisplayNames.TITLE}</div>
            <div className={s.errorMessage}>{this.state.errorMessage}</div>
          </div>
          <div className={s.contentPane}>
            <div className={s.inputItem}>
              <div className={s.inputTitle}>{DataInputModalDisplayNames.AGE}</div>
              <input
                type="text"
                value={this.state.ageInputState}
                onChange={this._handleAgeInputChange}
              />
            </div>
            <div className={s.inputItem}>
              <div className={s.inputTitle}>{DataInputModalDisplayNames.HEIGHT}</div>
              <input
                type="text"
                value={this.state.heightInputState}
                onChange={this._handleHeightInputChange}
              />
            </div>
            <div className={s.inputItem}>
              <div className={s.inputTitle}>{DataInputModalDisplayNames.WEIGHT}</div>
              <input
                type="text"
                value={this.state.weightInputState}
                onChange={this._handleWeightInputChange}
              />
            </div>
            <div className={s.inputItem}>
              <div className={s.inputTitle}>{DataInputModalDisplayNames.SEX}</div>
              <Select
                value={this.state.selectedSexState}
                options={sexOptions}
                placeholder={this.state.selectedSexState}
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

// For testing
export const UnconnectedDataInputModal = DataInputModal;

const ConnectedDataInputModal = connect(DataInputModal.mapStateToProps)(DataInputModal);

export default withStyles(s)(ConnectedDataInputModal);
