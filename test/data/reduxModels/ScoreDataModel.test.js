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

import { ScorePointModel, ScoreDataModel } from '../../../src/data/reduxModels/ScoreDataModel';

describe('ScoreDataModel', () => {
  const score1 = new ScorePointModel(100, 1);
  const score2 = new ScorePointModel(300, 1);

  const score3 = new ScorePointModel(200, 5);
  const score4 = new ScorePointModel(300, 5);
  const score5 = new ScorePointModel(400, 5);

  test('should insert scores in order, replacing existing ones with updated ones', () => {
    const existingScores = [score1, score2];
    const newScores = [score3, score4, score5];
    const expectedScores = [score1, score3, score4, score5];

    const initialModel = new ScoreDataModel();
    initialModel.scores = existingScores;

    const newModel = initialModel.insertScores(newScores);
    expect(newModel.scores).toEqual(expectedScores);
  });

  test('should keep all inserted scores (sorted)', () => {
    const newScores = [score4, score5, score1];
    const expectedScores = [score1, score4, score5];

    const initialModel = new ScoreDataModel();
    const newModel = initialModel.insertScores(newScores);
    expect(newModel.scores).toEqual(expectedScores);
  });
});
