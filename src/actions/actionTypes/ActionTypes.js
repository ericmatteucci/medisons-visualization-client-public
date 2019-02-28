// @flow

export type ActionType = { type: string };

export type DispatchFunctionType = (
  action: ActionType | AsyncActionType, // eslint-disable-line no-use-before-define
) => void;

export type AsyncActionType = (dispatch: DispatchFunctionType) => void;

export type RetriedAsyncActionType = AsyncActionType;

export type AnyActionType = ActionType | AsyncActionType | RetriedAsyncActionType;
