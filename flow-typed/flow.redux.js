/**
 * See https://github.com/jfromaniello/url-join
 */

declare module 'redux' {
    declare function combineReducers(...reducers: Array<Object>): Object;
    declare function bindActionCreators(actions: Object, dispatch: Object): Object;
}
