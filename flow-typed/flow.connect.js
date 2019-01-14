// @flow
import React from 'react';

type ConnectResponseType = (reactComponent: React.Component) => React.Component;
type StateToPropsType = (state: Object, props: Object) => Object;
type DispatchToPropsType = (dispatch: Object) => Object;

declare module 'react-redux' {
  declare function connect(
    mapStateToProps?: StateToPropsType,
    mapDispatchToProps?: DispatchToPropsType,
    mergeProps?: Object,
    options?: Object,
  ): ConnectResponseType;
}
