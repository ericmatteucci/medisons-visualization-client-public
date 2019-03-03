// @flow

import type { ActionType } from './actionTypes/ActionTypes';

export const UPDATE_DATA_INPUT_MODAL_VISIBLE_ACTION = 'UPDATE_DATA_INPUT_MODAL_VISIBLE_ACTION';
export const UPDATE_BACKGROUND_VARIABLES_ACTION = 'UPDATE_BACKGROUND_VARIABLES_ACTION';

export type UpdateDataInputModalVisibleActionType = {
  visible: boolean,
} & ActionType;

export type UpdateBackgroundVariablesActionType = {
  age: number,
  height: number,
  weight: number,
  sex: string,
} & ActionType;

export const updateDataInputModalVisibleAction = (
  visible: boolean,
): UpdateDataInputModalVisibleActionType => ({
  type: UPDATE_DATA_INPUT_MODAL_VISIBLE_ACTION,
  visible,
});

export const updateBackgroundVariablesAction = (
  age: number,
  height: number,
  weight: number,
  sex: string,
): UpdateBackgroundVariablesActionType => ({
  type: UPDATE_BACKGROUND_VARIABLES_ACTION,
  age,
  height,
  weight,
  sex,
});
