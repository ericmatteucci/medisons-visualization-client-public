// @flow

import newState from '../lib/NewState';
import DataInputModalModel from '../data/reduxModels/DataInputModalModel';
import { UPDATE_DATA_INPUT_MODAL_VISIBLE_ACTION } from '../actions/DataInputModalActions';
import type { UpdateDataInputModalVisibleActionType } from '../actions/DataInputModalActions';

/**
 * This is the reducer for the data input modal.
 * @param state The current state of the data input modal.
 * @param action The incoming action.
 * @returns {DataInputModalModel} The current or a new state.
 */
const dataInputReducer = (
  state: DataInputModalModel = new DataInputModalModel(),
  action: UpdateDataInputModalVisibleActionType,
): DataInputModalModel => {
  if (action.type === UPDATE_DATA_INPUT_MODAL_VISIBLE_ACTION && state.visible !== action.visible) {
    return newState(state, {
      visible: action.visible,
    });
  }

  // If this is the wrong action, or nothing has changed, return current state
  return state;
};

export default dataInputReducer;
