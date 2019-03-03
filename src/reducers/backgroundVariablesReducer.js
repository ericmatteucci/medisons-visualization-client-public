// @flow

import newState from '../lib/NewState';
import { UPDATE_BACKGROUND_VARIABLES_ACTION } from '../actions/DataInputModalActions';
import type { UpdateDataInputModalVisibleActionType } from '../actions/DataInputModalActions';
import BackgroundVariablesModel from '../data/reduxModels/BackgroundVariablesModel';

/**
 * This is the reducer for the data input modal.
 * @param state The current state of the data input modal.
 * @param action The incoming action.
 * @returns {DataInputModalModel} The current or a new state.
 */
const backgroundVariablesReducer = (
  state: BackgroundVariablesModel = new BackgroundVariablesModel(),
  action: UpdateDataInputModalVisibleActionType,
): BackgroundVariablesModel => {
  if (action.type === UPDATE_BACKGROUND_VARIABLES_ACTION) {
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

export default backgroundVariablesReducer;
