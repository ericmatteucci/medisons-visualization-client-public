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
import renderComponent from '../TestUtilities';
import { UnconnectedDataInputModal } from '../../src/components/DataInputModal/DataInputModal';
import {
  updateBackgroundVariablesAction,
  updateDataInputModalVisibleAction,
} from '../../src/actions/DataInputModalActions';

describe('DataInputModal', () => {
  const dispatch = jest.mock();
  const updateBackgroundVariablesActionMock = jest.fn(updateBackgroundVariablesAction);
  const updateDataInputModalVisibleActionMock = jest.fn(updateDataInputModalVisibleAction);

  function getWrappedComponent(modalVisible = true) {
    return renderComponent(
      UnconnectedDataInputModal,
      { dataInputModalVisible: modalVisible },
      { useMount: true, useContext: true },
      dispatch,
    );
  }

  beforeEach(() => {
    dispatch.mockRestore();
    updateBackgroundVariablesActionMock.mockRestore();
    updateDataInputModalVisibleActionMock.mockRestore();
  });

  test('Should submit valid data.', () => {
    const wrapper = getWrappedComponent();
    wrapper.find;
  });
});
