/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */
import React from 'react';
import { shallow } from 'enzyme';
import {
  BackgroundDataPaneComponentNames,
  UnconnectedBackgroundDataPane,
} from '../../src/components/BackgroundDataPane/BackgroundDataPane';
import { EMPTY_VALUE_STRING } from '../../src/constants/DisplayConstants';
import {
  AGE_DEFAULT_VALUE,
  HEIGHT_DEFAULT_VALUE,
  WEIGHT_DEFAULT_VALUE,
  SEX_DEFAULT_VALUE,
} from '../../src/constants/ValueConstants';

describe('BackgroundDataPane', () => {
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
    shallow(<UnconnectedBackgroundDataPane age={age} height={height} weight={weight} sex={sex} />);

  test('Should display proper values when present.', () => {
    const wrapper = getWrappedComponent();

    expect(wrapper.find(`#${BackgroundDataPaneComponentNames.AGE_DISPLAY_BOX}`).text()).toEqual(
      testAge.toString(),
    );

    expect(wrapper.find(`#${BackgroundDataPaneComponentNames.HEIGHT_DISPLAY_BOX}`).text()).toEqual(
      testHeight.toString(),
    );

    expect(wrapper.find(`#${BackgroundDataPaneComponentNames.WEIGHT_DISPLAY_BOX}`).text()).toEqual(
      testWeight.toString(),
    );

    expect(wrapper.find(`#${BackgroundDataPaneComponentNames.SEX_DISPLAY_BOX}`).text()).toEqual(
      testSex,
    );
  });

  test('Should display NaN values when values are not available.', () => {
    const wrapper = getWrappedComponent(
      AGE_DEFAULT_VALUE,
      HEIGHT_DEFAULT_VALUE,
      WEIGHT_DEFAULT_VALUE,
      SEX_DEFAULT_VALUE,
    );

    expect(wrapper.find(`#${BackgroundDataPaneComponentNames.AGE_DISPLAY_BOX}`).text()).toEqual(
      EMPTY_VALUE_STRING,
    );

    expect(wrapper.find(`#${BackgroundDataPaneComponentNames.HEIGHT_DISPLAY_BOX}`).text()).toEqual(
      EMPTY_VALUE_STRING,
    );

    expect(wrapper.find(`#${BackgroundDataPaneComponentNames.WEIGHT_DISPLAY_BOX}`).text()).toEqual(
      EMPTY_VALUE_STRING,
    );

    expect(wrapper.find(`#${BackgroundDataPaneComponentNames.SEX_DISPLAY_BOX}`).text()).toEqual(
      EMPTY_VALUE_STRING,
    );
  });
});
