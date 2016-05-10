import React          from 'react';
import { render }     from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root           from './containers/Root';
import configureStore from '../store/configureStore';

require('./styles/styles.scss');

const renderApp = () => {
  const store = configureStore(browserHistory);
  const history = syncHistoryWithStore(browserHistory, store);
  render(
    <Root store={store} history={history} />,
    document.getElementById('root')
  );
};

renderApp();
