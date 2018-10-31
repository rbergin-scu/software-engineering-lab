import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// route components
import Index from '/imports/ui/pages/Index';
import AdminPage from '/imports/ui/pages/AdminPage';

export const renderRoutes = () => (
  <Router>
    <div>
      <Route path="/" exact component={Index} />
      <Route path="/admin" component={AdminPage} />
    </div>
  </Router>
);
