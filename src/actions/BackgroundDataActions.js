// @flow

import type { ActionType } from './actionTypes/ActionTypes';

export const UPDATE_BACKGROUND_DATA_ACTION = 'UPDATE_BACKGROUND_DATA_ACTION';

export type UpdateBackgroundDataActionType = {
  age: number,
  height: number,
  weight: number,
  sex: string,
} & ActionType;

export const updateBackgroundDataAction = (
  age: number,
  height: number,
  weight: number,
  sex: string,
): UpdateBackgroundDataActionType => ({
  type: UPDATE_BACKGROUND_DATA_ACTION,
  age,
  height,
  weight,
  sex,
});
