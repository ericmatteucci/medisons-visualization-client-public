// This is not a great definition and doesn't provide much checking. However, I'm not sure how to properly
// create the right defs. There is a typescript one available but it seems that we probably need to do
// something with intersections to get it to work properly in flow.

type SelectorType<T> = (state: any, props?: any) => T;
type EqualityChecker = <T>(arg1: T, arg2: T) => boolean;
type Memoizer = <fcn>(func: Function, equalityCheck?: EqualityChecker) => fcn;
declare module 'reselect' {
    declare function createSelector<T>(selectors: Array<SelectorType<any>>, combiner: ((...args: any) => T)): SelectorType<T>;
    declare function createSelectorCreator(memoize: Memoizer, ...memoizeOptions: any[]): any;
    declare var defaultMemoize: Memoizer;
}
