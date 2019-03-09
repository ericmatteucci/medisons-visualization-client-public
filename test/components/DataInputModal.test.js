/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */
import React from 'react';
import { shallow } from 'enzyme';
import SyntheticEvents from '../TestUtilities';
import {
  DataInputModalComponentNames,
  UnconnectedDataInputModal,
} from '../../src/components/DataInputModal/DataInputModal';
import { DataInputModalErrorMessages } from '../../src/constants/DisplayConstants';
import { updateDataInputModalVisibleAction } from '../../src/actions/DataInputModalActions';
import { updateBackgroundDataAction } from '../../src/actions/BackgroundDataActions';

describe('DataInputModal', () => {
  const testAge = 55;
  const testHeight = 188;
  const testWeight = 66;
  const testSex = 'M';
  const dispatch = jest.fn();

  const getWrappedComponent = (show = true) =>
    shallow(
      <UnconnectedDataInputModal
        dataInputModalVisible={show}
        age={testAge}
        height={testHeight}
        weight={testWeight}
        sex={testSex}
        dispatch={dispatch}
      />,
    );

  beforeEach(() => {
    dispatch.mockRestore();
  });

  test('Should update the age state when a new value is entered.', () => {
    const wrapper = getWrappedComponent();

    expect(wrapper.instance().state.ageInputState).toEqual(testAge.toString());

    const newAge = '76';

    wrapper
      .find(`#${DataInputModalComponentNames.AGE_INPUT_BOX}`)
      .simulate(SyntheticEvents.CHANGE, { target: { value: newAge } });

    expect(wrapper.instance().state.ageInputState).toEqual(newAge);
  });

  test('Should update the height state when a new value is entered.', () => {
    const wrapper = getWrappedComponent();

    expect(wrapper.instance().state.heightInputState).toEqual(testHeight.toString());

    const newHeight = '169';

    wrapper
      .find(`#${DataInputModalComponentNames.HEIGHT_INPUT_BOX}`)
      .simulate(SyntheticEvents.CHANGE, { target: { value: newHeight } });

    expect(wrapper.instance().state.heightInputState).toEqual(newHeight);
  });

  test('Should update the weight state when a new value is entered.', () => {
    const wrapper = getWrappedComponent();

    expect(wrapper.instance().state.weightInputState).toEqual(testWeight.toString());

    const newWeight = '100';

    wrapper
      .find(`#${DataInputModalComponentNames.WEIGHT_INPUT_BOX}`)
      .simulate(SyntheticEvents.CHANGE, { target: { value: newWeight } });

    expect(wrapper.instance().state.weightInputState).toEqual(newWeight);
  });

  test('Should update the age state when a new value is entered.', () => {
    const wrapper = getWrappedComponent();

    expect(wrapper.instance().state.selectedSexState).toEqual(testSex);

    const newSex = 'F';

    wrapper
      .find(`#${DataInputModalComponentNames.SEX_INPUT_SELECT}`)
      .simulate(SyntheticEvents.CHANGE, { value: newSex });

    expect(wrapper.instance().state.selectedSexState).toEqual(newSex);
  });

  test(
    'Should dispatch actions to update background data and close the modal when ' +
      'submit is clicked and valid data is stored in the component state.',
    () => {
      const wrapper = getWrappedComponent();

      const newAge = '99';
      const newHeight = '200';
      const newWeight = '70';
      const newSex = 'F';

      wrapper
        .find(`#${DataInputModalComponentNames.AGE_INPUT_BOX}`)
        .simulate(SyntheticEvents.CHANGE, { target: { value: newAge } });

      wrapper
        .find(`#${DataInputModalComponentNames.HEIGHT_INPUT_BOX}`)
        .simulate(SyntheticEvents.CHANGE, { target: { value: newHeight } });

      wrapper
        .find(`#${DataInputModalComponentNames.WEIGHT_INPUT_BOX}`)
        .simulate(SyntheticEvents.CHANGE, { target: { value: newWeight } });

      wrapper
        .find(`#${DataInputModalComponentNames.SEX_INPUT_SELECT}`)
        .simulate(SyntheticEvents.CHANGE, { value: newSex });

      wrapper
        .find(`#${DataInputModalComponentNames.SUBMIT_BUTTON}`)
        .simulate(SyntheticEvents.CLICK);

      expect(dispatch.mock.calls.length).toEqual(2);
      expect(dispatch.mock.calls[0][0]).toEqual(
        updateBackgroundDataAction(Number(newAge), Number(newHeight), Number(newWeight), newSex),
      );
      expect(dispatch.mock.calls[1][0]).toEqual(updateDataInputModalVisibleAction(false));
    },
  );

  test('Should set the correct error message if an invalid age is entered.', () => {
    const wrapper = getWrappedComponent();

    expect(wrapper.instance().state.ageInputState).toEqual(testAge.toString());

    const invalidAge = '-22';

    wrapper
      .find(`#${DataInputModalComponentNames.AGE_INPUT_BOX}`)
      .simulate(SyntheticEvents.CHANGE, { target: { value: invalidAge } });

    expect(wrapper.instance().state.ageInputState).toEqual(invalidAge);

    wrapper.find(`#${DataInputModalComponentNames.SUBMIT_BUTTON}`).simulate(SyntheticEvents.CLICK);

    expect(wrapper.instance().state.errorMessage).toEqual(DataInputModalErrorMessages.AGE_ERROR);
  });

  test('Should set the correct error message if an invalid age is entered.', () => {
    const wrapper = getWrappedComponent();

    expect(wrapper.instance().state.heightInputState).toEqual(testHeight.toString());

    const invalidHeight = 'Like, six feet...';

    wrapper
      .find(`#${DataInputModalComponentNames.HEIGHT_INPUT_BOX}`)
      .simulate(SyntheticEvents.CHANGE, { target: { value: invalidHeight } });

    expect(wrapper.instance().state.heightInputState).toEqual(invalidHeight);

    wrapper.find(`#${DataInputModalComponentNames.SUBMIT_BUTTON}`).simulate(SyntheticEvents.CLICK);

    expect(wrapper.instance().state.errorMessage).toEqual(DataInputModalErrorMessages.HEIGHT_ERROR);
  });

  test('Should set the correct error message if an invalid weight is entered.', () => {
    const wrapper = getWrappedComponent();

    expect(wrapper.instance().state.weightInputState).toEqual(testWeight.toString());

    const invalidWeight = 'SOMEONE LOVE ME PLS';

    wrapper
      .find(`#${DataInputModalComponentNames.WEIGHT_INPUT_BOX}`)
      .simulate(SyntheticEvents.CHANGE, { target: { value: invalidWeight } });

    expect(wrapper.instance().state.weightInputState).toEqual(invalidWeight);

    wrapper.find(`#${DataInputModalComponentNames.SUBMIT_BUTTON}`).simulate(SyntheticEvents.CLICK);

    expect(wrapper.instance().state.errorMessage).toEqual(DataInputModalErrorMessages.WEIGHT_ERROR);
  });

  test('Should dispatch an action to open the modal when the open button is clicked.', () => {
    const wrapper = getWrappedComponent(false);

    expect(wrapper.instance().props.dataInputModalVisible).toEqual(false);

    wrapper.find(`#${DataInputModalComponentNames.OPEN_BUTTON}`).simulate(SyntheticEvents.CLICK);

    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0][0]).toEqual(updateDataInputModalVisibleAction(true));
  });

  test('Should dispatch an action to close the modal when the cancel button is clicked.', () => {
    const wrapper = getWrappedComponent();

    expect(wrapper.instance().props.dataInputModalVisible).toEqual(true);

    wrapper.find(`#${DataInputModalComponentNames.CANCEL_BUTTON}`).simulate(SyntheticEvents.CLICK);

    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0][0]).toEqual(updateDataInputModalVisibleAction(false));
  });
});
