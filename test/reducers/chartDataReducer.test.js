/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import chartDataReducer from '../../src/reducers/chartDataReducer';

import ChartDataModel from '../../src/data/reduxModels/ChartDataModel';
import CompositeChartDataModel from '../../src/data/reduxModels/CompositeChartDataModel';
import {
  updateDerangementScoreChartAction,
  updateOxygenSaturationChartAction,
} from '../../src/actions/ChartActions';

describe('chartDataReducer', () => {
  const initialDerangementScoreData = [-1, -1, -1];
  const initialDerangementScoreDomainValues = [6, 7, 8];

  const initialOxygenSaturationData = [-2, -2, -2, -2];
  const initialOxygenSaturationDomainValues = [12, 13, 14, 15];

  const initialState = new CompositeChartDataModel();
  initialState.derangementScore = ChartDataModel.create(
    initialDerangementScoreData,
    initialDerangementScoreDomainValues,
  );
  initialState.oxygenSaturation = ChartDataModel.create(
    initialOxygenSaturationData,
    initialOxygenSaturationDomainValues,
  );

  const testData = [333, 444, 555, 666, 777];
  const testDomainValues = [1, 2, 3, 4, 5];
  const testChartDataModel = ChartDataModel.create(testData, testDomainValues);

  const mismatchedTestData = [888, 999, 777];
  const mismatchedTestDomainValues = [3, 4, 5, 6, 7, 8, 9];

  const assertChartDataModel = (expected, actual) => {
    expect(actual.data).toEqual(expected.getData());
    expect(actual.domainValues).toEqual(expected.getDomainValues());
  };

  test('Should update the derangement score state with the new chart data.', () => {
    const action = updateDerangementScoreChartAction(
      testChartDataModel.getData(),
      testChartDataModel.getDomainValues(),
    );

    const newState = chartDataReducer(initialState, action);

    assertChartDataModel(testChartDataModel, newState.derangementScore);
    assertChartDataModel(
      initialState.oxygenSaturation,
      newState.oxygenSaturation,
    );
  });

  test('Should update the oxygen saturation state with the new chart data.', () => {
    const action = updateOxygenSaturationChartAction(
      testChartDataModel.getData(),
      testChartDataModel.getDomainValues(),
    );

    const newState = chartDataReducer(initialState, action);

    assertChartDataModel(testChartDataModel, newState.oxygenSaturation);
    assertChartDataModel(
      initialState.derangementScore,
      newState.derangementScore,
    );
  });

  test(
    'Should return the current state when the derangement score action contains' +
      'data and domainValues arrays of unequal size',
    () => {
      const action = updateDerangementScoreChartAction(
        mismatchedTestData,
        mismatchedTestDomainValues,
      );

      const newState = chartDataReducer(initialState, action);

      expect(newState).toEqual(initialState);
    },
  );

  test(
    'Should return the current state when the oxygen saturation action contains' +
      'data and domainValues arrays of unequal size',
    () => {
      const action = updateOxygenSaturationChartAction(
        mismatchedTestData,
        mismatchedTestDomainValues,
      );

      const newState = chartDataReducer(initialState, action);

      expect(newState).toEqual(initialState);
    },
  );
});
