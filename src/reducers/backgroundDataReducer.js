// @flow

import newState from '../lib/NewState';
import { UPDATE_BACKGROUND_DATA_ACTION } from '../actions/BackgroundDataActions';
import type { UpdateBackgroundDataActionType } from '../actions/BackgroundDataActions';
import BackgroundDataModel from '../data/reduxModels/BackgroundDataModel';

/**
 * This is the reducer for the data input modal.
 * @param state The current state of the data input modal.
 * @param action The incoming action.
 * @returns {DataInputModalModel} The current or a new state.
 */
const backgroundDataReducer = (
  state: BackgroundDataModel = new BackgroundDataModel(),
  action: UpdateBackgroundDataActionType,
): BackgroundDataModel => {
  if (
    action.type === UPDATE_BACKGROUND_DATA_ACTION &&
    action.age !== undefined &&
    action.height !== undefined &&
    action.weight !== undefined &&
    action.sex !== undefined &&
    action.age !== null &&
    action.height !== null &&
    action.weight !== null &&
    action.sex !== null
  ) {
    return newState(state, {
      age: action.age,
      height: action.height,
      weight: action.weight,
      sex: action.sex,
    });
  }

  // If this is the wrong action, or nothing has changed, return current state
  return state;
};

export default backgroundDataReducer;
