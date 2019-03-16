// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StoreBackgroundDataMutation from '../mutations/StoreBackgroundData.graphql';
import type { ApolloClientType } from '../../core/ApolloClientType';
import {
  AGE_DEFAULT_VALUE,
  HEIGHT_DEFAULT_VALUE,
  WEIGHT_DEFAULT_VALUE,
  SEX_DEFAULT_VALUE,
} from '../../constants/ValueConstants';
import generateAsyncAction from '../../actions/AsyncActionGenerator';

type BackgroundDataStoreContainerBoundPropTypes = {
  age: number,
  height: number,
  weight: number,
  sex: string,
};

type BackgroundDataStoreContainerInjectedPropTypes = {
  client: ApolloClientType,
};

type BackgroundDataStoreContainerPropTypes = BackgroundDataStoreContainerBoundPropTypes &
  BackgroundDataStoreContainerInjectedPropTypes;

class BackgroundDataStoreContainerComponent extends React.Component<BackgroundDataStoreContainerPropTypes> {
  static propTypes = {
    age: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    sex: PropTypes.string.isRequired,
    client: PropTypes.shape({
      query: PropTypes.func.isRequired,
      mutate: PropTypes.func.isRequired,
    }).isRequired,
  };

  static mapStateToProps = (state: any): BackgroundDataStoreContainerBoundPropTypes => ({
    age: state.backgroundDataReducer.age,
    height: state.backgroundDataReducer.height,
    weight: state.backgroundDataReducer.weight,
    sex: state.backgroundDataReducer.sex,
  });

  /**
   * Only update the database if none of the values are default
   * and at least one of the values has changed.
   * @param nextProps The incoming props.
   * @returns {boolean} Whether mutation should occur or not.
   */
  shouldComponentUpdate(nextProps: BackgroundDataStoreContainerPropTypes) {
    const noDefaultValues =
      nextProps.age !== AGE_DEFAULT_VALUE &&
      nextProps.height !== HEIGHT_DEFAULT_VALUE &&
      nextProps.weight !== WEIGHT_DEFAULT_VALUE &&
      nextProps.sex !== SEX_DEFAULT_VALUE;

    const atLeastOneValueChanged =
      nextProps.age !== this.props.age ||
      nextProps.height !== this.props.height ||
      nextProps.weight !== this.props.weight ||
      nextProps.sex !== this.props.sex;

    return noDefaultValues && atLeastOneValueChanged;
  }

  componentDidUpdate() {
    this.storeBackgroundData();
  }

  /**
   * Generate an async function to store new background data in the DB.
   */
  storeBackgroundData = () => {
    const promise = () =>
      this.props.client
        .mutate({
          mutation: StoreBackgroundDataMutation,
          variables: {
            age: this.props.age,
            height: this.props.height,
            weight: this.props.weight,
            sex: this.props.sex,
          },
        })
        .then(response => response)
        .catch(err => {
          throw err;
        });

    generateAsyncAction(promise);
  };

  render() {
    return <div />;
  }
}

const BackgroundDataStoreContainer = connect(BackgroundDataStoreContainerComponent.mapStateToProps)(
  BackgroundDataStoreContainerComponent,
);

export default BackgroundDataStoreContainer;
