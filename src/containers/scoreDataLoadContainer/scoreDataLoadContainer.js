// @flow
/**
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PacmanLoader } from 'react-spinners';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import type { DispatchFunctionType } from '../../actions/actionTypes/ActionTypes';
import {
  updateScoreDataAction,
  updateScoreDataErrorAction,
  updateScoreDataLoadingAction,
} from '../../actions/ScoreDataActions';
import { latestScoreTimeSelector } from '../../selectors/ScoreDataSelector';
import AggregatedDataQuery from '../queries/AggregatedScoreRows.graphql';
import type { ReduxStateType } from '../../reducers/ReduxStateType';
import s from './scoreDataLoadContainer.css';
import type { ApolloClientType } from '../../core/ApolloClientType';
import generateAsyncAction from '../../actions/AsyncActionGenerator';
import { SCORE_LOAD_INTERVAL } from '../../constants/ValueConstants';

type ScoreDataLoadContainerBoundPropsType = {
  latestStoredScore: number,
  scoreDataLoading: boolean,
  isScoreDataError: boolean,
  scoreDataErrorMessage: string,
};

type ScoreDataLoadContainerConnectedPropsType = {
  dispatch: DispatchFunctionType,
};

type ScoreDataLoadContainerInjectedPropsType = {
  client: ApolloClientType,
};

type ScoreDataLoadContainerPropTypes = ScoreDataLoadContainerBoundPropsType &
  ScoreDataLoadContainerConnectedPropsType &
  ScoreDataLoadContainerInjectedPropsType;

class ScoreDataLoadContainer extends React.Component<ScoreDataLoadContainerPropTypes> {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    latestStoredScore: PropTypes.number.isRequired,
    scoreDataLoading: PropTypes.bool.isRequired,
    isScoreDataError: PropTypes.bool.isRequired,
    scoreDataErrorMessage: PropTypes.string.isRequired,
    client: PropTypes.shape({
      query: PropTypes.func.isRequired,
      mutate: PropTypes.func.isRequired,
    }).isRequired,
  };

  static mapStateToProps = (state: ReduxStateType): ScoreDataLoadContainerBoundPropsType => ({
    latestStoredScore: latestScoreTimeSelector(state),
    isScoreDataError: state.compositeScoreDataReducer.scoreDataError.isError,
    scoreDataErrorMessage: state.compositeScoreDataReducer.scoreDataError.message,
    scoreDataLoading: state.compositeScoreDataReducer.scoreDataLoading,
  });

  constructor(props: ScoreDataLoadContainerPropTypes) {
    super(props);

    this._updateTimer = setInterval(this.fetchScoreData, SCORE_LOAD_INTERVAL);
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

  _getErrorDiv = (message: string) => <div className={s.errorMessage}>{message}</div>;

  /**
   * This is invoked to retrieve score data from the DB on an interval.
   */
  fetchScoreData = () => {
    const from = this.props.latestStoredScore + 1; // Ensure we don't "re-fetch" data
    const to = Date.now();

    const promise = this.props.client
      .query({
        query: AggregatedDataQuery,
        variables: { from, to },
        fetchPolicy: 'no-cache',
      })
      .then(response => response)
      .then(data => {
        if (data.data && data.data.aggregatedScoreRows) {
          const { timestamp, value, bp, spo2, ecg, resp, temp } = data.data.aggregatedScoreRows;

          if (this.props.scoreDataLoading) {
            this.props.dispatch(updateScoreDataLoadingAction(false));
          }

          this.props.dispatch(updateScoreDataAction(timestamp, value, bp, spo2, ecg, resp, temp));
        }
      })
      .catch(err => {
        if (this.props.scoreDataLoading) {
          this.props.dispatch(updateScoreDataLoadingAction(false));
        }

        this.props.dispatch(updateScoreDataErrorAction(true, err.message));

        if (this._updateTimer) {
          clearInterval(this._updateTimer);
          this._updateTimer = null;
        }
        throw err;
      });

    generateAsyncAction(promise);
  };

  render() {
    let ret = <div />;

    if (this.props.scoreDataLoading) {
      ret = <PacmanLoader />;
    }

    if (this.props.isScoreDataError) {
      ret = this._getErrorDiv(this.props.scoreDataErrorMessage);
    }

    return ret;
  }
}

const ConnectedScoreDataLoadContainer = connect(ScoreDataLoadContainer.mapStateToProps)(
  ScoreDataLoadContainer,
);

export default withStyles(s)(ConnectedScoreDataLoadContainer);
