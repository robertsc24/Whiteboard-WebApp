import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Board from './components/Board';
import Toolbar from './components/Toolbar';
import Login from './components/Login';
import Register from './components/Register';

function AppRoutes() {
  return (
    <Router>
      <Switch>
        {/* Login route */}
        <Route path="/login" component={Login} />

        {/* Register route */}
        <Route path="/register" component={Register} />

        {/* Main board route */}
        <Route exact path="/">
          {/* Toolbar and Board are on the same main route */}
          <Toolbar />
          <Board />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRoutes;

