// @flow

import React from 'react';
import { graphql } from 'react-apollo';
import { getChartData } from '../data/graphql/ChartData/signalRowData.graphql';

type ChartDataLoadContainerPropsType = {};

class ChartDataLoadContainer extends React.Component<ChartDataLoadContainerPropsType> {}

export default graphql(getChartData)(ChartDataLoadContainer);
