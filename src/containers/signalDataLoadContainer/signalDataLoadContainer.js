// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Query } from 'react-apollo';
import { PacmanLoader } from 'react-spinners';
import MultiSignalDataQuery from '../queries/MultiSignalData.graphql';
import { SignalNames, SIGNAL_LOAD_POLL_INTERVAL } from '../../constants/ValueConstants';
import type { DispatchFunctionType } from '../../actions/actionTypes/ActionTypes';
import { updateSignalDataAction } from '../../actions/SignalDataActions';
import s from './signalDataLoadContainer.css';

type SignalDataLoadContainerConnectedPropTypes = {
  dispatch: DispatchFunctionType,
};

type SignalDataLoadContainerPropTypes = SignalDataLoadContainerConnectedPropTypes;

class SignalDataLoadContainer extends React.Component<SignalDataLoadContainerPropTypes> {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  _getErrorDiv = (message: String) => <div className={s.errorMessage}>{message}</div>;

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
            if (error) return this._getErrorDiv(error.message);
            if (data.multiSignalData) {
              const signalData = Object.values(data.multiSignalData);

              for (let i = 0; i < signalData.length; i++) {
                const timestamp = new Date(signalData[i].timestamp).getTime();

                this.props.dispatch(
                  updateSignalDataAction(
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

export default withStyles(s)(ConnectedSignalDataLoadContainer);
