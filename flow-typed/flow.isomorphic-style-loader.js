// @flow

import React from 'react';

type WithStylesReturnType = (
  reactComponent: React.Component,
) => React.Component;
type WithStylesCallType = (...styles: Array<Object>) => WithStylesReturnType;

declare module 'isomorphic-style-loader/lib/withStyles' {
  declare var exports: WithStylesCallType;
}
