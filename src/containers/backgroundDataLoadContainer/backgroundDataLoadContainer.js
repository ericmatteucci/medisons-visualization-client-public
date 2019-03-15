// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BackgroundDataQuery from '../queries/BackgroundData.graphql';
import type { DispatchFunctionType } from '../../actions/actionTypes/ActionTypes';
import type { ApolloClientType } from '../../core/ApolloClientType';
import { updateBackgroundDataAction } from '../../actions/BackgroundDataActions';
import generateAsyncAction from '../../actions/AsyncActionGenerator';

type BackgroundDataLoadContainerInjectedPropTypes = {
  client: ApolloClientType,
};

type BackgroundDataLoadContainerConnectedPropTypes = {
  dispatch: DispatchFunctionType,
};

type BackgroundDataLoadContainerPropTypes = BackgroundDataLoadContainerInjectedPropTypes &
  BackgroundDataLoadContainerConnectedPropTypes;

class BackgroundDataLoadContainerComponent extends React.Component<BackgroundDataLoadContainerPropTypes> {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    client: PropTypes.shape({
      query: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props: BackgroundDataLoadContainerPropTypes) {
    super(props);

    this._updateTimer = setInterval(this.fetchBackgroundData, this._exponentialRetries * 1000);
  }

  componentWillUnmount() {
    if (this._updateTimer) {
      clearInterval(this._updateTimer);
      this._updateTimer = null;
    }
  }

  /**
   * Timer ID for periodic updates.
   * @type {number | null}
   * @private
   */
  _updateTimer: ?number;

  /**
   * Exponential multiplier for retries.
   * @type {number}
   * @private
   */
  _exponentialRetries: number = 0.25;

  /**
   * This is invoked to retrieve background data from the DB.
   */
  fetchBackgroundData = () => {
    const promise = () =>
      this.props.client
        .query({
          query: BackgroundDataQuery,
          fetchPolicy: 'no-cache',
        })
        .then(response => response)
        .then(data => {
          if (data.data && data.data.backgroundData) {
            const { age, height, weight, sex } = data.data.backgroundData;

            this.props.dispatch(updateBackgroundDataAction(age, height, weight, sex));

            if (this._updateTimer) {
              clearInterval(this._updateTimer);
              this._updateTimer = null;
            }
          }
        })
        .catch(err => {
          throw err;
        });

    this._exponentialRetries *= 2;

    generateAsyncAction(promise);
  };

  render() {
    return <div />;
  }
}

const BackgroundDataLoadContainer = connect(BackgroundDataLoadContainerComponent.mapStateToProps)(
  BackgroundDataLoadContainerComponent,
);

export default BackgroundDataLoadContainer;
