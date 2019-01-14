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

import ChartDataModel from '../../../src/data/reduxModels/ChartDataModel';
import MismatchedChartDataError from '../../../src/data/errors/DataErrors';

describe('ChartDataModel', () => {
  const testData = [333, 444, 555, 666, 777];
  const testDomainValues = [1, 2, 3, 4, 5];

  const newTestData = [2222, 3333, 2222];
  const newTestDomainValues = [6, 7, 8];

  const mismatchedTestData = [888, 999, 777];
  const mismatchedTestDomainValues = [3, 4, 5, 6, 7, 8, 9];

  test('Should construct and get valid data.', () => {
    const testChartData = new ChartDataModel(testData, testDomainValues);

    expect(testChartData.getData()).toEqual(testData);
    expect(testChartData.getDomainValues()).toEqual(testDomainValues);
  });

  test('Should construct and reset valid data.', () => {
    const testChartData = new ChartDataModel(testData, testDomainValues);

    expect(testChartData.getData()).toEqual(testData);
    expect(testChartData.getDomainValues()).toEqual(testDomainValues);

    testChartData.set(newTestData, newTestDomainValues);

    expect(testChartData.getData()).toEqual(newTestData);
    expect(testChartData.getDomainValues()).toEqual(newTestDomainValues);
  });

  test('Should throw MismatchedChartDataError in constructor.', () => {
    const constructMismatchedChartData = () =>
      new ChartDataModel(mismatchedTestData, mismatchedTestDomainValues);

    expect(constructMismatchedChartData).toThrowError(MismatchedChartDataError);
  });

  test('Should throw MismatchedChartDataError in set.', () => {
    const testChartData = new ChartDataModel(testData, testDomainValues);

    expect(testChartData.getData()).toEqual(testData);
    expect(testChartData.getDomainValues()).toEqual(testDomainValues);

    const setMismatchedChartData = () => {
      testChartData.set(mismatchedTestData, mismatchedTestDomainValues);
    };

    expect(setMismatchedChartData).toThrowError(MismatchedChartDataError);
  });

  describe('clone', () => {
    test('Should return a copy of the current chart model.', () => {
      const testChartData = new ChartDataModel(testData, testDomainValues);

      const copyData = testChartData.clone();

      expect(copyData.getData()).toEqual(testChartData.getData());
      expect(copyData.getDomainValues()).toEqual(
        testChartData.getDomainValues(),
      );
    });

    test('Should return a new object for the cloned object', () => {
      const testChartData = new ChartDataModel(testData, testDomainValues);

      const copyData = testChartData.clone();

      expect(testChartData).not.toBe(copyData);
    });
  });

  describe('getEmpty', () => {
    test('Should return empty data when getEmpty is called.', () => {
      const emptyChartData = ChartDataModel.getEmpty();

      expect(emptyChartData.getData()).toEqual([]);
      expect(emptyChartData.getDomainValues()).toEqual([]);
    });
  });
});
