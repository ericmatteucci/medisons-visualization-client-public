// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import { PlusButton, CloseButton, HoverMorphIcon } from 'react-svg-buttons';
import Select from 'react-select';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// eslint-disable-next-line css-modules/no-unused-class
import s from './DataInputModal.css';
import { updateDataInputModalVisibleAction } from '../../actions/DataInputModalActions';
import { updateBackgroundDataAction } from '../../actions/BackgroundDataActions';
import type { DispatchFunctionType } from '../../actions/actionTypes/ActionTypes';
import {
  DataInputModalDisplayNames,
  DataInputModalErrorMessages,
} from '../../constants/DisplayConstants';

// Value options for entering a sex parameter into the system
const sexOptions = [{ value: 'M', label: 'Male' }, { value: 'F', label: 'Female' }];

// Sub-component names used for testing
export const DataInputModalComponentNames = {
  AGE_INPUT_BOX: 'DIM_AGE_INPUT_BOX',
  HEIGHT_INPUT_BOX: 'DIM_HEIGHT_INPUT_BOX',
  WEIGHT_INPUT_BOX: 'DIM_WEIGHT_INPUT_BOX',
  SEX_INPUT_SELECT: 'DIM_SEX_INPUT_SELECT',
  SUBMIT_BUTTON: 'DIM_SUBMIT_BUTTON',
  CANCEL_BUTTON: 'DIM_CANCEL_BUTTON',
  OPEN_BUTTON: 'DIM_OPEN_BUTTON',
};

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
    age: state.backgroundDataReducer.age,
    height: state.backgroundDataReducer.height,
    weight: state.backgroundDataReducer.weight,
    sex: state.backgroundDataReducer.sex,
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
   * Clears the current state values by resetting them to the values of the props.
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
        updateBackgroundDataAction(
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
        <PlusButton
          id={DataInputModalComponentNames.OPEN_BUTTON}
          color="#FFFFFF"
          thickness={3}
          onClick={this._handleModalOpen}
        />
        <Modal open={this.props.dataInputModalVisible} onClose={this._handleModalClose} center>
          <div className={s.headerPane}>
            <div className={s.headerTitle}>{DataInputModalDisplayNames.TITLE}</div>
            <div className={s.errorMessage}>{this.state.errorMessage}</div>
          </div>
          <div className={s.contentPane}>
            <div className={s.inputItem}>
              <div className={s.inputTitle}>{DataInputModalDisplayNames.AGE}</div>
              <input
                id={DataInputModalComponentNames.AGE_INPUT_BOX}
                type="text"
                value={this.state.ageInputState}
                onChange={this._handleAgeInputChange}
              />
            </div>
            <div className={s.inputItem}>
              <div className={s.inputTitle}>{DataInputModalDisplayNames.HEIGHT}</div>
              <input
                id={DataInputModalComponentNames.HEIGHT_INPUT_BOX}
                type="text"
                value={this.state.heightInputState}
                onChange={this._handleHeightInputChange}
              />
            </div>
            <div className={s.inputItem}>
              <div className={s.inputTitle}>{DataInputModalDisplayNames.WEIGHT}</div>
              <input
                id={DataInputModalComponentNames.WEIGHT_INPUT_BOX}
                type="text"
                value={this.state.weightInputState}
                onChange={this._handleWeightInputChange}
              />
            </div>
            <div className={s.inputItem}>
              <div className={s.inputTitle}>{DataInputModalDisplayNames.SEX}</div>
              <Select
                id={DataInputModalComponentNames.SEX_INPUT_SELECT}
                value={this.state.selectedSexState}
                options={sexOptions}
                placeholder={this.state.selectedSexState}
                onChange={this._handleSexInputChange}
              />
            </div>
          </div>
          <div className={s.buttonPane}>
            <CloseButton
              id={DataInputModalComponentNames.CANCEL_BUTTON}
              color="#FF0000"
              thickness={3}
              onClick={this._handleModalClose}
            />
            <HoverMorphIcon
              id={DataInputModalComponentNames.SUBMIT_BUTTON}
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
