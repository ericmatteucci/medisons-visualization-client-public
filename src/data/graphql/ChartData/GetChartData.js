import fetch from 'node-fetch';
import {
  ONE_MINUTE_MS,
  ResponseStatus,
} from '../../../constants/DataConstants';
import { updateOxygenSaturationChartAction } from '../../../actions/ChartActions';

export const schema = [
  `
  type ChartDataPoint {
    timestampMilli: Int
    value: Float
  }
`,
];

export const queries = [
  `
  # Retrieves the latest ReactJS News
  signalRowData: [ChartDataPoint]
`,
];

// Database Manager URL
const url = 'http://localhost:8080/database-manager/graphql';

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

export const resolvers = {
  RootQuery: {
    signalRowData() {
      if (lastFetchTask) {
        return lastFetchTask;
      }

      if (new Date() - lastFetchTime > ONE_MINUTE_MS /* 1 min */) {
        lastFetchTime = new Date();
        lastFetchTask = fetch(url)
          .then(response => response.json())
          .then(data => {
            if (data.status === ResponseStatus.OK) {
              items = data.items;
            }

            lastFetchTask = null;

            updateOxygenSaturationChartAction(
              items.timestampMilli,
              items.value,
            );

            return items;
          })
          .catch(err => {
            lastFetchTask = null;
            throw err;
          });

        if (items.length) {
          return items;
        }

        return lastFetchTask;
      }

      return items;
    },
  },
};
