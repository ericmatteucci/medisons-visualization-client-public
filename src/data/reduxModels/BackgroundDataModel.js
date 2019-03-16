// @flow

import {
  AGE_DEFAULT_VALUE,
  HEIGHT_DEFAULT_VALUE,
  WEIGHT_DEFAULT_VALUE,
  SEX_DEFAULT_VALUE,
} from '../../constants/ValueConstants';

/**
 * This list defines the values available for background variables for a particular patient.
 */
export default class BackgroundDataModel {
  age: number = AGE_DEFAULT_VALUE;
  height: number = HEIGHT_DEFAULT_VALUE;
  weight: number = WEIGHT_DEFAULT_VALUE;
  sex: string = SEX_DEFAULT_VALUE;
}
