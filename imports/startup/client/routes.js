import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// route components
import Index from '/imports/ui/pages/Index';
import NewBusiness from '/imports/ui/components/NewBusiness';
import AdminPage from '/imports/ui/pages/AdminPage';

export const renderRoutes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ Index } />
      <Route exact path="/admin" component={ AdminPage } />
    </Switch>
  </Router>
);
