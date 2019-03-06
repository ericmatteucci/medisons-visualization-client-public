/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */
import React from 'react';
import { shallow } from 'enzyme';
import {
  BackgroundVariablesPaneComponentNames,
  UnconnectedBackgroundVariablesPane,
} from '../../src/components/BackgroundVariablesPane/BackgroundVariablesPane';
import { EMPTY_VALUE_STRING, SELECT_SEX_HINT } from '../../src/constants/DisplayConstants';

describe('BackgroundVariablesPane', () => {
  const testAge = 55;
  const testHeight = 188;
  const testWeight = 66;
  const testSex = 'M';

  const getWrappedComponent = (
    age = testAge,
    height = testHeight,
    weight = testWeight,
    sex = testSex,
  ) =>
    shallow(
      <UnconnectedBackgroundVariablesPane age={age} height={height} weight={weight} sex={sex} />,
    );

  test('Should display proper values when present.', () => {
    const wrapper = getWrappedComponent();

    expect(
      wrapper.find(`#${BackgroundVariablesPaneComponentNames.AGE_DISPLAY_BOX}`).text(),
    ).toEqual(testAge.toString());

    expect(
      wrapper.find(`#${BackgroundVariablesPaneComponentNames.HEIGHT_DISPLAY_BOX}`).text(),
    ).toEqual(testHeight.toString());

    expect(
      wrapper.find(`#${BackgroundVariablesPaneComponentNames.WEIGHT_DISPLAY_BOX}`).text(),
    ).toEqual(testWeight.toString());

    expect(
      wrapper.find(`#${BackgroundVariablesPaneComponentNames.SEX_DISPLAY_BOX}`).text(),
    ).toEqual(testSex);
  });

  test('Should display NaN values when values are not available.', () => {
    const wrapper = getWrappedComponent(-1, -1, -1, SELECT_SEX_HINT);

    expect(
      wrapper.find(`#${BackgroundVariablesPaneComponentNames.AGE_DISPLAY_BOX}`).text(),
    ).toEqual(EMPTY_VALUE_STRING);

    expect(
      wrapper.find(`#${BackgroundVariablesPaneComponentNames.HEIGHT_DISPLAY_BOX}`).text(),
    ).toEqual(EMPTY_VALUE_STRING);

    expect(
      wrapper.find(`#${BackgroundVariablesPaneComponentNames.WEIGHT_DISPLAY_BOX}`).text(),
    ).toEqual(EMPTY_VALUE_STRING);

    expect(
      wrapper.find(`#${BackgroundVariablesPaneComponentNames.SEX_DISPLAY_BOX}`).text(),
    ).toEqual(EMPTY_VALUE_STRING);
  });
});
