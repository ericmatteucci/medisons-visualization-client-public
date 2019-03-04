import React from 'react';
import PropTypes from 'prop-types';
import { createStore, applyMiddleware } from 'redux';
import { shallow, mount } from 'enzyme';
import thunkMiddleware from 'redux-thunk';
import combinedReducer from '../src/reducers';

export default function renderComponent(
  Component,
  { useMount = false, useContext = false } = {},
  dispatch = () => {},
) {
  const renderFunc = useMount ? mount : shallow;

  const store = createStore(combinedReducer, applyMiddleware(thunkMiddleware));

  const context = {
    insertCss: () => {},
    store,
  };

  const options = useContext
    ? {
        context,
        childContextTypes: {
          insertCss: PropTypes.func.isRequired,
          store: PropTypes.object.isRequired,
        },
      }
    : {};

  const props = {
    dispatch,
    store,
  };

  return renderFunc(<Component {...props} />, options);
}
