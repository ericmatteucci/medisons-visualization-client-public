// @flow
/**
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { PacmanLoader } from 'react-spinners';
import AggregatedScoreRowsQuery from './queries/AggregatedScoreRows.graphql';
import { SCORE_LOAD_POLL_INTERVAL } from '../constants/ValueConstants';
import type { DispatchFunctionType } from '../actions/actionTypes/ActionTypes';
import { updateScoreDataAction } from '../actions/ScoreDataActions';
import { latestScoreTimeSelector } from '../selectors/ScoreDataSelector';
import type { ReduxStateType } from '../reducers/ReduxStateType';

type ScoreDataLoadContainerBoundPropTypes = {
  latestStoredScore: number,
};

type ScoreDataLoadContainerConnectedPropTypes = {
  dispatch: DispatchFunctionType,
};

type ScoreDataLoadContainerPropTypes = ScoreDataLoadContainerBoundPropTypes &
  ScoreDataLoadContainerConnectedPropTypes;

class ScoreDataLoadContainer extends React.Component<ScoreDataLoadContainerPropTypes> {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    latestStoredScore: PropTypes.number.isRequired,
  };

  static mapStateToProps = (state: ReduxStateType): ScoreDataLoadContainerBoundPropTypes => ({
    latestStoredScore: latestScoreTimeSelector(state),
  });

  render() {
    const from = this.props.latestStoredScore;
    const to = 10000;
    return (
      <div>
        <Query
          query={AggregatedScoreRowsQuery}
          variables={{ from, to }}
          pollInterval={SCORE_LOAD_POLL_INTERVAL}
        >
          {({ loading, error, data }) => {
            if (loading) return <PacmanLoader />;
            if (error) return `Error!: ${error.message}`;
            if (data.aggregatedScoreRows) {
              const scores = Object.values(data.aggregatedScoreRows);

              this.props.dispatch(
                updateScoreDataAction(
                  scores.timestamp,
                  scores.value,
                  scores.bp,
                  scores.spo2,
                  scores.ecg,
                  scores.resp,
                  scores.temp,
                ),
              );
            }
            return '';
          }}
        </Query>
      </div>
    );
  }
}

const ConnectedScoreDataLoadContainer = connect(ScoreDataLoadContainer.mapStateToProps)(
  ScoreDataLoadContainer,
);

export default ConnectedScoreDataLoadContainer;
