// @flow
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { PacmanLoader } from 'react-spinners';
import MultiSignalDataQuery from './queries/MultiSignalData.graphql';
import { SignalNames, SIGNAL_LOAD_POLL_INTERVAL } from '../constants/ValueConstants';
import type { DispatchFunctionType } from '../actions/actionTypes/ActionTypes';
import { updateScoreDataAction } from '../actions/ScoreDataActions';

type SignalDataLoadContainerBoundPropTypes = {
  dispatch: DispatchFunctionType,
};

type SignalDataLoadContainerPropTypes = SignalDataLoadContainerBoundPropTypes;

class SignalDataLoadContainer extends React.Component<SignalDataLoadContainerPropTypes> {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    const fetchSignals = [SignalNames.SPO2, SignalNames.BP, SignalNames.ECG];
    return (
      <div>
        <Query
          query={MultiSignalDataQuery}
          variables={{ names: fetchSignals }}
          pollInterval={SIGNAL_LOAD_POLL_INTERVAL}
        >
          {({ loading, error, data }) => {
            if (loading) return <PacmanLoader />;
            if (error) return `Error!: ${error.message}`;
            if (data.multiSignalData) {
              const signalData = Object.values(data.multiSignalData);

              for (let i = 0; i < signalData.length; i++) {
                const timestamp = new Date(signalData[i].timestamp).getTime();

                this.props.dispatch(
                  updateScoreDataAction(
                    signalData[i].name,
                    signalData[i].dataPoints,
                    timestamp,
                    signalData[i].frequency,
                  ),
                );
              }
            }
            return '';
          }}
        </Query>
      </div>
    );
  }
}

const ConnectedSignalDataLoadContainer = connect(SignalDataLoadContainer.mapStateToProps)(
  SignalDataLoadContainer,
);

export default ConnectedSignalDataLoadContainer;
