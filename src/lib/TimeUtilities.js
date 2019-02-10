// @flow
import moment from 'moment-timezone';

class TimeUtilities {
  static epochToLocalDate = (timestamp: number): string =>
    moment(parseInt(timestamp, 10)).format('HH:mm:ss.SSS');
}

export default TimeUtilities;
