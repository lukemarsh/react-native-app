import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Talks from '../talks/Talks';
import AddTalk from '../talks/AddTalk';
import Talk from '../talks/Talk';
import App from './App';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Talks} />
    <Route path="/add-talk" component={AddTalk} />
    <Route path="/talk" component={Talk} />
  </Route>
);
