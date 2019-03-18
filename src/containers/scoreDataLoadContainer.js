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
    const to = Date.now();
    return (
      <div>
        <Query query={AggregatedScoreRowsQuery} variables={{ from, to }} fetchPolicy="no-cache">
          {({ loading, error, data }) => {
            if (loading) return <PacmanLoader />;
            if (error) return `Error!: ${error.message}`;
            if (data.aggregatedScoreRows) {
              const { timestamp, value, bp, spo2, ecg, resp, temp } = data.aggregatedScoreRows;

              this.props.dispatch(
                updateScoreDataAction(timestamp, value, bp, spo2, ecg, resp, temp),
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
