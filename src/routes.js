import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { Layout, Home, NotFound, Film } from './pages';

const routes = (
  <Route path="/" component={Layout} >
    <IndexRedirect to="/home" />
    <Route path="/home" component={Home} />
    <Route path="/film-details/:title" component={Film} />
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
