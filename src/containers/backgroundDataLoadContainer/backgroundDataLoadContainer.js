// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import BackgroundDataQuery from '../queries/BackgroundData.graphql';
import type { DispatchFunctionType } from '../../actions/actionTypes/ActionTypes';
import { updateBackgroundDataAction } from '../../actions/BackgroundDataActions';

type BackgroundDataLoadContainerConnectedPropTypes = {
  dispatch: DispatchFunctionType,
};

type BackgroundDataLoadContainerPropTypes = BackgroundDataLoadContainerConnectedPropTypes;

class BackgroundDataLoadContainerComponent extends React.Component<BackgroundDataLoadContainerPropTypes> {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <Query query={BackgroundDataQuery}>
          {({ data }) => {
            if (data && data.backgroundData) {
              this.props.dispatch(
                updateBackgroundDataAction(
                  data.backgroundData.age,
                  data.backgroundData.height,
                  data.backgroundData.weight,
                  data.backgroundData.sex,
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

const BackgroundDataLoadContainer = connect(BackgroundDataLoadContainerComponent.mapStateToProps)(
  BackgroundDataLoadContainerComponent,
);

export default BackgroundDataLoadContainer;
