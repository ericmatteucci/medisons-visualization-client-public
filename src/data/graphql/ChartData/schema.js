import { merge } from 'lodash';

/** * Queries ** */
import {
  schema as GetChartData,
  queries as GetChartDataQueries,
  resolvers as GetChartDataResolver,
} from './GetChartData';

export const schema = [...GetChartData];

export const queries = [...GetChartDataQueries];

export const resolvers = merge(GetChartDataResolver);
