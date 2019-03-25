// @flow

const newState = (currentState: any, changes: Object): Object => {
  const ret = new currentState.constructor();
  return Object.assign(ret, currentState, changes);
};

export default newState;
