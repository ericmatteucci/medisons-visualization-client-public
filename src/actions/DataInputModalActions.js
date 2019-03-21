// @flow

import type { ActionType } from './actionTypes/ActionTypes';

export const UPDATE_DATA_INPUT_MODAL_VISIBLE_ACTION = 'UPDATE_DATA_INPUT_MODAL_VISIBLE_ACTION';

export type UpdateDataInputModalVisibleActionType = {
  visible: boolean,
} & ActionType;

export const updateDataInputModalVisibleAction = (
  visible: boolean,
): UpdateDataInputModalVisibleActionType => ({
  type: UPDATE_DATA_INPUT_MODAL_VISIBLE_ACTION,
  visible,
});
