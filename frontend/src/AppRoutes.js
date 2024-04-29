import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Board from './components/Board';
import Toolbar from './components/Toolbar';
import Login from './components/Login';
import Register from './components/Register';
import './AppRoutes.css'; // Assuming you have styles specific to routes

function AppRoutes() {
  const [isErasing, setIsErasing] = useState(false);

  return (
    <Router>
      <div className="main-container">
        <Toolbar isErasing={isErasing} setIsErasing={setIsErasing} />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/">
            <Board isErasing={isErasing} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default AppRoutes;