/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import ScoreDataLoadContainer from '../containers/scoreDataLoadContainer/scoreDataLoadContainer';
import MetaComponent from './MetaComponent/MetaComponent';
import BackgroundDataStoreContainer from '../containers/backgroundDataStoreContainer/backgroundDataStoreContainer';
import BackgroundDataLoadContainer from '../containers/backgroundDataLoadContainer/backgroundDataLoadContainer';

const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  // Universal HTTP client
  fetch: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  query: PropTypes.object,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  ...ReduxProvider.childContextTypes,
  // Apollo Client
  client: PropTypes.object.isRequired,
};

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */
class App extends React.PureComponent {
  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = ContextType;

  getChildContext() {
    return this.props.context;
  }

  _getStyle = () => ({
    width: 'inherit',
    height: 'inherit',
  });

  _getContainerStyle = () => ({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  });

  render() {
    // Here, we are at universe level, sure? ;-)
    const { client } = this.props.context;
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    return (
      <div style={this._getStyle()}>
        <ApolloProvider client={client}>{this.props.children}</ApolloProvider>
        <div style={this._getContainerStyle()}>
          <ScoreDataLoadContainer client={client} />
        </div>
        <BackgroundDataStoreContainer client={client} />
        <BackgroundDataLoadContainer client={client} />
        <MetaComponent />
      </div>
    );
  }
}

export default App;
