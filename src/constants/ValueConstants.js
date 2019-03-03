// @flow

export const ONE_SECOND_MS = 1000;
export const FIVE_SECONDS_MS = ONE_SECOND_MS * 5;
export const ONE_MINUTE_MS = ONE_SECOND_MS * 60;

export const CHART_WINDOW_SIZE = FIVE_SECONDS_MS;

export const SIGNAL_LOAD_POLL_INTERVAL = FIVE_SECONDS_MS;

export const SignalNames = {
  SPO2: 'spo2',
  ECG: 'ecg',
  BP: 'bp',
};