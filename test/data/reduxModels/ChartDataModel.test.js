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

import SignalDataModel from '../../../src/data/reduxModels/SignalDataModel';

describe('SignalDataModel', () => {
  const testData = [333, 444, 555, 666, 777];
  const testDomainValues = [1, 2, 3, 4, 5];

  const mismatchedTestData = [888, 999, 777];
  const mismatchedTestDomainValues = [3, 4, 5, 6, 7, 8, 9];

  test('Should construct and get valid data.', () => {
    const testChartData = SignalDataModel.create(testData, testDomainValues);

    expect(testChartData.getData()).toEqual(testData);
    expect(testChartData.getDomainValues()).toEqual(testDomainValues);
  });

  test('Should return empty data and domainValues when inputs are of mismatched length.', () => {
    const testChartData = SignalDataModel.create(mismatchedTestData, mismatchedTestDomainValues);

    expect(testChartData.getData()).toEqual([]);
    expect(testChartData.getDomainValues()).toEqual([]);
  });
});
