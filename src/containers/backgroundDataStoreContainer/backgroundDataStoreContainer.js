// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import StoreBackgroundDataMutation from '../mutations/StoreBackgroundData.graphql';
import {
  AGE_DEFAULT_VALUE,
  HEIGHT_DEFAULT_VALUE,
  WEIGHT_DEFAULT_VALUE,
  SEX_DEFAULT_VALUE,
} from '../../constants/ValueConstants';

type BackgroundDataStoreContainerBoundPropTypes = {
  age: number,
  height: number,
  weight: number,
  sex: string,
};

type BackgroundDataStoreContainerPropTypes = BackgroundDataStoreContainerBoundPropTypes;

class BackgroundDataStoreContainerComponent extends React.Component<BackgroundDataStoreContainerPropTypes> {
  static propTypes = {
    age: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    sex: PropTypes.string.isRequired,
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

  /**
   * Check that the current props are valid for storing in the DB.
   * @returns {boolean} Whether the values are valid or not.
   * @private
   */
  _validateValues = (): boolean =>
    this.props.age !== null &&
    this.props.height !== null &&
    this.props.weight !== null &&
    this.props.sex !== null &&
    this.props.age !== undefined &&
    this.props.height !== undefined &&
    this.props.weight !== undefined &&
    this.props.sex !== undefined &&
    this.props.age !== AGE_DEFAULT_VALUE &&
    this.props.height !== HEIGHT_DEFAULT_VALUE &&
    this.props.weight !== WEIGHT_DEFAULT_VALUE &&
    this.props.sex !== SEX_DEFAULT_VALUE;

  render() {
    return this._validateValues() ? (
      <Mutation mutation={StoreBackgroundDataMutation} ignoreResults>
        {storeBackgroundData => {
          storeBackgroundData({
            variables: {
              age: this.props.age,
              height: this.props.height,
              weight: this.props.weight,
              sex: this.props.sex,
            },
          });

          return '';
        }}
      </Mutation>
    ) : (
      <div />
    );
  }
}

const BackgroundDataStoreContainer = connect(BackgroundDataStoreContainerComponent.mapStateToProps)(
  BackgroundDataStoreContainerComponent,
);

export default BackgroundDataStoreContainer;
