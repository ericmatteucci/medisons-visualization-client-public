// @flow

export const ONE_SECOND_MS = 1000;
export const FIVE_SECONDS_MS = ONE_SECOND_MS * 5;
export const ONE_MINUTE_MS = ONE_SECOND_MS * 60;

export const CHART_WINDOW_SIZE = ONE_MINUTE_MS;

export const SCORE_LOAD_INTERVAL = FIVE_SECONDS_MS;

export const SignalNames = {
  SPO2: 'spo2',
  ECG: 'ecg',
  BP: 'bp',
};

export const AGE_DEFAULT_VALUE = -1;
export const HEIGHT_DEFAULT_VALUE = -1;
export const WEIGHT_DEFAULT_VALUE = -1;
export const SEX_DEFAULT_VALUE = 'Select...';
