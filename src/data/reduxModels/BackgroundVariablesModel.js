// @flow

import { SELECT_SEX_HINT } from '../../constants/DisplayConstants';

/**
 * This list defines the values available for background variables for a particular patient.
 */
export default class BackgroundVariablesModel {
  age: number = -1;
  height: number = -1;
  weight: number = -1;
  sex: string = SELECT_SEX_HINT;
}
